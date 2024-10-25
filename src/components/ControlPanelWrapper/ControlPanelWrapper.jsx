import styles from './ControlPanelWrapper.module.css';
import classNames from "classnames";
export const ControlPanelWrapper = ({children, className}) => {
    return (
        <div className={classNames(styles.controls, className)}>
            {children}
        </div>
    );
};