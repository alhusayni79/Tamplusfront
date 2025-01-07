import React from "react";
import { Typography, Container, Box, Button, Link } from "@mui/material";
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h1" color="primary" gutterBottom>
            404
          </Typography>

          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/"
            sx={{ mt: 2 }}
          >
            العودة إلى الصفحة الرئيسية
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Maintenance;
