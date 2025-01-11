import React, { useEffect, useState } from "react";
import { Box, Grid, Link, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import Footer2 from "../../../assets/image/footer2.png";
import Logofooter1 from "../../../assets/image/logofooter1.png";
import Phone from "../../../assets/image/phone.png";
import Envelope from "../../../assets/image/envelope.png";
import Locationdot from "../../../assets/image/locationdot.png";
import Logofooter from "../../../assets/image/logofooter.png";
import Mada from "../../../assets/image/mada.png";
import Visa from "../../../assets/image/visa.png";
import Payment from "../../../assets/image/payment.png";
import ApplePay from "../../../assets/image/ApplePay.png";
import Wazin from "../../../assets/image/wazin.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchFooter } from "../../../redux/Slices/FooterData/footerSlice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Offcanvas } from "react-bootstrap";
import Cookies from "js-cookie";
import LoadingSpinner from "../../shared/LoadingSpinner";
export default function ResponsiveFooter() {
  const theme = useTheme();
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [offcanvasContent, setOffcanvasContent] = useState("");
  const [offcanvasTitle, setOffcanvasTitle] = useState("");
  const authEmployeeCookie = Cookies.get("authemployee");
  const handleEmployee = () => {
    navigate("/employee/register");
  };
  const dispatch = useDispatch();
  const { footer, loading, error } = useSelector((state) => state.footer);

  useEffect(() => {
    dispatch(fetchFooter());
  }, [dispatch, currentLang]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleTypographyClick = (contentKey, title) => {
    setOffcanvasContent(
      footer?.response?.[contentKey]?.[currentLang] || "No content available"
    );
    setOffcanvasTitle(title);
    setShowOffcanvas(true);
  };

  const handleCloseOffcanvas = () => {
    setShowOffcanvas(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        textAlign: "center",
        pr: { xs: 1, sm: 3, md: 18 },
        pl: { xs: 1, sm: 3, md: 18 },
        pt: 5,
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          padding: { xs: "10px", md: "10px" },
          gap: { xs: 2, sm: 0 },
          flexDirection: { md: "row", lg: "row-reverse" },
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          lg={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            mb: 2,
            justifyContent: "space-between",
            height: "185px",
            order: { xs: 4, md: 4, lg: 1 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "5px",
            }}
          >
            <img
              src={Footer2}
              alt="Saudi Business Center Logo"
              style={{ maxWidth: "150px" }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  color: "#0F121F",
                  fontSize: "14px",
                  textAlign: currentLang === "ar" ? "right" : "left",
                }}
              >
                {footer?.response?.company_name[currentLang]}
              </Typography>
              <Typography
                sx={{
                  color: "#0F121F",
                  fontSize: "14px",
                  textAlign: currentLang === "ar" ? "right" : "left",
                }}
              >
                {t("footer.Commercial-Registration")}{" "}
                {footer?.response?.commercial_register}
              </Typography>
              <Typography
                sx={{
                  color: "#0F121F",
                  fontSize: "14px",
                  textAlign: currentLang === "ar" ? "right" : "left",
                }}
              >
                {t("footer.Tax-Number")}{" "}
                {footer?.response?.vat_registeration_number}
              </Typography>
            </Box>
          </Box>

          <img
            src={Logofooter1}
            alt="Saudi Business Center Logo"
            style={{ maxWidth: "269px" }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 1.5,
            order: { xs: 3, md: 3, lg: 3 },
          }}
        >
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "20px",
              color: theme.palette.primary.dark,
            }}
          >
            {t("footer.Contact info")}
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: 1, gap: 1 }}
          >
            <img
              src={Phone}
              alt="Saudi Business Center Logo"
              style={{ maxWidth: "150px" }}
            />
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
          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: 1, gap: 1 }}
          >
            <img
              src={Envelope}
              alt="Saudi Business Center Logo"
              style={{ maxWidth: "150px" }}
            />
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
          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: 1, gap: 1 }}
          >
            <img
              src={Locationdot}
              alt="Saudi Business Center Logo"
              style={{ maxWidth: "150px" }}
            />
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
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          lg={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 1.5,
            order: { xs: 2, md: 2, lg: 2 },
          }}
        >
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "20px",
              color: theme.palette.primary.dark,
            }}
          >
            {t("footer.Other resources")}
          </Typography>
          <>
            {authEmployeeCookie && (
              <Typography
                onClick={handleEmployee}
                sx={{
                  color: "primary",
                  fontWeight: "400",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                {t("footer.statrwithus")}
              </Typography>
            )}
            <Typography
              onClick={() =>
                handleTypographyClick(
                  "privacy_policy_content",
                  t("footer.privacy_policy")
                )
              }
              sx={{
                color: "primary",
                fontWeight: "400",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              {footer?.response?.privacy_policy_content?.[currentLang]}
            </Typography>
            <Typography
              onClick={() =>
                handleTypographyClick(
                  "terms_and_conditions_content",
                  t("footer.terms_conditions")
                )
              }
              sx={{
                color: "primary",
                fontWeight: "400",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              {footer?.response?.terms_and_conditions_content?.[currentLang]}
            </Typography>

            <Offcanvas
              show={showOffcanvas}
              onHide={handleCloseOffcanvas}
              placement={currentLang === "ar" ? "end" : "start"}
            >
              <Offcanvas.Header>
                <Offcanvas.Title>{offcanvasTitle}</Offcanvas.Title>
                <CloseIcon
                  className="custom-close-icon"
                  onClick={handleCloseOffcanvas}
                />
              </Offcanvas.Header>
              <Offcanvas.Body>
                <p>{offcanvasContent}</p>
              </Offcanvas.Body>
            </Offcanvas>
          </>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 1,
            order: { xs: 1, md: 1, lg: 4 },
          }}
        >
          <img
            src={Logofooter}
            alt="Saudi Business Center Logo"
            style={{ maxWidth: "150px" }}
          />
          <Typography
            sx={{
              color: theme.palette.primary.body,
              fontWeight: "400",
              width: "70%",
              textAlign: currentLang === "ar" ? "right" : "left",
            }}
          >
            {footer?.response?.description[currentLang]}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          borderTop: "1px solid",
          borderImage:
            "linear-gradient(to right, rgba(187, 215, 252, 0) 10%, #BBD7FC33 20%, #07489D66 40%, #BBD7FC33 80%, rgba(187, 215, 252, 0) 60%) 1",
          pt: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 5, sm: 0 },
          py: 3,
        }}
      >
        <Typography
          sx={{
            marginTop: "10px",
            color: theme.palette.primary.dark,
            fontWeight: "400",
            fontSize: "16px",
          }}
        >
          {t("footer.All-rights")}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 4 }}>
          <img
            src={Mada}
            alt="Saudi Business Center Logo"
            style={{ maxWidth: "150px" }}
          />
          <img
            src={Visa}
            alt="Saudi Business Center Logo"
            style={{ maxWidth: "150px" }}
          />
          <img
            src={Payment}
            alt="Saudi Business Center Logo"
            style={{ maxWidth: "150px" }}
          />
          <img
            src={ApplePay}
            alt="Saudi Business Center Logo"
            style={{ maxWidth: "150px" }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
          <Typography
            sx={{
              color: theme.palette.primary.dark,
              fontWeight: "400",
              fontSize: "16px",
            }}
            component="a"
            href="https://www.wazin.sa/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            {t("footer.made")}
          </Typography>
          <img
            src={Wazin}
            alt="Saudi Business Center Logo"
            style={{ maxWidth: "150px" }}
          />
        </Box>
      </Grid>
    </Box>
  );
}
