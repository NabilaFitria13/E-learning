import React, { useState } from 'react';
import { 
  X, 
  Wifi, 
  Battery, 
  Signal, 
  CheckCircle2, 
  Home, 
  Calendar, 
  Award, 
  Clock, 
  User,
  GraduationCap
} from 'lucide-react';
import { UserProfile } from '../types';
import { MOCK_SCHEDULE_BY_ROLE } from '../data/mockData';

interface MobileAppMockupModalProps {
  currentUser: UserProfile;
  onClose: () => void;
  onOpenAttendance: () => void;
  hasCheckedIn: boolean;
}

export const MobileAppMockupModal: React.FC<MobileAppMockupModalProps> = ({
  currentUser,
  onClose,
  onOpenAttendance,
  hasCheckedIn,
}) => {
  const [selectedMobileDate, setSelectedMobileDate] = useState(18);
  const [mobileTab, setMobileTab] = useState<'beranda' | 'kehadiran' | 'ujian'>('beranda');

  const mobileDates = [
    { day: 'Sen', num: 14 },
    { day: 'Sel', num: 15 },
    { day: 'Rab', num: 16 },
    { day: 'Kam', num: 17 },
    { day: 'Jum', num: 18 },
    { day: 'Sab', num: 19 },
    { day: 'Min', num: 20 },
  ];

  // Retrieve today's schedule for this user role
  const userSchedule = (MOCK_SCHEDULE_BY_ROLE[currentUser.role] || MOCK_SCHEDULE_BY_ROLE['siswa_mipa'])
    .filter((s) => s.day === 'Senin')
    .slice(0, 4);

  const isTeacher = currentUser.role === 'guru';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative">
        
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-11 right-0 text-white hover:text-slate-200 flex items-center gap-1.5 text-xs font-semibold bg-white/20 px-3 py-1.5 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
          <span>Tutup Pratinjau Mobile</span>
        </button>

        {/* Smartphone Frame */}
        <div className="w-[340px] sm:w-[375px] h-[720px] bg-black rounded-[48px] p-3 shadow-2xl border-4 border-slate-700 relative overflow-hidden flex flex-col">
          
          {/* Inner Screen */}
          <div className="w-full h-full bg-[#f8fafc] rounded-[38px] overflow-hidden flex flex-col relative">
            
            {/* Top Status Bar (9:41, Dynamic Island, Battery) */}
            <div className="bg-[#0284c7] text-white px-6 pt-3 pb-2 flex items-center justify-between text-xs font-semibold select-none z-20">
              <span>9:41</span>
              <div className="w-24 h-4.5 bg-black rounded-full flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800"></div>
              </div>
              <div className="flex items-center gap-1.5 text-white">
                <Signal className="w-3.5 h-3.5" />
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-4 h-4" />
              </div>
            </div>

            {/* Mobile App Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-14 space-y-3">
              
              {/* Blue Header Card with Dynamic Name & School Name */}
              <div className="bg-gradient-to-b from-[#0284c7] to-[#0ea5e9] text-white px-5 pt-3 pb-6 relative overflow-hidden rounded-b-3xl shadow-sm">
                <div className="relative z-10 space-y-1">
                  <span className="text-[11px] text-sky-100 font-medium">
                    {isTeacher ? 'Selamat bertugas' : 'Selamat pagi Bapak/Ibu dari'}
                  </span>
                  <h3 className="text-lg font-black tracking-tight text-white leading-tight">
                    {currentUser.name}
                  </h3>
                  <div className="inline-block bg-white/20 backdrop-blur-xs text-[10px] font-bold px-2 py-0.5 rounded-md text-sky-100">
                    SMAN 25 Jakarta · {currentUser.className}
                  </div>
                </div>

                {/* Illustrated Student Avatars */}
                <div className="absolute right-2 -bottom-1 flex items-end opacity-95 pointer-events-none">
                  <div className="w-16 h-20 bg-amber-200 rounded-t-2xl relative flex flex-col items-center justify-start border-2 border-white/60 shadow-xs mr-1">
                    <div className="w-9 h-9 rounded-full bg-slate-900 -mt-2"></div>
                    <div className="w-full h-8 bg-sky-600 mt-2 rounded-t-lg flex justify-center">
                      <div className="w-2 h-5 bg-sky-900"></div>
                    </div>
                  </div>
                  <div className="w-16 h-22 bg-amber-100 rounded-t-2xl relative flex flex-col items-center justify-start border-2 border-white/60 shadow-xs">
                    <div className="w-10 h-10 rounded-full bg-amber-900 -mt-2"></div>
                    <div className="w-full h-9 bg-orange-400 mt-2 rounded-t-lg"></div>
                  </div>
                </div>
              </div>

              {/* Card: Kehadiran Siswa Harian */}
              <div className="px-4 space-y-3">
                <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-800 text-xs">
                      {isTeacher ? 'Jadwal Mengajar Harian' : 'Kehadiran Siswa Harian'}
                    </h4>
                    <span className="text-[10px] text-[#0284c7] font-semibold">
                      Agustus 2024
                    </span>
                  </div>

                  {/* Horizontal mini date picker */}
                  <div className="flex items-center justify-between text-center pt-1">
                    {mobileDates.map((item) => {
                      const isSelected = selectedMobileDate === item.num;
                      return (
                        <button
                          key={item.num}
                          onClick={() => setSelectedMobileDate(item.num)}
                          className="flex flex-col items-center cursor-pointer"
                        >
                          <span className="text-[10px] text-slate-400 font-medium">
                            {item.day}
                          </span>
                          <span
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs mt-1 transition-all ${
                              isSelected
                                ? 'bg-[#0284c7] text-white font-bold shadow-xs'
                                : 'text-slate-700'
                            }`}
                          >
                            {item.num}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* List of class sessions matching the active user role */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    {userSchedule.map((session, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="text-[10px] text-slate-400 block font-mono">
                            {session.time}
                          </span>
                          <span className="font-bold text-slate-800 line-clamp-1">{session.subject}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center gap-1 shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {session.status === 'Selesai' ? 'Hadir' : session.status === 'Berlangsung' ? 'Aktif' : 'Akan Datang'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Presensi GPS Trigger */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl p-3.5 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">
                      {isTeacher ? 'Presensi Guru SMAN 25' : 'Presensi Siswa SMAN 25'}
                    </span>
                    <Clock className="w-4 h-4 text-amber-200" />
                  </div>
                  <p className="text-[11px] text-amber-100 leading-snug">
                    {hasCheckedIn
                      ? `Presensi untuk ${currentUser.name.split(' ')[0]} telah diverifikasi.`
                      : 'Lakukan selfie dan cek lokasi radius sekolah sebelum batas waktu.'}
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAttendance();
                    }}
                    className="w-full py-1.5 bg-white text-orange-600 font-bold rounded-xl text-xs hover:bg-amber-50 transition-colors shadow-2xs"
                  >
                    {hasCheckedIn ? 'Lihat Bukti Kehadiran' : 'Presensi Sekarang'}
                  </button>
                </div>
              </div>

            </div>

            {/* Mobile Bottom Navigation Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-white border-t border-slate-200 px-6 py-2 flex items-center justify-between text-slate-500 text-[10px] font-semibold z-20">
              <button
                onClick={() => setMobileTab('beranda')}
                className={`flex flex-col items-center gap-0.5 ${
                  mobileTab === 'beranda' ? 'text-[#0284c7]' : ''
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Beranda</span>
              </button>
              <button
                onClick={() => setMobileTab('kehadiran')}
                className={`flex flex-col items-center gap-0.5 ${
                  mobileTab === 'kehadiran' ? 'text-[#0284c7]' : ''
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Presensi</span>
              </button>
              <button
                onClick={() => setMobileTab('ujian')}
                className={`flex flex-col items-center gap-0.5 ${
                  mobileTab === 'ujian' ? 'text-[#0284c7]' : ''
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Ujian</span>
              </button>
              <button
                className="flex flex-col items-center gap-0.5 text-slate-400"
              >
                <User className="w-4 h-4" />
                <span>Profil</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
