import React, { useState, useEffect } from 'react';
import { 
  X, 
  BookOpen, 
  Download, 
  CheckCircle2, 
  Check, 
  Sparkles, 
  FlaskConical, 
  FileText, 
  HelpCircle, 
  Clock, 
  User, 
  Award,
  ChevronRight,
  Lightbulb,
  Layers,
  ArrowRight,
  GraduationCap,
  Bookmark,
  Printer,
  Volume2,
  VolumeX,
  Copy,
  ZoomIn,
  ZoomOut,
  Maximize2
} from 'lucide-react';
import { ModulAjarData } from '../types';
import { P5ProjectModal } from './P5ProjectModal';

interface ModulAjarModalProps {
  modul: ModulAjarData;
  onClose: () => void;
  onOpenSimulation?: (simType: 'titrasi_kimia' | 'fisika_newton') => void;
}

export const ModulAjarModal: React.FC<ModulAjarModalProps> = ({
  modul,
  onClose,
  onOpenSimulation,
}) => {
  // If this is Projek Penguatan Profil Pelajar Pancasila (P5), route to specialized P5 project modal
  const isP5 = 
    modul.id === 'modul_p5' || 
    modul.subject?.toLowerCase().includes('p5') || 
    modul.subject?.toLowerCase().includes('pelajar pancasila') || 
    modul.title?.toLowerCase().includes('eco-school') || 
    modul.title?.toLowerCase().includes('jejak karbon');

  if (isP5) {
    return <P5ProjectModal modul={modul} onClose={onClose} />;
  }

  const [activeTab, setActiveTab] = useState<'materi' | 'tujuan' | 'lkpd' | 'glosarium' | 'kuis'>('materi');
  const [checkedObjectives, setCheckedObjectives] = useState<Record<number, boolean>>({});
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedFormula, setCopiedFormula] = useState(false);

  // Accessibility & Reading Enhancements
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Handle TTS Web Speech API
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Fitur suara tidak didukung pada browser ini.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Build text to read
    const textToRead = `${modul.subject}. ${modul.title}. ${modul.materiPokok}. ${modul.materiLengkap || ''}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'id-ID';
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const toggleObjective = (index: number) => {
    setCheckedObjectives((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleQuizAnswer = (index: number) => {
    if (isQuizSubmitted) return;
    setSelectedQuizAnswer(index);
  };

  const submitQuiz = () => {
    if (selectedQuizAnswer !== null) {
      setIsQuizSubmitted(true);
    }
  };

  const handleDownloadPDF = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handleCopyFormula = () => {
    if (modul.formulaOrDiagram) {
      navigator.clipboard.writeText(modul.formulaOrDiagram);
      setCopiedFormula(true);
      setTimeout(() => setCopiedFormula(false), 2000);
    }
  };

  const isCorrectAnswer = selectedQuizAnswer === modul.quizCheck.correctIndex;

  // Font size classes
  const fontBodyClass = 
    fontSize === 'xlarge' ? 'text-base leading-relaxed' :
    fontSize === 'large' ? 'text-sm leading-relaxed' :
    'text-xs sm:text-sm leading-relaxed';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh] border border-slate-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#075985] text-white px-5 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3 shadow-xs shrink-0">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 text-sky-100 px-2 py-0.5 rounded">
                Modul Ajar Kurikulum Merdeka Fase F
              </span>
              <span className="text-xs text-sky-100 font-medium">SMA Jurusan MIPA · {modul.grade}</span>
              <span className="bg-emerald-400 text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
                ✓ Materi Lengkap Langsung Terbaca
              </span>
            </div>
            <h3 className="text-base sm:text-xl font-bold text-white tracking-tight mt-1">
              {modul.subject}: {modul.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            
            {/* Audio Reader Button */}
            <button
              onClick={toggleSpeech}
              className={`px-3 py-1.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                isSpeaking 
                  ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse' 
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
              title={isSpeaking ? 'Hentikan Narasi Suara' : 'Dengarkan Penjelasan Audio'}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Hentikan Suara</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Bacakan Materi</span>
                </>
              )}
            </button>

            {/* Print Action */}
            <button
              onClick={() => window.print()}
              className="hidden sm:flex px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              title="Cetak modul ajar"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak</span>
            </button>

            {/* Download PDF Option */}
            <button
              onClick={handleDownloadPDF}
              className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              title="Simpan salinan berkas jika ingin membaca offline"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>PDF Tersimpan</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Simpan PDF</span>
                  <span className="sm:hidden">PDF</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/20 rounded-lg text-white transition-colors cursor-pointer"
              title="Tutup Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar & Text Zoom Controls */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-2 flex items-center justify-between gap-3 overflow-x-auto text-xs font-bold shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('materi')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'materi'
                  ? 'bg-white text-[#0284c7] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Materi Lengkap & Sub-Bab</span>
            </button>

            <button
              onClick={() => setActiveTab('tujuan')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'tujuan'
                  ? 'bg-white text-[#0284c7] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Capaian (CP) & Tujuan (TP)</span>
            </button>

            <button
              onClick={() => setActiveTab('lkpd')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'lkpd'
                  ? 'bg-white text-[#0284c7] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Lembar Kerja (LKPD Praktikum)</span>
            </button>

            {modul.glosarium && modul.glosarium.length > 0 && (
              <button
                onClick={() => setActiveTab('glosarium')}
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'glosarium'
                    ? 'bg-white text-[#0284c7] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Glosarium Istilah</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('kuis')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'kuis'
                  ? 'bg-white text-[#0284c7] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Kuis Pemahaman Cepat</span>
            </button>
          </div>

          {/* Reading Controls: Text Size Zoom */}
          <div className="hidden md:flex items-center gap-1 bg-slate-200/80 p-1 rounded-xl shrink-0">
            <span className="text-[10px] text-slate-500 font-semibold px-2">Ukuran:</span>
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                fontSize === 'normal' ? 'bg-white text-[#0284c7] shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Ukuran Normal"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                fontSize === 'large' ? 'bg-white text-[#0284c7] shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Ukuran Besar"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                fontSize === 'xlarge' ? 'bg-white text-[#0284c7] shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Ukuran Ekstra Besar"
            >
              A++
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* Direct Reading Notice Banner */}
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 rounded-xl p-3.5 flex items-start gap-3 text-xs shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold">Materi Terbaca Penuh Secara Lengkap:</span> Seluruh landasan teori, analisis rumus matematis, pembahasan sub-bab, contoh soal bertahap, dan panduan praktikum disajikan langsung di layar tanpa harus mengunduh berkas luar.
            </div>
          </div>

          {/* Metadata Card */}
          <div className="bg-sky-50/70 border border-sky-100 rounded-xl p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#0284c7]" />
              <div>
                <span className="text-slate-400 block text-[10px]">Guru Pengampu / Penyusun:</span>
                <span className="font-bold text-slate-800">{modul.author}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#0284c7]" />
              <div>
                <span className="text-slate-400 block text-[10px]">Alokasi Waktu Pembelajaran:</span>
                <span className="font-bold text-slate-800">{modul.duration}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#0284c7]" />
              <div>
                <span className="text-slate-400 block text-[10px]">Dimensi Profil Pancasila:</span>
                <span className="font-bold text-slate-800">Bernalar Kritis, Mandiri, Bergotong Royong</span>
              </div>
            </div>
          </div>

          {/* TAB 1: MATERI LENGKAP & SUB-BAB */}
          {activeTab === 'materi' && (
            <div className="space-y-6">
              
              {/* Uraian Landasan Teori Pokok */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-slate-800">
                  <div className="w-7 h-7 rounded-lg bg-[#0284c7] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    Uraian Landasan Teori & Konsep Fundamental
                  </h4>
                </div>
                <div className={`${fontBodyClass} text-slate-700 space-y-3 pt-1`}>
                  <p className="leading-relaxed">{modul.materiPokok}</p>
                  {modul.materiLengkap && (
                    <div className="p-4 bg-white rounded-xl border border-slate-200/90 text-slate-800 shadow-2xs leading-relaxed">
                      <span className="text-[10px] font-bold uppercase text-[#0284c7] tracking-wider block mb-1">
                        Elaborasi Mendalam & Prinsip Ilmiah:
                      </span>
                      <p>{modul.materiLengkap}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Sub-Bab Pembahasan Terperinci */}
              {modul.subBabMateri && modul.subBabMateri.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#0284c7]" />
                      <span>Pembahasan Sub-Bab Pembelajaran Terstruktur ({modul.subBabMateri.length} Bagian):</span>
                    </h5>
                    <span className="text-xs text-slate-400 hidden sm:inline">Standar Buku Teks Kemendikbud</span>
                  </div>

                  <div className="space-y-4">
                    {modul.subBabMateri.map((sub, sIdx) => (
                      <div key={sIdx} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3.5 shadow-2xs">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-sky-100 text-[#0284c7] font-bold text-xs flex items-center justify-center shrink-0">
                            {sIdx + 1}
                          </span>
                          <span className="font-bold text-sm sm:text-base text-slate-900">
                            {sub.judul}
                          </span>
                        </div>

                        <p className={`${fontBodyClass} text-slate-700 leading-relaxed whitespace-pre-line`}>
                          {sub.isi}
                        </p>
                        
                        {sub.contohAplikasi && (
                          <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-950 space-y-1">
                            <span className="font-bold block text-amber-900 flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                              <span>Aplikasi Nyata di Dunia Sains & Teknologi:</span>
                            </span>
                            <p className="leading-relaxed text-slate-700">{sub.contohAplikasi}</p>
                          </div>
                        )}

                        {sub.poinPenting && sub.poinPenting.length > 0 && (
                          <div className="pt-2 border-t border-slate-100 space-y-1.5">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                              Poin Kunci & Kaidah Pembuktian:
                            </span>
                            <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
                              {sub.poinPenting.map((pt, pIdx) => (
                                <li key={pIdx} className="leading-relaxed">{pt}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Formula & Diagram Alur Ilmiah with Copy Button */}
              {modul.formulaOrDiagram && (
                <div className="p-5 bg-slate-900 text-sky-200 rounded-2xl border border-slate-800 font-mono text-xs sm:text-sm shadow-md space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-[10px] text-amber-400 uppercase font-sans font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Formula Matematis / Diagram Alur Proses:</span>
                    </span>
                    
                    <button
                      onClick={handleCopyFormula}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 font-sans text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Salin rumus ke papan klip"
                    >
                      {copiedFormula ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Salin Rumus</span>
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="p-3.5 bg-slate-950/80 rounded-xl overflow-x-auto text-amber-300 font-bold leading-relaxed border border-slate-800/80">
                    {modul.formulaOrDiagram}
                  </div>
                </div>
              )}

              {/* Pilar Konsep Kunci */}
              <div>
                <h5 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Pilar Konsep Penting yang Wajib Dikuasai:</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {modul.konsepKunci.map((konsep, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-2xs hover:border-sky-300 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-sky-100 text-[#0284c7] font-bold text-[10px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-900 block truncate">
                          {konsep.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {konsep.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contoh Kasus Soal Berbobot & Pembahasan Step-by-Step */}
              {modul.contohKasus && (
                <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-3 text-xs">
                  <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs uppercase tracking-wider">
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    <span>Contoh Soal HOTS & Pembahasan Bertahap:</span>
                  </div>
                  
                  <div className="p-3.5 bg-white rounded-xl border border-amber-200/90 space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Soal Kasus:
                    </span>
                    <p className="font-semibold text-slate-900 text-xs sm:text-sm leading-relaxed">
                      {modul.contohKasus.pertanyaan}
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-emerald-200 text-slate-700 leading-relaxed text-xs space-y-2 shadow-2xs">
                    <strong className="text-emerald-800 block font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Langkah Pembahasan & Perhitungan Lengkap:</span>
                    </strong>
                    <div className="whitespace-pre-line leading-relaxed font-sans text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-200/70">
                      {modul.contohKasus.pembahasan}
                    </div>
                  </div>
                </div>
              )}

              {/* Rangkuman Materi Pokok */}
              {modul.rangkumanMateri && modul.rangkumanMateri.length > 0 && (
                <div className="p-5 bg-sky-50/80 border border-sky-200 rounded-2xl space-y-2.5 text-xs">
                  <span className="text-[10px] font-bold uppercase text-[#0284c7] tracking-wider block">
                    Rangkuman Materi Pokok (Key Takeaways):
                  </span>
                  <ul className="list-disc list-inside space-y-1.5 text-slate-700 text-xs">
                    {modul.rangkumanMateri.map((rk, idx) => (
                      <li key={idx} className="leading-relaxed">{rk}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tips Belajar & Mnemonics */}
              {modul.tipsBelajar && (
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs space-y-1 text-emerald-950">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <span>Tips Belajar Efektif & Strategi Menghadapi Ujian CBT:</span>
                  </div>
                  <p className="leading-relaxed pl-5 text-slate-700">{modul.tipsBelajar}</p>
                </div>
              )}

              {/* Interactive Virtual Science Lab Link (if available) */}
              {modul.simType && onOpenSimulation && (
                <div className="p-5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                      <FlaskConical className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <span className="font-bold text-sm sm:text-base block">
                        Uji Praktikum Virtual Tersedia!
                      </span>
                      <span className="text-xs text-emerald-100">
                        Jalankan eksperimen interaktif di Laboratorium Sains Virtual.
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenSimulation(modul.simType!);
                    }}
                    className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-xs shrink-0 cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <span>Buka Lab Sains Virtual</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: CAPAIAN & TUJUAN PEMBELAJARAN (CP / TP) */}
          {activeTab === 'tujuan' && (
            <div className="space-y-5">
              {modul.capaianPembelajaran && (
                <div className="p-5 bg-sky-50 rounded-2xl border border-sky-200 space-y-2">
                  <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-wider block">
                    Capaian Pembelajaran (CP) Fase F Standar Kemendikbud:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    {modul.capaianPembelajaran}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <span className="font-bold text-slate-800 text-sm block">
                  Target Indikator Tujuan Pembelajaran (TP):
                </span>
                <p className="text-xs text-slate-500">
                  Beri tanda centang pada tujuan yang sudah Anda pahami dan kuasai setelah membaca modul ini.
                </p>
                <div className="space-y-2.5">
                  {modul.tujuanPembelajaran.map((tp, idx) => {
                    const isChecked = !!checkedObjectives[idx];
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleObjective(idx)}
                        className={`p-4 rounded-xl border text-xs transition-all flex items-start gap-3 cursor-pointer ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isChecked
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="leading-relaxed font-medium">{tp}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LEMBAR KERJA SISWA (LKPD PRAKTIKUM) */}
          {activeTab === 'lkpd' && (
            <div className="space-y-4">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3.5">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#0284c7]" />
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    {modul.lkpd?.judulAktivitas || `Lembar Kerja Peserta Didik (LKPD): Praktikum & Analisis Mandiri ${modul.subject}`}
                  </h4>
                </div>

                {modul.lkpd?.alatBahan && (
                  <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs space-y-1.5 shadow-2xs">
                    <span className="font-bold text-slate-800 block">Alat, Bahan & Media Eksperimen:</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                      {modul.lkpd.alatBahan.map((ab, i) => (
                        <li key={i}>{ab}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {modul.lkpd?.langkahKerja && (
                  <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs space-y-2 shadow-2xs">
                    <span className="font-bold text-slate-800 block">Langkah Kerja Praktik Eksperimental:</span>
                    <ol className="list-decimal list-inside space-y-1.5 text-slate-700">
                      {modul.lkpd.langkahKerja.map((lk, i) => (
                        <li key={i} className="leading-relaxed">{lk}</li>
                      ))}
                    </ol>
                  </div>
                )}

                {modul.lkpd?.pertanyaanDiskusi && (
                  <div className="p-4 bg-sky-50/70 border border-sky-200 rounded-xl text-xs space-y-2 shadow-2xs">
                    <span className="font-bold text-[#0284c7] block">Pertanyaan Analisis & Diskusi Mandiri:</span>
                    <ul className="list-disc list-inside space-y-1.5 text-slate-700">
                      {modul.lkpd.pertanyaanDiskusi.map((pd, i) => (
                        <li key={i} className="leading-relaxed">{pd}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: GLOSARIUM ISTILAH SAINS */}
          {activeTab === 'glosarium' && modul.glosarium && (
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Glosarium Istilah & Definisi Ilmiah:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {modul.glosarium.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs shadow-2xs">
                    <span className="font-bold text-[#0284c7] block text-xs">{item.istilah}</span>
                    <p className="text-slate-600 leading-relaxed text-[11px]">{item.arti}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: KUIS UJI PEMAHAMAN CEPAT */}
          {activeTab === 'kuis' && (
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-500" />
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  Uji Pemahaman Cepat Materi
                </h4>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-3.5 shadow-2xs">
                <p className="font-semibold text-slate-900 text-xs sm:text-sm">
                  {modul.quizCheck.question}
                </p>

                <div className="space-y-2">
                  {modul.quizCheck.options.map((opt, oIdx) => {
                    const isSelected = selectedQuizAnswer === oIdx;
                    return (
                      <button
                        key={oIdx}
                        disabled={isQuizSubmitted}
                        onClick={() => handleQuizAnswer(oIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-sky-50 border-[#0284c7] font-semibold text-[#0284c7] ring-1 ring-[#0284c7]'
                            : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#0284c7]"></div>}
                      </button>
                    );
                  })}
                </div>

                {!isQuizSubmitted ? (
                  <button
                    disabled={selectedQuizAnswer === null}
                    onClick={submitQuiz}
                    className="w-full py-2.5 bg-[#0284c7] hover:bg-sky-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer mt-2"
                  >
                    Periksa Jawaban
                  </button>
                ) : (
                  <div
                    className={`p-4 rounded-xl border text-xs space-y-1.5 ${
                      isCorrectAnswer
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : 'bg-rose-50 border-rose-300 text-rose-900'
                    }`}
                  >
                    <span className="font-bold block text-sm">
                      {isCorrectAnswer ? '✓ Jawaban Anda Benar!' : '✕ Jawaban Kurang Tepat!'}
                    </span>
                    <p className="leading-relaxed">{modul.quizCheck.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Kurikulum Merdeka SMA Jurusan MIPA · Fase F</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors cursor-pointer"
          >
            Selesai Membaca
          </button>
        </div>

      </div>
    </div>
  );
};
