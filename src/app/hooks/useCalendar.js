'use client';

import { useState, useCallback } from 'react';

/**
 * Custom hook for calendar navigation and date math
 */
export function useCalendar(initialDate = new Date()) {
  const [currentDate, setCurrentDate] = useState(() => {
    return new Date(initialDate.getFullYear(), initialDate.getMonth(), 1);
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const goToPrevMonth = useCallback(() => {
    setCurrentDate((prev) => {
      const newMonth = prev.getMonth() === 0 ? 11 : prev.getMonth() - 1;
      const newYear = prev.getMonth() === 0 ? prev.getFullYear() - 1 : prev.getFullYear();
      return new Date(newYear, newMonth, 1);
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentDate((prev) => {
      const newMonth = prev.getMonth() === 11 ? 0 : prev.getMonth() + 1;
      const newYear = prev.getMonth() === 11 ? prev.getFullYear() + 1 : prev.getFullYear();
      return new Date(newYear, newMonth, 1);
    });
  }, []);

  const goToMonth = useCallback((newYear, newMonth) => {
    setCurrentDate(new Date(newYear, newMonth, 1));
  }, []);

  const goToToday = useCallback(() => {
    const today = new Date();
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
  }, []);

  return {
    year,
    month,
    currentDate,
    goToPrevMonth,
    goToNextMonth,
    goToMonth,
    goToToday,
  };
}
