import { useState } from 'react';
import ArrowLeft from '../../assets/arrowLeft.svg?react';
import ArrowRight from '../../assets/arrowRight.svg?react';
import { createImageUrl } from '../../constants';
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
}

export const ImagePack: React.FC<IProps> = ({
  images: imgs,
  className,
  width = 720,
  height = 480,
  widthPreview = 120,
  heightPreview = 80,
  gapPreview = 30,
  marginPreviewTop = 50,
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = imgs ? imgs : [];
  const isEmpty = images.length === 0;

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
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  };
  const onRight = () => {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  };
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
          src={createImageUrl(images[currentImage].url)}
          alt={images[currentImage].name}
          className={styles.info_current_img}
        />
        <ArrowLeft className={styles.scroll_arrow_left} onClick={onLeft} />
        <ArrowRight className={styles.scroll_arrow_right} onClick={onRight} />
      </div>
      <div className={styles.row_prevew_images} style={sizeRow}>
        {images
          ? images.map((image, indx) => (
              <div
                className={styles.prevew_img_wrapper}
                key={image.id}
                style={sizePreviw}
              >
                <img
                  src={createImageUrl(image.url)}
                  alt={image.name}
                  className={
                    indx === currentImage
                      ? styles.prevew_img_current
                      : styles.prevew_img
                  }
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
