import React, { useState } from 'react';
import { 
  School, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  LogIn, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  GraduationCap, 
  Laptop, 
  Sparkles,
  KeyRound,
  FlaskConical,
  FileCheck2,
  MapPin,
  Clock,
  HelpCircle,
  X,
  Phone,
  ChevronRight,
  Zap,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile } from '../types';
import { authService } from '../services/authService';
import { DEMO_ACCOUNTS } from '../data/mockData';

interface LoginModalProps {
  isOpen: boolean;
  onLoginSuccess: (user: UserProfile) => void;
  onClose?: () => void;
  currentSchool?: string;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onLoginSuccess,
  currentSchool = 'SMAN 25 Jakarta Barat'
}) => {
  // Preset accounts (exactly 2: Siswa MIPA and Pengajar Guru)
  const [selectedRolePreset, setSelectedRolePreset] = useState<'siswa_mipa' | 'guru'>('siswa_mipa');
  const [identifier, setIdentifier] = useState('0072938192');
  const [password, setPassword] = useState('siswa123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  if (!isOpen) return null;

  const handleSelectPreset = (preset: 'siswa_mipa' | 'guru') => {
    setSelectedRolePreset(preset);
    setErrorMessage('');
    const acc = DEMO_ACCOUNTS[preset];
    if (acc) {
      setIdentifier(acc.user.nisn);
      setPassword(acc.password);
    } else if (preset === 'siswa_mipa') {
      setIdentifier('0072938192');
      setPassword('siswa123');
    } else {
      setIdentifier('197508122002122001');
      setPassword('guru123');
    }
  };

  const executeLogin = async (customId?: string, customPass?: string) => {
    const idToUse = (customId ?? identifier).trim();
    const passToUse = (customPass ?? password).trim();

    setErrorMessage('');
    setSuccessMessage('');

    if (!idToUse) {
      setErrorMessage('Harap masukkan NISN, NIP, atau Email Dapodik terdaftar.');
      return;
    }
    if (!passToUse) {
      setErrorMessage('Harap masukkan kata sandi akun Anda.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await authService.login(idToUse, passToUse);
      if (result.success && result.user) {
        setSuccessMessage(`Selamat datang kembali, ${result.user.name}!`);
        try {
          confetti({
            particleCount: 55,
            spread: 75,
            origin: { y: 0.6 }
          });
        } catch {}

        setTimeout(() => {
          setIsLoading(false);
          onLoginSuccess(result.user!);
        }, 550);
      } else {
        setIsLoading(false);
        setErrorMessage(result.error || 'Kredensial tidak cocok. Silakan periksa kembali data Anda.');
      }
    } catch {
      setIsLoading(false);
      setErrorMessage('Terjadi gangguan jaringan saat menghubungi server autentikasi.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeLogin();
  };

  // Instant login with current preset
  const handleInstantDemoLogin = () => {
    executeLogin();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      
      {/* Outer Card Container */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden my-auto flex flex-col lg:flex-row transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* =========================================================================
            LEFT COLUMN: THEMATIC SHOWCASE & SCHOOL IDENTITY (Hidden on xs, prominent on md/lg)
            ========================================================================= */}
        <div className="relative lg:w-5/12 bg-[#0284c7] text-white p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
          
          {/* Background Hero Image with Measured Scrim */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img 
              src="/src/assets/images/login_hero_campus_1794206567959.jpg" 
              alt="Kampus dan Laboratorium SMAN 25 Jakarta"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-110"
              onError={(e) => {
                // Fallback graceful background if asset cannot load
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            {/* Multi-stage color gradient scrim for high text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#075985]/90 via-[#0369a1]/85 to-[#0c4a6e]/95 mix-blend-multiply" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#0284c7]/30 to-[#082f49]/80" />
          </div>

          {/* Top Brand Identity */}
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white text-[#0284c7] flex items-center justify-center shadow-lg ring-4 ring-white/20 shrink-0">
                <School className="w-6 h-6 text-[#0284c7]" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-200 block">
                  Portal Pembelajaran Terpadu
                </span>
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-tight">
                  SMAN 25 JAKARTA
                </h1>
              </div>
            </div>

            <div className="pt-2">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
                Gerbang Belajar Digital & Lab Sains Modern
              </h2>
              <p className="text-xs sm:text-sm text-sky-100/90 mt-2 leading-relaxed">
                Platform terintegrasi Kurikulum Merdeka Fase F dengan modul interaktif, CBT mandiri, dan simulasi laboratorium sains.
              </p>
            </div>
          </div>

          {/* Center Features Highlights */}
          <div className="relative z-10 my-6 space-y-2.5">
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-sky-400/20 text-sky-200 shrink-0 mt-0.5">
                <FlaskConical className="w-4 h-4 text-sky-200" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">Lab Sains Virtual Interaktif</h3>
                <p className="text-[11px] text-sky-100/80 leading-snug mt-0.5">
                  Simulasi reaksi titrasi asam-basa & mekanika hukum Newton langsung di browser.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-amber-400/20 text-amber-200 shrink-0 mt-0.5">
                <FileCheck2 className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">Ujian CBT Mandiri Terjadwal</h3>
                <p className="text-[11px] text-sky-100/80 leading-snug mt-0.5">
                  Bank soal ujian terstruktur dengan timer otomatis dan analisis hasil capaian siswa.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-emerald-400/20 text-emerald-200 shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-emerald-300" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">Presensi GPS & Kamera Selfie</h3>
                <p className="text-[11px] text-sky-100/80 leading-snug mt-0.5">
                  Verifikasi kehadiran real-time terhubung Dapodik dengan radius presensi sekolah.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Trust & Accreditation Badges */}
          <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-[11px] text-sky-100/80">
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span className="font-semibold">Akreditasi A (Unggul)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Dapodik Kemdikbudristek</span>
            </div>
          </div>

        </div>

        {/* =========================================================================
            RIGHT COLUMN: LOGIN FORM & ROLE SELECTOR
            ========================================================================= */}
        <div className="lg:w-7/12 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-white dark:bg-slate-900">
          
          <div className="space-y-6">
            
            {/* Header Greeting */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0284c7] dark:text-sky-400">
                  Autentikasi Akun
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
                  Masuk ke E-Learning
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Silakan pilih akun demo cepat di bawah atau masukkan kredensial terdaftar.
                </p>
              </div>

              {/* Help button */}
              <button
                type="button"
                onClick={() => setIsHelpModalOpen(true)}
                className="p-2 text-slate-400 hover:text-[#0284c7] dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                title="Bantuan Masuk & Reset Sandi"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Demo Accounts Selection Cards */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Pilih Akun Demo Cepat:
                </span>
                <span className="text-[11px] text-slate-400">
                  Klik untuk isi otomatis
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* 1. Siswa MIPA 1 */}
                <button
                  type="button"
                  onClick={() => handleSelectPreset('siswa_mipa')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between relative group ${
                    selectedRolePreset === 'siswa_mipa'
                      ? 'border-[#0284c7] bg-sky-50/80 dark:bg-sky-950/50 ring-2 ring-[#0284c7]/40 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:border-sky-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0284c7] dark:text-sky-400 uppercase tracking-wider">
                        <GraduationCap className="w-3.5 h-3.5" />
                        Akun Siswa MIPA
                      </span>
                      {selectedRolePreset === 'siswa_mipa' && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7] ring-2 ring-white dark:ring-slate-900" />
                      )}
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white mt-1.5 truncate">
                      Rafiandra Putra Dewa
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      Siswa Kelas XI MIPA 1
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-sky-700 dark:text-sky-300 mt-2.5 bg-sky-100/80 dark:bg-sky-900/50 px-2 py-0.5 rounded w-fit">
                    NISN: 0072938192
                  </div>
                </button>

                {/* 2. Guru Kimia */}
                <button
                  type="button"
                  onClick={() => handleSelectPreset('guru')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between relative group ${
                    selectedRolePreset === 'guru'
                      ? 'border-amber-500 bg-amber-50/80 dark:bg-amber-950/50 ring-2 ring-amber-500/40 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:border-amber-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                        <User className="w-3.5 h-3.5" />
                        Akun Pengajar (Guru)
                      </span>
                      {selectedRolePreset === 'guru' && (
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-white dark:ring-slate-900" />
                      )}
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white mt-1.5 truncate">
                      Dra. Hj. Sri Wahyuni, M.Pd
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      Guru Kimia Fase F (XI MIPA 1 & 2)
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-amber-700 dark:text-amber-300 mt-2.5 bg-amber-100/80 dark:bg-amber-900/50 px-2 py-0.5 rounded w-fit">
                    NIP: 197508122002122001
                  </div>
                </button>

              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 rounded-xl text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">{successMessage}</span>
              </div>
            )}

            {/* Authentication Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Input Identifier */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  {selectedRolePreset === 'guru' ? 'NIP / Email Guru Dapodik' : 'NISN / NIP / Email Dapodik'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={selectedRolePreset === 'guru' ? '197508122002122001' : '0072938192'}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white transition-all"
                    required
                  />
                </div>
              </div>

              {/* Input Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    Kata Sandi Akun
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsHelpModalOpen(true)}
                    className="text-[11px] text-[#0284c7] dark:text-sky-400 hover:underline cursor-pointer"
                  >
                    Lupa Sandi?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi Anda"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    title={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0284c7] focus:ring-sky-500 border-slate-300 dark:border-slate-700 cursor-pointer"
                  />
                  <span>Simpan sesi aktif di peramban ini</span>
                </label>
              </div>

              {/* Action Buttons: Primary Login & Instant Fast Login */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#0284c7] to-[#0369a1] hover:from-[#0369a1] hover:to-[#075985] disabled:opacity-60 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-sky-600/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Memverifikasi Kredensial & Mencatat Sesi...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>Masuk ke E-Learning SMAN 25</span>
                    </>
                  )}
                </button>

                {/* Instant 1-Click Fast Enter (Testing Convenience) */}
                <button
                  type="button"
                  onClick={handleInstantDemoLogin}
                  disabled={isLoading}
                  className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Masuk Langsung dengan Akun Demo Terpilih</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              </div>

            </form>

          </div>

          {/* Bottom Security Note */}
          <div className="pt-5 mt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 gap-2">
            <span className="flex items-center gap-1.5">
              <Laptop className="w-3.5 h-3.5 text-sky-500" />
              <span>Sesi dicatat di menu Keamanan (IP, Jenis Perangkat, Waktu)</span>
            </span>
            <span className="flex items-center gap-1 font-mono text-emerald-600 dark:text-emerald-400">
              <KeyRound className="w-3 h-3 text-emerald-500" />
              <span>Token Sesi JWT Aman</span>
            </span>
          </div>

        </div>

      </div>

      {/* =========================================================================
          HELP & PASSWORD RESET MODAL DIALOG (No window.alert)
          ========================================================================= */}
      {isHelpModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950/50 text-[#0284c7] dark:text-sky-400 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Pusat Bantuan & Reset Sandi
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Layanan IT E-Learning SMAN 25 Jakarta
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsHelpModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 space-y-2">
              <p>
                Untuk menjaga keamanan data Dapodik siswa dan guru, pengaturan ulang (reset) kata sandi dilakukan secara terverifikasi melalui:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-[11px]">
                <li><strong>Siswa:</strong> Hubungi Wali Kelas masing-masing atau tim IT SMAN 25 Jakarta.</li>
                <li><strong>Guru:</strong> Hubungi Koordinator IT Kurikulum di Ruang Server Lt. 2.</li>
              </ul>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-sky-600 dark:text-sky-400 uppercase font-bold block">
                    WhatsApp IT Center SMAN 25
                  </span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    +62 812-9900-2525
                  </span>
                </div>
                <Phone className="w-4 h-4 text-[#0284c7]" />
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Jam Layanan: Senin – Jumat (07.00 – 15.30 WIB)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsHelpModalOpen(false)}
              className="w-full py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Saya Mengerti & Kembali
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
