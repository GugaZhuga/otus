import { ReactElement } from "react";
import styles from "./calendar-month.module.scss";

function formatDateToMonth(
    date: Date
) : string {
    const result = date.toLocaleDateString("default", { month: "long" });
    return result[0].toUpperCase() + result.slice(1);
}

export type CalendarMonthProps = {
    month: Date
    onMonthClick?: (month: Date) => void;
    isToday?: boolean,
    isSelected?: boolean,
    isCurrentYear?: boolean,
    isRange?: boolean,
    isStart?: boolean,
    isEnd?: boolean,
    isAvailable?: boolean,
}

export default function CalendarMonth({
    month,
    onMonthClick,
    isToday = false,
    isSelected = false,
    isCurrentYear = false,
    isRange = false,
    isStart = false,
    isEnd = false,
    isAvailable = true,
} : CalendarMonthProps) : ReactElement {
    let className = "";
    function addClassName(
        isValue: boolean,
        trueValue: string,
        falseValue?: string,
    ) : void {
        className += " " + (isValue ? trueValue : falseValue ?? "");
    }
    addClassName(isCurrentYear, styles.current);
    addClassName(isToday, styles.today);
    addClassName(!isAvailable, styles.notAvailable);
    addClassName(isSelected, styles.selected);
    addClassName(isRange, styles.range);
    addClassName(isStart, styles.start);
    addClassName(isEnd, styles.end);
    return (
        <div className={styles.month + className} onClick={x => onMonthClick?.(month)}>
            <span>{formatDateToMonth(month)}</span>
        </div>
    );
}