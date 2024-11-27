import { Outlet } from "react-router-dom";
import Sidebar from "./SlideBar";
import { useAppSelector } from "hooks/useAppDispatch";
import HeaderAdmin from "./components/components/HeaderAdmin";

function Admin() {
  const { currentUser } = useAppSelector((state) => state.auth);
  const isAdmin = currentUser?.user.permission === 0 || currentUser?.user.permission === 2;
  return (
    <div className="flex h-full bg-white">
      {isAdmin && (
        <>
          <Sidebar />
          <div className="ml-[350px] flex flex-col flex-1">
            <HeaderAdmin />
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}

export default Admin;
