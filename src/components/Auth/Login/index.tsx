import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAppDispatch, useAppSelector } from "../../../hooks/useAppDispatch";
import { authLogin } from "../../../services/authService";
import Loader from "../../Loader";
import { toastifySuccess, toastifyWarning } from "../../../utils/toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Input } from "@headlessui/react";

interface FormValues {
  value: string;
  password: string;
}

const schema = yup.object().shape({
  value: yup
    .string()
    .required("Vui lòng nhập tên đăng nhập, email hoặc số điện thoại."),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu.")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { error, loading } = useAppSelector((state) => state.auth);

  const onSubmit: SubmitHandler<FormValues> = async (formValues) => {
    try {
      const action = authLogin(formValues);
      const resultsAction = await dispatch(action);
      const user = unwrapResult(resultsAction);

      if (user.status === false) throw new Error(user.data);

      navigate("/san-pham");
      toastifySuccess("Đăng nhập thành công!");
      toastifySuccess("Xin chào Anh Đẹp Troai!");
    } catch (error) {
      toastifyWarning(`${error}`);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Đăng nhập
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm shadow-xl p-6 rounded-md'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
            <div>
              <label
                htmlFor='value'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Tài khoản
              </label>
              <div className='mt-2'>
                <input
                  id='value'
                  type='text'
                  placeholder='Tên đăng nhập / Email / Số điện thoại'
                  {...register("value")}
                  className='input-global'
                />
                {errors.value && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.value.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Mật khẩu
                </label>
                <div className='text-sm'>
                  <a
                    href='#'
                    className='font-semibold text-orange-600 hover:text-orange-500 underline'
                  >
                    Quên mật khẩu?
                  </a>
                </div>
              </div>
              <div className='mt-2'>
                <Input
                  id='password'
                  type='password'
                  placeholder='Mật khẩu...'
                  autoComplete='current-password'
                  {...register("password")}
                  className='input-global'
                />
                {errors.password && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div className='flex justify-end mr-2'>
              <Button
                type='submit'
                className='w-[100px] text-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
              >
                Đăng nhập
              </Button>
            </div>

            {error && (
              <div className='text-red-500 text-center mt-4'>{error}</div>
            )}
          </form>

          <p className='mt-5 text-center text-sm text-gray-500'>
            Chưa có tài khoản?{" "}
            <Link
              to='/dang-ky'
              className='font-semibold leading-6 text-orange-600 hover:text-orange-500 underline'
            >
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
