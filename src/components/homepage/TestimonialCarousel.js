import React from "react";
import Slider from "react-slick";
import {
  Box,
  Card,
  Typography,
  Button,
  IconButton,
  CardContent,
  Avatar,
  useTheme,
  Container,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import avatar from "../../assets/image/avatar.png";
import Primary from "../../assets/image/Primary.png";
const testimonials = [
  {
    name: "محمد الشهرواي",
    image: avatar,
    text: "لوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور طريقه وضع النصوص بالتصاميم سواء كانت تصاميم مطبوعه … بروشور او فلاير على سبيل المثال … او نماذج مواقع انترنت …",
    rating: 5,
  },
  {
    name: "محمد ناصر",
    image: avatar,
    text: "لوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور طريقه وضع النصوص بالتصاميم سواء كانت تصاميم مطبوعه … بروشور او فلاير على سبيل المثال … او نماذج مواقع انترنت …",
    rating: 5,
  },
  {
    name: "يوسف عبدالعزيز",
    image: avatar,
    text: "لوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور طريقه وضع النصوص بالتصاميم سواء كانت تصاميم مطبوعه … بروشور او فلاير على سبيل المثال … او نماذج مواقع انترنت …",
    rating: 5,
  },
];

function NextArrow(props) {
  const { onClick } = props;
  return (
    <IconButton
      sx={{
        position: "absolute",
        top: "120%",
        right: "25%",
        zIndex: 2,
        transform: "translateY(-50%)",
        borderRadius: "50%",
        backgroundColor: "#F4F5F6",
        color: "#07489D",
        padding: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        display: { xs: "none", sm: "none", md: "flex" },
        "&:hover": {
          backgroundColor: "#f0f8ff",
        },
      }}
      onClick={onClick}
    >
      <ArrowForwardIcon sx={{ color: "#07489D" }} />
    </IconButton>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <IconButton
      sx={{
        position: "absolute",
        top: "120%",
        left: "25%",
        zIndex: 2,
        transform: "translateY(-50%)",
        backgroundColor: "#F4F5F6",
        color: "white",
        borderRadius: "50%",
        padding: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        display: { xs: "none", sm: "none", md: "flex" },
        "&:hover": {
          backgroundColor: "#f0f8ff",
        },
      }}
      onClick={onClick}
    >
      <ArrowBackIcon sx={{ color: "#07489D" }} />
    </IconButton>
  );
}

function CategoryCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: (i) => (
      <Box
        className="custom-dot"
        sx={{
          width: "12px",
          height: "12px",
          backgroundColor: "gray",
          margin: "0 5px",
          mt: 5,
        }}
      />
    ),
    dotsClass: "slick-dots",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const theme = useTheme();

  return (
    <Container maxWidth="lg">

   
    <Box
      sx={{
        backgroundColor: "transparent",
        position: "relative",
      }}
    >
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <Box key={index} sx={{ padding: "0 0.8rem" }}>
            <Card
              key={index}
              sx={{
                borderRadius: 3,
                textAlign: "center",
                backgroundColor: "#F4F5F6",
                width: "100%",
                height: "196px",
                justifyContent: "space-between",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              elevation={0}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <img
                    src={Primary}
                    alt="column"
                    style={{ width: 42, height: 30 }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "18px",
                          color: theme.palette.primary.dark,
                        }}
                      >
                        {testimonial.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "400",
                          fontSize: "14px",
                          color: theme.palette.primary.body,
                          textAlign: "right",
                        }}
                      >
                        {"⭐".repeat(testimonial.rating)}
                      </Typography>
                    </Box>
                    <Box>
                      <Avatar
                        src={testimonial.image}
                        alt={testimonial.name}
                        sx={{ width: 50, height: 50, margin: "0 auto" }}
                      />
                    </Box>
                  </Box>
                </Box>
                <Typography variant="body1">
                  {testimonial.text.length > 100
                    ? `${testimonial.text.slice(0, 80)}...`
                    : testimonial.text}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
    </Container>
  );
}

export default CategoryCarousel;