import { ChangeEvent, InputHTMLAttributes } from 'react';
import Warning from '../../assets/warning.svg?react';
import styles from './index.module.css';

interface IProps {
  placeholder: string;
  validationError?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  pattern?: string;
}

/** нужна флексовая обертка */
export const InputStyled: React.FC<IProps> = ({
  placeholder,
  validationError,
  value,
  onChange,
  className,
  type = 'text',
  pattern,
}) => {
  return (
    <span className={styles.input_wrapper}>
      <input
        type={type}
        pattern={pattern}
        className={`${styles.input} ${validationError ? styles.input_validation_error : ''} ${className ? className : ''}`}
        value={value}
        onChange={onChange}
      />
      {validationError ? (
        <span className={styles.validation_error}>{validationError}</span>
      ) : null}
      {validationError ? (
        <Warning className={styles.icon_validation_error} />
      ) : null}
      <span
        className={value ? styles.placeholder_with_val : styles.placeholder}
      >
        {placeholder}
      </span>
    </span>
  );
};
