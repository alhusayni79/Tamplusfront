import React, { useEffect, useState } from "react";
import { Box, Container, useTheme } from "@mui/material";
import LastNewsComponent from "../homepage/LastNewsComponent";
import CustomBanner from "../layout/CustomBanner";
import Heading from "../lastnews/Heading.js";
import PromoBanner from "../shared/PromoBanner.js";
import frambanner from "../../assets/image/frambanner.png";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { t } from "i18next";

const News = () => {
  const theme = useTheme();
  const location = useLocation();
  const { id } = location.state || {}; 
  const { i18n ,t} = useTranslation();
  const currentLang = i18n.language;

  const { blogs } = useSelector((state) => state.blogs);
  const [localizedData, setLocalizedData] = useState({
    title: "",
    image: "",
    content: "",
  });

  useEffect(() => {
    if (blogs?.response?.data && id) {
      const newsItem = blogs.response.data.find((news) => news.id === id);
      if (newsItem) {
        setLocalizedData({
          title: newsItem.title[currentLang],
          image: newsItem.image,
          content: newsItem.content[currentLang],
        });
      }
    }
  }, [blogs, id, currentLang]); 

  return (
    <>
      <CustomBanner
        title={localizedData.title}
        pageTitle={t("home.latest_news")}
        service={localizedData.title}
        image={localizedData.image}
      />
      <Box
        sx={{
          mt: "290px",
          position: "relative",
        }}
      >
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
            zIndex: -1111,
          }}
        />
        <Box
          sx={{
            pr: { xs: 2, sm: 8, lg: 40 },
            pl: { xs: 2, sm: 8, lg: 40 },
            mb: "50px",
            p: 1,
            pt: 5,
          }}
        >
          <Heading text={localizedData.content} />
        </Box>
      </Box>

      <Container maxWidth="lg">
        <PromoBanner />
        <Box sx={{ pt: "64px", pb: "80px" }}>
          <Box sx={{ p: "24px" }}>
            <Heading text={t("home.relatednews")} />
          </Box>
          <LastNewsComponent displayCount={3} />
        </Box>
      </Container>
    </>
  );
};

export default News;
