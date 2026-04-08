'use client';

import { useMemo } from 'react';
import { X } from 'lucide-react';
import { MONTH_NAMES_SHORT, generateCalendarGrid, isToday } from '../../utils/dateUtils';
import styles from './YearOverview.module.css';

export default function YearOverview({ year, currentMonth, onSelectMonth, onClose }) {
  const months = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      index: i,
      name: MONTH_NAMES_SHORT[i],
      grid: generateCalendarGrid(year, i),
    }));
  }, [year]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.yearTitle}>{year}</h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close year overview"
            id="close-year-overview"
          >
            <X size={18} />
          </button>
        </div>

        <div className={styles.yearGrid}>
          {months.map(({ index, name, grid }) => (
            <div
              key={index}
              className={`${styles.miniMonth} ${index === currentMonth ? styles.current : ''}`}
              onClick={() => onSelectMonth(year, index)}
              role="button"
              tabIndex={0}
              aria-label={`Go to ${name} ${year}`}
            >
              <div className={styles.miniMonthName}>{name}</div>
              <div className={styles.miniGrid}>
                {grid.flat().map((dayData, i) => (
                  <div
                    key={i}
                    className={`${styles.miniDay} ${
                      !dayData.isCurrentMonth ? styles.otherMonth : ''
                    } ${isToday(dayData.date) ? styles.today : ''}`}
                  >
                    {dayData.day}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
