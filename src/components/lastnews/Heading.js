import { Typography } from "@mui/material";

const Heading = ({ text }) => (
  
    <Typography
      variant="h4"
      component="h1"
      sx={{
        fontWeight: "700",
        fontSize: "24px",
        color: (theme) => theme.palette.primary.dark,
        mb: 3,
      }}
    >
      {text}
    </Typography>
);

export default Heading;
