import { Link } from 'react-router';
import { InputStyled } from '../input';
import styles from './index.module.css';

interface IProps {
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTel: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeComment: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  name: string;
  tel: string;
  comment: string;
  validationError: string;
}

export const Template: React.FC<IProps> = ({
  onChangeName,
  onChangeTel,
  onSend,
  onChangeComment,
  name,
  comment,
  validationError,
  tel,
}) => {
  const disabled = !name || !tel || !comment;
  return (
    <div className={styles.col_inputs}>
      <div className={styles.row_input}>
        <InputStyled
          className={styles.modal_input}
          value={name}
          onChange={onChangeName}
          placeholder={'Имя'}
        />
        <InputStyled
          type={'tel'}
          pattern={'[0-9]{3}-[0-9]{3}-[0-9]{4}'}
          className={styles.modal_input}
          value={tel}
          onChange={onChangeTel}
          placeholder={'Телефон'}
          validationError={validationError}
        />
      </div>
      <InputStyled
        className={styles.modal_input_long}
        value={comment}
        onChange={onChangeComment}
        placeholder={'Комментарий'}
      />
      <button
        className={disabled ? styles.button_disabled : styles.button}
        onClick={disabled ? null : onSend}
      >
        Отправить
      </button>
      <span className={styles.message_agreement}>
        {'Нажимая на кнопку,  вы принимаете условия '}
        <Link to={'/agreement'} className={styles.message_agreement_link}>
          {'пользовательского соглашения'}
        </Link>
      </span>
    </div>
  );
};
