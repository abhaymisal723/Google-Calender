import { 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  format, 
  addWeeks, 
  subWeeks, 
  startOfDay,
  isSameDay,
  isToday,
  getHours,
  getMinutes,
  setHours,
  setMinutes
} from 'date-fns';

export const getWeekDays = (date: Date): Date[] => {
  const start = startOfWeek(date, { weekStartsOn: 0 }); // Sunday
  const end = endOfWeek(date, { weekStartsOn: 0 });
  return eachDayOfInterval({ start, end });
};

export const getNextWeek = (date: Date): Date => {
  return addWeeks(date, 1);
};

export const getPreviousWeek = (date: Date): Date => {
  return subWeeks(date, 1);
};

export const formatDayHeader = (date: Date): string => {
  return format(date, 'EEE');
};

export const formatDateHeader = (date: Date): string => {
  return format(date, 'MMM d');
};

export const formatTime = (date: Date): string => {
  return format(date, 'h:mm a');
};

export const formatHour = (hour: number): string => {
  const date = new Date();
  date.setHours(hour, 0, 0, 0);
  return format(date, 'h a');
};

export const isCurrentDay = (date: Date): boolean => {
  return isToday(date);
};

export const isSameDate = (date1: Date, date2: Date): boolean => {
  return isSameDay(date1, date2);
};

export const createTimeSlot = (hour: number, day: Date): Date => {
  const date = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour, 0, 0, 0);
  return date;
};

export const getHourFromTimestamp = (timestamp: number): number => {
  return getHours(new Date(timestamp));
};

export const getMinutesFromTimestamp = (timestamp: number): number => {
  return getMinutes(new Date(timestamp));
};

export const isSunday = (date: Date): boolean => {
  return date.getDay() === 0;
}; 