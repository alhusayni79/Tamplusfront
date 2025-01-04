import { useTheme } from "@emotion/react";
import {
  Box,
  Typography,
  Card,
  Grid,
  Avatar,
  CardContent,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const Chat = ({ cardsData = [] }) => {
  const theme = useTheme();
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  return (
    <Card sx={{ p: { xs: 1.5, sm: 4 } }}>
      <Typography sx={{ mb: 4, fontSize: "16px", fontWeight: "500" }}>
        المحادثة
      </Typography>
      {(cardsData || []).map((card, index) => (
        <Grid item xs={12} key={card.id}>
          <Card
            sx={{ maxWidth: "100%", height: "196px", margin: "auto", mb: 2 }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: index === cardsData.length - 1 ? "#DDEBFD" : "#F4F5F6",
                p: 2,
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  alt={card.name || "User Avatar"}
                  src={card.image || null}
                  sx={{
                    width: 56,
                    height: 56,
                    border: "2px solid #07489D",
                    "&:hover": {
                      cursor: "pointer",
                      opacity: 0.9,
                    },
                  }}
                />{" "}
                <Box ml={2}>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "500",
                      color: theme.palette.primary.dark,
                    }}
                  >
                    {card.first_name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.primary.dark,
                    }}
                  >
                    {card.role?.[currentLang]}
                  </Typography>
                </Box>
              </Box>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "400",
                  color: theme.palette.primary.dark,
                }}
              >
                {card.created_at}
              </Typography>
            </Box>

            <CardContent>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: theme.palette.primary.body,
                }}
              >
                {card.message}
              </Typography>
              {card.file && (
                <Box mt={2}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: theme.palette.primary.dark,
                    }}
                  >
                    مرفق:
                    <a
                      href={URL.createObjectURL(card.file)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {card.file.name}
                    </a>
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Card>
  );
};

export default Chat;
