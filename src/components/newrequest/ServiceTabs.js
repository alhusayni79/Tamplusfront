import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import bluebox from "../../assets/image/box.png";
import { useTranslation } from "react-i18next";

const CustomTab = styled(Box)(({ selected }) => ({
  border: selected ? "1px solid #07489D" : "1px solid #D8DBDE",
  backgroundColor: selected ? "#07489D" : "transparent",
  color: selected ? "#FFFFFF" : "#3D4148",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0px 4px",
  padding: "8px 12px",
  cursor: "pointer",
  fontWeight: "500",
}));

function ServiceTabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

function ServiceTabs({ rowData }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
  };

  const serviceItems = [
    "إصدار سجل تجاري رئيسي أو فرعي لمؤسسته.",
    "إصدار رخصة بلدية تجارية فورية (اختياري).",
    "فتح ملف منشأة لدى وزارة الموارد البشرية والتنمية الاجتماعية.",
    "التسجيل في الزكاة عبر البوابة الإلكترونية لهيئة الزكاة والضريبة والجمارك.",
    "تسجيل المنشأة في المؤسسة العامة للتأمينات الاجتماعية.",
    "التسجيل في عنوان الأعمال المعتمد لدى البريد السعودي، سُبل.",
  ];

  const serviceConditions = ["شرط 1", "شرط 2"];
  const requiredDocuments = ["المستند 1", "المستند 2"];
  const serviceSteps = ["الخطوة 1", "الخطوة 2"];

  const tabContent = [
    { title: null, items: serviceItems },
    { title: "شروط الخدمة", items: serviceConditions },
    { title: "المستندات المطلوبة", items: requiredDocuments },
    { title: "خطوات الحصول على الخدمة", items: serviceSteps },
  ];

  const tabs = [
    "وصف الخدمة",
    "شروط الخدمة",
    "المستندات المطلوبة",
    "خطوات الحصول على الخدمة",
  ];

  return (
    <Box
      sx={{
        width: "100%",
        typography: "body1",
        bgcolor: "background.paper",
        borderRadius: "8px",
        boxShadow: 3,
        p: "32px 24px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ mb: "24px" }}>
        <Typography
          sx={{
            mb: "16px",
            fontWeight: "700",
            fontSize: "20px",
            lineHeight: "20px",
            color: "#1E2124",
          }}
        >
          {rowData.serviceDescription}
        </Typography>
        <Typography
          sx={{
            fontWeight: "500",
            fontSize: "14px",
            lineHeight: "18px",
            color: "#3D4148",
          }}
        >
          هذه الخدمة تمكّن المستثمر من البدء في ممارسة النشاط التجاري، ومن
          خلالها يتم ما يلي:
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          borderBottom: "1px solid #D8DBDE",
          pb: "18px",
          gap: "8px",
          width: "fit-content",
        }}
      >
        {tabs.map((label, index) => (
          <CustomTab
            key={index}
            selected={selectedTab === index}
            onClick={() => handleTabChange(index)}
          >
            {label}
          </CustomTab>
        ))}
      </Box>

      <Box sx={{ mt: 1 }}>
        {tabContent.map((tab, index) => (
          <ServiceTabPanel key={index} value={selectedTab} index={index}>
            {tab.title && <Typography>{tab.title}</Typography>}
            {tab.items.map((item, idx) => (
              <Typography
                key={idx}
                sx={{ mt: 1, fontSize: "14px", fontWeight: "400" }}
              >
                {index === 0 && (
                  <img
                    src={bluebox}
                    width={12}
                    height={12}
                    alt="blue box"
                    style={{
                      marginLeft: currentLang === "ar" ? 8 : 0,
                      marginRight: currentLang === "ar" ? 0 : 8,
                    }}
                  />
                )}
                {item}
              </Typography>
            ))}
          </ServiceTabPanel>
        ))}
      </Box>
    </Box>
  );
}

export default ServiceTabs;
