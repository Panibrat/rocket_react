import { useForm, useWatch, Controller } from 'react-hook-form';
import { DropdownControlled } from '../../Controlled/DropdownControlled/DropdownControlled';
import { PercentageInputControlled } from '../../Controlled/PercentageInputControlled/PercentageInputControlled';
import { inputToNumberDataTransformer } from '../../../utils/inputToNumberDataTransformer';
import { TextFieldControlled } from '../../Controlled/TextFieldControlled/TextFieldControlled';
import { inputToAsciiDataTransformer } from '../../../utils/inputToAsciiDataTransformer';
import { formatDate } from '../../../utils/formatDate';
import { validateDateTime } from '../../../utils/validateDateTime';
import { LabelWithCloseButton } from '../../LabelRow/LabelWithCloseButton/LabelWithCloseButton';
import styles from './SetupForm.module.css';
import { useEffect } from 'react';
import { saveFormDataToLocalStorage } from '../../../utils/saveFormDataToLocalStorage';
import { readFormDataFromLocalStorage } from '../../../utils/readFormDataFromLocalStorage';

const oxidizerDropdownOptions = [
  { value: 'kno3', label: 'KNO₃' },
  { value: 'c2h5oh', label: 'C2H5(OH)' },
  { value: 'co2', label: 'CO2' }
];

const fuelDropdownOptions = [
  { value: 'gas', label: 'GAS' },
  { value: 'petrol', label: 'Petrol' },
  { value: 'sucrose', label: 'Sucrose' }
];

export const SetupForm = ({ id, onFormSubmit }) => {
  const storedData = readFormDataFromLocalStorage(id);
  const defaultValues = {
    fileName: storedData.fileName || '',
    engineDesc: storedData.engineDesc || '',
    currentTime: formatDate(),
    fuelDropdown: storedData.fuelDropdown || fuelDropdownOptions[2],
    fuelPercentage: storedData.fuelPercentage || null,
    oxidizerDropdown: storedData.oxidizerDropdown || null,
    oxidizerPercentage: storedData.oxidizerPercentage || null,
    propellantNotes: storedData.propellantNotes || ''
  };
  const { register, handleSubmit, control, formState } = useForm({ defaultValues });

  const data = useWatch({
    control
  });

  const onSubmit = (data) => {
    const postData = {
      fileName: data.fileName,
      engineDesc: data.engineDesc,
      propOxid: data.oxidizerDropdown.label,
      propFuel: data.fuelDropdown.label,
      propNote: data.propellantNotes,
      currentTime: data.currentTime
    };
    onFormSubmit(postData);
  };

  useEffect(() => {
    saveFormDataToLocalStorage(id, data);
  }, [data, id]);

  const fileNameHint = `${(data.fileName && data.fileName.length) || 0}/8 latin characters, numbers`;

  return (
    <div>
      <form id={id} onSubmit={handleSubmit(onSubmit)}>
        <TextFieldControlled
          name="fileName"
          control={control}
          label="File name"
          hint={fileNameHint}
          placeholder="Easy to identify study name"
          error={null}
          disabled={false}
          dataTransformer={inputToAsciiDataTransformer}
        />
        <TextFieldControlled
          name="engineDesc"
          control={control}
          label="Engine description"
          hint="ASCII symbols"
          error={null}
          disabled={false}
          required={true}
          dataTransformer={inputToAsciiDataTransformer}
        />

        <div>
          <LabelWithCloseButton label="Propellant oxidizer" />
          <div className={styles.combinedField}>
            <DropdownControlled
              name="oxidizerDropdown"
              control={control}
              options={oxidizerDropdownOptions}
              required={true}
              width={160}
              disabled={false}
            />
            <PercentageInputControlled
              name="oxidizerPercentage"
              control={control}
              disabled={false}
              width={160}
              maxLength={2}
              placeholder={'Percentage'}
              dataTransformer={inputToNumberDataTransformer}
            />
          </div>
        </div>

        <div>
          <LabelWithCloseButton label="Propellant fuel" />
          <div className={styles.combinedField}>
            <DropdownControlled
              name="fuelDropdown"
              control={control}
              options={fuelDropdownOptions}
              required={true}
              width={160}
              disabled={false}
            />
            <PercentageInputControlled
              name="fuelPercentage"
              control={control}
              disabled={false}
              width={160}
              maxLength={2}
              placeholder={'Percentage'}
              dataTransformer={inputToNumberDataTransformer}
            />
          </div>
        </div>
        <TextFieldControlled
          name="propellantNotes"
          maxLength={100}
          control={control}
          label="Propellant notes"
          hint="ASCII symbols"
          optional="(optional)"
          error={null}
          disabled={false}
          required={false}
          dataTransformer={inputToAsciiDataTransformer}
        />
        <TextFieldControlled
          maxLength={14}
          name="currentTime"
          control={control}
          label="Current Date & Time"
          hint="DD.MM.YY HH-MM"
          error={
            formState.errors['currentTime'] &&
            'Invalid format. Please follow DD.MM.YY HH-MM format.'
          }
          disabled={false}
          validate={validateDateTime}
        />
      </form>
    </div>
  );
};
