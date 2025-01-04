import React from "react";
import { Button, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const CustomButton = ({
  children,
  backgroundColor = "rgba(0, 0, 0, 0.12)",
  hoverColor = "",
  borderColor = "#fff",
  textColor = "#fff",
  border = false,
  icon: Icon,
  width = "auto",
  fontWeight = "500",
  ...props
}) => {
  const theme = useTheme();
  const { i18n } = useTranslation();
  const locale = i18n.language;

  return (
    <Button
      {...props}
      sx={{
        backgroundColor,
        color: textColor,
        padding: "7px 20px",
        borderRadius: "8px",
        border: border ? `1px solid ${borderColor}` : "none",
        display: "flex",
        alignItems: "center",
        flexDirection: locale === "en" ? "row" : "row-reverse",
        textTransform: "capitalize",
        width,
        fontSize: "18px",
        transition: "all 0.3s ease",
        transform: "scale(1)",
        "&:hover": {
          backgroundColor: hoverColor,
          transform: "scale(1.05)",
        },
        [theme.breakpoints.up("md")]: {
          padding: "7px 20px",
        },
      }}
    >
      {Icon && (
        <Icon
          style={{
            marginRight: locale === "en" ? 8 : 0,
            marginLeft: locale === "en" ? 0 : 8,
        }}
        />
      )}
      {children}
    </Button>
  );
};

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string,
  hoverColor: PropTypes.string,
  borderColor: PropTypes.string,
  textColor: PropTypes.string,
  border: PropTypes.bool,
  icon: PropTypes.elementType,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  locale: PropTypes.string,
};

export default CustomButton;