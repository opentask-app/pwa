'use client';

import 'client-only';
import { useState } from 'react';
import Datepicker from 'tailwind-datepicker-react';
import { differenceInCalendarDays, format, isToday, isTomorrow, startOfDay } from 'date-fns';
import { CalendarMonthSvg } from '@/shared/ui/CalendarMonthSvg';
import { XIconSvg } from '@/shared/ui/XIconSvg';
import { ClassNamePropsOptional } from '@/app/(marketing)/ui/ClassNameProps';

/* Docs
 * https://github.com/OMikkel/tailwind-datepicker-react
 */
const taskDueDatePickerOptions = {
  autoHide: true,
  todayBtn: false,
  clearBtn: false,
  minDate: startOfDay(new Date()),
  theme: {
    background: 'bg-green-700 dark:bg-green-700',
    disabledText:
      'text-gray-300 hover:bg-transparent dark:text-gray-300 dark:hover:bg-transparent cursor-default',
    icons: 'bg-green-700 hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-500',
    text: 'bg-green-700 hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-500',
    selected: 'bg-green-500 dark:bg-green-500',
  },
  datepickerClassNames: 'top-auto bottom-10',
  defaultDate: startOfDay(new Date()),
  language: 'en',
};

interface TaskDueDatePickerProps extends ClassNamePropsOptional {}

export default function TaskDueDatePicker({ className }: TaskDueDatePickerProps) {
  const [isShowing, setIsShowing] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleClose = (state: boolean) => {
    setIsShowing(state);
  };

  const displayDateText = () => {
    if (selectedDate === null) return 'Due date';
    const diffDays = differenceInCalendarDays(new Date(), selectedDate);

    if (diffDays >= -6) {
      if (isToday(selectedDate)) return 'Today';
      if (isTomorrow(selectedDate)) return 'Tomorrow';
      return format(selectedDate, 'EEEE');
    }
    return format(selectedDate, 'MMM dd');
  };

  return (
    <div className={`relative`}>
      <div
        className={`fixed inset-0 z-50 bg-black/30  ${isShowing ? '' : 'hidden'}`}
        aria-hidden="true"
        onClick={() => setIsShowing(false)}
      />
      <Datepicker
        options={taskDueDatePickerOptions}
        onChange={handleChange}
        show={isShowing}
        setShow={handleClose}
      >
        <div className="flex flex-row">
          <button
            type="button"
            className="flex rounded-md p-2 hover:bg-gray-300"
            onClick={() => setIsShowing(!isShowing)}
          >
            <span className="sr-only">Add due date</span>
            <CalendarMonthSvg aria-hidden="true" />
            <span className="ml-2 ">{displayDateText()}</span>
          </button>
          {selectedDate && (
            <button
              type="button"
              className="flex rounded-md py-2 hover:bg-gray-300 sm:px-2"
              onClick={() => setSelectedDate(null)}
            >
              <span className="sr-only">Remove due date</span>
              <XIconSvg aria-hidden="true" />
            </button>
          )}
        </div>
      </Datepicker>
    </div>
  );
}
