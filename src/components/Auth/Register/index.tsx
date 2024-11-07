import Loader from "../../Loader/";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppDispatch";

import { Link, useNavigate } from "react-router-dom";
import { authRegister } from "../../../redux/reducer/userReducer/authThunk";

import { toastifySuccess, toastifyWarning } from "../../../utils/toastify";
import { Button, Input } from "@headlessui/react";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InitialRegisterState } from "api/register/type";
import { schemaRegister } from "../../../utils/schema";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InitialRegisterState>({
    resolver: yupResolver(schemaRegister) as any,
    defaultValues: {
      account_name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<InitialRegisterState> = async (formValue) => {
    const resultsAction = await dispatch(authRegister(formValue));

    if (authRegister.rejected.match(resultsAction)) {
      toastifyWarning((resultsAction.payload as string) || "Đăng ký không thành công!");
      return;
    }
    navigate("/dang-nhap");
    toastifySuccess("Đăng ký thành công!");
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm shadow-xl p-5 rounded-lg bg-white">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-gray-900">Đăng ký</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label htmlFor="account_name" className="block text-sm font-medium leading-6 text-gray-900">
                Tên tài khoản
              </label>
              <div className="mt-2">
                <Input
                  id="account_name"
                  {...register("account_name")}
                  type="text"
                  placeholder="Tên tài khoản"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-orange-300 placeholder:text-gray-400 focus:ring-1 focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
                {errors.account_name && <p className="text-red-500 text-sm mt-1">{errors.account_name.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Số điện thoại
              </label>
              <div className="mt-2">
                <Input
                  id="phone"
                  {...register("phone")}
                  type="tel"
                  placeholder="Số điện thoại"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-orange-300 placeholder:text-gray-400 focus:ring-1 focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <Input
                  id="email"
                  {...register("email")}
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-orange-300 placeholder:text-gray-400 focus:ring-1 focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Mật khẩu
                </label>
              </div>
              <div className="mt-2">
                <Input
                  id="password"
                  {...register("password")}
                  type="password"
                  placeholder="Mật khẩu"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-orange-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>
            </div>

            <div className="flex justify-end mr-2">
              <Button
                type="submit"
                className="w-[100px] text-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                Đăng Ký
              </Button>
            </div>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            Đã có tài khoản?{" "}
            <Link to="/dang-nhap" className="font-semibold leading-6 text-orange-600 hover:text-orange-500 underline">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
