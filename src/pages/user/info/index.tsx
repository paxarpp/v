import { useState } from 'react';
import { useLoaderData } from 'react-router';
import { useUser } from '../../../context';
import { api } from '../../../api/api';
import Pencil from '../../../assets/pencil.svg?react';
import { ModalInfo } from './modalInfo';
import { ModalPass } from './modalPass';
import { Route } from '../+types';

import styles from '../index.module.css';

export const Info = () => {
  const { user } = useLoaderData<Route.ComponentProps['loaderData']>();

  const [isOpenEd, setOpenEd] = useState(false);
  const [isOpenChP, setOpenChP] = useState(false);

  const { logout } = useUser();

  const onLogout = () => {
    api.logout();
    logout();
  };

  const openEditInfo = () => {
    setOpenEd(true);
  };

  const openEditLogin = () => {
    setOpenChP(true);
  };

  const closeModal = () => {
    setOpenEd(false);
    setOpenChP(false);
  };

  return (
    <>
      {isOpenEd ? <ModalInfo closeModal={closeModal} /> : null}
      {isOpenChP ? <ModalPass closeModal={closeModal} /> : null}
      <h2>{'Личный кабинет'}</h2>
      <div className={styles.flex_row}>
        <div className={styles.flex_row_info}>
          <img src={user?.avatar?.url} className={styles.avatar} />

          <ul className={styles.user_info}>
            <li>{`Имя: ${user?.fullName}`}</li>
            <li>{`Дата рождения: ${user?.birthday}`}</li>
            <li>{`E-mail: ${user?.email}`}</li>
            <li>
              {`Телефон: ${user?.telephone}`}
              <Pencil
                onClick={openEditInfo}
                className={styles.icon_edit_info}
              />
            </li>
          </ul>
        </div>
        <div className={styles.flex_col_action}>
          <span>
            {'Сменить пароль'}
            <Pencil onClick={openEditLogin} className={styles.icon_edit_info} />
          </span>
          <button className={styles.button} onClick={onLogout}>
            {'Выйти'}
          </button>
        </div>
      </div>
    </>
  );
};
