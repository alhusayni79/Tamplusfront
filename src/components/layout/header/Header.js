import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material";
import Logo from "../../../assets/image/tamplus.png";
import Logo2 from "../../../assets/image/Logo2.png";
import CustomButton from "../../shared/CustomButton";
import LanguageToggleButton from "../../shared/toggleLanguage";
import { useTranslation } from "react-i18next";
import SearchComponent from "./SearchComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../../redux/Slices/userdata/userSlice";
import Cookies from "js-cookie";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import UserMenu from "./UserMenu";
function ResponsiveAppBar() {
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const pages = [
    { label: t("navbar.home"), path: "/" },
    { label: t("navbar.about"), path: "/about" },
    {
      label: t("navbar.services"),
      path: "/services",
      subpages: ["/services", "/services/:label", "/services/:label/payment"],
    },
    { label: t("navbar.reviews"), path: "/#reviews" },
    {
      label: t("navbar.News"),
      path: "/lastnews",
      subpages: ["/lastnews/:title"],
    },
    { label: t("navbar.contactus"), path: "/contactus" },
  ];

  const token = Cookies.get("auth_token");
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const currentLang = i18n.language;
  const locale = i18n.language;
  const [bgColor, setBgColor] = useState("transparent");
  const [activePage, setActivePage] = useState(pages[0].label);
  const [lastActiveMainPage, setLastActiveMainPage] = useState(pages[0].label);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const findActivePage = (pathname, hash) => {
    const normalizedPath = pathname + (hash || "");

    const currentPage = pages.find((page) => {
      if (page.path === normalizedPath) {
        return true;
      }
      if (page.subpages) {
        return page.subpages.some((subpage) => {
          const dynamicMatch =
            subpage.includes(":") && pathname.startsWith(subpage.split(":")[0]);
          return dynamicMatch || pathname.startsWith(subpage);
        });
      }
      return false;
    });

    return currentPage;
  };

  useEffect(() => {
    const currentPage = findActivePage(location.pathname, location.hash);

    if (currentPage) {
      setActivePage(currentPage.label);
      if (
        !currentPage.subpages ||
        currentPage.path === location.pathname + location.hash
      ) {
        setLastActiveMainPage(currentPage.label);
      }
    } else {
      setActivePage(null);
    }
  }, [location.pathname, location.hash]);

  const handleHomeRoute = () => {
    navigate("/");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handlePageChange = (page) => {
    navigate(page.path);
    setActivePage(page.label);
    if (!page.subpages) {
      setLastActiveMainPage(page.label);
    }
    handleCloseNavMenu();
  };

  const handleProfileRoute = () => {
    navigate("/login");
    setActivePage("");
    handleCloseNavMenu();
  };

  const handleUserRoute = () => {
    navigate("/profile", { state: { user } });
    setActivePage("");
    handleCloseNavMenu();
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        setBgColor("#003366");
      } else {
        setBgColor("transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: bgColor,
        transition: "background-color 0.3s ease",
        py: { xs: 2, sm: 1 },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: "row-reverse",
              cursor: "pointer",
            }}
            onClick={handleHomeRoute}
          >
            <Box
              sx={{
                borderRight: locale === "ar" ? "1px solid white" : "",
                paddingRight: locale === "ar" ? "15px" : "",
                borderLeft: locale === "en" ? "1px solid white" : "",
                paddingLeft: locale === "en" ? "15px" : "",
              }}
            >
              <img
                src={Logo2}
                alt="logo2"
                style={{ width: "60px", height: "auto" }}
              />
            </Box>
            <Box>
              <img
                src={Logo}
                alt="logo"
                style={{
                  paddingLeft: locale === "ar" ? "15px" : "",
                  paddingRight: locale === "en" ? "15px" : "",
                  width: "80px",
                  height: "auto",
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              alignItems: "center",
              gap: { md: "3px", lg: "15px" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={() => handlePageChange(page)}
                sx={{
                  my: 2,
                  color: activePage === page.label ? "white" : "#C2C6CC",
                  borderBottom:
                    activePage === page.label ? "1px solid white" : "none",
                  display: "block",
                  borderRadius: 0,
                  fontSize: { md: "10px", lg: "16px" },
                }}
              >
                {page.label}
              </Button>
            ))}
            {/* <SearchComponent /> */}

            {token ? (
              <Box
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  color: "white",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 0.2,
                  }}
                >
                  <img
                    src={user?.response?.image}
                    alt={`${user?.response?.first_name} ${user?.response?.last_name}`}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "5px",
                    }}
                  />
                  <UserMenu
                    user={`${user?.response?.first_name} ${user?.response?.last_name}`}
                    handleUserRoute={handleUserRoute}
                    isSpecialUser={true}
                  />
                </Box>
              </Box>
            ) : (
              <Button
                onClick={handleProfileRoute}
                variant="outlined"
                sx={{
                  fontSize: { md: "10px", lg: "16px" },
                  padding: { xs: "8px 16px", md: "8px 10px" },
                  color: "white",
                  borderColor: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderColor: "white",
                  },
                  width: "fit-content",
                  margin: "initial",
                }}
              >
                {t("buttons.login")}
              </Button>
            )}

            <LanguageToggleButton />
          </Box>
          <Box sx={{ flexGrow: { xs: 1, sm: 1, md: 0 } }}></Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <LanguageToggleButton />
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                border: "2px solid",
                borderColor: "primary.main",
                borderRadius: "8px",
                padding: "5px",
                mr: currentLang === "ar" ? 2 : 0,
                ml: currentLang === "en" ? 2 : 0,
                transition: "transform 0.3s ease",
              }}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiMenu-paper": {
                  backgroundColor: "#f0f8ff",
                  borderRadius: "8px",
                  width: "100%",
                  mt: 2,
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => handlePageChange(page)}
                  sx={{
                    backgroundColor:
                      activePage === page.label ? "#d0e8ff" : "transparent",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "18px",
                      color: activePage === page.label ? "#07489D" : "black",
                      fontWeight: activePage === page.label ? "bold" : "normal",
                    }}
                  >
                    {page.label}
                  </Typography>
                </MenuItem>
              ))}
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                {token ? (
                  <Box
                    // onClick={handleUserRoute}
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      color: "#000",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 0.2,
                      }}
                    >
                      <img
                        src={user?.response?.image}
                        alt={`${user?.response?.first_name} ${user?.response?.last_name}`}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          marginLeft: "5px",
                        }}
                      />

                      <UserMenu
                        user={`${user?.response?.first_name} ${user?.response?.last_name}`}
                        handleUserRoute={handleUserRoute}
                        isSpecialUser={false}
                      />
                    </Box>
                  </Box>
                ) : (
                  <Button
                    onClick={handleProfileRoute}
                    variant="outlined"
                    sx={{
                      fontSize: { md: "10px", lg: "16px" },
                      padding: { xs: "8px 16px", md: "8px 10px" },
                      color: "white",
                      borderColor: "white",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderColor: "white",
                      },
                      width: "fit-content",
                      margin: "initial",
                    }}
                  >
                    {t("buttons.login")}
                  </Button>
                )}
              </Box>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
