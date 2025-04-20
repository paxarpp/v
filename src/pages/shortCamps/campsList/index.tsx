import { useState } from 'react';
import { useLoaderData } from 'react-router';
import RoundAdd from '../../../assets/roundAdd.svg?react';
import { useUser } from '../../../context';
import { CampEdit } from '../campEdit';
import { Route } from '../+types';
import { CampCard } from '../../../templates/CampCard';
import { useDeviceDetect } from '../../../hooks';
import styles from '../index.module.css';

export const CampsList = () => {
  const { isAdmin } = useUser();
  const { isMobile } = useDeviceDetect();
  const [open, setIsOpen] = useState<boolean>(false);
  const [editCampId, setEditCampId] = useState<string | null>(null);

  const closeCampEdit = () => {
    setEditCampId(null);
    setIsOpen(false);
  };

  return (
    <div className={isMobile ? styles.camp_list_mobi : styles.camp_list}>
      {open ? <CampEdit campId={editCampId} onClose={closeCampEdit} /> : null}
      <CampsTemplate
        isAdmin={isAdmin}
        setIsOpen={setIsOpen}
        setEditCampId={setEditCampId}
        isMobile={isMobile}
      />
    </div>
  );
};

const CampsTemplate: React.FC<{
  isAdmin: boolean;
  isMobile: boolean;
  setIsOpen: (open: boolean) => void;
  setEditCampId: (id: string) => void;
}> = ({ isAdmin, setIsOpen, setEditCampId, isMobile }) => {
  const { shortCamps } = useLoaderData<Route.ComponentProps['loaderData']>();

  const openEditCamp = (id: string) => {
    setEditCampId(id);
    setIsOpen(true);
  };

  const addShortCamp = () => {
    setIsOpen(true);
  };

  return (
    <>
      {shortCamps?.map((item) => {
        return (
          <CampCard
            key={item.id}
            id={item.id}
            name={item.name}
            dateString={item.dateString || ''}
            url={item.imageCart?.url}
            isAdmin={isAdmin}
            openEditCamp={openEditCamp}
            isMobile={isMobile}
          />
        );
      })}
      {isAdmin ? (
        <div className={styles.camp_card_add}>
          <RoundAdd onClick={addShortCamp} />
        </div>
      ) : null}
    </>
  );
};
