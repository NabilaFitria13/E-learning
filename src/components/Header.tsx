import React, { useState } from 'react';
import { 
  Bell, 
  Smartphone, 
  Menu,
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Video,
  School,
  X,
  BadgeCheck,
  Settings,
  Sun,
  Moon,
  LogOut
} from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  currentUser: UserProfile;
  currentSchool: string;
  onSwitchSchool: (school: string) => void;
  onOpenMobilePreview?: () => void;
  onOpenAttendance: () => void;
  onOpenSettings?: () => void;
  onToggleMobileMenu?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  currentSchool,
  onSwitchSchool,
  onOpenMobilePreview,
  onOpenAttendance,
  onOpenSettings,
  onToggleMobileMenu,
  isDarkMode = false,
  onToggleDarkMode,
  onLogout,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Modul Fisika & Kimia Siap Dipelajari',
      desc: 'Materi Dinamika Newton dan Titrasi Asam Basa lengkap dapat langsung dibaca.',
      time: 'Baru saja',
      type: 'info',
      read: false,
    },
    {
      id: 2,
      title: 'PTS Kimia Analitik & CBT',
      desc: 'Jadwal ujian penilaian tengah semester akan berlangsung pukul 13.00 WIB.',
      time: '25 menit lalu',
      type: 'warning',
      read: false,
    },
    {
      id: 3,
      title: 'Presensi Kamera Selfie Aktif',
      desc: 'Silakan ambil foto selfie kehadiran harian sebelum pukul 07.15 WIB.',
      time: '40 menit lalu',
      type: 'info',
      read: true,
    },
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className={`border-b px-3 sm:px-6 py-3 sm:py-4 sticky top-0 z-20 shadow-xs transition-colors ${
      isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200/80 text-slate-800'
    }`}>
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left Section: Mobile Menu Trigger + School Info */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* Hamburger button for smartphones */}
          {onToggleMobileMenu && (
            <button
              onClick={onToggleMobileMenu}
              className={`md:hidden p-2 rounded-xl transition-colors cursor-pointer border shrink-0 ${
                isDarkMode 
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800 border-slate-700' 
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100 border-slate-200'
              }`}
              aria-label="Buka Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {/* User Avatar & Info */}
          <div className="flex items-center gap-3 min-w-0">
            {currentUser.avatarUrl ? (
              <img 
                src={currentUser.avatarUrl} 
                alt={currentUser.name} 
                className="w-10 h-10 rounded-full object-cover ring-2 ring-sky-500/40 shrink-0 cursor-pointer shadow-sm hover:scale-105 transition-transform"
                onClick={onOpenSettings}
                title="Buka Pengaturan Profil"
              />
            ) : (
              <div 
                onClick={onOpenSettings}
                className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm shadow-sm ring-2 ring-amber-300/40 shrink-0 cursor-pointer hover:scale-105 transition-transform"
                title="Buka Pengaturan Profil"
              >
                {currentUser.name.charAt(0)}
              </div>
            )}

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5">
                <School className="w-3.5 h-3.5 text-[#0284c7] shrink-0" />
                <span className={`text-xs font-bold truncate ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  {currentSchool}
                </span>
                <span className="hidden sm:inline text-slate-400">·</span>
                <span className={`hidden sm:inline text-[11px] font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {currentUser.role === 'guru' ? 'Kurikulum Merdeka · Portal Pengajar' : 'Kurikulum Merdeka SMA MIPA'}
                </span>
              </div>

              <h1 className={`text-base sm:text-xl md:text-2xl font-bold tracking-tight truncate flex items-center gap-1.5 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                <span>Halo, {currentUser.role === 'guru' ? currentUser.name : currentUser.name.split(' ')[0]}</span>
                <span className={`hidden sm:inline text-xs font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {currentUser.role === 'guru' ? '(Guru Pengampu Kimia)' : `(${currentUser.className})`}
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">

          {/* Presensi Quick Button */}
          <button
            onClick={onOpenAttendance}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            title={currentUser.role === 'guru' ? 'Presensi mengajar guru harian' : 'Presensi kamera selfie harian'}
          >
            <Clock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {currentUser.role === 'guru' ? 'Presensi Mengajar' : 'Presensi Selfie'}
            </span>
            <span className="sm:hidden">Presensi</span>
          </button>

          {/* Dark Mode Toggle Quick Button */}
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-xl transition-colors border cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
              title={isDarkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
              aria-label="Mode Gelap / Terang"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}

          {/* Mobile Preview Trigger (Visible on medium/large screens) */}
          {onOpenMobilePreview && (
            <button
              onClick={onOpenMobilePreview}
              className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
                isDarkMode 
                  ? 'bg-sky-950/60 hover:bg-sky-900 text-sky-300 border-sky-800' 
                  : 'bg-sky-50 hover:bg-sky-100 text-[#0284c7] border-sky-200'
              }`}
              title="Pratinjau tampilan layar HP"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mockup HP</span>
            </button>
          )}

          {/* Settings Button */}
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className={`p-2 rounded-xl transition-colors border cursor-pointer ${
                isDarkMode 
                  ? 'text-slate-300 hover:text-sky-400 hover:bg-slate-800 border-slate-700' 
                  : 'text-slate-600 hover:text-[#0284c7] hover:bg-sky-50 border-slate-200'
              }`}
              title="Pengaturan Akun & Pembelajaran"
              aria-label="Pengaturan"
            >
              <Settings className="w-4 h-4" />
            </button>
          )}

          {/* Logout Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              className={`p-2 rounded-xl transition-colors border cursor-pointer ${
                isDarkMode 
                  ? 'text-rose-400 hover:text-white hover:bg-rose-900/40 border-rose-800/60' 
                  : 'text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200'
              }`}
              title="Keluar dari Akun (Logout)"
              aria-label="Keluar"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}

          {/* Notification Bell Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative p-2 rounded-xl transition-colors border cursor-pointer ${
                isDarkMode 
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800 border-slate-700' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
              }`}
              aria-label="Notifikasi"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 sm:w-88 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-800">Pemberitahuan</span>
                    {unreadCount > 0 && (
                      <span className="text-[10px] bg-sky-100 text-[#0284c7] font-semibold px-2 py-0.5 rounded-full">
                        {unreadCount} baru
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="text-[11px] text-[#0284c7] hover:underline font-medium cursor-pointer"
                      >
                        Tandai dibaca
                      </button>
                    )}
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`py-3 flex gap-3 ${n.read ? 'opacity-70' : 'opacity-100'}`}
                    >
                      <div className="mt-0.5">
                        {n.type === 'urgent' ? (
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></div>
                        ) : n.type === 'warning' ? (
                          <AlertCircle className="w-4 h-4 text-amber-500" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0 text-xs">
                        <p className="font-bold text-slate-800 leading-snug">{n.title}</p>
                        <p className="text-slate-500 text-[11px] mt-0.5">{n.desc}</p>
                        <span className="text-[10px] text-slate-400 block mt-1">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
