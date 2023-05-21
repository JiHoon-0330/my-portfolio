import ToastContainer from "@/component/toast-container";
import { AppProps } from "next/app";
import Script from "next/script";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" async defer />
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}
