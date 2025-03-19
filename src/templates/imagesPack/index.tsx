import { useEffect, useState } from 'react';
import ArrowLeft from '../../assets/arrowLeft.svg?react';
import ArrowRight from '../../assets/arrowRight.svg?react';
import { createImageUrl } from '../../constants';
import styles from './index.module.css';
import { Control } from '../controlArrow';

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
}) => {
  const [currentImage, setCurrentImage] = useState<
    {
      id: string;
      name: string;
      url: string;
    }[]
  >([]);

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
  const imageIndx = Math.min(currentImage.length, 1);

  return isEmpty ? (
    <div className={className}>
      <div className={styles.info_img_wrapper_stub} style={size}></div>
      <div className={styles.row_prevew_images} style={sizeRow}>
        <div className={styles.prevew_img_wrapper_stub} style={sizePreviw} />
      </div>
    </div>
  ) : (
    <div className={className}>
      <div className={styles.info_img_wrapper} style={size}>
        <img
          src={createImageUrl(currentImage[imageIndx].url)}
          alt={currentImage[imageIndx].name}
          className={styles.info_current_img}
        />
        <Control
          onLeft={onLeft}
          onRight={onRight}
          show={!!currentImage.length}
        />
      </div>
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
                      indx === imageIndx
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
