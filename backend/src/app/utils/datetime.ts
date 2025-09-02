import { addMinutes, set } from "date-fns";

export const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);

export const endOfToday = new Date();
endOfToday.setHours(23, 59, 59, 999);

export function generateSlots(
  date: Date,
  startTime: string,
  endTime: string,
  duration: number,
): Date[] {
  // startTime/endTime like "09:00"
  const [sHour, sMin] = startTime.split(":").map(Number);
  const [eHour, eMin] = endTime.split(":").map(Number);

  let start = set(date, {
    hours: sHour,
    minutes: sMin,
    seconds: 0,
    milliseconds: 0,
  });
  let end = set(date, {
    hours: eHour,
    minutes: eMin,
    seconds: 0,
    milliseconds: 0,
  });

  const slots: Date[] = [];
  while (start < end) {
    slots.push(start);
    start = addMinutes(start, duration);
  }
  return slots;
}
