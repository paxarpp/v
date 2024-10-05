import { useLoaderData } from "react-router-dom";
import { ICoach } from "../interfaces";
import { baseSrc } from "../../../constants";
import { ErrorLocal } from "../../../templates/errorLocal";
import styles from '../index.module.css';


export const CoachesList: React.FC = () => {
  const { main } = useLoaderData() as {
    main: {
      coaches: ICoach[]
      error?: string;
    }
  };

  return main.error ? (<ErrorLocal error={main.error} />) : (
    <div className={styles.coaches_list}>
      {main.coaches.map((coach) => {
        return (
          <div key={coach.id} className={styles.coach_card}>
            <img src={`${baseSrc}${coach.mainImage.data}`} alt={coach.name} className={styles.coach_img} />
            <h2>{coach.name} {coach.surename}</h2>
            <ul className={styles.coach_infos}>
              {coach.infos.map((info, i) => {
                return (
                <li key={i}>{info}</li>
              )
              })}
            </ul>
          </div>
        );
    })}
  </div>);
};