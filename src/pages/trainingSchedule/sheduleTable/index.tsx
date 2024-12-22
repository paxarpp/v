import { useState } from 'react';
import { useLoaderData } from 'react-router';
import RoundAdd from '../../../assets/roundAdd.svg?react';
import Setting from '../../../assets/setting.svg?react';
import { Days } from './days';
import { Route } from '../+types';
import { useUser } from '../../../context';
import { TreinEdit } from '../treinEdit';
import styles from '../index.module.css';

export const weekDays = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
] as const;

export const SheduleTable = () => {
  const { isAdmin } = useUser();
  const [open, setIsOpen] = useState<boolean>(false);
  const [editTreinId, setEditTreinId] = useState<string | null>(null);

  const closeTreinEdit = () => {
    setEditTreinId(null);
    setIsOpen(false);
  };

  return (
    <div className={styles.shedule_table}>
      <Days />
      {open ? (
        <TreinEdit treinId={editTreinId} onClose={closeTreinEdit} />
      ) : null}
      <SheduleeTemplate
        isAdmin={isAdmin}
        setIsOpen={setIsOpen}
        setEditTreinId={setEditTreinId}
      />
    </div>
  );
};

const SheduleeTemplate: React.FC<{
  isAdmin: boolean;
  setIsOpen: (open: boolean) => void;
  setEditTreinId: (id: string) => void;
}> = ({ isAdmin, setIsOpen, setEditTreinId }) => {
  const { trainingShedule } =
    useLoaderData<Route.ComponentProps['loaderData']>();

  const openEditTrein = (id: string) => {
    setEditTreinId(id);
    setIsOpen(true);
  };

  const addTrein = () => {
    setIsOpen(true);
  };

  return (
    <>
      {trainingShedule?.map((group) => {
        return (
          <div key={group.id} className={styles.group}>
            <div className={styles.group_name}>
              {group.name}
              {isAdmin ? (
                <Setting
                  onClick={() => openEditTrein(group.id as string)}
                  className={styles.setting_shedule}
                />
              ) : null}
            </div>
            {weekDays.map((dayName) => {
              const day = group.days.find((d) => d.id === dayName);
              return day ? (
                <div key={group.id + day.id} className={styles.group_day}>
                  <span>{day.time}</span>
                  <span>{day.address}</span>
                </div>
              ) : (
                <div key={group.id + dayName} className={styles.group_day}>
                  <div className={styles.empty_day} />
                </div>
              );
            })}
          </div>
        );
      })}
      {isAdmin ? (
        <div className={styles.shedule_card_add}>
          <RoundAdd onClick={addTrein} className={styles.shedule_round} />
        </div>
      ) : null}
    </>
  );
};
