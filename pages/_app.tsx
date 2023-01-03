import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/Nav";
import { UserProvider } from "../context";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<Nav />
			<Component {...pageProps} />
		</UserProvider>
	);
}
