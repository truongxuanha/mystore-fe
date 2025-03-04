import { useEffect, useMemo, useState } from "react";
import Button from "customs/Button";
import TitleProfile from "customs/TitleProfile";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { getDetailBillByIdBillThunk, getImportByIdProductThunk, updateStatusOrderThunk } from "redux/order/orderThunk";
import { isEmpty } from "utils";
import formatVND from "utils/formatVND";
import loadingMin from "assets/loading_min.svg";
import { getAllBillThunk } from "redux/bill/billThunk";
import useGetSearchParams from "hooks/useGetSearchParams";
import { toastifySuccess } from "utils/toastify";
import ExportPDF from "../ExportPdf";
type Props = {
  setShow: (show: boolean) => void;
  currentOrderDetail: any;
};
export const statusOrder = ["Chờ xác nhận", "Chờ lấy hàng", "Đang giao hàng", "Đã giao hàng", "Đã hủy"];
const nextStatus = ["Xác nhận đơn hàng", "Xác nhận đã gửi hàng", "Xác nhận đã giao hàng", "Đã giao"];

function FormOrderAdmin({ setShow, currentOrderDetail }: Props) {
  const [animationClass, setAnimationClass] = useState("modal-enter");
  const page = useGetSearchParams(["page"]).page || 1;
  const [selectIdImport, setSelectIdImport] = useState<any>("");
  const { detailBill, loadingBillDetail, detailImportData } = useAppSelector((state) => state.order);
  // console.log(detailImportData);
  // console.log(detailBill);

  const totalUnitPrice = useMemo(() => {
    return detailBill?.products.reduce((total, product) => {
      const productDetails = detailImportData?.[product.id_product]?.details || [];

      if (productDetails.length === 1 && selectIdImport === "") {
        setSelectIdImport(productDetails[0].id_import);
      }

      productDetails.forEach((detail) => {
        if (String(selectIdImport) === String(detail.id_import)) {
          total += detail.unit_price * product.quantity;
        }
      });
      return total;
    }, 0);
  }, [detailBill, detailImportData, selectIdImport]);

  const handleSelectChange = (e: any) => {
    setSelectIdImport(e.target.value);
  };
  const dispatch = useAppDispatch();
  const handleClose = () => {
    setAnimationClass("modal-exit");
    setTimeout(() => setShow(false), 300);
  };
  useEffect(() => {
    dispatch(getDetailBillByIdBillThunk(currentOrderDetail.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOrderDetail.id]);
  const callBack = () => {
    setShow(false);
    dispatch(getAllBillThunk({ query: "", page, item: 5 }));
    toastifySuccess("Cập nhật thành công!");
  };
  const handleUpdateStatus = () => {
    dispatch(
      updateStatusOrderThunk({
        email: currentOrderDetail.email_user,
        status: currentOrderDetail.status + 1,
        id_import: selectIdImport,
        id: currentOrderDetail.id,
        total_unit_price: totalUnitPrice,
        callBack,
      }),
    );
  };
  useEffect(() => {
    const idsProduct = detailBill?.products.map((product) => product.id_product).join(",");
    if (!idsProduct) return;
    dispatch(getImportByIdProductThunk({ idsProduct }));
  }, [detailBill, dispatch]);
  return (
    <div className={`fixed left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center transition-all duration-300`}>
      <div className={`bg-white px-5 py-5 mx-20 rounded ${animationClass}`}>
        <TitleProfile title="Chi tiết đơn hàng" center={true} />
        <div className="flex justify-between">
          <div>
            <div className="flex gap-12">
              <span className="w-24">Mã đơn:</span>
              <span className="text-red-400 font-bold">{currentOrderDetail.id}</span>
            </div>
            <div className="flex gap-12 my-2">
              <span className="w-24">Trạng thái:</span>
              <span className="text-red-400 font-bold">{statusOrder[currentOrderDetail.status]}</span>
            </div>
            <div className="flex gap-12">
              <span className="w-24 text-nowrap">Địa chỉ giao hàng:</span>
              <span>
                {`${detailBill?.address?.full_name}, ${detailBill?.address?.detail_address}, ${detailBill?.address?.wards}, ${detailBill?.address?.province}, ${detailBill?.address?.district}`}
              </span>
            </div>
            <div className="flex gap-12  my-2">Xác nhận ngày: {currentOrderDetail.createAt}</div>
          </div>
          <ExportPDF data={detailBill} infoBill={currentOrderDetail} />
        </div>
        <div className="grid grid-cols-12 gap-1 text-center bg-slate-100 py-3 mt-5">
          <div className="col-span-1">STT</div>
          <div className="col-span-3">Sản phẩm</div>
          <div className="col-span-2">Hinh ảnh</div>
          <div className="col-span-1">Mã sản phẩm</div>
          <div className="col-span-1">Số lượng</div>
          <div className="col-span-1">Đơn giá (vnđ)</div>
          {currentOrderDetail.status === 0 && <div className="col-span-1">Giá nhập (vnđ)</div>}
          <div className="col-span-1">Chiết khấu(%)</div>
          <div className="col-span-1">Thành tiền</div>
        </div>
        <div className="max-h-[200px] overflow-auto">
          {loadingBillDetail ? (
            <img src={loadingMin} alt="loading" className="w-56 h--full" />
          ) : (
            !isEmpty(detailBill?.products) &&
            detailBill?.products.map((product, idx) => (
              <div key={product.id_product} className={`grid grid-cols-12 gap-1 text-center place-items-center`}>
                <div className="col-span-1">{idx}</div>
                <div className="col-span-3">{product.product_name}</div>
                <div className="col-span-2">
                  <img className="max-h-24" src={product.thumbnail} />
                </div>
                <div className="col-span-1">{product.id_product}</div>
                <div className="col-span-1">{product.quantity}</div>
                <div className="col-span-1">{formatVND(product.price)}</div>
                {currentOrderDetail.status === 0 && (
                  <select className="p-2 border" value={selectIdImport} onChange={handleSelectChange}>
                    {detailImportData && !isEmpty(detailImportData) && (
                      <>
                        <option key={idx} value="">
                          Giá nhập
                        </option>
                        {detailImportData[product.id_product]?.details?.map((detail, idx) => (
                          <option key={idx} value={detail.id_import}>
                            {formatVND(detail.unit_price)}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                )}
                <div className="col-span-1">{product.discount}</div>
                <div className="col-span-1">{formatVND(product?.price * product.quantity, product.discount)}</div>
              </div>
            ))
          )}
        </div>
        <div>
          <span>Tổng</span>
          <span className="mx-2 font-bold text-red-400 text-lg">{detailBill?.products ? detailBill?.products.length : "0"}</span>
          <span>sản phẩm</span>
        </div>
        <div>
          <span className="mr-5">Tổng tiền thanh toán(vnđ):</span>
          <span className="text-red-500 font-bold text-base">{formatVND(currentOrderDetail.total_amount_order)}</span>
        </div>
        <div className="flex justify-between mt-3">
          <div>
            <div className="px-5 py-2 bg-red-500 rounded-sm hover:opacity-80 text-white flex items-center" onClick={handleClose}>
              <TrashIcon width={20} height={20} />
              <div className="cursor-pointer">Xóa đơn hàng</div>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <Button
              width="auto"
              disabled={currentOrderDetail.status >= 3}
              className={`px-5 py-2 ${currentOrderDetail.status >= 3 ? "bg-gray-400" : "bg-colorPrimary"} rounded-sm text-white`}
              onClick={handleUpdateStatus}
            >
              {nextStatus[currentOrderDetail.status]}
            </Button>
            <Button width="auto" className="px-5 py-2 bg-corlorButton rounded-sm text-white" onClick={handleClose}>
              Thoát
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormOrderAdmin;
