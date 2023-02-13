import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApolloProvider } from "@apollo/client";
import client from "../client";
import BundlrContextProvider from "../context/bundlrContext";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <ApolloProvider client={client}>
        <BundlrContextProvider>
          <Head>
            <title>Decentragram</title>

            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon-16x16.png"
            />
            <link rel="manifest" href="favicon/site.webmanifest"></link>

            <meta name="theme-color" content="#000000" />

            <meta name="description" content="Decentragram" />

            <meta itemProp="name" content="Framer Magic" />
            <meta itemProp="description" content="Decentragram" />
            <meta itemProp="image" content="/Card.png" />

            <meta property="og:url" content=" " />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Blazon" />
            <meta property="og:description" content="Decentragram" />
            <meta property="og:image" content="/Card.png" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Decentragram" />
            <meta
              name="twitter:description"
              content="Decentragram"
            />
            <meta name="twitter:image" content="/Card.png"></meta>
          </Head>
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
      </ApolloProvider>
    </div>
  );
}

export default MyApp;
