# Nextjs PWA 적용

## init

```
# next-pwa install
$ yarn add next-pwa

# run dev
$ yarn dev
```

## next.config.js

```js
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

// module.exports = withPWA({
//   ...nextConfig,
// });
module.exports = withPWA(nextConfig);
```

## pwa step

```
step 1
- next-pwa 설치

step 2
- next.config.js 를 수정

step 3
- 서버 실행

## 서버를 실행할 경우 자동으로 sw.js 및 workbox.js 를 생성한다.
```

## refernce

> next-pwa npm : https://www.npmjs.com/package/next-pwa
>
> manifest 생성 : https://www.simicart.com/manifest-generator.html
>
> 참고 : https://dev.to/anuraggharat/pwa-with-nextjs-5178
>
> ```
> 블로그 참고해서 next.config.js 수정할 경우 안됨
> next-pwa - npm 사이트에서 되어있는 형태로 했을때는 정상적으로 실행되었음
> ```
>
> > ;
