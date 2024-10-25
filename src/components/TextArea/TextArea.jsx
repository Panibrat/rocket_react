import styles from './TextArea.module.css';

export const TextArea = ({
    onChange,
    maxLength,
    disabled = false,
    placeholder,
    value
}) => {
    const handleChange = (e) => {
        const text = e.target.value;
        if (onChange) {
            onChange(text)
        }
    };

    return (
        <div className={styles.content}>
            <textarea
                value={value}
                className={styles.textarea}
                placeholder={placeholder}
                onChange={handleChange}
                maxLength={maxLength}
                disabled={disabled} />
        </div>
    );
};