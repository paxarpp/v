import { useLoaderData } from 'react-router';
import { Route } from '../+types';
import { CampCard } from '../../../templates/CampCard';
import { useDeviceDetect } from '../../../hooks';
import styles from '../index.module.css';

export const CampsList = () => {
  const { pastCamps } = useLoaderData<Route.ComponentProps['loaderData']>();
  const { isMobile } = useDeviceDetect();
  return (
    <div className={isMobile ? styles.camp_list_mobi : styles.camp_list}>
      {pastCamps?.map((item) => {
        return (
          <CampCard
            key={item.id}
            id={item.id}
            name={item.name}
            dateString={item.dateString || ''}
            url={item.imageCart?.url}
            to={'/camps/past/'}
            isMobile={isMobile}
          />
        );
      })}
    </div>
  );
};
