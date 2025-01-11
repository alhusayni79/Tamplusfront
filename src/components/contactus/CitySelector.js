import {
  Box,
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchFooter } from "../../redux/Slices/FooterData/footerSlice";
import Map from "./Map";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LoadingSpinner from "../../components/shared/LoadingSpinner.js";
const CitySelector = () => {
  const [city, setCity] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const handleChange = (event) => {
    const selectedCityName = event.target.value;
    setCity(selectedCityName);

    const selectedCity = cities.find(
      (city) => city.name[currentLang] === selectedCityName
    );

    if (selectedCity) {
      setCoordinates({ lat: selectedCity.lat, lng: selectedCity.lng });
    }
  };

  const theme = useTheme();
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const dispatch = useDispatch();
  const { footer, loading, error } = useSelector((state) => state.footer);

  useEffect(() => {
    dispatch(fetchFooter());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const cities = footer?.response?.cities || [];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "center", md: "flex-start" },
          gap: 2,
          mx: "auto",
          width: "100%",
          maxWidth: "1200px",
          px: 2,
        }}
      >
        <Box
          sx={{
            flex: "2",
            width: "100%",
            height: "400px",
          }}
        >
          <Map lat={coordinates.lat} lng={coordinates.lng} city={city} />
        </Box>

        <Card
          sx={{
            flex: "1",
            maxWidth: { xs: "100%", md: "350px" },
            mt: 4,
            position: "relative",
            backgroundColor: "white",
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            p: 1,
          }}
          elevation={1}
        >
          <Box
            sx={{
              width: "100%",
              height: "7px",
              backgroundColor: "#07489D",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
          <CardContent>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "22px",
                color: theme.palette.primary.dark,
                pt: 2,
                pb: 2,
              }}
            >
              {t("contact.roadto")}
            </Typography>

            <FormControl fullWidth style={{ maxWidth: "300px" }} dir="rtl">
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: "18px",
                  color: theme.palette.primary.dark,
                  pt: 1,
                  pb: 1,
                }}
              >
                {t("contact.madina")}
              </Typography>
              <Select
                labelId="city-select-label"
                id="city-select"
                value={city}
                onChange={handleChange}
                displayEmpty
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>{t("contact.choose")}</em>;
                  }
                  return selected;
                }}
              >
                <MenuItem value="">
                  <em>{t("contact.choose")}</em>{" "}
                </MenuItem>
                {cities.map((city) => (
                  <MenuItem key={city.id} value={city.name[currentLang]}>
                    {city.name[currentLang]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid",
          borderColor: theme.palette.primary.main,
          borderRadius: "8px",
          padding: "16px",
          width: "fit-content",
          margin: "0 auto",
          mt: 5,
        }}
      >
        <LocationOnIcon
          sx={{
            color: theme.palette.primary.main,
            fontSize: "40px",
            mr: 2,
          }}
        />
        <Typography variant="h6" sx={{ fontSize: "18px", fontWeight: "500" }}>
          {city
            ? `${t("contact.mrkz")}: ${city}`
            : `${t("contact.choosemore")}`}
        </Typography>
      </Box>
    </>
  );
};

export default CitySelector;
