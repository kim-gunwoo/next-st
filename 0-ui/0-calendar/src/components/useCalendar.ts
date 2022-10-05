import { useState } from "react";

export interface DateType {
  date: number;
  month: "next" | "curr" | "prev";
  pull: Date;
  format: string;
  today: boolean;
  seleted: boolean;
}

export default function useCalendar(defaultDate = new Date()) {
  const [selectedDate, setSelectedDate] = useState<Date>(defaultDate);
  const [tempDate, setTempDate] = useState(selectedDate);

  const currentYear = tempDate.getFullYear();
  const currentMonth = tempDate.getMonth() + 1;
  const currentDate = tempDate.getDate();

  const padZero = (arg: string | number, num: number = 2) => {
    return arg.toString().padStart(num, "0");
  };

  const excludeTimeDate = (date: Date) => {
    return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(
      date.getDate()
    )}`;
  };

  const selectFormatDate = selectedDate && excludeTimeDate(selectedDate);

  const today = excludeTimeDate(new Date());

  const years = new Array(11).fill(0).map((_, i) => currentYear - 5 + i);

  const isToday = (date: Date) => today === excludeTimeDate(date);
  const isSeleted = (date: Date) => selectFormatDate === excludeTimeDate(date);

  const lastDateOfCurrMonth = new Date(
    tempDate.getFullYear(),
    tempDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfThisMonth = new Date(
    tempDate.getFullYear(),
    tempDate.getMonth(),
    1
  ).getDay();

  const lastDayOfThisMonth = new Date(
    tempDate.getFullYear(),
    tempDate.getMonth() + 1,
    0
  ).getDay();

  const lastDateOfLastMonth = new Date(
    tempDate.getFullYear(),
    tempDate.getMonth() - 1,
    0
  ).getDate();

  const datesOfCurrMonth = Array.from(
    { length: lastDateOfCurrMonth },
    (_, i) => {
      const pull = new Date(currentYear, currentMonth - 1, i + 1, 0, 0, 0);
      return {
        date: i + 1,
        month: "curr",
        pull,
        format: excludeTimeDate(pull),
        today: isToday(pull),
        seleted: isSeleted(pull),
      } as DateType;
    }
  );

  const getDatesOfLastMonth = () => {
    const emptyArr = Array.from({ length: firstDayOfThisMonth });
    let firstShowingDate = lastDateOfLastMonth - firstDayOfThisMonth + 1;
    return emptyArr.map(() => {
      const pull = new Date(
        currentYear,
        currentMonth - 2,
        firstShowingDate,
        0,
        0,
        0
      );
      return {
        date: firstShowingDate++,
        month: "prev",
        pull,
        format: excludeTimeDate(pull),
        today: isToday(pull),
        seleted: isSeleted(pull),
      } as DateType;
    });
  };

  const getDatesOfNextMonth = () => {
    const emptyArr = Array.from({ length: 6 - lastDayOfThisMonth });
    let count = 1;
    return emptyArr.map(() => {
      const pull = new Date(currentYear, currentMonth, count, 0, 0, 0);
      return {
        date: count++,
        month: "next",
        pull,
        format: excludeTimeDate(pull),
        today: isToday(pull),
        seleted: isSeleted(pull),
      } as DateType;
    });
  };

  const datesOfMonth: DateType[] = [
    ...getDatesOfLastMonth(),
    ...datesOfCurrMonth,
    ...getDatesOfNextMonth(),
  ];

  const clickDate = (date: Date) => {
    setSelectedDate(date);
  };

  const changeYear = (year: number) => {
    setTempDate(new Date(year, tempDate.getMonth(), 1, 0, 0, 0));
  };

  const changeMonth = (month: number) => {
    setTempDate(new Date(tempDate.getFullYear(), month + 1, 1, 0, 0, 0));
  };

  const changePrevMonth = () => {
    setTempDate(
      new Date(tempDate.getFullYear(), tempDate.getMonth() - 1, 1, 0, 0, 0)
    );
  };

  const changeNextMonth = () => {
    setTempDate(
      new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, 1, 0, 0, 0)
    );
  };

  const changeToday = () => {
    setSelectedDate(new Date());
    setTempDate(new Date());
  };

  return {
    today,
    isToday,
    years,
    currentYear,
    currentMonth,
    currentDate,
    datesOfMonth,
    selectedDate,
    selectFormatDate,
    clickDate,
    changeYear,
    changeMonth,
    changePrevMonth,
    changeNextMonth,
    changeToday,
  };
}
