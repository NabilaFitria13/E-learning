import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  BookOpen, 
  Coffee, 
  CheckCircle2, 
  GraduationCap, 
  ChevronDown, 
  ChevronUp, 
  Info,
  Printer,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Search,
  Grid,
  List,
  Play,
  HeartHandshake,
  Award
} from 'lucide-react';
import { ScheduleItem, UserProfile } from '../types';
import { 
  MOCK_SCHEDULE_BY_ROLE, 
  resolveModulAjar, 
  getCourseIdBySubjectName,
  CENTRAL_SUBJECT_DATABASE 
} from '../data/mockData';

/**
 * Helper to determine whether a schedule item is an active academic lesson
 * (which should display 'Silabus & Video' and 'Baca Materi Pelajaran' buttons),
 * or a non-academic / pembiasaan / upacara / istirahat / BK / P5 session (where academic course buttons must be hidden).
 */
export const isAcademicScheduleItem = (item: {
  subject: string;
  category?: string;
  isBreak?: boolean;
  periodRange?: string;
}): boolean => {
  if (item.isBreak) return false;

  const cat = (item.category || '').toLowerCase();
  if (
    cat.includes('pembiasaan') ||
    cat.includes('istirahat') ||
    cat.includes('non-akademik') ||
    cat.includes('kegiatan') ||
    cat.includes('bk') ||
    cat.includes('konseling') ||
    cat.includes('p5') ||
    cat.includes('projek')
  ) {
    return false;
  }

  const range = (item.periodRange || '').toLowerCase();
  if (range.includes('pembiasaan') || range.includes('istirahat')) {
    return false;
  }

  const subj = (item.subject || '').toLowerCase();
  const nonAcademicKeywords = [
    'upacara',
    'pembiasaan',
    'istirahat',
    'ishoma',
    'senam',
    'morning habit',
    'literasi sains & numerasi',
    'literasi pagi',
    'literasi mandiri',
    'refleksi pembelajaran',
    'tadarus',
    'renungan',
    'apel bendera',
    'apel pagi',
    'rapat dewan',
    'koordinasi mgmp',
    'pemeriksaan & penilaian',
    'verifikasi presensi',
    'penyusunan modul',
    'pengawasan ujian',
    'konsultasi belajar',
    'input nilai',
    'bimbingan konseling',
    'layanan bimbingan konseling',
    '(bk)',
    'projek penguatan profil pelajar pancasila',
    'projek penguatan p5',
    'p5'
  ];

  if (nonAcademicKeywords.some((kw) => subj.includes(kw))) {
    return false;
  }

  return true;
};

interface ScheduleViewProps {
  currentUser: UserProfile;
  onOpenModulAjar: (subject: string) => void;
  onNavigateToCourse?: (courseId: string, subjectName?: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ 
  currentUser,
  onOpenModulAjar,
  onNavigateToCourse,
  onNavigateTab
}) => {
  const [selectedDay, setSelectedDay] = useState<'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat'>('Senin');
  const [viewMode, setViewMode] = useState<'harian' | 'matriks'>('harian');
  const [filterCategory, setFilterCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showJpBreakdown, setShowJpBreakdown] = useState<boolean>(false);

  const isStudentMipa = currentUser.role === 'siswa_mipa' || (!currentUser.role.includes('guru') && !currentUser.role.includes('ips'));
  const [selectedClass, setSelectedClass] = useState<'XI MIPA 1' | 'XI MIPA 2'>(() => {
    if (currentUser.className?.includes('MIPA 2')) return 'XI MIPA 2';
    return 'XI MIPA 1';
  });

  const days: ('Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat')[] = [
    'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'
  ];

  // Day meta information according to standard Indonesian school day schedule
  const dayMeta: Record<'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat', {
    totalJp: number;
    hours: string;
    focus: string;
    highlight: string;
    breakSummary: string;
  }> = {
    Senin: {
      totalJp: 9,
      hours: '06.45 - 15.05 WIB',
      focus: 'Fisika Peminatan (2 JP), Bahasa Indonesia (3 JP), Matematika Tingkat Lanjut (3 JP)',
      highlight: 'Upacara Bendera Pukul 06.45 WIB di Lapangan Utama',
      breakSummary: 'Istirahat I (10.30 - 10.50 WIB) & ISHOMA (12.20 - 13.05 WIB)'
    },
    Selasa: {
      totalJp: 9,
      hours: '06.45 - 15.05 WIB',
      focus: 'Kimia Peminatan (3 JP), Biologi Peminatan (2 JP), Bimbingan Konseling (BK) (1 JP), Matematika Wajib (3 JP)',
      highlight: 'Praktikum Kimia Peminatan di Lab Kimia Terpadu Pagi Hari',
      breakSummary: 'Istirahat I (09.30 - 09.50 WIB) & ISHOMA (12.05 - 12.50 WIB)'
    },
    Rabu: {
      totalJp: 9,
      hours: '06.45 - 15.05 WIB',
      focus: 'Biologi Peminatan (3 JP Lab), Matematika Tingkat Lanjut (2 JP), Bahasa Inggris (2 JP), Pendidikan Agama & Budi Pekerti (2 JP)',
      highlight: 'Praktikum Mikroskop Biologi Peminatan di Lab Biologi Lantai 2',
      breakSummary: 'Istirahat I (09.30 - 09.50 WIB) & ISHOMA (12.05 - 12.50 WIB)'
    },
    Kamis: {
      totalJp: 9,
      hours: '06.45 - 15.05 WIB',
      focus: 'Fisika Peminatan (3 JP Lab), Kimia Peminatan (2 JP Lab), Pendidikan Agama & Budi Pekerti (1 JP), Sejarah Indonesia (2 JP), Pendidikan Seni & Budaya (1 JP)',
      highlight: 'Eksperimen Dinamika Gerak Newton di Lab Fisika Dasar',
      breakSummary: 'Istirahat I (09.30 - 09.50 WIB) & ISHOMA (12.05 - 12.50 WIB)'
    },
    Jumat: {
      totalJp: 8,
      hours: '06.45 - 15.15 WIB',
      focus: 'SKJ (1 JP), PJOK (3 JP), Pendidikan Pancasila (2 JP), Projek Penguatan Profil Pelajar Pancasila (P5) (2 JP), Pendidikan Seni & Budaya (1 JP)',
      highlight: 'Senam Pagi SKJ & Sholat Jumat Berjamaah di Masjid Al-Ikhlas',
      breakSummary: 'Istirahat I (09.45 - 10.05 WIB) & ISHOMA Jumat (11.35 - 13.00 WIB)'
    }
  };

  // Retrieve schedule list specifically for this user role / class
  const userFullSchedule = isStudentMipa
    ? (selectedClass === 'XI MIPA 2' ? MOCK_SCHEDULE_BY_ROLE['siswa_mipa_2'] : MOCK_SCHEDULE_BY_ROLE['siswa_mipa_1']) || MOCK_SCHEDULE_BY_ROLE['siswa_mipa']
    : MOCK_SCHEDULE_BY_ROLE[currentUser.role] || MOCK_SCHEDULE_BY_ROLE['siswa_mipa'];
  
  // Filter for the selected day
  const currentDaySchedule = userFullSchedule
    .filter((item) => item.day === selectedDay)
    .filter((item) => {
      if (filterCategory === 'Semua') return true;
      if (filterCategory === 'Peminatan MIPA') return item.category === 'Peminatan MIPA';
      if (filterCategory === 'Wajib') return item.category === 'Mata Pelajaran Wajib';
      if (filterCategory === 'P5 & BK') return item.category === 'Pengembangan & P5';
      if (filterCategory === 'Istirahat') return item.isBreak || !isAcademicScheduleItem(item) || item.category === 'Pembiasaan & Istirahat';
      return true;
    })
    .filter((item) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.subject.toLowerCase().includes(q) ||
        item.teacher.toLowerCase().includes(q) ||
        item.room.toLowerCase().includes(q)
      );
    });

  const currentDayIndex = days.indexOf(selectedDay);
  const handlePrevDay = () => {
    const prevIdx = (currentDayIndex - 1 + days.length) % days.length;
    setSelectedDay(days[prevIdx]);
  };
  const handleNextDay = () => {
    const nextIdx = (currentDayIndex + 1) % days.length;
    setSelectedDay(days[nextIdx]);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-3 sm:p-5 md:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
      
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider bg-sky-100 px-2.5 py-0.5 rounded-md">
              Kurikulum Merdeka Fase F · Standar Nasional
            </span>
            <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
              Alokasi 44 Jam Pelajaran (JP) / Minggu
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Terbagi Rapi Per Hari
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Jadwal Pelajaran {isStudentMipa ? `Kelas ${selectedClass}` : currentUser.className}
            </h2>
            {isStudentMipa && (
              <div className="flex items-center gap-1 p-0.5 bg-slate-200/90 rounded-lg text-xs font-bold ml-1">
                <button
                  type="button"
                  onClick={() => setSelectedClass('XI MIPA 1')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    selectedClass === 'XI MIPA 1'
                      ? 'bg-sky-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  XI MIPA 1
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedClass('XI MIPA 2')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    selectedClass === 'XI MIPA 2'
                      ? 'bg-sky-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  XI MIPA 2
                </button>
              </div>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Struktur jadwal resmi terbagi per hari (Senin s.d. Jumat): 20 JP Peminatan MIPA, 20 JP Mapel Umum Wajib, dan 4 JP Projek P5 & BK.
          </p>
        </div>

        {/* View Mode Switcher & Print Action */}
        <div className="flex items-center gap-2 self-start lg:self-auto">
          <div className="flex items-center p-1 bg-slate-200/80 rounded-xl text-xs font-bold">
            <button
              onClick={() => setViewMode('harian')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'harian'
                  ? 'bg-white text-[#0284c7] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Tampilan Per Hari</span>
            </button>
            <button
              onClick={() => setViewMode('matriks')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'matriks'
                  ? 'bg-white text-[#0284c7] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Matriks Mingguan</span>
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
            title="Cetak Jadwal Pelajaran"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Cetak</span>
          </button>
        </div>
      </div>

      {/* Official Kurikulum Merdeka Structure Callout & Expandable Breakdown */}
      <div className="bg-gradient-to-r from-sky-50 via-white to-sky-50 border border-sky-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#0284c7]" />
              <span className="font-bold text-sm sm:text-base text-slate-900">
                Struktur Beban Belajar Fase F (Kelas 11 SMA Jurusan MIPA)
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Total mingguan <strong className="text-slate-900">44 JP (1 JP = 45 menit)</strong>. Hari <strong className="text-slate-900">{selectedDay}</strong> dialokasikan sebanyak <strong className="text-[#0284c7]">{dayMeta[selectedDay].totalJp} JP</strong> dengan 2 sesi istirahat resmi.
            </p>
          </div>

          <button
            onClick={() => setShowJpBreakdown(!showJpBreakdown)}
            className="px-3.5 py-1.5 bg-white hover:bg-sky-50 border border-sky-200 text-[#0284c7] text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
            <span>{showJpBreakdown ? 'Tutup Rincian JP' : 'Lihat Standar JP Kurikulum'}</span>
            {showJpBreakdown ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Collapsible Detailed Standard Table */}
        {showJpBreakdown && (
          <div className="pt-3 border-t border-sky-100 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              
              {/* Group 1: Peminatan MIPA */}
              <div className="p-3.5 rounded-xl bg-white border border-sky-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sky-900">1. Peminatan MIPA (20 JP)</span>
                  <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded">5 JP / Mapel</span>
                </div>
                <ul className="space-y-1 text-slate-600 text-[11px]">
                  <li className="flex justify-between"><span>• Fisika Peminatan</span><strong className="text-slate-900">5 JP / Minggu</strong></li>
                  <li className="flex justify-between"><span>• Kimia Peminatan</span><strong className="text-slate-900">5 JP / Minggu</strong></li>
                  <li className="flex justify-between"><span>• Biologi Peminatan</span><strong className="text-slate-900">5 JP / Minggu</strong></li>
                  <li className="flex justify-between"><span>• Matematika Tingkat Lanjut</span><strong className="text-slate-900">5 JP / Minggu</strong></li>
                </ul>
              </div>

              {/* Group 2: Mapel Umum Wajib */}
              <div className="p-3.5 rounded-xl bg-white border border-emerald-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-900">2. Mapel Umum Wajib (20 JP)</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Fondasi Akademik</span>
                </div>
                <ul className="space-y-1 text-slate-600 text-[11px]">
                  <li className="flex justify-between"><span>• Matematika Wajib</span><strong className="text-slate-900">3 JP / Minggu</strong></li>
                  <li className="flex justify-between"><span>• Bahasa Indonesia</span><strong className="text-slate-900">3 JP / Minggu</strong></li>
                  <li className="flex justify-between"><span>• Pendidikan Agama & Budi Pekerti</span><strong className="text-slate-900">3 JP / Minggu</strong></li>
                  <li className="flex justify-between"><span>• PJOK</span><strong className="text-slate-900">3 JP / Minggu</strong></li>
                  <li className="flex justify-between"><span>• Bahasa Inggris</span><strong className="text-slate-900">2 JP / Minggu</strong></li>
                  <li className="flex justify-between"><span>• Pendidikan Pancasila</span><strong className="text-slate-900">2 JP / Minggu</strong></li>
                  <li className="flex justify-between"><span>• Sejarah Indonesia</span><strong className="text-slate-900">2 JP / Minggu</strong></li>
                  <li className="flex justify-between"><span>• Pendidikan Seni & Budaya</span><strong className="text-slate-900">2 JP / Minggu</strong></li>
                </ul>
              </div>

              {/* Group 3: Kokurikuler & Pengembangan */}
              <div className="p-3.5 rounded-xl bg-white border border-purple-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-900">3. Kokurikuler & BK (4 JP)</span>
                  <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded">Karakter & Karier</span>
                </div>
                <ul className="space-y-1 text-slate-600 text-[11px]">
                  <li className="flex justify-between"><span>• Projek Penguatan Profil Pelajar Pancasila (P5)</span><strong className="text-slate-900">2 JP / Minggu</strong></li>
                  <li className="flex justify-between"><span>• Bimbingan Konseling (BK)</span><strong className="text-slate-900">1 JP / Minggu</strong></li>
                  <li className="flex justify-between"><span>• Pembiasaan Karakter & Literasi</span><strong className="text-slate-900">Tiap Pagi 06.45</strong></li>
                </ul>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* ===================== VIEW MODE 1: PER HARI (DAILY VIEW) ===================== */}
      {viewMode === 'harian' && (
        <div className="space-y-4 sm:space-y-6">
          
          {/* Day Navigation & Daily Switcher */}
          <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            
            {/* Arrows & Active Day Indicator */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevDay}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                title="Hari Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="px-3 py-1">
                <span className="text-[10px] font-bold uppercase text-[#0284c7] tracking-wider block">
                  Hari Pembelajaran Aktif
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                  Hari {selectedDay}
                </h3>
              </div>

              <button
                onClick={handleNextDay}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                title="Hari Berikutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick 5-Day Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold overflow-x-auto shadow-inner">
              {days.map((day) => {
                const dayLessons = userFullSchedule.filter((item) => item.day === day && !item.isBreak);
                const isSelected = selectedDay === day;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? 'bg-[#0284c7] text-white shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                    }`}
                  >
                    <span>{day}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected ? 'bg-sky-900 text-sky-100' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {dayLessons.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Daily Highlight Card for Selected Day */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs grid grid-cols-1 md:grid-cols-4 gap-4">
            
            <div className="space-y-1 md:col-span-1 border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Beban Jam Pelajaran:
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#0284c7]">
                  {dayMeta[selectedDay].totalJp} JP
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  ({dayMeta[selectedDay].totalJp * 45} Menit)
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{dayMeta[selectedDay].hours}</span>
              </div>
            </div>

            <div className="space-y-1 md:col-span-2 border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Fokus Mata Pelajaran Hari {selectedDay}:
              </span>
              <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                {dayMeta[selectedDay].focus}
              </p>
              <div className="text-[11px] text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 mt-1 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
                <span className="truncate">{dayMeta[selectedDay].highlight}</span>
              </div>
            </div>

            <div className="space-y-1 md:col-span-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Jeda Istirahat Resmi:
              </span>
              <div className="text-xs text-slate-700 space-y-1 leading-snug">
                <div className="flex items-start gap-1.5">
                  <Coffee className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>{dayMeta[selectedDay].breakSummary}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Filter Bar & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Filter Tabs by Category */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl text-xs font-semibold overflow-x-auto w-full sm:w-fit">
              {[
                { id: 'Semua', label: 'Semua Sesi & Jam' },
                { id: 'Peminatan MIPA', label: 'Peminatan Sains MIPA (5 JP)' },
                { id: 'Wajib', label: 'Mata Pelajaran Wajib' },
                { id: 'P5 & BK', label: 'Projek P5 & Konseling BK' },
                { id: 'Istirahat', label: 'Pembiasaan & Istirahat' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterCategory(f.id)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                    filterCategory === f.id
                      ? 'bg-white text-[#0284c7] font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari mapel / guru / lab..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0284c7] transition-all"
              />
            </div>
          </div>

          {/* Daily Schedule Timeline Cards */}
          <div className="space-y-3">
            {currentDaySchedule.length > 0 ? (
              currentDaySchedule.map((item) => {
                const isOngoing = item.status === 'Berlangsung';
                const isFinished = item.status === 'Selesai';
                const modul = resolveModulAjar(item.subject);

                // SPECIAL RENDER: Break / ISHOMA Cards
                if (item.isBreak) {
                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl border border-dashed border-amber-300 bg-amber-50/70 flex items-center justify-between gap-4 transition-all"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-200/80 border border-amber-300 flex items-center justify-center text-amber-800 shrink-0 shadow-2xs">
                          <Coffee className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                              Jeda Istirahat Resmi
                            </span>
                            <span className="text-xs text-amber-800 font-mono font-semibold">
                              {item.time} ({item.periodRange})
                            </span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm mt-0.5">
                            {item.subject}
                          </h4>
                          <p className="text-[11px] text-slate-600 flex items-center gap-1.5 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-amber-700" />
                            <span>Lokasi: {item.room} · Didampingi {item.teacher}</span>
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-amber-800 bg-white border border-amber-200 px-3 py-1.5 rounded-xl shadow-2xs hidden sm:inline-block">
                        Pemulihan Energi & Ibadah
                      </span>
                    </div>
                  );
                }

                const isAcademic = isAcademicScheduleItem(item);

                const isBK = 
                  item.subject.toLowerCase().includes('bimbingan konseling') || 
                  item.subject.toLowerCase().includes('(bk)') || 
                  (item.category || '').toLowerCase().includes('bk') || 
                  (item.category || '').toLowerCase().includes('konseling');

                const isP5 = 
                  item.subject.toLowerCase().includes('profil pelajar pancasila') || 
                  item.subject.toLowerCase().includes('p5') || 
                  (item.category || '').toLowerCase().includes('p5') ||
                  (item.category || '').toLowerCase().includes('projek');

                // SPECIAL RENDER: Bimbingan Konseling (BK) Card
                if (isBK) {
                  return (
                    <div
                      key={item.id}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-purple-50/80 via-indigo-50/50 to-white border-purple-200/90 shadow-2xs hover:border-purple-300 ${
                        isOngoing ? 'ring-2 ring-purple-300 border-purple-400' : ''
                      }`}
                    >
                      {/* Left Side: Time, JP Badge, Subject & Teacher */}
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="px-3 py-2.5 rounded-xl text-xs font-mono font-bold flex flex-col items-center justify-center shrink-0 min-w-[110px] bg-purple-100/90 border border-purple-200 text-purple-900 shadow-2xs">
                          <HeartHandshake className="w-4 h-4 mb-1 text-purple-700" />
                          <span className="tracking-tight">{item.time}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded mt-1 font-sans font-semibold bg-purple-200 text-purple-900">
                            {item.jp ? `${item.jp} JP (Layanan BK)` : 'Layanan BK'}
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-200">
                              Layanan Bimbingan Konseling (BK)
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                              Pengembangan Pribadi &amp; Karir
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isOngoing
                                  ? 'bg-purple-200 text-purple-900 animate-pulse'
                                  : isFinished
                                  ? 'bg-slate-100 text-slate-600'
                                  : 'bg-amber-100 text-amber-900'
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>

                          <h3 className="font-bold text-slate-900 text-base leading-snug">
                            {item.subject}
                          </h3>
                          <p className="text-xs text-purple-950 font-medium">
                            Fokus: Konsultasi Karir PTN (SNBP/SNBT), Minat Bakat RIASEC &amp; Bimbingan Psikososial
                          </p>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5 text-purple-600" />
                              <span className="text-slate-800 font-semibold">{item.teacher}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-purple-600" />
                              <span className="text-slate-600">{item.room}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Side: Direct Consultation Action (NO SYLLABUS/VIDEO OR BACA MATERI BUTTONS) */}
                      <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0 shrink-0">
                        <button
                          type="button"
                          onClick={() => onNavigateTab ? onNavigateTab('konseling') : null}
                          className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white cursor-pointer active:scale-95"
                          title="Buka Menu Layanan Konseling & Karir BK"
                        >
                          <HeartHandshake className="w-4 h-4 text-purple-200" />
                          <span>Layanan &amp; Konsultasi BK</span>
                        </button>
                      </div>
                    </div>
                  );
                }

                // SPECIAL RENDER: Projek Penguatan Profil Pelajar Pancasila (P5) Card
                if (isP5) {
                  return (
                    <div
                      key={item.id}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-emerald-50/80 via-teal-50/50 to-white border-emerald-200/90 shadow-2xs hover:border-emerald-300 ${
                        isOngoing ? 'ring-2 ring-emerald-300 border-emerald-400' : ''
                      }`}
                    >
                      {/* Left Side: Time, JP Badge, Subject & Fasilitator */}
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="px-3 py-2.5 rounded-xl text-xs font-mono font-bold flex flex-col items-center justify-center shrink-0 min-w-[110px] bg-emerald-100/90 border border-emerald-200 text-emerald-900 shadow-2xs">
                          <Sparkles className="w-4 h-4 mb-1 text-emerald-700" />
                          <span className="tracking-tight">{item.time}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded mt-1 font-sans font-semibold bg-emerald-200 text-emerald-900">
                            {item.jp ? `${item.jp} JP (Blok Projek)` : 'Blok P5'}
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                              Kokurikuler Projek Penguatan P5
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200">
                              Fase F (SMA)
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isOngoing
                                  ? 'bg-emerald-200 text-emerald-900 animate-pulse'
                                  : isFinished
                                  ? 'bg-slate-100 text-slate-600'
                                  : 'bg-amber-100 text-amber-900'
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>

                          <h3 className="font-bold text-slate-900 text-base leading-snug">
                            {item.subject}
                          </h3>
                          <p className="text-xs text-emerald-950 font-medium">
                            Tema: Gaya Hidup Berkelanjutan — Inovasi Pengolahan Sampah Organik &amp; Biopori Terpadu
                          </p>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-slate-800 font-semibold">Fasilitator: {item.teacher}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-slate-600">Lokasi: {item.room}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Side: Direct View P5 Report Action (NO SYLLABUS/VIDEO OR BACA MATERI BUTTONS) */}
                      <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0 shrink-0">
                        <button
                          type="button"
                          onClick={() => onNavigateTab ? onNavigateTab('rapor') : null}
                          className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white cursor-pointer active:scale-95"
                          title="Buka Capaian Rapor Projek Profil Pelajar Pancasila (P5)"
                        >
                          <Award className="w-4 h-4 text-emerald-200" />
                          <span>Rapor Capaian P5</span>
                        </button>
                      </div>
                    </div>
                  );
                }

                // SPECIAL RENDER: Non-Academic Session (Pembiasaan, Upacara, Senam, Literasi Pagi, dll.)
                // Sembunyikan sepenuhnya tombol "Silabus & Video" dan "Baca Materi Pelajaran"
                if (!isAcademic) {
                  return (
                    <div
                      key={item.id}
                      className={`p-4 sm:p-4.5 rounded-2xl border border-dashed border-slate-300 bg-gradient-to-r from-slate-50 via-amber-50/20 to-slate-50/80 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                        isOngoing ? 'ring-2 ring-amber-300 border-amber-400 bg-amber-50/40' : ''
                      }`}
                    >
                      {/* Left Side: Time, Badge, Activity & Pengampu */}
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="px-3 py-2.5 rounded-xl text-xs font-mono font-bold flex flex-col items-center justify-center shrink-0 min-w-[110px] bg-slate-100 border border-slate-200 text-slate-700">
                          <Clock className="w-4 h-4 mb-1 text-slate-500 opacity-90" />
                          <span className="tracking-tight">{item.time}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded mt-1 font-sans font-semibold bg-slate-200 text-slate-700">
                            {item.periodRange || 'Pembiasaan'}
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 font-mono">
                              Sesi Pembiasaan Karakter
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isOngoing
                                  ? 'bg-amber-200 text-amber-900 animate-pulse'
                                  : isFinished
                                  ? 'bg-slate-100 text-slate-600'
                                  : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>

                          <h3 className="font-bold text-slate-900 text-base leading-snug">
                            {item.subject}
                          </h3>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5 text-slate-400" />
                              <span className="text-slate-700 font-medium">Pengampu: {item.teacher}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              <span className="text-slate-600">Lokasi: {item.room}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Side: Informative label only without any learning action buttons */}
                      <div className="pt-2 md:pt-0 shrink-0 self-start md:self-auto">
                        <span className="text-[11px] font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                          <span>Kegiatan Non-Pelajaran</span>
                        </span>
                      </div>
                    </div>
                  );
                }

                // ACADEMIC LESSON CARD (Hanya mata pelajaran akademik aktif dengan tombol materi)
                return (
                  <div
                    key={item.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      isOngoing
                        ? 'bg-sky-50/90 border-[#0284c7] shadow-sm ring-2 ring-sky-200'
                        : 'bg-white border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-slate-300'
                    }`}
                  >
                    {/* Left Side: Time, JP Badge, Subject & Teacher */}
                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Time Box */}
                      <div
                        className={`px-3 py-2.5 rounded-xl text-xs font-mono font-bold flex flex-col items-center justify-center shrink-0 min-w-[110px] ${
                          isOngoing
                            ? 'bg-[#0284c7] text-white shadow-xs'
                            : isFinished
                            ? 'bg-slate-100 text-slate-600'
                            : 'bg-slate-100 text-slate-800 border border-slate-200'
                        }`}
                      >
                        <Clock className="w-4 h-4 mb-1 text-inherit opacity-90" />
                        <span className="tracking-tight">{item.time}</span>
                        {item.jp && (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded mt-1 font-sans font-semibold ${
                            isOngoing ? 'bg-sky-800 text-white' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {item.jp} JP ({item.jp * 45} Menit)
                          </span>
                        )}
                      </div>

                      {/* Subject Details */}
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isOngoing
                                ? 'bg-sky-200 text-sky-900 animate-pulse font-extrabold'
                                : isFinished
                                ? 'bg-slate-100 text-slate-600'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {item.status}
                          </span>

                          {item.periodRange && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                              {item.periodRange}
                            </span>
                          )}

                          {item.category && (
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              item.category === 'Peminatan MIPA'
                                ? 'bg-sky-100 text-sky-800 border border-sky-200'
                                : item.category === 'Mata Pelajaran Wajib'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : 'bg-purple-100 text-purple-800 border border-purple-200'
                            }`}>
                              {item.category}
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold text-slate-900 text-base leading-snug">
                          {item.subject}
                        </h3>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-slate-700 font-medium">{item.teacher}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-slate-600">{item.room}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side: Dual Direct Actions (Silabus & Video + Baca Modul Ajar) */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0 shrink-0">
                      <button
                        onClick={() => {
                          const courseId = getCourseIdBySubjectName(item.subject);
                          if (onNavigateToCourse) {
                            onNavigateToCourse(courseId, item.subject);
                          } else {
                            onOpenModulAjar(item.subject);
                          }
                        }}
                        className="w-full sm:w-auto px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs bg-gradient-to-r from-sky-600 via-[#0284c7] to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white cursor-pointer active:scale-95"
                        title={`Buka Silabus Interaktif & Video Pembelajaran: ${item.subject}`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Silabus & Video</span>
                      </button>

                      <button
                        onClick={() => onOpenModulAjar(item.subject)}
                        className="w-full sm:w-auto px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 cursor-pointer active:scale-95"
                        title={`Buka Modul Ajar Lengkap: ${item.subject} (${modul.title})`}
                      >
                        <BookOpen className="w-3.5 h-3.5 text-slate-950" />
                        <span>Baca Materi Pelajaran</span>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 text-slate-500 space-y-2">
                <CalendarIcon className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-sm font-semibold">Tidak ada jadwal pelajaran di hari {selectedDay} untuk filter yang dipilih.</p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* ===================== VIEW MODE 2: MATRIKS MINGGUAN (SENIN - JUMAT) ===================== */}
      {viewMode === 'matriks' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Matriks Jadwal Pelajaran Mingguan (Senin - Jumat)
              </h3>
              <p className="text-xs text-slate-500">
                Ringkasan menyeluruh rotasi 44 Jam Pelajaran (JP) Kelas 11 SMA Jurusan MIPA.
              </p>
            </div>
            <span className="text-xs font-bold bg-sky-100 text-[#0284c7] px-3 py-1 rounded-lg">
              Kurikulum Merdeka Mandiri
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {days.map((day) => {
              const dayLessons = userFullSchedule.filter((item) => item.day === day);
              const isSelected = selectedDay === day;

              return (
                <div
                  key={day}
                  onClick={() => {
                    setSelectedDay(day);
                    setViewMode('harian');
                  }}
                  className={`rounded-xl border p-3 flex flex-col justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#0284c7] bg-sky-50/50 shadow-xs'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                      <span className="font-extrabold text-sm text-slate-900">{day}</span>
                      <span className="text-[10px] font-bold bg-[#0284c7] text-white px-2 py-0.5 rounded">
                        {dayMeta[day].totalJp} JP
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {dayLessons.map((lesson) => {
                        if (lesson.isBreak) {
                          return (
                            <div
                              key={lesson.id}
                              className="p-1.5 rounded-lg bg-amber-100/70 text-amber-900 text-[10px] font-medium flex items-center justify-between"
                            >
                              <span className="truncate">{lesson.subject}</span>
                              <span className="font-mono text-[9px] shrink-0">{lesson.time.split(' - ')[0]}</span>
                            </div>
                          );
                        }

                        const isLessonAcademic = isAcademicScheduleItem(lesson);

                        if (!isLessonAcademic) {
                          const isLessonBK = (lesson.subject && lesson.subject.includes('Bimbingan Konseling')) || (lesson.category && lesson.category.includes('BK'));
                          const isLessonP5 = (lesson.subject && (lesson.subject.includes('P5') || lesson.subject.includes('Pelajar Pancasila'))) || (lesson.category && lesson.category.includes('P5'));

                          if (isLessonBK) {
                            return (
                              <div
                                key={lesson.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (onNavigateTab) onNavigateTab('konseling');
                                }}
                                className="p-2 rounded-lg border border-purple-200 bg-purple-50/70 hover:bg-purple-100/90 hover:border-purple-400 text-left space-y-0.5 cursor-pointer transition-all"
                                title="Layanan Bimbingan Konseling (BK) - Klik untuk buka menu Konseling & Karir"
                              >
                                <div className="flex items-center justify-between text-[10px]">
                                  <span className="font-mono text-purple-700 font-bold">{lesson.time.split(' - ')[0]}</span>
                                  <span className="font-bold text-purple-800 text-[8px] bg-purple-200/80 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                    <HeartHandshake className="w-2.5 h-2.5" />
                                    BK (1 JP)
                                  </span>
                                </div>
                                <div className="font-bold text-purple-900 text-xs truncate">
                                  {lesson.subject}
                                </div>
                                <div className="text-[10px] text-purple-700/80 truncate">
                                  {lesson.teacher} · {lesson.room}
                                </div>
                              </div>
                            );
                          }

                          if (isLessonP5) {
                            return (
                              <div
                                key={lesson.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (onNavigateTab) onNavigateTab('rapor');
                                }}
                                className="p-2 rounded-lg border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100/90 hover:border-emerald-400 text-left space-y-0.5 cursor-pointer transition-all"
                                title="Projek Profil Pelajar Pancasila (P5) - Klik untuk buka e-Rapor P5"
                              >
                                <div className="flex items-center justify-between text-[10px]">
                                  <span className="font-mono text-emerald-700 font-bold">{lesson.time.split(' - ')[0]}</span>
                                  <span className="font-bold text-emerald-800 text-[8px] bg-emerald-200/80 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                    <Sparkles className="w-2.5 h-2.5" />
                                    P5 (2 JP)
                                  </span>
                                </div>
                                <div className="font-bold text-emerald-900 text-xs truncate">
                                  {lesson.subject}
                                </div>
                                <div className="text-[10px] text-emerald-700/80 truncate">
                                  {lesson.teacher} · {lesson.room}
                                </div>
                              </div>
                            );
                          }

                          return (
                            <div
                              key={lesson.id}
                              className="p-1.5 rounded-lg border border-dashed border-slate-300 bg-slate-50 text-left space-y-0.5"
                              title={`Sesi Non-Akademik: ${lesson.subject}`}
                            >
                              <div className="flex items-center justify-between text-[10px]">
                                <span className="font-mono text-slate-400">{lesson.time.split(' - ')[0]}</span>
                                <span className="font-bold text-slate-500 text-[8px] bg-slate-200 px-1 rounded">
                                  Pembiasaan
                                </span>
                              </div>
                              <div className="font-medium text-slate-700 text-xs truncate">
                                {lesson.subject}
                              </div>
                              <div className="text-[10px] text-slate-400 truncate">
                                {lesson.room}
                              </div>
                            </div>
                          );
                        }

                        return (
                          <div
                            key={lesson.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              const courseId = getCourseIdBySubjectName(lesson.subject);
                              if (onNavigateToCourse) {
                                onNavigateToCourse(courseId, lesson.subject);
                              } else {
                                onOpenModulAjar(lesson.subject);
                              }
                            }}
                            className={`p-2 rounded-lg border text-left space-y-0.5 hover:ring-2 hover:ring-sky-400 transition-all cursor-pointer ${
                              lesson.category === 'Peminatan MIPA'
                                ? 'bg-white border-sky-200 hover:border-sky-400'
                                : lesson.category === 'Mata Pelajaran Wajib'
                                ? 'bg-white border-emerald-200 hover:border-emerald-400'
                                : 'bg-white border-purple-200 hover:border-purple-400'
                            }`}
                            title={`Klik untuk buka silabus & video: ${lesson.subject}`}
                          >
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="font-mono text-slate-400">{lesson.time}</span>
                              {lesson.jp && (
                                <span className="font-bold text-[#0284c7]">{lesson.jp} JP</span>
                              )}
                            </div>
                            <div className="font-bold text-slate-900 text-xs truncate">
                              {lesson.subject}
                            </div>
                            <div className="text-[10px] text-slate-500 truncate">
                              {lesson.room}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-2 mt-2 border-t border-slate-200/60 text-center">
                    <span className="text-[10px] font-bold text-[#0284c7] hover:underline">
                      Buka Rincian Hari {day} ➔
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
