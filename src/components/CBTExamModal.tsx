import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  HelpCircle, 
  AlertTriangle, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Award, 
  RotateCcw,
  Check,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ExamItem, ExamQuestion } from '../types';

interface CBTExamModalProps {
  exam: ExamItem;
  studentName: string;
  onClose: () => void;
}

export const CBTExamModal: React.FC<CBTExamModalProps> = ({
  exam,
  studentName,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flags, setFlags] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState<number>(exam.durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'xlarge'>('normal');

  const questions = exam.questions;
  const currentQuestion: ExamQuestion | undefined = questions[currentIndex];

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (key: string) => {
    if (isSubmitted || !currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: key,
    }));
  };

  const toggleFlag = () => {
    if (isSubmitted || !currentQuestion) return;
    setFlags((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));
  };

  const handleSubmitExam = () => {
    setIsSubmitted(true);
    setShowConfirmSubmit(false);
    
    // Calculate score
    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctKey) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / questions.length) * 100);
    if (finalScore >= 75) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Safe fallback
      }
    }
  };

  const answeredCount = Object.keys(answers).length;
  const flaggedCount = Object.values(flags).filter(Boolean).length;
  const unansweredCount = questions.length - answeredCount;

  // Calculate results if submitted
  const correctCount = questions.filter((q) => answers[q.id] === q.correctKey).length;
  const finalScore = Math.round((correctCount / questions.length) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-slate-200">
        
        {/* Top CBT Header */}
        <div className="bg-[#0284c7] text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 shadow-sm shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold tracking-wider uppercase bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                CBT ONLINE SMA
              </span>
              <span className="text-xs text-sky-100 font-medium">{exam.subject}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
              {exam.title}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {/* Countdown Timer */}
            {!isSubmitted && (
              <div
                className={`px-3 py-1.5 rounded-lg flex items-center gap-2 font-mono font-bold text-sm sm:text-base border ${
                  timeLeft < 300
                    ? 'bg-rose-500/20 text-rose-200 border-rose-300 animate-pulse'
                    : 'bg-white/10 text-white border-white/20'
                }`}
              >
                <Clock className="w-4 h-4 text-amber-300" />
                <span>{formatTimer(timeLeft)}</span>
              </div>
            )}

            {/* Font Zoom Controls */}
            <div className="hidden sm:flex items-center bg-white/10 rounded-lg p-1 text-xs">
              <button
                onClick={() => setFontSizeLevel('normal')}
                className={`px-2 py-0.5 rounded ${fontSizeLevel === 'normal' ? 'bg-white text-[#0284c7] font-bold' : 'text-sky-100'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSizeLevel('large')}
                className={`px-2 py-0.5 rounded ${fontSizeLevel === 'large' ? 'bg-white text-[#0284c7] font-bold' : 'text-sky-100'}`}
              >
                A+
              </button>
            </div>

            {/* Submit / Close Button */}
            {!isSubmitted ? (
              <button
                onClick={() => setShowConfirmSubmit(true)}
                className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-lg shadow-sm transition-all"
              >
                Selesai Ujian
              </button>
            ) : (
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                title="Tutup Hasil Ujian"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            )}
          </div>
        </div>

        {/* Modal Body: If Submitted -> Show Scorecard; If Active -> Show Question Palette & Body */}
        {isSubmitted ? (
          <div className="p-6 overflow-y-auto space-y-6">
            {/* Scorecard Summary */}
            <div className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 rounded-2xl p-6 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#0284c7] text-white flex items-center justify-center mx-auto shadow-md">
                <Award className="w-8 h-8 text-amber-300" />
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Hasil Ujian Komputer (CBT)
                </span>
                <h4 className="text-3xl font-extrabold text-slate-900 mt-1">
                  Nilai Akhir: <span className="text-[#0284c7]">{finalScore}</span> / 100
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Siswa: <strong>{studentName}</strong> · Benar: {correctCount} dari {questions.length} soal
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-xs font-bold shadow-xs text-slate-700">
                <span>Predikat:</span>
                <span className={finalScore >= 80 ? 'text-emerald-600' : 'text-amber-600'}>
                  {finalScore >= 85 ? 'Sangat Memuaskan (A)' : finalScore >= 75 ? 'Kompeten (B)' : 'Perlu Remedial (C)'}
                </span>
              </div>
            </div>

            {/* Questions Detailed Review & Explanation */}
            <div className="space-y-4">
              <h5 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Review Kunci Jawaban & Pembahasan Lengkap
              </h5>

              <div className="space-y-4">
                {questions.map((q, idx) => {
                  const userAnswer = answers[q.id];
                  const isCorrect = userAnswer === q.correctKey;
                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-xl border ${
                        isCorrect
                          ? 'bg-emerald-50/40 border-emerald-200'
                          : 'bg-rose-50/40 border-rose-200'
                      } space-y-3`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800">Soal Nomor {idx + 1}</span>
                        <span
                          className={`font-bold px-2 py-0.5 rounded-full ${
                            isCorrect
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {isCorrect ? 'Jawaban Benar (+20 Poin)' : 'Jawaban Kurang Tepat'}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed font-medium">
                        {q.text}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {q.options.map((opt) => {
                          const isOptionCorrect = opt.key === q.correctKey;
                          const isOptionChosen = opt.key === userAnswer;
                          return (
                            <div
                              key={opt.key}
                              className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                                isOptionCorrect
                                  ? 'bg-emerald-100/70 border-emerald-300 font-semibold text-emerald-950'
                                  : isOptionChosen
                                  ? 'bg-rose-100/70 border-rose-300 text-rose-950'
                                  : 'bg-white border-slate-200 text-slate-600'
                              }`}
                            >
                              <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[11px] font-bold shadow-2xs">
                                {opt.key}
                              </span>
                              <span className="flex-1">{opt.text}</span>
                              {isOptionCorrect && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation Callout */}
                      <div className="p-3 bg-white/80 rounded-lg border border-slate-200 text-xs text-slate-700">
                        <strong className="text-[#0284c7] block mb-0.5">💡 Pembahasan Guru:</strong>
                        <p>{q.explanation}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#0284c7] hover:bg-sky-700 text-white font-bold text-sm rounded-xl transition-all shadow-md"
              >
                Selesai & Kembali ke Portal
              </button>
            </div>
          </div>
        ) : (
          /* Active Exam View */
          <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
            
            {/* Main Question Column (lg:col-span-8) */}
            <div className="lg:col-span-8 p-5 sm:p-6 overflow-y-auto flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Question Header & Flag Toggle */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-[#0284c7] text-white flex items-center justify-center font-bold text-sm">
                      {currentIndex + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Dari {questions.length} Soal
                    </span>
                  </div>

                  <button
                    onClick={toggleFlag}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                      currentQuestion && flags[currentQuestion.id]
                        ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                    <span>Ragu-ragu</span>
                  </button>
                </div>

                {/* Question Body */}
                <div
                  className={`text-slate-800 leading-relaxed font-medium whitespace-pre-line ${
                    fontSizeLevel === 'large'
                      ? 'text-base sm:text-lg'
                      : 'text-sm sm:text-base'
                  }`}
                >
                  {currentQuestion?.text}
                </div>

                {/* Multiple Choice Radio Options */}
                <div className="space-y-2.5 pt-2">
                  {currentQuestion?.options.map((option) => {
                    const isSelected = answers[currentQuestion.id] === option.key;
                    return (
                      <button
                        key={option.key}
                        onClick={() => handleSelectOption(option.key)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-sky-50/80 border-[#0284c7] ring-1 ring-[#0284c7] shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-[#0284c7] text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {option.key}
                        </div>
                        <div className="flex-1 text-xs sm:text-sm text-slate-800 pt-0.5 leading-normal">
                          {option.text}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Navigation Control Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                <span className="text-xs text-slate-400 font-mono">
                  {currentIndex + 1} / {questions.length}
                </span>

                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#0284c7] hover:bg-sky-700 text-white transition-all shadow-xs"
                  >
                    <span>Selanjutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowConfirmSubmit(true)}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-xs"
                  >
                    <span>Kirim Jawaban</span>
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Question Palette (lg:col-span-4) */}
            <div className="lg:col-span-4 p-5 bg-slate-50/60 flex flex-col justify-between space-y-4">
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">Daftar Nomor Soal</h4>
                <p className="text-[11px] text-slate-500 mb-4">
                  Klik nomor untuk langsung melompat ke soal terkait.
                </p>

                {/* Grid of question numbers */}
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((q, idx) => {
                    const isAnswered = answers[q.id] !== undefined;
                    const isFlagged = flags[q.id];
                    const isCurrent = currentIndex === idx;

                    let bgClass = 'bg-white text-slate-700 border-slate-300';
                    if (isFlagged) {
                      bgClass = 'bg-amber-400 text-slate-950 border-amber-500 font-bold';
                    } else if (isAnswered) {
                      bgClass = 'bg-[#0284c7] text-white border-sky-600 font-bold';
                    }

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-10 rounded-xl border flex flex-col items-center justify-center text-xs transition-all relative ${bgClass} ${
                          isCurrent ? 'ring-2 ring-slate-900 ring-offset-1 scale-105 shadow-xs' : 'hover:opacity-90'
                        }`}
                      >
                        <span>{idx + 1}</span>
                        {isAnswered && (
                          <span className="text-[9px] uppercase font-bold opacity-90 leading-none">
                            {answers[q.id]}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Legend & Stats */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-[#0284c7]"></span>
                    <span>Sudah Dijawab:</span>
                  </div>
                  <span className="font-bold text-slate-800">{answeredCount}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-amber-400"></span>
                    <span>Ragu-ragu:</span>
                  </div>
                  <span className="font-bold text-slate-800">{flaggedCount}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-white border border-slate-300"></span>
                    <span>Belum Dijawab:</span>
                  </div>
                  <span className="font-bold text-slate-800">{unansweredCount}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Confirmation Dialog */}
        {showConfirmSubmit && (
          <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div className="text-center">
                <h4 className="text-lg font-bold text-slate-900">Selesaikan Ujian Sekarang?</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {unansweredCount > 0 ? (
                    <span className="text-rose-600 font-semibold block">
                      Perhatian: Masih ada {unansweredCount} soal yang belum Anda jawab!
                    </span>
                  ) : null}
                  Setelah dikirim, jawaban Anda akan langsung dinilai oleh sistem e-learning.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setShowConfirmSubmit(false)}
                  className="py-2.5 px-4 rounded-xl border border-slate-300 font-semibold text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Lanjut Mengerjakan
                </button>
                <button
                  onClick={handleSubmitExam}
                  className="py-2.5 px-4 rounded-xl bg-[#0284c7] hover:bg-sky-700 text-white font-bold text-xs transition-colors shadow-xs"
                >
                  Ya, Kumpulkan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
