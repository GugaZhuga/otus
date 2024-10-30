import { CSSProperties, FC, PropsWithChildren, ReactElement, useCallback, useEffect, useMemo, useReducer, useState } from "react";
import CalendarDays from "./calendar-days/calendar-days";
import CalendarNavigation from "./calendar-navigation/calendar-navigation";
import CalendarMonths from "./calendar-months/calendar-months";
import styles from "./calendar.module.scss";
import { compareDays, hasAnyDayBetweenStartAndEndDays, isAvailableDay } from "../date-time-common-scripts";

function getDaysOfMonth(
    date: Date,
    numberOfDays: number = 42,
    startWeekdayIndex: number = 1, // 0 - воскресенье
) : Date[] {
    let dayOfMonth = new Date(date);
    dayOfMonth.setDate(1);
    dayOfMonth.setHours(0, 0, 0, 0);
    let weekday = dayOfMonth.getDay();
    if (weekday === 0)
        weekday += 7;
    const offset = (startWeekdayIndex - weekday);
    dayOfMonth.setDate(offset);
    const daysOfMonth: Date[] = [];
    for(let i = 0; i < numberOfDays; i++) {
        dayOfMonth = new Date(dayOfMonth);
        dayOfMonth.setDate(dayOfMonth.getDate() + 1);
        daysOfMonth.push(dayOfMonth);
    }
    return daysOfMonth;
}

function getMonthsOfYear(
    date: Date,
) : Date[] {
    const monthsOfYear : Date[] = [];
    for(let i = 0; i < 12; i++) {
        const monthOfYear = new Date(date);
        monthOfYear.setMonth(i);
        monthOfYear.setDate(1);
        monthOfYear.setHours(0, 0, 0, 0);
        monthsOfYear.push(monthOfYear);
    }
    return monthsOfYear;
}

function formatDateToMonthWithYear(
    date: Date
) : string {
    const result = date.toLocaleDateString("default", { month: "long", year: "numeric", });
    return result[0].toLocaleUpperCase() + result.slice(1);
}

function formatDateToYear(
    date: Date
) : string {
    return date.toLocaleDateString("default", { year: "numeric", });
}

export enum CalendarNavigationMode {
    Days,
    Months,
}

export enum CalendarSelectionMode {
    None,
    Single,
    Multiple,
    Range,
}

export type CalendarProps = PropsWithChildren & {
    navigationDate?: Date;
    navigationMode?: CalendarNavigationMode;
    onNavigationModeChanged?: (navigationMode: CalendarNavigationMode) => void;
    selectionMode?: CalendarSelectionMode;
    onSelectionModeChanged?: (selectionMode: CalendarSelectionMode) => void;
    selectedDate?: Date|null;
    onSelectedDateChanged?: (selectedDate: Date | null) => void;
    selectedDates?: Date[];
    onSelectedDatesChanged?: (selectedDates: Date[]) => void;
    startDate?: Date|null;
    onStartDateChanged?: (startDate: Date|null) => void;
    endDate?: Date|null;
    onEndDateChanged?: (endDate: Date|null) => void;
    onDateRangeChanged?: (dateRange: [Date, Date]|null) => void;
    minAvailableDate?: Date|null;
    maxAvailableDate?: Date|null;
    notAvailableDates?: Date[];
    availableDates?: Date[];
    isPartOfCalendarClock?: boolean;
}

export function Calendar({
    navigationDate,
    navigationMode = CalendarNavigationMode.Days,
    onNavigationModeChanged,
    selectionMode = CalendarSelectionMode.None,
    onSelectionModeChanged,
    selectedDate = null,
    onSelectedDateChanged,
    selectedDates = [],
    onSelectedDatesChanged,
    startDate = null,
    onStartDateChanged,
    endDate = null,
    onEndDateChanged,
    onDateRangeChanged,
    minAvailableDate = null,
    maxAvailableDate = null,
    notAvailableDates = [],
    availableDates = [],
    isPartOfCalendarClock = false,
} : CalendarProps) : ReactElement {
    const [currentNavigationMode, setCurrentNavigationMode] = useState<CalendarNavigationMode>(navigationMode);
    const [currentNavigationDate, setCurrentNavigationDate] = useState<Date>(new Date());
    const [currentSelectionMode, setCurrentSelectionMode] = useState<CalendarSelectionMode>(selectionMode);
    const [days, setDays] = useState<Date[]>([]);
    const [months, setMonths] = useState<Date[]>([]);
    const [caption, setCaption] = useState<string>("");
    const [currentSelectedDate, setCurrentSelectedDate] = useState<Date | null>(selectedDate);
    const [currentSelectedDates, setCurrentSelectedDates] = useState<Date[]>(selectedDates);
    const [currentStartDate, setCurrentStartDate] = useState<Date|null>(startDate);
    const [currentEndDate, setCurrentEndDate] = useState<Date|null>(endDate);
    const [currentMinAvailableDate, setCurrentMinAvailableDate] = useState<Date|null>(minAvailableDate);
    const [currentMaxAvailableDate, setCurrentMaxAvailableDate] = useState<Date|null>(maxAvailableDate);
    const [currentNotAvailableDates, setCurrentNotAvailableDates] = useState<Date[]>(notAvailableDates);
    const [currentAvailableDates, setCurrentAvailableDates] = useState<Date[]>(availableDates);
    const todayDate = new Date();

    function changeSelectedDate(selectedDate: Date|null) : void {
        setCurrentSelectedDate(selectedDate);
        onSelectedDateChanged?.(selectedDate);
    }
    function changeSelectedDates(selectedDates: Date[]) : void {
        setCurrentSelectedDates(selectedDates);
        onSelectedDatesChanged?.(selectedDates);
    }
    function changeStartDate(startDate: Date|null) : void {
        setCurrentStartDate(startDate);
        onStartDateChanged?.(startDate);
        if (startDate && currentEndDate)
            onDateRangeChanged?.([startDate, currentEndDate]);
        else if (!startDate && !currentEndDate)
            onDateRangeChanged?.(null);
    }
    function changeEndDate(endDate: Date|null) : void {
        setCurrentEndDate(endDate);
        onEndDateChanged?.(endDate);
        if (currentStartDate && endDate)
            onDateRangeChanged?.([currentStartDate, endDate]);
        else if (!currentStartDate && !endDate)
            onDateRangeChanged?.(null);
    }


    function changeDay(date: Date) : void {
        // Если дата является не доступной, то ничего не делаем
        if (!isAvailableDay(
            date,
            currentMinAvailableDate,
            currentMaxAvailableDate,
            currentNotAvailableDates,
            currentAvailableDates))
            return;
        switch(currentSelectionMode) {
            case CalendarSelectionMode.None:
                break;
            case CalendarSelectionMode.Single:
                changeSelectedDate(date === currentSelectedDate ? null : date);
                break;
            case CalendarSelectionMode.Multiple:
                const firstDate = days[0]
                const lastDate = days[days.length - 1];
                changeSelectedDates(currentSelectedDates
                    .filter(x => x < firstDate)
                    .concat(days
                        .filter(x => currentSelectedDates.filter(y => compareDays(x, y)).length ? x !== date : x === date))
                    .concat(currentSelectedDates
                        .filter(x => x > lastDate)));
            break;
            case CalendarSelectionMode.Range:
                // Если есть начало
                if (currentStartDate) {
                    // Если равна началу, то обнуляем начало
                    if (compareDays(currentStartDate, date))
                        changeStartDate(null);
                    // иначе если есть конец
                    else if (currentEndDate) {
                        // если равна концу, то обнуляем конец
                        if (compareDays(currentEndDate, date))
                            changeEndDate(null);
                        // иначе если начало меньше, то выставляем конец
                        else if (compareDays(currentStartDate, date, false)) {
                            // если между началом и концом есть недоступные даты, то ничего не делаем
                            if (hasAnyDayBetweenStartAndEndDays(notAvailableDates, currentStartDate, date))
                                return;
                            changeEndDate(date);
                        }
                        // иначе если конец больше, то выставляем начало
                        else if (compareDays(currentEndDate, date, true)) {
                            // если между началом и концом есть недоступные даты, то ничего не делаем
                            if (hasAnyDayBetweenStartAndEndDays(notAvailableDates, date, currentEndDate))
                                return;
                            changeStartDate(date);
                        }
                        // // иначе выставляем конец
                        // else
                        //     changeEndDate(date);
                    }
                    // иначе
                    else {
                        // если начало меньше, то выставляем конец
                        if (compareDays(currentStartDate, date, false)) {
                            // если между началом и концом есть недоступные даты, то ничего не делаем
                            if (hasAnyDayBetweenStartAndEndDays(notAvailableDates, currentStartDate, date))
                                return;
                            changeEndDate(date);
                        }
                        // иначе выставляем начало и конец
                        else {
                            // если между началом и концом есть недоступные даты, то ничего не делаем
                            if (hasAnyDayBetweenStartAndEndDays(notAvailableDates, date, currentStartDate))
                                return;
                            changeStartDate(date);
                            changeEndDate(currentStartDate);
                        }
                    }
                }
                // иначе если есть конец
                else if (currentEndDate) {
                    // если равна концу, то обнуляем конец
                    if (compareDays(currentEndDate, date))
                        changeEndDate(null);
                    // иначе
                    else {
                        // если конец больше, то выставляем начало
                        if (compareDays(currentEndDate, date, true)) {
                            // если между началом и концом есть недоступные даты, то ничего не делаем
                            if (hasAnyDayBetweenStartAndEndDays(notAvailableDates, date, currentEndDate))
                                return;
                            changeStartDate(date);
                        }
                        // иначе выставляем начало и конец
                        else {
                            // если между началом и концом есть недоступные даты, то ничего не делаем
                            if (hasAnyDayBetweenStartAndEndDays(notAvailableDates, currentEndDate, date))
                                return;
                            changeStartDate(currentEndDate);
                            changeEndDate(date);
                        }
                    }
                }
                // иначе выставляем начало
                else {
                    changeStartDate(date);
                }
                break;
            default:
                throw new Error();
        }
    }
    function changeMonth(date: Date) : void {
        const mode = CalendarNavigationMode.Days;
        setCurrentNavigationMode(mode);
        setCurrentNavigationDate(date);
        onNavigationModeChanged?.(mode);
    }
    function switchCurrentNavigationDate(offset: number) : void {
        setCurrentNavigationDate(x => {
            const date = new Date(currentNavigationDate);
            switch(currentNavigationMode) {
                case CalendarNavigationMode.Days:
                    date.setMonth(date.getMonth() + offset);
                    break;
                case CalendarNavigationMode.Months:
                    date.setFullYear(date.getFullYear() + offset);
                    break;
                default:
                    throw new Error();
            }
            return date;
        });
    }
    function switchCurrentNavigationMode() : void {
        let mode : CalendarNavigationMode;
        switch(currentNavigationMode) {
            case CalendarNavigationMode.Days:
                mode = CalendarNavigationMode.Months;
                break;
            case CalendarNavigationMode.Months:
                mode = CalendarNavigationMode.Days;
                break;
            default:
                throw new Error();
        }
        setCurrentNavigationMode(mode);
        onNavigationModeChanged?.(mode);
    }
    
    useEffect(() => {
        if (navigationDate) {
            setCurrentNavigationDate(navigationDate);
        } else {
            let date = currentNavigationDate;
            switch(selectionMode) {
                case CalendarSelectionMode.None:
                    break;
                case CalendarSelectionMode.Single:
                    if (selectedDate)
                        date = new Date(selectedDate);
                    break;
                case CalendarSelectionMode.Multiple:
                    if (selectedDates?.length > 0)
                        date = new Date(selectedDates[0]);
                    break;
                case CalendarSelectionMode.Range:
                    if (startDate)
                        date = new Date(startDate);
                    break;
                default:
                    throw new Error();
            }
            setCurrentNavigationDate(date);
        }
        if (currentAvailableDates.length && currentNotAvailableDates.length)
            throw new Error();
    }, []);
    useEffect(() => {
        if (navigationDate) {
            setCurrentNavigationDate(navigationDate);
        }
    }, [navigationDate]);
    useEffect(() => setCurrentNavigationMode(navigationMode), [navigationMode]);
    useEffect(() => setCurrentSelectionMode(selectionMode), [selectionMode]);
    useEffect(() => {
        if (!selectedDate || isAvailableDay(
            selectedDate,
            currentMinAvailableDate,
            currentMaxAvailableDate,
            currentNotAvailableDates,
            currentAvailableDates)) {
                setCurrentSelectedDate(selectedDate);
        }
    }, [selectedDate]);
    useEffect(() => {
        const length = selectedDates
            .filter(x => currentSelectedDates.includes(x)
                && isAvailableDay(
                    x,
                    currentMinAvailableDate,
                    currentMaxAvailableDate,
                    currentNotAvailableDates,
                    currentAvailableDates
                ))
            .length;
        if (length !== selectedDates.length) {
            setCurrentSelectedDates(selectedDates);
        }
    }, [selectedDates]);
    useEffect(() => {
        if (!startDate
            || isAvailableDay(
                startDate,
                currentMinAvailableDate,
                currentMaxAvailableDate,
                currentNotAvailableDates,
                currentAvailableDates)
            && (!currentEndDate || !hasAnyDayBetweenStartAndEndDays(currentNotAvailableDates, startDate, currentEndDate))) {
            setCurrentStartDate(startDate);
        }
    }, [startDate]);
    useEffect(() => {
        if (!endDate
            || isAvailableDay(endDate,
                currentMinAvailableDate,
                currentMaxAvailableDate,
                currentNotAvailableDates,
                currentAvailableDates)
            && (!currentStartDate || !hasAnyDayBetweenStartAndEndDays(currentNotAvailableDates, currentStartDate, endDate))
        ) {
            setCurrentEndDate(endDate);
        }
    }, [endDate]);
    useEffect(() => setCurrentMinAvailableDate(minAvailableDate), [minAvailableDate]);
    useEffect(() => setCurrentMaxAvailableDate(maxAvailableDate), [maxAvailableDate]);
    useEffect(() => {
        if (notAvailableDates.length && currentAvailableDates.length) {
            throw new Error();
        } else {
            const length = notAvailableDates.filter(x => currentNotAvailableDates.includes(x)).length;
            if (length !== notAvailableDates.length)
                setCurrentNotAvailableDates(notAvailableDates);
        }
    }, [notAvailableDates]);
    useEffect(() => {
        if (availableDates.length && currentNotAvailableDates.length) {
            throw new Error();
        } else {
            const length = availableDates.filter(x => currentAvailableDates.includes(x)).length;
            if (length !== availableDates.length)
                setCurrentAvailableDates(availableDates);
        }
    }, [availableDates]);
    useEffect(() => {
        switch(currentNavigationMode) {
            case CalendarNavigationMode.Days:
                setCaption(formatDateToMonthWithYear(currentNavigationDate));
                setDays(getDaysOfMonth(currentNavigationDate));
                break;
            case CalendarNavigationMode.Months:
                setCaption(formatDateToYear(currentNavigationDate));
                setMonths(getMonthsOfYear(currentNavigationDate));
                break;
            default:
                throw new Error();
        }
    }, [currentNavigationMode, currentNavigationDate]);

    let style : CSSProperties = {};
    let contentStyle : CSSProperties = {};
    if (isPartOfCalendarClock) {
        contentStyle = {
            ...contentStyle,
            borderRadius: "0px",
        };
        style = {
            ...style,
            borderRadius: "12px 12px 0px 0px",
            boxShadow: "none",
        }
    }

    function renderNavigation() : ReactElement {
        return <CalendarNavigation
            captionLabel={caption}
            onPrevClick={() => switchCurrentNavigationDate(-1)}
            onCaptionClick={switchCurrentNavigationMode}
            onNextClick={() => switchCurrentNavigationDate(1)}
        />
    };
    function renderContent() : ReactElement {
        switch(currentNavigationMode) {
            case CalendarNavigationMode.Days:
                return <CalendarDays
                    navigationDate={currentNavigationDate}
                    selectionMode={currentSelectionMode}
                    days={days}
                    onDayClick={changeDay}
                    todayDay={todayDate}
                    selectedDay={currentSelectedDate}
                    selectedDays={currentSelectedDates}
                    startDay={currentStartDate}
                    endDay={currentEndDate}
                    minAvailableDay={currentMinAvailableDate}
                    maxAvailableDay={currentMaxAvailableDate}
                    notAvailableDays={currentNotAvailableDates}
                    availableDays={currentAvailableDates}
                    style={contentStyle}
                />;
            case CalendarNavigationMode.Months:
                return <CalendarMonths
                    navigationDate={currentNavigationDate}
                    selectionMode={currentSelectionMode}
                    months={months}
                    onMonthClick={changeMonth}
                    todayMonth={todayDate}
                    selectedMonth={currentSelectedDate}
                    selectedMonths={currentSelectedDates}
                    startMonth={currentStartDate}
                    endMonth={currentEndDate}
                    minAvailableMonth={currentMinAvailableDate}
                    maxAvailableMonth={currentMaxAvailableDate}
                    notAvailableMonths={currentNotAvailableDates}
                    availableMonths={currentAvailableDates}
                    style={contentStyle}
                />;
            default:
                throw new Error();
        }
    }

    return <div className={styles.calendar} style={style}>
        <div>{renderNavigation()}</div>
        <div>{renderContent()}</div>
    </div>
}

export default Calendar;