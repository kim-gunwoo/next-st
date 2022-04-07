import type { AppContext, AppProps } from "next/app";
// import App from "next/app";
import { wrapper } from "store";
import { exampleAction } from "store/example";
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
    let pageProps = {};
    // const cookieObj = cookies(context.ctx);
    // const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
    // console.log("wrapper.getInitialAppProps : ", cookieObject, cookieObj);
    // try {
    //   if (!isLogged && cookieObj.access_token) {
    //     axios.defaults.headers.common["Cookie"] = cookieObj.access_token;
    //     const { data } = await meAPI();
    //   }
    // } catch (e: any) {
    //   console.log(e.message);
    // }

    if (context.Component.getInitialProps) {
      pageProps = await context.Component.getInitialProps(context.ctx);
    }

    return { pageProps };

    // const appInitialProps = await App.getInitialProps(context);
    // return { ...appInitialProps };
  }
);

export default wrapper.withRedux(MyApp);
