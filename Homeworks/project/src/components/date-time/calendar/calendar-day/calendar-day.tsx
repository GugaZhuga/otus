import { CSSProperties, ReactElement } from "react";
import styles from "./calendar-day.module.scss";

function formatDateToWeekday(
    date: Date
) : string {
    const result = date.toLocaleDateString("default", { weekday: "short"});
    return result[0].toUpperCase() + result.slice(1);
}

function formatDateToDay(
    date: Date
) : string {
    return date.toLocaleDateString("default", { day: "numeric" });
}

export type CalendarDayProps = {
    day: Date;
    onDayClick?: (day: Date) => void;
    isWeekday?: boolean;
    isToday?: boolean;
    isSelected?: boolean;
    isStart?: boolean;
    isEnd?: boolean;
    isRange?: boolean;
    isAvailable?: boolean;
    isCurrentMonth?: boolean;
}

export default function CalendarDay({
    day,
    onDayClick,
    isWeekday = false,
    isToday = false,
    isSelected = false,
    isStart = false,
    isEnd = false,
    isRange = false,
    isAvailable = true,
    isCurrentMonth = false,
} : CalendarDayProps) : ReactElement {
    let className = "";
    function addClassName(
        isValue: boolean,
        trueValue: string,
        falseValue?: string,
    ) : void {
        className += " " + (isValue ? trueValue : falseValue ?? "");
    }
    addClassName(isWeekday, styles.weekday, styles.day);
    addClassName(isCurrentMonth, styles.current);
    addClassName(isToday, styles.today);
    addClassName(!isAvailable, styles.notAvailable);
    addClassName(isSelected, styles.selected);
    addClassName(isRange, styles.range);
    addClassName(isStart, styles.start);
    addClassName(isEnd, styles.end);
    return (
        <div className={className} onClick={x => onDayClick?.(day)}>
            <span>{isWeekday ? formatDateToWeekday(day) : formatDateToDay(day)}</span>
        </div>
    );
}