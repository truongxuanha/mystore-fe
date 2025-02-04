import LineChar from "../components/LineChar";
import { useEffect, useState } from "react";
import { BuildingStorefrontIcon, ClipboardDocumentListIcon, ClockIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { getRemenueThunk, getStaticticalThunk } from "redux/admin/adminThunk";
import formatVND from "utils/formatVND";
import { isEmpty } from "utils";
import { BodyHomeAdmin, ContainerHomeAdmin, Content, HeaderHomeAdmin, StatisticalItem, TitleStatistical, WrapperStatiscal } from "./styled";
import dayjs from "dayjs";
import { Document, Font, Page, PDFDownloadLink, StyleSheet, Text, View } from "@react-pdf/renderer";
import robotoFont from "libs/fonts/Roboto-Regular.ttf";
Font.register({
  family: "Roboto",
  src: robotoFont,
});

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Roboto",
    marginTop: 25,
    marginBottom: 25,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 12,
    marginBottom: 10,
  },
  table: {
    width: "100%",
    border: "1px solid #000",
    marginBottom: 20,
    marginTop: 20,
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
    fontSize: 12,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #ddd",
    padding: 8,
  },
  tableCell: {
    flex: 1,
    padding: 8,
    textAlign: "center",
    fontSize: 12,
  },
});

const ReportPDF = ({ statisticalData, remenueData }: { statisticalData: any; remenueData: any }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Báo Cáo Doanh Thu</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin tổng quan:</Text>
          <Text style={styles.sectionContent}>Khách hàng: {statisticalData?.total_customers || 0}</Text>
          <Text style={styles.sectionContent}>Tổng sản phẩm: {statisticalData?.total_products || 0}</Text>
          <Text style={styles.sectionContent}>Đơn chưa xử lý: {statisticalData?.total_pending_orders || 0}</Text>
          <Text style={styles.sectionContent}>Tổng lợi nhuận: {formatVND(statisticalData?.total_profit || 0)}</Text>
          <Text style={styles.sectionContent}>Tổng doanh thu: {formatVND(statisticalData?.total_monthly_revenue || 0)}</Text>
        </View>

        {remenueData && !isEmpty(remenueData) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Doanh thu theo ngày:</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.tableHeader]}>Ngày</Text>
                <Text style={[styles.tableCell, styles.tableHeader]}>Doanh thu</Text>
              </View>
              {remenueData.map((item: any, index: number) => (
                <View style={styles.tableRow} key={index}>
                  <Text style={styles.tableCell}>{item.date}</Text>
                  <Text style={styles.tableCell}>{formatVND(item.total)}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

const AdminHome = () => {
  const dispatch = useAppDispatch();
  const { statisticalData, remenueData } = useAppSelector((state) => state.admin);
  const [startDate, setStartDate] = useState(dayjs().startOf("month").format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD"));
  useEffect(() => {
    dispatch(getStaticticalThunk({ startDate, endDate }));
  }, [dispatch, endDate, startDate]);

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
      <PDFDownloadLink document={<ReportPDF statisticalData={statisticalData} remenueData={remenueData} />} fileName="bao_cao_doanh_thu.pdf">
        Tải báo cáo
        {/* {({ loading }) => (loading ? <button disabled>Đang tạo PDF...</button> : <button>Tải báo cáo PDF</button>)} */}
      </PDFDownloadLink>
      <BodyHomeAdmin className="m-2">
        <div className="flex items-center gap-3 my-5 px-5">
          <div>Từ:</div>
          <input type="date" className="border p-2 shadow" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <div>Đến:</div>

          <input type="date" className="border p-2 shadow" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
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
