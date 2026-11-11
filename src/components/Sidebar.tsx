import React from 'react';
import { 
  Home, 
  UserCheck, 
  FileText, 
  BookOpen, 
  Briefcase, 
  Calendar, 
  Award, 
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  School,
  Video,
  X,
  BadgeCheck,
  Settings,
  LogOut
} from 'lucide-react';
import { UserProfile } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: UserProfile;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  isMobileOpen = false,
  onCloseMobile,
  onLogout,
}) => {
  const isTeacher = currentUser.role === 'guru';

  const studentMenuItems = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'jadwal', label: 'Jadwal Pelajaran', icon: Calendar },
    { id: 'kelas', label: 'Kelas & Materi MIPA', icon: BookOpen },
    { id: 'konseling', label: 'Konseling & Karir (BK)', icon: HeartHandshake },
    { id: 'lab_simulasi', label: 'Lab Sains Virtual', icon: FlaskConical },
    { id: 'kehadiran', label: 'Kehadiran Siswa', icon: UserCheck },
    { id: 'ujian', label: 'UKP / Ujian CBT', icon: FileText },
    { id: 'tugas', label: 'Tugas & PR Sains', icon: Briefcase },
    { id: 'rapor', label: 'Nilai & e-Rapor', icon: Award },
    { id: 'pengaturan', label: 'Pengaturan', icon: Settings },
  ];

  const teacherMenuItems = [
    { id: 'beranda', label: 'Dashboard Guru', icon: Home },
    { id: 'manajemen_kelas', label: 'Manajemen Kelas & Nilai', icon: GraduationCap },
    { id: 'bank_soal', label: 'Bank Soal & CBT', icon: FileText },
    { id: 'kelola_materi', label: 'Kelola Materi Ajar', icon: BookOpen },
    { id: 'presensi_guru', label: 'Rekap Presensi Siswa', icon: UserCheck },
    { id: 'lab_simulasi', label: 'Lab Sains Virtual', icon: FlaskConical },
    { id: 'pengaturan', label: 'Pengaturan Akun', icon: Settings },
  ];

  const menuItems = isTeacher ? teacherMenuItems : studentMenuItems;

  const handleTabClick = (itemId: string) => {
    setActiveTab(itemId);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#0284c7] via-[#0369a1] to-[#075985] text-white">
      {/* Brand Logo Header: School Crest and School Name */}
      <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md shrink-0">
            <School className="w-6 h-6 text-[#0284c7]" />
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight text-white leading-tight">
              SMAN 25 Jakarta
            </h1>
            <p className="text-[11px] text-sky-200">
              {isTeacher ? 'Portal Pendidik & LMS' : 'Portal E-Learning SMA'}
            </p>
          </div>
        </div>

        {/* Close button for mobile drawer */}
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 hover:bg-white/20 rounded-lg text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Profile Card */}
      <div className="p-4 mx-3 mt-3 bg-white/10 rounded-2xl border border-white/15 backdrop-blur-xs shrink-0">
        <div className="flex items-center gap-3">
          {currentUser.avatarUrl ? (
            <img 
              src={currentUser.avatarUrl} 
              alt={currentUser.name}
              className="w-11 h-11 rounded-full object-cover shadow-md ring-2 ring-white/30 shrink-0" 
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-base shadow-md ring-2 ring-white/30 shrink-0">
              {currentUser.name.charAt(0)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-white truncate block">
                {currentUser.name}
              </span>
              <BadgeCheck className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            </div>
            <span className="text-[10px] text-amber-200 font-semibold block">
              {isTeacher ? 'Guru Pengampu Kimia' : 'Siswa Kelas 11 Jurusan MIPA'}
            </span>
            <span className="text-[9px] text-sky-200 block truncate font-mono">
              {isTeacher ? `NIP: ${currentUser.nisn}` : `NISN: ${currentUser.nisn}`}
            </span>
          </div>
        </div>
        <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
          <span className="text-sky-200">{isTeacher ? 'Tugas Mengajar:' : 'Rombel:'}</span>
          <span className="font-bold bg-sky-900/60 text-sky-100 px-2 py-0.5 rounded truncate max-w-[130px]">
            {isTeacher ? 'Kimia XI MIPA 1 & 2' : currentUser.className}
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        <div>
          <div className="px-3 pb-2 text-[10px] font-bold text-sky-200 uppercase tracking-wider">
            {isTeacher ? 'Menu Pengajar & Pendidik' : 'Menu Pembelajaran Siswa MIPA'}
          </div>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white/25 text-white font-bold shadow-sm ring-1 ring-white/30 backdrop-blur-xs pl-4'
                      : 'text-sky-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {/* Active Highlight Bar on Left Edge */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-amber-400 rounded-r-full shadow-md" />
                  )}

                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-transform ${isActive ? 'text-amber-300 scale-110 drop-shadow-xs' : 'text-sky-200'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.id === 'ujian' && (
                      <span className="text-[10px] bg-amber-400 text-slate-900 font-bold px-1.5 py-0.5 rounded-full shadow-xs">
                        CBT
                      </span>
                    )}
                    {item.id === 'lab_simulasi' && (
                      <span className="text-[10px] bg-emerald-400 text-slate-950 font-bold px-1.5 py-0.5 rounded-full shadow-xs">
                        Sains
                      </span>
                    )}
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse hidden sm:inline-block" />
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout Quick Action */}
        {onLogout && (
          <div className="pt-2">
            <button
              onClick={() => {
                if (onCloseMobile) onCloseMobile();
                onLogout();
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-rose-200 hover:bg-rose-500/20 hover:text-white transition-all cursor-pointer border border-rose-400/20"
            >
              <LogOut className="w-4 h-4 text-rose-300" />
              <span>Keluar dari Akun</span>
            </button>
          </div>
        )}
      </div>

      {/* Footer System Status */}
      <div className="p-3 border-t border-white/10 bg-black/10 shrink-0 text-center text-[10px] text-sky-200">
        <span>Kurikulum Merdeka Fase F · {currentUser.school}</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 h-screen sticky top-0 shadow-xl z-30 select-none flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Over Drawer Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div 
            onClick={onCloseMobile}
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity"
          />
          {/* Drawer content */}
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
