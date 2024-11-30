import React, { useEffect, useState } from "react";
import CustomBanner from "../layout/CustomBanner";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const location = useLocation();
  const { contentKey } = location.state || {}; 
  const { footer } = useSelector((state) => state.footer); 
  const { i18n } = useTranslation();
  const currentLang = i18n.language; 

  const [text, setText] = useState("");

  useEffect(() => {
    if (footer?.response && contentKey) {
      setText(footer.response[contentKey]?.[currentLang] || "No content available");
    }
  }, [footer, contentKey, currentLang]); 

  return (
    <>
      <CustomBanner title={text} />
      <Box
        sx={{
          mt: "290px",
          mb: 4,
          position: "relative",
        }}
      >
        <Typography>{text}</Typography>
      </Box>
    </>
  );
};

export default PrivacyPolicy;
