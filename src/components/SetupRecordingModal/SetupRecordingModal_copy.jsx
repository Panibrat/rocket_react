import classNames from 'classnames';

import {Button} from "../Button/Button";
import styles from './SetupRecordingModal.module.css';
import {useRef, useState} from "react";
import {LabelWithCloseButton} from "../LabelRow/LabelWithCloseButton/LabelWithCloseButton";
import {TextField} from "../TextField/TextField";
import {DropDown} from "../DropDown/DropDown";
import {PercentageInput} from "../PercentageInput/PercentageInput";
import {SetupForm} from "../Forms/SetupForm/SetupForm";

const MAX_INPUT_LENGTH = 8;

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

export const SetupRecordingModal = ({show, onClose}) => {
    const inputRef = useRef(null);
    const [percent, setPercent] = useState('');
    const handlePercentChange = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/[^0-9]/g, '');
        setPercent(numericValue);
    };

    const [inputText, setInputText] = useState('');
    const handleCancel = () => {
        console.log('handleCancel');
    };
    const handleRecording = () => {
        console.log("handleRecording");
    };

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };
    const handleInputClear = (event) => {
        setInputText("");
        inputRef.current.focus();
    };

    const hint = `${inputText.length}/8 latin characters, numbers`

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
                <SetupForm />
                    <TextField
                        ref={inputRef}
                        maxLength={MAX_INPUT_LENGTH}
                        label="File name"
                        placeholder="Easy to identify study name"
                        hint={hint}
                        error="File “New_test” exists. File “New_test” exists. Try different name."
                        value={inputText}
                        onInputClear={handleInputClear}
                        onChange={handleInputChange}
                        // disabled
                    />
                    <TextField
                        ref={inputRef}
                        maxLength={MAX_INPUT_LENGTH}
                        label="Engine description"
                        hint="ASCII symbols"
                        // error="File “New_test” exists. File “New_test” exists. Try different name."
                        value={inputText}
                        onInputClear={handleInputClear}
                        onChange={handleInputChange}
                        // disabled
                    />
                    <div>
                        <LabelWithCloseButton label="Propellant oxidizer"/>
                        <div className={styles.combinedField}>
                            <DropDown
                                options={oxidizerDropdownOptions}
                                error="Field is required."
                                width={160}
                                onSelect={() => {
                                }}
                            />
                            <PercentageInput
                                width={160}
                                onChange={handlePercentChange}
                                value={percent}
                                maxLength={2}
                                placeholder="Percentage"/>
                        </div>
                    </div>
                    <div>
                        <LabelWithCloseButton label="Propellant fuel"/>
                        <div className={styles.combinedField}>
                            <DropDown
                                options={fuelDropdownOptions}
                                // error="Field is required."
                                width={160}
                            />
                            <PercentageInput
                                width={160}
                                onChange={handlePercentChange}
                                value={percent}
                                maxLength={2}
                                placeholder="Percentage"/>
                        </div>
                    </div>
                    <TextField
                        // ref={inputRef}
                        maxLength={99}
                        label="Propellant notes"
                        hint="ASCII symbols"
                        optional="(optional)"
                        // error="File “New_test” exists. File “New_test” exists. Try different name."
                        value={inputText}
                        onInputClear={handleInputClear}
                        onChange={handleInputChange}
                        // disabled
                    />
                    <TextField
                        // ref={inputRef}
                        maxLength={99}
                        label="Current Date & Time"
                        hint="DD.MM.YY HH-MM"
                        // error="File “New_test” exists. File “New_test” exists. Try different name."
                        value="22.12.24 12-23"
                        onInputClear={handleInputClear}
                        onChange={handleInputChange}
                        // disabled
                    />
            </div>
        </div>
          <div className={styles.buttonGroupContainer}>
          <div className={styles.buttonGroup}>
            <Button text="Cancel" onClick={handleCancel} type="danger" width={120} />
            <Button
              width="100%"
              text="Start recording"
              onClick={handleRecording}
              iconName="loading"
              disabled
            />
          </div>
        </div>
      </div>
    );
};