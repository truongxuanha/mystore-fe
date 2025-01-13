import styled from "styled-components";

export const WrapperFormImport = styled.div``;
export const MainContent = styled.div`
  background-color: white;
  padding: 0 30px;
  border-radius: 5px;
  /* display: flex; */
  .product-list {
    max-height: 600px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #888 #f0f0f0;
  }

  .product-list::-webkit-scrollbar {
    width: 2px;
  }
  .product-list::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
  }

  .product-list::-webkit-scrollbar-track {
    background-color: #f0f0f0;
  }
`;
