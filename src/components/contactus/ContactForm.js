import React from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import CustomInput from "../shared/CustomInput";
import CustomButton from "../shared/CustomButton";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
    const { i18n, t } = useTranslation();
  const theme = useTheme();
  const validationSchema = Yup.object({
    firstName: Yup.string().required(t("contact.Name is required")),
    lastName: Yup.string().required(t("contact.last is required")),
    phone: Yup.string()
      .matches(/^\d{12}$/, t("contact.numberlength"))
      .required(t("contact.Mobile number is required")),
    email: Yup.string()
      .email(t("contact.Invalid email"))
      .required(t("contact.Email is required")),
    message: Yup.string().required(t("contact.Message is required")),
  });
  
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/user/contact`,
          {
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            phone: values.phone,
            message: values.message,
          }
        );
        toast.success(t("contact.successMessage"));
        resetForm();
      } catch (error) {
        toast.error(t("contact.errorMessage"));
      }
    },
  });

  return (
    <>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ maxWidth: { xs: 350, sm: 500 }, mx: "auto", mt: 4 }}
      >
        <Typography
          sx={{
            fontWeight: "500",
            fontSize: "24px",
            color: theme.palette.primary.dark,
            mb: 4,
          }}
        >
          {t("contact.start")}
         
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomInput
              label=   {t("contact.firstname")}
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(
                formik.touched.firstName && formik.errors.firstName
              )}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <Typography color="error">{formik.errors.firstName}</Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              label=   {t("contact.lastname")}
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.lastName && formik.errors.lastName)}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <Typography color="error">{formik.errors.lastName}</Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <CustomInput
              label=   {t("contact.Mobile number")}
              name="phone"
              value={formik.values.phone.replace(/^966/, "")}
              onChange={(e) => {
                const inputValue = e.target.value;
                formik.setFieldValue("phone", "966" + inputValue);
              }}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.phone && formik.errors.phone)}
              InputProps={{
                startAdornment: (
                  <Typography sx={{ color: "text.secondary", ml: 1 }}>
                    966
                  </Typography>
                ),
                sx: {
                  direction: "ltr",
                  textAlign: "left",
                  "& input": {
                    textAlign: "left",
                    direction: "ltr",
                    paddingLeft: "8px",
                  },
                },
              }}
            />

            {formik.touched.phone && formik.errors.phone && (
              <Typography color="error">{formik.errors.phone}</Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              label=   {t("contact.Email")}
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.email && formik.errors.email)}
            />
            {formik.touched.email && formik.errors.email && (
              <Typography color="error">{formik.errors.email}</Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              label=   {t("contact.Message")}
              isTextarea
              rows={8}
              name="message"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.message && formik.errors.message)}
            />
            {formik.touched.message && formik.errors.message && (
              <Typography color="error">{formik.errors.message}</Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <CustomButton
              type="submit"
              backgroundColor={theme.palette.primary.main}
            >
          {t("buttons.send")}

       
            </CustomButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ContactForm;
