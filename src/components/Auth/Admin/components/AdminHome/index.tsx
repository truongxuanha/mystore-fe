import LineChar from "./components/LineChar";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/useAppDispatch";
import { useEffect } from "react";

import HeaderAdmin from "../components/HeaderAdmin";
import { BuildingStorefrontIcon, ClipboardDocumentListIcon, ClockIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { authCustomer } from "../../../../../redux/auth/authThunk";
import { getProducts } from "../../../../../redux/product/productThunk";

const AdminHome = () => {
  const dispath = useAppDispatch();
  const { totalCustomer } = useAppSelector((state) => state.auth);
  const { totalProduct } = useAppSelector((state) => state.product);
  const currentPage = 1;
  const itemsPerPage = 5;
  const manufacturer = "all";
  useEffect(
    function () {
      const para = { currentPage, itemsPerPage, manufacturer };
      dispath(authCustomer({}));
      dispath(getProducts(para));
    },
    [dispath],
  );
  const items = [
    {
      title: "Khách hàng",
      image: <UserPlusIcon className="w-full h-full text-white" />,
      total: totalCustomer ? totalCustomer : 0,
    },
    {
      title: "Tổng sản phẩm",
      image: <BuildingStorefrontIcon className="w-full h-full text-white" />,
      total: totalProduct ? totalProduct : 0,
    },
    {
      title: "Đơn hàng chờ xử lý",
      image: <ClockIcon className="w-full h-full text-white" />,
      total: 0,
    },
    {
      title: "Tổng doanh thu",
      image: <ClipboardDocumentListIcon className="w-full h-full text-white" />,
      total: 0,
    },
  ];

  return (
    <div className="col-span-4 xl:col-span-5">
      <HeaderAdmin />
      <div className="m-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
          {items.map((item) => (
            <div key={item.title} className="bg-white p-10 flex items-center gap-3 rounded-md shadow-md cursor-pointer">
              <div className="rounded-full p-2 w-9 h-9 bg-colorPrimary hover:bg-orange-300">{item.image}</div>
              <span className="flex gap-2">
                <p className="bg-zinc-200 rounded-lg p-2 ">{item.title}</p>
                <p className="text-center bg-zinc-200 rounded-lg w-10 p-2">{item.total}</p>
              </span>
            </div>
          ))}
        </div>
        <div className="w-full md:w-2/3">
          <LineChar />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
