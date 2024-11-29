import { Modal } from '../modal';
import Avatar from '../../assets/avatar.svg?react';
import styles from './index.module.css';

interface IImage {
  id: string;
  name: string;
  url: string;
}

interface ICoach {
  id: string;
  name: string;
  infos: string[];
  mainImage: IImage | null;
  promo: string;
}

export const CoachProfile: React.FC<{
  coach: ICoach | null;
  onClose: () => void;
}> = ({ coach, onClose }) => {
  return coach ? (
    <Modal
      isOpen={!!coach}
      close={onClose}
      classNameModal={styles.profile_coach_modal}
    >
      <div className={styles.profile_coach_content}>
        {coach.mainImage ? (
          <img
            src={coach.mainImage.url}
            alt=""
            className={styles.profile_coach_img}
          />
        ) : (
          <Avatar className={styles.profile_stub_img} />
        )}
        <span className={styles.profile_name}>{coach.name}</span>
        <span className={styles.promo_area}>{coach.promo}</span>
      </div>
    </Modal>
  ) : null;
};
