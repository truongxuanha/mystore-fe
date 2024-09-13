import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";
import React from "react";
const MenuSideBar = [
  {
    id: "home",
    title: "Trang chủ",
    img: <HomeIcon className='h-4 w-4' />,
  },
  {
    id: "staff",
    title: "Quản lý nhân viên",
  },
  {
    id: "customer",
    title: "Khách hàng",
  },
  {
    id: "provider",
    title: "Nhà cung cấp",
  },
  {
    id: "product",
    title: "Sản phẩm",
  },
  {
    id: "staff",
    title: "Đơn đặt hàng",
  },
  {
    id: "staff",
    title: "Quản lý Banner",
  },
  {
    id: "list-post",
    title: "Danh mục bài viết",
  },
  {
    id: "post",
    title: "Bài viết",
  },
];
const Sidebar: React.FC = () => {
  return (
    <div className='col-span-2 md:col-span-1 bg-[#19163A] h-screen w-full p-4 flex flex-col items-center'>
      <div className='flex flex-col items-center '>
        <div className='w-24 h-24 bg-gray-300 rounded-full'></div>
        <h2 className='text-white text-lg mt-4'>xtruong27</h2>
        <span className='text-red-400 text-sm'>o Quản lý</span>
      </div>

      <ul className='w-full grid grid-rows-10'>
        {MenuSideBar.map((sidebar) => (
          <MenuItem icon={sidebar.img} label={sidebar.title} />
        ))}
      </ul>
    </div>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  size?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, size }) => {
  return (
    <li className='flex items-center p-2 text-white w-full hover:bg-white hover:text-black rounded-lg cursor-pointer transition-colors'>
      {icon}
      <span>{label}</span>
      <ChevronRightIcon className='w-4 h-4' />
    </li>
  );
};

export default Sidebar;
