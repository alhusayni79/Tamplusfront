import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { Container, Paper, Typography, Box, useTheme, Grid } from "@mui/material";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import { toast } from "react-toastify";
import ResponsiveAppBar from "../layout/header/Header";

const translations = {
  en: {
    title: "Refund Form",
    token: "Verification Token",
    accountOwnerName: "Account Owner Name",
    bankName: "Bank Name",
    accountNumber: "Account Number",
    iban: "IBAN",
    submit: "Submit",
  },
  ar: {
    title: "نموذج الاسترداد",
    token: "رمز التحقق",
    accountOwnerName: "اسم صاحب الحساب",
    bankName: "اسم البنك",
    accountNumber: "رقم الحساب",
    iban: "IBAN",
    submit: "إرسال",
  },
};

const Refund = () => {
  const theme = useTheme();
  const location = useLocation();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  const [formData, setFormData] = useState({
    token: "",
    bank_name: "",
    account_number: "",
    iban: "",
    account_owner_name: "",
  });

  const translate = translations[language];

  useEffect(() => {
    const urlToken = location.pathname.split("token=")[1];
    if (urlToken) {
      setFormData((prev) => ({ ...prev, token: urlToken }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userToken = Cookies.get("auth_token");

    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/customer-bank-info`,
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      toast.success(
        language === "ar"
          ? "تم إرسال البيانات بنجاح"
          : "Data submitted successfully"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          (language === "ar" ? "حدث خطأ ما" : "An error occurred")
      );
    }
  };

  return (
    <>
     <Box
        sx={{
          position: "sticky",
          top: -1,
          zIndex: 10,
          mb: 5,
          bgcolor:"#003366"
        }}
      >
      <ResponsiveAppBar/>
      </Box>
     <Container maxWidth="sm">
     

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "100%",
            mt: 4,
            mb: 4,
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            align="center"
            gutterBottom
            sx={{ mb: 4 }}
          >
            {translate.title}
          </Typography>


<form onSubmit={handleSubmit} >
  <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={3}>
      {/* First Row: Two Inputs */}
      <Grid item xs={12} sm={6}>
        <CustomInput
          label={translate.token}
          name="token"
          value={formData.token}
          onChange={handleChange}
          fullWidth
          required
          variant="outlined"
          disabled
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomInput
          label={translate.accountOwnerName}
          name="account_owner_name"
          value={formData.account_owner_name}
          onChange={handleChange}
          fullWidth
          required
          variant="outlined"
        />
      </Grid>

      {/* Second Row: Two Inputs */}
      <Grid item xs={12} sm={6}>
        <CustomInput
          label={translate.bankName}
          name="bank_name"
          value={formData.bank_name}
          onChange={handleChange}
          fullWidth
          required
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomInput
          label={translate.accountNumber}
          name="account_number"
          value={formData.account_number}
          onChange={handleChange}
          fullWidth
          required
          variant="outlined"
        />
      </Grid>

      {/* Third Row: IBAN */}
      <Grid item xs={12}>
        <CustomInput
          label={translate.iban}
          name="iban"
          value={formData.iban}
          onChange={handleChange}
          fullWidth
          required
          variant="outlined"
        />
      </Grid>

      {/* Submit Button */}
      <Grid item xs={12}>
        <CustomButton
          type="submit"
          backgroundColor={theme.palette.primary.main}
          width="100%"
          sx={{ mt: 2 }}
        >
          {translate.submit}
        </CustomButton>
      </Grid>
    </Grid>
  </Box>
</form>

        </Paper>
      </Box>
    </Container>
    </>
   
  );
};

export default Refund;
