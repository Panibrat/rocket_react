import styles from "./Input.module.css";
import {forwardRef} from "react";
import classNames from "classnames";

export const Input = forwardRef(({
    maxLength= 8,
    placeholder = "",
    onChange,
    value,
    disabled,
    type="text",
    name
}, ref) => {

    // console.log('input_value', value)
    // console.log('input_onChange', onChange)
    // console.log('input_ref', ref)

    return (
        <>
            <input
                ref={ref}
                name={name}
                value={value}
                maxLength={maxLength}
                className={classNames(
                    styles.input,
                    {
                        [styles.disabled]: disabled
                    }
                )}
                type={type}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
            />
        </>
    );
});