import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import CustomButton from "../shared/CustomButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import bannerBg from "../../assets/image/bannerbg.jpg";
import bannerRightImage from "../../assets/image/fram1.png";
import bannerLeftImage from "../../assets/image/fram2.png";
import { useTranslation } from "react-i18next";

const Banner = ({ data }) => {
  const theme = useTheme();
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "88vh", sm: "90vh", md: "90vh", lg: "85vh" },
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -2,
        }}
      >
        <img
          src={bannerBg}
          alt="Background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Blue Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgb(4 43 93 / 80%)",
          zIndex: -1,
        }}
      ></Box>

      {/* Content */}
      <Box
        sx={{
          position: "absolute",
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "fit-content",
          textAlign: "center",
          width: { xs: "80%", sm: "90%", md: "760px" },
        }}
      >
        <Typography
          sx={{
            color: theme.palette.primary.white,
            textAlign: "center",
            mb: 2,
            fontSize: {
              xs: "24px",
              sm: "32px",
              md: "40px",
              lg: "48px",
              xl: "60px",
            },
            fontWeight: "700",
          }}
        >
          {data?.data[0].value[currentLang]}
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            color: theme.palette.primary.white,
            mb: { xs: 3, sm: 4, md: 5 },
            fontSize: { xs: "16px", sm: "18px", md: "20px" },
            fontWeight: 400,
          }}
        >
          {data?.data[1].value[currentLang]}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <CustomButton
            onClick={() => alert("Button Clicked!")}
            backgroundColor="white"
            textColor="#07489D"
            border={"1px solid white"}
            sx={{ zIndex: 100 }}
          >
           {t("buttons.start_now")}
          </CustomButton>
          <CustomButton
            onClick={() => alert("Button Clicked!")}
            backgroundColor="transparent"
            border={"1px solid white"}
            sx={{ display: "flex", alignItems: "center", zIndex: 100 }}
          >
            <KeyboardArrowDownIcon sx={{ mr: 1, color: "white" }} />
            {t("buttons.learn_more")}
            </CustomButton>
        </Box>
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: { xs: "40%", sm: "30%", md: "20%" },
          height: "auto",
        }}
      >
        <img
          src={bannerRightImage}
          alt="Right Image"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: { xs: "40%", sm: "30%", md: "20%" },
          height: "auto",
        }}
      >
        <img
          src={bannerLeftImage}
          alt="Left Image"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </Box>
    </Box>
  );
};

export default Banner;
