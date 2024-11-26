import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = () => {
  const authToken = Cookies.get("auth_token"); 

  return authToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
