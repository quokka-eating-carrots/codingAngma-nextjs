import NavBar from "@/components/NavBar";
import { AppProps } from "next/dist/shared/lib/router/router";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <style jsx global>
        {`
          a {
            color: white;
            text-decoration: none;
          }
        `}
      </style>
    </>
  );
}
