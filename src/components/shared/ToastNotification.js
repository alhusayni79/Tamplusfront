import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from 'react-i18next';

const ToastNotification = () => {
  const { i18n } = useTranslation();
  const currentPosition = i18n.language === 'ar' ? "top-left" : "top-right"; 
  
  return (
    <ToastContainer
      position={currentPosition}
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
      progress={undefined}
      toastStyle={{ zIndex: 15000 }} 
    />
  );
};

export default ToastNotification;
