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
  isFullscreen?: boolean;
  openEditCamp?: (id: string) => void;
  toggleFullScreen?: () => void;
}

export const CampCard: React.FC<IProps> = ({
  id,
  dateString,
  name,
  url,
  to = '/camps/',
  isMobile,
  isAdmin,
  isFullscreen,
  openEditCamp,
  toggleFullScreen,
}) => {
  return (
    <div
      className={
        isFullscreen
          ? styles.fullScreenCard
          : isMobile
            ? styles.camp_card_mobi
            : styles.camp_card
      }
    >
      {!isFullscreen && (
        <>
          <p
            className={
              isMobile ? styles.camp_card_title_mobi : styles.camp_card_title
            }
          >
            {dateString}
          </p>
          <p
            className={
              isMobile
                ? styles.camp_card_subtitle_mobi
                : styles.camp_card_subtitle
            }
          >
            {name}
          </p>
        </>
      )}

      <div
        className={
          isFullscreen
            ? styles.fullScreenImgWrap
            : isMobile
              ? styles.camp_img_wrap_mobi
              : styles.camp_img_wrap
        }
        onClick={toggleFullScreen}
      >
        <img
          src={createImageUrl(url)}
          alt="картинка кемпа"
          className={
            isFullscreen
              ? styles.fullScreenImg
              : isMobile
                ? styles.camp_img_mobi
                : styles.camp_img
          }
        />
      </div>

      {!isFullscreen && (
        <div className={styles.camp_info}>
          <Link
            to={`${to}${id}`}
            className={isMobile ? styles.button_camp_mobi : styles.button_camp}
          >
            Подробнее
          </Link>
          {isAdmin && openEditCamp && (
            <Setting
              onClick={() => openEditCamp(id)}
              className={styles.setting_camp}
            />
          )}
        </div>
      )}
    </div>
  );
};
