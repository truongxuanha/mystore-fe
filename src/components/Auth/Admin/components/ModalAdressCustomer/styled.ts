import styled from "styled-components";

export const ContainerModalAddress = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const BodyModal = styled.div`
  background-color: white;
  margin: 0 30px;
  border-radius: 3px;
  position: relative;
  top: -100px;
`;
export const TitleModal = styled.div`
  font-size: large;
  font-weight: 400;
  text-transform: uppercase;
  text-align: center;
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
`;
export const ContentModal = styled.div`
  padding: 20px 0;
`;
