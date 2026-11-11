import React, { useState, useEffect } from 'react';
import { 
  X, 
  Compass, 
  Leaf, 
  Users, 
  Target, 
  Calendar, 
  PlusCircle, 
  CheckCircle2, 
  Check, 
  Sparkles, 
  FileText, 
  Clock, 
  User, 
  Award, 
  ChevronRight, 
  Lightbulb, 
  Layers, 
  Printer, 
  Download, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Send, 
  TrendingUp, 
  AlertCircle,
  HelpCircle,
  MapPin,
  Share2
} from 'lucide-react';
import { ModulAjarData } from '../types';

interface LogbookEntry {
  id: string;
  date: string;
  phase: string;
  activity: string;
  pic: string;
  notes: string;
  progressPercent: number;
  status: 'Terverifikasi Fasilitator' | 'Menunggu Review';
}

interface P5ProjectModalProps {
  modul: ModulAjarData;
  onClose: () => void;
}

export const P5ProjectModal: React.FC<P5ProjectModalProps> = ({
  modul,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'panduan' | 'dimensi' | 'logbook' | 'rubrik'>('panduan');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  // Initial Real Logbook Entries for Group 3 (XI MIPA)
  const [logbookEntries, setLogbookEntries] = useState<LogbookEntry[]>([
    {
      id: 'log_1',
      date: '24 Oktober 2026',
      phase: 'Fase 1: Pengenalan',
      activity: 'Audit timbulan limbah kantin sekolah & identifikasi komposisi sampah organik harian',
      pic: 'Rafiandra Putra (Ketua) & Dimas Pratama',
      notes: 'Rata-rata sampah sisa makanan kantin mencapai 15.2 kg/hari. Didominasi sisa sayur dan kulit buah yang sangat sesuai untuk fermentasi pupuk cair.',
      progressPercent: 25,
      status: 'Terverifikasi Fasilitator'
    },
    {
      id: 'log_2',
      date: '31 Oktober 2026',
      phase: 'Fase 2: Kontekstualisasi',
      activity: 'Uji laju resapan air tanah (infiltrasi) di 5 zona taman & pemetaan titik biopori',
      pic: 'Citra Dewi & Rafiandra Putra',
      notes: 'Laju infiltrasi awal 12 mm/jam di zona barat. Direkomendasikan pemasangan 30 titik lubang biopori sedalam 100 cm dengan jarak 2 meter antar lubang.',
      progressPercent: 50,
      status: 'Terverifikasi Fasilitator'
    },
    {
      id: 'log_3',
      date: '07 November 2026',
      phase: 'Fase 3: Aksi Nyata',
      activity: 'Pengeboran lubang biopori dan fabrikasi saringan penutup pipa dari tutup plastik daur ulang',
      pic: 'Farhan Maulana & Seluruh Tim',
      notes: '10 lubang biopori pertama selesai dibor dan dipasang pipa PVC berpori. Telah diisi serasah daun kering dan larutan bioaktivator EM4.',
      progressPercent: 80,
      status: 'Terverifikasi Fasilitator'
    }
  ]);

  // Form state for adding new daily entry
  const [newDate, setNewDate] = useState('11 November 2026');
  const [newPhase, setNewPhase] = useState('Fase 3: Aksi Nyata');
  const [newActivity, setNewActivity] = useState('');
  const [newPic, setNewPic] = useState('Rafiandra Putra Dewa');
  const [newNotes, setNewNotes] = useState('');
  const [newProgress, setNewProgress] = useState(85);
  const [entryToast, setEntryToast] = useState(false);

  // Handle SpeechSynthesis
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Fitur narasi suara tidak didukung browser ini.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const narrative = `Panduan Projek Penguatan Profil Pelajar Pancasila SMAN 25 Jakarta. Tema: Gaya Hidup Berkelanjutan. Judul: Inovasi Eco-School dan Pengolahan Sirkular SMAN 25 Jakarta. Alokasi 72 Jam Pelajaran. Tujuan utama projek adalah membangun kesadaran mitigasi iklim, melatih kerja kolaboratif gotong royong, nalar kritis, dan inovasi kreatif ramah lingkungan.`;
    const utterance = new SpeechSynthesisUtterance(narrative);
    utterance.lang = 'id-ID';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleDownloadPDF = () => {
    setDownloadNotice('Mengunduh Buku Panduan Resmi Projek P5 (Inovasi Eco-School) SMAN 25 Jakarta...');
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  const handleSaveLogbook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivity.trim()) return;

    const newEntry: LogbookEntry = {
      id: `log_${Date.now()}`,
      date: newDate,
      phase: newPhase,
      activity: newActivity.trim(),
      pic: newPic.trim() || 'Anggota Kelompok 3',
      notes: newNotes.trim() || 'Aktivitas aksi lapangan berjalan lancar sesuai rencana kerja tim.',
      progressPercent: Math.min(100, Math.max(0, Number(newProgress))),
      status: 'Menunggu Review'
    };

    setLogbookEntries([newEntry, ...logbookEntries]);
    setNewActivity('');
    setNewNotes('');
    setEntryToast(true);
    setTimeout(() => setEntryToast(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh] border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Header Bar: P5 Specific Emerald Gradient */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-950 text-white px-5 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3 shadow-md shrink-0">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-400/20 text-emerald-200 border border-emerald-300/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <Leaf className="w-3 h-3" />
                <span>Panduan Projek P5 Kokurikuler</span>
              </span>
              <span className="text-xs text-emerald-100 font-medium">Tema: Gaya Hidup Berkelanjutan</span>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-2xs">
                72 JP Blok Terpadu · Fase F
              </span>
            </div>
            <h3 className="text-base sm:text-xl font-black text-white tracking-tight mt-0.5">
              Inovasi Eco-School &amp; Pengolahan Sirkular SMAN 25 Jakarta
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Voice Narrator */}
            <button
              onClick={toggleSpeech}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                isSpeaking 
                  ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse' 
                  : 'bg-white/15 hover:bg-white/25 text-white'
              }`}
              title={isSpeaking ? 'Hentikan Narasi Audio' : 'Dengarkan Ringkasan Panduan Projek'}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Hentikan Suara</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Dengarkan Audio</span>
                </>
              )}
            </button>

            {/* Print Action */}
            <button
              onClick={() => window.print()}
              className="hidden sm:flex px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              title="Cetak Panduan Projek P5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak</span>
            </button>

            {/* Download PDF Option */}
            <button
              onClick={handleDownloadPDF}
              className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              title="Simpan Berkas Panduan P5 PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Unduh PDF</span>
            </button>

            {/* Close Modal Button */}
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/20 rounded-xl text-white transition-colors cursor-pointer ml-1"
              title="Tutup Modal Panduan Projek"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Download Alert Toast */}
        {downloadNotice && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2.5 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">{downloadNotice}</span>
          </div>
        )}

        {/* Navigation Tabs Bar: P5 Specific (NO Academic Quiz/Theory!) */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-2 flex items-center justify-between gap-3 overflow-x-auto text-xs font-bold shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('panduan')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'panduan'
                  ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              <span>Panduan &amp; Alur Tahapan</span>
            </button>

            <button
              onClick={() => setActiveTab('dimensi')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'dimensi'
                  ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Target className="w-3.5 h-3.5 text-emerald-600" />
              <span>Target Dimensi Profil</span>
            </button>

            <button
              onClick={() => setActiveTab('logbook')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'logbook'
                  ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              <span>Logbook &amp; Jurnal Kelompok</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full">
                {logbookEntries.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('rubrik')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'rubrik'
                  ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Rubrik Penilaian Fasilitator</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: PANDUAN & ALUR TAHAPAN */}
          {activeTab === 'panduan' && (
            <div className="space-y-6">
              {/* Identitas Projek Banner */}
              <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-white rounded-2xl p-5 border border-emerald-200/80 shadow-2xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-emerald-600 text-white shadow-2xs">
                      <Leaf className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                        Identitas Projek Kurikulum Merdeka
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                        Inovasi Eco-School &amp; Pengolahan Sirkular SMAN 25 Jakarta
                      </h4>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-xl">
                    Tema: Gaya Hidup Berkelanjutan
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-emerald-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Satuan Pendidikan:</span>
                    <span className="font-bold text-slate-800">SMAN 25 Jakarta (NPSN 20107297)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Fase &amp; Sasaran:</span>
                    <span className="font-bold text-slate-800">Fase F · Kelas XI MIPA</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Alokasi Waktu:</span>
                    <span className="font-bold text-slate-800">72 Jam Pelajaran (JP)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Koordinator Projek:</span>
                    <span className="font-bold text-slate-800">Dra. Nurhayati, M.M.</span>
                  </div>
                </div>
              </div>

              {/* Deskripsi Singkat & Tujuan Projek */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
                  <h5 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    Deskripsi Singkat Projek
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed text-justify">
                    Projek ini mengajak peserta didik Fase F memahami bahwa tindakan keseharian di sekolah memiliki dampak jangka panjang terhadap stabilitas ekosistem bumi. Melalui penerapan prinsip <span className="font-bold text-emerald-800">Circular Economy</span> (ekonomi sirkular), siswa mentransformasi sampah organik kantin menjadi pupuk kompos bernilai guna serta memasang 30 titik lubang resapan biopori di area resapan air SMAN 25 Jakarta guna mencegah genangan dan menyuburkan tanah sekolah.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
                  <h5 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Target className="w-4 h-4 text-emerald-600" />
                    Tujuan Utama Projek
                  </h5>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside leading-relaxed">
                    <li>Membangun kesadaran kritis terhadap dampak emisi jejak karbon (<span className="italic">carbon footprint</span>).</li>
                    <li>Melatih kolaborasi <span className="font-bold text-slate-800">Gotong Royong</span> dalam pembagian peran kerja tim di lapangan.</li>
                    <li>Mengasah daya <span className="font-bold text-slate-800">Bernalar Kritis</span> melalui audit sampah dan uji infiltrasi resapan air tanah.</li>
                    <li>Mendorong <span className="font-bold text-slate-800">Kreativitas</span> inovasi tutup biopori berpori dari limbah plastik daur ulang.</li>
                  </ul>
                </div>
              </div>

              {/* Alur 4 Tahapan Projek P5 */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-600" />
                      Alur 4 Tahapan Pelaksanaan Projek (72 JP)
                    </h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Struktur tahapan Kurikulum Merdeka Fase F dari pengenalan hingga refleksi tindak lanjut.
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    4 Tahap Berkesinambungan
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
                  {/* Tahap 1: Pengenalan */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition-all space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[10px]">
                        Tahap 1 · 18 JP
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Minggu 1 - 3</span>
                    </div>
                    <h6 className="font-bold text-slate-900 text-xs">Fase Pengenalan (Eksplorasi Isu Global)</h6>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Siswa mengeksplorasi isu krisis iklim global, menakar emisi jejak karbon harian sekolah, serta menganalisis dampak sampah organik yang membusuk di TPA menghasilkan gas metana (CH₄).
                    </p>
                    <div className="text-[10px] text-emerald-700 font-semibold bg-white p-2 rounded-lg border border-slate-200">
                      🎯 Luaran: Peta konsep jejak karbon &amp; lembar komitmen kelompok.
                    </div>
                  </div>

                  {/* Tahap 2: Kontekstualisasi */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition-all space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-lg text-[10px]">
                        Tahap 2 · 18 JP
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Minggu 4 - 6</span>
                    </div>
                    <h6 className="font-bold text-slate-900 text-xs">Fase Kontekstualisasi (Audit &amp; Desain)</h6>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Melakukan audit kuantitatif timbulan sampah kantin (kg/hari), menguji laju infiltrasi air tanah di 5 titik taman SMAN 25, dan merancang denah sebaran 30 titik lubang resapan biopori.
                    </p>
                    <div className="text-[10px] text-emerald-700 font-semibold bg-white p-2 rounded-lg border border-slate-200">
                      🎯 Luaran: Matriks audit sampah &amp; denah titik biopori kampus.
                    </div>
                  </div>

                  {/* Tahap 3: Aksi Nyata */}
                  <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 hover:border-emerald-400 transition-all space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white bg-emerald-600 px-2 py-0.5 rounded-lg text-[10px]">
                        Tahap 3 · 24 JP (Sedang Berjalan)
                      </span>
                      <span className="text-[10px] text-emerald-700 font-mono font-bold">Minggu 7 - 10</span>
                    </div>
                    <h6 className="font-bold text-emerald-950 text-xs">Fase Aksi Nyata (Instalasi &amp; Fabrikasi)</h6>
                    <p className="text-[11px] text-slate-700 leading-relaxed">
                      Pengeboran 30 lubang biopori sedalam 100 cm, perakitan komposter drum aerobik bioaktivator EM4, fabrikasi tutup pipa dari limbah plastik daur ulang, dan pengisian rutin serasah daun.
                    </p>
                    <div className="text-[10px] text-emerald-800 font-semibold bg-white p-2 rounded-lg border border-emerald-200">
                      🎯 Luaran: 30 titik lubang biopori aktif, 1 unit komposter POC, dan logbook tim.
                    </div>
                  </div>

                  {/* Tahap 4: Refleksi & Tindak Lanjut */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition-all space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded-lg text-[10px]">
                        Tahap 4 · 12 JP
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Minggu 11 - 12</span>
                    </div>
                    <h6 className="font-bold text-slate-900 text-xs">Fase Refleksi &amp; Gelar Karya (Exhibition)</h6>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Pemanenan Pupuk Organik Cair (POC), evaluasi daya serap air tanah pasca hujan, pameran stan inovasi lingkungan (Gelar Karya P5) di hadapan warga sekolah, dan rekomendasi Eco-School.
                    </p>
                    <div className="text-[10px] text-slate-700 font-semibold bg-white p-2 rounded-lg border border-slate-200">
                      🎯 Luaran: Gelar Karya Expo, pupuk organik kemasan, &amp; portofolio akhir.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TARGET DIMENSI PROFIL PELAJAR PANCASILA */}
          {activeTab === 'dimensi' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                <h5 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  Pemetaan 3 Dimensi Utama Karakter Pelajar Pancasila (Fase F)
                </h5>
                <p className="text-xs text-slate-500">
                  Fokus pengembangan karakter peserta didik sepanjang pelaksanaan Projek Gaya Hidup Berkelanjutan SMAN 25.
                </p>
              </div>

              {/* 3 Dimensi Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* 1. Gotong Royong */}
                <div className="p-5 rounded-2xl bg-white border border-emerald-200 shadow-2xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                        Dimensi 1 (Prioritas)
                      </span>
                      <h5 className="font-extrabold text-slate-900 text-sm">Gotong Royong</h5>
                    </div>
                    <div className="space-y-1 text-[11px] text-slate-600 leading-relaxed">
                      <p><span className="font-bold text-slate-800">Elemen:</span> Kolaborasi &amp; Kepedulian</p>
                      <p><span className="font-bold text-slate-800">Sub-Elemen:</span> Kerjasama Tim, Koordinasi Pembagian Tugas, &amp; Tanggap Sosial</p>
                      <p className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-700 mt-2">
                        <span className="font-bold block text-emerald-900 mb-0.5">Target Capaian Fase F:</span>
                        Membangun tim kerja yang kompak, menyelaraskan peran anggota tim, saling menghargai pendapat, dan tanggap membantu rekan saat kendala pengeboran biopori di lapangan.
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">Predikat Target:</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                      Sangat Berkembang (SAB)
                    </span>
                  </div>
                </div>

                {/* 2. Bernalar Kritis */}
                <div className="p-5 rounded-2xl bg-white border border-sky-200 shadow-2xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0284c7] flex items-center justify-center font-bold">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-wider block">
                        Dimensi 2 (Prioritas)
                      </span>
                      <h5 className="font-extrabold text-slate-900 text-sm">Bernalar Kritis</h5>
                    </div>
                    <div className="space-y-1 text-[11px] text-slate-600 leading-relaxed">
                      <p><span className="font-bold text-slate-800">Elemen:</span> Memperoleh &amp; Memproses Informasi</p>
                      <p><span className="font-bold text-slate-800">Sub-Elemen:</span> Mengidentifikasi, Mengklarifikasi, dan Menganalisis Informasi Ilmiah</p>
                      <p className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-700 mt-2">
                        <span className="font-bold block text-[#0284c7] mb-0.5">Target Capaian Fase F:</span>
                        Secara analitis mengolah data kuantitatif sampah kantin, menguji laju resapan air menggunakan metode saintifik, dan menarik simpulan berbasis bukti empiris.
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">Predikat Target:</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                      Sangat Berkembang (SAB)
                    </span>
                  </div>
                </div>

                {/* 3. Kreatif */}
                <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
                        Dimensi 3 (Prioritas)
                      </span>
                      <h5 className="font-extrabold text-slate-900 text-sm">Kreatif</h5>
                    </div>
                    <div className="space-y-1 text-[11px] text-slate-600 leading-relaxed">
                      <p><span className="font-bold text-slate-800">Elemen:</span> Menghasilkan Gagasan &amp; Karya Orisinal</p>
                      <p><span className="font-bold text-slate-800">Sub-Elemen:</span> Menghasilkan Solusi Alternatif &amp; Desain Tepat Guna</p>
                      <p className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-700 mt-2">
                        <span className="font-bold block text-amber-800 mb-0.5">Target Capaian Fase F:</span>
                        Merancang prototipe penutup pipa biopori ramah lingkungan dari limbah tutup ember bekas dengan ventilasi sirkulasi udara optimal dan kemasan pupuk POC estetik.
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">Predikat Target:</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-[#0284c7] font-bold">
                      Berkembang Sesuai Harapan (BSH)
                    </span>
                  </div>
                </div>
              </div>

              {/* Rubrik Penilaian Sikap Standar Kemendikbud */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3 text-xs">
                <h5 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Kriteria Penilaian Sikap &amp; Karakter (Kemendikbudristek)
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-700 block">MB (Mulai Berkembang)</span>
                    <p className="text-slate-500 text-[10px]">Menunjukkan keterlibatan awal dengan bimbingan fasilitator penuh.</p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
                    <span className="font-bold text-amber-800 block">SB (Sedang Berkembang)</span>
                    <p className="text-amber-800/80 text-[10px]">Mampu menerapkan nilai dimensi secara berkala dengan arahan guru.</p>
                  </div>
                  <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 space-y-1">
                    <span className="font-bold text-[#0284c7] block">BSH (Berkembang Sesuai Harapan)</span>
                    <p className="text-sky-800/80 text-[10px]">Mencapai kriteria Fase F secara mandiri, konsisten, dan bertanggung jawab.</p>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                    <span className="font-bold text-emerald-800 block">SAB (Sangat Berkembang)</span>
                    <p className="text-emerald-800/80 text-[10px]">Melampaui kriteria Fase F dan mampu menginspirasi rekan sekelompok.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LOGBOOK & JURNAL KELOMPOK */}
          {activeTab === 'logbook' && (
            <div className="space-y-6">
              
              {/* Group Identity Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-950 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 px-2 py-0.5 rounded">
                      Kelompok 3 · Fase F XI MIPA
                    </span>
                    <span className="text-xs text-emerald-200 font-mono">Fasilitator: Ir. Ahmad Zulkarnain, S.Pd</span>
                  </div>
                  <h4 className="font-black text-lg text-white">
                    Sub-Tim Biopori Resapan &amp; Komposter Organik Kantin
                  </h4>
                  <p className="text-xs text-emerald-100/80 flex flex-wrap gap-2 pt-1">
                    <span>Anggota: Rafiandra Putra (Ketua)</span>
                    <span>· Citra Dewi</span>
                    <span>· Dimas Pratama</span>
                    <span>· Farhan Maulana</span>
                  </p>
                </div>

                <div className="bg-white/10 p-3 rounded-xl border border-white/15 text-center shrink-0">
                  <span className="text-[10px] text-emerald-200 block">Progres Tim:</span>
                  <span className="text-2xl font-black text-emerald-300">80%</span>
                  <span className="text-[10px] text-white/80 block mt-0.5">Fase Aksi Nyata</span>
                </div>
              </div>

              {/* Form Tambah Catatan Progres Harian */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h5 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <PlusCircle className="w-4 h-4 text-emerald-600" />
                    Tambah Catatan Logbook / Jurnal Progres Aktivitas
                  </h5>
                  <span className="text-[10px] text-slate-400 font-medium">Input langsung tercatat di rekapitulasi tim</span>
                </div>

                {entryToast && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold">Catatan logbook berhasil disimpan dan diteruskan ke Fasilitator P5!</span>
                  </div>
                )}

                <form onSubmit={handleSaveLogbook} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Tanggal Kegiatan:</label>
                    <input
                      type="text"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      placeholder="Contoh: 11 November 2026"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Tahapan Projek:</label>
                    <select
                      value={newPhase}
                      onChange={(e) => setNewPhase(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                    >
                      <option value="Fase 1: Pengenalan">Fase 1: Pengenalan (Eksplorasi Isu)</option>
                      <option value="Fase 2: Kontekstualisasi">Fase 2: Kontekstualisasi (Audit &amp; Desain)</option>
                      <option value="Fase 3: Aksi Nyata">Fase 3: Aksi Nyata (Instalasi Biopori &amp; Komposter)</option>
                      <option value="Fase 4: Refleksi & Tindak Lanjut">Fase 4: Refleksi &amp; Gelar Karya Expo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Anggota Bertugas (PIC):</label>
                    <input
                      type="text"
                      value={newPic}
                      onChange={(e) => setNewPic(e.target.value)}
                      placeholder="Nama anggota yang memimpin/bertugas"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Capaian Progres Tahapan (%):</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={newProgress}
                        onChange={(e) => setNewProgress(Number(e.target.value))}
                        className="flex-1 accent-emerald-600 cursor-pointer"
                      />
                      <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                        {newProgress}%
                      </span>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-600 font-bold mb-1">Deskripsi Aktivitas Tim:</label>
                    <input
                      type="text"
                      value={newActivity}
                      onChange={(e) => setNewActivity(e.target.value)}
                      placeholder="Contoh: Pengeboran 5 lubang biopori di zona taman belakang perpustakaan..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-600 font-bold mb-1">Catatan Lapangan &amp; Kendala yang Dihadapi:</label>
                    <textarea
                      value={newNotes}
                      onChange={(e) => setNewNotes(e.target.value)}
                      rows={2}
                      placeholder="Tuliskan kendala tanah berbatu, laju resapan air, atau kebutuhan bioaktivator tambahan..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                    />
                  </div>

                  <div className="sm:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer active:scale-95"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Simpan Catatan Logbook</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Daftar Riwayat Jurnal Logbook Kelompok */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h5 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    Riwayat Jurnal Aktivitas Kelompok ({logbookEntries.length} Entri)
                  </h5>
                  <span className="text-[11px] text-slate-500">Tersinkronisasi dengan fasilitator</span>
                </div>

                <div className="space-y-3">
                  {logbookEntries.map((log) => (
                    <div 
                      key={log.id} 
                      className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-all space-y-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded text-[10px]">
                            {log.date}
                          </span>
                          <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[10px]">
                            {log.phase}
                          </span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          log.status === 'Terverifikasi Fasilitator'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{log.status}</span>
                        </span>
                      </div>

                      <h6 className="font-bold text-slate-900 text-xs">{log.activity}</h6>

                      <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 text-[11px] text-slate-600 space-y-1">
                        <p><span className="font-semibold text-slate-800">Catatan &amp; Kendala:</span> {log.notes}</p>
                        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                          <span>PIC Bertugas: <strong className="text-slate-700">{log.pic}</strong></span>
                          <span>Progres: <strong className="text-emerald-700">{log.progressPercent}%</strong></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lembar Kerja Projek (LKPD P5 Kolaboratif) */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h5 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-600" />
                    Panduan Teknis Lembar Kerja Projek (LKPD Biopori &amp; Komposter)
                  </h5>
                  <span className="text-[10px] font-bold bg-sky-100 text-[#0284c7] px-2.5 py-0.5 rounded-full">
                    SOP Teknis
                  </span>
                </div>

                <div className="space-y-2 text-[11px] text-slate-600 leading-relaxed">
                  <p className="font-semibold text-slate-800">Langkah Operasional Pengeboran &amp; Pembuatan Biopori:</p>
                  <ol className="list-decimal list-inside space-y-1 pl-1">
                    <li>Siram tanah target dengan air agar gembur dan mudah dibor menggunakan bor tanah manual.</li>
                    <li>Bor lubang tegak lurus hingga kedalaman 80 – 100 cm dengan diameter 10 – 12 cm.</li>
                    <li>Masukkan pipa PVC berpori yang telah dilubangi secara merata ke dalam lubang tanah.</li>
                    <li>Masukkan sampah organik daun kering kantin secara bertahap dan basahi dengan 50 mL larutan bioaktivator EM4.</li>
                    <li>Pasang penutup pipa berpori hasil daur ulang dan catat koordinat lokasi lubang di denah taman.</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: RUBRIK PENILAIAN FASILITATOR */}
          {activeTab === 'rubrik' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1 text-xs">
                <h5 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Rubrik Penilaian Sikap &amp; Kinerja Kelompok dari Fasilitator P5
                </h5>
                <p className="text-slate-500">
                  Evaluasi autentik proses kerja kolaboratif kelompok berdasarkan observasi berkala di lapangan.
                </p>
              </div>

              {/* Rubrik Matriks Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden text-xs">
                <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-800">Matriks Asesmen Sikap Siswa Kelas XI MIPA (Kelompok 3)</span>
                  <span className="font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded text-[11px]">
                    Predikat Akhir: Sangat Berkembang (SAB)
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-600 uppercase font-bold text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="p-3 pl-4">Dimensi &amp; Indikator Sikap</th>
                        <th className="p-3 text-center">Bobot</th>
                        <th className="p-3 text-center">Capaian Predikat</th>
                        <th className="p-3 pr-4">Catatan Umpan Balik Fasilitator</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 pl-4 space-y-0.5">
                          <span className="font-bold text-slate-900 block">1. Gotong Royong (Kolaborasi)</span>
                          <span className="text-[11px] text-slate-500">Kerjasama tim, pembagian beban kerja adil, dan komunikasi solutif.</span>
                        </td>
                        <td className="p-3 text-center font-mono font-bold text-slate-600">35%</td>
                        <td className="p-3 text-center">
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            Sangat Berkembang (SAB)
                          </span>
                        </td>
                        <td className="p-3 pr-4 text-slate-600 text-[11px]">
                          Pembagian peran kerja sangat solid. Seluruh anggota kompak saat proses pengeboran biopori tanah.
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 pl-4 space-y-0.5">
                          <span className="font-bold text-slate-900 block">2. Bernalar Kritis (Analisis Lapangan)</span>
                          <span className="text-[11px] text-slate-500">Akurasi data timbulan sampah, uji infiltrasi tanah, dan validitas logbook.</span>
                        </td>
                        <td className="p-3 text-center font-mono font-bold text-slate-600">35%</td>
                        <td className="p-3 text-center">
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            Sangat Berkembang (SAB)
                          </span>
                        </td>
                        <td className="p-3 pr-4 text-slate-600 text-[11px]">
                          Pencatatan data laju resapan air sangat rapi dan logbook diisi secara berkala tanpa terlambat.
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 pl-4 space-y-0.5">
                          <span className="font-bold text-slate-900 block">3. Kreatif (Inovasi Tepat Guna)</span>
                          <span className="text-[11px] text-slate-500">Orisinalitas desain tutup biopori ramah lingkungan &amp; kemasan pupuk.</span>
                        </td>
                        <td className="p-3 text-center font-mono font-bold text-slate-600">30%</td>
                        <td className="p-3 text-center">
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-sky-100 text-[#0284c7] font-bold text-[10px]">
                            Berkembang Sesuai Harapan (BSH)
                          </span>
                        </td>
                        <td className="p-3 pr-4 text-slate-600 text-[11px]">
                          Inovasi modifikasi penutup dari ember cat bekas sangat aplikatif dan rapi.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Catatan Verifikasi Fasilitator */}
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 shadow-2xs space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-950 text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Catatan Kemajuan dari Fasilitator Utama P5
                  </span>
                  <span className="text-[10px] text-emerald-700 font-mono">Verifikasi: 09 Nov 2026</span>
                </div>
                <p className="text-slate-700 italic leading-relaxed text-[11px]">
                  "Kelompok 3 menunjukkan dedikasi dan keteladanan yang sangat memuaskan sepanjang fase Aksi Nyata. Partisipasi seluruh anggota seimbang, tidak ada ketimpangan beban kerja, dan hasil uji coba komposter pupuk cair berhasil difermentasi dengan baik tanpa aroma menyengat. Siapkan dokumentasi video dan infografis untuk Gelar Karya Ekspo P5 SMAN 25 Jakarta."
                </p>
                <div className="pt-2 border-t border-emerald-200 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Guru Fasilitator P5 Kelas XI: <strong className="text-slate-800">Ir. Ahmad Zulkarnain, S.Pd</strong></span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Disahkan Tim P5 SMAN 25
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-slate-600">Panduan Kokurikuler Kurikulum Merdeka Fase F · SMAN 25 Jakarta</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition-colors cursor-pointer active:scale-95 shadow-xs"
          >
            Tutup Panduan Projek
          </button>
        </div>

      </div>
    </div>
  );
};
