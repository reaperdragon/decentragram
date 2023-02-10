import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BundlrContextProvider from "../context/bundlrContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <BundlrContextProvider>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BundlrContextProvider>
    </div>
  );
}

export default MyApp;
