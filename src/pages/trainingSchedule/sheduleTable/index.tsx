import { useState } from 'react';
import { useLoaderData } from 'react-router';
import Setting from '../../../assets/setting.svg?react';
import TGLink from '../../../assets/tgLink.svg?react';
import Ball from '../../../assets/ball.svg?react';
import { Days } from './days';
import { Route } from '../+types';
import { useUser } from '../../../context';
import { TreinEdit } from '../treinEdit';
import { createLinkTg } from '../../../constants';
import { MobileTemplate } from './mobileTemplate';
import { useDeviceDetect } from '../../../hooks';
import { weekDays } from './const';
import { CardAdd } from '../../../templates/CardAdd';
import styles from '../index.module.css';

export const SheduleTable = () => {
  const { isAdmin } = useUser();
  const { isMobile } = useDeviceDetect();
  const [open, setIsOpen] = useState<boolean>(false);
  const [editTreinId, setEditTreinId] = useState<string | null>(null);

  const closeTreinEdit = () => {
    setEditTreinId(null);
    setIsOpen(false);
  };

  return isMobile ? (
    <MobileTemplate />
  ) : (
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
  const { isMobile } = useDeviceDetect();

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
                  <a href={createLinkTg(group.link)} target={'_blank'}>
                    <TGLink className={styles.tg_link} />
                  </a>
                </div>
              ) : (
                <div
                  key={group.id + dayName}
                  className={styles.group_day_empty}
                >
                  <div className={styles.empty_day}>
                    <Ball />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
      <CardAdd
        show={isAdmin}
        isMobile={isMobile}
        onClick={addTrein}
        sizes={sizes}
      />
    </>
  );
};

const sizes = {
  mobile: {
    height: 163,
    width: 335,
  },
  desktop: {
    height: 160,
    width: 270,
  },
};
