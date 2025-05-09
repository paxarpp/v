import { useLoaderData } from 'react-router';
import { Route } from '../+types';
import { useDeviceDetect } from '../../../hooks';
import { CampsMobileScroller } from '../../../templates/CampMobileScroller';
import styles from '../index.module.css';

export const PastCamps = () => {
  const { user } = useLoaderData<Route.ComponentProps['loaderData']>();
  const { isMobile } = useDeviceDetect();

  return user?.isAdmin ? null : (
    <div className={isMobile ? styles.camps_wrap_mobi : ''}>
      <h2 className={isMobile ? styles.camps_header_mobi : ''}>
        {'Мои прошедшие кемпы'}
      </h2>
      <div className={isMobile ? styles.camps_scroller_mobi : ''}>
        <CampsMobileScroller
          list={user?.pastCamps || []}
          isMobile={isMobile}
          to={'/camps/past/'}
        />
      </div>
    </div>
  );
};
