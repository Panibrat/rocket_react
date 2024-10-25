import {Button} from "../Button/Button";
import styles from './SaveAndExitModal.module.css';
import {useState} from "react";
import {LabelWithCloseButton} from "../LabelRow/LabelWithCloseButton/LabelWithCloseButton";
import {SaveForm} from "../Forms/SaveForm/SaveForm";
import {readFormDataFromLocalStorage} from "../../utils/readFormDataFromLocalStorage";
import {postState} from "../../utils/postState";

const FORM_ID = 'saveForm'

export const SaveAndExitModal = ({show, onClose, samplesCount, timeCount}) => {
    const [loading, setLoadind] = useState(false);

    if (!show) {
        return null;
    }

    const handleFormSubmit = () => {
        setLoadind(true); // TODO: take from post function
        postState('S');
        onClose();
    }

    const storedData = readFormDataFromLocalStorage('setupForm');

    return (
      <div className={styles.content}>
        <div className={styles.setup}>
          <div>
            <div className={styles.title}>
              <LabelWithCloseButton label="Stop & Save recording?" onClose={onClose} />
              <h2 style={{ marginBottom: '16px', fontWeight: 300 }}>
                Recorded file will be saved to SD card.{' '}
              </h2>
            </div>
            <LabelWithCloseButton label={`${storedData.fileName}.txt` || ''} />
            <h2 style={{ marginBottom: '16px', fontWeight: 300 }}>
                {`${timeCount} / ${samplesCount} samples`}
            </h2>
            <SaveForm id={FORM_ID} onFormSubmit={handleFormSubmit} disabled={!!loading}/>
          </div>
        </div>
        <div className={styles.buttonGroupContainer}>
          <div className={styles.buttonGroup}>
            <Button text="Cancel" onClick={onClose} width={160} />
            <Button
              type="submit"
              form={FORM_ID}
              width="180px"
              text="Stop & Save"
              variant="danger"
              iconName={loading ? 'loading' : ''}
              disabled={!!loading}
            />
          </div>
        </div>
      </div>
    );
};