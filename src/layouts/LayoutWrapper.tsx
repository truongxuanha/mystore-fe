import { ReactNode } from "react";
import styled from "styled-components";

const LayoutContainer = styled.div`
  margin: 0 auto;
`;

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  return <LayoutContainer>{children}</LayoutContainer>;
};

export default LayoutWrapper;
