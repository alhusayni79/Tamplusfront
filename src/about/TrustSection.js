import { Grid, Typography, Box, useTheme } from "@mui/material";
import React from "react";
import personTrustImage from "../assets/image/persontrust.png";
import { useTranslation } from "react-i18next";

const TrustSection = ({ data }) => {
  const theme = useTheme();
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  return (
    <Box sx={{ width: "100%", py: 4 }}>
      <Grid
        container
        spacing={{ xs: 0, sm: 2, md: 3 }}
        alignItems="center"
        justifyContent="center"
        flexDirection={{ xs: "column", md: "row-reverse" }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
            alignItems: "center",
            mb: { xs: 3, md: 0 },
          }}
        >
          <img
            src={data?.image}
            alt="Trust Image"
            width={540}
            height={529}
            style={{ borderRadius: "8px", objectFit: "cover" }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Box
            sx={{
              maxWidth: "544px",
              textAlign: { xs: "right", md: "right" },
              mx: { xs: "auto", md: 0 },
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: { xs: "20px", md: "20px" },
                color: theme.palette.primary.disabled,
              }}
            >
              من نحن؟
            </Typography>
            {data?.data?.map((item, index) => (
              <Box key={index}>
                {index === 0 && (
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: "28px", md: "20px", lg: "40px" },
                      color: theme.palette.primary.dark,
                      mb: 3,
                    }}
                  >
                    {item?.value[currentLang]}
                  </Typography>
                )}

                {index > 0 && (
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: { xs: "16px", md: "14px", lg: "16px" },
                      color: theme.palette.primary.dark,
                      lineHeight: 1.5,
                    }}
                  >
                    {item?.value[currentLang]}
                    <br />
                    <br />
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TrustSection;
