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

export const MobileTemplate: React.FC<IProps> = ({
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
      <InputStyled
        className={styles.modal_input_mobi}
        value={name}
        onChange={onChangeName}
        placeholder={'Имя'}
      />
      <InputStyled
        type="tel"
        className={styles.modal_input_mobi}
        value={tel}
        onChange={onChangeTel}
        placeholder={'Телефон'}
        validationError={validationError}
      />
      <InputStyled
        className={styles.modal_input_mobi}
        value={comment}
        onChange={onChangeComment}
        placeholder={'Комментарий'}
      />
      <button className={styles.button} onClick={onSend}>
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
