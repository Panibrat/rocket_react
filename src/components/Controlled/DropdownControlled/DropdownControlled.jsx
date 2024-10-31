import { DropDown } from '../../DropDown/DropDown';
import { Controller } from 'react-hook-form';

export const DropdownControlled = ({
  name,
  control,
  required = true,
  options,
  width,
  disabled
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field: { onChange, onBlur, value }, formState: { errors } }) => (
        <DropDown
          options={options}
          error={errors[name] && 'Field is required?'}
          width={width}
          onChange={onChange}
          value={value}
          disabled={disabled}
        />
      )}
    />
  );
};
