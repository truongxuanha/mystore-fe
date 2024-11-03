import { Input } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { InitialRegisterState } from "api/register/type";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { SubmitHandler, useForm } from "react-hook-form";
import { authRegister } from "../../../redux/reducer/userReducer/authThunk";
import { toastifySuccess, toastifyWarning } from "../../../utils/toastify";
import { assets } from "../../../assets";
import ImageLazy from "../../../customs/ImageLazy";
import { schemaRegister } from "../../../utils/schema";
import Button from "../../../customs/Button";

type Props = {
  setShow: (value: boolean) => void;
};
function FormAddStafAdmin({ setShow }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InitialRegisterState>({
    resolver: yupResolver(schemaRegister) as any,
    defaultValues: {
      account_name: "",
      email: "",
      phone: "",
      birthday: null,
      password: "Mystore@123",
      full_name: "",
      sex: 0,
      permission: 0,
    },
  });

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<InitialRegisterState> = async (formValue) => {
    const resultsAction = await dispatch(authRegister(formValue));

    if (authRegister.rejected.match(resultsAction)) {
      toastifyWarning((resultsAction.payload as string) || "Thêm tài khoản thất bại!");
      return;
    }
    reset({
      account_name: "",
      email: "",
      phone: "",
      birthday: "",
      password: "Mystore@123",
      full_name: "",
      sex: 0,
      permission: 0,
    });
    setShow(false);
    toastifySuccess("Thêm tài khoản thành công!");
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
      <div className="bg-white w-4/5 p-5 rounded-md flex flex-col">
        <div className="border-b pb-3">
          <h1 className="text-center uppercase">Thêm tài khoản mới</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-2 grid-rows-4 mt-8 flex-1 overflow-hidden">
          <div className="flex flex-col gap-2">
            <div className="w-8 h-full">
              <ImageLazy className="rounded-full" src={assets.noAvatar} alt="no-avatar" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Số điện thoại</label>
            <Input className="border px-1 py-1 rounded-sm" id="phone" {...register("phone")} />
            {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="account_name">Tên tài khoản</label>
            <Input className="border px-1 py-1 rounded-sm" id="account_name" {...register("account_name")} />
            {errors.account_name && <span className="text-red-500">{errors.account_name.message}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="birthday">Ngày sinh</label>
            <Input className="border px-1 py-1 rounded-sm" type="date" id="birthday" {...register("birthday")} />
            {errors.birthday && <span className="text-red-500">{errors.birthday.message?.toString()}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="full_name">Họ và tên</label>
            <Input className="border px-1 py-1 rounded-sm" id="full_name" {...register("full_name")} />
            {errors.full_name && <span className="text-red-500">{errors.full_name.message}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <Input className="border px-1 py-1 rounded-sm" id="email" {...register("email")} />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label>Giới tính</label>
            <div className="flex gap-5">
              <div className="flex gap-2">
                <Input type="radio" value="male" className="border rounded-md p-2" {...register("sex")} />
                <label>Nam</label>
              </div>
              <div className="flex gap-2">
                <Input type="radio" value="female" className="border rounded-md p-2" {...register("sex")} />
                <label>Nữ</label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label>Chức vụ</label>
            <div className="flex gap-5">
              <div className="flex gap-2">
                <Input type="radio" value="0" className="border rounded-md p-2" {...register("sex")} />
                <label>Quản lý</label>
              </div>
              <div className="flex gap-2">
                <Input type="radio" value="1" className="border rounded-md p-2" {...register("sex")} />
                <label>Nhân viên</label>
              </div>
            </div>
          </div>
          <div className="col-span-2 border-t flex justify-end gap-2 p-5">
            <Button width="150px" height="30px" type="submit" styles=" bg-colorPrimary text-white rounded ">
              Thêm mới
            </Button>
            <Button width="150px" height="30px" onClick={() => setShow(false)} type="button" styles=" bg-blue-500 text-white rounded">
              Thoát
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormAddStafAdmin;
