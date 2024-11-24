import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { useTranslation } from "react-i18next";
import banner1 from "../../../assets/image/banner1.svg";
import imagebanner2 from "../../../assets/image/banner2.svg";
import imagebanner3 from "../../../assets/image/banner3.svg";
import imagebanner4 from "../../../assets/image/banner4.svg";
import imagebanner5 from "../../../assets/image/banner5.svg";
const SubBanner = () => {


  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const controls = useAnimation();
  const trackRef = useRef();

  useEffect(() => {
    const imageWidth = 242;
    const totalImages = imageUrls.length;
    const totalWidth = totalImages * imageWidth;
    const duration = 10;

    controls.start({
      x: isRTL ? totalWidth : -totalWidth,
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: duration,
          ease: "linear",
        },
      },
    });
  }, [controls, isRTL]);

  const handleMouseEnter = () => {
    controls.stop(); 
  };

  const handleMouseLeave = () => {
    const imageWidth = 242;
    const totalImages = imageUrls.length;
    const totalWidth = totalImages * imageWidth;
    const duration = 5;

    controls.start({
      x: isRTL ? totalWidth : -totalWidth,
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: duration,
          ease: "linear",
        },
      },
    });
  };
  const imageUrls = [
    banner1,
    imagebanner2,
    imagebanner3,
    imagebanner4,
    imagebanner5,
    imagebanner2,

  ];
  return (
    <Box
      sx={{ overflow: "hidden", width: "100%", position: "relative" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={trackRef}
        className="track"
        style={{
          display: "flex",
          flexDirection: isRTL ? "row-reverse" : "row", 
          width: `${imageUrls.length * 2 * 242}px`,
        }}
        animate={controls}
      >
        {[...imageUrls, ...imageUrls].map((url, index) => (
          <Box
            className="slide"
            key={index}
            sx={{
              flexShrink: 0,
              width: 242,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img 
              src={url}
              alt={`Item ${index + 1}`}
              width={202}
              height={60}
            />
          </Box>
        ))}
      </motion.div>
    </Box>
  );
};

export default SubBanner;
