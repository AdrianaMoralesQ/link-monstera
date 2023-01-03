import Link from "next/link";
import { GiMonsteraLeaf } from "react-icons/gi";

const Nav = () => (
	<header>
		<nav className="bg-gray-800">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					<Link
						href="/"
						className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
					>
						<h1 className="text-lg">
							<GiMonsteraLeaf />
						</h1>
					</Link>
					<Link
						href="/"
						className=" text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
					>
						Dashboard
					</Link>
					<Link
						href="/login"
						className=" text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
					>
						Log in
					</Link>
				</div>
			</div>
		</nav>
	</header>
);

export default Nav;
