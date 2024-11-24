import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ title, image }) => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/services", { state: { selectedService: title[currentLang] } });
  };

  return (
    <Card
      onClick={handleClick}
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 0.3s ease",
        width: "auto",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width:"100%",
          height: { xs: 105, sm: 115, md: 115, lg: 160 },
          padding: 1,
          border: "1px solid #D8DBDE",
          borderRadius: "12px",
        }}
      >
        <img
          src={image}
          alt={title[currentLang]}
          style={{
            maxWidth: "80%",
            maxHeight: "80%",
            
          }}
        />
      </Box>

      <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 500,
            fontSize: { xs: "18px", sm: "20px" },
          }}
        >
          {title[currentLang]}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
