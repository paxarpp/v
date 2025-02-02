import { useState } from 'react';
import { useLoaderData, useRevalidator } from 'react-router';
import ClosedIcon from '../../../assets/closed.svg?react';
import Setting from '../../../assets/setting.svg?react';
import Basket from '../../../assets/basket.svg?react';
import { IQuestion } from '../interfaces';
import { Modal } from '../../../templates/modal';
import { api } from '../../../api/api';
import { creatorRequest } from '../../../api';
import { useUser } from '../../../context';
import { Route } from '../+types';
import imgUrl from '../../../assets/asked_questions.jpg';
import { useDeviceDetect } from '../../../hooks';
import styles from '../index.module.css';

export const Collapsed: React.FC = () => {
  const { isAdmin, logout } = useUser();
  const revalidator = useRevalidator();

  const [isOpen, openModal] = useState(false);
  const [error, setError] = useState('');
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const openEditQuestions = () => {
    const getQ = async () => {
      setQuestions([]);
      const { questions, error } = await api.getQuestions<IQuestion>();
      if (!error) {
        setQuestions(questions);
      }
      setError(error);
    };
    getQ();

    openModal(true);
  };
  const closeModal = () => {
    setQuestions([]);
    setError('');
    openModal(false);
  };

  const handleSubmit = async () => {
    const axiosCall = creatorRequest(logout);
    const { error } = await axiosCall(api.updateQuestion(questions));
    if (!error) {
      closeModal();
      revalidator.revalidate();
    } else {
      setError(error);
    }
  };

  const onDelete = (indx: number) => {
    setQuestions((prevQ) => prevQ.filter((_, i) => i !== indx));
  };

  const addQuestion = () => {
    setQuestions((prevQ) => [...prevQ, { question: '', answer: '', id: '' }]);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        close={closeModal}
        classNameModal={styles.modal_questions}
        header={
          <div className={styles.modal_question_header}>
            {'Главная страница'}
          </div>
        }
        footer={
          <div className={styles.modal_question_footer}>
            <button className={styles.question_button} onClick={handleSubmit}>
              {'Сохранить'}
            </button>
          </div>
        }
      >
        {error ? (
          error
        ) : (
          <div className={styles.form_question}>
            <label>{'Часто задаваемые вопросы'}</label>
            <>
              {questions.map(({ id, question, answer }, indx) => {
                return (
                  <div key={id ? id : indx} className={styles.question_row}>
                    <div className={styles.question_block}>
                      <input
                        value={question}
                        onChange={({ target }) => {
                          setQuestions((prevQ) =>
                            prevQ.map((q, i) => {
                              if (indx === i) {
                                return {
                                  ...q,
                                  question: target.value,
                                };
                              } else {
                                return q;
                              }
                            }),
                          );
                        }}
                        className={styles.question_field}
                      />
                      <textarea
                        value={answer}
                        onChange={({ target }) => {
                          setQuestions((prevQ) =>
                            prevQ.map((q, i) => {
                              if (indx === i) {
                                return {
                                  ...q,
                                  answer: target.value,
                                };
                              } else {
                                return q;
                              }
                            }),
                          );
                        }}
                        className={styles.question_field}
                      />
                    </div>
                    <div>
                      <Basket onClick={() => onDelete(indx)} />
                    </div>
                  </div>
                );
              })}
              <button className={styles.question_button} onClick={addQuestion}>
                {'Добавить вопрос'}
              </button>
            </>
          </div>
        )}
      </Modal>
      <div className={styles.asked_questions} id="questions">
        <img src={imgUrl} alt={''} className={styles.back_questions} />
        <h2>
          {'Часто задаваемые вопросы'}
          {isAdmin ? (
            <Setting onClick={openEditQuestions} className={styles.setting_q} />
          ) : null}
        </h2>
        <div>
          <QuestionsTemplate />
        </div>
      </div>
    </>
  );
};

const QuestionsTemplate: React.FC = () => {
  const { home } = useLoaderData<Route.ComponentProps['loaderData']>();
  const { isMobile } = useDeviceDetect();
  const [openId, setIsOpen] = useState<string | null>(null);

  const onToggle = (currentId: string) => () => {
    setIsOpen(openId === currentId ? null : currentId);
  };

  return (
    <>
      {home?.questions.map((item) => {
        const isOpenQ = openId === item.id;
        const iconCn = `${isMobile ? styles.icon_question_mobi : ''} ${isOpenQ ? styles.rotate_to_open : ''}`;
        return (
          <div
            key={item.id}
            className={`${styles.question} ${isOpenQ ? styles.q_open : styles.q_close}`}
            onClick={onToggle(item.id)}
          >
            <div className={styles.question_name_wrapper}>
              <span
                className={
                  isMobile ? styles.question_name_mobi : styles.question_name
                }
              >
                {item.question}
              </span>
              <ClosedIcon className={iconCn} />
            </div>
            <div className={isOpenQ ? styles.info_open : styles.info_close}>
              <span className={isMobile ? styles.answer_mobi : styles.answer}>
                {item.answer}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
};
