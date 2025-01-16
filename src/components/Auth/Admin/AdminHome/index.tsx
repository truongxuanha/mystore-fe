import LineChar from "../components/LineChar";
import { useEffect, useState } from "react";
import { BuildingStorefrontIcon, ClipboardDocumentListIcon, ClockIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { getRemenueThunk, getStaticticalThunk } from "redux/admin/adminThunk";
import formatVND from "utils/formatVND";
import { isEmpty } from "utils";
import { BodyHomeAdmin, ContainerHomeAdmin, Content, HeaderHomeAdmin, StatisticalItem, TitleStatistical, WrapperStatiscal } from "./styled";

const AdminHome = () => {
  const dispatch = useAppDispatch();
  const { statisticalData, remenueData } = useAppSelector((state) => state.admin);
  useEffect(() => {
    dispatch(getStaticticalThunk());
  }, [dispatch]);

  const [data, setDatas] = useState<number[]>([]);
  const [dateLine, setDateLine] = useState<string[]>([]);

  useEffect(() => {
    if (isEmpty(remenueData)) return;
    setDatas(remenueData?.map((item) => item.total));
    setDateLine(remenueData?.map((item) => item.date));
  }, [remenueData]);
  useEffect(() => {
    dispatch(getRemenueThunk());
  }, [dispatch]);
  const items: { title: string; image: any; total: number | string; bg: string }[] = [
    {
      title: "Khách hàng",
      image: <UserPlusIcon width={25} height={25} fill="white" className="text-white" />,
      total: statisticalData ? statisticalData.total_customers : 0,
      bg: "#30c2aa",
    },
    {
      title: "Tổng sản phẩm",
      image: <BuildingStorefrontIcon width={25} height={25} className="text-white" />,
      total: statisticalData ? statisticalData.total_products : 0,
      bg: "#ff6801",
    },
    {
      title: "Đơn chưa xử lý",
      image: <ClockIcon width={25} height={25} className="text-white" />,
      total: statisticalData?.total_pending_orders ?? 0,
      bg: "#2f80ed",
    },
    {
      title: "Tổng lợi nhuận",
      image: <ClipboardDocumentListIcon width={25} height={25} className="text-white" />,
      total: formatVND(statisticalData?.total_profit ?? 0),
      bg: "green",
    },
    {
      title: "Tổng doanh thu",
      image: <ClipboardDocumentListIcon width={30} height={30} className="text-white" />,
      total: formatVND(statisticalData?.total_monthly_revenue ?? 0),
      bg: "#fd475a",
    },
  ];

  return (
    <ContainerHomeAdmin>
      <HeaderHomeAdmin className="text-center text-3xl font-medium my-10">Quản trị</HeaderHomeAdmin>
      <BodyHomeAdmin className="m-2">
        <WrapperStatiscal>
          {items.map((item) => (
            <Statistical key={item.title} {...item} />
          ))}
        </WrapperStatiscal>
        <LineChar data={data} dateLine={dateLine} />
      </BodyHomeAdmin>
    </ContainerHomeAdmin>
  );
};
const Statistical = ({ title, total, image, bg }: { title: string; image: any; total: number | string; bg: string }) => {
  return (
    <StatisticalItem className="flex items-center gap-3">
      <div style={{ backgroundColor: bg }} className="h-14 w-14 rounded-full flex items-center justify-center">
        {image}
      </div>
      <div>
        <TitleStatistical>{title}</TitleStatistical>
        <Content className="text-center rounded-lg text-xl font-bold" style={{ color: bg }}>
          {total}
        </Content>
      </div>
    </StatisticalItem>
  );
};
export default AdminHome;
