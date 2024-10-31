import styles from './Button.module.css';
import { DefaultIcon } from '../Icons/DefaultIcon';
import classNames from 'classnames';
import { getIconByName } from '../Icons';

export const Button = ({
  text,
  onClick,
  variant = 'primary',
  disabled = false,
  iconName,
  width,
  className,
  ...otherProps
}) => {
  const Icon = iconName ? getIconByName(iconName) : DefaultIcon;

  return (
    <button
      className={classNames(
        className,
        styles.button,
        styles[variant], // primary, secondary, danger
        {
          [styles.disabled]: disabled
        }
      )}
      onClick={onClick}
      disabled={disabled}
      style={{ width: width }}
      {...otherProps}>
      {iconName && <Icon className={styles.icon} />}
      {text}
    </button>
  );
};
