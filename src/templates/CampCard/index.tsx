import { Link } from 'react-router';
import { createImageUrl } from '../../constants';
import Setting from '../../assets/setting.svg?react';
import styles from './index.module.css';

interface IProps {
  id: string;
  dateString?: string;
  name?: string;
  url?: string;
  to?: string;

  isMobile?: boolean;
  isAdmin?: boolean;
  openEditCamp?: (id: string) => void;
}

export const CampCard: React.FC<IProps> = ({
  id,
  dateString,
  name,
  url,
  to = '/camps/',
  isMobile,
  isAdmin,
  openEditCamp,
}) => {
  return (
    <div className={isMobile ? styles.camp_card_mobi : styles.camp_card}>
      <p
        className={
          isMobile ? styles.camp_card_title_mobi : styles.camp_card_title
        }
      >
        {dateString}
      </p>
      <p
        className={
          isMobile ? styles.camp_card_subtitle_mobi : styles.camp_card_subtitle
        }
      >
        {name}
      </p>
      <div
        className={isMobile ? styles.camp_img_wrap_mobi : styles.camp_img_wrap}
      >
        <img
          src={createImageUrl(url)}
          alt="картинка кемпа"
          className={isMobile ? styles.camp_img_mobi : styles.camp_img}
        />
      </div>
      <div className={styles.camp_info}>
        <Link
          to={`${to}${id}`}
          className={isMobile ? styles.button_camp_mobi : styles.button_camp}
        >
          Подробнее
        </Link>
        {isAdmin && openEditCamp ? (
          <Setting
            onClick={() => openEditCamp(id)}
            className={styles.setting_camp}
          />
        ) : null}
      </div>
    </div>
  );
};
