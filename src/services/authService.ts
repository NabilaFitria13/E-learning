import { UserProfile } from '../types';
import { DEMO_ACCOUNTS, mockStudents, CURRENT_STUDENT_XI_IPA } from '../data/mockData';

export interface ActiveSession {
  id: string;
  deviceName: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  ipAddress: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

const TOKEN_KEY = 'sman25_elearning_token';
const USER_KEY = 'sman25_elearning_user';
const SESSIONS_KEY = 'sman25_elearning_sessions';
const PASSWORD_STORE_KEY = 'sman25_elearning_passwords';

// Seed initial companion device sessions so user can monitor and manage multi-sessions
const INITIAL_MOCK_SESSIONS: ActiveSession[] = [
  {
    id: 'sess_browser_current',
    deviceName: 'Google Chrome Desktop (Windows 11)',
    deviceType: 'desktop',
    browser: 'Chrome 131.0 (Windows)',
    ipAddress: '182.253.160.84 (Telkom Indonesia)',
    location: 'Jakarta Barat, DKI Jakarta, ID',
    lastActive: 'Aktif sekarang',
    isCurrent: true,
  },
  {
    id: 'sess_companion_samsung',
    deviceName: 'Samsung Galaxy S24 Ultra (Android 15)',
    deviceType: 'mobile',
    browser: 'SMAN25 E-Learning App v2.4',
    ipAddress: '114.122.39.112 (Telkomsel 5G)',
    location: 'Jakarta Barat, DKI Jakarta, ID',
    lastActive: '25 menit yang lalu',
    isCurrent: false,
  },
  {
    id: 'sess_companion_tablet',
    deviceName: 'Samsung Galaxy Tab S9 (CBT Exam Lab)',
    deviceType: 'tablet',
    browser: 'SMAN25 Safe Exam Browser',
    ipAddress: '192.168.25.104 (Wi-Fi SMAN 25 Lab 2)',
    location: 'Grogol Petamburan, Jakarta Barat, ID',
    lastActive: 'Kemarin, 14.15 WIB',
    isCurrent: false,
  },
];

export const authService = {
  getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },

  setToken(token: string) {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {}
  },

  clearToken() {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch {}
  },

  getCachedUser(): UserProfile | null {
    try {
      const data = localStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setCachedUser(user: UserProfile) {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch {}
  },

  // =========================================================================
  // CLIENT-SIDE AUTHENTICATION WITHOUT FETCH
  // Menggunakan data mock JavaScript/TypeScript langsung, terhindar dari
  // kegagalan HTTP 404 / 'Unexpected token T' saat di-deploy ke Vercel.
  // =========================================================================
  async login(
    identifier: string, 
    password: string
  ): Promise<{ success: boolean; user?: UserProfile; token?: string; error?: string }> {
    const cleanId = (identifier || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (!cleanId) {
      return { success: false, error: 'Harap masukkan NISN, NIP, atau Email Dapodik terdaftar.' };
    }
    if (!cleanPass) {
      return { success: false, error: 'Harap masukkan kata sandi akun Anda.' };
    }

    // Periksa password yang tersimpan di localStorage (jika sudah diubah)
    let savedPasswords: Record<string, string> = {};
    try {
      const pStore = localStorage.getItem(PASSWORD_STORE_KEY);
      if (pStore) savedPasswords = JSON.parse(pStore);
    } catch {}

    // 1. Cek dari Akun Demo Resmi
    let matchedUser: UserProfile | null = null;
    let expectedPassword = 'siswa123';

    for (const key of Object.keys(DEMO_ACCOUNTS)) {
      const acc = DEMO_ACCOUNTS[key];
      const matchNisn = acc.user.nisn.toLowerCase() === cleanId;
      const matchEmail = acc.user.email.toLowerCase() === cleanId;
      const matchName = acc.user.name.toLowerCase().includes(cleanId);

      if (matchNisn || matchEmail || matchName) {
        matchedUser = acc.user;
        expectedPassword = savedPasswords[acc.user.id] || acc.password;
        break;
      }
    }

    // 2. Jika bukan akun demo utama, cari di 72 Siswa Terpadu (mockStudents)
    if (!matchedUser) {
      const foundStudent = mockStudents.find(
        (s) => s.nisn.toLowerCase() === cleanId || s.name.toLowerCase().includes(cleanId)
      );

      if (foundStudent) {
        matchedUser = {
          id: foundStudent.id,
          name: foundStudent.name,
          role: 'siswa_mipa',
          school: 'SMAN 25 Jakarta Barat',
          className: foundStudent.className,
          major: 'MIPA',
          nisn: foundStudent.nisn,
          email: `${foundStudent.name.toLowerCase().replace(/[^a-z0-9]/g, '.')}@sman25jkt.sch.id`,
          phone: '0812-3456-7890',
          parentPhone: '0812-9876-5432',
          bio: `Siswa Kelas ${foundStudent.className} SMAN 25 Jakarta.`,
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
          semester: 'Semester Ganjil 2026/2027 (Fase F)',
          academicYear: '2026/2027',
        };
        expectedPassword = savedPasswords[foundStudent.id] || 'siswa123';
      }
    }

    if (!matchedUser) {
      return { 
        success: false, 
        error: 'Akun dengan NISN/NIP atau Email tersebut tidak terdaftar di pangkalan data SMAN 25 Jakarta.' 
      };
    }

    // Verifikasi password (toleransi untuk akun demo jika diisi password standar)
    const isPassValid = 
      cleanPass === expectedPassword || 
      cleanPass === 'siswa123' || 
      cleanPass === 'guru123' || 
      cleanPass === 'demo';

    if (!isPassValid) {
      return { 
        success: false, 
        error: 'Kata sandi yang Anda masukkan salah. Cek tombol Akun Cepat di bawah.' 
      };
    }

    // Buat token sesi aman client-side
    const token = `token_client_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    this.setToken(token);
    this.setCachedUser(matchedUser);

    // Inisialisasi daftar sesi jika belum ada
    this.getActiveSessions().catch(() => {});

    return { 
      success: true, 
      user: matchedUser, 
      token 
    };
  },

  async getCurrentUser(): Promise<{ success: boolean; user?: UserProfile; session?: ActiveSession; error?: string }> {
    const token = this.getToken();
    const cached = this.getCachedUser();

    if (!token && !cached) {
      return { success: false, error: 'Tidak ada sesi login aktif.' };
    }

    const user = cached || CURRENT_STUDENT_XI_IPA;
    if (!cached) {
      this.setCachedUser(user);
    }

    return { 
      success: true, 
      user,
      session: INITIAL_MOCK_SESSIONS[0]
    };
  },

  async logout(): Promise<boolean> {
    this.clearToken();
    return true;
  },

  async getActiveSessions(): Promise<{ success: boolean; sessions: ActiveSession[]; error?: string }> {
    try {
      const stored = localStorage.getItem(SESSIONS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return { success: true, sessions: parsed };
        }
      }
      // Simpan initial mock sessions jika belum ada
      localStorage.setItem(SESSIONS_KEY, JSON.stringify(INITIAL_MOCK_SESSIONS));
      return { success: true, sessions: INITIAL_MOCK_SESSIONS };
    } catch {
      return { success: true, sessions: INITIAL_MOCK_SESSIONS };
    }
  },

  async terminateSession(sessionId: string): Promise<{ success: boolean; wasCurrent?: boolean; error?: string }> {
    try {
      const { sessions } = await this.getActiveSessions();
      const target = sessions.find(s => s.id === sessionId);
      const wasCurrent = target?.isCurrent || false;
      
      const filtered = sessions.filter(s => s.id !== sessionId);
      localStorage.setItem(SESSIONS_KEY, JSON.stringify(filtered));

      if (wasCurrent) {
        this.clearToken();
      }

      return { success: true, wasCurrent };
    } catch {
      return { success: false, error: 'Gagal memutuskan sesi perangkat.' };
    }
  },

  async terminateAllOtherSessions(): Promise<{ success: boolean; terminatedCount?: number; error?: string }> {
    try {
      const { sessions } = await this.getActiveSessions();
      const current = sessions.filter(s => s.isCurrent);
      const count = sessions.length - current.length;
      localStorage.setItem(SESSIONS_KEY, JSON.stringify(current));
      return { success: true, terminatedCount: count };
    } catch {
      return { success: false, error: 'Gagal mengeluarkan sesi lain.' };
    }
  },

  async changePassword(oldPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    const user = this.getCachedUser();
    if (!user) {
      return { success: false, error: 'Tidak ada sesi login.' };
    }

    if (!newPassword || newPassword.length < 6) {
      return { success: false, error: 'Kata sandi baru minimal 6 karakter.' };
    }

    try {
      let savedPasswords: Record<string, string> = {};
      const pStore = localStorage.getItem(PASSWORD_STORE_KEY);
      if (pStore) savedPasswords = JSON.parse(pStore);

      savedPasswords[user.id] = newPassword;
      localStorage.setItem(PASSWORD_STORE_KEY, JSON.stringify(savedPasswords));
      return { success: true };
    } catch {
      return { success: false, error: 'Gagal menyimpan kata sandi baru.' };
    }
  },

  async updateProfile(profileData: Partial<UserProfile>): Promise<{ success: boolean; user?: UserProfile; error?: string }> {
    const current = this.getCachedUser() || CURRENT_STUDENT_XI_IPA;
    const updated: UserProfile = {
      ...current,
      ...profileData,
    };

    this.setCachedUser(updated);
    return { success: true, user: updated };
  },
};
