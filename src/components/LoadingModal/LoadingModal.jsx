import styles from './LoadingModal.module.css';
import { BigLoaderIcon } from '../Icons/BigLoaderIcon';
import { BeeIcon } from '../Icons/BeeIcon';
export const LoadingModal = ({ show }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.content}>
      <div>
        <BigLoaderIcon />
        <div className={styles.footer}>
          <div className={styles.info}>
            <div className={styles.logo}>
              <BeeIcon className={styles.bee} />
              <h2 className={styles.logoText}>Shalena Bdzhilka</h2>
            </div>
            <h3 className={styles.logoText}>v0.1</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
