import { useState, Suspense } from 'react';
import { Link, useLoaderData, Await, useAsyncValue } from 'react-router-dom';
import Setting from '../../../assets/setting.svg?react';
import RoundAdd from '../../../assets/roundAdd.svg?react';
import { useUser } from '../../../context';
import { ErrorLocal } from '../../../templates/errorLocal';
import { ICampItem } from '../interfaces';
import { CampEdit } from '../campEdit';
import styles from '../index.module.css';

export const CampsList = () => {
  const { shortCamps, error } = useLoaderData() as {
    shortCamps: ICampItem[];
    error?: string;
  };
  const { isAdmin } = useUser();
  const [open, setIsOpen] = useState<boolean>(false);
  const [editCampId, setEditCampId] = useState<string | null>(null);

  const closeCampEdit = () => {
    setEditCampId(null);
    setIsOpen(false);
  };

  return error ? (
    <ErrorLocal error={error} />
  ) : (
    <div className={styles.camp_list}>
      {open ? <CampEdit campId={editCampId} onClose={closeCampEdit} /> : null}
      <Suspense fallback={'Загрузка...'}>
        <Await resolve={shortCamps}>
          <CampsTemplate
            isAdmin={isAdmin}
            setIsOpen={setIsOpen}
            setEditCampId={setEditCampId}
          />
        </Await>
      </Suspense>
    </div>
  );
};

const CampsTemplate: React.FC<{
  isAdmin: boolean;
  setIsOpen: (open: boolean) => void;
  setEditCampId: (id: string) => void;
}> = ({ isAdmin, setIsOpen, setEditCampId }) => {
  const { shortCamps } = useAsyncValue() as {
    shortCamps: ICampItem[];
  };

  const openEditCamp = (id: string) => {
    setEditCampId(id);
    setIsOpen(true);
  };

  const addShortCamp = () => {
    setIsOpen(true);
  };

  return (
    <>
      {shortCamps.map((camp) => {
        return (
          <div key={camp.id} className={styles.camp_card}>
            <div>
              <h2>
                {camp.dateString
                  ? camp.dateString
                  : `${camp.dateStart}-${camp.dateEnd}`}
              </h2>
              <span>{camp.name}</span>
            </div>
            <div className={styles.camp_image_wrapper}>
              <img
                src={camp.imageCart?.url}
                alt={camp.name}
                className={styles.camp_img}
              />
            </div>
            <div>
              <Link to={`/camps/${camp.id}`} className={styles.button_profile}>
                Подробнее
              </Link>
              {isAdmin ? (
                <Setting
                  onClick={() => openEditCamp(camp.id)}
                  className={styles.setting_camp}
                />
              ) : null}
            </div>
          </div>
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
