import React, { useEffect, useState, useMemo } from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import CustomInput from "../../shared/CustomInput";
import CustomButton from "../../shared/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../../redux/Slices/services/serviceSlice";
import InstitutionTypeSection from "./institutionRequirements";
import { toast } from "react-toastify";


const EmployeeRegister = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.services);

  const [attachments, setAttachments] = useState({
    companyCommercialReg: null,
    companyBankLetter: null,
    companyCivilId: null,
    companyFoundingContract: null,
    companyOwnersCivilIds: null,
    companyManagerCivilId: null,
    companyLicense: null,
    companySignatureAuth: null,
        orgCommercialReg: null,
    orgBankLetter: null,
    orgCivilId: null,
    orgLicense: null,
    orgManagerCivilId: null,
    orgSignatureAuth: null,
        freelancerCivilId: null,
    freelancerArticles: null,
    freelancerBankLetter: null,
    freelancerLicense: null
  });
  const institutionTypeOptions = useMemo(() => [
    { value: "1", label: "شركة" },
    { value: "2", label: "مؤسسة" },
    { value: "3", label: "عمل حر" },
  ], []);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  if (loading) {
    return <div>جاري التحميل...</div>;
  }

  if (error) {
    return <div>خطأ: {error}</div>;
  }

  const handleFileChange = (event, fieldName) => {
    const file = event.target.files[0];
    if (!file) return;
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("نوع الملف غير مسموح به. يرجى اختيار ملف PDF أو صورة")
      // alert("نوع الملف غير مسموح به. يرجى اختيار ملف PDF أو صورة");
      return;
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("حجم الملف كبير جداً. الحد الأقصى هو 5 ميجابايت")

      // alert("حجم الملف كبير جداً. الحد الأقصى هو 5 ميجابايت");
      return;
    }

    setAttachments((prev) => ({
      ...prev,
      [fieldName]: file,
    }));
  };

  const handleRemoveFile = (fieldName) => {
    setAttachments((prev) => ({
      ...prev,
      [fieldName]: null,
    }));
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("الاسم الأول مطلوب"),
    last_name: Yup.string().required("الاسم الأخير مطلوب"),
    phone: Yup.string()
      .matches(/^(\+?\d{1,4}[-.\s]?)?\d{9,10}$/, "رقم الهاتف غير صحيح")
      .required("رقم الهاتف مطلوب"),
    email: Yup.string()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),
    main_service_id: Yup.string().required("نوع الخدمة مطلوب"),
    iban: Yup.string()
      .required("رقم IBAN مطلوب")
      .matches(/^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/, "رقم IBAN غير صحيح"),
    account_number: Yup.string().required("رقم الحساب مطلوب"),
    bank_name: Yup.string().required("اسم البنك مطلوب"),
    institution_type: Yup.string().required("نوع المؤسسة مطلوب"),
    bank_account_holder_name: Yup.string().required("اسم صاحب الحساب البنكي مطلوب"),
  });
  const initialValues = {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    main_service_id: "",
    iban: "",
    account_number: "",
    bank_name: "",
    institution_type: "",
    type: "1",
    bank_account_holder_name: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
  
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
  
      if (values.institution_type === "1") { 
        const companyFiles = [
          { key: 'companyCommercialReg', name: 'commercial_register' },
          { key: 'companyBankLetter', name: 'bank_account_letter' },
          { key: 'companyCivilId', name: 'civil_id' },
          { key: 'companyFoundingContract', name: 'article_of_association' },
          { key: 'companyOwnersCivilIds', name: 'civil_ids_of_all_owners' },
          { key: 'companyManagerCivilId', name: 'manager_civil_id' },
          { key: 'companyLicense', name: 'commercial_license' },
          { key: 'companySignatureAuth', name: 'signature_authorization' }
        ];
  
        companyFiles.forEach(({ key, name }) => {
          if (attachments[key]) {
            formData.append(`files[${name}]`, attachments[key]);
          }
        });
      } 
      else if (values.institution_type === "2") { 
        const orgFiles = [
          { key: 'orgCommercialReg', name: 'commercial_register' },
          { key: 'orgBankLetter', name: 'bank_account_letter' },
          { key: 'orgCivilId', name: 'civil_id' },
          { key: 'orgLicense', name: 'commercial_license' },
          { key: 'orgManagerCivilId', name: 'manager_civil_id' },
          { key: 'orgSignatureAuth', name: 'signature_authorization' }
        ];
  
        orgFiles.forEach(({ key, name }) => {
          if (attachments[key]) {
            formData.append(`files[${name}]`, attachments[key]);
          }
        });
      }
      else if (values.institution_type === "3") { 
        const freelancerFiles = [
          { key: 'freelancerCivilId', name: 'civil_id' },
          { key: 'freelancerArticles', name: 'articles_association' },
          { key: 'freelancerBankLetter', name: 'bank_account_letter' },
          { key: 'freelancerLicense', name: 'commercial_license' }
        ];
  
        freelancerFiles.forEach(({ key, name }) => {
          if (attachments[key]) {
            formData.append(`files[${name}]`, attachments[key]);
          }
        });
      }
      const baseURL = process.env.REACT_APP_BASE_URL;
      const response = await axios.post(
        `${baseURL}/employee/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("تم إنشاء الحساب بنجاح");
      // alert("تم إنشاء الحساب بنجاح");
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = error.response?.data?.message || "حدث خطأ أثناء إنشاء الحساب";
      toast.error(errorMessage)
      // alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f7f7f7",
        padding: "16px",
      }}
    >
      <Paper
        elevation={0}
        sx={{ maxWidth: 850, width: "100%", padding: "24px" }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <Form>
              {/* معلومات شخصية */}
              <Typography
                variant="h6"
                sx={{
                  marginBottom: "16px",
                  textAlign: "right",
                  backgroundColor: "#F4F5F6",
                  p: "16px",
                  borderRadius: "16px",
                }}
              >
                المعلومات الشخصية
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CustomInput
                    label="الاسم الأول"
                    placeholder="أدخل الاسم الأول"
                    name="first_name"
                    value={values.first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.first_name && Boolean(errors.first_name)}
                    helperText={touched.first_name && errors.first_name}
                    sx={{ direction: "rtl", textAlign: "right" }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomInput
                    label="الاسم الأخير"
                    placeholder="أدخل الاسم الأخير"
                    name="last_name"
                    value={values.last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.last_name && Boolean(errors.last_name)}
                    helperText={touched.last_name && errors.last_name}
                    sx={{ direction: "rtl", textAlign: "right" }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomInput
                    label="البريد الإلكتروني"
                    placeholder="أدخل البريد الإلكتروني"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ direction: "rtl", textAlign: "right" }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomInput
                    label="رقم الهاتف المحمول"
                    placeholder="أدخل رقم الهاتف المحمول"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                    sx={{ direction: "rtl", textAlign: "right" }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomInput
                    label="نوع الخدمة المقدمة"
                    placeholder="اختر نوع الخدمة"
                    name="main_service_id"
                    value={values.main_service_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    select
                    options={
                      services?.response?.data?.map((service) => ({
                        value: service.id.toString(),
                        label: service.title.ar,
                      })) || []
                    }
                    error={touched.main_service_id && Boolean(errors.main_service_id)}
                    helperText={touched.main_service_id && errors.main_service_id}
                    sx={{ direction: "rtl", textAlign: "right" }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomInput
                    label="نوع المؤسسة"
                    placeholder="اختر نوع المؤسسة"
                    name="institution_type"
                    value={values.institution_type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    select
                    options={institutionTypeOptions}
                    error={touched.institution_type && Boolean(errors.institution_type)}
                    helperText={touched.institution_type && errors.institution_type}
                    sx={{ direction: "rtl", textAlign: "right" }}
                  />
                </Grid>
              </Grid>

              {/* المرفقات */}
              <Typography
                variant="h6"
                sx={{
                  mt: 5,
                  marginBottom: "16px",
                  textAlign: "right",
                  backgroundColor: "#F4F5F6",
                  p: "16px",
                  borderRadius: "16px",
                }}
              >
                المرفقات
              </Typography>

              <InstitutionTypeSection
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
                errors={errors}
                attachments={attachments}
                handleFileChange={handleFileChange}
                handleRemoveFile={handleRemoveFile}
              />

              {/* معلومات الدفع */}
              <Typography
                variant="h6"
                sx={{
                  mt: 5,
                  marginBottom: "16px",
                  textAlign: "right",
                  backgroundColor: "#F4F5F6",
                  p: "16px",
                  borderRadius: "16px",
                }}
              >
                معلومات الدفع
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CustomInput
                    label="اسم البنك"
                    placeholder="أدخل اسم البنك"
                    name="bank_name"
                    value={values.bank_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.bank_name && Boolean(errors.bank_name)}
                    helperText={touched.bank_name && errors.bank_name}
                    sx={{ direction: "rtl", textAlign: "right" }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomInput
                    label="رقم الحساب"
                    placeholder="أدخل رقم الحساب"
                    name="account_number"
                    value={values.account_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.account_number && Boolean(errors.account_number)}
                    helperText={touched.account_number && errors.account_number}
                    sx={{ direction: "rtl", textAlign: "right" }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomInput
                    label="رقم IBAN"
                    placeholder="أدخل رقم IBAN"
                    name="iban"
                    value={values.iban}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.iban && Boolean(errors.iban)}
                    helperText={touched.iban && errors.iban}
                    sx={{ direction: "rtl", textAlign: "right" }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomInput
                    label="اسم صاحب الحساب البنكي"
                    placeholder="أدخل اسم صاحب الحساب البنكي"
                    name="bank_account_holder_name"
                    value={values.bank_account_holder_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.bank_account_holder_name && Boolean(errors.bank_account_holder_name)}
                    helperText={touched.bank_account_holder_name && errors.bank_account_holder_name}
                    sx={{ direction: "rtl", textAlign: "right" }}
                  />
                </Grid>
              </Grid>

              {/* زر الإرسال */}
              <Box sx={{ textAlign: "center", marginTop: "16px", mt: 8 }}>
                <CustomButton
                  type="submit"
                  backgroundColor="#07489D"
                  disabled={isSubmitting}
                >
                  إنشاء الحساب
                </CustomButton>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default EmployeeRegister;