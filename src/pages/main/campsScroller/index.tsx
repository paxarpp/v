import { useLoaderData } from 'react-router';
import { useDeviceDetect } from '../../../hooks';
import { CampsTemplate } from '../../../templates/CapmsTemplate';
import { Route } from '../+types';
import styles from '../index.module.css';

export const CampsScroller: React.FC = () => {
  const { home } = useLoaderData<Route.ComponentProps['loaderData']>();
  const { isMobile } = useDeviceDetect();
  return (
    <div className={isMobile ? styles.camps_wrap_mobi : styles.camps_wrap}>
      <h2 className={isMobile ? styles.camps_header_mobi : styles.camps_header}>
        Ближайшие кемпы
      </h2>
      <CampsTemplate list={home || []} isMobile={isMobile} />
    </div>
  );
};
