import React from 'react';
import { 
  UserCheck, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Calendar as CalendarIcon,
  ShieldCheck,
  Camera,
  Users
} from 'lucide-react';
import { UserProfile, AttendanceRecord } from '../types';
import { mockAttendance, MOCK_ATTENDANCE_HISTORY } from '../data/mockData';

interface AttendanceViewProps {
  currentUser: UserProfile;
  currentSchool: string;
  hasCheckedIn: boolean;
  todayCheckInTime?: string;
  onOpenAttendanceModal: () => void;
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({
  currentUser,
  currentSchool,
  hasCheckedIn,
  todayCheckInTime = '06.45 WIB',
  onOpenAttendanceModal,
}) => {
  return (
    <div className="p-3 sm:p-5 md:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider">
            Sistem Presensi Siswa Digital · {currentUser.className}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-0.5">
            Presensi Kehadiran Siswa Kelas 11 MIPA
          </h2>
        </div>

        <button
          onClick={onOpenAttendanceModal}
          className="px-4 sm:px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Camera className="w-4 h-4" />
          <span>{hasCheckedIn ? 'Cek Foto Selfie Hari Ini' : 'Isi Presensi Selfie Sekarang'}</span>
        </button>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs">
          <span className="text-xs text-slate-400 block font-medium">Total Kehadiran Saya</span>
          <span className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight">96%</span>
          <span className="text-[11px] text-slate-500 block mt-0.5">24 dari 25 Hari</span>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs">
          <span className="text-xs text-slate-400 block font-medium">Hadir Tepat Waktu</span>
          <span className="text-xl sm:text-2xl font-black text-[#0284c7] tracking-tight">23 Hari</span>
          <span className="text-[11px] text-sky-600 block mt-0.5">Disiplin Tinggi</span>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs">
          <span className="text-xs text-slate-400 block font-medium">Sakit (Dengan Surat)</span>
          <span className="text-xl sm:text-2xl font-black text-amber-600 tracking-tight">1 Hari</span>
          <span className="text-[11px] text-amber-600 block mt-0.5">Puskesmas</span>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs">
          <span className="text-xs text-slate-400 block font-medium">Tanpa Keterangan</span>
          <span className="text-xl sm:text-2xl font-black text-slate-400 tracking-tight">0 Hari</span>
          <span className="text-[11px] text-emerald-600 block mt-0.5">Nihil / Tertib</span>
        </div>
      </div>


      {/* Today's Status Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
              hasCheckedIn ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
            }`}
          >
            {hasCheckedIn ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">
                Presensi Hari Ini:
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  hasCheckedIn ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}
              >
                {hasCheckedIn ? 'SUDAH CHECK-IN' : 'BELUM PRESENSI'}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              {hasCheckedIn
                ? `Tercatat Masuk Pukul ${todayCheckInTime} (${currentUser.name})`
                : `Silakan lakukan verifikasi wajah & lokasi sebelum pukul 07.15 WIB`}
            </h3>
            <span className="text-xs text-slate-500">
              Lokasi: {currentSchool} · Toleransi keterlambatan maksimal 10 menit.
            </span>
          </div>
        </div>

        <button
          onClick={onOpenAttendanceModal}
          className="px-4 py-2 border border-slate-300 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 transition-colors"
        >
          {hasCheckedIn ? 'Detail Selfie' : 'Buka Kamera'}
        </button>
      </div>

      {/* Attendance History Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-sm">
            Riwayat Presensi Bulan November 2026 - {currentUser.name}
          </h3>
          <span className="text-[11px] text-slate-500">Rekapitulasi Kehadiran Digital</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-600 border-b border-slate-200 uppercase font-bold text-[10px]">
              <tr>
                <th className="p-3.5 pl-5">Hari / Tanggal</th>
                <th className="p-3.5">Jam Masuk</th>
                <th className="p-3.5">Jam Pulang</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 pr-5">Lokasi & Radius Validasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {hasCheckedIn && (
                <tr className="bg-emerald-50/30">
                  <td className="p-3.5 pl-5 font-bold text-slate-900">
                    Hari Ini (Senin, 9 Nov 2026)
                  </td>
                  <td className="p-3.5 font-mono font-bold text-emerald-700">{todayCheckInTime}</td>
                  <td className="p-3.5 font-mono text-slate-400">15.00 WIB (Est)</td>
                  <td className="p-3.5">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      Hadir (Valid)
                    </span>
                  </td>
                  <td className="p-3.5 pr-5 text-[11px] text-slate-600">
                    SMAN 25 Jakarta (Radius 12m Geofence)
                  </td>
                </tr>
              )}
              {MOCK_ATTENDANCE_HISTORY.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 pl-5 font-medium text-slate-900">
                    {rec.dayName}, {rec.date}
                  </td>
                  <td className="p-3.5 font-mono text-slate-700">{rec.checkInTime}</td>
                  <td className="p-3.5 font-mono text-slate-700">{rec.checkOutTime}</td>
                  <td className="p-3.5">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      {rec.status}
                    </span>
                  </td>
                  <td className="p-3.5 pr-5 text-[11px] text-slate-600">
                    {rec.location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
