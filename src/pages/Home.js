import { Box } from "@mui/system";
import React, { useEffect } from "react";
import Banner from "../components/layout/Banner";
import SubBanner from "../components/layout/SubBanner.js/SubBanner";
import CustomComponent from "../components/homepage/CustomComponent";
import TestimonialCarousel from "../components/homepage/TestimonialCarousel";
import StatsSection from "../components/homepage/StatsSection";
import MainHaeder from "../components/shared/MainHaeder";
import CustomButton from "../components/shared/CustomButton";
import fram24 from "../../src/assets/image/fram24.png";
import Stepper from "../../src/assets/image/stepper.png";
import Services from "../components/homepage/Services";
import CustomStepper from "../components/homepage/CustomStepper";
import PromoBanner from "../components/shared/PromoBanner";
import LastNewsComponent from "../components/homepage/LastNewsComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchDesignData } from "../redux/Slices/home/homeSlice";
import fram111 from "../assets/image/Frame111.png";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.design);

  useEffect(() => {
    dispatch(fetchDesignData());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {data?.response?.length > 0 && <Banner data={data.response[0]} />}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <SubBanner />
      </Box>
      <Box
        sx={{
          pt: "5px",
          position: "relative",
          mb: 7,
          mt: 4,
        }}
      >
        {data?.response?.length > 1 && (
          <CustomComponent data={data.response[1]} />
        )}
        <Box
          component="img"
          src={fram111}
          alt="Left Image"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
            display: { xs: "none", sm: "none", md: "block" },
          }}
        />
      </Box>
      <Box
        sx={{
          backgroundColor: "#003366",
          pt: "5px",
          position: "relative",
        }}
      >
        <StatsSection />
        <Box
          sx={{
            position: "absolute",
            bottom: "80%",
            left: 0,
            width: { xs: "40%", sm: "30%", md: "20%" },
            height: "auto",
            zIndex: -1,
          }}
        >
          <img
            src="/image/fram2.png"
            alt="Left Image"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </Box>
      </Box>
      <Box sx={{ pt: "5px", position: "relative", overflow: "hidden" }}>
        <MainHaeder
          title={t("home.discover")}
          subtitle={t("home.discovermore")}
        />
        <Box
          sx={{
            mt: 5,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "100%",
              height: "auto",
              zIndex: -1,
            }}
          >
            <img
              src={fram24}
              alt="Left Image"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Box>
          <Services />
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CustomButton
              onClick={() => alert("Button Clicked!")}
              backgroundColor="#07489D"
              textColor="white"
              border={true}
              sx={{ zIndex: 100 }}
            >
              {t("buttons.browse_all_services")}
            </CustomButton>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          mt: 5,
          background: "linear-gradient(to  bottom, #DDEBFD1F 12%, #DDEBFD 60%)",
          position: "relative",
          overflow: "hidden",
          pt: 4,
          pb: 4,
        }}
      >
        <MainHaeder
          title={t("home.howwork")}
          subtitle={t("home.5steps")}
        />
        <Box
          sx={{
            pr: { xs: 1, sm: 3, md: 18 },
            pl: { xs: 1, sm: 3, md: 18 },
            mt: 5,
            pb: 5,
          }}
        >
          {data?.response?.length > 2 && (
            <CustomStepper data={data.response[2]} />
          )}
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              mt: 5,
            }}
          >
            <CustomButton
              onClick={() => alert("Button Clicked!")}
              backgroundColor="#07489D"
              textColor="white"
              border={true}
              sx={{ zIndex: 100 }}
            >
              {t("buttons.take_first_step")}
            </CustomButton>
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: { xs: "40%", sm: "30%", md: "20%" },
              height: "auto",
            }}
          >
            <img
              src={Stepper}
              alt="Left Image"
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          py: 12,
        }}
        id="reviews"
      >
        <MainHaeder
          title={t("home.review")}
          subtitle={t("home.reviewmore")}
        />
        <Box
          sx={{
            mt: 5,
            pb: 5,
          }}
        >
          <TestimonialCarousel />
        </Box>
      </Box>
      <Box
        sx={{
          mt: 5,
          pb: 5,
        }}
      >
        <PromoBanner />
      </Box>
      <Box
        sx={{
          mt: 5,
          pb: 5,
        }}
      >
        <MainHaeder
          title={t("home.news")}
          subtitle={t("home.newsmore")}
        />
        <LastNewsComponent displayCount={3} />
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            mt: 5,
          }}
        >
          <CustomButton
            onClick={() => alert("Button Clicked!")}
            backgroundColor="#07489D"
            textColor="white"
            border={true}
            sx={{ zIndex: 100 }}
          >
            {t("buttons.more_articles")}
          </CustomButton>
        </Box>
      </Box>
    </>
  );
};
export default Home;
