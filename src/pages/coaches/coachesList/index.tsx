import { Suspense, useState } from 'react';
import { Await, useAsyncValue, useLoaderData } from 'react-router-dom';
import { ICoach } from '../interfaces';
import { ErrorLocal } from '../../../templates/errorLocal';
import { useUser } from '../../../context';
import Setting from '../../../assets/setting.svg?react';
import RoundAdd from '../../../assets/roundAdd.svg?react';
import Avatar from '../../../assets/avatar.svg?react';
import { CoachEdit } from '../coachEdit';
import { CoachProfile } from '../../../templates/coachProfile';
import styles from '../index.module.css';

export const CoachesList: React.FC = () => {
  const { coaches, error } = useLoaderData() as {
    coaches: ICoach[];
    error?: string;
  };
  const { isAdmin } = useUser();
  const [coachProfile, setCoach] = useState<ICoach | null>(null);
  const [editCoachId, setEditCoachId] = useState<string | null>(null);
  const [open, setIsOpen] = useState<boolean>(false);

  const closeCoach = () => {
    setCoach(null);
  };
  const closeCoachEdit = () => {
    setEditCoachId(null);
    setIsOpen(false);
  };

  return error ? (
    <ErrorLocal error={error} />
  ) : (
    <div className={styles.coaches_list}>
      <CoachEdit coachId={editCoachId} onClose={closeCoachEdit} open={open} />
      <CoachProfile coach={coachProfile} onClose={closeCoach} />
      <Suspense fallback={<CoachesSkeleton />}>
        <Await resolve={coaches}>
          <CoachesTemplate
            isAdmin={isAdmin}
            setCoach={setCoach}
            setEditCoachId={setEditCoachId}
            setIsOpen={setIsOpen}
          />
        </Await>
      </Suspense>
    </div>
  );
};

const CoachesSkeleton = () => {
  return (
    <div className={styles.coach_card_add}>
      <span className={styles.coach_add}>
        <Avatar />
      </span>
    </div>
  );
};

const CoachesTemplate: React.FC<{
  isAdmin: boolean;
  setCoach: (coach: ICoach | null) => void;
  setEditCoachId: (id: string) => void;
  setIsOpen: (open: boolean) => void;
}> = ({ isAdmin, setCoach, setEditCoachId, setIsOpen }) => {
  const { coaches } = useAsyncValue() as {
    coaches: ICoach[];
  };

  const openProfile = (coach: ICoach) => {
    setCoach(coach);
  };

  const openEditCoach = (id: string) => {
    setEditCoachId(id);
    setIsOpen(true);
  };

  const addCoach = () => {
    setIsOpen(true);
  };

  return (
    <>
      {coaches.map((coach) => {
        return (
          <div key={coach.id} className={styles.coach_card}>
            {coach.mainImage?.url ? (
              <img
                src={coach.mainImage.url}
                alt={coach.name}
                className={styles.coach_img}
              />
            ) : (
              <Avatar className={styles.coach_img} />
            )}
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
              {isAdmin ? (
                <Setting onClick={() => openEditCoach(coach.id)} />
              ) : null}
            </div>
          </div>
        );
      })}
      {isAdmin ? (
        <div className={styles.coach_card_add}>
          <RoundAdd onClick={addCoach} />
        </div>
      ) : null}
    </>
  );
};
