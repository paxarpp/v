import { Suspense, useContext, useState } from 'react';
import { Await, useAsyncValue, useLoaderData } from 'react-router-dom';
import { ICoach } from '../interfaces';
import { baseSrc } from '../../../constants';
import { ErrorLocal } from '../../../templates/errorLocal';
import { AuthContext } from '../../../context';
import Setting from '../../../assets/setting.svg?react';
import Avatar from '../../../assets/avatar.svg?react';
import { CoachEdit } from '../coachEdit';
import { CoachProfile } from '../coachProfile';
import styles from '../index.module.css';

export const CoachesList: React.FC = () => {
  const { coaches, error } = useLoaderData() as {
    coaches: ICoach[];
    error?: string;
  };
  const authCtx = useContext(AuthContext);
  const isAdmin = !!authCtx.user?.roles.includes('ADMIN');
  const [coachProfile, setCoach] = useState<ICoach | null>(null);
  const [editCoachId, setEditCoachId] = useState<string | null>(null);
  const [openRank, setIsOpen] = useState<number | null>(null);

  const closeCoach = () => {
    setCoach(null);
  };
  const closeCoachEdit = () => {
    setEditCoachId(null);
    setIsOpen(null);
  };

  return error ? (
    <ErrorLocal error={error} />
  ) : (
    <div className={styles.coaches_list}>
      <CoachEdit
        coachId={editCoachId}
        onClose={closeCoachEdit}
        openRank={openRank}
      />
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
  setIsOpen: (rank: number) => void;
}> = ({ isAdmin, setCoach, setEditCoachId, setIsOpen }) => {
  const { coaches } = useAsyncValue() as {
    coaches: ICoach[];
  };

  const openProfile = (coach: ICoach) => {
    setCoach(coach);
  };

  const openEditCoach = (id: string, rank: number) => {
    setEditCoachId(id);
    setIsOpen(rank);
  };

  const addCoach = (rank: number) => {
    setIsOpen(rank);
  };

  const coachesByRank = coaches.reduce((acc, coach, index) => {
    if (index === 0) {
      acc.push([coach]);
    } else if (index === 1) {
      acc.push([coach]);
    } else if (index === 2) {
      acc[1].push(coach);
    } else {
      acc[2].push(coach);
    }
    return acc;
  }, [] as ICoach[][]);

  return (
    <>
      {coachesByRank.map((coaches, rank) => {
        return (
          <div className={styles.coaches_row_rank}>
            {coaches.map((coach) => {
              return (
                <div key={coach.id} className={styles.coach_card}>
                  {coach.mainImage?.data ? (
                    <img
                      src={`${baseSrc(coach.mainImage.contentType)}${coach.mainImage.data}`}
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
                      <Setting onClick={() => openEditCoach(coach.id, rank)} />
                    ) : null}
                  </div>
                </div>
              );
            })}
            {isAdmin ? (
              <div className={styles.coach_card_add}>
                <span
                  className={styles.coach_add}
                  onClick={() => addCoach(rank)}
                >
                  +
                </span>
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
};
