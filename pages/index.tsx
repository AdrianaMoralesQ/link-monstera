import { useEffect, useState } from "react";
import supabase from "../utils/supabaseClient";
import Image from "next/image";
import ImageUploading, { ImageListType } from "react-images-uploading";

type Link = {
	title: string;
	url: string;
};

export default function Home() {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [userId, setUserId] = useState<string | undefined>();
	const [title, setTitle] = useState<string | undefined>();
	const [url, setUrl] = useState<string | undefined>();
	const [links, setLinks] = useState<Link[]>();
	const [images, setImages] = useState<ImageListType>([]);

	const onChange = (imageList: ImageListType) => {
		setImages(imageList);
	};

	useEffect(() => {
		const getUser = async () => {
			const user = await supabase.auth.getUser();
			// console.log("user", user);
			if (user) {
				const userId = user.data.user?.id;
				setIsAuthenticated(true);
				setUserId(userId);
			}
		};
		getUser();
	}, []);

	useEffect(() => {
		const getLinks = async () => {
			try {
				const { data, error } = await supabase
					.from("links")
					.select("title, url")
					.eq("user_id", userId);

				if (error) throw error;

				console.log("data:", data);

				setLinks(data);
			} catch (error) {
				console.log("error:", error);
			}
		};
		if (userId) {
			getLinks();
		}
	}, [userId]);

	const addNewLink = async () => {
		try {
			if (title && url && userId) {
				const { data, error } = await supabase
					.from("links")
					.insert({
						title: title,
						url: url,
						user_id: userId,
					})
					.select();
				if (error) throw error;
				console.log("data:", data);
				if (links) {
					setLinks([...data, ...links]);
				}
			}
		} catch (error) {
			console.log("error:", error);
		}
	};
	return (
		<div className="flex flex-col e-full justify-center items-center mt-4">
			<h1 className="text-3xl font-bold underline"> Link Monstera</h1>

			{links?.map((link: Link, index: number) => (
				<button
					className="inline-flex items-center rounded-full border-transparent bg-pink-800 px-4 py-2 text-sm mt-4 p-4"
					key={index}
					onClick={(e) => {
						e.preventDefault();
						window.location.href = link.url;
					}}
				>
					{link.title}{" "}
				</button>
			))}
			{isAuthenticated && (
				<>
					<div>
						<h1>New Links</h1>
						<div className="block text-sm font-medium text-grey-700 mt-4">
							Name
						</div>
						<div className="mt-1">
							<input
								type="text"
								name="title"
								id="title"
								className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm color:black"
								placeholder="For ex. Instagram"
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<div className="block text-sm font-medium text-grey-700 mt-4">
							Your awesome link
						</div>
						<div className="mt-1">
							<input
								type="text"
								name="url"
								id="url"
								className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm"
								placeholder="https://www.instagram.com/tamaltheweightlosscat/?hl=en"
								onChange={(e) => setUrl(e.target.value)}
							/>
						</div>
						<button
							type="button"
							className="inline-flex items-center rounded-md border-transparent bg-indigo-600 px-4 py-2 text-sm mt-4"
							onClick={addNewLink}
						>
							Add new link
						</button>
					</div>
					<div>
						<h1>Add a New Profile Picture</h1>
						<Image
							src={images[0]["data_url"]}
							height={100}
							width={100}
							alt="profile picture"
						/>
						<ImageUploading
							multiple
							value={images}
							onChange={onChange}
							maxNumber={1}
							dataURLKey="data_url"
						>
							{({ onImageUpload, onImageRemoveAll, isDragging, dragProps }) => (
								// write your building UI
								<div className="upload__image-wrapper bg-slate-300">
									{images.length === 0 ? (
										<button
											style={isDragging ? { color: "red" } : undefined}
											onClick={onImageUpload}
											{...dragProps}
											className="w-3/4"
										>
											Click or Drop here
										</button>
									) : (
										<button onClick={onImageRemoveAll}>
											Remove all images
										</button>
									)}
								</div>
							)}
						</ImageUploading>
					</div>
				</>
			)}
		</div>
	);
}
