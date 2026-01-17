import ArrowLeft from '../../assets/arrowLeft.svg?react';
import ArrowLeftHover from '../../assets/arrowLeftHover.svg?react';
import ArrowRight from '../../assets/arrowRight.svg?react';
import ArrowRightHover from '../../assets/arrowRightHover.svg?react';
import styles from './index.module.css';

interface IProps {
  show: boolean;
  onLeft: () => void;
  onRight: () => void;
}

export const Control: React.FC<IProps> = ({ show = true, onLeft, onRight }) => {
  return show ? (
    <>
      <ControlLeft onClick={onLeft} />

      <ControlRight onClick={onRight} />
    </>
  ) : null;
};

export const ControlLeft: React.FC<{
  onClick?: () => void;
  size?: 'sm' | 'lg';
}> = ({ onClick, size = 'lg' }) => {
  return (
    <span
      className={`${styles.scroll_arrow_left} ${size === 'sm' ? styles.scroll_sm : ''}`}
      onClick={onClick}
    >
      <ArrowLeft
        className={`${styles.icon_left} ${size === 'sm' ? styles.iconsm : ''}`}
      />
      <ArrowLeftHover
        className={`${styles.icon_left_hover} ${size === 'sm' ? styles.iconsm : ''}`}
      />
    </span>
  );
};

export const ControlRight: React.FC<{
  onClick?: () => void;
  size?: 'sm' | 'lg';
}> = ({ onClick, size = 'lg' }) => {
  return (
    <span
      className={`${styles.scroll_arrow_right} ${size === 'sm' ? styles.scroll_sm : ''}`}
      onClick={onClick}
    >
      <ArrowRight
        className={`${styles.icon_right} ${size === 'sm' ? styles.iconsm : ''}`}
      />
      <ArrowRightHover
        className={`${styles.icon_right_hover} ${size === 'sm' ? styles.iconsm : ''}`}
      />
    </span>
  );
};
