import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CustomButton from "../../shared/CustomButton";

const PaymentComponent = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [configData, setConfigData] = useState(null);
  const sessionIdRef = useRef(null); 

  useEffect(() => {
    const fetchConfigData = async () => {
      try {
        const token = Cookies.get("auth_token");
        if (!token) {
          throw new Error("Token is missing or invalid.");
        }
        const baseURL = process.env.REACT_APP_BASE_URL;
        const response = await axios.get(`${baseURL}/user/fetch-frontData`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const { SessionId, CountryCode } = response.data.response;
        if (!sessionIdRef.current) {
          sessionIdRef.current = SessionId; 
          console.log("Fetched SessionId:", SessionId);
          setConfigData({
            sessionId: SessionId,
            countryCode: CountryCode,
          });
        } else {
          console.log("SessionId already set:", sessionIdRef.current);
        }
      } catch (error) {
        console.error("Error fetching configuration data:", error);
      }
    };

    fetchConfigData();
  }, []);

  useEffect(() => {
    if (!configData) return;

    if (!document.querySelector("script[src='https://demo.myfatoorah.com/cardview/v2/session.js']")) {
      const script = document.createElement("script");
      script.src = "https://demo.myfatoorah.com/cardview/v2/session.js";
      script.async = true;

      script.onload = () => {
        const config = {
          countryCode: configData.countryCode,
          sessionId: configData.sessionId,
          cardViewId: "card-element",
          supportedNetworks: "v,m,ae,md",
          onCardBinChanged: handleBinChanges,
          style: {
            hideCardIcons: false,
            direction: "ltr",
            cardHeight: 130,
            tokenHeight: 130,
            input: {
              color: "black",
              fontSize: "13px",
              fontFamily: "sans-serif",
              inputHeight: "32px",
              inputMargin: "0px",
              borderColor: "c7c7c7",
              borderWidth: "1px",
              borderRadius: "8px",
              
              placeHolder: {
                holderName: "Name On Card",
                cardNumber: "Number",
                expiryDate: "MM / YY",
                securityCode: "CVV",
              },
            },
          },
        };
        window.myFatoorah.init(config);
      };

      document.body.appendChild(script);
    }
  }, [configData]);

  const submitPayment = async () => {
    try {
      console.log("Preparing form data...");
      const formData = new FormData();
      formData.append("sessionId", configData?.sessionId); 
      formData.append("service_id", id); 
  
      console.log("Form data:", {
        sessionId: configData?.sessionId,
        service_id: id,
      });
  
      const token = Cookies.get("auth_token");
      if (!token) {
        throw new Error("Token is missing. Cannot proceed with payment.");
      }
        console.log("Sending request to server...");
      const baseURL = process.env.REACT_APP_BASE_URL;
      const response = await axios.post(`${baseURL}/user/order/pay`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Log response
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error during payment submission:", error);
    }
  };
  
  
  
  
  const handleBinChanges = (bin) => {
    console.log("BIN changed:", bin);
  };

  return (
    <div style={{ width: "400px",height:"auto" }}>
      <div id="card-element"></div>
      
                <CustomButton
                  backgroundColor="#07489D"
                  onClick={submitPayment}
                >
                  ادفع الآن
                </CustomButton>
      {/* <button onClick={submitPayment} disabled={!configData || isLoading}>
        {isLoading ? "Processing..." : "Pay Now"}
      </button> */}
    </div>
  );
};

export default React.memo(PaymentComponent);
