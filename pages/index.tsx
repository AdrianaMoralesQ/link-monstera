import Link from "next/link";

const Landing = () => {
	return (
		<div className="flex flex-col e-full justify-center items-center mt-4">
			<h1 className="text-3xl font-bold mt-6">Link Monstera</h1>
			<h3 className="mt-6"> A fullstack project recreating Link Tree</h3>
			<h3>Create an account and share your important links with others.</h3>
			<h3 className="mt-6">
				Want to test it out? You only need a working email account to sign up:
			</h3>
			<Link
				href="/signup"
				type="button"
				className="inline-flex items-center rounded-md border-transparent bg-indigo-600 px-4 py-2 text-sm mt-4"
			>
				Sign up
			</Link>
			<h3 className="mt-6">Already have an account?</h3>
			<Link
				href="/login"
				type="button"
				className="inline-flex items-center rounded-md border-transparent bg-indigo-600 px-4 py-2 text-sm mt-4"
			>
				Log in{" "}
			</Link>
		</div>
	);
};

export default Landing;
