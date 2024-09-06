import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className='col-span-1 bg-[#19163A] h-screen w-64 p-4 flex flex-col items-center'>
      <div className='flex flex-col items-center mb-8'>
        <div className='w-24 h-24 bg-gray-300 rounded-full'></div>
        <h2 className='text-white text-lg mt-4'>xtruong27</h2>
        <span className='text-red-400 text-sm'>o Quản lý</span>
      </div>

      <ul className='w-full'>
        <MenuItem icon='home' label='Trang chủ' />
        <MenuItem icon='user' label='Nhân viên' />
        <MenuItem icon='users' label='Khách hàng' />
        <MenuItem icon='building' label='Nhà cung cấp' />
        <MenuItem icon='box' label='Sản phẩm' />
        <MenuItem icon='shopping-bag' label='Đơn đặt hàng' />
        <MenuItem icon='chart-bar' label='Thống kê' />
        <MenuItem icon='tag' label='Banner' />
        <MenuItem icon='folder' label='Danh mục bài viết' />
        <MenuItem icon='newspaper' label='Bài viết' />
      </ul>
    </div>
  );
};

interface MenuItemProps {
  icon: string;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label }) => {
  return (
    <li className='text-gray-400 hover:bg-gray-800 hover:text-white p-3 rounded-lg mb-1 flex items-center cursor-pointer transition-colors'>
      <i className={`fas fa-${icon} mr-3`}></i>
      <span>{label}</span>
      <i className='fas fa-chevron-right ml-auto'></i>
    </li>
  );
};

export default Sidebar;
