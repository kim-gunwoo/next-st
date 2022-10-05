import classNames from "classnames";
import styles from "./Calendar.module.scss";
import { DateType } from "./useCalendar";

interface CalendarProps {
  years: number[];
  currentYear: number;
  currentMonth: number;
  datesOfMonth: DateType[];
  clickDate: (date: Date) => void;
  changeYear: (year: number) => void;
  changeMonth: (month: number) => void;
  changePrevMonth: () => void;
  changeNextMonth: () => void;
  changeToday: () => void;
}

export default function Calendar({
  years,
  currentYear,
  currentMonth,
  datesOfMonth,
  clickDate,
  changeYear,
  changeMonth,
  changePrevMonth,
  changeNextMonth,
  changeToday,
}: CalendarProps) {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  const onClick = (date: DateType) => {
    if (date.month === "curr") clickDate(date.pull);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div>{currentYear}</div>
        <div>{currentMonth}</div>
        <div>
          <div onClick={changePrevMonth}>prev</div>
          <div onClick={changeToday}>today</div>
          <div onClick={changeNextMonth}>next</div>
        </div>
        <div className={styles.week}>
          {days.map((day) => (
            <div key={`days-${day}`}>{day}</div>
          ))}
        </div>
        <div className={styles.month}>
          {datesOfMonth.map((date) => (
            <div
              key={`date-${date.month}-${date.date}`}
              className={styles.dayWrapper}
            >
              <div
                className={classNames(
                  styles.day,
                  date.seleted && styles.seleted,
                  date.month !== "curr" && styles.disabled
                )}
                onClick={() => onClick(date)}
              >
                <div>
                  {date.date}
                  {date.today && <div className={styles.today}>오늘</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
