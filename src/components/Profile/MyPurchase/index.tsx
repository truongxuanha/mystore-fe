import noOrder from "assets/no-order.png";
import Loader from "customs/Loader";
import Button from "customs/Button";
import ImageLazy from "customs/ImageLazy";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { purchaseStatus } from "libs/contains/purcharse";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { cancelOrderThunk, getBillByAccountThunk } from "redux/order/orderThunk";
import { isEmpty } from "utils";
import formatVND from "utils/formatVND";
import { toastifySuccess } from "utils/toastify";

const statusType = {
  0: "Chờ xác nhận",
  1: "Chờ lấy hàng",
  2: "Đang giao hàng",
  3: "Đã giao hàng",
  4: "Đã hủy",
};
const statusConvert: { [key: number | string]: string } = {
  0: "wait_approval",
  1: "awaiting_pickup",
  2: "in_delivery",
  3: "delivered",
  4: "cancelled",
  all: "all",
};
const statusOrders: { [key: string]: string | number } = {
  wait_approval: 0,
  awaiting_pickup: 1,
  in_delivery: 2,
  delivered: 3,
  cancelled: 4,
  all: "all",
};
const MyPurchase = () => {
  const { listOrders, loadingGetOrder: ísLoading } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStatus = searchParams.get("type") || "all";

  useEffect(() => {
    const status = currentStatus === "all" ? undefined : statusOrders[currentStatus];
    dispatch(getBillByAccountThunk(status));
  }, [dispatch, currentStatus]);

  const handleSortStatus = (status: string | number) => {
    setSearchParams({ type: status !== undefined ? statusConvert[status] : "all" });
  };
  const handleCancelOrder = (id: number) => {
    const callBack = () => {
      toastifySuccess("Đơn hàng đã được hủy!");
      const status = currentStatus === "all" ? undefined : statusOrders[currentStatus];
      dispatch(getBillByAccountThunk(status));
    };
    dispatch(cancelOrderThunk({ callBack, id, note_cancelation: "", status: 4 }));
  };
  const totalPrice = !isEmpty(listOrders)
    ? listOrders.map((item) => {
        return item.products.reduce((acc, cur) => (acc + cur.price) * cur.quantity, 0);
      })
    : [];

  return (
    <div>
      <div className="flex items-center justify-evenly flex-shrink-0 text-center py-4 px-5 w-full overflow-x-auto whitespace-nowrap bg-white">
        {purchaseStatus.map((item) => (
          <div
            className={`px-3 cursor-pointer ${currentStatus === statusConvert[item.status] ? "text-red-400" : ""}`}
            key={item.id}
            onClick={() => handleSortStatus(item.status)}
          >
            {item.title}
          </div>
        ))}
      </div>
      {ísLoading && <Loader />}
      <div className="mt-3">
        {isEmpty(listOrders) ? (
          <div className="flex flex-col items-center justify-center p-28 bg-white">
            <img src={noOrder} className="size-24 object-cover" alt="No orders" />
            <p>Chưa có đơn hàng</p>
          </div>
        ) : (
          <section>
            {listOrders.map((item, idx) => (
              <div key={item.id} className="bg-white mb-5 p-6">
                <div className="flex items-center justify-end border-b border-gray-300 border-dashed pb-3">
                  <span className="text-red-500">{statusType[item.status]}</span>
                </div>
                {item.products.map((product) => {
                  return (
                    <div key={product.id} className="flex gap-5 pt-5 border-t [&+&]:border-gray-50 mb-5">
                      <div className="size-20 min-w-20 min-h-20">
                        <ImageLazy src={product.thumbnail} alt="anh" isObjectFitCover="contain" />
                      </div>
                      <div className="w-full flex items-center justify-between">
                        <div>
                          <Link to={`/product/product-detail/${product.id}?star=all`} className="text-base text-[#000000de] line-clamp-2 font-medium w-11/12">
                            {product.name}
                          </Link>
                          <div className="flex flex-col text-sm">
                            <span className="text-[#0000008a] w-11/12 line-clamp-1">Số lượng:</span>
                            <span> x {product.quantity}</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-[#ee4d2d] text-base">{formatVND(product.price)}</div>
                          <div className="text-[#ee4d2d] text-base text-end">-{product.discount}%</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="border-t border-gray-200 border-dotted">
                  <div className="p-6 flex items-end justify-between">
                    <div className=" w-24 text-center text-white rounded-sm">
                      {item.status === 0 && (
                        <Button className="bg-red-500 p-2" onClick={() => handleCancelOrder(item.id)}>
                          Hủy đơn
                        </Button>
                      )}
                    </div>
                    <div className="w-auto space-y-3">
                      <span className="flex items-center justify-between text-sm">Tổng tiền sản phẩm : {formatVND(totalPrice[idx])}</span>
                      <span className="flex items-center justify-between text-sm">
                        Giảm : <span className="ml-2">{formatVND(totalPrice[idx] - item.total_amount_order)}</span>
                      </span>
                      <p className="flex items-center justify-between">
                        Thành tiền: <span className="text-2xl text-[#ee4d2d] ml-2">{formatVND(item.total_amount_order)}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default MyPurchase;
