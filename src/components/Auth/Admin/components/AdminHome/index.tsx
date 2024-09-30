import HeaderAdmin from "../HeaderAdmin";
import LineChar from "./components/LineChar";
import { assets } from "../../../../../assets";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/useAppDispatch";
import { useEffect } from "react";

import { authCustomer } from "../../../../../redux/reducer/userReducer/authThunk";
import { getProducts } from "../../../../../redux/reducer/productReducer/productThunk";

function AdminHome() {
  const dispath = useAppDispatch();
  const { totalCustomer } = useAppSelector((state) => state.auth);
  const { totalProduct } = useAppSelector((state) => state.product);
  const currentPage = 1;
  const itemsPerPage = 5;
  const manufacturer = "all";
  const para = { currentPage, itemsPerPage, manufacturer };
  useEffect(
    function () {
      dispath(authCustomer());
      dispath(getProducts(para));
    },
    [dispath, para]
  );
  const items = [
    {
      title: "Khách hàng",
      image: assets.customer,
      total: totalCustomer ? totalCustomer : 0,
    },
    {
      title: "Tổng sản phẩm",
      image: assets.calendar,
      total: totalProduct ? totalProduct : 0,
    },
    {
      title: "Đơn hàng chờ xử lý",
      image: assets.shopping,
      total: 0,
    },
    {
      title: "Tổng doanh thu",
      image: assets.clipboad,
      total: 0,
    },
  ];

  return (
    <div className='col-span-4 xl:col-span-5'>
      <HeaderAdmin />
      <div className='m-2'>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2'>
          {items.map((item) => (
            <div
              key={item.title}
              className='bg-white p-10 flex items-center gap-3 rounded-md shadow-md cursor-pointer'
            >
              <div className='rounded-full p-3 bg-colorPrimary hover:bg-orange-300'>
                <img className='w-7 h-7 text-white' src={item.image} alt='' />
              </div>
              <span className='flex gap-2'>
                <p className='bg-zinc-200 rounded-lg p-2 '>{item.title}</p>
                <p className='text-center bg-zinc-200 rounded-lg w-10 p-2'>
                  {item.total}
                </p>
              </span>
            </div>
          ))}
        </div>
        <div className='w-full md:w-2/3'>
          <LineChar />
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
