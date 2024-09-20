import HeaderAdmin from "../HeaderAdmin";
import LineChar from "./components/LineChar";
import { assets } from "../../../../../assets";

function AdminHome() {
  const items = [
    {
      title: "Khách hàng",
      image: assets.customer,
    },
    {
      title: "Tổng sản phẩm",
      image: assets.calendar,
    },
    {
      title: "Đơn hàng chờ xử lý",
      image: assets.shopping,
    },
    {
      title: "Tổng doanh thu",
      image: assets.clipboad,
    },
  ];
  return (
    <div className='col-span-4 xl:col-span-5'>
      <HeaderAdmin />
      <div className='m-2'>
        <div className='grid grid-cols-2 xl:grid-cols-4 gap-2'>
          {items.map((item) => (
            <div className='bg-white p-10 flex items-center gap-3'>
              <div className='rounded-full p-3 bg-colorPrimary'>
                <img className='w-7 h-7 text-white' src={item.image} alt='' />
              </div>
              <span>
                <p>{item.title}</p>
              </span>
            </div>
          ))}
        </div>
        <div className='max-w-[500px]'>
          <LineChar />
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
