import type { AppProps } from "next/app";

import Header from "../components/Header";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <style jsx global>
        {`
          body {
            margin: 0;
            font-family: Noto Sans, Noto Sans KR;
          }
        `}
      </style>
    </>
  );
};

export default MyApp;
