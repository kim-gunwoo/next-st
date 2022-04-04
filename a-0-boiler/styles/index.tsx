import emotionReset from "emotion-reset";
import { css, Global } from "@emotion/react";

export const globalStyles = (
  <Global
    styles={css`
      ${emotionReset}
      *, *::after, *::before {
        box-sizing: border-box;
        font-smoothing: antialiased;
      }
    `}
  />
);
