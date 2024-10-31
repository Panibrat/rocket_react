import { Controller } from 'react-hook-form';
import { TextField } from '../../TextField/TextField';
import { useRef } from 'react';

export const TextFieldControlled = ({
  name,
  control,
  required = true,
  placeholder = '',
  label,
  hint,
  optional,
  error,
  disabled,
  maxLength,
  dataTransformer,
  validate,
  ref
}) => {
  const inputRef = useRef(null);
  const currentInputRef = ref || inputRef;

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required, validate: validate }}
      render={({ field: { onChange, value }, formState: { errors } }) => (
        <TextField
          ref={inputRef}
          placeholder={placeholder}
          hint={hint}
          optional={optional}
          label={label}
          error={(errors[name] && 'Field is required') || error}
          onChange={(e) => {
            const input = e.target.value || '';
            if (dataTransformer) {
              onChange(dataTransformer(input));
            } else {
              onChange(e);
            }
          }}
          onInputClear={() => {
            onChange('');
            if (currentInputRef) {
              currentInputRef.current.focus();
            }
          }}
          value={value}
          disabled={disabled}
          maxLength={maxLength}
        />
      )}
    />
  );
};
