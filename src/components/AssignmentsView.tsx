import React, { useState } from 'react';
import { 
  Briefcase, 
  Upload, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Link as LinkIcon, 
  Send, 
  X,
  Star,
  Download,
  Edit3,
  Sparkles,
  Search,
  Check,
  FileCheck,
  RefreshCw,
  Eye,
  PlusCircle,
  FileSpreadsheet,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AssignmentItem, UserProfile } from '../types';
import { MOCK_ASSIGNMENTS_BY_ROLE } from '../data/mockData';

interface AssignmentsViewProps {
  currentUser: UserProfile;
}

export const AssignmentsView: React.FC<AssignmentsViewProps> = ({ currentUser }) => {
  const isTeacher = currentUser.role === 'guru';

  // Retrieve initial assignments for active role
  const roleAssignments = MOCK_ASSIGNMENTS_BY_ROLE[currentUser.role] || MOCK_ASSIGNMENTS_BY_ROLE['siswa_mipa'];
  const [assignments, setAssignments] = useState<AssignmentItem[]>(roleAssignments);
  const [filterStatus, setFilterStatus] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Student submission state
  const [activeAssignment, setActiveAssignment] = useState<AssignmentItem | null>(null);
  const [submissionTab, setSubmissionTab] = useState<'file' | 'text' | 'link'>('file');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadedFileSize, setUploadedFileSize] = useState('');
  const [essayText, setEssayText] = useState('');
  const [submissionLink, setSubmissionLink] = useState('');
  const [studentNotes, setStudentNotes] = useState('');
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  
  // Animated progress state during submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submissionSuccessMessage, setSubmissionSuccessMessage] = useState<string | null>(null);

  // New Assignment Modal state (Kirim Tugas Mandiri)
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState('Kimia Analitik 11 MIPA');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  // Teacher grading state
  const [teacherGradingModal, setTeacherGradingModal] = useState<AssignmentItem | null>(null);
  const [gradeInput, setGradeInput] = useState<number>(90);
  const [feedbackInput, setFeedbackInput] = useState<string>('Analisis sangat mendalam dan evidensi data faktual sangat meyakinkan!');

  // Sync if role changes
  React.useEffect(() => {
    setAssignments(MOCK_ASSIGNMENTS_BY_ROLE[currentUser.role] || MOCK_ASSIGNMENTS_BY_ROLE['siswa_mipa']);
    setFilterStatus('Semua');
    setActiveAssignment(null);
    setTeacherGradingModal(null);
  }, [currentUser.role]);

  const filtered = assignments
    .filter((asg) => {
      if (filterStatus === 'Semua') return true;
      return asg.status === filterStatus;
    })
    .filter((asg) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        asg.title.toLowerCase().includes(q) ||
        asg.subject.toLowerCase().includes(q) ||
        asg.description.toLowerCase().includes(q)
      );
    });

  // Calculate statistics
  const totalTasks = assignments.length;
  const pendingTasks = assignments.filter((a) => a.status === 'Belum Dikumpulkan').length;
  const submittedTasks = assignments.filter((a) => a.status === 'Diserahkan').length;
  const gradedTasks = assignments.filter((a) => a.status === 'Dinilai');
  const avgGrade = gradedTasks.length > 0 
    ? Math.round(gradedTasks.reduce((acc, c) => acc + (c.score || 0), 0) / gradedTasks.length)
    : 0;

  // Open submission modal and prefill if existing submission exists
  const handleOpenSubmission = (item: AssignmentItem) => {
    setActiveAssignment(item);
    setUploadedFileName(item.submittedFileName || '');
    setUploadedFileSize(item.submittedFileName ? (item.fileSize || '2.1 MB') : '');
    setEssayText(item.submittedText || '');
    setSubmissionLink(item.submittedLink || '');
    setStudentNotes(item.submittedText || '');
    setUploadProgress(0);
    setSubmissionSuccessMessage(null);
    setIsDragging(false);
    if (item.submittedFileName) {
      setSubmissionTab('file');
    } else if (item.submittedText) {
      setSubmissionTab('text');
    } else if (item.submittedLink) {
      setSubmissionTab('link');
    } else {
      setSubmissionTab('file');
    }
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFileName(file.name);
      const sizeMb = file.size / (1024 * 1024);
      const formattedSize = sizeMb >= 1 
        ? `${sizeMb.toFixed(1)} MB` 
        : `${Math.max(1, Math.round(file.size / 1024))} KB`;
      setUploadedFileSize(formattedSize);
      // Reset input value so selecting the exact same file again immediately fires onChange
      e.target.value = '';
    }
  };

  // Quick 1-click preset file (instant zero delay)
  const handleUsePresetFile = (name: string, size: string) => {
    setUploadedFileName(name);
    setUploadedFileSize(size);
    if (!studentNotes) {
      setStudentNotes('Laporan tugas praktikum dengan data observasi dan pembahasan lengkap.');
    }
  };

  // Quick 1-click autofill with realistic science report sample
  const handleUseSampleFile = () => {
    const defaultSample = `Laporan_${activeAssignment?.subject.replace(/[^a-zA-Z0-9]/g, '_') || 'Praktikum'}_Rafiandra_XI_MIPA1.pdf`;
    handleUsePresetFile(defaultSample, '2.8 MB');
  };

  const handleSubmitTask = () => {
    if (!activeAssignment) return;
    setIsSubmitting(true);
    setUploadProgress(15);

    // Realistic progress animation
    const timer1 = setTimeout(() => setUploadProgress(55), 250);
    const timer2 = setTimeout(() => setUploadProgress(85), 500);
    const timer3 = setTimeout(() => {
      setUploadProgress(100);
      
      const now = new Date();
      const timeStr = `Hari ini, ${now.getHours().toString().padStart(2, '0')}.${now.getMinutes().toString().padStart(2, '0')} WIB`;
      
      const finalFileName = uploadedFileName || (submissionTab === 'text' ? 'Jawaban_Esai_Online.txt' : 'Tautan_Cloud_Document.url');
      const finalSize = uploadedFileSize || '1.4 MB';

      setAssignments((prev) =>
        prev.map((item) =>
          item.id === activeAssignment.id
            ? {
                ...item,
                status: 'Diserahkan',
                submissionDate: timeStr,
                submittedFileName: finalFileName,
                fileSize: finalSize,
                submittedText: essayText || studentNotes,
                submittedLink: submissionLink,
              }
            : item
        )
      );

      setIsSubmitting(false);
      setSubmissionSuccessMessage('Tugas berhasil dikirim ke sistem e-learning SMAN 25!');

      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Safe fallback
      }

      // Automatically close modal after 1.5s
      setTimeout(() => {
        setActiveAssignment(null);
        setSubmissionSuccessMessage(null);
      }, 1500);

    }, 850);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  const handleCreateNewTask = () => {
    if (!newTitle.trim()) return;
    const newTask: AssignmentItem = {
      id: `asg_custom_${Date.now()}`,
      title: newTitle,
      subject: newSubject,
      dueDate: 'Tugas Mandiri (Fleksibel)',
      status: 'Belum Dikumpulkan',
      maxScore: 100,
      description: newDescription || 'Pengumpulan berkas tugas atau proyek mandiri siswa.',
    };

    setAssignments((prev) => [newTask, ...prev]);
    setIsNewTaskModalOpen(false);
    setNewTitle('');
    setNewDescription('');

    try {
      confetti({ particleCount: 35, spread: 50 });
    } catch {}
  };

  const handleSaveTeacherGrade = () => {
    if (!teacherGradingModal) return;
    setAssignments((prev) =>
      prev.map((item) =>
        item.id === teacherGradingModal.id
          ? {
              ...item,
              status: 'Dinilai',
              score: gradeInput,
              teacherFeedback: feedbackInput,
            }
          : item
      )
    );
    setTeacherGradingModal(null);
    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
      });
    } catch {
      // Safe fallback
    }
  };

  return (
    <div className="p-3 sm:p-5 md:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
      
      {/* Title & Top Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider bg-sky-100 px-2.5 py-0.5 rounded-md">
              Portofolio Asesmen Siswa · {currentUser.className}
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Sistem Pengumpulan Aktif</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1">
            Tugas & Lembar Kerja Siswa Kelas 11 MIPA
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Kirimkan laporan praktikum sains, esai ilmiah, dan lembar kerja mandiri langsung ke server sekolah.
          </p>
        </div>

        {/* Right Action: Kirim Tugas Mandiri */}
        <div className="flex items-center gap-2 self-start lg:self-auto">
          {!isTeacher && (
            <button
              onClick={() => setIsNewTaskModalOpen(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-[#0284c7] to-[#0369a1] hover:from-[#0369a1] hover:to-[#075985] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-sm cursor-pointer active:scale-95"
            >
              <PlusCircle className="w-4 h-4 text-sky-200" />
              <span>Kirim Tugas Mandiri</span>
            </button>
          )}
        </div>
      </div>

      {/* Overview Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Total Tugas</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900">{totalTasks}</span>
            <span className="text-xs text-slate-500">Berkas</span>
          </div>
          <span className="text-[11px] text-slate-500 block truncate">Semester Genap Fase F</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold uppercase text-rose-500 block">Belum Dikumpulkan</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-rose-600">{pendingTasks}</span>
            <span className="text-xs text-rose-400">Perlu Dikerjakan</span>
          </div>
          <span className="text-[11px] text-slate-500 block truncate">Perhatikan batas waktu</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold uppercase text-amber-600 block">Telah Diserahkan</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-amber-600">{submittedTasks}</span>
            <span className="text-xs text-amber-500">Menunggu Review</span>
          </div>
          <span className="text-[11px] text-slate-500 block truncate">Sedang dikoreksi guru</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold uppercase text-emerald-600 block">Rata-rata Nilai</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-emerald-600">{avgGrade || 96}</span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold block truncate">Predikat Sangat Memuaskan (A)</span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Status Filter */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-xl text-xs font-semibold overflow-x-auto w-full sm:w-fit shadow-inner">
          {[
            { id: 'Semua', label: 'Semua Status' },
            { id: 'Belum Dikumpulkan', label: `Belum Dikumpulkan (${pendingTasks})` },
            { id: 'Diserahkan', label: `Diserahkan (${submittedTasks})` },
            { id: 'Dinilai', label: `Sudah Dinilai (${gradedTasks.length})` },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setFilterStatus(st.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                filterStatus === st.id
                  ? 'bg-white text-[#0284c7] font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul / mata pelajaran..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0284c7] transition-all"
          />
        </div>
      </div>

      {/* Assignment List */}
      <div className="space-y-3.5">
        {filtered.length > 0 ? (
          filtered.map((item) => {
            const isPending = item.status === 'Belum Dikumpulkan';
            const isSubmitted = item.status === 'Diserahkan';
            const isGraded = item.status === 'Dinilai';

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl p-5 border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs hover:shadow-xs ${
                  isPending
                    ? 'border-slate-200 hover:border-sky-300'
                    : isSubmitted
                    ? 'border-amber-200/90 bg-amber-50/20'
                    : 'border-emerald-200/90 bg-emerald-50/10'
                }`}
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-md">
                      {item.subject}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                        isPending
                          ? 'bg-rose-100 text-rose-800'
                          : isGraded
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {isPending && <Clock className="w-3 h-3 text-rose-600" />}
                      {isSubmitted && <RefreshCw className="w-3 h-3 text-amber-600" />}
                      {isGraded && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                      <span>{item.status}</span>
                    </span>

                    {item.submissionDate && (
                      <span className="text-[10px] text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded">
                        Terkirim: {item.submissionDate}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
                    {item.description}
                  </p>

                  {/* Submission Evidence Badge (if already submitted or graded) */}
                  {item.submittedFileName && (
                    <div className="flex items-center gap-2 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 w-fit">
                      <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-medium text-slate-700 truncate max-w-xs">
                        {item.submittedFileName}
                      </span>
                      {item.fileSize && (
                        <span className="text-[10px] text-slate-400 font-mono">({item.fileSize})</span>
                      )}
                    </div>
                  )}

                  {/* Teacher Feedback Box */}
                  {item.teacherFeedback && (
                    <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs text-emerald-950 mt-2 space-y-1">
                      <strong className="block text-emerald-800 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Catatan Umpan Balik Guru:</span>
                      </strong>
                      <p className="leading-relaxed text-slate-700 pl-5">{item.teacherFeedback}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1 text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Batas Pengumpulan: <strong className="text-slate-700">{item.dueDate}</strong>
                    </span>
                  </div>
                </div>

                {/* Right Side: Score or Action Button */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  {isGraded ? (
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Nilai Asesmen
                      </span>
                      <span className="text-3xl font-black text-emerald-600 tracking-tight">
                        {item.score} <span className="text-xs text-slate-400 font-normal">/ {item.maxScore}</span>
                      </span>
                    </div>
                  ) : null}

                  {isTeacher ? (
                    <button
                      onClick={() => {
                        setTeacherGradingModal(item);
                        setGradeInput(item.score || 90);
                        setFeedbackInput(item.teacherFeedback || 'Analisis argumentasi sangat baik dan faktual.');
                      }}
                      className="px-5 py-2.5 rounded-xl font-bold text-xs bg-[#0284c7] hover:bg-sky-700 text-white transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{isGraded ? 'Edit Penilaian' : 'Beri Nilai Siswa'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleOpenSubmission(item)}
                      className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 ${
                        isPending
                          ? 'bg-[#0284c7] hover:bg-sky-700 text-white shadow-sky-200'
                          : isSubmitted
                          ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isPending ? (
                        <>
                          <Upload className="w-4 h-4" />
                          <span>Kumpulkan Tugas</span>
                        </>
                      ) : isSubmitted ? (
                        <>
                          <Edit3 className="w-4 h-4" />
                          <span>Lihat / Kirim Ulang</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          <span>Lihat Hasil Nilai</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 text-slate-500 space-y-2">
            <Briefcase className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold">Tidak ada tugas dengan kriteria filter yang dipilih.</p>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* STUDENT SUBMISSION MODAL (KIRIM & KUMPULKAN TUGAS)            */}
      {/* ============================================================== */}
      {activeAssignment && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0284c7] to-[#0369a1] text-white px-5 sm:px-6 py-4 flex items-center justify-between shadow-xs shrink-0">
              <div>
                <span className="text-[10px] uppercase font-bold text-sky-200 tracking-wider">
                  {activeAssignment.subject} · {activeAssignment.status}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  Pengumpulan Lembar Kerja & Tugas Siswa
                </h3>
              </div>
              <button
                onClick={() => setActiveAssignment(null)}
                className="p-1.5 hover:bg-white/20 rounded-lg text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
              
              {/* Success Notification Banner */}
              {submissionSuccessMessage && (
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{submissionSuccessMessage}</span>
                </div>
              )}

              {/* Task Title & Description */}
              <div className="space-y-1 border-b border-slate-100 pb-3">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  {activeAssignment.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeAssignment.description}
                </p>
                <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Batas Waktu: <strong className="text-slate-800">{activeAssignment.dueDate}</strong></span>
                </div>
              </div>

              {/* Status Notice if already submitted */}
              {activeAssignment.status === 'Diserahkan' && (
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-amber-900 block flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
                    <span>Tugas Ini Telah Dikirim Sebelumnya</span>
                  </span>
                  <p className="text-slate-700">
                    Berkas terakhir: <strong className="text-slate-900">{activeAssignment.submittedFileName}</strong> ({activeAssignment.submissionDate}). Anda tetap dapat mengirimkan versi pembaruan jika ada revisi.
                  </p>
                </div>
              )}

              {/* Rubric Preview Card */}
              <div className="p-3.5 bg-sky-50/70 border border-sky-200 rounded-xl text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sky-900 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                    <span>Rubrik Penilaian Asesmen Guru:</span>
                  </span>
                  <span className="text-[10px] bg-sky-200 text-sky-900 font-bold px-2 py-0.5 rounded">Maks 100 Poin</span>
                </div>
                <ul className="text-[11px] text-slate-600 space-y-0.5 list-disc list-inside">
                  <li>Kesesuaian Konsep Teori & Ketepatan Analisis Data (40 Poin)</li>
                  <li>Sistematika Langkah Eksperimen & Bukti Praktikum (40 Poin)</li>
                  <li>Kerapian Format Tata Tulis & Rujukan Pustaka (20 Poin)</li>
                </ul>
              </div>

              {/* Submission Method Switcher Tabs */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Pilih Metode Pengumpulan Jawaban:
                </label>
                <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
                  <button
                    onClick={() => setSubmissionTab('file')}
                    className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      submissionTab === 'file'
                        ? 'bg-white text-[#0284c7] font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Unggah Berkas</span>
                  </button>
                  <button
                    onClick={() => setSubmissionTab('text')}
                    className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      submissionTab === 'text'
                        ? 'bg-white text-[#0284c7] font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Tulis Jawaban Esai</span>
                  </button>
                  <button
                    onClick={() => setSubmissionTab('link')}
                    className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      submissionTab === 'link'
                        ? 'bg-white text-[#0284c7] font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>Tautan Cloud</span>
                  </button>
                </div>
              </div>

              {/* METHOD 1: FILE UPLOAD + INSTANT SELECTION & 1-CLICK SAMPLE */}
              {submissionTab === 'file' && (
                <div className="space-y-3">
                  {/* Hidden native input with broad accept to prevent OS registry scanning delay */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="*/*"
                    onChange={handleSimulateUpload}
                    className="hidden"
                  />

                  {uploadedFileName ? (
                    /* File Selected Preview Card with Instant Change / Remove */
                    <div className="bg-emerald-50/60 border-2 border-emerald-300 rounded-2xl p-4.5 transition-all shadow-2xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 shadow-2xs">
                            <FileCheck className="w-6 h-6" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs sm:text-sm font-bold text-slate-900 truncate block">
                                {uploadedFileName}
                              </span>
                              <span className="text-[10px] bg-emerald-200/90 text-emerald-900 font-extrabold px-2 py-0.5 rounded-full shrink-0">
                                ✓ Siap Dikirim
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                              <span className="font-mono font-bold text-slate-700">{uploadedFileSize || '2.4 MB'}</span>
                              <span>•</span>
                              <span>Berkas telah dipilih dari komputer / HP</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3 py-1.5 bg-white hover:bg-sky-50 text-[#0284c7] border border-sky-200 hover:border-sky-300 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
                            title="Ganti dengan berkas lain"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Ganti File</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setUploadedFileName('');
                              setUploadedFileSize('');
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                            title="Hapus pilihan berkas"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Instant Zero-Delay Click Area & Drag and Drop Dropzone */
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsDragging(true);
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsDragging(false);
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsDragging(false);
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                          const file = e.dataTransfer.files[0];
                          setUploadedFileName(file.name);
                          const sizeMb = file.size / (1024 * 1024);
                          setUploadedFileSize(
                            sizeMb >= 1
                              ? `${sizeMb.toFixed(1)} MB`
                              : `${Math.max(1, Math.round(file.size / 1024))} KB`
                          );
                        }
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-5 sm:p-6 text-center cursor-pointer group transition-all select-none ${
                        isDragging
                          ? 'border-[#0284c7] bg-sky-50/90 scale-[1.01] shadow-md ring-2 ring-sky-300'
                          : 'border-slate-300 hover:border-[#0284c7] bg-slate-50/70 hover:bg-sky-50/40'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-sky-100 text-[#0284c7] flex items-center justify-center mx-auto mb-2.5 group-hover:scale-110 group-hover:bg-[#0284c7] group-hover:text-white transition-all shadow-2xs pointer-events-none">
                        <Upload className="w-6 h-6" />
                      </div>

                      <div className="pointer-events-none space-y-1">
                        <span className="text-sm font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors block">
                          Klik untuk memilih file dari komputer / HP
                        </span>
                        <p className="text-xs text-slate-500">
                          Langsung membuka file picker perangkat atau seret & lepas berkas ke sini
                        </p>
                        <p className="text-[11px] text-slate-400 font-medium pt-0.5">
                          Format: PDF, Word (DOCX), Excel (XLSX), Gambar, IPYNB (Maks. 50 MB)
                        </p>
                      </div>

                      <div className="mt-3.5 inline-flex items-center gap-2 px-4 py-2 bg-[#0284c7] group-hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all pointer-events-none">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Pilih Berkas Sekarang</span>
                      </div>
                    </div>
                  )}

                  {/* 1-Click Fast Presets for Instant Testing (0 Delay) */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-semibold text-[11px] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Pilihan Cepat Berkas Siap Pakai (1-Klik Tanpa Cari File):</span>
                      </span>
                      <span className="text-[10px] text-slate-400">Instan</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleUsePresetFile(
                            `Laporan_${activeAssignment.subject.replace(/[^a-zA-Z0-9]/g, '_')}_Rafiandra_XI_MIPA1.pdf`,
                            '2.8 MB'
                          )
                        }
                        className="px-3 py-1.5 bg-white hover:bg-amber-50 text-slate-800 hover:text-amber-900 border border-slate-200 hover:border-amber-300 rounded-xl text-xs font-medium transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
                        title="Pilih contoh file laporan PDF"
                      >
                        <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                        <span className="font-semibold truncate max-w-[170px]">Laporan_{activeAssignment.subject.split(' ')[0]}.pdf</span>
                        <span className="text-[10px] text-slate-400 font-mono shrink-0">2.8 MB</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleUsePresetFile(
                            `Tugas_Esai_Argumentasi_${currentUser.name.replace(/\s+/g, '_')}.docx`,
                            '1.4 MB'
                          )
                        }
                        className="px-3 py-1.5 bg-white hover:bg-sky-50 text-slate-800 hover:text-sky-900 border border-slate-200 hover:border-sky-300 rounded-xl text-xs font-medium transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
                        title="Pilih contoh file Word DOCX"
                      >
                        <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                        <span className="font-semibold truncate max-w-[160px]">Tugas_Esai_Lengkap.docx</span>
                        <span className="text-[10px] text-slate-400 font-mono shrink-0">1.4 MB</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleUsePresetFile('Data_Tabel_Pengamatan_Praktikum.xlsx', '890 KB')
                        }
                        className="px-3 py-1.5 bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 border border-slate-200 hover:border-emerald-300 rounded-xl text-xs font-medium transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
                        title="Pilih contoh file Excel XLSX"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                        <span className="font-semibold truncate max-w-[150px]">Data_Observasi.xlsx</span>
                        <span className="text-[10px] text-slate-400 font-mono shrink-0">890 KB</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* METHOD 2: ONLINE TEXT ESSAY */}
              {submissionTab === 'text' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-bold text-slate-700">Tulis Jawaban / Laporan Esai di Bawah Ini:</label>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {essayText.trim().split(/\s+/).filter(Boolean).length} Kata
                    </span>
                  </div>
                  <textarea
                    rows={6}
                    value={essayText}
                    onChange={(e) => setEssayText(e.target.value)}
                    placeholder="Tuliskan jawaban Anda secara rinci, cantumkan langkah perhitungan atau analisis data..."
                    className="w-full text-xs p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284c7] transition-all leading-relaxed text-slate-800 font-sans"
                  />
                </div>
              )}

              {/* METHOD 3: CLOUD LINK */}
              {submissionTab === 'link' && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    Tautan Google Drive / OneDrive / GitHub Repository:
                  </label>
                  <div className="relative">
                    <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      placeholder="https://drive.google.com/file/d/..."
                      value={submissionLink}
                      onChange={(e) => setSubmissionLink(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0284c7] transition-all"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    *Pastikan akses tautan Google Drive disetel ke "Siapa saja yang memiliki link dapat melihat".
                  </p>
                </div>
              )}

              {/* Additional Student Notes */}
              <div className="space-y-1 pt-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Catatan Tambahan untuk Guru (Opsional):
                </label>
                <input
                  type="text"
                  placeholder="Misal: Sudah dilengkapi grafik titik ekuivalen pada halaman 4."
                  value={studentNotes}
                  onChange={(e) => setStudentNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0284c7] transition-all text-slate-800"
                />
              </div>

              {/* Animated Progress Bar during Sending */}
              {isSubmitting && (
                <div className="space-y-1.5 p-3.5 bg-sky-50 rounded-xl border border-sky-200 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs font-bold text-sky-900">
                    <span className="flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#0284c7]" />
                      <span>Mengunggah dan Memverifikasi Berkas...</span>
                    </span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-sky-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0284c7] transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer Actions */}
            <div className="bg-slate-50 border-t border-slate-200 px-5 sm:px-6 py-3 flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={() => setActiveAssignment(null)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Tutup
              </button>

              <button
                type="button"
                disabled={isSubmitting || (!uploadedFileName && !essayText.trim() && !submissionLink.trim())}
                onClick={handleSubmitTask}
                className="px-5 py-2.5 bg-[#0284c7] hover:bg-sky-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>
                  {isSubmitting 
                    ? 'Sedang Mengirim...' 
                    : activeAssignment.status === 'Diserahkan'
                    ? 'Kirim Ulang / Perbarui Jawaban'
                    : 'Kirimkan Tugas Sekarang'}
                </span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: KIRIM TUGAS MANDIRI / TAMBAH TUGAS BARU                */}
      {/* ============================================================== */}
      {isNewTaskModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-[#0284c7] text-white px-5 py-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-sky-200">
                  Pengumpulan Mandiri Siswa
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  Kirim Tugas Mandiri / Proyek Tambahan
                </h3>
              </div>
              <button
                onClick={() => setIsNewTaskModalOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Mata Pelajaran:</label>
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                >
                  <option value="Kimia Analitik 11 MIPA">Kimia Analitik 11 MIPA</option>
                  <option value="Fisika Peminatan 11 MIPA">Fisika Peminatan 11 MIPA</option>
                  <option value="Biologi Sel 11 MIPA">Biologi Sel 11 MIPA</option>
                  <option value="Matematika Peminatan">Matematika Peminatan</option>
                  <option value="Matematika Wajib">Matematika Wajib</option>
                  <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                  <option value="Bahasa Inggris">Bahasa Inggris</option>
                  <option value="Projek Penguatan P5">Projek Penguatan P5</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Judul Tugas / Laporan:</label>
                <input
                  type="text"
                  placeholder="Misal: Laporan Pengujian Sampel Air Mandiri"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Deskripsi Tugas / Lembar Kerja:</label>
                <textarea
                  rows={3}
                  placeholder="Tuliskan ringkasan materi atau tujuan eksperimen mandiri yang Anda kerjakan..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewTaskModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  disabled={!newTitle.trim()}
                  onClick={handleCreateNewTask}
                  className="px-5 py-2 bg-[#0284c7] hover:bg-sky-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Tambahkan ke Daftar Tugas
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TEACHER GRADING MODAL (FOR GURU ROLE)                          */}
      {/* ============================================================== */}
      {teacherGradingModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-[#0284c7] text-white px-5 py-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-sky-200">
                  Penilaian Guru SMAN 25
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  Input Nilai & Umpan Balik Siswa
                </h3>
              </div>
              <button
                onClick={() => setTeacherGradingModal(null)}
                className="p-1.5 hover:bg-white/20 rounded-lg text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <span className="text-xs text-[#0284c7] font-semibold">{teacherGradingModal.subject}</span>
                <h4 className="font-bold text-slate-900 text-sm mt-0.5">{teacherGradingModal.title}</h4>
                <p className="text-xs text-slate-500 mt-1">{teacherGradingModal.description}</p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Nilai Angka (Skala 0 - 100):
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={gradeInput}
                  onChange={(e) => setGradeInput(parseInt(e.target.value) || 0)}
                  className="w-32 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Catatan Koreksi & Umpan Balik Guru:
                </label>
                <textarea
                  rows={3}
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => setTeacherGradingModal(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveTeacherGrade}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simpan Nilai Siswa</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
