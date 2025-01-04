import { Route } from "react-router-dom";
import Login from "../pages/Login";
import Refund from "../components/shared/Refund";
import Payment from "../components/services/Payment";
import Maintenance from "../pages/Maintenance";
import PaymentSuccess from "../components/shared/PaymentSuccess";
import PaymentFailed from "../components/shared/PaymentFailed";

function PublicRoutes() {
  return (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/refund" element={<Refund />} />
      <Route path="/services/:label/payment" element={<Payment />} />
      <Route path="/maintenance" element={<Maintenance />} />
      <Route path="payment/paymentSuccess" element={<PaymentSuccess />} />
      <Route path="payment/paymentFailed" element={<PaymentFailed />} />
    </>
  );
}

export default PublicRoutes;
