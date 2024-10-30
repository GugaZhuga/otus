import { CSSProperties, ReactElement } from "react";
import styles from "./calendar-months.module.scss";
import CalendarMonth from "../calendar-month/calendar-month";
import { CalendarSelectionMode } from "../calendar";
import { compareMonths, isAvailableMonth } from "../../date-time-common-scripts";

export type CalendarMonthsProps = {
    navigationDate: Date;
    selectionMode: CalendarSelectionMode;
    months: Date[];
    onMonthClick: (month: Date) => void;
    selectedMonth: Date|null;
    selectedMonths: Date[];
    startMonth: Date|null;
    endMonth: Date|null;
    todayMonth: Date;
    minAvailableMonth: Date|null;
    maxAvailableMonth: Date|null;
    notAvailableMonths: Date[];
    availableMonths: Date[];
    style?: CSSProperties;
}

export default function CalendarMonths({
    navigationDate,
    selectionMode,
    months,
    onMonthClick,
    todayMonth,
    selectedMonth,
    selectedMonths,
    startMonth,
    endMonth,
    minAvailableMonth,
    maxAvailableMonth,
    notAvailableMonths,
    availableMonths,
    style,
} : CalendarMonthsProps) : ReactElement {
    const today = new Date();
    function isSelected(
        month: Date
    ) : boolean {
        switch (selectionMode) {
            case CalendarSelectionMode.None:
                return false;
            case CalendarSelectionMode.Single:
                return compareMonths(selectedMonth, month);
            case CalendarSelectionMode.Multiple:
                return selectedMonths.filter(x => compareMonths(x, month)).length > 0;
            case CalendarSelectionMode.Range:
                return compareMonths(startMonth, month)
                    || compareMonths(endMonth, month)
                    || compareMonths(startMonth, month, false)
                    && compareMonths(endMonth, month, true);
            default:
                throw new Error();
        }
    }
    return (
        <div className={styles.months} style={style}>{
            months.map((month, index) => {
                const isSelectedValue = isSelected(month);
                return <CalendarMonth
                    key={index}
                    month={month}
                    isToday={compareMonths(todayMonth, month)}
                    isSelected={isSelectedValue}
                    isCurrentYear={navigationDate.getFullYear() === month.getFullYear()}
                    isRange={selectionMode === CalendarSelectionMode.Range && isSelectedValue}
                    isStart={selectionMode === CalendarSelectionMode.Range && compareMonths(startMonth, month)}
                    isEnd={selectionMode === CalendarSelectionMode.Range && compareMonths(endMonth, month)}
                    isAvailable={isAvailableMonth(month, minAvailableMonth, maxAvailableMonth, notAvailableMonths, availableMonths)}
                    onMonthClick={onMonthClick}/>;
            })
        }</div>
    );
}