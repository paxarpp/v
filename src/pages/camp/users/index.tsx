import { useAsyncValue } from 'react-router-dom';
import { ICampItem } from '../interfaces';
import { useUser } from '../../../context';
import { campConfirm } from '../../../api';
import styles from '../index.module.css';

export const Users = () => {
  const { camp } = useAsyncValue() as {
    camp: ICampItem;
  };
  const { isAdmin, isModerator } = useUser();

  const onConfirm = (userId: string) => {
    const confirm = async () => {
      const campId = camp.id;
      const resp = await campConfirm(campId, userId, !user.bookingConfirmed);

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
            <td>{'user.telephone'}</td>
            <td>{'user.bookingCount'}</td>
            <td>
              <button
                className={styles.button_profile}
                onClick={() => onConfirm(user.id)}
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
