import { CSSProperties, FC, PropsWithChildren, ReactElement, useEffect, useState } from "react"
import styles from "./clock.module.scss";
import ClockItem from "./clock-item/clock-item";

export type ClockProps = PropsWithChildren & {
    canShowLabel?: boolean;
    label?: string;
    time?: Date|null;
    onTimeChanged?: (time: Date|null) => void;
    hours?: number;
    onHoursChanged?: (hours: number) => void;
    minutes?: number;
    onMinutesChanged?: (minutes: number) => void;
    isPartOfCalendarClock?: boolean;
}

export function Clock({
    canShowLabel = true,
    label = "Время",
    time,
    onTimeChanged,
    hours,
    onHoursChanged,
    minutes,
    onMinutesChanged,
    isPartOfCalendarClock = false,
} : ClockProps) : ReactElement {
    const [currentHours, setCurrentHours] = useState<number>(0);
    const [currentMinutes, setCurrentMinutes] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<Date>(new Date());

    function changeHours(hours: number, isInitialization: boolean = false) : void {
        if (hours < 0)
            hours = 23;
        else if (hours > 23)
            hours = 0;
        const result = new Date(currentTime);
        result.setHours(hours);
        setCurrentHours(hours);
        setCurrentTime(result);
        if (!isInitialization) {
            onHoursChanged?.(hours);
            onTimeChanged?.(result);
        }
    }
    function changeMinutes(minutes: number, isInitialization: boolean = false) : void {
        if (minutes < 0)
            minutes = 59;
        else if (minutes > 59)
            minutes = 0;
        const result = new Date(currentTime);
        result.setMinutes(minutes);
        setCurrentMinutes(minutes);
        setCurrentTime(result);
        if (!isInitialization) {
            onMinutesChanged?.(minutes);
            onTimeChanged?.(result);
        }
    }

    useEffect(() => changeHours(hours ?? 0, true), [hours]);
    useEffect(() => changeMinutes(minutes ?? 0, true), [minutes]);
    useEffect(() => {
        changeHours(time?.getHours() ?? 0, true);
        changeMinutes(time?.getMinutes() ?? 0, true);
    }, [time]);

    let style : CSSProperties = {};
    style.gridTemplateColumns = canShowLabel ? "auto 131px" : "0px 131px";
    if (isPartOfCalendarClock) {
        style.borderRadius = "0px 0px 12px 12px";
        style.gridTemplateColumns = "145px 131px";
        style.width = "300px";
    }
    
    return (
        <div className={styles.clock} style={style}>
            {
                canShowLabel ?
                <label
                    className={styles.label}>
                    {
                        label
                    }
                </label> : null
            }
            <div>
                <ClockItem
                    className={styles.hours}
                    value={currentHours}
                    onValueChanged={x => changeHours(x)}/>
                <span
                    className={styles.separator}>
                        :
                </span>
                <ClockItem
                    className={styles.minutes}
                    value={currentMinutes}
                    onValueChanged={x => changeMinutes(x)}/>
            </div>
        </div>
    );
}

export default Clock;