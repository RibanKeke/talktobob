/**
 * Author: Robert Banziziki Muhire
 * Date: 18/12/2020
 */
import isThisWeek from "date-fns/isThisWeek";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import add from "date-fns/add";
import isSameWeek from "date-fns/isSameWeek";
import endOfMonth from "date-fns/endOfMonth";
import isWithinInterval from "date-fns/isWithinInterval";
import differenceInDays from "date-fns/differenceInBusinessDays";
import isFuture from "date-fns/isFuture";

import { type, size, number } from "superstruct";
import { validateStruct } from "./validate";
import { logger } from "./logger";

export function getFirstDayOfTheWeek(date: number, offset = 0) {
  return startOfWeek(add(date, { days: offset }), { weekStartsOn: 1 });
}

export function getLastDayOfTheWeek(date: number, offset = 0) {
  return endOfWeek(add(date, { days: offset }), { weekStartsOn: 1 });
}

export function dateDistance(leftDate: Date, rightDate: Date) {
  return differenceInDays(leftDate, rightDate);
}

export function isDateThisWeek(date: Date, offset = 0) {
  return isSameWeek(add(date, { days: offset }), new Date(), {
    weekStartsOn: 1,
  });
}

export function isFutureDateThisWeek(date: Date) {
  return isFuture(date) && isThisWeek(date, { weekStartsOn: 1 });
}

export function isDateThisMonth(date: Date, offset = 0) {
  const startDate = add(new Date(), { weeks: offset });
  const endDate = endOfMonth(add(new Date(), { weeks: offset }));
  return isWithinInterval(date, { start: startDate, end: endDate });
}

export function* generateBoundedDates(startDate: number, endDate: number) {
  let currentDate: Date = new Date(startDate);
  while (currentDate.getTime() <= endDate) {
    yield currentDate;
    currentDate = add(currentDate, { days: 1 });
  }
}

export function dateTimeMidnight(date: number) {
  let targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  return targetDate.getTime();
}

const UserDateStruct = type({
  year: size(number(), 1900, 9999),
  month: size(number(), 0, 11),
  date: size(number(), 1, 31),
  hour: size(number(), 0, 23),
  minute: size(number(), 0, 59),
  second: size(number(), 0, 59),
});

const newUserDateTime = ({
  year,
  month,
  date,
  hour,
  minute,
  second,
}: {
  year: number;
  month: number;
  date: number;
  hour: number;
  minute: number;
  second: number;
}) => {
  const validTime = validateStruct(
    { year, month, date, hour, minute, second },
    UserDateStruct,
    "Date"
  );
  logger.info("New user date with parameters:", validTime);
  return new Date(
    validTime.year,
    validTime.month,
    validTime.date,
    validTime.hour,
    validTime.minute,
    validTime.second
  );
};

export { newUserDateTime };
