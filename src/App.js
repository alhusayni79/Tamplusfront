import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useTranslation } from "react-i18next";
import { englishTheme, arabicTheme } from "./styles/theme.js";
import Home from "./pages/Home";
import MainLayout from "./components/layout/MainLayout.js";
import About from "./pages/About.js";
import Servicess from "./pages/Servicess.js";
import ServicePage from "./components/services/ServicePage.js";
import Payment from "./components/services/Payment.js";
import LastNews from "./pages/LastNews.js";
import News from "./components/lastnews/News.js";
import { Provider } from "react-redux";
import { store } from "../src/redux/store.js";
import ToastNotification from "./components/shared/ToastNotification";
import ScrollToTop from "./components/shared/ScrollToTop.js";
import Contact from "./pages/Contact.js";
import Login from "./pages/Login.js";
import Profile from "./components/profile/Profile.js";
import ProfileDetails from "./components/profile/ProfileDetails.js";
import Maintenance from "./pages/Maintenance.js";
import CustomLayout from "./components/layout/CustomLayout.js";
import Employee from "./pages/Employee.js";
import RequestPage from "./components/newrequest/RequestPage.js";
import ServicePageActive from "./components/newrequest/ServicePageActive.js";
import PaymentSuccess from "./components/shared/PaymentSuccess.js";
import TermsConditions from "./components/footerpage/TermsConditions.js";
import PrivacyPolicy from "./components/footerpage/PrivacyPolicy.js";
import Paycheck from "./pages/Paycheck.js";
import EmployeeRegister from "./components/newrequest/employee/EmployeeRegister.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Refund from "./components/shared/Refund.js";
import ProtectedRoute from "./components/auth/ProtectedRoute.js";
import EmployeeProtectedRoute from "./components/auth/EmployeeProtectedRoute.js";
import PaymentFailed from "./components/shared/PaymentFailed.js";
import MainRoutes from "./routes/MainRoutes.js";
import EmployeeRoutes from "./routes/EmployeeRoutes.js";
import PublicRoutes from "./routes/PublicRoutes.js";

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
          </Routes>
        </Router>
        <ToastNotification />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
