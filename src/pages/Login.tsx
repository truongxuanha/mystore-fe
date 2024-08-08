import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, InputEvent } from "../types/EventValidate.type";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import { authLogin } from "../services/AuthServices";
import Loader from "./Loader";

interface FormValues {
  value: string;
  password: string;
}

export default function Login() {
  const [formValues, setFormValues] = useState<FormValues>({
    value: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const { value, password } = formValues;

  function handleOnChange(e: InputEvent) {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await dispatch(authLogin({ value, password }))
      .then((res) => {
        if (res.payload.status === true) {
          navigate("/");
          localStorage.setItem(
            "currentUser",
            JSON.stringify(res.payload.data) ?? null
          );
        } else {
          alert(res.payload.data[1]);
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  }

  return (
    <>
      {loading === "pending" ? <Loader /> : ""}
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Đăng nhập
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm shadow-xl p-6 rounded-md'>
          <form onSubmit={handleSubmit} className='space-y-3'>
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
                  name='value'
                  type='text'
                  value={value}
                  placeholder='Tên đăng nhập / Email / Số điện thoại'
                  onChange={handleOnChange}
                  required
                  className='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-orange-300 placeholder:text-gray-400 focus:ring-1 focus:ring-orange-600 sm:text-sm sm:leading-6'
                />
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
                <input
                  id='password'
                  name='password'
                  type='password'
                  value={password}
                  onChange={handleOnChange}
                  required
                  placeholder='Mật khẩu...'
                  autoComplete='current-password'
                  className='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-orange-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div className='flex justify-end mr-2'>
              <button
                type='submit'
                className='w-[100px] text-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
              >
                Đăng nhập
              </button>
            </div>

            {error && (
              <div className='text-red-500 text-center mt-4'>{error}</div>
            )}
          </form>

          <p className='mt-5 text-center text-sm text-gray-500'>
            Chưa có tài khoản?{" "}
            <Link
              to='/register'
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
