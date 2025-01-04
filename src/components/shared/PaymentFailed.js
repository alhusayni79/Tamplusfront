import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import { animated, useSpring } from '@react-spring/web';

const PaymentFailed = () => {
  const navigate = useNavigate();

  const animation = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
    config: { tension: 200, friction: 20 }
  });

  const iconAnimation = useSpring({
    from: { rotate: 0 },
    to: { rotate: 360 },
    config: { duration: 1000 }
  });

  const handleTryAgain = () => {
    navigate("/payment");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#fdf2f2",
        textAlign: "center",
      }}
    >
      <animated.div style={animation}>
        <animated.div style={iconAnimation}>
          <ErrorOutlineIcon 
            sx={{ 
              fontSize: 80, 
              color: "#d32f2f",
              marginBottom: "20px"
            }} 
          />
        </animated.div>
      </animated.div>

      <Typography
        variant="h4"
        component="h1"
        sx={{
          color: "#d32f2f",
          fontWeight: "bold",
          marginBottom: "8px",
          direction: "rtl",
        }}
      >
        فشلت عملية الدفع
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#555",
          marginBottom: "16px",
          direction: "rtl",
        }}
      >
        عذراً، حدث خطأ أثناء معالجة الدفع. يرجى المحاولة مرة أخرى.
      </Typography>

      <Typography
        variant="h4"
        component="h1"
        sx={{
          color: "#d32f2f",
          fontWeight: "bold",
          marginBottom: "8px",
          direction: "ltr",
        }}
      >
        Payment Failed
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#555",
          marginBottom: "24px",
          direction: "ltr",
        }}
      >
        Sorry, there was an error processing your payment. Please try again.
      </Typography>

      <Button
        variant="contained"
        startIcon={<ReplayIcon />}
        sx={{
          backgroundColor: "#d32f2f",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "8px",
          transition: "transform 0.2s",
          "&:hover": {
            backgroundColor: "#9a0007",
            transform: "scale(1.05)",
          }
        }}
        onClick={handleTryAgain}
      >
        Try Again / حاول مرة أخرى
      </Button>
    </Box>
  );
};

export default PaymentFailed;