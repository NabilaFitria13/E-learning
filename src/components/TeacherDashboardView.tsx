import React, { useState, useEffect } from 'react';
import { 
  Users, 
  GraduationCap, 
  CheckCircle, 
  Clock, 
  FileText, 
  Sparkles, 
  BookOpen, 
  Briefcase, 
  UserCheck, 
  Upload, 
  Plus, 
  Edit3, 
  Download, 
  Search, 
  CheckCircle2, 
  Share2, 
  Radio, 
  Calendar as CalendarIcon, 
  Video, 
  FileUp, 
  X, 
  ChevronRight, 
  Award,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile } from '../types';
import { 
  StudentGradeRecord, 
  mockStudents,
  ALL_TEACHER_STUDENTS,
  STUDENTS_XI_MIPA_1,
  STUDENTS_XI_MIPA_2
} from '../data/mockData';
import { 
  NOVEMBER_2026_SCHOOL_DATES, 
  getFormattedToday, 
  CURRENT_ACTIVE_MONTH_YEAR 
} from '../utils/dateUtils';

interface TeacherDashboardViewProps {
  currentUser: UserProfile;
  currentSchool: string;
  onNavigateTab?: (tab: string) => void;
  initialTeacherTab?: 'ikhtisar' | 'nilai' | 'cbt' | 'materi' | 'presensi';
}

interface CBTExamPackage {
  id: string;
  title: string;
  subject: string;
  targetClass: string;
  dateStr: string;
  timeStr: string;
  durationMinutes: number;
  totalQuestions: number;
  status: 'Sedang Berlangsung' | 'Segera Berlangsung' | 'Selesai';
  isScoreReleased: boolean;
  averageScore?: number;
  submittedCount: number;
  totalStudents: number;
}

interface TeachingMaterial {
  id: string;
  title: string;
  chapter: string;
  targetClass: string;
  format: 'PDF Modul' | 'Video Lab' | 'Slide Presentasi';
  fileSize: string;
  uploadDate: string;
  readCount: number;
  totalTarget: number;
  isVisibleToStudents: boolean;
}

export const TeacherDashboardView: React.FC<TeacherDashboardViewProps> = ({
  currentUser,
  currentSchool,
  onNavigateTab,
  initialTeacherTab = 'ikhtisar'
}) => {
  const [activeTeacherTab, setActiveTeacherTab] = useState<'ikhtisar' | 'nilai' | 'cbt' | 'materi' | 'presensi'>(initialTeacherTab);
  const [selectedClass, setSelectedClass] = useState<'XI MIPA 1' | 'XI MIPA 2'>('XI MIPA 1');
  const [selectedAttendanceDate, setSelectedAttendanceDate] = useState<string>('2026-11-09');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Sync internal active tab with external prop when navigation from sidebar occurs
  useEffect(() => {
    if (initialTeacherTab) {
      setActiveTeacherTab(initialTeacherTab);
    }
  }, [initialTeacherTab]);

  // =========================================================================
  // 1. DATA SISWA & NILAI (TOTAL 72 SISWA: 36 DI XI MIPA 1 & 36 DI XI MIPA 2)
  // =========================================================================
  const [studentRecords, setStudentRecords] = useState<StudentGradeRecord[]>(mockStudents);
  const [editingGradeStudentId, setEditingGradeStudentId] = useState<string | null>(null);

  // =========================================================================
  // 2. DATA BANK SOAL & CBT (SINKRON NOVEMBER 2026)
  // =========================================================================
  const [cbtExams, setCbtExams] = useState<CBTExamPackage[]>([
    {
      id: 'cbt_01',
      title: 'Penilaian Tengah Semester (PTS) Kimia Peminatan Fase F',
      subject: 'Kimia Peminatan',
      targetClass: 'Kelas XI MIPA 1 & XI MIPA 2',
      dateStr: 'Senin, 9 November 2026',
      timeStr: '13:00 - 14:30 WIB',
      durationMinutes: 90,
      totalQuestions: 40,
      status: 'Sedang Berlangsung',
      isScoreReleased: false,
      submittedCount: 56,
      totalStudents: 72,
    },
    {
      id: 'cbt_02',
      title: 'Kuis Formatif: Titrasi Asam Basa & Kurva pH',
      subject: 'Kimia',
      targetClass: 'Kelas XI MIPA 1',
      dateStr: 'Kamis, 12 November 2026',
      timeStr: '08:00 - 09:00 WIB',
      durationMinutes: 45,
      totalQuestions: 20,
      status: 'Segera Berlangsung',
      isScoreReleased: false,
      submittedCount: 0,
      totalStudents: 36,
    },
    {
      id: 'cbt_03',
      title: 'Sumatif Bab 3: Stoikiometri & Reaksi Redoks',
      subject: 'Kimia',
      targetClass: 'Kelas XI MIPA 1 & XI MIPA 2',
      dateStr: 'Jumat, 6 November 2026',
      timeStr: '10:00 - 11:30 WIB',
      durationMinutes: 75,
      totalQuestions: 30,
      status: 'Selesai',
      isScoreReleased: true,
      averageScore: 88.4,
      submittedCount: 72,
      totalStudents: 72,
    },
  ]);

  // Modal Create Exam State
  const [isCreateExamModalOpen, setIsCreateExamModalOpen] = useState(false);
  const [newExamTitle, setNewExamTitle] = useState('');
  const [newExamClass, setNewExamClass] = useState('Kelas XI MIPA 1');
  const [newExamDuration, setNewExamDuration] = useState('60');
  const [newExamQuestionCount, setNewExamQuestionCount] = useState('25');

  // =========================================================================
  // 3. DATA KELOLA MATERI PEMBELAJARAN (SINKRON NOVEMBER 2026)
  // =========================================================================
  const [materials, setMaterials] = useState<TeachingMaterial[]>([
    {
      id: 'mat_01',
      title: 'Modul Lengkap: Titrasi Asam Basa & Penentuan Titik Ekuivalen',
      chapter: 'Bab 4: Larutan Asam Basa',
      targetClass: 'XI MIPA 1 & XI MIPA 2',
      format: 'PDF Modul',
      fileSize: '4.2 MB',
      uploadDate: '08 Nov 2026',
      readCount: 68,
      totalTarget: 72,
      isVisibleToStudents: true,
    },
    {
      id: 'mat_02',
      title: 'Video Demonstrasi: Uji Lakmus & Indikator Alami Kunyit-Kubis Ungu',
      chapter: 'Bab 4: Praktikum Mandiri',
      targetClass: 'XI MIPA 1 & XI MIPA 2',
      format: 'Video Lab',
      fileSize: '48.5 MB (18 Menit)',
      uploadDate: '05 Nov 2026',
      readCount: 64,
      totalTarget: 72,
      isVisibleToStudents: true,
    },
    {
      id: 'mat_03',
      title: 'Slide Paparan: Teori Asam Basa Arrhenius, Bronsted-Lowry & Lewis',
      chapter: 'Bab 4: Konsep Dasar',
      targetClass: 'XI MIPA 1 & XI MIPA 2',
      format: 'Slide Presentasi',
      fileSize: '12.4 MB (24 Slide)',
      uploadDate: '03 Nov 2026',
      readCount: 72,
      totalTarget: 72,
      isVisibleToStudents: true,
    },
    {
      id: 'mat_04',
      title: 'LKPD Praktikum: Titrasi Asam Cuka Komersial dengan Standar NaOH 0.1M',
      chapter: 'Bab 4: Lembar Kerja Proyek',
      targetClass: 'XI MIPA 1 & XI MIPA 2',
      format: 'PDF Modul',
      fileSize: '1.8 MB',
      uploadDate: '01 Nov 2026',
      readCount: 70,
      totalTarget: 72,
      isVisibleToStudents: true,
    },
  ]);

  // Modal Upload Material State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newMatTitle, setNewMatTitle] = useState('');
  const [newMatChapter, setNewMatChapter] = useState('Bab 4: Larutan Asam Basa');
  const [newMatFormat, setNewMatFormat] = useState<'PDF Modul' | 'Video Lab' | 'Slide Presentasi'>('PDF Modul');

  // Trigger Toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    try {
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.6 }
      });
    } catch {}
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Handle Update Grade directly
  const handleSaveStudentGrade = (studentId: string, field: keyof StudentGradeRecord, value: number) => {
    setStudentRecords((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, [field]: value } : s))
    );
    setEditingGradeStudentId(null);
    triggerToast('Nilai siswa berhasil diperbarui!');
  };

  // Toggle CBT Score Release
  const handleToggleScoreRelease = (examId: string) => {
    setCbtExams((prev) =>
      prev.map((exam) => {
        if (exam.id === examId) {
          const nextState = !exam.isScoreReleased;
          triggerToast(
            nextState
              ? `Nilai ${exam.title} resmi dirilis ke siswa!`
              : `Rilis nilai ${exam.title} dikembalikan ke draft guru.`
          );
          return { ...exam, isScoreReleased: nextState };
        }
        return exam;
      })
    );
  };

  // Handle Create New CBT Exam
  const handleCreateCBT = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExamTitle.trim()) return;

    const newExam: CBTExamPackage = {
      id: `cbt_${Date.now()}`,
      title: newExamTitle,
      subject: 'Kimia Fase F',
      targetClass: newExamClass,
      dateStr: 'Selasa, 18 Februari 2025',
      timeStr: '08:00 - 09:30 WIB',
      durationMinutes: Number(newExamDuration) || 60,
      totalQuestions: Number(newExamQuestionCount) || 25,
      status: 'Segera Berlangsung',
      isScoreReleased: false,
      submittedCount: 0,
      totalStudents: 36,
    };

    setCbtExams([newExam, ...cbtExams]);
    setIsCreateExamModalOpen(false);
    setNewExamTitle('');
    triggerToast('Paket ujian CBT baru berhasil dijadwalkan!');
  };

  // Handle Upload Material
  const handleUploadMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMatTitle.trim()) return;

    const newMat: TeachingMaterial = {
      id: `mat_${Date.now()}`,
      title: newMatTitle,
      chapter: newMatChapter,
      targetClass: 'XI MIPA 1 & XI MIPA 2',
      format: newMatFormat,
      fileSize: newMatFormat === 'Video Lab' ? '32.1 MB' : '3.5 MB',
      uploadDate: 'Hari ini',
      readCount: 0,
      totalTarget: 72,
      isVisibleToStudents: true,
    };

    setMaterials([newMat, ...materials]);
    setIsUploadModalOpen(false);
    setNewMatTitle('');
    triggerToast('Materi bahan ajar berhasil dipublikasikan ke siswa!');
  };

  // Toggle Visibility Material
  const handleToggleMaterialVisibility = (matId: string) => {
    setMaterials((prev) =>
      prev.map((m) => {
        if (m.id === matId) {
          const nextState = !m.isVisibleToStudents;
          triggerToast(
            nextState
              ? 'Materi kini dapat diakses oleh siswa.'
              : 'Materi disembunyikan dari siswa (Draft Guru).'
          );
          return { ...m, isVisibleToStudents: nextState };
        }
        return m;
      })
    );
  };

  // Filter students STRICTLY by selectedClass and search query
  // Ensures ONLY 36 students of XI MIPA 1 or 36 students of XI MIPA 2 appear!
  const filteredStudents = studentRecords.filter((s) => {
    const matchClass = s.className === selectedClass;
    const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nisn.includes(searchQuery);
    return matchClass && matchSearch;
  });

  // Calculate dynamic presence statistics for selectedClass (exactly out of 36 students)
  const currentClassStudents = studentRecords.filter((s) => s.className === selectedClass);
  const hadirCount = currentClassStudents.filter((s) => s.attendanceToday === 'Hadir').length;
  const izinCount = currentClassStudents.filter((s) => s.attendanceToday === 'Izin').length;
  const sakitCount = currentClassStudents.filter((s) => s.attendanceToday === 'Sakit').length;
  const alphaCount = currentClassStudents.filter((s) => s.attendanceToday === 'Alpha').length;

  const handleTabSwitch = (tab: typeof activeTeacherTab) => {
    setActiveTeacherTab(tab);
    if (onNavigateTab) {
      if (tab === 'ikhtisar') onNavigateTab('beranda');
      else if (tab === 'nilai') onNavigateTab('manajemen_kelas');
      else if (tab === 'cbt') onNavigateTab('bank_soal');
      else if (tab === 'materi') onNavigateTab('kelola_materi');
      else if (tab === 'presensi') onNavigateTab('presensi_guru');
    }
  };

  return (
    <div className="p-3 sm:p-5 md:p-6 max-w-7xl mx-auto space-y-5 sm:space-y-6">

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ===================================================================== */}
      {/* ATURAN 1: BANNER UTAMA & 4 KOTAK STATISTIK HANYA TAMPIL DI DASHBOARD   */}
      {/* ===================================================================== */}
      {activeTeacherTab === 'ikhtisar' ? (
        <>
          {/* Card Banner Utama (HANYA tampil di Beranda Dashboard Guru) */}
          <div className="bg-gradient-to-r from-[#0369a1] via-[#0284c7] to-sky-700 text-white rounded-3xl p-5 sm:p-7 shadow-lg relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute right-12 top-6 w-32 h-32 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                {currentUser.avatarUrl ? (
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white/30 shadow-md shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-2xl shadow-md ring-4 ring-white/30 shrink-0">
                    {currentUser.name.charAt(0)}
                  </div>
                )}

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider rounded-md shadow-xs">
                      Pendidik / Guru Pengampu
                    </span>
                    <span className="text-xs text-sky-100 font-mono">
                      NIP: {currentUser.nisn}
                    </span>
                    <span className="text-sky-200 text-xs hidden sm:inline">·</span>
                    <span className="text-xs text-sky-100 font-medium hidden sm:inline">
                      {currentSchool}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
                    Selamat Bertugas, {currentUser.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-sky-100 mt-1 flex flex-wrap items-center gap-2 font-medium">
                    <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded-lg">
                      Guru Kimia Fase F (Kelas XI MIPA 1 & XI MIPA 2)
                    </span>
                    <span>· Total 72 Siswa Terdaftar</span>
                  </p>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
                <button
                  onClick={() => {
                    handleTabSwitch('cbt');
                    setIsCreateExamModalOpen(true);
                  }}
                  className="px-3.5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Buat Soal CBT</span>
                </button>

                <button
                  onClick={() => {
                    handleTabSwitch('materi');
                    setIsUploadModalOpen(true);
                  }}
                  className="px-3.5 py-2.5 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl transition-all backdrop-blur-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Upload className="w-4 h-4" />
                  <span>Unggah Materi</span>
                </button>
              </div>
            </div>
          </div>

          {/* 4 Kotak Ringkasan Statistik (HANYA tampil di Beranda Dashboard Guru) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            
            {/* Widget 1: Total Siswa Diampu (Persis 72 Siswa) */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Total Siswa Diampu
                </span>
                <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950 text-[#0284c7] flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  72
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                  Siswa Aktif
                </span>
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>XI MIPA 1 (36) & XI MIPA 2 (36)</span>
              </div>
            </div>

            {/* Widget 2: Tugas Perlu Dinilai */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Tugas Perlu Dinilai
                </span>
                <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">
                  8
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                  Pengumpulan Baru
                </span>
              </div>
              <button
                onClick={() => handleTabSwitch('nilai')}
                className="text-[11px] text-[#0284c7] hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
              >
                <span>Buka Penilaian Tugas</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Widget 3: Ujian CBT Aktif */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Ujian CBT Aktif
                </span>
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  2
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                  Sesi Ujian
                </span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>PTS Kimia Sedang Live</span>
              </div>
            </div>

            {/* Widget 4: Rata-Rata Capaian (KKTP) */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Rerata Capaian (KKTP)
                </span>
                <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400">
                  88.2
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                  / 100 (Tuntas)
                </span>
              </div>
              <div className="text-[11px] text-emerald-600 font-medium">
                <span>+13.2 poin di atas KKTP (75)</span>
              </div>
            </div>

          </div>

          {/* Konten Beranda Dashboard Guru: Jadwal & Monitoring Terkini */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Left Column (lg:col-span-8): Jadwal Mengajar & Aktivitas Terkini */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Box Jadwal Mengajar Hari Ini */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#0284c7]" />
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      Jadwal Mengajar Kimia Hari Ini
                    </h3>
                  </div>
                  <span className="text-xs text-[#0284c7] dark:text-sky-400 font-bold bg-sky-50 dark:bg-sky-950 px-2.5 py-0.5 rounded-lg border border-sky-200 dark:border-sky-800">
                    {getFormattedToday()}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-xl flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-md">
                          Berlangsung
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          Kelas XI MIPA 1 · Praktikum Titrasi Asam Basa
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">
                        Laboratorium Kimia Sains Lt. 2 · 36 Siswa (34 Hadir, 1 Izin, 1 Sakit)
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-[#0284c7] block">
                        07.15 - 08.45 WIB
                      </span>
                      <span className="text-[10px] text-slate-400">2 Jam Pelajaran</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-bold rounded-md">
                          Akan Datang
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          Kelas XI MIPA 2 · Penilaian Tengah Semester CBT
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">
                        Ruang Kelas XI MIPA 2 / Lab Komputer 1 · 36 Siswa Terdaftar
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                        13.00 - 14.30 WIB
                      </span>
                      <span className="text-[10px] text-slate-400">40 Soal Pilihan Ganda</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Box Status Pengumpulan Tugas Siswa Terbaru */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-amber-600" />
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      Pengumpulan Tugas Terakhir Siswa (Semua Kelas)
                    </h3>
                  </div>
                  <button
                    onClick={() => handleTabSwitch('nilai')}
                    className="text-xs text-[#0284c7] hover:underline font-bold cursor-pointer"
                  >
                    Buka Manajemen Nilai →
                  </button>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {studentRecords.slice(0, 6).map((student) => (
                    <div key={student.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-950 text-[#0284c7] font-bold flex items-center justify-center text-xs">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block">
                            {student.name}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            NISN: {student.nisn} · <span className="font-semibold text-slate-600 dark:text-slate-300">{student.className}</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {student.assignmentSubmitted ? (
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                            ✓ Laporan Dikirim ({student.assignmentScore || 90}/100)
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full">
                            Belum Mengumpulkan
                          </span>
                        )}

                        <button
                          onClick={() => {
                            setSelectedClass(student.className);
                            handleTabSwitch('nilai');
                            setEditingGradeStudentId(student.id);
                          }}
                          className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 text-slate-700 dark:text-slate-300 text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          Nilai
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column (lg:col-span-4): Shortcut Bank Soal & Status Ujian */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* Box Status CBT Aktif */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
                    <span>Ujian CBT Berlangsung</span>
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    Live Monitor
                  </span>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl space-y-2 border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                    PTS Kimia Peminatan Fase F
                  </h4>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                    <div className="flex justify-between">
                      <span>Siswa Selesai:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">56 / 72 Siswa</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '78%' }} />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => handleTabSwitch('cbt')}
                      className="w-full py-1.5 bg-[#0284c7] hover:bg-sky-700 text-white rounded-lg font-bold text-xs transition-colors cursor-pointer text-center"
                    >
                      Buka Kontrol CBT & Rilis Nilai
                    </button>
                  </div>
                </div>
              </div>

              {/* Box Tindakan Cepat Guru */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-sm space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Alat Pendidik Kurikulum Merdeka</span>
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Akses langsung menu pengelolaan nilai, bank soal, dan materi ajar tanpa menumpuk halaman.
                </p>
                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => handleTabSwitch('materi')}
                    className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold text-left flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-sky-400" />
                      <span>Upload Modul Kimia Baru</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>

                  <button
                    onClick={() => handleTabSwitch('presensi')}
                    className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold text-left flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-emerald-400" />
                      <span>Rekap Presensi Siswa (72 Siswa)</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </>
      ) : (
        /* ===================================================================== */
        /* ATURAN 1: TAMPILAN KHUSUS MENU LAIN (BANNER UTAMA DISEMBUNYIKAN)      */
        /* ===================================================================== */
        <div className="space-y-4">
          
          {/* Dedicated Clean Header with Breadcrumb and Back Action */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                <button 
                  onClick={() => handleTabSwitch('ikhtisar')}
                  className="hover:text-[#0284c7] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Dashboard Guru</span>
                </button>
                <span>/</span>
                <span className="font-bold text-[#0284c7] dark:text-sky-400">
                  {activeTeacherTab === 'nilai' && 'Manajemen Kelas & Nilai Siswa'}
                  {activeTeacherTab === 'cbt' && 'Bank Soal & Pengaturan Jadwal CBT'}
                  {activeTeacherTab === 'materi' && 'Kelola Materi Bahan Ajar'}
                  {activeTeacherTab === 'presensi' && 'Rekap Presensi Kehadiran Siswa'}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                {activeTeacherTab === 'nilai' && <GraduationCap className="w-5 h-5 text-[#0284c7]" />}
                {activeTeacherTab === 'cbt' && <FileText className="w-5 h-5 text-[#0284c7]" />}
                {activeTeacherTab === 'materi' && <BookOpen className="w-5 h-5 text-[#0284c7]" />}
                {activeTeacherTab === 'presensi' && <UserCheck className="w-5 h-5 text-[#0284c7]" />}
                
                <span>
                  {activeTeacherTab === 'nilai' && 'Manajemen Kelas & Penilaian'}
                  {activeTeacherTab === 'cbt' && 'Bank Soal & Jadwal Ujian CBT'}
                  {activeTeacherTab === 'materi' && 'Kelola Bahan Ajar & Modul'}
                  {activeTeacherTab === 'presensi' && 'Rekap Kehadiran Siswa'}
                </span>
              </h2>
            </div>

            <button
              onClick={() => handleTabSwitch('ikhtisar')}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Beranda Dashboard</span>
            </button>
          </div>

          {/* =================================================================== */}
          {/* TAB CONTENT 2: MANAJEMEN KELAS & NILAI (36 SISWA PER KELAS TEPAT)   */}
          {/* =================================================================== */}
          {activeTeacherTab === 'nilai' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-5">
              
              {/* Header Controls: Class Selector Tabs & Export */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Daftar Siswa & Input Nilai Kimia
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Pilih tab kelas untuk mengelola nilai formatif, sumatif, dan laporan praktikum (36 Siswa per kelas).
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* TAB PEMILIH KELAS JELAS: XI MIPA 1 (36 Siswa) & XI MIPA 2 (36 Siswa) */}
                  <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700">
                    <button
                      onClick={() => setSelectedClass('XI MIPA 1')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        selectedClass === 'XI MIPA 1'
                          ? 'bg-[#0284c7] text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Kelas XI MIPA 1</span>
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                        selectedClass === 'XI MIPA 1' ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-slate-700'
                      }`}>
                        36 Siswa
                      </span>
                    </button>

                    <button
                      onClick={() => setSelectedClass('XI MIPA 2')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        selectedClass === 'XI MIPA 2'
                          ? 'bg-[#0284c7] text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Kelas XI MIPA 2</span>
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                        selectedClass === 'XI MIPA 2' ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-slate-700'
                      }`}>
                        36 Siswa
                      </span>
                    </button>
                  </div>

                  <button
                    onClick={() => triggerToast(`Leger nilai ${selectedClass} (36 Siswa) berhasil diekspor!`)}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Ekspor Nilai ({selectedClass})</span>
                  </button>
                </div>
              </div>

              {/* Search bar & Class Status Notification */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative max-w-sm w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Cari dari 36 siswa di ${selectedClass}...`}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0284c7] text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500">Menampilkan:</span>
                  <span className="font-bold text-[#0284c7] bg-sky-50 dark:bg-sky-950 px-2.5 py-1 rounded-lg border border-sky-200 dark:border-sky-800">
                    {selectedClass} ({filteredStudents.length} dari 36 Siswa)
                  </span>
                  <span className="text-slate-400 hidden sm:inline">· KKTP: 75</span>
                </div>
              </div>

              {/* Interactive Grade Management Table (STRICT PER CLASS, 36 SISWA) */}
              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                      <th className="p-3 w-10 text-center">No</th>
                      <th className="p-3">Nama Lengkap Siswa</th>
                      <th className="p-3 text-center">Kelas</th>
                      <th className="p-3 text-center">Presensi Hari Ini</th>
                      <th className="p-3 text-center">Tugas Laporan</th>
                      <th className="p-3 text-center">Formatif 1</th>
                      <th className="p-3 text-center">Formatif 2</th>
                      <th className="p-3 text-center">UH Sumatif</th>
                      <th className="p-3 text-center">PTS Ujian</th>
                      <th className="p-3 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="p-6 text-center text-slate-400">
                          Tidak ada siswa yang cocok dengan pencarian di {selectedClass}.
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((student, idx) => {
                        const isEditing = editingGradeStudentId === student.id;
                        return (
                          <tr 
                            key={student.id} 
                            className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                          >
                            <td className="p-3 text-center text-slate-400 font-mono">{idx + 1}</td>
                            <td className="p-3">
                              <span className="font-bold text-slate-900 dark:text-white block">
                                {student.name}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                NISN: {student.nisn}
                              </span>
                            </td>

                            <td className="p-3 text-center">
                              <span className="px-2 py-0.5 bg-sky-50 dark:bg-sky-950 text-[#0284c7] dark:text-sky-300 font-bold text-[10px] rounded-md">
                                {student.className}
                              </span>
                            </td>

                            {/* Attendance Status */}
                            <td className="p-3 text-center">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                student.attendanceToday === 'Hadir'
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                  : student.attendanceToday === 'Izin'
                                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                  : student.attendanceToday === 'Sakit'
                                  ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                                  : 'bg-rose-100 text-rose-800'
                              }`}>
                                {student.attendanceToday}
                              </span>
                            </td>

                            {/* Assignment Status & Score */}
                            <td className="p-3 text-center">
                              {student.assignmentSubmitted ? (
                                <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  <span>{student.assignmentScore || 90}</span>
                                </span>
                              ) : (
                                <span className="text-[10px] text-rose-500 font-bold">
                                  Belum Ada
                                </span>
                              )}
                            </td>

                            {/* Formatif 1 */}
                            <td className="p-3 text-center font-mono">
                              {isEditing ? (
                                <input
                                  type="number"
                                  defaultValue={student.formatif1}
                                  className="w-16 px-1.5 py-1 text-center bg-white dark:bg-slate-700 border border-sky-400 rounded font-bold"
                                  onBlur={(e) => handleSaveStudentGrade(student.id, 'formatif1', Number(e.target.value))}
                                />
                              ) : (
                                <span className={`font-bold ${student.formatif1 >= 75 ? 'text-slate-800 dark:text-slate-200' : 'text-rose-600'}`}>
                                  {student.formatif1}
                                </span>
                              )}
                            </td>

                            {/* Formatif 2 */}
                            <td className="p-3 text-center font-mono">
                              {isEditing ? (
                                <input
                                  type="number"
                                  defaultValue={student.formatif2}
                                  className="w-16 px-1.5 py-1 text-center bg-white dark:bg-slate-700 border border-sky-400 rounded font-bold"
                                  onBlur={(e) => handleSaveStudentGrade(student.id, 'formatif2', Number(e.target.value))}
                                />
                              ) : (
                                <span className={`font-bold ${student.formatif2 >= 75 ? 'text-slate-800 dark:text-slate-200' : 'text-rose-600'}`}>
                                  {student.formatif2}
                                </span>
                              )}
                            </td>

                            {/* UH Sumatif */}
                            <td className="p-3 text-center font-mono">
                              {isEditing ? (
                                <input
                                  type="number"
                                  defaultValue={student.uhSumatif}
                                  className="w-16 px-1.5 py-1 text-center bg-white dark:bg-slate-700 border border-sky-400 rounded font-bold"
                                  onBlur={(e) => handleSaveStudentGrade(student.id, 'uhSumatif', Number(e.target.value))}
                                />
                              ) : (
                                <span className={`font-bold ${student.uhSumatif >= 75 ? 'text-slate-800 dark:text-slate-200' : 'text-rose-600'}`}>
                                  {student.uhSumatif}
                                </span>
                              )}
                            </td>

                            {/* PTS Exam */}
                            <td className="p-3 text-center font-mono font-bold text-[#0284c7]">
                              {isEditing ? (
                                <input
                                  type="number"
                                  defaultValue={student.ptsExam}
                                  className="w-16 px-1.5 py-1 text-center bg-white dark:bg-slate-700 border border-sky-400 rounded font-bold"
                                  onBlur={(e) => handleSaveStudentGrade(student.id, 'ptsExam', Number(e.target.value))}
                                />
                              ) : (
                                <span>{student.ptsExam}</span>
                              )}
                            </td>

                            {/* Action */}
                            <td className="p-3 text-center">
                              {isEditing ? (
                                <button
                                  onClick={() => setEditingGradeStudentId(null)}
                                  className="px-2.5 py-1 bg-emerald-600 text-white rounded font-bold text-[10px] cursor-pointer"
                                >
                                  Simpan
                                </button>
                              ) : (
                                <button
                                  onClick={() => setEditingGradeStudentId(student.id)}
                                  className="p-1.5 text-slate-500 hover:text-[#0284c7] hover:bg-sky-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
                                  title="Edit Nilai"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* =================================================================== */}
          {/* TAB CONTENT 3: BANK SOAL & CBT                                      */}
          {/* =================================================================== */}
          {activeTeacherTab === 'cbt' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-5">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Bank Soal Mandiri & Jadwal CBT
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Kelola naskah soal penilaian mandiri, atur waktu pelaksanaan CBT, dan rilis nilai ke siswa.
                  </p>
                </div>

                <button
                  onClick={() => setIsCreateExamModalOpen(true)}
                  className="px-4 py-2 bg-[#0284c7] hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Buat Paket Soal Baru</span>
                </button>
              </div>

              {/* List of CBT Exams Packages */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cbtExams.map((exam) => (
                  <div
                    key={exam.id}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex flex-col justify-between space-y-4 hover:border-sky-300 transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          exam.status === 'Sedang Berlangsung'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : exam.status === 'Segera Berlangsung'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                        }`}>
                          {exam.status}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {exam.durationMinutes} Menit · {exam.totalQuestions} Soal
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                        {exam.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {exam.targetClass} · {exam.subject}
                      </p>

                      <div className="text-[11px] text-slate-500 font-mono space-y-0.5 pt-1 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
                          <span>{exam.dateStr}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{exam.timeStr}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Pengumpulan:</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {exam.submittedCount} / {exam.totalStudents} Siswa
                        </span>
                      </div>

                      {exam.averageScore && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Rata-rata Nilai:</span>
                          <span className="font-bold text-emerald-600">
                            {exam.averageScore} / 100
                          </span>
                        </div>
                      )}

                      {/* Toggle Release Score to Student Button */}
                      <button
                        onClick={() => handleToggleScoreRelease(exam.id)}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          exam.isScoreReleased
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                        }`}
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>
                          {exam.isScoreReleased ? '✓ Nilai Sudah Dirilis ke Siswa' : 'Rilis Nilai Sekarang'}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* =================================================================== */}
          {/* TAB CONTENT 4: KELOLA MATERI PEMBELAJARAN (PDF/VIDEO/SLIDE)         */}
          {/* =================================================================== */}
          {activeTeacherTab === 'materi' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-5">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Daftar Bahan Ajar & Modul Digital
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Unggah dokumen PDF modul ajar, video rekaman praktikum laboratorium, dan slide presentasi kelas.
                  </p>
                </div>

                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="px-4 py-2 bg-[#0284c7] hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                >
                  <Upload className="w-4 h-4" />
                  <span>Unggah Bahan Ajar Baru</span>
                </button>
              </div>

              {/* List of Uploaded Teaching Materials */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {materials.map((item) => (
                  <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        item.format === 'PDF Modul'
                          ? 'bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400'
                          : item.format === 'Video Lab'
                          ? 'bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400'
                          : 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
                      }`}>
                        {item.format === 'PDF Modul' ? (
                          <FileText className="w-5 h-5" />
                        ) : item.format === 'Video Lab' ? (
                          <Video className="w-5 h-5" />
                        ) : (
                          <FileUp className="w-5 h-5" />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                            {item.title}
                          </h4>
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                            item.isVisibleToStudents
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                          }`}>
                            {item.isVisibleToStudents ? 'Tampil di Siswa' : 'Draft Guru'}
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono mt-0.5">
                          <span>{item.chapter}</span>
                          <span>·</span>
                          <span>Format: {item.format}</span>
                          <span>·</span>
                          <span>{item.fileSize}</span>
                          <span>·</span>
                          <span>Diunggah: {item.uploadDate}</span>
                        </div>

                        <div className="text-[10px] text-sky-600 dark:text-sky-400 font-medium mt-1">
                          {item.readCount} dari {item.totalTarget} Siswa telah membaca/mengunduh
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <button
                        onClick={() => handleToggleMaterialVisibility(item.id)}
                        className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        {item.isVisibleToStudents ? 'Sembunyikan' : 'Tampilkan'}
                      </button>

                      <button
                        onClick={() => triggerToast(`Mengunduh file: ${item.title}`)}
                        className="p-1.5 text-slate-500 hover:text-[#0284c7] hover:bg-sky-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
                        title="Pratinjau / Unduh"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* =================================================================== */}
          {/* TAB CONTENT 5: REKAP PRESENSI KELAS (36 SISWA PER KELAS TEPAT)      */}
          {/* =================================================================== */}
          {activeTeacherTab === 'presensi' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-5">
              
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-100 dark:bg-sky-950 text-[#0284c7] dark:text-sky-400 px-2.5 py-0.5 rounded-md">
                      Bulan Aktif: {CURRENT_ACTIVE_MONTH_YEAR}
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Kalender Akademik TP 2026/2027
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mt-1">
                    Rekap Presensi & Kehadiran Siswa
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Pilih tanggal di bulan November 2026 dan kelas untuk melihat presensi kamera selfie 36 siswa per rombel.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* TAB PEMILIH KELAS JELAS: XI MIPA 1 (36 Siswa) & XI MIPA 2 (36 Siswa) */}
                  <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700">
                    <button
                      onClick={() => setSelectedClass('XI MIPA 1')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        selectedClass === 'XI MIPA 1'
                          ? 'bg-[#0284c7] text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Kelas XI MIPA 1</span>
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                        selectedClass === 'XI MIPA 1' ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-slate-700'
                      }`}>
                        36 Siswa
                      </span>
                    </button>

                    <button
                      onClick={() => setSelectedClass('XI MIPA 2')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        selectedClass === 'XI MIPA 2'
                          ? 'bg-[#0284c7] text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Kelas XI MIPA 2</span>
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                        selectedClass === 'XI MIPA 2' ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-slate-700'
                      }`}>
                        36 Siswa
                      </span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      const activeDate = NOVEMBER_2026_SCHOOL_DATES.find(d => d.value === selectedAttendanceDate)?.shortLabel || '09 Nov 2026';
                      triggerToast(`Laporan presensi ${selectedClass} (${activeDate} - 36 Siswa) berhasil diekspor ke Excel & Dapodik!`);
                    }}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Ekspor Presensi ({selectedClass})</span>
                  </button>
                </div>
              </div>

              {/* FILTER TANGGAL NOVEMBER 2026 REAL-TIME */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[#0284c7] shrink-0" />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Pilih Tanggal Presensi:
                  </span>
                  <select
                    value={selectedAttendanceDate}
                    onChange={(e) => {
                      setSelectedAttendanceDate(e.target.value);
                      const found = NOVEMBER_2026_SCHOOL_DATES.find(d => d.value === e.target.value);
                      triggerToast(`Menampilkan presensi tanggal: ${found?.label || e.target.value}`);
                    }}
                    className="py-1.5 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0284c7] cursor-pointer"
                  >
                    {NOVEMBER_2026_SCHOOL_DATES.map((d) => (
                      <option key={d.value} value={d.value}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>
                    Menampilkan data aktif: <strong>{NOVEMBER_2026_SCHOOL_DATES.find(d => d.value === selectedAttendanceDate)?.label}</strong>
                  </span>
                </div>
              </div>

              {/* Dynamic Presence Summary Cards for Selected Class (exact 36 students) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase">
                    Hadir ({selectedClass})
                  </span>
                  <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                    {hadirCount} / 36 Siswa
                  </p>
                  <span className="text-[10px] text-emerald-600 block">Tervalidasi Kamera Selfie</span>
                </div>

                <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase">
                    Izin Resmi
                  </span>
                  <p className="text-2xl font-black text-amber-700 dark:text-amber-400">
                    {izinCount} Siswa
                  </p>
                  <span className="text-[10px] text-amber-600 block">Surat Terverifikasi</span>
                </div>

                <div className="p-3.5 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-sky-800 dark:text-sky-300 uppercase">
                    Sakit (Dokter)
                  </span>
                  <p className="text-2xl font-black text-sky-700 dark:text-sky-400">
                    {sakitCount} Siswa
                  </p>
                  <span className="text-[10px] text-sky-600 block">Keterangan Dokter</span>
                </div>

                <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-rose-800 dark:text-rose-300 uppercase">
                    Tanpa Keterangan
                  </span>
                  <p className="text-2xl font-black text-rose-700 dark:text-rose-400">
                    {alphaCount} Siswa
                  </p>
                  <span className="text-[10px] text-rose-600 block">Tidak Hadir (Alpha)</span>
                </div>
              </div>

              {/* Attendance Table specifically for selectedClass (36 Siswa) with Real Date Column */}
              <div className="overflow-x-auto rounded-xl border border-slate-200/80 dark:border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 uppercase font-bold text-[10px]">
                    <tr>
                      <th className="p-3 pl-4">No</th>
                      <th className="p-3">Nama Siswa & NISN</th>
                      <th className="p-3">Kelas</th>
                      <th className="p-3">Tanggal Presensi</th>
                      <th className="p-3">Waktu Masuk & Lokasi</th>
                      <th className="p-3">Status Kehadiran</th>
                      <th className="p-3 pr-4 text-center">Ubah Status (Guru)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {currentClassStudents.map((s, idx) => {
                      const activeShortDate = NOVEMBER_2026_SCHOOL_DATES.find(d => d.value === selectedAttendanceDate)?.shortLabel || '09 Nov 2026';
                      return (
                        <tr key={s.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="p-3 pl-4 text-slate-400 font-mono text-[11px]">{idx + 1}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center text-xs shrink-0">
                                {s.name.charAt(0)}
                              </div>
                              <div>
                                <span className="font-bold text-slate-900 dark:text-white block">
                                  {s.name}
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  NISN: {s.nisn}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded font-mono font-bold">
                              {s.className}
                            </span>
                          </td>
                          <td className="p-3 font-semibold text-slate-700 dark:text-slate-300 font-mono">
                            {activeShortDate}
                          </td>
                          <td className="p-3 text-[11px]">
                            <div className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                              {s.checkInTime !== '-' ? s.checkInTime : 'Belum Check-In'}
                            </div>
                            <span className="text-[10px] text-slate-400">
                              SMAN 25 (Radius 10-15m)
                            </span>
                          </td>
                          <td className="p-3">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              s.attendanceToday === 'Hadir' 
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                                : s.attendanceToday === 'Izin'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                : s.attendanceToday === 'Sakit'
                                ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                                : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                            }`}>
                              {s.attendanceToday}
                            </span>
                          </td>
                          <td className="p-3 pr-4">
                            {/* Tombol Cepat Koreksi Kehadiran Siswa oleh Guru */}
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => {
                                  setStudentRecords(prev => prev.map(rec => rec.id === s.id ? { ...rec, attendanceToday: 'Hadir', checkInTime: '06.45 WIB' } : rec));
                                  triggerToast(`${s.name} ditandai: HADIR`);
                                }}
                                title="Setel Hadir"
                                className={`w-6 h-6 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                                  s.attendanceToday === 'Hadir' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 text-slate-600'
                                }`}
                              >
                                H
                              </button>
                              <button
                                onClick={() => {
                                  setStudentRecords(prev => prev.map(rec => rec.id === s.id ? { ...rec, attendanceToday: 'Izin', checkInTime: '-' } : rec));
                                  triggerToast(`${s.name} ditandai: IZIN`);
                                }}
                                title="Setel Izin"
                                className={`w-6 h-6 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                                  s.attendanceToday === 'Izin' ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 text-slate-600'
                                }`}
                              >
                                I
                              </button>
                              <button
                                onClick={() => {
                                  setStudentRecords(prev => prev.map(rec => rec.id === s.id ? { ...rec, attendanceToday: 'Sakit', checkInTime: '-' } : rec));
                                  triggerToast(`${s.name} ditandai: SAKIT`);
                                }}
                                title="Setel Sakit"
                                className={`w-6 h-6 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                                  s.attendanceToday === 'Sakit' ? 'bg-sky-600 text-white' : 'bg-slate-100 dark:bg-slate-800 hover:bg-sky-100 text-slate-600'
                                }`}
                              >
                                S
                              </button>
                              <button
                                onClick={() => {
                                  setStudentRecords(prev => prev.map(rec => rec.id === s.id ? { ...rec, attendanceToday: 'Alpha', checkInTime: '-' } : rec));
                                  triggerToast(`${s.name} ditandai: ALPHA`);
                                }}
                                title="Setel Alpha"
                                className={`w-6 h-6 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                                  s.attendanceToday === 'Alpha' ? 'bg-rose-600 text-white' : 'bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 text-slate-600'
                                }`}
                              >
                                A
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </div>
          )}

        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 1: BUAT PAKET SOAL CBT BARU                                     */}
      {/* ===================================================================== */}
      {isCreateExamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0284c7]" />
                <span>Buat Paket Soal CBT Baru</span>
              </h4>
              <button
                onClick={() => setIsCreateExamModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCBT} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Judul Ujian / Kuis
                </label>
                <input
                  type="text"
                  required
                  value={newExamTitle}
                  onChange={(e) => setNewExamTitle(e.target.value)}
                  placeholder="Contoh: Kuis Harian: Hidrolisis Garam"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Kelas Sasaran
                  </label>
                  <select
                    value={newExamClass}
                    onChange={(e) => setNewExamClass(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold"
                  >
                    <option value="Kelas XI MIPA 1">Kelas XI MIPA 1</option>
                    <option value="Kelas XI MIPA 2">Kelas XI MIPA 2</option>
                    <option value="Kelas XI MIPA 1 & XI MIPA 2">Semua Kelas MIPA</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Durasi (Menit)
                  </label>
                  <input
                    type="number"
                    value={newExamDuration}
                    onChange={(e) => setNewExamDuration(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Jumlah Butir Soal Pilihan Ganda
                </label>
                <input
                  type="number"
                  value={newExamQuestionCount}
                  onChange={(e) => setNewExamQuestionCount(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateExamModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0284c7] hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  Simpan & Rilis Ujian
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 2: UNGGAH BAHAN AJAR BARU                                       */}
      {/* ===================================================================== */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#0284c7]" />
                <span>Unggah Bahan Ajar Kimia Baru</span>
              </h4>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadMaterial} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Judul Materi / Topik Pembelajaran
                </label>
                <input
                  type="text"
                  required
                  value={newMatTitle}
                  onChange={(e) => setNewMatTitle(e.target.value)}
                  placeholder="Contoh: Modul Eksperimen Larutan Penyangga"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Bab Pokok
                  </label>
                  <select
                    value={newMatChapter}
                    onChange={(e) => setNewMatChapter(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold"
                  >
                    <option value="Bab 4: Larutan Asam Basa">Bab 4: Larutan Asam Basa</option>
                    <option value="Bab 5: Larutan Penyangga (Buffer)">Bab 5: Larutan Penyangga</option>
                    <option value="Bab 6: Hidrolisis Garam">Bab 6: Hidrolisis Garam</option>
                    <option value="Bab 7: Kelarutan & Ksp">Bab 7: Kelarutan & Ksp</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Format Dokumen
                  </label>
                  <select
                    value={newMatFormat}
                    onChange={(e) => setNewMatFormat(e.target.value as typeof newMatFormat)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold"
                  >
                    <option value="PDF Modul">PDF Modul Ajar</option>
                    <option value="Video Lab">Video Rekaman Lab</option>
                    <option value="Slide Presentasi">Slide Presentasi PPT</option>
                  </select>
                </div>
              </div>

              <div className="p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl text-center space-y-1 cursor-pointer hover:border-sky-500 transition-colors">
                <FileUp className="w-8 h-8 text-sky-500 mx-auto" />
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Pilih file dokumen atau seret ke sini
                </p>
                <p className="text-[10px] text-slate-400">
                  Mendukung PDF, MP4, PPTX hingga ukuran 50 MB
                </p>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0284c7] hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  Publikasikan Bahan Ajar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
