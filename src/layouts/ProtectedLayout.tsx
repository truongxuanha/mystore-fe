import useAuth from "hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useAuth();
  const location = useLocation();
  if (isAuth) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
