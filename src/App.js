import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useTranslation } from "react-i18next";
import { englishTheme, arabicTheme } from "./styles/theme.js";
import { Provider } from "react-redux";
import { store } from "../src/redux/store.js";
import ToastNotification from "./components/shared/ToastNotification";
import ScrollToTop from "./components/shared/ScrollToTop.js";
import "bootstrap/dist/css/bootstrap.min.css";
import MainRoutes from "./routes/MainRoutes.js";
import EmployeeRoutes from "./routes/EmployeeRoutes.js";
import PublicRoutes from "./routes/PublicRoutes.js";
import Maintenance from "./pages/Maintenance.js";

function App() {
  const { i18n } = useTranslation();
  const currentTheme = i18n.language === "ar" ? arabicTheme : englishTheme;
  return (
    <Provider store={store}>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <Router>
          <ScrollToTop />
          <Routes>
            {MainRoutes()}
            {EmployeeRoutes()}
            {PublicRoutes()}
            <Route path="*" element={<Maintenance />} />

          </Routes>
        </Router>
        <ToastNotification />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
