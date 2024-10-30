import { ReactElement, useEffect, useState } from "react";
import styles from "./calendar-navigation.module.scss";
import ChevronLeft from "../../../../images/chevron/chevron-left.svg";
import ChevronRight from "../../../../images/chevron/chevron-right.svg";


export type CalendarNavigationProps = {
    prevLabel?: string;
    nextLabel?: string;
    captionLabel?: string;
    onPrevClick: () => void;
    onNextClick: () => void;
    onCaptionClick: () => void;
}

export default function CalendarNavigation({
    prevLabel,
    nextLabel,
    captionLabel = "",
    onPrevClick,
    onNextClick,
    onCaptionClick,
} : CalendarNavigationProps) : ReactElement {
    return <div className={styles.navigation}>
        <div
            onClick={onPrevClick}>
                {prevLabel??<img className={styles.img} src={ChevronLeft}></img>}
        </div>
        <div
            onClick={onCaptionClick}>
                <span>{captionLabel}</span>
        </div>
        <div
            onClick={onNextClick}>
                {nextLabel??<img className={styles.img} src={ChevronRight}></img>}
        </div>
    </div>;
}