import { ClearOutlined } from '@mui/icons-material';
import { Container, Box, IconButton } from '@mui/material';
import path from 'path';
import { useContext } from 'react';
import { ImagePreviewContext } from 'renderer/App';
import { useSwiper, useSwiperSlide } from 'swiper/react';

export type ImageSlideProps = {
  imgPath: string;
  removePic: (path: string) => void;
};

export default function ImageSlide(props: ImageSlideProps) {
  const { imgPath, removePic } = props;
  const swiperSlide = useSwiperSlide();
  const swiper = useSwiper();
  const { setPreviewImage } = useContext(ImagePreviewContext);

  return (
    <div
      role="presentation"
      className="slide-content"
      onClick={() => {
        swiper.slideTo(swiper.clickedIndex);
      }}
    >
      <Box className={swiperSlide.isActive ? 'imgBx active' : 'imgBx'}>
        <IconButton
          sx={{ position: 'absolute', top: 0, right: 0 }}
          onClick={(e) => {
            e.stopPropagation();
            removePic(imgPath);
            const newPreviewPath =
              swiper.slides[swiper.activeIndex].getAttribute('id');
            if (newPreviewPath) setPreviewImage(`file://${imgPath}`);
          }}
        >
          <ClearOutlined />
        </IconButton>
        <img src={`file://${imgPath}`} alt="" />
      </Box>
    </div>
  );
}
