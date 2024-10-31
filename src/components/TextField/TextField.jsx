import { LabelWithCloseButton } from '../LabelRow/LabelWithCloseButton/LabelWithCloseButton';
import styles from './TextField.module.css';
import { forwardRef } from 'react';
import { CloseIcon } from '../Icons/CloseIcon';
import { Input } from '../Input/Input';

export const TextField = forwardRef(
  (
    {
      maxLength = 8,
      placeholder = '',
      label,
      hint,
      optional,
      onChange,
      onInputClear,
      value,
      error,
      disabled
    },
    ref
  ) => {
    return (
      <>
        <LabelWithCloseButton label={label} hint={hint} optional={optional} />
        <div className={styles.inputWrapper}>
          <Input
            ref={ref}
            maxLength={maxLength}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            disabled={disabled}
          />
          <div className={styles.close} onClick={onInputClear}>
            {value && !!value.length && !disabled && <CloseIcon />}
          </div>
        </div>
        {error && <h2 className={styles.error}>{error}</h2>}
      </>
    );
  }
);

TextField.displayName = 'TextField';
