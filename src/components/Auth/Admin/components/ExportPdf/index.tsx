import { Document, Page, Text, View, StyleSheet, Font, PDFDownloadLink } from "@react-pdf/renderer";
// import logo from "assets/logo.png";
import robotoFont from "libs/fonts/Roboto-Regular.ttf";
import { BillDetailType } from "redux/order/type";
import dayjs from "dayjs";
import formatVND from "utils/formatVND";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Roboto",
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 12,
    textAlign: "center",
  },
  text: {
    fontSize: 10,
    padding: 3,
  },
  table: {
    display: "flex",
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 5,
  },
  tableCell: {
    flex: 1,
    padding: 5,
    fontSize: 10,
  },
  tableCellSTT: {
    flex: 0.5,
    padding: 5,
    fontSize: 10,
  },
  tableCellDescription: {
    flex: 2,
    padding: 5,
    fontSize: 10,
  },
  tableCellOther: {
    flex: 1,
    padding: 5,
    fontSize: 10,
  },
});

const ExportPDF = ({ data, infoBill }: { data?: BillDetailType; infoBill: any }) => {
  Font.register({
    family: "Roboto",
    src: robotoFont,
  });

  return (
    <div className="p-4">
      <PDFDownloadLink
        document={
          <Document>
            <Page style={styles.page}>
              <View style={styles.section}>
                <Text style={styles.title}>HÓA ĐƠN BÁN HÀNG</Text>
                <Text style={styles.subTitle}>My Store</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.text}>Ngày mua: {dayjs(infoBill.createAt).format("DD-MM-YYYY")}</Text>
                <Text style={styles.text}>Mẫu số - Ký hiệu (Serial No.): 2C23TTU</Text>
                <Text style={styles.text}>Mã đơn hàng: {infoBill.id}</Text>
                <Text style={styles.text}>Đơn vị bán: Công ty Thắng Trần Mobile</Text>
                <Text style={styles.text}>Hotline: 0982.888.999 - 0223.386.789</Text>
                <Text style={styles.text}>Mã số thuế: 0110329220</Text>
                <Text style={styles.text}>Địa chỉ cửa hàng: 79 Quang Trung, TP. Thái Bình.</Text>
                <Text style={styles.text}>{`Người mua: ${data?.address?.full_name}`}</Text>
                <Text style={styles.text}>{`Số điện thoại: ${data?.address?.phone}`}</Text>
                <Text
                  style={styles.text}
                >{`Địa chỉ khách hàng: ${data?.address?.detail_address}, ${data?.address?.wards}, ${data?.address?.province}, ${data?.address?.district}`}</Text>
              </View>
              <View style={styles.section}>
                <View style={styles.table}>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCellSTT}>STT</Text>
                    <Text style={styles.tableCellDescription}>Tên hàng hóa</Text>
                    <Text style={styles.tableCell}>ĐVT</Text>
                    <Text style={styles.tableCell}>SL</Text>
                    <Text style={styles.tableCell}>Chiết khấu</Text>
                    <Text style={styles.tableCell}>Đơn giá</Text>
                    <Text style={styles.tableCell}>Thành tiền</Text>
                  </View>
                  {data?.products.map((order, index) => (
                    <View style={styles.tableRow} key={order.id_product}>
                      <Text style={styles.tableCellSTT}>{index + 1}</Text>
                      <Text style={styles.tableCellDescription}>{order.product_name}</Text>
                      <Text style={styles.tableCell}>chiếc</Text>
                      <Text style={styles.tableCell}>{order.quantity}</Text>
                      <Text style={styles.tableCell}>{order.discount}</Text>
                      <Text style={styles.tableCell}>{formatVND(order.price)}</Text>
                      <Text style={styles.tableCell}>{formatVND(order.price * order.quantity, order.discount)}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={[styles.section, { flexDirection: "row", justifyContent: "space-around" }]}>
                <Text style={styles.text}>Người mua hàng</Text>
                <Text style={styles.text}>Người bán hàng</Text>
              </View>
            </Page>
          </Document>
        }
        fileName="Donhang.pdf"
      >
        <button className="bg-blue-500 text-white px-4 py-1 rounded text-sm text-nowrap hover:bg-blue-600">Export PDF</button>
      </PDFDownloadLink>
    </div>
  );
};

export default ExportPDF;
