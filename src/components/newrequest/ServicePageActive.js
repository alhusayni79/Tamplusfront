import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  Card,
  useTheme,
  Container,
  Input,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import CustomButton from "../shared/CustomButton";
import StatusChip from "../shared/getStatusStyles";
import ServiceTabs from "./ServiceTabs";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Chat from "./Chat";
const RequestDetails = ({ rowData, handleAcceptServiceClick }) => {
  const cardsData = [
    {
      id: 1,
      name: "محمد",
      role: "مقدم الخدمة",
      date: "11/8/2024 (18:20)",
      content:
        "لوريم إيبسوم هو نموذج افتراضي يضعه في التصاميم لتعرض على العميل ليتمكن من تصور طريقة النصوص بالتزامن سواء كانت تصاميم مطبوعة ... بروشور أو فلاير على سبيل المثال ... أو نماذج مواقع الانترنت ...",
    },
    {
      id: 2,
      name: "علي",
      role: "مقدم الخدمة",
      date: "10/8/2024 (14:00)",
      content:
        "لوريم إيبسوم هو نموذج افتراضي يستخدم في التصميمات لإظهار النصوص وتوزيعها بشكل مؤقت للتصميمات سواء كانت مطبوعة أو مواقع الإنترنت.",
    },
    {
      id: 3,
      name: "سارة",
      role: "مقدمة الخدمة",
      date: "9/8/2024 (16:45)",
      content:
        "هذا النص هو مجرد مثال لاختبار الشكل والتصميم. يتم استخدامه لمساعدة المصممين في التركيز على عناصر التصميم بدلاً من محتوى النص نفسه.",
    },
    {
      id: 4,
      name: "سارة",
      role: "مقدمة الخدمة",
      date: "9/8/2024 (16:45)",
      content:
        "هذا النص هو مجرد مثال لاختبار الشكل والتصميم. يتم استخدامه لمساعدة المصممين في التركيز على عناصر التصميم بدلاً من محتوى النص نفسه.",
    },
  ];
  return (
    <Box sx={{ maxWidth: "832px", margin: "0 auto" }}>
      <Grid container spacing={2} direction="column">
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <CustomButton
              backgroundColor="#1D7C12"
              width="256px"
              maxWidth="256px"
              onClick={handleAcceptServiceClick}
            >
              تم إكمال الخدمة
            </CustomButton>
            <Typography
              sx={{
                fontSize: { xs: "16px", sm: "20px", md: "24px" },
                fontWeight: 500,
                color: "#595F69",
              }}
            >
              الطلبات الجديدة
              <ArrowBackIosIcon
                sx={{
                  verticalAlign: "middle",
                  color: "#595F69",
                  fontSize: { xs: "16px", sm: "18px", md: "20px" },
                }}
              />
              <span
                style={{
                  fontWeight: "bold",
                  color: "#1E2124",
                  marginRight: "5px",
                  fontSize: { xs: "14px", sm: "16px", md: "18px" },
                }}
              >
                {rowData.serviceNumber}
              </span>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <ServiceTabs rowData={rowData} />
        </Grid>
        <Grid item xs={12}>
          <Chat rowData={rowData} cardsData={cardsData} />
        </Grid>
      </Grid>
    </Box>
  );
};
const ServicePageActive = () => {
  const location = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState(null);
  const handleAcceptServiceClick = () => {
    navigate(`/employee/${rowData.serviceDescription}/servicePageActive`, {
      state: rowData,
    });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const rowData = location.state || {
    serviceNumber: "343234",
    serviceDescription: "تعديل المهنة للعمالة",
    status: "قيد الانتظار",
    price: "499",
    customerName: "محمد علي",
    requestDate: "11/8/2024 (18:20)",
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };
  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Grid container spacing={3} sx={{ flexDirection: "row-reverse" }}>
        <Grid item xs={12} md={9}>
          <RequestDetails
            rowData={rowData}
            handleAcceptServiceClick={handleAcceptServiceClick}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: "8px", mb: 5 }}>
            <Typography
              sx={{
                backgroundColor: theme.palette.primary.main,
                textAlign: "center",
                p: 2,
                color: theme.palette.primary.white,
                fontWeight: "700",
              }}
            >
              معلومات الخدمة
            </Typography>
            <Grid
              container
              direction="column"
              spacing={2}
              sx={{ textAlign: "center" }}
            >
              <Grid
                item
                xs={12}
                sx={{ borderBottom: "1px solid #D8DBDE", pb: 2, pt: 1 }}
              >
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "14px",
                    color: theme.palette.primary.disabled,
                    mt: 1,
                  }}
                >
                  العميل
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "16px",
                    color: theme.palette.primary.dark,
                  }}
                >
                  {rowData.customerName || "محمد علي"}
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{ borderBottom: "1px solid #D8DBDE", pb: 2, pt: 1 }}
              >
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "14px",
                    color: theme.palette.primary.disabled,
                  }}
                >
                  تاريخ طلب الخدمة
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "16px",
                    color: theme.palette.primary.dark,
                  }}
                >
                  {rowData.requestDate}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ borderBottom: "1px solid #D8DBDE", pb: 2, pt: 1 }}
              >
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "14px",
                    color: theme.palette.primary.disabled,
                  }}
                >
                  آخر تحديث
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "16px",
                    color: theme.palette.primary.dark,
                  }}
                >
                  {rowData.requestDate}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ borderBottom: "1px solid #D8DBDE", pb: 2, pt: 1 }}
              >
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "14px",
                    color: theme.palette.primary.disabled,
                    pb: 2,
                  }}
                >
                  الحالة
                </Typography>
                <StatusChip Status={rowData.status} />
              </Grid>
            </Grid>
          </Card>

          <Paper
            elevation={0}
            sx={{ padding: "32px", textAlign: "center", borderRadius: "8px" }}
          >
            <Typography variant="h6">الإجمالي</Typography>

            <Typography
              sx={{
                fontSize: "56px",
                fontWeight: "bold",
                color: theme.palette.primary.main,
              }}
            >
              {rowData.price}
              <Typography
                component="span"
                variant="subtitle2"
                sx={{ color: "#595F69" }}
              >
                ر.س
              </Typography>
            </Typography>
          </Paper>
          <Box
            sx={{
              width: "100%",
              height: "100px",
              mt: "32px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              mb: 7,
              overflow: "hidden",
            }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                textAlign: "center",
                fontSize: "16px",
                p: 1.5,
                bgcolor: "#eef1f3",
                width: "100%",
              }}
            >
              مرفقات العميل{" "}
            </Typography>
            <Box sx={{ bgcolor: "white", width: "100%", textAlign: "center" }}>
              <label htmlFor="file-upload">
                <Input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  sx={{ display: "none" }}
                />
                <Button
                  component="span"
                  sx={{
                    color: "#595F69",
                    textTransform: "none",
                    pb: 3,
                    "&:hover": {
                      bgcolor: "#F0F0F0",
                    },
                  }}
                >
                  {selectedFile ? selectedFile.name : "Upload Photo"}
                </Button>
              </label>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "100px",
              mt: "32px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              mb: 7,
              overflow: "hidden",
            }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                textAlign: "center",
                fontSize: "16px",
                p: 1.5,
                bgcolor: "#eef1f3",
                width: "100%",
              }}
            >
              مرفقاتي{" "}
            </Typography>
            <Box sx={{ bgcolor: "white", width: "100%", textAlign: "center" }}>
              <label htmlFor="file-upload">
                <Input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  sx={{ display: "none" }}
                />
                <Button
                  component="span"
                  sx={{
                    color: "#595F69",
                    textTransform: "none",
                    pb: 3,
                    "&:hover": {
                      bgcolor: "#F0F0F0",
                    },
                  }}
                >
                  {selectedFile ? selectedFile.name : "Upload Photo"}
                </Button>
              </label>
            </Box>
          </Box>
          <Box sx={{ mb: 5 }}>
            <CustomButton
              width="100%"
              backgroundColor="#DDEBFD"
              textColor="#07489D"
              onClick={handleClickOpen}
            >
              إضافة رد
            </CustomButton>
          </Box>

          <CustomButton
            width="100%"
            textColor="#6E1311"
            backgroundColor="transparent"
            borderColor="#8C1816"
            border={true}
          >
            إلغاء الخدمة
          </CustomButton>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>إضافة رد</DialogTitle>
        <DialogContent>
          <TextField
            label="الرسالة"
            variant="outlined"
            fullWidth
            margin="dense"
            value={message}
            onChange={handleMessageChange}
          />
          <TextField
            type="file"
            fullWidth
            margin="dense"
            onChange={handlePhotoChange}
            inputProps={{ accept: "image/*" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            إلغاء
          </Button>
          <Button
            onClick={() => {
            
              handleClose();
            }}
            color="primary"
          >
            إرسال
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ServicePageActive;
