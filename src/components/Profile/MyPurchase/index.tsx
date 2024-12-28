import noOrder from "assets/no-order.png";
import Loader from "components/Loader";
import Button from "customs/Button";
import ImageLazy from "customs/ImageLazy";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { purchaseStatus } from "libs/contains/purcharse";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getBillByAccountThunk } from "redux/order/orderThunk";
import { isEmpty } from "utils";
import formatVND from "utils/formatVND";

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
  console.log(dayjs().format("YYYY-MM-DD hh:mm:ss A"));

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
            {listOrders.map((item) => (
              <div key={item.id} className="bg-white mb-5 p-6">
                <div className="flex items-center justify-end border-b border-gray-300 border-dashed pb-3">
                  <span>{statusType[item.status]}</span>
                </div>
                {item.products.map((product) => (
                  <div key={product.id} className="flex gap-5 pt-5 border-t [&+&]:border-gray-50 mb-5">
                    <div className="size-20 min-w-20 min-h-20">
                      <ImageLazy src={product.thumbnail} alt="anh" isObjectFitCover="contain" />
                    </div>
                    <div className="w-full flex items-center justify-between">
                      <div>
                        <p className="text-base text-[#000000de] line-clamp-2 font-medium w-11/12">{product.name}</p>
                        <div className="flex flex-col text-sm">
                          <span className="text-[#0000008a] w-11/12 line-clamp-1">Số lượng:</span>
                          <span> x {product.quantity}</span>
                        </div>
                      </div>
                      <span className="text-[#ee4d2d] text-base">{formatVND(product.price)}</span>
                    </div>
                  </div>
                ))}
                <div className="border-t border-gray-200 border-dotted">
                  <div className="p-6 flex items-end justify-between">
                    <div className=" w-24 text-center text-white rounded-sm">
                      {item.status === 0 && (
                        <Button className="bg-red-500 p-2" onClick={() => ""}>
                          Hủy đơn
                        </Button>
                      )}
                    </div>
                    <div className="w-auto space-y-3">
                      <span className="flex items-center justify-between text-sm">
                        Giảm : <span className="ml-2">10%</span>
                      </span>
                      <span className="flex items-center justify-between text-sm">Tổng tiền sản phẩm : </span>
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
