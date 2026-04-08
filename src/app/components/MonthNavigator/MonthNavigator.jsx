'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MONTH_NAMES } from '../../utils/dateUtils';
import styles from './MonthNavigator.module.css';

export default function MonthNavigator({
  year,
  month,
  onPrev,
  onNext,
  onToday,
  onMonthYearClick,
}) {
  return (
    <nav className={styles.navigator} aria-label="Calendar navigation">
      <button
        className={styles.navBtn}
        onClick={onPrev}
        aria-label="Previous month"
        id="nav-prev-month"
      >
        <ChevronLeft size={20} />
      </button>

      <div className={styles.navCenter}>
        <button
          className={styles.monthYearBtn}
          onClick={onMonthYearClick}
          aria-label="Show year overview"
          id="nav-month-year"
        >
          {MONTH_NAMES[month]} {year}
        </button>
        <button
          className={styles.todayBtn}
          onClick={onToday}
          aria-label="Go to today"
          id="nav-today"
        >
          Today
        </button>
      </div>

      <button
        className={styles.navBtn}
        onClick={onNext}
        aria-label="Next month"
        id="nav-next-month"
      >
        <ChevronRight size={20} />
      </button>
    </nav>
  );
}
