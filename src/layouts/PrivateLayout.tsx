import { Navigate, Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";
import LayoutWrapper from "./LayoutWrapper";

function PrivateLayout() {
  const isAuth = useAuth();
  const location = useLocation();

  return (
    <LayoutWrapper>
      <Header />
      <main>{isAuth ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />}</main>
      <Footer />
      <ScrollRestoration />
    </LayoutWrapper>
  );
}

export default PrivateLayout;
