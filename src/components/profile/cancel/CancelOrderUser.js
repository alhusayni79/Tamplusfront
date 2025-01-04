import React, { useState } from "react";
import CustomButton from "../../shared/CustomButton";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Input,
  FormControl,
  Box,
} from "@mui/material";
import Cookies from "js-cookie";

const cancelOrder = async (orderId, reason) => {
  try {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const UserToken = Cookies.get("auth_token");
    const formData = new FormData();
    formData.append("order_id", orderId);
    formData.append("reason", reason);

    const { data } = await axios.post(
      `${baseURL}/user/cancel-order`,
      formData,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${UserToken}`,
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

const CancelOrderUser = ({ orderId, onSuccess, onError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");

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
        إلغاء الخدمة
      </CustomButton>

      <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: "right" }}>سبب الإلغاء</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth>
              
              <Input
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="اكتب سبب الإلغاء"
                fullWidth
                multiline
                rows={3}
                sx={{ textAlign: "right" }}
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
            {isLoading ? "جاري الإلغاء..." : "تأكيد الإلغاء"}
          </CustomButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { cancelOrder, CancelOrderUser };
