import { Route } from "react-router-dom";
import EmployeeProtectedRoute from "../components/auth/EmployeeProtectedRoute";
import CustomLayout from "../components/layout/CustomLayout";
import EmployeeRegister from "../components/newrequest/employee/EmployeeRegister";
import Employee from "../pages/Employee";
import RequestPage from "../components/newrequest/RequestPage";
import ServicePageActive from "../components/newrequest/ServicePageActive";

function EmployeeRoutes() {
  return (
    <>
      <Route element={<CustomLayout />}>
        <Route path="employee/register" element={<EmployeeRegister />} />
        <Route
          path="employee"
          element={
            <EmployeeProtectedRoute>
              <Employee />
          </EmployeeProtectedRoute>
          }
        />
        <Route
          path="employee/:service"
          element={
            <EmployeeProtectedRoute>
              <RequestPage />
            </EmployeeProtectedRoute>
          }
        />
        <Route
          path="employee/:service/servicePageActive"
          element={
            <EmployeeProtectedRoute>
              <ServicePageActive />
            </EmployeeProtectedRoute>
          }
        />
      </Route>
    </>
  );
}

export default EmployeeRoutes;
