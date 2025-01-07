import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../../redux/Slices/userdata/userSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { Box, Typography, Paper, Button } from "@mui/material";
import CustomInput from "../shared/CustomInput";
import CustomButton from "../shared/CustomButton";
import { toast } from "react-toastify";

function UpdateProfile() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [imagePreview, setImagePreview] = useState(null);
  const baseURL = process.env.REACT_APP_BASE_URL;
  const validationSchema = Yup.object({
    firstName: Yup.string().required("الاسم الأول مطلوب"),
    lastName: Yup.string().required("الاسم الأخير مطلوب"),
    phone: Yup.string()
      .matches(/^\d{12}$/, "رقم الجوال يجب أن يحتوي على 12 رقمًا ويبدأ بـ 5")
      .required("رقم الجوال مطلوب"),

    email: Yup.string()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: userData?.user?.response?.first_name || "",
      lastName: userData?.user?.response?.last_name || "",
      phone: userData?.user?.response?.phone || "",
      email: userData?.user?.response?.email || "",
      image: null,
    },
    enableReinitialize: true,
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
        dispatch(fetchUserData());
        toast.success("تم تحديث البيانات بنجاح");
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("حدث خطأ أثناء تحديث البيانات");
        // alert("حدث خطأ أثناء تحديث البيانات");
      }
    },
  });

  useEffect(() => {
    if (userData?.user?.response?.image) {
      setImagePreview(userData?.user?.response?.image);
    }
  }, [userData, baseURL]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      formik.setFieldValue("image", file);
    }
  };

  return (
    <Box minHeight="auto">
      <form onSubmit={formik.handleSubmit}>
        <Paper
          elevation={0}
          sx={{
            padding: { xs: "0px", md: "2rem" },
            width: "100%",
            bgcolor: "transparent",
            mb: "32px",
          }}
        >
          <Box sx={{ mb: "32px" }}>
            <CustomInput
              label="الاسم الأول"
              // placeholder="سيف"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
              sx={{
                "& .MuiFormHelperText-root": {
                  textAlign: "right",
                },
                textAlign: "right",
              }}
            />
          </Box>
          <Box sx={{ mb: "32px" }}>
            <CustomInput
              label="الاسم الأخير"
              // placeholder="الخطابي"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              sx={{
                "& .MuiFormHelperText-root": {
                  textAlign: "right",
                },
                textAlign: "right",
              }}
            />
          </Box>
          <Box sx={{ mb: "32px" }}>
            <CustomInput
              label="رقم الجوال"
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
          </Box>
          <Box sx={{ mb: "10px" }}>
            <CustomInput
              label="البريد الإلكتروني"
              // placeholder="example@info.com"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{
                "& .MuiFormHelperText-root": {
                  textAlign: "right",
                },
                textAlign: "right",
              }}
            />
          </Box>
          <Box sx={{ mb: "32px", textAlign: "center" }}>
            <Typography sx={{ mb: 2, textAlign: "right" }}>
              الصورة الشخصية
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              {imagePreview && (
                <Box
                  sx={{
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2px solid #07489D",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={imagePreview}
                    alt="الصورة الشخصية"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}
              <Button
                variant="contained"
                component="label"
                sx={{
                  backgroundColor: "#07489D",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#063a7e",
                  },
                }}
              >
                اختر صورة
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
            </Box>
          </Box>
        </Paper>
        <CustomButton
          type="submit"
          backgroundColor="#07489D"
          sx={{
            width: "100%",
            maxWidth: "200px",
            display: "block",
            margin: "0 auto",
          }}
        >
          حفظ التغييرات
        </CustomButton>
      </form>
    </Box>
  );
}

export default UpdateProfile;
