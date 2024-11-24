import React from "react";
import {
  Box,
  Step,
  StepLabel,
  Stepper,
  Typography,
  StepConnector,
} from "@mui/material";
import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";

const CustomConnector = styled(StepConnector)(({ theme, locale }) => ({
  top: 50,
  ...(locale === "ar"
    ? {
        right: "calc(-50% + 50px)",
        left: "calc(50% + 50px)",
      }
    : {
        left: "calc(-50% + 50px)",
        right: "calc(50% + 50px)",
      }),
  "& .MuiStepConnector-line": {
    background: `linear-gradient(90deg, #ccc 50%, transparent 50%)`,
    backgroundSize: "20px 1px",
    height: 1,
    border: "none",
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));



const CustomStepper = ({data}) => {
  const { i18n, t } = useTranslation();
    const locale = i18n.language;
  return (
    <Box
      sx={{
        width: "100%",
        padding: 2,
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <Stepper
        alternativeLabel
        activeStep={-1}
        connector={<CustomConnector locale={locale} />}
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "center", sm: "flex-start" },
          gap: { xs: 3, md: 0 },
        }}
      >
        {data?.data?.map((step, index) => (
          <Step
            key={index}
            sx={{
              display: "flex",
              justifyContent: {
                xs: "flex-start",
                sm: "center",
              },
              alignItems: "center",
              "& .css-ascpo7-MuiStepLabel-root.Mui-disabled": {
                flexDirection: { xs: "row", sm: "column" },
                alignItems: { xs: "baseline", sm: "center" },
                gap: 2,
              },

              gap: { xs: 2, sm: 0 },
            }}
          >
            <StepLabel
              StepIconComponent={() => (
                <Box
                  sx={{
                    width: { xs: 70, sm: 100 },
                    height: { xs: 70, sm: 100 },
                    borderRadius: "50%",
                    backgroundColor: index % 2 === 0 ? "#DDEBFD" : "#E3D1DC",
                    border: `2px solid ${
                      index % 2 === 0 ? "#A4C2E5" : "#5A1338"
                    }`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: { xs: 0, sm: 0 },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: index % 2 === 0 ? "#07489D" : "#741B4F",
                      fontSize: { xs: "16px", sm: "28px" },
                      fontWeight: "bold",
                    }}
                  >
                    {index + 1}
                  </Typography>
                </Box>
              )}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Typography
                  variant="h6"
                  color="#1E2024"
                  sx={{
                    fontSize: "20px",
                    fontWeight: 400,
                  }}
                >
                  {step.value[locale]}
                </Typography>
              </Box>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default CustomStepper;
