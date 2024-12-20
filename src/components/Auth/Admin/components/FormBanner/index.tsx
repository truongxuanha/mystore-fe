import { XMarkIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "customs/Input";
import InputDropzone from "customs/InputDropzone";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createBannerThunk } from "redux/admin/adminThunk";
import { getBannersThunk } from "redux/home/homeThunk";
import { schemaCreateBanner } from "utils/schema";
import { toastifyWarning } from "utils/toastify";

type FormData = {
  path?: string; // Define the form fields explicitly
};

type Props = {
  setShowModal: (modal: boolean) => void;
};

const FormBanner = ({ setShowModal }: Props) => {
  const [fileImage, setFileImage] = useState<File>();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaCreateBanner),
  });
  const callBack = () => {
    dispatch(getBannersThunk());
    setShowModal(false);
  };
  const handleCreateBanner = async (data: FormData) => {
    if (!fileImage) {
      toastifyWarning("Vui lòng chọn một file ảnh.");
      return;
    }
    await dispatch(
      createBannerThunk({
        image: fileImage,
        path: data.path,
        callBack,
      }),
    );
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
      <div className="bg-white w-[500px] relative rounded-lg shadow-lg">
        <h1 className="text-center py-3 mb-5 border-b-2 text-lg font-semibold">Thêm mới Banner</h1>
        <form onSubmit={handleSubmit(handleCreateBanner)} className="pb-5 px-5">
          <div>
            <label htmlFor="path" className="block my-2 font-medium">
              Đường dẫn
            </label>
            <Input id="path" {...register("path")} placeholder="Nhập đường dẫn..." />
            {errors.path && <p className="text-red-500 text-sm mt-1">{errors.path.message}</p>}
          </div>
          <div className="mt-5">
            <label className="block my-2 font-medium">Ảnh</label>
            <InputDropzone fileUploaded={fileImage} setFileUploaded={setFileImage} />
          </div>
          <div className="flex justify-end mt-5">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition">
              Thêm
            </button>
          </div>
        </form>
        <XMarkIcon
          onClick={() => setShowModal(false)}
          width={30}
          height={30}
          className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-700"
        />
      </div>
    </div>
  );
};

export default FormBanner;
