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
  List
} from 'lucide-react';
import { ScheduleItem, UserProfile } from '../types';
import { MOCK_SCHEDULE_BY_ROLE, resolveModulAjar } from '../data/mockData';

interface ScheduleViewProps {
  currentUser: UserProfile;
  onOpenModulAjar: (subject: string) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ 
  currentUser,
  onOpenModulAjar 
}) => {
  const [selectedDay, setSelectedDay] = useState<'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat'>('Senin');
  const [viewMode, setViewMode] = useState<'harian' | 'matriks'>('harian');
  const [filterCategory, setFilterCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showJpBreakdown, setShowJpBreakdown] = useState<boolean>(false);

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
      focus: 'Fisika Peminatan (2 JP), Bahasa Indonesia (3 JP), Matematika Peminatan (3 JP)',
      highlight: 'Upacara Bendera Pukul 06.45 WIB di Lapangan Utama',
      breakSummary: 'Istirahat I (10.30 - 10.50 WIB) & ISHOMA (12.20 - 13.05 WIB)'
    },
    Selasa: {
      totalJp: 9,
      hours: '06.45 - 15.05 WIB',
      focus: 'Kimia Analitik (3 JP), Biologi Sel (2 JP), BK (1 JP), Matematika Wajib (3 JP)',
      highlight: 'Praktikum Kimia Analitik di Lab Kimia Pagi Hari',
      breakSummary: 'Istirahat I (09.30 - 09.50 WIB) & ISHOMA (12.05 - 12.50 WIB)'
    },
    Rabu: {
      totalJp: 9,
      hours: '06.45 - 15.05 WIB',
      focus: 'Biologi Sel (3 JP Lab), Matematika Peminatan (2 JP), B. Inggris (2 JP), Agama (2 JP)',
      highlight: 'Praktikum Mikroskop Biologi Sel di Lab Biologi Lantai 2',
      breakSummary: 'Istirahat I (09.30 - 09.50 WIB) & ISHOMA (12.05 - 12.50 WIB)'
    },
    Kamis: {
      totalJp: 9,
      hours: '06.45 - 15.05 WIB',
      focus: 'Fisika Peminatan (3 JP Lab), Kimia Analitik (2 JP Lab), Agama (1 JP), Sejarah (2 JP), Seni (1 JP)',
      highlight: 'Eksperimen Dinamika Gerak Newton di Lab Fisika Dasar',
      breakSummary: 'Istirahat I (09.30 - 09.50 WIB) & ISHOMA (12.05 - 12.50 WIB)'
    },
    Jumat: {
      totalJp: 8,
      hours: '06.45 - 15.15 WIB',
      focus: 'SKJ (1 JP), PJOK (3 JP), Pendidikan Pancasila (2 JP), Projek P5 (2 JP), Seni (1 JP)',
      highlight: 'Senam Pagi SKJ & Sholat Jumat Berjamaah di Masjid Al-Ikhlas',
      breakSummary: 'Istirahat I (09.45 - 10.05 WIB) & ISHOMA Jumat (11.35 - 13.00 WIB)'
    }
  };

  // Retrieve schedule list specifically for this user role
  const userFullSchedule = MOCK_SCHEDULE_BY_ROLE[currentUser.role] || MOCK_SCHEDULE_BY_ROLE['siswa_mipa'];
  
  // Filter for the selected day
  const currentDaySchedule = userFullSchedule
    .filter((item) => item.day === selectedDay)
    .filter((item) => {
      if (filterCategory === 'Semua') return true;
      if (filterCategory === 'Peminatan MIPA') return item.category === 'Peminatan MIPA';
      if (filterCategory === 'Wajib') return item.category === 'Mata Pelajaran Wajib';
      if (filterCategory === 'P5 & BK') return item.category === 'Pengembangan & P5';
      if (filterCategory === 'Istirahat') return item.isBreak;
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
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1">
            Jadwal Pelajaran {currentUser.className}
          </h2>
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
                  <li className="flex justify-between"><span>• Kimia Analitik</span><strong className="text-slate-900">5 JP / Minggu</strong></li>
                  <li className="flex justify-between"><span>• Biologi Sel</span><strong className="text-slate-900">5 JP / Minggu</strong></li>
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
                  <li className="flex justify-between"><span>• Matematika Umum</span><strong className="text-slate-900">3 JP / Minggu</strong></li>
                  <li className="flex justify-between"><span>• Bahasa Indonesia</span><strong className="text-slate-900">3 JP / Minggu</strong></li>
                  <li className="flex justify-between"><span>• Pend. Agama & Budi Pekerti</span><strong className="text-slate-900">3 JP / Minggu</strong></li>
                  <li className="flex justify-between"><span>• PJOK</span><strong className="text-slate-900">3 JP / Minggu</strong></li>
                  <li className="flex justify-between"><span>• Bahasa Inggris</span><strong className="text-slate-900">2 JP / Minggu</strong></li>
                  <li className="flex justify-between"><span>• Pendidikan Pancasila</span><strong className="text-slate-900">2 JP / Minggu</strong></li>
                  <li className="flex justify-between"><span>• Sejarah Indonesia</span><strong className="text-slate-900">2 JP / Minggu</strong></li>
                  <li className="flex justify-between"><span>• Seni Budaya</span><strong className="text-slate-900">2 JP / Minggu</strong></li>
                </ul>
              </div>

              {/* Group 3: Kokurikuler & Pengembangan */}
              <div className="p-3.5 rounded-xl bg-white border border-purple-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-900">3. Kokurikuler & BK (4 JP)</span>
                  <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded">Karakter & Karier</span>
                </div>
                <ul className="space-y-1 text-slate-600 text-[11px]">
                  <li className="flex justify-between"><span>• Projek Penguatan P5</span><strong className="text-slate-900">3 JP / Minggu</strong></li>
                  <li className="flex justify-between"><span>• Bimbingan Konseling (BK PTN)</span><strong className="text-slate-900">1 JP / Minggu</strong></li>
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
                { id: 'Istirahat', label: 'Jeda Istirahat' },
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

                // ACADEMIC LESSON CARD
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

                    {/* Right Side: Modul Ajar Direct Reading Action */}
                    <div className="flex items-center gap-2 pt-2 md:pt-0 shrink-0">
                      <button
                        onClick={() => onOpenModulAjar(item.subject)}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 cursor-pointer active:scale-95"
                        title={`Buka Modul Ajar Lengkap: ${item.subject} (${modul.title})`}
                      >
                        <BookOpen className="w-4 h-4 text-slate-950" />
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

                        return (
                          <div
                            key={lesson.id}
                            className={`p-2 rounded-lg border text-left space-y-0.5 ${
                              lesson.category === 'Peminatan MIPA'
                                ? 'bg-white border-sky-200'
                                : lesson.category === 'Mata Pelajaran Wajib'
                                ? 'bg-white border-emerald-200'
                                : 'bg-white border-purple-200'
                            }`}
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
