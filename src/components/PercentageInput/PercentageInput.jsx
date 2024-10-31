import { Input } from '../Input/Input';
import styles from './PercentageInput.module.css';

export const PercentageInput = ({ width, onChange, value, disabled, maxLength, placeholder }) => {
  return (
    <div style={{ width }} className={styles.inputWrapper}>
      <Input
        // type="number"
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {value && <h2 className={styles.percentageSign}>%</h2>}
    </div>
  );
};
