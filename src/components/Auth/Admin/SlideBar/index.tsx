import { ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface MenuItem {
  id: string;
  title: string;
  path: string;
}

interface SidebarProps {
  menuSidebar: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ menuSidebar }) => {
  const location = useLocation();

  const handleActive = (url: string): boolean => {
    return location.pathname.split("/").includes(url);
  };
  return (
    <div className="col-span-1 bg-[#19163A] h-full w-full p-4 flex flex-col items-center">
      <div className="flex flex-col items-center ">
        <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
        <h2 className="text-white text-lg mt-4">xtruong27</h2>
        <span className="text-red-400 text-sm">o Quản lý</span>
      </div>

      <ul className="w-full grid grid-rows-10">
        {menuSidebar.map((item) => (
          <MenuItem key={item.id} title={item.title} url={item.path} activeTab={handleActive(item.path)} />
        ))}
      </ul>
    </div>
  );
};

interface MenuItemProps {
  title: string;
  url: string;
  activeTab: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, url, activeTab }) => {
  return (
    <Link to={url} className={`flex items-center p-2  w-full ${activeTab ? "bg-white text-black" : "text-white"} rounded-lg cursor-pointer transition-colors`}>
      <span>{title}</span>
      <ChevronRightIcon className="w-4 h-4" />
    </Link>
  );
};

export default Sidebar;
