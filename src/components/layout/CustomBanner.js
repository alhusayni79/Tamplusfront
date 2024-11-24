import { Box, Typography } from "@mui/material";
import heroImg from "../../assets/image/heroimage.jpg";
import OverlayImage from "../../assets/image/overlayCustom.png";

const CustomBanner = ({
  title,
  subtitle,
  service,
  pageTitle,
  dynamicTitle = "خدماتنا",
  image,
}) => {
  return (
    <>
      <Box
        sx={{
          height: "450px",
          width: "100%",
          backgroundImage: `url(${image || heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          position: "absolute",
          top: 0,
          bottom: 0,
          zIndex: -2,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "100%",
            height: "auto",
            display: { xs: "none", sm: "block" },
          }}
        >
          <img
            src={OverlayImage}
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
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgb(4 43 93 / 80%)",
            zIndex: -1,
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9,
          margin: "0px auto",
          width: "100%",
          mt:6
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "30px", sm: "38px", md: "48px" },
            fontWeight: "700",
            width: { sm: "100%", md: "836px" },
            zIndex: 1,
            mt: 5,
            color: "white",
            textAlign: "center",
          }}
        >
          {title}
        </Typography>

        {(subtitle || service) && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            {subtitle && service && (
              <Typography
                sx={{
                  position: "relative",
                  zIndex: 1,
                  fontWeight: "400",
                  fontSize: { xs: "14px", md: "16px" },
                  color: "#C2C6CC",
                }}
              >
                {dynamicTitle} {">"} {subtitle} {">"}
              </Typography>
            )}

            {subtitle && !service && (
              <Typography
                sx={{
                  position: "relative",
                  zIndex: 1,
                  fontWeight: "400",
                  fontSize: "16px",
                  color: "#C2C6CC",
                }}
              >
                {dynamicTitle} {">"} {subtitle}
              </Typography>
            )}

            {pageTitle && (
              <Typography
                sx={{
                  position: "relative",
                  zIndex: 1,
                  fontWeight: "400",
                  fontSize: "16px",
                  color: "#C2C6CC",
                }}
              >
                {pageTitle} {">"}
              </Typography>
            )}

            {service && (
              <Typography
                variant="h3"
                sx={{
                  position: "relative",
                  zIndex: 1,
                  fontWeight: "400",
                  fontSize: { xs: "14px", md: "16px" },
                  color: "white",
                }}
              >
                {service}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default CustomBanner;
