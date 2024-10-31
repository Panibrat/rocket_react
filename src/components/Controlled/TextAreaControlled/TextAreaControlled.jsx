import { Controller } from 'react-hook-form';
import { TextArea } from '../../TextArea/TextArea';

export const TextAreaControlled = ({ name, control, placeholder = '', disabled, maxLength }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextArea
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          disabled={disabled}
          maxLength={maxLength}
        />
      )}
    />
  );
};
