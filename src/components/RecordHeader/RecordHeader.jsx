import styles from "./RecordHeader.module.css";
import {RecordingIcon} from "../Icons/RecordingIcon";
import classNames from "classnames";
import {RocketIcon} from "../Icons/RocketIcon";

export const RecordHeader = ({timeText, onSave, engineMode, countDownMode}) => {
    const handleClick = (event) => {
        event.preventDefault();
        onSave();
    };
    return (
        <div className={classNames(styles.content, engineMode && styles.activeContent)}>
            <div className={styles.timeRecord}>
                <RecordingIcon className={classNames(styles.recordIcon, engineMode && styles.activeRecordIcon)}/>
                <h1 className={engineMode && styles.activeText}>{timeText}</h1>
                {
                    engineMode && <RocketIcon className={styles.rocketIcon}/>
                }
            </div>
            <a
                className={classNames(engineMode && styles.activeText, countDownMode && styles.disabled)}
                href="/"
                onClick={handleClick}>Stop & Save recording
            </a>
        </div>
    )
}