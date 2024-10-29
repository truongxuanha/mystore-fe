import { EyeIcon, MagnifyingGlassIcon, PaperAirplaneIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import HeaderAdmin from "../HeaderAdmin";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/useAppDispatch";
import { Input } from "@headlessui/react";
import Table from "../../../../../customs/Table";
import { useEffect } from "react";
import { authCustomer } from "../../../../../redux/reducer/userReducer/authThunk";
import Button from "../../../../../customs/Button";

function AdminStaff() {
  const { all_customers } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authCustomer());
  }, [dispatch]);

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
        <Button padding="5px" background="#2f80ed" width="25px" height="25px" img={<EyeIcon className="w-6 h-6" />} />
        <Button padding="5px" background="#f86e2e" width="25px" height="25px" img={<PencilSquareIcon className="w-6 h-6" />} />
        <Button padding="5px" background="#f86e2e" width="25px" height="25px" img={<PaperAirplaneIcon className="w-6 h-6" />} />
        <Button padding="5px" background="#ff0000" width="25px" height="25px" img={<TrashIcon className="w-6 h-6" />} />
      </div>
    );
  };
  return (
    <div className="col-span-5 bg-white">
      <HeaderAdmin />
      <div className="flex justify-between mt-2 bg-colorBody p-4">
        <div className="flex bg-white items-center h-6 border">
          <Input type="search" className="px-2" />
          <span className="bg-colorPrimary h-full flex items-center px-3 cursor-pointer">
            <MagnifyingGlassIcon className="w-4 h-4 " />
          </span>
        </div>
        <div>
          <div>
            <select className="h-8 px-4" name="" id="">
              <option value="">Toàn bộ</option>
              <option value="">Quản lý</option>
              <option value="">Nhân viên</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <Table rows={rowCustomer} columns={columns} operations={operations} />
      </div>
    </div>
  );
}

export default AdminStaff;
