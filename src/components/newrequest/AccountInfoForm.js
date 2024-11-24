import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../shared/CustomInput";
import CustomButton from "../shared/CustomButton";

function AccountInfoForm() {
  const validationSchema = Yup.object({
    name: Yup.string().required("الاسم مطلوب"),
    phone: Yup.string()
      .matches(/^\+966\d{9}$/, "رقم الهاتف المحمول غير صحيح")
      .required("رقم الهاتف المحمول مطلوب"),
    email: Yup.string().email("البريد الإلكتروني غير صحيح").required("البريد الإلكتروني مطلوب"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
    },
  });

  return (
    <Box minHeight="100vh" bgcolor="#f5f5f5">
      <Typography variant="h6" align="right" sx={{ mb: 2 }}>
        معلومات الحساب
      </Typography>
      <form onSubmit={formik.handleSubmit}>
      <Paper
        elevation={0}
        sx={{
          padding: "2rem",
          width: "100%",
          bgcolor: "#ffffff",
          border: "1px solid #D8DBDE",
          mb: "32px",
        }}
      >
        
          <Box sx={{ mb: "32px" }}>
            <CustomInput
              label="الاسم"
              placeholder="سيف الخطابي"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              sx={{ textAlign: "right" }}
            />
          </Box>

          <Box sx={{ mb: "32px" }}>
            <CustomInput
              label="رقم الهاتف المحمول"
              placeholder="+966507917664"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              sx={{ textAlign: "right" }}
            />
          </Box>

          <Box sx={{ mb: "10px" }}>
            <CustomInput
              label="البريد الإلكتروني"
              placeholder="example@info.com"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ textAlign: "right" }}
            />
          </Box>

         
      </Paper>
      <CustomButton type="submit" backgroundColor="#07489D">
            حفظ التغييرات
          </CustomButton>
        </form>
    </Box>
  );
}

export default AccountInfoForm;
