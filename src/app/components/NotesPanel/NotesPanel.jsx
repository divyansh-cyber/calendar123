'use client';

import { useState } from 'react';
import { Plus, Trash2, StickyNote, CalendarDays, FileText } from 'lucide-react';
import { formatDateRange } from '../../utils/dateUtils';
import styles from './NotesPanel.module.css';

export default function NotesPanel({
  notes,
  startDate,
  endDate,
  onAddNote,
  onDeleteNote,
}) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onAddNote(trimmed, startDate, endDate);
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
  };

  const hasDateContext = startDate && endDate;

  return (
    <div className={styles.panel}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          <StickyNote size={18} className={styles.titleIcon} />
          Notes
        </h2>
        {notes.length > 0 && (
          <span className={styles.noteCount}>{notes.length}</span>
        )}
      </div>

      {/* Date context */}
      {hasDateContext && (
        <div className={styles.dateContext}>
          <CalendarDays size={14} className={styles.dateContextIcon} />
          Adding note for: {formatDateRange(startDate, endDate)}
        </div>
      )}

      {/* Input */}
      <div className={styles.inputArea}>
        <textarea
          className={styles.noteInput}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            hasDateContext
              ? 'Add a note for selected dates...'
              : 'Write a note...'
          }
          rows={1}
          id="note-input"
          aria-label="Note text"
        />
        <button
          className={styles.addBtn}
          onClick={handleAdd}
          disabled={!inputValue.trim()}
          aria-label="Add note"
          id="add-note-btn"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Notes list */}
      <div className={`${styles.notesList} ${styles.linedBg}`}>
        {notes.length === 0 ? (
          <div className={styles.emptyState}>
            <FileText size={40} className={styles.emptyIcon} />
            <div className={styles.emptyText}>No notes yet</div>
            <div className={styles.emptyHint}>
              Select a date range and add your first note
            </div>
          </div>
        ) : (
          notes.map((note) => (
            <div key={note.id} className={styles.noteItem}>
              <div className={styles.noteText}>{note.text}</div>
              <div className={styles.noteMeta}>
                <span className={styles.noteDate}>
                  {note.startDate
                    ? formatDateRange(
                        new Date(note.startDate),
                        note.endDate ? new Date(note.endDate) : null
                      )
                    : 'General note'}
                </span>
                <button
                  className={styles.deleteBtn}
                  onClick={() => onDeleteNote(note.id)}
                  aria-label="Delete note"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
