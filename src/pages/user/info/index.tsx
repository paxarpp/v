import { useAsyncValue } from 'react-router-dom';
import { IUser } from '../interfaces';
import { useUser } from '../../../context';
import { logout as apiLogout } from '../../../api';
import styles from '../index.module.css';

export const Info = () => {
  const { user } = useAsyncValue() as {
    user: IUser;
  };

  const { logout } = useUser();

  const onLogout = () => {
    apiLogout();
    document.cookie = `magicVolley=`;
    logout();
  };
  return (
    <>
      <h2>{'Личный кабинет'}</h2>
      <div className={styles.flex_row}>
        <div className={styles.flex_row_info}>
          <img src={user?.avatar?.url} className={styles.avatar} />

          <ul className={styles.user_info}>
            <li>{`Имя: ${user?.fullName}`}</li>
            <li>{`Дата рождения: ${user?.birthday}`}</li>
            <li>{`E-mail: ${user?.email}`}</li>
            <li>{`Телефон: ${user?.telephone}`}</li>
          </ul>
        </div>
        <div className={styles.flex_col_action}>
          <span>{'Сменить пароль'}</span>
          <button className={styles.button} onClick={onLogout}>
            {'Выйти'}
          </button>
        </div>
      </div>
    </>
  );
};
