import { useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowLeft from '../../../assets/arrowLeft.svg?react';
import ArrowRight from '../../../assets/arrowRight.svg?react';
import { ICamp } from '../interfaces';
import styles from '../index.module.css';

interface IProps {
  camps?: ICamp[];
  title: string;
}

export const Scroller: React.FC<IProps> = ({ camps = [], title }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(2);

  const onLeft = () => {
    if (!camps.length) return;
    setStartIndex((prev) => (prev === 0 ? 0 : prev - 1));
    setLastIndex((prev) => (prev === 2 ? 2 : prev - 1));
  };
  const onRight = () => {
    if (!camps.length) return;
    if (camps.length - lastIndex !== 1) {
      setStartIndex((prev) =>
        prev === camps.length - 2 ? camps.length - 2 : prev + 1,
      );
      setLastIndex((prev) => (prev === camps.length ? camps.length : prev + 1));
    }
  };

  return (
    <div className={styles.camps_wrap}>
      <h2>{title}</h2>
      <div className={styles.camps_scroller}>
        <ArrowLeft className={styles.scroll_arrow_left} onClick={onLeft} />
        <ArrowRight className={styles.scroll_arrow_right} onClick={onRight} />
        {camps
          .filter((_, i) => i >= startIndex && i <= lastIndex)
          .map((item) => {
            return (
              <div key={item.id} className={styles.camp_card}>
                <p>{item.name}</p>
                <p>{item.dateString}</p>
                <div className={styles.camp_img_wrap}>
                  <img
                    src={item.imageCart.url}
                    alt="картинка кэмпа"
                    className={styles.camp_img}
                  />
                </div>
                <div className={styles.camp_info}>
                  <Link to={`/camps/${item.id}`} className={styles.button_camp}>
                    Подробнее
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};