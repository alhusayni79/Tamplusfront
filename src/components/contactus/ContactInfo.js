import {
  Box,
  Typography,
  Card,
  CardContent,
  useTheme,
  IconButton,
} from "@mui/material";
import Calling from "../../assets/image/Calling.png";
import Mail from "../../assets/image/Mail.png";
import Location from "../../assets/image/Location.png";
import Linkedin from "../../assets/image/linkedin.png";
import Instgram from "../../assets/image/Instagram.png";
import Twitter from "../../assets/image/Twitter.png";
import Facebook from "../../assets/image/Facebook.png";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchFooter } from "../../redux/Slices/FooterData/footerSlice";
import { useEffect } from "react";
import LoadingSpinner from "../shared/LoadingSpinner";
const ContactInfo = () => {
  const theme = useTheme();
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const dispatch = useDispatch();
  const { footer, loading, error } = useSelector((state) => state.footer);

  useEffect(() => {
    dispatch(fetchFooter());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <Card
      sx={{
        maxWidth: 352,
        mx: "auto",
        mt: 4,
        position: "relative",
        backgroundColor: "white",
        borderBottomLeftRadius: "8px",
        borderBottomRightRadius: "8px",
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
        p: 1,
      }}
      elevation={1}
    >
      <Box
        sx={{
          width: "100%",
          height: "7px",
          backgroundColor: "#07489D",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      <CardContent>
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: "22px",
            color: theme.palette.primary.dark,
            pt: 2,
          }}
        >
          اتصل بالدعم
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
            gap: 3,
            pt: 2,
            pb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 1,
            }}
          >
            <img src={Calling} alt="calling" height="20px" width="20px" />
            <Box>
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: "20px",
                  color: theme.palette.primary.dark,
                  mt: "-5px",
                }}
              >
                رقم الجوال
              </Typography>
              <Typography
                component="a"
                href={`tel:${footer?.response?.phone}`}
                sx={{
                  color: theme.palette.primary.body,
                  fontWeight: "400",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {footer?.response?.phone}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 1,
            }}
          >
            <img src={Mail} alt="calling" height="20px" width="20px" />
            <Box>
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: "20px",
                  color: theme.palette.primary.dark,
                  mt: "-5px",
                }}
              >
                الإيميل{" "}
              </Typography>
              <Typography
                component="a"
                href={`mailto:${footer?.response?.email}`}
                sx={{
                  color: theme.palette.primary.body,
                  fontWeight: "400",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {footer?.response?.email}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 1,
            }}
          >
            <img src={Location} alt="calling" height="20px" width="20px" />
            <Box>
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: "20px",
                  color: theme.palette.primary.dark,
                  mt: "-5px",
                }}
              >
                الموقع{" "}
              </Typography>
              <Typography
                component="a"
                href={`https://www.google.com/maps?q=:${footer?.response?.address}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: theme.palette.primary.body,
                  fontWeight: "400",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {footer?.response?.address}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: "22px",
            color: theme.palette.primary.dark,
            pt: 2,
            pb: 2,
          }}
        >
          مواقع التواصل
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "row",
            gap: 3,
          }}
        >
          <Box display="flex" justifyContent="right" gap={2}>
            <a
              href={footer?.response?.social_links?.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton
                sx={{
                  border: "1px solid #E1E5EB",
                  borderRadius: "50%",
                  width: "48px",
                  height: "48px",
                }}
              >
                <img src={Linkedin} alt="LinkedIn" height="20px" width="20px" />
              </IconButton>
            </a>
            <a
              href={footer?.response?.social_links?.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton
                sx={{
                  border: "1px solid #E1E5EB",
                  borderRadius: "50%",
                  width: "48px",
                  height: "48px",
                }}
              >
                <img src={Instgram} alt="calling" height="20px" width="20px" />
              </IconButton>
            </a>
            <a
              href={footer?.response?.social_links?.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton
                sx={{
                  border: "1px solid #E1E5EB",
                  borderRadius: "50%",
                  width: "48px",
                  height: "48px",
                }}
              >
                <img src={Twitter} alt="calling" height="20px" width="20px" />
              </IconButton>
            </a>
            <a
              href={footer?.response?.social_links?.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton
                sx={{
                  border: "1px solid #E1E5EB",
                  borderRadius: "50%",
                  width: "48px",
                  height: "48px",
                }}
              >
                <img src={Facebook} alt="calling" height="20px" width="20px" />
              </IconButton>
            </a>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ContactInfo;
