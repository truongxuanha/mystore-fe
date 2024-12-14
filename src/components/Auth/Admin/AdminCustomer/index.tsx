import { Input } from "@headlessui/react";
import { useEffect, useState } from "react";
import FormAddStafAdmin from "../components/FormAddStaffAdmin";
import { useSearchParams } from "react-router-dom";
import { texts } from "libs/contains/texts";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { ActionAdminEnum } from "types/admin.type";
import { AccountTypeEnum, PAGE } from "types";
import { authCustomer } from "redux/auth/authThunk";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import Table from "customs/Table";
import ButtonAction from "customs/ButtonAction";
import Pagination from "customs/Pagination";

function AdminCustomer() {
  const { all_customers, totalAccount } = useAppSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
  const [selectOption, setSelectOption] = useState("all");
  const currentPage: number = parseInt(searchParams.get(PAGE.page) || "1");
  const dispatch = useAppDispatch();
  const [show, setShow] = useState<boolean>(false);
  const [actionType, setActionType] = useState<ActionAdminEnum>();
  const [currentStaff, setCurrentStaff] = useState<any>([]);
  useEffect(() => {
    dispatch(authCustomer({ page: currentPage, permission: selectOption }));
  }, [dispatch, currentPage, selectOption]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectOption(selectedValue);
  };

  const handleEdit = (id: string | number) => {
    setShow(true);
    setActionType(ActionAdminEnum.EDIT);
    const acc = all_customers.filter((acc) => acc.id === id);
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
    const acc = all_customers.filter((acc) => acc.id === id);
    setCurrentStaff(acc[0]);
  };

  const handleView = (id: string | number) => {
    setShow(true);
    setActionType(ActionAdminEnum.VIEW);
    const acc = all_customers.filter((acc) => acc.id === id);
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

  const rowCustomer = all_customers?.map((customer) => [
    customer.id || "---",
    customer.account_name || "---",
    customer.full_name || "---",
    customer.email || "---",
    customer.phone || "---",
    customer.sex === 1 ? "Nam" : 0 ? "Nữ" : "---",
    customer.permission === AccountTypeEnum.EMPLOYEE ? "Nhân viên" : AccountTypeEnum.ADMIN ? "Quản lý" : "---",
    customer.status === 0 ? texts.infor_account.STATUS_ON : texts.infor_account.STATUS_BAN,
  ]);

  const option = [
    { option_id: 1, title: texts.list_staff.ALL_STAFF, value: "all" },
    { option_id: 2, title: texts.list_staff.MANAGER, value: "0" },
    { option_id: 3, title: texts.list_staff.STAFF, value: "2" },
  ];

  return (
    <div className="flex-1 bg-white">
      <div className="flex justify-between my-2 bg-colorBody shadow-md p-4">
        <div className="flex bg-white items-center h-10 w-80 border border-corlorBorder">
          <Input type="search" placeholder="Tìm kiếm..." className="h-full px-2 flex-1" />
          <span className="bg-colorPrimary h-full flex items-center px-3 cursor-pointer">
            <MagnifyingGlassIcon width={25} height={25} className="text-white" />
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <select className="h-10 px-5" onChange={handleSelect}>
            {option.map((opt) => (
              <option key={opt.option_id} value={opt.value}>
                {opt.title}
              </option>
            ))}
          </select>
          <button onClick={() => handleAdd()} className="bg-colorPrimary px-5 h-10">
            <PlusIcon width={30} height={30} className="text-white" />
          </button>
        </div>
      </div>
      <div className="mt-5 px-4">
        <Table
          rows={rowCustomer}
          columns={columns}
          operations={(id: string | number) => <ButtonAction id={id} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />}
        />
      </div>
      {totalAccount > 1 && <Pagination currentPage={currentPage} totalPage={totalAccount} />}
      {show && <FormAddStafAdmin initialData={currentStaff} actionType={actionType} setShow={setShow} />}
    </div>
  );
}

export default AdminCustomer;
