import React, { useEffect } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Box } from "@mui/material";
import ContactWithUs from "../shared/ContactWithUs";
import Framfooter from "../../assets/image/framfooter.png";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../redux/Slices/userdata/userSlice";

const MainLayout = ({ children }) => {
  // const dispatch = useDispatch();
  // const { user, loading, error } = useSelector((state) => state.user);

  // useEffect(() => {
  //   dispatch(fetchUserData());
  // }, [dispatch]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: -1,
          zIndex: 10,
          mb: 5,
        }}
      >
        {/* Pass user to Header, fallback to empty object if null */}
        <Header user={"jsldj"} />
      </Box>

      <main
        style={{
          flex: 1,
          marginTop: "40px",
        }}
      >
        <Outlet />
      </main>

      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          pr: { xs: 1, sm: 3, md: 18 },
          pl: { xs: 1, sm: 3, md: 18 },
        }}
      >
        <img
          src={Framfooter}
          alt="Background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#042B5D",
            zIndex: -2,
          }}
        />
        <ContactWithUs />
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
