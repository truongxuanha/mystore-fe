import { EyeIcon, MagnifyingGlassIcon, PaperAirplaneIcon, PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import HeaderAdmin from "../HeaderAdmin";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/useAppDispatch";
import { Input } from "@headlessui/react";
import Table from "../../../../../customs/Table";
import { useEffect, useState } from "react";
import { authCustomer } from "../../../../../redux/reducer/userReducer/authThunk";
import Button from "../../../../../customs/Button";
import FormAddStafAdmin from "../../../..//Auth/FormAddStaffAdmin";
import Pagination from "../../../../../customs/Pagination";
import { useSearchParams } from "react-router-dom";
import { PAGE } from "../../../../../types";

function AdminStaff() {
  const { all_customers, totalCustomer } = useAppSelector((state) => state.auth);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage: number = parseInt(searchParams.get(PAGE.page) || "1");
  const dispatch = useAppDispatch();
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    dispatch(authCustomer({ page: currentPage }));
  }, [dispatch, currentPage]);

  const columns = ["Mã nhân viên", "Tên tài khoản", "Họ và tên", "Email", "Điện thoại", "Giới tính", "Chức vụ", "Trạng thái", "Hoạt động	Thao tác"];

  const rowCustomer = all_customers?.map((customer) => [
    customer.id || "---",
    customer.account_name || "---",
    customer.full_name || "---",
    customer.email || "---",
    customer.phone || "---",
    customer.sex || "---",
    customer.permission || "---",
    customer.status === 0 ? "Hoạt động" : "Khoá",
  ]);

  const operations = () => {
    return (
      <div className="flex gap-1 justify-center">
        <Button padding="5px" background="#2f80ed" width="30px" height="30px" img={<EyeIcon className=" text-white" />} />
        <Button padding="5px" background="#f86e2e" width="30px" height="30px" img={<PencilSquareIcon className=" text-white" />} />
        <Button padding="5px" background="#f86e2e" width="30px" height="30px" img={<PaperAirplaneIcon className=" text-white" />} />
        <Button padding="5px" background="#ff0000" width="30px" height="30px" img={<TrashIcon className=" text-white" />} />
      </div>
    );
  };
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
          <select className="h-8 px-4" name="" id="">
            <option value="">Toàn bộ</option>
            <option value="">Quản lý</option>
            <option value="">Nhân viên</option>
          </select>
          <button onClick={() => setShow(true)} className="bg-colorPrimary px-5 h-8">
            <PlusIcon className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
      <div className="mt-2">
        <Table rows={rowCustomer} columns={columns} operations={operations} />
      </div>
      <Pagination currentPage={currentPage} totalPage={totalCustomer} />
      {show && <FormAddStafAdmin setShow={setShow} />}
    </div>
  );
}

export default AdminStaff;
