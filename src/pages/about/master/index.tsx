import { useLoaderData } from 'react-router';
import { useDeviceDetect } from '../../../hooks';
import { Route } from '../+types';
import styles from '../index.module.css';

export const Master = () => {
  const { about } = useLoaderData<Route.ComponentProps['loaderData']>();
  const { isMobile } = useDeviceDetect();
  return (
    <div className={styles.master_block}>
      <div className={styles.master_column}>
        <div>
          <img
            src={about?.master?.image?.url}
            className={styles.master_image}
          />
        </div>
      </div>
      <div>
        <h3>{about?.master?.name}</h3>
        <ul className={styles.master_infos}>
          {about?.master?.infos.map((info, indx) => <li key={indx}>{info}</li>)}
        </ul>
      </div>
    </div>
  );
};
