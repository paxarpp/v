import { useState } from 'react';
import { useLoaderData, useParams, useRevalidator } from 'react-router';
import { useUser } from '../../../context';
import { api } from '../../../api/api';
import Pencil from '../../../assets/pencil.svg?react';
import Basket from '../../../assets/basket.svg?react';
import Reload from '../../../assets/reload.svg?react';
import Avatar from '../../../assets/avatar.svg?react';
import { ModalInfo } from './modalInfo';
import { ModalPass } from './modalPass';
import { ModalAvatar } from './modalAvatar';
import { Route } from '../+types';
import { createImageUrl } from '../../../constants';
import { creatorRequest } from '../../../api';
import styles from '../index.module.css';

export const Info = () => {
  const { user } = useLoaderData<Route.ComponentProps['loaderData']>();
  const { id } = useParams<{ id: string }>();
  const revalidator = useRevalidator();

  const [isOpenEd, setOpenEd] = useState(false);
  const [isOpenChP, setOpenChP] = useState(false);
  const [isOpenAvatar, setOpenAvatar] = useState(false);

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

  const openEditAvatar = () => {
    setOpenAvatar(true);
  };

  const closeModal = () => {
    setOpenEd(false);
    setOpenChP(false);
    setOpenAvatar(false);
  };

  const deleteAvatar = () => {
    if (user?.avatar?.entityId) {
      const userAvatarUpdate = async () => {
        const axiosCall = creatorRequest(logout);
        const { error } = await axiosCall(api.deleteUserAvatar(id as string));
        if (!error) {
          revalidator.revalidate();
        }
      };
      userAvatarUpdate();
    }
  };

  const hasAvatar = !!user?.avatar?.url;

  return (
    <>
      {isOpenEd ? <ModalInfo closeModal={closeModal} /> : null}
      {isOpenChP ? <ModalPass closeModal={closeModal} /> : null}
      {isOpenAvatar ? <ModalAvatar closeModal={closeModal} /> : null}
      <h2>{'Личный кабинет'}</h2>
      <div className={styles.flex_row}>
        <div className={styles.flex_row_info}>
          <span className={styles.avatar_wrapper}>
            {hasAvatar ? (
              <Basket onClick={deleteAvatar} className={styles.avatar_basket} />
            ) : null}
            <Reload onClick={openEditAvatar} className={styles.avatar_reload} />
            {hasAvatar ? (
              <img
                src={createImageUrl(user?.avatar?.url)}
                className={styles.avatar}
              />
            ) : (
              <Avatar className={styles.dump_avatar} />
            )}
          </span>

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
