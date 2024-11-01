import { useLoaderData } from 'react-router-dom';
import { ICamp } from '../interfaces';
import ArrowLeft from '../../../assets/arrowLeft.svg?react';
import ArrowRight from '../../../assets/arrowRight.svg?react';
import styles from '../index.module.css';
import { useState } from 'react';
import { baseSrc } from '../../../constants';

export const CampsScroller: React.FC = () => {
  const { main } = useLoaderData() as {
    main: {
      camps: ICamp[];
    };
  };
  const campsLength = main.camps.length;
  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(2);

  const onLeft = () => {
    if (!campsLength) return;
    setStartIndex((prev) => (prev === 0 ? 0 : prev - 1));
    setLastIndex((prev) => (prev === 2 ? 2 : prev - 1));
  };
  const onRight = () => {
    if (!campsLength) return;
    if (campsLength - lastIndex !== 1) {
      setStartIndex((prev) => (prev === campsLength - 2 ? campsLength - 2 : prev + 1));
      setLastIndex((prev) => (prev === campsLength ? campsLength : prev + 1));
    }
  };

  return (
    <div className={styles.camps_wrap}>
      <h2 className={styles.camps_header}>Ближайшие кемпы</h2>
      <div className={styles.camps_scroller}>
        {main.camps.length ? <ArrowLeft className={styles.scroll_arrow_left} onClick={onLeft} /> : null}
        {main.camps.length ? <ArrowRight className={styles.scroll_arrow_right} onClick={onRight} /> : null}
        {main.camps.length ? (
          main.camps
            .filter((_, i) => i >= startIndex && i <= lastIndex)
            .map((item) => {
              return (
                <div key={item.id} className={styles.camp_card}>
                  <p>{item.name}</p>
                  <p>
                    {item.dateStart}-{item.dateEnd}
                  </p>
                  <div className={styles.camp_img_wrap}>
                    <img
                      src={`${baseSrc(item.mainImage.contentType)}${item.mainImage.data}`}
                      alt="картинка кэмпа"
                      className={styles.camp_img}
                    />
                  </div>
                  <div className={styles.camp_info}>
                    <button className={styles.button_camp}>Подробнее</button>
                  </div>
                </div>
              );
            })
        ) : (
          <>
            {[0, 1, 2].map((i) => (
              <div className={styles.camp_card} key={i}>
                <p>{i}</p>
                <p>загрузка...</p>
                <div className={styles.camp_img_wrap}>
                  <div className={styles.camp_img_dump} />
                </div>
                <div className={styles.camp_info}>
                  <button disabled={true} className={styles.button_camp}>
                    Подробнее
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
