import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
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
import FaildPayment from "./components/shared/FaildPayment.js";

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
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<Servicess />} />
              <Route path="services/:label" element={<ServicePage />} />
              <Route path="lastnews" element={<LastNews />} />
              <Route path="lastnews/:title" element={<News />} />
              <Route path="contactus" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="profile" element={<Profile />} />
              <Route
                path="profile/:serviceDescription"
                element={<ProfileDetails />}
              />
            </Route>
            <Route element={<CustomLayout />}>
              <Route path="employee" element={<Employee />} />
              <Route path="employee/:service" element={<RequestPage />} />
              <Route
                path="employee/:service/servicePageActive"
                element={<ServicePageActive />}
              />
            </Route>
            <Route path="/services/:label/payment" element={<Payment />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="payment/succespayment" element={<PaymentSuccess />} />
            <Route path="payment/faildpayment" element={<FaildPayment />} />

          </Routes>
        </Router>
        <ToastNotification />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
