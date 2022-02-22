import React from "react";
import styled, { css } from "styled-components";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: "dark_cyan" | "white" | "bittersweet" | "amaranth";
  size?: "small" | "medium";
  width?: string;
  colorReverse?: boolean;
  icon?: JSX.Element;
}

const Button: React.FC<IProps> = ({
  children,
  color,
  size = "medium",
  width,
  colorReverse = false,
  icon,
  ...props
}) => {
  return (
    <Container
      {...props}
      color={color}
      size={size}
      width={width}
      colorReverse={colorReverse}
    >
      {icon}
      {children}
    </Container>
  );
};

interface StyledButtonProps {
  width: string | undefined;
  colorReverse: boolean;
  size: "small" | "medium";
}

const Container = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0 15px;
  border: 0;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  width: ${(props) => props.width};
  ${(props) => getButtonColor(props.color || "", props.colorReverse)};
  ${(props) => getButtonSize(props.size)}
  svg {
    margin-right: 12px;
  }
`;

//* 버튼 색상 구하기
const getButtonColor = (color: string, colorReverse: boolean) => {
  if (colorReverse) {
    switch (color) {
      case "dark_cyan":
        return css`
          border: 2px solid ${({ theme }) => theme.dark_cyan};
          color: ${({ theme }) => theme.dark_cyan};
          background-color: white;
        `;
      default:
        return css`
          border: 2px solid ${({ theme }) => theme.black};
          color: ${({ theme }) => theme.black};
          background-color: white;
        `;
    }
  }
  switch (color) {
    case "dark_cyan":
      return css`
        background-color: ${({ theme }) => theme.dark_cyan};
        color: white;
      `;
    case "bittersweet":
      return css`
        background-color: ${({ theme }) => theme.bittersweet};
        color: white;
      `;
    case "amaranth":
      return css`
        background-color: ${({ theme }) => theme.amaranth};
        color: white;
      `;
    default:
      return css`
        background-color: white;
        color: ${({ theme }) => theme.black};
        border: 1px solid ${({ theme }) => theme.gray_c4};
      `;
  }
};

//* 버튼 크기 구하기
const getButtonSize = (size: "small" | "medium") => {
  switch (size) {
    case "medium":
      return css`
        height: 48px;
      `;
    case "small":
      return css`
        font-size: 14px;
        height: 36px;
      `;
    default:
      return "";
  }
};

export default React.memo(Button);
