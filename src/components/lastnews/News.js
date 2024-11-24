import React from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";
import LastNewsComponent from "../homepage/LastNewsComponent";
import CustomBanner from "../layout/CustomBanner";
import Heading from "../lastnews/Heading.js";
import Paragraph from "../lastnews/Paragraph.js";
import SocialMediaButtons from "../lastnews/SocialMediaButtons.js";
import PromoBanner from "../shared/PromoBanner.js";
import frambanner from "../../assets/image/frambanner.png";
import lastnewsbanner from "../../assets/image/lastnewsbanner.png";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
const News = () => {
  const theme = useTheme();
  const location = useLocation();
  const { title, image, content } = location.state || {};
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <>
      <CustomBanner
        title={title}
        pageTitle="آخر الأخبار"
        service={title}
        image={image}
      />
      <Box
        sx={{
          mt: "290px",
          position: "relative",
        }}
      >
        <Box
          component="img"
          src={frambanner}
          alt="description of image"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "auto",
            zIndex: -1111,
          }}
        />
        <Box
          sx={{
            pr: { xs: 2, sm: 8, lg: 40 },
            pl: { xs: 2, sm: 8, lg: 40 },
            mb: "50px",
            p: 1,
            pt: 5,
          }}
        >
          <Heading text={content} />

          {/* <Heading text="النتيجة المتوقعة " />
          <Paragraph text="إدارة المنتج والعلامة التجارية تعتبر عملية متكاملة تتطلب استراتيجية شاملة تجمع بين جودة المنتج وتميز العلامة التجارية. من خلال فهم عميق لاحتياجات وتطلعات العملاء، يمكن للشركات تطوير منتجات وخدمات تلبي تلك الاحتياجات بشكل فعال ومبتكر، مما يسهم في بناء علاقات قوية ومستدامة مع العملاء." />
          <Paragraph text="بالإضافة إلى ذلك، تشمل إدارة المنتج والعلامة التجارية تطبيق استراتيجيات متعددة تهدف إلى تعزيز وتحسين تجربة العملاء. يتضمن ذلك تقديم خدمات متميزة وتجارب فريدة للعلامة التجارية، وتحديد وتنفيذ استراتيجيات التسويق والتواصل الفعّالة التي تسهم في زيادة الوعي بالعلامة التجارية وتعزيز الولاء لها." />
          <Paragraph text="من خلال الاستراتيجيات المتكاملة والمتنوعة، يمكن للشركات تحقيق النجاح في السوق وتحقيق نمو مستدام، مما يؤدي إلى تعزيز مكانتها وسمعتها في السوق وتحقيق مزيد من النجاح والتفوق. تابع القراءة لتعرف إجابة سؤال اليوم: ما هي ادارة المنتجات؟" /> */}

          {/* <Box
            component="img"
            src={lastnewsbanner}
            alt="Mountain Image"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              mb: 4,
            }}
          /> */}

          {/* <Heading text="ما هو الجمهور المستهدف؟" />
          <Paragraph text="إدارة المنتج والعلامة التجارية هي عملية شاملة تهدف إلى تخطيط وتنفيذ ومراقبة وتقييم جميع جوانب الحياة الدورية للمنتج، من مرحلة الفكرة وحتى نهاية دورته الحياتية. يعتبر إدارة المنتجات أحد العناصر الأساسية في استراتيجية الأعمال، حيث تساهم في تحقيق أهداف الشركة وتلبية احتياجات العملاء بشكل فعال ومبتكر. في هذا الدليل، سنقوم بفحص مفهوم إدارة المنتجات، وأهميتها في السوق اليوم، بالإضافة إلى التحديات والاستراتيجيات المتبعة لضمان نجاح المنتجات في بيئة الأعمال المتغيرة بسرعة." />
          <Heading text="لماذا تحديد الجمهور المستهدف مهم؟" />

          <Paragraph text="تسعير وتسويق المنتجات يتطلب دراسة دقيقة وتحليل شامل للسوق والمنافسين، إلى جانب فهم القيمة المضافة التي يقدمها المنتج للعملاء. يجب أن تتوازن استراتيجيات التسعير بين تحقيق الأرباح وجذب العملاء، وأن تكون متوازنة مع القيمة المقدمة من المنتج." />
          <Paragraph text="يُعد فهم الديناميات التنافسية في السوق وتحليل أسعار المنافسين جزءًا أساسيًا من عملية التسعير. يساعد ذلك في تحديد السعر الذي يجعل المنتج تنافسيًا بنجاح ويوفر القيمة الملائمة للعملاء. بجانب ذلك، يتطلب تسويق المنتجات استخدام مجموعة متنوعة من القنوات والأدوات التسويقية للوصول إلى العملاء المستهدفين ونقل رسالة العلامة التجارية بفعالية." />
          <Paragraph text="من خلال تحديد استراتيجيات التسعير الملائمة واستخدام أدوات التسويق المناسبة، يمكن للشركات تحقيق التوازن المثالي بين جذب العملاء وتحقيق الأرباح، مما يساهم في نجاح المنتجات في السوق وتعزيز مكانتها في وجدان العملاء." /> */}

          {/* <SocialMediaButtons /> */}
        </Box>
      </Box>

      <Container maxWidth="lg">
        <PromoBanner />
        <Box sx={{ pt: "64px", pb: "80px" }}>
          <Box sx={{ p: "24px" }}>
            <Heading text="مقالات ذات صلة" />
          </Box>
          <LastNewsComponent displayCount={3} />
        </Box>
      </Container>
    </>
  );
};

export default News;
