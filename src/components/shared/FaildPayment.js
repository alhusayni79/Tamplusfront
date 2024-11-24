import React from "react";
import { Typography, Box, Button } from "@mui/material";

const FailedPayment = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f8d7da", // Light red for error
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          color: "#d32f2f", // Red for failure
          fontWeight: "bold",
          marginBottom: "16px",
        }}
      >
        فشلت عملية الدفع
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#555",
          textAlign: "center",
          marginBottom: "24px",
        }}
      >
        حدث خطأ أثناء معالجة الدفع الخاص بك. يرجى المحاولة مرة أخرى.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => window.location.reload()} // Action to retry payment
      >
        إعادة المحاولة
      </Button>
    </Box>
  );
};

export default FailedPayment;
