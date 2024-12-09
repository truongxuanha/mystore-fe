import useAuthenticated from "hooks/useAuthenticated";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { authenticated } = useAuthenticated();
  const location = useLocation();
  if (!authenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
