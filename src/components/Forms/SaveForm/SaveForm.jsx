import { useForm, useWatch } from 'react-hook-form';
import { LabelWithCloseButton } from '../../LabelRow/LabelWithCloseButton/LabelWithCloseButton';
import { TextAreaControlled } from '../../Controlled/TextAreaControlled/TextAreaControlled';
import { readFormDataFromLocalStorage } from '../../../utils/readFormDataFromLocalStorage';
import { useEffect } from 'react';
import { saveFormDataToLocalStorage } from '../../../utils/saveFormDataToLocalStorage';

export const SaveForm = ({ id, onFormSubmit, disabled }) => {
  const storedData = readFormDataFromLocalStorage(id);
  const defaultValues = {
    studyNote: storedData.studyNote || ''
  };
  const { handleSubmit, control } = useForm({ defaultValues });
  const onSubmit = (data) => {
    onFormSubmit(data);
  };

  const data = useWatch({
    control
  });

  useEffect(() => {
    saveFormDataToLocalStorage(id, data);
  }, [data, id]);

  return (
    <div>
      <form id={id} onSubmit={handleSubmit(onSubmit)}>
        <LabelWithCloseButton label="Study notes" optional="(optional)" hint="ASCII symbols" />
        <TextAreaControlled control={control} name="studyNote" placeholder="" disabled={disabled} />
      </form>
    </div>
  );
};
