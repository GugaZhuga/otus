import { CSSProperties, ReactElement, useEffect, useState } from "react";
import styles from "./calendar-days.module.scss";
import CalendarDay from "../calendar-day/calendar-day";
import { CalendarSelectionMode } from "../calendar";
import { compareDays, compareMonths, isAvailableDay } from "../../date-time-common-scripts";

export type CalendarDaysProps = {
    navigationDate: Date;
    selectionMode: CalendarSelectionMode;
    days: Date[];
    onDayClick: (date: Date) => void;
    onWeekdayClick?: (date: Date) => void;
    todayDay: Date;
    selectedDay: Date|null;
    selectedDays: Date[];
    startDay: Date|null;
    endDay: Date|null;
    minAvailableDay: Date|null;
    maxAvailableDay: Date|null;
    notAvailableDays: Date[];
    availableDays: Date[];
    style?: CSSProperties;
}

export default function CalendarDays({
    navigationDate,
    selectionMode,
    days,
    onDayClick,
    onWeekdayClick,
    todayDay,
    selectedDay,
    selectedDays,
    startDay,
    endDay,
    minAvailableDay,
    maxAvailableDay,
    notAvailableDays,
    availableDays,
    style,
} : CalendarDaysProps) : ReactElement {
    const weekdays = days.slice(0, 7);
    function isSelected(
        day: Date
    ) : boolean {
        switch(selectionMode) {
            case CalendarSelectionMode.None:
                return false;
            case CalendarSelectionMode.Single:
                return compareDays(selectedDay, day);
            case CalendarSelectionMode.Multiple:
                return selectedDays.filter(x => compareDays(x, day)).length > 0;
            case CalendarSelectionMode.Range:
                return compareDays(startDay, day)
                    || compareDays(endDay, day)
                    || compareDays(startDay, day, false)
                    && compareDays(endDay, day, true);
            default:
                throw new Error();
        }
    }
    return (
        <div className={styles.days} style={style}>
            <div>{
                weekdays.map((day, index) => {
                    return <CalendarDay
                        key={index}
                        day={day}
                        onDayClick={onWeekdayClick}
                        isWeekday={true}
                        isToday={todayDay.getDay() === day.getDay()}
                        isSelected={selectedDay?.getDay() === day.getDay()}
                        isCurrentMonth={compareMonths(navigationDate, day)}
                        isRange={selectionMode === CalendarSelectionMode.Range}
                        isStart={selectionMode === CalendarSelectionMode.Range && compareDays(startDay, day)}
                        isEnd={selectionMode === CalendarSelectionMode.Range && compareDays(endDay, day)}
                    />;
                })
            }</div>
            <div>{
                days.map((day, index) => {
                    const isSelectedValue = isSelected(day);
                    return <CalendarDay
                        key={index}
                        day={day}
                        onDayClick={onDayClick}
                        isToday={compareDays(todayDay, day)}
                        isSelected={isSelectedValue}
                        isCurrentMonth={compareMonths(navigationDate, day)}
                        isRange={selectionMode === CalendarSelectionMode.Range && isSelectedValue}
                        isStart={selectionMode === CalendarSelectionMode.Range && compareDays(startDay, day)}
                        isEnd={selectionMode === CalendarSelectionMode.Range && compareDays(endDay, day)}
                        isAvailable={isAvailableDay(day, minAvailableDay, maxAvailableDay, notAvailableDays, availableDays)}
                    />;
                })
            }</div>
        </div>
    );
}