/**
 * Holiday data — key is "MM-DD", values include name and optional color
 * Covers major Indian and International holidays
 */

const HOLIDAYS = {
  '01-01': { name: 'New Year\'s Day', color: '#4CAF50', emoji: '🎉' },
  '01-14': { name: 'Makar Sankranti', color: '#FF9800', emoji: '🪁' },
  '01-26': { name: 'Republic Day', color: '#FF6B35', emoji: '🇮🇳' },
  '02-14': { name: 'Valentine\'s Day', color: '#E91E63', emoji: '❤️' },
  '03-08': { name: 'International Women\'s Day', color: '#9C27B0', emoji: '👩' },
  '03-25': { name: 'Holi', color: '#E91E63', emoji: '🎨' },
  '04-14': { name: 'Ambedkar Jayanti', color: '#2196F3', emoji: '📘' },
  '05-01': { name: 'Labour Day', color: '#F44336', emoji: '✊' },
  '06-21': { name: 'Intl. Yoga Day', color: '#4CAF50', emoji: '🧘' },
  '07-04': { name: 'US Independence Day', color: '#1565C0', emoji: '🗽' },
  '08-15': { name: 'Independence Day', color: '#FF6B35', emoji: '🇮🇳' },
  '09-05': { name: 'Teachers\' Day', color: '#795548', emoji: '📚' },
  '10-02': { name: 'Gandhi Jayanti', color: '#607D8B', emoji: '🕊️' },
  '10-31': { name: 'Halloween', color: '#FF6F00', emoji: '🎃' },
  '11-14': { name: 'Children\'s Day', color: '#03A9F4', emoji: '👶' },
  '12-25': { name: 'Christmas', color: '#C62828', emoji: '🎄' },
  '12-31': { name: 'New Year\'s Eve', color: '#6A1B9A', emoji: '🎊' },
};

/**
 * Get holiday info for a specific date
 * @param {Date} date
 * @returns {Object|null} Holiday object or null
 */
export function getHoliday(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const key = `${month}-${day}`;
  return HOLIDAYS[key] || null;
}

/**
 * Get all holidays for a given month
 * @param {number} month - 0-indexed month
 * @returns {Array} Array of { day, ...holidayInfo }
 */
export function getHolidaysForMonth(month) {
  const monthStr = String(month + 1).padStart(2, '0');
  const holidays = [];

  Object.entries(HOLIDAYS).forEach(([key, value]) => {
    if (key.startsWith(monthStr)) {
      const day = parseInt(key.split('-')[1], 10);
      holidays.push({ day, ...value });
    }
  });

  return holidays;
}

export default HOLIDAYS;
