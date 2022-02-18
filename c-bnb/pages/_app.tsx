import App from "next/app";
import type { AppContext, AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/GlobalStyle";
import pallete from "../styles/palette";
import { wrapper } from "../store";
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={{ ...pallete }}>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <div id="root-modal" />
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const appInitialProps = await App.getInitialProps(context);
  // const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
  // const { store } = context.ctx;
  // const { isLogged } = store.getState().user;
  // try {
  //   if (!isLogged && cookieObject.access_token) {
  //     axios.defaults.headers.cookie = cookieObject.access_token;
  //     const { data } = await meAPI();
  //     store.dispatch(userActions.setLoggedUser(data));
  //   }
  // } catch (e) {
  //   console.log(e.message);
  // }
  return { ...appInitialProps };
};

export default wrapper.withRedux(MyApp);
