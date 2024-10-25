import styles from "./LabelWithCloseButton.module.css";
import {CloseIcon} from "../../Icons/CloseIcon";

export const LabelWithCloseButton = ({onClose, hint, label, optional}) => {
    return (
      <div className={styles.row}>
        <div className={styles.textLine}>
          {onClose ? (
            <h1 className={styles.label}>{label}</h1>
          ) : (
            <h2 className={styles.label}>{label}</h2>
          )}
          <h2 className={styles.optional}>{optional}</h2>
        </div>
        <div className={styles.textLine}>
          <h2 className={styles.hint}>{hint}</h2>
          {onClose && (
            <div className={styles.close} onClick={onClose}>
              <CloseIcon />
            </div>
          )}
        </div>
      </div>
    );
};