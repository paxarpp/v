import { InputStyled } from '../templates/input';
import styles from './index.module.css';

interface IProps {
  username: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  displayValueTel: string;
  validationError?: string;
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const TemplateSiginN: React.FC<IProps> = ({
  username,
  onChange,
  displayValueTel,
  handlePhoneChange,
  validationError,
  className,
}) => {
  return (
    <div className={`${styles.input_wrap} ${className ? className : ''}`}>
      <InputStyled placeholder={'Имя'} value={username} onChange={onChange} />
      <InputStyled
        type="tel"
        placeholder={'Телефон'}
        value={displayValueTel}
        onChange={handlePhoneChange}
        validationError={validationError}
      />
    </div>
  );
};
