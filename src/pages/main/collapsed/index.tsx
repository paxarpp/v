import { Suspense, useState } from 'react';
import { Await, useAsyncValue, useLoaderData } from 'react-router-dom';
import ClosedIcon from '../../../assets/closed.svg?react';
import OpenedIcon from '../../../assets/opened.svg?react';
import { IQuestion } from '../interfaces';
import { Modal } from '../../../templates/modal';
import { deleteQuestion, updateQuestion, getQuestion } from '../../../api';
import { useUser } from '../../../context';
import styles from '../index.module.css';

export const Collapsed: React.FC = () => {
  const { user } = useUser();
  const isAdmin = !!user?.roles.includes('ADMIN');
  const { questions } = useLoaderData() as {
    questions: IQuestion[];
  };

  const [isOpen, openModal] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [question, setQuestion] = useState<IQuestion>();

  const onEdit = (id?: string) => {
    if (id) {
      const getQ = async (id: string) => {
        setLoading(true);
        setQuestion({ id, answer: '', question: '' });
        const { question, error } = await getQuestion<IQuestion>(id);
        if (!error) {
          setQuestion(question);
        }
        setLoading(false);
        setError(error);
      };
      getQ(id);
    }

    openModal(true);
  };
  const closeModal = () => {
    setQuestion(undefined);
    setError('');
    setLoading(false);
    openModal(false);
  };

  const handleSubmit = async (data: {
    question: string;
    answer: string;
    id?: string;
  }) => {
    setLoading(true);
    const { error } = await updateQuestion(data);
    setLoading(false);
    if (!error) {
      closeModal();
    } else {
      setError(error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        close={closeModal}
        title={question?.id ? 'Редактировать вопрос' : 'Добавить вопрос'}
      >
        {isLoading ? 'Загрузка...' : null}
        {error ? (
          error
        ) : (
          <div className={styles.form}>
            <input
              value={question?.question}
              onChange={({ target }) =>
                setQuestion({
                  answer: question?.answer || '',
                  question: target.value,
                  id: question?.id || '',
                })
              }
            />
            <textarea
              value={question?.answer}
              onChange={({ target }) =>
                setQuestion({
                  question: question?.question || '',
                  answer: target.value,
                  id: question?.id || '',
                })
              }
            />
            <button
              onClick={() =>
                handleSubmit({
                  question: question?.question || '',
                  answer: question?.answer || '',
                  id: question?.id,
                })
              }
            >
              {'Сохранить'}
            </button>
          </div>
        )}
      </Modal>
      <div className={styles.asked_questions}>
        <h2 className={styles.main_title}>
          Часто задаваемые вопросы
          {isAdmin ? <button onClick={() => onEdit()}>Добавить</button> : null}
        </h2>
        <div>
          <Suspense fallback={'Загрузка...'}>
            <Await resolve={questions}>
              <QuestionsTemplate isAdmin={isAdmin} onEdit={onEdit} />
            </Await>
          </Suspense>
        </div>
      </div>
    </>
  );
};

const QuestionsTemplate: React.FC<{
  isAdmin: boolean;
  onEdit: (id?: string) => void;
}> = ({ isAdmin, onEdit }) => {
  const { questions } = useAsyncValue() as {
    questions: IQuestion[];
  };
  const [openId, setIsOpen] = useState<string | null>(null);

  const onToggle = (currentId: string) => () => {
    setIsOpen(openId === currentId ? null : currentId);
  };

  const onDelete = (id: string) => {
    const del = async (id: string) => {
      deleteQuestion(id);
    };
    del(id);
  };

  return (
    <>
      {questions.map((item) => {
        return (
          <div
            key={item.id}
            className={styles.question}
            onClick={onToggle(item.id)}
          >
            <div className={styles.question_name_wrapper}>
              <span className={styles.question_name}>{item.question}</span>
              {isAdmin ? (
                <button onClick={() => onDelete(item.id)}>Удалить</button>
              ) : null}
              {isAdmin ? (
                <button onClick={() => onEdit(item.id)}>Редактировать</button>
              ) : null}
              {openId === item.id ? <OpenedIcon /> : <ClosedIcon />}
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
