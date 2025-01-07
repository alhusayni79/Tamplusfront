import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  Paper,
  useTheme,
  List,
  ListItem,
  ListItemText,
  TextField,
  InputAdornment,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CustomBanner from "../layout/CustomBanner";
import frambanner from "../../assets/image/frambanner.png";
import { useLocation, useNavigate } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRequest } from "../../redux/Slices/userRequest/userRequestSlice";
import StatusChip from "../shared/getStatusStyles";
import LoadingSpinner from "../shared/LoadingSpinner";
const Profile = () => {
  const location = useLocation();
  const { user } = location.state || {};

  const theme = useTheme();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [selectedCategory, setSelectedCategory] = useState("معلومات الحساب");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { category: "معلومات الحساب" },
    { category: "الخدمات السابقة" },
    { category: "رصيد المحفظة" },
    { category: " تسجيل الخروج" },
  ];

  const dispatch = useDispatch();
  const { userRequest, loading, error } = useSelector(
    (state) => state.userRequest
  );

  useEffect(() => {
    dispatch(fetchUserRequest());
  }, [dispatch]);

  useEffect(() => {
    const savedCategory = localStorage.getItem("selectedCategory");
    if (savedCategory) {
      setSelectedCategory(savedCategory);
    }
  }, []);

  const handleCategoryClick = (category) => {
    if (category === " تسجيل الخروج") {
      document.cookie =
        "auth_token=;expires=" + new Date(0).toUTCString() + ";path=/";

      document.cookie
        .split(";")
        .forEach(
          (cookie) =>
            (document.cookie = cookie
              .replace(/^ +/, "")
              .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`))
        );

      window.location.href = "/login";
    } else {
      setSelectedCategory(category);
      setPage(1);
      localStorage.setItem("selectedCategory", category);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const transformRequestToTableData = (requests) => {
    if (!requests?.response || !Array.isArray(requests.response)) {
      return [];
    }

    return requests.response.map((request) => ({
      id: request.id,
      time: request.created_at,
      timeupdate: request.updated_at,
      status: request.status,
      serviceNumber: `#${request.id}`,
      serviceDescription:
        request.service?.title?.ar || request.service?.title?.en || "",
    }));
  };

  const rows = transformRequestToTableData(userRequest);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowClick = (row) => {
    navigate(`/profile/${row.serviceDescription}`, {
      state: {
        row,
        user,
      },
    });
  };

  const filteredRows = rows.filter((row) =>
    (row.serviceDescription?.toString().toLowerCase() || "").includes(
      searchQuery.toLowerCase()
    )
  );

  return (
    <Box sx={{ pt: "64px" }}>
      <CustomBanner title={`مرحباً, ${user?.response?.first_name || ""}!`} />
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
            zIndex: -1,
          }}
        />
        <Container maxWidth="lg">
          {isLoading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 0, sm: 1, md: 2 }}>
              <Grid item xs={12} sm={12} md={3}>
                <Paper
                  elevation={1}
                  style={{
                    width: { xs: "100%", md: "100px" },
                    padding: "20px",
                    height: "auto",
                    cursor: "pointer",
                    position: "relative",
                    borderBottomLeftRadius: "8px",
                    borderBottomRightRadius: "8px",
                    borderTopLeftRadius: "0px",
                    borderTopRightRadius: "0px",
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
                      <ListItem
                        type="button"
                        key={index}
                        onClick={() => handleCategoryClick(category.category)}
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
                          primary={category.category}
                          sx={{
                            textAlign: "center",
                            color:
                              selectedCategory === category.category
                                ? "white"
                                : "black",
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={12} md={9}>
                {selectedCategory === "الخدمات السابقة" ? (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                        pb: "32px",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: "#000", fontWeight: "bold" }}
                      >
                        الخدمات السابقة
                      </Typography>
                      <TextField
                        placeholder="البحث في الخدمات السابقة..."
                        variant="outlined"
                        sx={{
                          backgroundColor: "#ffffff",
                          borderRadius: "8px",
                          border: "1px solid #D8DBDE",
                          height: "42px",
                          width: "350px",
                          "& .MuiOutlinedInput-root": {
                            color: "#595F69",
                            display: "flex",
                            alignItems: "center",
                            height: "100%",
                            "& fieldset": {
                              borderColor: "transparent",
                            },
                            "&:hover fieldset": {
                              borderColor: "transparent",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "transparent",
                            },
                          },
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <SearchIcon sx={{ color: "#595F69" }} />
                            </InputAdornment>
                          ),
                          sx: {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row-reverse",
                          },
                        }}
                        inputProps={{
                          dir: "rtl",
                          style: { textAlign: "center" },
                        }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </Box>

                    <TableContainer
                      component={Paper}
                      sx={{
                        borderRadius: "12px",
                        backgroundColor: "transparent",
                      }}
                      elevation={0}
                    >
                      <Table
                        sx={{
                          border: "1px solid #D8DBDE",
                          borderRadius: "18px",
                        }}
                      >
                        <TableHead>
                          <TableRow sx={{ backgroundColor: "#042B5D" }}>
                            <TableCell
                              sx={{
                                color: "#fff",
                                fontWeight: "bold",
                                textAlign: "center",
                              }}
                            >
                              الخدمة
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#fff",
                                fontWeight: "bold",
                                textAlign: "center",
                              }}
                            >
                              الحالة
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#fff",
                                fontWeight: "bold",
                                textAlign: "left",
                              }}
                            >
                              آخر تحديث
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredRows.length > 0 ? (
                            filteredRows
                              .slice(
                                (page - 1) * rowsPerPage,
                                page * rowsPerPage
                              )
                              .map((row, index) => (
                                <TableRow
                                  key={row.id}
                                  onClick={() => handleRowClick(row)}
                                  sx={{
                                    "&:hover": {
                                      backgroundColor: "#f1f1f1",
                                      cursor: "pointer",
                                    },
                                    transition: "0.3s ease",
                                  }}
                                >
                                  <TableCell
                                    sx={{
                                      padding: "16px",
                                      color: "#1E2024",
                                      textAlign: "center",
                                      fontSize: "14px",
                                      fontWeight: "400",
                                      display: "flex",
                                      flexDirection: "column",
                                      backgroundColor:
                                        index % 2 === 0
                                          ? "transparent"
                                          : "#F4F5F6",
                                    }}
                                  >
                                    <Box
                                      component="span"
                                      sx={{
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                        color: "#1E2024",
                                      }}
                                    >
                                      {row.serviceNumber}
                                    </Box>
                                    <Box
                                      component="span"
                                      sx={{
                                        fontWeight: "400",
                                        fontSize: "14px",
                                        color: "#1E2024",
                                      }}
                                    >
                                      {row.serviceDescription}
                                    </Box>
                                  </TableCell>

                                  <TableCell
                                    sx={{
                                      padding: "16px",
                                      textAlign: "center",
                                      backgroundColor:
                                        index % 2 === 0
                                          ? "transparent"
                                          : "#F4F5F6",
                                    }}
                                  >
                                    <StatusChip Status={row.status} />
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      padding: "16px",
                                      color: "#6E1311",
                                      fontWeight: "400",
                                      fontSize: "16px",
                                      backgroundColor:
                                        index % 2 === 0
                                          ? "transparent"
                                          : "#F4F5F6",
                                    }}
                                  >
                                    {row.timeupdate}
                                  </TableCell>
                                </TableRow>
                              ))
                          ) : (
                            <TableRow>
                              <TableCell
                                colSpan={3}
                                align="center"
                                sx={{ color: "#999", padding: "20px" }}
                              >
                                لا توجد بيانات
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexDirection: { xs: "column-reverse", sm: "row" },
                        }}
                      >
                        <p
                          style={{
                            textAlign: "right",
                            color: "#1E2024",
                            marginTop: "16px",
                            fontWeight: "400",
                          }}
                        >
                          يتم عرض من 1 إلى 5 خدمات من
                          {Math.min(
                            page * rowsPerPage,
                            filteredRows.length
                          )}{" "}
                          خدمة
                        </p>
                        <Pagination
                          count={Math.ceil(filteredRows.length / rowsPerPage)}
                          page={page}
                          onChange={handleChangePage}
                          sx={{
                            pt: 5,
                            display: "flex",
                            justifyContent: "center",
                            "& .MuiPaginationItem-root": {
                              backgroundColor: "transparent",
                              color: "#1E2024",
                              fontWeight: "bold",
                              borderRadius: "50%",
                              mx: 0.5,
                              "&:hover": {
                                backgroundColor: "transparent",
                                color: "black",
                              },
                              "&.Mui-selected": {
                                backgroundColor: "#F4F5F6",
                                color: "#07489D",
                              },
                            },
                            "& .MuiPaginationItem-ellipsis": {
                              fontSize: "20px",
                            },
                            "& .MuiPaginationItem-icon": {
                              color: "#3D4148",
                              backgroundColor: "#D8DBDE",
                              width: "30px ",
                              height: "30px",
                              borderRadius: "50%",
                            },
                          }}
                        />
                      </Box>
                    </TableContainer>
                  </>
                ) : selectedCategory === "رصيد المحفظة" ? (
                  <Box
                    sx={{
                      padding: "20px",
                      borderRadius: "12px",
                      boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      رصيد المحفظة
                    </Typography>
                    <Typography variant="body1">
                      إجمالي الرصيد: 5000 جنيه
                    </Typography>
                    <Typography variant="body1">
                      آخر عملية: إضافة 2000 جنيه بتاريخ 10/02/2023
                    </Typography>
                  </Box>
                ) : selectedCategory === "معلومات الحساب" ? (
                  <Box
                    sx={{
                      padding: "20px",
                      borderRadius: "12px",
                      boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      معلومات الحساب
                    </Typography>
                    <UpdateProfile />
                  </Box>
                ) : null}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Profile;
