import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

const MainHeader = ({ title, subtitle }) => {
  const theme=useTheme();
  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 5,
        mb: 3,
        display: "flex",
        justifyContent: "center",

      }}
    >
      <Box sx={{ maxWidth:"544px",width:"544px" }}>
        <Typography
         
          sx={{
           fontSize:"24px",fontWeight:"500",color:theme.palette.primary.disabled
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize:{xs:"30px",sm:"40px"},fontWeight:"700",color:theme.palette.primary.dark
           }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default MainHeader;
