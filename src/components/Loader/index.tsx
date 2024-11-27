import styled from "styled-components";
const WrapperLoader = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
`;
const Loader = () => {
  return (
    <WrapperLoader className="fixed w-full inset-0 top-0 bottom-0 flex items-center justify-center z-50">
      <div className="w-full h-full flex items-center justify-center">
        <div className="loader"></div>
      </div>
    </WrapperLoader>
  );
};

export default Loader;
