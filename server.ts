import express, { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================================
// DATA MODELS & TYPES
// ============================================================================
export interface UserProfile {
  id: string;
  name: string;
  role: 'siswa_mipa' | 'siswa_ips' | 'guru';
  school: string;
  className: string;
  major: 'MIPA' | 'IPS';
  nisn: string;
  email: string;
  phone?: string;
  parentPhone?: string;
  bio?: string;
  avatarUrl?: string;
  semester: string;
  academicYear: string;
}

export interface SessionRecord {
  id: string;
  token: string;
  userId: string;
  deviceName: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  ipAddress: string;
  location: string;
  createdAt: string;
  lastActive: string;
}

// ============================================================================
// MOCK DATABASE & SEEDED USERS
// ============================================================================
interface UserAccount {
  user: UserProfile;
  passwordHash: string; // Plaintext demo or simple hashed string
}

const USERS: Record<string, UserAccount> = {
  usr_siswa_01: {
    user: {
      id: 'usr_siswa_01',
      name: 'Rafiandra Putra Dewa',
      role: 'siswa_mipa',
      school: 'SMAN 25 Jakarta Barat',
      className: 'XI MIPA 1',
      major: 'MIPA',
      nisn: '0072938192',
      email: 'rafiandra.pd@sman25jkt.sch.id',
      phone: '0812-9876-5432',
      parentPhone: '0813-1122-3344 (Bpk. Bambang Dewa)',
      bio: 'Siswa Kelas XI MIPA 1 SMAN 25 Jakarta. Peminatan Sains & Matematika, persiapan OSN Kimia dan Seleksi Nasional SNBP/SNBT 2026.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      semester: 'Ganjil 2025/2026',
      academicYear: '2025/2026',
    },
    passwordHash: 'siswa123',
  },
  usr_guru_01: {
    user: {
      id: 'usr_guru_01',
      name: 'Dra. Hj. Sri Wahyuni, M.Pd',
      role: 'guru',
      school: 'SMAN 25 Jakarta Barat',
      className: 'Pengajar Kimia Fase F',
      major: 'MIPA',
      nisn: '197508122002122001', // NIP Guru
      email: 'sri.wahyuni@sman25jkt.sch.id',
      phone: '0811-2345-6789',
      parentPhone: '-',
      bio: 'Guru Pengampu Mata Pelajaran Kimia Fase F SMA Negeri 25 Jakarta. Pembina Olimpiade Sains Kimia (OSN).',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
      semester: 'Ganjil 2025/2026',
      academicYear: '2025/2026',
    },
    passwordHash: 'guru123',
  },
  usr_siswa_02: {
    user: {
      id: 'usr_siswa_02',
      name: 'Dimas Pratama',
      role: 'siswa_ips',
      school: 'SMAN 25 Jakarta Barat',
      className: 'XI IPS 2',
      major: 'IPS',
      nisn: '0075849201',
      email: 'dimas.pratama@sman25jkt.sch.id',
      phone: '0813-7788-9900',
      parentPhone: '0812-4455-6677 (Ibu Ratna)',
      bio: 'Siswa Kelas XI IPS 2 SMAN 25 Jakarta.',
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
      semester: 'Ganjil 2025/2026',
      academicYear: '2025/2026',
    },
    passwordHash: 'siswa123',
  },
};

// ============================================================================
// IN-MEMORY ACTIVE SESSIONS STORE
// ============================================================================
// Map of sessionToken -> SessionRecord
const ACTIVE_SESSIONS = new Map<string, SessionRecord>();

// Pre-seed mock companion devices for student user to demonstrate multi-session monitoring
const SEED_TOKEN_MOBILE = 'seed_token_mobile_samsung';
ACTIVE_SESSIONS.set(SEED_TOKEN_MOBILE, {
  id: 'sess_seed_mobile_01',
  token: SEED_TOKEN_MOBILE,
  userId: 'usr_siswa_01',
  deviceName: 'Samsung Galaxy A54 5G',
  deviceType: 'mobile',
  browser: 'Aplikasi E-Learning SMAN 25 (Android 14)',
  ipAddress: '36.72.210.14',
  location: 'Palmerah, Jakarta Barat',
  createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  lastActive: '15 menit yang lalu',
});

const SEED_TOKEN_TABLET = 'seed_token_tablet_ipad';
ACTIVE_SESSIONS.set(SEED_TOKEN_TABLET, {
  id: 'sess_seed_tablet_02',
  token: SEED_TOKEN_TABLET,
  userId: 'usr_siswa_01',
  deviceName: 'iPad Air Gen 5 (Lab Komputer 2)',
  deviceType: 'tablet',
  browser: 'Apple Safari 17.4',
  ipAddress: '10.25.1.42 (Intranet SMAN 25)',
  location: 'Lab Komputer SMAN 25 Jakarta Barat',
  createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  lastActive: 'Kemarin, 14:20 WIB',
});

// Helper: Parse user-agent into friendly device & browser details
function parseClientInfo(req: Request): {
  deviceName: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  ipAddress: string;
  location: string;
} {
  const ua = req.headers['user-agent'] || '';
  const forwarded = req.headers['x-forwarded-for'];
  let ipAddress = typeof forwarded === 'string' 
    ? forwarded.split(',')[0].trim() 
    : (req.socket.remoteAddress || '182.253.114.88');

  if (ipAddress === '::1' || ipAddress === '127.0.0.1' || ipAddress.includes('localhost')) {
    ipAddress = '182.253.114.88 (Koneksi Lokal/Proxy)';
  }

  let deviceType: 'desktop' | 'mobile' | 'tablet' = 'desktop';
  let deviceName = 'Komputer Desktop / Laptop';
  let browser = 'Web Browser';
  let location = 'Jakarta Barat, DKI Jakarta';

  if (/ipad|tablet/i.test(ua)) {
    deviceType = 'tablet';
    deviceName = 'iPad / Android Tablet';
  } else if (/mobile|iphone|android/i.test(ua)) {
    deviceType = 'mobile';
    if (/iphone/i.test(ua)) {
      deviceName = 'Apple iPhone';
    } else if (/samsung/i.test(ua)) {
      deviceName = 'Samsung Galaxy Device';
    } else {
      deviceName = 'Smartphone Android Siswa';
    }
  } else if (/macintosh|mac os x/i.test(ua)) {
    deviceName = 'Apple MacBook Pro';
  } else if (/windows nt/i.test(ua)) {
    deviceName = 'PC Windows 11 Siswa';
  } else if (/linux/i.test(ua)) {
    deviceName = 'Workstation Linux';
  }

  if (/chrome|crios/i.test(ua) && !/edg/i.test(ua)) {
    browser = 'Google Chrome';
  } else if (/safari/i.test(ua) && !/chrome/i.test(ua)) {
    browser = 'Apple Safari';
  } else if (/edg/i.test(ua)) {
    browser = 'Microsoft Edge';
  } else if (/firefox|fxios/i.test(ua)) {
    browser = 'Mozilla Firefox';
  }

  return { deviceName, deviceType, browser, ipAddress, location };
}

// Token helper
function extractBearerToken(req: Request): string | null {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }
  // Also check cookie header fallback
  const cookies = req.headers['cookie'];
  if (cookies) {
    const match = cookies.match(/auth_session_token=([^;]+)/);
    if (match) return decodeURIComponent(match[1]);
  }
  return null;
}

// ============================================================================
// MAIN APPLICATION SETUP
// ============================================================================
async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // ==========================================================================
  // AUTHENTICATION & SESSION MANAGEMENT REST APIS
  // ==========================================================================

  // 1. POST /api/auth/login
  // Sign in with NISN/NIP or Email + Password
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        error: 'Harap masukkan NISN / Email dan Kata Sandi.',
      });
    }

    const cleanId = String(identifier).trim().toLowerCase();
    const cleanPwd = String(password).trim();

    // Look up user by NISN or Email
    const account = Object.values(USERS).find((acc) => {
      const matchNisn = acc.user.nisn.toLowerCase() === cleanId;
      const matchEmail = acc.user.email.toLowerCase() === cleanId;
      return matchNisn || matchEmail;
    });

    if (!account) {
      return res.status(401).json({
        success: false,
        error: 'NISN / Email tidak terdaftar di sistem Dapodik SMAN 25 Jakarta.',
      });
    }

    if (account.passwordHash !== cleanPwd) {
      return res.status(401).json({
        success: false,
        error: 'Kata sandi yang Anda masukkan salah. Silakan periksa kembali.',
      });
    }

    // Generate secure session token and unique session ID
    const sessionToken = `jwt_sman25_${crypto.randomBytes(24).toString('hex')}`;
    const sessionId = `sess_${crypto.randomBytes(8).toString('hex')}`;

    const clientInfo = parseClientInfo(req);

    const nowStr = 'Sesi Aktif Sekarang';
    const newSession: SessionRecord = {
      id: sessionId,
      token: sessionToken,
      userId: account.user.id,
      deviceName: clientInfo.deviceName,
      deviceType: clientInfo.deviceType,
      browser: clientInfo.browser,
      ipAddress: clientInfo.ipAddress,
      location: clientInfo.location,
      createdAt: new Date().toISOString(),
      lastActive: nowStr,
    };

    ACTIVE_SESSIONS.set(sessionToken, newSession);

    // Set cookie as an option
    res.setHeader('Set-Cookie', `auth_session_token=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`);

    return res.json({
      success: true,
      message: `Selamat datang kembali, ${account.user.name}!`,
      token: sessionToken,
      user: account.user,
      session: {
        id: newSession.id,
        deviceName: newSession.deviceName,
        deviceType: newSession.deviceType,
        browser: newSession.browser,
        ipAddress: newSession.ipAddress,
        location: newSession.location,
        lastActive: newSession.lastActive,
        isCurrent: true,
      },
    });
  });

  // 2. GET /api/auth/me
  // Retrieve current user and session status using active token
  app.get('/api/auth/me', (req: Request, res: Response) => {
    const token = extractBearerToken(req);
    if (!token || !ACTIVE_SESSIONS.has(token)) {
      return res.status(401).json({
        success: false,
        error: 'Sesi login tidak valid atau telah berakhir.',
      });
    }

    const session = ACTIVE_SESSIONS.get(token)!;
    const account = USERS[session.userId];

    if (!account) {
      ACTIVE_SESSIONS.delete(token);
      return res.status(401).json({
        success: false,
        error: 'Pengguna tidak ditemukan.',
      });
    }

    session.lastActive = 'Sesi Aktif Sekarang';

    return res.json({
      success: true,
      user: account.user,
      session: {
        id: session.id,
        deviceName: session.deviceName,
        deviceType: session.deviceType,
        browser: session.browser,
        ipAddress: session.ipAddress,
        location: session.location,
        lastActive: session.lastActive,
        isCurrent: true,
      },
    });
  });

  // 3. POST /api/auth/logout
  // End current session and invalidate token
  app.post('/api/auth/logout', (req: Request, res: Response) => {
    const token = extractBearerToken(req);
    if (token && ACTIVE_SESSIONS.has(token)) {
      ACTIVE_SESSIONS.delete(token);
    }

    // Clear session cookie
    res.setHeader('Set-Cookie', 'auth_session_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');

    return res.json({
      success: true,
      message: 'Sesi Anda telah berhasil diakhiri.',
    });
  });

  // 4. GET /api/auth/sessions
  // List all active sessions for current user (with device, IP, and isCurrent flag)
  app.get('/api/auth/sessions', (req: Request, res: Response) => {
    const token = extractBearerToken(req);
    if (!token || !ACTIVE_SESSIONS.has(token)) {
      return res.status(401).json({
        success: false,
        error: 'Silakan masuk terlebih dahulu.',
      });
    }

    const currentSession = ACTIVE_SESSIONS.get(token)!;
    const userSessions: Array<{
      id: string;
      deviceName: string;
      deviceType: 'desktop' | 'mobile' | 'tablet';
      browser: string;
      ipAddress: string;
      location: string;
      lastActive: string;
      isCurrent: boolean;
    }> = [];

    for (const [sessToken, session] of ACTIVE_SESSIONS.entries()) {
      if (session.userId === currentSession.userId) {
        userSessions.push({
          id: session.id,
          deviceName: session.deviceName,
          deviceType: session.deviceType,
          browser: session.browser,
          ipAddress: session.ipAddress,
          location: session.location,
          lastActive: session.lastActive,
          isCurrent: sessToken === token,
        });
      }
    }

    // Sort: current session first, then other devices
    userSessions.sort((a, b) => (b.isCurrent ? 1 : 0) - (a.isCurrent ? 1 : 0));

    return res.json({
      success: true,
      totalActive: userSessions.length,
      sessions: userSessions,
    });
  });

  // 5. DELETE /api/auth/sessions/:sessionId
  // Terminate a specific session by session ID
  app.delete('/api/auth/sessions/:sessionId', (req: Request, res: Response) => {
    const token = extractBearerToken(req);
    if (!token || !ACTIVE_SESSIONS.has(token)) {
      return res.status(401).json({
        success: false,
        error: 'Silakan masuk terlebih dahulu.',
      });
    }

    const currentSession = ACTIVE_SESSIONS.get(token)!;
    const targetSessionId = req.params.sessionId;

    let foundToken: string | null = null;
    let isTerminatingSelf = false;

    for (const [sessToken, session] of ACTIVE_SESSIONS.entries()) {
      if (session.id === targetSessionId && session.userId === currentSession.userId) {
        foundToken = sessToken;
        if (sessToken === token) {
          isTerminatingSelf = true;
        }
        break;
      }
    }

    if (!foundToken) {
      return res.status(404).json({
        success: false,
        error: 'Sesi perangkat tidak ditemukan atau bukan milik akun Anda.',
      });
    }

    // Invalidate the session
    ACTIVE_SESSIONS.delete(foundToken);

    if (isTerminatingSelf) {
      res.setHeader('Set-Cookie', 'auth_session_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');
    }

    return res.json({
      success: true,
      message: isTerminatingSelf
        ? 'Perangkat ini berhasil dikeluarkan dari akun.'
        : 'Sesi perangkat berhasil diakhiri secara real-time.',
      wasCurrent: isTerminatingSelf,
    });
  });

  // 6. POST /api/auth/sessions/terminate-all-others
  // Terminate all sessions except caller's current session
  app.post('/api/auth/sessions/terminate-all-others', (req: Request, res: Response) => {
    const token = extractBearerToken(req);
    if (!token || !ACTIVE_SESSIONS.has(token)) {
      return res.status(401).json({
        success: false,
        error: 'Silakan masuk terlebih dahulu.',
      });
    }

    const currentSession = ACTIVE_SESSIONS.get(token)!;
    let terminatedCount = 0;

    for (const [sessToken, session] of ACTIVE_SESSIONS.entries()) {
      if (session.userId === currentSession.userId && sessToken !== token) {
        ACTIVE_SESSIONS.delete(sessToken);
        terminatedCount++;
      }
    }

    return res.json({
      success: true,
      message: `${terminatedCount} sesi perangkat lain telah berhasil dikeluarkan.`,
      terminatedCount,
    });
  });

  // 7. POST /api/auth/change-password
  app.post('/api/auth/change-password', (req: Request, res: Response) => {
    const token = extractBearerToken(req);
    if (!token || !ACTIVE_SESSIONS.has(token)) {
      return res.status(401).json({
        success: false,
        error: 'Silakan masuk terlebih dahulu.',
      });
    }

    const currentSession = ACTIVE_SESSIONS.get(token)!;
    const account = USERS[currentSession.userId];
    const { oldPassword, newPassword } = req.body;

    if (!account) {
      return res.status(404).json({ success: false, error: 'Pengguna tidak ditemukan.' });
    }

    if (account.passwordHash !== oldPassword) {
      return res.status(400).json({
        success: false,
        error: 'Kata sandi lama yang Anda masukkan tidak sesuai.',
      });
    }

    if (!newPassword || String(newPassword).length < 8) {
      return res.status(400).json({
        success: false,
        error: 'Kata sandi baru minimal 8 karakter.',
      });
    }

    account.passwordHash = String(newPassword);

    return res.json({
      success: true,
      message: 'Kata sandi berhasil diperbarui dengan aman!',
    });
  });

  // 8. PUT /api/auth/profile
  app.put('/api/auth/profile', (req: Request, res: Response) => {
    const token = extractBearerToken(req);
    if (!token || !ACTIVE_SESSIONS.has(token)) {
      return res.status(401).json({
        success: false,
        error: 'Silakan masuk terlebih dahulu.',
      });
    }

    const currentSession = ACTIVE_SESSIONS.get(token)!;
    const account = USERS[currentSession.userId];

    if (!account) {
      return res.status(404).json({ success: false, error: 'Pengguna tidak ditemukan.' });
    }

    const { name, phone, parentPhone, bio, email, avatarUrl } = req.body;
    if (name) account.user.name = name;
    if (phone !== undefined) account.user.phone = phone;
    if (parentPhone !== undefined) account.user.parentPhone = parentPhone;
    if (bio !== undefined) account.user.bio = bio;
    if (email !== undefined) account.user.email = email;
    if (avatarUrl !== undefined) account.user.avatarUrl = avatarUrl;

    return res.json({
      success: true,
      message: 'Data profil berhasil diperbarui.',
      user: account.user,
    });
  });

  // ==========================================================================
  // VITE DEV SERVER / STATIC HOSTING
  // ==========================================================================
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  // Start HTTP dev server on port 3000
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[E-Learning SMAN 25] Server aktif di port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[E-Learning SMAN 25] Gagal menjalankan server:', err);
  process.exit(1);
});
