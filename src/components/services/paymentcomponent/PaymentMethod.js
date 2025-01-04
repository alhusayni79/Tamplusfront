import React, { useEffect, useState } from "react";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { ContentCopy } from "@mui/icons-material";
import fileimage from "../../../assets/image/image.png";
import {
  Button,
  Typography,
  Card,
  IconButton,
  useTheme,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchBankInfo } from "../../../redux/Slices/bankinfo/bankSlice";
import { useParams, useLocation } from "react-router-dom";
import CustomInput from "../../shared/CustomInput";
import CustomButton from "../../shared/CustomButton";
import axios from "axios";
import Cookies from "js-cookie";
import ClearIcon from "@mui/icons-material/Clear";
import PaymentComponent from "./PaymentComponent";

const PaymentMethod = ({ price, id }) => {
  useEffect(() => {
    const savedDir = localStorage.getItem("dir") || "ltr";
    document.dir = savedDir;
  }, []);
  const [paymentMethod, setPaymentMethod] = useState("بطاقة بنكية");
  const [selectedFile, setSelectedFile] = useState(null);
  const [cardholderName, setCardholderName] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [errors, setErrors] = useState({});
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadErrorMessage, setUploadErrorMessage] = useState("");
  const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState(false);
  const { label } = useParams();

  const theme = useTheme();
  const dispatch = useDispatch();
  const { bankinfo, loading, error } = useSelector((state) => state.bankinfo);
  useEffect(() => {
    dispatch(fetchBankInfo());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handlePayment = () => {
    alert(`جاري معالجة الدفع لـ ${label} بمبلغ ${price} ر.س`);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
      })
      .catch((err) => {
      });
  };

  const validate = () => {
    const newErrors = {};
    if (!cardholderName.trim()) {
      newErrors.cardholderName = "يرجى إدخال اسم حامل البطاقة";
    }
    if (!cvv || cvv.length !== 3) {
      newErrors.cvv = "الرقم السري يجب أن يكون 3 أرقام";
    }
    if (!expirationDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expirationDate)) {
      newErrors.expirationDate = "تاريخ البطاقة غير صالح. الرجاء إدخال MM/YY";
    }
    return newErrors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
    }
  };

  const handleFileUploadChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setUploadErrorMessage("يجب إرفاق ملف");
    } else if (file.size > 5000000) {
      setUploadErrorMessage("حجم الملف يجب أن يكون أقل من 5 ميغابايت");
    } else if (!file.type.startsWith("image/")) {
      setUploadErrorMessage("يجب أن يكون الملف صورة");
    } else {
      setUploadedFile(file);
      setUploadErrorMessage("");
    }
  };

  const handleFormSubmit = async () => {
    if (!uploadedFile) {
      setUploadErrorMessage("يجب إرفاق ملف");
      return;
    }
  
    const serviceId = id;
  
    const formData = new FormData();
    formData.append("service_id", serviceId);
    formData.append("receipt", uploadedFile);
  
    try {
      const token = Cookies.get("auth_token");
  
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/order/bank-transfer`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      setUploadedFile(null);
      setUploadErrorMessage("");
      setIsSubmissionSuccessful(true);
  
      // Scroll to the top after successful submission
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Failed to submit form:", error);
      setUploadErrorMessage("حدث خطأ أثناء رفع الملف. حاول مجددًا.");
    }
  };
  
  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadErrorMessage("");
  };
  return (
    <>
      <Card sx={{ p: 3, borderRadius: "8px" }} elevation={1}>
        {isSubmissionSuccessful ? (
          <Box
            sx={{
              mb: 2,
              p: 2,
              backgroundColor: "#D4EDDA",
              borderRadius: "8px",
            }}
          >
            <Typography
              sx={{ color: "#155724", fontSize: "16px", fontWeight: "500" }}
            >
              تم ارسال الطلب بنجاح
            </Typography>
          </Box>
        ) : (
          <>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "20px",
                color: theme.palette.primary.dark,
                mb: 3,
              }}
            >
              طريقة الدفع
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "flex-start",
              }}
            >
              <Button
                onClick={() => handlePaymentMethodChange("تحويل بنكي")}
                sx={{
                  padding: "5px 40px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  border:
                    paymentMethod === "بطاقة بنكية"
                      ? `2px solid ${theme.palette.grey[500]}`
                      : `2px solid ${theme.palette.primary.main}`,
                  color:
                    paymentMethod === "بطاقة بنكية"
                      ? theme.palette.grey[500]
                      : theme.palette.primary.main,
                }}
              >
                <Box
                  sx={{
                    backgroundColor:
                      paymentMethod === "بطاقة بنكية" ? "#D8DBDE" : "#DDEBFD",
                    borderRadius: "50%",
                    p: 0.5,
                    width: 40,
                    height: 40,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CreditCardIcon
                    fontSize="small"
                    sx={{
                      color:
                        paymentMethod === "بطاقة بنكية"
                          ? theme.palette.grey[500]
                          : theme.palette.primary.main,
                      zIndex: 111,
                    }}
                  />
                </Box>
                بطاقة بنكية
              </Button>
              <Button
                onClick={() => handlePaymentMethodChange("بطاقة بنكية")}
                sx={{
                  padding: "15px 40px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  border:
                    paymentMethod === "تحويل بنكي"
                      ? `2px solid ${theme.palette.grey[500]}`
                      : `2px solid ${theme.palette.primary.main}`,
                  color:
                    paymentMethod === "تحويل بنكي"
                      ? theme.palette.grey[500]
                      : theme.palette.primary.main,
                }}
              >
                <Box
                  sx={{
                    backgroundColor:
                      paymentMethod === "بطاقة بنكية" ? "#DDEBFD" : "#D8DBDE",
                    borderRadius: "50%",
                    p: 0.5,
                    width: 40,
                    height: 40,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AccountBalanceIcon
                    fontSize="small"
                    sx={{
                      color:
                        paymentMethod === "تحويل بنكي"
                          ? theme.palette.grey[500]
                          : theme.palette.primary.main,
                    }}
                  />
                </Box>
                تحويل بنكي
              </Button>
            </Box>

            {paymentMethod === "تحويل بنكي" && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  mt: 2,
                  width: "100%",
                }}
              >
               <PaymentComponent id={id}/>
              </Box>
            )}

           

            {paymentMethod === "بطاقة بنكية" && (
              <Box sx={{ mt: 2 }}>
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    backgroundColor: "white",
                    borderRadius: "8px",
                    mr: "-17px",
                  }}
                  elevation={0}
                >
                  <Box
                    sx={{
                      backgroundColor: "#F4F5F6",
                      borderRadius: "8px",
                      p: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      mb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid #E1E5EB",
                        p: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "400",
                          color: theme.palette.primary.disabled,
                        }}
                      >
                        اسم البنك
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: theme.palette.primary.dark,
                          mb: 1,
                        }}
                      >
                        {bankinfo?.response?.bank_name}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid #E1E5EB",
                        p: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "400",
                          color: theme.palette.primary.disabled,
                        }}
                      >
                        رقم الحساب
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexDirection: "row-reverse",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: "600",
                            color: theme.palette.primary.dark,
                            mb: 1,
                          }}
                        >
                          {bankinfo?.response?.account_number}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleCopy(`${bankinfo?.response?.account_number}`)
                          }
                        >
                          <ContentCopy
                            sx={{ fontSize: 14, color: "#378AF6" }}
                          />
                        </IconButton>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid #E1E5EB",
                        p: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "400",
                          color: theme.palette.primary.disabled,
                        }}
                      >
                        IBAN
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexDirection: "row-reverse",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: "600",
                            color: theme.palette.primary.dark,
                            mb: 1,
                          }}
                        >
                          {bankinfo?.response?.iban}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleCopy(`${bankinfo?.response?.iban}`)
                          }
                        >
                          <ContentCopy
                            sx={{ fontSize: 14, color: "#378AF6" }}
                          />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "400",
                          color: theme.palette.primary.disabled,
                        }}
                      >
                        اسم صاحب الحساب
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexDirection: "row-reverse",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: "600",
                            color: theme.palette.primary.dark,
                            mb: 1,
                          }}
                        >
                          {bankinfo?.response?.account_owner}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleCopy(`${bankinfo?.response?.account_owner}`)
                          }
                        >
                          <ContentCopy
                            sx={{ fontSize: 14, color: "#378AF6" }}
                          />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>

                  {!uploadedFile ? (
                    <>
                      <input
                        type="file"
                        id="upload-file"
                        style={{ display: "none" }}
                        accept=".png, .jpg, .jpeg, .pdf"
                        onChange={handleFileUploadChange}
                      />
                      <label htmlFor="upload-file">
                        <Box
                          sx={{
                            border: "2px dashed #C2C6CC",
                            borderRadius: 2,
                            p: 3,
                            textAlign: "center",
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Box>
                            <img
                              src={fileimage}
                              alt="Upload Icon"
                              style={{
                                width: "20px",
                                height: "20px",
                                marginBottom: "10px",
                              }}
                            />
                            <Typography
                              sx={{
                                fontWeight: "400",
                                fontSize: "14px",
                                color: "#378AF6",
                              }}
                            >
                              إرفاق صورة
                            </Typography>
                          </Box>
                        </Box>
                      </label>
                    </>
                  ) : (
                    <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "20vh", 
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        maxWidth: "40%",
                        height: "150px",
                        maxHeight: "150px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        component="img"
                        src={URL.createObjectURL(uploadedFile)}
                        alt="Selected File"
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: 2,
                        }}
                      />
                      <IconButton
                        size="small"
                        onClick={handleRemoveFile}
                        sx={{
                          position: "absolute",
                          top: "-8px",
                          right: "-6px",
                          color: "white",
                          backgroundColor: "red",
                          border: "3px solid",
                          "&:hover": {
                            backgroundColor: "red",
                          },
                        }}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  )}

                  {uploadErrorMessage && (
                    <Typography color="error" sx={{ mt: 1 }}>
                      {uploadErrorMessage}
                    </Typography>
                  )}

                  <Box sx={{ textAlign: "right", mt: 3 }}>
                    <CustomButton
                      backgroundColor={theme.palette.primary.main}
                      onClick={handleFormSubmit}
                    >
                      إرسال
                    </CustomButton>
                  </Box>
                </Box>
              </Box>
            )}
          </>
        )}
      </Card>
    </>
  );
};

export default PaymentMethod;