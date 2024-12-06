import { useAsyncValue } from 'react-router-dom';
import { ICampItem, IUser } from '../interfaces';
import { useUser } from '../../../context';
import { campConfirm } from '../../../api';
import styles from '../index.module.css';

export const Users = () => {
  const { camp } = useAsyncValue() as {
    camp: ICampItem;
  };
  const { isAdmin, isModerator } = useUser();

  const onConfirm = (user: IUser) => {
    const confirm = async () => {
      const campId = camp.id;
      const resp = await campConfirm(campId, user.id, !user.bookingConfirmed);
    };
    confirm();
  };

  return isAdmin || isModerator ? (
    <div className={styles.column}>
      <h2>{'Состав участников кемпа'}</h2>

      <table className={styles.table}>
        <tr>
          <th>Имя</th>
          <th>Телефон</th>
          <th>Количество мест</th>
          <th>Бронь</th>
        </tr>
        {camp.users?.map((user) => (
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
    </div>
  ) : null;
};
