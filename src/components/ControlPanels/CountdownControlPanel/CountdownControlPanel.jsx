import {Button} from "../../Button/Button";
import styles from './CountdownControlPanel.module.css';
import {ControlPanelWrapper} from "../../ControlPanelWrapper/ControlPanelWrapper";
export const CountdownControlPanel = ({onClick, count, loading}) => {
    return (
        <ControlPanelWrapper className={styles.panel}>
            <div className={styles.container}>
                <h1 className={styles.title}>{`Engine launching in ${count} seconds`}</h1>
                <Button
                    text="Abort launch"
                    onClick={onClick}
                    width="100%"
                    iconName={loading ? "loading" : "rocket"}
                    disabled={!!loading}
                />
            </div>
        </ControlPanelWrapper>
    );
}