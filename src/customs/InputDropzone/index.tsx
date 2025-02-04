import { XMarkIcon } from "@heroicons/react/24/outline";
import { assets } from "assets";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  register?: any;
  setFileUploaded: (file: any) => void;
  fileUploaded: any;
};

const InputDropzone = ({ fileUploaded, setFileUploaded }: Props) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setFileUploaded(file);
      }
    },
    [setFileUploaded],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });

  const handleRemoveFile = () => {
    setFileUploaded(null);
  };

  return (
    <div className="w-full h-full relative bg-white">
      {fileUploaded && (
        <button
          type="button"
          onClick={handleRemoveFile}
          className="absolute top-5 z-50 right-5 text-white rounded-full w-6 h-6 flex items-center justify-center"
        >
          <XMarkIcon width={50} height={50} className="text-black" />
        </button>
      )}
      <div
        {...getRootProps()}
        className="hover:opacity-50 w-full min-h-48 rounded-md cursor-pointer focus:outline-none flex items-center justify-center border-blue-300 border-2"
      >
        <input className="w-full h-full" {...getInputProps()} />
        {fileUploaded ? (
          <div className="relative h-52">
            <img
              className="w-full h-full object-contain"
              src={fileUploaded instanceof File ? URL.createObjectURL(fileUploaded) : fileUploaded}
              alt="Uploaded preview"
            />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <img className="w-20 h-20" src={assets.uploadFile} alt="Upload icon" />
            <p>Tải ảnh lên</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputDropzone;
