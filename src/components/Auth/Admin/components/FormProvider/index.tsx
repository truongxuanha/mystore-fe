import { ContainerFormManufacture, MainContent, TitleForm } from "./styled";
import InputDropzone from "customs/InputDropzone";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaProvider } from "utils/schema";
import Button from "customs/Button";
import { Input } from "@headlessui/react";
import { useAppDispatch } from "hooks/useAppDispatch";
import { createManufactureThunk, getAllManuThunk, removeProviderThunk, updateManufactureThunk } from "redux/manufacture/manuThunk";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ActionAdminEnum } from "types/admin.type";
import useSearchParamsPageAndQuery from "hooks/useSearchParamsPageAndQuey";
type FormProvider = {
  name: string;
  phone: string;
  website?: string | null;
};
type Props = {
  setShow: (show: boolean) => void;
  actionType?: ActionAdminEnum;
  currentProvider: any;
};
const FormProviderAdmin = ({ setShow, actionType, currentProvider }: Props) => {
  const [previewImage, setPreviewImage] = useState(currentProvider.img || "");
  const { currentPage, searchQuery } = useSearchParamsPageAndQuery();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormProvider>({
    resolver: yupResolver(schemaProvider),
    defaultValues: currentProvider || {
      name: "",
      phone: "",
      website: "",
    },
  });
  const onSubmit = (formValue: FormProvider) => {
    const callBack = () => {
      dispatch(getAllManuThunk({ item: 5, page: currentPage, query: searchQuery }));
      setShow(false);
      reset();
    };
    if (actionType === ActionAdminEnum.ADD) {
      dispatch(createManufactureThunk({ ...formValue, img: previewImage, callBack }));
      return;
    }
    if (actionType === ActionAdminEnum.EDIT) {
      dispatch(updateManufactureThunk({ id: currentPage, ...formValue, img: previewImage, callBack }));
      return;
    }
    if (actionType === ActionAdminEnum.DELETE) {
      dispatch(removeProviderThunk({ id: currentProvider.id, callBack }));
      return;
    }
  };
  return (
    <ContainerFormManufacture>
      <MainContent>
        <TitleForm>Thêm nhà cung cấp</TitleForm>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-5">
          <div>
            <div className="flex flex-col">
              <label>Tên nhà cung cấp</label>
              <Input className="border p-1 rounded my-1 " id="name" {...register("name")} />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>
            <div className="flex flex-col">
              <label>Số điện thoại</label>
              <Input className="border p-1 rounded my-1" id="phone" {...register("phone")} />
              {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
            </div>
            <div className="flex flex-col">
              <label>Website</label>
              <Input className="border p-1 rounded my-1" id="website" {...register("website")} />
              {errors.website && <span className="text-red-500 text-sm">{errors.website.message}</span>}
            </div>
          </div>

          <div className="flex flex-col gap-10 mt-2">
            <InputDropzone fileUploaded={previewImage} setFileUploaded={setPreviewImage} />
            {/* {errors.createAt?.message && <span className="text-red-500 text-center col-span-2">{errors.createAt.message}</span>} */}
            <div className="flex justify-end">
              {actionType !== ActionAdminEnum.VIEW && (
                <Button width="150px" height="40px" className="bg-colorPrimary text-white" type="submit">
                  {actionType === "add" ? "Thêm mới" : actionType === "edit" ? "Sửa" : "Xóa"}
                </Button>
              )}
            </div>
          </div>
        </form>
        <XMarkIcon onClick={() => setShow(false)} width={50} height={50} className="absolute -top-12 right-0 cursor-pointer" color="white" />
      </MainContent>
    </ContainerFormManufacture>
  );
};
export default FormProviderAdmin;
