import { useAppDispatch, useAppSelector } from "../../../../hooks/useAppDispatch";
import { Input } from "@headlessui/react";
import Table from "../../../../customs/Table";
import { useEffect, useState } from "react";
import Pagination from "../../../../customs/Pagination";
import { useSearchParams } from "react-router-dom";
import { AccountTypeEnum, PAGE } from "../../../../types";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import ButtonAction from "../../../../customs/ButtonAction";
import { authGetAllAccount } from "../../../../redux/auth/authThunk";
import { ActionAdminEnum } from "../../../../types/admin.type";
import { texts } from "libs/contains/texts";
import FormAddStaffAdmin from "../components/FormAddStaffAdmin";
import { ContainerStaff } from "./styled";

function AdminStaff() {
  const { all_accounts, totalAccount } = useAppSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
  const [selectOption, setSelectOption] = useState("all");
  const currentPage: number = parseInt(searchParams.get(PAGE.page) || "1");
  const dispatch = useAppDispatch();
  const [show, setShow] = useState<boolean>(false);
  const [actionType, setActionType] = useState<ActionAdminEnum>();
  const [currentStaff, setCurrentStaff] = useState<any>([]);
  useEffect(() => {
    dispatch(authGetAllAccount({ page: currentPage, permission: selectOption }));
  }, [dispatch, currentPage, selectOption]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectOption(selectedValue);
  };

  const handleEdit = (id: string | number) => {
    setShow(true);
    setActionType(ActionAdminEnum.EDIT);
    const acc = all_accounts.filter((acc) => acc.id === id);
    setCurrentStaff(acc[0]);
  };
  const handleAdd = () => {
    setShow(true);
    setActionType(ActionAdminEnum.ADD);
    setCurrentStaff([]);
  };
  const handleDelete = (id: string | number) => {
    setShow(true);
    setActionType(ActionAdminEnum.DELETE);
    const acc = all_accounts.filter((acc) => acc.id === id);
    setCurrentStaff(acc[0]);
  };

  const handleView = (id: string | number) => {
    setShow(true);
    setActionType(ActionAdminEnum.VIEW);
    const acc = all_accounts.filter((acc) => acc.id === id);
    setCurrentStaff(acc[0]);
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
    customer.sex === 1 ? "Nam" : 0 ? "Nữ" : "Khác",
    customer.permission === AccountTypeEnum.EMPLOYEE ? "Nhân viên" : AccountTypeEnum.ADMIN ? "Quản lý" : "---",
    customer.status === 0 ? texts.infor_account.STATUS_ON : texts.infor_account.STATUS_BAN,
  ]);

  const option = [
    { option_id: 1, title: texts.list_staff.ALL_STAFF, value: "all" },
    { option_id: 2, title: texts.list_staff.MANAGER, value: "1" },
    { option_id: 3, title: texts.list_staff.STAFF, value: "2" },
  ];

  return (
    <ContainerStaff>
      <div className="flex justify-between mt-2 bg-colorBody p-4">
        <div className="flex bg-white items-center h-10 w-80 border border-corlorBorder">
          <Input type="search" placeholder="Tìm kiếm..." className="h-full px-2 flex-1" />
          <span className="bg-colorPrimary h-full flex items-center px-3 cursor-pointer">
            <MagnifyingGlassIcon width={25} height={25} className="text-white" />
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
          <button onClick={() => handleAdd()} className="bg-colorPrimary px-3 h-10 rounded-sm flex items-center text-white">
            <PlusIcon width={20} height={20} color="white" />
            <span>Thêm mới</span>
          </button>
        </div>
      </div>
      <div className="mt-2 px-4">
        <Table
          rows={rowCustomer}
          columns={columns}
          operations={(id: string | number) => <ButtonAction id={id} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />}
        />
      </div>
      {totalAccount > 1 && <Pagination currentPage={currentPage} totalPage={totalAccount} />}
      {show && <FormAddStaffAdmin initialData={currentStaff} actionType={actionType} setShow={setShow} />}
    </ContainerStaff>
  );
}

export default AdminStaff;
