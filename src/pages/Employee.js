import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  useTheme,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Container,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import NewRequesttable from "../components/newrequest/NewRequesttable";
import PaymentInfoForm from "../components/newrequest/PaymentInfoForm";
import AccountInfoForm from "../components/newrequest/AccountInfoForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompletedRequest } from "../redux/Slices/employeeRequest/completedRequestSlice";
import { fetchNewRequest } from "../redux/Slices/employeeRequest/newRequestSlice";
import { fetchReservedRequest } from "../redux/Slices/employeeRequest/reservedRequestSlice";
import { fetchCanceledRequest } from "../redux/Slices/employeeRequest/canceledReuwstSlice";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Employee = () => {
  const {i18n, t } = useTranslation();
  const currentLang = i18n.language;
 const theme = useTheme();
  const Navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(
    t("serviceprovider.requests")
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    t("serviceprovider.new_requests")
  );
  const [expandedCategory, setExpandedCategory] = useState(
    t("serviceprovider.requests")
  );

  const handleExpandClick = (categoryName) => {
    setExpandedCategory(
      expandedCategory === categoryName ? null : categoryName
    );
  };

  const categories = [
    {
      category: t("serviceprovider.requests"),
      subcategories: [
        { name: t("serviceprovider.new_requests"), icon: "•" },
        { name: t("serviceprovider.requests_in_progress"), icon: "•" },
        { name: t("serviceprovider.completed_requests"), icon: "•" },
        { name: t("serviceprovider.cancelled_requests"), icon: "•" },
      ],
    },
    {
      category: t("serviceprovider.account_information"),
    },
    {
      category: t("serviceprovider.paymentway"),
    },
    { category: t("serviceprovider.logout") },
  ];
  const dispatch = useDispatch();

  const {
    completedRequest,
    loading: completedLoading,
    error: completedError,
  } = useSelector((state) => state.completedRequest);

  const {
    newRequest,
    loading: newLoading,
    error: newError,
  } = useSelector((state) => state.newRequest);

  const {
    reservedRequest,
    loading: reservedLoading,
    error: reservedError,
  } = useSelector((state) => state.reservedRequest);

  const {
    canceledRequest,
    loading: canceledLoading,
    error: canceledError,
  } = useSelector((state) => state.canceledRequest);

  useEffect(() => {
    dispatch(fetchCompletedRequest());
    dispatch(fetchNewRequest());
    dispatch(fetchReservedRequest());
    dispatch(fetchCanceledRequest());
  }, [dispatch]);

  if (completedLoading || newLoading || reservedLoading || canceledLoading) {
    return <LoadingSpinner />;
  }

  if (completedError || newError || reservedError || canceledError) {
    return (
      <div>
        {completedError && <div>Completed Request Error: {completedError}</div>}
        {newError && <div>New Request Error: {newError}</div>}
        {reservedError && <div>Reserved Request Error: {reservedError}</div>}
        {canceledError && <div>Canceled Request Error: {canceledError}</div>}
      </div>
    );
  }
  const handleCategoryClick = (category) => {
    if (category === t("serviceprovider.logout")) {
      document.cookie =
        "authemployee=;expires=" + new Date(0).toUTCString() + ";path=/";
      document.cookie
        .split(";")
        .forEach(
          (cookie) =>
            (document.cookie = cookie
              .replace(/^ +/, "")
              .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`))
        );

      Navigate("/");
    } else {
      setSelectedCategory(category);
      setSelectedSubcategory(null);
    }
  };

  const handleSubcategoryClick = (category, subcategory) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: "80px", mb: 4, position: "relative" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 0, sm: 1, md: 2 }}>
            <Grid item xs={12} sm={12} md={3} sx={{ mbش: { xs: 2, sm: 0 } }}>
              <Paper
                elevation={1}
                style={{
                  padding: "20px",
                  cursor: "pointer",
                  position: "relative",
                  borderBottomLeftRadius: "8px",
                  borderBottomRightRadius: "8px",
                  borderTopLeftRadius: "0px",
                  borderTopRightRadius: "0px",
                  width: {
                    xs: "100%",
                    sm: "200px",
                    md: "256px",
                  },
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
                  {categories.map((category, index) => (
                    <React.Fragment key={index}>
                      <ListItem
                        button
                        onClick={() =>
                          category.subcategories
                            ? handleExpandClick(category.category)
                            : handleCategoryClick(category.category)
                        }
                        sx={{
                          textAlign:"center",
                          backgroundColor:
                            selectedCategory === category.category
                              ? theme.palette.primary.main
                              : "transparent",
                          borderRadius: "4px",
                          "&:hover": {
                            backgroundColor:
                              selectedCategory === category.category
                                ? theme.palette.primary.main
                                : "#f0f0f0",
                            color: theme.palette.primary.main,
                          },
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography
                            sx={{
                              fontSize: "16px",
                              color: selectedCategory === category.category ? "white" : "#3D4148",
                              fontWeight: 500,
                              textAlign: currentLang === "ar" ? "right" : "left",
                            }}
                            
                            >
                              {category.category}
                            </Typography>
                          }
                        />
                        {category.subcategories ? (
                          expandedCategory === category.category ? (
                            <ExpandLess
                              sx={{
                                color:
                                  selectedCategory === category.category
                                    ? "white"
                                    : "black",
                              }}
                            />
                          ) : (
                            <ExpandMore
                              sx={{
                                color:
                                  selectedCategory === category.category
                                    ? "white"
                                    : "black",
                              }}
                            />
                          )
                        ) : null}
                      </ListItem>
                      {category.subcategories && (
                        <Collapse
                          in={expandedCategory === category.category}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List component="div" disablePadding>
                            {category.subcategories.map(
                              (subcategory, subIndex) => (
                                <ListItem
                                  button
                                  key={subIndex}
                                  onClick={() =>
                                    handleSubcategoryClick(
                                      category.category,
                                      subcategory.name
                                    )
                                  }
                                  sx={{
                                    mt: 1,
                                    p: 0.5,
                                    pr: 2,
                                    color:
                                      selectedSubcategory === subcategory.name
                                        ? "#F4F5F6"
                                        : "transparent",
                                    backgroundColor:
                                      selectedSubcategory === subcategory.name
                                        ? "#F4F5F6"
                                        : "transparent",
                                    borderRadius: "8px",
                                  }}
                                >
                                  <ListItemText
                                    primary={
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Typography
                                          component="span"
                                          sx={{
                                            pl: 1.5,
                                            pr: 1.5,

                                            fontSize: "x-large",
                                            color:
                                              selectedSubcategory ===
                                              subcategory.name
                                                ? "#07489D"
                                                : "#3D4148",
                                          }}
                                        >
                                          {subcategory.icon}
                                        </Typography>
                                        <Typography
                                          sx={{
                                            fontSize: "14px",
                                            fontWeight: 500,
                                            color:
                                              selectedSubcategory ===
                                              subcategory.name
                                                ? "#3D4148"
                                                : "#3D4148",
                                          }}
                                        >
                                          {subcategory.name}
                                        </Typography>
                                      </Box>
                                    }
                                    sx={{
                                      color:
                                        selectedSubcategory === subcategory.name
                                          ? "white"
                                          : "black",
                                    }}
                                  />
                                </ListItem>
                              )
                            )}
                          </List>
                        </Collapse>
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={9}>
              {selectedSubcategory === t("serviceprovider.new_requests") && (
                <NewRequesttable
                  rows={newRequest?.response}
                  selectedCategory={selectedSubcategory}
                />
              )}
              {selectedSubcategory ===
                t("serviceprovider.requests_in_progress") && (
                <NewRequesttable
                  rows={reservedRequest?.response}
                  selectedCategory={selectedSubcategory}
                />
              )}
              {selectedSubcategory ===
                t("serviceprovider.completed_requests") && (
                <NewRequesttable
                  rows={completedRequest?.response}
                  selectedCategory={selectedSubcategory}
                />
              )}
              {selectedSubcategory ===
                t("serviceprovider.cancelled_requests") && (
                <NewRequesttable
                  rows={canceledRequest?.response}
                  selectedCategory={selectedSubcategory}
                />
              )}
              {selectedCategory === t("serviceprovider.account_information") &&
                !selectedSubcategory && <AccountInfoForm />}
              {/* {selectedCategory === t("serviceprovider.paymentway") &&
                !selectedSubcategory && <PaymentInfoForm />} */}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Employee;
