import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useLoginDetails } from "../Forum/Login/LoginProvider";

function ProtectedRoute() {
  const location = useLocation();
  const { isLoggedIn } = useLoginDetails();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default ProtectedRoute;
