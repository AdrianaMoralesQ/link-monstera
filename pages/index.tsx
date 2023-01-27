import Link from "next/link";
import Head from "next/head";

const Landing = () => {
	return (
		<div className="flex flex-col e-full justify-center items-center mt-4">
			<Head>
				<title>Link Monstera </title>
				<meta
					name="description"
					content="Link Monstera is a full stack project that clones Link Tree's functionality.
Signed-in users can add links to their profile. They can then share their Link Monstera url on social media or via email. "
					key="desc"
				/>
				<meta property="og:title" content="Social Title for Cool Page" />
				<meta
					property="og:description"
					content="And a social description for our cool page"
				/>
				<meta
					property="og:image"
					content="https://example.com/images/cool-page.jpg"
				/>
			</Head>
			<h1 className="text-3xl font-bold mt-6">Link Monstera</h1>
			<h3 className="mt-6"> A fullstack project cloning Link Tree</h3>
			<h3>
				Anybody can create an account and share important links with others.
			</h3>
			<h3 className="mt-6">
				Want to test it out? You only need a working email account to sign up:
			</h3>
			<Link
				href="/signup"
				type="link"
				className="inline-flex items-center rounded-md border-transparent bg-indigo-600 px-4 py-2 text-sm mt-4"
			>
				Sign up
			</Link>
			<h3 className="mt-8">Already have an account?</h3>
			<Link
				href="/login"
				type="link"
				className="inline-flex items-center rounded-md border-transparent bg-indigo-600 px-4 py-2 text-sm mt-4"
			>
				Log in{" "}
			</Link>
		</div>
	);
};

export default Landing;
