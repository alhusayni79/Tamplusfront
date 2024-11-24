import React from "react";
import box from "../../../assets/image/box.png";

const ServiceInfo = () => {
  return (
    <>
      <ul style={{ marginTop: "22px" }}>
        <li
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "5px",
            fontSize: "14px",
            fontWeight: "400",
            color: "#1E2124",
          }}
        >
          <img src={box} alt="icon" />
          إصدار سجل تجاري رئيسي أو فرعي للمؤسسة.
        </li>
        <li
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "5px",
            fontSize: "14px",
            fontWeight: "400",
            color: "#1E2124",
          }}
        >
          <img src={box} alt="icon" /> إصدار رخصة بلدية تجارية فورية (اختياري).
        </li>
        <li
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "flex-start",
            alignItems: "center",
            fontSize: "14px",
            fontWeight: "400",
            color: "#1E2124",
          }}
        >
          <img src={box} alt="icon" /> فتح منشأة لدى وزارة الموارد البشرية
          والتنمية الاجتماعية.
        </li>
        <li
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "5px",
            fontSize: "14px",
            fontWeight: "400",
            color: "#1E2124",
          }}
        >
          <img src={box} alt="icon" /> التسجيل في الزكاة من خلال البوابة
          الإلكترونية لهيئة الزكاة والضريبة والجمارك.
        </li>
        <li
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "5px",
            fontSize: "14px",
            fontWeight: "400",
            color: "#1E2124",
          }}
        >
          <img src={box} alt="icon" /> تسجيل المنشأة في المؤسسة العامة للتأمينات
          الاجتماعية.
        </li>
        <li
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "5px",
            fontSize: "14px",
            fontWeight: "400",
            color: "#1E2124",
          }}
        >
          <img src={box} alt="icon" /> التسجيل في عنوان الأعمال المعتمد لدى
          البريد السعودي "سُبل".
        </li>
      </ul>
    </>
  );
};

export default ServiceInfo;
