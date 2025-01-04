import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import ServiceDetails from "./ServiceDetails";
import CustomBanner from "../layout/CustomBanner";
import { useParams, useLocation } from "react-router-dom";
import frambanner from "../../assets/image/frambanner.png";
const ProfileDetails = () => {
  const location = useLocation();
  const [rowData, setRowData] = useState(null);
  const { row, user } = location.state || {};

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
        title={`مرحباً, ${user?.response?.first_name || "ضيف"}!`}
        subtitle={row.serviceNumber}
        service={row.serviceDescription}
      />
      <Box
        sx={{
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
        <Container maxWidth="lg">
          <Box sx={{ pt: "64px" }}>
            <ServiceDetails
              ServiceNumber={row.serviceNumber}
              Status={row.status}
              serviceDescription={row.serviceDescription}
              orderId={row.id}
              user={user}
              row={row}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProfileDetails;
