import React, { useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../shared/CustomInput";
import CustomButton from "../shared/CustomButton";
import Cookies from "js-cookie";

function UpdateProfile() {
  const [imagePreview, setImagePreview] = useState(null);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("الاسم الأول مطلوب"),
    lastName: Yup.string().required("الاسم الأخير مطلوب"),
    phone: Yup.string()
      .required("رقم الهاتف المحمول مطلوب"),
    email: Yup.string()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      image: null, 
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
        try {
          const formData = new FormData();
          formData.append("first_name", values.firstName);
          formData.append("last_name", values.lastName);
          formData.append("email", values.email);
          formData.append("phone", values.phone);
          if (values.image) {
            formData.append("image", values.image);
          }
      
          const baseURL = process.env.REACT_APP_BASE_URL;
          const token = Cookies.get("auth_token");
      
          const response = await fetch(`${baseURL}/user/profile`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`, 
            },
            body: formData,
          });
      
          if (!response.ok) {
            throw new Error("Failed to update profile");
          }
      
          const data = await response.json();
          console.log("Profile updated successfully:", data);
          // Handle success (e.g., show a success message or redirect)
        } catch (error) {
          console.error("Error updating profile:", error);
          // Handle error (e.g., show an error message)
        }
      },
      
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      formik.setFieldValue("image", file); // Ensure 'image' is correctly set in Formik
    }
  };
  

  return (
    <Box minHeight="auto">
      <form onSubmit={formik.handleSubmit}>
        <Paper
          elevation={0}
          sx={{
            padding: "2rem",
            width: "100%",
            bgcolor: "transparent",
            mb: "32px",
          }}
        >
          <Box sx={{ mb: "32px" }}>
            <CustomInput
              label="الاسم الأول"
              placeholder="سيف"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
              sx={{ textAlign: "right" }}
            />
          </Box>
          <Box sx={{ mb: "32px" }}>
            <CustomInput
              label="الاسم الأخير"
              placeholder="الخطابي"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
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
            <Box sx={{ mb: "32px", textAlign: "center" }}>
                <Typography sx={{ mb: 2 }}>تحميل الصورة الشخصية</Typography>
                <Button
                variant="contained"
                component="label"
                sx={{ backgroundColor: "#07489D", color: "#fff" }}
                >
                اختر صورة
                <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                />
                </Button>
                {imagePreview && (
                <Box sx={{ mt: 2 }}>
                    <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                    />
                </Box>
                )}
            </Box>
        </Paper>
        <CustomButton type="submit" backgroundColor="#07489D">
          حفظ التغييرات
        </CustomButton>
      </form>
    </Box>
  );
}

export default UpdateProfile;
