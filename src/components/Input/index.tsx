import { InputProps } from "../../types/AllType.type";

function Input({ placeholder, type, value, onChange }: InputProps) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      className={`input-global ${type}`}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
