import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function PublicLayout() {
  return (
    <>
      <div className="mx-auto">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
      </div>
    </>
  );
}

export default PublicLayout;
