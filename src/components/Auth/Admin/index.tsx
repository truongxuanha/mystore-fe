import AdminHome from "./components/AdminHome";
import Sidebar from "./SlideBar";
import { useState } from "react";
import AdminStaff from "./components/AdminStaff";
import { menuSideBar } from "../../../helpers/SidebarAdmin";

function Admin() {
  const [showTab, setShowTab] = useState("home");

  const handleShowTab = (id: string) => {
    const selectedTab = menuSideBar.find((item) => item.id === id);
    if (selectedTab) {
      setShowTab(id);
    }
  };

  return (
    <div className='grid grid-cols-6 h-full'>
      <Sidebar
        menuSidebar={menuSideBar}
        activeTab={showTab} // Pass the current active tab to Sidebar
        onClick={handleShowTab}
      />
      {showTab === "home" && <AdminHome />}
      {showTab === "staff" && <AdminStaff />}
    </div>
  );
}

export default Admin;
