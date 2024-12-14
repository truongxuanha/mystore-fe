import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuthenticated from "hooks/useAuthenticated";

function AdminLayout({ children }: any) {
  const isAdmin = useAuthenticated();
  return (
    <div className="mx-auto h-full flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mx-auto w-full max-w-7xl px-5 lg:px-16 mt-24">{isAdmin ? children : <Navigate to="/" replace />}</main>
      <Footer />
    </div>
  );
}

export default AdminLayout;
