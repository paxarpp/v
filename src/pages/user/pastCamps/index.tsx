import { useLoaderData } from 'react-router';
import { Route } from '../+types';
import { Scroller } from '../scroller';
import { useDeviceDetect } from '../../../hooks';
import { CampsMobileScroller } from '../../../templates/CampMobileScroller';
import styles from '../index.module.css';

export const PastCamps = () => {
  const { user } = useLoaderData<Route.ComponentProps['loaderData']>();
  const { isMobile } = useDeviceDetect();

  return user?.isAdmin ? null : isMobile ? (
    <div className={styles.camps_wrap_mobi}>
      <h2 className={styles.camps_header_mobi}>{'Мои прошедшие кемпы'}</h2>
      <div className={styles.camps_scroller_mobi}>
        <CampsMobileScroller list={user?.pastCamps || []} />
      </div>
    </div>
  ) : (
    <Scroller title={'Мои прошедшие кемпы'} camps={user?.pastCamps} />
  );
};
