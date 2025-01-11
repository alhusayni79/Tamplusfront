import React, { useEffect, useState } from "react";
import { Grid, Typography, Card, useTheme, Box } from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import tampluslogo from "../../assets/image/tampluslogo.png";
import { useTranslation } from "react-i18next";
import ServiceInfo from "./paymentcomponent/ServiceInfo";
import PaymentMethod from "./paymentcomponent/PaymentMethod";
import ResponsiveFooter from "../layout/footer/Footer";
export default function Payment() {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const { label } = useParams();
  const location = useLocation();
  const { price, description, id, price_without_vat,title } = location.state || {};
    const theme = useTheme();
    return (
    <Box sx={{ backgroundColor: "#F4F4F6" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          backgroundColor: "#ffffff",
          p: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "28px",
            fontWeight: "700",
            color: theme.palette.primary.dark,
          }}
        >
          {t("services.payment")}
        </Typography>
        <img src={tampluslogo} width={80} height={64} alt="tam" />
      </Box>

      <Box sx={{ width: "100%", maxWidth: 1200, margin: "auto", p: 3, mt: 3 }}>
        <Grid container spacing={2} flexDirection={"row-reverse"}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                p: 2,
                borderRadius: 0,
                position: "relative",
                textAlign: "center",
                borderBottomLeftRadius: "8px",
                borderBottomRightRadius: "8px",
                p: 5,
              }}
              elevation={1}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "7px",
                  backgroundColor: "#07489D",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />

              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: theme.palette.primary.body,
                  mb: 2,
                }}
              >
          {t("services.pricebefore")}
          </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography
                  sx={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    color: theme.palette.primary.main,
                  }}
                >
                  {price_without_vat}
                  <Typography
                   component="span"
                   variant="subtitle2"
                   sx={{
                     color: "#595F69",
                     mr: 1,
                     fontSize: "20px",
                   }}
                  >
          {t("services.reyal")}
          </Typography>
                </Typography>
              </Box>

              {/* Total Price with VAT */}
              <Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: theme.palette.primary.body,
                    mb: 2,
                  }}
                >
          {t("services.pricebafter")}
          </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: theme.palette.primary.dark,
                    mb: 1,
                  }}
                ></Typography>
                <Typography
                  sx={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    color: theme.palette.primary.main,
                  }}
                >
                  {price}
                  <Typography
                    component="span"
                    variant="subtitle2"
                    sx={{
                      color: "#595F69",
                      mr: 1,
                      fontSize: "20px",
                    }}
                  >
          {t("services.reyal")}
          </Typography>
                </Typography>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3, p: 3, borderRadius: "8px" }} elevation={1}>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: theme.palette.primary.dark,
                  mb: 2,
                }}
              >
                {title?.[currentLang]}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: theme.palette.primary.dark,
                }}
              >
                {description[currentLang]}
              </Typography>
              <ServiceInfo />
            </Card>

            <PaymentMethod price={price} id={id} />
          </Grid>
        </Grid>
      </Box>
      <ResponsiveFooter />
    </Box>
  );
}
