import { ReactElement, } from "react";
import styles from "./clock-item.module.scss";
import ChevronUp from "../../../../images/chevron/chevron-up.svg";
import ChevronDown from "../../../../images/chevron/chevron-down.svg";

export type ClockItemProps = {
    className?: string;
    value: number;
    onValueChanged: (value: number) => void;
}

export default function ClockItem({
    className,
    value = 0,
    onValueChanged,
} : ClockItemProps) : ReactElement {
    return (
        <div className={className}>
            <div className={styles.clockItem}>
                <input
                    type="number"
                    className={styles.value}
                    value={value.toLocaleString("default", { minimumIntegerDigits: 2, })}
                    onChange={x => onValueChanged(Number(x.target.value))}>
                </input>
                <button
                    className={styles.buttonUp}
                    onClick={x => onValueChanged(value + 1)}>
                        <img src={ChevronUp} alt="Chevron up"></img>
                </button>
                <button
                    className={styles.buttonDown}
                    onClick={x => onValueChanged(value - 1)}>
                        <img src={ChevronDown} alt="Chevron down"></img>
                </button>
            </div>
        </div>
    );
}