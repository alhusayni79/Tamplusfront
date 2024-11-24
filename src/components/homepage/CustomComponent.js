import React from "react";
import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import CustomButton from "../shared/CustomButton";
import checkImage from "../../assets/image/check.png";
import fram24 from "../../assets/image/Frame111.png";
import { useTranslation } from "react-i18next";

const CustomComponent = ({ data }) => {
  const theme = useTheme();
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          maxWidth: "100%",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <Grid
          container
          spacing={0}
          alignItems="flex-start"
          justifyContent={"space-between"}
          flexDirection={"row-reverse"}
        >          <Grid item xs={12} md={6} lg={6} sx={{ height: "100%" }}>
            <Box
              sx={{ borderRadius: "10px", overflow: "hidden", height: "100%" }}
            >
              <img
                src={data?.image}
                alt="Man working on laptop"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            lg={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography
              sx={{
                fontWeight: "500",
                fontSize: "24px",
                color: theme.palette.primary.disabled,
                mb: 2,
              }}
            >
              لماذا تختار تم بلس؟
            </Typography>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: { xs: "30px", sm: "", md: "20px", lg: "40px" },
                color: theme.palette.primary.dark,
                width: "100%",
                pb: { md: 2, lg: 4 },
              }}
            >
              إليك سبب ثقة الآلاف من المستخدمين في منصتنا
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                mb: 8,
              }}
            >
              {data?.data?.map((benefit, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",

                    gap: 2,
                  }}
                >
                  <img src={checkImage} width={26} height={26} alt="check" />
                  <Typography
                    sx={{
                      ml: 1,
                      fontSize: "16px",
                      fontWeight: "500",
                      color: theme.palette.primary.dark,
                    }}
                  >
                    {benefit?.value[currentLang]}
                  </Typography>
                </Box>
              ))}
            </Box>

            <CustomButton
              onClick={() => alert("Button Clicked!")}
              backgroundColor="#07489D"
              textColor="white"
              sx={{ zIndex: 100 }}
            >
              {t("buttons.more_info")}{" "}
            </CustomButton>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CustomComponent;
