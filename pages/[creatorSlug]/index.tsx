import { useContext, useEffect, useState } from "react";
import supabase from "../../utils/supabaseClient";
import Image from "next/image";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useRouter } from "next/router";
import { UserContext } from "../../context";

type Link = {
	title: string;
	url: string;
};

export default function Home() {
	const { isAuthenticated } = useContext(UserContext);
	const { userId } = useContext(UserContext);
	const [title, setTitle] = useState<string | undefined>();
	const [url, setUrl] = useState<string | undefined>();
	const [links, setLinks] = useState<Link[] | any>();
	const [images, setImages] = useState<ImageListType>([]);
	const { profilePictureUrl } = useContext(UserContext);

	const router = useRouter();
	const { creatorSlug } = router.query;

	const onChange = (imageList: ImageListType) => {
		setImages(imageList);
	};

	useEffect(() => {
		const getLinks = async () => {
			try {
				const { data, error } = await supabase
					.from("links")
					.select("title, url")
					.eq("user_id", userId);

				if (error) throw error;

				// console.log("data:", data);

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

	const uploadProfilePicture = async () => {
		try {
			if (images.length > 0) {
				const image = images[0];
				if (image.file && userId) {
					const { data, error } = await supabase.storage
						.from("public")
						.upload(`${userId}/${image.file.name}`, image.file, {
							upsert: true,
						});
					if (error) throw error;
					const resp = supabase.storage.from("public").getPublicUrl(data.path);
					const publicUrl = resp.data.publicUrl;
					const updateUserResponse = await supabase
						.from("users")
						.update({ profile_picture_url: publicUrl })
						.eq("id", userId);
					if (updateUserResponse.error) throw error;
				}
			}
		} catch (error) {
			console.log("error:", error);
		}
	};

	return (
		<div className="flex flex-col e-full justify-center items-center mt-4">
			<h1 className="text-3xl font-bold ">Link Monstera</h1>
			{profilePictureUrl && (
				<Image
					src={profilePictureUrl}
					alt="Profile picture"
					height={100}
					width={100}
					className="rounded-lg mt-4"
				/>
			)}
			<h2 className="mt-2">{creatorSlug}&apos;s links: </h2>
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
					<div className="flex flex-col e-full justify-center items-center mt-8">
						<h1>Add Your Links</h1>
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
							Your link
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
							className="inline-flex items-center rounded-md border-transparent bg-pink-700 px-4 py-2 text-sm mt-4"
							onClick={addNewLink}
						>
							Add new link
						</button>
					</div>
					<div className="flex flex-col e-full justify-center items-center mt-8">
						<h1>Add a New Profile Picture</h1>
						{images.length > 0 && (
							<Image
								src={images[0]["data_url"]}
								height={100}
								width={100}
								alt="profile picture"
							/>
						)}
						<ImageUploading
							multiple
							value={images}
							onChange={onChange}
							maxNumber={1}
							dataURLKey="data_url"
						>
							{({ onImageUpload, onImageRemoveAll, isDragging, dragProps }) => (
								<div className="upload__image-wrapper sm:text-sm h-24 bg-slate-700 items-center justify-center rounded-md border-transparent text-sm mt-4 p-4">
									{images.length === 0 ? (
										<button
											style={isDragging ? { color: "red" } : undefined}
											onClick={onImageUpload}
											{...dragProps}
											className="flex flex-col e-full justify-center items-center"
										>
											Click or drag your new profile pic here.
										</button>
									) : (
										<button onClick={onImageRemoveAll}>
											Remove all images
										</button>
									)}
								</div>
							)}
						</ImageUploading>
						<button
							type="button"
							className="inline-flex items-center rounded-md border-transparent bg-pink-700 px-4 py-2 text-sm mt-4"
							onClick={uploadProfilePicture}
						>
							Upload profile picture
						</button>
					</div>
				</>
			)}
		</div>
	);
}
