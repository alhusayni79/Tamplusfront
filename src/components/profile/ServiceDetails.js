import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Avatar,
  useTheme,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from "@mui/material";
import CustomButton from "../shared/CustomButton";
import StatusChip from "../shared/getStatusStyles";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMessage } from "../../redux/Slices/chat/allMessageRequestSlice";
import { fetchAllMedia } from "../../redux/Slices/chat/allMediaRequestSlice";
import axios from "axios";
import Cookies from "js-cookie";
import { CloudUpload } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { CancelOrderUser } from "./cancel/CancelOrderUser";

export default function ServiceDetails({
  ServiceNumber,
  Status,
  serviceDescription,
  user,
  row,
  orderId,
}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const [selectedFile, setSelectedFile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { allMessage, messageLoading, messageError } = useSelector(
    (state) => state.allMessage
  );
  const { allMedia, mediaLoading, mediaError } = useSelector(
    (state) => state.allMedia
  );

  useEffect(() => {
    if (orderId) {
      dispatch(fetchAllMessage(orderId));
      dispatch(fetchAllMedia(orderId));
      const interval = setInterval(() => {
        dispatch(fetchAllMessage(orderId));
        dispatch(fetchAllMedia(orderId));
      }, 15000);
      return () => clearInterval(interval);
    }
  }, [dispatch, orderId]);

  if (messageLoading || mediaLoading) return <div>Loading...</div>;
  if (messageError || mediaError)
    return <div>{messageError || mediaError}</div>;
  const cardsData = allMessage?.response;
  const mediaUrls =
    allMedia?.response?.user_media?.map((media) => media.url) ?? [];
  const fileNames = mediaUrls.map((url) => url.split("/").pop());

  const handleAddReply = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewComment("");
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
  };
  const handleSaveReply = async () => {
    if (newComment.trim() === "") return;

    try {
      const baseURL = process.env.REACT_APP_BASE_URL;
      const authToken = Cookies.get("auth_token");
      const empolyeeToken = Cookies.get("authemployee");
      const tokenToUse = authToken || empolyeeToken;
      let mediaId = null;
      if (selectedFile) {
        const mediaFormData = new FormData();
        mediaFormData.append("order_id", orderId);
        mediaFormData.append("media[]", selectedFile);

        const mediaResponse = await axios.post(
          `${baseURL}/share/chat/upload-media`,
          mediaFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${tokenToUse}`,
            },
          }
        );
        mediaId = mediaResponse.data.media_id;
      }

      // ثانياً - إرسال الرسالة
      const messageFormData = new FormData();
      messageFormData.append("order_id", orderId);
      messageFormData.append("message", newComment);
      if (mediaId) {
        messageFormData.append("media_id", mediaId);
      }

      const messageResponse = await axios.post(
        `${baseURL}/share/chat`,
        messageFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${tokenToUse}`,
          },
        }
      );

      dispatch(fetchAllMessage(orderId));
      dispatch(fetchAllMedia(orderId));

      handleDialogClose();
      setSelectedFile(null);
      setNewComment("");
    } catch (error) {
      console.error("Error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    }
  };
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2} flexDirection={"row-reverse"}>
        <Grid item xs={12} md={9}>
          <Box
            sx={{
              padding: 2,
              borderRadius: 2,
              marginBottom: 2,
            }}
          >
            <Typography
              sx={{
                fontWeight: "500",
                fontSize: "24px",
                color: theme.palette.primary.dark,
              }}
            >
              الخدمة {ServiceNumber}- {serviceDescription}
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {(cardsData || []).map((card, index) => (
              <Grid item xs={12} key={card.id}>
                <Card
                  sx={{ maxWidth: "100%", height: "196px", margin: "auto" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      bgcolor:
                        index === cardsData.length - 1 ? "#DDEBFD" : "#F4F5F6",
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
                      />
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
                          {card?.role?.[currentLang]}
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
                          مرفق:{" "}
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
          </Grid>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: "8px" }}>
            <Typography
              sx={{
                backgroundColor: theme.palette.primary.main,
                textAlign: "center",
                p: 3,
                color: theme.palette.primary.white,
                fontWeight: "700",
              }}
            >
              معلومات الخدمة
            </Typography>
            <Grid
              spacing={2}
              direction="column"
              alignItems="center"
              justifyContent="center"
              sx={{ textAlign: "center" }}
            >
              <Grid item xs={12}></Grid>
              <Grid
                item
                xs={12}
                sx={{ borderBottom: "1px solid #D8DBDE", pb: 2, pt: 1 }}
              >
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "14px",
                    color: theme.palette.primary.body,
                  }}
                >
                  مقدم الخدمة
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "16px",
                    color: theme.palette.primary.dark,
                  }}
                >
                  {user?.response?.first_name}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ borderBottom: "1px solid #D8DBDE", pb: 2, pt: 1 }}
              >
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "14px",
                    color: theme.palette.primary.body,
                  }}
                >
                  تاريخ التقديم
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "16px",
                    color: theme.palette.primary.dark,
                  }}
                >
                  {row.time}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ borderBottom: "1px solid #D8DBDE", pb: 2, pt: 1 }}
              >
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "14px",
                    color: theme.palette.primary.body,
                  }}
                >
                  تاريخ الإنشاء
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "16px",
                    color: theme.palette.primary.dark,
                  }}
                >
                  {row.timeupdate}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ borderBottom: "1px solid #D8DBDE", pb: 2, pt: 1 }}
              >
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "14px",
                    color: theme.palette.primary.body,
                    pb: 2,
                  }}
                >
                  الحالة
                </Typography>
                <StatusChip Status={Status} />
              </Grid>
            </Grid>
          </Card>
          <Box
            sx={{
              width: "100%",
              mt: "32px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              mb: 7,
              overflow: "hidden",
            }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                textAlign: "center",
                fontSize: "16px",
                p: 1.5,
                bgcolor: "#F4F5F6",
                width: "100%",
              }}
            >
              مرفقاتي
            </Typography>
            <Box
              sx={{
                bgcolor: "white",
                width: "100%",
                textAlign: "center",
                height: "auto",
                minHeight: "fit-content",
                padding: "8px",
                overflow: "hidden",
              }}
            >
              {fileNames.map((fileName, index) => (
                <Typography
                  key={index}
                  onClick={() => window.open(mediaUrls[index], "_blank")}
                  sx={{
                    cursor: "pointer",
                    wordBreak: "break-word",
                    lineHeight: 1.5,
                    display: "block",
                    mb: 1,
                  }}
                >
                  {fileName}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              mt: "32px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              mb: 7,
              overflow: "hidden",
            }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                textAlign: "center",
                fontSize: "16px",
                p: 1.5,
                bgcolor: "#F4F5F6",
                width: "100%",
              }}
            >
              مرفقات مقدم الخدمة
            </Typography>
            <Box
              sx={{
                bgcolor: "white",
                width: "100%",
                textAlign: "center",
                height: "auto",
                minHeight: "fit-content",
                padding: "8px",
                overflow: "hidden",
              }}
            >
              {fileNames.map((fileName, index) => (
                <Typography
                  key={index}
                  onClick={() => window.open(mediaUrls[index], "_blank")}
                  sx={{
                    cursor: "pointer",
                    wordBreak: "break-word",
                    lineHeight: 1.5,
                    display: "block",
                    mb: 1,
                  }}
                >
                  {fileName}
                </Typography>
              ))}
            </Box>
          </Box>
          <CustomButton
            width="100%"
            backgroundColor={theme.palette.primary.main}
            onClick={handleAddReply}
          >
            إضافة رد
          </CustomButton>
          <Box sx={{mt:2}}>
          <CancelOrderUser orderId={orderId} />
          </Box>
         
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth>
        <DialogTitle>إضافة رد</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="اكتب تعليقك هنا..."
          />
          <Box sx={{ mt: 2, dir: "rtl" }}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUpload />}
              sx={{
                width: "100%",
                height: "56px",
                borderStyle: "dashed",
                gap: "12px",
              }}
            >
              اختر ملفاً
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/jpeg,image/png,application/pdf"
                style={{
                  display: "none",
                }}
              />
            </Button>
          </Box>
          {selectedFile && (
            <Typography sx={{ mt: 1 }}>
              Selected file: {selectedFile.name}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>إلغاء</Button>
          <Button onClick={handleSaveReply} color="primary" variant="contained">
            حفظ
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
