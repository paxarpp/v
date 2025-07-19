import Carousel from 'react-multi-carousel';
import { useDeviceDetect } from '../../hooks';
import { Dot } from '../Dots';
import { ControlLeft, ControlRight } from '../controlArrow';
import 'react-multi-carousel/lib/styles.css';
import styles from './index.module.css';

interface IProps<T> {
  list: T[];
  renderItem: (item: T) => JSX.Element;
  carouselContainerClassName?: string;
  dotListClassName?: string;
  itemClassName?: string;
}

const responsive = {
  desktopXXL: {
    breakpoint: { max: 3000, min: 1680 },
    items: 3,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1680, min: 1320 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 1320, min: 1 },
    items: 1,
    slidesToSlide: 1,
  },
};

export const UniversalScroller = <T extends { id: string }>({
  list,
  renderItem,
  carouselContainerClassName,
  dotListClassName,
  itemClassName,
}: IProps<T>) => {
  const { isMobile } = useDeviceDetect();
  if (!list.length) return null;

  return (
    <div className={styles.container}>
      <Carousel
        swipeable={true}
        draggable={false}
        showDots={isMobile}
        responsive={responsive}
        infinite={true}
        keyBoardControl={true}
        containerClass={carouselContainerClassName}
        deviceType={isMobile ? 'mobile' : 'desktop'}
        removeArrowOnDeviceType={['mobile']}
        dotListClass={dotListClassName ? dotListClassName : styles.dot_list}
        itemClass={itemClassName ? itemClassName : styles.item}
        renderDotsOutside={true}
        customDot={<Dot />}
        customLeftArrow={<ControlLeft />}
        customRightArrow={<ControlRight />}
      >
        {list.map((item: T) => {
          return renderItem(item);
        })}
      </Carousel>
    </div>
  );
};
