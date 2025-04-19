import { InputStyled } from '../templates/input';
import styles from './index.module.css';

interface IProps {
  username: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password: string;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const TemplateSiginP: React.FC<IProps> = ({
  username,
  onChange,
  password,
  onChangePassword,
  className,
}) => {
  return (
    <div className={`${styles.input_wrap} ${className ? className : ''}`}>
      <InputStyled placeholder={'Имя'} value={username} onChange={onChange} />
      <InputStyled
        placeholder={'Пароль'}
        value={password}
        type={'password'}
        onChange={onChangePassword}
      />
    </div>
  );
};
