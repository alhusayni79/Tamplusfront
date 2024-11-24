import React, { useEffect, useState, useRef } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../../redux/Slices/services/serviceSlice";
import { useTranslation } from "react-i18next";

const SearchComponent = () => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.services);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const dropdownRef = useRef(null);
  const fakeOptions = services?.response?.data || []; 
  const { i18n,t } = useTranslation();

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = fakeOptions.filter((option) => {
        const titleEn = option?.title?.en || "";
        return titleEn.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  }, [searchTerm, fakeOptions]);

  const handleBlur = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget)) {
      setTimeout(() => setShowDropdown(false), 200);
    }
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <TextField
        variant="outlined"
        placeholder={t("navbar.search")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        onBlur={handleBlur}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "white" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "30px",
            backgroundColor: "transparent",
            "& fieldset": { border: "none" },
          },
          "& .MuiInputBase-input": {
            fontWeight: "NeoSansArabic",
            color: "#ffff",
            textAlign: "center",
            padding: 0,
          },
          width: "90px",
          height: "auto",
        }}
      />

      {showDropdown && (
        <div
          ref={dropdownRef}
          style={{
            position: "absolute",
            top: "38px",
            left: "-10px",
            width: "250px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "5px",
            zIndex: 1000,
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          
          }}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  borderBottom:
                    index !== filteredOptions.length - 1
                      ? "1px solid #eee"
                      : "none",
                  color: "black",
                }}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  const titleEn = option?.title?.en || "";
                  setSearchTerm(titleEn);
                  setShowDropdown(false);
                }}
              >
                {option?.title?.en || "Untitled"}
              </div>
            ))
          ) : (
            <div
              style={{
                padding: "8px 12px",
                color: "#999",
                textAlign: "center",
              }}
            >
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
