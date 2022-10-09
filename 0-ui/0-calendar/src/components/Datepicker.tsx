import { useEffect } from "react";
import Calendar from "./Calendar";
import useCalendar from "./useCalendar";

interface DatepickerProps {
  name?: string;
  selectDate?: Date;
  changeDate?: (date: Date) => void;
}

export default function Datepicker({
  selectDate,
  changeDate,
}: DatepickerProps) {
  const calendar = useCalendar(selectDate);

  useEffect(() => {
    changeDate && changeDate(calendar.selectedDate);
  }, [calendar.selectedDate, changeDate]);

  return (
    <div>
      <div>{calendar.selectFormatDate}</div>
      <Calendar {...calendar} />
    </div>
  );
}
