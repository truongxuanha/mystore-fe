import { InputProps } from "../../types/AllType.type";

function Input({ placeholder, type, value, onChange, className }: InputProps) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      className={`input-global ${className}`}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
