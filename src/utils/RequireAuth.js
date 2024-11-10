import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ children }) => {
  const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);

  return isLoggedIn ? <>{children}</> : <Navigate to="/landing" replace />;
};

export default RequireAuth;
