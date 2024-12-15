import Ball from '../../assets/ball.svg?react';
import styles from './index.module.css';

export const GlobalSpinner = () => (
  <div className={styles.position_center}>
    <div className={styles.loader}>
      <Ball />
    </div>
  </div>
);
