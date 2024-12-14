import LineChar from "../components/LineChar";
import { useEffect } from "react";
import { BuildingStorefrontIcon, ClipboardDocumentListIcon, ClockIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { authCustomer } from "redux/auth/authThunk";
import { getProducts } from "redux/product/productThunk";
import Breadcrumd from "customs/Breacrumb";
import { getStaticticalThunk } from "redux/admin/adminThunk";
import formatVND from "utils/formatVND";

const AdminHome = () => {
  const dispatch = useAppDispatch();
  const { statisticalData } = useAppSelector((state) => state.admin);
  const currentPage = 1;
  const itemsPerPage = 5;
  const manufacturer = "all";
  useEffect(() => {
    const para = { currentPage, itemsPerPage, manufacturer };
    dispatch(authCustomer({}));
    dispatch(getProducts(para));
    dispatch(getStaticticalThunk());
  }, [dispatch]);
  const items: { title: string; image: any; total: number | string }[] = [
    {
      title: "Khách hàng",
      image: <UserPlusIcon width={20} height={20} className="text-white" />,
      total: statisticalData ? statisticalData.total_customers : 0,
    },
    {
      title: "Tổng sản phẩm",
      image: <BuildingStorefrontIcon width={20} height={20} className="text-white" />,
      total: statisticalData ? statisticalData.total_products : 0,
    },
    {
      title: "Đơn hàng chờ xử lý",
      image: <ClockIcon width={20} height={20} className="text-white" />,
      total: statisticalData?.total_pending_orders ?? 0,
    },
    {
      title: "Tổng doanh thu",
      image: <ClipboardDocumentListIcon width={20} height={20} className="text-white" />,
      total: formatVND(statisticalData?.total_monthly_revenue ?? 0),
    },
  ];

  return (
    <div className="col-span-4 xl:col-span-5">
      <Breadcrumd page="Quản trị" breadcrumbs={[{ urlLink: "/", title: "Trang chủ" }]} />
      <div className="m-2">
        <div className="mt-5 flex justify-center">
          {items.map((item, idx) => (
            <Statistical key={idx} {...item} />
          ))}
        </div>
        <div className="w-full flex justify-center md:w-2/3 mt-10">
          <LineChar />
        </div>
      </div>
    </div>
  );
};
const Statistical = ({ title, total }: { title: string; image: any; total: number | string }) => {
  return (
    <div key={title} className="bg-white gap-3 cursor-pointer px-5 border-r">
      <div>{title}</div>
      <div className="text-center rounded-lg mt font-bold">{total}</div>
    </div>
  );
};
export default AdminHome;
