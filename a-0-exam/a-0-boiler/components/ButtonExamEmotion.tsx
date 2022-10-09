import React from "react";
import { css } from "@emotion/react";

interface IProps {
  theme?: "primary" | "secondary";
  color?: string;
  number?: number;
}

const defaultProps = {
  theme: "primary",
};

ButtonExamEmotion.defaultProps = defaultProps;

export default function ButtonExamEmotion({
  theme,
  color,
  number,
  ...props
}: IProps & typeof defaultProps) {
  return (
    <button css={themes[theme]} {...props}>
      <div>{number}</div>
      <div>{color}</div>
      this button
    </button>
  );
}

const themes = {
  primary: css`
    background: red;
  `,
  secondary: css`
    background: blue;
  `,
};
