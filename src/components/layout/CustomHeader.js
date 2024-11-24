import React from "react";
import { Box, Typography } from "@mui/material";
import LanguageToggleButton from "../shared/toggleLanguage";
import Tamplus from "../../assets/image/tampluslogo.png";
import { useMediaQuery } from '@mui/material';

const CustomHeader = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: { xs: "8px 20px", sm: "16px 88px" },
        backgroundColor: "white",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
      <img
      src={Tamplus}
      alt="Description"
      style={{
        width: isSmallScreen ? "50px" : "80px",
        height: isSmallScreen ? "41px" : "64px",
      }}
    />
      </Box>

      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          fontSize: {
            xs: "18px",
            sm: "22px",
            md: "26px",
            lg: "28px",
          },
          color: "#1F180F",
        }}
      >
        مرحباً، أحمد
      </Typography>

      <LanguageToggleButton backgroundColor="#DDEBFD" />
    </Box>
  );
};

export default CustomHeader;
