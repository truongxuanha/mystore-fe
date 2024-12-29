import { useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { EyeIcon, EyeSlashIcon, KeyIcon, UserIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { toastifySuccess, toastifyWarning } from "utils/toastify";
import { Button, Input } from "@headlessui/react";
import { schemaLogin } from "utils/schema";
import { authLogin } from "redux/auth/authThunk";
import Loader from "customs/Loader";
import { TabType } from "types";

type FormValues = {
  value: string;
  password: string;
};
type Props = {
  setTab: (tab: TabType) => void;
  tab: TabType;
};
export default function Login({ setTab, tab }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schemaLogin),
  });

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { error, loading } = useAppSelector((state) => state.auth);
  const [show, setShow] = useState<boolean>(false);
  const from = location.state?.from.pathname || "/";

  const onSubmit: SubmitHandler<FormValues> = async (formValues) => {
    const actionResult = await dispatch(authLogin(formValues));
    if (authLogin.rejected.match(actionResult)) {
      toastifyWarning((actionResult.payload as string) || "Đăng nhập thất bại!");
      return;
    }
    navigate(from, { replace: true });
    toastifySuccess("Đăng nhập thành công!");
  };
  function handleShowPass() {
    setShow((show) => !show);
  }

  if (loading) return <Loader />;
  return (
    <div
      style={{ transition: "transform 0.3s ease-in-out", transform: `translateX(${tab === TabType.LOGIN ? "0%" : "200%"})` }}
      className="bg-white shadow-xl h-full absolute right-0 px-5 w-full"
    >
      <div className="flex flex-col justify-center h-full">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-gray-900 mb-10">Đăng nhập</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
          <div className="mx-3">
            <label htmlFor="value" className="block text-sm font-medium leading-6 text-gray-900">
              Tài khoản
            </label>
            <div className="h-10">
              <div className="input-global flex">
                <div className="bg-slate-300 h-full flex items-center px-3">
                  <UserIcon width={20} height={20} className="" />
                </div>
                <Input
                  id="value"
                  type="text"
                  className="flex-1 h-full px-2 border"
                  placeholder="Tên đăng nhập / Email / Số điện thoại"
                  {...register("value")}
                />
              </div>
              {errors.value && <p className="text-red-500 text-sm mt-1 text-nowrap">{errors.value.message}</p>}
            </div>
          </div>

          <div className="mx-3">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Mật khẩu
              </label>
              <div className="text-sm" onClick={() => setTab(TabType.FORPASSWORD)}>
                <span className="font-semibold text-orange-600 hover:text-orange-500 underline cursor-pointer">Quên mật khẩu?</span>
              </div>
            </div>
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
          <div className="flex justify-end mr-2">
            <Button
              type="submit"
              className="w-[100px] text-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              Đăng nhập
            </Button>
          </div>

          {error && <div className="text-red-500 text-center mt-4">{error}</div>}
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Chưa có tài khoản?
          <div onClick={() => setTab(TabType.REGISTER)} className="font-semibold leading-6 text-orange-600 hover:text-orange-500 underline cursor-pointer">
            Đăng ký
          </div>
        </p>
      </div>
    </div>
  );
}
