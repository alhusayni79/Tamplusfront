import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const MyFatoorahPayment = ({id}) => {
  const cardElementRef = useRef(null);
  const [configData, setConfigData] = useState(null);

  useEffect(() => {
    // Fetch session ID and country code from backend
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
        setConfigData({
          sessionId: SessionId,
          countryCode: CountryCode,
        });
      } catch (error) {
        console.error("Error fetching configuration data:", error);
      }
    };

    fetchConfigData();
  }, []);

  useEffect(() => {
    // Initialize myFatoorah once configData is available
    if (configData && window.myFatoorah) {
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
            boxShadow: "",
            placeHolder: {
              holderName: "Name On Card",
              cardNumber: "Number",
              expiryDate: "MM / YY",
              securityCode: "CVV",
            },
          },
          text: {
            saveCard: "Save card info for future payment.",
            addCard: "Use another Card!",
            deleteAlert: {
              title: "Delete",
              message: "Are you sure?",
              confirm: "Yes",
              cancel: "No",
            },
          },
          label: {
            display: false,
            color: "black",
            fontSize: "13px",
            fontWeight: "normal",
            fontFamily: "sans-serif",
            text: {
              holderName: "Card Holder Name",
              cardNumber: "Card Number",
              expiryDate: "Expiry Date",
              securityCode: "Security Code",
            },
          },
          error: {
            borderColor: "red",
            borderRadius: "8px",
            boxShadow: "0px",
          },
        },
      };

      window.myFatoorah.init(config);
    }
  }, [configData]);

  const handleBinChanges = (bin) => {
    console.log("BIN changed:", bin);
  };

  const handleSubmit = async () => {
    try {
      // Trigger myFatoorah submit
      const response = await window.myFatoorah.submit();
  
      // Extract session details
      const { sessionId, cardBrand, cardIdentifier } = response;
      console.log("Payment Response:", { sessionId, cardBrand, cardIdentifier });
  
      // Prepare FormData
      const formData = new FormData();
      formData.append("sessionId", sessionId);
      formData.append("service_id", id); // Replace with actual service ID
  
      // Get token from cookies
      const token = Cookies.get("auth_token");
      if (!token) {
        console.error("Token is missing. Cannot proceed with payment.");
        return;
      }
  
      // Send POST request to your backend
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
  
      // Handle the response
      if (postResponse.data?.response?.url) {
        const redirectUrl = postResponse.data.response.url;
        console.log("Redirecting to:", redirectUrl);
  
        // Redirect to the URL
        window.location.href = redirectUrl;
      } else {
        console.error("URL not found in response:", postResponse.data);
      }
    } catch (error) {
      console.error("Error during payment process:", error);
    }
  };
  
  return (
    <div>
      {configData ? (
        <>
          <div style={{ width: "400px" }}>
            <div id="card-element" ref={cardElementRef}></div>
          </div>
          <button onClick={handleSubmit}>Pay Now</button>
        </>
      ) : (
        <p>Loading payment form...</p>
      )}
    </div>
  );
};

export default MyFatoorahPayment;
