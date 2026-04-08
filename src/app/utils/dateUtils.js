/**
 * Calendar date utility functions
 */

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const MONTH_NAMES_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export const DAY_NAMES = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
export const DAY_NAMES_FULL = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/**
 * Get the number of days in a given month/year
 */
export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Get the day of week (0=Monday, 6=Sunday) for the first day of a month
 */
export function getFirstDayOfMonth(year, month) {
  const day = new Date(year, month, 1).getDay();
  // Convert from Sun=0 to Mon=0
  return day === 0 ? 6 : day - 1;
}

/**
 * Generate the calendar grid for a month
 * Returns an array of week arrays, each containing day objects
 */
export function generateCalendarGrid(year, month) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month === 0 ? 11 : month - 1);

  const grid = [];
  let currentWeek = [];

  // Previous month's trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    currentWeek.push({
      day,
      month: prevMonth,
      year: prevYear,
      isCurrentMonth: false,
      date: new Date(prevYear, prevMonth, day),
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push({
      day,
      month,
      year,
      isCurrentMonth: true,
      date: new Date(year, month, day),
    });

    if (currentWeek.length === 7) {
      grid.push(currentWeek);
      currentWeek = [];
    }
  }

  // Next month's leading days
  if (currentWeek.length > 0) {
    let nextDay = 1;
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    while (currentWeek.length < 7) {
      currentWeek.push({
        day: nextDay,
        month: nextMonth,
        year: nextYear,
        isCurrentMonth: false,
        date: new Date(nextYear, nextMonth, nextDay),
      });
      nextDay++;
    }
    grid.push(currentWeek);
  }

  return grid;
}

/**
 * Check if two dates are the same day
 */
export function isSameDay(date1, date2) {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Check if a date is between two other dates (inclusive)
 */
export function isDateInRange(date, startDate, endDate) {
  if (!date || !startDate || !endDate) return false;
  const d = date.getTime();
  const start = startDate.getTime();
  const end = endDate.getTime();
  return d >= Math.min(start, end) && d <= Math.max(start, end);
}

/**
 * Check if a date is today
 */
export function isToday(date) {
  return isSameDay(date, new Date());
}

/**
 * Check if a day index is a weekend (5=Saturday, 6=Sunday in our Mon-based grid)
 */
export function isWeekend(dayIndex) {
  return dayIndex === 5 || dayIndex === 6;
}

/**
 * Format a date as a readable string
 */
export function formatDate(date) {
  if (!date) return '';
  return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

/**
 * Format a date range
 */
export function formatDateRange(startDate, endDate) {
  if (!startDate) return '';
  if (!endDate || isSameDay(startDate, endDate)) return formatDate(startDate);
  return `${formatDate(startDate)} — ${formatDate(endDate)}`;
}

/**
 * Get the number of days in a range
 */
export function getDaysInRange(startDate, endDate) {
  if (!startDate || !endDate) return 0;
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
}
