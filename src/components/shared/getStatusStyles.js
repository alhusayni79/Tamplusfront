import React from "react";
import Chip from "@mui/material/Chip";

const getLanguage = () => {
  return localStorage.getItem("language") || "en"; 
};
const getTranslatedStatus = (status) => {
  const translations = {
    en: {
      Paid: "Paid",
      Reserved: "Reserved",
      Completed: "Completed",
      Canceled: "Canceled",
    },
    ar: {
      Paid: "قيد الانتظار",
      Reserved: "نشطة",
      Completed: "مكتملة",
      Canceled: "تم الإلغاء",
    },
  };

  const language = getLanguage();
  return translations[language]?.[status] || status;
};
const getStatusStyles = (status) => {
  switch (status) {
    case "Paid":
      return {
        backgroundColor: "#FFF3CD",
        color: "#856404",
        fontWeight: "400",
        fontSize: "16px",
      };
    case "Reserved":
       return {
        backgroundColor: "#E2FAE0",
        color: "#114C0B",
        fontWeight: "400",
        fontSize: "16px",
      };

    case "Completed":
      return {
        backgroundColor: "#E2FAE0",
        color: "#114C0B",
        fontWeight: "400",
        fontSize: "16px",
      };
    case "Canceled":
      return {
        backgroundColor: "#FAE1E0",
        color: "#6E1311",
        fontWeight: "400",
        fontSize: "16px",
      };
    default:
      return {
        backgroundColor: "#e0e0e0",
        color: "#000",
        fontWeight: "400",
        fontSize: "16px",
      };
  }
};

// مكوّن لعرض الحالة مع الترجمة
const StatusChip = ({ Status }) => {
  return (
    <Chip
      label={getTranslatedStatus(Status)}
      sx={getStatusStyles(Status)}
    />
  );
};

export default StatusChip;
