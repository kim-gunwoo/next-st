import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import { wrapper } from "store";
import { globalStyles } from "styles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {globalStyles}
      <Component {...pageProps} />
    </>
  );
}

MyApp.getInitialProps = wrapper.getInitialAppProps(
  (store) => async (context: AppContext) => {
    const appInitialProps = await App.getInitialProps(context);
    // const cookieObj = cookies(context.ctx);
    // const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
    // const { isLogged } = store.getState().user;
    // console.log("wrapper.getInitialAppProps : ", cookieObject, cookieObj);

    try {
      // if (!isLogged && cookieObj.access_token) {
      //   axios.defaults.headers.common["Cookie"] = cookieObj.access_token;
      //   const { data } = await meAPI();
      //   store.dispatch(userActions.setLoggedUser(data));
      //   return { pageProps: {} };
      // }
    } catch (e: any) {
      // console.log(e.message);
    }
    return { ...appInitialProps };
  }
);

export default wrapper.withRedux(MyApp);
