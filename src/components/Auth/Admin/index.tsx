import { menuSideBar } from "helpers/SidebarAdmin";
import { Outlet } from "react-router-dom";
import Sidebar from "./SlideBar";
import { useAppSelector } from "hooks/useAppDispatch";

function Admin() {
  const { currentUser } = useAppSelector((state) => state.auth);
  const isAdmin = currentUser?.user.permission === 1 || currentUser?.user.permission === 2;
  return (
    <div className="grid grid-cols-6 h-full">
      {isAdmin && (
        <>
          <Sidebar menuSidebar={menuSideBar} />
          <Outlet />
        </>
      )}
    </div>
  );
}

export default Admin;
