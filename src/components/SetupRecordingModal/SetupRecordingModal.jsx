import classNames from 'classnames';

import {Button} from "../Button/Button";
import styles from './SetupRecordingModal.module.css';
import {useRef, useState} from "react";
import {LabelWithCloseButton} from "../LabelRow/LabelWithCloseButton/LabelWithCloseButton";
import {TextField} from "../TextField/TextField";
import {DropDown} from "../DropDown/DropDown";
import {PercentageInput} from "../PercentageInput/PercentageInput";
import {SetupForm} from "../Forms/SetupForm/SetupForm";
import {usePostData} from "../../hooks/usePostData";

const MAX_INPUT_LENGTH = 8;

const FORM_ID = 'setupForm'

const oxidizerDropdownOptions = [
    { value: 'kno3', label: 'KNO₃' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

const fuelDropdownOptions = [
    { value: 'sucrose', label: 'Sucrose₃' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

export const SetupRecordingModal = ({show, onClose, onError}) => {
    const { isLoading, isError, result, errorText, postData } = usePostData();

    const handleSetupSubmit = async (data) => {
        const body = {...data, state: 'R'}
        await postData(body);

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
              // onClick={handleRecording}
              iconName={isLoading ? "loading" : "record"}
              disabled={!!isLoading}
            />
          </div>
        </div>
      </div>
    );
};