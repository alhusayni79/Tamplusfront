import { useTheme } from "@mui/material/styles";
import { Box, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function ServiceCard({
  title,
  imageSrc,
  price,
  description,
  id,
  mainTitle,
  slug,
  requiredDocuments,
  terms,
  period,
  price_without_vat,
  government_fees_without_vat,
  government_fees_with_vat

}) {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    navigate(`/services/${slug[currentLang]}`, {
      state: {
        title,
        price,
        description,
        id,
        mainTitle,
        requiredDocuments,
        terms,
        period,
        price_without_vat,
        government_fees_without_vat,
        government_fees_with_vat
      },
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Card
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        borderRadius: "15px",
        backgroundColor: "transparent",
        padding: "10px",
        width: "auto",
        textAlign: "center",
        transition: "transform 0.3s",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
      elevation={0}
    >
      <Box
        sx={{
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #D8DBDE",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: { xs: 206, sm: 206, md: 206, lg: 206 },
          backgroundColor: isHovered
            ? theme.palette.primary.light
            : "transparent",
          transition: "background-color 0.3s",
        }}
      >
        <img
          src={isHovered ? imageSrc : imageSrc}
          alt={title[currentLang]}
          style={{
            maxWidth: "80%",
            maxHeight: "80%",
          }}
        />
      </Box>

      <Typography
        variant="v"
        sx={{
          fontWeight: isHovered ? "700" : "400",
          fontSize: "18px",
          color: isHovered
            ? theme.palette.primary.dark
            : theme.palette.primary.body,
        }}
      >
        {title[currentLang]}
      </Typography>
    </Card>
  );
}

export default ServiceCard;
