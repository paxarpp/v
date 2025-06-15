import RoundAdd from '../../assets/roundAdd.svg?react';
import styles from './index.module.css';

interface IProps {
  onClick: () => void;
  show: boolean;
  isMobile: boolean;
  sizes?: {
    mobile?: {
      width?: number;
      height?: number;
    };
    desktop?: {
      width?: number;
      height?: number;
    };
  };
}

export const CardAdd: React.FC<IProps> = ({
  show,
  isMobile,
  sizes,
  onClick,
}) => {
  const styleSize = {
    width: `${isMobile ? sizes?.mobile?.width || 335 : sizes?.desktop?.width || 570}px`,
    height: `${isMobile ? sizes?.mobile?.height || 281 : sizes?.desktop?.height || 520}px`,
  };
  return show ? (
    <div className={styles.camp_card_add} style={styleSize}>
      <RoundAdd onClick={onClick} />
    </div>
  ) : null;
};
