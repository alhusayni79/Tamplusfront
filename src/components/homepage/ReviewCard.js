import { Box, Card, CardContent, Typography, Avatar, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const ReviewCard = ({ review }) => {
  return (
    <Card sx={{ maxWidth: 500, borderRadius: 2, boxShadow: 3, border: '1px solid #E0E0E0', marginBottom: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar
            src={review.avatar} 
            alt={review.name}
            sx={{ width: 56, height: 56 }}
          />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'right' }}>
              {review.name}
            </Typography>
            <Box display="flex" justifyContent="flex-end">
              <Rating
                value={review.rating}
                readOnly
                precision={0.5}
                icon={<StarIcon fontSize="inherit" sx={{ color: '#FFD700' }} />}
              />
            </Box>
          </Box>
        </Box>
                <Typography variant="body1" sx={{ textAlign: 'right', color: '#555', direction: 'rtl' }}>
          {review.comment}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
