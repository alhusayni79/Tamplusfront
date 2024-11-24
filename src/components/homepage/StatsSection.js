import React, { useEffect } from "react";
import { Grid, Typography, Box } from "@mui/material";
import CountUp from "react-countup";
import { useTheme } from "@emotion/react";
import StarImage from "../../assets/image/Star.png";
import DocumentImage from "../../assets/image/Document.png";
import ShieldImage from "../../assets/image/Shield.png";
import CaseImage from "../../assets/image/Case.png";
import { useTranslation } from "react-i18next"; 
import { useDispatch, useSelector } from "react-redux";
import { fetchStatisticsData } from "../../redux/Slices/staticsSlice/statisticsSlice";

const StatsSection = () => {
  const theme = useTheme();
  const { i18n } = useTranslation();
  const locale = i18n.language;
  const dispatch = useDispatch();
  const { statistics, loading, error } = useSelector((state) => state.statistics);

  useEffect(() => {
    dispatch(fetchStatisticsData());
  }, [dispatch]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const reviews = statistics?.response?.data?.reviews?.replace('%', '');
  const servicesCount = statistics?.response?.data?.services_count;
  const newOrders = statistics?.response?.data?.new_orders;
  const completedService = statistics?.response?.data?.completed_service;


  return (
    <Box
      sx={{
        color: "#fff",
        padding: { xs: "40px 0px", md: "60px 0px" },
        pr: { xs: 1, sm: 3, md: 18 },
        pl: { xs: 1, sm: 3, md: 18 },
      }}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        flexDirection={"row-reverse"}
        spacing={0}
      >
        {/* First Item */}
        <Grid item xs={6} sm={6} lg={3}>
          <Grid
            container
            direction="column"
            alignItems="center"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: locale === "ar" ? "row-reverse" : "row",
              borderLeft:
                locale === "en" ? { lg: "1px solid #C2C6CC", xs: "none" } : "",
              borderRight:
                locale === "ar" ? { lg: "1px solid #C2C6CC", xs: "none" } : "",
              gap: 2,
              marginBottom: { xs: "10px", lg: "0" },
              flexWrap: "nowrap",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography variant="h4" fontWeight={"bold"}>
                <CountUp end={reviews} duration={3} suffix="%" />
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "16px", sm: "18px" },
                  fontWeight: "400",
                }}
              >
                معدل رضا العملاء
              </Typography>
            </Box>
            <img
              src={StarImage} 
              width={46}
              height={42}
              alt="Star"
            />
          </Grid>
        </Grid>

        <Grid item xs={6} sm={6} lg={3}>
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: locale === "ar" ? "row-reverse" : "row",
              gap: 2,
              borderRight:
                locale === "ar" ? { lg: "1px solid #C2C6CC", xs: "none" } : "",
              borderLeft:
                locale === "en" ? { lg: "1px solid #C2C6CC", xs: "none" } : "",
              marginBottom: { xs: "20px", lg: "0" },
              flexWrap: "nowrap",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography variant="h4" fontWeight={"bold"}>
                <CountUp end={newOrders} duration={3} suffix="+" />
              </Typography>
              <Typography sx={{ fontSize: "18px", fontWeight: "400" }}>
                طلب جديد يوميا
              </Typography>
            </Box>
            <img
              src={DocumentImage} 
              width={46}
              height={42}
              alt="Document"
            />
          </Grid>
        </Grid>

        <Grid item xs={6} sm={6} lg={3}>
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: locale === "ar" ? "row-reverse" : "row",
              gap: 2,
              borderRight:
                locale === "ar" ? { lg: "1px solid #C2C6CC", xs: "none" } : "",
              borderLeft:
                locale === "en" ? { lg: "1px solid #C2C6CC", xs: "none" } : "",
              marginBottom: { xs: "20px", lg: "0" },
              flexWrap: "nowrap",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h4" fontWeight={"bold"}>
                <CountUp end={completedService} duration={3} separator="," suffix="+" />
              </Typography>
              <Typography sx={{ fontSize: "18px", fontWeight: "400" }}>
                خدمة مكتملة
              </Typography>
            </Box>
            <img
              src={ShieldImage} 
              width={46}
              height={42}
              alt="Shield"
            />
          </Grid>
        </Grid>

        <Grid item xs={6} sm={6} lg={3}>
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: locale === "ar" ? "row-reverse" : "row",
              gap: 2,
              flexWrap: "nowrap",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "norrmal",
                flexDirection: "column",
              }}
            >
              <Typography variant="h4" fontWeight={"bold"}>
                <CountUp end={servicesCount} duration={3} suffix="+" />
              </Typography>
              <Typography sx={{ fontSize: "18px", fontWeight: "400" }}>
                خدمات متنوعة
              </Typography>
            </Box>
            <img
              src={CaseImage} 
              width={46}
              height={42}
              alt="Case"
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatsSection;
