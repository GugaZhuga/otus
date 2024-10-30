import React, { ReactElement, FC, useRef, useState, useEffect } from "react";
import styles from "./date-time-picker.module.scss";
import CalendarClock, { CalendarClockProps } from "../calendar-clock/calendar-clock";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { DateTimeMode, getValueByMode } from "../date-time-common-scripts";
import { CalendarSelectionMode } from "../calendar/calendar";
import MaskedInput, { MaskedInputProps } from "../../masked-input/masked-input";

function dateTimeToString(
    mode : DateTimeMode,
    dateTime: Date|null
) : string {
    const date = dateTime?.toLocaleString("default", { day: "2-digit", month: "2-digit", year: "numeric", }) ?? "__.__.____";
    const time = dateTime?.toLocaleTimeString("default", { hour: "2-digit", minute: "2-digit", }) ?? "__:__";
    return getValueByMode(mode, date + " " + time, date, time);
}

export type DateTimePickerProps = {
    mode?: DateTimeMode;
    selectionMode?: CalendarSelectionMode.Single | CalendarSelectionMode.Range
    dateTime?: Date|null;
    onDateTimeChanged?: (value: Date|null) => void;
    endDateTime?: Date|null;
    onDateTimeRangeChanged?: (dateTimeRange: [Date, Date]|null) => void;
    label?: string;
}

export function DateTimePicker({
    mode = DateTimeMode.DateTime,
    selectionMode = CalendarSelectionMode.Single,
    dateTime = null,
    onDateTimeChanged,
    endDateTime = null,
    onDateTimeRangeChanged,
    label,
} : DateTimePickerProps) : ReactElement {
    if (selectionMode === CalendarSelectionMode.Range && mode !== DateTimeMode.DateOnly) {
        mode = DateTimeMode.DateOnly;
    }
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentDateTime, setCurrentDateTime] = useState<Date|null>(dateTime);
    const [currentDateTimeString, setCurrentDateTimeString] = useState<string>("");
    const [currentEndDateTime, setCurrentEndDateTime] = useState<Date|null>(endDateTime);
    let inputRef = useRef<HTMLDivElement>(null);
    let calendarClockRef = useRef<HTMLDivElement>(null);

    useOutsideClick({
        refs: [inputRef, calendarClockRef ],
        handler: x => {
            if (isOpen) {
                setIsOpen(!isOpen);
            }
        }
    });

    useEffect(() => changeDateTime(currentDateTime, currentEndDateTime, null, null), []);
    useEffect(() => setCurrentDateTime(dateTime), [dateTime]);
    useEffect(() => setCurrentEndDateTime(endDateTime), [endDateTime]);
    useEffect(() => {
        const dateTimeStrings = currentDateTimeString.split(" - ");
        changeDateTime(currentDateTime, currentEndDateTime, dateTimeStrings[0], dateTimeStrings[1]);
    }, [currentDateTime, currentEndDateTime, currentDateTimeString]);

    function parseStringToDateTime(dateTimeString: string) : Date|null {
        let day: number|undefined;
        let month: number|undefined;
        let year: number|undefined;
        if (mode === DateTimeMode.DateTime || mode === DateTimeMode.DateOnly) {
            const y = Number(dateTimeString.substring(6, 10));
            if (!Number.isNaN(y))
                year = y;
            const m = Number(dateTimeString.substring(3, 5)) - 1;
            if (!Number.isNaN(m))
                month = m
            const d = Number(dateTimeString.substring(0, 2));
            if (!Number.isNaN(d))
                day = d;
        }
        let hours : number|undefined;
        let minutes : number|undefined;
        if (mode === DateTimeMode.DateTime) {
            const h = Number(dateTimeString.substring(11, 13));
            if (!Number.isNaN(h))
                hours = h;
            const m = Number(dateTimeString.substring(14, 16));
            if (!Number.isNaN(m))
                minutes = m;
        }
        if (mode === DateTimeMode.TimeOnly) {
            console.log(dateTimeString);
            console.log(dateTimeString.substring(0, 2));
            const h = Number(dateTimeString.substring(0, 2));
            if (!Number.isNaN(h))
                hours = h;
            console.log(dateTimeString.substring(3, 5));
            const m = Number(dateTimeString.substring(3, 5));
            if (!Number.isNaN(m))
                minutes = m;
        }
        if (mode === DateTimeMode.DateTime || mode === DateTimeMode.TimeOnly) {
            if (hours && hours > 23)
                hours = 0;
            if (minutes && minutes > 59)
                minutes = 0;
        }
        switch(mode) {
            case DateTimeMode.DateTime:
                if (day && month && year && hours && minutes) {
                    const result = new Date();
                    result.setFullYear(year, month, day);
                    result.setHours(hours, minutes);
                    return result;
                } else {
                    return null;
                }
            case DateTimeMode.DateOnly:
                if (day && month && year) {
                    const result = new Date();
                    result.setFullYear(year, month, day);
                    result.setHours(0, 0);
                    return result;
                } else {
                    return null;
                }
            case DateTimeMode.TimeOnly:
                if (hours && minutes) {
                    const result = new Date();
                    result.setFullYear(0, 0, 0);
                    result.setHours(hours, minutes);
                    return result;
                } else {
                    return null;
                }
            default:
                throw new Error();
        } 
    }

    function changeDateTime(
        dateTime: Date|null,
        endDateTime: Date|null,
        dateTimeString: string|null,
        endDateTimeString: string|null
    ) : void {
        const defaultDateTimeString = getValueByMode(mode, "__.__.____ __:__", "__.__.____", "__:__");
        switch(selectionMode) {
            case CalendarSelectionMode.Single:
                setCurrentDateTime(dateTime);
                setCurrentDateTimeString(dateTime ? dateTimeToString(mode, dateTime) : dateTimeString ?? defaultDateTimeString);
                break;
            case CalendarSelectionMode.Range:
                setCurrentDateTime(dateTime);
                setCurrentEndDateTime(endDateTime);
                setCurrentDateTimeString(
                    (dateTime ? dateTimeToString(mode, dateTime) : dateTimeString ?? defaultDateTimeString)
                    + " - " +
                    (endDateTime ? dateTimeToString(mode, endDateTime) : endDateTimeString ?? defaultDateTimeString));
                break;
            default:
                throw new Error();
        }
    }    

    function onDateTimeStringChanged(dateTimeString: string) : void {
        switch(selectionMode) {
            case CalendarSelectionMode.Single:
                const result = parseStringToDateTime(dateTimeString);
                changeDateTime(result, null, dateTimeString, "");
                if (result !== currentDateTime)
                    onDateTimeChanged?.(result);
                break;
            case CalendarSelectionMode.Range:
                const dateTimeStrings = dateTimeString.split(" - ");
                const result1 = parseStringToDateTime(dateTimeStrings[0]);
                const result2 = parseStringToDateTime(dateTimeStrings[1]);
                changeDateTime(result1, result2, dateTimeStrings[0], dateTimeStrings[1]);
                if (result1 !== currentDateTime && result2 !== currentEndDateTime) {
                    const dateTime = result1 ?? currentDateTime;
                    const dateTime2 = result2 ?? currentEndDateTime;
                    if (dateTime && dateTime2)
                        onDateTimeRangeChanged?.([dateTime, dateTime2]);
                    else
                        onDateTimeRangeChanged?.(null);
                }
                break;
            default:
                throw new Error();
        }
    }

    return (
        <div>
            <div className={styles.dateTimeField} ref={inputRef}>
                <MaskedInput
                    type={selectionMode === CalendarSelectionMode.Single
                        ? getValueByMode(
                            mode,
                            "datetime",
                            "date",
                            "time")
                        : "daterange"
                    }
                    label={label ?? getValueByMode(mode, "Дата и время", "Дата", "Время")}
                    value={currentDateTimeString}
                    onChange={x => onDateTimeStringChanged(x.target.value)}
                    onIconClick={x => {
                        if (!isOpen && selectionMode === CalendarSelectionMode.Range && !currentDateTime) {
                            setCurrentDateTime(new Date());
                        }
                        setIsOpen(!isOpen);
                    }}
                />
            </div>
            {isOpen && (
                <div className={styles.dateTimeContent} ref={calendarClockRef}>
                    <CalendarClock
                        mode={mode}
                        selectionMode={selectionMode}
                        dateTime={currentDateTime}
                        startDate={currentDateTime}
                        endDate={(currentEndDateTime)}
                        onSelectedDateChanged={x => {
                            setCurrentDateTime(x);
                            setIsOpen(!isOpen);
                            onDateTimeChanged?.(x);
                        }}
                        onDateRangeChanged={x => {
                            setCurrentDateTime(x?.[0]??null);
                            setCurrentEndDateTime(x?.[1]??null);
                            setIsOpen(!isOpen);
                            onDateTimeRangeChanged?.(x);
                        }}
                        onHoursChanged={x => {
                            if (mode === DateTimeMode.TimeOnly) {
                                onDateTimeStringChanged(x.toLocaleString("default", { minimumIntegerDigits: 2, }) + currentDateTimeString.substring(2));
                            }
                        }}
                        onMinutesChanged={x => {
                            if (mode === DateTimeMode.TimeOnly) {
                                onDateTimeStringChanged(currentDateTimeString.substring(0, 3) + x.toLocaleString("default", { minimumIntegerDigits: 2, }));
                            }
                        }}
                        // onTimeChanged={x => {
                        //     if (mode === DateTimeMode.TimeOnly) {
                        //         setCurrentDateTime(x);
                        //     }
                        // }}
                        >
                    </CalendarClock>
                </div>
            )}
        </div>
    );
};

export default DateTimePicker;