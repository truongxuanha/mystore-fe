import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { assets } from "assets";
import ImageLazy from "customs/ImageLazy";
import { menuSideBar } from "helpers/SidebarAdmin";
import { useAppSelector } from "hooks/useAppDispatch";
import React from "react";
import { Link, useLocation } from "react-router-dom";

type MenuItem = {
  id: string;
  title: string;
  path: string;
};

// type SidebarProps = {
//   menuSidebar: MenuItem[];
// };
type MenuItemProps = {
  title: string;
  url: string;
  activeTab: boolean;
  icon: string;
  active: string;
};
const Sidebar = () => {
  const location = useLocation();
  const { currentUser } = useAppSelector((state) => state.auth);
  const handleActive = (url: string): boolean => {
    return location.pathname.split("/").includes(url);
  };
  return (
    <div className="w-[350px] bg-[#19163A] pt-5 h-full flex flex-col items-center fixed">
      <div className="flex flex-col items-center border-b w-full pb-5">
        <div className="w-24 h-24 bg-gray-300 rounded-full">
          <ImageLazy className="rounded-full" src={currentUser?.user.avatar ?? assets.noAvatar} alt="avatar" />
        </div>
        <h2 className="text-white text-lg mt-4">{currentUser?.user.account_name}</h2>
        <span className="text-red-400 text-sm">o {currentUser?.user.permission === 2 ? "Quản lý" : "Nhân viên"}</span>
      </div>
      <ul className="w-full grid grid-rows-10 p-4">
        {menuSideBar.map((item) => (
          <MenuItem key={item.id} title={item.title} url={item.path} activeTab={handleActive(item.path)} icon={item.icon} active={item.active} />
        ))}
      </ul>
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ title, url, activeTab, icon, active }) => {
  return (
    <Link
      to={url}
      className={`flex items-center justify-between p-3  w-full ${activeTab ? "bg-white text-black" : "text-white"} rounded-md cursor-pointer transition-colors`}
    >
      <div className="flex gap-2 px-2">
        <img className="w-5" src={activeTab ? active : icon} />
        <span>{title}</span>
      </div>
      <ChevronRightIcon width={16} height={16} />
    </Link>
  );
};

export default Sidebar;
