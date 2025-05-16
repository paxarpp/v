import { InputStyled } from '../templates/input';
import styles from './index.module.css';

interface IProps {
  password: string;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  telephone: string;
  onChangeTelephone: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const TemplateSiginT: React.FC<IProps> = ({
  password,
  onChangePassword,
  telephone,
  onChangeTelephone,
  className,
}) => {
  return (
    <div className={`${styles.input_wrap} ${className ? className : ''}`}>
      <InputStyled
        placeholder={'Телефон'}
        value={telephone}
        onChange={onChangeTelephone}
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
