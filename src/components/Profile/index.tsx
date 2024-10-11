import { UserCircleIcon } from "@heroicons/react/24/outline";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { authProfle } from "../../redux/reducer/userReducer/authThunk";

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { infoUser } = useAppSelector((state) => state.auth);
  const { account_name, email, phone } = infoUser;
  
  useEffect(() => {
    dispatch(authProfle());
  }, [dispatch]);
  return (
    <div className='flex max-w-4xl mx-auto mt-8'>
      <div className='w-1/4 bg-gray-100 p-4 rounded-l-lg shadow-md'>
        <div className='text-center mb-6'>
          <UserCircleIcon className='w-24 h-24 mx-auto rounded-full bg-orange-200/80 mb-3' />
          <p className='text-lg font-semibold'>{account_name}</p>
        </div>
        <ul className='space-y-4 text-gray-700'>
          <li className='hover:text-colorRed hover:cursor-pointer'>
            Tài khoản của tôi
          </li>
          <li className='hover:text-colorRed hover:cursor-pointer'>Hồ sơ</li>
          <li className='hover:text-colorRed hover:cursor-pointer'>Địa chỉ</li>
          <li className='hover:text-colorRed hover:cursor-pointer'>
            Đổi mật khẩu
          </li>
          <li className='hover:text-colorRed hover:cursor-pointer'>
            Đơn hàng của tôi
          </li>
          <li className='hover:text-colorRed hover:cursor-pointer'>
            Thông báo của tôi
          </li>
        </ul>
      </div>

      <div className='w-3/4 bg-white p-6 rounded-r-lg shadow-md'>
        <h2 className='text-2xl font-semibold mb-6'>Quản lý hồ sơ</h2>
        <form className='space-y-4'>
          <div className='flex items-center'>
            <label className='w-1/4'>Tên đăng nhập</label>
            <input
              type='text'
              value={account_name}
              className='w-2/4 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500'
            />
            <button
              type='button'
              className='ml-4 bg-orange-500 text-white px-4 py-2 rounded-md'
            >
              Sửa
            </button>
          </div>
          <div className='flex items-center'>
            <label className='w-1/4'>Họ và tên</label>
            <input
              type='text'
              className='w-2/4 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500'
            />
            <button
              type='button'
              className='ml-4 bg-orange-500 text-white px-4 py-2 rounded-md'
            >
              Sửa
            </button>
          </div>
          <div className='flex items-center'>
            <label className='w-1/4'>Số điện thoại</label>
            <input
              type='text'
              value={phone}
              className='w-2/4 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500'
            />
            <button
              type='button'
              className='ml-4 bg-orange-500 text-white px-4 py-2 rounded-md'
            >
              Sửa
            </button>
          </div>
          <div className='flex items-center'>
            <label className='w-1/4'>Email</label>
            <input
              type='text'
              value={email}
              className='w-2/4 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500'
            />
            <button
              type='button'
              className='ml-4 bg-orange-500 text-white px-4 py-2 rounded-md'
            >
              Sửa
            </button>
          </div>
          <div className='flex items-center'>
            <label className='w-1/4'>Giới tính</label>
            <div className='w-2/4 flex space-x-4'>
              <label className='flex items-center'>
                <input type='radio' name='gender' className='mr-2' /> Nam
              </label>
              <label className='flex items-center'>
                <input type='radio' name='gender' className='mr-2' /> Nữ
              </label>
              <label className='flex items-center'>
                <input type='radio' name='gender' className='mr-2' /> Khác
              </label>
            </div>
          </div>
          <div className='flex items-center'>
            <label className='w-1/4'>Ngày sinh</label>
            <input
              type='date'
              placeholder='mm/dd/yyyy'
              className='w-2/4 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500'
            />
          </div>
          <button
            type='submit'
            className='bg-orange-500 text-white px-6 py-2 rounded-md mt-6'
          >
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
