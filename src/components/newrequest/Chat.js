import { useTheme } from "@emotion/react";
import {
  Box,
  Typography,
  Card,
  Grid,
  Avatar,
  CardContent,
} from "@mui/material";

const Chat = ({cardsData}) => {
  const theme = useTheme();

  
  return (
    <Card sx={{ p: {xs:1.5,sm:4}}}>
      <Typography sx={{ mb: 4 ,fontSize:"16px",fontWeight:"500"}}>المحادثة</Typography>
      {cardsData.map((card, index) => (
        <Grid item xs={12} key={card.id}>
          <Card
            sx={{
              maxWidth: "100%",
              height:"auto",
              margin: "auto",
              mb: "24px",
            }}
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
                <Avatar alt={card.name} />
                <Box ml={2}>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "500",
                      color: theme.palette.primary.dark,
                    }}
                  >
                    {card.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.primary.dark,
                    }}
                  >
                    {card.role}
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
                {card.date}
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
                {card.content}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Card>
  );
};

export default Chat;
