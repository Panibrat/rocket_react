import { Button } from '../Button/Button';
import styles from './Control.module.css';

export const ControlPanel = ({ onClick }) => {
  return (
    <div className={styles.controls}>
      <Button
        text="Setup recording"
        onClick={onClick}
        // type="danger"
        // iconName="another"
        iconName="setupRecord"
        width="100%"
        // iconName="rocket"
        // disabled
      />
    </div>
  );
};
