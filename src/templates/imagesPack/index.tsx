import { useEffect, useState, useRef } from 'react';
import { createImageUrl } from '../../constants';
import { Control } from '../controlArrow';
import { ImageViewer } from '../imageViewer';
import { Pagination, Thumbs, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type SwiperInstance from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';
import styles from './index.module.css';

interface IProps {
  images?:
    | {
        id: string;
        name: string;
        url: string;
      }[]
    | null;
  className?: string;
  width?: number;
  height?: number;
  widthPreview?: number;
  heightPreview?: number;
  gapPreview?: number;
  marginPreviewTop?: number;
  isMobile?: boolean;
}

export const ImagePack: React.FC<IProps> = ({
  images,
  className,
  width = 720,
  height = 480,
  widthPreview = 120,
  heightPreview = 80,
  gapPreview = 30,
  marginPreviewTop = 50,
  isMobile = false,
}) => {
  const [currentImage, setCurrentImage] = useState<
    {
      id: string;
      name: string;
      url: string;
    }[]
  >([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [swiperIndex, setSwiperIndex] = useState(0);
  const swiperRef = useRef<{ swiper: SwiperInstance } | null>(null);

  useEffect(() => {
    if (images?.length) {
      setCurrentImage(images);
    }
  }, [images?.length]);

  const handlePrev = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.swiper.slideNext();
  };

  const size = {
    width: `${width}px`,
    height: `${height}px`,
    minHeight: `${height}px`,
    maxHeight: `${height}px`,
  };
  const sizeRow = {
    height: `${heightPreview}px`,
    minHeight: `${heightPreview}px`,
    maxHeight: `${heightPreview}px`,
    marginTop: `${marginPreviewTop}px`,
    width: `${width}px`,
  };
  const sizePreviw = {
    width: `${widthPreview}px`,
  };

  return (
    <div className={className}>
      <div className={styles.info_img_wrapper} style={size}>
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination, Thumbs]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          thumbs={{
            swiper: thumbsSwiper,
          }}
          onRealIndexChange={(swiperCore) => {
            setSwiperIndex(swiperCore.realIndex);
          }}
        >
          {currentImage.map((image) => (
            <SwiperSlide key={image.id}>
              <div style={size}>
                <ImageViewer
                  src={createImageUrl(image.url)}
                  alt={image.name}
                  className={styles.info_current_img}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Control
          activeIndex={swiperIndex}
          maxCount={currentImage.length ? currentImage.length - 1 : 0}
          show={!isMobile && currentImage.length > 1}
          onLeft={handlePrev}
          onRight={handleNext}
        />
      </div>

      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        slidesPerView={5}
        spaceBetween={gapPreview}
        style={sizeRow}
      >
        {currentImage.map((image, indx) => {
          return (
            <SwiperSlide
              key={image.id}
              className={`${styles.prevew_img_wrapper} ${swiperIndex === indx ? styles.prevew_img_wrapper_active : ''}`}
              style={sizePreviw}
            >
              <img
                src={createImageUrl(image.url)}
                alt={image.name}
                className={styles.prevew_img}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
