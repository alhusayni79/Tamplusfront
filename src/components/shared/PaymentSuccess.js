import React from "react";
import { Typography, Box } from "@mui/material";

const PaymentSuccess = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f4f8",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          color: "#4caf50", // Green for success
          fontWeight: "bold",
          marginBottom: "16px",
        }}
      >
        تم الدفع بنجاح
      </Typography>
      <Typography variant="body1" sx={{ color: "#555" }}>
        شكراً لك! تمت عملية الدفع بنجاح.
      </Typography>
    </Box>
  );
};

export default PaymentSuccess;
