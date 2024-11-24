import React, { useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  useTheme,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../redux/Slices/blogsData/blogSlice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const LastNewsComponent = ({ displayCount }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();

  const theme = useTheme();
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const displayedBlogs = blogs?.response?.data?.slice(0, displayCount) || [];

  const handleCardClick = (news) => {
    navigate(`/lastnews/${news.slug[currentLang]}`, {
      state: {
        id: news.id,
        title: news.title[currentLang],
        image: news.image,
        content: news.content[currentLang],
      },
    });
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={{ xs: 0, sm: 2, md: 3 }}>
        {displayedBlogs.map((news) => (
          <Grid item key={news.id} xs={12} sm={6} md={4} lg={4}>
            <Card
              sx={{
                height: "100%",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
              elevation={0}
              onClick={() => handleCardClick(news)}
            >
              <CardMedia
                component="img"
                sx={{
                  height: { xs: "200px", md: "290px" },
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
                image={news.image}
                alt={news.title[currentLang]}
              />
              <CardContent sx={{ p: 0, mt: 2 }}>
                <Typography
                  sx={{
                    mb: 1,
                    fontSize: "20px",
                    fontWeight: "700",
                    color: theme.palette.primary.main.dark,
                  }}
                >
                  {news.title[currentLang]}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "400",
                    color: theme.palette.primary.main.body,
                  }}
                >
                  {news.content[currentLang]}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default LastNewsComponent;
