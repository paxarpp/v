import { useState, Suspense } from 'react';
import { useLoaderData, Await, useAsyncValue } from 'react-router-dom';
import { useUser } from '../../../context';
import { ErrorLocal } from '../../../templates/errorLocal';
import { IShortCamp } from '../interfaces';
import { CampEdit } from '../campEdit';
import styles from '../index.module.css';

export const CampsList = () => {
  const { shortCamps, error } = useLoaderData() as {
    shortCamps: IShortCamp[];
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
          <CampsTemplate isAdmin={isAdmin} setIsOpen={setIsOpen} />
        </Await>
      </Suspense>
    </div>
  );
};

const CampsTemplate: React.FC<{
  isAdmin: boolean;
  setIsOpen: (open: boolean) => void;
}> = ({ isAdmin, setIsOpen }) => {
  const { shortCamps } = useAsyncValue() as {
    shortCamps: IShortCamp[];
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
                {camp.dateStart}-{camp.dateEnd}
              </h2>
              <span>{camp.name}</span>
            </div>
            <div>тут картинка</div>
            <div>
              <button>Подробнее</button>
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
