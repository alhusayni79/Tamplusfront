import React, { useState } from "react";
import CustomButton from "../../shared/CustomButton";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Input,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

const cancelOrder = async (orderId, reason) => {
  try {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const empolyeeToken = Cookies.get("authemployee");
    const formData = new FormData();
    formData.append("order_id", orderId);
    formData.append("reason", reason);

    const { data } = await axios.post(
      `${baseURL}/employee/cancel-order`,
      formData,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${empolyeeToken}`,
        },
      }
    );

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};

const CancelOrderButton = ({ orderId, onSuccess, onError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const handleCancel = async () => {
    setIsLoading(true);
    try {
      const result = await cancelOrder(orderId, reason);
      if (result.success) {
        onSuccess?.(result.data);
        setIsOpen(false);
      } else {
        onError?.(result.error);
      }
    } catch (error) {
      onError?.(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setReason("");
  };

  return (
    <>
      <CustomButton
        width="100%"
        textColor="#6E1311"
        backgroundColor="transparent"
        borderColor="#8C1816"
        border={true}
        onClick={() => setIsOpen(true)}
      >
        {t("dialogchat.cancelService")}
      </CustomButton>

      <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{ textAlign: currentLang === "ar" ? "right" : "left" }}
        >
          {" "}
          {t("dialogchat.cancellationReason")}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <Input
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={t("dialogchat.cancelReasonPlaceholder")}
                fullWidth
                multiline
                rows={3}
                sx={{ textAlign: currentLang === "ar" ? "right" : "left" }}
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "flex-start", p: 2 }}>
          <CustomButton
            backgroundColor="#DDEBFD"
            textColor="#07489D"
            onClick={handleCancel}
            disabled={isLoading || !reason.trim()}
          >
            {isLoading
              ? t("dialogchat.cancelInProgress")
              : t("dialogchat.cancelConfirmation")}
          </CustomButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { cancelOrder, CancelOrderButton };
