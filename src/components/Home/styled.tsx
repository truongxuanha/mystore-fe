import styled from "styled-components";
export const Container = styled.div`
  .popup {
    z-index: 100;
  }
`;
export const BannerLeft = styled.div`
  position: fixed;
  left: calc((100% - 1200px) / 2 - 79px);
  top: 190px;
  @media (max-width: 600px) {
    display: none;
  }
`;
export const BannerRight = styled.div`
  position: fixed;
  right: calc((100% - 1200px) / 2 - 79px);
  top: 190px;
  @media (max-width: 600px) {
    display: none;
  }
`;
