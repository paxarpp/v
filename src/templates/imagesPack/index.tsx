import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { createImageUrl } from '../../constants';
import { Control } from '../controlArrow';
import { Dots } from '../Dots';
import styles from './index.module.css';
import { ImageViewer } from '../imageViewer';

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
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images?.length) {
      setCurrentImage(images);
    }
  }, [images?.length]);
  const isEmpty = currentImage.length === 0;

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
    gap: `${gapPreview}px`,
    marginTop: `${marginPreviewTop}px`,
  };
  const sizePreviw = {
    width: `${widthPreview}px`,
  };

  const onLeft = () => {
    setCurrentImage((prev) => {
      const [tail, ...arr] = prev;
      return [...arr, tail];
    });
  };
  const onRight = () => {
    setCurrentImage((prev) => {
      const prevCopy = [...prev];
      const tail = prevCopy.pop() as Omit<(typeof prev)[number], 'undefined'>;
      return [tail, ...prevCopy];
    });
  };
  const imageIndx = Math.min(currentImage.length - 1, 1);

  const onLeftM = () => {
    if (!currentImage.length) return;
    setCurrentIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const onRightM = () => {
    if (!currentImage.length) return;
    if (currentIndex < currentImage.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: onRightM,
    onSwipedRight: onLeftM,
    trackMouse: true,
  });

  return isEmpty ? (
    <div className={className}>
      <div className={styles.info_img_wrapper_stub} style={size} />
      {isMobile ? (
        <Dots
          currentIndex={currentIndex}
          listLength={0}
          className={styles.dots_mt5}
        />
      ) : null}
      <div className={styles.row_prevew_images} style={sizeRow}>
        <div className={styles.prevew_img_wrapper_stub} style={sizePreviw} />
      </div>
    </div>
  ) : (
    <div className={className}>
      <div className={styles.info_img_wrapper} style={size}>
        {isMobile ? (
          <div {...swipeHandlers} style={size}>
            <ImageViewer
              src={createImageUrl(currentImage[currentIndex]?.url)}
              alt={currentImage[currentIndex]?.name}
              className={styles.info_current_img}
            />
          </div>
        ) : (
          <ImageViewer
            src={createImageUrl(currentImage[imageIndx]?.url)}
            alt={currentImage[imageIndx]?.name}
            className={styles.info_current_img}
          />
        )}
        {isMobile ? null : (
          <Control
            onLeft={onLeft}
            onRight={onRight}
            show={!!currentImage.length}
          />
        )}
      </div>
      {isMobile ? (
        <Dots
          currentIndex={currentIndex}
          listLength={currentImage.length}
          className={styles.dots_mt5}
        />
      ) : null}
      <div className={styles.row_prevew_images} style={sizeRow}>
        {currentImage
          ? currentImage.map((image, indx) =>
              indx <= 4 ? (
                <div
                  className={styles.prevew_img_wrapper}
                  key={image.id}
                  style={sizePreviw}
                >
                  <img
                    src={createImageUrl(image.url)}
                    alt={image.name}
                    className={
                      !isMobile && indx === imageIndx
                        ? styles.prevew_img_current
                        : styles.prevew_img
                    }
                  />
                </div>
              ) : null,
            )
          : null}
      </div>
    </div>
  );
};
