import React, { PropsWithChildren } from 'react';
import styles from './index.module.css';

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
  return isOpen ? (
    <div className={styles.modal_wrap}>
      <div className={styles.modal_back} onClick={close ? close : undefined} />
      <div
        className={`${styles.modal} ${styles.modal_flex} ${classNameModal ? classNameModal : ''}`}
      >
        <div className={styles.header}>
          {header ? header : <span className={styles.title}>{title}</span>}
          {close && header ? (
            <span onClick={close} className={styles.close_icon}>
              x
            </span>
          ) : null}
        </div>
        <div className={styles.content}>{children}</div>
        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </div>
    </div>
  ) : null;
};
