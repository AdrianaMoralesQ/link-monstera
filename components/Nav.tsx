import Link from "next/link";
import { useContext } from "react";
import { GiMonsteraLeaf } from "react-icons/gi";
import { UserContext } from "../context";
import supabase from "../utils/supabaseClient";

const Nav = () => {
	const { isAuthenticated, userName } = useContext(UserContext);

	return (
		<header>
			<nav className="bg-indigo-800">
				<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
					<div className="relative flex h-16 items-center justify-between">
						<Link
							href={isAuthenticated ? `/${userName}` : "/"}
							className=" text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
						>
							Home
						</Link>

						{isAuthenticated ? (
							<Link
								href="/logout"
								className=" text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
							>
								Log out
							</Link>
						) : (
							<Link
								href="/login"
								className=" text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
							>
								Log in
							</Link>
						)}
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Nav;
