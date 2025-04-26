import { useEffect, useState } from 'react';
import Up from '../../assets/row_up.svg?react';
import styles from './index.module.css';

export const ScrollUpTo: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const scrollhandler = () => {
      if (document.getElementById('detail')) {
        const element = document.getElementById('detail') as HTMLDivElement;
        const rect = element.getBoundingClientRect();
        setShow(rect.top < -1000);
      }
    };
    document.addEventListener('scroll', scrollhandler);
    return () => {
      document.removeEventListener('scroll', scrollhandler);
    };
  }, []);

  const onClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return show ? <Up onClick={onClick} className={styles.scroll_up} /> : null;
};
