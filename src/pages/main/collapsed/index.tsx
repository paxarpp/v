import { useState } from'react';
import {
  useLoaderData,
} from "react-router-dom";
import ClosedIcon from '../../../assets/closed.svg?react';
import OpenedIcon from '../../../assets/opened.svg?react';
import styles from '../index.module.css';
import { IQuestion } from '../index';

export const Collapsed: React.FC = () => {
  const { main } = useLoaderData() as {
    main: {
      questions: IQuestion[]
    }
  };
  const [openId, setIsOpen] = useState<string|null>(null);

  const onToggle = (currentId: string) => () => {
    setIsOpen(openId === currentId ? null : currentId);
  }
  return (
    <div className={styles.asked_questions}>
      <h2 className={styles.main_title}>Часто задаваемые вопросы</h2>
      <div>
        {main.questions.map((item) => {
          return (
            <div key={item.id} className={styles.question} onClick={onToggle(item.id)} >
            <span className={styles.question_name}>{item.title}</span>
              {
                openId === '1' ? <OpenedIcon /> : <ClosedIcon />
              }
            <div className={openId === '1' ? styles.info_open : styles.info_close}>
              <span className={styles.question_message}>
                {item.message}
              </span>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}