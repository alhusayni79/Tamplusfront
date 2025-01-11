import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  Tabs,
  Tab,
  Card,
  useTheme,
  Container,
} from "@mui/material";
import CustomButton from "../shared/CustomButton";
import StatusChip from "../shared/getStatusStyles";
import ServiceTabs from "./ServiceTabs";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axios from "axios";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMessage } from "../../redux/Slices/chat/allMessageRequestSlice";
import { fetchAllMedia } from "../../redux/Slices/chat/allMediaRequestSlice";
import Chat from "./Chat";

const RequestDetails = ({ rowData, handleAcceptServiceClick, orderId }) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const { allMessage, messageLoading, messageError } = useSelector(
    (state) => state.allMessage
  );
  const { allMedia, mediaLoading, mediaError } = useSelector(
    (state) => state.allMedia
  );

  useEffect(() => {
    dispatch(fetchAllMessage(orderId));
    dispatch(fetchAllMedia(orderId));
  }, [dispatch, orderId]);

  if (messageLoading || mediaLoading) return <div>Loading...</div>;
  if (messageError || mediaError)
    return <div>{messageError || mediaError}</div>;

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
    if (file) {
      console.log("File selected:", {
        name: file.name,
        type: file.type,
        size: file.size,
      });
      setSelectedFile(file);
    }
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
  const cardsData = allMessage?.response || [];
  return (
    <Box sx={{ maxWidth: "832px", margin: "0 auto" }}>
      <Grid container spacing={2} direction="column">
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <Box></Box>
            {/* <CustomButton
              backgroundColor="#1D7C12"
              width="256px"
              maxWidth="256px"
              onClick={handleAcceptServiceClick}
            >
              تم إكمال الخدمة
            </CustomButton> */}
            <Typography
              sx={{
                fontSize: { xs: "16px", sm: "20px", md: "24px" },
                fontWeight: 500,
                color: "#595F69",
              }}
            >
              الطلبات قيد التنفيذ
              <ArrowBackIosIcon
                sx={{
                  verticalAlign: "middle",
                  color: "#595F69",
                  fontSize: { xs: "16px", sm: "18px", md: "20px" },
                }}
              />
              <span
                style={{
                  fontWeight: "bold",
                  color: "#1E2124",
                  marginRight: "5px",
                  fontSize: { xs: "14px", sm: "16px", md: "18px" },
                }}
              >
                #{rowData.id}
              </span>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <ServiceTabs rowData={rowData} />
        </Grid>
        <Grid item xs={12}>
          <Chat rowData={rowData} cardsData={cardsData} />
        </Grid>
      </Grid>
    </Box>
  );
};

const RequestPage = () => {
  const location = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();
  const rowData = location.state;

 const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
const handleAcceptServiceClick = async () => {
    const updatedRowData = { ...rowData };
    const baseURL = process.env.REACT_APP_BASE_URL;
    const token = Cookies.get("authemployee");

    try {
      const formData = new FormData();
      formData.append("order_id", rowData.id);

      await axios.post(`${baseURL}/employee/reserve-order`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate(
        `/employee/${updatedRowData.serviceDescription}/servicePageActive`,
        {
          state: updatedRowData,
        }
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

 

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Grid container spacing={3} sx={{ flexDirection: "row-reverse" }}>
        <Grid item xs={12} md={9}>
        <RequestDetails
            rowData={rowData}
            handleAcceptServiceClick={handleAcceptServiceClick}
            orderId={rowData.id}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: "8px", mb: 5 }}>
            <Typography
              sx={{
                backgroundColor: theme.palette.primary.main,
                textAlign: "center",
                p: 2,
                color: theme.palette.primary.white,
                fontWeight: "700",
              }}
            >
              {t("serviceprovider.service_information")}
              </Typography>
            <Grid
              container
              direction="column"
              spacing={2}
              sx={{ textAlign: "center" }}
            >
              <Grid
                item
                xs={12}
                sx={{ borderBottom: "1px solid #D8DBDE", pb: 2, pt: 1 }}
              >
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "14px",
                    color: theme.palette.primary.disabled,
                    mt: 1,
                  }}
                >
                  {t("serviceprovider.client")}
                  </Typography>
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "16px",
                    color: theme.palette.primary.dark,
                  }}
                >
                  {rowData?.user?.fullname || "محمد علي"}
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
                    color: theme.palette.primary.disabled,
                  }}
                >
                  {t("serviceprovider.service_request_date")}
                  </Typography>
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "16px",
                    color: theme.palette.primary.dark,
                  }}
                >
                  {rowData.created_at}
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
                    color: theme.palette.primary.disabled,
                    pb: 2,
                  }}
                >
                  {t("serviceprovider.status")}
                  </Typography>
                <StatusChip Status={rowData.status} />
              </Grid>
            </Grid>
          </Card>

          <Paper
            elevation={0}
            sx={{ padding: "32px", textAlign: "center", borderRadius: "8px" }}
          >
            <Typography variant="h6"> {t("serviceprovider.total")}</Typography>

            <Typography
              sx={{
                fontSize: "56px",
                fontWeight: "bold",
                color: theme.palette.primary.main,
              }}
            >
              {rowData.total}
              <Typography
                component="span"
                variant="subtitle2"
                sx={{ color: "#595F69" }}
              >
                {t("serviceprovider.currency")}
                </Typography>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RequestPage;
