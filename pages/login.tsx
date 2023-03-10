import { useRouter } from "next/router";
import { useState } from "react";
import supabase from "../utils/supabaseClient";

export default function Login() {
	const [email, setEmail] = useState<string | undefined>();
	const [password, setPassword] = useState<string | undefined>();
	const router = useRouter();

	async function loginWithEmail() {
		try {
			if (email && password) {
				const resp = await supabase.auth.signInWithPassword({
					email: email,
					password: password,
				});
				if (resp.error) throw resp.error;
				const userId = resp.data.user?.id;
				const usernameResponse = await supabase
					.from("users")
					.select("username, id")
					.eq("id", userId);
				if (usernameResponse.error) throw resp.error;
				router.push(`/${usernameResponse.data[0].username}`);
			}
		} catch (error) {
			console.log("error:", error);
		}
	}

	return (
		<div className="flex flex-col e-full justify-center items-center mt-8">
			<div>
				<h2> Welcome back! </h2>
			</div>
			<label
				htmlFor="email"
				className="block text-sm font-medium text-grey-700 mt-4"
			>
				Email
			</label>
			<div className="relative mt-1 rounded-md shadow-sm">
				<input
					type="email"
					name="email"
					id="email"
					className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm"
					placeholder="you@example.com"
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<label
				htmlFor="password"
				className="block text-sm font-medium text-grey-700 mt-4"
			>
				Password
			</label>
			<div className="relative mt-1 rounded-md shadow-sm">
				<input
					type="password"
					name="password"
					id="password"
					className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm"
					placeholder="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<button
				type="button"
				className="inline-flex items-center rounded-md border-transparent bg-indigo-600 px-4 py-2 text-sm mt-4"
				onClick={loginWithEmail}
			>
				Log in
			</button>
		</div>
	);
}
