import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";

function PrivateLayout() {
  const isAuth = useAuth();
  return (
    <>
      <div className='mx-auto h-full flex flex-col min-h-screen'>
        <Header />
        <main className='flex-grow mx-auto w-full max-w-7xl px-5 lg:px-16 mt-24'>
          {isAuth ? <Outlet /> : <Navigate to='/dang-nhap' />}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default PrivateLayout;
