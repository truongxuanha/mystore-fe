import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AppLayout() {
  return (
    <div className='max-w-7xl mx-auto h-full'>
      <Header />
      <main className='mx-5 md:mx-10 lg:mx-16'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
