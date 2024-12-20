import React, { useState } from "react";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Pagination,
  Paper,
  TextField,
  InputAdornment,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

const NewRequesttable = ({ rows, selectedCategory }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryClick = (category) => {
    setPage(1);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowClick = (row) => {
    navigate(`/employee/${row.serviceDescription}`, { state: row });
  };

  const filteredRows = (rows || []).filter((row) =>
    row.serviceDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
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
          sx={{
            color: "#1E2124",
            fontWeight: 500,
            fontSize: {
              xs: "16px",
              sm: "20px",
              md: "24px",
            },
          }}
        >
          {selectedCategory}
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
        <Table sx={{ border: "1px solid #D8DBDE", borderRadius: "18px" }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#042B5D" }}>
              <TableCell
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                الطلب
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
                  textAlign: "center",
                }}
              >
                الإجمالي{" "}
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                الإجراءات
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.length > 0 ? (
              filteredRows
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
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
                          index % 2 === 0 ? "transparent" : "#F4F5F6",
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
                          index % 2 === 0 ? "transparent" : "#F4F5F6",
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          borderRadius: "16px",
                          padding: "4px 12px",
                          backgroundColor:
                            row.status === "نشطة"
                              ? "#E2FAE0"
                              : row.status === "قيد الانتظار"
                              ? "#FFF3CD"
                              : row.status === "تم الإلغاء"
                              ? "#F8D7DA"
                              : row.status === "مكتملة"
                              ? "#D1ECF1"
                              : "#FAE1E0",
                          color:
                            row.status === "نشطة"
                              ? "#114C0B"
                              : row.status === "قيد الانتظار"
                              ? "#856404"
                              : row.status === "تم الإلغاء"
                              ? "#721C24"
                              : row.status === "مكتملة"
                              ? "#0C5460"
                              : "#6E1311",
                        }}
                      >
                        {row.status}
                      </Button>
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "16px",
                        color: "#6E1311",
                        fontWeight: "400",
                        fontSize: "16px",
                        backgroundColor:
                          index % 2 === 0 ? "transparent" : "#F4F5F6",
                      }}
                    >
                      {row.price}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "16px",
                        color: "#6E1311",
                        fontWeight: "400",
                        fontSize: "16px",
                        backgroundColor:
                          index % 2 === 0 ? "transparent" : "#F4F5F6",
                      }}
                    >
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          backgroundColor: "#DDEBFD",
                        }}
                      >
                        <VisibilityIcon sx={{ color: "#07489D" }} />
                      </Box>{" "}
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
            {Math.min(page * rowsPerPage, filteredRows.length)} خدمة
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
  );
};

export default NewRequesttable;
