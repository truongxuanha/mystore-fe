import { ContainerFormManufacture, MainContent, TitleForm } from "./styled";
import InputDropzone from "customs/InputDropzone";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaProvider } from "utils/schema";
import Button from "customs/Button";
import { Input } from "@headlessui/react";
import { useAppDispatch } from "hooks/useAppDispatch";
import { createManufactureThunk } from "redux/manufacture/manuThunk";
type FormProvider = {
  name: string;
  phone: string;
  website?: string;
};
const FormProviderAdmin = () => {
  const [previewImage, setPreviewImage] = useState();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormProvider>({
    resolver: yupResolver(schemaProvider),
    defaultValues: {
      name: "",
      phone: "",
      website: "",
    },
  });
  const onSubmit = (formValue: FormProvider) => {
    // const callBack = () => {
    //   reset();
    // };
    dispatch(createManufactureThunk({ ...formValue, img: previewImage }));
  };
  return (
    <ContainerFormManufacture>
      <MainContent>
        <TitleForm>Thêm nhà cung cấp</TitleForm>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="col-span-2 flex items-center gap-10 w-full mt-2">
            <InputDropzone fileUploaded={previewImage} setFileUploaded={setPreviewImage} />
            {/* {errors.createAt?.message && <span className="text-red-500 text-center col-span-2">{errors.createAt.message}</span>} */}
          </div>
          <div className="flex justify-center mt-2">
            <Button width="150px" height="40px" className="bg-colorPrimary text-white" type="submit">
              Thêm
            </Button>
          </div>
        </form>
      </MainContent>
    </ContainerFormManufacture>
  );
};
export default FormProviderAdmin;
