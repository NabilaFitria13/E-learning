import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  CheckCircle, 
  Calendar as CalendarIcon, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Play, 
  Sparkles, 
  ArrowRight, 
  FlaskConical,
  Compass,
  Check,
  BookOpen,
  Briefcase,
  UserCheck,
  Video,
  Camera,
  Layers,
  Award
} from 'lucide-react';
import { UserProfile, ExamItem } from '../types';
import { 
  MOCK_EXAMS_BY_ROLE, 
  MOCK_AGENDAS_BY_ROLE, 
  mockAgendas,
  MOCK_ASSIGNMENTS_BY_ROLE 
} from '../data/mockData';

interface DashboardViewProps {
  currentUser: UserProfile;
  onOpenAttendance: () => void;
  onStartExam: (exam: ExamItem) => void;
  onOpenSimulation: (simType: 'titrasi_kimia' | 'fisika_newton') => void;
  onOpenModulAjar: (subject: string) => void;
  onNavigateTab: (tab: string) => void;
  hasCheckedIn: boolean;
  todayCheckInTime?: string;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentUser,
  onOpenAttendance,
  onStartExam,
  onOpenSimulation,
  onOpenModulAjar,
  onNavigateTab,
  hasCheckedIn,
  todayCheckInTime,
}) => {
  const [selectedDate, setSelectedDate] = useState<number>(9);
  const [selectedMonth, setSelectedMonth] = useState<string>('November 2026');

  const userExams = MOCK_EXAMS_BY_ROLE['siswa_mipa'] || [];
  const userAgendas = MOCK_AGENDAS_BY_ROLE['siswa_mipa'] || [];
  const userAssignments = MOCK_ASSIGNMENTS_BY_ROLE['siswa_mipa'] || [];
  const pendingAssignments = userAssignments.filter(a => a.status === 'Belum Dikumpulkan');

  const calendarDays = [
    { dayName: 'Sen', date: 9, isToday: true },
    { dayName: 'Sel', date: 10 },
    { dayName: 'Rab', date: 11 },
    { dayName: 'Kam', date: 12 },
    { dayName: 'Jum', date: 13 },
    { dayName: 'Sab', date: 14 },
    { dayName: 'Min', date: 15 },
  ];

  const handleAgendaClick = (agenda: typeof userAgendas[0]) => {
    if (agenda.title.includes('Matematika')) {
      const exam = userExams.find((e) => e.title.includes('Matematika'));
      if (exam) onStartExam(exam);
      else onOpenModulAjar('Matematika Peminatan');
    } else if (agenda.title.includes('Kimia')) {
      onOpenSimulation('titrasi_kimia');
    } else if (agenda.title.includes('Fisika')) {
      onOpenSimulation('fisika_newton');
    } else {
      onOpenModulAjar('Bahasa Indonesia');
    }
  };

  return (
    <div className="p-3 sm:p-5 md:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
      
      {/* Top Welcome Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-100 text-[#0284c7] px-2 py-0.5 rounded">
              Kurikulum Merdeka Fase F · SMA Jurusan MIPA
            </span>
            <span className="text-xs text-slate-500 font-medium">{currentUser.school}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-0.5">
            Portal Pembelajaran Sains & Matematika
          </h2>
          <p className="text-xs text-slate-500">
            {currentUser.className} · Semester Ganjil TP 2026/2027 · NISN: {currentUser.nisn}
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('jadwal')}
          className="self-start sm:self-auto px-3.5 py-2 bg-sky-50 hover:bg-sky-100 text-[#0284c7] border border-sky-200 rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center gap-2 cursor-pointer"
        >
          <CalendarIcon className="w-4 h-4" />
          <span>Lihat Jadwal Pelajaran</span>
        </button>
      </div>

      {/* Main Grid: Left Column & Right Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        
        {/* Left Column (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          
          {/* Summary Stat Cards Tailored Exclusively for Grade 11 MIPA */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium block">Rombel Kelas</span>
                <span className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">XI MIPA 1</span>
                <span className="text-[11px] text-emerald-600 block mt-0.5 font-medium">Sains & Matematika</span>
              </div>
              <div className="w-11 h-11 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                <Users className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium block">Mata Pelajaran SMA MIPA</span>
                <span className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">14 Mapel</span>
                <span className="text-[11px] text-sky-600 block mt-0.5 font-medium">Fase F Kurikulum</span>
              </div>
              <div className="w-11 h-11 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0284c7] shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center justify-between sm:col-span-1">
              <div>
                <span className="text-xs text-slate-500 font-medium block">Presensi Hari Ini</span>
                <span className="text-lg sm:text-xl font-bold tracking-tight text-emerald-600">
                  {hasCheckedIn ? 'Hadir' : 'Belum Check-In'}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  {hasCheckedIn ? todayCheckInTime : 'Kamera Selfie'}
                </span>
              </div>
              <button
                onClick={onOpenAttendance}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                  hasCheckedIn
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                    : 'bg-amber-400 hover:bg-amber-300 border-amber-500 text-slate-950 font-bold animate-bounce'
                }`}
                title="Presensi kamera selfie"
              >
                {hasCheckedIn ? <CheckCircle className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Quick Access: Tugas & PR Sekolah (Unggah & Kirim Jawaban) */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-amber-500" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Tugas & PR Sekolah (Pengumpulan Online)
                    </h3>
                    {pendingAssignments.length > 0 && (
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                        {pendingAssignments.length} Perlu Dikirim
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Kirim laporan praktikum, esai analitik, dan portofolio langsung ke guru pengampu.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onNavigateTab('tugas')}
                className="px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                <span>Lihat Semua Tugas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {userAssignments.slice(0, 2).map((asg) => (
                <div
                  key={asg.id}
                  onClick={() => onNavigateTab('tugas')}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-[#0284c7] transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 truncate">
                        {asg.subject}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        asg.status === 'Diserahkan'
                          ? 'bg-blue-100 text-blue-700'
                          : asg.status === 'Dinilai'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {asg.status}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-900 group-hover:text-[#0284c7] transition-colors line-clamp-1">
                      {asg.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      Tenggat: {asg.dueDate}
                    </p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 text-[10px]">{asg.teacher || 'Guru Pengampu'}</span>
                    <span className="font-bold text-[#0284c7] group-hover:underline flex items-center gap-1">
                      <span>{asg.status === 'Belum Dikumpulkan' ? 'Kirim Sekarang' : 'Detail'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Reading Quick Access: Materi Langsung Muncul Tanpa Unduh PDF */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#0284c7]" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Materi Pelajaran MIPA (Langsung Terbaca Otomatis)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Buka dan pelajari modul, peta konsep, teori mendalam, formula, LKPD, dan kuis langsung di layar.
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full w-fit">
                ✓ 100% In-App Reader
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { subject: 'Termodinamika & Kalor', title: 'Hukum I Termo & Mesin Carnot', color: 'border-rose-300 hover:bg-rose-50/50', tag: 'Fisika Peminatan' },
                { subject: 'Termokimia & Entalpi', title: 'Eksoterm, Kalorimetri & Hess', color: 'border-orange-300 hover:bg-orange-50/50', tag: 'Kimia Analitik' },
                { subject: 'Struktur Sel & Transpor Membran', title: 'Fosfolipid, Osmosis & Plasmolisis', color: 'border-emerald-300 hover:bg-emerald-50/50', tag: 'Biologi Sel' },
                { subject: 'Polinomial & Suku Banyak', title: 'Pembagian Horner & Teorema Sisa', color: 'border-violet-300 hover:bg-violet-50/50', tag: 'Matematika Lanjut' },
                { subject: 'Kimia Analitik', title: 'Titrasi Asam Basa Stoikiometri', color: 'border-amber-300 hover:bg-amber-50/50', tag: 'Sains Kimia' },
                { subject: 'Fisika Peminatan', title: 'Hukum Newton & Bidang Miring', color: 'border-sky-300 hover:bg-sky-50/50', tag: 'Sains Fisika' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => onOpenModulAjar(item.subject)}
                  className={`p-3.5 rounded-xl border bg-white ${item.color} transition-all cursor-pointer flex items-center justify-between group shadow-2xs`}
                >
                  <div className="min-w-0 pr-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#0284c7] block">
                      {item.tag}
                    </span>
                    <h4 className="font-bold text-slate-900 text-xs truncate mt-0.5">
                      {item.subject}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {item.title}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 bg-sky-50 group-hover:bg-[#0284c7] group-hover:text-white text-[#0284c7] rounded-lg text-[10px] font-bold transition-colors shrink-0 flex items-center gap-1">
                    <span>Baca</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Science Lab Simulation CTA (Exclusive to Grade 11 MIPA) */}
          <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-sky-950 rounded-2xl p-4 sm:p-5 text-white border border-emerald-800/60 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-slate-950 px-2 py-0.5 rounded">
                    PRAKTIKUM SAINS VIRTUAL
                  </span>
                  <span className="text-xs text-emerald-300 font-semibold">Khusus Kelas 11 MIPA</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Laboratorium Sains Virtual Interaktif
                </h3>
                <p className="text-xs text-slate-300 max-w-md leading-relaxed">
                  Lakukan eksperimen nyata penentuan titik ekuivalen titrasi kimia asam basa dan simulasi gaya gesek bidang miring Newton dengan parameter real-time.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 shrink-0">
                <button
                  onClick={() => onOpenSimulation('titrasi_kimia')}
                  className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <FlaskConical className="w-3.5 h-3.5" />
                  <span>Lab Kimia</span>
                </button>
                <button
                  onClick={() => onOpenSimulation('fisika_newton')}
                  className="px-3.5 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Lab Fisika</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          
          {/* Top Hero Card with Clean Production Image Support */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0284c7] via-[#0369a1] to-[#075985] text-white p-5 sm:p-6 shadow-md min-h-[220px] flex flex-col justify-between">
            <img
              src="/images/hero_school_digital_1793805015402.jpg"
              alt="Masa Depan Digital Siswa SMA"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/images/hero_school_digital_1793805015402.jpg';
              }}
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 pointer-events-none"
            />
            
            <div className="relative z-10 space-y-2">
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-md text-sky-100">
                Peminatan Sains & Teknologi MIPA
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight max-w-xs text-white">
                Portal Belajar Siswa Kelas 11 MIPA
              </h3>
              <p className="text-xs text-sky-100 max-w-sm leading-relaxed">
                Akses modul ajar digital, video pembelajaran guru, praktikum sains virtual, dan asesmen CBT Kurikulum Merdeka.
              </p>
            </div>

            <div className="relative z-10 pt-4 flex flex-wrap gap-2">
              <button
                onClick={() => onNavigateTab('jadwal')}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Lihat Jadwal & Modul</span>
              </button>
              <button
                onClick={() => onNavigateTab('kelas')}
                className="bg-white/20 hover:bg-white/30 text-white px-3.5 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Semua Materi</span>
              </button>
            </div>
          </div>

          {/* Section: Ujian CBT & Asesmen MIPA */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0284c7]" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Ujian CBT & Asesmen MIPA
                  </h3>
                  <p className="text-[11px] text-slate-500">Penilaian Tengah Semester & Harian</p>
                </div>
              </div>
              <button
                onClick={() => onNavigateTab('ujian')}
                className="text-xs font-semibold text-[#0284c7] hover:underline cursor-pointer"
              >
                Lihat Semua
              </button>
            </div>

            <div className="space-y-2.5">
              {userExams.slice(0, 2).map((exam) => (
                <div
                  key={exam.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-wider block">
                      {exam.type} · {exam.subject}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                      {exam.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1">
                      <span>{exam.timeStr}</span>
                      <span>•</span>
                      <span>{exam.durationMinutes} Menit</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onStartExam(exam)}
                    className="px-3.5 py-1.5 bg-[#0284c7] hover:bg-sky-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs shrink-0 cursor-pointer"
                  >
                    Mulai CBT
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Agenda & Jadwal Pelajaran Mingguan */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-amber-500" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Agenda & Jadwal Kelas 11 MIPA
                  </h3>
                  <p className="text-[11px] text-slate-500">November 2026 (Semester Ganjil)</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#0284c7] bg-sky-50 px-2 py-0.5 rounded">
                XI MIPA 1
              </span>
            </div>

            {/* Interactive Day Selector */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {calendarDays.map((d, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(d.date)}
                  className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedDate === d.date
                      ? 'bg-[#0284c7] text-white shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="block text-[10px] text-slate-400 font-normal">{d.dayName}</span>
                  <span className="block font-bold mt-0.5">{d.date}</span>
                </button>
              ))}
            </div>

            {/* Agendas for Selected Date */}
            <div className="space-y-2">
              {userAgendas.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleAgendaClick(item)}
                  className="p-3 rounded-xl border border-slate-200/80 hover:border-sky-300 bg-white transition-all cursor-pointer flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-emerald-600 block">
                      {item.time} · {item.location}
                    </span>
                    <h5 className="font-semibold text-xs text-slate-800 truncate">
                      {item.title}
                    </h5>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
