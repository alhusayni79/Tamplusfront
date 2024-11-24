import React from 'react';
import Footer from "./footer/Footer";
import { Box, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import ResponsiveFooter from './footer/Footer';
import CustomHeader from './CustomHeader';

const CustomLayout = () => {
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

      <Box
        sx={{
          width: "100%", 
          mt: 5, 
        }}
      >
        <ResponsiveFooter />
      </Box>
    </Box>
  );
};

export default CustomLayout;
