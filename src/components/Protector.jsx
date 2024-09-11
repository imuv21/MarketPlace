import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Protector = ({ children, user, role, requiredRole, redirect = "/login" }) => {
  if (!user || (requiredRole && role !== requiredRole)) {
    return <Navigate to={redirect} />
  };
  return children ? children : <Outlet />;
};

export default Protector;