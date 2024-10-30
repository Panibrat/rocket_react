import {Button} from "../Button/Button";
import styles from './SetupRecordingModal.module.css';
import {LabelWithCloseButton} from "../LabelRow/LabelWithCloseButton/LabelWithCloseButton";
import {SetupForm} from "../Forms/SetupForm/SetupForm";
import {usePostData} from "../../hooks/usePostData";
import {START_RECORD_URL} from "../../constants/urls";

const FORM_ID = 'setupForm'

export const SetupRecordingModal = ({show, onClose, onError}) => {
    const { isLoading, isError, result, errorText, postData } = usePostData();

    const handleSetupSubmit = async (data) => {
        const body = {...data, state: 'R'}
        await postData(START_RECORD_URL, body);

        if (!isError) {
            onClose();
        } else {
            console.log('123_errorText', errorText);
            onError(errorText || 'Cannot reach server. Check connection and try again.');
        }
    };


    if (!show) {
        return null;
    }

    return (
      <div className={styles.content}>
        <div className={styles.setup}>
            <div>
                <div className={styles.title}>
                    <LabelWithCloseButton label="Setup recording" onClose={onClose}/>
                </div>
                <SetupForm id={FORM_ID} onFormSubmit={handleSetupSubmit}/>
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
              iconName={isLoading ? "loading" : "record"}
              disabled={!!isLoading}
            />
          </div>
        </div>
      </div>
    );
};