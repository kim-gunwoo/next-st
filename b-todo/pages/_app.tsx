import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { wrapper } from "../app";
import GlobalStyle from "../styles/GlobalStyle";
import pallete from "../styles/pallete";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={{ ...pallete }}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
