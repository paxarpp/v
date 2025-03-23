import { useState } from 'react';
import { useLoaderData, useRevalidator } from 'react-router';
import { ICoach } from '../interfaces';
import { useUser } from '../../../context';
import Setting from '../../../assets/setting.svg?react';
import RoundAdd from '../../../assets/roundAdd.svg?react';
import Avatar from '../../../assets/avatar.svg?react';
import Eye from '../../../assets/eye_enabled.svg?react';
import EyeDisabled from '../../../assets/eye_disabled.svg?react';
import { CoachEdit } from '../coachEdit';
import { CoachProfile } from '../../../templates/coachProfile';
import { Route } from '../+types';
import { creatorRequest } from '../../../api';
import { api } from '../../../api/api';
import { createImageUrl } from '../../../constants';
import styles from '../index.module.css';

export const CoachesList: React.FC = () => {
  const { isAdmin, logout } = useUser();
  const [coachProfile, setCoach] = useState<ICoach | null>(null);
  const [editCoachId, setEditCoachId] = useState<string | null>(null);
  const [open, setIsOpen] = useState<boolean>(false);

  const revalidator = useRevalidator();

  const closeCoach = () => {
    setCoach(null);
  };
  const closeCoachEdit = () => {
    setEditCoachId(null);
    setIsOpen(false);
  };

  const toggleVisible = (coach: ICoach) => {
    const saveVisible = async () => {
      const axiosCall = creatorRequest(logout);
      const { error } = await axiosCall(api.updateCoachVisible(coach));
      if (!error) {
        revalidator.revalidate();
      }
    };
    saveVisible();
  };

  return (
    <div className={styles.coaches_list}>
      <CoachEdit coachId={editCoachId} onClose={closeCoachEdit} open={open} />
      <CoachProfile coach={coachProfile} onClose={closeCoach} />
      <CoachesTemplate
        isAdmin={isAdmin}
        setCoach={setCoach}
        setEditCoachId={setEditCoachId}
        setIsOpen={setIsOpen}
        toggleVisible={toggleVisible}
      />
    </div>
  );
};

const CoachesTemplate: React.FC<{
  isAdmin: boolean;
  setCoach: (coach: ICoach | null) => void;
  setEditCoachId: (id: string) => void;
  setIsOpen: (open: boolean) => void;
  toggleVisible: (coach: ICoach) => void;
}> = ({ isAdmin, setCoach, setEditCoachId, setIsOpen, toggleVisible }) => {
  const { coaches } = useLoaderData<Route.ComponentProps['loaderData']>();

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
      {coaches?.map((coach) => {
        return (
          <div key={coach.id} className={styles.coach_card}>
            {coach.mainImage?.url ? (
              <img
                src={createImageUrl(coach.mainImage.url)}
                alt={coach.name}
                className={styles.coach_img}
              />
            ) : (
              <Avatar className={styles.coach_img} />
            )}
            <p className={styles.coach_name}>{coach.name}</p>
            <ul className={styles.coach_infos}>
              {coach.infos.map((info) => (
                <li key={info} className={styles.coach_info_item}>{info}</li>
              ))}
            </ul>
            <div className={styles.coach_card_footer}>
              <span
                className={styles.message_profile}
                onClick={() => openProfile(coach)}
              >
                Профайл
              </span>
              {isAdmin ? (
                <>
                  {coach.isVisible ? (
                    <Eye
                      onClick={() => toggleVisible(coach)}
                      className={styles.coach_visible}
                    />
                  ) : (
                    <EyeDisabled
                      onClick={() => toggleVisible(coach)}
                      className={styles.coach_visible}
                    />
                  )}
                </>
              ) : null}
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
