import { Link } from 'react-router';
import { InputStyled } from '../input';
import styles from './index.module.css';

interface IProps {
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeComment: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  name: string;
  tel: string;
  comment: string;
  validationError: string;
  displayValueTel: string;
}

export const MobileTemplate: React.FC<IProps> = ({
  onChangeName,
  handlePhoneChange,
  onSend,
  onChangeComment,
  name,
  comment,
  validationError,
  tel,
  displayValueTel,
}) => {
  const disabled = !name || !tel || !comment;
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
        value={displayValueTel}
        onChange={handlePhoneChange}
        placeholder={'Телефон'}
        validationError={validationError}
      />
      <InputStyled
        className={styles.modal_input_mobi}
        value={comment}
        onChange={onChangeComment}
        placeholder={'Комментарий'}
      />
      <button
        className={disabled ? styles.button_disabled : styles.button}
        onClick={disabled ? undefined : onSend}
      >
        Отправить
      </button>
      <span className={styles.message_agreement_mobi}>
        {'Нажимая на кнопку,  вы принимаете условия '}
        <Link to={'/agreement'} className={styles.message_agreement_link_mobi}>
          {'пользовательского соглашения'}
        </Link>
      </span>
    </div>
  );
};
