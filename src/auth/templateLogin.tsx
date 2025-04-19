import { InputStyled } from '../templates/input';
import styles from './index.module.css';

interface IProps {
  username: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  telephone: string;
  onChangeTelephone: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password: string;
  onChangePass: (e: React.ChangeEvent<HTMLInputElement>) => void;
  confirmPassword: string;
  onChangeConfPass: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const TemplateLogin: React.FC<IProps> = ({
  username,
  onChange,
  telephone,
  onChangeTelephone,
  password,
  onChangePass,
  confirmPassword,
  onChangeConfPass,
  className,
}) => {
  return (
    <div className={`${styles.input_wrap} ${className ? className : ''}`}>
      <InputStyled placeholder={'Имя'} value={username} onChange={onChange} />
      <InputStyled
        placeholder={'Телефон'}
        value={telephone}
        onChange={onChangeTelephone}
      />
      <InputStyled
        placeholder={'Пароль'}
        value={password}
        onChange={onChangePass}
        type="password"
      />
      <InputStyled
        placeholder={'Подтверждение пароля'}
        value={confirmPassword}
        onChange={onChangeConfPass}
        type="password"
      />
    </div>
  );
};
