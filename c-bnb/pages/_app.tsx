import App from "next/app";
import type { AppContext, AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/GlobalStyle";
import pallete from "../styles/palette";
import { wrapper } from "../store";
import Header from "../components/Header";
import { cookieStringToObject } from "../lib/utils";
import { meAPI } from "../lib/api/auth";
import { userActions } from "../store/user";
import axios from "../lib/api";
import cookies from "next-cookies";

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

// v 6
// MyApp.getInitialProps = async (context: AppContext) => {
//   const appInitialProps = await App.getInitialProps(context);
//   const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
//   const { store } = context.ctx;
//   const { isLogged } = store.getState().user;
//   try {
//     if (!isLogged && cookieObject.access_token) {
//       // axios.defaults.headers.cookie = cookieObject.access_token;
//       const { data } = await meAPI();
//       store.dispatch(userActions.setLoggedUser(data));
//     }
//   } catch (e: any) {
//     console.log(e.message);
//   }
//   return { ...appInitialProps };
// };

// v7
MyApp.getInitialProps = wrapper.getInitialAppProps(
  (store) => async (context: AppContext) => {
    const appInitialProps = await App.getInitialProps(context);
    const cookieObj = cookies(context.ctx);
    // const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
    const { isLogged } = store.getState().user;
    // console.log("wrapper.getInitialAppProps : ", cookieObject, cookieObj);

    try {
      if (!isLogged && cookieObj.access_token) {
        // axios.defaults.headers.common["Cookie"] = cookieObject.access_token;
        axios.defaults.headers.common["Cookie"] = cookieObj.access_token;
        const { data } = await meAPI();
        store.dispatch(userActions.setLoggedUser(data));
        return { pageProps: {} };
      }
    } catch (e: any) {
      // console.log(e.message);
    }
    return { ...appInitialProps };
  }
);

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ res, req, params }) => {
//       console.log(req, res, params);
//       return { props: {} };
//     }
// );

export default wrapper.withRedux(MyApp);
