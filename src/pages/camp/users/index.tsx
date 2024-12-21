import { useState } from 'react';
import { useLoaderData, useRevalidator } from 'react-router';
import { IUser } from '../interfaces';
import { useUser } from '../../../context';
import { api } from '../../../api/api';
import { creatorRequest } from '../../../api';
import { Modal } from '../../../templates/modal';
import { Route } from '../+types';
import styles from '../index.module.css';

export const Users = () => {
  const { camp } = useLoaderData<Route.ComponentProps['loaderData']>();
  const revalidator = useRevalidator();
  const { isAdmin, isModerator, logout } = useUser();
  const [isOpen, setOpen] = useState(false);
  const [newUser, setNewUser] = useState<{
    id: string | null;
    telephone: string;
    username: string;
    isAdmin: boolean;
    isUser: boolean;
    isModerator: boolean;
    bookingCount: number;
    campId: string | null;
  }>({
    id: null,
    telephone: '',
    username: '',
    isAdmin: false,
    isUser: true,
    isModerator: false,
    bookingCount: 0,
    campId: null,
  });

  const onConfirm = (user: IUser) => {
    if (!camp) return;
    const confirm = async () => {
      const campId = camp.id;
      const axiosCall = creatorRequest(logout);
      const { error } = await axiosCall(
        api.campConfirm(campId, user.id, !user.bookingConfirmed),
      );
      if (!error) {
        revalidator.revalidate();
      }
    };
    confirm();
  };

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const addUser = () => {
    if (!camp) return;
    const update = async () => {
      const campId = camp.id;
      const axiosCall = creatorRequest(logout);
      const { error } = await axiosCall(
        api.updateUserReservation({
          ...newUser,
          campId,
        }),
      );
      if (!error) {
        closeModal();
        revalidator.revalidate();
      }
    };
    update();
  };

  const onChange = (e) => {
    setNewUser((prevU) => ({
      ...prevU,
      isUser: false,
      isAdmin: false,
      isModerator: false,
      [e.target.id]: e.target.checked,
    }));
  };

  return isAdmin || isModerator ? (
    <div className={styles.column}>
      {isOpen ? (
        <Modal
          close={closeModal}
          isOpen={true}
          header={<h2>Участник кемпа</h2>}
          footer={
            <button onClick={addUser} className={styles.button}>
              {'Добавить'}
            </button>
          }
        >
          <div className={styles.add_user_modal}>
            <label>{'Имя'}</label>
            <input
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              className={styles.input_field}
            />
            <label>{'Телефон'}</label>
            <input
              value={newUser.telephone}
              onChange={(e) =>
                setNewUser({ ...newUser, telephone: e.target.value })
              }
              className={styles.input_field}
            />
            <label>{'Резерв мест'}</label>
            <input
              value={newUser.bookingCount}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  bookingCount: e.target.value ? Number(e.target.value) : 0,
                })
              }
              className={styles.input_field}
            />
            <label>
              <input
                type={'radio'}
                checked={newUser.isUser}
                id={'isUser'}
                name={'user'}
                onChange={onChange}
              />
              {'Пользователь'}
            </label>
          </div>
        </Modal>
      ) : null}
      <h2>{'Состав участников кемпа'}</h2>

      <table className={styles.table}>
        <tr>
          <th>Имя</th>
          <th>Телефон</th>
          <th>Количество мест</th>
          <th>Бронь</th>
        </tr>
        {camp?.users?.map((user) => (
          <tr key={user.id}>
            <td>{user.login}</td>
            <td>{user.telephone}</td>
            <td>{user.bookingCount}</td>
            <td>
              <button
                className={
                  user.bookingConfirmed
                    ? styles.button_confirmed
                    : styles.button_profile
                }
                onClick={() => onConfirm(user)}
              >
                {user.bookingConfirmed ? 'Забронировано' : 'Подтвердить'}
              </button>
            </td>
          </tr>
        ))}
      </table>
      <div className={styles.wrap_user_add}>
        <button onClick={openModal} className={styles.button_profile}>
          {'Добавить участника'}
        </button>
      </div>
    </div>
  ) : null;
};
