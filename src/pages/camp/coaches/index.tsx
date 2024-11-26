import { useAsyncValue } from 'react-router-dom';
import { ICampItem } from '../../shortCamps/interfaces';
import styles from '../index.module.css';

export const Coaches = () => {
  const { camp } = useAsyncValue() as {
    camp: ICampItem;
  };

  return (
    <div className={styles.package_row}>
      {camp.coaches.map((coach) => {
        return (
          <div key={coach.id} className={styles.coach_card}>
            <img
              src={coach.mainImage.url}
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
                // onClick={() => openProfile(coach)}
              >
                Профайл
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
