'use client';

import { useState, useCallback } from 'react';
import { isSameDay } from '../utils/dateUtils';

/**
 * Custom hook for date range selection
 * Click once for start, again for end, third time to reset
 */
export function useSelection() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectionStep, setSelectionStep] = useState(0); // 0=none, 1=start selected, 2=range selected

  const handleDateClick = useCallback((date) => {
    if (selectionStep === 0) {
      // First click — set start date
      setStartDate(date);
      setEndDate(null);
      setSelectionStep(1);
    } else if (selectionStep === 1) {
      // Second click — set end date (or swap if before start)
      if (isSameDay(date, startDate)) {
        // Clicked same date, select just that day
        setEndDate(date);
        setSelectionStep(2);
      } else if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
        setSelectionStep(2);
      } else {
        setEndDate(date);
        setSelectionStep(2);
      }
    } else {
      // Third click — reset and start new selection
      setStartDate(date);
      setEndDate(null);
      setSelectionStep(1);
    }
  }, [selectionStep, startDate]);

  const clearSelection = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    setSelectionStep(0);
  }, []);

  return {
    startDate,
    endDate,
    selectionStep,
    handleDateClick,
    clearSelection,
  };
}
