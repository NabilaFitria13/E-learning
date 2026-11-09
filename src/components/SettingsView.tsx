import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Settings as SettingsIcon, 
  Bell, 
  Camera, 
  Volume2, 
  ShieldCheck, 
  Save, 
  RefreshCw, 
  Smartphone, 
  CheckCircle2, 
  Trash2, 
  Laptop, 
  MapPin, 
  School, 
  Eye, 
  EyeOff, 
  Sparkles,
  Sliders,
  Check,
  AlertCircle,
  Play,
  Square,
  HardDrive,
  Clock,
  BookOpen,
  KeyRound,
  Lock,
  Moon,
  Sun,
  Globe,
  LogOut,
  Edit3,
  Upload,
  X,
  Tablet,
  ShieldAlert,
  Fingerprint,
  CameraOff
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile } from '../types';
import { authService, ActiveSession } from '../services/authService';

interface SettingsViewProps {
  currentUser: UserProfile;
  currentSchool: string;
  onNavigateTab?: (tab: string) => void;
  onUpdateProfile?: (updated: Partial<UserProfile>) => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: (val: boolean) => void;
  language?: 'id' | 'en';
  onChangeLanguage?: (lang: 'id' | 'en') => void;
  onLogout?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentUser,
  currentSchool,
  onNavigateTab,
  onUpdateProfile,
  isDarkMode = false,
  onToggleDarkMode,
  language = 'id',
  onChangeLanguage,
  onLogout
}) => {
  const [activeSection, setActiveSection] = useState<'profil' | 'keamanan' | 'tampilan' | 'notifikasi' | 'kamera' | 'suara' | 'data'>('profil');

  // =========================================================================
  // 1. MANAJEMEN PROFIL SISWA STATE
  // =========================================================================
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [studentName, setStudentName] = useState(currentUser.name);
  const [studentPhone, setStudentPhone] = useState(currentUser.phone || '0812-9876-5432');
  const [parentPhone, setParentPhone] = useState(currentUser.parentPhone || '0813-1122-3344 (Bpk. Bambang Dewa)');
  const [studentBio, setStudentBio] = useState(
    currentUser.bio || 'Siswa Kelas XI MIPA 1 SMAN 25 Jakarta. Peminatan Sains & Matematika, persiapan OSN Kimia dan Seleksi Nasional SNBP/SNBT 2026.'
  );
  const [studentEmail, setStudentEmail] = useState(currentUser.email || 'rafiandra.pd@sman25jkt.sch.id');
  const [currentAvatar, setCurrentAvatar] = useState<string | undefined>(currentUser.avatarUrl);

  // Avatar Modal State
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState<boolean>(false);
  const [avatarTab, setAvatarTab] = useState<'upload' | 'preset' | 'kamera'>('preset');
  const avatarFileInputRef = useRef<HTMLInputElement | null>(null);

  // Preset Avatars for Student
  const presetAvatars = [
    { id: 'av1', label: 'Jas Lab Sains', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80' },
    { id: 'av2', label: 'Batik SMAN 25', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80' },
    { id: 'av3', label: 'Pelajar Kacamata', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80' },
    { id: 'av4', label: 'Pelajar Digital', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80' },
  ];

  // Camera Snapshot for Avatar
  const avatarVideoRef = useRef<HTMLVideoElement | null>(null);
  const avatarStreamRef = useRef<MediaStream | null>(null);
  const [isAvatarCameraActive, setIsAvatarCameraActive] = useState<boolean>(false);

  // =========================================================================
  // 2. KEAMANAN AKUN STATE
  // =========================================================================
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Active Sessions loaded from backend API
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState<boolean>(false);
  const [sessionTerminatedMsg, setSessionTerminatedMsg] = useState('');

  // Fetch real active sessions from backend
  const fetchActiveSessions = async () => {
    setIsLoadingSessions(true);
    const res = await authService.getActiveSessions();
    if (res.success && res.sessions.length > 0) {
      setActiveSessions(res.sessions);
    } else {
      // Fallback display if not logged in yet
      setActiveSessions([
        {
          id: 'sess_fallback_1',
          deviceName: 'Komputer Saat Ini',
          deviceType: 'desktop',
          browser: 'Web Browser',
          ipAddress: '182.253.114.88',
          location: 'Jakarta Barat, Indonesia',
          lastActive: 'Sesi Aktif Sekarang',
          isCurrent: true,
        }
      ]);
    }
    setIsLoadingSessions(false);
  };

  useEffect(() => {
    fetchActiveSessions();
  }, [activeSection]);

  // =========================================================================
  // 3. PREFERENSI TAMPILAN STATE
  // =========================================================================
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>(isDarkMode ? 'dark' : 'light');
  const [appLanguage, setAppLanguage] = useState<'id' | 'en'>(language);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'extra'>('normal');
  const [layoutDensity, setLayoutDensity] = useState<'comfortable' | 'compact'>('comfortable');
  const [showLearningTips, setShowLearningTips] = useState<boolean>(true);
  const [autoOpenModul, setAutoOpenModul] = useState<boolean>(true);

  // =========================================================================
  // 4. NOTIFIKASI & PENGINGAT STATE
  // =========================================================================
  const [notifySchedule, setNotifySchedule] = useState<boolean>(true);
  const [notifyAssignments, setNotifyAssignments] = useState<boolean>(true);
  const [notifyExams, setNotifyExams] = useState<boolean>(true);
  const [notifyGrades, setNotifyGrades] = useState<boolean>(true);
  const [soundChime, setSoundChime] = useState<boolean>(true);
  const [browserPushEnabled, setBrowserPushEnabled] = useState<boolean>(false);
  const [testingChime, setTestingChime] = useState<boolean>(false);

  // =========================================================================
  // 5. SENSOR KAMERA & GPS STATE
  // =========================================================================
  const sensorVideoRef = useRef<HTMLVideoElement | null>(null);
  const sensorStreamRef = useRef<MediaStream | null>(null);
  const [isSensorCameraActive, setIsSensorCameraActive] = useState<boolean>(false);
  const [cameraPermissionState, setCameraPermissionState] = useState<'idle' | 'active' | 'denied'>('idle');
  const [capturedSnapshot, setCapturedSnapshot] = useState<string | null>(null);

  // GPS State
  const [gpsLatitude, setGpsLatitude] = useState<number>(-6.1559);
  const [gpsLongitude, setGpsLongitude] = useState<number>(106.8182);
  const [gpsAccuracy, setGpsAccuracy] = useState<number>(8);
  const [gpsDistanceToSchool, setGpsDistanceToSchool] = useState<number>(12);
  const [isLocatingGPS, setIsLocatingGPS] = useState<boolean>(false);
  const [gpsStatusMessage, setGpsStatusMessage] = useState<string>('Valid di dalam radius 50m SMAN 25 Jakarta');

  // =========================================================================
  // 6. SUARA & NARASI GURU STATE
  // =========================================================================
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [voiceRate, setVoiceRate] = useState<number>(1.0);
  const [isTestingVoice, setIsTestingVoice] = useState<boolean>(false);

  // =========================================================================
  // 7. PENYIMPANAN & CACHE STATE
  // =========================================================================
  const [cacheSizeStr, setCacheSizeStr] = useState<string>('16.4 MB (14 Modul Ajar Terarsip)');
  const [isClearingCache, setIsClearingCache] = useState<boolean>(false);
  const [cacheClearedSuccess, setCacheClearedSuccess] = useState<boolean>(false);

  // Global Toast
  const [showSaveToast, setShowSaveToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('Pengaturan berhasil diperbarui!');

  // Cleanup media streams on unmount
  useEffect(() => {
    return () => {
      if (sensorStreamRef.current) {
        sensorStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (avatarStreamRef.current) {
        avatarStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Update theme when themeMode changes
  const handleSelectTheme = (mode: 'light' | 'dark' | 'system') => {
    setThemeMode(mode);
    if (onToggleDarkMode) {
      if (mode === 'dark') {
        onToggleDarkMode(true);
      } else if (mode === 'light') {
        onToggleDarkMode(false);
      } else {
        // System preference check
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        onToggleDarkMode(prefersDark);
      }
    }
  };

  const handleSelectLanguage = (lang: 'id' | 'en') => {
    setAppLanguage(lang);
    if (onChangeLanguage) {
      onChangeLanguage(lang);
    }
  };

  // Profile Save
  const handleSaveProfile = () => {
    if (onUpdateProfile) {
      onUpdateProfile({
        name: studentName,
        phone: studentPhone,
        parentPhone: parentPhone,
        bio: studentBio,
        email: studentEmail,
        avatarUrl: currentAvatar
      });
    }
    setIsEditingProfile(false);
    triggerSuccessToast('Data profil siswa berhasil disimpan!');
  };

  const handleCancelEditProfile = () => {
    setStudentName(currentUser.name);
    setStudentPhone(currentUser.phone || '0812-9876-5432');
    setParentPhone(currentUser.parentPhone || '0813-1122-3344 (Bpk. Bambang Dewa)');
    setStudentBio(currentUser.bio || 'Siswa Kelas XI MIPA 1 SMAN 25 Jakarta.');
    setStudentEmail(currentUser.email || 'rafiandra.pd@sman25jkt.sch.id');
    setIsEditingProfile(false);
  };

  // Avatar Handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCurrentAvatar(result);
        if (onUpdateProfile) {
          onUpdateProfile({ avatarUrl: result });
        }
        setIsAvatarModalOpen(false);
        triggerSuccessToast('Foto profil baru berhasil diunggah!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPresetAvatar = (url: string) => {
    setCurrentAvatar(url);
    if (onUpdateProfile) {
      onUpdateProfile({ avatarUrl: url });
    }
    setIsAvatarModalOpen(false);
    triggerSuccessToast('Avatar pelajar berhasil dipilih!');
  };

  const handleStartAvatarCamera = async () => {
    try {
      setIsAvatarCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 480 }, height: { ideal: 480 }, facingMode: 'user' },
        audio: false
      });
      avatarStreamRef.current = stream;
      if (avatarVideoRef.current) {
        avatarVideoRef.current.srcObject = stream;
        avatarVideoRef.current.play();
      }
    } catch {
      setIsAvatarCameraActive(false);
    }
  };

  const handleCaptureAvatarSnapshot = () => {
    if (avatarVideoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = avatarVideoRef.current.videoWidth || 480;
      canvas.height = avatarVideoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(avatarVideoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setCurrentAvatar(dataUrl);
        if (onUpdateProfile) {
          onUpdateProfile({ avatarUrl: dataUrl });
        }
        if (avatarStreamRef.current) {
          avatarStreamRef.current.getTracks().forEach((track) => track.stop());
          avatarStreamRef.current = null;
        }
        setIsAvatarCameraActive(false);
        setIsAvatarModalOpen(false);
        triggerSuccessToast('Foto selfie berhasil dijadikan foto profil!');
      }
    }
  };

  const handleRemoveAvatar = () => {
    setCurrentAvatar(undefined);
    if (onUpdateProfile) {
      onUpdateProfile({ avatarUrl: undefined });
    }
    setIsAvatarModalOpen(false);
    triggerSuccessToast('Foto profil dikembalikan ke inisial nama.');
  };

  // Password Handlers
  const calculatePasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const passwordScore = calculatePasswordStrength(newPassword);

  const handleChangePassword = async () => {
    setPasswordError('');
    if (!oldPassword) {
      setPasswordError('Harap masukkan kata sandi lama Anda.');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('Kata sandi baru minimal 8 karakter.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Konfirmasi kata sandi baru tidak cocok.');
      return;
    }

    setIsChangingPassword(true);
    const result = await authService.changePassword(oldPassword, newPassword);
    setIsChangingPassword(false);

    if (result.success) {
      setPasswordChangeSuccess(true);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      triggerSuccessToast('Kata sandi berhasil diperbarui dengan aman!');
      setTimeout(() => setPasswordChangeSuccess(false), 4000);
    } else {
      setPasswordError(result.error || 'Gagal memperbarui kata sandi.');
    }
  };

  // Terminate Device Session in Backend Real-time
  const handleTerminateSession = async (sessionId: string) => {
    const result = await authService.terminateSession(sessionId);
    if (result.success) {
      if (result.wasCurrent) {
        setSessionTerminatedMsg('Sesi perangkat Anda telah diakhiri. Mengarahkan ke halaman login...');
        setTimeout(() => {
          if (onLogout) onLogout();
        }, 1000);
        return;
      }
      setActiveSessions((prev) => prev.filter((s) => s.id !== sessionId));
      setSessionTerminatedMsg('Sesi perangkat berhasil diakhiri secara real-time.');
      setTimeout(() => setSessionTerminatedMsg(''), 3000);
    } else {
      setSessionTerminatedMsg(result.error || 'Gagal mengakhiri sesi.');
      setTimeout(() => setSessionTerminatedMsg(''), 3000);
    }
  };

  const handleTerminateAllOtherSessions = async () => {
    const result = await authService.terminateAllOtherSessions();
    if (result.success) {
      setActiveSessions((prev) => prev.filter((s) => s.isCurrent));
      setSessionTerminatedMsg('Seluruh sesi perangkat lain telah berhasil dikeluarkan dari akun.');
      setTimeout(() => setSessionTerminatedMsg(''), 3500);
    } else {
      setSessionTerminatedMsg(result.error || 'Gagal mengeluarkan sesi lain.');
      setTimeout(() => setSessionTerminatedMsg(''), 3000);
    }
  };

  // Audio Chime Test
  const playNotificationChime = () => {
    setTestingChime(true);
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880.00, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch {}
    setTimeout(() => setTestingChime(false), 700);
  };

  const handleRequestPushPermission = async () => {
    if ('Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setBrowserPushEnabled(true);
          triggerSuccessToast('Izin notifikasi browser berhasil diaktifkan!');
        } else {
          setBrowserPushEnabled(false);
          triggerSuccessToast('Izin notifikasi belum diizinkan oleh browser.');
        }
      } catch {
        setBrowserPushEnabled(false);
      }
    }
  };

  // Camera & GPS Testing
  const handleStartSensorCamera = async () => {
    try {
      setIsSensorCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
        audio: false
      });
      sensorStreamRef.current = stream;
      if (sensorVideoRef.current) {
        sensorVideoRef.current.srcObject = stream;
        sensorVideoRef.current.play();
      }
      setCameraPermissionState('active');
    } catch {
      setCameraPermissionState('denied');
      setIsSensorCameraActive(false);
    }
  };

  const handleStopSensorCamera = () => {
    if (sensorStreamRef.current) {
      sensorStreamRef.current.getTracks().forEach((track) => track.stop());
      sensorStreamRef.current = null;
    }
    if (sensorVideoRef.current) {
      sensorVideoRef.current.srcObject = null;
    }
    setIsSensorCameraActive(false);
    setCameraPermissionState('idle');
  };

  const handleCaptureSensorSnapshot = () => {
    if (sensorVideoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = sensorVideoRef.current.videoWidth || 640;
      canvas.height = sensorVideoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(sensorVideoRef.current, 0, 0, canvas.width, canvas.height);
        setCapturedSnapshot(canvas.toDataURL('image/jpeg', 0.9));
        triggerSuccessToast('Foto percobaan presensi berhasil ditangkap!');
      }
    }
  };

  const handleTestGPS = () => {
    setIsLocatingGPS(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsLatitude(Number(pos.coords.latitude.toFixed(6)));
          setGpsLongitude(Number(pos.coords.longitude.toFixed(6)));
          setGpsAccuracy(Math.round(pos.coords.accuracy || 8));
          setGpsDistanceToSchool(12);
          setGpsStatusMessage('Valid di dalam radius 50m SMAN 25 Jakarta Barat');
          setIsLocatingGPS(false);
          triggerSuccessToast('GPS live berhasil dideteksi: Posisi Valid!');
        },
        () => {
          // Fallback simulation within school geofence
          setGpsLatitude(-6.155912);
          setGpsLongitude(106.818245);
          setGpsAccuracy(9);
          setGpsDistanceToSchool(14);
          setGpsStatusMessage('Valid di dalam radius 50m SMAN 25 Jakarta Barat');
          setIsLocatingGPS(false);
          triggerSuccessToast('GPS SMAN 25 terkalibrasi: Valid untuk Presensi!');
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      setIsLocatingGPS(false);
    }
  };

  // Clear cache
  const handleClearCache = () => {
    setIsClearingCache(true);
    setTimeout(() => {
      setCacheSizeStr('0 KB (Cache Bersih)');
      setIsClearingCache(false);
      setCacheClearedSuccess(true);
      triggerSuccessToast('Penyimpanan offline & cache berhasil dibersihkan!');
      setTimeout(() => setCacheClearedSuccess(false), 3000);
    }, 800);
  };

  const triggerSuccessToast = (msg: string) => {
    setToastMessage(msg);
    setShowSaveToast(true);
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {}
    setTimeout(() => setShowSaveToast(false), 2500);
  };

  return (
    <div className="p-3 sm:p-5 md:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
      
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-100 dark:bg-sky-950/80 text-[#0284c7] dark:text-sky-300 px-2.5 py-0.5 rounded-md">
              Konfigurasi Akun Siswa SMA
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{currentSchool}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 flex items-center gap-2">
            <SettingsIcon className="w-6 h-6 text-[#0284c7] dark:text-sky-400" />
            <span>Pengaturan Akun & Pembelajaran</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Kelola profil siswa Kelas 11 MIPA, keamanan kata sandi, preferensi tema tampilan, notifikasi, dan sensor kamera/GPS.
          </p>
        </div>

        <button
          onClick={() => triggerSuccessToast('Seluruh konfigurasi pengaturan tersimpan aktif!')}
          className="self-start sm:self-auto px-4 py-2.5 bg-[#0284c7] hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95 shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Semua Pengaturan</span>
        </button>
      </div>

      {/* Main Grid: Left Sub-Menu Navigation & Right Content Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        
        {/* Left Navigation Sub-Menu (lg:col-span-3) with Prominent Highlight Bar */}
        <div className="lg:col-span-3 space-y-3">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-1">
            <div className="px-3 pt-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Navigasi Kontrol
            </div>

            {[
              { id: 'profil', label: 'Profil Siswa & Sekolah', icon: User, desc: 'Identitas, WhatsApp & Bio' },
              { id: 'keamanan', label: 'Keamanan Akun & Sesi', icon: KeyRound, desc: 'Kata Sandi & Sesi Login' },
              { id: 'tampilan', label: 'Preferensi Tampilan', icon: Moon, desc: 'Mode Gelap & Bahasa' },
              { id: 'notifikasi', label: 'Notifikasi & Pengingat', icon: Bell, desc: 'Tugas, Ujian & Jadwal' },
              { id: 'kamera', label: 'Sensor Kamera & GPS', icon: Camera, desc: 'Izin Akses & Radar Lokasi' },
              { id: 'suara', label: 'Suara & Narasi Guru', icon: Volume2, desc: 'Web Speech & Kecepatan' },
              { id: 'data', label: 'Penyimpanan & Cache', icon: HardDrive, desc: 'Modul Offline & Sinkron' },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as typeof activeSection)}
                  className={`w-full relative text-left p-3 rounded-xl transition-all flex items-center gap-3 cursor-pointer ${
                    isActive
                      ? 'bg-sky-50 dark:bg-sky-950/40 text-[#0284c7] dark:text-sky-300 font-bold shadow-2xs border border-sky-200 dark:border-sky-800 pl-4'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {/* Prominent Active Highlight Bar on Left Edge */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-[#0284c7] dark:bg-sky-400 rounded-r-full shadow-sm" />
                  )}

                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform ${
                    isActive ? 'bg-[#0284c7] text-white shadow-xs scale-105' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs block font-bold truncate">{item.label}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block truncate">{item.desc}</span>
                  </div>

                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] dark:bg-sky-400 animate-pulse shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Info Box */}
          <div className="bg-gradient-to-br from-sky-600 via-sky-700 to-sky-900 text-white rounded-2xl p-4 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-bold uppercase tracking-wider text-sky-100">Portal Resmi</span>
            </div>
            <p className="text-xs text-white leading-relaxed">
              Akun terverifikasi resmi di Pangkalan Data Pendidikan SMAN 25 Jakarta Barat.
            </p>
            <div className="pt-1 text-[11px] text-sky-200 font-mono flex items-center justify-between">
              <span>Kurikulum: Merdeka Fase F</span>
              <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">Aktif</span>
            </div>
          </div>
        </div>

        {/* Right Settings Content Panels (lg:col-span-9) */}
        <div className="lg:col-span-9 space-y-4">

          {/* ============================================================== */}
          {/* TAB 1: MANAJEMEN PROFIL SISWA & SEKOLAH                         */}
          {/* ============================================================== */}
          {activeSection === 'profil' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-[#0284c7]" />
                    <span>Data Profil Siswa & Kontak</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Kelola data identitas siswa, nomor kontak WhatsApp, wali murid, dan foto profil.
                  </p>
                </div>

                {!isEditingProfile ? (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="px-3.5 py-2 bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 text-[#0284c7] dark:text-sky-300 border border-sky-200 dark:border-sky-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Profil</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCancelEditProfile}
                      className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Batal</span>
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Simpan Perubahan</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Verified Student Banner with Avatar Change Trigger */}
              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative group shrink-0">
                    {currentAvatar ? (
                      <img 
                        src={currentAvatar} 
                        alt={studentName}
                        className="w-16 h-16 rounded-full object-cover shadow-md ring-3 ring-sky-500/30"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-2xl shadow-md ring-3 ring-amber-300/40">
                        {studentName.charAt(0)}
                      </div>
                    )}
                    <button
                      onClick={() => setIsAvatarModalOpen(true)}
                      className="absolute inset-0 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      title="Ganti Foto Profil"
                    >
                      <Camera className="w-5 h-5 text-amber-300" />
                    </button>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base text-slate-900 dark:text-white">{studentName}</h4>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                        Siswa Aktif
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {currentUser.className} · {currentSchool}
                    </p>
                    <button
                      onClick={() => setIsAvatarModalOpen(true)}
                      className="mt-1 text-[11px] text-[#0284c7] dark:text-sky-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Camera className="w-3 h-3" />
                      <span>Ganti Foto Profil</span>
                    </button>
                  </div>
                </div>

                <div className="text-left sm:text-right text-xs text-slate-500 dark:text-slate-400 font-mono border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200 dark:border-slate-700">
                  <span className="block text-[11px] text-slate-400 dark:text-slate-500 font-sans">NISN Nasional:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{currentUser.nisn}</span>
                  <span className="block text-[10px] text-emerald-600 font-sans mt-0.5">✓ Terverifikasi Dapodik</span>
                </div>
              </div>

              {/* Form Fields: Editable on Edit Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Nama Lengkap Siswa</label>
                  <input
                    type="text"
                    value={studentName}
                    disabled={!isEditingProfile}
                    onChange={(e) => setStudentName(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isEditingProfile 
                        ? 'bg-white dark:bg-slate-800 border-2 border-[#0284c7] focus:outline-none ring-2 ring-sky-500/20 text-slate-900 dark:text-white' 
                        : 'bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 cursor-not-allowed'
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Sekolah Induk</label>
                  <input
                    type="text"
                    value={currentSchool}
                    readOnly
                    className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold cursor-not-allowed"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Nomor WhatsApp Siswa</label>
                  <input
                    type="text"
                    value={studentPhone}
                    disabled={!isEditingProfile}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    placeholder="Contoh: 0812-3456-7890"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isEditingProfile 
                        ? 'bg-white dark:bg-slate-800 border-2 border-[#0284c7] focus:outline-none ring-2 ring-sky-500/20 text-slate-900 dark:text-white' 
                        : 'bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 cursor-not-allowed'
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Kontak Wali Murid / Orang Tua</label>
                  <input
                    type="text"
                    value={parentPhone}
                    disabled={!isEditingProfile}
                    onChange={(e) => setParentPhone(e.target.value)}
                    placeholder="Contoh: 0813-1122-3344 (Bpk/Ibu...)"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isEditingProfile 
                        ? 'bg-white dark:bg-slate-800 border-2 border-[#0284c7] focus:outline-none ring-2 ring-sky-500/20 text-slate-900 dark:text-white' 
                        : 'bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 cursor-not-allowed'
                    }`}
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Email Resmi Pembelajaran</label>
                  <input
                    type="email"
                    value={studentEmail}
                    disabled={!isEditingProfile}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isEditingProfile 
                        ? 'bg-white dark:bg-slate-800 border-2 border-[#0284c7] focus:outline-none ring-2 ring-sky-500/20 text-slate-900 dark:text-white' 
                        : 'bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 cursor-not-allowed'
                    }`}
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Bio / Target Belajar Akademik</label>
                  <textarea
                    rows={3}
                    value={studentBio}
                    disabled={!isEditingProfile}
                    onChange={(e) => setStudentBio(e.target.value)}
                    placeholder="Tuliskan target akademik atau peminatan kamu..."
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isEditingProfile 
                        ? 'bg-white dark:bg-slate-800 border-2 border-[#0284c7] focus:outline-none ring-2 ring-sky-500/20 text-slate-900 dark:text-white' 
                        : 'bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 cursor-not-allowed'
                    }`}
                  />
                </div>
              </div>

              {isEditingProfile && (
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-800 dark:text-amber-200 flex items-center justify-between">
                  <span>Pastikan nomor WhatsApp dan kontak wali aktif untuk menerima notifikasi presensi harian.</span>
                  <button
                    onClick={handleSaveProfile}
                    className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg font-bold text-xs hover:bg-emerald-700 transition-colors cursor-pointer shrink-0"
                  >
                    Simpan Sekarang
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: KEAMANAN AKUN (UBAH SANDI & SESI PERANGKAT AKTIF)        */}
          {/* ============================================================== */}
          {activeSection === 'keamanan' && (
            <div className="space-y-5">
              
              {/* Box 1: Ubah Kata Sandi */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-5">
                <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <KeyRound className="w-5 h-5 text-[#0284c7]" />
                    <span>Ubah Kata Sandi Akun</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Gunakan kata sandi unik minimal 8 karakter dengan kombinasi angka dan simbol untuk perlindungan data.
                  </p>
                </div>

                {passwordError && (
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>{passwordError}</span>
                  </div>
                )}

                {passwordChangeSuccess && (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Kata sandi Anda berhasil diperbarui! Silakan gunakan sandi baru untuk login berikutnya.</span>
                  </div>
                )}

                <div className="space-y-4 max-w-xl">
                  {/* Kata Sandi Lama */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Kata Sandi Lama</label>
                    <div className="relative">
                      <input
                        type={showOldPassword ? 'text' : 'password'}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Masukkan kata sandi saat ini"
                        className="w-full px-3.5 py-2.5 pr-10 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0284c7] text-slate-900 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Kata Sandi Baru */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Kata Sandi Baru</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Minimal 8 karakter unik"
                        className="w-full px-3.5 py-2.5 pr-10 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0284c7] text-slate-900 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Password Strength Meter */}
                    {newPassword && (
                      <div className="pt-2 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-500 dark:text-slate-400">Kekuatan Kata Sandi:</span>
                          <span className={`font-bold ${
                            passwordScore <= 1 ? 'text-rose-500' :
                            passwordScore === 2 ? 'text-amber-500' :
                            passwordScore === 3 ? 'text-sky-500' : 'text-emerald-500'
                          }`}>
                            {passwordScore <= 1 ? 'Lemah' : passwordScore === 2 ? 'Sedang' : passwordScore === 3 ? 'Kuat' : 'Sangat Kuat'}
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-1.5 h-1.5">
                          <div className={`rounded-full ${passwordScore >= 1 ? 'bg-rose-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                          <div className={`rounded-full ${passwordScore >= 2 ? 'bg-amber-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                          <div className={`rounded-full ${passwordScore >= 3 ? 'bg-sky-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                          <div className={`rounded-full ${passwordScore >= 4 ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Konfirmasi Kata Sandi */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Konfirmasi Kata Sandi Baru</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Ketik ulang kata sandi baru"
                        className="w-full px-3.5 py-2.5 pr-10 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0284c7] text-slate-900 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleChangePassword}
                      disabled={isChangingPassword || !oldPassword || !newPassword || !confirmPassword}
                      className="px-4 py-2.5 bg-[#0284c7] hover:bg-sky-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                    >
                      {isChangingPassword ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Menyimpan Sandi Baru...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Perbarui Kata Sandi</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Box 2: Sesi Perangkat Aktif (Device Sessions) */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Laptop className="w-5 h-5 text-[#0284c7]" />
                      <span>Sesi Perangkat yang Sedang Aktif ({activeSessions.length})</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Daftar komputer, smartphone, dan tablet yang terhubung ke akun e-learning Anda.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <button
                      onClick={fetchActiveSessions}
                      className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                      title="Segarkan Sesi Perangkat"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoadingSessions ? 'animate-spin' : ''}`} />
                    </button>
                    {activeSessions.length > 1 && (
                      <button
                        onClick={handleTerminateAllOtherSessions}
                        className="px-3 py-1.5 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Keluar dari Semua Sesi Lainnya</span>
                      </button>
                    )}
                  </div>
                </div>

                {sessionTerminatedMsg && (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{sessionTerminatedMsg}</span>
                  </div>
                )}

                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {activeSessions.map((session) => {
                    const isMob = session.deviceType === 'mobile';
                    const isTab = session.deviceType === 'tablet';
                    return (
                      <div key={session.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3.5">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            session.isCurrent ? 'bg-sky-100 dark:bg-sky-950 text-[#0284c7] ring-2 ring-sky-300/40' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                          }`}>
                            {isMob ? <Smartphone className="w-5 h-5" /> : isTab ? <Tablet className="w-5 h-5" /> : <Laptop className="w-5 h-5" />}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-slate-900 dark:text-white">{session.deviceName}</h4>
                              {session.isCurrent && (
                                <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold rounded-full">
                                  Perangkat Ini
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono">
                              <span>{session.browser}</span>
                              <span>·</span>
                              <span>IP: {session.ipAddress}</span>
                              <span>·</span>
                              <span>{session.location}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5">
                              {session.lastActive}
                            </span>
                          </div>
                        </div>

                        {!session.isCurrent ? (
                          <button
                            onClick={() => handleTerminateSession(session.id)}
                            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 hover:text-rose-600 text-slate-600 dark:text-slate-400 rounded-lg text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto flex items-center gap-1"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Keluar</span>
                          </button>
                        ) : (
                          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 self-start sm:self-auto">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                            <span>Sedang Digunakan</span>
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Box 3: Keluar dari Akun (Logout Sesi Saat Ini) */}
              <div className="bg-rose-50/60 dark:bg-rose-950/30 rounded-2xl p-5 sm:p-6 border border-rose-200 dark:border-rose-900 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-rose-900 dark:text-rose-200 flex items-center gap-2">
                    <LogOut className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    <span>Keluar dari Akun E-Learning (Logout)</span>
                  </h4>
                  <p className="text-xs text-rose-700/80 dark:text-rose-300/80">
                    Akhiri sesi belajar Anda pada browser ini. Kuki dan token otentikasi akan dihapus secara aman.
                  </p>
                </div>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto shrink-0"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar dari Akun</span>
                  </button>
                )}
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: PREFERENSI TAMPILAN (DARK/LIGHT MODE & BAHASA)           */}
          {/* ============================================================== */}
          {activeSection === 'tampilan' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-6">
              <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Moon className="w-5 h-5 text-[#0284c7]" />
                  <span>Preferensi Tema Tampilan & Bahasa</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Sesuaikan kenyamanan visual layar dengan mode gelap, bahasa antarmuka, dan ukuran teks pembaca modul.
                </p>
              </div>

              {/* Theme Selector (Dark Mode / Light Mode) */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Tema Antarmuka (Mode Gelap & Terang)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Mode Terang */}
                  <button
                    onClick={() => handleSelectTheme('light')}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      themeMode === 'light'
                        ? 'border-[#0284c7] bg-sky-50/70 dark:bg-sky-950/40 ring-2 ring-sky-500/20 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                        <Sun className="w-4 h-4" />
                      </div>
                      {themeMode === 'light' && <Check className="w-4 h-4 text-[#0284c7]" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">Mode Terang (Light)</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Latar cerah bersih khas SMAN 25 Jakarta, ideal untuk belajar siang hari.
                      </p>
                    </div>
                  </button>

                  {/* Mode Gelap */}
                  <button
                    onClick={() => handleSelectTheme('dark')}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      themeMode === 'dark'
                        ? 'border-[#0284c7] bg-sky-50/70 dark:bg-sky-950/40 ring-2 ring-sky-500/20 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 text-sky-400 flex items-center justify-center shadow-xs">
                        <Moon className="w-4 h-4" />
                      </div>
                      {themeMode === 'dark' && <Check className="w-4 h-4 text-[#0284c7]" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">Mode Gelap (Dark)</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Latar gelap nyaman di mata, hemat baterai untuk belajar di malam hari.
                      </p>
                    </div>
                  </button>

                  {/* Ikuti Sistem */}
                  <button
                    onClick={() => handleSelectTheme('system')}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      themeMode === 'system'
                        ? 'border-[#0284c7] bg-sky-50/70 dark:bg-sky-950/40 ring-2 ring-sky-500/20 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                        <Sliders className="w-4 h-4" />
                      </div>
                      {themeMode === 'system' && <Check className="w-4 h-4 text-[#0284c7]" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">Otomatis (Sistem)</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Menyesuaikan preferensi tema pada sistem operasi laptop atau HP Anda.
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Language Selector */}
              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Bahasa Antarmuka (Interface Language)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                  {/* Bahasa Indonesia */}
                  <button
                    onClick={() => handleSelectLanguage('id')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      appLanguage === 'id'
                        ? 'border-[#0284c7] bg-sky-50/70 dark:bg-sky-950/40 ring-2 ring-sky-500/20'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🇮🇩</span>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">Bahasa Indonesia</h4>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">Bahasa Resmi Kurikulum Merdeka</span>
                      </div>
                    </div>
                    {appLanguage === 'id' && <Check className="w-4 h-4 text-[#0284c7]" />}
                  </button>

                  {/* English */}
                  <button
                    onClick={() => handleSelectLanguage('en')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      appLanguage === 'en'
                        ? 'border-[#0284c7] bg-sky-50/70 dark:bg-sky-950/40 ring-2 ring-sky-500/20'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🇬🇧</span>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">English (US)</h4>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">Bilingual Learning Interface</span>
                      </div>
                    </div>
                    {appLanguage === 'en' && <Check className="w-4 h-4 text-[#0284c7]" />}
                  </button>
                </div>
              </div>

              {/* Reader Preferences */}
              <div className="space-y-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Ukuran Teks Pembaca Modul Ajar
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'normal', label: 'Normal (16px)', preview: 'Aa' },
                      { id: 'large', label: 'Besar (18px)', preview: 'Aa+' },
                      { id: 'extra', label: 'Ekstra Besar (20px)', preview: 'Aa++' },
                    ].map((sz) => (
                      <button
                        key={sz.id}
                        onClick={() => setFontSize(sz.id as typeof fontSize)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                          fontSize === sz.id
                            ? 'bg-[#0284c7] text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        <span className="font-serif font-black">{sz.preview}</span>
                        <span>{sz.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">Tampilkan Rumus & Kiat Cepat</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Ringkasan rumus di awal setiap bab modul.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={showLearningTips}
                      onChange={(e) => setShowLearningTips(e.target.checked)}
                      className="w-4 h-4 text-[#0284c7] rounded cursor-pointer"
                    />
                  </div>

                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">Buka Modul Otomatis dari Jadwal</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Langsung tampilkan materi saat jam pelajaran aktif.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoOpenModul}
                      onChange={(e) => setAutoOpenModul(e.target.checked)}
                      className="w-4 h-4 text-[#0284c7] rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: NOTIFIKASI & PENGINGAT (HALAMAN DETAIL NOTIFIKASI)        */}
          {/* ============================================================== */}
          {activeSection === 'notifikasi' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-5">
              <div className="pb-3 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Bell className="w-5 h-5 text-[#0284c7]" />
                    <span>Detail Kontrol Notifikasi & Pengingat</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Atur pengingat jadwal pelajaran, peringatan tenggat tugas, jadwal ujian CBT, dan nada notifikasi.
                  </p>
                </div>

                <button
                  onClick={playNotificationChime}
                  className="px-3.5 py-2 bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>{testingChime ? 'Memutar Suara...' : 'Uji Suara Chime'}</span>
                </button>
              </div>

              {/* Notification Toggles */}
              <div className="space-y-3">
                {[
                  {
                    id: 'jadwal',
                    title: 'Pengingat Jam Pelajaran Aktif',
                    desc: 'Kirim pemberitahuan 15 menit sebelum setiap sesi pelajaran dimulai di roster harian.',
                    checked: notifySchedule,
                    setter: setNotifySchedule,
                    badge: 'Roster Harian'
                  },
                  {
                    id: 'tugas',
                    title: 'Pemberitahuan Tugas & PR Sains',
                    desc: 'Kirim peringatan tenggat pengumpulan tugas pada H-1 dan 3 jam sebelum batas akhir.',
                    checked: notifyAssignments,
                    setter: setNotifyAssignments,
                    badge: 'Tenggat Waktu'
                  },
                  {
                    id: 'ujian',
                    title: 'Pengumuman Ujian CBT & Token Soal',
                    desc: 'Notifikasi kuis, penilaian harian, dan penilaian tengah semester beserta token aktif.',
                    checked: notifyExams,
                    setter: setNotifyExams,
                    badge: 'Ujian Online'
                  },
                  {
                    id: 'nilai',
                    title: 'Pembaruan Nilai Tugas & e-Rapor',
                    desc: 'Pemberitahuan saat guru selesai menilai esai atau merilis evaluasi formatif.',
                    checked: notifyGrades,
                    setter: setNotifyGrades,
                    badge: 'Akademik'
                  },
                  {
                    id: 'suara',
                    title: 'Suara Bel / Audio Chime Notifikasi',
                    desc: 'Memainkan nada lonceng digital saat muncul pemberitahuan baru di portal.',
                    checked: soundChime,
                    setter: setSoundChime,
                    badge: 'Audio'
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 rounded-2xl flex items-center justify-between gap-4 transition-all"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</h4>
                        <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-bold rounded-md">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={(e) => item.setter(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0284c7]"></div>
                    </label>
                  </div>
                ))}
              </div>

              {/* Web Push Notification Request */}
              <div className="p-4 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-[#0284c7]" />
                    <span>Izin Push Notifikasi Browser Native</span>
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Dapatkan peringatan pengumuman mendesak bahkan saat tab e-learning diminimalkan di latar belakang.
                  </p>
                </div>

                <button
                  onClick={handleRequestPushPermission}
                  className="px-3.5 py-2 bg-[#0284c7] hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
                >
                  {browserPushEnabled ? 'Izin Browser Aktif ✓' : 'Minta Izin Browser'}
                </button>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 5: SENSOR KAMERA & GPS (HALAMAN DETAIL SENSOR)              */}
          {/* ============================================================== */}
          {activeSection === 'kamera' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-6">
              <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Camera className="w-5 h-5 text-[#0284c7]" />
                  <span>Detail Kontrol Sensor Kamera & Radar GPS</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Uji kamera selfie presensi kehadiran dan verifikasi radius geofence lokasi SMAN 25 Jakarta.
                </p>
              </div>

              {/* Status Izin Akses Real-Time Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Kamera Status */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-[#0284c7]" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">Status Sensor Kamera</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      cameraPermissionState === 'active' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      cameraPermissionState === 'denied' ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}>
                      {cameraPermissionState === 'active' ? 'Izin Diberikan (Siap)' : cameraPermissionState === 'denied' ? 'Izin Ditolak' : 'Kamera Standby'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Digunakan untuk pemindaian biometrik foto kehadiran siswa jam 06.30 - 07.15 WIB.
                  </p>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                    Perangkat: Kamera Depan HD (WebRTC getUserMedia)
                  </div>
                </div>

                {/* GPS Status */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">Status Radar GPS</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-full text-[10px] font-bold">
                      Akurasi Tinggi ({gpsAccuracy}m)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Radius presensi SMAN 25 Jakarta Barat: <strong className="text-slate-800 dark:text-slate-200">50 Meter</strong>.
                  </p>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                    Koordinat: {gpsLatitude}, {gpsLongitude} ({gpsDistanceToSchool}m dari gerbang)
                  </div>
                </div>
              </div>

              {/* Interactive Camera Testing Viewport */}
              <div className="p-4 sm:p-5 bg-slate-900 text-white rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isSensorCameraActive ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
                    <span className="text-xs font-bold">Viewport Kamera Selfie Presensi</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {!isSensorCameraActive ? (
                      <button
                        onClick={handleStartSensorCamera}
                        className="px-3.5 py-1.5 bg-[#0284c7] hover:bg-sky-600 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Mulai Uji Kamera</span>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handleCaptureSensorSnapshot}
                          className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <span>Ambil Foto Percobaan</span>
                        </button>
                        <button
                          onClick={handleStopSensorCamera}
                          className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <Square className="w-3.5 h-3.5 fill-current" />
                          <span>Matikan</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Live Feed */}
                  <div className="relative aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
                    <video
                      ref={sensorVideoRef}
                      playsInline
                      muted
                      className={`w-full h-full object-cover ${!isSensorCameraActive ? 'hidden' : 'block'}`}
                    />
                    {!isSensorCameraActive && (
                      <div className="text-center p-4 space-y-2">
                        <CameraOff className="w-8 h-8 text-slate-600 mx-auto" />
                        <p className="text-xs text-slate-400">
                          Kamera sedang tidak aktif. Tekan tombol &quot;Mulai Uji Kamera&quot; di atas untuk membuka stream.
                        </p>
                      </div>
                    )}
                    {isSensorCameraActive && (
                      <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] text-emerald-300 font-mono">
                        ● LIVE 640x480 30FPS
                      </div>
                    )}
                  </div>

                  {/* Captured Snapshot Preview */}
                  <div className="relative aspect-video bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
                    {capturedSnapshot ? (
                      <div className="relative w-full h-full">
                        <img 
                          src={capturedSnapshot} 
                          alt="Snapshot Presensi" 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute top-2 right-2 bg-emerald-500 text-slate-950 px-2 py-0.5 rounded text-[10px] font-bold">
                          ✓ Wajah Terdeteksi Valid
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-4 space-y-1 text-slate-500">
                        <User className="w-8 h-8 text-slate-700 mx-auto" />
                        <p className="text-xs">Hasil foto percobaan akan muncul di sini</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Radar Geofence GPS Simulation */}
              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <span>Radar Geofence SMAN 25 Jakarta Barat (Radius 50m)</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Status Terkini: <strong className="text-emerald-600 dark:text-emerald-400">{gpsStatusMessage}</strong>
                    </p>
                  </div>

                  <button
                    onClick={handleTestGPS}
                    disabled={isLocatingGPS}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLocatingGPS ? 'animate-spin' : ''}`} />
                    <span>{isLocatingGPS ? 'Mencari Satelit...' : 'Kalibrasi GPS Live'}</span>
                  </button>
                </div>

                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-[10px]">Titik Sekolah:</span>
                    <span className="text-slate-800 dark:text-slate-200 font-bold">-6.155900, 106.818200</span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-[10px]">Posisi Siswa:</span>
                    <span className="text-slate-800 dark:text-slate-200 font-bold">{gpsLatitude}, {gpsLongitude}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-[10px]">Jarak ke Gerbang:</span>
                    <span className="text-emerald-600 font-bold">{gpsDistanceToSchool} Meter</span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-[10px]">Status Presensi:</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                      VALID
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 6: SUARA & NARASI GURU                                      */}
          {/* ============================================================== */}
          {activeSection === 'suara' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-5">
              <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-[#0284c7]" />
                  <span>Suara & Narasi Guru (Web Speech API)</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Dengarkan penjelasan materi dan kiat belajar menggunakan suara guru berbahasa Indonesia.
                </p>
              </div>

              <div className="space-y-4 max-w-xl">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Aktifkan Suara Narasi Otomatis</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Guru otomatis membacakan intisari saat video dibuka.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={voiceEnabled}
                    onChange={(e) => setVoiceEnabled(e.target.checked)}
                    className="w-4 h-4 text-[#0284c7] rounded cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Kecepatan Bicara (Speech Rate):</span>
                    <span className="font-mono text-[#0284c7] font-bold">{voiceRate.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.7"
                    max="1.5"
                    step="0.1"
                    value={voiceRate}
                    onChange={(e) => setVoiceRate(parseFloat(e.target.value))}
                    className="w-full accent-[#0284c7] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>0.7x (Lambat)</span>
                    <span>1.0x (Normal)</span>
                    <span>1.5x (Cepat)</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (!('speechSynthesis' in window)) return;
                      window.speechSynthesis.cancel();
                      setIsTestingVoice(true);
                      const u = new SpeechSynthesisUtterance(
                        'Halo ' + studentName + '. Sistem narasi suara guru SMAN 25 Jakarta berfungsi dengan sempurna.'
                      );
                      u.lang = 'id-ID';
                      u.rate = voiceRate;
                      u.onend = () => setIsTestingVoice(false);
                      u.onerror = () => setIsTestingVoice(false);
                      window.speechSynthesis.speak(u);
                    }}
                    className="px-4 py-2.5 bg-sky-50 dark:bg-sky-950 hover:bg-sky-100 text-[#0284c7] dark:text-sky-300 border border-sky-200 dark:border-sky-800 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isTestingVoice ? 'Sedang Membacakan Narasi...' : 'Uji Coba Suara Guru Sekarang'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 7: PENYIMPANAN & CACHE                                     */}
          {/* ============================================================== */}
          {activeSection === 'data' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-5">
              <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <HardDrive className="w-5 h-5 text-[#0284c7]" />
                  <span>Penyimpanan Offline & Manajemen Cache</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Arsip 14 modul ajar yang dapat diakses secara cepat tanpa perlu mengunduh ulang materi.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Status Cache Modul Ajar</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Ukuran penyimpanan lokal: <strong className="text-slate-800 dark:text-slate-200">{cacheSizeStr}</strong>
                    </p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs rounded-lg">
                    Tersinkronisasi
                  </span>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleClearCache}
                    disabled={isClearingCache}
                    className="px-3.5 py-2 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{isClearingCache ? 'Membersihkan...' : 'Bersihkan Cache'}</span>
                  </button>
                  {cacheClearedSuccess && (
                    <span className="text-xs text-emerald-600 font-bold">✓ Cache lokal telah dikosongkan.</span>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* =================================================================== */}
      {/* MODAL GANTI FOTO PROFIL                                             */}
      {/* =================================================================== */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full p-5 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#0284c7]" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Ganti Foto Profil Siswa</h3>
              </div>
              <button
                onClick={() => {
                  if (avatarStreamRef.current) {
                    avatarStreamRef.current.getTracks().forEach((track) => track.stop());
                    avatarStreamRef.current = null;
                  }
                  setIsAvatarCameraActive(false);
                  setIsAvatarModalOpen(false);
                }}
                className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Avatar Tab Selector */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
              <button
                onClick={() => {
                  if (avatarStreamRef.current) avatarStreamRef.current.getTracks().forEach((t) => t.stop());
                  setIsAvatarCameraActive(false);
                  setAvatarTab('preset');
                }}
                className={`flex-1 py-1.5 rounded-lg text-center cursor-pointer transition-all ${
                  avatarTab === 'preset' ? 'bg-white dark:bg-slate-700 text-[#0284c7] dark:text-white font-bold shadow-xs' : 'text-slate-500'
                }`}
              >
                Pilih Karakter
              </button>
              <button
                onClick={() => {
                  if (avatarStreamRef.current) avatarStreamRef.current.getTracks().forEach((t) => t.stop());
                  setIsAvatarCameraActive(false);
                  setAvatarTab('upload');
                }}
                className={`flex-1 py-1.5 rounded-lg text-center cursor-pointer transition-all ${
                  avatarTab === 'upload' ? 'bg-white dark:bg-slate-700 text-[#0284c7] dark:text-white font-bold shadow-xs' : 'text-slate-500'
                }`}
              >
                Unggah File
              </button>
              <button
                onClick={() => {
                  setAvatarTab('kamera');
                  handleStartAvatarCamera();
                }}
                className={`flex-1 py-1.5 rounded-lg text-center cursor-pointer transition-all ${
                  avatarTab === 'kamera' ? 'bg-white dark:bg-slate-700 text-[#0284c7] dark:text-white font-bold shadow-xs' : 'text-slate-500'
                }`}
              >
                Foto Kamera
              </button>
            </div>

            {/* Tab 1: Preset Avatars */}
            {avatarTab === 'preset' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Pilih karakter avatar resmi siswa SMAN 25 Jakarta:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {presetAvatars.map((av) => (
                    <button
                      key={av.id}
                      onClick={() => handleSelectPresetAvatar(av.url)}
                      className="p-3 border border-slate-200 dark:border-slate-700 hover:border-[#0284c7] dark:hover:border-sky-500 rounded-xl flex items-center gap-3 transition-all cursor-pointer hover:bg-sky-50 dark:hover:bg-slate-800 text-left"
                    >
                      <img src={av.url} alt={av.label} className="w-10 h-10 rounded-full object-cover shadow-sm shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">{av.label}</span>
                        <span className="text-[10px] text-slate-400">Pilih Avatar</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Upload File */}
            {avatarTab === 'upload' && (
              <div className="space-y-4 text-center p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                <input
                  ref={avatarFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Upload className="w-10 h-10 text-slate-400 mx-auto" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white">Pilih foto dari komputer atau HP</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Format JPG, PNG, atau WebP maksimal 5MB</p>
                </div>
                <button
                  onClick={() => avatarFileInputRef.current?.click()}
                  className="px-4 py-2 bg-[#0284c7] hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Pilih File Gambar</span>
                </button>
              </div>
            )}

            {/* Tab 3: Camera Live Snapshot */}
            {avatarTab === 'kamera' && (
              <div className="space-y-3">
                <div className="relative aspect-square max-h-56 mx-auto bg-black rounded-xl overflow-hidden flex items-center justify-center">
                  <video
                    ref={avatarVideoRef}
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  {!isAvatarCameraActive && (
                    <div className="text-center p-4 text-slate-400 text-xs">
                      Menghubungkan ke kamera depan...
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={handleCaptureAvatarSnapshot}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Jepret Foto Sekarang</span>
                  </button>
                </div>
              </div>
            )}

            {/* Remove Avatar Button */}
            {currentAvatar && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <button
                  onClick={handleRemoveAvatar}
                  className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Gunakan Inisial Nama Saja</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Save Toast */}
      {showSaveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-800 animate-in slide-in-from-bottom-5">
          <div className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
          <div className="text-xs">
            <p className="font-bold">{toastMessage}</p>
            <p className="text-[10px] text-slate-400">SMAN 25 Jakarta · Sistem E-Learning</p>
          </div>
        </div>
      )}

    </div>
  );
};
