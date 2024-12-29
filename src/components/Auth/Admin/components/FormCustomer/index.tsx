import { Input } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import { SubmitHandler, useForm } from "react-hook-form";
import { assets } from "../../../../../assets";
import { schemaCustomer } from "../../../../../utils/schema";
import Button from "../../../../../customs/Button";
import { authCustomer } from "../../../../../redux/auth/authThunk";
import { InitialRegisterState } from "../../../../../redux/auth/type";
import { ActionAdminEnum } from "../../../../../types/admin.type";
import { useState } from "react";
import { deleteCustomerThunk, updateCustomerThunk } from "redux/admin/adminThunk";

type Props = {
  setShow: (value: boolean) => void;
  initialData?: InitialRegisterState;
  actionType?: ActionAdminEnum;
  currentPage: number;
  selectOption: any;
};

function FormCustomer({ setShow, initialData, actionType, currentPage, selectOption }: Props) {
  const [animationClass, setAnimationClass] = useState("modal-enter");
  const dispatch = useAppDispatch();
  const handleClose = () => {
    setAnimationClass("modal-exit");
    setTimeout(() => setShow(false), 300);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InitialRegisterState>({
    resolver: yupResolver(schemaCustomer) as any,
    defaultValues: initialData || {
      account_name: "",
      email: "",
      phone: "",
      birthday: null,
      full_name: "",
      sex: null,
      permission: 0,
      status: 0,
      createAt: "",
    },
  });
  const onSubmit: SubmitHandler<InitialRegisterState> = async (formValue) => {
    const callBack = () => {
      reset();
      setShow(false);
      dispatch(authCustomer({ page: currentPage, permission: selectOption }));
    };
    if (actionType === ActionAdminEnum.DELETE && formValue.id) {
      dispatch(deleteCustomerThunk({ id: formValue.id, callBack }));
      return;
    }
    if (actionType === ActionAdminEnum.EDIT && formValue.id) {
      dispatch(updateCustomerThunk({ id: formValue.id, status: formValue.status, callBack }));
      return;
    }
  };
  const isDisable = actionType === ActionAdminEnum.DELETE || actionType === ActionAdminEnum.VIEW;
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50 text-[11px]">
      <div className={`bg-white w-4/5 px-5 py-2 rounded-md flex flex-col h-[530px] ${animationClass}`}>
        <div className="border-b py-3">
          <h1 className="text-center uppercase font-medium text-xl">
            {actionType === ActionAdminEnum.ADD
              ? "Thêm tài khoản mới"
              : actionType === ActionAdminEnum.EDIT
                ? "Sửa tài khoản"
                : actionType === ActionAdminEnum.VIEW
                  ? "Thông tin tài khoản"
                  : "Xóa tài khoản"}
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-2 grid-rows-4 gap-x-5 mt-8 flex-1 overflow-hidden">
          <div className="flex flex-col gap-1">
            <div className="w-16 h-16">
              <img className="rounded-full object-cover w-full h-full" src={initialData?.avatar ?? assets.noAvatar} alt="no-avatar" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="phone">Số điện thoại</label>
            <Input className="border px-1 py-2 rounded-sm" id="phone" {...register("phone")} disabled />
            {errors.phone && <span className="text-red-500 text-[10px]">{errors.phone.message}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="account_name">Mã khách hàng</label>
            <Input className="border px-1 py-2 rounded-sm" id="account_name" {...register("id")} disabled />
            {errors.id && <span className="text-red-500 text-[10px]">{errors.id.message}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="birthday">Ngày sinh</label>
            <Input className="border px-1 py-2 rounded-sm" type="date" id="birthday" {...register("birthday")} disabled />
            {errors.birthday && <span className="text-red-500 text-[10px]">{errors.birthday.message?.toString()}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="account_name">Tên tài khoản</label>
            <Input className="border px-1 py-2 rounded-sm" id="account_name" {...register("account_name")} disabled />
            {errors.account_name && <span className="text-red-500 text-[10px]">{errors.account_name.message}</span>}
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <label>Giới tính</label>
            <div className="flex gap-5">
              <div className="flex gap-2">
                <Input
                  type="radio"
                  id="sex"
                  value={0}
                  defaultChecked={initialData?.sex === 0}
                  disabled={initialData?.sex === 1 || initialData?.sex === null}
                  className="border rounded-md p-2"
                  {...register("sex")}
                />
                <label>Nam</label>
              </div>
              <div className="flex gap-2">
                <Input
                  type="radio"
                  id="sex"
                  disabled={initialData?.sex === 0 || initialData?.sex === null}
                  defaultChecked={initialData?.sex === 1}
                  value={1}
                  className="border rounded-md p-2"
                  {...register("sex")}
                />
                <label>Nữ</label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="full_name">Họ và tên</label>
            <Input className="border px-1 py-2 rounded-sm" id="full_name" {...register("full_name")} disabled={isDisable} />
            {errors.full_name && <span className="text-red-500 text-[10px]">{errors.full_name.message}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="createAt">Ngày đăng ký</label>
            <Input className="border px-1 py-2 rounded-sm" type="date" id="createAt" {...register("createAt")} disabled />
            {errors.createAt && <span className="text-red-500 text-[10px]">{errors.createAt.message?.toString()}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <Input className="border px-1 py-2 rounded-sm" id="email" {...register("email")} disabled={isDisable} />
            {errors.email && <span className="text-red-500 text-[10px]">{errors.email.message}</span>}
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <label>Trạng thái</label>
            <div className="flex gap-5">
              <div className="flex gap-2">
                <Input
                  type="radio"
                  id="status"
                  value={0}
                  className="border rounded-md p-2"
                  defaultChecked={initialData?.status === 0}
                  disabled={isDisable && initialData?.status === 1}
                  {...register("status")}
                />
                <label>Hoạt động</label>
              </div>
              <div className="flex gap-2">
                <Input
                  type="radio"
                  id="status"
                  value={1}
                  className="border rounded-md p-2"
                  defaultChecked={initialData?.status === 1}
                  disabled={isDisable && initialData?.status === 0}
                  {...register("status")}
                />
                <label>Khóa</label>
              </div>
            </div>
          </div>
          <div className="col-span-2 border-t flex justify-end gap-2 p-5">
            {actionType === "view" ? null : (
              <Button width="150px" height="30px" type="submit" className=" bg-colorPrimary text-white rounded ">
                {actionType === "add" ? "Thêm mới" : actionType === "edit" ? "Sửa" : "Xóa"}
              </Button>
            )}
            <Button width="150px" height="30px" onClick={handleClose} type="button" className=" bg-blue-500 text-white rounded">
              Thoát
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormCustomer;
