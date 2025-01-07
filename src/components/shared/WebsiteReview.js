import React, { useState } from "react";
import ResponsiveAppBar from "../layout/header/Header";
import { Box, Typography, Card, CardContent, Container, Rating } from "@mui/material";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import axios from "axios";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const WebsiteReview = () => {
  const formik = useFormik({
    initialValues: {
      rating: 0,
      review: "",
    },
    validationSchema: Yup.object({
      rating: Yup.number()
        .required("التقييم مطلوب")
        .min(1, "التقييم يجب أن يكون على الأقل 1")
        .max(5, "التقييم يجب أن يكون بحد أقصى 5"),
      review: Yup.string()
        .required("التعليق مطلوب")
        .min(10, "التعليق يجب أن يكون على الأقل 10 أحرف")
        .max(500, "التعليق يجب ألا يتجاوز 500 حرف"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("number_of_stars", values.rating);
      formData.append("comment", values.review);
      const userToken = Cookies.get("auth_token");

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/user/website/review`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        console.log("Response:", response.data);
        toast.success("Thank you for your feedback!");

        // alert("Thank you for your feedback!");
      } catch (error) {
        toast.error("Failed to send feedback!");
        console.error("Error:", error);
        // alert("Failed to send feedback!");
      }
    },
  });

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: -1,
          zIndex: 10,
          mb: 5,
          bgcolor: "#003366",
        }}
      >
        <ResponsiveAppBar />
      </Box>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          flexDirection: "column",
          gap: "50px",
        }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: "bold", color: "#07489D" }}
        >
          تقييمك مهم لنا! هدفنا هو تحسين تجربتك وتقديم خدمات تلبي احتياجاتك.
        </Typography>
        <Card
          sx={{ maxWidth: 500, width: "100%", textAlign: "center" }}
          elevation={2}
        >
          <CardContent>
            <Typography sx={{ fontWeight: "bold", fontSize: "32px" }}>
              تقييم للموقع
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <CustomInput
                  label="اكتب تقييمك"
                  multiline
                  isTextarea
                  rows={4}
                  id="review"
                  name="review"
                  value={formik.values.review}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{ width: "100%", maxWidth: 400, mt: 2 }}
                  error={formik.touched.review && Boolean(formik.errors.review)}
                  helperText={formik.touched.review && formik.errors.review}
                />
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 5, mt: 2 }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    اختار من 1 إلى 5
                  </Typography>

                  <Rating
                    name="rating"
                    value={formik.values.rating}
                    onChange={(event, newValue) => {
                      formik.setFieldValue("rating", newValue);
                    }}
                    onBlur={formik.handleBlur}
                  />
                </Box>
                {formik.touched.rating && formik.errors.rating && (
                  <Typography
                    variant="body2"
                    sx={{ color: "red", mt: 1 }}
                  >
                    {formik.errors.rating}
                  </Typography>
                )}
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CustomButton
                  type="submit"
                  backgroundColor="#07489D"
                  textColor="white"
                  sx={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    borderRadius: "8px",
                  }}
                >
                  حفظ التقييم
                </CustomButton>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default WebsiteReview;
