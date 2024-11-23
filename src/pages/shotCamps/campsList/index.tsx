import { useState, Suspense } from 'react';
import { Link, useLoaderData, Await, useAsyncValue } from 'react-router-dom';
import Setting from '../../../assets/setting.svg?react';
import { useUser } from '../../../context';
import { ErrorLocal } from '../../../templates/errorLocal';
import { ICampItem } from '../interfaces';
import { CampEdit } from '../campEdit';
import { baseSrc } from '../../../constants';
import styles from '../index.module.css';

export const CampsList = () => {
  const { shortCamps, error } = useLoaderData() as {
    shortCamps: ICampItem[];
    error?: string;
  };
  const { user } = useUser();
  const isAdmin = !!user?.roles.includes('ADMIN');
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
      <CampEdit campId={editCampId} onClose={closeCampEdit} open={open} />
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
              {camp.imageCart ? (
                <img
                  src={`${baseSrc(camp.imageCart?.contentType)}${camp.imageCart.data}`}
                  alt={camp.name}
                  className={styles.camp_img}
                />
              ) : (
                'тут картинка'
              )}
            </div>
            <div>
              <Link to={`/camps/${camp.id}`} className={styles.button_profile}>
                Подробнее
              </Link>
              {isAdmin ? (
                <Setting onClick={() => openEditCamp(camp.id)} />
              ) : null}
            </div>
          </div>
        );
      })}
      {isAdmin ? (
        <div className={styles.camp_card_add}>
          <span className={styles.camp_add} onClick={addShortCamp}>
            +
          </span>
        </div>
      ) : null}
    </>
  );
};
