import React, { useState } from "react";
import { Menu, MenuItem, Typography, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const UserMenu = ({ user, handleUserRoute, isSpecialUser }) => {
  const {t}=useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleUserRoute();
    handleClose();
  };

  const handleLogout = () => {
    document.cookie =
      "auth_token=;expires=" + new Date(0).toUTCString() + ";path=/";
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });

    navigate("/");
    handleClose();
  };

  const textColor = isSpecialUser ? "white" : "#000";

  return (
    <div>
      <IconButton
        onClick={handleClick}
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: textColor }}>{user}</Typography>
        {open ? (
          <KeyboardArrowUpIcon
            sx={{
              marginLeft: "5px",
              fontSize: "20px",
              color: textColor,
              mr: 1,
            }}
          />
        ) : (
          <KeyboardArrowDownIcon
            sx={{
              marginLeft: "5px",
              fontSize: "20px",
              color: textColor,
              mr: 1,
            }}
          />
        )}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleProfile}> {t("navbar.profile")}</MenuItem>
        <MenuItem onClick={handleLogout}> {t("navbar.logout")}</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
