import React from "react";
import CustomBanner from "../components/layout/CustomBanner";
import ServicesList from "../../src/components/services/ServicesList";
import { Box, Container } from "@mui/material";
import frambanner from "../assets/image/frambanner.png";
const Servicess = () => {
  return (
    <>
      <CustomBanner title="جميع الخدمات" />
      <Box
        sx={{
         
          mt: "290px",
          mb: 4,
          position: "relative",
        }}
      >
        <Container maxWidth="lg">

        
        <img
          src={frambanner}
          alt="description of image"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "auto",
            zIndex: -1111,
          }}
        />

        <Box sx={{ pt: "64px" }}>
          <ServicesList />
        </Box>
        </Container>
      </Box>
    </>
  );
};

export default Servicess;
