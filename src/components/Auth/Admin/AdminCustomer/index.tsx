import { Input } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { texts } from "libs/contains/texts";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { ActionAdminEnum } from "types/admin.type";
import { PAGE } from "types";
import { authCustomer } from "redux/auth/authThunk";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Table from "customs/Table";
import ButtonAction from "customs/ButtonAction";
import Pagination from "customs/Pagination";
import FormCustomer from "../components/FormCustomer";

const AdminCustomer = () => {
  const { all_customers, totalAccount } = useAppSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
  const [selectOption, setSelectOption] = useState("all");
  const currentPage: number = parseInt(searchParams.get(PAGE.page) || "1");
  const dispatch = useAppDispatch();
  const [show, setShow] = useState<boolean>(false);
  const [actionType, setActionType] = useState<ActionAdminEnum>();
  const [currentStaff, setCurrentStaff] = useState<any>([]);

  useEffect(() => {
    dispatch(authCustomer({ page: currentPage, sex: selectOption }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    texts.infor_account.STATUS,
    texts.infor_account.ACTION,
  ];

  const rowCustomer = all_customers?.map((customer) => [
    customer.id || "---",
    customer.account_name || "---",
    customer.full_name || "---",
    customer.email || "---",
    customer.phone || "---",
    customer.sex === 0 ? "Nam" : customer.sex === 1 ? "Nữ" : "---",
    customer.status === 0 ? texts.infor_account.STATUS_ON : texts.infor_account.STATUS_BAN,
  ]);

  const option = [
    { option_id: 1, title: "Toàn bộ", value: "all" },
    { option_id: 2, title: "Nam", value: 0 },
    { option_id: 3, title: "Nữ", value: 1 },
  ];

  return (
    <div className="bg-white">
      <div className="flex justify-between my-2 bg-colorBody shadow p-4">
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
        </div>
      </div>
      <div className="mt-5 px-2">
        <Table
          rows={rowCustomer}
          columns={columns}
          operations={(id: string | number) => <ButtonAction id={id} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />}
        />
      </div>
      {totalAccount > 1 && <Pagination currentPage={currentPage} totalPage={totalAccount} />}
      {show && <FormCustomer selectOption={selectOption} currentPage={currentPage} initialData={currentStaff} actionType={actionType} setShow={setShow} />}
    </div>
  );
};

export default AdminCustomer;
