import { PropsWithChildren } from 'react';
import Carousel from 'react-multi-carousel';
import ArrowLeft from '../../assets/arrowLeft.svg?react';
import ArrowLeftHover from '../../assets/arrowLeftHover.svg?react';
import ArrowRight from '../../assets/arrowRight.svg?react';
import ArrowRightHover from '../../assets/arrowRightHover.svg?react';
import { useDeviceDetect } from '../../hooks';
import 'react-multi-carousel/lib/styles.css';
import styles from './index.module.css';

// @ts-ignore
const CustomDot = ({ active, isMobile }) => {
  return (
    <div
      className={`${styles.dot} ${active ? styles.dot_active : styles.dot_inactive}`}
      onClick={isMobile ? undefined : () => onClick()}
    />
  );
};

// @ts-ignore
const CustomLeftArrow = ({ onClick }) => {
  return (
    <span className={styles.scroll_arrow_left}>
      <ArrowLeft className={styles.icon_left} onClick={() => onClick()} />
      <ArrowLeftHover
        className={styles.icon_left_hover}
        onClick={() => onClick()}
      />
    </span>
  );
};

// @ts-ignore
const CustomRightArrow = ({ onClick }) => {
  return (
    <span className={styles.scroll_arrow_right}>
      <ArrowRight className={styles.icon_right} onClick={() => onClick()} />
      <ArrowRightHover
        className={styles.icon_right_hover}
        onClick={() => onClick()}
      />
    </span>
  );
};

const responsive = {
  largeDesktop: {
    breakpoint: { max: 4000, min: 1920 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1920, min: 1700 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1700, min: 1280 },
    items: 2,
  },
  minTablet: {
    breakpoint: { max: 1280, min: 1024 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 1024, min: 0 },
    items: 1,
  },
};

export const CarouselTemplate: React.FC<
  PropsWithChildren<{ responsiveProps?: Partial<typeof responsive> }>
> = ({ children, responsiveProps }) => {
  const { isMobile } = useDeviceDetect();
  return (
    <div
      className={
        isMobile ? styles.images_scroller_mobi : styles.images_scroller
      }
    >
      <Carousel
        showDots={true}
        renderDotsOutside={true}
        responsive={{
          ...responsive,
          ...responsiveProps,
        }}
        removeArrowOnDeviceType={['mobile']}
        deviceType={isMobile ? 'mobile' : 'desktop'}
        customDot={<CustomDot isMobile={isMobile} />}
        containerClass={styles.container}
        dotListClass={styles.dot_list}
        itemClass={styles.item}
        customRightArrow={<CustomRightArrow />}
        customLeftArrow={<CustomLeftArrow />}
      >
        {children}
      </Carousel>
    </div>
  );
};
