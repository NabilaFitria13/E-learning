import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { AttendanceView } from './components/AttendanceView';
import { ExamsListView } from './components/ExamsListView';
import { InteractiveSimulations } from './components/InteractiveSimulations';
import { CoursesView } from './components/CoursesView';
import { AssignmentsView } from './components/AssignmentsView';
import { ScheduleView } from './components/ScheduleView';
import { ReportCardView } from './components/ReportCardView';
import { SettingsView } from './components/SettingsView';
import { CounselingView } from './components/CounselingView';
import { CBTExamModal } from './components/CBTExamModal';
import { AttendanceModal } from './components/AttendanceModal';
import { ModulAjarModal } from './components/ModulAjarModal';
import { LoginModal } from './components/LoginModal';
import { TeacherDashboardView } from './components/TeacherDashboardView';
import { CURRENT_STUDENT_XI_IPA, resolveModulAjar } from './data/mockData';
import { ExamItem, UserProfile, ModulAjarData } from './types';
import { authService } from './services/authService';
import { 
  Home, 
  Calendar, 
  Camera, 
  BookOpen, 
  FlaskConical,
  FileText,
  Settings,
  GraduationCap
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('beranda');
  const [currentSchool, setCurrentSchool] = useState<string>('SMAN 25 Jakarta Barat');

  // Mobile drawer state
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  // Modals & Active Workflows
  const [activeExam, setActiveExam] = useState<ExamItem | null>(null);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState<boolean>(false);
  const [activeModulAjar, setActiveModulAjar] = useState<ModulAjarData | null>(null);
  const [activeSimInitial, setActiveSimInitial] = useState<'titrasi_kimia' | 'fisika_newton'>('titrasi_kimia');
  const [selectedCourseForView, setSelectedCourseForView] = useState<string | null>(null);
  
  // Attendance State
  const [hasCheckedIn, setHasCheckedIn] = useState<boolean>(false);
  const [todayCheckInTime, setTodayCheckInTime] = useState<string>('06.45 WIB');

  // Authentication & Session State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!authService.getToken();
  });
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    return authService.getCachedUser() || CURRENT_STUDENT_XI_IPA;
  });

  // Verify active session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const res = await authService.getCurrentUser();
      if (res.success && res.user) {
        setCurrentUser(res.user);
        setIsAuthenticated(true);
        if (res.user.school) {
          setCurrentSchool(res.user.school);
        }
      } else {
        // If no valid session token exists, open login modal
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    if (user.school) {
      setCurrentSchool(user.school);
    }
    setIsAuthenticated(true);
    setActiveTab('beranda');
  };

  const handleLogout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    setActiveTab('beranda');
  };

  // Theme & Language
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [language, setLanguage] = useState<'id' | 'en'>('id');

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setCurrentUser(prev => ({
      ...prev,
      ...updated,
    }));
  };

  const handleStartExam = (exam: ExamItem) => {
    setActiveExam(exam);
  };

  const handleOpenSimulation = (simType: 'titrasi_kimia' | 'fisika_newton') => {
    setActiveSimInitial(simType);
    setActiveTab('lab_simulasi');
  };

  const handleOpenModulAjar = (subjectName: string) => {
    const found = resolveModulAjar(subjectName);
    setActiveModulAjar(found);
  };

  const handleNavigateToCourse = (courseId: string, _subjectName?: string) => {
    setSelectedCourseForView(courseId);
    setActiveTab('kelas');
  };

  const handleSuccessCheckIn = (timeStr: string) => {
    setHasCheckedIn(true);
    setTodayCheckInTime(timeStr);
  };

  return (
    <div className={`min-h-screen flex flex-col antialiased transition-colors duration-200 ${
      isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-[#F4F6F9] text-slate-800'
    }`}>
      <div className="flex flex-1 min-h-screen">
        {/* Responsive Sidebar (Sticky on Desktop, Slide-over Drawer on Mobile) */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentUser={currentUser}
          isMobileOpen={isMobileDrawerOpen}
          onCloseMobile={() => setIsMobileDrawerOpen(false)}
          onLogout={handleLogout}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Header */}
          <Header
            currentUser={currentUser}
            currentSchool={currentSchool}
            onSwitchSchool={setCurrentSchool}
            onOpenAttendance={() => setIsAttendanceModalOpen(true)}
            onOpenSettings={() => setActiveTab('pengaturan')}
            onToggleMobileMenu={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            onLogout={handleLogout}
          />

          {/* Dynamic Tab Views */}
          <main className="flex-1 pb-20 md:pb-12">
            {/* ROLE GURU / PENGAJAR SPECIFIC VIEWS */}
            {currentUser.role === 'guru' ? (
              <>
                {activeTab === 'beranda' && (
                  <TeacherDashboardView
                    currentUser={currentUser}
                    currentSchool={currentSchool}
                    onNavigateTab={setActiveTab}
                    initialTeacherTab="ikhtisar"
                  />
                )}

                {activeTab === 'manajemen_kelas' && (
                  <TeacherDashboardView
                    currentUser={currentUser}
                    currentSchool={currentSchool}
                    onNavigateTab={setActiveTab}
                    initialTeacherTab="nilai"
                  />
                )}

                {activeTab === 'bank_soal' && (
                  <TeacherDashboardView
                    currentUser={currentUser}
                    currentSchool={currentSchool}
                    onNavigateTab={setActiveTab}
                    initialTeacherTab="cbt"
                  />
                )}

                {activeTab === 'kelola_materi' && (
                  <TeacherDashboardView
                    currentUser={currentUser}
                    currentSchool={currentSchool}
                    onNavigateTab={setActiveTab}
                    initialTeacherTab="materi"
                  />
                )}

                {activeTab === 'presensi_guru' && (
                  <TeacherDashboardView
                    currentUser={currentUser}
                    currentSchool={currentSchool}
                    onNavigateTab={setActiveTab}
                    initialTeacherTab="presensi"
                  />
                )}

                {activeTab === 'lab_simulasi' && (
                  <InteractiveSimulations
                    key={activeSimInitial}
                    initialTab={activeSimInitial}
                  />
                )}

                {activeTab === 'pengaturan' && (
                  <SettingsView 
                    currentUser={currentUser}
                    currentSchool={currentSchool}
                    onNavigateTab={setActiveTab}
                    onUpdateProfile={handleUpdateProfile}
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={setIsDarkMode}
                    language={language}
                    onChangeLanguage={setLanguage}
                    onLogout={handleLogout}
                  />
                )}
              </>
            ) : (
              /* ROLE SISWA VIEWS - FULLY PRESERVED WITHOUT ANY CHANGES */
              <>
                {activeTab === 'beranda' && (
                  <DashboardView
                    currentUser={currentUser}
                    onOpenAttendance={() => setIsAttendanceModalOpen(true)}
                    onStartExam={handleStartExam}
                    onOpenSimulation={handleOpenSimulation}
                    onOpenModulAjar={handleOpenModulAjar}
                    onNavigateTab={setActiveTab}
                    hasCheckedIn={hasCheckedIn}
                    todayCheckInTime={todayCheckInTime}
                  />
                )}

                {activeTab === 'kehadiran' && (
                  <AttendanceView
                    currentUser={currentUser}
                    currentSchool={currentSchool}
                    hasCheckedIn={hasCheckedIn}
                    todayCheckInTime={todayCheckInTime}
                    onOpenAttendanceModal={() => setIsAttendanceModalOpen(true)}
                  />
                )}

                {activeTab === 'ujian' && (
                  <ExamsListView
                    currentUser={currentUser}
                    onStartExam={handleStartExam}
                  />
                )}

                {activeTab === 'lab_simulasi' && (
                  <InteractiveSimulations
                    key={activeSimInitial}
                    initialTab={activeSimInitial}
                  />
                )}

                {activeTab === 'kelas' && (
                  <CoursesView 
                    currentUser={currentUser}
                    onOpenSimulation={handleOpenSimulation}
                    onOpenModulAjar={handleOpenModulAjar}
                    onNavigateTab={setActiveTab}
                    initialCourseId={selectedCourseForView}
                    onClearInitialCourse={() => setSelectedCourseForView(null)}
                  />
                )}

                {activeTab === 'tugas' && (
                  <AssignmentsView currentUser={currentUser} />
                )}

                {activeTab === 'konseling' && (
                  <CounselingView currentUser={currentUser} />
                )}

                {activeTab === 'jadwal' && (
                  <ScheduleView 
                    currentUser={currentUser}
                    onOpenModulAjar={handleOpenModulAjar} 
                    onNavigateToCourse={handleNavigateToCourse}
                    onNavigateTab={setActiveTab}
                  />
                )}

                {activeTab === 'rapor' && (
                  <ReportCardView currentUser={currentUser} />
                )}

                {activeTab === 'pengaturan' && (
                  <SettingsView 
                    currentUser={currentUser}
                    currentSchool={currentSchool}
                    onNavigateTab={setActiveTab}
                    onUpdateProfile={handleUpdateProfile}
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={setIsDarkMode}
                    language={language}
                    onChangeLanguage={setLanguage}
                    onLogout={handleLogout}
                  />
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar (Visible only on smartphones < 768px) */}
      <nav className={`md:hidden fixed bottom-0 inset-x-0 backdrop-blur-md border-t z-40 px-2 py-1.5 flex items-center justify-around shadow-lg transition-colors ${
        isDarkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'
      }`}>
        <button
          onClick={() => setActiveTab('beranda')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'beranda' ? 'text-[#0284c7] dark:text-sky-400 font-bold' : isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Beranda</span>
        </button>

        <button
          onClick={() => setActiveTab(currentUser.role === 'guru' ? 'manajemen_kelas' : 'jadwal')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-all cursor-pointer ${
            activeTab === (currentUser.role === 'guru' ? 'manajemen_kelas' : 'jadwal') ? 'text-[#0284c7] dark:text-sky-400 font-bold' : isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {currentUser.role === 'guru' ? <GraduationCap className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
          <span className="text-[10px]">{currentUser.role === 'guru' ? 'Nilai' : 'Jadwal'}</span>
        </button>

        {/* Floating Center Action: Presensi Kamera Selfie / Mengajar */}
        <button
          onClick={() => setIsAttendanceModalOpen(true)}
          className="flex flex-col items-center -mt-4 p-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer ring-4 ring-white dark:ring-slate-900"
          title={currentUser.role === 'guru' ? 'Presensi mengajar guru' : 'Presensi kamera selfie'}
        >
          <Camera className="w-5 h-5" />
        </button>

        <button
          onClick={() => setActiveTab(currentUser.role === 'guru' ? 'bank_soal' : 'kelas')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-all cursor-pointer ${
            activeTab === (currentUser.role === 'guru' ? 'bank_soal' : 'kelas') ? 'text-[#0284c7] dark:text-sky-400 font-bold' : isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {currentUser.role === 'guru' ? <FileText className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
          <span className="text-[10px]">{currentUser.role === 'guru' ? 'Bank CBT' : 'Materi'}</span>
        </button>

        <button
          onClick={() => setActiveTab('pengaturan')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'pengaturan' ? 'text-[#0284c7] dark:text-sky-400 font-bold' : isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className="text-[10px]">Pengaturan</span>
        </button>
      </nav>

      {/* CBT Exam Modal */}
      {activeExam && (
        <CBTExamModal
          exam={activeExam}
          studentName={currentUser.name}
          onClose={() => setActiveExam(null)}
        />
      )}

      {/* Attendance Verification Modal with Real Camera Snapshot */}
      {isAttendanceModalOpen && (
        <AttendanceModal
          currentUser={currentUser}
          currentSchool={currentSchool}
          hasCheckedIn={hasCheckedIn}
          onSuccessCheckIn={handleSuccessCheckIn}
          onClose={() => setIsAttendanceModalOpen(false)}
        />
      )}

      {/* Modul Ajar Interactive Modal (Direct Reading Without Downloading PDF) */}
      {activeModulAjar && (
        <ModulAjarModal
          modul={activeModulAjar}
          onClose={() => setActiveModulAjar(null)}
          onOpenSimulation={handleOpenSimulation}
        />
      )}

      {/* Login & Session Authentication Modal */}
      <LoginModal
        isOpen={!isAuthenticated}
        onLoginSuccess={handleLoginSuccess}
        currentSchool={currentSchool}
      />
    </div>
  );
}
