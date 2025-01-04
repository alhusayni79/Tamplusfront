import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ResponsiveFooter from "./footer/Footer";
import CustomHeader from "./CustomHeader";

const CustomLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Hide the footer on certain routes
  const hideFooterRoutes = ["/employee/register"];
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  // Check for authentication on component mount and route changes
  useEffect(() => {
    const authEmployeeCookie = Cookies.get("authemployee");

    // If no auth cookie AND not on /login AND not on /employee/register,
    // then redirect to /login
    if (
      !authEmployeeCookie &&
      !location.pathname.includes("/login") &&
      location.pathname !== "/employee/register"
    ) {
      navigate("/login");
    }
  }, [location.pathname, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        mx: "auto",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          width: "100%",
        }}
      >
        <CustomHeader />
      </Box>

      <Box
        component="main"
        sx={{
          flex: 1,
          width: "100%",
          backgroundColor: "#F4F5F6",
        }}
      >
        <Outlet />
      </Box>

      {shouldShowFooter && (
        <Box
          sx={{
            width: "100%",
            mt: 5,
          }}
        >
          <ResponsiveFooter />
        </Box>
      )}
    </Box>
  );
};

export default CustomLayout;
