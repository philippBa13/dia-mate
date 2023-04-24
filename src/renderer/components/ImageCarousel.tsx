/* eslint-disable camelcase */
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CollectionsOutlined } from '@mui/icons-material';
import { Box, Button, Container } from '@mui/material';
import { useContext, useEffect, useRef } from 'react';
import { Navigation, Pagination, Scrollbar } from 'swiper';
import { ImagePreviewContext } from 'renderer/App';
import ImageSlide from './ImageSlide';

export type ImageCarouselProps = {
  paths: string[];
  selectPics: () => Promise<void>;
  addPic: (path: string, setAsPreview: boolean) => void;
  removePic: (path: string) => void;
};

export default function ImageCarousel(props: ImageCarouselProps) {
  const { paths, selectPics, addPic, removePic } = props;
  const dropRef = useRef<HTMLDivElement>(null);
  const { setPreviewImage } = useContext(ImagePreviewContext);

  useEffect(() => {
    // 👇 Get the DOM element from the React element
    const element = dropRef.current;
    let enterTarget: EventTarget | null = null;
    if (!element) return undefined;
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      // eslint-disable-next-line no-restricted-syntax
      for (const f of e.dataTransfer?.files!) {
        // Using the path attribute to get absolute file path
        console.log('File Path of dragged files: ', f.path);
      }
      element.classList.remove('drag-drop-over');
      console.log('dropped something');
    };

    const handleDragLeave = (e: Event) => {
      if (enterTarget === e.target) {
        e.preventDefault();
        e.stopPropagation();
        element.classList.remove('drag-drop-over');
      }
      console.log('dragged leave');
    };

    const handleDragEnter = (e: Event) => {
      e.preventDefault();
      enterTarget = e.target;

      element.classList.add('drag-drop-over');
      console.log('dragged enter');
    };

    const handleDragOver = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();

      console.log('dragged over');
    };

    element.addEventListener('drop', handleDrop);
    element.addEventListener('dragover', handleDragOver);
    element.addEventListener('dragleave', handleDragLeave);
    element.addEventListener('dragenter', handleDragEnter);
    console.log('listeners added');
    return () => {
      element.removeEventListener('drop', handleDrop);
      element.removeEventListener('dragover', handleDragOver);
      element.removeEventListener('dragenter', handleDragEnter);
      element.removeEventListener('dragleave', handleDragLeave);
    };
  }, []);

  function updatePreview(swiper: Swiper) {
    const path = swiper.slides[swiper.activeIndex].getAttribute('id');
    if (path) setPreviewImage(`file://${path}`);
  }

  return (
    <div className="image-carousel">
      <Swiper
        scrollbar
        onSlideChange={(swiper) => updatePreview(swiper)}
        onSlidesLengthChange={(swiper) => updatePreview(swiper)}
        modules={[Navigation, Pagination, Scrollbar]}
        grabCursor={false}
        pagination={{
          type: 'custom',
          el: '.swiper-pagination',
          renderCustom: (swiper, current, total) => {
            return `<span style="background-color:rgba(255,255,255,.4);">${current}/${total}</span>`;
          },
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        spaceBetween={10}
        centeredSlides
        slidesPerView={4}
      >
        {paths.length > 0 ? (
          paths.map((el) => (
            <SwiperSlide id={el} key={el}>
              <ImageSlide imgPath={el} removePic={removePic} />
            </SwiperSlide>
          ))
        ) : (
          <Container ref={dropRef} maxWidth="sm" className="drag-drop">
            <Box sx={{ textAlign: 'center', margin: '5px' }}>
              <CollectionsOutlined sx={{ fontSize: 70 }} />
              <Container>Drop your images here</Container>
              <Container sx={{ color: 'gray' }}>or</Container>
              <Button onClick={selectPics}>Browse Files</Button>
            </Box>
          </Container>
        )}
        <div className="swiper-button-prev slider-arrow" />
        <div className="swiper-button-next slider-arrow" />
        <div className="swiper-pagination" />
      </Swiper>
    </div>
  );
}
