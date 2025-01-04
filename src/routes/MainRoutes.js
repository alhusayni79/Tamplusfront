import { Route } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Servicess from "../pages/Servicess";
import ServicePage from "../components/services/ServicePage";
import LastNews from "../pages/LastNews";
import News from "../components/lastnews/News";
import Contact from "../pages/Contact";
import Profile from "../components/profile/Profile";
import ProfileDetails from "../components/profile/ProfileDetails";
import PrivacyPolicy from "../components/footerpage/PrivacyPolicy";
import TermsConditions from "../components/footerpage/TermsConditions";
import Paycheck from "../pages/Paycheck";

const MainRoutes = () => [
  <Route path="/" element={<MainLayout />} key="main-layout">
    <Route
      index
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
      key="home"
    />
    <Route
      path="about"
      element={
        <ProtectedRoute>
          <About />
        </ProtectedRoute>
      }
      key="about"
    />
    <Route
      path="services"
      element={
        <ProtectedRoute>
          <Servicess />
        </ProtectedRoute>
      }
      key="services"
    />
    <Route
      path="services/:label"
      element={
        <ProtectedRoute>
          <ServicePage />
        </ProtectedRoute>
      }
      key="service-page"
    />
    <Route
      path="lastnews"
      element={
        <ProtectedRoute>
          <LastNews />
        </ProtectedRoute>
      }
      key="lastnews"
    />
    <Route
      path="lastnews/:title"
      element={
        <ProtectedRoute>
          <News />
        </ProtectedRoute>
      }
      key="news"
    />
    <Route
      path="contactus"
      element={
        <ProtectedRoute>
          <Contact />
        </ProtectedRoute>
      }
      key="contactus"
    />
    <Route
      path="profile"
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
      key="profile"
    />
    <Route
      path="profile/:serviceDescription"
      element={
        <ProtectedRoute>
          <ProfileDetails />
        </ProtectedRoute>
      }
      key="profile-details"
    />
    <Route
      path="PrivacyPolicy"
      element={
        <ProtectedRoute>
          <PrivacyPolicy />
        </ProtectedRoute>
      }
      key="privacy-policy"
    />
    <Route
      path="TermsConditions"
      element={
        <ProtectedRoute>
          <TermsConditions />
        </ProtectedRoute>
      }
      key="terms-conditions"
    />
    <Route
      path="paycheck"
      element={
        <ProtectedRoute>
          <Paycheck />
        </ProtectedRoute>
      }
      key="paycheck"
    />
  </Route>,
];

export default MainRoutes;
