import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HomeIcon from "@mui/icons-material/Home";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f4f8",
        textAlign: "center",
      }}
    >
      <CheckCircleOutlineIcon
        sx={{
          fontSize: 80,
          color: "#07489D",
          marginBottom: "20px",
        }}
      />

      <Typography
        variant="h4"
        component="h1"
        sx={{
          color: "#07489D",
          fontWeight: "bold",
          marginBottom: "8px",
          direction: "rtl",
        }}
      >
        تم الدفع بنجاح
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#555",
          marginBottom: "16px",
          direction: "rtl",
        }}
      >
        شكراً لك! تمت عملية الدفع بنجاح.
      </Typography>

      <Typography
        variant="h4"
        component="h1"
        sx={{
          color: "#07489D",
          fontWeight: "bold",
          marginBottom: "8px",
          direction: "ltr",
        }}
      >
        Payment Successful
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#555",
          marginBottom: "24px",
          direction: "ltr",
        }}
      >
        Thank you! Your payment was successful.
      </Typography>

      <Button
        variant="contained"
        startIcon={<HomeIcon />}
        sx={{
          backgroundColor: "#07489D",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "8px",
          transition: "transform 0.2s",
          "&:hover": {
            backgroundColor: "#053574",
            transform: "scale(1.05)",
          },
        }}
        onClick={handleBackToHome}
      >
        Back to Home / العودة إلى الصفحة الرئيسية
      </Button>
    </Box>
  );
};

export default PaymentSuccess;
