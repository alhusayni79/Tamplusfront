import { Typography } from "@mui/material";

const Paragraph = ({ text }) => (
  <Typography
    sx={{
      fontWeight: "400",
      fontSize: "18px",
      color: (theme) => theme.palette.primary.body,
      mb: 4,
    }}
  >
    {text}
  </Typography>
);

export default Paragraph;
