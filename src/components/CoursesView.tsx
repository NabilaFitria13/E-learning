import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  Play, 
  Pause,
  Volume2, 
  VolumeX, 
  Maximize2,
  FlaskConical, 
  CheckCircle2, 
  Search, 
  X,
  Sparkles,
  Download,
  Calendar,
  Layers,
  Radio,
  FileText,
  Check,
  Award,
  Clock,
  MapPin,
  ArrowRight,
  Lock,
  Unlock,
  Copy,
  RotateCcw,
  Gauge,
  GraduationCap,
  CheckCheck,
  Activity,
  MessageSquare
} from 'lucide-react';
import { SubjectCourse, UserProfile } from '../types';
import { MOCK_COURSES, MOCK_SCHEDULE_BY_ROLE, resolveModulAjar } from '../data/mockData';

interface TeacherProfileInfo {
  name: string;
  degree: string;
  specialization: string;
  nip: string;
  avatarUrl: string;
  badge: string;
  department: string;
  officeHours: string;
}

const TEACHER_PROFILES: Record<string, TeacherProfileInfo> = {
  course_kimia: {
    name: 'Drs. Bambang Sudarsono, M.Si',
    degree: 'Magister Sains Kimia Analitik (UI)',
    specialization: 'Kimia Analitik, Stoikiometri & Titrasi Larutan',
    nip: '197204151998021003',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&q=80',
    badge: 'Pembina Olimpiade Sains Kimia (OSN)',
    department: 'Departemen MIPA · Lab Kimia Terpadu Lt. 2',
    officeHours: 'Senin & Rabu, 13.00 - 15.00 WIB'
  },
  course_fisika: {
    name: 'Ir. Ahmad Zulkarnain, S.Pd',
    degree: 'Sarjana Pendidikan Fisika & Teknik (ITB)',
    specialization: 'Fisika Dinamika, Hukum Newton & Termodinamika',
    nip: '197803152003121004',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    badge: 'Kepala Laboratorium Fisika SMAN 25',
    department: 'Departemen MIPA · Lab Fisika Lt. 2',
    officeHours: 'Selasa & Kamis, 13.30 - 15.15 WIB'
  },
  course_bio: {
    name: 'Ibu Endang Suryani, M.Si',
    degree: 'Magister Sains Bioteknologi & Genetika (IPB)',
    specialization: 'Biologi Seluler, Metabolisme & Pola Hereditas Mendel',
    nip: '198106202005012003',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    badge: 'Pembina Tim Riset KIR Biologi SMAN 25',
    department: 'Departemen MIPA · Lab Biologi & Green House',
    officeHours: 'Rabu & Jumat, 10.30 - 12.00 WIB'
  },
  course_mat_pem: {
    name: 'Ibu Ratna Dewi, S.Pd',
    degree: 'Sarjana Pendidikan Matematika (UNJ)',
    specialization: 'Kalkulus Lanjut, Limit Trigonometri & Polinomial',
    nip: '198304122008012006',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    badge: 'Koordinator Olimpiade Matematika (OM)',
    department: 'Departemen MIPA · Ruang Guru MIPA R.204',
    officeHours: 'Senin & Kamis, 14.00 - 15.30 WIB'
  },
  course_sejarah: {
    name: 'Drs. Hendro Wibowo, M.Hum',
    degree: 'Magister Humaniora Sejarah Indonesia (UGM)',
    specialization: 'Sejarah Pergerakan Nasional & Diplomasi Kemerdekaan',
    nip: '197105081998031002',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80',
    badge: 'Ketua MGMP Sejarah SMA DKI Jakarta',
    department: 'Departemen Sosial & Humaniora · R.205',
    officeHours: 'Senin & Jumat, 09.00 - 11.30 WIB'
  },
  course_bindo: {
    name: 'Ibu Dra. Sri Wahyuni, M.Pd',
    degree: 'Magister Pendidikan Bahasa & Sastra Indonesia',
    specialization: 'Teks Argumentasi Kritis, Retorika & Kritik Sastra',
    nip: '197508122002122001',
    avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=250&q=80',
    badge: 'Wali Kelas XI MIPA 1 · Penguji UKBI Nasional',
    department: 'Departemen Bahasa & Literasi · R.202',
    officeHours: 'Setiap Hari Kerja, 07.00 - 15.30 WIB'
  },
  course_bing: {
    name: 'Mr. David Siregar, M.Ed',
    degree: 'Master of Education in TESOL (Monash University)',
    specialization: 'Analytical Exposition, Academic Writing & Debate',
    nip: '198509172010011005',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    badge: 'Coach English Debate Society SMAN 25',
    department: 'Departemen Bahasa Asing · Language Lab',
    officeHours: 'Selasa & Kamis, 13.00 - 15.00 WIB'
  },
  course_mat_wajib: {
    name: 'Ibu Ratna Dewi, S.Pd',
    degree: 'Sarjana Pendidikan Matematika (UNJ)',
    specialization: 'Transformasi Geometri & Statistika Data Kelompok',
    nip: '198304122008012006',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    badge: 'Fasilitator Literasi Numerasi Fase F',
    department: 'Departemen MIPA · Ruang Guru MIPA R.204',
    officeHours: 'Senin & Kamis, 14.00 - 15.30 WIB'
  },
  course_agama: {
    name: 'Ust. H. Syarifuddin, M.Ag',
    degree: 'Magister Fiqih Muamalah & Karakter (UIN)',
    specialization: 'Fiqih Transaksi Syariah, Adab & Moderasi Beragama',
    nip: '197602142003121003',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80',
    badge: 'Pembina Rohani Islam (Rohis) SMAN 25',
    department: 'Departemen PAI & Karakter · Masjid Baitul Ilmi',
    officeHours: 'Senin - Kamis, Ba\'da Dzuhur'
  },
  course_ppkn: {
    name: 'Ibu Siti Aminah, S.Pd',
    degree: 'Sarjana Pendidikan Pancasila & Kewarganegaraan (UNJ)',
    specialization: 'Hierarki Hukum, Konstitusi UUD 1945 & Penegakan HAM',
    nip: '198207192006042011',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=250&q=80',
    badge: 'Fasilitator Karakter Kebangsaan Pelajar',
    department: 'Departemen PKn & Tata Hukum · R.203',
    officeHours: 'Rabu & Jumat, 13.00 - 15.00 WIB'
  },
  course_pjok: {
    name: 'Wahyu Hidayat, S.Pd',
    degree: 'Sarjana Kepelatihan Olahraga (FIK UNJ)',
    specialization: 'Kebugaran Aerobik, Sirkuit Otot & Fisiologi Olahraga',
    nip: '198611032011011008',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    badge: 'Instruktur Kebugaran Jasmani SMAN 25',
    department: 'Departemen Olahraga · GOR SMAN 25',
    officeHours: 'Selasa & Kamis, 07.00 - 12.00 WIB'
  },
  course_seni: {
    name: 'Ibu Maya Lestari, S.Sn',
    degree: 'Sarjana Seni Rupa & Desain Kreatif (IKJ)',
    specialization: 'Prinsip Desain Visual, Kolase & Apresiasi Seni Nusantara',
    nip: '198801252014022004',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
    badge: 'Kurator Galeri Karya Siswa SMAN 25',
    department: 'Departemen Seni & Budaya · Studio Seni Kreatif',
    officeHours: 'Senin & Rabu, 13.00 - 15.30 WIB'
  },
  course_bk: {
    name: 'Ibu Nurul Farida, M.Pd, Kons',
    degree: 'Magister Bimbingan Konseling & Psikologi Pendidikan',
    specialization: 'Konseling Akademik, Minat Bakat & Seleksi SNBP/SNBT',
    nip: '198005112005012008',
    avatarUrl: 'https://images.unsplash.com/photo-1580894732486-e3d843187ca0?auto=format&fit=crop&w=250&q=80',
    badge: 'Koordinator Konseling Karir Siswa SMAN 25',
    department: 'Layanan BK · Ruang Konseling Ramah Siswa Lt. 1',
    officeHours: 'Setiap Hari Sekolah, 07.30 - 15.30 WIB'
  },
  course_p5: {
    name: 'Tim Fasilitator P5 & Dra. Hj. Sri Wahyuni, M.Pd',
    degree: 'Tim Pengembang Kurikulum Merdeka Terpadu',
    specialization: 'Gaya Hidup Berkelanjutan, Biopori & Kewirausahaan',
    nip: '197508122002122001',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    badge: 'Koordinator Utama Projek P5 SMAN 25',
    department: 'Sekretariat P5 & Kurikulum Merdeka',
    officeHours: 'Jumat, 13.00 - 16.00 WIB'
  }
};

const resolveTeacherProfile = (courseId: string, fallbackName: string): TeacherProfileInfo => {
  if (TEACHER_PROFILES[courseId]) return TEACHER_PROFILES[courseId];
  for (const [key, profile] of Object.entries(TEACHER_PROFILES)) {
    if (courseId.toLowerCase().includes(key.replace('course_', ''))) return profile;
  }
  return {
    name: fallbackName,
    degree: 'Guru Pengampu Mata Pelajaran',
    specialization: 'Kurikulum Merdeka SMA Fase F SMAN 25 Jakarta',
    nip: '197908122003121002',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    badge: 'Pendidik Profesional SMAN 25 Jakarta',
    department: 'Dewan Guru SMAN 25 Jakarta Barat',
    officeHours: 'Senin - Jumat, 08.00 - 15.00 WIB'
  };
};

interface SubjectBackdropProps {
  courseId: string;
  courseName: string;
  chapterTitle?: string;
  coverImage?: string;
  isPlaying: boolean;
}

const SubjectCinematicBackdrop: React.FC<SubjectBackdropProps> = ({
  courseId,
  courseName,
  chapterTitle,
  coverImage,
  isPlaying
}) => {
  const normalizedId = courseId.toLowerCase();

  // Determine subject visual theme
  const isMath = normalizedId.includes('mat') || courseName.toLowerCase().includes('matematika');
  const isPhysics = normalizedId.includes('fisika') || courseName.toLowerCase().includes('fisika');
  const isChemistry = normalizedId.includes('kimia') || courseName.toLowerCase().includes('kimia');
  const isBiology = normalizedId.includes('bio') || courseName.toLowerCase().includes('biologi');
  const isHistory = normalizedId.includes('sejarah') || courseName.toLowerCase().includes('sejarah');
  const isIndonesian = normalizedId.includes('bindo') || courseName.toLowerCase().includes('bahasa indonesia');
  const isEnglish = normalizedId.includes('bing') || courseName.toLowerCase().includes('bahasa inggris');
  const isReligion = normalizedId.includes('agama') || courseName.toLowerCase().includes('pendidikan agama');
  const isCivics = normalizedId.includes('ppkn') || courseName.toLowerCase().includes('pancasila') || courseName.toLowerCase().includes('kewarganegaraan');
  const isSport = normalizedId.includes('pjok') || courseName.toLowerCase().includes('olahraga');
  const isArt = normalizedId.includes('seni') || courseName.toLowerCase().includes('seni budaya');
  const isCounseling = normalizedId.includes('bk') || courseName.toLowerCase().includes('bimbingan');

  return (
    <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
      {/* 1. Base Dark Theme Gradient */}
      <div className={`absolute inset-0 transition-colors duration-700 ${
        isMath ? 'bg-gradient-to-br from-[#040d24] via-[#09183d] to-[#020512]' :
        isPhysics ? 'bg-gradient-to-br from-[#050920] via-[#0c163d] to-[#02040e]' :
        isChemistry ? 'bg-gradient-to-br from-[#021822] via-[#052f3f] to-[#010e16]' :
        isBiology ? 'bg-gradient-to-br from-[#021b14] via-[#053225] to-[#01100b]' :
        isHistory ? 'bg-gradient-to-br from-[#160b07] via-[#24170d] to-[#0a0503]' :
        isIndonesian ? 'bg-gradient-to-br from-[#090e28] via-[#121c48] to-[#040614]' :
        isEnglish ? 'bg-gradient-to-br from-[#060c2b] via-[#0e1d52] to-[#030616]' :
        isReligion ? 'bg-gradient-to-br from-[#031526] via-[#092945] to-[#020c17]' :
        isCivics ? 'bg-gradient-to-br from-[#1b070f] via-[#2f0d1b] to-[#0d0307]' :
        isSport ? 'bg-gradient-to-br from-[#051322] via-[#0b2745] to-[#020a13]' :
        isArt ? 'bg-gradient-to-br from-[#180628] via-[#2f0c4b] to-[#0d0314]' :
        isCounseling ? 'bg-gradient-to-br from-[#0b0e27] via-[#171d4a] to-[#050714]' :
        'bg-gradient-to-br from-[#040d21] via-[#0b1d3d] to-[#020612]'
      }`} />

      {/* 2. Photo Cover Overlay if available */}
      {coverImage && (
        <img
          src={coverImage}
          alt=""
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-25 filter blur-[0.5px] transition-transform duration-1000 group-hover:scale-105"
        />
      )}

      {/* 3. Subtle Ambient Light Orb (Floating Glow) */}
      <div className={`absolute -top-1/4 -right-1/4 w-[75%] h-[75%] rounded-full blur-3xl opacity-35 ${
        isMath ? 'bg-sky-500' :
        isPhysics ? 'bg-indigo-500' :
        isChemistry ? 'bg-cyan-400' :
        isBiology ? 'bg-emerald-500' :
        isHistory ? 'bg-amber-600' :
        isIndonesian ? 'bg-blue-600' :
        isEnglish ? 'bg-violet-600' :
        isReligion ? 'bg-amber-400' :
        isCivics ? 'bg-rose-600' :
        isSport ? 'bg-cyan-500' :
        isArt ? 'bg-fuchsia-500' :
        'bg-[#0284c7]'
      } animate-pulse`} style={{ animationDuration: '6s' }} />

      {/* 4. Subject-Specific Vector Illustration Layer (High-Resolution SVG) */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="mathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="chemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="physGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="bioGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0.85" />
          </linearGradient>
          <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Global Blueprint Grid */}
        <rect width="800" height="450" fill="url(#gridPattern)" />

        {/* A. MATEMATIKA MIPA / WAJIB: Glowing Calculus Coordinate Plane & Formulas */}
        {isMath && (
          <g opacity="0.9">
            {/* Cartesian Axes */}
            <line x1="80" y1="225" x2="720" y2="225" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="400" y1="40" x2="400" y2="410" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
            {/* Trigonometric Circle */}
            <circle cx="220" cy="225" r="90" fill="none" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1.5" />
            <line x1="220" y1="225" x2="283" y2="162" stroke="#f59e0b" strokeWidth="2.5" filter="url(#glow)" />
            <circle cx="283" cy="162" r="4.5" fill="#fbbf24" filter="url(#glow)" />
            <text x="240" y="215" fill="#f59e0b" fontSize="12" fontFamily="JetBrains Mono, monospace" fontWeight="bold">θ = π/4</text>
            {/* Calculus Sine Wave with Luminous Glow */}
            <path 
              d="M 60,225 C 130,90 190,90 250,225 C 310,360 370,360 430,225 C 490,90 550,90 610,225 C 670,360 730,360 780,225" 
              fill="none" 
              stroke="url(#mathGrad)" 
              strokeWidth="3.5" 
              filter="url(#glow)"
            />
            {/* Floating Formulas */}
            <g fontFamily="JetBrains Mono, monospace" fill="rgba(224, 242, 254, 0.9)">
              <text x="440" y="95" fontSize="18" fontWeight="bold">f'(x) = lim Δx→0 [f(x+Δx) - f(x)] / Δx</text>
              <text x="440" y="130" fontSize="16" fill="#38bdf8">∫ [a to b] f(x) dx = F(b) - F(a)</text>
              <text x="440" y="165" fontSize="14" fill="#cbd5e1">lim x→0 (sin x / x) = 1</text>
              <text x="90" y="80" fontSize="15" fill="#fbbf24">d/dx [sin²x + cos²x] = 0</text>
              <text x="470" y="325" fontSize="13" fill="#94a3b8">Matrix A = [ cos θ  -sin θ ; sin θ  cos θ ]</text>
            </g>
          </g>
        )}

        {/* B. KIMIA ANALITIK: Benzene Rings, Titration Curve & Reaction Formulas */}
        {isChemistry && (
          <g opacity="0.9">
            {/* Benzene Ring 1 */}
            <polygon points="170,110 210,133 210,179 170,202 130,179 130,133" fill="none" stroke="url(#chemGrad)" strokeWidth="2.5" filter="url(#glow)" />
            <circle cx="170" cy="156" r="24" fill="none" stroke="rgba(34, 211, 238, 0.45)" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Benzene Ring 2 */}
            <polygon points="210,133 250,110 290,133 290,179 250,202 210,179" fill="none" stroke="url(#chemGrad)" strokeWidth="2.5" filter="url(#glow)" />
            <circle cx="250" cy="156" r="24" fill="none" stroke="rgba(34, 211, 238, 0.45)" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Titration Sigmoid S-Curve */}
            <path 
              d="M 380,330 C 460,330 490,320 520,230 C 540,150 570,110 680,110" 
              fill="none" 
              stroke="#22d3ee" 
              strokeWidth="3.5" 
              filter="url(#glow)" 
            />
            {/* Equivalence Point Marker */}
            <circle cx="520" cy="230" r="5" fill="#f43f5e" filter="url(#glow)" />
            <line x1="520" y1="230" x2="520" y2="350" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="535" y="235" fill="#f43f5e" fontSize="13" fontFamily="JetBrains Mono, monospace" fontWeight="bold">Titik Ekuivalen (pH = 7.00)</text>
            {/* Formulas */}
            <g fontFamily="JetBrains Mono, monospace" fill="rgba(207, 250, 254, 0.9)">
              <text x="380" y="70" fontSize="16" fontWeight="bold">HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)</text>
              <text x="380" y="98" fontSize="14" fill="#34d399">pH = -log [H⁺] · pOH = -log [OH⁻]</text>
              <text x="110" y="270" fontSize="13" fill="#a5f3fc">V₁ · M₁ = V₂ · M₂ (Stoikiometri Netralisasi)</text>
              <text x="110" y="300" fontSize="12" fill="#94a3b8">Indikator Fenolftalein (Trayek pH 8.3 - 10.0)</text>
            </g>
          </g>
        )}

        {/* C. FISIKA DINAMIKA: Free Body Diagram, Newton Law & Vectors */}
        {isPhysics && (
          <g opacity="0.9">
            {/* Inclined Plane */}
            <polygon points="110,340 370,340 370,180" fill="rgba(99, 102, 241, 0.18)" stroke="url(#physGrad)" strokeWidth="2.5" />
            <text x="150" y="330" fill="#fbbf24" fontSize="14" fontFamily="JetBrains Mono, monospace">θ = 30°</text>
            {/* Block on Plane */}
            <rect x="220" y="220" width="60" height="40" transform="rotate(-30 220 220)" fill="rgba(30, 41, 59, 0.9)" stroke="#38bdf8" strokeWidth="2" />
            {/* Gravity (mg) */}
            <line x1="240" y1="210" x2="240" y2="290" stroke="#f43f5e" strokeWidth="2.5" filter="url(#glow)" />
            <text x="245" y="295" fill="#f43f5e" fontSize="12" fontFamily="JetBrains Mono, monospace" fontWeight="bold">W = m·g</text>
            {/* Normal Force (N) */}
            <line x1="240" y1="210" x2="270" y2="158" stroke="#38bdf8" strokeWidth="2.5" filter="url(#glow)" />
            <text x="275" y="160" fill="#38bdf8" fontSize="12" fontFamily="JetBrains Mono, monospace" fontWeight="bold">N = m·g·cos θ</text>
            {/* Friction Force */}
            <line x1="240" y1="210" x2="285" y2="236" stroke="#fbbf24" strokeWidth="2.5" filter="url(#glow)" />
            <text x="290" y="250" fill="#fbbf24" fontSize="12" fontFamily="JetBrains Mono, monospace">fk = μk·N</text>
            {/* Dynamic Equations */}
            <g fontFamily="JetBrains Mono, monospace" fill="rgba(224, 231, 255, 0.9)">
              <text x="440" y="90" fontSize="20" fontWeight="bold">ΣF = m · a</text>
              <text x="440" y="125" fontSize="16" fill="#818cf8">a = g(sin θ - μk·cos θ)</text>
              <text x="440" y="160" fontSize="14" fill="#38bdf8">vt² = v₀² + 2·a·s</text>
              <text x="440" y="195" fontSize="14" fill="#93c5fd">Ek = ½ m·v²  |  Ep = m·g·h</text>
              <text x="440" y="230" fontSize="12" fill="#94a3b8">Hukum Kekekalan Energi Mekanik</text>
            </g>
          </g>
        )}

        {/* D. BIOLOGI: DNA Double Helix, Mitochondria & Genetics */}
        {isBiology && (
          <g opacity="0.9">
            {/* DNA Double Helix */}
            <path 
              d="M 100,70 Q 150,140 200,70 T 300,70 T 400,70 T 500,70 T 600,70 T 700,70" 
              fill="none" 
              stroke="url(#bioGrad)" 
              strokeWidth="3.5" 
              filter="url(#glow)" 
            />
            <path 
              d="M 100,150 Q 150,80 200,150 T 300,150 T 400,150 T 500,150 T 600,150 T 700,150" 
              fill="none" 
              stroke="#34d399" 
              strokeWidth="3.5" 
              filter="url(#glow)" 
            />
            {/* DNA Rungs */}
            {[130, 170, 230, 270, 330, 370, 430, 470, 530, 570, 630, 670].map((x, i) => (
              <line key={i} x1={x} y1="85" x2={x} y2="135" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeDasharray="2 2" />
            ))}
            {/* Biological Formulas & Notation */}
            <g fontFamily="JetBrains Mono, monospace" fill="rgba(209, 250, 229, 0.9)">
              <text x="100" y="230" fontSize="16" fontWeight="bold">Respirasi Seluler Aerob (Siklus Krebs & Fosforilasi)</text>
              <text x="100" y="265" fontSize="14" fill="#6ee7b7">C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 36-38 ATP</text>
              <text x="100" y="300" fontSize="13" fill="#a7f3d0">Hukum Mendel II (Asortasi Bebas DiHibrid): 9 : 3 : 3 : 1</text>
              <text x="100" y="330" fontSize="12" fill="#94a3b8">Basa Nitrogen: Adenin-Timin (A-T), Guanin-Sitosin (G-C)</text>
            </g>
          </g>
        )}

        {/* E. BAHASA INDONESIA / SASTRA */}
        {isIndonesian && (
          <g opacity="0.9">
            <g fill="rgba(241, 245, 249, 0.9)">
              <text x="90" y="90" fontSize="22" fontStyle="italic" fill="#fbbf24">“ Berpikir Kritis, Bertutur Santun, Berkarya Nyata ”</text>
              <text x="90" y="130" fontSize="15" fontFamily="JetBrains Mono, monospace" fill="#38bdf8">Struktur Teks Argumentasi: Tesis → Bukti Empiris → Simpulan</text>
            </g>
            <rect x="90" y="170" width="160" height="50" rx="10" fill="rgba(2, 132, 199, 0.25)" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="130" y="200" fill="#e0f2fe" fontSize="13" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="bold">1. TESIS / KLAIM</text>
            <line x1="250" y1="195" x2="300" y2="195" stroke="#fbbf24" strokeWidth="2" />
            <rect x="300" y="170" width="180" height="50" rx="10" fill="rgba(245, 158, 11, 0.25)" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="320" y="200" fill="#fef3c7" fontSize="13" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="bold">2. FAKTA & DATA</text>
            <line x1="480" y1="195" x2="530" y2="195" stroke="#fbbf24" strokeWidth="2" />
            <rect x="530" y="170" width="170" height="50" rx="10" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" strokeWidth="1.5" />
            <text x="550" y="200" fill="#d1fae5" fontSize="13" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="bold">3. SINTESIS AKHIR</text>
            <text x="90" y="270" fill="#94a3b8" fontSize="12" fontFamily="JetBrains Mono, monospace">Pedoman Umum Ejaan Bahasa Indonesia (EYD V) · Fase F SMAN 25 Jakarta</text>
          </g>
        )}

        {/* F. BAHASA INGGRIS */}
        {isEnglish && (
          <g opacity="0.9">
            <g fontFamily="JetBrains Mono, monospace" fill="rgba(238, 242, 255, 0.9)">
              <text x="90" y="90" fontSize="22" fontWeight="bold" fill="#a78bfa">Analytical Exposition & Academic Rhetoric</text>
              <text x="90" y="130" fontSize="15" fill="#38bdf8">Thesis Statement → Elaboration of Arguments → Reiteration</text>
              <text x="90" y="170" fontSize="14" fill="#fbbf24">Connectives: Furthermore, Consequently, In spite of, Undoubtedly</text>
              <text x="90" y="210" fontSize="13" fill="#cbd5e1">Phonetics: /ˈæn.ə.laɪz/ · /ˈkwɒn.tɪ.taɪz/ · /ˌhaɪ.pəˈθet.ɪ.kəl/</text>
              <text x="90" y="250" fontSize="12" fill="#94a3b8">B2-C1 CEFR Proficiency Standard · SMAN 25 Jakarta Language Lab</text>
            </g>
          </g>
        )}

        {/* G. SEJARAH */}
        {isHistory && (
          <g opacity="0.9">
            <line x1="80" y1="180" x2="720" y2="180" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="2" />
            {[
              { year: '1908', label: 'Budi Utomo', x: 140 },
              { year: '1928', label: 'Sumpah Pemuda', x: 300 },
              { year: '1945', label: 'Proklamasi RI', x: 480 },
              { year: '1949', label: 'KMB Diplomasi', x: 640 },
            ].map((pt, i) => (
              <g key={i}>
                <circle cx={pt.x} cy="180" r="7" fill="#f59e0b" filter="url(#glow)" />
                <text x={pt.x} y="150" fill="#fde68a" fontSize="14" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle">{pt.year}</text>
                <text x={pt.x} y="215" fill="#fef3c7" fontSize="12" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="bold" textAnchor="middle">{pt.label}</text>
              </g>
            ))}
            <text x="90" y="85" fill="#fbbf24" fontSize="18" fontStyle="italic">Historiografi & Pergerakan Nasional Bangsa Indonesia</text>
            <text x="90" y="280" fill="#94a3b8" fontSize="12" fontFamily="JetBrains Mono, monospace">Analisis Kausalitas Sejarah Kritis Fase F · SMAN 25 Jakarta</text>
          </g>
        )}

        {/* H. PENDIDIKAN AGAMA */}
        {isReligion && (
          <g opacity="0.9">
            <rect x="520" y="80" width="140" height="140" fill="none" stroke="rgba(234, 179, 8, 0.45)" strokeWidth="2" filter="url(#glow)" />
            <rect x="520" y="80" width="140" height="140" transform="rotate(45 590 150)" fill="none" stroke="rgba(234, 179, 8, 0.65)" strokeWidth="2" filter="url(#glow)" />
            <circle cx="590" cy="150" r="50" fill="none" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1.5" />
            <g fill="rgba(254, 240, 138, 0.9)">
              <text x="90" y="100" fontSize="22" fontWeight="bold" fill="#facc15">Fiqih Muamalah Kontemporer & Akhlak Mulia</text>
              <text x="90" y="140" fontSize="14" fontFamily="JetBrains Mono, monospace" fill="#38bdf8">Prinsip Transaksi Syariah: Keadilan, Transparansi & Tanpa Riba</text>
              <text x="90" y="180" fontSize="13" fontFamily="Plus Jakarta Sans, sans-serif" fill="#e2e8f0">Moderasi Beragama, Toleransi Kebangsaan & Nilai Universal Islam</text>
              <text x="90" y="270" fontSize="12" fontFamily="JetBrains Mono, monospace" fill="#94a3b8">Bina Karakter Pelajar Beriman & Bertaqwa · SMAN 25 Jakarta</text>
            </g>
          </g>
        )}

        {/* I. PPKn */}
        {isCivics && (
          <g opacity="0.9">
            <g fontFamily="JetBrains Mono, monospace" fill="rgba(254, 205, 211, 0.9)">
              <text x="90" y="85" fontSize="20" fontWeight="bold" fill="#fb7185">Tata Urutan Peraturan Perundang-Undangan RI</text>
              <text x="90" y="125" fontSize="14" fill="#fbbf24">1. UUD Negara Republik Indonesia Tahun 1945 (Konstitusi Tertinggi)</text>
              <text x="90" y="155" fontSize="13" fill="#fda4af">2. Ketetapan Majelis Permusyawaratan Rakyat (TAP MPR)</text>
              <text x="90" y="185" fontSize="13" fill="#cbd5e1">3. Undang-Undang / Peraturan Pemerintah Pengganti UU (Perppu)</text>
              <text x="90" y="215" fontSize="13" fill="#94a3b8">4. Peraturan Pemerintah (PP) & Peraturan Presiden (Perpres)</text>
              <text x="90" y="270" fontSize="12" fill="#f43f5e">Supremasi Hukum, Demokrasi Pancasila & Perlindungan HAM</text>
            </g>
          </g>
        )}

        {/* J. PJOK */}
        {isSport && (
          <g opacity="0.9">
            <path 
              d="M 60,200 L 160,200 L 180,180 L 195,230 L 210,100 L 225,270 L 240,190 L 255,205 L 270,200 L 400,200 L 420,180 L 435,230 L 450,100 L 465,270 L 480,190 L 495,205 L 510,200 L 740,200" 
              fill="none" 
              stroke="#22d3ee" 
              strokeWidth="3" 
              filter="url(#glow)" 
            />
            <g fontFamily="JetBrains Mono, monospace" fill="rgba(207, 250, 254, 0.9)">
              <text x="90" y="85" fontSize="20" fontWeight="bold" fill="#38bdf8">Fisiologi Kebugaran Jasmani & Latihan Sirkuit</text>
              <text x="90" y="125" fontSize="14" fill="#fbbf24">Target Detak Jantung: 60% - 85% MHR (220 - Usia)</text>
              <text x="90" y="270" fontSize="13" fill="#a5f3fc">VO₂ Max Aerobic Capacity · Fleksibilitas & Daya Tahan Kardiovaskular</text>
            </g>
          </g>
        )}

        {/* K. SENI BUDAYA */}
        {isArt && (
          <g opacity="0.9">
            <circle cx="560" cy="180" r="80" fill="none" stroke="rgba(192, 132, 252, 0.45)" strokeWidth="3" filter="url(#glow)" />
            <circle cx="560" cy="180" r="50" fill="none" stroke="rgba(244, 114, 182, 0.55)" strokeWidth="2.5" />
            <circle cx="560" cy="180" r="25" fill="none" stroke="rgba(251, 191, 36, 0.65)" strokeWidth="2" />
            <g fontFamily="JetBrains Mono, monospace" fill="rgba(245, 208, 254, 0.9)">
              <text x="90" y="95" fontSize="20" fontWeight="bold" fill="#c084fc">Prinsip Komposisi Seni Visual & Desain Dwimatra</text>
              <text x="90" y="135" fontSize="14" fill="#f472b6">Kesatuan (Unity), Keseimbangan (Balance) & Proporsi Emas (φ = 1.618)</text>
              <text x="90" y="175" fontSize="13" fill="#cbd5e1">Eksplorasi Warna: Komplementer, Analog, Monokromatik & Triadik</text>
              <text x="90" y="270" fontSize="12" fill="#94a3b8">Apresiasi Karya Nusantara & Studio Seni Kreatif SMAN 25</text>
            </g>
          </g>
        )}

        {/* L. BK & P5 (Fallback default high-tech digital studio) */}
        {!isMath && !isPhysics && !isChemistry && !isBiology && !isIndonesian && !isEnglish && !isHistory && !isReligion && !isCivics && !isSport && !isArt && (
          <g opacity="0.9">
            <circle cx="400" cy="225" r="140" fill="none" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1.5" />
            <circle cx="400" cy="225" r="90" fill="none" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="2" strokeDasharray="6 6" filter="url(#glow)" />
            <g fontFamily="JetBrains Mono, monospace" fill="rgba(224, 242, 254, 0.9)">
              <text x="90" y="95" fontSize="20" fontWeight="bold" fill="#38bdf8">{courseName}</text>
              <text x="90" y="130" fontSize="14" fill="#fbbf24">Kurikulum Merdeka Terpadu Fase F · SMA Negeri 25 Jakarta</text>
              <text x="90" y="165" fontSize="13" fill="#cbd5e1">Bab Pembelajaran: {chapterTitle || 'Materi Inti Pengayaan'}</text>
              <text x="90" y="275" fontSize="12" fill="#94a3b8">Portal Digital Interaktif Pembelajaran Berdiferensiasi</text>
            </g>
          </g>
        )}

      </svg>

      {/* 5. Topic Badge in Top Right of Background */}
      <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5 bg-slate-950/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[10px] font-bold text-slate-200 shadow-md">
        <Sparkles className="w-3 h-3 text-amber-400" />
        <span className="uppercase tracking-wider">{courseName.split(':')[0]}</span>
      </div>

    </div>
  );
};

type CourseChapter = SubjectCourse['chapters'][number];

const getChapterTeacherVoiceScript = (course: SubjectCourse, chapter?: CourseChapter): string => {
  if (chapter?.teacherVoiceScript && chapter.teacherVoiceScript.trim().length > 15) {
    return chapter.teacherVoiceScript.trim();
  }
  const modul = resolveModulAjar(course.name);
  const chapterTitle = chapter?.title || 'Materi Inti Pembelajaran';
  const points = chapter?.keyPoints && chapter.keyPoints.length > 0 
    ? `Poin penting yang wajib dikuasai: ${chapter.keyPoints.join(', ')}.` 
    : '';

  return `Halo siswa-siswi SMAN 25 Jakarta. Saya ${course.teacher}, pengampu mata pelajaran ${course.name}. Pada sesi pembahasan bab ${chapterTitle}, kita mempelajari materi esensial berikut: ${modul.materiPokok}. ${points} Silakan cermati penjelasan visual dan catatan modul Kurikulum Merdeka Fase F ini dengan saksama.`;
};

interface CoursesViewProps {
  currentUser: UserProfile;
  onOpenSimulation: (simType: 'titrasi_kimia' | 'fisika_newton') => void;
  onOpenModulAjar: (subject: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({ 
  currentUser,
  onOpenSimulation,
  onOpenModulAjar,
  onNavigateTab
}) => {
  const isTeacher = currentUser.role === 'guru';
  const isIPS = currentUser.role === 'siswa_ips';

  // Category & Schedule Day selection
  const [filterCategory, setFilterCategory] = useState<string>('Semua Sesuai Jadwal (14)');
  const [selectedDayFilter, setSelectedDayFilter] = useState<string>('Semua Hari');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<SubjectCourse | null>(null);
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);

  // Video & Audio Playback States
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.85);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(true);
  const [isVoiceSpeaking, setIsVoiceSpeaking] = useState<boolean>(false);
  const [videoLoadError, setVideoLoadError] = useState<boolean>(false);

  // Transcript & Content Tab States
  const [activeTabTranscript, setActiveTabTranscript] = useState<'transcript' | 'summary' | 'key_points'>('transcript');
  const [copiedTranscript, setCopiedTranscript] = useState<boolean>(false);
  const [consultationNotice, setConsultationNotice] = useState<string | null>(null);

  // Retrieve user schedule to match subjects
  const userSchedule = MOCK_SCHEDULE_BY_ROLE[currentUser.role] || [];

  // Helper to match timetable slot with corresponding Course
  const findMatchingCourse = (slotSubject: string): SubjectCourse | undefined => {
    const s = slotSubject.toLowerCase();
    return MOCK_COURSES.find((c) => {
      const cn = c.name.toLowerCase();
      if (cn.includes(s) || s.includes(cn)) return true;
      if (s.includes('kimia') && cn.includes('kimia')) return true;
      if (s.includes('fisika') && cn.includes('fisika')) return true;
      if (s.includes('biologi') && cn.includes('biologi')) return true;
      if (s.includes('matematika tingkat lanjut') && (cn.includes('peminatan') || cn.includes('kalkulus'))) return true;
      if (s.includes('matematika wajib') && cn.includes('matematika wajib')) return true;
      if (s.includes('bahasa indonesia') && cn.includes('bahasa indonesia')) return true;
      if (s.includes('bahasa inggris') && cn.includes('bahasa inggris')) return true;
      if (s.includes('agama') && cn.includes('agama')) return true;
      if (s.includes('sejarah') && cn.includes('sejarah')) return true;
      if (s.includes('seni') && cn.includes('seni')) return true;
      if (s.includes('pjok') && cn.includes('pjok')) return true;
      if (s.includes('pancasila') && cn.includes('pancasila')) return true;
      if (s.includes('bk') && cn.includes('bk')) return true;
      if (s.includes('p5') && cn.includes('p5')) return true;
      return false;
    });
  };

  // Helper to extract specific timetable slots for any course
  const getCourseScheduleSlots = (courseName: string) => {
    const c = courseName.toLowerCase();
    return userSchedule.filter((slot) => {
      if (slot.isBreak || slot.subject.includes('Upacara') || slot.subject.includes('Pembiasaan')) return false;
      const s = slot.subject.toLowerCase();
      if (c.includes(s) || s.includes(c)) return true;
      if (s.includes('kimia') && c.includes('kimia')) return true;
      if (s.includes('fisika') && c.includes('fisika')) return true;
      if (s.includes('biologi') && c.includes('biologi')) return true;
      if (s.includes('matematika tingkat lanjut') && (c.includes('peminatan') || c.includes('polinomial') || c.includes('kalkulus'))) return true;
      if (s.includes('matematika wajib') && c.includes('matematika wajib')) return true;
      if (s.includes('bahasa indonesia') && c.includes('bahasa indonesia')) return true;
      if (s.includes('bahasa inggris') && c.includes('bahasa inggris')) return true;
      if (s.includes('agama') && (c.includes('agama') || c.includes('muamalah'))) return true;
      if (s.includes('sejarah') && c.includes('sejarah')) return true;
      if (s.includes('seni') && c.includes('seni')) return true;
      if (s.includes('pjok') && c.includes('pjok')) return true;
      if (s.includes('pancasila') && c.includes('pancasila')) return true;
      if (s.includes('bk') && c.includes('bk')) return true;
      if (s.includes('p5') && c.includes('p5')) return true;
      return false;
    });
  };

  // Helper to check if course is part of the student's schedule
  const isCourseInSchedule = (course: SubjectCourse) => {
    return getCourseScheduleSlots(course.name).length > 0;
  };

  // Helper to check if course matches selected day
  const courseMatchesDay = (course: SubjectCourse, day: string) => {
    if (day === 'Semua Hari') return true;
    const slots = getCourseScheduleSlots(course.name);
    return slots.some((s) => s.day === day);
  };

  // Reset category when role changes
  useEffect(() => {
    setFilterCategory('Semua Sesuai Jadwal (14)');
    setSelectedDayFilter('Semua Hari');
  }, [currentUser.role]);

  // Pre-load available speech synthesis voices on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        try { window.speechSynthesis.getVoices(); } catch {}
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Web Audio chime tone for instant audible user feedback
  const playChimeTone = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.18); // G5
      gain.gain.setValueAtTime(0.2 * (isMuted ? 0 : volume), ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch {}
  };

  // Harmonized pedagogical chime backup sequence
  const playTeacherToneSequence = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const notes = [392.00, 523.25, 659.25, 783.99]; // G4, C5, E5, G5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.14);
        gain.gain.setValueAtTime(0.12 * (isMuted ? 0 : volume), ctx.currentTime + idx * 0.14);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.14 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.14);
        osc.stop(ctx.currentTime + idx * 0.14 + 0.35);
      });
      setIsVoiceSpeaking(true);
      setTimeout(() => setIsVoiceSpeaking(false), 1200);
    } catch {}
  };

  // Find best natural or Indonesian voice
  const getIndonesianVoice = (): SpeechSynthesisVoice | null => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;
    const idVoice = voices.find(v => v.lang.includes('id') || v.lang.includes('in') || v.name.toLowerCase().includes('indonesia'));
    if (idVoice) return idVoice;
    return voices.find(v => v.default) || voices[0] || null;
  };

  // Web Speech API Voice Narration for authentic Indonesian Teacher voice
  const speakTeacherScript = (scriptText: string) => {
    if (!isVoiceActive || !scriptText || scriptText.trim().length === 0) return;

    // Audible confirmation tone
    playChimeTone();

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        window.speechSynthesis.resume();

        const utterance = new SpeechSynthesisUtterance(scriptText);
        const voice = getIndonesianVoice();
        if (voice) {
          utterance.voice = voice;
          utterance.lang = voice.lang || 'id-ID';
        } else {
          utterance.lang = 'id-ID';
        }

        utterance.rate = Math.max(0.75, Math.min(1.5, playbackSpeed || 1.0));
        utterance.pitch = 1.05;
        utterance.volume = isMuted ? 0 : volume;

        utterance.onstart = () => setIsVoiceSpeaking(true);
        utterance.onend = () => setIsVoiceSpeaking(false);
        utterance.onerror = () => {
          setIsVoiceSpeaking(false);
          playTeacherToneSequence();
        };

        setTimeout(() => {
          try {
            window.speechSynthesis.speak(utterance);
            setIsVoiceSpeaking(true);
          } catch {
            playTeacherToneSequence();
          }
        }, 50);
        return;
      } catch {
        playTeacherToneSequence();
      }
    } else {
      playTeacherToneSequence();
    }
  };

  const stopTeacherScript = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try { window.speechSynthesis.cancel(); } catch {}
    }
    setIsVoiceSpeaking(false);
  };

  // Handle Play/Pause of Video & Voice
  const handleTogglePlay = () => {
    if (isPlaying) {
      if (videoRef.current) {
        try { videoRef.current.pause(); } catch {}
      }
      setIsPlaying(false);
      stopTeacherScript();
    } else {
      playChimeTone();
      const currentScript = selectedCourse ? getChapterTeacherVoiceScript(selectedCourse, activeChapter) : '';
      if (videoRef.current && !videoLoadError) {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
          if (isVoiceActive && currentScript) {
            speakTeacherScript(currentScript);
          }
        }).catch(() => {
          setIsPlaying(true);
          if (isVoiceActive && currentScript) {
            speakTeacherScript(currentScript);
          }
        });
      } else {
        setIsPlaying(true);
        if (isVoiceActive && currentScript) {
          speakTeacherScript(currentScript);
        }
      }
    }
  };

  // Handle Video Time Update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
      setIsMuted(newVolume === 0);
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    videoRef.current.muted = nextMuted;
    if (nextMuted) {
      stopTeacherScript();
    } else if (isPlaying && selectedCourse) {
      const script = getChapterTeacherVoiceScript(selectedCourse, activeChapter);
      speakTeacherScript(script);
    }
  };

  // Stop video and audio on chapter change or close
  const handleSelectChapter = (chId: string) => {
    setActiveChapterId(chId);
    setIsPlaying(false);
    setVideoLoadError(false);
    stopTeacherScript();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
    setActiveChapterId(null);
    setIsPlaying(false);
    setVideoLoadError(false);
    stopTeacherScript();
  };

  const formatVideoTime = (sec: number) => {
    if (isNaN(sec)) return '00:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Filter Categories Tailored to Curriculum & Student Schedule (14 Official Subjects for Grade 11 MIPA)
  const categories = [
    'Semua Sesuai Jadwal (14)',
    'Peminatan MIPA (4)',
    'Mata Pelajaran Wajib (8)',
    'Pengembangan & P5 (2)'
  ];

  // Filter Courses based on active category, day filter, & search query
  const filteredCourses = MOCK_COURSES.filter((course) => {
    // Search query matching
    const matchesQuery = 
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesQuery) return false;

    // Day filter matching
    if (selectedDayFilter !== 'Semua Hari') {
      if (!courseMatchesDay(course, selectedDayFilter)) {
        return false;
      }
    }

    // Category matching
    if (filterCategory.startsWith('Semua Sesuai Jadwal') || filterCategory === 'Semua Pelajaran') {
      return true;
    }
    if (filterCategory.startsWith('Peminatan')) {
      return course.scheduleGroup === 'Peminatan' || course.category === 'SMA MIPA';
    }
    if (filterCategory.startsWith('Mata Pelajaran Wajib') || filterCategory.startsWith('Wajib')) {
      return course.scheduleGroup === 'Wajib' || course.category === 'Umum';
    }
    if (filterCategory.startsWith('Pengembangan')) {
      return course.category === 'Pengembangan' || course.scheduleGroup === 'Pengembangan';
    }

    return true;
  });

  const activeChapter = selectedCourse?.chapters.find(c => c.id === activeChapterId) || selectedCourse?.chapters[0];

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleCopyTranscript = () => {
    if (!selectedCourse) return;
    const text = getChapterTeacherVoiceScript(selectedCourse, activeChapter);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedTranscript(true);
      setTimeout(() => setCopiedTranscript(false), 2500);
    }
  };

  // Live sentences for Interactive Transcript (synchronized with teacher voice)
  const transcriptSentences = useMemo(() => {
    if (!selectedCourse) return [];
    const script = getChapterTeacherVoiceScript(selectedCourse, activeChapter);
    const matches = script.match(/[^.!?]+[.!?]+/g);
    const rawList = matches && matches.length > 0 ? matches : [script];
    const total = rawList.length;
    const activeVideoDuration = duration > 0 ? duration : 60;
    const step = activeVideoDuration / Math.max(1, total);

    return rawList.map((sentence, idx) => ({
      id: idx,
      text: sentence.trim(),
      startTime: idx * step,
      endTime: (idx + 1) * step,
    }));
  }, [activeChapter, selectedCourse, duration]);

  const activeSentenceIndex = useMemo(() => {
    if (transcriptSentences.length === 0) return 0;
    const found = transcriptSentences.findIndex(
      (s) => currentTime >= s.startTime && currentTime < s.endTime
    );
    if (found !== -1) return found;
    if (currentTime >= (transcriptSentences[transcriptSentences.length - 1]?.startTime || 0)) {
      return transcriptSentences.length - 1;
    }
    return 0;
  }, [transcriptSentences, currentTime]);

  // Specific timetable slots for active selected day
  const dayScheduleSlots = userSchedule.filter((slot) => {
    if (selectedDayFilter === 'Semua Hari') return false;
    return (
      slot.day === selectedDayFilter &&
      !slot.isBreak &&
      !slot.subject.includes('Upacara') &&
      !slot.subject.includes('Pembiasaan') &&
      !slot.subject.includes('Refleksi')
    );
  });

  const daysOfWeek = ['Semua Hari', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

  return (
    <div className="p-3 sm:p-5 md:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Header Banner: Synchronized with Schedule */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider bg-sky-100 px-2.5 py-0.5 rounded-md">
              Kurikulum Merdeka SMA · {currentUser.school}
            </span>
            <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Calendar className="w-3 h-3 text-emerald-600" />
              <span>100% Sinkron dengan Jadwal Pelajaran</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1">
            Kelas & Materi Pembelajaran MIPA (14 Materi Pelajaran)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Daftar lengkap 14 materi dan silabus kurikulum resmi Fase F Kelas XI MIPA terhubung langsung dengan alokasi jam tatap muka siswa {currentUser.className}.
          </p>
        </div>

        {/* Search Bar & Quick Schedule Button */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari mata pelajaran, materi, guru..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-2xs"
            />
          </div>

          {onNavigateTab && (
            <button
              onClick={() => onNavigateTab('jadwal')}
              className="hidden sm:flex px-3 py-2 bg-sky-50 hover:bg-sky-100 text-[#0284c7] border border-sky-200 rounded-xl text-xs font-bold items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              title="Buka Roster Jadwal Pelajaran Lengkap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Roster Jadwal</span>
            </button>
          )}
        </div>
      </div>

      {/* SCHEDULE SYNCHRONIZER: Filter by Day of the Week */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#0284c7]" />
            <span className="text-xs font-bold text-slate-800">
              Pilih Hari Jadwal Pelajaran untuk Menampilkan Materi Hari Itu:
            </span>
          </div>
          <span className="text-[11px] text-slate-500">
            {selectedDayFilter === 'Semua Hari' 
              ? 'Menampilkan materi seluruh hari (Senin s.d. Jumat)'
              : `Menampilkan materi yang dijadwalkan pada hari ${selectedDayFilter}`}
          </span>
        </div>

        {/* Day Pills */}
        <div className="flex flex-wrap gap-2">
          {daysOfWeek.map((day) => {
            const isSelected = selectedDayFilter === day;
            return (
              <button
                key={day}
                onClick={() => setSelectedDayFilter(day)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0284c7] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                <Calendar className="w-3 h-3" />
                <span>{day}</span>
              </button>
            );
          })}
        </div>

        {/* Timetable Breakdown for the Selected Day */}
        {selectedDayFilter !== 'Semua Hari' && dayScheduleSlots.length > 0 && (
          <div className="pt-2 border-t border-slate-100 space-y-2.5 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">
                Alur Pembelajaran Hari {selectedDayFilter} ({dayScheduleSlots.length} Mata Pelajaran)
              </span>
              <span className="text-[11px] text-[#0284c7] font-semibold">
                Total {dayScheduleSlots.reduce((acc, s) => acc + (s.jp || 0), 0)} Jam Pelajaran
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {dayScheduleSlots.map((slot) => {
                const matchingCourse = findMatchingCourse(slot.subject);

                return (
                  <div
                    key={slot.id}
                    className="p-3.5 bg-sky-50/50 hover:bg-sky-50 border border-sky-200/80 rounded-xl transition-all flex flex-col justify-between shadow-2xs group"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-[#0284c7] font-bold mb-1">
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3" />
                          <span>{slot.time}</span>
                        </span>
                        <span className="bg-sky-100 px-2 py-0.5 rounded-full">{slot.jp || 2} JP</span>
                      </div>

                      <h4 className="font-bold text-xs text-slate-900 group-hover:text-[#0284c7] transition-colors">
                        {slot.subject}
                      </h4>

                      <div className="text-[11px] text-slate-500 mt-1 space-y-0.5">
                        <p className="flex items-center gap-1 truncate">
                          <span>Guru:</span>
                          <span className="font-semibold text-slate-700">{slot.teacher}</span>
                        </p>
                        <p className="flex items-center gap-1 text-[10px] text-slate-400">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{slot.room}</span>
                        </p>
                      </div>
                    </div>

                    {/* Quick 1-Click Action Buttons */}
                    <div className="pt-2.5 mt-2 border-t border-sky-100 flex items-center gap-1.5">
                      <button
                        onClick={() => onOpenModulAjar(slot.subject)}
                        className="flex-1 py-1.5 px-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg text-[11px] font-bold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                        title="Baca Modul Ajar Lengkap"
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>Baca Materi</span>
                      </button>

                      {matchingCourse && (
                        <button
                          onClick={() => {
                            setSelectedCourse(matchingCourse);
                            setActiveChapterId(matchingCourse.chapters[0]?.id || null);
                            setIsPlaying(false);
                            setVideoLoadError(false);
                            stopTeacherScript();
                          }}
                          className="py-1.5 px-2 bg-white hover:bg-sky-100 text-[#0284c7] border border-sky-200 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                          title="Tonton Video Pembelajaran & Silabus"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Video</span>
                        </button>
                      )}

                      {slot.subject.includes('Kimia') && (
                        <button
                          onClick={() => onOpenSimulation('titrasi_kimia')}
                          className="p-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-lg text-[11px] font-bold transition-all cursor-pointer"
                          title="Buka Lab Titrasi Kimia"
                        >
                          <FlaskConical className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {slot.subject.includes('Fisika') && (
                        <button
                          onClick={() => onOpenSimulation('fisika_newton')}
                          className="p-1.5 bg-sky-500 hover:bg-sky-600 text-slate-950 rounded-lg text-[11px] font-bold transition-all cursor-pointer"
                          title="Buka Lab Dinamika Fisika"
                        >
                          <FlaskConical className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Filter Tabs matching Schedule Categories & Active Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl text-xs font-semibold overflow-x-auto w-full sm:w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                filterCategory === cat
                  ? 'bg-white text-[#0284c7] font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.includes('Semua') && <Calendar className="w-3.5 h-3.5 text-amber-500" />}
              {cat.includes('Peminatan') && <Layers className="w-3.5 h-3.5 text-sky-600" />}
              {cat.includes('Wajib') && <BookOpen className="w-3.5 h-3.5 text-emerald-600" />}
              {cat.includes('Pengembangan') && <Sparkles className="w-3.5 h-3.5 text-purple-600" />}
              <span>{cat}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200/80 px-3 py-1.5 rounded-xl shadow-2xs self-start sm:self-auto">
          <BookOpen className="w-3.5 h-3.5 text-[#0284c7]" />
          <span>Menampilkan <strong className="text-slate-900 font-bold">{filteredCourses.length}</strong> dari 14 Materi Pelajaran</span>
        </div>
      </div>

      {/* Course Grid: Render All Subjects with Schedule Sync Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const progressPercent = Math.round((course.completedModules / course.totalModules) * 100);
          const inSchedule = isCourseInSchedule(course);
          const scheduleSlots = getCourseScheduleSlots(course.name);
          const scheduleDays = Array.from(new Set(scheduleSlots.map((s) => s.day)));
          const totalJp = scheduleSlots.reduce((acc, s) => acc + (s.jp || 0), 0);

          return (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group hover:border-sky-300"
            >
              <div>
                {/* Thumbnail Header */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={course.coverImage}
                    alt={course.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/hero_school_digital_1793805015402.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Category & Grade Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-white/95 backdrop-blur-xs text-[#0284c7] shadow-xs">
                      {course.category}
                    </span>
                    <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-slate-900/80 backdrop-blur-xs text-white">
                      {course.grade}
                    </span>
                    {inSchedule && (
                      <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-emerald-600 text-white flex items-center gap-1 shadow-xs">
                        <Check className="w-3 h-3" />
                        <span>Ada di Jadwal</span>
                      </span>
                    )}
                  </div>

                  {/* Virtual Lab Badge */}
                  {course.interactiveSimType && course.interactiveSimType !== 'none' && !isIPS && (
                    <div className="absolute bottom-3 right-3 bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 shadow-md">
                      <Sparkles className="w-3 h-3" />
                      <span>Lab Sains</span>
                    </div>
                  )}
                </div>

                {/* Course Meta Info */}
                <div className="p-5 space-y-3">
                  <div>
                    {/* Synchronized Schedule Day Tag */}
                    {scheduleDays.length > 0 && (
                      <div className="mb-1.5">
                        <span className="text-[10px] font-bold bg-sky-50 text-[#0284c7] border border-sky-200 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Jadwal: {scheduleDays.join(' & ')} {totalJp > 0 ? `(${totalJp} JP)` : ''}</span>
                        </span>
                      </div>
                    )}

                    <h3 className="font-bold text-slate-900 text-base group-hover:text-[#0284c7] transition-colors leading-snug">
                      {course.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <span>Guru Pengampu:</span>
                      <span className="font-semibold text-slate-700">{course.teacher}</span>
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="pt-1 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Progres Modul Belajar</span>
                      <span className="font-bold text-slate-800">{progressPercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#0284c7] rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Silabus & Video + Modul Ajar */}
              <div className="p-5 pt-0 flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedCourse(course);
                    setActiveChapterId(course.chapters[0]?.id || null);
                    setIsPlaying(false);
                    setVideoLoadError(false);
                    stopTeacherScript();
                  }}
                  className="flex-1 py-2 px-3 bg-sky-50 hover:bg-sky-100 text-[#0284c7] border border-sky-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Silabus & Video</span>
                </button>

                <button
                  onClick={() => {
                    onOpenModulAjar(course.name);
                  }}
                  className="py-2 px-3 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-xs cursor-pointer"
                  title="Buka Modul Ajar Lengkap"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Baca Materi</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Video & Silabus Interactive Player Modal with REAL Playback & Audio for ALL SUBJECTS */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-6xl w-full border border-slate-200/90 shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
            
            {/* Modal Top Header Bar */}
            <div className="px-5 sm:px-6 py-4 bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#075985] text-white flex items-center justify-between shadow-md shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-xs text-amber-300 shadow-inner shrink-0">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full shadow-2xs">
                      Video & Silabus Interaktif
                    </span>
                    <span className="text-xs text-sky-100 font-medium">{selectedCourse.grade}</span>
                    <span className="text-slate-300 hidden sm:inline">·</span>
                    <span className="text-xs text-amber-200 font-semibold hidden sm:inline">Kurikulum Merdeka SMA</span>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-black text-white tracking-tight truncate mt-0.5">
                    {selectedCourse.name}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    handleCloseModal();
                    onOpenModulAjar(selectedCourse.name);
                  }}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs font-bold transition-all border border-white/20 cursor-pointer"
                  title="Buka Modul Ajar Lengkap"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                  <span>Modul Ajar PDF</span>
                </button>
                <button
                  onClick={handleCloseModal}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer border border-white/10"
                  title="Tutup Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body Content Grid */}
            <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto flex-1">
              
              {/* Left Column (lg:col-span-5): Vertical Interactive Timeline / Card for Syllabus */}
              <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <div>
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Daftar Silabus & Bab Pembelajaran
                      </span>
                      <p className="text-[11px] text-slate-500">
                        {selectedCourse.chapters.length} Modul Terstruktur · SMAN 25 Jakarta
                      </p>
                    </div>
                    <span className="text-[11px] font-extrabold text-[#0284c7] bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full">
                      {selectedCourse.completedModules} / {selectedCourse.totalModules} Selesai
                    </span>
                  </div>

                  {/* Vertical Timeline Container */}
                  <div className="relative pl-6 space-y-3 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                    {selectedCourse.chapters.map((ch, idx) => {
                      const isActive = activeChapter?.id === ch.id;
                      const isCompleted = ch.completed;
                      const isLocked = !isCompleted && !isActive && idx > (selectedCourse.completedModules || 0);

                      return (
                        <div
                          key={ch.id}
                          onClick={() => handleSelectChapter(ch.id)}
                          className={`relative p-3.5 rounded-2xl border transition-all cursor-pointer group select-none ${
                            isActive
                              ? 'bg-gradient-to-r from-sky-50 via-sky-50/80 to-indigo-50/40 border-[#0284c7] ring-2 ring-[#0284c7]/40 shadow-sm'
                              : isCompleted
                              ? 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/20'
                              : isLocked
                              ? 'bg-slate-50/80 border-slate-200/80 opacity-75 hover:opacity-100 hover:border-slate-300'
                              : 'bg-white border-slate-200 hover:border-sky-300 hover:bg-sky-50/30'
                          }`}
                        >
                          {/* Timeline Node Icon */}
                          <div
                            className={`absolute -left-[30px] top-4 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                              isCompleted
                                ? 'bg-emerald-500 text-white ring-2 ring-emerald-200'
                                : isActive
                                ? 'bg-[#0284c7] text-white ring-4 ring-sky-200 animate-pulse'
                                : isLocked
                                ? 'bg-slate-200 text-slate-500'
                                : 'bg-white text-slate-700 border-2 border-slate-300'
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            ) : isLocked ? (
                              <Lock className="w-3 h-3 text-slate-400" />
                            ) : (
                              <span>{idx + 1}</span>
                            )}
                          </div>

                          {/* Card Content Header */}
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                              Modul {String(idx + 1).padStart(2, '0')}
                            </span>

                            {/* Status Badges: Selesai, Sedang Dipelajari, Terkunci */}
                            {isActive ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#0284c7] text-white flex items-center gap-1 shadow-2xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
                                <span>Sedang Dipelajari</span>
                              </span>
                            ) : isCompleted ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span>Selesai</span>
                              </span>
                            ) : isLocked ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-500 flex items-center gap-1">
                                <Lock className="w-2.5 h-2.5 text-slate-400" />
                                <span>Terkunci</span>
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                                Siap Dipelajari
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h4 className={`text-xs sm:text-sm font-bold leading-snug ${
                            isActive ? 'text-[#0284c7]' : 'text-slate-900 group-hover:text-[#0284c7]'
                          }`}>
                            {ch.title}
                          </h4>

                          {/* Media Type & Duration Chips */}
                          <div className="flex flex-wrap items-center gap-2 mt-2 text-[10px]">
                            <span className={`px-2 py-0.5 rounded-md font-semibold flex items-center gap-1 border ${
                              isActive
                                ? 'bg-sky-100 text-[#0284c7] border-sky-200'
                                : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}>
                              {ch.type === 'video' && '🎬 Video Guru'}
                              {ch.type === 'lab_sim' && '🔬 Lab Sains Virtual'}
                              {ch.type === 'modul_pdf' && '📄 Modul Bacaan / PDF'}
                              {ch.type === 'kuis' && '📝 Evaluasi / Kuis Formatif'}
                            </span>
                            <span className="text-slate-500 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span>{ch.duration}</span>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Profile Guru Pengampu yang Menyesuaikan per Mata Pelajaran */}
                {(() => {
                  const teacher = resolveTeacherProfile(selectedCourse.id, selectedCourse.teacher);
                  return (
                    <div className="mt-4 p-4 bg-gradient-to-br from-slate-50 via-sky-50/40 to-indigo-50/30 rounded-2xl border border-sky-200/80 shadow-2xs space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-800 flex items-center gap-1">
                          <GraduationCap className="w-3.5 h-3.5 text-[#0284c7]" />
                          <span>Guru Pengampu Modul · SMAN 25</span>
                        </span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Pengajar Aktif</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                          <img
                            src={teacher.avatarUrl}
                            alt={teacher.name}
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80';
                            }}
                            className="w-13 h-13 rounded-2xl object-cover border-2 border-white shadow-md"
                          />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[8px] text-white">
                            ✓
                          </div>
                        </div>

                        <div className="min-w-0">
                          <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm truncate leading-snug">
                            {teacher.name}
                          </h4>
                          <p className="text-[11px] font-semibold text-[#0284c7] truncate mt-0.5">
                            {teacher.degree}
                          </p>
                          <p className="text-[10px] text-slate-500 font-mono truncate">
                            NIP: {teacher.nip}
                          </p>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-600 space-y-1.5 bg-white/80 p-3 rounded-xl border border-slate-200/70 shadow-2xs">
                        <div className="flex items-start gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-[#0284c7] shrink-0 mt-0.5" />
                          <span className="line-clamp-2 font-medium">{teacher.specialization}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 text-[10px]">
                          <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                          <span>{teacher.department}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 text-[10px]">
                          <Clock className="w-3 h-3 text-emerald-500 shrink-0" />
                          <span>Jam Konsultasi: {teacher.officeHours}</span>
                        </div>
                      </div>

                      {consultationNotice && (
                        <div className="p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 animate-in fade-in">
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{consultationNotice}</span>
                        </div>
                      )}

                      <button
                        onClick={() => {
                          setConsultationNotice(`Permintaan bimbingan materi terkirim ke ${teacher.name}!`);
                          setTimeout(() => setConsultationNotice(null), 3500);
                        }}
                        className="w-full py-2 bg-white hover:bg-sky-50 text-[#0284c7] border border-sky-200 rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Kirim Pertanyaan / Konsultasi Guru</span>
                      </button>
                    </div>
                  );
                })()}
              </div>

              {/* Right Column (lg:col-span-7): Modern Uniform Video Player + Interactive Live Transcript */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  
                  {/* Video Title Bar */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#0284c7] uppercase tracking-wider">
                        <span>Sedang Diputar:</span>
                        <span className="truncate">{selectedCourse.name}</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                        {activeChapter?.title || 'Video Penjelasan Materi Guru'}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        {formatVideoTime(currentTime)} / {formatVideoTime(duration || 120)}
                      </span>
                    </div>
                  </div>

                  {/* UNIFORM CINEMATIC MODERN VIDEO PLAYER CONTAINER */}
                  <div className="relative aspect-16/9 rounded-3xl bg-slate-950 overflow-hidden shadow-2xl border border-slate-800/80 group select-none">
                    
                    {/* 1. DYNAMIC SUBJECT CINEMATIC BACKDROP (REPLACES ANY TEST CARD COLOR BARS) */}
                    <SubjectCinematicBackdrop
                      courseId={selectedCourse.id}
                      courseName={selectedCourse.name}
                      chapterTitle={activeChapter?.title}
                      coverImage={selectedCourse.coverImage}
                      isPlaying={isPlaying}
                    />

                    {/* 2. HTML5 Video Screen: Clean dark video stream that smoothly blends during playback */}
                    {!videoLoadError && (
                      <video
                        ref={videoRef}
                        src={activeChapter?.videoUrl || '/videos/lesson_video_1.mp4'}
                        playsInline
                        preload="metadata"
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onError={() => setVideoLoadError(true)}
                        onEnded={() => {
                          setIsPlaying(false);
                          stopTeacherScript();
                        }}
                        className={`w-full h-full object-cover cursor-pointer absolute inset-0 z-10 transition-opacity duration-700 ${
                          isPlaying ? 'opacity-35 mix-blend-screen' : 'opacity-0 pointer-events-none'
                        }`}
                        onClick={handleTogglePlay}
                      />
                    )}

                    {/* 3. BADGE & INDIKATOR SUARA GURU (TOP LEFT ROUNDED PILL WITH LIVING WAVEFORM) */}
                    <div className="absolute top-3.5 left-3.5 z-25 flex items-center gap-2 pointer-events-auto">
                      {(isVoiceActive && (isPlaying || isVoiceSpeaking)) ? (
                        <div className="bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-2.5 border border-amber-400/50 shadow-[0_0_18px_rgba(251,191,36,0.35)] transition-all animate-in fade-in">
                          {/* Living animated waveform with 5 dynamic jumping bars */}
                          <div className="flex items-center gap-0.5 h-4">
                            <span className="w-1 bg-amber-400 rounded-full animate-bounce h-3.5" style={{ animationDuration: '0.6s' }} />
                            <span className="w-1 bg-amber-300 rounded-full animate-bounce h-2" style={{ animationDuration: '0.45s', animationDelay: '0.15s' }} />
                            <span className="w-1 bg-amber-400 rounded-full animate-bounce h-4" style={{ animationDuration: '0.7s', animationDelay: '0.05s' }} />
                            <span className="w-1 bg-amber-300 rounded-full animate-bounce h-2.5" style={{ animationDuration: '0.5s', animationDelay: '0.25s' }} />
                            <span className="w-1 bg-amber-400 rounded-full animate-bounce h-3.5" style={{ animationDuration: '0.65s', animationDelay: '0.1s' }} />
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            <span className="text-[11px] font-extrabold text-amber-300 tracking-wide">
                              Suara Guru Aktif
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 border-l border-white/20 pl-2 hidden sm:inline">
                            SMAN 25 Jakarta
                          </span>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setIsVoiceActive(true);
                            if (selectedCourse) {
                              const script = getChapterTeacherVoiceScript(selectedCourse, activeChapter);
                              speakTeacherScript(script);
                            }
                          }}
                          className="bg-slate-950/75 hover:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/15 text-[10px] text-slate-300 font-semibold shadow-xs cursor-pointer transition-colors"
                          title="Klik untuk Menyalakan Suara Guru"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                          <span>Nyalakan Suara Guru</span>
                        </button>
                      )}
                    </div>

                    {/* 4. FLOATING SOFT ANIMATED PLAY BUTTON WHEN PAUSED */}
                    {!isPlaying && (
                      <div
                        onClick={handleTogglePlay}
                        className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-slate-950/35 z-20 group/overlay"
                      >
                        {/* Multi-layered floating pulse rings */}
                        <div className="relative group/playbtn flex items-center justify-center">
                          {/* Outer subtle expanding wave ring */}
                          <div className="absolute -inset-6 rounded-full bg-amber-400/25 blur-xl animate-ping opacity-60" style={{ animationDuration: '3s' }} />
                          {/* Middle pulsing golden aura */}
                          <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-300 blur-lg opacity-75 group-hover/playbtn:opacity-100 animate-pulse transition duration-500" />
                          {/* Interactive floating button */}
                          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-200 text-slate-950 flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.6)] group-hover/playbtn:scale-110 group-hover/playbtn:shadow-[0_0_55px_rgba(245,158,11,0.9)] transition-all duration-300 border-2 border-white/60">
                            <Play className="w-9 h-9 sm:w-11 sm:h-11 fill-current translate-x-0.5 text-slate-950 drop-shadow-sm" />
                          </div>
                        </div>

                        {/* Title & Teacher Info */}
                        <div className="text-center mt-5 space-y-1.5 select-none">
                          <span className="text-white font-extrabold text-base sm:text-lg tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] flex items-center justify-center gap-2">
                            <span>Mulai Video & Suara Guru</span>
                            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                          </span>
                          <div className="flex items-center justify-center gap-2 text-xs text-amber-200 font-medium drop-shadow">
                            <span className="bg-slate-900/85 px-3 py-1 rounded-full border border-amber-300/30 flex items-center gap-1.5">
                              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                              <span>Guru: {selectedCourse.teacher}</span>
                            </span>
                            <span className="bg-slate-900/85 px-2.5 py-1 rounded-full border border-white/20 text-slate-300 font-mono">
                              {activeChapter?.duration || '15 Menit'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 5. BOTTOM GRADIENT OVERLAY & GLASSMORPHISM CONTROLS */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent p-3 sm:p-4 pt-14 flex flex-col gap-2 z-25 select-none pointer-events-auto">
                      
                      {/* Floating Glassmorphism Container */}
                      <div className="bg-slate-900/65 backdrop-blur-md border border-white/10 rounded-2xl p-2.5 sm:px-4 sm:py-2.5 shadow-2xl flex flex-col gap-2">
                        
                        {/* Scrub Slider with CHAPTER DURATION MARKERS */}
                        <div className="relative w-full flex items-center group/scrub">
                          <input
                            type="range"
                            min="0"
                            max={duration || 100}
                            step="0.1"
                            value={currentTime}
                            onChange={handleSeek}
                            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400 z-10 transition-all hover:h-2.5"
                          />

                          {/* Chapter Duration Markers */}
                          <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none flex items-center">
                            {selectedCourse.chapters.map((ch, idx) => {
                              const percent = (idx / selectedCourse.chapters.length) * 100;
                              if (percent === 0) return null;
                              return (
                                <div
                                  key={ch.id}
                                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-3.5 bg-amber-400/80 hover:bg-amber-300 rounded-full shadow-xs pointer-events-auto cursor-pointer group/marker z-15"
                                  style={{ left: `${percent}%` }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectChapter(ch.id);
                                  }}
                                >
                                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-950/95 border border-white/15 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover/marker:opacity-100 pointer-events-none transition-opacity">
                                    Bab {idx + 1}: {ch.title} ({ch.duration})
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Control Buttons & Playback Tools */}
                        <div className="flex flex-wrap items-center justify-between text-white text-xs gap-2 pt-0.5">
                          
                          {/* Left Group: Play/Pause, Time, Volume */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={handleTogglePlay}
                              className="p-1.5 hover:text-amber-400 transition-colors cursor-pointer rounded-lg hover:bg-white/10"
                              title={isPlaying ? 'Jeda Video' : 'Putar Video'}
                            >
                              {isPlaying ? (
                                <Pause className="w-5 h-5 fill-current" />
                              ) : (
                                <Play className="w-5 h-5 fill-current" />
                              )}
                            </button>

                            <span className="font-mono text-[11px] text-slate-300 font-semibold tracking-wide">
                              {formatVideoTime(currentTime)} / {formatVideoTime(duration || 120)}
                            </span>

                            {/* Volume & Mute */}
                            <div className="flex items-center gap-1.5 ml-1">
                              <button
                                onClick={handleToggleMute}
                                className="p-1 hover:text-amber-400 transition-colors cursor-pointer rounded hover:bg-white/10"
                                title={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
                              >
                                {isMuted || volume === 0 ? (
                                  <VolumeX className="w-4 h-4 text-rose-400" />
                                ) : (
                                  <Volume2 className="w-4 h-4 text-slate-200" />
                                )}
                              </button>
                              <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value={isMuted ? 0 : volume}
                                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                                className="w-16 h-1 bg-white/30 rounded appearance-none cursor-pointer accent-amber-400 hidden sm:block"
                              />
                            </div>
                          </div>

                          {/* Right Group: Playback Speed, Voice Toggle, Fullscreen */}
                          <div className="flex items-center gap-2">
                            
                            {/* Playback Speed Controls (0.75x, 1x, 1.25x, 1.5x, 2x) */}
                            <div className="flex items-center bg-black/40 rounded-xl p-0.5 border border-white/10">
                              {[0.75, 1, 1.25, 1.5, 2].map((spd) => (
                                <button
                                  key={spd}
                                  onClick={() => handleSpeedChange(spd)}
                                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                                    playbackSpeed === spd
                                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                                      : 'text-slate-300 hover:text-white'
                                  }`}
                                  title={`Kecepatan Putar ${spd}x`}
                                >
                                  {spd}x
                                </button>
                              ))}
                            </div>

                            {/* Teacher Voice Toggle with Waveform Icon */}
                            <button
                              onClick={() => {
                                const next = !isVoiceActive;
                                setIsVoiceActive(next);
                                if (!next) {
                                  stopTeacherScript();
                                } else if (selectedCourse) {
                                  const script = getChapterTeacherVoiceScript(selectedCourse, activeChapter);
                                  speakTeacherScript(script);
                                }
                              }}
                              className={`px-2.5 py-1 rounded-xl text-[10px] font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                                isVoiceActive 
                                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 border-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.3)]' 
                                  : 'bg-white/10 text-slate-300 border-white/15 hover:bg-white/15'
                              }`}
                              title="Aktifkan / Matikan Suara Narasi Guru"
                            >
                              <Activity className="w-3.5 h-3.5" />
                              <span>Suara Guru: {isVoiceActive ? 'ON' : 'OFF'}</span>
                            </button>

                            {/* Fullscreen */}
                            <button
                              onClick={() => {
                                if (videoRef.current && videoRef.current.requestFullscreen) {
                                  videoRef.current.requestFullscreen();
                                }
                              }}
                              className="p-1.5 hover:text-amber-400 transition-colors cursor-pointer rounded-lg hover:bg-white/10"
                              title="Layar Penuh"
                            >
                              <Maximize2 className="w-4 h-4" />
                            </button>
                          </div>

                        </div>
                      </div>
                    </div>

                  </div>

                  {/* INTERACTIVE LIVE TRANSCRIPT & SUMMARY TABS (FOR ALL SUBJECTS) */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
                    
                    {/* Panel Header & Navigation Tabs */}
                    <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-xl text-xs font-semibold">
                        <button
                          onClick={() => setActiveTabTranscript('transcript')}
                          className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                            activeTabTranscript === 'transcript'
                              ? 'bg-white text-[#0284c7] font-bold shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Live Transcript</span>
                        </button>
                        <button
                          onClick={() => setActiveTabTranscript('summary')}
                          className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                            activeTabTranscript === 'summary'
                              ? 'bg-white text-[#0284c7] font-bold shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Ringkasan Materi</span>
                        </button>
                        <button
                          onClick={() => setActiveTabTranscript('key_points')}
                          className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                            activeTabTranscript === 'key_points'
                              ? 'bg-white text-[#0284c7] font-bold shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Poin Kunci ({activeChapter?.keyPoints?.length || 3})</span>
                        </button>
                      </div>

                      {/* Right Quick Actions */}
                      <div className="flex items-center gap-2">
                        {/* Salin Transkrip Button */}
                        <button
                          onClick={handleCopyTranscript}
                          className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                          title="Salin Transkrip Materi"
                        >
                          {copiedTranscript ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700 font-bold">✓ Tersalin!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-500" />
                              <span>Salin Transkrip</span>
                            </>
                          )}
                        </button>

                        {/* Ulangi Suara Penjelasan Button */}
                        <button
                          onClick={() => {
                            if (selectedCourse) {
                              const script = getChapterTeacherVoiceScript(selectedCourse, activeChapter);
                              speakTeacherScript(script);
                            }
                          }}
                          className="px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-[#0284c7] border border-sky-200 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                          title="Ulangi Pembacaan Suara Guru"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Ulangi Suara</span>
                        </button>
                      </div>
                    </div>

                    {/* Tab 1: Live Interactive Transcript with Automatic Highlight */}
                    {activeTabTranscript === 'transcript' && (
                      <div className="p-4 space-y-2 max-h-60 overflow-y-auto">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 pb-1.5 border-b border-slate-100">
                          <span>Klik salah satu kalimat untuk melompat langsung ke penjelasan audio/video:</span>
                          <span className="text-emerald-600 font-bold flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Sinkronisasi Aktif</span>
                          </span>
                        </div>

                        <div className="space-y-1.5 pt-1">
                          {transcriptSentences.map((s, idx) => {
                            const isHighlighted = (idx === activeSentenceIndex);
                            return (
                              <div
                                key={s.id}
                                onClick={() => {
                                  if (videoRef.current) {
                                    videoRef.current.currentTime = s.startTime;
                                    setCurrentTime(s.startTime);
                                  }
                                  if (!isPlaying) {
                                    setIsPlaying(true);
                                    if (videoRef.current) {
                                      try { videoRef.current.play(); } catch {}
                                    }
                                  }
                                  if (isVoiceActive) {
                                    speakTeacherScript(s.text);
                                  }
                                }}
                                className={`p-2.5 rounded-xl transition-all cursor-pointer flex items-start gap-2.5 text-xs select-none ${
                                  isHighlighted
                                    ? 'bg-sky-100/90 text-sky-950 font-bold border-l-4 border-[#0284c7] shadow-2xs'
                                    : 'text-slate-700 hover:bg-slate-50 border-l-4 border-transparent'
                                }`}
                              >
                                <span className={`font-mono text-[10px] mt-0.5 shrink-0 px-1.5 py-0.5 rounded ${
                                  isHighlighted ? 'bg-[#0284c7] text-white font-bold' : 'text-slate-400 bg-slate-100'
                                }`}>
                                  {formatVideoTime(s.startTime)}
                                </span>
                                <p className="flex-1 leading-relaxed">
                                  {s.text}
                                </p>
                                {isHighlighted && isPlaying && (
                                  <span className="shrink-0 w-2 h-2 rounded-full bg-[#0284c7] animate-ping mt-1" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Tab 2: Ringkasan Materi */}
                    {activeTabTranscript === 'summary' && (
                      <div className="p-4 space-y-3 max-h-60 overflow-y-auto">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800">
                            Ringkasan Materi Pokok Kurikulum Merdeka Fase F
                          </span>
                          <span className="text-[10px] bg-sky-100 text-[#0284c7] font-bold px-2 py-0.5 rounded-full">
                            Terbaca Otomatis
                          </span>
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                          {resolveModulAjar(selectedCourse.name).materiPokok}
                        </p>

                        {resolveModulAjar(selectedCourse.name).formulaOrDiagram && (
                          <div className="bg-slate-900 text-amber-300 p-3 rounded-xl font-mono text-[11px] overflow-x-auto">
                            <span className="text-[9px] uppercase tracking-wider text-slate-400 block mb-1 font-sans font-bold">
                              Formula Kunci / Diagram Alur:
                            </span>
                            <code>{resolveModulAjar(selectedCourse.name).formulaOrDiagram}</code>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tab 3: Poin Kunci Pembelajaran */}
                    {activeTabTranscript === 'key_points' && (
                      <div className="p-4 space-y-3 max-h-60 overflow-y-auto">
                        <span className="text-xs font-bold text-slate-800 block">
                          Poin Inti yang Wajib Dikuasai pada Bab Ini:
                        </span>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {(activeChapter?.keyPoints && activeChapter.keyPoints.length > 0 
                            ? activeChapter.keyPoints 
                            : [
                                'Pahami definisi dasar dan konsep teoritis materi pelajaran.',
                                'Analisis korelasi data empiris dan penalaran ilmiah terstruktur.',
                                'Terapkan konsep pada penyelesaian soal asesmen sumatif & formatif.'
                              ]
                          ).map((point, idx) => (
                            <div key={idx} className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start gap-2 text-xs text-emerald-950 font-medium">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                </div>

                {/* Bottom CTA for simulation if available (MIPA only, hidden for Anindya 11 IPS) */}
                {selectedCourse.interactiveSimType && selectedCourse.interactiveSimType !== 'none' && !isIPS && (
                  <div className="p-3.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl flex items-center justify-between shadow-2xs shrink-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-xs">
                        <FlaskConical className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-amber-950 block">
                          Laboratorium Sains Virtual Tersedia!
                        </span>
                        <span className="text-[11px] text-amber-800">
                          Praktikum interaktif {selectedCourse.name} dengan simulasi parameter real-time.
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const simType = selectedCourse.interactiveSimType as 'titrasi_kimia' | 'fisika_newton';
                        handleCloseModal();
                        onOpenSimulation(simType);
                      }}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-xs cursor-pointer shrink-0"
                    >
                      Buka Lab Sekarang
                    </button>
                  </div>
                )}

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
