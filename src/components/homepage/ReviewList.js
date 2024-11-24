import { Box } from '@mui/material';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';

const reviews = [
  {
    name: 'محمد ناصر',
    avatar: 'https://via.placeholder.com/150',
    rating: 5,
    comment: 'لوريم إيبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على العميل ...'
  },
  {
    name: 'أحمد علي',
    avatar: 'https://via.placeholder.com/150',
    rating: 4.5,
    comment: 'هذا مثال آخر للتعليق بالعربية. يمكن تخصيص هذا النص ليناسب الحاجة.'
  },
  {
    name: 'سارة محمد',
    avatar: 'https://via.placeholder.com/150',
    rating: 4,
    comment: 'نموذج تعليق ثالث يمكن استخدامه للعرض باللغة العربية.'
  }
];

const ReviewList = () => {
  const [isBrowser, setIsBrowser] = useState(false); 

  useEffect(() => {
    setIsBrowser(true); 
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box>
      {isBrowser && ( 
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </Slider>
      )}
    </Box>
  );
};

export default ReviewList;
