import { useAsyncValue } from 'react-router-dom';
import { ICampItem } from '../../shotCamps/interfaces';
import styles from '../index.module.css';

export const Packages = () => {
  const { camp } = useAsyncValue() as {
    camp: ICampItem;
  };

  return (
    <div className={styles.package_row}>
      {camp.packages?.map((pack) => (
        <div>
          <h4>{pack.name}</h4>
          <ul>
            {pack.info.split(';').map((i) => (
              <li>{i}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
