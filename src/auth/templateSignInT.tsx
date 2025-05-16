import { InputStyled } from '../templates/input';
import styles from './index.module.css';

interface IProps {
  password: string;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  displayValueTel: string;
  validationError?: string;
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const TemplateSiginT: React.FC<IProps> = ({
  password,
  onChangePassword,
  displayValueTel,
  handlePhoneChange,
  validationError,
  className,
}) => {
  return (
    <div className={`${styles.input_wrap} ${className ? className : ''}`}>
      <InputStyled
        type="tel"
        placeholder={'Телефон'}
        value={displayValueTel}
        onChange={handlePhoneChange}
        validationError={validationError}
      />
      <InputStyled
        placeholder={'Пароль'}
        value={password}
        type={'password'}
        onChange={onChangePassword}
      />
    </div>
  );
};
