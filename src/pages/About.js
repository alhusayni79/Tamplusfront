import React, { useEffect } from "react";
import { Box } from "@mui/material";
import CustomBanner from "../components/layout/CustomBanner";
import TrustSection from "../about/TrustSection";
import StatsSection from "../components/homepage/StatsSection";
import VisionMissionValuesSection from "../about/VisionMissionValuesSection";
import TeamSection from "../about/TeamSection";
import PromoBanner from "../components/shared/PromoBanner";
import SubBanner from "../components/layout/SubBanner.js/SubBanner";
import { useDispatch, useSelector } from "react-redux";
import { fetchDesignData } from "../redux/Slices/home/homeSlice";
import frambanner from "../assets/image/frambanner.png";

const About = () => {
  const dispatch = useDispatch();
  const { design, loading, error } = useSelector((state) => state.design);

  useEffect(() => {
    dispatch(fetchDesignData());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <CustomBanner
        title={"عن المنصة"}
        service={"أنجز معاملتك الحكومية في أقل من دقيقة!"}
      />
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            pr: { xs: 1, sm: 3, md: 18 },
            pl: { xs: 1, sm: 3, md: 18 },
            mt: "300px",
            mb: 4,
          }}
        >
          <TrustSection data={design?.response[3]} />
        </Box>
        <Box
          sx={{
            backgroundColor: "#042B5D",
          }}
        >
          <StatsSection />
        </Box>
        <Box
          sx={{
            pr: { xs: 1, sm: 3, md: 18 },
            pl: { xs: 1, sm: 3, md: 18 },
            pt: "88px",
          }}
        >
          <VisionMissionValuesSection data={design?.response[4]} />
        </Box>
        <Box
          sx={{
            pr: { xs: 1, sm: 3, md: 18 },
            pl: { xs: 1, sm: 3, md: 18 },
            mt: "88px",

            mb: "88px",
          }}
        >
          <PromoBanner />
        </Box>
        <Box
          sx={{
            background:
              "linear-gradient(to bottom, #DDEBFD1F 12%, #DDEBFD 100%)",
            py: 4,
          }}
        >
          <TeamSection data={design?.response[5]} />
        </Box>
        <Box
          sx={{
            py: 6,
          }}
        >
          <SubBanner />
        </Box>
        <img
          src={frambanner}
          alt="description of image"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "auto",
            zIndex: -1111,
          }}
        />
      </Box>
    </>
  );
};

export default About;
