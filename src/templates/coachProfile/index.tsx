import Avatar from '../../assets/avatar.svg?react';
import { createImageUrl } from '../../constants';
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
  isMobile: boolean;
}> = ({ coach, onClose, isMobile }) => {
  return coach ? (
    <div className={styles.profile_coach_content} onClick={onClose}>
      {coach.mainImage ? (
        <img
          src={createImageUrl(coach.mainImage.url)}
          alt=""
          className={
            isMobile ? styles.profile_coach_img_mobi : styles.profile_coach_img
          }
        />
      ) : (
        <Avatar className={styles.profile_stub_img} />
      )}
      <span
        className={isMobile ? styles.profile_name_mobi : styles.profile_name}
      >
        {coach.name}
      </span>
      <span className={isMobile ? styles.promo_area_mobi : styles.promo_area}>
        {coach.promo}
      </span>
    </div>
  ) : null;
};
