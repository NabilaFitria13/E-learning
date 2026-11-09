import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  Calendar, 
  Play, 
  Lock, 
  UserCheck,
  CheckCircle2
} from 'lucide-react';
import { ExamItem, UserProfile } from '../types';
import { MOCK_EXAMS_BY_ROLE } from '../data/mockData';

interface ExamsListViewProps {
  currentUser: UserProfile;
  onStartExam: (exam: ExamItem) => void;
}

export const ExamsListView: React.FC<ExamsListViewProps> = ({
  currentUser,
  onStartExam,
}) => {
  const [filterType, setFilterType] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const isTeacher = currentUser.role === 'guru';

  // Get exams specific to active role
  const userRoleExams = MOCK_EXAMS_BY_ROLE[currentUser.role] || MOCK_EXAMS_BY_ROLE['siswa_mipa'];

  const filteredExams = userRoleExams.filter((exam) => {
    const matchesFilter = filterType === 'Semua' || exam.status === filterType;
    const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          exam.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-3 sm:p-5 md:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Title & Filter Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider">
            Computer Based Test (CBT) · {currentUser.className}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-0.5">
            Ujian & Asesmen CBT Siswa Kelas 11 MIPA
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl text-xs font-semibold overflow-x-auto">
          {['Semua', 'Sedang Berlangsung', isTeacher ? 'Selesai' : 'Segera Berlangsung'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterType(status)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                filterType === status
                  ? 'bg-white text-[#0284c7] font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* CBT Anti-Cheat Notice Card */}
      <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-sky-900">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0284c7] text-white flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">
              Integritas & Tata Tertib CBT Online SMAN 25
            </h4>
            <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
              Sistem akan mendeteksi perpindahan tab browser, mematikan fungsi copy-paste, dan mencatat waktu pengerjaan secara otomatis.
            </p>
          </div>
        </div>

        <span className="text-[11px] font-bold bg-white text-[#0284c7] border border-sky-200 px-3 py-1.5 rounded-lg shrink-0">
          Proctoring SMAN 25 Aktif
        </span>
      </div>

      {/* Exam Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map((exam) => {
          const isOngoing = exam.status === 'Sedang Berlangsung';
          const isFinished = exam.status === 'Selesai';

          return (
            <div
              key={exam.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:border-sky-300 transition-all p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      isOngoing
                        ? 'bg-sky-100 text-[#0284c7] animate-pulse'
                        : isFinished
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {exam.status}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    {exam.type}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold text-[#0284c7] block">
                    {exam.subject}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base leading-snug mt-0.5">
                    {exam.title}
                  </h3>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    Sasaran: {exam.targetClass}
                  </span>
                </div>

                {/* Info Pills */}
                <div className="bg-slate-50 rounded-xl p-3 space-y-1.5 text-xs text-slate-600 border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Tanggal:
                    </span>
                    <span className="font-medium text-slate-800">{exam.dateStr}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Waktu & Durasi:
                    </span>
                    <span className="font-medium text-slate-800">{exam.timeStr} ({exam.durationMinutes} Menit)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      {isTeacher ? 'Status Jawaban:' : 'Jumlah Soal:'}
                    </span>
                    <span className="font-bold text-[#0284c7]">
                      {isTeacher
                        ? `${exam.submittedCount}/${exam.totalStudents} Siswa Selesai`
                        : `${exam.questions.length} Butir Soal`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <div className="pt-2">
                {isTeacher ? (
                  <button
                    onClick={() => alert(`Membuka rekap monitoring & lembar jawaban untuk ${exam.title}...`)}
                    className="w-full py-2.5 rounded-xl font-bold text-xs bg-[#0284c7] hover:bg-sky-700 text-white flex items-center justify-center gap-2 transition-all shadow-xs"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Periksa Jawaban Siswa</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onStartExam(exam)}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs ${
                      isOngoing
                        ? 'bg-[#0284c7] hover:bg-sky-700 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isOngoing ? 'Lanjutkan Masuk CBT' : 'Mulai Pengerjaan Ujian'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
