import { useState } from 'react';
import { useLoaderData } from 'react-router';
import { ICoach } from '../../shortCamps/interfaces';
import { CoachProfile } from '../../../templates/coachProfile';
import { Route } from '../+types';
import { createImageUrl } from '../../../constants';
import { useDeviceDetect } from '../../../hooks';
import styles from '../index.module.css';

export const Coaches = () => {
  const { camp } = useLoaderData<Route.ComponentProps['loaderData']>();
  const { isMobile } = useDeviceDetect();
  const [coachProfile, setCoach] = useState<ICoach | null>(null);

  const closeCoach = () => {
    setCoach(null);
  };

  const openProfile = (coach: ICoach) => {
    setCoach(coach);
  };

  return (
    <div className={styles.column}>
      <h2 className={styles.camp_info_title}>Тренерский состав кемпа</h2>
      <div className={styles.package_row}>
        {camp?.coaches.map((coach) => {
          return coachProfile?.id === coach.id ? (
            <div
              key={coach.id}
              className={isMobile ? styles.coach_card_mobi : styles.coach_card}
            >
              <CoachProfile
                coach={coachProfile}
                onClose={closeCoach}
                isMobile={isMobile}
              />
            </div>
          ) : (
            <div
              key={coach.id}
              className={isMobile ? styles.coach_card_mobi : styles.coach_card}
            >
              <img
                src={createImageUrl(coach.mainImage?.url)}
                alt={coach.name}
                className={isMobile ? styles.coach_img_mobi : styles.coach_img}
              />

              <p
                className={
                  isMobile ? styles.coach_name_mobi : styles.coach_name
                }
              >
                {coach.name}
              </p>
              <ul className={styles.coach_infos}>
                {coach.infos.map((info) => (
                  <li
                    key={info}
                    className={
                      isMobile
                        ? styles.coach_info_item_mobi
                        : styles.coach_info_item
                    }
                  >
                    {info}
                  </li>
                ))}
              </ul>
              <div className={styles.coach_card_footer}>
                <span
                  className={
                    isMobile
                      ? styles.message_profile_mobi
                      : styles.message_profile
                  }
                  onClick={() => openProfile(coach)}
                >
                  Профайл
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
