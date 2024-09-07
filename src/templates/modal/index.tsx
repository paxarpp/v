import React, { PropsWithChildren, useEffect, useState } from 'react';
import styles from './index.module.css';

interface IProps {
  isOpen: boolean;
  title: string;
  footer?: React.ReactNode | null;
  close?: () => void;
}

export const Modal: React.FC<PropsWithChildren<IProps>> = ({ isOpen , title, footer, children, close }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [stylesM, setStylesM] = useState({ left: 0, top: 0});

  useEffect(() => {
    if (isOpen && ref?.current) {
      const { height, width } = ref.current.getBoundingClientRect();
      setStylesM({
        left: (window.innerWidth - width) / 2,
        top: (window.innerHeight - height) / 2,
      })
    }
  }, [isOpen]);


  return isOpen ? (
    <div className={styles.modal_wrap} style={stylesM}>
      <div className={styles.modal_back} />
      <div className={styles.modal} ref={ref}>
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          {close ? <span onClick={close} className={styles.close_icon}>x</span> : null}
        </div>
        <div className={styles.content}>
          {children}
        </div>
        {footer ? <div className={styles.footer}>{footer}</div> : null}   
      </div>
    </div>
  ) : null;
}