import React, { useEffect } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import LanguageToggleButton from "../shared/toggleLanguage";
import Tamplus from "../../assets/image/tampluslogo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmpolyeeUData } from "../../redux/Slices/empolyeeData/empolyeeSlice";
import LoadingSpinner from "../shared/LoadingSpinner";
import { useTranslation } from "react-i18next";
const CustomHeader = () => {
    const {i18n, t } = useTranslation();
    const currentLang = i18n.language;
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const dispatch = useDispatch();
  const { empolyee, loading, error } = useSelector((state) => state.empolyee);

  useEffect(() => {
    dispatch(fetchEmpolyeeUData());
  }, [dispatch]);
  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <p>حدث خطأ: {error}</p>;
  }
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
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Link to="/employee" style={{ textDecoration: "none" }}>
          <img
            src={Tamplus}
            alt="Description"
            style={{
              width: isSmallScreen ? "50px" : "80px",
              height: isSmallScreen ? "41px" : "64px",
              cursor: "pointer",
            }}
          />
        </Link>
      </Box>
      <Typography
        variant={isSmallScreen ? "body1" : "h6"}
        sx={{
          color: "#000",
          fontWeight: "bold",
          ml: 1,
        }}
      >
        {t("serviceprovider.welcome_message")}, {empolyee?.response?.first_name}
      </Typography>
      <LanguageToggleButton backgroundColor="#DDEBFD" />
    </Box>
  );
};

export default CustomHeader;
