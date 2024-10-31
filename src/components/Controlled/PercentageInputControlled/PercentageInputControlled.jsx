import { DropDown } from '../../DropDown/DropDown';
import { Controller } from 'react-hook-form';
import { PercentageInput } from '../../PercentageInput/PercentageInput';

export const PercentageInputControlled = ({
  name,
  control,
  width = 160,
  disabled,
  placeholder,
  maxLength = 3,
  dataTransformer
}) => {
  return (
    <Controller
      name={name}
      control={control}
      // rules={ { required: true, max: 100 } }
      render={({ field: { onChange, onBlur, value }, formState: { errors } }) => (
        <PercentageInput
          width={width}
          maxLength={maxLength}
          onChange={(e) => {
            const input = e.target.value || '';
            if (dataTransformer) {
              onChange(dataTransformer(input));
            } else {
              onChange(e);
            }
          }}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
        />
      )}
    />
  );
};
