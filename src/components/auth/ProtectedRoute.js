import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const authEmployeeCookie = Cookies.get('authemployee');
  const authTokenCookie = Cookies.get('auth_token');
  
  // Check current path
  const currentPath = window.location.pathname;
  
  // Logic for employee routes
  if (currentPath.startsWith('/employee')) {
    return authEmployeeCookie ? children : <Navigate to="/login" />;
  }
  
  // Logic for user routes
  if (currentPath === '/') {
    return authTokenCookie ? children : <Navigate to="/login" />;
  }
  
  // Logic for login page
  if (currentPath === '/login') {
    if (authEmployeeCookie) {
      return <Navigate to="/employee" />;
    }
    if (authTokenCookie) {
      return <Navigate to="/" />;
    }
    return children;
  }
  
  return children;
};

export default ProtectedRoute;