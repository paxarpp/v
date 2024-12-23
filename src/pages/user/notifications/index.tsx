import { useLoaderData } from 'react-router';
import { Route } from '../+types';

import styles from '../index.module.css';

export const Notifications = () => {
  const { user, notifications } =
    useLoaderData<Route.ComponentProps['loaderData']>();

  return user?.isAdmin ? (
    <div className={styles.column}>
      <h2>Новые участники кемпов</h2>
      <ul>
        {notifications?.map((notification) => {
          return (
            <li key={notification.campId}>
              {`В кэмп: "${notification.campName}" добавилось ${notification.countNewUsers} участников`}
            </li>
          );
        })}
        {notifications?.length === 0 ? (
          <li>Пока нет новых участников</li>
        ) : null}
      </ul>
    </div>
  ) : null;
};
