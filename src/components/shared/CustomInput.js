import React from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  useTheme,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const CustomInput = ({
  label,
  placeholder,
  isTextarea = false,
  rows = 4,
  select = false,
  options = [],
  value = "",
  onChange,
  ...props
}) => {
  const theme = useTheme();

  // Check the direction from the theme (rtl or ltr)
  const isRtl = theme.direction === "rtl";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        width: "100%",
      }}
    >
      {/* Label */}
      <Typography
        variant="body1"
        component="label"
        sx={{
          fontSize: "16px",
          color: theme.palette.primary.dark,
          fontWeight: "500",
          // Dynamically align the label based on theme direction
          textAlign: isRtl ? "right" : "left",
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
        select={select}
        value={value}
        onChange={onChange}
        // Pass direction to the input itself
        inputProps={{
          dir: isRtl ? "rtl" : "ltr",
        }}
        
        SelectProps={{
          IconComponent: KeyboardArrowDownIcon,
        }}
        {...props}
      >
        {select &&
          options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
      </TextField>
    </Box>
  );
};

export default CustomInput;
