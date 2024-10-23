import { Button } from "@headlessui/react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useState, useEffect } from "react";
import { authCreateAddressThunk, authGetAddressAcc } from "../../redux/reducer/userReducer/authThunk";
import { AddressStateType } from "../../api/account/type";
import dayjs from "dayjs";
import { texts } from "../../contains/texts";

type AddressComponent = {
  code: number | string;
  name: string;
};

type Props = {
  handleClose: (isOpen: boolean) => void;
};

function AddressUser(props: Props) {
  const { handleClose } = props;

  const [address, setAddress] = useState<AddressStateType>({
    createAt: dayjs().format("YYYY-MM-DD"),
    detail_address: "",
    district: { code: "", name: "" },
    full_name: "",
    phone: "",
    province: { code: "", name: "" },
    wards: { code: "", name: "" },
  });

  const [cities, setCities] = useState<AddressComponent[]>([]);
  const [districts, setDistricts] = useState<AddressComponent[]>([]);
  const [wards, setWards] = useState<AddressComponent[]>([]);

  const dispatch = useAppDispatch();

  // Fetch provinces/cities
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/")
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  // Fetch districts when a city is selected
  useEffect(() => {
    if (address.province.code) {
      fetch(`https://provinces.open-api.vn/api/p/${address.province.code}?depth=2`)
        .then((res) => res.json())
        .then((data) => setDistricts(data.districts))
        .catch((error) => console.error("Error fetching districts:", error));
    }
  }, [address.province]);

  // Fetch wards when a district is selected
  useEffect(() => {
    if (address.district.code) {
      fetch(`https://provinces.open-api.vn/api/d/${address.district.code}?depth=2`)
        .then((res) => res.json())
        .then((data) => setWards(data.wards))
        .catch((error) => console.error("Error fetching wards:", error));
    }
  }, [address.district]);

  async function handleSave() {
    const addressToSave = {
      ...address,
      province: address.province.name,
      district: address.district.name,
      wards: address.wards.name,
    };
    try {
      await dispatch(authCreateAddressThunk(addressToSave));
      handleClose(true);
    } catch (error) {
      console.error("Error creating address:", error);
    }
    dispatch(authGetAddressAcc());
    ``;
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-[rgba(0,0,0,0.5)] justify-center items-center z-50">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-white w-[500px] relative shadow-md rounded-sm">
          <div className="border-b py-4 text-center">
            <h1 className="uppercase">{texts.order.ADD_ADRESS}</h1>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="py-3 px-5 grid grid-cols-[100px_auto] gap-5">
              <label htmlFor="name">{texts.account.FULL_NAME}:</label>
              <input
                className="border px-2 py-1 rounded-sm"
                type="text"
                placeholder="Họ và tên"
                value={address.full_name}
                onChange={(e) => setAddress({ ...address, full_name: e.target.value })}
              />
            </div>
            <div className="py-3 px-5 grid grid-cols-[100px_auto] gap-5">
              <label htmlFor="phone">{texts.account.PHONE_NUMBER}:</label>
              <input
                className="border px-2 py-1 rounded-sm"
                type="text"
                placeholder="SĐT"
                value={address.phone}
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
              />
            </div>
            <div className="py-3 px-5 grid grid-cols-[100px_auto] gap-5">
              <label htmlFor="address">{texts.account.ADDRESS}:</label>
              <textarea
                className="border px-2 py-1 rounded-sm outline-none"
                placeholder="Địa chỉ"
                value={address.detail_address}
                onChange={(e) => setAddress({ ...address, detail_address: e.target.value })}
              />
            </div>

            {/* Tỉnh/Thành phố */}
            <div className="py-3 px-5 grid grid-cols-[100px_auto] gap-5">
              <label>Tỉnh/Thành phố:</label>
              <select
                className="border px-2 py-1 rounded-sm"
                value={address.province.code}
                onChange={(e) => {
                  const selectedProvince = cities.find((city) => {
                    return city.code === Number(e.target.value);
                  }) || { code: "", name: "" };
                  setAddress({
                    ...address,
                    province: selectedProvince,
                    district: { code: "", name: "" },
                    wards: { code: "", name: "" },
                  });
                  setDistricts([]);
                  setWards([]);
                }}
              >
                <option value="">Chọn tỉnh/thành phố</option>
                {cities.map((city) => (
                  <option key={city.code} value={city.code}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Quận/Huyện */}
            <div className="py-3 px-5 grid grid-cols-[100px_auto] gap-5">
              <label>Quận/Huyện:</label>
              <select
                className="border px-2 py-1 rounded-sm"
                value={address.district.code}
                onChange={(e) => {
                  const selectedDistrict = districts.find((district) => district.code === Number(e.target.value)) || { code: "", name: "" };
                  setAddress({
                    ...address,
                    district: selectedDistrict,
                    wards: { code: "", name: "" },
                  });
                }}
                disabled={!address.province.code}
              >
                <option value="">Chọn quận/huyện</option>
                {districts.map((district) => (
                  <option key={district.code} value={district.code}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Xã/Phường */}
            <div className="py-3 px-5 grid grid-cols-[100px_auto] gap-5">
              <label>Xã/Phường:</label>
              <select
                className="border px-2 py-1 rounded-sm"
                value={address.wards.code}
                onChange={(e) => {
                  const selectedWard = wards.find((ward) => ward.code === Number(e.target.value)) || { code: "", name: "" };
                  setAddress({ ...address, wards: selectedWard });
                }}
                disabled={!address.district.code}
              >
                <option value="">Chọn xã/phường</option>
                {wards.map((ward) => (
                  <option key={ward.code} value={ward.code}>
                    {ward.name}
                  </option>
                ))}
              </select>
            </div>
          </form>

          <div className="flex gap-5 justify-end px-5 pb-4 mt-10">
            <Button onClick={handleSave} className="px-3 py-[2px] bg-colorPrimary rounded-md">
              {texts.common.SAVE}
            </Button>
            <Button onClick={() => handleClose(false)} className="px-3 py-[2px] bg-corlorButton rounded-md">
              {texts.common.EXIT}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressUser;
