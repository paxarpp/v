import { Link } from 'react-router';
import { Modal } from '../modal';
import styles from './index.module.css';
import { INotification } from './interfaces';

interface IProps {
  notifications: INotification[];
  toggleNotificationModal: () => void;
}

export const CampsInfo: React.FC<IProps> = ({
  notifications,
  toggleNotificationModal,
}) => {
  return (
    <Modal close={toggleNotificationModal} isOpen={true} header={<span />}>
      <div>
        <ul className={styles.notification_list}>
          {notifications?.map((notification) => {
            return (
              <li className={styles.notification_item}>
                <Link
                  key={notification.campId}
                  to={`/camps/${notification.campId}`}
                  onClick={toggleNotificationModal}
                  className={styles.notification_link}
                >
                  {notification.campName}
                </Link>
                <div className={styles.padding} />
                <span>{notification.countNewUsers}</span>
              </li>
            );
          })}
          {notifications?.length === 0 ? (
            <li>Пока нет новых участников</li>
          ) : null}
        </ul>
      </div>
    </Modal>
  );
};
