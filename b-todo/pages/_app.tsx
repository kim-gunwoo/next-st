import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { wrapper } from "../app";
import Footer from "../components/Footer";
import Header from "../components/Header";
import GlobalStyle from "../styles/GlobalStyle";
import pallete from "../styles/pallete";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={{ ...pallete }}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
