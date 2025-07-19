import { useLoaderData } from 'react-router';
import { Route } from '../+types';
import { useDeviceDetect } from '../../../hooks';
import { UniversalScroller } from '../../../templates/UniversalScroller';
import { CampCard } from '../../../templates/CampCard';
import styles from '../index.module.css';

export const PastCamps = () => {
  const { user } = useLoaderData<Route.ComponentProps['loaderData']>();
  const { isMobile } = useDeviceDetect();

  return user?.isAdmin ? null : (
    <div className={isMobile ? styles.camps_wrap_mobi : styles.camps_wrap}>
      <h2 className={isMobile ? styles.camps_header_mobi : styles.camps_header}>
        {'Мои прошедшие кемпы'}
      </h2>
      <UniversalScroller
        list={user?.pastCamps || []}
        renderItem={(camp) => (
          <CampCard
            key={camp.id}
            id={camp.id}
            name={camp.name}
            dateString={camp.dateString}
            url={camp.imageCart?.url}
            isMobile={isMobile}
            to={'/camps/past/'}
          />
        )}
      />
    </div>
  );
};
