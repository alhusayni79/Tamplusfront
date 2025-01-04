import { useParams, useLocation } from "react-router-dom";
import {
  Card,
  Typography,
  Grid,
  Box,
  Tabs,
  Tab,
  Container,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useTheme } from "@emotion/react";
import CustomBanner from "../layout/CustomBanner";
import CustomButton from "../shared/CustomButton";
import { useNavigate } from "react-router-dom";
import UsersIcon from "../../assets/image/Users.png";
import TimeCircle from "../../assets/image/TimeCircle.png";
import Coins from "../../assets/image/Coins.png";
import { useTranslation } from "react-i18next";
import ServiceInfoTabs from "./ServiceInfoTabs";
import axios from "axios";
import RequiredDataModal from "./paymentcomponent/RequiredDataModal";
import Cookies from "js-cookie";

export default function ServicePage() {
  const [formData, setFormData] = useState({});
  const [requiredFields, setRequiredFields] = useState([]);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const { label } = useParams();
  const location = useLocation();
  const {
    mainTitle,
    price,
    description,
    id,
    title,
    requiredDocuments,
    terms,
    period,
    price_without_vat,
    government_fees_without_vat,
    government_fees_with_vat,
  } = location.state || {};

  const navigate = useNavigate();

  const handleModalClose = () => {
    setOpenModal(false);
    setError("");
  };

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleModalSubmit = (formData) => {
    // Navigate to payment page with the form data
    navigate(`/services/${label}/Payment`, {
      state: {
        price,
        description,
        id,
        requiredDocuments,
        terms,
        period,
        price_without_vat,
        government_fees_without_vat,
        government_fees_with_vat,
        ...formData, // Include the form data
      },
    });
    setOpenModal(false);
  };

  const validateAndOpenModal = async () => {
    try {
      const baseURL = process.env.REACT_APP_BASE_URL;
      const token = Cookies.get("auth_token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${baseURL}/user/required-data`,
        {},
        config
      );
      navigate(`/services/${label}/Payment`, {
        state: {
          price,
          description,
          id,
          requiredDocuments,
          terms,
          period,
          price_without_vat,
          government_fees_without_vat,
          government_fees_with_vat,
        },
      });
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login", {
          state: {
            returnUrl: `/services/${label}`, 
          },
        });
      } else if (error.response?.status === 422) {
        setRequiredFields(error.response.data.response || []);
        setOpenModal(true);
      }
    }
  };

  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [serviceDetails, setServiceDetails] = useState(null);

  useEffect(() => {
    if (label) {
      const mockData = {
        "renew-residency": {
          category: "Visa Services",
          serviceDescription:
            "This service allows beneficiaries to renew the residency of workers.",
          serviceConditions: "The worker's contract must be valid.",
          documentsRequired: "Copy of passport, ID, etc.",
          steps: "1. Log in, 2. Select service, 3. Complete the form, etc.",
        },
        "transfer-sponsorship": {
          category: "Labor Services",
          serviceDescription:
            "This service allows transferring the sponsorship of workers.",
          serviceConditions: "Sponsor approval is required.",
          documentsRequired: "Sponsor documents, Worker ID, etc.",
          steps: "1. Log in, 2. Select service, 3. Transfer process, etc.",
        },
      };

      setServiceDetails(mockData[label] || {});
    }
  }, [label]);

  if (!serviceDetails) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <CustomBanner
        title={title[currentLang]}
        subtitle={mainTitle}
        service={title[currentLang]}
      />
      <Container
        maxWidth="lg"
        sx={{
          mt: "-100px",
          paddingTop: "450px",
        }}
      >
        <Grid
          container
          spacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ padding: "20px" }}
          flexDirection={"row-reverse"}
        >
          {/* Left Side Panel */}
          <Grid item xs={12} md={12} lg={4}>
            <Card
              sx={{
                padding: "40px 40px",
                position: "relative",
                borderBottomLeftRadius: "8px",
                borderBottomRightRadius: "8px",
                borderTopLeftRadius: "0px",
                borderTopRightRadius: "0px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
              elevation={1}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "7px",
                  backgroundColor: theme.palette.primary.main,
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
              ></Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: 2,
                  pb: 4,
                }}
              >
                <img src={UsersIcon} width={32} height={32} alt="user" />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "400",
                      color: theme.palette.primary.body,
                    }}
                  >
                    الفئة المستفيدة
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: theme.palette.primary.dark,
                    }}
                  >
                    سعودي
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: 2,
                  pb: 4,
                }}
              >
                <img src={TimeCircle} width={32} height={32} alt="TimeCircle" />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "400",
                      color: theme.palette.primary.body,
                    }}
                  >
                    مدة تنفيذ الخدمة
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: 700,
                        color: theme.palette.primary.dark,
                      }}
                    >
                      {period}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: 700,
                        color: theme.palette.primary.dark,
                      }}
                    >
                      ايام
                    </Typography>
                  </Box>
                </Box>
              </Box>
              {/* <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: 2,
                  pb: 4,
                }}
              >
                <img src={Coins} width={32} height={32} alt="Coins" />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "400",
                      color: theme.palette.primary.body,
                    }}
                  >
                    رسوم الخدمة
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: theme.palette.primary.dark,
                      }}
                    >
                      {price} ر.س للسجل الرئيسي
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: theme.palette.primary.dark,
                      }}
                    >
                      {price} ر.س للسجل الفرعي
                    </Typography>
                  </Box>
                </Box>
              </Box> */}

              <CustomButton
                backgroundColor={theme.palette.primary.main}
                width="100%"
                onClick={validateAndOpenModal}
              >
                ابدأ الخدمة الآن
              </CustomButton>

              <RequiredDataModal
                open={openModal}
                onClose={handleModalClose}
                requiredFields={requiredFields}
                onSubmit={handleModalSubmit}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={12} lg={8}>
            <ServiceInfoTabs
              description={description}
              requiredDocuments={requiredDocuments}
              terms={terms}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
