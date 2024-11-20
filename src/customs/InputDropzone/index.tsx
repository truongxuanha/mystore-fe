import { assets } from "assets";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const InputDropzone = ({ fileUploaded, setFileUploaded, register }: any) => {
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setFileUploaded(URL.createObjectURL(file));
      }
    },
    [setFileUploaded],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });

  return (
    <div className="w-full bg-white">
      <div {...getRootProps()} className="w-full h-80 rounded-md cursor-pointer focus:outline-none flex items-center justify-center border-blue-300 border-2">
        <input className="w-full h-full" {...register("thumnai")} {...getInputProps()} />
        {fileUploaded ? (
          <img className="w-52 h-52" src={fileUploaded} alt="Uploaded preview" />
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <img className="w-20 h-20" src={assets.uploadFile} alt="Uploaded preview" />
            <p>Tải ảnh lên</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputDropzone;
