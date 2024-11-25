import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  Avatar,
  useTheme,
  CardContent,
  Input,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import CustomButton from "../shared/CustomButton";
import StatusChip from "../shared/getStatusStyles";

export default function ServiceDetails({ ServiceNumber, Status, serviceDescription,user }) {
  const theme = useTheme();

  const [cardsData, setCardsData] = useState([
    {
      id: 1,
      name: "محمد",
      role: "مقدم الخدمة",
      date: "11/8/2024 (18:20)",
      content:
        "لوريم إيبسوم هو نموذج افتراضي يضعه في التصاميم لتعرض على العميل ليتمكن من تصور طريقة النصوص بالتزامن سواء كانت تصاميم مطبوعة ... بروشور أو فلاير على سبيل المثال ... أو نماذج مواقع الانترنت ...",
    },
    {
      id: 2,
      name: "علي",
      role: "مقدم الخدمة",
      date: "10/8/2024 (14:00)",
      content:
        "لوريم إيبسوم هو نموذج افتراضي يستخدم في التصميمات لإظهار النصوص وتوزيعها بشكل مؤقت للتصميمات سواء كانت مطبوعة أو مواقع الإنترنت.",
    },
    {
      id: 3,
      name: "سارة",
      role: "مقدمة الخدمة",
      date: "9/8/2024 (16:45)",
      content:
        "هذا النص هو مجرد مثال لاختبار الشكل والتصميم. يتم استخدامه لمساعدة المصممين في التركيز على عناصر التصميم بدلاً من محتوى النص نفسه.",
    },
  ]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleAddReply = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewComment(""); 
  };

  const handleSaveReply = () => {
    if (newComment.trim() !== "") {
      const newEntry = {
        id: cardsData.length + 1,
        name:user?.response?.first_name,
        role: "معلق",
        date: new Date().toLocaleString("ar-EG"), 
        content: newComment,
      };
      setCardsData([...cardsData, newEntry]); 
      handleDialogClose(); 
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
            {cardsData.map((card, index) => (
              <Grid item xs={12} key={card.id}>
                <Card
                  sx={{ maxWidth: "100%", height: "196px", margin: "auto" }}
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
                  11/8/2024 (18:20)
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
                  20/8/2024 (14:30)
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
              height: "100px",
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
              المرفقات
            </Typography>
            <Box sx={{ bgcolor: "white", width: "100%", textAlign: "center" }}>
              <label htmlFor="file-upload">
                <Input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  sx={{ display: "none" }}
                />
                <Button
                  component="span"
                  sx={{
                    color: "#595F69",
                    textTransform: "none",
                    pb: 3,
                    "&:hover": {
                      bgcolor: "#F0F0F0",
                    },
                  }}
                >
                  {selectedFile ? selectedFile.name : "Upload Photo"}
                </Button>
              </label>
            </Box>
          </Box>
          <CustomButton
            width="100%"
            backgroundColor={theme.palette.primary.main}
            onClick={handleAddReply}
          >
            إضافة رد
          </CustomButton>
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
