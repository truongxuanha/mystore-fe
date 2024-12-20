import styled from "styled-components";

const LayoutContainer = styled.div`
  margin: 0 auto;
`;
const LayoutWrapper = ({ children }: any) => {
  return <LayoutContainer>{children}</LayoutContainer>;
};

export default LayoutWrapper;
