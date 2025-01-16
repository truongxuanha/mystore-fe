import TitleProfile from "customs/TitleProfile";
import { ContainerImportDetail, MainImportDetail } from "./styled";
// import ExportPDF from "../ExportPdf";
import Button from "customs/Button";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { useEffect } from "react";
import { getImportDetailThunk } from "redux/admin/adminThunk";
import { isEmpty } from "utils";
import formatVND from "utils/formatVND";
import loadingMin from "assets/loading_min.svg";
import dayjs from "dayjs";
import { noImage } from "assets";
type Props = {
  setShow: (show: boolean) => void;
  currentImport: any;
};
const ImportDetail = ({ currentImport, setShow }: Props) => {
  const { importDetailData, loadingGetDetail } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getImportDetailThunk(currentImport[0].id));
  }, [currentImport, currentImport.id, dispatch]);
  return (
    <ContainerImportDetail>
      <MainImportDetail>
        <TitleProfile title="Chi tiết nhập hàng" center={true} />
        <div className="flex justify-between">
          <div>
            <div className="flex gap-12">
              <span className="w-24">Mã đơn: </span>
              <span className="text-red-400 font-bold">{currentImport[0].id}</span>
            </div>
            <div className="flex gap-12">
              <span className="w-24 text-nowrap">Nhân viên:</span>
              <span>{currentImport[0].employee_name}</span>
            </div>
            <div className="flex gap-12 my-2">
              <span>Xác nhận ngày:</span>
              <span>{dayjs(currentImport[0].createAt).format("DD-MM-YYYY HH:mm:ss")}</span>
            </div>
          </div>
          {/* <ExportPDF data={detailBill} infoBill={currentOrderDetail} /> */}
        </div>
        <div className="grid grid-cols-11 gap-1 text-center bg-slate-100 py-3 mt-5 place-items-center pr-[17px]">
          <div className="col-span-1">STT</div>
          <div className="col-span-1">Mã sản phẩm</div>
          <div className="col-span-3">Sản phẩm</div>
          <div className="col-span-2">Hinh ảnh</div>
          <div className="col-span-1">Số lượng</div>
          <div className="col-span-1">Đơn giá (vnđ)</div>
          <div className="col-span-2">Thành tiền</div>
        </div>
        <div className="max-h-[200px] overflow-auto">
          {loadingGetDetail ? (
            <img src={loadingMin} alt="loading" className="w-56 h--full" />
          ) : (
            !isEmpty(importDetailData) &&
            importDetailData.map((product, idx) => (
              <div key={product.id_product} className={`grid grid-cols-11 gap-1 text-center place-items-center`}>
                <div className="col-span-1">{idx + 1}</div>
                <div className="col-span-1">{product.id_product}</div>
                <div className="col-span-3">{product.product_name}</div>
                <div className="col-span-2">
                  <img className="max-h-24" src={product.thumbnail ?? noImage} />
                </div>
                <div className="col-span-1">{product.quantity}</div>
                <div className="col-span-1">{formatVND(product.unit_price)}</div>
                <div className="col-span-2 text-center">{formatVND(product?.total_cost_price)}</div>
              </div>
            ))
          )}
        </div>
        <div>
          <span>Tổng</span>
          <span className="mx-2 font-bold text-red-400 text-lg">{importDetailData.length}</span>
          <span>sản phẩm</span>
        </div>
        <div>
          <span className="mr-5">Tổng tiền hàng(vnđ):</span>
          <span className="text-red-500 font-bold text-base">{formatVND(currentImport[0].total_cost)}</span>
        </div>
        <div className="flex justify-end mt-3">
          <div className="flex items-center gap-5">
            <Button width="auto" className="px-5 py-2 bg-corlorButton rounded-sm text-white" onClick={() => setShow(false)}>
              Thoát
            </Button>
          </div>
        </div>
      </MainImportDetail>
    </ContainerImportDetail>
  );
};

export default ImportDetail;
