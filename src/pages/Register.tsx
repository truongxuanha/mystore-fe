import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, InputEvent } from "../types/EventValidate.type";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import { authRegister } from "../services/AuthServices";
import { InitialRegisterState } from "../types/UserType.type";
import Loader from "./Loader";
import { useSnackbar } from "notistack";
import { unwrapResult } from "@reduxjs/toolkit";
import getTime from "../utils/timeNow";

const initialState: InitialRegisterState = {
  account_name: "",
  email: "",
  phone: "",
  password: "",
  permission: 1,
  createAt: getTime(),
};

export default function Regiter() {
  const [formValue, setFormValue] = useState(initialState);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const { account_name, email, phone, password } = formValue;
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  function handleOnChange(e: InputEvent) {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const action = authRegister(formValue);
      const resultsAction = await dispatch(action);
      const user = unwrapResult(resultsAction);
      console.log(user);
      if (user.status === true) navigate("/login");
      enqueueSnackbar("Register successfully!!!");
    } catch (error) {
      console.log("False");
    }
  }
  return (
    <>
      {loading === "pending" ? <Loader /> : ""}
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Đăng ký
          </h2>
        </div>

        <div className='mt-5 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form
            action='#'
            onSubmit={handleSubmit}
            method='POST'
            className='space-y-6'
          >
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                User name
              </label>
              <div className='mt-2'>
                <input
                  id='account_name'
                  name='account_name'
                  type='text'
                  value={account_name}
                  onChange={handleOnChange}
                  required
                  className='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-orange-300 placeholder:text-gray-400 focus:ring-1 focus:ring-orange-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Phone Number
              </label>
              <div className='mt-2'>
                <input
                  id='phone'
                  name='phone'
                  type='tel'
                  value={phone}
                  onChange={handleOnChange}
                  required
                  className='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-orange-300 placeholder:text-gray-400 focus:ring-1 focus:ring-orange-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  value={email}
                  onChange={handleOnChange}
                  required
                  autoComplete='email'
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
                  Password
                </label>
                <div className='text-sm'>
                  <a
                    href='#'
                    className='font-semibold text-orange-600 hover:text-orange-500'
                  >
                    Forgot password?
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
                  autoComplete='current-password'
                  className='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-orange-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
              >
                Sign in
              </button>
            </div>
          </form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Yours account?{" "}
            <Link
              to='/login'
              className='font-semibold leading-6 text-orange-600 hover:text-orange-500 underline'
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
