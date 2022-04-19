# nextjs

## boiler

### init

```
## typescript
$ npx create-next-app {name} --ts

## redux
$ npm i @reduxjs/toolkit react-redux next-redux-wrapper

## emotionjs
// React framwork
$ npm i @emotion/react
// no framwork
$ npm i @emotion/css
// emotion-reset
$ npm i emotion-reset

## storybook
$ npx sb init

## axios
$ npm i axios

## styled components (css in js)
$ npm i styled-components styled-reset
$ npm i -D @types/styled-components

## svg
$ npm i -D babel-plugin-inline-react-svg

```

### emotion

> 참고 : https://emotion.sh/docs/css-prop

```json
// .babelrc
{
  "presets": [
    [
      "next/babel",
      {
        "preset-react": {
          "runtime": "automatic",
          "importSource": "@emotion/react"
        }
      }
    ]
  ],
  "plugins": ["@emotion/babel-plugin"]
}
// .tsconfig.json
{
  "compilerOptions": {
    ...
    "types": ["@emotion/react/types/css-prop"]
    ...
  },
  ...
}

```

### storybook .storybook/main.js

```js
const path = require("path");
const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: "@storybook/react",
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: [require.resolve("@emotion/babel-preset-css-prop")],
      },
    });
    return config;
  },
};
```

### 절대경로 tsconfig.json

```json
{
  // ...
  "baseUrl": "."
  // ...
}
```

### redux v7 이상

```js
//  _app.tsx
function MyApp({ Component, pageProps }: AppProps) { ... }
export default wrapper.withRedux(MyApp);

// getInitialProps
{컴포넌트}.getInitialProps = wrapper.getInitialAppProps(
  (store) => async (context: AppContext) => {
    const appInitialProps = await App.getInitialProps(context);
    ...
    return { pageProps: {} };
    ...
    return { ...appInitialProps };
}
{컴포넌트}.getInitialProps = wrapper.getInitialPageProps(
  (store) =>
    async ({ pathname, req, res, query }) => {
      return {};
    }
);

//  getServerSideProps
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      return { props: {} };
    }
);
```

### next.config.js

```js
// redirects & rewrites
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/old/:path*",
        destination: "/new/:path*",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/old",
        destination: `https://new-url`,
      },
      {
        source: "/api/old/:id",
        destination: `https://new-url/:id`,
      },
    ];
  },
};
```

### styled-components

```js
// _document.tsx
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  ...
}
```
