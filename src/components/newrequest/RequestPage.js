import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  Tabs,
  Tab,
  Card,
  useTheme,
  Container,
} from "@mui/material";
import CustomButton from "../shared/CustomButton";
import StatusChip from "../shared/getStatusStyles";
import ServiceTabs from "./ServiceTabs";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
const RequestDetails = ({ rowData, handleAcceptServiceClick }) => {
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
              backgroundColor="#07489D"
              width="256px"
              maxWidth="256px"
              onClick={handleAcceptServiceClick}
            >
              قبول الخدمة
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
      </Grid>
    </Box>
  );
};

const RequestPage = () => {
  const location = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleAcceptServiceClick = () => {
    const updatedRowData = { ...rowData, status: "نشطة" };

    navigate(
      `/employee/${updatedRowData.serviceDescription}/servicePageActive`,
      {
        state: updatedRowData,
      }
    );
  };

  const rowData = location.state || {
    serviceNumber: "343234",
    serviceDescription: "تعديل المهنة للعمالة",
    status: "قيد الانتظار",
    price: "499",
    customerName: "محمد علي",
    requestDate: "11/8/2024 (18:20)",
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default RequestPage;
