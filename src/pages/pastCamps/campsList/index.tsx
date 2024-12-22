import { useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { useUser } from '../../../context';
import RoundAdd from '../../../assets/roundAdd.svg?react';
import { CampPastAdd } from '../campPastAdd';
import { Route } from '../+types';
import styles from '../index.module.css';

export const CampsList = () => {
  const { isAdmin } = useUser();
  const [open, setIsOpen] = useState<boolean>(false);

  const closeCampAdd = () => {
    setIsOpen(false);
  };

  const addPastCamp = () => {
    setIsOpen(true);
  };

  return (
    <div className={styles.camp_list}>
      {open ? <CampPastAdd onClose={closeCampAdd} /> : null}
      <CampsTemplate isAdmin={isAdmin} addPastCamp={addPastCamp} />
    </div>
  );
};

const CampsTemplate: React.FC<{
  isAdmin: boolean;
  addPastCamp: () => void;
}> = ({ isAdmin, addPastCamp }) => {
  const { pastCamps } = useLoaderData<Route.ComponentProps['loaderData']>();

  return (
    <>
      {pastCamps?.map((camp) => {
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
