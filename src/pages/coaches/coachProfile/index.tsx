import { Modal } from '../../../templates/modal';
import { ICoach } from '../interfaces';
import Avatar from '../../../assets/avatar.svg?react';
import styles from '../index.module.css';

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
