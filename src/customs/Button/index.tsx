import React from "react";
import styled from "styled-components";

type Props = {
  width?: string;
  height?: string;
  background?: string;
  icon?: string;
  color?: string;
  border?: string;
  padding?: string;
  styles?: string;
  img?: any;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export const WrapButton = styled.button`
  &:hover {
    opacity: 0.8;
  }
`;
function Button({ width = "100%", height = "100%", background, color, img, border, padding, children, ...props }: Props) {
  const stylesButton: React.CSSProperties = {
    background,
    color,
    border,
    width,
    height,
    padding,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <WrapButton style={stylesButton} {...props}>
      {img && img}
      {children && children}
    </WrapButton>
  );
}

export default Button;
