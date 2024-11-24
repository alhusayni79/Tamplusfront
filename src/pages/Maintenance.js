import React from "react";
import { Typography, Container, Box } from "@mui/material";
import desktopMain from "../assets/image/desktobMain.jpg";
import mobileMain from "../assets/image/mobileMain.jpg";

const Maintenance = () => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundImage: {
          xs: `url(${mobileMain})`,
          sm: `url(${desktopMain})`,
        },
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "90%",
          maxWidth: "500px",
          mx: "auto",
        }}
      >
        <Typography variant="h2" gutterBottom>
          تحت الصيانة
        </Typography>
        <Typography variant="body1" paragraph>
          نحن نجري بعض التحسينات على موقعنا. يرجى التحقق لاحقًا
        </Typography>
        <Typography variant="body2" color="inherit">
          نعتذر عن أي إزعاج
        </Typography>
      </Box>
    </Container>
  );
};

export default Maintenance;
