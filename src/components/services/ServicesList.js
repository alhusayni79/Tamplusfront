import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "./ServiceCard";
import { useTheme } from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../redux/Slices/services/serviceSlice";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const theme = useTheme();
  const [subServices, setSubServices] = useState([]);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.services);

  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.selectedService || "خدمات طاقات"
  );

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    const selectedService = services?.response?.data.find(
      (service) => service.title[currentLang] === selectedCategory
    );

    if (selectedService) {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/user/sub-service?id=${selectedService.id}`
        )
        .then((response) => {

          const subServicesData = response.data.response?.data || [];
          setSubServices(subServicesData);
        })
        .catch((error) => {
          console.error("Error fetching sub-services", error);
          setSubServices([]);
        });
    }
  }, [selectedCategory, services]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const serviceList = services?.response?.data || [];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        pb: 4,
      }}
    >
      {isMobile ? (
        <FormControl fullWidth>
          <Select
            value={selectedCategory}
            onChange={(e) => handleCategoryClick(e.target.value)}
            sx={{
              backgroundColor: "white",
              color: theme.palette.primary.body,
              fontWeight:"500",
              mb: 2,
              textAlign: "center",
              ".MuiSelect-select": {
                textAlign: "center",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  "& .MuiMenuItem-root": {
                    justifyContent: "center",
                  },
                },
              },
            }}
          >
            {serviceList.map((service) => (
              <MenuItem
                key={service.id}
                value={service.title[currentLang]}
                sx={{ textAlign: "center" }}
              >
                {service.title[currentLang]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <Paper
          elevation={1}
          sx={{
            width: "300px",
            padding: "20px",
            height: "auto",
            cursor: "pointer",
            position: "relative",
            borderRadius: "8px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "7px",
              backgroundColor: theme.palette.primary.main,
              position: "absolute",
              top: 0,
              right: 0,
            }}
          ></Box>

          <List>
            {serviceList.map((service) => (
              <ListItem
                button
                key={service.id}
                onClick={() => handleCategoryClick(service.title[currentLang])}
                sx={{
                  backgroundColor:
                    selectedCategory === service.title[currentLang]
                      ? theme.palette.primary.main
                      : "transparent",
                  borderRadius: "4px",
                  "&:hover": {
                    backgroundColor:
                      selectedCategory === service.title[currentLang]
                        ? theme.palette.primary.main
                        : "#f0f0f0",
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <ListItemText
                  primary={service.title[currentLang]}
                  primaryTypographyProps={{
                    sx: {
                      textAlign: "center",
                      color:
                        selectedCategory === service.title[currentLang]
                          ? "white"
                          : "black",
                      fontSize: "16px",
                      fontWeight:
                        selectedCategory === service.title[currentLang]
                          ? "500"
                          : "500",
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      <Box sx={{ flex: 1 }}>
        <Typography
          component="span"
          sx={{
            display: "block",
            mr: 2,
            fontSize: "20px",
            fontWeight: "500",
            color: theme.palette.primary.body,
            mb: 2,
          }}
        >
          {selectedCategory}
        </Typography>

        <Grid container spacing={0}>
          {subServices.length > 0 ? (
            subServices.map((subService) => (
              <Grid item xs={6} sm={6} md={4} key={subService.id}>
                <ServiceCard
                  id={subService.id}
                  slug={subService.slug}
                  title={subService.title || "No Title"}
                  mainTitle={selectedCategory}
                  imageSrc={subService.image}
                  price={subService.price_with_vat}
                  price_without_vat={subService.price_without_vat}
                  government_fees_without_vat={subService.price_with_vat}
                  government_fees_with_vat={subService.price_with_vat}
                  period={subService?.period_in_days}
                  requiredDocuments={subService.required_documents}
                  terms={subService.terms}
                  description={subService.description || "No Description"}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography>No sub-services available</Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
