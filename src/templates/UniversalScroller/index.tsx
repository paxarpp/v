import React, { useState, useEffect, useRef } from 'react';
import Carousel from 'react-multi-carousel';
import { useDeviceDetect } from '../../hooks';
import { Dot } from '../Dots';
import { ControlLeft, ControlRight } from '../controlArrow';
import 'react-multi-carousel/lib/styles.css';
import styles from './index.module.css';
import { useAuth } from '../../context';

interface IProps<T> {
  list: T[];
  renderItem: (
    item: T,
    toggleFullScreen: () => void,
    isFullscreen: boolean,
  ) => JSX.Element;
  carouselContainerClassName?: string;
  dotListClassName?: string;
  itemClassName?: string;
  responsive?: typeof responsiveBase;
  sizeControl?: 'sm' | 'lg';
}

const responsiveBase = {
  desktopXXL: {
    breakpoint: { max: 3000, min: 1680 },
    items: 3,
    slidesToSlide: 1,
  },
  desktop: { breakpoint: { max: 1680, min: 1320 }, items: 2, slidesToSlide: 1 },
  mobile: { breakpoint: { max: 1320, min: 1 }, items: 1, slidesToSlide: 1 },
};

const responsiveFullscreen = {
  all: { breakpoint: { max: 4000, min: 0 }, items: 1 },
};

export const UniversalScroller = <T extends { id: string }>({
  list,
  renderItem,
  carouselContainerClassName,
  dotListClassName,
  itemClassName,
  responsive = responsiveBase,
  sizeControl = 'lg',
}: IProps<T>) => {
  const { isMobile } = useDeviceDetect();
  const { image } = useAuth();

  const carouselRef = useRef<Carousel>(null);

  const closeFullScreen = () => {
    image.closePreview();
  };

  const isFullscreen = image.isOpen;

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
      const index = list.findIndex((item) => item.id === image.currentImg);
      setTimeout(() => {
        if (carouselRef.current && index !== -1) {
          // +2 так открывается тот по которому кликнули
          carouselRef.current.goToSlide(index + 2, true);
        }
      }, 100);

    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen]);

  if (!list.length) return null;

  return (
    <div className={isFullscreen ? styles.fullscreenOverlay : styles.container}>
      {isFullscreen && (
        <button className={styles.closeButton} onClick={closeFullScreen}>
          ✕
        </button>
      )}

      <Carousel
        ref={carouselRef}
        swipeable={true}
        draggable={false}
        showDots={isMobile || isFullscreen}
        // Если фулскрин — ставим 1 слайд, иначе — базовый конфиг
        responsive={isFullscreen ? responsiveFullscreen : responsive}
        infinite={true}
        keyBoardControl={true}
        containerClass={`${carouselContainerClassName || ''} ${
          isFullscreen ? styles.carouselFullscreen : ''
        }`}
        deviceType={isMobile ? 'mobile' : 'desktop'}
        // В фулскрине стрелки нужны всегда
        removeArrowOnDeviceType={isMobile && !isFullscreen ? ['mobile'] : []}
        dotListClass={dotListClassName || styles.dot_list}
        itemClass={`${styles.item} ${itemClassName || ''}`}
        renderDotsOutside={!isFullscreen}
        customDot={<Dot />}
        customLeftArrow={
          <ControlLeft size={isFullscreen ? 'lg' : sizeControl} />
        }
        customRightArrow={
          <ControlRight size={isFullscreen ? 'lg' : sizeControl} />
        }
      >
        {list.map((item) => (
          <div key={item.id} className={isFullscreen ? styles.slideFull : ''}>
            {renderItem(item, closeFullScreen, isFullscreen)}
          </div>
        ))}
      </Carousel>
    </div>
  );
};
