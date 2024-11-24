import React from "react";
import { Box, Typography, TextField, useTheme } from "@mui/material";

const CustomInput = ({ label, placeholder, isTextarea = false, rows = 4, ...props }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        width: "100%",
      }}
    >
      <Typography
        variant="body1"
        component="label"
        sx={{
          fontSize: "16px",
          color: theme.palette.primary.dark,
          fontWeight: "500",
        }}
      >
        {label}
      </Typography>

      <TextField
        fullWidth
        placeholder={placeholder}
        variant="outlined"
        multiline={isTextarea} 
        rows={isTextarea ? rows : 1} 
        {...props}
      />
    </Box>
  );
};

export default CustomInput;
