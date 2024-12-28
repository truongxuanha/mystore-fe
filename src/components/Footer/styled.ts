import styled from "styled-components";

export const ContainerFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 50px 20px;
`;
export const MainFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 30px;
`;
export const ListContact = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  font-size: 16px;
  @media (max-width: 600px) {
    flex-wrap: wrap;
  }
`;
export const ListApp = styled.div`
  display: flex;
  gap: 30px;
  img {
    width: 30px;
  }
  @media (max-width: 600px) {
    img {
      width: 20px;
    }
  }
`;
export const CopyrightNotice = styled.div`
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;
