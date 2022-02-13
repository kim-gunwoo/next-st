# next todo rtk

> nextjs todo
> redux toolkit
> styled components

## modify

```
# package.json
# port : 4000
{
  ...
  "dev": "next dev", => "dev": "next dev -p 4000",
  ...
}
```

## dependencies

```
## axios
$ npm i axios

## styled components
$ npm i styled-components styled-reset
$ npm i -D @types/styled-components

## redux
$ npm i @reduxjs/toolkit react-redux next-redux-wrapper
$ npm i -D @types/react-redux

## svg
<!-- $ npm i -D @svgr/webpack  -->
$ npm i -D babel-plugin-inline-react-svg
```

## reference

> styled components 적용시 스타일 적용 전 렌더링 되는 문제 해결
> \_document.tsx 파일 참고

> svg 적용

```
$ npm i -D babel-plugin-inline-react-svg

## .babelrc
{
  "presets": ["next/babel"],
  "plugins": ["inline-react-svg"]
}
```
