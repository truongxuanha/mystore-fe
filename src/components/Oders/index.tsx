import { Button } from "@headlessui/react";
import { CheckIcon, PlusIcon } from "@heroicons/react/24/outline";
import AddressUser from "../../components/AdressUser";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { authGetAddressAcc } from "../../redux/reducer/userReducer/authThunk";
import { texts } from "../../contains/texts";

function OrderView() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { addressAcc } = useAppSelector((state) => state.auth);
  const dispath = useAppDispatch();
  useEffect(() => {
    dispath(authGetAddressAcc());
  }, [dispath]);
  return (
    <main className="grid grid-cols-2 gap-2 mt-3">
      <div className="col-span-1 ">
        <div className="bg-white p-3 rounded-sm">
          <div className="grid grid-cols-2 gap-3 pb-3">
            <div className="border rounded-lg p-5">
              <img className="object-contain w-full" src="https://cdn.tgdd.vn/Products/Images/42/114115/iphone-x-64gb-bac-org.png" alt="" />
            </div>
            <div className="">
              <span>Ốp điện thoại Iphone X</span>
            </div>
          </div>
          <div className="grid grid-cols-2 border-t pt-3">
            <span>1 x 94.000đ</span>
            <span>{texts.common.PROVISIONAL}: 900.000.000 đ</span>
          </div>
        </div>
        <div className="bg-white p-3 mt-3 rounded-sm">
          <span className="flex justify-between py-3 border-b">
            <strong>{texts.common.TOTAL_AMOUNT}: </strong>
            <p>9.443,07đ</p>
          </span>
          <span className="flex justify-between py-3 border-b">
            <strong>{texts.common.DISCOUNT}: </strong>
            <p>9.443,07đ</p>
          </span>
          <span className="flex justify-between py-3 border-b">
            <strong>{texts.order.TOTAL_PAYMENT}: </strong>
            <p>9.443,07đ</p>
          </span>
        </div>
      </div>
      <div className="col-span-1 rounded-sm  bg-white p-3">
        <div className="text-center uppercase border-b py-2">
          <span>{texts.order.ADDRESS_SHIP}</span>
        </div>
        <div className="flex justify-between border-b text-white py-5">
          <Button onClick={() => setIsOpen(true)} className="bg-corlorButton px-3 py-1 rounded-md flex items-center">
            <PlusIcon className="w-5 h-5" />
            <span>{texts.order.ADD_ADRESS}</span>
          </Button>
          <Link to="/thong-tin-tai-khoan">
            <Button className="bg-colorPrimary px-3 py-1 rounded-md">{texts.order.SET_ADDRESS}</Button>
          </Link>
        </div>
        {addressAcc.length > 0 &&
          addressAcc.map((address) => {
            return (
              <div className="border-b py-5">
                <strong>
                  {address.full_name}, {address.phone}:
                </strong>
                <p>
                  {address.detail_address},{address.province},{address.district},{address.wards}
                </p>
              </div>
            );
          })}
        {addressAcc.length === 0 && <div className="text-colorRed text-center">{texts.order.NO_ADDRESS}</div>}
        <div className="text-center flex justify-center py-7 text-white">
          <Button className="bg-colorPrimary px-2 py-1 rounded-md flex items-center">
            <CheckIcon className="w-5 h-5" />
            <span>{texts.order.ACCEPT_ORDER}</span>
          </Button>
        </div>
      </div>
      {isOpen && <AddressUser handleClose={setIsOpen} />}
    </main>
  );
}

export default OrderView;
