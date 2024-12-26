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
      <div className={styles.column}>
        <ul>
          {notifications?.map((notification) => {
            return (
              <Link
                key={notification.campId}
                to={`/camps/${notification.campId}`}
                onClick={toggleNotificationModal}
              >
                {`"${notification.campName}": ${notification.countNewUsers}`}
              </Link>
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
