import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  FileText, 
  Compass, 
  GraduationCap, 
  Award, 
  AlertCircle, 
  MessageSquare, 
  HelpCircle, 
  ShieldCheck,
  ChevronRight,
  BookOpen,
  PlusCircle
} from 'lucide-react';
import { UserProfile } from '../types';

interface CounselingSession {
  id: string;
  topic: string;
  counselor: string;
  dateStr: string;
  timeStr: string;
  location: string;
  format: 'Tatap Muka di Ruang BK' | 'Virtual Google Meet' | 'Konseling Tertutup';
  status: 'Menunggu Konfirmasi' | 'Terjadwal' | 'Selesai';
  notes?: string;
  category: 'Akademik & Nilai' | 'Karier & PTN' | 'Pribadi & Sosial' | 'Manajemen Belajar';
}

interface StudentNote {
  id: string;
  date: string;
  counselor: string;
  title: string;
  content: string;
  recommendations: string[];
  category: string;
}

interface CounselingViewProps {
  currentUser: UserProfile;
}

export const CounselingView: React.FC<CounselingViewProps> = ({ currentUser }) => {
  const [activeSubTab, setActiveSubTab] = useState<'booking' | 'jadwal' | 'catatan' | 'karir'>('booking');

  // Booking form state
  const [counselingCategory, setCounselingCategory] = useState<string>('Karier & PTN');
  const [selectedCounselor, setSelectedCounselor] = useState<string>('Drs. M. Taufik, M.Psi');
  const [counselingFormat, setCounselingFormat] = useState<'Tatap Muka di Ruang BK' | 'Virtual Google Meet' | 'Konseling Tertutup'>('Tatap Muka di Ruang BK');
  const [bookingDate, setBookingDate] = useState<string>('2026-11-17');
  const [bookingTime, setBookingTime] = useState<string>('11.20 - 12.05 WIB (Jam BK)');
  const [consultationProblem, setConsultationProblem] = useState<string>('');
  const [submitSuccessNotice, setSubmitSuccessNotice] = useState<string | null>(null);

  // Student reflection note form state
  const [isAddingPersonalNote, setIsAddingPersonalNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  // Initial Scheduled Sessions Data
  const [sessions, setSessions] = useState<CounselingSession[]>([
    {
      id: 'cs_01',
      topic: 'Konsultasi Pemilihan Jurusan SNBP: Teknik Kimia vs Farmasi UI/ITB',
      counselor: 'Drs. M. Taufik, M.Psi',
      dateStr: 'Selasa, 17 November 2026',
      timeStr: '11.20 - 12.05 WIB',
      location: 'Ruang BK SMAN 25 Lt. 2',
      format: 'Tatap Muka di Ruang BK',
      status: 'Terjadwal',
      notes: 'Bawa salinan ledger nilai rapor semester 1-3 dan sertifikat peserta OSN Kimia.',
      category: 'Karier & PTN'
    },
    {
      id: 'cs_02',
      topic: 'Rasionalisasi Nilai Rapor Semester Ganjil & Peluang Kuota Eligible 40%',
      counselor: 'Ibu Rina Anggraini, S.Pd., Kons.',
      dateStr: 'Kamis, 28 Oktober 2026',
      timeStr: '13.30 - 14.15 WIB',
      location: 'Ruang BK SMAN 25 Lt. 2',
      format: 'Tatap Muka di Ruang BK',
      status: 'Selesai',
      notes: 'Posisi peringkat paralel sains sangat aman di kuota eligible (Rank #1-3). Pertahankan konsistensi.',
      category: 'Akademik & Nilai'
    },
    {
      id: 'cs_03',
      topic: 'Manajemen Waktu: Penyelarasan Riset P5, Tugas Praktikum, & Persiapan Lomba OSN',
      counselor: 'Drs. M. Taufik, M.Psi',
      dateStr: 'Senin, 12 Oktober 2026',
      timeStr: '14.40 - 15.20 WIB',
      location: 'Virtual Google Meet',
      format: 'Virtual Google Meet',
      status: 'Selesai',
      notes: 'Gunakan teknik blok waktu Pomodoro dan skala prioritas matriks Eisenhower untuk menghindari kelelahan.',
      category: 'Manajemen Belajar'
    }
  ]);

  // Guidance notes from Counselor
  const [notesList, setNotesList] = useState<StudentNote[]>([
    {
      id: 'note_01',
      date: '28 Oktober 2026',
      counselor: 'Drs. M. Taufik, M.Psi',
      title: 'Hasil Asesmen Minat Bakat RIASEC: Tipe Investigatif-Realistik',
      category: 'Pemetaan Karir',
      content: 'Berdasarkan tes psikologi minat bakat komprehensif, Ananda Rafiandra menunjukkan skor dominan pada dimensi Investigatif (94%) dan Realistik (86%). Profil ini sangat ideal untuk studi lanjutan di rumpun sains murni, teknik rekayasa industri/kimia, atau kedokteran biomedis.',
      recommendations: [
        'Prioritaskan program studi berbasis laboratorium penelitian (Teknik Kimia, Farmasi, Ilmu Biomedis UI/ITB/UGM).',
        'Pertahankan nilai rapor mata pelajaran pendukung SNBP: Kimia Peminatan dan Matematika Lanjut (minimal 90+).',
        'Lengkapi portofolio sertifikat prestasi kejuaraan olimpiade sains dari Puspresnas/Kemendikbud.'
      ]
    },
    {
      id: 'note_02',
      date: '12 Oktober 2026',
      counselor: 'Ibu Rina Anggraini, S.Pd., Kons.',
      title: 'Strategi Manajemen Regulasi Emosi & Konsistensi Belajar',
      category: 'Kesehatan Mental & Belajar',
      content: 'Siswa memiliki determinasi tinggi dan standar perfeksionis positif. Perlu diimbangi dengan waktu relaksasi, kualitas tidur cukup (minimal 7 jam), serta komunikasi terbuka dengan orang tua mengenai target masa depan.',
      recommendations: [
        'Tetapkan target mingguan realistis tanpa mengorbankan waktu istirahat.',
        'Manfaatkan fasilitas konseling berkala tiap dua pekan untuk evaluasi perkembangan.'
      ]
    }
  ]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultationProblem.trim()) return;

    const newSession: CounselingSession = {
      id: `cs_${Date.now()}`,
      topic: consultationProblem,
      counselor: selectedCounselor,
      dateStr: bookingDate,
      timeStr: bookingTime,
      location: counselingFormat === 'Tatap Muka di Ruang BK' ? 'Ruang BK SMAN 25 Lt. 2' : 'Daring / Google Meet',
      format: counselingFormat,
      status: 'Menunggu Konfirmasi',
      notes: 'Permohonan sesi telah tercatat di sistem BK. Guru BK akan mengonfirmasi dalam waktu 1x24 jam.',
      category: counselingCategory as any
    };

    setSessions([newSession, ...sessions]);
    setConsultationProblem('');
    setSubmitSuccessNotice('Permohonan sesi konsultasi BK berhasil diajukan! Jadwal telah ditambahkan ke riwayat bimbingan Anda.');
    setTimeout(() => {
      setSubmitSuccessNotice(null);
    }, 5000);
  };

  const handleAddPersonalNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;

    const newNote: StudentNote = {
      id: `note_${Date.now()}`,
      date: 'Hari ini',
      counselor: 'Catatan Refleksi Mandiri Siswa',
      title: newNoteTitle,
      category: 'Refleksi Siswa',
      content: newNoteContent,
      recommendations: ['Diskusikan catatan refleksi ini dengan Guru BK pada sesi bimbingan berikutnya.']
    };

    setNotesList([newNote, ...notesList]);
    setNewNoteTitle('');
    setNewNoteContent('');
    setIsAddingPersonalNote(false);
  };

  return (
    <div className="p-3 sm:p-5 md:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-800 via-indigo-700 to-sky-700 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-white/10 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5 text-amber-300" />
              Layanan Bimbingan Konseling (BK) SMAN 25 Jakarta
            </span>
            <span className="text-[11px] font-semibold bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-300" />
              100% Asas Kerahasiaan Terjamin
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Konseling &amp; Perencanaan Karir Masa Depan
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
            Pusat pendampingan akademik, eksplorasi minat bakat, konsultasi psikososial, dan pemetaan strategi tembus Perguruan Tinggi Negeri (SNBP &amp; SNBT) bagi siswa Kelas XI MIPA SMAN 25 Jakarta.
          </p>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Counselor Team Quick Info Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase text-purple-700 tracking-wider block">Koordinator BK</span>
            <span className="font-bold text-xs text-slate-900 block truncate">Drs. M. Taufik, M.Psi</span>
            <span className="text-[10px] text-slate-500 block">Psikolog &amp; Konselor Saintek</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase text-indigo-700 tracking-wider block">Konselor Karir PTN</span>
            <span className="font-bold text-xs text-slate-900 block truncate">Ibu Rina Anggraini, S.Pd., Kons.</span>
            <span className="text-[10px] text-slate-500 block">Spesialisasi SNBP &amp; Portofolio</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase text-sky-700 tracking-wider block">Jadwal Kelas XI MIPA</span>
            <span className="font-bold text-xs text-slate-900 block">Selasa, 11.20 - 12.05 WIB</span>
            <span className="text-[10px] text-slate-500 block">Ruang BK Lt. 2 / R.204</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase text-emerald-700 tracking-wider block">Target Kuota SNBP</span>
            <span className="font-bold text-xs text-slate-900 block">40% Siswa Eligible</span>
            <span className="text-[10px] text-slate-500 block">SMAN 25 Akreditasi A</span>
          </div>
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-2xl text-xs font-bold overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveSubTab('booking')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeSubTab === 'booking'
              ? 'bg-white text-purple-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Ajukan Sesi Konseling</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('jadwal')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeSubTab === 'jadwal'
              ? 'bg-white text-purple-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Jadwal &amp; Riwayat Bimbingan ({sessions.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('catatan')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeSubTab === 'catatan'
              ? 'bg-white text-purple-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Buku Catatan Bimbingan ({notesList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('karir')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeSubTab === 'karir'
              ? 'bg-white text-purple-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Peta SNBP &amp; Karir Saintek</span>
        </button>
      </div>

      {/* Success Banner */}
      {submitSuccessNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center gap-3 animate-in fade-in duration-200 shadow-2xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <span className="font-bold block">Pengajuan Berhasil Terkirim!</span>
            <span className="text-emerald-700">{submitSuccessNotice}</span>
          </div>
        </div>
      )}

      {/* TAB 1: FORM PENGAJUAN SESI KONSELING */}
      {activeSubTab === 'booking' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Booking Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-5">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Formulir Pengajuan Sesi Bimbingan &amp; Konseling Pribadi
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Silakan pilih topik, jadwal, dan konselor yang diinginkan. Layanan ini bersifat konfidensial dan terbebas dari stigma.
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              
              {/* Row 1: Student Info & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nama Siswa / Rombel:</label>
                  <input
                    type="text"
                    disabled
                    value={`${currentUser.name} (${currentUser.className})`}
                    className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 font-semibold cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Topik Bimbingan:</label>
                  <select
                    value={counselingCategory}
                    onChange={(e) => setCounselingCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Karier & PTN">Karier &amp; Pemilihan Jurusan PTN (SNBP / SNBT)</option>
                    <option value="Akademik & Nilai">Akademik, Nilai Rapor &amp; Target KKTP</option>
                    <option value="Manajemen Belajar">Manajemen Waktu &amp; Mengatasi Kejenuhan Belajar</option>
                    <option value="Pribadi & Sosial">Konseling Pribadi, Sosial &amp; Adaptasi Teman Sebaya</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Counselor & Format */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pilihan Guru BK / Konselor:</label>
                  <select
                    value={selectedCounselor}
                    onChange={(e) => setSelectedCounselor(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Drs. M. Taufik, M.Psi">Drs. M. Taufik, M.Psi (Konselor Saintek &amp; Psikolog)</option>
                    <option value="Ibu Rina Anggraini, S.Pd., Kons.">Ibu Rina Anggraini, S.Pd., Kons. (Spesialis SNBP &amp; Portofolio)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Metode Pertemuan:</label>
                  <select
                    value={counselingFormat}
                    onChange={(e) => setCounselingFormat(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Tatap Muka di Ruang BK">Tatap Muka di Ruang BK SMAN 25 Lt. 2</option>
                    <option value="Virtual Google Meet">Daring via Google Meet (Tautan Privat)</option>
                    <option value="Konseling Tertutup">Konseling Tertutup Ruang Khusus</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Date & Preferred Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pilihan Hari / Tanggal:</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pilihan Waktu / Jam Konsultasi:</label>
                  <select
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="11.20 - 12.05 WIB (Jam BK Resmi)">11.20 - 12.05 WIB (Sesuai Jam BK Selasa)</option>
                    <option value="09.30 - 09.50 WIB (Jeda Istirahat I)">09.30 - 09.50 WIB (Jeda Istirahat I)</option>
                    <option value="12.05 - 12.50 WIB (Jeda ISHOMA)">12.05 - 12.50 WIB (Jeda ISHOMA Siang)</option>
                    <option value="15.10 - 15.50 WIB (Sepulang Sekolah)">15.10 - 15.50 WIB (Sepulang Sekolah)</option>
                  </select>
                </div>
              </div>

              {/* Problem Description */}
              <div>
                <label className="font-bold text-slate-700 block mb-1 text-xs">
                  Ringkasan Topik / Hal yang Ingin Didiskusikan:
                </label>
                <textarea
                  rows={3}
                  value={consultationProblem}
                  onChange={(e) => setConsultationProblem(e.target.value)}
                  placeholder="Misal: Saya ingin berkonsultasi mengenai perbandingan peluang lolos di Teknik Kimia UI vs ITB berdasarkan nilai rapor kimia dan matematika peminatan saya saat ini..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-purple-700 via-indigo-700 to-sky-700 hover:from-purple-800 hover:to-sky-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Pengajuan Sesi Bimbingan</span>
                </button>
              </div>

            </form>
          </div>

          {/* Guidelines & Rights Card */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-3xl p-5 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-purple-700" />
                <span>Asas &amp; Kode Etik Bimbingan Konseling</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                  <span><strong>Asas Kerahasiaan:</strong> Setiap informasi dan cerita yang disampaikan siswa dilindungi sepenuhnya oleh kode etik profesi konselor.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                  <span><strong>Asas Kesukarelaan:</strong> Konseling berlangsung atas kehendak siswa dan dukungan guru BK yang hangat tanpa paksaan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                  <span><strong>Asas Kemandirian:</strong> Guru BK bertindak sebagai fasilitator yang memberdayakan siswa untuk mengambil keputusan terbaik bagi masa depannya.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-2xs space-y-2">
              <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>Kapan Waktu Tepat Menemui Guru BK?</span>
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Anda tidak perlu menunggu sampai ada masalah besar. Bimbingan konseling di SMAN 25 terbuka lebar untuk eksplorasi cita-cita, perancangan karir, peningkatan konsentrasi belajar, hingga sekadar teman diskusi yang aman dan suportif.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: JADWAL & RIWAYAT SESI KONSELING */}
      {activeSubTab === 'jadwal' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Jadwal &amp; Riwayat Bimbingan Konseling Siswa
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Daftar janji temu konsultasi akademik, karir, dan bimbingan pribadi yang terdaftar.
              </p>
            </div>
            <button
              onClick={() => setActiveSubTab('booking')}
              className="px-3.5 py-2 bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Tambah Sesi Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sessions.map((session) => {
              const isScheduled = session.status === 'Terjadwal';
              const isWaiting = session.status === 'Menunggu Konfirmasi';

              return (
                <div
                  key={session.id}
                  className={`p-5 rounded-3xl border transition-all space-y-3 bg-white ${
                    isScheduled
                      ? 'border-purple-300 shadow-sm ring-2 ring-purple-100'
                      : isWaiting
                      ? 'border-amber-300 bg-amber-50/20 shadow-2xs'
                      : 'border-slate-200/90 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
                      {session.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isScheduled
                          ? 'bg-purple-100 text-purple-900 animate-pulse font-extrabold'
                          : isWaiting
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {session.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm leading-snug">
                      {session.topic}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Konselor: <strong className="text-slate-800">{session.counselor}</strong></span>
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span className="truncate">{session.dateStr}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span className="truncate">{session.timeStr}</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2">
                      <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>{session.location} ({session.format})</span>
                    </div>
                  </div>

                  {session.notes && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-600">
                      <strong className="text-slate-800 block mb-0.5">Catatan Bimbingan:</strong>
                      {session.notes}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: BUKU CATATAN BIMBINGAN PRIBADI */}
      {activeSubTab === 'catatan' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Buku Catatan Perkembangan &amp; Hasil Konseling Siswa
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Dokumentasi asesmen psikologi, riwayat rekomendasi Guru BK, serta lembar refleksi pribadi.
              </p>
            </div>
            <button
              onClick={() => setIsAddingPersonalNote(!isAddingPersonalNote)}
              className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto border border-indigo-200"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{isAddingPersonalNote ? 'Tutup Form' : 'Tulis Refleksi Siswa'}</span>
            </button>
          </div>

          {/* Form Refleksi Mandiri Siswa */}
          {isAddingPersonalNote && (
            <form onSubmit={handleAddPersonalNote} className="bg-white p-5 rounded-3xl border border-indigo-200 shadow-sm space-y-3">
              <h4 className="font-bold text-xs text-indigo-900 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-700" />
                <span>Tambahkan Catatan Refleksi Mandiri Siswa</span>
              </h4>
              <div className="space-y-2 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Judul Refleksi / Target Belajar:</label>
                  <input
                    type="text"
                    placeholder="Misal: Evaluasi Try Out UTBK &amp; Target Peningkatan Fisika"
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Isi Catatan &amp; Perasaan Belajar:</label>
                  <textarea
                    rows={3}
                    placeholder="Tuliskan pengalaman belajar minggu ini, tantangan yang dihadapi, atau ide karir yang ingin didiskusikan..."
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Simpan ke Buku Catatan</span>
              </button>
            </form>
          )}

          {/* List of Notes */}
          <div className="space-y-4">
            {notesList.map((note) => (
              <div key={note.id} className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-purple-700 tracking-wider bg-purple-50 px-2 py-0.5 rounded">
                      {note.category}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">
                      {note.title}
                    </h4>
                  </div>
                  <div className="text-right text-[11px] text-slate-500">
                    <span>{note.date} · Oleh {note.counselor}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {note.content}
                </p>

                {note.recommendations && note.recommendations.length > 0 && (
                  <div className="bg-purple-50/60 border border-purple-100 rounded-2xl p-3.5 space-y-1.5">
                    <span className="text-[11px] font-bold text-purple-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      Rekomendasi Tindak Lanjut Guru BK:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {note.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PETA JALAN SNBP & KARIR SAINTEK */}
      {activeSubTab === 'karir' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Peta Jalan Strategi Masuk PTN Rumpun Sains &amp; Teknologi (2026/2027)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Panduan resmi BK SMAN 25 Jakarta dalam mempersiapkan kuota eligible SNBP dan penguasaan subtes tes SNBT.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              
              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-2">
                <span className="font-bold text-sky-900 block text-sm">1. Jalur SNBP (Prestasi Rapor)</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Berdasarkan akreditasi A SMAN 25, kuota siswa eligible adalah <strong>40% terbaik</strong> dari seluruh siswa kelas 11 MIPA.
                </p>
                <div className="p-2.5 bg-white rounded-xl border border-sky-100 text-[11px] text-sky-800 font-semibold space-y-1">
                  <div>• Mapel Kunci: Kimia Peminatan, Fisika, Mat. Lanjut</div>
                  <div>• Konsistensi Tren Nilai: Semester 1 s.d. 5</div>
                  <div>• Sertifikat Juara OSN / LKTI Puspresnas</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2">
                <span className="font-bold text-indigo-900 block text-sm">2. Jalur SNBT (UTBK Skolastik)</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Fokus pada tes penalaran kognitif tanpa hafalan rumus mata pelajaran khusus:
                </p>
                <div className="p-2.5 bg-white rounded-xl border border-indigo-100 text-[11px] text-indigo-800 font-semibold space-y-1">
                  <div>• Tes Potensi Skolastik (TPS)</div>
                  <div>• Literasi Bahasa Indonesia &amp; Inggris</div>
                  <div>• Penalaran Matematika Kontekstual</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2">
                <span className="font-bold text-purple-900 block text-sm">3. Jalur Mandiri &amp; Kedinasan</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Alternatif strategis menggunakan nilai UTBK atau ujian mandiri perguruan tinggi terkemuka:
                </p>
                <div className="p-2.5 bg-white rounded-xl border border-purple-100 text-[11px] text-purple-800 font-semibold space-y-1">
                  <div>• SIMAK UI / UTUL UGM / SMUP Unpad</div>
                  <div>• Sekolah Kedinasan (STIS, STIN, STAN)</div>
                  <div>• Program Beasiswa Indonesia Maju (BIM)</div>
                </div>
              </div>

            </div>

            <div className="p-4 bg-gradient-to-r from-purple-100/60 to-indigo-100/60 rounded-2xl border border-purple-200 text-xs text-purple-900 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="font-bold text-sm block">Ingin Konsultasi Khusus Pemilihan Jurusan &amp; Kampus?</span>
                <span className="text-[11px] text-purple-800">Diskusikan bersama Guru BK untuk analisa peluang dan kecocokan nilai rapor Anda.</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveSubTab('booking')}
                className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl transition-all text-xs shrink-0 cursor-pointer shadow-xs"
              >
                Ajukan Sesi Konsultasi PTN
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
