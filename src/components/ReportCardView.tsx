import React from 'react';
import { 
  Award, 
  Printer, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  FileText,
  UserCheck,
  Check
} from 'lucide-react';
import { UserProfile } from '../types';

interface ReportCardViewProps {
  currentUser: UserProfile;
}

export const ReportCardView: React.FC<ReportCardViewProps> = ({ currentUser }) => {
  const isTeacher = currentUser.role === 'guru';
  const isIPS = currentUser.role === 'siswa_ips';

  // Grades for MIPA (Rafiandra)
  const mipaGrades = [
    {
      subject: 'Kimia Analitik (Peminatan)',
      teacher: 'Drs. Bambang Sudarsono, M.Si',
      kkm: 78,
      formatif: 92,
      sumatif: 94,
      finalScore: 93,
      predicate: 'A',
      desc: 'Sangat terampil dalam praktikum laboratorium virtual, stoikiometri reaksi netralisasi, dan penentuan titik ekuivalen.'
    },
    {
      subject: 'Fisika Peminatan',
      teacher: 'Ir. Ahmad Zulkarnain, S.Pd',
      kkm: 75,
      formatif: 88,
      sumatif: 92,
      finalScore: 90,
      predicate: 'A',
      desc: 'Memahami prinsip hukum gerak Newton dan gesekan pada bidang miring secara analitis.'
    },
    {
      subject: 'Matematika Peminatan',
      teacher: 'Ibu Ratna Dewi, S.Pd',
      kkm: 75,
      formatif: 85,
      sumatif: 88,
      finalScore: 87,
      predicate: 'A',
      desc: 'Mampu menyelesaikan masalah kontekstual limit dan turunan fungsi trigonometri dengan tepat.'
    },
    {
      subject: 'Biologi Sel',
      teacher: 'Ibu Endang Suryani, M.Si',
      kkm: 75,
      formatif: 86,
      sumatif: 88,
      finalScore: 87,
      predicate: 'A',
      desc: 'Sangat baik dalam mendeskripsikan struktur organel sel dan mekanisme transpor membran seluler.'
    },
    {
      subject: 'Bahasa Indonesia',
      teacher: 'Ibu Dra. Sri Wahyuni, M.Pd',
      kkm: 75,
      formatif: 88,
      sumatif: 90,
      finalScore: 89,
      predicate: 'A',
      desc: 'Sangat menguasai struktur dan kaidah kebahasaan teks argumentasi serta mahir menyusun esai kritis.'
    },
    {
      subject: 'Bahasa Inggris Tingkat Lanjut',
      teacher: 'Mr. David Siregar, M.Ed',
      kkm: 75,
      formatif: 90,
      sumatif: 88,
      finalScore: 89,
      predicate: 'A',
      desc: 'Mahir dalam komunikasi lisan akademik, presentasi karya ilmiah, dan penulisan teks analytical exposition.'
    }
  ];

  // Grades for IPS (Anindya)
  const ipsGrades = [
    {
      subject: 'Sosiologi (Peminatan)',
      teacher: 'Drs. Agus Budiman, M.Pd',
      kkm: 75,
      formatif: 94,
      sumatif: 96,
      finalScore: 95,
      predicate: 'A',
      desc: 'Sangat kritis dan mendalam dalam menganalisis fenomena diferensiasi dan stratifikasi sosial di perkotaan.'
    },
    {
      subject: 'Sejarah Indonesia',
      teacher: 'Drs. Hendro Wibowo, M.Hum',
      kkm: 75,
      formatif: 92,
      sumatif: 90,
      finalScore: 91,
      predicate: 'A',
      desc: 'Sangat baik dalam merekonstruksi peristiwa Sumpah Pemuda 1928 dan peran kaum intelektual bumiputera.'
    },
    {
      subject: 'Ekonomi (Peminatan)',
      teacher: 'Dra. Nurhayati, M.M.',
      kkm: 75,
      formatif: 88,
      sumatif: 90,
      finalScore: 89,
      predicate: 'A',
      desc: 'Mampu menganalisis perhitungan pendapatan nasional dan efektivitas kebijakan fiskal-moneter.'
    },
    {
      subject: 'Geografi Lingkungan',
      teacher: 'Budi Santoso, S.Pd',
      kkm: 75,
      formatif: 87,
      sumatif: 89,
      finalScore: 88,
      predicate: 'A',
      desc: 'Terampil dalam membaca sistem informasi geografis (SIG) dan mitigasi bencana lingkungan.'
    },
    {
      subject: 'Bahasa Indonesia',
      teacher: 'Ibu Dra. Sri Wahyuni, M.Pd',
      kkm: 75,
      formatif: 91,
      sumatif: 93,
      finalScore: 92,
      predicate: 'A',
      desc: 'Sangat mahir menyusun esai argumentasi sosial kritis dengan kohesi kalimat yang elegan.'
    },
    {
      subject: 'Bahasa Inggris Tingkat Lanjut',
      teacher: 'Mr. David Siregar, M.Ed',
      kkm: 75,
      formatif: 89,
      sumatif: 91,
      finalScore: 90,
      predicate: 'A',
      desc: 'Mampu berdebat secara persuasif dalam forum akademik berbahasa Inggris.'
    }
  ];

  // Teacher ledger table data
  const teacherLedger = [
    { rank: 1, name: 'Rafiandra Putra Dewa', nisn: '0072938192', avg: 89.2, status: 'Tuntas (A)', notes: 'Sangat berprestasi di sains MIPA' },
    { rank: 2, name: 'Anindya Kirana Putri', nisn: '0074820194', avg: 90.8, status: 'Tuntas (A)', notes: 'Sangat berprestasi di analisis sosial' },
    { rank: 3, name: 'Dimas Pratama', nisn: '0071829401', avg: 86.5, status: 'Tuntas (B)', notes: 'Konsisten & aktif dalam diskusi' },
    { rank: 4, name: 'Citra Dewi Anggraini', nisn: '0073918204', avg: 85.0, status: 'Tuntas (B)', notes: 'Perlu peningkatan di tugas mandiri' },
    { rank: 5, name: 'Farhan Maulana', nisn: '0078192041', avg: 84.4, status: 'Tuntas (B)', notes: 'Tertib presensi dan tugas praktikum' },
  ];

  const activeGrades = isIPS ? ipsGrades : mipaGrades;
  const averageScore = Math.round(
    activeGrades.reduce((acc, curr) => acc + curr.finalScore, 0) / activeGrades.length
  );

  return (
    <div className="p-3 sm:p-5 md:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider">
            Kurikulum Merdeka Fase F · {currentUser.className}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-0.5">
            e-Rapor & Transkrip Capaian Pembelajaran Siswa MIPA
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Dokumen</span>
          </button>
          <button
            onClick={() => alert('Mengunduh e-Rapor PDF resmi bertandatangan digital kepala sekolah SMAN 25...')}
            className="px-4 py-2 bg-[#0284c7] hover:bg-sky-700 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh e-Rapor PDF</span>
          </button>
        </div>
      </div>

      {/* Identity Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div>
          <span className="text-slate-400 block font-medium">{isTeacher ? 'Nama Guru / Wali Kelas:' : 'Nama Siswa:'}</span>
          <span className="font-bold text-slate-900 text-sm">{currentUser.name}</span>
        </div>
        <div>
          <span className="text-slate-400 block font-medium">{isTeacher ? 'Nomor Induk Pegawai:' : 'NISN Siswa:'}</span>
          <span className="font-bold text-slate-900 text-sm font-mono">{currentUser.nisn}</span>
        </div>
        <div>
          <span className="text-slate-400 block font-medium">Kelas / Rombel:</span>
          <span className="font-bold text-[#0284c7] text-sm">{currentUser.className}</span>
        </div>
        <div>
          <span className="text-slate-400 block font-medium">{isTeacher ? 'Status Kelulusan Kelas:' : 'Rata-Rata Nilai Akhir:'}</span>
          <span className="font-black text-emerald-600 text-sm">
            {isTeacher ? '100% Tuntas KKTP' : `${averageScore} / 100 (Predikat A)`}
          </span>
        </div>
      </div>

      {/* Table: If Teacher -> Show Ledger of All Students; If Student -> Show Detailed Subjects */}
      {isTeacher ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm">
              Rekapitulasi Ledger Nilai Siswa Binaan Kelas 11 MIPA 2
            </h3>
            <span className="text-[11px] text-slate-500">Tahun Ajaran 2024/2025</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/75 text-slate-600 border-b border-slate-200 uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3.5 pl-5">Peringkat</th>
                  <th className="p-3.5">Nama Siswa</th>
                  <th className="p-3.5">NISN</th>
                  <th className="p-3.5 text-center">Rata-Rata</th>
                  <th className="p-3.5 text-center">Status</th>
                  <th className="p-3.5 pr-5">Catatan Kemajuan Belajar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {teacherLedger.map((row) => (
                  <tr key={row.rank} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 pl-5 font-bold text-[#0284c7]">#{row.rank}</td>
                    <td className="p-3.5 font-bold text-slate-900">{row.name}</td>
                    <td className="p-3.5 font-mono text-slate-500">{row.nisn}</td>
                    <td className="p-3.5 text-center font-mono font-bold text-emerald-700">{row.avg}</td>
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
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm">
              Tabel Nilai Akhir & Capaian Kompetensi (TP) {isIPS ? 'Peminatan IPS' : 'Peminatan MIPA'}
            </h3>
            <span className="text-[11px] text-slate-500">Semester Ganjil 2024/2025</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/75 text-slate-600 border-b border-slate-200 uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3.5 pl-5">Mata Pelajaran & Guru</th>
                  <th className="p-3.5 text-center">KKTP</th>
                  <th className="p-3.5 text-center">Formatif</th>
                  <th className="p-3.5 text-center">Sumatif</th>
                  <th className="p-3.5 text-center">Nilai Akhir</th>
                  <th className="p-3.5 text-center">Predikat</th>
                  <th className="p-3.5 pr-5">Deskripsi Capaian Pembelajaran</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeGrades.map((g, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 pl-5">
                      <span className="font-bold text-slate-900 block">{g.subject}</span>
                      <span className="text-[11px] text-slate-400">{g.teacher}</span>
                    </td>
                    <td className="p-3.5 text-center font-mono text-slate-500">{g.kkm}</td>
                    <td className="p-3.5 text-center font-mono font-medium text-slate-700">{g.formatif}</td>
                    <td className="p-3.5 text-center font-mono font-medium text-slate-700">{g.sumatif}</td>
                    <td className="p-3.5 text-center font-mono font-black text-slate-900 text-sm">
                      {g.finalScore}
                    </td>
                    <td className="p-3.5 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          g.predicate === 'A'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-sky-100 text-[#0284c7]'
                        }`}
                      >
                        {g.predicate}
                      </span>
                    </td>
                    <td className="p-3.5 pr-5 text-[11px] text-slate-600 max-w-sm leading-relaxed">
                      {g.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Profil Pelajar Pancasila & Catatan Wali Kelas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-3">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Capaian Profil Pelajar Pancasila (P5)
          </h4>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-semibold text-slate-700">1. Bernalar Kritis & Analitis</span>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Sangat Berkembang (SB)
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-semibold text-slate-700">2. Gotong Royong & Kolaboratif</span>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Sangat Berkembang (SB)
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-semibold text-slate-700">3. Mandiri & Integritas Belajar</span>
              <span className="text-[10px] font-bold bg-sky-100 text-[#0284c7] px-2 py-0.5 rounded-full">
                Berkembang Sesuai Harapan (BSH)
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#0284c7]" />
              Catatan Wali Kelas SMAN 25
            </h4>
            <p className="text-xs text-slate-600 italic bg-amber-50/60 border border-amber-200/60 p-3.5 rounded-xl leading-relaxed">
              {isTeacher
                ? '"Seluruh siswa kelas 11 MIPA 2 telah menyelesaikan seluruh asesmen sumatif semester ganjil dengan predikat sangat baik dan siap melangkah ke semester genap."'
                : `"Ananda ${currentUser.name} menunjukkan daya nalar kritis yang tinggi, kepedulian sosial yang hangat, dan dedikasi belajar luar biasa. Pertahankan prestasi dan terus berkarya!"`}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">Wali Kelas:</span>
              <span className="font-bold text-slate-800">Ibu Dra. Sri Wahyuni, M.Pd</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block text-[10px]">Status:</span>
              <span className="font-bold text-emerald-600">Disahkan Digital SMAN 25</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
