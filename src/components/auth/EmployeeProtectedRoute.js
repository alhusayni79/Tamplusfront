import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const EmployeeProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const authEmployee = Cookies.get("authemployee");
    if (!authEmployee) {
      navigate("/login");
    }
  }, [navigate]);

  return children;
};

export default EmployeeProtectedRoute;