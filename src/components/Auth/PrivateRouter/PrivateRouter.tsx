import useAuth from "../../../hooks/useAuth";
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuth = useAuth();

  return isAuth ? <>{children}</> : <Navigate to='/dang-nhap' />;
};

export default PrivateRoute;
