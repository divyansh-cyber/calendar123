'use client';

import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCalendar } from '../../hooks/useCalendar';
import { useSelection } from '../../hooks/useSelection';
import { useNotes } from '../../hooks/useNotes';
import SpiralBinding from '../SpiralBinding/SpiralBinding';
import HeroImage from '../HeroImage/HeroImage';
import MonthNavigator from '../MonthNavigator/MonthNavigator';
import CalendarGrid from '../CalendarGrid/CalendarGrid';
import NotesPanel from '../NotesPanel/NotesPanel';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import YearOverview from '../YearOverview/YearOverview';
import styles from './CalendarApp.module.css';

export default function CalendarApp() {
  const { year, month, goToPrevMonth, goToNextMonth, goToMonth, goToToday } =
    useCalendar();
  const { startDate, endDate, handleDateClick, clearSelection } = useSelection();
  const { notes, addNote, deleteNote } = useNotes();
  const [showYearOverview, setShowYearOverview] = useState(false);
  const [direction, setDirection] = useState(0); // -1 = prev, 1 = next, for animation
  const [isFlipping, setIsFlipping] = useState(false);

  // Animate month transitions
  const handlePrev = useCallback(() => {
    setDirection(-1);
    setIsFlipping(true);
    goToPrevMonth();
    setTimeout(() => setIsFlipping(false), 500);
  }, [goToPrevMonth]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setIsFlipping(true);
    goToNextMonth();
    setTimeout(() => setIsFlipping(false), 500);
  }, [goToNextMonth]);

  const handleMonthSelect = useCallback(
    (y, m) => {
      setDirection(0);
      setIsFlipping(true);
      goToMonth(y, m);
      setShowYearOverview(false);
      setTimeout(() => setIsFlipping(false), 500);
    },
    [goToMonth]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (showYearOverview && e.key === 'Escape') {
        setShowYearOverview(false);
        return;
      }
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          handlePrev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleNext();
          break;
        case 'Escape':
          clearSelection();
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext, clearSelection, showYearOverview]);

  // Framer Motion page transition variants
  const pageVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 60 : dir < 0 ? -60 : 0,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -60 : dir < 0 ? 60 : 0,
      opacity: 0,
    }),
  };

  return (
    <div className={styles.calendarWrapper}>
      <ThemeToggle />

      <div className={styles.layout}>
        {/* Notes Panel — LEFT on desktop, BELOW on mobile */}
        <div className={styles.notesSidebar}>
          <NotesPanel
            notes={notes}
            startDate={startDate}
            endDate={endDate}
            onAddNote={addNote}
            onDeleteNote={deleteNote}
          />
        </div>

        {/* Calendar Card */}
        <div className={styles.calendarCard}>
          <SpiralBinding count={13} />

          <div className={styles.flipContainer}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${year}-${month}`}
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                <HeroImage year={year} month={month} />

                <MonthNavigator
                  year={year}
                  month={month}
                  onPrev={handlePrev}
                  onNext={handleNext}
                  onToday={goToToday}
                  onMonthYearClick={() => setShowYearOverview(true)}
                />

                <CalendarGrid
                  year={year}
                  month={month}
                  startDate={startDate}
                  endDate={endDate}
                  onDateClick={handleDateClick}
                  onClearSelection={clearSelection}
                  notes={notes}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={styles.footer}>
            <span className={styles.footerText}>
              Use ← → to navigate months
              <span className={styles.keyHint}>ESC to clear</span>
            </span>
          </div>
        </div>
      </div>

      {/* Year Overview Modal */}
      {showYearOverview && (
        <YearOverview
          year={year}
          currentMonth={month}
          onSelectMonth={handleMonthSelect}
          onClose={() => setShowYearOverview(false)}
        />
      )}
    </div>
  );
}
