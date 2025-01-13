import { Button } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import AddressUser from "components/Oders/AdressUser";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import formatVND from "utils/formatVND";
import ProductRandom from "ProductRandom";
import { authGetAddressAcc } from "redux/auth/authThunk";
import { texts } from "libs/contains/texts";
import { createOrderDetailBillThunk, createOrderPaymentThunk } from "redux/order/orderThunk";
import { isEmpty } from "../../utils/index";
import { toastifySuccess, toastifyWarning } from "utils/toastify";
import OrderComplete from "./OrderComplete";
import useGetSearchParams from "hooks/useGetSearchParams";
import { getProductByAccount } from "redux/cart/cartThunk";
import Breadcrumd from "customs/Breacrumb";
import dayjs from "dayjs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "customs/RenewTable";
import { CircleDollarSign, ClipboardList, User } from "lucide-react";
import { getItemLocal, setItemLocal } from "services/storage";
import Loader from "customs/Loader";

const OrderView = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { addressAcc, loadingGetAddress } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { orderItems: initialOrderItems, typeOrder } = useAppSelector((state) => state.order);
  const [orderItemsSession, setOrderItems] = useState<any>(getItemLocal("orderItems"));
  const [payment, setPayment] = useState("");
  const para = useGetSearchParams(["bill"]).bill;
  const [selectedAddress, setSelectedAddress] = useState<any>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (initialOrderItems.length > 0) {
      setOrderItems(initialOrderItems);
      setItemLocal("orderItems", initialOrderItems);
    }
  }, [initialOrderItems]);

  const totalPrice = useMemo(() => {
    return orderItemsSession?.reduce(
      (acc: any, item: any) => {
        const priceAfterDiscount = item.price - (item.price * item.discount) / 100;
        acc.totalSale += priceAfterDiscount * item.quantity;
        acc.totalNotSale += item.price * item.quantity;
        return acc;
      },
      { totalSale: 0, totalNotSale: 0 },
    );
  }, [orderItemsSession]);

  useEffect(() => {
    dispatch(authGetAddressAcc());
  }, [dispatch]);
  useEffect(() => {
    if (addressAcc && addressAcc.length > 0) {
      setSelectedAddress(addressAcc[0].id);
    }
  }, [addressAcc]);
  const handleCreateOrder = async () => {
    if (!payment) {
      toastifyWarning("Vui lòng chọn phương thức thanh toán!");
      return;
    }
    if (!selectedAddress) return toastifyWarning("Vui lòng thêm địa chỉ giao hàng");
    const extractedData = orderItemsSession.map((item: any) => ({
      id_product: item.id_product,
      quantity: item.quantity,
      id: item.id,
    }));
    const formData: any = {
      billData: {
        total_amount_order: totalPrice?.totalSale,
        id_address: selectedAddress,
        status: 0,
        createAt: dayjs(),
      },
      detailsData: extractedData,
    };

    if (payment === "vnpay_bank") {
      dispatch(createOrderPaymentThunk({ items: formData, type: typeOrder }));
      return;
    }
    const orderSucces = await dispatch(createOrderDetailBillThunk({ items: formData, type: typeOrder })).unwrap();

    if (orderSucces.success) {
      navigate(`/order?bill=${orderSucces.data.billId}&&complete=true`);
      toastifySuccess("Đặt hàng thành công!");
      dispatch(getProductByAccount());
    }
    setOrderItems([]);
  };
  if (loadingGetAddress) return <Loader />;
  return (
    <div className="bg-gray-100 pb-5">
      <main className="container">
        {!para && (
          <div>
            <Breadcrumd page="Đặt hàng" breadcrumbs={[{ title: "Sản phẩm", urlLink: "/product?manufacture=all" }]} />
            <div className="w-full h-0.5 bg-[repeating-linear-gradient(45deg,_#6fa6d6,_#6fa6d6_33px,_transparent_0,_transparent_41px,_#f18d9b_0,_#f18d9b_74px,_transparent_0,_transparent_82px)]"></div>
            <div className="col-span-1 rounded-sm bg-white px-5">
              <div className="flex justify-between">
                <div className="text-start uppercase py-2 flex items-center my-5">
                  <User color="#ee4d2d" className="mr-2" />
                  <span className="text-[#ee4d2d]">{texts.order.ADDRESS_SHIP}</span>
                </div>
                <div className="flex justify-between items-center gap-5 text-white py-5">
                  <Button onClick={() => setIsOpen(true)} className="bg-corlorButton px-3 py-1 rounded-md flex items-center">
                    <PlusIcon className="w-5 h-5" />
                    <span>{texts.order.ADD_ADRESS}</span>
                  </Button>
                  <Link to="/profile">
                    <Button className="bg-colorPrimary px-3 py-1 rounded-md">{texts.order.SET_ADDRESS}</Button>
                  </Link>
                </div>
              </div>
              {!isEmpty(addressAcc) &&
                addressAcc.length > 0 &&
                addressAcc.map((address, index) => {
                  return (
                    <div className="flex gap-3" key={index}>
                      <input
                        type="radio"
                        name="address"
                        id={`address-${index}`}
                        onChange={() => setSelectedAddress(address.id)}
                        value={address.id}
                        checked={selectedAddress === address.id}
                      />
                      <label htmlFor={`address-${index}`} className=" py-5">
                        <strong>
                          {address.full_name}, {address.phone}:
                        </strong>
                        <p>
                          {address.detail_address}, {address.province}, {address.district}, {address.wards}
                        </p>
                      </label>
                    </div>
                  );
                })}
              {!!addressAcc && addressAcc.length === 0 && <div className="text-colorRed text-center">{texts.order.NO_ADDRESS}</div>}
            </div>
            <div className="bg-white px-5 mt-5">
              <Table>
                <TableHeader className="">
                  <TableRow>
                    <TableHead className="pl-0 text-lg font-normal text-[#222] min-w-48">Sản phẩm</TableHead>
                    <TableHead className="text-[#0000008a]">Đơn giá</TableHead>
                    <TableHead className="text-[#0000008a]">Số lượng</TableHead>
                    <TableHead className="text-[#0000008a]">Giảm giá</TableHead>
                    <TableHead className="pr-0 text-[#0000008a] text-end">Thành tiền</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItemsSession?.map((order: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell className="flex items-center gap-3 pl-0">
                        <div className="size-20 min-w-20 min-h-20 border rounded-md">
                          <img src={order?.thumbnail} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="">
                          <p className="line-clamp-1 text-black uppercase">{order?.product_name}</p>
                        </div>
                      </TableCell>
                      <TableCell>{formatVND(order.price)}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.discount}%</TableCell>
                      <TableCell className="pr-0 text-end">{formatVND(order.price * order.quantity)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="bg-white mt-5 p-5">
              <div className="flex gap-10 border-b pb-7">
                <div className="flex items-center gap-1">
                  <CircleDollarSign color="#ee4d2d" size={20} strokeWidth={1.3} />
                  <div>Phướng thức thanh toán</div>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`${payment === "cash_on_delivery" ? "border border-[#ee4d2d] text-[#ee4d2d]" : "border"} cursor-pointer px-3 py-2 rounded-sm`}
                    onClick={() => setPayment("cash_on_delivery")}
                  >
                    Thanh toán khi nhận hàng
                  </div>
                  <div
                    className={`${payment === "vnpay_bank" ? "border border-[#ee4d2d] text-[#ee4d2d]" : "border"} cursor-pointer px-3 py-2 rounded-sm`}
                    onClick={() => setPayment("vnpay_bank")}
                  >
                    Thanh toán VNPAY
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start justify-between gap-5 border-t border-gray-200 py-5">
                <div className="flex items-center gap-1">
                  <ClipboardList color="#F9C821" size={20} strokeWidth={1.3} />
                  <div>Chi tiết thanh toán</div>
                </div>
                <ul className="w-full md:w-auto *:flex *:items-center *:justify-between *:text-nowrap *:gap-2 *:text-[#0000008a]">
                  <li>
                    Tổng tiền hàng: <span className="text-black text-sm">{formatVND(totalPrice?.totalNotSale, 0)}</span>
                  </li>
                  <li>
                    Giảm giá sản phẩm: <span className="text-black text-sm">{formatVND(totalPrice?.totalNotSale - totalPrice?.totalSale)}</span>
                  </li>
                  <li>
                    Tổng thanh toán: <span className="text-[#ee4d2d] text-xl font-medium">{formatVND(totalPrice?.totalSale)}</span>
                  </li>
                  <div className="text-center flex justify-center py-7">
                    <Button onClick={handleCreateOrder} className="bg-[#ee4d2d] w-full md:w-56 px-2 py-2 rounded-md text-white">
                      Đặt hàng
                    </Button>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        )}
        {para && (
          <div className="py-10">
            <OrderComplete />
          </div>
        )}
        <div className="col-span-2">
          <ProductRandom />
        </div>
        {isOpen && <AddressUser handleClose={setIsOpen} />}
      </main>
    </div>
  );
};

export default OrderView;
