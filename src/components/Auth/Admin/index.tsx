import { Outlet } from "react-router-dom";
import Sidebar from "./SlideBar";
import { useAppSelector } from "hooks/useAppDispatch";
import HeaderAdmin from "./components/components/HeaderAdmin";

function Admin() {
  const { currentUser } = useAppSelector((state) => state.auth);
  const isAdmin = currentUser?.user.permission === 0 || currentUser?.user.permission === 2;
  return (
    <div className="flex h-full">
      {isAdmin && (
        <>
          <Sidebar />
          <div className="col-span-5 flex flex-col">
            <HeaderAdmin />
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}

export default Admin;
