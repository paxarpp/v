import React, { PropsWithChildren, useEffect } from 'react';
import Close from '../../assets/close.svg?react';
import styles from './index.module.css';
import { useDeviceDetect } from '../../hooks';

interface IProps {
  isOpen: boolean;
  title?: string;
  header?: React.ReactNode | undefined;
  footer?: React.ReactNode | null;
  close?: () => void;
  classNameModal?: string;
}

export const Modal: React.FC<PropsWithChildren<IProps>> = ({
  isOpen,
  title,
  footer,
  children,
  close,
  header,
  classNameModal,
}) => {
  const { isMobile } = useDeviceDetect();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.body.style.paddingRight = '10px';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  return isOpen ? (
    <div className={styles.modal_wrap}>
      <div className={styles.modal_back} onClick={close ? close : undefined} />
      <div
        className={`${styles.modal} ${styles.modal_flex} ${classNameModal ? classNameModal : ''}`}
      >
        <div className={styles.header}>
          {header ? header : <span className={styles.title}>{title}</span>}
          {close && header ? (
            isMobile ? (
              <span className={styles.close_icon_wrapper_mobi}>
                <Close onClick={close} className={styles.close_icon_mobi} />
              </span>
            ) : (
              <Close onClick={close} className={styles.close_icon} />
            )
          ) : null}
        </div>
        <div className={styles.content}>{children}</div>
        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </div>
    </div>
  ) : null;
};

interface IViewProps {
  header?: React.ReactNode | undefined;
  close: () => void;
  classNameModal?: string;
}

export const Viewer: React.FC<PropsWithChildren<IViewProps>> = ({
  children,
  close,
  classNameModal,
}) => {
  return (
    <div className={styles.modal_wrap}>
      <div className={styles.modal_back} onClick={close} />
      <div
        className={`${styles.modal_view} ${styles.modal_flex} ${classNameModal ? classNameModal : ''}`}
      >
        <Close onClick={close} className={styles.close_icon} />
        {children}
      </div>
    </div>
  );
};
