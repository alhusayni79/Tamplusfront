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

function ServiceInfoTabs({ description, requiredDocuments, terms }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
  };

  const serviceData = [
    {
      title: description[currentLang],
      tabLabel: "وصف الخدمة",
      items: [
        // "إصدار سجل تجاري رئيسي أو فرعي للمؤسسة.",
        // "إصدار رخصة بلدية تجارية فورية (اختياري).",
        // "فتح ملف منشأة لدى وزارة الموارد البشرية والتنمية الاجتماعية.",
        // "التسجيل في الزكاة عبر البوابة الإلكترونية لهيئة الزكاة والضريبة والجمارك.",
        // "تسجيل المنشأة في المؤسسة العامة للتأمينات الاجتماعية.",
        // "التسجيل في عنوان الأعمال المعتمد لدى البريد السعودي، سُبل.",
      ],
    },
    {
      title: terms[currentLang],
      tabLabel: "شروط الخدمة",
      items: [
        // "يجب أن يكون عمر المتقدم لا يقل عن 18 سنة.",
        // "يجب تقديم الهوية الوطنية للمواطنين السعوديين.",
      ],
    },
    {
      title: requiredDocuments[currentLang],
      tabLabel: "المستندات المطلوبة",
      items: [
        // "صورة من الهوية الوطنية.", "صورة من الرخصة التجارية (إن وجدت)."
      
      ],
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        typography: "body1",
        borderRadius: "8px",
        p: "32px 24px",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
        {serviceData.map((tab, index) => (
          <CustomTab
            key={index}
            selected={selectedTab === index}
            onClick={() => handleTabChange(index)}
          >
            {tab.tabLabel}
          </CustomTab>
        ))}
      </Box>

      <Box sx={{ mt: 1 }}>
        {serviceData.map((tab, index) => (
          <ServiceTabPanel key={index} value={selectedTab} index={index}>
            {tab.title && (
              <Box sx={{ mb: "24px", mt: "10px" }}>
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    lineHeight: "18px",
                    color: "#3D4148",
                  }}
                >
                  {tab.title}
                </Typography>
              </Box>
            )}
            {tab.items.map((item, idx) => (
              <Typography
                key={idx}
                sx={{
                  mt: 1,
                  fontSize: "14px",
                  fontWeight: "400",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={bluebox}
                  width={12}
                  height={12}
                  alt="bullet icon"
                  style={{
                    marginLeft: currentLang === "ar" ? 8 : 0,
                    marginRight: currentLang === "ar" ? 0 : 8,
                  }}
                />
                {item}
              </Typography>
            ))}
          </ServiceTabPanel>
        ))}
      </Box>
    </Box>
  );
}

export default ServiceInfoTabs;
