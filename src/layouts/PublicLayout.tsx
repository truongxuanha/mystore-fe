import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function PublicLayout() {
  return (
    <>
      <div className='mx-auto h-full flex flex-col min-h-screen'>
        <Header />
        <main className='flex-grow mx-auto w-full max-w-7xl px-5 lg:px-16 mt-header'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default PublicLayout;
