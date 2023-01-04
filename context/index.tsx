import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import supabase from "../utils/supabaseClient";

type UserContextData = {
	dummyData: string;
	isAuthenticated: boolean;
	userId: string | undefined;
	profilePictureUrl: string | undefined;
	setIsAuthenticated: (value: boolean) => void;
	userName: string | undefined;
};

export const UserContext = createContext({} as UserContextData);
type UserProviderProps = any;

const dummyData = "dummy data from context";

export function UserProvider({ children }: UserProviderProps) {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const { pathname } = useRouter();
	const [userId, setUserId] = useState<string | undefined>();
	const [userName, setUserName] = useState<string | undefined>();
	const router = useRouter();
	const { creatorSlug } = router.query;
	const [profilePictureUrl, setProfilePictureUrl] = useState<
		string | undefined
	>();

	useEffect(() => {
		const getUser = async () => {
			try {
				const { data, error } = await supabase.auth.getUser();

				if (error) throw error;

				console.log({ data });
				if (data.user) {
					const userId = data.user?.id;
					setIsAuthenticated(true);
					setUserId(userId);
				}
			} catch (error) {
				console.log("error:", error);
			}
		};
		getUser();
	}, [pathname]);

	useEffect(() => {
		const getUser = async () => {
			try {
				const { data, error } = await supabase
					.from("users")
					.select("id, profile_picture_url")
					.eq("username", creatorSlug);
				console.log("username:", creatorSlug);
				if (error) throw error;
				const profilePictureUrl = data[0]["profile_picture_url"];
				const userId = data[0]["id"];
				setProfilePictureUrl(profilePictureUrl);
				setUserId(userId);
			} catch (error) {
				console.log("error:", error);
			}
		};
		if (creatorSlug) {
			getUser();
		}
	}, [creatorSlug]);

	useEffect(() => {
		const getUserName = async () => {
			const usernameResponse = await supabase
				.from("users")
				.select("username, id")
				.eq("id", userId);

			if (usernameResponse.error) throw usernameResponse.error;
			setUserName(usernameResponse.data[0].username);
		};
		getUserName();
	}, [userId]);

	return (
		<UserContext.Provider
			value={{
				dummyData,
				isAuthenticated,
				userId,
				profilePictureUrl,
				setIsAuthenticated,
				userName,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}
