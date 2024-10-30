import { CSSProperties, FC, ReactElement, RefAttributes, useEffect, useState } from "react";
import { Calendar, CalendarProps } from "../calendar/calendar";
import { Clock, ClockProps } from "../clock/clock";
import { DateTimeMode } from "../date-time-common-scripts";
import styles from "./calendar-clock.module.scss"

export type CalendarClockProps = CalendarProps & ClockProps & {
    mode?: DateTimeMode;
    dateTime?: Date|null;
    onDateTimeChanged?: (value: Date|null) => void;
}

export const CalendarClock: FC<CalendarClockProps> = ({
    mode = DateTimeMode.DateTime,
    dateTime = null,
    onDateTimeChanged,
    onSelectedDateChanged,
    onTimeChanged,
    ...props
} : CalendarClockProps) : ReactElement => {
    const [currentMode, setCurrentMode] = useState<DateTimeMode>(mode);
    const [currentDateTime, setCurrentDateTime] = useState<Date|null>(dateTime);

    useEffect(() => setCurrentDateTime(dateTime), [dateTime]);
    useEffect(() => setCurrentMode(mode), [mode]);

    function changeDateTime(dateTime: Date|null, isClock: boolean) {
        let result : Date|null = null;
        setCurrentDateTime(y => {
            if (dateTime) {
                if (y) {
                    result = new Date(y);
                } else {
                    result = new Date();
                    if (!isClock) {
                        result.setHours(0, 0, 0, 0);
                    }
                }
                if (isClock)
                    result.setHours(dateTime.getHours(), dateTime.getMinutes(), dateTime.getSeconds(), dateTime.getMilliseconds());
                else
                    result.setFullYear(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());
            }
            return result;
        });
        if (isClock)
            onTimeChanged?.(result);
        else
            onSelectedDateChanged?.(result);
        onDateTimeChanged?.(result);
    }

    const style : CSSProperties = {};
    if (mode === DateTimeMode.TimeOnly) {
        style.borderRadius = "4px";
    }

    return (
        <div className={styles.calendarClock} style={style}>
            { (currentMode === DateTimeMode.DateTime || currentMode === DateTimeMode.DateOnly) && (
            <Calendar
                {...({...props} as CalendarProps)}
                selectedDate={currentDateTime}
                onSelectedDateChanged={x => changeDateTime(x, false)}
                isPartOfCalendarClock={currentMode === DateTimeMode.DateTime}>
            </Calendar>)}
            { (currentMode === DateTimeMode.DateTime || currentMode === DateTimeMode.TimeOnly) && (
            <Clock
                {...({...props} as ClockProps)}
                canShowLabel={true}
                time={currentDateTime}
                onTimeChanged={x => changeDateTime(x, true)}
                isPartOfCalendarClock={currentMode === DateTimeMode.DateTime}>
            </Clock>)}
        </div>
    );
}

export default CalendarClock;