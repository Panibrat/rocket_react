import styles from './DataItem.module.css';
export const DataItem = ({ description, units, value }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.description}>{description}</h2>
      <div className={styles.data}>
        <h2 className={styles.units}>{units}</h2>
        <h2 className={styles.value}>{value}</h2>
      </div>
    </div>
  );
};
