import { GiMonsteraLeaf } from "react-icons/gi";
import Link from "next/link";
import { useContext, useEffect } from "react";
import supabase from "../utils/supabaseClient";
import { UserContext } from "../context";

const Logout = () => {
	const { setIsAuthenticated } = useContext(UserContext);
	useEffect(() => {
		async function signOut() {
			const { error } = await supabase.auth.signOut();
			if (error) throw error;
			setIsAuthenticated(false);
		}
		signOut();
	}, [setIsAuthenticated]);
	return (
		<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-8">
			<h2>You are now logged out of your account.</h2>
			<h2>See you soon! </h2>
		</div>
	);
};
export default Logout;
