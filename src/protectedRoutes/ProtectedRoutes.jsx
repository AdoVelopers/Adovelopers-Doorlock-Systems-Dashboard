import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext"; 

const ProtectedRoutes = ({ allowedRoles, children }) => {
  const { user } = useUser();

  if (!user) {

    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(user.role)) {

    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoutes;
