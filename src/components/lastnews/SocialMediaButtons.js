import { Box, IconButton } from "@mui/material";
import facebookIcon from "../../assets/image/Facebook.png";
import linkedinIcon from "../../assets/image/linkedin.png";
import twitterIcon from "../../assets/image/Vector.png";
const SocialMediaButtons = () => {
 
  
  const icons = [
    { src: facebookIcon, alt: "Facebook" },
    { src: linkedinIcon, alt: "LinkedIn" },
    { src: twitterIcon, alt: "Twitter" },
  ];

  return (
    <Box display="flex" justifyContent="right" gap={2}>
      {icons.map((icon, index) => (
        <IconButton
          key={index}
          sx={{
            border: "1px solid #E1E5EB",
            borderRadius: "4px",
            width: "48px",
            height: "48px",
          }}
        >
<img src={icon.src} alt={icon.alt} width="20" height="20" />
</IconButton>
      ))}
    </Box>
  );
};

export default SocialMediaButtons;
