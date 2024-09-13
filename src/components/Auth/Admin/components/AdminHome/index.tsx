import HeaderAdmin from "../HeaderAdmin";
import LineChar from "./components/LineChar";

function AdminHome() {
  return (
    <div className='col-span-4 md:col-span-5'>
      <HeaderAdmin />
      <div className='max-w-[500px]'>
        <LineChar />
      </div>
    </div>
  );
}

export default AdminHome;
