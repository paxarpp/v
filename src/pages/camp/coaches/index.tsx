import { useState } from 'react';
import { useLoaderData } from 'react-router';
import { ICoach } from '../../shortCamps/interfaces';
import { CoachProfile } from '../../../templates/coachProfile';
import { Route } from '../+types';
import { createImageUrl } from '../../../constants';
import styles from '../index.module.css';

export const Coaches = () => {
  const { camp } = useLoaderData<Route.ComponentProps['loaderData']>();
  const [coachProfile, setCoach] = useState<ICoach | null>(null);

  const closeCoach = () => {
    setCoach(null);
  };

  const openProfile = (coach: ICoach) => {
    setCoach(coach);
  };

  return (
    <div className={styles.column}>
      <CoachProfile coach={coachProfile} onClose={closeCoach} />
      <h2 className={styles.camp_info_title}>Тренерский состав кемпа</h2>
      <div className={styles.package_row}>
        {camp?.coaches.map((coach) => {
          return (
            <div key={coach.id} className={styles.coach_card}>
              <img
                src={createImageUrl(coach.mainImage?.url)}
                alt={coach.name}
                className={styles.coach_img}
              />

              <h2>{coach.name}</h2>
              <ul className={styles.coach_infos}>
                {coach.infos.map((info) => (
                  <li key={info}>{info}</li>
                ))}
              </ul>
              <div className={styles.coach_card_footer}>
                <button
                  className={styles.button_profile}
                  onClick={() => openProfile(coach)}
                >
                  Профайл
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
