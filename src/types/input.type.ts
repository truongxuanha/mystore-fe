export type InputProps = {
  placeholder: string;
  typeInput: string;
  valueBtn: string;
  className: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export type FileType = "img" | "csv";

export type FilesType = {
  file?: File;
  url?: string;
  name?: string;
  id?: number;
};
