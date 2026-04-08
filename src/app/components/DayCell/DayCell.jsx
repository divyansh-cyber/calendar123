'use client';

import { memo } from 'react';
import { isSameDay, isDateInRange, isToday } from '../../utils/dateUtils';
import { getHoliday } from '../../utils/holidays';
import styles from './DayCell.module.css';

function DayCell({
  dayData,
  dayIndex,
  startDate,
  endDate,
  hasNote,
  onClick,
}) {
  const { day, date, isCurrentMonth } = dayData;
  const isWeekendDay = dayIndex === 5 || dayIndex === 6;
  const isTodayDate = isToday(date);
  const isStart = isSameDay(date, startDate);
  const isEnd = isSameDay(date, endDate);
  const isSingleSelect = isStart && isEnd;
  const isInRange = !isStart && !isEnd && isDateInRange(date, startDate, endDate);
  const holiday = isCurrentMonth ? getHoliday(date) : null;

  const classNames = [
    styles.cell,
    !isCurrentMonth && styles.otherMonth,
    isWeekendDay && isCurrentMonth && styles.weekend,
    isTodayDate && styles.today,
    isStart && styles.startDate,
    isEnd && !isSingleSelect && styles.endDate,
    isSingleSelect && styles.startDate,
    isSingleSelect && styles.singleDate,
    isInRange && styles.inRange,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classNames}
      onClick={() => onClick(date)}
      data-holiday={holiday ? `${holiday.emoji} ${holiday.name}` : undefined}
      aria-label={`${day}${holiday ? `, ${holiday.name}` : ''}${isTodayDate ? ', today' : ''}`}
      tabIndex={isCurrentMonth ? 0 : -1}
    >
      {day}
      {holiday && (
        <span
          className={styles.holidayDot}
          style={{ background: holiday.color }}
        />
      )}
      {hasNote && <span className={styles.noteDot} />}
    </button>
  );
}

export default memo(DayCell);
