import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthGuard = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const authEmployeeCookie = Cookies.get('authemployee');
    const authTokenCookie = Cookies.get('auth_token');

    if (authEmployeeCookie) {
      navigate('/employee');
    } else if (authTokenCookie) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return children;
};

export default AuthGuard;