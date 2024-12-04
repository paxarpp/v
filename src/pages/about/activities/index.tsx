import { useAsyncValue } from 'react-router-dom';
import { IAbout } from '../interfaces';
import { ImagePack } from '../../../templates/imagesPack';
import Ball from '../../../assets/ball.svg?react';
import styles from '../index.module.css';

export const Activities = () => {
  const {
    about: { activities },
  } = useAsyncValue() as {
    about: IAbout;
  };

  return (
    <div className={styles.row_activities}>
      {activities?.map((act) => {
        return (
          <div className={styles.activity_card} key={act.name}>
            <span className={styles.activity_title}>
              <Ball />
              {act.name}
            </span>
            <ImagePack
              images={act.images}
              width={420}
              height={254}
              widthPreview={74}
              heightPreview={50}
              gapPreview={13}
              marginPreviewTop={20}
            />
          </div>
        );
      })}
    </div>
  );
};
