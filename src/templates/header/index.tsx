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
import { Modal } from '../modal';
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
  const { toggleAuthOpen, image } = useAuth();
  const [isOpenPopapMenu, openPopapMenu] = useState(false);
  const [isOpenNotif, openNotif] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [count, setCount] = useState<number>(0);
  const [showCookiesUsage, setShowCookiesUsage] = useState(false);

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

  useEffect(() => {
    const timeOut = setTimeout(() => {
      try {
        const show = window.localStorage.getItem('mv-cookies-usage');
        if (!show) {
          setShowCookiesUsage(true);
          window.localStorage.setItem('mv-cookies-usage', 'true');
        }
      } catch (e) {
        setShowCookiesUsage(true);
      }
    }, 5000);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

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

  const onClose = () => {
    setShowCookiesUsage(false);
  };

  return (
    <>
      {showCookiesUsage ? (
        <div className={styles.dialog_cooki}>
          Наш сайт использует cookies для улучшения вашего опыта взаимодействия.
          Cookies помогают нам запоминать ваши предпочтения, улучшать
          производительность сайта и предоставлять вам персонализированный
          контент. Используя этот сайт, вы соглашаетесь с использованием
          cookies. Если вы хотите узнать больше о нашей политике
          конфиденциальности или изменить настройки cookie, пожалуйста, посетите
          нашу страницу с политикой конфиденциальности.
          <button onClick={onClose} className={styles.button_cooki}>
            Закрыть
          </button>
        </div>
      ) : null}

      <Modal isOpen={image.isOpen} close={image.closePreview} >
        <img
          src={image.image.src}
          alt={image.image.alt}
          onClick={image.closePreview}
          style={{ maxWidth: '100vw' }}
        />
      </Modal>

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
          {...props}
          toggleAuthOpen={toggleAuthOpen}
          toggleNotificationModal={toggleNotificationModal}
          count={count}
        />
      )}
    </>
  );
};
