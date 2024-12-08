import { useState } from 'react';
import { useAsyncValue, useRevalidator } from 'react-router-dom';
import { IUser } from '../interfaces';
import { useUser } from '../../../context';
import { creatorRequest, updateUserReservation } from '../../../api';
import { Modal } from '../../../templates/modal';
import Pencil from '../../../assets/pencil.svg?react';
import styles from '../index.module.css';

export const Users = () => {
  const { user } = useAsyncValue() as {
    user: IUser;
  };
  const revalidator = useRevalidator();
  const { logout } = useUser();
  const [isOpen, setOpen] = useState(false);
  const [newUser, setNewUser] = useState<{
    id: string | null;
    telephone: string;
    username: string;
    isAdmin: boolean;
    isUser: boolean;
    isModerator: boolean;
  } | null>(null);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setNewUser(null);
    setOpen(false);
  };

  const addUser = () => {
    const update = async () => {
      const axiosCall = creatorRequest(logout);
      const { error } = await axiosCall<string>(
        updateUserReservation(newUser?.id ? {
          ...newUser,
          name: newUser?.username,
          avatar: null,
        } : {
          ...newUser,
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

  const editUser = (user) => {
    setOpen(true);
    setNewUser({ ...user, username: user.name });
  };

  return user.isAdmin ? (
    <div className={styles.column}>
      {isOpen ? (
        <Modal
          close={closeModal}
          isOpen={true}
          header={<h2>Участник кемпа</h2>}
          footer={
            <button onClick={addUser} className={styles.button}>
              {newUser?.id ? 'Редактировать' : 'Добавить'}
            </button>
          }
        >
          <div className={styles.add_user_modal}>
            <label>{'Имя'}</label>
            <input
              value={newUser?.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              className={styles.input_field}
            />
            <label>{'Телефон'}</label>
            <input
              value={newUser?.telephone}
              onChange={(e) =>
                setNewUser({ ...newUser, telephone: e.target.value })
              }
              className={styles.input_field}
            />
            <label>
              <input
                type={'radio'}
                checked={newUser?.isUser}
                id={'isUser'}
                name={'user'}
                onChange={onChange}
              />
              {'Пользователь'}
            </label>
            <label>
              <input
                type={'radio'}
                checked={newUser?.isModerator}
                id={'isModerator'}
                name={'user'}
                onChange={onChange}
              />
              {'Модератор'}
            </label>
            <label>
              <input
                type={'radio'}
                checked={newUser?.isAdmin}
                id={'isAdmin'}
                name={'user'}
                onChange={onChange}
              />
              {'Администратор'}
            </label>
          </div>
        </Modal>
      ) : null}
      <h2>{'Пользователи'}</h2>

      <table className={styles.table}>
        <tr>
          <th>Имя</th>
          <th>Телефон</th>
          <th>Роль</th>
          <th>Действия</th>
        </tr>
        {user.users?.map((u) => (
          <tr key={user.id}>
            <td>{u.name}</td>
            <td>{u.telephone}</td>
            <td>
              {u.isUser
                ? 'Пользователь'
                : u.isAdmin
                  ? 'Администратор'
                  : u.isModerator
                    ? 'Модератор'
                    : '???'}
            </td>
            <td>
              <Pencil onClick={() => editUser(u)} />
            </td>
          </tr>
        ))}
      </table>
      <div className={styles.wrap_user_add}>
        <button onClick={openModal} className={styles.button}>
          {'Добавить пользователя'}
        </button>
      </div>
    </div>
  ) : null;
};