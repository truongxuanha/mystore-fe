import styled from "styled-components";

export const InputWrapper = styled.div`
  position: relative;
  input {
    height: 30px;
    padding: 5px;

    border: 1px solid #9b9696;
    width: 100%;
    line-height: 21px;
  }

  .error {
    border: 1px solid #c81e1e;
    background: #fff0f8;
  }
  .eye_icon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
  }
  .loading_form {
    position: absolute;
    right: 15px;
    top: 25%;
  }
`;
