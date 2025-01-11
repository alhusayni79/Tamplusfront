import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import CustomButton from "./CustomButton";
import frame20 from "../../assets/image/frame20.png";
import frame19 from "../../assets/image/fram19.png";
import linesBackground from "../../assets/image/lines.png";
import { useTranslation } from "react-i18next";

const PromoBanner = () => {
  const theme = useTheme();
 const {  t } = useTranslation();
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          borderRadius: "40px",
          textAlign: "center",
          color: "#fff",
          padding: { xs: "20px 10px", sm: "30px 20px", md: "40px 30px" },
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#003366",
          zIndex:5,
          backgroundImage: {
            xs: "none",
            md: `url(${linesBackground})`,
          },
          height: { xs: "300px", sm: "350px", md: "400px" },
          backgroundOrigin: "content-box",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "16px", sm: "20px", md: "24px" },
            fontWeight: "500",
            color: "#C2C6CC",
            mb: { xs: 1, md: 2 },
          }}
        >
          {t("home.ready")}
        </Typography>

        <Typography
          sx={{
            mb: { xs: 2, sm: 3 },
            fontSize: { xs: "20px", sm: "28px", md: "40px" },
            fontWeight: "700",
            color: theme.palette.primary.white,
            width: { xs: "90%", sm: "70%", md: "50%" },
            zIndex: 11,
            lineHeight: 1.3,
          }}
        >
          {t("home.readymore")}
        </Typography>

        <CustomButton
          onClick={() => alert("Button Clicked!")}
          backgroundColor="white"
          textColor="#003366"
          fontWeight="bold"
          sx={{
            zIndex: 100,
            padding: { xs: "8px 16px", sm: "10px 20px" },
            fontSize: { xs: "14px", sm: "16px", md: "18px" },
          }}
        >
          {t("buttons.join_now")}
        </CustomButton>

        <Box
          component="img"
          src={frame20}
          alt="Bottom Left"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            zIndex: 0,
            width: { xs: "80px", sm: "120px", md: "20%" },
            display: { xs: "none", md: "block" },
            height:"100%",
            zIndex:-1
          }}
        />

        <Box
          component="img"
          src={frame19}
          alt="Bottom Right"
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            zIndex: 0,
            width: { xs: "80px", sm: "120px", md: "20%" },
            display: { xs: "none", md: "block" },
            height:"100%",
            zIndex:-1
          }}
        />
      </Box>
    </Container>
  );
};

export default PromoBanner;
