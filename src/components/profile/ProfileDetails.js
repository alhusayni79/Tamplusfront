import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ServiceDetails from "./ServiceDetails";
import CustomBanner from "../layout/CustomBanner";
import { useParams, useLocation } from "react-router-dom";
import frambanner from "../../assets/image/frambanner.png";
const ProfileDetails = () => {
  const { id, serviceDescription } = useParams();
  const location = useLocation();
  const [rowData, setRowData] = useState(null);

  useEffect(() => {
    if (location.state) {
      setRowData(location.state);
    }
  }, [location.state]);

  if (!rowData) {
    return <Typography>Loading service details...</Typography>;
  }

  return (
    <>
      <CustomBanner
        title="مرحباً, أحمد!"
        subtitle={rowData.serviceNumber}
        service={rowData.serviceDescription}
      />
      <Box
        sx={{
          pr: { xs: 1, sm: 3, md: 18 },
          pl: { xs: 1, sm: 3, md: 18 },
          mt: "290px",
          mb: 4,
          position: "relative",
        }}
      >
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

        <Box sx={{ pt: "64px" }}>
          <ServiceDetails
            ServiceNumber={rowData.serviceNumber}
            Status={rowData.status}
            serviceDescription={rowData.serviceDescription}
          />
        </Box>
      </Box>
    </>
  );
};

export default ProfileDetails;
