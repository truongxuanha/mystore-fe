import { Button } from "@headlessui/react";
import { CheckIcon, PlusIcon } from "@heroicons/react/24/outline";
import AddressUser from "components/AdressUser";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import formatVND from "utils/formatVND";
import ProductRandom from "ProductRandom";
import { authGetAddressAcc } from "redux/auth/authThunk";
import { texts } from "libs/contains/texts";
import { createOrderDetailBillThunk } from "redux/order/orderThunk";
import { isEmpty } from "../../utils/index";
import { toastifySuccess, toastifyWarning } from "utils/toastify";
import OrderComplete from "./OrderComplete";
import useGetSearchParams from "hooks/useGetSearchParams";
import { getProductByAccount } from "redux/cart/cartThunk";
import Breadcrumd from "customs/Breacrumb";
import dayjs from "dayjs";

const OrderView = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { addressAcc } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { orderItems: initialOrderItems, typeOrder } = useAppSelector((state) => state.order);
  const [orderItemsSession, setOrderItems] = useState(() => {
    const savedOrderItems = sessionStorage.getItem("orderItems");
    return savedOrderItems ? JSON.parse(savedOrderItems) : [];
  });
  const para = useGetSearchParams(["bill"]).bill;
  const [selectedAddress, setSelectedAddress] = useState<any>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (initialOrderItems.length > 0) {
      setOrderItems(initialOrderItems);
      sessionStorage.setItem("orderItems", JSON.stringify(initialOrderItems));
    }
  }, [initialOrderItems]);

  const totalPrice = useMemo(() => {
    return orderItemsSession.reduce(
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
    if (!selectedAddress) return toastifyWarning("Vui lòng thêm địa chỉ giao hàng");
    const extractedData = orderItemsSession.map((item: any) => ({
      id_product: item.id_product,
      quantity: item.quantity,
      id: item.id,
    }));
    const formData: any = {
      billData: {
        total_amount_order: totalPrice.totalSale,
        id_address: selectedAddress,
        status: 0,
        createAt: dayjs(),
      },
      detailsData: extractedData,
    };
    const orderSucces = await dispatch(createOrderDetailBillThunk({ items: formData, type: typeOrder })).unwrap();

    if (orderSucces.success) {
      navigate(`/order?bill=${orderSucces.data.billId}&&complete=true`);
      toastifySuccess("Đặt hàng thành công!");
      dispatch(getProductByAccount());
    }
    setOrderItems([]);
  };

  return (
    <>
      <Breadcrumd page="Đặt hàng" breadcrumbs={[{ title: "Sản phẩm", urlLink: "/product?manufacture=all" }]} />
      <main className="grid grid-cols-2 gap-2 container pt-10">
        {!para && (
          <>
            <div className="col-span-1 ">
              {orderItemsSession.map((item: any, index: any) => (
                <div key={index} className="bg-white p-3 rounded-sm">
                  <div className="grid grid-cols-2 gap-3 pb-3">
                    <div className="border rounded-lg p-5">
                      <img className="object-contain w-full" src={item.thumbnail} alt="" />
                    </div>
                    <div className="">
                      <span>{item.product_name}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 border-t pt-3">
                    <span>{`${item.quantity} x ${formatVND(item.price, 0)}`}</span>
                    <span>{`${texts.common.PROVISIONAL}: ${formatVND(item.price * item.quantity, 0)}`}</span>
                  </div>
                </div>
              ))}

              <div className="bg-white p-3 mt-3 rounded-sm">
                <span className="flex justify-between py-3 border-b">
                  <strong>{texts.common.TOTAL_AMOUNT}: </strong>
                  <p>{formatVND(totalPrice.totalNotSale, 0)}</p>
                </span>
                <span className="flex justify-between py-3 border-b">
                  <strong>{texts.common.DISCOUNT}: </strong>
                  <p>{}</p>
                </span>
                <span className="flex justify-between py-3 border-b">
                  <strong>{texts.order.TOTAL_PAYMENT}: </strong>
                  <p>{formatVND(totalPrice.totalSale, 0)}</p>
                </span>
              </div>
            </div>
            <div className="col-span-1 rounded-sm bg-white p-3">
              <div className="text-center uppercase border-b py-2">
                <span>{texts.order.ADDRESS_SHIP}</span>
              </div>
              <div className="flex justify-between border-b text-white py-5">
                <Button onClick={() => setIsOpen(true)} className="bg-corlorButton px-3 py-1 rounded-md flex items-center">
                  <PlusIcon className="w-5 h-5" />
                  <span>{texts.order.ADD_ADRESS}</span>
                </Button>
                <Link to="/profile">
                  <Button className="bg-colorPrimary px-3 py-1 rounded-md">{texts.order.SET_ADDRESS}</Button>
                </Link>
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
                      <label htmlFor={`address-${index}`} className="border-b py-5">
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
              <div className="text-center flex justify-center py-7 text-white">
                <Button onClick={handleCreateOrder} className="bg-colorPrimary px-2 py-1 rounded-md flex items-center">
                  <CheckIcon className="w-5 h-5" />
                  <span>{texts.order.ACCEPT_ORDER}</span>
                </Button>
              </div>
            </div>
          </>
        )}
        {para && <OrderComplete />}
        <div className="col-span-2">
          <ProductRandom />
        </div>
        {isOpen && <AddressUser handleClose={setIsOpen} />}
      </main>
    </>
  );
};

export default OrderView;
