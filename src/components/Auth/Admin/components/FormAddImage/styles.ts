import styled from "styled-components";

export const ContainerFormAddImage = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const MainFormAddImage = styled.div`
  position: relative;
  background-color: #fff;
  width: 800px;
  max-height: 600px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
export const ImageItem = styled.div`
  width: 240px;
  height: 190px;
  border: 1px solid red;
`;
export const CloseWrapper = styled.div`
  position: absolute;
  top: -50px;
  right: 0;
  color: white;
  cursor: pointer;
`;
export const DropZoneWrapper = styled.div`
  height: 180px;
  width: 240px;
`;
