import { useEffect, useRef, useState } from 'react';
import { useUser, useAuth } from '../../context';
import { useDeviceDetect } from '../../hooks';
import { getCookie } from '../../cookie';
import { api } from '../../api/api';
import { AxiosError } from 'axios';
import { CampsInfo } from './campsInfo';
import { INotification } from './interfaces';
import { Template } from './template';
import { MobileTemplate } from './mobile.template';
import styles from './index.module.css';

export interface IProps {
  linkTg?: string;
  linkInstagram?: string;
  linkVk?: string;
}

export const createLinkClassName = ({
  isPending,
  isActive,
}: {
  isPending: boolean;
  isActive: boolean;
}) => (isPending ? styles.link_pending : isActive ? styles.link_active : '');

export const Header: React.FC<IProps> = (props) => {
  const { user, isAdmin, signin } = useUser();
  const isAuth = !!user;
  const { isMobile } = useDeviceDetect();
  const { toggleAuthOpen } = useAuth();
  const [isOpenPopapMenu, openPopapMenu] = useState(false);
  const [isOpenNotif, openNotif] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [count, setCount] = useState<number>(0);

  const tN = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!isAuth) {
      const cookie = getCookie();
      if (cookie) {
        try {
          const raw = localStorage.getItem('user');
          if (raw) {
            const user = JSON.parse(raw);
            signin(user);
          }
        } catch (e) {
          //
        }
      }
    }
  }, [isAuth]);

  useEffect(() => {
    if (isAdmin && !tN.current) {
      const getNotif = async () => {
        try {
          const { data } = await api.notification.getNotificationCount();

          if (data?.result !== null) {
            setCount(data.result);
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
              clearInterval(tN.current);
            }
          }
        }
      };
      const timer = setInterval(getNotif, 10000);
      tN.current = timer;
    } else if (!isAdmin && tN.current) {
      clearInterval(tN.current);
    }
    return () => {
      clearInterval(tN.current);
    };
  }, [isAdmin]);

  const togglePopapMenu = () => {
    openPopapMenu((prev) => !prev);
  };

  const toggleNotificationModal = () => {
    if (!isOpenNotif) {
      const getNotif = async () => {
        try {
          const { data } =
            await api.notification.getNotifications<INotification>();

          if (data?.result !== null) {
            setNotifications(data.result);
          }
        } catch (error) {
          //
        }
      };
      getNotif();
    }
    openNotif((prev) => !prev);
  };

  return (
    <>
      {isOpenNotif ? (
        <CampsInfo
          notifications={notifications}
          toggleNotificationModal={toggleNotificationModal}
        />
      ) : null}
      {isMobile ? (
        <MobileTemplate
          {...props}
          togglePopapMenu={togglePopapMenu}
          isOpenPopapMenu={isOpenPopapMenu}
          toggleAuthOpen={toggleAuthOpen}
          toggleNotificationModal={toggleNotificationModal}
          count={count}
        />
      ) : (
        <Template
          toggleAuthOpen={toggleAuthOpen}
          toggleNotificationModal={toggleNotificationModal}
          count={count}
        />
      )}
    </>
  );
};
