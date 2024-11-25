import { useState } from 'react';
import { useAsyncValue } from 'react-router-dom';
import { ICampItem } from '../../shotCamps/interfaces';
import ArrowLeft from '../../../assets/arrowLeft.svg?react';
import ArrowRight from '../../../assets/arrowRight.svg?react';
import styles from '../index.module.css';

export const Info = () => {
  const { camp } = useAsyncValue() as {
    camp: ICampItem;
  };
  const [currentImage, setCurrentImage] = useState(0);

  const onLeft = () => {
    setCurrentImage(
      currentImage === 0 ? camp.images?.length - 1 : currentImage - 1,
    );
  };
  const onRight = () => {
    setCurrentImage(
      currentImage === camp.images?.length - 1 ? 0 : currentImage + 1,
    );
  };
  return (
    <div className={styles.info_row}>
      <div>
        <div className={styles.info_img_wrapper}>
          {camp.images?.[currentImage] ? (
            <img
              src={camp.images[currentImage].url}
              alt={camp.images[currentImage].name}
              className={styles.info_current_img}
            />
          ) : (
            'тут картинка'
          )}
          <ArrowLeft className={styles.scroll_arrow_left} onClick={onLeft} />
          <ArrowRight className={styles.scroll_arrow_right} onClick={onRight} />
        </div>
        <div className={styles.row_prevew_images}>
          {camp.images
            ? camp.images.map((image) => (
                <div className={styles.prevew_img_wrapper}>
                  <img
                    src={image.url}
                    alt={image.name}
                    className={styles.prevew_img}
                  />
                </div>
              ))
            : null}
        </div>
      </div>
      <ul className={styles.info_list}>
        {camp.info
          ?.split(';')
          .filter(Boolean)
          .map((inf) => <li>{inf}</li>)}
      </ul>
    </div>
  );
};
