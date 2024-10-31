import Select from 'react-select';
import { components as reactSelectComponents } from 'react-select';
import styles from './DropDown.module.css';
import { CheckIcon } from '../Icons/CheckIcon';
import { ChevronDownIcon } from '../Icons/ChevronDownIcon';
import { ChevronUpIcon } from '../Icons/ChevronUpIcon';

const dropDownStyles = {
  singleValue: (styles, state) => {
    // console.log('singleValue_styles', styles);
    // console.log('singleValue_state', state);
    return {
      ...styles,
      marginLeft: 16,
      marginRight: 16,
      color: state.isDisabled ? '#777' : state.selectProps.menuIsOpen ? '#FFF' : '#000',

      '&:hover': {
        color: '#FFF'
      }
    };
  },
  control: (styles, state) => {
    // console.log('control_styles', styles);
    // console.log('control_state', state);
    return {
      ...styles,
      minHeight: 48,
      boxShadow: 'none',
      borderWidth: 0,
      borderRadius: 8,
      backgroundColor: state.selectProps.menuIsOpen ? '#000 !important' : '#EFEFEF',
      '&:hover': {
        backgroundColor: '#434343',
        color: '#FFF'
      }
    };
  },
  menu: (styles) => {
    // console.log('menu_styles', styles);
    // console.log('menu_state', state);
    return {
      ...styles,
      borderRadius: 8,
      border: '2px solid var(--Primary-Primary, #000)'
    };
  },
  // container: (styles, state) => {
  //     console.log('123456_styles', styles);
  //     console.log('123456_state', state);
  //     return (
  //         {
  //             ...styles,
  //             // backgroundColor: 'blue',
  //             color:  state.selectProps.menuIsOpen ? 'red' : 'yellow',
  //
  //
  //         }
  //     );
  // },
  option: (styles) => {
    return {
      ...styles,
      padding: 0,
      // color: isSelected ? 'red' : 'green',
      backgroundColor: '#FFF',
      ':active': {
        backgroundColor: '#FFF'
      }
    };
  }
};

const CustomOption = (props) => {
  const { data, isSelected } = props;

  return (
    <reactSelectComponents.Option {...props}>
      <div className={styles.option}>
        <h2 className={styles.optionText}>{data.label}</h2>
        {isSelected && <CheckIcon className={styles.checkedIcon} />}
      </div>
    </reactSelectComponents.Option>
  );
};

const DropdownIndicator = (props) => {
  const { menuIsOpen, isDisabled } = props.selectProps;

  return (
    <div className={styles.dropdownIndicator}>
      {menuIsOpen ? (
        <ChevronUpIcon className={styles.upDropdownIndicator} />
      ) : (
        <ChevronDownIcon className={isDisabled ? styles.disabledDropdownIndicator : ''} />
      )}
    </div>
  );
};

const IndicatorSeparator = () => null;

const components = {
  Option: CustomOption,
  DropdownIndicator,
  IndicatorSeparator
};

export const DropDown = ({
  onChange,
  value,
  options,
  error,
  disabled = false,
  width,
  ...otherProps
}) => {
  // console.log('123_otherProps', otherProps);
  return (
    <div className={styles.wrapper}>
      <div style={{ width: width ? width : 'auto' }} className={styles.content}>
        <Select
          {...otherProps}
          options={options}
          styles={dropDownStyles}
          isDisabled={disabled}
          components={components}
          isSearchable={false}
          onChange={onChange}
          value={value}
        />
      </div>
      {error && <h2 className={styles.error}>{error}</h2>}
    </div>
  );
};
