import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../shared/CustomInput";
import CustomButton from "../shared/CustomButton";

function PaymentInfoForm() {
  const validationSchema = Yup.object({
    bankName: Yup.string().required("اسم البنك مطلوب"),
    accountNumber: Yup.string()
      .matches(/^\d+$/, "يجب أن يتكون رقم الحساب من أرقام فقط")
      .required("رقم الحساب مطلوب"),
    iban: Yup.string()
      .matches(/^FA\d{2}\d{22}$/, "يجب أن يكون IBAN رقم بصيغة صحيحة")
      .required("IBAN رقم مطلوب"),
  });

  // Setup Formik
  const formik = useFormik({
    initialValues: {
      bankName: "",
      accountNumber: "",
      iban: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
    },
  });

  return (
    <Box minHeight="100vh" bgcolor="#f5f5f5">
      <Typography variant="h6" align="right" sx={{ mb: 2 }}>
        معلومات الدفع
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
              label="اسم البنك"
              placeholder="مثال لاسم البنك"
              name="bankName"
              value={formik.values.bankName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.bankName && Boolean(formik.errors.bankName)}
              helperText={formik.touched.bankName && formik.errors.bankName}
              sx={{ textAlign: "right" }}
            />
          </Box>

          <Box sx={{ mb: "32px" }}>
            <CustomInput
              label="رقم الحساب"
              placeholder="23423487108349234"
              name="accountNumber"
              value={formik.values.accountNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.accountNumber &&
                Boolean(formik.errors.accountNumber)
              }
              helperText={
                formik.touched.accountNumber && formik.errors.accountNumber
              }
              sx={{ textAlign: "right" }}
            />
          </Box>

          <Box sx={{ mb: "10px" }}>
            <CustomInput
              label="IBAN رقم"
              placeholder="FA2343223423234"
              name="iban"
              value={formik.values.iban}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.iban && Boolean(formik.errors.iban)}
              helperText={formik.touched.iban && formik.errors.iban}
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

export default PaymentInfoForm;
