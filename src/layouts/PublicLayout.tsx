import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PublicLayout = () => {
  return (
    <>
      <div className="mx-auto">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
      <ScrollRestoration />
    </>
  );
};

export default PublicLayout;
