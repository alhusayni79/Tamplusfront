import { Typography, Box, Container, Grid } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const TeamSection = ({ data }) => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Box textAlign="center" sx={{ mb: 2, maxWidth: "932px" }}>
            {data?.data?.map((item, index) => (
              <div key={item.id}>
                {index === 0 && (
                  <Typography
                    sx={{
                      fontSize: "32px",
                      fontWeight: 700,
                      color: "#1E2124",
                      mb: 3,
                    }}
                  >
                    {item?.value?.[currentLang]}
                  </Typography>
                )}
                {index === 1 && (
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#1E2124",
                      textAlign: { xs: "center", md: currentLang === "ar" ? "right" : "left" }
                    }}
                  >
                    {item?.value?.[currentLang]}
                  </Typography>
                )}
              </div>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TeamSection;
