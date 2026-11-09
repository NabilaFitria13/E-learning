// Utility helper for Dynamic Real-Time Date, Agenda, and Attendance (November 2026)

export const INDONESIAN_DAYS = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'] as const;

export const INDONESIAN_MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
] as const;

export const CURRENT_ACADEMIC_YEAR = '2026/2027';
export const CURRENT_SEMESTER = 'Semester Ganjil 2026/2027';
export const CURRENT_ACTIVE_MONTH_YEAR = 'November 2026';

/**
 * Returns formatted current date in Indonesian format:
 * Example: "Senin, 9 November 2026"
 */
export function getFormattedToday(customDate?: Date): string {
  const d = customDate || new Date();
  const dayName = INDONESIAN_DAYS[d.getDay()];
  const dateNum = d.getDate();
  const monthName = INDONESIAN_MONTHS[d.getMonth()];
  const year = d.getFullYear();

  return `${dayName}, ${dateNum} ${monthName} ${year}`;
}

/**
 * Returns short date format: "9 Nov 2026"
 */
export function getShortDate(customDate?: Date): string {
  const d = customDate || new Date();
  const dateNum = d.getDate();
  const monthShort = INDONESIAN_MONTHS[d.getMonth()].slice(0, 3);
  const year = d.getFullYear();

  return `${dateNum} ${monthShort} ${year}`;
}

/**
 * List of active school weekdays in current month (November 2026) for attendance filtering
 */
export const NOVEMBER_2026_SCHOOL_DATES = [
  { value: '2026-11-09', label: 'Hari Ini (Senin, 9 November 2026)', shortLabel: '09 Nov 2026', day: 'Senin' },
  { value: '2026-11-06', label: 'Jumat, 6 November 2026', shortLabel: '06 Nov 2026', day: 'Jumat' },
  { value: '2026-11-05', label: 'Kamis, 5 November 2026', shortLabel: '05 Nov 2026', day: 'Kamis' },
  { value: '2026-11-04', label: 'Rabu, 4 November 2026', shortLabel: '04 Nov 2026', day: 'Rabu' },
  { value: '2026-11-03', label: 'Selasa, 3 November 2026', shortLabel: '03 Nov 2026', day: 'Selasa' },
  { value: '2026-11-02', label: 'Senin, 2 November 2026', shortLabel: '02 Nov 2026', day: 'Senin' },
];
