import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/Nav";
import { UserProvider } from "../context";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<ToastContainer
				position="top-right"
				autoClose={15000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
			<Nav />
			<Component {...pageProps} />
		</UserProvider>
	);
}
