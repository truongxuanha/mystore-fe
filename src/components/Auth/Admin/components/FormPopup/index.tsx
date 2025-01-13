import { XMarkIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import InputDropzone from "customs/InputDropzone";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createPopupThunk, getPopupThunk, updatePopupThunk } from "redux/home/homeThunk";
import { schemaCreatePopup } from "utils/schema";
import { toastifyWarning } from "utils/toastify";

type FormData = {
  url_transit: string;
};

type Props = {
  setShowModal: (modal: boolean) => void;
  isEdit: boolean;
  popupData?: {
    popup_id: number;
    url_transit: string;
    popup_img: any;
  };
};

const FormPopup = ({ setShowModal, isEdit, popupData }: Props) => {
  const [fileImage, setFileImage] = useState<any>(popupData?.popup_img || "");
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaCreatePopup),
    defaultValues: isEdit ? { url_transit: popupData?.url_transit || "" } : { url_transit: "" },
  });

  const callBack = () => {
    dispatch(getPopupThunk());
    setShowModal(false);
  };
  const handleCreateBanner = async (data: FormData) => {
    if (!fileImage) {
      toastifyWarning("Vui lòng chọn một file ảnh.");
      return;
    }
    dispatch(
      createPopupThunk({
        popup_img: fileImage,
        url_transit: data.url_transit,
        callBack,
      }),
    );
  };

  const handleUpdateBanner = async (data: FormData) => {
    dispatch(
      updatePopupThunk({
        popup_id: popupData?.popup_id || 0,
        popup_img: fileImage || popupData?.popup_img,
        url_transit: data.url_transit,
        callBack,
      }),
    );
  };

  const onSubmit = isEdit ? handleUpdateBanner : handleCreateBanner;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
      <div className="bg-white w-[500px] relative rounded-lg shadow-lg">
        <h1 className="text-center py-3 mb-5 border-b-2 text-lg font-semibold">{isEdit ? "Chỉnh sửa Banner" : "Thêm mới Banner"}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="pb-5 px-5">
          <div>
            <label htmlFor="url_transit" className="block my-2 font-medium">
              Đường dẫn
            </label>
            <input className="border w-full py-1 px-2" id="url_transit" {...register("url_transit")} placeholder="Nhập đường dẫn..." />
            {errors.url_transit && <p className="text-red-500 text-sm mt-1">{errors.url_transit.message}</p>}
          </div>
          <div className="mt-5">
            <label className="block my-2 font-medium">Ảnh</label>
            <InputDropzone fileUploaded={fileImage} setFileUploaded={setFileImage} />
          </div>
          <div className="flex justify-end mt-5">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition">
              {isEdit ? "Cập nhật" : "Thêm"}
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

export default FormPopup;
