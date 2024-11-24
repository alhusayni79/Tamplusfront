import React,{useEffect} from "react";
import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CustomBanner from "../components/layout/CustomBanner";
import ContactInfo from "../components/contactus/ContactInfo";
import ContactForm from "../components/contactus/ContactForm";
import CitySelector from "../components/contactus/CitySelector";
import frambanner from "../assets/image/frambanner.png";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const theme = useTheme();
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language; 
  return (
    <>
      <CustomBanner title={" تواصل معنا"} />
      <Box
        sx={{
          
          mt: "290px",
          mb: 4,
          position: "relative",
        }}
      >
        <Container maxWidth="lg">
        <img
          src={frambanner}
          alt="description of image"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "auto",
          }}
        />
        <Box sx={{ pt: "64px" }}>
          <Grid container spacing={{ xs: 0, sm: 2, md: 4 }}>
            <Grid item xs={12} md={6}>
              <ContactInfo />
            </Grid>
            <Grid item xs={12} md={6}>
              <ContactForm />
            </Grid>
          </Grid>
          <Grid container spacing={{ xs: 0, sm: 2, md: 4 }}>
            <Grid item xs={12}>
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: "48px",
                  color: theme.palette.primary.dark,
                  pt: 2,
                  textAlign: "center ",
                  pt: 10,
                  pb: 2,
                }}
              >
                فروعنا
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={{ xs: 0, sm: 2, md: 4 }} mt={4}>
            
            <Grid item xs={12} md={12}>
              <CitySelector />
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  fontWeight: "700",
                  fontSize: "48px",
                  color: theme.palette.primary.dark,
                  textAlign: "center",
                  pt: 5,
                  pb: 5,
                }}
              >
                <Grid
                  container
                  spacing={{ xs: 0, sm: 2, md: 4 }}
                  justifyContent="center"
                >
                  {/* {locations.map((location) => (
                    <Grid item xs={12} sm={6} md={4} key={location.id}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "2px solid",
                          borderColor: theme.palette.primary.main,
                          borderRadius: "8px",
                          padding: "16px",
                        }}
                      >
                        <LocationOnIcon
                          sx={{
                            color: theme.palette.primary.main,
                            fontSize: "40px",
                            mr: 2,
                          }}
                        />
                        <Typography
                          variant="h6"
                          sx={{ fontSize: "18px", fontWeight: "500" }}
                        >
                          {location.name[currentLang]}
                        </Typography>
                      </Box>
                    </Grid>
                  ))} */}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
        </Container>
      </Box>
    </>
  );
};

export default Contact;
