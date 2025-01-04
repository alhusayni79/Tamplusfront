import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Paycheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const paymentId = searchParams.get("paymentId");
    const baseURL = process.env.REACT_APP_BASE_URL;
    const token = Cookies.get("auth_token");

    if (paymentId) {
      axios
        .post(
          `${baseURL}/user/order/pay-callback`,
          { paymentId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.data?.response?.success === true) {
            window.location.href =
              "http://localhost:3000/payment/paymentSuccess";
          } else if (response.data?.response?.success === false) {
            navigate("http://localhost:3000/payment/PaymentFailed");
          }
        })
        .catch((error) => {
          // Handle 500 Internal Server Error or other errors
          if (error.response && error.response.status === 500) {
            const errorData = error.response.data;
            if (errorData.response?.success === false) {
              navigate("/");
            }
          } else {
            console.error("Error occurred:", error);
          }
        });
    }
  }, [navigate]);

  return <div>Processing your payment...</div>;
};

export default Paycheck;
