export type Role = 'siswa_mipa' | 'siswa_ips' | 'guru';

export interface UserProfile {
  id: string;
  name: string;
  role: Role;
  school: string;
  className: string;
  major: 'MIPA' | 'IPS';
  nisn: string;
  avatarUrl?: string;
  email: string;
  phone?: string;
  parentPhone?: string;
  bio?: string;
  semester: string;
  academicYear: string;
}

export interface OnlineClassSession {
  id: string;
  subject: string;
  title: string;
  teacher: string;
  timeRange: string;
  status: 'live' | 'upcoming' | 'completed';
  roomCode: string;
  targetClass: string;
  topicSummary: string;
  activeParticipantsCount: number;
}

export interface ModulAjarData {
  id: string;
  subject: string;
  title: string;
  grade: string;
  phase: string; // e.g. "Fase F (Kelas XI SMA MIPA)"
  author: string;
  duration: string;
  capaianPembelajaran?: string;
  tujuanPembelajaran: string[];
  materiPokok: string;
  materiLengkap?: string;
  subBabMateri?: {
    judul: string;
    isi: string;
    poinPenting?: string[];
    contohAplikasi?: string;
  }[];
  rangkumanMateri?: string[];
  contohKasus?: {
    pertanyaan: string;
    pembahasan: string;
  };
  tipsBelajar?: string;
  formulaOrDiagram?: string;
  glosarium?: { istilah: string; arti: string }[];
  lkpd?: {
    judulAktivitas: string;
    alatBahan: string[];
    langkahKerja: string[];
    pertanyaanDiskusi: string[];
  };
  konsepKunci: { title: string; desc: string }[];
  quizCheck: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  simType?: 'titrasi_kimia' | 'fisika_newton';
}

export interface ExamItem {
  id: string;
  title: string;
  subject: string;
  type: 'PTS' | 'PAS' | 'UKK' | 'Kuis Harian';
  targetClass: string;
  dateStr: string;
  timeStr: string;
  durationMinutes: number;
  status: 'Sedang Berlangsung' | 'Segera Berlangsung' | 'Selesai';
  submittedCount?: number;
  totalStudents?: number;
  questions: ExamQuestion[];
}

export interface ExamQuestion {
  id: number;
  text: string;
  codeSnippet?: string;
  options: { key: string; text: string }[];
  correctKey: string;
  explanation: string;
}

export interface AgendaItem {
  id: string;
  title: string;
  category: 'Ujian' | 'Hari Nasional' | 'Praktikum' | 'Rapat' | 'Kegiatan';
  time: string;
  date: string;
  location: string;
}

export interface SubjectCourse {
  id: string;
  name: string;
  category: 'SMA MIPA' | 'SMA IPS' | 'Umum' | 'Pengembangan';
  scheduleGroup?: 'Peminatan' | 'Wajib' | 'Pengembangan';
  teacher: string;
  grade: string;
  coverImage: string;
  description: string;
  totalModules: number;
  completedModules: number;
  interactiveSimType?: 'titrasi_kimia' | 'fisika_newton' | 'none';
  chapters: {
    id: string;
    title: string;
    type: 'video' | 'modul_pdf' | 'lab_sim' | 'kuis';
    duration: string;
    completed: boolean;
    videoUrl?: string;
    teacherVoiceScript?: string;
    keyPoints?: string[];
  }[];
}

export interface AssignmentItem {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'Belum Dikumpulkan' | 'Diserahkan' | 'Dinilai';
  score?: number;
  maxScore: number;
  description: string;
  teacherFeedback?: string;
  teacher?: string;
  submissionDate?: string;
  submittedFileName?: string;
  submittedLink?: string;
  submittedText?: string;
  fileSize?: string;
}

export interface ScheduleItem {
  id: string;
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat';
  time: string;
  subject: string;
  teacher: string;
  room: string;
  status: 'Selesai' | 'Berlangsung' | 'Akan Datang';
  jp?: number;
  periodRange?: string;
  category?: 'Peminatan MIPA' | 'Mata Pelajaran Wajib' | 'Pengembangan & P5' | 'Pembiasaan & Istirahat';
  isBreak?: boolean;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  dayName: string;
  checkInTime: string;
  checkOutTime?: string;
  status: 'Hadir' | 'Izin' | 'Sakit' | 'Alpha';
  location: string;
  photoUrl?: string;
}

export interface StudentGradeRecord {
  id: string;
  name: string;
  nisn: string;
  className: 'XI MIPA 1' | 'XI MIPA 2';
  attendanceToday: 'Hadir' | 'Izin' | 'Sakit' | 'Alpha';
  checkInTime: string;
  assignmentSubmitted: boolean;
  assignmentScore?: number;
  formatif1: number;
  formatif2: number;
  uhSumatif: number;
  ptsExam: number;
  notes: string;
}

export interface DemoAccount {
  id: string;
  user: UserProfile;
  password: string;
  label: string;
  roleBadge: string;
}

