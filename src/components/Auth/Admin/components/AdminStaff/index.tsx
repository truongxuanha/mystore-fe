import { EyeIcon, MagnifyingGlassIcon, PaperAirplaneIcon, PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import HeaderAdmin from "../HeaderAdmin";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/useAppDispatch";
import { Input } from "@headlessui/react";
import Table from "../../../../../customs/Table";
import { useEffect, useState } from "react";
import { authGetAllAccount } from "../../../../../redux/reducer/userReducer/authThunk";
import Button from "../../../../../customs/Button";
import FormAddStafAdmin from "../../../..//Auth/FormAddStaffAdmin";
import Pagination from "../../../../../customs/Pagination";
import { useSearchParams } from "react-router-dom";
import { PAGE } from "../../../../../types";
import { texts } from "../../../../../contains/texts";

function AdminStaff() {
  const { all_accounts, totalAccount } = useAppSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
  const [selectOption, setSelectOption] = useState("all");
  const currentPage: number = parseInt(searchParams.get(PAGE.page) || "1");
  const dispatch = useAppDispatch();
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    dispatch(authGetAllAccount({ page: currentPage, permission: selectOption }));
  }, [dispatch, currentPage, selectOption]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectOption(selectedValue);
  };

  const columns = [
    texts.infor_account.STAFF_ID,
    texts.infor_account.ACCOUNT_NAME,
    texts.infor_account.FULL_NAME,
    texts.infor_account.EMAIL,
    texts.infor_account.PHONE_NUMBER,
    texts.infor_account.SEX,
    texts.infor_account.PERMISTION,
    texts.infor_account.STATUS,
    texts.infor_account.ACTION,
  ];

  const rowCustomer = all_accounts?.map((customer) => [
    customer.id || "---",
    customer.account_name || "---",
    customer.full_name || "---",
    customer.email || "---",
    customer.phone || "---",
    customer.sex === 1 ? "Nam" : 0 ? "Nữ" : "---",
    customer.permission === 2 ? "Nhân viên" : 1 ? "Quản lý" : "---",
    customer.status === 0 ? texts.infor_account.STATUS_ON : texts.infor_account.STATUS_BAN,
  ]);

  const option = [
    { option_id: 1, title: texts.list_staff.ALL_STAFF, value: "all" },
    { option_id: 2, title: texts.list_staff.MANAGER, value: "0" },
    { option_id: 3, title: texts.list_staff.STAFF, value: "2" },
  ];

  const operations = () => (
    <div className="flex gap-1 justify-center">
      <Button padding="5px" background="#2f80ed" width="30px" height="30px" img={<EyeIcon className=" text-white" />} />
      <Button padding="5px" background="#f86e2e" width="30px" height="30px" img={<PencilSquareIcon className=" text-white" />} />
      <Button padding="5px" background="#f86e2e" width="30px" height="30px" img={<PaperAirplaneIcon className=" text-white" />} />
      <Button padding="5px" background="#ff0000" width="30px" height="30px" img={<TrashIcon className=" text-white" />} />
    </div>
  );

  return (
    <div className="col-span-5 bg-white">
      <HeaderAdmin />
      <div className="flex justify-between mt-2 bg-colorBody p-4">
        <div className="flex bg-white items-center h-8 border">
          <Input type="search" placeholder="Tìm kiếm..." className="h-full px-2" />
          <span className="bg-colorPrimary h-full flex items-center px-3 cursor-pointer">
            <MagnifyingGlassIcon className="w-4 h-4 " />
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <select className="h-8 px-4" onChange={handleSelect}>
            {option.map((opt) => (
              <option key={opt.option_id} value={opt.value}>
                {opt.title}
              </option>
            ))}
          </select>
          <button onClick={() => setShow(true)} className="bg-colorPrimary px-5 h-8">
            <PlusIcon className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
      <div className="mt-2">
        <Table rows={rowCustomer} columns={columns} operations={operations} />
      </div>
      {totalAccount > 1 && <Pagination currentPage={currentPage} totalPage={totalAccount} />}
      {show && <FormAddStafAdmin setShow={setShow} />}
    </div>
  );
}

export default AdminStaff;
