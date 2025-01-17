import { Link, useLoaderData } from 'react-router';
import { Route } from '../+types';
import { createImageUrl } from '../../../constants';
import styles from '../index.module.css';

export const CampsList = () => {
  const { pastCamps } = useLoaderData<Route.ComponentProps['loaderData']>();
  return (
    <div className={styles.camp_list}>
      {pastCamps?.map((camp) => {
        return (
          <div key={camp.id} className={styles.camp_card}>
            <div>
              <h2>{camp.dateString}</h2>
              <span>{camp.name}</span>
            </div>
            <div className={styles.camp_image_wrapper}>
              <img
                src={createImageUrl(camp.imageCart?.url)}
                alt={camp.name}
                className={styles.camp_img}
              />
            </div>
            <div>
              <Link to={`/camps/past/${camp.id}`} className={styles.button}>
                Подробнее
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};
