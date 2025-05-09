import ArrowLeft from '../../assets/arrowLeft.svg?react';
import ArrowLeftHover from '../../assets/arrowLeftHover.svg?react';
import ArrowRight from '../../assets/arrowRight.svg?react';
import ArrowRightHover from '../../assets/arrowRightHover.svg?react';
import styles from './index.module.css';

interface IProps {
  show: boolean;
  onLeft: () => void;
  onRight: () => void;
  activeIndex?: number;
  maxCount?: number;
}

export const Control: React.FC<IProps> = ({
  show = true,
  onLeft,
  onRight,
  activeIndex,
  maxCount,
}) => {
  return show ? (
    <>
      {activeIndex !== 0 ? (
        <span className={styles.scroll_arrow_left}>
          <ArrowLeft className={styles.icon_left} onClick={onLeft} />
          <ArrowLeftHover className={styles.icon_left_hover} onClick={onLeft} />
        </span>
      ) : null}
      {activeIndex !== maxCount ? (
        <span className={styles.scroll_arrow_right}>
          <ArrowRight className={styles.icon_right} onClick={onRight} />
          <ArrowRightHover
            className={styles.icon_right_hover}
            onClick={onRight}
          />
        </span>
      ) : null}
    </>
  ) : null;
};
