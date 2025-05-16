import { InputStyled } from '../templates/input';
import styles from './index.module.css';

interface IProps {
  username: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  telephone: string;
  onChangeTelephone: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const TemplateSiginN: React.FC<IProps> = ({
  username,
  onChange,
  telephone,
  onChangeTelephone,
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
    </div>
  );
};
