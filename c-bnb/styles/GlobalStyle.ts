import reset from "styled-reset";
import { createGlobalStyle, css } from "styled-components";
import pallete from "./pallete";

const globalStyle = css`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    font-family: Noto Sans, Noto Sans KR;
    color: ${({ theme }) => theme.black};
    line-height: 1.2;
  }
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.black};
  }
`;

const GlobalStyle = createGlobalStyle`
    ${globalStyle};
`;

export default GlobalStyle;
