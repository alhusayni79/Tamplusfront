import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { Box, Typography, Paper, Button } from "@mui/material";
import CustomInput from "../shared/CustomInput";
import CustomButton from "../shared/CustomButton";
import { toast } from "react-toastify";
import { fetchEmpolyeeUData } from "../../redux/Slices/empolyeeData/empolyeeSlice";
import { useTranslation } from "react-i18next";

function AccountInfoForm() {
  const {t}=useTranslation();
  const dispatch = useDispatch();
  const  employeeData = useSelector((state) => state.empolyee);
  
  const [imagePreview, setImagePreview] = useState(null);
  const baseURL = process.env.REACT_APP_BASE_URL;

  const validationSchema = Yup.object({
      firstName: Yup.string().required(t("contact.Name is required")),
       lastName: Yup.string().required(t("contact.last is required")),
       phone: Yup.string()
         .matches(/^\d{12}$/, t("contact.numberlength"))
         .required(t("contact.Mobile number is required")),
       email: Yup.string()
         .email(t("contact.Invalid email"))
         .required(t("contact.Email is required")),
  });


  const formik = useFormik({
    initialValues: {
      first_name: employeeData?.empolyee?.response?.first_name || "",
      last_name: employeeData?.empolyee?.response?.last_name || "",
      phone: employeeData?.empolyee?.response?.phone || "",
      email: employeeData?.empolyee?.response?.email || "",
      image: null,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("first_name", values.first_name);
        formData.append("last_name", values.last_name);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        if (values.image) {
          formData.append("image", values.image);
        }

        const token = Cookies.get("authemployee");

        const response = await fetch(`${baseURL}/employee/profile`, {
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
        dispatch(fetchEmpolyeeUData());
        toast.success("تم تحديث البيانات بنجاح");
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("حدث خطأ أثناء تحديث البيانات");
      }
    },
  });

  useEffect(() => {
    if (employeeData?.empolyee?.response?.image) {
      setImagePreview(employeeData?.empolyee?.response?.image);
    }
  }, [employeeData]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      formik.setFieldValue("image", file);
    }
  };

  return (
    <Box minHeight="auto">
      <Typography variant="h6" align="right" sx={{ mb: 2 }}>
        معلومات الحساب
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Paper
          elevation={1}
          sx={{
            padding: { xs: "0px", md: "2rem" },
            width: "100%",
            bgcolor: "white",
            mb: "32px",
          }}
        >
          <Box sx={{ mb: "32px" }}>
            <CustomInput
              label=   {t("contact.firstname")}
              placeholder="أدخل الاسم الأول"
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.first_name && Boolean(formik.errors.first_name)}
              helperText={formik.touched.first_name && formik.errors.first_name}
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
              label=   {t("contact.lastname")}
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.last_name && Boolean(formik.errors.last_name)}
              helperText={formik.touched.last_name && formik.errors.last_name}
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
          </Box>

          <Box sx={{ mb: "32px" }}>
            <CustomInput
              label=   {t("contact.Email")}
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
            {t("profile.chooseimage")}            </Typography>
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
 {t("profile.chooseimage")}                <input
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
           {t("buttons.save")}
          {/* {formik.isSubmitting ? "جاري الحفظ..." : "حفظ التغييرات"} */}
        </CustomButton>
      </form>
    </Box>
  );
}

export default AccountInfoForm;