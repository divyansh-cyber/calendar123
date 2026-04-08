'use client';

import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'calendar-notes';

/**
 * Custom hook for notes CRUD with localStorage persistence
 */
export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load notes from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Restore Date objects
        const restored = parsed.map((note) => ({
          ...note,
          startDate: note.startDate ? new Date(note.startDate) : null,
          endDate: note.endDate ? new Date(note.endDate) : null,
          createdAt: new Date(note.createdAt),
        }));
        setNotes(restored);
      }
    } catch (e) {
      console.warn('Failed to load notes from localStorage:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (e) {
      console.warn('Failed to save notes to localStorage:', e);
    }
  }, [notes, isLoaded]);

  const addNote = useCallback((text, startDate = null, endDate = null) => {
    const newNote = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      text,
      startDate,
      endDate,
      createdAt: new Date(),
    };
    setNotes((prev) => [newNote, ...prev]);
    return newNote;
  }, []);

  const updateNote = useCallback((id, text) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, text } : note))
    );
  }, []);

  const deleteNote = useCallback((id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }, []);

  const getNotesForDate = useCallback(
    (date) => {
      if (!date) return [];
      return notes.filter((note) => {
        if (!note.startDate) return false;
        const noteStart = new Date(note.startDate).setHours(0, 0, 0, 0);
        const noteEnd = note.endDate
          ? new Date(note.endDate).setHours(0, 0, 0, 0)
          : noteStart;
        const target = new Date(date).setHours(0, 0, 0, 0);
        return target >= noteStart && target <= noteEnd;
      });
    },
    [notes]
  );

  const getNotesForMonth = useCallback(
    (year, month) => {
      return notes.filter((note) => {
        if (!note.startDate) return false;
        const d = new Date(note.startDate);
        return d.getFullYear() === year && d.getMonth() === month;
      });
    },
    [notes]
  );

  return {
    notes,
    isLoaded,
    addNote,
    updateNote,
    deleteNote,
    getNotesForDate,
    getNotesForMonth,
  };
}
