import { Typography, Box, Grid, useTheme, List } from "@mui/material";
import React from "react";
import checkImage from "../assets/image/check.png";
import trustImage from "../assets/image/trustimage.png";
import { useTranslation } from "react-i18next";

const iconData = ["الشفافية والمصداقية", "السرية والخصوصية", "سرعة الإنجاز"];

const VisionMissionValuesSection = ({ data }) => {
  const theme = useTheme();
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  return (
    <Grid
      container
      spacing={{ xs: 0, sm: 2, md: 3 }}
      direction={{ xs: "column-reverse", md: "row-reverse" }}
      alignItems={"center"}
    >
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
          {data?.data?.map((item, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              {index === 0 && (
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "32px",
                    color: theme.palette.primary.dark,
                    mb: 2,
                  }}
                >
                  {item.value[currentLang]}
                </Typography>
              )}
              {index === 4 && (
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "16px",
                    color: theme.palette.primary.dark,
                  }}
                >
                  {item.value[currentLang]}
                </Typography>
              )}
            </Box>
          ))}
          {data?.data?.map((item, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              {index === 1 && (
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "32px",
                    color: theme.palette.primary.dark,
                    mb: 2,
                  }}
                >
                  {item.value[currentLang]}
                </Typography>
              )}
              {index === 5 && (
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "16px",
                    color: theme.palette.primary.dark,
                  }}
                >
                  {item.value[currentLang]}
                </Typography>
              )}
            </Box>
          ))}
          {data?.data?.map((item, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              {index === 2 && (
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "32px",
                    color: theme.palette.primary.dark,
                    mb: 2,
                  }}
                >
                  {item.value[currentLang]}
                </Typography>
              )}
              {index === 5 && (
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "16px",
                    color: theme.palette.primary.dark,
                  }}
                >
                  {item.value[currentLang]}
                </Typography>
              )}
            </Box>
          ))}

          <List sx={{ display: "flex", justifyContent: "space-between" }}>
            {iconData.map((text, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <img src={checkImage} width="18" height="18" alt="check" />
                <Typography
                  sx={{
                    fontSize: { xs: "11px", sm: "14px", md: "14px" },
                    fontWeight: 500,
                    color: theme.palette.primary.dark,
                    textAlign: "right",
                  }}
                >
                  {text}
                </Typography>
              </Box>
            ))}
          </List>
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            height: "100%",
          }}
        >
          <img
            src={trustImage}
            alt="Company Image"
            width="540"
            height="488"
            style={{ borderRadius: "8px" }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default VisionMissionValuesSection;
