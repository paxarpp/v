import { useState, Suspense } from 'react';
import { Link, useLoaderData, Await, useAsyncValue } from 'react-router-dom';
import { useUser } from '../../../context';
import { ErrorLocal } from '../../../templates/errorLocal';
import RoundAdd from '../../../assets/roundAdd.svg?react';
import { ICampItem } from '../interfaces';
import { CampPastAdd } from '../campPastAdd';
import styles from '../index.module.css';

export const CampsList = () => {
  const { pastCamps, error } = useLoaderData() as {
    pastCamps: ICampItem[];
    error?: string;
  };
  const { isAdmin } = useUser();
  const [open, setIsOpen] = useState<boolean>(false);

  const closeCampAdd = () => {
    setIsOpen(false);
  };

  const addPastCamp = () => {
    setIsOpen(true);
  };

  return error ? (
    <ErrorLocal error={error} />
  ) : (
    <div className={styles.camp_list}>
      {open ? <CampPastAdd onClose={closeCampAdd} /> : null}
      <Suspense fallback={'Загрузка...'}>
        <Await resolve={pastCamps}>
          <CampsTemplate isAdmin={isAdmin} addPastCamp={addPastCamp} />
        </Await>
      </Suspense>
    </div>
  );
};

const CampsTemplate: React.FC<{
  isAdmin: boolean;
  addPastCamp: () => void;
}> = ({ isAdmin, addPastCamp }) => {
  const { pastCamps } = useAsyncValue() as {
    pastCamps: ICampItem[];
  };

  return (
    <>
      {pastCamps.map((camp) => {
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
            </div>
          </div>
        );
      })}
      {isAdmin ? (
        <div className={styles.camp_card_add}>
          <RoundAdd onClick={addPastCamp} />
        </div>
      ) : null}
    </>
  );
};
