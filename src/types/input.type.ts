export interface InputProps {
  placeholder: string;
  typeInput: string;
  valueBtn: string;
  className: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
