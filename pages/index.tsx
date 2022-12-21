import { useEffect, useState } from "react";
import supabase from "../utils/supabaseClient";

export default function Home() {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [userId, setUserId] = useState<string | undefined>();
	const [title, setTitle] = useState<string | undefined>();
	const [url, setUrl] = useState<string | undefined>();

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

	const addNewLink = async () => {
		try {
			if (title && url && userId) {
				const { data, error } = await supabase.from("links").insert({
					title: title,
					url: url,
					user_id: userId,
				});
				if (error) throw error;
				console.log("data:", data);
			}
		} catch (error) {
			console.log("error:", error);
		}
	};
	return (
		<div className="flex flex-col e-full justify-center items-center mt-4">
			<h1 className="text-3xl font-bold underline"> Link Monstera</h1>
			{isAuthenticated && (
				<>
					<div className="mt-4">
						<input
							type="text"
							name="title"
							id="title"
							className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm"
							placeholder="Link title"
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<button
						type="button"
						className="inline-flex items-center rounded-md border-transparent bg-indigo-600 px-4 py-2 text-sm mt-4"
						onClick={addNewLink}
					>
						Add new link
					</button>
				</>
			)}
		</div>
	);
}
