import useAuthenticated from "hooks/useAuthenticated";
import { Navigate, useLocation } from "react-router-dom";

const ProtectecRoute = ({ children }: any) => {
  const { authenticated } = useAuthenticated();
  const location = useLocation();
  if (authenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return <>{children}</>;
};

export default ProtectecRoute;
