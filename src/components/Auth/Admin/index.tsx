import Sidebar from "./SlideBar";
import { menuSideBar } from "../../../helpers/SidebarAdmin";
import { Outlet } from "react-router-dom";

function Admin() {
  return (
    <div className="grid grid-cols-6 h-full">
      <Sidebar menuSidebar={menuSideBar} />
      <Outlet />
    </div>
  );
}

export default Admin;
