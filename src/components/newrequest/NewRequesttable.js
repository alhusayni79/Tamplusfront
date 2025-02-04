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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StatusChip from "../shared/getStatusStyles";
import { useTranslation } from "react-i18next";

const NewRequesttable = ({ rows, selectedCategory }) => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowClick = (transformedRow, originalRowIndex) => {
    const originalRow = rows[originalRowIndex];

    if (originalRow && originalRow.service) {
      if (originalRow.status === "Reserved") {
        navigate(`/employee/${originalRow?.id}/servicePageActive`, {
          state: {
            ...originalRow,
            selectedCategory,
          },
        });
      } else {
        navigate(`/employee/${originalRow?.id}`, {
          state: {
            ...originalRow,
            selectedCategory,
          },
        });
      }
    }
  };

  const transformedRows = (rows || []).map((row) => ({
    id: row.id,
    serviceNumber: row.service?.id || "",
    serviceDescription: row.service?.title?.ar || "",
    status: row.status,
    price: `${row.total} ${
      row.currency?.[currentLang] || t("serviceprovider.currency")
    }`,
    created_at: row.created_at,
  }));

  const filteredRows = transformedRows.filter((row) =>
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
          placeholder={t("profile.search")}
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
                {t("profile.service")}{" "}
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {t("profile.statuss")}
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {t("serviceprovider.total")}
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                {t("serviceprovider.actions")}
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
                    onClick={() =>
                      handleRowClick(row, index + (page - 1) * rowsPerPage)
                    }
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
                        {row?.id}
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
                      <StatusChip Status={row.status} />
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "16px",
                        color: "#6E1311",
                        fontWeight: "400",
                        fontSize: "16px",
                        textAlign: "center",
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
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                  sx={{ color: "#999", padding: "20px" }}
                >
                  {t("profile.nodata")}
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
            {t("profile.show")}
            {Math.min(rowsPerPage, filteredRows.length)}
            {filteredRows.length} {t("profile.sinlgeservice")}
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
                width: "30px",
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
