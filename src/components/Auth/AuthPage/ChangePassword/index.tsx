import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { EyeIcon, EyeSlashIcon, KeyIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { toastifySuccess, toastifyWarning } from "utils/toastify";
import { Button, Input } from "@headlessui/react";
import { schemaResetPassword } from "utils/schema";
import { authLogin, authResetPasswordThunk } from "redux/auth/authThunk";
import Loader from "customs/Loader";
import { TabType } from "types";

type FormValues = {
  password: string;
  confirm_password: string;
};
type Props = {
  setTab: (tab: TabType) => void;
  tab: TabType;
};
export default function ChangePassword({ setTab, tab }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schemaResetPassword),
  });

  const dispatch = useAppDispatch();
  const { verifyOtp } = useAppSelector((state) => state.auth);
  const { error, loading } = useAppSelector((state) => state.auth);
  const [show, setShow] = useState<boolean>(false);
  const [showComfirm, setShowComfirm] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormValues> = async (formValues) => {
    const actionResult = await dispatch(authResetPasswordThunk({ password: formValues.password, token: verifyOtp?.token, email: verifyOtp?.email }));
    if (authLogin.rejected.match(actionResult)) {
      toastifyWarning((actionResult.payload as string) || "Đăng nhập thất bại!");
      return;
    }
    setTab(TabType.LOGIN);
    toastifySuccess("Đổi mật khẩu thành công!");
  };
  function handleShowPass() {
    setShow((show) => !show);
  }
  if (loading) return <Loader />;
  return (
    <div
      style={{ transition: "transform 0.3s ease-in-out", transform: `translateX(${tab === TabType.CHANGEPASSWORD ? "0%" : "200%"})` }}
      className="bg-white shadow-xl h-full absolute right-0 px-5 w-full"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-12 mb-5">
        <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-gray-900">Thay đổi mật khẩu</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
        <div className="mx-3">
          <label htmlFor="value" className="block text-sm font-medium leading-6 text-gray-900">
            Mật khẩu mới
          </label>
          <div className="h-10">
            <div className="input-global flex mr-2">
              <div className="bg-slate-300 h-full flex items-center px-3">
                <KeyIcon width={20} height={20} className="" />
              </div>
              <Input
                id="password"
                type={`${show ? "text" : "password"}`}
                className="flex-1 h-full px-2 border border-r-0"
                placeholder="Mật khẩu..."
                autoComplete="current-password"
                {...register("password")}
              />
              <span onClick={handleShowPass} className="mx-2">
                {show ? <EyeIcon className="w-4 h-4 cursor-pointer" /> : <EyeSlashIcon className="w-4 h-4 cursor-pointer" />}
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
        </div>

        <div className="mx-3">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Nhập lại mật khẩu
            </label>
          </div>
          <div className="h-10">
            <div className="input-global flex mr-2">
              <div className="bg-slate-300 h-full flex items-center px-3">
                <KeyIcon width={20} height={20} className="" />
              </div>
              <Input
                id="password"
                type={`${showComfirm ? "text" : "password"}`}
                className="flex-1 h-full px-2 border border-r-0"
                placeholder="Mật khẩu..."
                autoComplete="current-password"
                {...register("confirm_password")}
              />
              <span onClick={() => setShowComfirm(!showComfirm)} className="mx-2">
                {showComfirm ? <EyeIcon className="w-4 h-4 cursor-pointer" /> : <EyeSlashIcon className="w-4 h-4 cursor-pointer" />}
              </span>
            </div>
            {errors.confirm_password && <p className="text-red-500 text-sm mt-1">{errors.confirm_password.message}</p>}
          </div>
        </div>
        <div className="flex justify-center mr-2">
          <Button
            type="submit"
            className="text-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            Đổi mật khẩu
          </Button>
        </div>

        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
      </form>
    </div>
  );
}
