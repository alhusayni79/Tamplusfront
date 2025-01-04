import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import CustomButton from "../../shared/CustomButton";
import CustomInput from "../../shared/CustomInput";
import axios from "axios";
import Cookies from "js-cookie";
import { fetchUserData } from "../../../redux/Slices/userdata/userSlice";
import { useDispatch } from "react-redux";

const RequiredDataModal = ({ open, onClose, requiredFields, onSubmit }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

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
        formData,
        config
      );

      dispatch(fetchUserData()); 
      onSubmit(formData);

      setFormData({});
    } catch (error) {
      if (error.response?.status === 422) {
        const missingFields = error.response.data.response || [];
        setFormData((prevData) => {
          const newData = {};
          Object.keys(prevData).forEach((key) => {
            if (missingFields.includes(key)) {
              newData[key] = prevData[key];
            }
          });
          return newData;
        });
        setError("الرجاء إكمال جميع البيانات المطلوبة");
      } else if (error.response?.status === 401) {
        setError("الرجاء تسجيل الدخول مرة أخرى");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        setError("حدث خطأ. الرجاء المحاولة مرة أخرى");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({});
    setError("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth dir="rtl">
      <Box
        sx={{
          height: "8px",
          width: "100%",
          backgroundColor: theme.palette.primary.main,
        }}
      />
      <DialogTitle
        sx={{
          textAlign: "center",
          color: theme.palette.primary.dark,
          fontSize: "24px",
          fontWeight: "700",
          pb: 1,
        }}
      >
        بيانات مطلوبة
      </DialogTitle>
      <DialogContent sx={{ px: 3, py: 2 }}>
        <Typography
          sx={{
            textAlign: "center",
            color: theme.palette.primary.body,
            fontSize: "16px",
            mb: 3,
          }}
        >
          يرجى إكمال البيانات التالية للمتابعة
        </Typography>

        {error && (
          <Typography
            color="error"
            sx={{
              mb: 2,
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            {error}
          </Typography>
        )}

        {requiredFields.map((field) => (
          <CustomInput
            key={field}
            label={
              field === "first_name"
                ? "الاسم الأول"
                : field === "last_name"
                ? "الاسم الأخير"
                : field === "email"
                ? "البريد الإلكتروني"
                : field
            }            variant="outlined"
            fullWidth
            value={formData[field] || ""}
            onChange={handleInputChange(field)}
            margin="normal"
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: theme.palette.primary.main,
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.primary.main,
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: theme.palette.primary.main,
              },
            }}
          />
        ))}
      </DialogContent>
      <DialogActions sx={{ p: 3, justifyContent: "center", gap: 2 }}>
        <CustomButton
          onClick={handleClose}
          width="140px"
          backgroundColor="red"
          sx={{
            border: `1px solid ${theme.palette.primary.main}`,
            color: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          }}
          disabled={loading}
        >
          إلغاء
        </CustomButton>
        <CustomButton
          onClick={handleSubmit}
          width="140px"
          backgroundColor={theme.palette.primary.main}
          disabled={loading}
        >
          {loading ? "جاري التحميل..." : "متابعة"}
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default RequiredDataModal;
