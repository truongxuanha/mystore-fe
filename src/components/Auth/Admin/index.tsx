import { Outlet } from "react-router-dom";
import Sidebar from "./SlideBar";
import HeaderAdmin from "./components/HeaderAdmin";
import useAuthenticated from "hooks/useAuthenticated";

function Admin() {
  const { isAdmin } = useAuthenticated();
  return (
    <div className="flex bg-white">
      {isAdmin && (
        <>
          <Sidebar />
          <div className="flex-1">
            <HeaderAdmin />
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}

export default Admin;
