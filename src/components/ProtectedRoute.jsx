import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ allowedRoles }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin || {}; // Default to empty object if userLogin is undefined

  // Redirect to login if not authenticated
  if (!userInfo || !userInfo.token) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role (if allowedRoles are specified)
  if (allowedRoles && !allowedRoles.includes(userInfo.role)) {
    return <Navigate to="/unauthorized" replace />; // Redirect to an unauthorized page
  }

  return <Outlet />; // Render the child routes/components if authorized
};

export default ProtectedRoute;