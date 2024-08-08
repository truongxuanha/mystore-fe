import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <div className='max-w-7xl mx-auto h-full font-mono'>
      <Header />
      <main className='mx-5 md:mx-10 lg:mx-16'>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default AppLayout;
