import { Bars3Icon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { assets } from "assets";
import { menuSideBar } from "helpers/SidebarAdmin";
import { useAppSelector } from "hooks/useAppDispatch";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AccountTypeEnum } from "types";
import { ContainerSidebar } from "./styled";

type MenuItem = {
  id: string;
  title: string;
  path: string;
};

type MenuItemProps = {
  title: string;
  url: string;
  activeTab: boolean;
  icon: string;
  active: string;
  show: boolean;
};
const Sidebar = () => {
  const location = useLocation();
  const { currentUser } = useAppSelector((state) => state.auth);
  const [show, setShow] = useState(true);
  const handleActive = (url: string): boolean => {
    return location.pathname.split("/").includes(url);
  };
  return (
    <ContainerSidebar $expanded={show} className="pt-5 flex flex-col transition-all duration-300 items-center relative border-r">
      {show && (
        <div className="w-6 h-6 rounded-full flex justify-center items-center absolute right-2 top-1.5" onClick={() => setShow(false)}>
          <ArrowLeft width={20} height={20} color="blue" />
        </div>
      )}
      <div className="flex flex-col items-center border-b w-full pb-5 min-h-[125px]">
        {!show && <Bars3Icon width={30} height={30} color="blue" onClick={() => setShow(true)} />}
        {show && (
          <>
            <div className="w-10 h-10  rounded-full">
              <img className="rounded-full" src={currentUser?.user.avatar ?? assets.noAvatar} alt="avatar" />
            </div>
            <h2 className=" text-lg mt-4">{currentUser?.user.account_name}</h2>
            <span className="text-red-400 text-sm">o {currentUser?.user.permission === AccountTypeEnum.ADMIN ? "Quản lý" : "Nhân viên"}</span>
          </>
        )}
      </div>
      <ul className="w-full flex flex-col">
        {menuSideBar.map((item) => (
          <MenuItem key={item.id} show={show} title={item.title} url={item.path} activeTab={handleActive(item.path)} icon={item.icon} active={item.active} />
        ))}
      </ul>
    </ContainerSidebar>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ title, url, activeTab, icon, active, show }) => {
  return (
    <Link
      to={url}
      className={`flex items-center justify-between p-2 text-xs w-full transition-all duration-300 ${activeTab ? "bg-blue-500 text-black" : ""} rounded-md cursor-pointer transition-colors`}
    >
      <div className={`flex justify-center items-center gap-2 px-2 ${show ? "" : "w-full"}`}>
        <img className="w-5" src={activeTab ? active : icon} />
        <span className={`text-nowrap title-sidebar ${activeTab ? "text-white" : "black"}`}>{title}</span>
      </div>
      {show && <ChevronRightIcon width={10} height={10} />}
    </Link>
  );
};

export default Sidebar;
