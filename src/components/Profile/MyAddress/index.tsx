import AddressUser from "components/AdressUser";
import TitleProfile from "customs/TitleProfile";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { texts } from "libs/contains/texts";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { authGetAddressAcc } from "redux/auth/authThunk";

function MyAdress() {
  const dispatch = useAppDispatch();
  const { addressAcc } = useAppSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    dispatch(authGetAddressAcc());
  }, [dispatch]);

  return (
    <div className="bg-white p-6">
      <div className="flex justify-between items-center pb-5">
        <TitleProfile title={texts.account.MYADRESS} />
        <div className="flex bg-colorPrimary text-white py-1 rounded-sm px-4 cursor-pointer" onClick={() => setShowModal(true)}>
          <PlusIcon />
          <span>Thêm địa chỉ mới</span>
        </div>
      </div>
      {addressAcc.map((add) => (
        <div key={add.id} className="border-b-2 py-5 last:border-none">
          <div className="flex gap-4">
            <span className="font-bold">Họ và tên:</span>
            <span>{add.full_name}</span>
          </div>
          <div className="flex gap-4">
            <span className="font-bold">Số điện thoại:</span>
            <span>{add.phone}</span>
          </div>
          <div className="flex gap-4">
            <span className="font-bold">Địa chỉ:</span>
            <span>{`${add.detail_address}, ${add.wards}, ${add.district}, ${add.province}`}</span>
          </div>
        </div>
      ))}
      {showModal && <AddressUser handleClose={() => setShowModal(false)} />}
    </div>
  );
}

export default MyAdress;
