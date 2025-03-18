import ArrowLeft from '../../../assets/arrowLeft.svg?react';
import ArrowRight from '../../../assets/arrowRight.svg?react';
import styles from './index.module.css';

interface IProps {
  show: boolean;
  onLeft: () => void;
  onRight: () => void;
}

export const Control: React.FC<IProps> = ({ show = true, onLeft, onRight }) => {
  return show ? (
    <>
      <ArrowLeft className={styles.scroll_arrow_left} onClick={onLeft} />
      <ArrowRight onClick={onRight} className={styles.scroll_arrow_right} />
    </>
  ) : null;
};
