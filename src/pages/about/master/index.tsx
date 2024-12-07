import { useAsyncValue } from 'react-router-dom';
import { useDeviceDetect } from '../../../hooks';
import styles from '../index.module.css';
import { IAbout } from '../interfaces';

export const Master = () => {
  const { about } = useAsyncValue() as {
    about: IAbout;
  };
  const { isMobile } = useDeviceDetect();
  return (
    <div className={styles.master_block}>
      <div className={styles.master_column}>
        <div>
          <img src={about.master?.image.url} className={styles.master_image} />
        </div>
      </div>
      <div>
        <h3>{about.master?.name}</h3>
        <ul className={styles.master_infos}>
          {about.master?.infos.map((info, indx) => <li key={indx}>{info}</li>)}
        </ul>
      </div>
    </div>
  );
};
