/* eslint-disable camelcase */
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Pagination } from 'swiper';

export type ImageCarouselProps = {
  paths: string[];
};

export default function ImageCarousel(props: ImageCarouselProps) {
  const { paths } = props;

  // const items = paths?.map((path) => (
  //   <img src={`file://${path}`} onDragStart={handleDragStart} alt="simple" />
  // ));
  return (
    <div className="image-carousel">
      <Swiper
        modules={[Navigation, Pagination]}
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
          paths.map((path) => (
            <SwiperSlide>
              {({ isActive }) => (
                <div className={isActive ? 'imgBx active' : 'imgBx'}>
                  <img src={`file://${path}`} alt="" />
                </div>
              )}
            </SwiperSlide>
          ))
        ) : (
          <div>Drop your images here</div>
        )}
        <div className="swiper-button-prev slider-arrow" />
        <div className="swiper-button-next slider-arrow" />
        <div className="swiper-pagination" />
      </Swiper>
    </div>
  );
}
