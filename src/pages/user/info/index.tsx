import { useState } from 'react';
import { useAsyncValue, useRevalidator } from 'react-router-dom';
import { IUser, IUserInfo } from '../interfaces';
import { useUser } from '../../../context';
import { logout as apiLogout, creatorRequest, updateUser } from '../../../api';
import Pencil from '../../../assets/pencil.svg?react';
import { Modal } from '../../../templates/modal';
import styles from '../index.module.css';

export const Info = () => {
  const { user } = useAsyncValue() as {
    user: IUser;
  };
  const revalidator = useRevalidator();
  const [isOpenEd, setOpenEd] = useState(false);
  const [isOpenChP, setOpenChP] = useState(false);
  const [currentInfo, setCurrentInfo] = useState<IUserInfo>(user);

  const { logout, user: authUser } = useUser();

  const onLogout = () => {
    apiLogout();
    document.cookie = `magicVolley=`;
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

  const saveInfo = () => {
    const userInfoUpdate = async () => {
      const axiosCall = creatorRequest(logout);
      const { error } = await axiosCall<IUserInfo>(
        updateUser({
          id: authUser.id,
          email: currentInfo.email,
          telephone: currentInfo.telephone,
          fullName: currentInfo.fullName,
          birthday: currentInfo.birthday,
        }),
      );
      if (!error) {
        closeModal();
        revalidator.revalidate();
      }
    };
    userInfoUpdate();
  };

  return (
    <>
      {isOpenEd ? (
        <Modal
          isOpen={true}
          close={closeModal}
          header={<h2>{'Редактировать данные'}</h2>}
          footer={
            <div>
              <button className={styles.button_save} onClick={saveInfo}>
                {'Сохранить'}
              </button>
            </div>
          }
          classNameModal={styles.modal_edit_info}
        >
          <div className={styles.column_info}>
            <label>{'Имя:'}</label>
            <input
              value={currentInfo?.fullName}
              onChange={(e) =>
                setCurrentInfo({ ...currentInfo, fullName: e.target.value })
              }
            />
            <label>{'Дата рождения:'}</label>
            <input
              value={currentInfo?.birthday}
              onChange={(e) =>
                setCurrentInfo({ ...currentInfo, birthday: e.target.value })
              }
            />
            <label>{'E-mail:'}</label>
            <input
              value={currentInfo?.email}
              onChange={(e) =>
                setCurrentInfo({ ...currentInfo, email: e.target.value })
              }
            />
            <label>{'Телефон:'}</label>
            <input
              value={currentInfo?.telephone}
              onChange={(e) =>
                setCurrentInfo({ ...currentInfo, telephone: e.target.value })
              }
            />
          </div>
        </Modal>
      ) : null}
      {isOpenChP ? <Modal isOpen={true} close={closeModal}></Modal> : null}
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
