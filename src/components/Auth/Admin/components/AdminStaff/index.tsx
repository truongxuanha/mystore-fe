import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import HeaderAdmin from "../HeaderAdmin";
import { useAppSelector } from "../../../../../hooks/useAppDispatch";
import { Input } from "@headlessui/react";

function AdminStaff() {
  const { all_customers } = useAppSelector((state) => state.auth);

  return (
    <div className="col-span-4 bg-white">
      <HeaderAdmin />
      <div className="flex justify-between mt-2 bg-colorBody p-4">
        <div className="flex bg-white items-center h-8 border">
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
      <div>
       
      </div>
    </div>
  );
}

export default AdminStaff;
