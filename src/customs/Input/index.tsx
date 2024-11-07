import { FC, InputHTMLAttributes, useRef, useState } from "react";
import { CSSProperties } from "styled-components";
import { InputWrapper } from "./Input.styled";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  type?: string;
  loading?: boolean;
  isEmployee?: boolean;
  isDisable?: boolean;
  needHandleErrorAutoFillByChrome?: boolean;
  removeBorder?: boolean;
}

const Input: FC<InputProps> = ({
  isError = false,
  type = "text",
  loading = false,
  isEmployee = false,
  isDisable = false,
  needHandleErrorAutoFillByChrome = false,
  removeBorder = true,
  ...otherProps
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>(type);

  const style: CSSProperties = isEmployee
    ? {
        paddingRight: "11px",
        WebkitTapHighlightColor: "transparent",
        WebkitAppearance: "none",
        appearance: "none",
        outline: "none",
      }
    : { paddingRight: "11px" };
  if (type === "password") {
    style.paddingRight = "50px";
  }
  if (isDisable && removeBorder) {
    style.backgroundColor = "#fff";
    style.border = "none";
  }
  if (isDisable && !removeBorder) {
    style.backgroundColor = "rgb(221 221 221)";
  }

  return (
    <InputWrapper>
      <input
        {...otherProps}
        type={inputType}
        ref={inputRef}
        disabled={isDisable}
        className={`s-14 regular text-black ${otherProps.className ? otherProps.className : ""} ${isError ? "error" : ""} webkit-autofill`}
        style={style}
      />

      {showPassword && type === "password" && (
        <EyeIcon
          className="eye_icon text-grey clickable"
          onClick={() => {
            setShowPassword(!showPassword);
            setInputType("password");
          }}
        />
      )}
      {!showPassword && type === "password" && (
        <EyeSlashIcon
          className="eye_icon text-grey clickable"
          onClick={() => {
            if (inputRef.current && inputRef.current?.value !== "" && needHandleErrorAutoFillByChrome && isEmployee) {
              inputRef.current.value = inputRef.current.value;
            }
            setShowPassword(!showPassword);
            setInputType("text");
          }}
        />
      )}
    </InputWrapper>
  );
};

export default Input;
