import styled from "styled-components";

export const BannerLeft = styled.div`
  position: fixed;
  right: calc(50% - 528px);
  top: 200px;
  @media (max-width: 600px) {
    display: none;
  }
`;
export const BannerRight = styled.div`
  position: fixed;
  left: calc(50% - 528px);
  top: 200px;
  @media (max-width: 600px) {
    display: none;
  }
`;
