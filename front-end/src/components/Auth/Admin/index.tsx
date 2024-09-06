import AdminHome from "./components/AdminHome";
import Sidebar from "./SlideBar";
function Admin() {
  return (
    <div className='grid grid-cols-4'>
      <Sidebar />
      <AdminHome />
    </div>
  );
}

export default Admin;
