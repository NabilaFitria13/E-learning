import React, { useState } from 'react';
import { 
  Award, 
  Printer, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  FileText,
  Search,
  Filter,
  GraduationCap,
  TrendingUp,
  BookOpen,
  Compass,
  Leaf,
  Users,
  Lightbulb,
  ShieldCheck,
  Globe2,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { UserProfile } from '../types';

interface GradeItem {
  no: number;
  subject: string;
  category: 'Peminatan MIPA' | 'Mata Pelajaran Umum (Wajib)' | 'Peminatan IPS';
  teacher: string;
  kkm: number;
  formatif: number;
  sumatif: number;
  finalScore: number;
  predicate: 'A' | 'B' | 'C' | 'D';
  desc: string;
}

interface P5DimensionItem {
  id: string;
  dimension: string;
  element: string;
  subElement: string;
  targetFaseF: string;
  predicate: 'MB' | 'SB' | 'BSH' | 'SAB';
  predicateLabel: string;
  badgeBg: string;
  badgeText: string;
  notes: string;
  portfolio: string;
}

interface ReportCardViewProps {
  currentUser: UserProfile;
}

export const ReportCardView: React.FC<ReportCardViewProps> = ({ currentUser }) => {
  const isTeacher = currentUser.role === 'guru';
  const isIPS = currentUser.role === 'siswa_ips';
  const [activeRaporTab, setActiveRaporTab] = useState<'akademik' | 'p5'>('akademik');
  const [filterCategory, setFilterCategory] = useState<'Semua' | 'Peminatan' | 'Umum'>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  // 12 Mata Pelajaran Lengkap Kurikulum Merdeka Fase F Kelas 11 MIPA
  const mipaGrades: GradeItem[] = [
    {
      no: 1,
      subject: 'Fisika Peminatan',
      category: 'Peminatan MIPA',
      teacher: 'Ir. Ahmad Zulkarnain, S.Pd',
      kkm: 75,
      formatif: 91,
      sumatif: 93,
      finalScore: 92,
      predicate: 'A',
      desc: 'Sangat mahir menganalisis hukum gerak Newton pada bidang miring, gaya normal, serta dinamika rotasi dan momen inersia benda tegar.'
    },
    {
      no: 2,
      subject: 'Kimia Peminatan',
      category: 'Peminatan MIPA',
      teacher: 'Drs. Bambang Sudarsono, M.Si',
      kkm: 78,
      formatif: 94,
      sumatif: 96,
      finalScore: 95,
      predicate: 'A',
      desc: 'Sangat terampil dalam praktikum laboratorium virtual, stoikiometri reaksi netralisasi, kurva titrasi asam basa, dan perhitungan pH larutan.'
    },
    {
      no: 3,
      subject: 'Biologi Peminatan',
      category: 'Peminatan MIPA',
      teacher: 'Ibu Endang Suryani, M.Si',
      kkm: 75,
      formatif: 89,
      sumatif: 91,
      finalScore: 90,
      predicate: 'A',
      desc: 'Sangat baik dalam mendeskripsikan siklus Krebs, respirasi aerobik mitokondria, serta pembuktian rasio fenotipe hukum pewarisan sifat Mendel.'
    },
    {
      no: 4,
      subject: 'Matematika Tingkat Lanjut',
      category: 'Peminatan MIPA',
      teacher: 'Ibu Ratna Dewi, S.Pd',
      kkm: 75,
      formatif: 88,
      sumatif: 92,
      finalScore: 90,
      predicate: 'A',
      desc: 'Mampu menyelesaikan masalah kontekstual limit trigonometri, aturan rantai turunan fungsi majemuk, dan persamaan garis singgung kurva.'
    },
    {
      no: 5,
      subject: 'Matematika Umum',
      category: 'Mata Pelajaran Umum (Wajib)',
      teacher: 'Ibu Ratna Dewi, S.Pd',
      kkm: 75,
      formatif: 87,
      sumatif: 89,
      finalScore: 88,
      predicate: 'A',
      desc: 'Menguasai transformasi geometri matriks ordo 2x2 serta terampil menganalisis ukuran pemusatan dan penyebaran data kelompok.'
    },
    {
      no: 6,
      subject: 'Bahasa Indonesia',
      category: 'Mata Pelajaran Umum (Wajib)',
      teacher: 'Ibu Dra. Sri Wahyuni, M.Pd',
      kkm: 75,
      formatif: 92,
      sumatif: 94,
      finalScore: 93,
      predicate: 'A',
      desc: 'Sangat menguasai struktur dan kaidah kebahasaan teks argumentasi berbasis data empiris serta mahir menyusun esai kritis bebas sesat pikir.'
    },
    {
      no: 7,
      subject: 'Bahasa Inggris Lanjut',
      category: 'Mata Pelajaran Umum (Wajib)',
      teacher: 'Mr. David Siregar, M.Ed',
      kkm: 75,
      formatif: 90,
      sumatif: 92,
      finalScore: 91,
      predicate: 'A',
      desc: 'Demonstrates exceptional proficiency in composing analytical exposition essays with empirical data citations and academic debate delivery.'
    },
    {
      no: 8,
      subject: 'Pendidikan Agama dan Budi Pekerti',
      category: 'Mata Pelajaran Umum (Wajib)',
      teacher: 'Ust. H. Syarifuddin, M.Ag',
      kkm: 78,
      formatif: 93,
      sumatif: 95,
      finalScore: 94,
      predicate: 'A',
      desc: 'Sangat mendalam dalam memahami prinsip fiqih muamalah kontemporer, etika transaksi modern, serta konsisten mencerminkan akhlak karimah.'
    },
    {
      no: 9,
      subject: 'Pendidikan Pancasila (PPKn)',
      category: 'Mata Pelajaran Umum (Wajib)',
      teacher: 'Ibu Siti Aminah, S.Pd',
      kkm: 75,
      formatif: 90,
      sumatif: 90,
      finalScore: 90,
      predicate: 'A',
      desc: 'Sangat baik dalam menganalisis hierarki perundang-undangan RI, penegakan supremasi hukum berkeadilan, dan harmonisasi HAM di masyarakat.'
    },
    {
      no: 10,
      subject: 'Sejarah Indonesia',
      category: 'Mata Pelajaran Umum (Wajib)',
      teacher: 'Drs. Hendro Wibowo, M.Hum',
      kkm: 75,
      formatif: 89,
      sumatif: 91,
      finalScore: 90,
      predicate: 'A',
      desc: 'Mahir merekonstruksi dinamika pergerakan kebangsaan modern 1908-1928, manifestasi Sumpah Pemuda, dan peran pers bumiputera.'
    },
    {
      no: 11,
      subject: 'PJOK',
      category: 'Mata Pelajaran Umum (Wajib)',
      teacher: 'Wahyu Hidayat, S.Pd',
      kkm: 75,
      formatif: 88,
      sumatif: 90,
      finalScore: 89,
      predicate: 'A',
      desc: 'Sangat baik dalam pengukuran parameter kebugaran jasmani, kalkulasi Target Heart Rate (THR), dan penguasaan teknik sirkuit atletik.'
    },
    {
      no: 12,
      subject: 'Informatika / Seni & Budaya',
      category: 'Mata Pelajaran Umum (Wajib)',
      teacher: 'Ibu Maya Lestari, S.Sn',
      kkm: 75,
      formatif: 91,
      sumatif: 93,
      finalScore: 92,
      predicate: 'A',
      desc: 'Kreatif dan inovatif dalam eksplorasi karya desain digital dua dimensi, apresiasi estetika nusantara, serta perancangan media kolaboratif.'
    }
  ];

  // Grades for IPS (Anindya)
  const ipsGrades: GradeItem[] = [
    {
      no: 1,
      subject: 'Sosiologi (Peminatan)',
      category: 'Peminatan IPS',
      teacher: 'Drs. Agus Budiman, M.Pd',
      kkm: 75,
      formatif: 94,
      sumatif: 96,
      finalScore: 95,
      predicate: 'A',
      desc: 'Sangat kritis dan mendalam dalam menganalisis fenomena diferensiasi dan stratifikasi sosial di perkotaan.'
    },
    {
      no: 2,
      subject: 'Ekonomi (Peminatan)',
      category: 'Peminatan IPS',
      teacher: 'Dra. Nurhayati, M.M.',
      kkm: 75,
      formatif: 88,
      sumatif: 90,
      finalScore: 89,
      predicate: 'A',
      desc: 'Mampu menganalisis perhitungan pendapatan nasional dan efektivitas kebijakan fiskal-moneter.'
    },
    {
      no: 3,
      subject: 'Geografi Lingkungan',
      category: 'Peminatan IPS',
      teacher: 'Budi Santoso, S.Pd',
      kkm: 75,
      formatif: 87,
      sumatif: 89,
      finalScore: 88,
      predicate: 'A',
      desc: 'Terampil dalam membaca sistem informasi geografis (SIG) dan mitigasi bencana lingkungan.'
    },
    {
      no: 4,
      subject: 'Sejarah Indonesia',
      category: 'Mata Pelajaran Umum (Wajib)',
      teacher: 'Drs. Hendro Wibowo, M.Hum',
      kkm: 75,
      formatif: 92,
      sumatif: 90,
      finalScore: 91,
      predicate: 'A',
      desc: 'Sangat baik dalam merekonstruksi peristiwa Sumpah Pemuda 1928 dan peran kaum intelektual bumiputera.'
    },
    {
      no: 5,
      subject: 'Bahasa Indonesia',
      category: 'Mata Pelajaran Umum (Wajib)',
      teacher: 'Ibu Dra. Sri Wahyuni, M.Pd',
      kkm: 75,
      formatif: 91,
      sumatif: 93,
      finalScore: 92,
      predicate: 'A',
      desc: 'Sangat mahir menyusun esai argumentasi sosial kritis dengan kohesi kalimat yang elegan.'
    },
    {
      no: 6,
      subject: 'Bahasa Inggris Lanjut',
      category: 'Mata Pelajaran Umum (Wajib)',
      teacher: 'Mr. David Siregar, M.Ed',
      kkm: 75,
      formatif: 89,
      sumatif: 91,
      finalScore: 90,
      predicate: 'A',
      desc: 'Mampu berdebat secara persuasif dalam forum akademik berbahasa Inggris.'
    },
    {
      no: 7,
      subject: 'Matematika Umum',
      category: 'Mata Pelajaran Umum (Wajib)',
      teacher: 'Ibu Ratna Dewi, S.Pd',
      kkm: 75,
      formatif: 86,
      sumatif: 88,
      finalScore: 87,
      predicate: 'A',
      desc: 'Memahami prinsip matriks dan statistika probabilitas untuk analisis data demografi.'
    },
    {
      no: 8,
      subject: 'Pendidikan Agama dan Budi Pekerti',
      category: 'Mata Pelajaran Umum (Wajib)',
      teacher: 'Ust. H. Syarifuddin, M.Ag',
      kkm: 78,
      formatif: 93,
      sumatif: 95,
      finalScore: 94,
      predicate: 'A',
      desc: 'Mendalami nilai-nilai toleransi kebinekaan dan akhlak sosial kemanusiaan.'
    },
    {
      no: 9,
      subject: 'Pendidikan Pancasila (PPKn)',
      category: 'Mata Pelajaran Umum (Wajib)',
      teacher: 'Ibu Siti Aminah, S.Pd',
      kkm: 75,
      formatif: 91,
      sumatif: 93,
      finalScore: 92,
      predicate: 'A',
      desc: 'Sangat aktif dalam kajian norma konstitusi dan kesadaran hak sipil kewarganegaraan.'
    },
    {
      no: 10,
      subject: 'PJOK',
      category: 'Mata Pelajaran Umum (Wajib)',
      teacher: 'Wahyu Hidayat, S.Pd',
      kkm: 75,
      formatif: 88,
      sumatif: 90,
      finalScore: 89,
      predicate: 'A',
      desc: 'Disiplin dan bugar dalam rangkaian latihan kebugaran jasmani dan sportivitas.'
    },
    {
      no: 11,
      subject: 'Informatika / Seni & Budaya',
      category: 'Mata Pelajaran Umum (Wajib)',
      teacher: 'Ibu Maya Lestari, S.Sn',
      kkm: 75,
      formatif: 90,
      sumatif: 92,
      finalScore: 91,
      predicate: 'A',
      desc: 'Kreatif dalam pengolahan konten visual digital sosiologis dan seni pertunjukan.'
    }
  ];

  // Teacher ledger table data
  const teacherLedger = [
    { rank: 1, name: 'Rafiandra Putra Dewa', nisn: '0072938192', avg: 91.2, status: 'Tuntas (A)', notes: 'Sangat berprestasi di peminatan MIPA, konsisten nilai 90+' },
    { rank: 2, name: 'Anindya Kirana Putri', nisn: '0074820194', avg: 90.8, status: 'Tuntas (A)', notes: 'Sangat berprestasi di analisis sosial dan esai' },
    { rank: 3, name: 'Dimas Pratama', nisn: '0071829401', avg: 87.5, status: 'Tuntas (A)', notes: 'Konsisten & aktif dalam praktikum sains dan diskusi' },
    { rank: 4, name: 'Citra Dewi Anggraini', nisn: '0073918204', avg: 86.0, status: 'Tuntas (B)', notes: 'Pencapaian sangat baik di seluruh sumatif' },
    { rank: 5, name: 'Farhan Maulana', nisn: '0078192041', avg: 85.4, status: 'Tuntas (B)', notes: 'Tertib presensi dan tugas praktikum laboratorium' },
  ];

  const activeGrades = isIPS ? ipsGrades : mipaGrades;

  // Filtered list
  const filteredGrades = activeGrades
    .filter((g) => {
      if (filterCategory === 'Peminatan') return g.category.includes('Peminatan');
      if (filterCategory === 'Umum') return g.category.includes('Umum');
      return true;
    })
    .filter((g) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        g.subject.toLowerCase().includes(q) ||
        g.teacher.toLowerCase().includes(q) ||
        g.desc.toLowerCase().includes(q)
      );
    });

  const totalSubjects = activeGrades.length;
  const peminatanCount = activeGrades.filter(g => g.category.includes('Peminatan')).length;
  const umumCount = activeGrades.filter(g => g.category.includes('Umum')).length;

  const averageScore = (
    activeGrades.reduce((acc, curr) => acc + curr.finalScore, 0) / activeGrades.length
  ).toFixed(1);

  const highestGrade = [...activeGrades].sort((a, b) => b.finalScore - a.finalScore)[0];
  const lowestGrade = [...activeGrades].sort((a, b) => a.finalScore - b.finalScore)[0];

  // 6 Dimensi Lengkap Projek Penguatan Profil Pelajar Pancasila (P5) Fase F
  const p5Dimensions: P5DimensionItem[] = [
    {
      id: 'p5_dim_1',
      dimension: 'Beriman, Bertakwa kepada Tuhan YME, & Berakhlak Mulia',
      element: 'Akhlak kepada Alam',
      subElement: 'Menjaga Lingkungan Alam Sekitar & Memahami Keterhubungan Ekosistem',
      targetFaseF: 'Mengidentifikasi masalah lingkungan hidup di tingkat sekolah/lokal dan mengajukan inisiatif terpadu menjaga kelestarian hayati.',
      predicate: 'SAB',
      predicateLabel: 'Sangat Berkembang (SAB)',
      badgeBg: 'bg-emerald-100 border border-emerald-300',
      badgeText: 'text-emerald-800',
      notes: 'Sangat konsisten mempraktikkan etika ramah lingkungan, aktif merawat instalasi biopori sekolah, serta mempelopori pemilahan sampah organik.',
      portfolio: 'Laporan Praktikum Pemilahan Sampah Organik Kantin & Dokumentasi Sumur Biopori Mandiri'
    },
    {
      id: 'p5_dim_2',
      dimension: 'Gotong Royong',
      element: 'Kolaborasi & Kepedulian',
      subElement: 'Kerjasama Tim, Koordinasi Sosial, & Tanggap Lingkungan',
      targetFaseF: 'Membangun tim kerja efektif, menyelaraskan kapasitas anggota tim, dan mengelola konflik untuk mencapai target bersama.',
      predicate: 'SAB',
      predicateLabel: 'Sangat Berkembang (SAB)',
      badgeBg: 'bg-emerald-100 border border-emerald-300',
      badgeText: 'text-emerald-800',
      notes: 'Memimpin koordinasi tim dengan komunikatif, sigap membantu rekan saat proses pengeboran tanah biopori, dan menjaga solidaritas tim.',
      portfolio: 'Logbook Kerjasama Tim Projek Lingkungan Fase F & Jadwal Rotasi Perawatan Komposter'
    },
    {
      id: 'p5_dim_3',
      dimension: 'Bernalar Kritis',
      element: 'Memperoleh & Memproses Informasi',
      subElement: 'Mengidentifikasi, Mengklarifikasi, dan Menganalisis Informasi Ilmiah',
      targetFaseF: 'Secara kritis menganalisis data empiris lingkungan, membedakan fakta dan asumsi, serta merumuskan simpulan saintifik berbasis bukti.',
      predicate: 'SAB',
      predicateLabel: 'Sangat Berkembang (SAB)',
      badgeBg: 'bg-emerald-100 border border-emerald-300',
      badgeText: 'text-emerald-800',
      notes: 'Sangat mahir menghitung laju infiltrasi air tanah dan derajat keasaman (pH) tanah sebelum dan sesudah instalasi biopori dengan akurasi tinggi.',
      portfolio: 'Lembar Analisis Uji Laju Infiltrasi Air Tanah & Kurva Efektivitas Penyerapan Genangan'
    },
    {
      id: 'p5_dim_4',
      dimension: 'Kreatif',
      element: 'Menghasilkan Gagasan & Karya Orisinal',
      subElement: 'Eksplorasi Solusi Alternatif & Desain Prototipe',
      targetFaseF: 'Menghasilkan rancangan teknologi tepat guna yang orisinal, aplikatif, dan berdampak nyata bagi penyelesaian masalah lingkungan.',
      predicate: 'BSH',
      predicateLabel: 'Berkembang Sesuai Harapan (BSH)',
      badgeBg: 'bg-sky-100 border border-sky-300',
      badgeText: 'text-[#0284c7]',
      notes: 'Mengembangkan inovasi tutup biopori ramah lingkungan dari pemanfaatan limbah tutup ember bekas dengan ventilasi sirkulasi udara optimal.',
      portfolio: 'Prototipe Modifikasi Tutup Pipa Biopori Bersaring & Sketsa Skema Daur Ulang'
    },
    {
      id: 'p5_dim_5',
      dimension: 'Mandiri',
      element: 'Regulasi Diri & Tanggung Jawab Belajar',
      subElement: 'Penetapan Tujuan, Refleksi Diri, & Disiplin Belajar',
      targetFaseF: 'Menilai efektivitas strategi belajar pribadi, adaptif menghadapi kendala projek, dan bertanggung jawab penuh atas hasil kerja.',
      predicate: 'BSH',
      predicateLabel: 'Berkembang Sesuai Harapan (BSH)',
      badgeBg: 'bg-sky-100 border border-sky-300',
      badgeText: 'text-[#0284c7]',
      notes: 'Disiplin mengisi jurnal mingguan projek P5 secara mandiri tanpa perlu diingatkan, dan mampu mengevaluasi hambatan teknis secara dewasa.',
      portfolio: 'Jurnal Refleksi Diri Mingguan & Catatan Evaluasi Kemandirian Fase F'
    },
    {
      id: 'p5_dim_6',
      dimension: 'Berkebinekaan Global',
      element: 'Berkeadilan Sosial & Kesadaran Global',
      subElement: 'Berpartisipasi dalam Aksi Komunitas Berkelanjutan',
      targetFaseF: 'Mengidentifikasi keterkaitan isu iklim global dengan dampak lokal di wilayah perkotaan DKI Jakarta serta berinisiatif mengambil peran aktif.',
      predicate: 'BSH',
      predicateLabel: 'Berkembang Sesuai Harapan (BSH)',
      badgeBg: 'bg-sky-100 border border-sky-300',
      badgeText: 'text-[#0284c7]',
      notes: 'Mengkaji referensi perbandingan tata kelola resapan air kota Jakarta dengan Tokyo/Singapura, lalu mendiskusikannya dengan penuh rasa hormat.',
      portfolio: 'Kajian Komparatif Resapan Air Perkotaan & Poster Infografis Sadar Banjir Jakarta'
    }
  ];

  const handleDownload = () => {
    if (activeRaporTab === 'p5') {
      setDownloadNotice('Mengunduh e-Rapor P5 (Projek Penguatan Profil Pelajar Pancasila 6 Dimensi) Fase F SMAN 25 Jakarta...');
    } else {
      setDownloadNotice('Mengunduh e-Rapor PDF resmi Fase F SMAN 25 Jakarta (12 Mata Pelajaran)...');
    }
    setTimeout(() => {
      setDownloadNotice(null);
    }, 3500);
  };

  return (
    <div className="p-3 sm:p-5 md:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
      
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-md">
              Kurikulum Merdeka Fase F · {currentUser.className}
            </span>
            <span className="text-xs text-slate-500 font-semibold hidden md:inline">
              Semester Ganjil 2026/2027
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1">
            e-Rapor & Transkrip Capaian Pembelajaran Siswa MIPA
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer active:scale-95"
            title="Cetak Dokumen Transkrip e-Rapor"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Cetak Dokumen</span>
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-[#0284c7] hover:bg-sky-700 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
            title="Unduh Salinan Digital e-Rapor PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{activeRaporTab === 'p5' ? 'Unduh Rapor P5 PDF' : 'Unduh e-Rapor PDF'}</span>
          </button>
        </div>
      </div>

      {/* Main Tab Switcher: Rapor Akademik vs Rapor P5 */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveRaporTab('akademik')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeRaporTab === 'akademik'
              ? 'border-[#0284c7] text-[#0284c7]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Rapor Capaian Akademik (12 Mapel)</span>
          <span className="text-[10px] font-bold bg-sky-100 text-[#0284c7] px-2 py-0.5 rounded-full">
            Fase F
          </span>
        </button>
        <button
          onClick={() => setActiveRaporTab('p5')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeRaporTab === 'p5'
              ? 'border-emerald-600 text-emerald-700 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Rapor Projek Penguatan Profil Pelajar Pancasila (P5)</span>
          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
            6 Dimensi
          </span>
        </button>
      </div>

      {/* Download Alert Toast */}
      {downloadNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">{downloadNotice}</span>
        </div>
      )}

      {/* Main Tab Content */}
      {activeRaporTab === 'akademik' ? (
        <>
          {/* Identity & Academic Summary Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs grid grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
        <div>
          <span className="text-slate-400 block font-medium">{isTeacher ? 'Nama Guru / Wali Kelas:' : 'Nama Siswa:'}</span>
          <span className="font-bold text-slate-900 text-sm">{currentUser.name}</span>
          <span className="text-[11px] text-slate-500 block mt-0.5">NISN: {currentUser.nisn}</span>
        </div>
        <div>
          <span className="text-slate-400 block font-medium">Kelas & Fase:</span>
          <span className="font-bold text-[#0284c7] text-sm">{currentUser.className}</span>
          <span className="text-[11px] text-slate-500 block mt-0.5">Fase F (Tingkat SMA)</span>
        </div>
        <div>
          <span className="text-slate-400 block font-medium">Total Beban Mapel:</span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="font-black text-slate-900 text-base">{totalSubjects} Mapel</span>
            <span className="text-[11px] text-slate-500">({peminatanCount} Peminatan + {umumCount} Umum)</span>
          </div>
        </div>
        <div>
          <span className="text-slate-400 block font-medium">Rata-Rata Nilai Akhir:</span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="font-black text-emerald-600 text-lg">{averageScore}</span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
              Predikat A
            </span>
          </div>
        </div>
        <div className="col-span-2 lg:col-span-1 border-t lg:border-t-0 lg:border-l border-slate-100 pt-2 lg:pt-0 lg:pl-4">
          <span className="text-slate-400 block font-medium">Ketercapaian KKTP:</span>
          <span className="font-bold text-emerald-700 text-sm flex items-center gap-1.5 mt-0.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            100% Melampaui KKTP
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Tertinggi: {highestGrade?.finalScore} ({highestGrade?.subject})</span>
        </div>
      </div>

      {/* Table Section */}
      {isTeacher ? (
        /* Teacher View: Student Ledger */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">
                Rekapitulasi Ledger Nilai Siswa Binaan Kelas 11 MIPA 2
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Nilai kumulatif seluruh 12 mata pelajaran Kurikulum Merdeka Fase F Semester Ganjil.
              </p>
            </div>
            <span className="text-xs font-bold bg-sky-100 text-[#0284c7] px-3 py-1 rounded-lg self-start sm:self-auto">
              Tahun Ajaran 2026/2027
            </span>
          </div>

          <div className="overflow-x-auto max-h-[520px] overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 z-10 bg-slate-100/95 backdrop-blur-xs text-slate-600 border-b border-slate-200 uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3.5 pl-5">Peringkat</th>
                  <th className="p-3.5">Nama Siswa</th>
                  <th className="p-3.5">NISN</th>
                  <th className="p-3.5 text-center">Rata-Rata (12 Mapel)</th>
                  <th className="p-3.5 text-center">Status Kelulusan</th>
                  <th className="p-3.5 pr-5">Catatan Kemajuan Belajar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {teacherLedger.map((row) => (
                  <tr key={row.rank} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 pl-5 font-bold text-[#0284c7]">#{row.rank}</td>
                    <td className="p-3.5 font-bold text-slate-900">{row.name}</td>
                    <td className="p-3.5 font-mono text-slate-500">{row.nisn}</td>
                    <td className="p-3.5 text-center font-mono font-black text-emerald-700 text-sm">{row.avg}</td>
                    <td className="p-3.5 text-center">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3.5 pr-5 text-slate-600">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Student View: Complete 12 Subjects Table with Scroll & Category Filtering */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden space-y-0">
          
          {/* Header Bar with Category Tabs and Search Input */}
          <div className="p-4 bg-slate-50/90 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm">
                  Tabel Transkrip Nilai & Capaian Pembelajaran (TP) Lengkap
                </h3>
                <span className="text-[10px] font-bold bg-[#0284c7] text-white px-2 py-0.5 rounded-full">
                  {filteredGrades.length} dari {totalSubjects} Mapel
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Memuat lengkap 4 Mapel Peminatan MIPA dan 8 Mapel Umum Wajib Kurikulum Merdeka Fase F.
              </p>
            </div>

            {/* Filter Tabs & Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              
              {/* Category Pills */}
              <div className="flex items-center p-1 bg-slate-200/80 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setFilterCategory('Semua')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    filterCategory === 'Semua'
                      ? 'bg-white text-[#0284c7] font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Semua ({totalSubjects})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterCategory('Peminatan')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    filterCategory === 'Peminatan'
                      ? 'bg-white text-[#0284c7] font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Peminatan MIPA ({peminatanCount})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterCategory('Umum')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    filterCategory === 'Umum'
                      ? 'bg-white text-[#0284c7] font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Umum Wajib ({umumCount})
                </button>
              </div>

              {/* Quick Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari mapel / guru..."
                  className="w-full sm:w-44 pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0284c7] transition-all"
                />
              </div>

            </div>
          </div>

          {/* Smooth Vertical Scroll Table Container */}
          <div className="overflow-x-auto max-h-[520px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 print:max-h-none print:overflow-visible">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="sticky top-0 z-10 bg-slate-100/95 backdrop-blur-xs text-slate-600 border-b border-slate-200 uppercase font-bold text-[10px] shadow-2xs">
                <tr>
                  <th className="p-3 pl-4 text-center w-12">No.</th>
                  <th className="p-3.5 min-w-[200px]">Mata Pelajaran & Guru Pengampu</th>
                  <th className="p-3.5 min-w-[130px]">Kelompok Mapel</th>
                  <th className="p-3.5 text-center min-w-[70px]" title="Kriteria Ketercapaian Tujuan Pembelajaran">KKTP</th>
                  <th className="p-3.5 text-center min-w-[75px]" title="Nilai Asesmen Formatif">Formatif</th>
                  <th className="p-3.5 text-center min-w-[75px]" title="Nilai Asesmen Sumatif">Sumatif</th>
                  <th className="p-3.5 text-center min-w-[85px]" title="Nilai Akhir Rapor">Nilai Akhir</th>
                  <th className="p-3.5 text-center min-w-[70px]">Predikat</th>
                  <th className="p-3.5 pr-5 min-w-[320px]">Deskripsi Capaian Pembelajaran (TP)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredGrades.length > 0 ? (
                  filteredGrades.map((g) => {
                    const isPeminatan = g.category.includes('Peminatan');
                    const isTopScore = g.finalScore === highestGrade?.finalScore;

                    return (
                      <tr 
                        key={g.no} 
                        className={`transition-colors hover:bg-sky-50/50 ${
                          isTopScore ? 'bg-amber-50/30' : ''
                        }`}
                      >
                        {/* No. */}
                        <td className="p-3 pl-4 text-center font-bold text-slate-400 font-mono">
                          {g.no}
                        </td>

                        {/* Subject & Teacher */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 text-xs sm:text-[13px] block">
                              {g.subject}
                            </span>
                            {isTopScore && (
                              <span className="text-[9px] bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.2 rounded-full border border-amber-200">
                                Tertinggi
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500 block mt-0.5">
                            {g.teacher}
                          </span>
                        </td>

                        {/* Category Badge */}
                        <td className="p-3.5">
                          <span 
                            className={`inline-block px-2 py-0.5 rounded-md font-semibold text-[10px] ${
                              isPeminatan
                                ? 'bg-sky-50 text-sky-800 border border-sky-200'
                                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            }`}
                          >
                            {g.category}
                          </span>
                        </td>

                        {/* KKTP */}
                        <td className="p-3.5 text-center font-mono font-bold text-slate-500">
                          {g.kkm}
                        </td>

                        {/* Formatif */}
                        <td className="p-3.5 text-center font-mono font-semibold text-slate-700">
                          {g.formatif}
                        </td>

                        {/* Sumatif */}
                        <td className="p-3.5 text-center font-mono font-semibold text-slate-700">
                          {g.sumatif}
                        </td>

                        {/* Nilai Akhir */}
                        <td className="p-3.5 text-center font-mono font-black text-sm">
                          <span className={g.finalScore >= 90 ? 'text-emerald-700' : 'text-slate-900'}>
                            {g.finalScore}
                          </span>
                        </td>

                        {/* Predikat */}
                        <td className="p-3.5 text-center">
                          <span
                            className={`inline-flex items-center justify-center w-7 h-7 rounded-lg font-bold text-xs ${
                              g.predicate === 'A'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-2xs'
                                : 'bg-sky-100 text-sky-800 border border-sky-200'
                            }`}
                          >
                            {g.predicate}
                          </span>
                        </td>

                        {/* Deskripsi Capaian Pembelajaran */}
                        <td className="p-3.5 pr-5 text-[11px] text-slate-600 leading-relaxed">
                          {g.desc}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-slate-400">
                      Tidak ada mata pelajaran yang cocok dengan filter atau kata kunci pencarian.
                    </td>
                  </tr>
                )}
              </tbody>

              {/* Table Footer Summary */}
              <tfoot className="bg-slate-50/95 font-bold border-t-2 border-slate-200 text-slate-700 text-xs">
                <tr>
                  <td colSpan={3} className="p-3.5 pl-5">
                    <span className="text-slate-900">Rata-Rata Kumulatif Seluruh Mata Pelajaran ({totalSubjects} Mapel):</span>
                  </td>
                  <td className="p-3.5 text-center font-mono text-slate-500">75.5</td>
                  <td className="p-3.5 text-center font-mono text-slate-600">
                    {(activeGrades.reduce((a, b) => a + b.formatif, 0) / totalSubjects).toFixed(1)}
                  </td>
                  <td className="p-3.5 text-center font-mono text-slate-600">
                    {(activeGrades.reduce((a, b) => a + b.sumatif, 0) / totalSubjects).toFixed(1)}
                  </td>
                  <td className="p-3.5 text-center font-mono font-black text-emerald-700 text-sm">
                    {averageScore}
                  </td>
                  <td className="p-3.5 text-center">
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-600 text-white font-extrabold text-[10px]">
                      A (Tuntas)
                    </span>
                  </td>
                  <td className="p-3.5 pr-5 text-[11px] text-emerald-800 font-semibold">
                    ✓ Seluruh 12 Capaian Pembelajaran (TP) Semester Ganjil dinyatakan tuntas melampaui KKTP nasional.
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Quick Scroll Indicator Bar */}
          <div className="p-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 px-4">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Tabel dilengkapi scroll vertikal halus &amp; header tetap (sticky) untuk kemudahan membaca.
            </span>
            <span className="font-semibold text-slate-700 hidden sm:inline">
              Nilai Terendah: {lowestGrade?.finalScore} · Nilai Tertinggi: {highestGrade?.finalScore}
            </span>
          </div>

        </div>
      )}

          {/* Profil Pelajar Pancasila Preview & Catatan Wali Kelas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Capaian Profil Pelajar Pancasila (P5)
                </h4>
                <button
                  onClick={() => setActiveRaporTab('p5')}
                  className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  Buka Rapor P5 Lengkap (6 Dimensi) →
                </button>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-slate-800 block">1. Bernalar Kritis &amp; Analitis</span>
                    <span className="text-[10px] text-slate-500 block">Mahir memproses data laboratorium dan fakta ilmiah empiris</span>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full shrink-0">
                    Sangat Berkembang (SAB)
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-slate-800 block">2. Gotong Royong &amp; Kolaboratif</span>
                    <span className="text-[10px] text-slate-500 block">Aktif berbagi peran dalam riset projek lingkungan hidup sekolah</span>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full shrink-0">
                    Sangat Berkembang (SAB)
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-slate-800 block">3. Mandiri &amp; Integritas Belajar</span>
                    <span className="text-[10px] text-slate-500 block">Tepat waktu dalam pengumpulan lembar kerja dan asesmen CBT</span>
                  </div>
                  <span className="text-[10px] font-bold bg-sky-100 text-[#0284c7] px-2 py-0.5 rounded-full shrink-0">
                    Berkembang Sesuai Harapan (BSH)
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#0284c7]" />
                  Catatan Wali Kelas SMAN 25 Jakarta
                </h4>
                <p className="text-xs text-slate-600 italic bg-amber-50/60 border border-amber-200/60 p-3.5 rounded-xl leading-relaxed">
                  {isTeacher
                    ? '"Seluruh siswa kelas 11 MIPA 2 telah menyelesaikan seluruh asesmen sumatif semester ganjil pada 12 mata pelajaran dengan predikat sangat baik dan siap melangkah ke semester genap."'
                    : `"Ananda ${currentUser.name} menunjukkan daya nalar kritis yang tinggi, kepedulian sosial yang hangat, dan dedikasi belajar luar biasa pada seluruh 12 mata pelajaran Fase F. Pertahankan prestasi dan terus kembangkan bakat sains ke tingkat OSN!"`}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Wali Kelas XI MIPA:</span>
                  <span className="font-bold text-slate-800">Ibu Dra. Sri Wahyuni, M.Pd</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px]">Status Verifikasi:</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1 justify-end">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Disahkan Digital SMAN 25
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* P5 View: Dedicated Projek Penguatan Profil Pelajar Pancasila 6 Dimensions Report */
        <div className="space-y-6">
          {/* Project Theme Banner */}
          <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
            <div className="relative z-10 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-300/30 text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5" />
                  Tema P5: Gaya Hidup Berkelanjutan
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white text-[11px] font-mono">
                  Alokasi: 72 Jam Pelajaran (JP) Kokurikuler
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white text-[11px]">
                  Fase F · Kelas XI MIPA
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Pengurangan Jejak Karbon &amp; Inovasi Biopori Resapan Terpadu Siswa SMAN 25
              </h3>

              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-4xl">
                Projek ini membekali peserta didik dengan pemahaman saintifik dan kepedulian ekologis praktis dalam mengolah limbah organik kantin menjadi pupuk kompos, serta perancangan dan instalasi 30 titik lubang resapan biopori di lingkungan kampus SMAN 25 Jakarta guna mencegah genangan air dan menyuburkan tanah sekolah.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-emerald-700/50 text-xs">
                <div>
                  <span className="text-emerald-300 block text-[10px]">Koordinator Tim P5:</span>
                  <span className="font-bold text-white">Dra. Nurhayati, M.M.</span>
                </div>
                <div>
                  <span className="text-emerald-300 block text-[10px]">Fasilitator Kelas XI MIPA:</span>
                  <span className="font-bold text-white">Ir. Ahmad Zulkarnain, S.Pd &amp; Tim</span>
                </div>
                <div>
                  <span className="text-emerald-300 block text-[10px]">Status Evaluasi Akhir:</span>
                  <span className="font-bold text-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Tuntas Paripurna (100%)
                  </span>
                </div>
              </div>
            </div>

            {/* Background Aesthetic Overlay */}
            <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Predicate Rubric Key & Dimensional Overview */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-600" />
                  Kriteria &amp; Legenda Penilaian Asesmen P5 (Kemendikbudristek)
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Standar penilaian dimensi karakter Profil Pelajar Pancasila sesuai Panduan Pengembangan P5 Fase F.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold">
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg">
                  3 Dimensi: Sangat Berkembang (SAB)
                </span>
                <span className="px-2.5 py-1 bg-sky-50 text-[#0284c7] border border-sky-200 rounded-lg">
                  3 Dimensi: Berkembang Sesuai Harapan (BSH)
                </span>
              </div>
            </div>

            {/* Rubric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-700">MB</span>
                  <span className="text-[10px] font-bold text-slate-500">Mulai Berkembang</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-snug">
                  Peserta didik mulai menunjukkan keterlibatan awal dengan bimbingan intensif dari fasilitator.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-amber-800">SB</span>
                  <span className="text-[10px] font-bold text-amber-700">Sedang Berkembang</span>
                </div>
                <p className="text-[10px] text-amber-800/80 leading-snug">
                  Peserta didik telah mampu menerapkan nilai dimensi meski masih memerlukan arahan berkala.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[#0284c7]">BSH</span>
                  <span className="text-[10px] font-bold text-sky-800">Berkembang Sesuai Harapan</span>
                </div>
                <p className="text-[10px] text-sky-800/80 leading-snug">
                  Peserta didik telah mencapai target fase F secara konsisten, mandiri, dan bertanggung jawab.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-emerald-800">SAB</span>
                  <span className="text-[10px] font-bold text-emerald-700">Sangat Berkembang</span>
                </div>
                <p className="text-[10px] text-emerald-800/80 leading-snug">
                  Peserta didik melampaui ekspektasi target fase F serta mampu menginspirasi dan membimbing rekan.
                </p>
              </div>
            </div>
          </div>

          {/* 6 Dimensions Full Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
            <div className="p-4 bg-slate-50/90 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Matriks Capaian 6 Dimensi Profil Pelajar Pancasila Siswa
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Sub-elemen, target pencapaian Fase F, predikat akhir, dan bukti portofolio projek.
                </p>
              </div>
              <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-lg">
                Fase F (Kelas XI)
              </span>
            </div>

            <div className="overflow-x-auto max-h-[640px] overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead className="sticky top-0 z-10 bg-slate-100/95 backdrop-blur-xs text-slate-600 border-b border-slate-200 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-3.5 pl-5 w-12 text-center">No</th>
                    <th className="p-3.5 min-w-[220px]">Dimensi &amp; Elemen</th>
                    <th className="p-3.5 min-w-[220px]">Sub-Elemen &amp; Target Capaian Fase F</th>
                    <th className="p-3.5 text-center min-w-[170px]">Predikat Capaian</th>
                    <th className="p-3.5 min-w-[260px]">Catatan Perkembangan Fasilitator</th>
                    <th className="p-3.5 pr-5 min-w-[220px]">Bukti Portofolio &amp; Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {p5Dimensions.map((dim, idx) => (
                    <tr key={dim.id} className="hover:bg-emerald-50/30 transition-colors">
                      <td className="p-3.5 pl-5 text-center font-bold text-slate-400">
                        {idx + 1}
                      </td>
                      <td className="p-3.5">
                        <span className="font-bold text-slate-900 block text-xs">
                          {dim.dimension}
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded mt-1 inline-block">
                          Elemen: {dim.element}
                        </span>
                      </td>
                      <td className="p-3.5 space-y-1">
                        <span className="font-semibold text-slate-800 block text-[11px]">
                          {dim.subElement}
                        </span>
                        <span className="text-[10px] text-slate-500 block leading-relaxed italic">
                          "{dim.targetFaseF}"
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full font-bold text-[11px] shadow-2xs ${dim.badgeBg} ${dim.badgeText}`}>
                          {dim.predicateLabel}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-700 text-[11px] leading-relaxed">
                        {dim.notes}
                      </td>
                      <td className="p-3.5 pr-5">
                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-[10px] text-slate-600 font-medium space-y-0.5">
                          <span className="font-bold text-slate-800 block">📁 Bukti Fisik/Digital:</span>
                          <span>{dim.portfolio}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Facilitator Narrative Note & Official Validation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  Catatan Refleksi &amp; Perkembangan dari Koordinator P5
                </h4>
                <p className="text-xs text-slate-600 italic bg-emerald-50/70 border border-emerald-200/70 p-4 rounded-xl leading-relaxed">
                  "Ananda {currentUser.name} menunjukkan dedikasi dan keteladanan yang sangat luar biasa sepanjang siklus Projek Gaya Hidup Berkelanjutan. Pemahaman analitisnya dalam pengukuran daya serap biopori serta keterampilannya memimpin rekan kelompok mencerminkan karakter Pelajar Pancasila yang utuh, mandiri, dan berakhlak mulia terhadap lingkungan."
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px]">Koordinator Projek P5:</span>
                  <span className="font-bold text-slate-800">Dra. Nurhayati, M.M.</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px]">NIP Koordinator:</span>
                  <span className="font-mono text-slate-600 font-semibold">197104151998032003</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Lembar Pengesahan Digital Rapor P5 SMAN 25 Jakarta
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Satuan Pendidikan:</span>
                      <span className="font-bold text-slate-900">SMAN 25 Jakarta</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Nomor Pokok Sekolah Nasional (NPSN):</span>
                      <span className="font-mono font-bold text-slate-800">20107297</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Tahun Ajaran / Semester:</span>
                      <span className="font-bold text-slate-900">2026/2027 · Semester Ganjil</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Status Pengesahan:</span>
                      <span className="font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Tervalidasi Sistem e-Rapor Kemendikbud
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Kepala SMA Negeri 25 Jakarta:</span>
                  <span className="font-bold text-slate-800">Drs. H. Sukarno, M.Pd</span>
                </div>
                <button
                  onClick={handleDownload}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh Rapor P5 PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
