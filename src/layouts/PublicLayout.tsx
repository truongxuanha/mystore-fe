import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function PublicLayout() {
  return (
    <>
      <div className="mx-auto flex flex-col items-center min-h-screen">
        <Header />
        <main className="flex-grow mx-auto w-full mt-header">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default PublicLayout;
