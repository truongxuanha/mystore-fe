import { useAppDispatch, useAppSelector } from "../../../../hooks/useAppDispatch";
import { authRegister } from "../../../../redux/auth/authThunk";
import { toastifySuccess } from "../../../../utils/toastify";
import { Button, Input } from "@headlessui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegisterUser } from "../../../../utils/schema";
import { InitialRegisterState } from "../../../../redux/auth/type";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, KeyIcon, PhoneIcon, UserIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { TabType } from "types";
import LoadingMini from "customs/LoadingMini";

type Props = {
  setTab: (tab: TabType) => void;
  tab: TabType;
};

export default function Register({ setTab, tab }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InitialRegisterState>({
    resolver: yupResolver(schemaRegisterUser) as any,
    defaultValues: {
      account_name: "",
      email: "",
      phone: "",
      password: "",
    },
  });
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [show, setShow] = useState<boolean>(false);
  function handleShowPass() {
    setShow((show) => !show);
  }
  const callBack = () => {
    setTab(TabType.LOGIN);
    toastifySuccess("Đăng ký thành công!");
  };
  const onSubmit: SubmitHandler<InitialRegisterState> = async (formValue) => {
    dispatch(authRegister({ account_name: formValue.account_name, email: formValue.email, password: formValue.password, phone: formValue.phone, callBack }));
  };

  return (
    <div
      style={{ transition: "transform 0.5s ease-in-out", transform: `translateX(${tab === TabType.REGISTER ? "0%" : "200%"})` }}
      className="bg-white shadow-xl absolute h-full right-0 px-5 py-2 w-full"
    >
      <div className="flex flex-col justify-center h-full">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-gray-900">Đăng ký</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="account_name" className="block text-sm font-medium leading-6 text-gray-900">
              Tên tài khoản
            </label>
            <div className="h-10">
              <div className="input-global flex gap-2 pr-2">
                <div className="bg-slate-300 h-full flex items-center px-3">
                  <UserIcon width={20} height={20} className="" />
                </div>
                <Input id="account_name" className="w-full" {...register("account_name")} type="text" placeholder="Tên tài khoản" />
              </div>
              {errors.account_name && <p className="text-red-500 ml-12 text-sm mt-1">{errors.account_name.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
              Số điện thoại
            </label>
            <div className="h-10">
              <div className="input-global flex gap-2 pr-2">
                <div className="bg-slate-300 h-full flex items-center px-3">
                  <PhoneIcon width={20} height={20} className="" />
                </div>
                <Input id="phone" {...register("phone")} type="tel" placeholder="Số điện thoại" className="w-full" />
              </div>
              {errors.phone && <p className="text-red-500 ml-12 text-sm mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="h-10">
              <div className="input-global flex gap-2 pr-2">
                <div className="bg-slate-300 h-full flex items-center px-3">
                  <EnvelopeIcon width={20} height={20} className="" />
                </div>
                <Input id="email" {...register("email")} type="email" placeholder="Email" autoComplete="email" className="w-full" />
              </div>
              {errors.email && <p className="text-red-500 ml-12 text-sm mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Mật khẩu
              </label>
            </div>
            <div className="h-10">
              <div className="input-global flex gap-2 pr-2">
                <div className="bg-slate-300 h-full flex items-center px-3">
                  <KeyIcon width={20} height={20} className="" />
                </div>
                <Input
                  id="password"
                  {...register("password")}
                  type={`${show ? "text" : "password"}`}
                  placeholder="Mật khẩu"
                  autoComplete="current-password"
                  className="w-full"
                />
                <span onClick={handleShowPass} className="mx-2">
                  {show ? <EyeIcon className="w-4 h-4 cursor-pointer" /> : <EyeSlashIcon className="w-4 h-4 cursor-pointer" />}
                </span>
              </div>
              {errors.password && <p className="text-red-500 ml-12  text-sm mt-1">{errors.password.message}</p>}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="confirm_password" className="block text-sm font-medium leading-6 text-gray-900">
                Nhập lại mật khẩu
              </label>
            </div>
            <div className="h-10">
              <div className="input-global flex gap-2 pr-2">
                <div className="bg-slate-300 h-full flex items-center px-3">
                  <KeyIcon width={20} height={20} className="" />
                </div>
                <Input
                  id="confirm_password"
                  {...register("confirm_password")}
                  type={`${show ? "text" : "password"}`}
                  placeholder="Mật khẩu"
                  autoComplete="current-password"
                  className="w-full"
                />
                <span onClick={handleShowPass} className="mx-2">
                  {show ? <EyeIcon className="w-4 h-4 cursor-pointer" /> : <EyeSlashIcon className="w-4 h-4 cursor-pointer" />}
                </span>
              </div>
              {errors.confirm_password && <p className="text-red-500 ml-12  text-sm mt-1">{errors.confirm_password.message}</p>}
            </div>
          </div>
          <div className="flex justify-end mr-2">
            <Button
              type="submit"
              className="w-[100px] h-8 flex items-center justify-center text-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              {loading ? <LoadingMini /> : <span>Đăng Ký</span>}
            </Button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500">
          Đã có tài khoản?{" "}
          <div onClick={() => setTab(TabType.LOGIN)} className="font-semibold leading-6 text-orange-600 hover:text-orange-500 underline cursor-pointer">
            Đăng nhập
          </div>
        </p>
      </div>
    </div>
  );
}
