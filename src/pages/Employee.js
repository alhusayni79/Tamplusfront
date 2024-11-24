import React, { useState } from "react";
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

const Employee = () => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("الطلبات");
  const [selectedSubcategory, setSelectedSubcategory] =
    useState("الطلبات الجديدة");
  const [expandedCategory, setExpandedCategory] = useState("الطلبات");

  const handleExpandClick = (categoryName) => {
    setExpandedCategory(
      expandedCategory === categoryName ? null : categoryName
    );
  };

  const categories = [
    {
      category: "الطلبات",
      subcategories: [
        { name: "الطلبات الجديدة", icon: "•" },
        { name: "الطلبات قيد التنفيذ", icon: "•" },
        { name: "الطلبات المكتملة", icon: "•" },
        { name: "الطلبات الملغاة", icon: "•" },
      ],
    },
    {
      category: "معلومات الحساب",
    },
    {
      category: "معلومات الدفع",
    },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryClick = (category, subcategory) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
  };

  const rows = [
    {
      id: 1,
      price: "100 ",
      status: "قيد الانتظار",
      serviceNumber: "#343234",
      serviceDescription: "تعديل المهنة للعمالة",
    },
    {
      id: 2,
      price: "150 ",
      status: "تم الإلغاء",
      serviceNumber: "#5454",
      serviceDescription: "إصدار وإلغاء تأشيرات الخروج والعودة",
    },
    {
      id: 3,
      price: "200 ",
      status: "نشطة",
      serviceNumber: "#123456",
      serviceDescription: "تفصيل جديد للعميل",
    },
    {
      id: 4,
      price: "250 ",
      status: "قيد الانتظار",
      serviceNumber: "#343234",
      serviceDescription: "تفصيل جديد للعميل",
    },
    {
      id: 5,
      price: "300 ",
      status: "قيد الانتظار",
      serviceNumber: "#987654",
      serviceDescription: "تفصيل جديد للعميل",
    },
    {
      id: 6,
      price: "350 ",
      status: "قيد الانتظار",
      serviceNumber: "#5787",
      serviceDescription: "تعديل المهنة للعمالة",
    },
    {
      id: 7,
      price: "400 ",
      status: "تم الإلغاء",
      serviceNumber: "#54787854",
      serviceDescription: "إصدار وإلغاء تأشيرات الخروج والعودة",
    },
    {
      id: 8,
      price: "450 ",
      status: "قيد الانتظار",
      serviceNumber: "#123154456",
      serviceDescription: "تفصيل جديد للعميل",
    },
    {
      id: 9,
      price: "500 ",
      status: "نشطة",
      serviceNumber: "#3432454534",
      serviceDescription: "تفصيل جديد للعميل",
    },
    {
      id: 10,
      price: "550 ",
      status: "مكتملة",
      serviceNumber: "#987654",
      serviceDescription: "تفصيل جديد للعميل",
    },
  ];
  const newRequests = rows.filter((row) => row.status === "قيد الانتظار");
  const inProgressRequests = rows.filter((row) => row.status === "نشطة");
  const completedRequests = rows.filter((row) => row.status === "مكتملة");
  const canceledRequests = rows.filter((row) => row.status === "تم الإلغاء");

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: "80px", mb: 4, position: "relative" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 0, sm: 1, md: 2 }}>
            <Grid item xs={12} sm={12} md={3} sx={{mb:{xs:2,sm:0}}}>
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
                                color:
                                  selectedCategory === category.category
                                    ? "white"
                                    : "#3D4148",
                                fontWeight: 500,
                                textAlign: "right",
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
                                            pl: 2,
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
              {selectedSubcategory === "الطلبات الجديدة" && (
                <NewRequesttable
                  rows={newRequests}
                  selectedCategory={selectedSubcategory}
                />
              )}
              {selectedSubcategory === "الطلبات قيد التنفيذ" && (
                <NewRequesttable
                  rows={inProgressRequests}
                  selectedCategory={selectedSubcategory}
                />
              )}
              {selectedSubcategory === "الطلبات المكتملة" && (
                <NewRequesttable
                  rows={completedRequests}
                  selectedCategory={selectedSubcategory}
                />
              )}
              {selectedSubcategory === "الطلبات الملغاة" && (
                <NewRequesttable
                  rows={canceledRequests}
                  selectedCategory={selectedSubcategory}
                />
              )}
              {selectedCategory === "معلومات الحساب" &&
                !selectedSubcategory && <AccountInfoForm />}
              {selectedCategory === "معلومات الدفع" && !selectedSubcategory && (
                <PaymentInfoForm />
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Employee;
