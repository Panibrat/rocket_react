import { Button } from '../Button/Button';
import styles from './SetupRecordingModal.module.css';
import { LabelWithCloseButton } from '../LabelRow/LabelWithCloseButton/LabelWithCloseButton';
import { SetupForm } from '../Forms/SetupForm/SetupForm';
import { START_RECORD_URL } from '../../constants/urls';
import { useMutateData } from '../../hooks/useMutateData';
import { useEffect } from 'react';

const FORM_ID = 'setupForm';

export const SetupRecordingModal = ({ show, onClose, onError }) => {
  const { isLoading, isError, errorText, mutate } = useMutateData();

  const handleSetupSubmit = (data) => {
    const body = { ...data, state: 'R' };
    mutate(START_RECORD_URL, body);
  };

  useEffect(() => {
    if (isError && errorText) {
      onError(errorText);
    }
    // eslint-disable-next-line
  }, [errorText, isError]);

  if (!show) {
    return null;
  }

  return (
    <div className={styles.content}>
      <div className={styles.setup}>
        <div>
          <div className={styles.title}>
            <LabelWithCloseButton label="Setup recording" onClose={onClose} />
          </div>
          <SetupForm id={FORM_ID} onFormSubmit={handleSetupSubmit} />
        </div>
      </div>
      <div className={styles.buttonGroupContainer}>
        <div className={styles.buttonGroup}>
          <Button text="Cancel" onClick={onClose} variant="secondary" width={120} />
          <Button
            type="submit"
            form={FORM_ID}
            width="100%"
            text="Start recording"
            iconName={isLoading ? 'loading' : 'record'}
            disabled={!!isLoading}
          />
        </div>
      </div>
    </div>
  );
};
