import Warning from '../../assets/warning.svg?react';
import styles from './index.module.css';

export const ErrorWarn: React.FC<{ message?: string | null }> = ({
  message,
}) => {
  return message ? (
    <>
      <Warning className={styles.icon} />
      {message}
    </>
  ) : null;
};
