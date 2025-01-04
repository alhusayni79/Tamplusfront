import React, { useState } from "react";
import { Box, TextField, Typography, Grid } from "@mui/material";
import CustomButton from "./CustomButton";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";

const ContactWithUs = () => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = async () => {
    if (!email) {
      toast.error("sjlkjdkl");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/newsletter`,
        {
          email: email,
        }
      );

      if (response.status === 200) {
        toast.success("تم ارسال البريد الالكتروني بنجاح");
        setEmail("");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || t("subscriptionFailed");
      toast.error("برجاء ادخال بريد الكتروني صحيح");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "320px",
        display: "flex",
        justifyContent: "space-between",
        p: 2,
      }}
    >
      <Grid
        container
        spacing={{ xs: 0, sm: 3 }}
        alignItems="center"
        flexDirection={"row-reverse"}
      >
        <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
              alignItems: "flex-end",
              gap: 1,
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 1,
                  color: "white",
                  textAlign: { md: currentLang === "ar" ? "right" : "left" },
                }}
              >
                {t("email")}
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                sx={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  width: "90%",
                  "& .MuiOutlinedInput-input": {
                    padding: "16px",
                    height: "15px",
                  },
                }}
                value={email}
                onChange={handleEmailChange}
              />
            </Box>

            <CustomButton
              onClick={handleSubscribe}
              backgroundColor="#07489D"
              textColor="white"
              border={true} 
              borderColor="white" 
              sx={{
                zIndex: 100,
                width: "100%",
              }}
              disabled={loading}
            >
              {loading ? t("subscribing") : t("subscribeNow")}
            </CustomButton>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          order={{ xs: 1, md: 2 }}
          sx={{ textAlign: { xs: "center", md: "right", zIndex: 1 } }}
        >
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "40px",
              color: "white",
              textAlign: currentLang === "ar" ? "right" : "left",
            }}
          >
            {t("newsletter.title")}
          </Typography>
          <Typography
            sx={{
              fontSize: "24px",
              color: "#C2C6CC",
              fontWeight: "500",
              textAlign: currentLang === "ar" ? "right" : "left",
            }}
          >
            {t("newsletter.description")}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactWithUs;
