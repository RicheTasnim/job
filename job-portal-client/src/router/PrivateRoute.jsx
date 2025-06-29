import React, { useContext } from "react";
import AuthContecxt from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContecxt);
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-ring loading-xl"></span>;
  }

  if (user) {
    return children;
  }

  return <Navigate to={"/signin"} state={location?.pathname}></Navigate>;
};

export default PrivateRoute;
