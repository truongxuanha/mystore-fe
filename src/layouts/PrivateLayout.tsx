import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";

function PrivateLayout() {
  const isAuth = useAuth();
  const location = useLocation();

  return (
    <>
      <div className="mx-auto">
        <Header />
        <main>{isAuth ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />}</main>
        <Footer />
      </div>
    </>
  );
}

export default PrivateLayout;
