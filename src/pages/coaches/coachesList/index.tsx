import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ICoach } from "../interfaces";
import { baseSrc } from "../../../constants";
import { ErrorLocal } from "../../../templates/errorLocal";
import { AuthContext } from "../../../context";
import PencilIcon from '../../../assets/pencil.svg?react';
import { CoachEdit } from "../coachEdit";
import styles from '../index.module.css';


export const CoachesList: React.FC = () => {
  const { main } = useLoaderData() as {
    main: {
      coaches: ICoach[]
      error?: string;
    }
  };
  const authCtx = useContext(AuthContext);
  const isAdmin = !!authCtx.user?.roles.includes('ADMIN');
  const [coachId, setCoachId] = useState<string | null>(null);
  const [editCoachId, setEditCoachId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openProfile = (id: string) => {
    setCoachId(id);
  };

  const openEditCoach = (id: string) => {
    setEditCoachId(id);
    setIsOpen(true);
  };

  const closeCoach = () => {
    setCoachId(null);
  };  
  const closeCoachEdit = () => {
    setEditCoachId(null);
    setIsOpen(false);
  };

  const addCoach = () => {
    setIsOpen(true);
  }

  return main.error ? (<ErrorLocal error={main.error} />) : (
    <div className={styles.coaches_list}>
      <CoachEdit coachId={editCoachId} onClose={closeCoachEdit} isOpen={isOpen} />
      {main.coaches.map((coach) => {
        return (
          <div key={coach.id} className={styles.coach_card}>
            <img src={`${baseSrc}${coach.mainImage?.data}`} alt={coach.name} className={styles.coach_img} />
            <h2>{coach.name}</h2>
            <ul className={styles.coach_infos}>
              {coach.infos.map((info) => <li key={info}>{info}</li>)}
            </ul>
            <div className={styles.coach_card_footer}>
              <button className={styles.button_profile} onClick={() => openProfile(coach.id)}>
                Профайл
              </button>
              {isAdmin ? (
                <PencilIcon onClick={() => openEditCoach(coach.id)} />
              ) : null}
            </div>
          </div>
        );
      })}
      {isAdmin ? (
        <div className={styles.coach_card_add}>
          <span className={styles.coach_add} onClick={addCoach}>
            +
          </span>
        </div>
      ) : null}
    </div>);
};