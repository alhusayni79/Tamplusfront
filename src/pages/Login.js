import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Tabs,
  Tab,
  Divider,
  Link,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import CustomInput from "../components/shared/CustomInput";
import CustomButton from "../components/shared/CustomButton";
import Tamplus from "../../src/assets/image/tampluslogo.png";

const Login = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [phoneSubmitted, setPhoneSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [phoneInput, setPhoneInput] = useState("");

  const navigate = useNavigate();
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  useEffect(() => {
    if (phone) {
      localStorage.setItem("savedPhone", phone);
    }
  }, [phone]);
  useEffect(() => {
    if (phoneSubmitted && otpRefs[0].current) {
      otpRefs[0].current.focus();
    }
  }, [phoneSubmitted]);
  useEffect(() => {
    const savedPhone = localStorage.getItem("savedPhone");
    if (savedPhone) {
      setPhone(savedPhone);
    }
  }, []);

  useEffect(() => {
    if (phone) {
      localStorage.setItem("savedPhone", phone);
    }
  }, [phone]);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
  
    if (!phone || !/^\+?[0-9]{10,15}$/.test(phone)) {
      setError("يرجى إدخال رقم هاتف صالح");
      return;
    }
  
    setError("");
    setLoading(true);
  
    try {
      const endpoint = selectedTab === 0 ? "/user/login" : "/employee/login";
      await axios.post(`${process.env.REACT_APP_BASE_URL}${endpoint}`, { phone });
  
      setPhoneSubmitted(true);
      toast.success("تم إرسال OTP بنجاح!");
    } catch (error) {
      setError("حدث خطأ أثناء إرسال OTP. حاول مرة أخرى.");
      toast.error("عذراً، حدث خطأ أثناء إرسال OTP. يرجى المحاولة لاحقًا.");
    } finally {
      setLoading(false);
    }
  };
  
  const handlePhoneChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, "");

    if (value.startsWith("0")) {
      value = value.substring(1);
    }
    if (value.length > 9) {
      setError("يجب ألا يتجاوز رقم الهاتف 9 أرقام بعد رمز الدولة.");
    } else if (value.length < 9) {
      setError("يجب أن يحتوي رقم الهاتف على 9 أرقام بعد رمز الدولة.");
    } else {
      setError("");
    }
    setPhoneInput(value);
    setPhone(`966${value}`);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
  
    const enteredOtp = otp.join("");
  
    if (enteredOtp.length < 4) {
      setError("يرجى إدخال OTP كاملاً");
      return;
    }
  
    setError("");
    setLoading(true);
  
    try {
      const endpoint = selectedTab === 0 ? "/user/login" : "/employee/login";
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}${endpoint}`,
        {
          phone,
          otp: enteredOtp,
        }
      );
  
      const { token } = response.data.response;
      if (!token) {
        throw new Error("Token not found in response");
      }
  
      const cookieName = selectedTab === 0 ? "auth_token" : "authemployee";
      Cookies.set(cookieName, token, { expires: 7 });
  
      // Success Alert
      toast.success("تم التحقق بنجاح! سيتم توجيهك الآن.");
  
      if (selectedTab === 0) {
        navigate("/");
      } else {
        navigate("/employee/");
      }
    } catch (error) {
      setError("OTP غير صحيح. حاول مرة أخرى.");
  
      // Error Alert
      toast.error("OTP غير صحيح. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleOtpChange = (index, value, event) => {
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "") {
      if (index < otpRefs.length - 1) {
        otpRefs[index + 1].current.focus();
      }
    } else if (event.key === "Backspace" && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs[index - 1].current.focus();
    } else if (event.key === "ArrowLeft" && index > 0) {
      otpRefs[index - 1].current.focus();
    } else if (event.key === "ArrowRight" && index < otpRefs.length - 1) {
      otpRefs[index + 1].current.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text").slice(0, 4);
    const newOtp = [...otp];

    pastedData.split("").forEach((char, index) => {
      if (/^\d$/.test(char) && index < 4) {
        newOtp[index] = char;
      }
    });

    setOtp(newOtp);

    const nextEmptyIndex = newOtp.findIndex((val) => !val);
    if (nextEmptyIndex !== -1) {
      otpRefs[nextEmptyIndex].current.focus();
    } else if (newOtp[3]) {
      otpRefs[3].current.focus();
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#f4f5f7" }}
      dir="ltr"
    >
      <Box
        sx={{
          width: "380px",
          boxShadow: 3,
          backgroundColor: "#fff",
          textAlign: "center",
          padding: 4,
          position: "relative",
          borderTop: "8px solid #07489D",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            width: "100%",
          }}
        >
          {phoneSubmitted ? (
            <>
              <IconButton onClick={() => setPhoneSubmitted(false)}>
                <CloseIcon sx={{ color: "#000" }} />
              </IconButton>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
                  رمز التحقق
                </Typography>
                <IconButton onClick={() => setPhoneSubmitted(false)}>
                  <ArrowForwardIcon sx={{ color: "#000" }} />
                </IconButton>
              </Box>
            </>
          ) : (
            <>
              <Box>
                <img
                  src={Tamplus}
                  alt="Description"
                  style={{
                    width: isSmallScreen ? "50px" : "80px",
                    height: isSmallScreen ? "41px" : "64px",
                    cursor: "pointer",
                  }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "18px",
                  fontWeight: "500",
                }}
              >
                تسجيل الدخول
              </Typography>
            </>
          )}
        </Box>

        {!phoneSubmitted && (
          <>
            <Tabs
              value={selectedTab}
              onChange={(e, newValue) => setSelectedTab(newValue)}
              centered
              sx={{
                "& .MuiTab-root": {
                  fontSize: "18px",
                  fontWeight: "500",
                },
              }}
            >
              <Tab label="طالب خدمة" />
              <Tab label="مقدم خدمة" />
            </Tabs>
            <Divider sx={{ marginY: 2 }} />
          </>
        )}

        {phoneSubmitted ? (
          <form onSubmit={handleOtpSubmit}>
            <Box
              mt={4}
              display="flex"
              justifyContent="center"
              gap={2}
              direction="rtl"
            >
              {otp.map((value, index) => (
                <TextField
                  key={index}
                  type="text"
                  value={value}
                  onChange={(e) => handleOtpChange(index, e.target.value, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  inputProps={{
                    maxLength: 1,
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    style: { textAlign: "center" },
                  }}
                  sx={{
                    width: 50,
                    "& input": { textAlign: "center" },
                  }}
                  inputRef={otpRefs[index]}
                  autoComplete="off"
                />
              ))}
            </Box>
            <Box mt={4} display="flex" justifyContent="center">
              <CustomButton
                type="submit"
                fullWidth
                disabled={loading}
                backgroundColor={theme.palette.primary.main}
                width="100%"
              >
                {loading ? (
                  <>
                    <CircularProgress size={20} />
                    التحقق...
                  </>
                ) : (
                  "تأكيد"
                )}
              </CustomButton>
            </Box>
          </form>
        ) : (
          <>
            <form onSubmit={handlePhoneSubmit}>
              <CustomInput
                type="tel"
                value={phoneInput}
                onChange={handlePhoneChange}
                placeholder="أدخل رقم هاتفك"
                fullWidth
                margin="normal"
                required
                error={Boolean(error)}
                helperText={error}
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    direction: "ltr",
                  },
                  "& .MuiInputLabel-root": {
                    left: 0,
                    right: "auto",
                    transformOrigin: "left",
                  },
                }}
              />

              <Box mt={2} display="flex" justifyContent="center">
                <CustomButton
                  type="submit"
                  fullWidth
                  disabled={loading}
                  onClick={handlePhoneSubmit}
                  backgroundColor={theme.palette.primary.main}
                  width="80%"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="white" />
                  ) : (
                    "تسجيل الدخول"
                  )}
                </CustomButton>
              </Box>
            </form>

            {selectedTab === 1 && (
              <Typography sx={{ my: 2, fontSize: "18px", fontWeight: "400" }}>
                لا تمتلك حساب بعد؟{" "}
                <Link
                  sx={{
                    color: "#07489D",
                    fontWeight: "600",
                  }}
                  href="/employee/register"
                >
                  أنشئ حساب جديد
                </Link>
              </Typography>
            )}
          </>
        )}

        {phoneSubmitted && (
          <Typography
            sx={{
              my: 2,
              fontSize: "18px",
              fontWeight: "400",
              color: "#1E2124",
            }}
          >
            لم يصلك كود التحقق؟{" "}
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePhoneSubmit(e);
              }}
              sx={{
                color: "#07489D",
                fontWeight: "600",
              }}
            >
              إعادة إرسال الكود
            </Link>
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Login;
