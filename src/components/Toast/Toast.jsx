import styles from './Toast.module.css';
import classNames from "classnames";
import {CloseIcon} from "../Icons/CloseIcon";
export const Toast = ({description, type = "error", onClose}) => {
    return (
      <div className={styles.container}>
        <div className={classNames(
                styles.content,
                styles[type],  // success, error
            )}>
          <div className={styles.description}>
            <h2 style={{color: 'white'}}>{description}</h2>
          </div>
            <button
                className={classNames(
                    styles.button,
                    styles[type],  // success, error
                )}
                onClick={onClose}
            >
                <CloseIcon />
            </button>
        </div>
      </div>
    );
};