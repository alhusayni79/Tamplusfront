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

    if (
      !document.querySelector(
        "script[src='https://demo.myfatoorah.com/cardview/v2/session.js']"
      )
    ) {
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

  const handleSubmit = async () => {
    if (window.myFatoorah) {
      try {
        const response = await window.myFatoorah.submit();
        console.log("myFatoorah Response:", response);
  
        const { sessionId, cardBrand, cardIdentifier } = response;
        console.log("Response details:", { sessionId, cardBrand, cardIdentifier });
  
        const formData = new FormData();
        formData.append("sessionId", sessionId);
        formData.append("service_id", id); 
          const token = Cookies.get("auth_token");
        if (!token) {
          console.error("Token is missing. Cannot proceed with payment.");
          return;
        }
          const baseURL = process.env.REACT_APP_BASE_URL;
        const postResponse = await axios.post(
          `${baseURL}/user/order/pay`, 
          formData, 
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Post request success:", postResponse.data);
      } catch (error) {
        console.error("Error in payment submission or POST request:", error);
      }
    } else {
      console.error("myFatoorah library is not initialized.");
    }
  };
  
  

  const handleBinChanges = (bin) => {
    console.log("BIN changed:", bin);
  };

  return (
    <div style={{ width: "400px", height: "auto" }}>
      <div id="card-element"></div>

      <CustomButton backgroundColor="#07489D" onClick={handleSubmit}>
        ادفع الآن
      </CustomButton>
     
    </div>
  );
};

export default React.memo(PaymentComponent);
