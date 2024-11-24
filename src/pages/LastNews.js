import React from "react";
import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LastNewsComponent from "../components/homepage/LastNewsComponent";
import PromoBanner from "../components/shared/PromoBanner";
import CustomBanner from "../components/layout/CustomBanner";
import frambanner from "../assets/image/frambanner.png";

const LastNews = () => {
  return (
    <>
      <CustomBanner title={"آخر الأخبار"} />
      <Box
        sx={{
          mt: "290px",
          mb: 4,
          position: "relative",
        }}
      >
        <Container maxWidth="lg">
          <Box
            component="img"
            src={frambanner}
            alt="description of image"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "auto",
              zIndex: -11,
            }}
          />
          <Box sx={{ pt: "64px" }}>
            <LastNewsComponent />
          </Box>

          <Box
            sx={{
              pt: "80px",
              pb: "80px",
            }}
          >
            <PromoBanner />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default LastNews;
