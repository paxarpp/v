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
          type="tel"
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
      <button className={styles.button} onClick={onSend}>
        Отправить
      </button>
    </div>
  );
};
