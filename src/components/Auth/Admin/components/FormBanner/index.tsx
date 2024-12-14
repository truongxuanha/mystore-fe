import { XMarkIcon } from "@heroicons/react/24/outline";
import Input from "customs/Input";
import InputDropzone from "customs/InputDropzone";
import { useState } from "react";
type Props = {
  setShowModal: (modal: boolean) => void;
};
const FormBanner = ({ setShowModal }: Props) => {
  const [fileImage, setFileImage] = useState<string | undefined>(undefined);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
      <div className="bg-white w-[500px] relative">
        <h1 className="text-center py-3 mb-5 border-b-2">Thêm mới Banner</h1>
        <div className="pb-5 px-5">
          <div>
            <span className="block my-2">Đường dẫn</span>
            <Input />
          </div>
          <div className="mt-5">
            <InputDropzone fileUploaded={fileImage} setFileUploaded={setFileImage} />
          </div>
        </div>
        <button className="bg-blue-500 float-end mx-5 mb-3 px-3 py-1 text-white">Thêm</button>
        <XMarkIcon onClick={() => setShowModal(false)} width={50} height={50} className="absolute -top-12 -right-9 cursor-pointer text-white" />
      </div>
    </div>
  );
};

export default FormBanner;
