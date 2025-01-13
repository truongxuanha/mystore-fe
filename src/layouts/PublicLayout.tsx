import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LayoutWrapper from "./LayoutWrapper";

const PublicLayout = () => {
  
  return (
    <>
      <LayoutWrapper>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </LayoutWrapper>
      <ScrollRestoration />
    </>
  );
};

export default PublicLayout;
