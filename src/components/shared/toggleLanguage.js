import { Button, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageToggleButton = ({
  onLocaleChange,
  backgroundColor = "white",
}) => {
  const theme = useTheme();
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "ar"; 
    const savedDir = savedLanguage === "ar" ? "rtl" : "ltr";
    i18n.changeLanguage(savedLanguage);
    document.dir = savedDir;
    document.documentElement.lang = savedLanguage;

    localStorage.setItem("language", savedLanguage);
    localStorage.setItem("dir", savedDir);
  }, [i18n]);

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "ar" ? "en" : "ar";
    const newDir = newLanguage === "ar" ? "rtl" : "ltr";

    localStorage.setItem("language", newLanguage);
    localStorage.setItem("dir", newDir);

    if (onLocaleChange) {
      onLocaleChange(newLanguage);
    }

    window.location.href = window.location.href.replace(
      `/${i18n.language}/`,
      `/${newLanguage}/`
    );
  };

  return (
    <Button
      onClick={toggleLanguage}
      sx={{
        backgroundColor: backgroundColor,
        color: theme.palette.primary.main,
        padding: { xs: "8px 16px", sm: "10px 10px", md: "8px 10px" },
        fontWeight: "bold",
        fontSize: { md: "14px", lg: "18px" },
      }}
    >
      {i18n.language === "en" ? "ع" : "E"}
    </Button>
  );
};

export default LanguageToggleButton;
