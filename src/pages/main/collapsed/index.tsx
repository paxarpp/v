import { Suspense, useState } from 'react';
import { Await, useAsyncValue, useLoaderData } from 'react-router-dom';
import ClosedIcon from '../../../assets/closed.svg?react';
import Setting from '../../../assets/setting.svg?react';
import { IHome, IQuestion } from '../interfaces';
import { Modal } from '../../../templates/modal';
import { deleteQuestion, updateQuestion, getQuestions } from '../../../api';
import { useUser } from '../../../context';
import styles from '../index.module.css';

export const Collapsed: React.FC = () => {
  const { user } = useUser();
  const isAdmin = !!user?.roles.includes('ADMIN');
  const { home } = useLoaderData() as {
    home: IHome[];
  };

  const [isOpen, openModal] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const openEditQuestions = () => {
    const getQ = async () => {
      setLoading(true);
      setQuestions([]);
      const { questions, error } = await getQuestions<IQuestion>();
      if (!error) {
        setQuestions(questions);
      }
      setLoading(false);
      setError(error);
    };
    getQ();

    openModal(true);
  };
  const closeModal = () => {
    setQuestions([]);
    setError('');
    setLoading(false);
    openModal(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { error } = await updateQuestion(questions);
    setLoading(false);
    if (!error) {
      closeModal();
    } else {
      setError(error);
    }
  };

  const onDelete = (id: string) => {
    const del = async (id: string) => {
      deleteQuestion(id);
    };
    del(id);
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
        {isLoading ? 'Загрузка...' : null}
        {error ? (
          error
        ) : (
          <div className={styles.form_question}>
            <label>{'Часто задаваемые вопросы'}</label>
            <>
              {questions.map(({ id, question, answer }, indx) => {
                return (
                  <div key={id ? id : indx} className={styles.question_block}>
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
                );
              })}
              <button className={styles.question_button} onClick={addQuestion}>
                {'Добавить вопрос'}
              </button>
            </>
          </div>
        )}
      </Modal>
      <div className={styles.asked_questions}>
        <img
          src={'/src/assets/asked_questions.jpg'}
          alt={''}
          className={styles.back_questions}
        />
        <h2>
          {'Часто задаваемые вопросы'}
          {isAdmin ? <Setting onClick={openEditQuestions} /> : null}
        </h2>
        <div>
          <Suspense fallback={'Загрузка...'}>
            <Await resolve={home}>
              <QuestionsTemplate />
            </Await>
          </Suspense>
        </div>
      </div>
    </>
  );
};

const QuestionsTemplate: React.FC = () => {
  const { home } = useAsyncValue() as {
    home: IHome;
  };
  const [openId, setIsOpen] = useState<string | null>(null);

  const onToggle = (currentId: string) => () => {
    setIsOpen(openId === currentId ? null : currentId);
  };

  return (
    <>
      {home.questions.map((item) => {
        return (
          <div
            key={item.id}
            className={styles.question}
            onClick={onToggle(item.id)}
          >
            <div className={styles.question_name_wrapper}>
              <span className={styles.question_name}>{item.question}</span>
              <ClosedIcon
                className={openId === item.id ? styles.rotate_to_open : ''}
              />
            </div>
            <div
              className={
                openId === item.id ? styles.info_open : styles.info_close
              }
            >
              <span className={styles.answer}>{item.answer}</span>
            </div>
          </div>
        );
      })}
    </>
  );
};
