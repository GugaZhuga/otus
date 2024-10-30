export enum DateTimeMode {
    DateTime,
    DateOnly,
    TimeOnly,
}

export function getValueByMode<T>(
    mode: DateTimeMode,
    dateTime: T,
    dateOnly: T,
    timeOnly: T,
) : T {
    switch(mode) {
        case DateTimeMode.DateTime:
            return dateTime;
        case DateTimeMode.DateOnly:
            return dateOnly;
        case DateTimeMode.TimeOnly:
            return timeOnly;
        default:
            throw new Error();
    }
}

export function compareDays(
    day1: Date|null,
    day2: Date|null,
    more?: boolean
) : boolean {
    if (day1 && day2) {
        switch(more) {
            case false:
                return day1 < day2;
            case true:
                return day1 > day2;
            default:
                return day1?.getFullYear() === day2?.getFullYear()
                && day1?.getMonth() === day2?.getMonth()
                && day1?.getDate() === day2?.getDate();
        }
    }
    else 
        return false;
}

export function compareMonths(
    month1: Date|null,
    month2: Date|null,
    more?: boolean
) : boolean {
    if (month1 && month2) {
        switch(more) {
            case false:
                return month1 < month2;
            case true:
                return month1 > month2;
            default:
                return month1?.getFullYear() === month2?.getFullYear()
                    && month1?.getMonth() === month2?.getMonth();
        }
    }
    else
        return false;
}

export function isAvailableDay(
    day: Date,
    minAvailableDay: Date|null,
    maxAvailableDay: Date|null,
    notAvailableDays: Date[],
    availableDays: Date[]
) : boolean {
    return (!minAvailableDay || compareDays(day, minAvailableDay) || compareDays(day, minAvailableDay, true))
        && (!maxAvailableDay || compareDays(day, maxAvailableDay) || compareDays(day, maxAvailableDay, false))
        && (!notAvailableDays.length || notAvailableDays.filter(x => compareDays(x, day)).length === 0)
        && (!availableDays.length || availableDays.filter(x => compareDays(x, day)).length > 0);
}

export function isAvailableMonth(
    month: Date,
    minAvailableMonth: Date|null,
    maxAvailableMonth: Date|null,
    notAvailableMonths: Date[],
    availableMonths: Date[]
) : boolean {
    return (!minAvailableMonth || compareMonths(month, minAvailableMonth) || compareMonths(month, minAvailableMonth, true))
        && (!maxAvailableMonth || compareMonths(month, maxAvailableMonth) || compareMonths(month, maxAvailableMonth, false))
        && (!notAvailableMonths.length || notAvailableMonths.filter(x => compareMonths(x, month)).length === 0)
        && (!availableMonths.length || availableMonths.filter(x => compareMonths(x, month)).length > 0);
}

export function hasAnyDayBetweenStartAndEndDays(
    notAvailableDays: Date[],
    startDay: Date,
    endDay: Date
) : boolean {
    return notAvailableDays.filter(x => compareDays(x, startDay, true) && compareDays(x, endDay, false)).length > 0;
}