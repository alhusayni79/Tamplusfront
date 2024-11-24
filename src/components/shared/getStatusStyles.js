import React from "react";
import Chip from "@mui/material/Chip";

const getStatusStyles = (Status) => {
  switch (Status) {
    case "نشطة":
      return {
        backgroundColor: "#E2FAE0",
        color: "#114C0B",
        fontWeight: "400",
        fontSize: "16px",
      };
    case "مغلقة":
      return {
        backgroundColor: "#FAE1E0",
        color: "#6E1311",
        fontWeight: "400",
        fontSize: "16px",
      };
    case "قيد الانتظار":
      return {
        backgroundColor: "#FFF3CD",
        color: "#856404",
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

const StatusChip = ({ Status }) => {
  return <Chip label={Status} sx={getStatusStyles(Status)} />;
};

export default StatusChip;
