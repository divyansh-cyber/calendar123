'use client';

import { useMemo } from 'react';
import { generateCalendarGrid, DAY_NAMES, formatDateRange, getDaysInRange } from '../../utils/dateUtils';
import DayCell from '../DayCell/DayCell';
import styles from './CalendarGrid.module.css';

export default function CalendarGrid({
  year,
  month,
  startDate,
  endDate,
  onDateClick,
  onClearSelection,
  notes,
}) {
  const grid = useMemo(() => generateCalendarGrid(year, month), [year, month]);

  // Build a Set of date strings that have notes for quick lookup
  const noteDates = useMemo(() => {
    const set = new Set();
    if (!notes) return set;
    notes.forEach((note) => {
      if (note.startDate) {
        const d = new Date(note.startDate);
        set.add(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`);
      }
    });
    return set;
  }, [notes]);

  const hasNote = (date) => {
    return noteDates.has(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
  };

  const hasSelection = startDate && endDate;

  return (
    <div className={styles.gridContainer} role="grid" aria-label="Calendar dates">
      {/* Day headers */}
      <div className={styles.dayHeaders} role="row">
        {DAY_NAMES.map((name, i) => (
          <div
            key={name}
            className={`${styles.dayHeader} ${i >= 5 ? styles.weekend : ''}`}
            role="columnheader"
          >
            {name}
          </div>
        ))}
      </div>

      {/* Week rows */}
      {grid.map((week, weekIndex) => (
        <div key={weekIndex} className={styles.weekRow} role="row">
          {week.map((dayData, dayIndex) => (
            <DayCell
              key={`${dayData.year}-${dayData.month}-${dayData.day}`}
              dayData={dayData}
              dayIndex={dayIndex}
              startDate={startDate}
              endDate={endDate}
              hasNote={hasNote(dayData.date)}
              onClick={onDateClick}
            />
          ))}
        </div>
      ))}

      {/* Selection info */}
      {hasSelection && (
        <div className={styles.selectionInfo}>
          <div>
            <div className={styles.selectionText}>
              {formatDateRange(startDate, endDate)}
            </div>
            <div className={styles.selectionDays}>
              {getDaysInRange(startDate, endDate)} day{getDaysInRange(startDate, endDate) > 1 ? 's' : ''} selected
            </div>
          </div>
          <button
            className={styles.clearBtn}
            onClick={onClearSelection}
            id="clear-selection"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
