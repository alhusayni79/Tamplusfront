import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import CustomBanner from "../components/layout/CustomBanner";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  useEffect(() => {
    if (email) {
      localStorage.setItem("savedEmail", email);
    }
  }, [email]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("يرجى إدخال بريد إلكتروني صالح");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/login`,
        { email }
      );

      setEmailSubmitted(true);
    } catch (error) {
      setError("حدث خطأ أثناء إرسال البريد الإلكتروني. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      setError("يرجى إدخال OTP");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/login`,
        {
          email,
          otp,
        }
      );


      const { token } = response.data.response;

      if (!token) {
        throw new Error("Token not found in response");
      }

      Cookies.set("auth_token", token, { expires: 7 });

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Error submitting OTP:", error);
      setError("OTP غير صحيح. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CustomBanner title=" تسجيل الدخول" />
      <Box
        sx={{
          pr: { xs: 1, sm: 3, md: 18 },
          pl: { xs: 1, sm: 3, md: 18 },
          mt: "290px",
          mb: 4,
          position: "relative",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          sx={{ padding: 2 }}
        >
          <Box
            sx={{
              width: { xs: "100%", sm: "400px" },
              boxShadow: 3,
              padding: 4,
              borderRadius: 2,
              backgroundColor: "#fff",
            }}
          >
            {!emailSubmitted ? (
              <form onSubmit={handleEmailSubmit}>
                <Typography variant="h5" gutterBottom align="center">
                  تسجيل الدخول
                </Typography>

                <TextField
                  label="البريد الإلكتروني"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="أدخل بريدك الإلكتروني"
                  fullWidth
                  margin="normal"
                  required
                  error={Boolean(error)}
                  helperText={error}
                />

                <Box mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={20} />}
                  >
                    {loading ? "إرسال..." : "إرسال البريد الإلكتروني"}
                  </Button>
                </Box>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit}>
                <Typography variant="h5" gutterBottom align="center">
                  تحقق من OTP
                </Typography>
                <TextField
                  label="OTP"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="أدخل OTP"
                  fullWidth
                  margin="normal"
                  required
                  error={Boolean(error)}
                  helperText={error}
                />
                <Box mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={20} />}
                  >
                    {loading ? "التحقق..." : "إرسال OTP"}
                  </Button>
                </Box>
              </form>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
