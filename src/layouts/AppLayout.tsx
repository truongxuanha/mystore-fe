import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAppSelector } from "../hooks/useAppDispatch";
import Loader from "../components/Loader";

function AppLayout() {
  const { loadingCart } = useAppSelector((state) => state.cart);
  return (
    <>
      {loadingCart && <Loader />}
      <div className='mx-auto h-full flex flex-col min-h-screen'>
        <Header />
        <main className='flex-grow mx-auto w-full max-w-7xl px-5 lg:px-16 mt-24'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default AppLayout;
