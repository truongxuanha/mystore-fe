import styled from "styled-components";

export const ContainerSidebar = styled.div<{ $expanded: boolean }>`
  min-width: ${(props) => (props.$expanded ? "257px" : "100px")};
  padding: 15px 12px;
  transition: all 0.5s ease-in-out;
  background-color: white;
  height: 100%;
  overflow-x: hidden;
`;
