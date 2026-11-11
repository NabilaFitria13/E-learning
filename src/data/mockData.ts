import { 
  UserProfile, 
  ExamItem, 
  AgendaItem, 
  SubjectCourse, 
  AssignmentItem, 
  ScheduleItem, 
  AttendanceRecord, 
  ModulAjarData,
  StudentGradeRecord,
  DemoAccount
} from '../types';
import { 
  STUDENTS_XI_MIPA_1, 
  STUDENTS_XI_MIPA_2, 
  ALL_TEACHER_STUDENTS 
} from './teacherStudentsData';

export const CURRENT_STUDENT_XI_IPA: UserProfile = {
  id: 'user_01',
  name: 'Rafiandra Putra Dewa',
  role: 'siswa_mipa',
  school: 'SMAN 25 Jakarta Barat',
  className: 'Kelas XI MIPA 1 (Sains & Teknologi)',
  major: 'MIPA',
  nisn: '0072938192',
  email: 'rafiandra.pd@sman25jkt.sch.id',
  phone: '0812-9876-5432',
  parentPhone: '0813-1122-3344 (Bpk. Bambang Dewa)',
  bio: 'Siswa Kelas XI MIPA 1 SMAN 25 Jakarta. Peminatan Sains & Matematika, persiapan OSN Kimia dan Seleksi Nasional SNBP/SNBT 2026.',
  semester: 'Semester Ganjil 2026/2027 (Fase F)',
  academicYear: '2026/2027',
};

export const CURRENT_STUDENT_XI_MIPA: UserProfile = CURRENT_STUDENT_XI_IPA;

// =========================================================================
// DATA 72 SISWA TERPADU KELAS XI MIPA 1 & XI MIPA 2 (JAVASCRIPT / TS ARRAY)
// =========================================================================
export const mockStudents: StudentGradeRecord[] = ALL_TEACHER_STUDENTS;
export {
  STUDENTS_XI_MIPA_1,
  STUDENTS_XI_MIPA_2,
  ALL_TEACHER_STUDENTS,
};
export type { StudentGradeRecord };

// =========================================================================
// AKUN DEMO RESMI SMAN 25 JAKARTA (SISWA MIPA, GURU PENGAJAR, SISWA IPS)
// =========================================================================
export const DEMO_ACCOUNTS: Record<string, DemoAccount> = {
  siswa_mipa: {
    id: 'usr_siswa_01',
    user: CURRENT_STUDENT_XI_IPA,
    password: 'siswa123',
    label: 'Siswa XI MIPA 1 (Rafiandra Putra Dewa)',
    roleBadge: 'Siswa MIPA',
  },
  guru: {
    id: 'usr_guru_01',
    user: {
      id: 'usr_guru_01',
      name: 'Dra. Hj. Sri Wahyuni, M.Pd',
      role: 'guru',
      school: 'SMAN 25 Jakarta Barat',
      className: 'Pengajar Kimia Fase F',
      major: 'MIPA',
      nisn: '197508122002122001',
      email: 'sri.wahyuni@sman25jkt.sch.id',
      phone: '0811-2345-6789',
      parentPhone: '-',
      bio: 'Guru Pengampu Mata Pelajaran Kimia Fase F SMA Negeri 25 Jakarta. Pembina Olimpiade Sains Kimia (OSN).',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
      semester: 'Semester Ganjil 2026/2027 (Fase F)',
      academicYear: '2026/2027',
    },
    password: 'guru123',
    label: 'Guru Pengampu & Wali Kelas (Dra. Hj. Sri Wahyuni)',
    roleBadge: 'Guru Kimia Fase F',
  },
  siswa_ips: {
    id: 'usr_siswa_02',
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
      semester: 'Semester Ganjil 2026/2027 (Fase F)',
      academicYear: '2026/2027',
    },
    password: 'siswa123',
    label: 'Siswa XI IPS 2 (Dimas Pratama)',
    roleBadge: 'Siswa IPS',
  },
};

export const mockDemoAccounts: DemoAccount[] = Object.values(DEMO_ACCOUNTS);
export const MOCK_DEMO_ACCOUNTS = mockDemoAccounts;

export const USER_PROFILES: Record<string, UserProfile> = {
  siswa_mipa: CURRENT_STUDENT_XI_IPA,
  guru: DEMO_ACCOUNTS.guru.user,
  siswa_ips: DEMO_ACCOUNTS.siswa_ips.user,
  default: CURRENT_STUDENT_XI_IPA,
};

// =========================================================================
// MODUL AJAR DIGITAL KURIKULUM MERDEKA SMA FASE F (KELAS 11 MIPA)
// =========================================================================
export const MOCK_MODUL_AJAR: Record<string, ModulAjarData> = {
  'Bahasa Indonesia': {
    id: 'modul_bindo',
    subject: 'Bahasa Indonesia',
    title: 'Teks Argumentasi Kritis & Esai Ilmiah Kontemporer',
    grade: 'Kelas XI SMA (Fase F)',
    phase: 'Fase F (Kurikulum Merdeka SMA)',
    author: 'Ibu Dra. Sri Wahyuni, M.Pd',
    duration: '2 JP × 45 Menit',
    capaianPembelajaran: 'Peserta didik mampu mengevaluasi gagasan, pandangan, dan fakta faktual dalam teks argumentasi, menyusun argumen logis berbasis data empiris, serta mempublikasikan tulisan yang taat pada etika kebahasaan dan terbebas dari sesat pikir.',
    tujuanPembelajaran: [
      'Menganalisis struktur anatomis teks argumentasi: Tesis, Rangkaian Argumen Evidensial, dan Penegasan Ulang.',
      'Mengidentifikasi dan membedakan antara fakta objektif (data empiris) dan opini subjektif.',
      'Menulis teks argumentasi menggunakan konjungsi kausalitas dan kalimat efektif PUEBI.',
      'Menghindari sesat pikir penalaran (logical fallacies) seperti ad hominem dan generalisasi tergesa-gesa.'
    ],
    materiPokok: 'Teks argumentasi merupakan ragam wacana yang bertujuan meyakinkan pembaca atau pendengar agar menerima kebenaran sudut pandang penulis. Teks ini dibangun di atas pondasi rasional berupa proposisi tesis, diperkuat oleh bukti faktual (data statistik BPS, hasil riset ilmiah, pendapat otoritas pakar), dan disimpulkan dalam penegasan rekomendatif.',
    materiLengkap: 'Dalam kurikulum Merdeka Fase F, keterampilan berargumentasi tidak hanya sebatas menyampaikan pendapat, tetapi melatih integritas intelektual siswa dalam memverifikasi sumber rujukan. Argumentasi yang kuat selalu didukung oleh premis mayor (aturan/prinsip umum), premis minor (fakta lapangan konkret), dan konklusi logis yang koheren. Siswa dilatih untuk mengkritisi berita palsu (hoaks) dan memisahkan antara bias personal dengan fakta empiris terukur.',
    subBabMateri: [
      {
        judul: '1. Anatomi & Struktur Inti Teks Argumentasi',
        isi: 'Teks argumentasi terdiri atas tiga blok struktural: (a) Pernyataan Pendapat/Tesis: Gagasan sentral atau pendirian penulis terhadap isu faktual; (b) Rangkaian Argumen (Body Paragraphs): Paragraf elaborasi yang memuat premis-premis logis, data statistik terverifikasi, dan kutipan jurnal kredibel; (c) Penegasan Ulang (Reiteration/Conclusion): Sintesis argumen yang mempertegas kembali tesis awal disertai rekomendasi konstruktif.',
        poinPenting: [
          'Tesis harus spesifik, dapat diperdebatkan (arguable), dan tidak bernada netral gamang.',
          'Setiap paragraf argumen wajib memiliki satu kalimat topik (topic sentence) dan didukung bukti nyata.',
          'Penegasan ulang bukan sekadar mengulang kata-kata tesis, melainkan merangkum intisari bukti.'
        ],
        contohAplikasi: 'Menulis teks argumentasi tentang "Urgensi Diversifikasi Energi Terbarukan untuk Menekan Emisi Karbon di Wilayah Perkotaan Jakarta".'
      },
      {
        judul: '2. Kaidah Kebahasaan, Konjungsi Kausalitas & Kalimat Efektif',
        isi: 'Bahasa dalam teks argumentasi berkarakter denotatif, lugas, dan terstruktur rapi. Penggunaan konjungsi kausalitas (karena, sebab, oleh karena itu, sehingga, mengakibatkan) berfungsi merajut hubungan sebab-akibat antarperistiwa. Kalimat efektif wajib memenuhi subjek dan predikat yang eksplisit, menghindari preposisi perusak subjek di awal kalimat (misal: "Bagi siswa yang ingin..."), serta menggunakan diksi formal baku.',
        poinPenting: [
          'Konjungsi antarkalimat: "Oleh karena itu", "Meskipun demikian", "Dengan demikian".',
          'Kata kerja mental: mengasumsikan, membuktikan, menyimpulkan, menganalisis.',
          'Kata modalitas: harus, seyogianya, berpotensi, dipastikan.'
        ],
        contohAplikasi: 'Memperbaiki kalimat rancu menjadi kalimat ilmiah yang taat asas tata bahasa baku Bahasa Indonesia.'
      },
      {
        judul: '3. Identifikasi & Pencegahan Sesat Pikir (Logical Fallacy)',
        isi: 'Penalaran kritis menuntut siswa mengenali jebakan logika yang sering melemahkan argumen, antara lain: (1) Ad Hominem: Menyerang pribadi atau identitas lawan bicara ketimbang membantah substansi argumen; (2) Hasty Generalization (Generalisasi Tergesa-gesa): Mengambil simpulan universal hanya dari satu atau dua contoh kecil yang belum representatif; (3) Straw Man: Memelintir argumen lawan menjadi karikatur ekstrem agar mudah dijatuhkan.',
        poinPenting: [
          'Uji validitas: Apakah kesimpulan ditarik dari premis yang benar secara faktual?',
          'Kritisi sumber data: Apakah institusi penerbit data memiliki kredibilitas ilmiah independen?'
        ]
      }
    ],
    rangkumanMateri: [
      'Teks argumentasi bertujuan meyakinkan pembaca menggunakan penalaran rasional dan evidensi data empiris.',
      'Tiga pilar struktur: Tesis (Pendapat utama), Argumen (Bukti & Analisis), dan Penegasan Ulang (Simpulan & Rekomendasi).',
      'Penggunaan konjungsi kausalitas dan kalimat efektif memastikan alur berpikir mengalir logis tanpa ambiguitas.',
      'Hindari sesat pikir (fallacy) seperti ad hominem dan generalisasi gegabah untuk menjaga integritas tulisan ilmiah.'
    ],
    contohKasus: {
      pertanyaan: 'Perhatikan penggalan teks: "Banyak remaja perkotaan kini gemar mengonsumsi makanan cepat saji tinggi natrium. Berdasarkan laporan Riskesdas Kemenkes, prevalensi hipertensi usia muda meningkat 12% dalam lima tahun terakhir. Oleh karena itu, pengawasan kantin sekolah dan edukasi gizi seimbang perlu diterapkan secara ketat." Tentukan fungsi bagian teks tersebut!',
      pembahasan: 'Teks di atas merupakan perpaduan fakta empiris (laporan Riskesdas Kemenkes dengan data statistik 12%) yang bertindak sebagai argumen evidensial, diikuti oleh konjungsi kausalitas ("Oleh karena itu") yang mengantarkan kalimat penegasan rekomendatif untuk kebijakan kantin sekolah.'
    },
    tipsBelajar: 'Gunakan metode PEEL (Point, Explanation, Evidence, Link) saat menyusun setiap paragraf argumen agar tulisan Anda memiliki struktur akademis yang kuat dan meyakinkan penguji ujian.',
    formulaOrDiagram: 'Alur Esai: [Tesis Isu Faktual] ➔ [Argumen 1 + Data BPS] ➔ [Argumen 2 + Jurnal Riset] ➔ [Refutasi Pandangan Kontra] ➔ [Simpulan & Solusi Rekomendasi]',
    glosarium: [
      { istilah: 'Tesis', arti: 'Pernyataan pendirian atau gagasan pokok yang menjadi poros perdebatan dalam esai argumentasi.' },
      { istilah: 'Evidensi Empiris', arti: 'Bukti faktual yang diperoleh melalui pengamatan, eksperimen, atau survei statistik teruji.' },
      { istilah: 'Konjungsi Kausalitas', arti: 'Kata hubung yang menyatakan hubungan sebab-akibat antarklausa atau antarkalimat.' },
      { istilah: 'Ad Hominem', arti: 'Kekeliruan berlogika dengan menyerang karakteristik pribadi lawan ketimbang substansi perdebatannya.' }
    ],
    lkpd: {
      judulAktivitas: 'Menyusun Esai Argumentatif Bertema Ketahanan Pangan Nasional',
      alatBahan: ['Tabel Statistik BPS Produksi Padi', 'Artikel Opini Media Terverifikasi', 'Lembar Kerja Analisis Argumen'],
      langkahKerja: [
        'Pilihlah salah satu topik: "Diversifikasi Pangan Non-Beras" atau "Pemanfaatan Smart Farming di Perkotaan".',
        'Rumuskan satu kalimat tesis yang tegas di awal paragraf pengantar.',
        'Kumpulkan minimal 2 data kuantitatif dari sumber resmi pemerintah untuk mendukung premis argumen.',
        'Tuliskan satu potensi bantahan (kontra-argumen) dan berikan argumen tangkisan (refutasi) yang rasional.',
        'Tutup esai dengan penegasan ulang serta rekomendasi kebijakan konkret.'
      ],
      pertanyaanDiskusi: [
        'Mengapa penyertaan data kuantitatif dapat meningkatkan daya persuasif suatu teks argumentasi?',
        'Bagaimana cara membedakan antara generalisasi logis dengan generalisasi tergesa-gesa (hasty generalization)?'
      ]
    },
    konsepKunci: [
      { title: 'Konjungsi Kausalitas', desc: 'Kata hubung sebab-akibat seperti "karena", "sehingga", "mengakibatkan", "oleh sebab itu".' },
      { title: 'Kalimat Efektif', desc: 'Kalimat bersubjek jelas tanpa preposisi perusak seperti "Bagi siswa yang..." yang menghilangkan subjek.' },
      { title: 'Evidensi Empiris', desc: 'Fakta nyata yang dapat diverifikasi dari survei resmi BPS, jurnal ilmiah, atau data terpercaya.' }
    ],
    quizCheck: {
      question: 'Manakah bagian yang mutlak harus ada untuk memperkuat kredibilitas tesis dalam teks argumentasi?',
      options: ['Koda naratif', 'Evidensi dan bukti faktual', 'Kalimat imperatif majemuk', 'Rima purwakanti'],
      correctIndex: 1,
      explanation: 'Evidensi faktual (data statistik atau rujukan riset terpercaya) adalah pondasi rasional yang membuat argumen dapat diuji kebenarannya.'
    }
  },

  'Matematika Peminatan': {
    id: 'modul_mat_pem',
    subject: 'Matematika Peminatan',
    title: 'Kalkulus Lanjut: Turunan Fungsi Trigonometri & Garis Singgung Kurva',
    grade: 'Kelas XI SMA (Fase F)',
    phase: 'Fase F (Kurikulum Merdeka SMA)',
    author: 'Ibu Ratna Dewi, S.Pd',
    duration: '3 JP × 45 Menit',
    capaianPembelajaran: 'Peserta didik mampu menerapkan konsep turunan fungsi trigonometri menggunakan aturan dasar, aturan rantai, serta memodelkan laju perubahan sesaat, kemiringan garis singgung, dan nilai ekstrem pada fenomena fisika dan keteknikan.',
    tujuanPembelajaran: [
      'Menemukan dan membuktikan turunan fungsi sinus, kosinus, tangen, sekan, kosekan, dan kotangen.',
      'Mengoperasikan aturan rantai (Chain Rule) pada fungsi komposisi trigonometri majemuk y = f(u(x)).',
      'Menentukan persamaan garis singgung kurva trigonometri pada titik berabsis x1 dengan gradien m = f\'(x1).',
      'Menganalisis interval kurva fungsi naik, fungsi turun, dan koordinat titik stasioner (maksimum/minimum).'
    ],
    materiPokok: 'Kalkulus diferensial trigonometri mengkaji laju perubahan nilai perbandingan sudut terhadap pertambahan variabel sudut dalam satuan radian. Rumus dasar: d/dx[sin(x)] = cos(x), d/dx[cos(x)] = -sin(x), d/dx[tan(x)] = sec²(x). Pada fungsi komposisi, berlaku aturan rantai dy/dx = (dy/du) · (du/dx).',
    materiLengkap: 'Konsep turunan trigonometri merupakan pilar fundamental dalam fisika gelombang harmonik, pemodelan arus bolak-balik (AC), dan mekanika getaran pegas. Turunan pertama f\'(x) merepresentasikan gradien kemiringan garis singgung kurva pada setiap titik absis. Ketika f\'(x) > 0 kurva naik secara monoton, ketika f\'(x) < 0 kurva turun, dan pada saat f\'(x) = 0 kurva berada pada titik stasioner puncak atau lembah.',
    subBabMateri: [
      {
        judul: '1. Turunan Dasar Fungsi Trigonometri',
        isi: 'Dari definisi limit turunan f\'(x) = lim(h➔0) [f(x+h) - f(x)]/h dan identitas trigonometri penjumlahan sudut sin(A+B) serta sifat limit lim(h➔0)[sin(h)/h] = 1, diturunkan rumus standar: (1) d/dx[sin x] = cos x; (2) d/dx[cos x] = -sin x; (3) d/dx[tan x] = sec² x; (4) d/dx[cot x] = -csc² x; (5) d/dx[sec x] = sec x · tan x; (6) d/dx[csc x] = -csc x · cot x.',
        poinPenting: [
          'Ingat tanda minus (-) pada turunan fungsi yang diawali huruf C: kosinus, kotangen, dan kosekan.',
          'Sudut x wajib dalam satuan radian saat melakukan perhitungan turunan dan kalkulus.',
          'Turunan dari tan(x) = sin(x)/cos(x) diperoleh menggunakan aturan pembagian turunan u/v.'
        ],
        contohAplikasi: 'Menghitung laju perubahan tegangan bolak-balik V(t) = 220 sin(100π t) terhadap waktu t.'
      },
      {
        judul: '2. Aturan Rantai (Chain Rule) pada Fungsi Trigonometri Majemuk',
        isi: 'Jika y = f(u) dan u = g(x), maka turunan y terhadap x dirumuskan sebagai dy/dx = (dy/du) · (du/dx). Untuk fungsi berpangkat trigonometri seperti y = sinⁿ(u(x)), penurunannya melalui tiga tahapan terpadu: (1) Turunkan pangkatnya menjadi n · sinⁿ⁻¹(u); (2) Turunkan fungsi trigonometrinya menjadi cos(u); (3) Turunkan sudut dalamnya menjadi u\'(x).',
        poinPenting: [
          'Rumus umum: d/dx [sin(ax + b)] = a · cos(ax + b).',
          'Rumus umum: d/dx [cos(ax + b)] = -a · sin(ax + b).',
          'Bentuk kuadrat y = sin²(3x): y\' = 2 sin(3x) · cos(3x) · 3 = 3 sin(6x).'
        ]
      },
      {
        judul: '3. Persamaan Garis Singgung & Titik Stasioner',
        isi: 'Gradien m dari garis yang menyinggung kurva y = f(x) pada absis x = a dihitung dengan mengevaluasi turunan pertama pada absis tersebut: m = f\'(a). Persamaan garis singgungnya adalah y - y1 = m(x - x1). Titik stasioner diperoleh dengan menyelesaikan persamaan f\'(x) = 0. Uji turunan kedua f\'\'(x) digunakan untuk membedakan titik balik maksimum (f\'\' < 0) atau titik balik minimum (f\'\' > 0).',
        poinPenting: [
          'Jika f\'\'(a) < 0, kurva cekung ke bawah dan x = a adalah absis titik maksimum lokal.',
          'Jika f\'\'(a) > 0, kurva cekung ke atas dan x = a adalah absis titik minimum lokal.',
          'Garis normal kurva tegak lurus terhadap garis singgung dengan gradien m_normal = -1/m.'
        ]
      }
    ],
    rangkumanMateri: [
      'Turunan sinus adalah kosinus, turunan kosinus adalah minus sinus, dan turunan tangen adalah sekan kuadrat.',
      'Aturan rantai: kalikan turunan fungsi luar dengan turunan fungsi dalam: f\'(x) = f\'(u) · u\'(x).',
      'Gradien garis singgung kurva adalah nilai turunan pertama pada titik singgung: m = f\'(x1).',
      'Titik stasioner terjadi saat f\'(x) = 0. Uji f\'\'(x) mengidentifikasi jenis maksimum atau minimum.'
    ],
    contohKasus: {
      pertanyaan: 'Tentukan persamaan garis singgung kurva f(x) = 2 sin(2x) di titik dengan absis x = π/6!',
      pembahasan: 'Langkah 1: Cari ordinat y1 dengan mensubstitusi x = π/6 ➔ y1 = 2 sin(2 · π/6) = 2 sin(π/3) = 2 · (1/2 √3) = √3. Jadi titik singgungnya adalah (π/6, √3).\nLangkah 2: Cari gradien m dengan menurunkan f(x) ➔ f\'(x) = 2 · [cos(2x) · 2] = 4 cos(2x).\nSubstitusi x = π/6 ➔ m = 4 cos(2 · π/6) = 4 cos(π/3) = 4 · (1/2) = 2.\nLangkah 3: Terapkan rumus garis singgung y - y1 = m(x - x1) ➔ y - √3 = 2(x - π/6) ➔ y = 2x - (π/3) + √3.'
    },
    tipsBelajar: 'Ingat rumus identitas sudut rangkap: 2 sin(A) cos(A) = sin(2A). Identitas ini sangat sering menyederhanakan turunan fungsi trigonometri kuadrat.',
    formulaOrDiagram: 'Kalkulus Trigonometri: d/dx [sin(u)] = u\' · cos(u) | d/dx [cos(u)] = -u\' · sin(u) | m = f\'(x1) | y - y1 = m(x - x1)',
    glosarium: [
      { istilah: 'Aturan Rantai (Chain Rule)', arti: 'Metode penurunan fungsi komposisi dengan mengalikan turunan fungsi luar terhadap variabel perantara dengan turunan variabel perantara terhadap variabel independen.' },
      { istilah: 'Gradien Garis Singgung', arti: 'Kemiringan geometris suatu garis yang menyentuh kurva fungsi pada tepat satu titik terdekat, bernilai f\'(x1).' },
      { istilah: 'Titik Stasioner', arti: 'Titik pada kurva di mana garis singgungnya horizontal sejajar sumbu X, ditandai dengan f\'(x) = 0.' },
      { istilah: 'Radian', arti: 'Satuan standar sudut dalam analisis matematika; 180 derajat setara dengan π radian.' }
    ],
    lkpd: {
      judulAktivitas: 'Eksplorasi Gelombang Harmonik & Kecepatan Partikel Sederhana',
      alatBahan: ['Grafik Fungsi Trigonometri Desmos/GeoGebra', 'Kalkulator Ilmiah Saintifik', 'Lembar Kerja Eksplorasi Turunan'],
      langkahKerja: [
        'Diberikan persamaan simpangan gelombang partikel: y(t) = 4 sin(0.5π t) cm.',
        'Turunkan y(t) untuk menemukan fungsi kecepatan partikel v(t) = y\'(t).',
        'Tentukan kecepatan partikel pada saat t = 1 detik dan t = 2 detik.',
        'Turunkan v(t) untuk menemukan fungsi percepatan partikel a(t) = v\'(t).',
        'Buktikan bahwa percepatan partikel berbanding lurus dengan negatif simpangannya (ciri gerak harmonik sederhana).'
      ],
      pertanyaanDiskusi: [
        'Kapan partikel mencapai kecepatan maksimum? Berapakah simpangan partikel pada saat itu?',
        'Jelaskan mengapa turunan dari fungsi kosinus selalu menghasilkan nilai bertanda negatif!'
      ]
    },
    konsepKunci: [
      { title: 'Turunan Sinus', desc: 'd/dx [sin(ax + b)] = a · cos(ax + b)' },
      { title: 'Turunan Kosinus', desc: 'd/dx [cos(ax + b)] = -a · sin(ax + b)' },
      { title: 'Titik Ekstrem', desc: 'Syarat fungsi stasioner adalah turunan pertamanya bernilai nol f\'(x) = 0.' }
    ],
    quizCheck: {
      question: 'Berapakah turunan pertama dari fungsi f(x) = cos(4x - 2)?',
      options: ['-4 sin(4x - 2)', '4 sin(4x - 2)', '-sin(4x - 2)', '4 cos(4x - 2)'],
      correctIndex: 0,
      explanation: 'Turunan cos(u) adalah -sin(u) dikalikan turunan dari (4x - 2) yaitu 4. Jadi hasilnya -4 sin(4x - 2).'
    }
  },

  'Kimia Analitik': {
    id: 'modul_kimia',
    subject: 'Kimia Analitik',
    title: 'Titrasi Asam Basa & Penentuan Titik Ekuivalen Stoikiometri',
    grade: 'Kelas XI SMA MIPA (Fase F)',
    phase: 'Fase F (Kurikulum Merdeka SMA)',
    author: 'Drs. Bambang Sudarsono, M.Si',
    duration: '2 JP Praktikum Lab Virtual',
    capaianPembelajaran: 'Peserta didik mampu merancang prosedur titrasi volumetri asam-basa, melakukan penentuan konsentrasi larutan analit melalui perhitungan stoikiometri netralisasi, serta menganalisis trayek perubahan warna indikator dan kurva titrasi pH.',
    tujuanPembelajaran: [
      'Menjelaskan prinsip reaksi netralisasi antara ion H+ (dari asam) dan ion OH- (dari basa) membentuk H2O.',
      'Mengoperasikan perhitungan stoikiometri titrasi asam-basa menggunakan persamaan Va · Ma · na = Vb · Mb · nb.',
      'Membedakan secara konseptual antara Titik Ekuivalen (teoretis stoikiometris) dan Titik Akhir Titrasi (visual eksperimental).',
      'Memilih indikator asam-basa yang tepat (misal: Fenolftalein PP vs Metil Merah) berdasarkan bentuk kurva titrasi.'
    ],
    materiPokok: 'Titrasi asam-basa (asidimetri-alkalimetri) adalah teknik analisis kuantitatif volumetrik untuk menentukan konsentrasi zat dalam larutan yang belum diketahui (analit) dengan mereaksikannya secara bertahap menggunakan larutan yang konsentrasinya telah diketahui secara pasti (titran) hingga mencapai kesetaraan stoikiometri tepat.',
    materiLengkap: 'Reaksi netralisasi asam-basa melibatkan transfer proton H+ dari asam ke basa. Pada titrasi asam kuat (HCl) dengan basa kuat (NaOH), produk yang dihasilkan adalah garam netral (NaCl) dan air, dengan titik ekuivalen berada tepat pada pH 7.0. Sebaliknya, pada titrasi asam lemah (CH3COOH) dengan basa kuat (NaOH), titik ekuivalen bergeser ke daerah basa (pH > 7) akibat terjadinya hidrolisis anion asetat (CH3COO-) yang menghasilkan ion hidroksida di dalam larutan.',
    subBabMateri: [
      {
        judul: '1. Prinsip Netralisasi & Persamaan Volumetri',
        isi: 'Persamaan titrasi asam-basa didasarkan pada kesetaraan mol ekuivalen: mol H+ = mol OH-. Secara matematis dirumuskan: Va · Ma · na = Vb · Mb · nb, dengan Va dan Vb berturut-turut adalah volume asam dan basa, Ma dan Mb adalah molaritas (konsentrasi) larutan, sedangkan na dan nb adalah valensi asam (jumlah H+ per molekul) dan valensi basa (jumlah OH- per molekul).',
        poinPenting: [
          'Asam bervalensi 1 (monoprotik): HCl, HNO3, CH3COOH (na = 1).',
          'Asam bervalensi 2 (diprotik): H2SO4, H2C2O4 (na = 2).',
          'Basa bervalensi 1: NaOH, KOH (nb = 1); Basa bervalensi 2: Ca(OH)2, Ba(OH)2 (nb = 2).'
        ],
        contohAplikasi: 'Penentuan kadar asam asetat pada cuka dapur kemasan komersial melalui standarisasi menggunakan larutan baku NaOH 0.1 M.'
      },
      {
        judul: '2. Titik Ekuivalen vs Titik Akhir Titrasi',
        isi: 'Siswa wajib memahami dikotomi krusial dalam analisis kimia kuantitatif: (1) Titik Ekuivalen: Kondisi ideal di mana mol asam dan basa tepat bereaksi habis secara stoikiometris (hanya ada garam dan air). Titik ini tidak tampak kasat mata tanpa instrumen pH meter; (2) Titik Akhir Titrasi: Kondisi fisik di mana titrasi dihentikan karena indikator menunjukkan perubahan warna yang stabil (misalnya fenolftalein berubah dari bening menjadi merah muda lembut seulas). Selisih antara kedua titik ini disebut kesalahan titrasi (titration error).',
        poinPenting: [
          'Titrasi yang akurat memiliki titik akhir yang sedekat mungkin dengan titik ekuivalen.',
          'Pembacaan skala meniskus buret wajib sejajar dengan garis mata (meniskus bawah untuk larutan jernih).'
        ]
      },
      {
        judul: '3. Kurva Titrasi & Pemilihan Indikator pH',
        isi: 'Kurva titrasi adalah grafik perubahan pH larutan analit terhadap volume titran yang ditambahkan. Pemilihan indikator harus memiliki trayek pH yang berada pada rentang lonjakan curam kurva titrasi: (a) Titrasi Asam Kuat - Basa Kuat: Lonjakan pH berkisar antara 4 - 10 (indikator Fenolftalein atau Bromtimol Biru cocok); (b) Titrasi Asam Lemah - Basa Kuat: Lonjakan pH berkisar antara 7 - 11 (indikator Fenolftalein sangat ideal, trayek pH 8.2 - 10.0); (c) Titrasi Basa Lemah - Asam Kuat: Lonjakan pH berkisar antara 3 - 7 (indikator Metil Merah ideal, trayek pH 4.4 - 6.2).',
        poinPenting: [
          'Indikator Fenolftalein (PP): Bening pada pH < 8.2, Merah Muda Lembayung pada pH > 8.2.',
          'Indikator Metil Merah: Merah pada pH < 4.4, Kuning pada pH > 6.2.'
        ]
      }
    ],
    rangkumanMateri: [
      'Titrasi adalah analisis kuantitatif volumetri berdasarkan kesetaraan mol asam dan basa: Va · Ma · na = Vb · Mb · nb.',
      'Titik ekuivalen adalah kondisi stoikiometris mol H+ = mol OH-. Titik akhir titrasi adalah perubahan warna indikator.',
      'Titrasi asam kuat - basa kuat memiliki titik ekuivalen pada pH = 7.0.',
      'Indikator fenolftalein dipilih untuk titrasi asam cuka dengan NaOH karena trayek perubahannya (8.2 - 10.0) tepat melintasi titik ekuivalen basa akibat hidrolisis garam.'
    ],
    contohKasus: {
      pertanyaan: 'Sebanyak 25 mL larutan HCl dengan konsentrasi yang belum diketahui dititrasi dengan larutan standar NaOH 0.1 M menggunakan indikator PP. Titrasi diulang 3 kali (triplo) dengan data volume NaOH terpakai: Percobaan 1 = 20.1 mL, Percobaan 2 = 19.9 mL, Percobaan 3 = 20.0 mL. Berapakah molaritas larutan HCl tersebut?',
      pembahasan: 'Langkah 1: Hitung volume rata-rata NaOH terpakai ➔ Vb = (20.1 + 19.9 + 20.0) / 3 = 20.0 mL.\nLangkah 2: Identifikasi parameter ➔ Va = 25 mL, na = 1 (HCl), Mb = 0.1 M, nb = 1 (NaOH).\nLangkah 3: Terapkan rumus titrasi ➔ Va · Ma · na = Vb · Mb · nb ➔ 25 · Ma · 1 = 20.0 · 0.1 · 1 ➔ 25 Ma = 2.0 ➔ Ma = 2.0 / 25 = 0.08 M.\nJadi, konsentrasi larutan HCl tersebut adalah 0.08 Molar.'
    },
    tipsBelajar: 'Gunakan buret dengan keran teflon yang sudah dibilas dengan larutan titran terlebih dahulu agar tidak terjadi pengenceran yang merusak konsentrasi baku.',
    formulaOrDiagram: 'Stoikiometri Titrasi: Va · Ma · na = Vb · Mb · nb | pH = -log[H+] | pOH = -log[OH-] | pH + pOH = 14',
    glosarium: [
      { istilah: 'Titran', arti: 'Larutan baku yang konsentrasinya telah diketahui secara pasti dan diletakkan di dalam buret.' },
      { istilah: 'Analit', arti: 'Larutan sampel yang hendak dicari konsentrasinya dan diletakkan di dalam labu Erlenmeyer.' },
      { istilah: 'Titik Ekuivalen', arti: 'Kondisi teoretis di mana jumlah mol ekuivalen asam tepat sama dengan mol ekuivalen basa.' },
      { istilah: 'Fenolftalein (PP)', arti: 'Indikator sintetis dengan trayek pH 8.2 - 10.0 yang tidak berwarna pada kondisi asam dan berwarna merah muda pada suasana basa.' }
    ],
    lkpd: {
      judulAktivitas: 'Simulasi Digital Penentuan Kadar Asam Cuka Komersial SMAN 25',
      alatBahan: ['Buret Digital 50 mL', 'Labu Erlenmeyer 250 mL', 'Larutan Baku NaOH 0.1 M', 'Indikator Fenolftalein 1%', 'Sampel Asam Cuka'],
      langkahKerja: [
        'Buka fitur "Lab Sains Virtual" pada aplikasi e-learning ini.',
        'Pilih opsi "Titrasi Kimia Asam Basa".',
        'Masukkan 10 mL sampel asam cuka ke dalam labu Erlenmeyer dan tambahkan 3 tetes indikator PP.',
        'Buka kran buret secara perlahan untuk mengalirkan titran NaOH 0.1 M tetes demi tetes.',
        'Amati perubahan warna larutan dari bening hingga berubah menjadi merah muda stabil.',
        'Catat volume akhir buret dan hitung molaritas serta persentase massa asam asetat.'
      ],
      pertanyaanDiskusi: [
        'Mengapa pada titrasi asam cuka lemah dengan basa kuat NaOH titik ekuivalennya berada di atas pH 7?',
        'Apa akibatnya jika indikator yang digunakan adalah metil jingga (trayek pH 3.1 - 4.4)?'
      ]
    },
    konsepKunci: [
      { title: 'Titik Ekuivalen', desc: 'Kondisi stoikiometris saat asam dan basa tepat bereaksi habis tanpa sisa (pH = 7).' },
      { title: 'Titik Akhir Titrasi', desc: 'Kondisi visual saat larutan berubah warna pertama kali karena perubahan struktur indikator.' },
      { title: 'Indikator Fenolftalein (PP)', desc: 'Trayek pH 8.2 - 10.0; bening pada suasana asam/netral dan berwarna merah muda pada suasana basa.' }
    ],
    quizCheck: {
      question: 'Jika 25 mL larutan HCl 0.1 M dititrasi dengan NaOH 0.1 M, pada volume NaOH berapakah tercapai titik ekuivalen?',
      options: ['12.5 mL', '25.0 mL', '50.0 mL', '10.0 mL'],
      correctIndex: 1,
      explanation: 'Karena konsentrasi dan valensi kedua zat sama (0.1 M, valensi 1), volume basa yang dibutuhkan tepat sama dengan volume asam, yaitu 25.0 mL.'
    },
    simType: 'titrasi_kimia'
  },

  'Fisika Peminatan': {
    id: 'modul_fisika',
    subject: 'Fisika Peminatan',
    title: 'Dinamika Gerak: Hukum II Newton & Analisis Bidang Miring Kasar',
    grade: 'Kelas XI SMA MIPA (Fase F)',
    phase: 'Fase F (Kurikulum Merdeka SMA)',
    author: 'Ir. Ahmad Zulkarnain, S.Pd',
    duration: '2 JP Praktikum & Teori',
    capaianPembelajaran: 'Peserta didik mampu menerapkan Hukum-Hukum Newton tentang gerak, menganalisis interaksi gaya pada diagram benda bebas (Free Body Diagram), serta memecahkan problem dinamika gerak translasi pada bidang miring licin dan kasar dengan akurat.',
    tujuanPembelajaran: [
      'Menguraikan vektor gaya-gaya yang bekerja pada balok di bidang miring: gaya berat (w), komponen w sin θ, komponen w cos θ, gaya normal (N), dan gaya gesek (f).',
      'Menerapkan Hukum I Newton (ΣF = 0) untuk sistem dalam kesetimbangan dan Hukum II Newton (ΣF = m · a) untuk sistem yang mengalami percepatan.',
      'Menghitung percepatan balok meluncur pada bidang miring dengan koefisien gesek statis (μs) dan kinetis (μk).',
      'Mengintegrasikan hukum dinamika dengan kinematika gerak lurus berubah beraturan (GLBB) untuk mencari kecepatan akhir dan waktu luncur.'
    ],
    materiPokok: 'Dinamika adalah cabang mekanika yang mempelajari gerak benda dengan memperhitungkan penyebabnya, yaitu gaya. Hukum II Newton menyatakan bahwa resultan gaya yang bekerja pada benda berbanding lurus dengan percepatan dan berbanding terbalik dengan massa benda (ΣF = m · a). Pada bidang miring bersudut kemiringan θ, komponen gaya berat terbagi menjadi w cos(θ) tegak lurus bidang dan w sin(θ) sejajar bidang.',
    materiLengkap: 'Kajian bidang miring merupakan salah satu aplikasi paling nyata dari prinsip pesawat sederhana dalam keteknikan sipil, otomotif, dan logistik. Ketika benda diletakkan di atas bidang miring, gaya gravitasi menarik benda lurus ke pusat bumi (w = m · g). Melalui dekomposisi vektor ke sumbu sejajar dan tegak lurus bidang, kita menemukan bahwa gaya normal yang diberikan permukaan bidang adalah N = m · g · cos(θ). Bila bidang memiliki kekasaran permukaan, gaya gesek kinetis akan menahan laju luncur balok dengan besaran fk = μk · N = μk · m · g · cos(θ).',
    subBabMateri: [
      {
        judul: '1. Diagram Benda Bebas (Free Body Diagram) pada Bidang Miring',
        isi: 'Langkah pertama dan paling penting dalam menyelesaikan masalah dinamika adalah menggambar diagram benda bebas: (1) Sumbu X didefinisikan sejajar permukaan bidang miring (arah luncur positif ke bawah); (2) Sumbu Y tegak lurus permukaan bidang miring; (3) Gaya berat w = mg diuraikan menjadi: wx = mg sin(θ) menarik ke bawah bidang, dan wy = mg cos(θ) menekan permukaan; (4) Pada sumbu Y tidak ada gerak (ΣFy = 0), sehingga Gaya Normal N = mg cos(θ).',
        poinPenting: [
          'Gaya normal BUKAN reaksi dari gaya berat mg, melainkan gaya kontak permukaan yang nilainya dipengaruhi sudut kemiringan.',
          'Semakin curam sudut θ (mendekati 90°), nilai cos(θ) semakin kecil sehingga gaya normal mengecil.',
          'Komponen gaya pendorong sejajar bidang adalah mg sin(θ).'
        ],
        contohAplikasi: 'Analisis keamanan sudut tanjakan jalan raya di kawasan pegunungan untuk mencegah truk tergelincir mundur.'
      },
      {
        judul: '2. Perumusan Percepatan & Gaya Gesek Kinetis',
        isi: 'Berdasarkan Hukum II Newton pada sumbu X: ΣFx = m · a ➔ wx - fk = m · a ➔ mg sin(θ) - (μk · N) = m · a. Mengingat N = mg cos(θ), persamaan menjadi: mg sin(θ) - μk · mg cos(θ) = m · a. Massa m pada kedua ruas dapat disederhanakan (dibagi habis), sehingga percepatan luncur balok murni ditentukan oleh gravitasi, sudut, dan koefisien gesek: a = g · (sin(θ) - μk · cos(θ)).',
        poinPenting: [
          'Percepatan luncur balok TIDAK dipengaruhi oleh massa balok m (balok 1 kg dan 100 kg meluncur dengan percepatan yang sama jika koefisien geseknya identik).',
          'Syarat balok meluncur adalah komponen penggerak lebih besar dari gesek statis maksimum: tan(θ) > μs.',
          'Bila bidang licin sempurna (μk = 0), maka percepatan balok adalah a = g · sin(θ).'
        ]
      },
      {
        judul: '3. Integrasi Dinamika dengan GLBB (Kecepatan & Waktu)',
        isi: 'Setelah percepatan a ditemukan, kita dapat menentukan parameter kinematika menggunakan rumus GLBB: (1) Kecepatan akhir setelah meluncur sejauh lintasan s dari keadaan diam (v0 = 0): vt² = 2 · a · s ➔ vt = √(2 · a · s); (2) Waktu tempuh meluncur sepanjang lintasan s: s = 0.5 · a · t² ➔ t = √(2s / a).',
        poinPenting: [
          'Kecepatan akhir bertambah besar seiring bertambahnya sudut kemiringan dan berkurangnya koefisien gesek.'
        ]
      }
    ],
    rangkumanMateri: [
      'Gaya normal pada bidang miring bersudut θ adalah N = m · g · cos(θ).',
      'Gaya pendorong sejajar bidang miring adalah wx = m · g · sin(θ).',
      'Gaya gesek kinetis yang menahan gerak adalah fk = μk · N = μk · m · g · cos(θ).',
      'Percepatan balok meluncur adalah a = g · (sin(θ) - μk · cos(θ)), yang independen terhadap massa balok.',
      'Benda akan mulai bergerak jika tan(θ) > μs.'
    ],
    contohKasus: {
      pertanyaan: 'Sebuah balok kayu bermassa m = 5 kg diletakkan pada bidang miring dengan sudut kemiringan θ = 37° (sin 37° = 0.6, cos 37° = 0.8). Jika koefisien gesek kinetis antara balok dan bidang adalah μk = 0.25 dan percepatan gravitasi g = 10 m/s², tentukan: (a) Gaya normal, (b) Gaya gesek kinetis, dan (c) Percepatan balok meluncur!',
      pembahasan: 'Diketahui: m = 5 kg, θ = 37°, μk = 0.25, g = 10 m/s².\n(a) Gaya Normal N: N = m · g · cos(37°) = 5 · 10 · 0.8 = 40 Newton.\n(b) Gaya Gesek Kinetis fk: fk = μk · N = 0.25 · 40 = 10 Newton.\n(c) Komponen gaya penarik sejajar bidang wx: wx = m · g · sin(37°) = 5 · 10 · 0.6 = 30 Newton.\nResultan gaya ΣFx: ΣFx = wx - fk = 30 - 10 = 20 Newton.\nPercepatan a = ΣFx / m = 20 / 5 = 4 m/s².\nAtau menggunakan rumus cepat: a = g (sin θ - μk cos θ) = 10 (0.6 - 0.25 · 0.8) = 10 (0.6 - 0.2) = 10 · 0.4 = 4 m/s².'
    },
    tipsBelajar: 'Ingat segitiga istimewa sudut 37° dan 53°: sin(37°) = 0.6, cos(37°) = 0.8, sin(53°) = 0.8, cos(53°) = 0.6. Nilai ini sangat sering keluar pada ujian CBT Fisika dan UTBK SNBT.',
    formulaOrDiagram: 'Dinamika Bidang Miring: N = m · g · cos(θ) | fk = μk · N | a = g · (sin(θ) - μk · cos(θ)) | vt = √(2 · a · s)',
    glosarium: [
      { istilah: 'Gaya Normal (N)', arti: 'Gaya sentuh kontak yang dikerjakan oleh permukaan suatu benda terhadap benda lain yang menumpu di atasnya, selalu tegak lurus bidang kontak.' },
      { istilah: 'Gaya Gesek Kinetis (fk)', arti: 'Gaya yang bekerja antara dua permukaan yang saling bersentuhan saat salah satu atau kedua benda bergerak relatif meluncur.' },
      { istilah: 'Koefisien Gesek (μ)', arti: 'Konstanta nirdimensi yang merepresentasikan tingkat kekasaran mikroskopis interaksi antara dua permukaan bahan.' },
      { istilah: 'Diagram Benda Bebas', arti: 'Representasi grafis sistematis yang mengisolasi satu benda dan menggambarkan semua vektor gaya eksternal yang bekerja padanya.' }
    ],
    lkpd: {
      judulAktivitas: 'Investigasi Gerak Luncur Balok pada Bidang Miring Interaktif',
      alatBahan: ['Simulasi Lab Fisika Interaktif (Fitur Aplikasi SMAN 25)', 'Stopwatch Digital', 'Busur Derajat Virtual'],
      langkahKerja: [
        'Buka menu "Lab Sains Virtual" pada aplikasi ini dan pilih "Simulasi Fisika Newton".',
        'Atur sudut kemiringan bidang θ pada posisi 30°.',
        'Atur koefisien gesek kinetis μk = 0.20 dan massa balok m = 2.0 kg.',
        'Tekan tombol "Mulai Luncur" dan amati grafik perpindahan terhadap waktu.',
        'Catat waktu tempuh balok untuk mencapai dasar bidang sepanjang s = 5 meter.',
        'Ubah massa balok menjadi 10.0 kg tanpa mengubah sudut dan koefisien gesek, lalu amati apakah waktu tempuhnya berubah!'
      ],
      pertanyaanDiskusi: [
        'Mengapa perubahan massa balok tidak mempengaruhi percepatan luncur balok pada bidang miring bergesekan?',
        'Berapakah sudut kemiringan minimum agar balok mulai meluncur jika diketahui koefisien gesek statis μs = 0.577?'
      ]
    },
    konsepKunci: [
      { title: 'Gaya Normal (N)', desc: 'Gaya tegak lurus permukaan bidang: N = m · g · cos(θ).' },
      { title: 'Gaya Gesek Kinetis (fk)', desc: 'Gaya penahan gerak: fk = μk · N yang berlawanan arah dengan arah gerak benda.' },
      { title: 'Kondisi Meluncur', desc: 'Benda akan meluncur ke bawah jika tan(θ) > μs (koefisien gesek statis).' }
    ],
    quizCheck: {
      question: 'Apa yang terjadi pada gaya normal jika sudut kemiringan (θ) diperbesar mendekati 90 derajat?',
      options: ['Gaya normal bertambah besar', 'Gaya normal bernilai konstan', 'Gaya normal semakin mengecil mendekati nol', 'Gaya normal bernilai negatif'],
      correctIndex: 2,
      explanation: 'Karena N = m · g · cos(θ), saat θ membesar menuju 90°, nilai cos(θ) mengecil menuju 0 sehingga gaya normal semakin kecil mendekati nol.'
    },
    simType: 'fisika_newton'
  },

  'Biologi Sel': {
    id: 'modul_biologi',
    subject: 'Biologi Sel',
    title: 'Metabolisme Seluler, Bioenergetika Enzim & Pola Pewarisan Sifat Mendel',
    grade: 'Kelas XI SMA MIPA (Fase F)',
    phase: 'Fase F (Kurikulum Merdeka SMA)',
    author: 'Ibu Endang Suryani, M.Si',
    duration: '3 JP × 45 Menit',
    capaianPembelajaran: 'Peserta didik mampu memahami mekanisme transformasi energi dalam sel melalui katabolisme (respirasi aerob), mengidentifikasi faktor regulasi kerja enzim, serta meramalkan rasio genotipe dan fenotipe pada pewarisan sifat hukum Mendel.',
    tujuanPembelajaran: [
      'Membedakan peran enzim sebagai biokatalisator dan membedakan mekanisme inhibitor kompetitif vs non-kompetitif.',
      'Merinci 4 tahapan respirasi aerob: Glikolisis, Dekarboksilasi Oksidatif, Siklus Krebs, dan Rantai Transpor Elektron.',
      'Menghitung neraca perolehan ATP total dari pemecahan satu molekul glukosa secara aerobik (36-38 ATP).',
      'Menerapkan Hukum I Mendel (Segregasi Bebas) dan Hukum II Mendel (Asortasi Bebas) pada persilangan monohibrid dan dihibrid.'
    ],
    materiPokok: 'Metabolisme adalah seluruh rangkaian reaksi biokimia yang berlangsung di dalam sel organisme hidup. Terdiri dari katabolisme (pemecahan senyawa organik kompleks menjadi molekul sederhana yang melepaskan energi ATP) dan anabolisme (sintesis makromolekul organik yang memerlukan energi). Reaksi ini dikatalisis oleh enzim yang menurunkan energi aktivasi.',
    materiLengkap: 'Pada respirasi seluler aerob, glukosa (C6H12O6) dioksidasi secara bertahap dengan oksigen sebagai akseptor elektron terakhir untuk membentuk CO2, H2O, dan energi kimia dalam bentuk Adenosin Trifosfat (ATP). Dalam genetika, hukum Mendel menjelaskan bagaimana faktor penentu sifat (gen) yang terletak pada kromosom ditransmisikan secara konsisten dari generasi tetua (parental) ke keturunan (filial) melalui pembentukan gamet meiosis.',
    subBabMateri: [
      {
        judul: '1. Struktur Enzim & Mekanisme Kerja Biokatalisator',
        isi: 'Enzim adalah protein katalitik yang mempercepat laju reaksi biokimia tanpa ikut habis bereaksi. Bagian protein enzim disebut apoenzim, sedangkan bagian non-protein disebut gugus prostetik (koenzim organik seperti NADH/FADH atau kofaktor ion logam anorganik seperti Mg²⁺/Fe²⁺). Enzim bekerja dengan menurunkan energi aktivasi reaksi. Teori interaksi substrat: (a) Lock and Key (kunci dan gembok) - sisi aktif kaku; (b) Induced Fit (induksi pas) - sisi aktif fleksibel menyesuaikan bentuk substrat.',
        poinPenting: [
          'Inhibitor Kompetitif: Molekul pesaing yang meniru bentuk substrat dan mengikat sisi aktif enzim secara langsung.',
          'Inhibitor Non-Kompetitif: Mengikat sisi alosterik enzim sehingga merusak konformasi sisi aktif enzim.',
          'Faktor kerja enzim: Suhu optimum (37-40°C), pH optimum, konsentrasi enzim, dan konsentrasi substrat.'
        ],
        contohAplikasi: 'Aplikasi enzim protease dan amilase dalam industri detergen pembersih noda biologis ramah lingkungan.'
      },
      {
        judul: '2. Empat Tahapan Respirasi Aerobik Glukosa',
        isi: 'Pemecahan sempurna 1 molekul glukosa (6C) terjadi melalui 4 tahapan: (1) Glikolisis: Berlangsung di sitoplasma tanpa oksigen, memecah glukosa menjadi 2 Asam Piruvat (3C), menghasilkan 2 ATP dan 2 NADH; (2) Dekarboksilasi Oksidatif: Berlangsung di matriks mitokondria, mengubah 2 Asam Piruvat menjadi 2 Asetil Koenzim A (2C), menghasilkan 2 CO2 dan 2 NADH; (3) Siklus Krebs (Asam Sitrat): Berlangsung di matriks mitokondria, memproses 2 Asetil Ko-A menghasilkan 4 CO2, 2 ATP, 6 NADH, dan 2 FADH2; (4) Rantai Transpor Elektron (Fosforilasi Oksidatif): Berlangsung di krista membran dalam mitokondria. 10 NADH dikonversi menjadi 30 ATP (1 NADH = 3 ATP) dan 2 FADH2 dikonversi menjadi 4 ATP (1 FADH2 = 2 ATP). Oksigen bertindak sebagai penangkap elektron dan proton terakhir membentuk H2O.',
        poinPenting: [
          'Total perolehan energi: 2 ATP (Glikolisis) + 2 ATP (Siklus Krebs) + 32-34 ATP (Transpor Elektron) = 36-38 ATP.',
          'Respirasi anaerob (fermentasi asam laktat / fermentasi alkohol) hanya menghasilkan net 2 ATP per molekul glukosa.'
        ]
      },
      {
        judul: '3. Pola Hereditas Mendel (Monohibrid & Dihibrid)',
        isi: 'Hukum I Mendel (Segregasi): Pada pembentukan gamet meiosis, pasangan alel berpisah secara bebas sehingga setiap gamet hanya membawa satu alel. Pada persilangan monohibrid dominan penuh heterozigot (Aa × Aa), rasio fenotipe keturunan F2 adalah 3 : 1, dan rasio genotipe 1 AA : 2 Aa : 1 aa. Hukum II Mendel (Asortasi Bebas): Pada persilangan dihibrid (dua sifat beda, misal: BbKk × BbKk), alel-alel dari lokus gen yang berbeda memisah dan berpasangan secara independen, menghasilkan rasio fenotipe klasik 9 : 3 : 3 : 1.',
        poinPenting: [
          'Rasio fenotipe dihibrid 9 : 3 : 3 : 1 (9 Dominan-Dominan, 3 Dominan-Resesif, 3 Resesif-Dominan, 1 Resesif-Resesif).',
          'Uji silang (Test Cross): Menyilangkan individu fenotipe dominan dengan genotipe resesif homozigot untuk mengetahui apakah induk homozigot atau heterozigot.'
        ]
      }
    ],
    rangkumanMateri: [
      'Enzim adalah biokatalisator protein yang menurunkan energi aktivasi reaksi tanpa mengubah kesetimbangan kimia.',
      'Respirasi aerob memproses 1 glukosa melalui 4 tahap: Glikolisis, Dekarboksilasi Oksidatif, Siklus Krebs, dan Transpor Elektron, menghasilkan 36-38 ATP.',
      'Sistem transpor elektron menghasilkan ATP paling banyak melalui mekanisme kemiosmosis gradien proton di krista mitokondria.',
      'Hukum I Mendel mengatur pemisahan alel saat gametogenesis (rasio monohibrid 3:1).',
      'Hukum II Mendel mengatur pengelompokan alel secara bebas pada dua pasang sifat (rasio dihibrid 9:3:3:1).'
    ],
    contohKasus: {
      pertanyaan: 'Tanaman ercis berbiji bulat warna kuning (BbKk, dominan) disilangkan dengan sesamanya (BbKk × BbKk). Dari 1.600 butir biji keturunan F2 yang dipanen, berapakah perkiraan jumlah biji yang memiliki fenotipe keriput warna hijau (resesif ganda)?',
      pembahasan: 'Langkah 1: Identifikasi sifat persilangan dihibrid heterozigot ganda (BbKk × BbKk).\nLangkah 2: Ingat rasio fenotipe F2 menurut Hukum II Mendel: Bulat Kuning : Bulat Hijau : Keriput Kuning : Keriput Hijau = 9 : 3 : 3 : 1 (Total perbandingan = 16 bagian).\nLangkah 3: Biji keriput hijau adalah sifat resesif ganda (bbkk) yang mewakili 1 bagian dari total 16 bagian.\nLangkah 4: Hitung jumlah biji keriput hijau: (1 / 16) × 1.600 = 100 butir biji.'
    },
    tipsBelajar: 'Untuk mengingat 4 tahap respirasi aerobik, gunakan jembatan keledai: G-D-K-T (Glikolisis di sitoplasma, Dekarboksilasi oksidatif di matriks, Krebs di matriks, Transpor elektron di krista).',
    formulaOrDiagram: 'Respirasi Aerob: C6H12O6 + 6O2 ➔ 6CO2 + 6H2O + 36-38 ATP | Rasio Fenotipe Dihibrid: 9 : 3 : 3 : 1',
    glosarium: [
      { istilah: 'Apoenzim', arti: 'Bagian protein dari enzim yang bersifat termolabil (rusak oleh pemanasan tinggi).' },
      { istilah: 'Glikolisis', arti: 'Reaksi penguraian 1 molekul glukosa menjadi 2 molekul asam piruvat di sitoplasma sel.' },
      { istilah: 'Krista Mitokondria', arti: 'Lipatan-lipatan membran dalam mitokondria tempat tersusunnya kompleks enzim transpor elektron.' },
      { istilah: 'Alel', arti: 'Bentuk alternatif dari suatu gen yang menempati lokus yang bersesuaian pada kromosom homolog.' }
    ],
    lkpd: {
      judulAktivitas: 'Eksperimen Virtual Kerja Enzim Katalase & Pengaruh pH/Suhu',
      alatBahan: ['Tabung Reaksi Virtual', 'Ekstrak Hati Ayam (Sumber Enzim Katalase)', 'Larutan Hidrogen Peroksida H2O2', 'Lidi Membara'],
      langkahKerja: [
        'Siapkan 4 tabung reaksi: Tabung A (netral pH 7), Tabung B (asam pH 3), Tabung C (basa pH 11), Tabung D (suhu didih 80°C).',
        'Tambahkan 2 mL ekstrak hati ayam ke setiap tabung reaksi.',
        'Tetesi 5 tetes larutan H2O2 dan amati kemunculan gelembung gas oksigen (O2).',
        'Uji gas yang terbentuk menggunakan lidi membara (bara api menyala membuktikan terbentuk gas O2 hasil hidrolisis 2H2O2 ➔ 2H2O + O2).'
      ],
      pertanyaanDiskusi: [
        'Mengapa pada tabung dengan suhu 80°C tidak terbentuk gelembung gas oksigen sama sekali?',
        'Pada organ tubuh manakah enzim katalase bekerja paling dominan untuk detoksifikasi racun?'
      ]
    },
    konsepKunci: [
      { title: 'Glikolisis', desc: 'Pemecahan glukosa (6C) menjadi 2 asam piruvat (3C), menghasilkan net 2 ATP dan 2 NADH di sitoplasma.' },
      { title: 'Hukum Segregasi Bebas', desc: 'Hukum I Mendel: alel berpisah secara bebas pada saat pembentukan gamet.' },
      { title: 'Inhibitor Enzim', desc: 'Zat penghambat kompetitif (berikatan di sisi aktif) vs non-kompetitif (di sisi alosterik).' }
    ],
    quizCheck: {
      question: 'Tahap respirasi aerob yang menghasilkan ATP terbanyak melalui fosforilasi oksidatif adalah...',
      options: ['Glikolisis', 'Dekarboksilasi Oksidatif', 'Siklus Krebs', 'Sistem Transpor Elektron'],
      correctIndex: 3,
      explanation: 'Sistem transpor elektron menghasilkan sekitar 32-34 ATP dari konversi NADH dan FADH2 melalui fosforilasi oksidatif kemiosmosis.'
    }
  },
  'Sosiologi': {
    id: 'modul_sosiologi',
    subject: 'Sosiologi',
    title: 'Stratifikasi Sosial & Diferensiasi Masyarakat Modern',
    grade: 'Kelas XI SMA IPS',
    phase: 'Fase F (Kurikulum Merdeka)',
    author: 'Drs. Agus Budiman, M.Pd',
    duration: '2 JP × 45 Menit',
    tujuanPembelajaran: [
      'Membedakan konsep pelapisan sosial (vertikal) dengan diferensiasi sosial (horizontal).',
      'Menganalisis faktor penyebab terjadinya stratifikasi tertutup, terbuka, dan campuran.',
      'Merancang solusi sosiologis terhadap kesenjangan sosial ekonomi di masyarakat urban.'
    ],
    materiPokok: 'Stratifikasi sosial adalah pembagian masyarakat ke dalam kelas-kelas hierarkis berdasarkan kekayaan, kekuasaan, kehormatan, dan ilmu pengetahuan. Sedangkan diferensiasi sosial mengelompokkan secara horizontal berdasarkan ras, suku, agama, dan gender tanpa tingkatan superioritas.',
    formulaOrDiagram: 'Perbedaan: [Stratifikasi: Bertingkat / Vertikal] vs [Diferensiasi: Setara / Horizontal]',
    konsepKunci: [
      { title: 'Stratifikasi Terbuka', desc: 'Sistem pelapisan sosial di mana setiap individu memiliki mobilitas sosial naik atau turun berdasarkan prestasi.' },
      { title: 'Status Ascribed vs Achieved', desc: 'Status yang didapat dari kelahiran (ascribed) versus status yang diraih melalui kerja keras (achieved).' },
      { title: 'Mobilitas Sosial', desc: 'Gerak perpindahan status sosial seseorang dalam ruang struktur sosial.' }
    ],
    quizCheck: {
      question: 'Pengelompokan masyarakat berdasarkan klan, suku bangsa, dan agama tergolong ke dalam struktur...',
      options: ['Stratifikasi sosial terbuka', 'Diferensiasi sosial horizontal', 'Hierarki feodal', 'Kasta tertutup'],
      correctIndex: 1,
      explanation: 'Suku, agama, dan klan tidak bertingkat derajatnya (tidak ada yang lebih tinggi atau rendah), sehingga merupakan diferensiasi sosial horizontal.'
    }
  },
  'Sejarah Indonesia': {
    id: 'modul_sejarah',
    subject: 'Sejarah Indonesia',
    title: 'Pergerakan Nasional, Organisasi Modern & Ikrar Sumpah Pemuda 1928',
    grade: 'Kelas XI SMA (Fase F)',
    phase: 'Fase F (Kurikulum Merdeka SMA)',
    author: 'Drs. Hendro Wibowo, M.Hum',
    duration: '2 JP × 45 Menit',
    capaianPembelajaran: 'Peserta didik mampu menganalisis keterkaitan antara Politik Etis dengan lahirnya kaum intelektual terpelajar, mengevaluasi metamorfosis strategi perjuangan dari kedaerahan bersenjata menuju pergerakan diplomasi modern berbasis organisasi, serta merefleksikan spirit persatuan Ikrar Sumpah Pemuda 1928 dalam integrasi bangsa masa kini.',
    tujuanPembelajaran: [
      'Menganalisis latar belakang implementasi Politik Etis (Edukasi, Irigasi, Emigrasi) oleh pemerintah Hindia Belanda.',
      'Membandingkan corak perjuangan organisasi modern: Budi Utomo (kultural-sosial), Sarekat Islam (ekonomi-massa), dan Indische Partij (politik radikal).',
      'Menjelaskan kronologi dan dinamika Kongres Pemuda I (1926) dan Kongres Pemuda II (27-28 Oktober 1928).',
      'Menginternalisasi nilai-nilai kebangsaan Sumpah Pemuda untuk memperkokoh persatuan di era disrupsi digital.'
    ],
    materiPokok: 'Politik Etis Belanda yang digagas oleh C.Th. van Deventer pada awal abad ke-20 melahirkan lapisan intelektual bumiputera (priyayi baru) dari sekolah-sekolah dokter Jawa (STOVIA), OSVIA, dan Rechtshogeschool. Kelompok terpelajar ini menyadari bahwa perlawanan kedaerahan bersenjata fisik selalu dipatahkan politik devide et impera. Mereka mengubah haluan menjadi diplomasi modern terorganisir dengan menggunakan surat kabar, perkumpulan formal, dan kongres nasional.',
    materiLengkap: 'Pergerakan nasional Indonesia mengalami fase evolusi yang dinamis: dimulai dari Periode Awal Perkembangan (Budi Utomo 1908), Periode Nasionalisme Politik Radikal (Sarekat Islam di bawah HOS Tjokroaminoto dan Indische Partij dengan manifesto Tiga Serangkai), Periode Bertahan akibat represi Gubernur Jenderal De Graeff pasca pemberontakan PKI 1926, hingga titik kulminasi konsensus nasional pemuda pada 28 Oktober 1928 di Gedung Indonesische Clubgebouw Kramat 106 Jakarta. Ikrar Tumpah Darah Satu, Bangsa Satu, dan Menjunjung Bahasa Persatuan Bahasa Indonesia menjadi fondasi integrasi identitas nasional yang melampaui sekat etnosentrisme kedaerahan.',
    subBabMateri: [
      {
        judul: '1. Politik Etis & Kelahiran Elit Intelektual Terpelajar',
        isi: 'Kritik tajam C.Th. van Deventer dalam artikel "Een Eereschuld" (Utang Kehormatan) pada 1899 memaksa Ratu Wilhelmina mengesahkan Trias van Deventer: Irigasi, Transmigrasi (Emigrasi), dan Edukasi. Meskipun tujuan awalnya untuk menyediakan tenaga administrasi murah bagi birokrasi kolonial, pendidikan barat membuka cakrawala pemikiran kritis bumiputera terhadap prinsip kemanusiaan, demokrasi, dan hak menentukan nasib sendiri (self-determination). Para lulusan STOVIA seperti Dr. Soetomo, dr. Wahidin Soedirohoesodo, dan dr. Tjipto Mangoenkoesoemo menjadi motor penggerak kesadaran nasional.',
        poinPenting: [
          'Edukasi memunculkan mobilitas sosial vertikal bagi kalangan non-bangsawan (kaum terpelajar modern).',
          'Lahirnya pers pergerakan berbahasa Melayu seperti "Medan Prijaji" (1907) oleh Tirto Adhi Soerjo mempercepat difusi gagasan kebangsaan.',
          'Peralihan strategi dari perlawanan fisik bersenjata yang sporadis menjadi perjuangan diplomasi berskala nusantara.'
        ],
        contohAplikasi: 'Menganalisis peran sekolah kedokteran STOVIA dalam membentuk jejaring pertemanan lintas suku yang melahirkan Budi Utomo.'
      },
      {
        judul: '2. Spektrum Ideologi Organisasi Pergerakan Nasional',
        isi: 'Organisasi pergerakan terbagi atas berbagai haluan strategis: (a) Budi Utomo (20 Mei 1908): Memusatkan perhatian pada kemajuan pendidikan dan kebudayaan Jawa-Madura, berkarakter moderat dan kooperatif; (b) Sarekat Islam (1912): Bertransformasi dari SDI Solo menjadi organisasi massa pertama dengan jutaan pengikut di bawah karisma HOS Tjokroaminoto yang memperjuangkan kemandirian ekonomi pribumi dan keadilan sosial; (c) Indische Partij (1912): Didirikan oleh Tiga Serangkai (Douwes Dekker, dr. Cipto Mangunkusumo, Suwardi Suryaningrat) sebagai partai politik pertama dengan semboyan "Indie voor Indiers", menuntut kemerdekaan mutlak tanpa kompromi.',
        poinPenting: [
          'Suwardi Suryaningrat menulis brosur satir terkenal "Als ik eens Nederlander was" (Seandainya Aku Seorang Belanda) yang mengecam perayaan 100 tahun kemerdekaan Belanda di tanah jajahan.',
          'Perhimpunan Indonesia (PI) di Belanda (1925) di bawah Mohammad Hatta mempopulerkan istilah "Indonesia" di fora internasional.',
          'Partai Nasional Indonesia (PNI, 1927) oleh Ir. Soekarno memperkenalkan doktrin Marhaenisme dan asas non-kooperasi radikal.'
        ]
      },
      {
        judul: '3. Kongres Pemuda II & Mahakarya Sumpah Pemuda 1928',
        isi: 'Dipimpin oleh Sugondo Djojopuspito (Ketua/PPPI), RM Djoko Marsaid (Wakil/Jong Java), dan Mohammad Yamin (Sekretaris/Jong Sumatranen Bond), Kongres Pemuda II berlangsung pada 27-28 Oktober 1928 di tiga lokasi berbeda di Batavia. Pada sidang penutup di Kramat 106, Mohammad Yamin merumuskan ikrar bersejarah tiga klausul persatuan, dan untuk pertama kalinya lagu "Indonesia Raya" ciptaan Wage Rudolf Supratman diperdengarkan dengan gesekan biola tanpa lirik demi menghindari pelarangan intelijen kolonial (PID).',
        poinPenting: [
          'Klausul 1: Mengaku bertumpah darah yang satu, tanah Indonesia.',
          'Klausul 2: Mengaku berbangsa yang satu, bangsa Indonesia.',
          'Klausul 3: Menjunjung bahasa persatuan, bahasa Indonesia (bukan bahasa mayoritas, melainkan bahasa lingua franca yang egalitarian).',
          'Penetapan Bendera Merah Putih dan Lagu Kebangsaan Indonesia Raya sebagai simbol pemersatu.'
        ]
      }
    ],
    rangkumanMateri: [
      'Politik Etis melahirkan golongan terpelajar bumiputera yang merintis perjuangan berbasis organisasi modern.',
      'Budi Utomo (1908) menandai era Kebangkitan Nasional; Sarekat Islam memobilisasi massa rakyat luas; Indische Partij merintis nasionalisme politik radikal.',
      'Perhimpunan Indonesia dan PNI mematangkan konsep kedaulatan bangsa Indonesia yang merdeka dan mandiri.',
      'Sumpah Pemuda 28 Oktober 1928 meleburkan sekat kesukuan (primordialisme) menjadi satu identitas kebangsaan kolektif.'
    ],
    contohKasus: {
      pertanyaan: 'Mengapa Kongres Pemuda II pada 28 Oktober 1928 memilih Bahasa Melayu yang kemudian diikrarkan sebagai Bahasa Indonesia, ketimbang memilih Bahasa Jawa yang saat itu digunakan oleh mayoritas mutlak penduduk nusantara?',
      pembahasan: 'Pemilihan Bahasa Melayu (yang dikembangkan menjadi Bahasa Indonesia) didasari pertimbangan rasional dan egaliter: (1) Bahasa Melayu telah lama menjadi lingua franca (bahasa pergaulan antarpulau dan perdagangan di pelabuhan nusantara selama berabad-abad); (2) Bahasa Melayu memiliki struktur tata bahasa yang demokratis dan fleksibel tanpa stratifikasi tingkatan tutur kasta bahasa (seperti ngoko, madya, krama pada bahasa Jawa) sehingga memicu rasa kesetaraan antarsesama warga; (3) Mencegah kecemburuan etnis dan hegemoni kultural dari suku mayoritas, sehingga persatuan nasional dapat terwujud secara tulus.'
    },
    tipsBelajar: 'Gunakan jembatan keledai "TRIO SERANGKAI = Tiga Tokoh Indische Partij": Tjipto (dr. Cipto Mangunkusumo), Ratu Pena (Suwardi Suryaningrat / Ki Hadjar Dewantara), Indos (Douwes Dekker / Danudirja Setiabudi).',
    formulaOrDiagram: 'Dinamika Pergerakan: [Politik Etis 1901] ➔ [STOVIA / Budi Utomo 1908] ➔ [Indische Partij 1912] ➔ [Perhimpunan Indonesia 1925] ➔ [Sumpah Pemuda 1928] ➔ [Proklamasi 1945]',
    glosarium: [
      { istilah: 'Politik Etis', arti: 'Kebijakan balas budi pemerintah kolonial Belanda (van Deventer) yang mencakup edukasi, irigasi, dan transmigrasi.' },
      { istilah: 'Lingua Franca', arti: 'Bahasa pengantar atau bahasa pergaulan yang digunakan secara luas oleh kelompok-kelompok penutur bahasa ibu yang berbeda.' },
      { istilah: 'Non-Kooperatif', arti: 'Sikap politik pergerakan yang menolak segala bentuk kerja sama dengan pemerintah kolonial dan menolak duduk di Volksraad.' },
      { istilah: 'Volksraad', arti: 'Dewan Rakyat bentukan Hindia Belanda yang berfungsi sebagai lembaga penasihat parlemen kolonial semi-perwakilan.' }
    ],
    lkpd: {
      judulAktivitas: 'Analisis Komparatif Karakter Perjuangan Organisasi Pergerakan Nasional',
      alatBahan: ['Teks Asli Manifesto Perhimpunan Indonesia 1925', 'Naskah Ikrar Sumpah Pemuda 1928', 'Matriks Komparasi Sejarah'],
      langkahKerja: [
        'Bandingkan anggaran dasar Budi Utomo (1908) dengan Indische Partij (1912) dalam aspek tujuan dan corak perlawanan.',
        'Kaji artikel "Als ik eens Nederlander was" karya Suwardi Suryaningrat dan identifikasi kritik yang dilontarkan.',
        'Diskusikan relevansi ikrar "Menjunjung Bahasa Persatuan" dalam membendung pengaruh polarisasi ujaran kebencian di media sosial saat ini.',
        'Susun narasi reflektif 300 kata tentang peran generasi muda SMA dalam menjaga keutuhan NKRI.'
      ],
      pertanyaanDiskusi: [
        'Bagaimana pengaruh kemenangan Jepang atas Rusia pada tahun 1905 terhadap bangkitnya rasa percaya diri bangsa-bangsa Asia?',
        'Mengapa organisasi berbasis kedaerahan seperti Jong Java dan Jong Sumatranen Bond bersedia melebur dalam satu wadah Indonesia Muda?'
      ]
    },
    konsepKunci: [
      { title: 'Politik Etis', desc: 'Trilogi van Deventer: Irigasi, Emigrasi, dan Edukasi yang melahirkan golongan intelektual bumiputera.' },
      { title: 'Tiga Serangkai', desc: 'Pendiri Indische Partij 1912 yang memelopori nasionalisme radikal menuntut kemerdekaan tanah air.' },
      { title: 'Trilogia Sumpah Pemuda', desc: 'Ikrar kebangsaan satu tanah air, satu bangsa, dan menjunjung bahasa persatuan Indonesia.' }
    ],
    quizCheck: {
      question: 'Tokoh pergerakan nasional yang menulis artikel satir berjudul "Als ik eens Nederlander was" (Seandainya Aku Seorang Belanda) adalah...',
      options: [
        'Dr. Soetomo',
        'Suwardi Suryaningrat (Ki Hadjar Dewantara)',
        'Mohammad Hatta',
        'Tirto Adhi Soerjo'
      ],
      correctIndex: 1,
      explanation: 'Suwardi Suryaningrat (Ki Hadjar Dewantara) menulis selebaran protes tajam atas pungutan dana dari rakyat jajahan untuk perayaan kemerdekaan Belanda.'
    }
  },
  'Bahasa Inggris': {
    id: 'modul_bing',
    subject: 'Bahasa Inggris',
    title: 'Analytical Exposition Text: Academic Arguments, Hedging & Debate Rebuttals',
    grade: 'Kelas XI SMA (Fase F)',
    phase: 'Fase F (Kurikulum Merdeka SMA)',
    author: 'Mr. David Siregar, M.Ed',
    duration: '2 JP × 45 Menit',
    capaianPembelajaran: 'Students are able to critically evaluate, analyze, and synthesize arguments in complex analytical exposition texts, employ sophisticated causal connectives, nominalization, modal auxiliaries, and objective passive voice, as well as construct persuasive spoken and written academic discourse addressing 21st-century global issues.',
    tujuanPembelajaran: [
      'Deconstruct the anatomical tripartite schema of Analytical Exposition: Thesis Statement, Series of Evidential Arguments, and Reiteration/Conclusion.',
      'Employ causal connectors (consequently, therefore, as a result of, furthermore) and modal verbs (should, must, ought to) accurately.',
      'Differentiate between emotive sensationalism and empirical scientific evidence in academic reasoning.',
      'Construct a 4-paragraph analytical exposition essay proposing solutions for renewable energy or sustainable urbanization.'
    ],
    materiPokok: 'An analytical exposition text is an argumentative essay designed to persuade readers or listeners that a given issue is of paramount importance and that the author’s proposition is rationally well-founded. It evaluates a topic objectively through logical reasoning and empirically verifiable evidence rather than emotional rhetoric.',
    materiLengkap: 'In Kurikulum Merdeka Fase F, high school students are trained to produce academic-level English prose. An effective analytical exposition avoids informal personal anecdotes ("I think", "In my humble opinion") and instead adopts academic tone through nominalization (e.g., transforming "people pollute the rivers" into "river water contamination"), passive voice ("data were gathered from international climate repositories"), and epistemic hedging ("evidence suggests", "the findings imply"). This structure prepares students for international scientific writing, IELTS/TOEFL academic modules, and collegiate debate.',
    subBabMateri: [
      {
        judul: '1. Anatomical Structure of Analytical Exposition Texts',
        isi: 'An analytical exposition text strictly follows three structural components: (a) Thesis: Introduces the core phenomenon, establishes the urgency, and states the central thesis proposition alongside a roadmap of arguments; (b) Arguments (PEEL Framework): Each body paragraph opens with a Point (topic sentence), provides Explanation (theoretical rationale), corroborates with Evidence (statistical data or peer-reviewed studies), and finishes with a Link back to the primary thesis; (c) Reiteration: Restates the thesis in varied syntactic wording, synthesizes the collective weight of evidence, and delivers decisive recommendations.',
        poinPenting: [
          'The thesis statement must present an arguable claim, not merely an undeniable trivial fact.',
          'Each body paragraph must focus on exactly one distinct line of reasoning (unity of paragraph).',
          'Reiteration does NOT introduce new arguments; it reinforces the validity of the thesis already substantiated.'
        ],
        contohAplikasi: 'Drafting an argumentative essay on "The Imperative of Decarbonizing Public Transportation in Metropolitan Jakarta".'
      },
      {
        judul: '2. Lexicogrammatical Features: Connectives, Modality & Nominalization',
        isi: 'Academic rigor is established through specific grammatical mechanisms: (1) Causal and additive transitions: "In addition to", "Consequently", "Notwithstanding the aforementioned challenges", "Accordingly"; (2) Epistemic Modality: Modulating claims to avoid overgeneralization using modals like "might", "could", "is likely to" or adverbs like "predominantly", "demonstrably"; (3) Nominalization: Converting verbs and adjectives into academic noun phrases to condense information density (e.g., "The deforestation of tropical rainforests exacerbates global warming").',
        poinPenting: [
          'Temporal conjunctions (First, Next, Then) belong to procedural texts; analytical texts rely on causal and comparative logical connectors.',
          'Use the Simple Present Tense for stating universal scientific facts, empirical patterns, and timeless truths.',
          'Passive constructions depersonalize research reporting: "Solar arrays were installed" instead of "We installed solar arrays".'
        ]
      },
      {
        judul: '3. Constructing Refutations & Parliamentary Debate Rebuttals',
        isi: 'Advanced analytical argumentation addresses counter-arguments through the "Even If" rebuttal technique: (1) Acknowledge the opposing contention ("While critics argue that nuclear energy entails radioactive hazard..."); (2) Pivot with contrastive markers ("...nevertheless, modern fourth-generation thorium reactors incorporate fail-safe passive cooling mechanisms"); (3) Demonstrate proportionality ("...thereby rendering the probabilistic risk negligible compared to coal-fired emissions").',
        poinPenting: [
          'Direct attack on empirical evidence: challenge sample sizes, temporal relevance, or methodological biases.',
          'Value comparison: proving that long-term ecological preservation supersedes short-term capital expenditures.'
        ]
      }
    ],
    rangkumanMateri: [
      'Analytical Exposition persuades the audience of the critical significance of a thesis through rational inquiry.',
      'Tripartite structure: Thesis (Proposition) ➔ Arguments (PEEL paragraphs with data) ➔ Reiteration (Decisive synthesis).',
      'Grammatical hallmarks: Simple Present Tense, causal conjunctions, academic nominalization, and objective third-person perspective.',
      'Mastery of this genre equips students with formal academic discourse for national examinations, collegiate research, and global competitive debate.'
    ],
    contohKasus: {
      pertanyaan: 'Analyze the following paragraph: "Urban vertical farming represents an imperative trajectory for megacities facing arable land scarcity. Recent agronomical data from IPB University indicate that indoor hydroponic modules utilize 90% less water and yield five times more biomass per square meter than conventional soil cultivation. Consequently, allocating municipal subsidies toward rooftop greenhouses will demonstrably bolster local food security." Identify the structural role and grammatical devices used in this text!',
      pembahasan: 'Structural Role: This paragraph functions as a classic Body Argument utilizing the PEEL formula.\n- Point: "Urban vertical farming represents an imperative trajectory..." (Clear topic sentence claim).\n- Explanation & Evidence: "Recent agronomical data from IPB University indicate that indoor hydroponic modules utilize 90% less water..." (Empirical statistical evidence citing a reputable scientific institution).\n- Link & Conclusion: "Consequently, allocating municipal subsidies... will demonstrably bolster local food security" (Causal transition "Consequently" coupled with epistemic modality adverb "demonstrably" connecting evidence to policy recommendation).'
    },
    tipsBelajar: 'Master the PEEL method (Point, Explanation, Evidence, Link) for every argumentative paragraph you write to guarantee full marks in academic essay grading.',
    formulaOrDiagram: 'Analytical Structure: [Thesis + Preview] ➔ [Arg 1: PEEL + Data] ➔ [Arg 2: PEEL + Case Study] ➔ [Rebuttal of Counterclaim] ➔ [Reiteration & Synthesis]',
    glosarium: [
      { istilah: 'Nominalization', arti: 'The linguistic process of converting verbs or adjectives into abstract nouns to enhance academic formality and conciseness.' },
      { istilah: 'Epistemic Modality', arti: 'Grammatical devices (such as might, presumably, appears to) used to indicate the degree of certainty or caution of a claim.' },
      { istilah: 'PEEL Framework', arti: 'Paragraph structure mnemonic standing for Point, Explanation, Evidence, and Link back to thesis.' },
      { istilah: 'Lingua Franca', arti: 'A globally shared bridge language adopted for communication among persons whose mother tongues differ.' }
    ],
    lkpd: {
      judulAktivitas: 'Academic Essay Drafting: Clean Energy Transition in Indonesia',
      alatBahan: ['Statistical Climate Briefing Paper', 'PEEL Essay Graphic Organizer', 'Peer-Review Rubric Sheet'],
      langkahKerja: [
        'Formulate a precise thesis statement taking a stance on Geothermal vs Solar PV expansion in Java-Bali grid.',
        'Outline two substantive arguments, ensuring each incorporates at least one quantitative datum.',
        'Formulate an explicit counter-argument acknowledgment and refute it using the contrastive connector "Nevertheless".',
        'Compose the reiteration paragraph synthesizing your main points without verbatim repetition.',
        'Underline all causal connectives and passive voice constructions in your finished essay.'
      ],
      pertanyaanDiskusi: [
        'Why does avoiding the first-person pronoun ("I") heighten the persuasive authority of an academic essay?',
        'How does the PEEL framework safeguard an author from committing non-sequitur fallacies?'
      ]
    },
    konsepKunci: [
      { title: 'Tripartite Architecture', desc: 'Thesis statement ➔ Series of evidence-based arguments ➔ Decisive reiteration.' },
      { title: 'PEEL Paragraph Strategy', desc: 'Point (topic sentence), Explanation, Evidence (empirical statistics), and Link back to thesis.' },
      { title: 'Academic Nominalization', desc: 'Transforming verbs into nouns to create dense, formal scientific discourse.' }
    ],
    quizCheck: {
      question: 'Which paragraph in an analytical exposition text serves to synthesize the evidenced arguments and decisively reaffirm the original thesis?',
      options: ['Complication', 'Reorientation', 'Reiteration', 'Resolution'],
      correctIndex: 2,
      explanation: 'Reiteration serves as the concluding paragraph that reaffirms the primary thesis statement based on the cumulative weight of arguments presented.'
    }
  },
  'Pendidikan Agama & Budi Pekerti': {
    id: 'modul_agama',
    subject: 'Pendidikan Agama & Budi Pekerti',
    title: 'Fiqih Muamalah Kontemporer, Toleransi & Akhlak Mahmudah',
    grade: 'Kelas XI SMA (Fase F)',
    phase: 'Fase F (Kurikulum Merdeka SMA)',
    author: 'Ust. H. Syarifuddin, M.Ag',
    duration: '3 JP × 45 Menit',
    capaianPembelajaran: 'Peserta didik mampu menganalisis prinsip-prinsip fiqih muamalah kontemporer (jual beli, syirkah, mudharabah, larangan riba, gharar, dan maisir), memahami adab bermedia sosial serta membudayakan moderasi beragama dalam kehidupan kemasyarakatan.',
    tujuanPembelajaran: [
      'Menelaah rukun dan syarat sah akad muamalah dalam transaksi ekonomi modern dan digital.',
      'Membedakan antara keuntungan perdagangan yang sah dengan riba dan spekulasi terlarang (gharar).',
      'Menerapkan prinsip wasathiyah (moderasi beragama) dalam kerukunan hidup antarumat beragama di Indonesia.',
      'Membiasakan perilaku amanah, jujur, dan adil dalam kehidupan sehari-hari.'
    ],
    materiPokok: 'Fiqih muamalah mengatur interaksi sosial dan transaksi ekonomi antarmanusia berdasarkan prinsip keadilan, kerelaan (an-taradhin), transparansi, dan kemaslahatan bersama. Transaksi diharamkan apabila mengandung unsur riba (tambahan tanpa kompensasi adil), gharar (ketidakpastian spekulatif), atau maisir (perjudian).',
    materiLengkap: 'Di era transformasi digital perbankan dan lokapasar (e-commerce), peserta didik diajak memahami keabsahan akad digital (ijab dan qabul elektronik), penggunaan dompet digital (e-wallet), dan paylater. Prinsip utama syariat adalah keterbukaan informasi spesifikasi barang dan kebebasan dari penipuan (tadlis). Selain itu, materi moderasi beragama melatih siswa untuk bersikap toleran aktif (tasamuh), saling menghormati perbedaan mazhab, dan mempererat ukhuwah wathaniyah (persaudaraan kebangsaan).',
    subBabMateri: [
      {
        judul: '1. Rukun & Asas Transaksi Ekonomi Syariah (Muamalah)',
        isi: 'Transaksi muamalah dinyatakan sah apabila memenuhi empat rukun dasar: (1) Para pihak yang berakad (Aqidain) yang berakal dan baligh; (2) Objek akad (Maqud alaih) yang halal, bermanfaat, suci, dan jelas spesifikasinya; (3) Ijab dan Qabul (Sighat) yang mencerminkan kerelaan kedua belah pihak tanpa paksaan; (4) Nilai tukar atau harga yang transparan tanpa penipuan.',
        poinPenting: [
          'Prinsip asal muamalah adalah boleh (mubah) kecuali ada dalil syar\'i yang melarangnya.',
          'Larangan Riba Nasi\'ah (bunga tempo pinjaman) dan Riba Fadhl (kelebihan pada pertukaran barang ribawi sejenis).',
          'Akad Syirkah (kemitraan modal dan kerja) dan Mudharabah (bagi hasil pengelola dan pemodal).'
        ],
        contohAplikasi: 'Analisis keabsahan transaksi pembayaran nirsentuh (QRIS) dan dompet digital berbasis akad wadi\'ah (titipan) atau qardh.'
      },
      {
        judul: '2. Larangan Riba, Gharar, dan Maisir dalam Ekonomi Modern',
        isi: 'Syariat Islam melindungi masyarakat dari eksploitasi finansial: (1) Riba: Tambahan yang dipersyaratkan dalam transaksi pinjam-meminjam tanpa imbalan riil; (2) Gharar: Transaksi yang mengandung ketidakjelasan objek (misal: menjual ikan yang masih di dalam lautan lepas); (3) Maisir: Permainan untung-untungan spekulatif di mana salah satu pihak dirugikan demi keuntungan pihak lain.',
        poinPenting: [
          'Perbedaan mendasar antara margin keuntungan jual-beli (murabahah) dengan bunga rentenir ribawi.',
          'Prinsip asuransi syariah (ta\'awun): tolong-menolong berbasis dana tabarru\'.'
        ]
      },
      {
        judul: '3. Moderasi Beragama (Wasathiyah) & Toleransi Aktif',
        isi: 'Konsep Wasathiyah menempatkan umat beragama pada posisi tengah yang adil dan berimbang, terbebas dari ekstremisme berlebihan (tatharruf). Toleransi aktif diwujudkan melalui kerja sama kemanusiaan, gotong royong merawat lingkungan, dan penghormatan tulus atas kebebasan beribadah pemeluk agama lain sesuai Pasal 29 UUD 1945.',
        poinPenting: [
          'Toleransi dalam ranah sosial muamalah, tanpa kompromi akidah ibadah mahdhah.',
          'Menolak ujaran kebencian (hate speech) dan narasi intoleran di ruang publik digital.'
        ]
      }
    ],
    rangkumanMateri: [
      'Fiqih muamalah berlandaskan prinsip kerelaan (an-taradhin), keadilan, dan kemaslahatan bersama.',
      'Tiga larangan fundamental transaksi ekonomi: Riba (bunga eksploitatif), Gharar (ketidakpastian manipulatif), dan Maisir (perjudian).',
      'Akad digital sah selama memenuhi kejelasan objek, transparansi harga, dan persetujuan sukarela.',
      'Moderasi beragama (wasathiyah) adalah kunci keharmonisan Negara Kesatuan Republik Indonesia.'
    ],
    contohKasus: {
      pertanyaan: 'Seorang pedagang online menjual pakaian dengan foto ilustrasi yang sangat berbeda jauh kualitas kainnya dari barang asli yang dikirimkan kepada pembeli tanpa penjelasan sebelumnya. Termasuk pelanggaran akad apakah tindakan ini?',
      pembahasan: 'Tindakan menyembunyikan cacat atau memalsukan spesifikasi barang termasuk pelanggaran Tadlis (penipuan) dan Gharar (ketidakpastian informasi), sehingga akad jual-beli tersebut fasad (rusak) dan pembeli memiliki hak Khiyar Aib (hak membatalkan transaksi atau meminta ganti rugi).'
    },
    tipsBelajar: 'Ingat kaidah fiqih muamalah: "Al-ashlu fil mu\'amalati al-ibahah hatta yadulla ad-dalilu \'ala tahrimiha" (Hukum asal dalam segala bentuk muamalah adalah boleh sampai ada dalil yang melarangnya).',
    formulaOrDiagram: 'Pilar Akad: [Kerelaan / An-Taradhin] + [Objek Halal & Spesifik] - [Bebas Riba & Gharar] ➔ Transaksi Barakah',
    glosarium: [
      { istilah: 'Muamalah', arti: 'Ketentuan syariat yang mengatur hubungan horizontal antarmanusia dalam aspek sosial, hukum, dan ekonomi.' },
      { istilah: 'Gharar', arti: 'Ketidakpastian, keraguan, atau spekulasi terselubung dalam transaksi yang berpotensi merugikan salah satu pihak.' },
      { istilah: 'Mudharabah', arti: 'Akad kerja sama usaha di mana pihak pertama menyediakan modal penuh (shahibul mal) dan pihak kedua menjadi pengelola (mudharib) dengan bagi hasil proporsional.' },
      { istilah: 'Wasathiyah', arti: 'Sikap moderat, seimbang, dan adil dalam beragama tanpa bersikap ekstrem kanan maupun ekstrem kiri.' }
    ],
    lkpd: {
      judulAktivitas: 'Analisis Fiqih Transaksi Dompet Digital & Skema Paylater',
      alatBahan: ['Syarat & Ketentuan Aplikasi Fintech Populer', 'Matriks Perbandingan Akad Fiqih', 'Lembar Diskusi Kasus'],
      langkahKerja: [
        'Kaji klausul syarat dan ketentuan pada salah satu fitur paylater atau e-wallet komersial.',
        'Identifikasi apakah ada biaya denda keterlambatan berbunga (indikasi riba jahiliyah).',
        'Bandingkan skema bagi hasil syariah dengan skema bunga konvensional.',
        'Rumuskan rekomendasi penggunaan teknologi finansial yang bijak dan beretika bagi pelajar.'
      ],
      pertanyaanDiskusi: [
        'Mengapa transaksi berbasis syariah mensyaratkan adanya underlying asset (aset riil yang mendasari transaksi)?',
        'Bagaimana cara mengamalkan toleransi beragama di lingkungan sekolah multikultural tanpa mengorbankan keyakinan pribadi?'
      ]
    },
    konsepKunci: [
      { title: 'Prinsip An-Taradhin', desc: 'Transaksi sah atas dasar saling rela dan sukarela tanpa paksaan atau manipulasi.' },
      { title: 'Larangan Riba', desc: 'Pengharaman bunga tempo pinjaman yang mengeksploitasi pihak peminjam.' },
      { title: 'Moderasi Wasathiyah', desc: 'Sikap toleran, adil, dan seimbang dalam mempraktikkan ajaran agama di tengah masyarakat majemuk.' }
    ],
    quizCheck: {
      question: 'Bentuk transaksi yang mengandung ketidakpastian objek atau spekulasi manipulatif dinamakan...',
      options: ['Mudharabah', 'Gharar', 'Murabahah', 'Wadi\'ah'],
      correctIndex: 1,
      explanation: 'Gharar adalah ketidakpastian atau ketidakjelasan dalam transaksi yang dilarang dalam syariat Islam karena berpotensi merugikan salah satu pihak.'
    }
  },
  'Pendidikan Pancasila': {
    id: 'modul_ppkn',
    subject: 'Pendidikan Pancasila',
    title: 'Tata Kelola Konstitusi, Hierarki Hukum & Penegakan Hak Asasi Manusia',
    grade: 'Kelas XI SMA (Fase F)',
    phase: 'Fase F (Kurikulum Merdeka SMA)',
    author: 'Ibu Siti Aminah, S.Pd',
    duration: '2 JP × 45 Menit',
    capaianPembelajaran: 'Peserta didik mampu menganalisis tata urutan perundang-undangan nasional, mengevaluasi peran Mahkamah Konstitusi dalam pengujian undang-undang (judicial review), mengidentifikasi implementasi jaminan hak asasi manusia dalam pasal 28A-28J UUD 1945, serta mempraktikkan etika kewarganegaraan digital yang taat hukum.',
    tujuanPembelajaran: [
      'Menganalisis prinsip Negara Hukum (Rechtsstaat) sesuai Pasal 1 ayat (3) UUD NRI Tahun 1945.',
      'Merinci hierarki peraturan perundang-undangan menurut UU No. 12 Tahun 2011 juncto UU No. 13 Tahun 2022.',
      'Membedakan kewenangan Mahkamah Konstitusi (MK) dan Mahkamah Agung (MA) dalam sistem peradilan yudisial.',
      'Menelaah instrumen perlindungan HAM dan mekanisme pelaporan pelanggaran hak konstitusional warga negara.'
    ],
    materiPokok: 'Indonesia secara tegas menegaskan asas Negara Hukum (Rechtsstaat), bukan negara kekuasaan (Machtsstaat). Asas legalitas mewajibkan setiap tindakan pemerintah berlandaskan hukum yang sah dan adil. Tata urutan perundangan menempatkan UUD NRI Tahun 1945 sebagai hukum dasar tertinggi (grundnorm tertulis), di mana peraturan di bawahnya tidak boleh bertentangan dengan norma konstitusi di atasnya (lex superior derogat legi inferiori).',
    materiLengkap: 'Konstitusionalisme modern mengedepankan tiga pilar utama: pembatasan kekuasaan organ negara (trias politica Montesquieu yang dimodifikasi), jaminan pemenuhan hak-hak asasi manusia, dan peradilan yang bebas serta merdeka. Mahkamah Konstitusi didirikan melalui Amandemen Ketiga UUD 1945 sebagai pengawal konstitusi (the guardian of the constitution) yang berwenang menguji keselarasan undang-undang terhadap UUD 1945, memutus sengketa kewenangan lembaga negara, memutus pembubaran partai politik, dan memutus perselisihan hasil pemilihan umum.',
    subBabMateri: [
      {
        judul: '1. Hierarki Peraturan Perundang-Undangan Nasional (UU No. 12/2011)',
        isi: 'Berdasarkan Pasal 7 ayat (1) UU No. 12 Tahun 2011, tata urutan hierarkis perundang-undangan di Indonesia adalah: (1) UUD NRI Tahun 1945; (2) Ketetapan Majelis Permusyawaratan Rakyat (TAP MPR); (3) Undang-Undang / Peraturan Pemerintah Pengganti Undang-Undang (Perppu); (4) Peraturan Pemerintah (PP); (5) Peraturan Presiden (Perpres); (6) Peraturan Daerah Provinsi (Perda Prov); (7) Peraturan Daerah Kabupaten/Kota (Perda Kab/Kota). Asas hukum yang berlaku: Lex Superior Derogat Legi Inferiori (hukum yang lebih tinggi mengesampingkan hukum yang lebih rendah).',
        poinPenting: [
          'UUD 1945 berada di puncak hierarki piramida hukum positif Republik Indonesia.',
          'Peraturan yang derajatnya lebih rendah batal demi hukum jika bertentangan dengan peraturan di atasnya.',
          'Materi muatan undang-undang mengatur hak asasi manusia, kewajiban warga negara, dan pembagian wilayah.'
        ],
        contohAplikasi: 'Menganalisis Perda Kawasan Tanpa Rokok (KTR) yang merujuk pada Undang-Undang Kesehatan dan PP Pengamanan Zat Adiktif.'
      },
      {
        judul: '2. Pengujian Yudisial: Peran Mahkamah Konstitusi & Mahkamah Agung',
        isi: 'Sistem pengujian norma hukum di Indonesia terbagi dua pintu (dual judicature): (a) Mahkamah Konstitusi (MK): Berwenang menguji Undang-Undang (UU) terhadap Undang-Undang Dasar 1945 (Judicial Review Undang-Undang). Putusan MK bersifat final dan mengikat (final and binding) sejak diucapkan; (b) Mahkamah Agung (MA): Berwenang menguji peraturan perundang-undangan di bawah Undang-Undang (seperti Peraturan Pemerintah, Perpres, Perda) terhadap Undang-Undang.',
        poinPenting: [
          'Hak Uji Materiil: Menguji apakah substansi pasal undang-undang bertentangan dengan pasal UUD 1945.',
          'Hak Uji Formil: Menguji apakah prosedur pembentukan undang-undang memenuhi tata cara resmi pembentukan peraturan.',
          'MK beranggotakan 9 Hakim Konstitusi (diajukan masing-masing 3 oleh Presiden, DPR, dan MA).'
        ]
      },
      {
        judul: '3. Jaminan Hak Asasi Manusia (Pasal 28A-28J) & Kewajiban Warga Negara',
        isi: 'Amandemen Kedua UUD 1945 memasukkan Bab XA tentang Hak Asasi Manusia. Hak-hak tersebut terbagi menjadi: (1) Non-derogable rights (hak yang tidak dapat dikurangi dalam keadaan apapun): hak untuk hidup, hak tidak disiksa, hak kemerdekaan pikiran dan hati nurani, hak beragama, hak tidak diperbudak, dan hak tidak dituntut atas dasar hukum yang berlaku surut (Pasal 28I ayat 1); (2) Derogable rights (hak yang dapat dibatasi undang-undang demi menghormati hak orang lain, ketertiban umum, dan nilai agama sesuai Pasal 28J ayat 2).',
        poinPenting: [
          'Pasal 28J ayat (2) menegaskan bahwa kebebasan berekspresi dibatasi oleh kewajiban menghormati hak asasi orang lain.',
          'Kewarganegaraan digital menuntut integritas dalam bersosial media, menolak doxxing, cyberbullying, dan manipulasi data pribadi.'
        ]
      }
    ],
    rangkumanMateri: [
      'Indonesia adalah Negara Hukum yang menjunjung supremasi hukum dan persamaan kedudukan di depan hukum (equality before the law).',
      'Hierarki perundangan menempatkan UUD 1945 di posisi tertinggi dengan asas lex superior derogat legi inferiori.',
      'MK menguji UU terhadap UUD 1945; MA menguji peraturan di bawah UU terhadap UU.',
      'Pasal 28A-28J menjamin hak asasi manusia sekaligus mewajibkan setiap individu tunduk pada pembatasan moral dan ketertiban umum.'
    ],
    contohKasus: {
      pertanyaan: 'Sebuah kelompok masyarakat sipil menilai bahwa salah satu pasal dalam Undang-Undang Ketenagakerjaan membatasi hak atas pekerjaan dan penghidupan yang layak sebagaimana diatur dalam Pasal 27 ayat (2) UUD 1945. Ke lembaga peradilan manakah kelompok masyarakat tersebut harus mengajukan permohonan pengujian norma, dan apa jenis pengujian yang diajukan?',
      pembahasan: 'Kelompok masyarakat sipil tersebut harus mengajukan permohonan ke Mahkamah Konstitusi (MK) karena norma yang diuji adalah Undang-Undang terhadap UUD 1945. Jenis pengujian yang diajukan adalah Uji Materiil (Material Judicial Review), yakni menguji keselarasan substansi materi muatan pasal Undang-Undang Ketenagakerjaan tersebut dengan hak konstitusional yang dijamin dalam Pasal 27 ayat (2) UUD 1945.'
    },
    tipsBelajar: 'Gunakan mnemonik hierarki perundangan: "U-TA-U-P-P-P-P" (UUD 45, TAP MPR, UU/Perppu, PP, Perpres, Perda Prov, Perda Kab).',
    formulaOrDiagram: 'Piramida Hukum: [UUD 1945] ➔ [TAP MPR] ➔ [UU / Perppu] ➔ [Peraturan Pemerintah] ➔ [Peraturan Presiden] ➔ [Perda Prov] ➔ [Perda Kab/Kota]',
    glosarium: [
      { istilah: 'Rechtsstaat', arti: 'Konsep negara hukum Eropa Kontinental yang mensyaratkan perlindungan HAM, pemisahan kekuasaan, dan peradilan administrasi.' },
      { istilah: 'Judicial Review', arti: 'Kewenangan yudisial untuk menguji keabsahan produk hukum perundang-undangan terhadap konstitusi yang lebih tinggi.' },
      { istilah: 'Lex Superior Derogat Legi Inferiori', arti: 'Asas hukum bahwa norma hukum yang berderajat lebih tinggi membatalkan norma hukum yang lebih rendah bila saling bertentangan.' },
      { istilah: 'Non-Derogable Rights', arti: 'Hak-hak asasi mendasar yang secara hukum internasional dan konstitusional tidak boleh dikurangi dalam kondisi darurat sekalipun.' }
    ],
    lkpd: {
      judulAktivitas: 'Simulasi Sidang Pengujian Undang-Undang (Moot Court) di Mahkamah Konstitusi',
      alatBahan: ['Naskah Perkara Uji Materiil UU ITE Pasal Kebebasan Berekspresi', 'UUD NRI Tahun 1945', 'Lembar Resume Putusan Hakim Konstitusi'],
      langkahKerja: [
        'Bagi kelas menjadi tiga kelompok: Pemohon Warga Negara, Pihak Pemerintah/DPR, dan Majelis Hakim Konstitusi (9 siswa).',
        'Pemohon menyusun permohonan legal standing dan alasan kerugian konstitusional.',
        'Pihak Pemerintah membacakan keterangan pembelaan kepentingan ketertiban umum berdasarkan Pasal 28J ayat (2).',
        'Majelis Hakim Konstitusi bermusyawarah dan membacakan amar putusan (Menolak, Mengabulkan, atau Konstitusional Bersyarat).'
      ],
      pertanyaanDiskusi: [
        'Mengapa putusan Mahkamah Konstitusi bersifat final and binding (tidak dapat diajukan banding)?',
        'Bagaimana batasan etis antara kebebasan berpendapat di media sosial dengan tindak pidana pencemaran nama baik?'
      ]
    },
    konsepKunci: [
      { title: 'Supremasi Konstitusi', desc: 'UUD 1945 sebagai hukum dasar tertinggi pengikat seluruh penyelenggara negara.' },
      { title: 'Judicial Review MK', desc: 'Kewenangan Mahkamah Konstitusi menguji konstitusionalitas undang-undang.' },
      { title: 'Pasal 28A-28J', desc: 'Piagam hak asasi manusia dan pembatasan konstitusional dalam UUD 1945.' }
    ],
    quizCheck: {
      question: 'Lembaga peradilan manakah yang berwenang menguji materiil peraturan pemerintah terhadap undang-undang?',
      options: ['Mahkamah Konstitusi', 'Mahkamah Agung', 'Komisi Yudisial', 'Dewan Ketahanan Nasional'],
      correctIndex: 1,
      explanation: 'Pengujian peraturan di bawah undang-undang (seperti PP, Perpres, Perda) terhadap undang-undang adalah kewenangan Mahkamah Agung (MA).'
    }
  },
  'PJOK': {
    id: 'modul_pjok',
    subject: 'PJOK',
    title: 'Kebugaran Jasmani: Kapasitas Kardiorespirasi VO2Max, THR & Sirkuit Latihan',
    grade: 'Kelas XI SMA (Fase F)',
    phase: 'Fase F (Kurikulum Merdeka SMA)',
    author: 'Wahyu Hidayat, S.Pd',
    duration: '2 JP Praktik Lapangan & Teori',
    capaianPembelajaran: 'Peserta didik mampu menganalisis konsep kebugaran jasmani yang terkait dengan kesehatan dan keterampilan, menghitung kapasitas aerobik VO2Max, merancang program sirkuit latihan intensitas sedang-tinggi (HIIT/Circuit Training), serta menerapkan pola makan gizi seimbang.',
    tujuanPembelajaran: [
      'Menghitung Denyut Nadi Istirahat (RHR), Denyut Nadi Maksimal (MHR), dan Target Heart Rate (THR) dengan formula Karvonen.',
      'Menganalisis 5 komponen kebugaran jasmani: daya tahan jantung-paru, kekuatan, kelenturan, kelincahan, dan komposisi tubuh.',
      'Merancang sirkuit latihan (circuit training) 6 pos dengan beban tubuh sendiri (calisthenics).',
      'Menerapkan fase pemanasan (warm-up), latihan inti, dan pendinginan (cooling down) untuk mencegah cedera otot.'
    ],
    materiPokok: 'Kebugaran jasmani (physical fitness) adalah kesanggupan dan kemampuan tubuh untuk melakukan aktivitas kerja fisik sehari-hari tanpa menimbulkan kelelahan yang berlebihan, serta masih memiliki cadangan tenaga untuk menikmati waktu luang dan keadaan darurat. Indikator utama kebugaran kardiovaskular adalah VO2Max (volume maksimal oksigen dalam mililiter yang dapat digunakan per kilogram berat badan per menit).',
    materiLengkap: 'Latihan fisik aerobik teratur meningkatkan stroke volume (volume sekuncup jantung), densitas kapiler darah pada jaringan otot rangka, dan jumlah organel mitokondria. Untuk mendapatkan adaptasi kardiorespirasi yang optimal tanpa membahayakan jantung, latihan harus berada pada zona Target Heart Rate (THR) antara 65% hingga 85% dari denyut nadi maksimal. Intensitas latihan dikontrol menggunakan metode Karvonen: THR = [(MHR - RHR) × Intensitas %] + RHR.',
    subBabMateri: [
      {
        judul: '1. Perhitungan Denyut Jantung Latihan & Formula Karvonen',
        isi: 'Langkah memantau intensitas olahraga: (1) Denyut Nadi Istirahat (Resting Heart Rate / RHR): Diukur saat bangun tidur pagi hari sebelum beraktivitas (normal remaja: 60-80 denyut per menit / bpm); (2) Maximum Heart Rate (MHR): MHR = 220 - Usia. Untuk siswa usia 17 tahun: MHR = 220 - 17 = 203 bpm; (3) Heart Rate Reserve (HRR): HRR = MHR - RHR; (4) Zona Latihan Aerobik Efektif: Latihan pada rentang intensitas 70% bertujuan membakar cadangan lemak dan memperkuat otot jantung.',
        poinPenting: [
          'Pengukuran denyut nadi dilakukan pada arteri radialis (pergelangan tangan) atau arteri karotis (leher) selama 15 detik dikalikan 4.',
          'Pemanasan wajib minimal 10 menit untuk menaikkan suhu tubuh dan viskositas cairan sinovial sendi.',
          'Pendinginan melancarkan sirkulasi balik vena dan membantu penguraian akumulasi asam laktat.'
        ],
        contohAplikasi: 'Menghitung rentang detak jantung target saat lari 12 menit di lintasan atletik.'
      },
      {
        judul: '2. Desain Program Sirkuit Latihan (Circuit Training 6 Pos)',
        isi: 'Sirkuit latihan menggabungkan latihan kekuatan dan daya tahan kardiovaskular secara berurutan: Pos 1: Push-up (kekuatan otot dada & trisep); Pos 2: Shuttle run lari bolak-balik (kelincahan); Pos 3: Plank / Sit-up (ketahanan otot inti core); Pos 4: Jumping Jacks / Skipping (kardiorespirasi); Pos 5: Bodyweight Squats (kekuatan paha quadriceps & gluteus); Pos 6: Mountain Climbers (kelenturan dinamis & daya tahan). Setiap pos dilakukan selama 45 detik, istirahat 15 detik antarbpos, diulang sebanyak 3 set putaran.',
        poinPenting: [
          'Prinsip FITT: Frequency (3-5x/minggu), Intensity (THR 70-85%), Time (30-60 menit), Type (Aerobik kombinasi kalistenik).',
          'Overload Principle: Beban dinaikkan bertahap seiring adaptasi tubuh.'
        ]
      },
      {
        judul: '3. Asupan Nutrisi Atletik & Keseimbangan Elektrolit Hidrasi',
        isi: 'Nutrisi remaja aktif memerlukan makronutrien proporsional: 55-60% karbohidrat kompleks (sumber energi glikogen), 15-20% protein berkualitas (reparasi mikro-robekan serabut otot), dan 20-25% lemak sehat. Hidrasi mutlak dijaga: minum 500 mL air 2 jam sebelum latihan, dan 150-200 mL setiap 15-20 menit latihan intensif untuk mencegah dehidrasi, kram otot, dan heat stroke.',
        poinPenting: [
          'Kehilangan 2% berat badan akibat keringat menurunkan performa aerobik hingga 15%.',
          'Minuman elektrolit diperlukan jika olahraga intensif berlangsung lebih dari 60 menit.'
        ]
      }
    ],
    rangkumanMateri: [
      'Kebugaran jasmani mencakup daya tahan jantung-paru, kekuatan otot, kelenturan, dan kelincahan.',
      'Denyut nadi maksimal: MHR = 220 - Usia. Latihan efektif berada di zona THR 65-85% MHR.',
      'Circuit training melatih seluruh sistem energi dan kelompok otot secara efisien dalam waktu singkat.',
      'Pemanasan dan pendinginan adalah protokol keselamatan mutlak untuk mencegah cedera ligamen dan otot.'
    ],
    contohKasus: {
      pertanyaan: 'Seorang siswa kelas 11 SMA berusia 17 tahun memiliki denyut nadi istirahat pagi hari RHR = 65 bpm. Jika guru olahraga menginstruksikan latihan pada intensitas 70% menggunakan formula Karvonen, berapakah target denyut nadi per menit (THR) siswa tersebut saat berolahraga?',
      pembahasan: 'Langkah 1: Hitung MHR ➔ MHR = 220 - Usia = 220 - 17 = 203 bpm.\nLangkah 2: Hitung HRR (Heart Rate Reserve) ➔ HRR = MHR - RHR = 203 - 65 = 138 bpm.\nLangkah 3: Terapkan formula Karvonen pada intensitas 70% (0.70) ➔\nTHR = (HRR × 0.70) + RHR\nTHR = (138 × 0.70) + 65 = 96.6 + 65 = 161.6 bpm (dibulatkan menjadi 162 bpm).\nJadi, siswa tersebut harus menjaga denyut nadinya di sekitar 162 detak per menit saat latihan berlangsung.'
    },
    tipsBelajar: 'Gunakan tes bicara (Talk Test): Pada zona aerobik optimal, Anda masih bisa berbicara kalimat pendek dengan teman lari tetapi tidak bisa bernyanyi.',
    formulaOrDiagram: 'Formula Karvonen: MHR = 220 - Usia | HRR = MHR - RHR | THR = (HRR × Intensitas %) + RHR | FITT = Frequency, Intensity, Time, Type',
    glosarium: [
      { istilah: 'VO2Max', arti: 'Volume maksimum konsumsi oksigen yang mampu diproses oleh tubuh per kilogram berat badan per menit pada intensitas latihan puncak.' },
      { istilah: 'Formula Karvonen', arti: 'Metode matematis akurat untuk menentukan zona denyut nadi latihan dengan memperhitungkan cadangan denyut jantung.' },
      { istilah: 'Circuit Training', arti: 'Bentuk latihan yang melibatkan serangkaian stasiun latihan berbeda yang diselesaikan secara berurutan dengan jeda singkat.' },
      { istilah: 'Asam Laktat', arti: 'Produk sampingan glikolisis anaerobik dalam sel otot yang memicu sensasi terbakar dan kelelahan sementara saat latihan intensif.' }
    ],
    lkpd: {
      judulAktivitas: 'Eksperimen Lapangan Uji Kebugaran Kardiorespirasi & Denyut Nadi',
      alatBahan: ['Stopwatch Digital', 'Peluit', 'Lintasan Lari 400 Meter', 'Lembar Monitoring Heart Rate'],
      langkahKerja: [
        'Ukur denyut nadi istirahat (RHR) selama 1 menit penuh sebelum memulai aktivitas.',
        'Lakukan pemanasan dinamis dan peregangan statis selama 10 menit.',
        'Lakukan lari joging konstan selama 12 menit mengelilingi lapangan.',
        'Segera raba arteri karotis dan catat denyut nadi selama 15 detik lalu kalikan 4.',
        'Bandingkan denyut nadi yang tercatat dengan rentang Target Heart Rate (THR) yang telah dihitung sebelumnya.',
        'Lakukan pendinginan (walking & deep breathing) selama 5 menit dan ukur laju pemulihan denyut nadi (recovery rate).'
      ],
      pertanyaanDiskusi: [
        'Mengapa atlet terlatih memiliki denyut nadi istirahat (RHR) yang jauh lebih rendah (bisa mencapai 45-50 bpm)?',
        'Bagaimana pengaruh konsumsi air putih sebelum dan sesudah latihan terhadap tekanan darah dan denyut nadi?'
      ]
    },
    konsepKunci: [
      { title: 'Zona Aerobik THR', desc: 'Rentang detak jantung 65-85% MHR untuk melatih kapasitas pembakaran lemak dan fungsi jantung.' },
      { title: 'Formula Karvonen', desc: 'THR = [(MHR - RHR) × Intensitas %] + RHR yang memasukkan faktor kebugaran basal.' },
      { title: 'Kebugaran Holistik', desc: 'Sinergi antara ketahanan kardiovaskular, kekuatan otot, fleksibilitas, dan asupan gizi seimbang.' }
    ],
    quizCheck: {
      question: 'Berapakah denyut nadi maksimal (MHR) teoretis untuk siswa SMA yang berusia 17 tahun?',
      options: ['195 bpm', '203 bpm', '220 bpm', '180 bpm'],
      correctIndex: 1,
      explanation: 'Rumus MHR = 220 - Usia. Maka untuk usia 17 tahun: 220 - 17 = 203 bpm (beats per minute).'
    }
  },
  'Pendidikan Seni & Budaya': {
    id: 'modul_seni',
    subject: 'Pendidikan Seni & Budaya',
    title: 'Apresiasi Seni Rupa Murni, Kritik Seni Formalistik & Tangga Nada Nusantara',
    grade: 'Kelas XI SMA (Fase F)',
    phase: 'Fase F (Kurikulum Merdeka SMA)',
    author: 'Ibu Maya Lestari, S.Sn',
    duration: '2 JP × 45 Menit',
    capaianPembelajaran: 'Peserta didik mampu menganalisis unsur visual dan prinsip tata rupa dalam karya seni dua dimensi/tiga dimensi, menerapkan 4 tahapan kritik seni menurut Feldman, mengeksplorasi akustika tangga nada pentatonis tradisional (Pelog dan Slendro), serta merancang pameran seni rupa sekolah.',
    tujuanPembelajaran: [
      'Menganalisis prinsip desain seni rupa: Keseimbangan (Balance), Ritme (Rhythm), Penekanan (Emphasis), Proporsi, dan Kesatuan (Unity).',
      'Mempraktikkan empat tahapan kritik seni ilmiah: Deskripsi, Analisis Formal, Interpretasi, dan Evaluasi/Penilaian.',
      'Membedakan interval laras Pelog (tujuh nada/suasana hening agung) dan laras Slendro (lima nada/suasana gembira lincah) pada gamelan.',
      'Menyusun proposal kurasi dan tata letak tata pameran seni rupa kontemporer di sekolah.'
    ],
    materiPokok: 'Seni rupa dan musik tradisional mencerminkan peradaban dan falsafah hidup bangsa. Apresiasi karya menuntut kepekaan estetis yang objektif melalui metode kritik formal. Di bidang seni musik, keunikan Nusantara tercermin pada sistem laras pentatonis yang berbeda dari skala diatonis kromatis barat, menciptakan karakteristik timbre dan harmoni mikro-interval yang adiluhung.',
    materiLengkap: 'Kritik seni menurut Edmund Burke Feldman memandu apresiasi terstruktur: (1) Deskripsi: pencatatan murni fakta visual kasat mata (garis, warna, bentuk, bahan) tanpa opini; (2) Analisis Formal: bagaimana unsur visual ditata menggunakan prinsip desain; (3) Interpretasi: penyingkapan makna simbolik dan pesan filosofis seniman; (4) Evaluasi: penetapan mutu estetis karya dibanding karya sejenis. Pada seni musik etnis, laras Slendro membagi satu oktaf menjadi 5 interval yang relatif sama besar (salendro), sedangkan Pelog memiliki interval tidak sama rata (terdapat jarak nada sempit dan lebar) yang melahirkan rasa haru dan khidmat.',
    subBabMateri: [
      {
        judul: '1. Empat Tahapan Kritik Seni Ilmiah (Metode Feldman)',
        isi: 'Kritik seni bermutu tinggi tidak sekadar menyatakan "bagus" atau "jelek", melainkan melalui 4 tahapan ilmiah: (a) Deskripsi: Mencatat data teknis judul, ukuran kanvas, medium cat, dan objek visual yang tampak; (b) Analisis Formal: Menelaah komposisi, keseimbangan simetris/asimetris, arah garis ritmik, kontras chiaroscuro gelap-terang; (c) Interpretasi: Mendeduksi tema kejiwaan, alegori sosial, atau latar belakang historis seniman; (d) Evaluasi: Memberikan penilaian komparatif terhadap orisinalitas ide dan penguasaan teknik artistik.',
        poinPenting: [
          'Tahap deskripsi wajib bebas dari interpretasi subjektif awal.',
          'Prinsip kesatuan (unity) adalah keselarasan paduan unsur sehingga karya menjadi satu kesatuan organis yang utuh.',
          'Focal point (center of interest) dicapai melalui penekanan kontras warna atau skala objek.'
        ],
        contohAplikasi: 'Menganalisis lukisan "Penangkapan Pangeran Diponegoro" karya Raden Saleh versus karya seniman Belanda Nicolaas Pieneman.'
      },
      {
        judul: '2. Akustika Musik Nusantara: Laras Pelog & Slendro',
        isi: 'Gamelan Jawa, Bali, dan Sunda menggunakan sistem nada pentatonis: (1) Laras Slendro: Terdiri dari 5 nada pokok (ji, ro, lu, ma, nem atau 1, 2, 3, 5, 6) dengan interval jarak antarnada yang relatif seragam (sekitar 240 sen). Memberikan nuansa bersemangat, lincah, gagah, dan ceria; (2) Laras Pelog: Memiliki 7 nada (1, 2, 3, 4, 5, 6, 7) namun umumnya dimainkan dalam sistem 5 nada (pathet). Memiliki variasi interval sempit (sekitar 110-150 sen) dan interval lebar (sekitar 300 sen), menghasilkan karakter suasana tenang, anggun, magis, dan sakral.',
        poinPenting: [
          'Sistem nada gamelan tidak bergantung pada patokan frekuensi mutlak A = 440 Hz barat, melainkan memiliki embat laras khas tiap perangkat gamelan.',
          'Gamelan Sekaten di Keraton Yogyakarta dan Surakarta menggunakan laras Pelog ageng untuk peringatan Maulid Nabi.'
        ]
      },
      {
        judul: '3. Tata Kelola Kurasi Pameran Seni Rupa Sekolah',
        isi: 'Penyelenggaraan pameran sekolah melatih kecakapan manajerial: pembentukan kurator (penyeleksi karya berdasarkan tema edukatif), tim artistik penata ruang (pencahayaan spot-light, panel partisi sketsel, jarak pandang mata sejajar 150 cm), katalogus buku pameran, serta pemandu pameran (docent) yang mengedukasi pengunjung.',
        poinPenting: [
          'Jalur sirkulasi pengunjung harus mengalir satu arah (one-way flow) tanpa menimbulkan penumpukan titik macet.',
          'Label karya (captions) wajib memuat nama seniman, judul, medium, ukuran, dan deskripsi singkat konsep karya.'
        ]
      }
    ],
    rangkumanMateri: [
      'Apresiasi seni ilmiah menggunakan 4 pilar Feldman: Deskripsi, Analisis Formal, Interpretasi, dan Evaluasi.',
      'Prinsip desain rupa mencakup keseimbangan, ritme, penekanan, proporsi, dan kesatuan.',
      'Sistem nada pentatonis Nusantara terbagi atas Laras Slendro (ceria, bersemangat) dan Laras Pelog (agung, khidmat).',
      'Pameran seni melatih kolaborasi manajerial, kurasi karya, dan penataan ruang estetis.'
    ],
    contohKasus: {
      pertanyaan: 'Seorang kurator seni mengamati sebuah lukisan lanskap. Ia mencatat bahwa pelukis menggunakan sapuan kuas tebal (impasto) dengan warna dominan biru kobalt dan jingga menyala yang saling bertolak belakang, serta menempatkan sebuah mercusuar besar di sepertiga bidang kanan kanvas. Termasuk dalam tahapan kritik seni manakah catatan kurator tersebut?',
      pembahasan: 'Catatan kurator tersebut mencakup dua tahapan awal: Deskripsi (mencatat fakta teknis sapuan kuas tebal/impasto dan objek mercusuar) serta Analisis Formal (menganalisis kontras komplementer antara biru kobalt dan jingga, serta penempatan komposisi mercusuar pada sepertiga bidang kanan kanvas berdasarkan kaidah rule of thirds untuk menciptakan focal point penekanan visual).'
    },
    tipsBelajar: 'Ingat tahapan kritik seni: "D-A-I-E" (Deskripsi fakta, Analisis komposisi, Interpretasi makna, Evaluasi nilai).',
    formulaOrDiagram: 'Alur Kritik Feldman: [Deskripsi: Fakta Visual] ➔ [Analisis Formal: Komposisi] ➔ [Interpretasi: Makna Simbolis] ➔ [Evaluasi: Nilai Mutu Estetis]',
    glosarium: [
      { istilah: 'Metode Feldman', arti: 'Pendekatan kritik seni empat tahap yang dikembangkan Edmund Burke Feldman untuk mengkaji karya seni secara objektif dan sistematis.' },
      { istilah: 'Laras Pelog', arti: 'Sistem tangga nada pentatonis tradisional dengan interval jarak nada tidak sama rata yang bernuansa agung, hening, dan khidmat.' },
      { istilah: 'Laras Slendro', arti: 'Sistem tangga nada pentatonis tradisional dengan interval jarak antarnada yang relatif seragam bernuansa dinamis, gembira, dan bersemangat.' },
      { istilah: 'Chiaroscuro', arti: 'Teknik penataan gradasi kontras terang-gelap yang tegas untuk menciptakan ilusi kedalaman volume trimatra pada bidang lukisan dwimatra.' }
    ],
    lkpd: {
      judulAktivitas: 'Penyusunan Lembar Kritik Seni Formalistik Lukisan Mahakarya Raden Saleh',
      alatBahan: ['Reproduksi Digital Lukisan Raden Saleh', 'Format Matriks Kritik Seni Feldman', 'Panduan Analisis Komposisi'],
      langkahKerja: [
        'Amati lukisan "Penangkapan Pangeran Diponegoro" (1857) secara seksama.',
        'Tuliskan minimal 5 objek konkret yang terlihat pada bagian deskripsi visual.',
        'Analisis prinsip keseimbangan dan kontras pencahayaan antara sosok Diponegoro dengan perwira Belanda De Kock.',
        'Rumuskan interpretasi simbolik mengenai pesan perlawanan martabat bangsa yang diselipkan Raden Saleh.',
        'Buat penilaian evaluatif mengenai signifikansi historis karya ini bagi kesadaran nasional Indonesia.'
      ],
      pertanyaanDiskusi: [
        'Mengapa ekspresi wajah perwira Belanda dalam lukisan Raden Saleh dilukiskan dengan kepala yang sedikit terlalu besar dan tampak congkak?',
        'Bagaimana keterkaitan antara interval laras Pelog dengan suasana ritual keagamaan di keraton Jawa dan pura di Bali?'
      ]
    },
    konsepKunci: [
      { title: 'Kritik Seni Feldman', desc: 'Metode objektif empat tahap: Deskripsi ➔ Analisis Formal ➔ Interpretasi ➔ Evaluasi.' },
      { title: 'Laras Pelog & Slendro', desc: 'Dua sistem skala nada pentatonis Nusantara dengan karakteristik akustik dan ekspresi emosi yang khas.' },
      { title: 'Prinsip Kesatuan (Unity)', desc: 'Keterpaduan utuh antarunsur visual garis, bidang, warna, dan tekstur dalam satu kanvas karya.' }
    ],
    quizCheck: {
      question: 'Tangga nada tradisional gamelan yang memiliki 5 nada dengan jarak interval antarnada yang relatif sama rata bernuansa ceria dan lincah adalah...',
      options: ['Laras Pelog', 'Laras Slendro', 'Tangga Nada Diatonis Minor', 'Tangga Nada Kromatis'],
      correctIndex: 1,
      explanation: 'Laras Slendro membagi satu oktaf menjadi 5 interval yang relatif sama rata sehingga menghasilkan karakter musik yang bersemangat, lincah, dan gembira.'
    }
  },
  'Bimbingan Konseling (BK)': {
    id: 'modul_bk',
    subject: 'Bimbingan Konseling (BK)',
    title: 'Perencanaan Karier Masa Depan, Peta Jalan Masuk PTN & Strategi SNBP/SNBT',
    grade: 'Kelas XI SMA (Fase F)',
    phase: 'Fase F (Kurikulum Merdeka SMA)',
    author: 'Drs. M. Taufik, M.Psi',
    duration: '1 JP × 45 Menit',
    capaianPembelajaran: 'Peserta didik mampu mendiagnosis profil minat bakat dan tipe kepribadian karier (metode RIASEC Holland), menganalisis regulasi seleksi nasional penerimaan mahasiswa baru (SNBP, SNBT, dan Jalur Mandiri PTN), serta merancang peta jalan portofolio akademik Kelas 11 untuk menembus program studi impian.',
    tujuanPembelajaran: [
      'Mengidentifikasi tipe kepribadian karier berdasarkan teori John Holland (Realistic, Investigative, Artistic, Social, Enterprising, Conventional).',
      'Menganalisis mekanisme seleksi SNBP (persentase eligible kuota sekolah, rata-rata rapor semester 1-5, dan bobot sertifikat kompetisi).',
      'Menyusun strategi persiapan menghadapi Tes Potensi Skolastik (TPS) dan Penalaran Matematika pada UTBK-SNBT.',
      'Memetakan program studi saintek (Kedokteran, Teknik Informatika, Farmasi, Teknik Elektro) sesuai daya tampung dan keketatan rasio kelulusan.'
    ],
    materiPokok: 'Pemilihan program studi perguruan tinggi di jenjang SMA Fase F merupakan keputusan strategis jangka panjang. Keputusan yang bijak mensyaratkan konvergensi antara potensi internal (minat, bakat nilai rapor, tipe kepribadian) dan realitas eksternal (kuota daya tampung kampus, keketatan persaingan, serta tren profesi masa depan di era kecerdasan buatan).',
    materiLengkap: 'Skema Seleksi Nasional Penerimaan Mahasiswa Baru (SNPMB) memiliki tiga jalur utama: (1) SNBP (Seleksi Nasional Berdasarkan Prestasi): Ditentukan oleh pemeringkatan kuota siswa eligible (SMAN 25 akreditasi A = 40% terbaik), konsistensi tren kenaikan nilai rapor seluruh mata pelajaran, mata pelajaran pendukung prodi, dan portofolio prestasi nasional/internasional; (2) SNBT (Seleksi Nasional Berdasarkan Tes): UTBK objektif yang menguji Tes Potensi Skolastik (TPS: Penalaran Umum, Kemampuan Memahami Bacaan dan Menulis, Pengetahuan dan Pemahaman Umum, Pengetahuan Kuantitatif), Literasi Bahasa Indonesia, Literasi Bahasa Inggris, dan Penalaran Matematika; (3) Seleksi Mandiri PTN.',
    subBabMateri: [
      {
        judul: '1. Pemetaan Minat Bakat Menggunakan Model RIASEC Holland',
        isi: 'Psikolog John Holland membagi preferensi kepribadian kerja menjadi 6 tipe: (R) Realistic: Menyukai kerja praktis motorik dengan alat/mesin (cocok untuk Teknik Mesin, Pertanian); (I) Investigative: Berpikir analitis, menyukai pemecahan problem abstrak sains (cocok untuk Fisika, Bioteknologi, Kedokteran, Aktuaria); (A) Artistic: Ekspresif, kreatif, non-konvensional (cocok untuk DKV, Arsitektur, Desain Produk); (S) Social: Suka menolong, mengajar, mengayomi (cocok untuk Psikologi, Pendidikan); (E) Enterprising: Persuasif, memimpin, bernegosiasi (cocok untuk Manajemen Bisnis); (C) Conventional: Rapi, teratur, mengelola data detail (cocok untuk Akuntansi, Statistika Data).',
        poinPenting: [
          'Kombinasi 3 kode teratas (misal: IRC = Investigative-Realistic-Conventional) menunjukkan profil ideal jurusan Teknik Biomedis.',
          'Pilihlah program studi berdasarkan kompetensi diri sejati, bukan semata karena desakan gengsi pergaulan sosial.'
        ],
        contohAplikasi: 'Mengisi asesmen mandiri RIASEC untuk mengonfirmasi kecocokan jurusan rumpun Sains dan Teknologi (MIPA).'
      },
      {
        judul: '2. Bedah Jalur Seleksi SNBP: Rapor, Mapel Pendukung & Prestasi',
        isi: 'Kriteria kelulusan SNBP: (a) Nilai Rata-rata Semua Mapel: Menjadi fondasi awal seleksi pemeringkatan kuota 40% eligible di SMA; (b) Nilai Mapel Pendukung Kurikulum Merdeka (Kepmendikbudristek No. 345/M/2022): Untuk rumpun Kedokteran wajib tinggi pada Biologi dan/atau Kimia; rumpun Teknik wajib unggul pada Matematika Tingkat Lanjut dan/atau Fisika; rumpun Ilmu Komputer unggul pada Matematika Tingkat Lanjut; (c) Indeks Sekolah: Rekam jejak alumni SMAN 25 di kampus target dan IPK rata-rata kakak kelas; (d) Sertifikat Prestasi: OSN, O2SN, FLS2N, dan KIR tingkat provinsi/nasional terkurasi Pusat Prestasi Nasional (Puspresnas).',
        poinPenting: [
          'Hindari memilih dua prodi di dua PTN berbeda jika salah satunya bukan PTN di provinsi domisili sekolah.',
          'Pastikan tidak terjadi penumpukan siswa dengan pilihan prodi dan kampus yang persis sama di dalam satu sekolah.'
        ]
      },
      {
        judul: '3. Strategi Penguasaan UTBK-SNBT: Subtes Skolastik & Literasi',
        isi: 'SNBT tidak lagi menguji Tes Kemampuan Akademik (TKA) hafalan rumus per mata pelajaran, melainkan menguji daya nalar kognitif tinggi: (1) Penalaran Umum: Logika induktif, deduktif, dan kuantitatif; (2) Pengetahuan Kuantitatif: Aljabar, geometri dasar, dan statistika probabilitas; (3) Literasi Bahasa Indonesia & Inggris: Menemukan ide pokok wacana panjang, inferensi makna tersirat, dan sintesis opini; (4) Penalaran Matematika: Memodelkan masalah kontekstual nyata ke dalam formulasi matematika.',
        poinPenting: [
          'Gunakan teknik pembagian waktu ujian: rata-rata 1 soal TPS harus diselesaikan dalam waktu kurang dari 60 detik.',
          'Rutin berlatih simulasi CBT dengan sistem penilaian Item Response Theory (IRT) di mana soal sulit berbobot skor lebih tinggi.'
        ]
      }
    ],
    rangkumanMateri: [
      'Karier masa depan dibangun dari titik temu Ikigai: minat, keahlian, kontribusi dunia, dan prospek penghidupan.',
      'Model RIASEC Holland membantu siswa mengenali kecocokan profil kepribadian dengan rumpun jurusan kuliah.',
      'SNBP menuntut konsistensi nilai rapor semester 1-5, penguatan mapel pendukung, dan sertifikat berbobot Puspresnas.',
      'SNBT menuntut penalaran kritis skolastik, kemampuan numerasi, serta literasi membaca teks ilmiah kompleks.'
    ],
    contohKasus: {
      pertanyaan: 'Rafiandra adalah siswa Kelas 11 MIPA yang memiliki minat riset eksperimental tinggi, nilai kimia 93, biologi 87, dan matematika peminatan 87. Ia bercita-cita mengembangkan obat-obatan berbasis rekayasa genetika. Program studi apakah yang paling selaras dengan profil minat, nilai mapel pendukung, dan proyeksi karier masa depannya?',
      pembahasan: 'Berdasarkan profil RIASEC, Rafiandra memiliki tipe dominan Investigative-Realistic. Minatnya pada sintesis obat dan rekayasa genetika didukung oleh nilai kimia analitik yang sangat tinggi (93) dan biologi (87). Pilihan program studi PTN yang paling selaras adalah Farmasi Klinik & Sains Obat atau Bioteknologi / Rekayasa Hayati (Bioengineering). Mapel pendukung Kurikulum Merdeka untuk prodi Farmasi adalah Kimia dan Biologi, sehingga peluang keberhasilan lolos SNBP maupun SNBT sangat optimal.'
    },
    tipsBelajar: 'Buatlah "Peta Target PTN 3-Lapis": Pilihan 1 (Dream University / Keketatan tinggi), Pilihan 2 (Realistic Choice / Sesuai skor prediksi), Pilihan 3 (Safety Net / Peluang tembus sangat besar).',
    formulaOrDiagram: 'Piramida Sukses PTN: [Eksplorasi RIASEC] ➔ [Konsistensi Rapor Smstr 1-5] ➔ [Simulasi Latihan Tryout UTBK IRT] ➔ [Lolos Prodi Impian]',
    glosarium: [
      { istilah: 'RIASEC', arti: 'Tipologi kepribadian karier John Holland yang meliputi Realistic, Investigative, Artistic, Social, Enterprising, dan Conventional.' },
      { istilah: 'SNBP', arti: 'Seleksi Nasional Berdasarkan Prestasi yang menggunakan nilai rapor dan prestasi akademik non-tes.' },
      { istilah: 'SNBT', arti: 'Seleksi Nasional Berdasarkan Tes menggunakan Ujian Tulis Berbasis Komputer (UTBK) yang menguji potensi skolastik dan literasi.' },
      { istilah: 'Item Response Theory (IRT)', arti: 'Sistem penskoran modern pada UTBK di mana bobot nilai setiap butir soal ditentukan oleh tingkat kesulitan relatif bagi seluruh peserta tes.' }
    ],
    lkpd: {
      judulAktivitas: 'Penyusunan Rencana Aksi Karier Akademik & Matriks Pilihan Jurusan PTN',
      alatBahan: ['Tabel Keketatan SNBP/SNBT 3 Tahun Terakhir', 'Lembar Kuesioner Karier Holland', 'Grafik Pelacak Tren Rapor Siswa'],
      langkahKerja: [
        'Hitung nilai rata-rata seluruh mata pelajaran dari semester 1, 2, dan 3 saat ini.',
        'Identifikasi dua nilai mata pelajaran tertinggi yang menjadi mata pelajaran pendukung program studi target.',
        'Tuliskan 3 program studi target beserta nama PTN penyelenggara dan persentase daya tampungnya.',
        'Buatlah jadwal belajar mingguan untuk memperdalam subtes Penalaran Matematika dan Literasi Skolastik UTBK.',
        'Konsultasikan matriks perencanaan karier ini dengan Guru Bimbingan Konseling (BK).'
      ],
      pertanyaanDiskusi: [
        'Mengapa rekam jejak alumni sekolah di suatu PTN memiliki pengaruh besar terhadap peluang lolos siswa di jalur SNBP?',
        'Bagaimana strategi menjaga kesehatan mental dan mengatasi fenomena burnout menjelang seleksi masuk perguruan tinggi?'
      ]
    },
    konsepKunci: [
      { title: 'Tipologi RIASEC', desc: 'Klasifikasi kecocokan kepribadian psikologis dengan lingkungan rumpun karier profesional.' },
      { title: 'Jalur Masuk SNPMB', desc: 'SNBP berbasis konsistensi rekapitulasi rapor dan SNBT berbasis tes penalaran skolastik.' },
      { title: 'Mata Pelajaran Pendukung', desc: 'Mata pelajaran khusus yang diberi bobot penilaian dominan untuk program studi tujuan di SNBP.' }
    ],
    quizCheck: {
      question: 'Manakah di bawah ini yang merupakan mata pelajaran pendukung utama dalam Kurikulum Merdeka untuk program studi Farmasi di jalur SNBP?',
      options: ['Ekonomi dan Akuntansi', 'Kimia dan Biologi', 'Geografi dan Sosiologi', 'Sejarah dan PPKn'],
      correctIndex: 1,
      explanation: 'Berdasarkan Kepmendikbudristek No. 345/M/2022 tentang Mata Pelajaran Pendukung Program Studi SNBP, rumpun Farmasi mensyaratkan keunggulan nilai pada mata pelajaran Kimia dan/atau Biologi.'
    }
  },
  'Projek Penguatan P5': {
    id: 'modul_p5',
    subject: 'Projek Penguatan Profil Pelajar Pancasila (P5)',
    title: 'Inovasi Eco-School & Pengolahan Sirkular SMAN 25 Jakarta',
    grade: 'Fase F (Kelas XI SMA MIPA)',
    phase: 'Fase F (Kurikulum Merdeka SMA)',
    author: 'Dra. Nurhayati, M.M. & Tim Fasilitator P5',
    duration: 'Alokasi 72 JP Kokurikuler (Fase F)',
    capaianPembelajaran: 'Peserta didik mampu membangun kesadaran kritis terhadap dampak emisi jejak karbon (carbon footprint) dan limbah organik di lingkungan urban Jakarta, merancang inovasi teknologi tepat guna berbasis circular economy, serta mengaktualisasikan enam dimensi Profil Pelajar Pancasila dalam aksi nyata terpadu.',
    tujuanPembelajaran: [
      'Menghitung jejak karbon (carbon footprint) dari konsumsi energi listrik dan timbulan sampah harian di sekolah.',
      'Merancang sistem komposter aerobik untuk mengolah sampah organik kantin menjadi Pupuk Organik Cair (POC).',
      'Menerapkan prinsip ekonomi sirkular (Circular Economy) untuk mereduksi sampah plastik anorganik.',
      'Mempresentasikan prototipe solusi dan menyelenggarakan Gelar Karya P5 (Exhibition Expo) di hadapan warga sekolah.'
    ],
    materiPokok: 'Projek Penguatan Profil Pelajar Pancasila (P5) merupakan pembelajaran kokurikuler kontekstual berbasis projek yang dirancang untuk menguatkan kompetensi dan karakter Profil Pelajar Pancasila. Tema "Gaya Hidup Berkelanjutan" mengajak siswa memahami bahwa tindakan keseharian memiliki dampak jangka panjang terhadap stabilitas biosfer bumi.',
    materiLengkap: 'Krisis iklim global menuntut generasi muda memahami prinsip keberlanjutan (sustainability): memenuhi kebutuhan generasi saat ini tanpa mengorbankan hak pemenuhan kebutuhan generasi masa depan. Di SMAN 25 Jakarta Barat, projek ini mengintegrasikan sains kimia/biologi dalam pembuatan biopori penyerap air hujan, instalasi mini solar cell tenaga surya, dan komposting mandiri. Peserta didik berkolaborasi lintas disiplin ilmu, melatih nalar kritis dalam memecahkan masalah riil perkotaan, dan memupuk empati ekologis.',
    subBabMateri: [
      {
        judul: '1. Audit Ekologis Sekolah: Menghitung Emisi Jejak Karbon',
        isi: 'Jejak karbon (carbon footprint) adalah jumlah total gas rumah kaca (terutama CO2 dan CH4) yang dihasilkan oleh aktivitas langsung maupun tidak langsung manusia. Siswa melakukan audit harian di sekolah: (1) Emisi listrik pendingin ruangan AC dan pencahayaan (kWh × faktor emisi 0.85 kg CO2/kWh); (2) Emisi transportasi pergi-pulang siswa dan guru (liter BBM fosil terpakai); (3) Emisi dari timbulan sampah makanan sisa kantin yang terbuang ke TPA dan membusuk secara anaerobik menghasilkan gas metana.',
        poinPenting: [
          'Gas metana (CH4) memiliki potensi pemanasan global 28 kali lebih kuat dibanding karbon dioksida (CO2).',
          'Audit energi adalah langkah ilmiah awal sebelum merumuskan intervensi kebijakan ramah lingkungan.'
        ],
        contohAplikasi: 'Menghitung penghematan energi listrik sekolah setelah kampanye mematikan AC 1 jam sebelum jam pulang sekolah.'
      },
      {
        judul: '2. Rekayasa Bioteknologi Komposting: Pupuk Organik Cair (POC)',
        isi: 'Pengolahan sampah organik kantin dilakukan dengan teknik biokonversi mikroba: (a) Bahan: Sisa sayuran kantin, kulit buah, molase tetes tebu sebagai sumber glukosa, dan bioaktivator EM4 (Effective Microorganisms) yang mengandung bakteri asam laktat Lactobacillus dan ragi Saccharomyces; (b) Proses Fermentasi Aerobik/Anaerobik: Berlangsung selama 14-21 hari dalam wadah drum tertutup yang dilengkapi kran drainase; (c) Produk: Cairan lindi disaring menjadi POC kaya nitrogen dan kalium untuk menyuburkan kebun hidroponik sekolah.',
        poinPenting: [
          'Pengadukan berkala menjaga aerasi oksigen dan mengendalikan suhu fermentasi agar bakteri pengurai tidak mati.',
          'Pemisahan sampah sejak dari sumbernya di kantin adalah kunci keberhasilan sistem daur ulang sirkular.'
        ]
      },
      {
        judul: '3. Enam Dimensi Profil Pelajar Pancasila dalam Aksi Nyata',
        isi: 'Aktivitas projek melatih 6 dimensi terpadu: (1) Beriman, Bertakwa kepada Tuhan YME dan Berakhlak Mulia: Akhlak terhadap alam semesta dengan menjaga kelestarian lingkungan ciptaan Tuhan; (2) Berkebinekaan Global: Memahami isu perubahan iklim dunia dalam kerangka kesepakatan Paris Agreement; (3) Gotong Royong: Bekerja sama dalam tim projek, berbagi peran dan saling mendukung; (4) Mandiri: Bertanggung jawab atas target kerja; (5) Bernalar Kritis: Menguji efektivitas pupuk menggunakan metode saintifik; (6) Kreatif: Merancang kemasan produk daur ulang yang bernilai ekonomis.',
        poinPenting: [
          'Penilaian P5 tidak berupa angka ujian kuantitatif, melainkan asesmen deskriptif perkembangan karakter: Mulai Berkembang (MB), Sedang Berkembang (SB), Berkembang Sesuai Harapan (BSH), dan Sangat Berkembang (SAB).'
        ]
      }
    ],
    rangkumanMateri: [
      'P5 melatih karakter Profil Pelajar Pancasila melalui pemecahan masalah nyata kontekstual.',
      'Tema Gaya Hidup Berkelanjutan memfokuskan aksi nyata pada pengurangan jejak karbon dan pengelolaan sampah.',
      'Bioteknologi komposting mengubah limbah organik kantin menjadi pupuk bernilai guna tinggi.',
      'Penilaian P5 berorientasi pada proses kolaborasi, nalar kritis, dan kepedulian terhadap ekosistem lingkungan.'
    ],
    contohKasus: {
      pertanyaan: 'Kantin sekolah menghasilkan 15 kg sisa makanan organik setiap hari. Jika sampah tersebut langsung dibuang ke tempat sampah tanpa dipilah dan berakhir di TPA, timbulan sampah tersebut akan terurai anaerobik menghasilkan gas metana berbahaya. Solusi terpadu apa yang dapat dirancang oleh tim projek P5 siswa kelas 11?',
      pembahasan: 'Tim projek P5 dapat menerapkan strategi circular economy 3 langkah: (1) Pasang tempat sampah terpilah berlabel jelas di kantin; (2) Olah 15 kg sampah sisa makanan setiap hari menggunakan digester drum komposter dengan inokulasi bioaktivator EM4 dan limbah molase; (3) Panen Pupuk Organik Cair (POC) setiap 2 minggu dan gunakan untuk menyuburkan tanaman taman sekolah serta kemas secara kreatif untuk dibagikan kepada warga sekitar saat Gelar Karya P5.'
    },
    tipsBelajar: 'Fokuskan projek pada "Small Action, Big Impact": Mulailah dari kebiasaan membawa botol minum (tumbler) sendiri ke sekolah untuk memangkas ribuan botol plastik sekali pakai per tahun.',
    formulaOrDiagram: 'Siklus Alur P5: [Temukan Isu Riil] ➔ [Bayangkan Solusi Sains] ➔ [Lakukan Aksi Nyata Komposting] ➔ [Refleksi & Gelar Karya Ekspo]',
    glosarium: [
      { istilah: 'Circular Economy', arti: 'Model produksi dan konsumsi yang memaksimalkan siklus hidup produk melalui daur ulang dan regenerasi sumber daya alam.' },
      { istilah: 'Carbon Footprint', arti: 'Total akumulasi emisi gas rumah kaca yang dilepaskan ke atmosfer akibat aktivitas manusia baik langsung maupun tak langsung.' },
      { istilah: 'Bioaktivator EM4', arti: 'Kultur mikroorganisme menguntungkan yang mempercepat proses fermentasi penguraian bahan organik tanpa menimbulkan bau busuk.' },
      { istilah: 'Asesmen Karakter P5', arti: 'Evaluasi rubrik kualitatif capaian profil pelajar Pancasila (Mulai Berkembang hingga Sangat Berkembang).' }
    ],
    lkpd: {
      judulAktivitas: 'Rancang Bangun Komposter Mini Aerobik & Uji Efektivitas Pupuk Organik',
      alatBahan: ['Ember Drum 20 Liter dengan Kran', 'Bioaktivator EM4 100 mL', 'Molase Gula Aren', 'Sampah Organik Sayuran & Buah', 'pH Meter Tanah'],
      langkahKerja: [
        'Lubangi bagian bawah drum komposter untuk memasang kran penampung cairan lindi.',
        'Cacah sampah organik menjadi ukuran 2-3 cm untuk memperluas permukaan kontak bakteri.',
        'Larutkan 2 tutup botol EM4 dan 2 sendok molase ke dalam 1 liter air bersih, diamkan 15 menit.',
        'Masukkan cacahan sampah ke dalam drum, semprotkan larutan EM4 secara merata hingga lembap.',
        'Tutup drum rapat dan simpan di tempat teduh selama 14 hari, lakukan pengadukan setiap 3 hari.',
        'Buka kran penampung untuk memanen cairan POC, ukur nilai pH cairan (ideal pH 6.5 - 7.5).'
      ],
      pertanyaanDiskusi: [
        'Mengapa sampah berminyak dan daging sebaiknya dibatasi dalam komposter skala sekolah?',
        'Bagaimana peran nilai gotong royong dalam menyukseskan pemilahan sampah di lingkungan sekolah multikultural?'
      ]
    },
    konsepKunci: [
      { title: 'Circular Economy', desc: 'Sistem tanpa limbah di mana residu organik diolah kembali menjadi nutrisi tanaman.' },
      { title: 'Enam Dimensi Pelajar', desc: 'Beriman bertakwa, berkebinekaan global, gotong royong, mandiri, bernalar kritis, dan kreatif.' },
      { title: 'Gelar Karya Ekspo', desc: 'Pentas unjuk kerja dan advokasi edukasi lingkungan kepada seluruh warga sekolah.' }
    ],
    quizCheck: {
      question: 'Bakteri apakah yang umum terkandung dalam bioaktivator pengurai kompos untuk mempercepat fermentasi sisa organik?',
      options: ['Lactobacillus sp. dan Saccharomyces', 'Escherichia coli patogen', 'Salmonella typhi', 'Streptococcus pneumoniae'],
      correctIndex: 0,
      explanation: 'Bakteri asam laktat Lactobacillus dan ragi Saccharomyces adalah mikroorganisme pengurai fermentasi utama yang aman dan efektif dalam pembuatan kompos.'
    }
  },
  'Riset Sosial & Literasi Ilmiah': {
    id: 'modul_riset',
    subject: 'Riset Sosial & Literasi Ilmiah',
    title: 'Metodologi Penelitian Sosial & Penulisan Karya Ilmiah',
    grade: 'Kelas XI SMA IPS',
    phase: 'Fase F (Kurikulum Merdeka)',
    author: 'Tim Pengajar IPS SMAN 25',
    duration: '2 JP × 45 Menit',
    tujuanPembelajaran: [
      'Menyusun rumusan masalah dan hipotesis penelitian sosial berbasis fenomena empiris generasi Z.',
      'Melakukan teknik pengumpulan data survei kuesioner dan wawancara mendalam (in-depth interview).',
      'Menulis laporan Karya Ilmiah Remaja (KIR) dengan format baku kaidah sitasi akademik.'
    ],
    materiPokok: 'Penelitian sosial membiasakan siswa bernalar ilmiah dengan memadukan pendekatan kualitatif (studi kasus mendalam) dan kuantitatif (analisis data statistik persentase). Wajib menjunjung etika kejujuran akademik dan orisinalitas riset.',
    formulaOrDiagram: 'Alur Riset: [Identifikasi Masalah] ➔ [Kajian Pustaka] ➔ [Pengumpulan Data Lapangan] ➔ [Analisis Data] ➔ [Laporan Publikasi]',
    konsepKunci: [
      { title: 'Triangulasi Data', desc: 'Pengecekan keabsahan data dari berbagai sumber wawancara, observasi, dan dokumen resmi.' },
      { title: 'Sampel Representatif', desc: 'Sebagian populasi yang mewakili karakteristik keseluruhan responden.' },
      { title: 'Etika Riset (Informed Consent)', desc: 'Persetujuan sukarela dari narasumber sebelum dilakukan wawancara atau perekaman.' }
    ],
    quizCheck: {
      question: 'Metode pengumpulan data dengan cara tanya-jawab langsung secara terstruktur kepada informan kunci disebut...',
      options: ['Observasi pasif', 'Wawancara mendalam (In-depth interview)', 'Analisis bibliometrik', 'Eksperimen laboratorium tertutup'],
      correctIndex: 1,
      explanation: 'Wawancara mendalam menggali data kualitatif secara komprehensif melalui dialog terarah dengan informan.'
    }
  },
  'Matematika Wajib': {
    id: 'modul_mat_wajib',
    subject: 'Matematika Wajib',
    title: 'Statistika Data Berkelompok, Simpangan Baku & Aturan Pencacahan Peluang',
    grade: 'Kelas XI SMA (Fase F)',
    phase: 'Fase F (Kurikulum Merdeka SMA)',
    author: 'Ibu Ratna Dewi, S.Pd',
    duration: '3 JP × 45 Menit',
    capaianPembelajaran: 'Peserta didik mampu menyajikan data berkelompok ke dalam histogram dan poligon frekuensi, menganalisis ukuran pemusatan (mean, median, modus) serta ukuran penyebaran (varians dan simpangan baku), serta memecahkan problem kombinatorika peluang majemuk.',
    tujuanPembelajaran: [
      'Menyusun tabel distribusi frekuensi data berkelompok dengan menentukan jangkauan (J), banyak kelas (aturan Sturgess), dan panjang kelas (p).',
      'Menghitung nilai Mean dengan metode titik tengah dan metode rata-rata sementara (d).',
      'Menghitung Median (Q2) dan Modus (Mo) pada data berkelompok menggunakan tepi bawah kelas.',
      'Menghitung Ragam (Varians) dan Simpangan Baku (Standard Deviation) untuk mengukur dispersi data.',
      'Menerapkan aturan perkalian, Permutasi (nPr), dan Kombinasi (nCr) pada pemilihan formasi delegasi dan penarikan sampel peluang.'
    ],
    materiPokok: 'Statistika Kurikulum Merdeka Fase F menekankan interpretasi data numerik empiris dalam pengambilan keputusan rasional. Statistika deskriptif mengolah data mentah menjadi informasi terstruktur melalui ukuran pemusatan dan penyebaran. Kaidah pencacahan dan kombinatorika menjadi pondasi teori probabilitas untuk memprediksi peluang kejadian majemuk.',
    materiLengkap: 'Pada data berkelompok, perhitungan rata-rata menggunakan rumus x̄ = Σ(fi · xi) / Σfi dengan xi adalah nilai tengah kelas. Modus dirumuskan Mo = tb + [d1 / (d1 + d2)] × p di mana d1 adalah selisih frekuensi kelas modus dengan kelas sebelumnya, dan d2 selisih dengan kelas sesudahnya. Dalam kombinatorika, aturan perkalian digunakan untuk tahapan berurutan, Permutasi (nPr = n! / (n-r)!) digunakan saat urutan susunan diperhitungkan (posisi juara/jabatan), sedangkan Kombinasi (nCr = n! / [r! (n-r)!]) digunakan saat urutan diabaikan (pemilihan tim delegasi atau kartu).',
    subBabMateri: [
      {
        judul: '1. Ukuran Pemusatan Data Berkelompok (Mean, Median, Modus)',
        isi: 'Rumus standar pemusatan: (1) Rata-rata (Mean): x̄ = [Σ(fi · xi)] / N, di mana xi = 0.5 × (Batas Bawah + Batas Atas); (2) Median: Kuartil tengah Q2 = tb + [((0.5N - Fk) / f_med)] × p, dengan tb adalah tepi bawah kelas median (Batas Bawah - 0.5), Fk frekuensi kumulatif sebelum kelas median, f_med frekuensi kelas median, dan p panjang interval kelas; (3) Modus: Mo = tb + [d1 / (d1 + d2)] × p.',
        poinPenting: [
          'Tepi bawah kelas tb = Batas Bawah - 0.5 (untuk data desimal persepuluhan dikurangi 0.05).',
          'Nilai modus selalu berada di dalam rentang interval kelas yang memiliki frekuensi tertinggi.',
          'Median membagi data terurut menjadi tepat 50% di bawah dan 50% di atas nilai median.'
        ],
        contohAplikasi: 'Menghitung rata-rata dan modus nilai ujian CBT Matematika 36 siswa Kelas 11 MIPA 1.'
      },
      {
        judul: '2. Ukuran Penyebaran: Ragam (Varians) & Simpangan Baku',
        isi: 'Simpangan baku (S) mengukur seberapa jauh sebaran data dari nilai rata-ratanya: (1) Ragam / Varians (S²): S² = [Σ fi · (xi - x̄)²] / N; (2) Simpangan Baku (S): S = √(S²). Semakin kecil nilai simpangan baku, semakin homogen dan konsisten data kelompok tersebut; sebaliknya semakin besar nilai simpangan baku, semakin heterogen variasi nilainya.',
        poinPenting: [
          'Simpangan baku memiliki satuan yang sama dengan data asli, sedangkan varians memiliki satuan kuadrat.',
          'Data yang terdistribusi normal memiliki sekitar 68% populasi berada pada rentang [x̄ - S, x̄ + S].'
        ]
      },
      {
        judul: '3. Kaidah Pencacahan: Aturan Perkalian, Permutasi & Kombinasi',
        isi: 'Perbedaan fundamental kombinatorika: (a) Aturan Perkalian: Jika peristiwa 1 terjadi dalam k1 cara, peristiwa 2 dalam k2 cara, total kemungkinan = k1 × k2; (b) Permutasi (Urutan penting: AB ≠ BA): Banyak susunan r elemen dari n elemen adalah nPr = n! / (n - r)!; (c) Kombinasi (Urutan tidak penting: AB = BA): Banyak cara memilih r elemen dari n elemen adalah nCr = n! / [r! · (n - r)!].',
        poinPenting: [
          'Notasi faktorial: n! = n × (n - 1) × (n - 2) × ... × 2 × 1. Definisi 0! = 1.',
          'Gunakan Kombinasi jika objek dikelompokkan secara kolektif (misal: memilih 3 perwakilan lomba dari 10 siswa: 10C3).',
          'Gunakan Permutasi jika ada jabatan spesifik (misal: memilih Ketua, Sekretaris, Bendahara: 10P3).'
        ]
      }
    ],
    rangkumanMateri: [
      'Ukuran pemusatan data berkelompok meliputi Mean (rata-rata terbobot), Median (nilai tengah), dan Modus (nilai paling sering muncul).',
      'Simpangan baku (S) merepresentasikan tingkat homogenitas sebaran data di sekitar nilai rata-rata.',
      'Gunakan Permutasi saat urutan jabatan atau ranking diperhitungkan: nPr = n! / (n - r)!',
      'Gunakan Kombinasi saat urutan pemilihan diabaikan: nCr = n! / [r! · (n - r)!]'
    ],
    contohKasus: {
      pertanyaan: 'Perhatikan dua permasalahan berikut:\n(a) Dari 8 siswa berprestasi Kelas 11 MIPA, akan dipilih 3 orang untuk menjabat sebagai Ketua, Sekretaris, dan Bendahara ekstrakurikuler Sains Club. Berapa banyak susunan kepengurusan yang mungkin?\n(b) Dari 8 siswa tersebut, akan dipilih delegasi tim beranggotakan 3 orang untuk mengikuti Lomba Cerdas Cermat Kimia Nasional. Berapa banyak susunan tim yang mungkin?',
      pembahasan: 'Pembahasan Soal (a):\nKarena susunan jabatan memiliki hierarki fungsi yang berbeda (Ketua ≠ Sekretaris ≠ Bendahara), maka urutan SANGAT DIPERHATIKAN. Gunakan rumus Permutasi:\n8P3 = 8! / (8 - 3)! = 8! / 5! = (8 × 7 × 6 × 5!) / 5! = 8 × 7 × 6 = 336 susunan kepengurusan.\n\nPembahasan Soal (b):\nKarena ketiga siswa yang terpilih berstatus setara sebagai anggota delegasi tim tanpa jabatan bertingkat, maka urutan DIABAIKAN. Gunakan rumus Kombinasi:\n8C3 = 8! / [3! · (8 - 3)!] = 8! / (3! · 5!) = (8 × 7 × 6) / (3 × 2 × 1) = 336 / 6 = 56 susunan tim delegasi.'
    },
    tipsBelajar: 'Jembatan keledai Kombinatorika: "P = Posisi (Permutasi urutan jabatan penting)", "C = Campur (Kombinasi urutan bebas dicampur)".',
    formulaOrDiagram: 'Statistika & Peluang: x̄ = Σ(fi · xi) / N | Mo = tb + [d1 / (d1+d2)] · p | nPr = n! / (n-r)! | nCr = n! / [r! · (n-r)!]',
    glosarium: [
      { istilah: 'Aturan Sturgess', arti: 'Formula empiris untuk menentukan jumlah kelas interval dalam tabel distribusi frekuensi: k = 1 + 3.3 · log(N).' },
      { istilah: 'Tepi Bawah (tb)', arti: 'Nilai batas riil bawah kelas interval yang diperoleh dari batas bawah dikurangi setengah satuan ketelitian data.' },
      { istilah: 'Permutasi (nPr)', arti: 'Banyaknya cara penyusunan sejumlah objek dengan memperhatikan urutan posisi objek tersebut.' },
      { istilah: 'Kombinasi (nCr)', arti: 'Banyaknya cara penyeleksian sejumlah objek dari kumpulan objek yang tersedia tanpa memperhatikan urutan susunan.' }
    ],
    lkpd: {
      judulAktivitas: 'Investigasi Data Statistik Nilai Asesmen & Pemodelan Peluang Tim Olimpiade',
      alatBahan: ['Tabel Data Mentah Nilai Tryout CBT 36 Siswa', 'Kalkulator Ilmiah', 'Lembar Kerja Distribusi Frekuensi'],
      langkahKerja: [
        'Tentukan jangkauan data (J = Nilai Maksimum - Nilai Minimum) dari data nilai 36 siswa.',
        'Hitung banyak kelas (k) menggunakan aturan Sturgess k = 1 + 3.3 log(36) dan bulatkan ke atas.',
        'Hitung panjang interval kelas (p = J / k).',
        'Buat tabel distribusi frekuensi lengkap dengan titik tengah (xi) dan frekuensi kumulatif.',
        'Hitung nilai rata-rata (mean), median, dan modus data berkelompok tersebut.',
        'Hitung berapa banyak kombinasi memilih 4 siswa peraih nilai tertinggi untuk formasi tim olimpiade sains.'
      ],
      pertanyaanDiskusi: [
        'Mengapa nilai modus sangat sensitif terhadap penentuan panjang interval kelas?',
        'Bagaimana korelasi antara nilai simpangan baku yang kecil dengan tingkat pemerataan pemahaman materi siswa di kelas?'
      ]
    },
    konsepKunci: [
      { title: 'Mean & Modus Berkelompok', desc: 'Ukuran pemusatan data kuantitatif menggunakan bobot frekuensi interval kelas.' },
      { title: 'Permutasi (nPr)', desc: 'Kaidah penyusunan objek yang memperhatikan urutan posisi (Ketua, Sekretaris, Bendahara).' },
      { title: 'Kombinasi (nCr)', desc: 'Kaidah pemilihan objek tanpa memedulikan urutan susunan (tim delegasi atau pemilihan sampel).' }
    ],
    quizCheck: {
      question: 'Sebuah komite olimpiade memiliki 7 calon peserta. Jika akan dipilih 3 orang sebagai delegasi lomba tanpa tingkatan jabatan, berapa banyak tim yang dapat dibentuk?',
      options: ['21 tim', '35 tim', '70 tim', '210 tim'],
      correctIndex: 1,
      explanation: 'Gunakan kombinasi 7C3 = (7 × 6 × 5) / (3 × 2 × 1) = 210 / 6 = 35 kemungkinan susunan tim delegasi.'
    }
  },

  'Termodinamika & Kalor': {
    id: 'modul_termo',
    subject: 'Fisika Peminatan',
    title: 'Hukum Termodinamika, Teori Kinetik Gas Ideal & Siklus Mesin Carnot',
    grade: 'Kelas XI SMA MIPA (Fase F)',
    phase: 'Fase F (Kurikulum Merdeka SMA)',
    author: 'Ir. Ahmad Zulkarnain, S.Pd',
    duration: '3 JP × 45 Menit',
    capaianPembelajaran: 'Peserta didik mampu menganalisis hubungan antara usaha, kalor, dan perubahan energi dalam pada gas ideal, menerapkan Hukum I Termodinamika (Q = ΔU + W) pada berbagai proses termodinamika (isobarik, isotermik, isokhorik, adiabatik), serta menghitung efisiensi maksimum siklus mesin kalor Carnot.',
    tujuanPembelajaran: [
      'Menghitung energi dalam gas ideal monoatomik (U = 3/2 n R T) dan diatomik.',
      'Menghitung usaha gas pada proses Isobarik (W = P · ΔV), Isotermik (W = n R T ln(V2/V1)), dan Isokhorik (W = 0).',
      'Membuktikan formula efisiensi mesin Carnot: η = (1 - Tl / Th) × 100%.',
      'Menganalisis prinsip kerja mesin pendingin (kulkas/AC) berdasarkan koefisien performansi (COP).'
    ],
    materiPokok: 'Termodinamika mengkaji konversi energi antara kalor (panas) dan kerja mekanik. Hukum I Termodinamika menyatakan prinsip kekekalan energi: kalor yang diserap sistem (Q) digunakan untuk menambah energi dalam sistem (ΔU) dan melakukan usaha luar (W). Mesin Carnot adalah model teoritis mesin kalor ideal yang beroperasi di antara dua reservoir suhu dengan efisiensi tertinggi.',
    materiLengkap: 'Kajian kinetik gas ideal mengasumsikan partikel gas bergerak acak tanpa gaya tarik-menarik dan mengalami tumbukan lenting sempurna. Pada proses Isobarik (tekanan konstan), gas yang dipanaskan memuai dan melakukan usaha W = P(V2 - V1). Pada proses Isotermik (suhu konstan T1 = T2), perubahan energi dalam nol (ΔU = 0), sehingga seluruh kalor yang diserap diubah menjadi usaha (Q = W). Siklus Carnot terdiri dari dua proses ekspansi (isotermik dan adiabatik) serta dua proses kompresi (isotermik dan adiabatik). Menurut Hukum II Termodinamika (Kelvin-Planck), tidak mungkin ada mesin yang mengubah seluruh kalor yang diserap menjadi usaha tanpa membuang sebagian kalor ke reservoir dingin.',
    subBabMateri: [
      {
        judul: '1. Persamaan Keadaan Gas Ideal & Energi Dalam',
        isi: 'Persamaan gas ideal dirumuskan P · V = n · R · T = N · k · T, dengan P adalah tekanan (Pascal atau N/m²), V volume (m³), n jumlah mol, R tetapan gas universal (8.314 J/mol·K), dan T suhu mutlak dalam satuan Kelvin (K = °C + 273). Energi kinetik rata-rata per molekul gas monoatomik adalah Ek = 3/2 k T, sehingga energi dalam total N molekul adalah U = 3/2 N k T = 3/2 n R T. Perubahan energi dalam hanya bergantung pada perubahan suhu mutlak: ΔU = 3/2 n R ΔT.',
        poinPenting: [
          'Suhu mutlak WAJIB dalam skala Kelvin saat melakukan perhitungan termodinamika.',
          'Untuk proses Isokhorik (volume tetap, ΔV = 0), usaha W = 0, sehingga Q = ΔU = n Cv ΔT.',
          'Pada proses Adiabatik (tidak ada perpindahan kalor, Q = 0), maka W = -ΔU.'
        ],
        contohAplikasi: 'Perhitungan tekanan gas dalam tabung oksigen medis rumah sakit pada variasi temperatur ruang.'
      },
      {
        judul: '2. Empat Proses Termodinamika Gas',
        isi: 'Analisis proses gas pada diagram P-V: (a) Isobarik (P = konstan): W = P · (V2 - V1); (b) Isokhorik (V = konstan): W = 0; (c) Isotermik (T = konstan): P1 V1 = P2 V2, W = n R T ln(V2 / V1); (d) Adiabatik (Q = 0): Mengikuti relasi Laplace P · V^γ = konstan, di mana γ = Cp / Cv adalah konstanta Laplace (untuk gas monoatomik γ = 5/3 = 1.67).',
        poinPenting: [
          'Usaha W bernilai positif (+) jika gas berekspansi (memuai, V2 > V1).',
          'Usaha W bernilai negatif (-) jika gas dikompresi (ditekan dari luar, V2 < V1).',
          'Kalor Q bernilai positif jika sistem menyerap panas dari lingkungan.'
        ]
      },
      {
        judul: '3. Siklus Mesin Kalor Carnot & Koefisien Performansi Mesin Pendingin',
        isi: 'Mesin kalor Carnot menyerap kalor Qh dari reservoir suhu tinggi Th, melakukan usaha mekanik W = Qh - Ql, dan membuang sisa kalor Ql ke reservoir suhu rendah Tl. Efisiensi mesin Carnot dirumuskan: η = (W / Qh) = (1 - Ql / Qh) = (1 - Tl / Th). Untuk mesin pendingin (refrigerator/AC), efisiensinya dinyatakan dengan Koefisien Kinerja (Coefficient of Performance / COP): COP = Ql / W = Tl / (Th - Tl).',
        poinPenting: [
          'Efisiensi mesin kalor tidak akan pernah bisa mencapai 100% karena Tl tidak mungkin bernilai 0 Kelvin.',
          'Menaikkan suhu reservoir panas Th atau menurunkan suhu reservoir dingin Tl akan meningkatkan efisiensi.'
        ]
      }
    ],
    rangkumanMateri: [
      'Hukum I Termodinamika: Q = ΔU + W (Kekekalan energi kalor dan mekanik).',
      'Pada proses isotermik ΔU = 0 sehingga Q = W; pada proses isokhorik W = 0 sehingga Q = ΔU.',
      'Efisiensi mesin Carnot: η = (1 - Tl / Th) × 100% di mana suhu wajib dalam Kelvin.',
      'Koefisien performansi mesin pendingin: COP = Tl / (Th - Tl).'
    ],
    contohKasus: {
      pertanyaan: 'Sebuah mesin kalor Carnot bekerja di antara dua reservoir suhu tinggi Th = 500 K dan reservoir suhu rendah Tl = 350 K. Jika mesin menyerap kalor sebesar Qh = 2000 Joule pada setiap siklus, hitunglah: (a) Efisiensi termal mesin Carnot, (b) Usaha mekanik yang dihasilkan mesin per siklus!',
      pembahasan: 'Diketahui: Th = 500 K, Tl = 350 K, Qh = 2000 Joule.\n(a) Menghitung Efisiensi termal η:\nη = (1 - Tl / Th) × 100%\nη = (1 - 350 / 500) × 100% = (1 - 0.70) × 100% = 0.30 × 100% = 30%.\n(b) Menghitung Usaha mekanik W:\nW = η · Qh = 0.30 × 2000 Joule = 600 Joule.\nKalor yang dibuang ke lingkungan (Ql) = Qh - W = 2000 - 600 = 1400 Joule.'
    },
    tipsBelajar: 'Jangan lupa konversi derajat Celcius ke Kelvin dengan menambahkan 273 (T = t°C + 273). Kesalahan umum ujian adalah langsung memasukkan suhu Celcius ke rumus efisiensi.',
    formulaOrDiagram: 'Hukum Termo: Q = ΔU + W | W_isobarik = P · ΔV | η = (1 - Tl / Th) · 100% | COP = Tl / (Th - Tl)',
    glosarium: [
      { istilah: 'Siklus Carnot', arti: 'Siklus reversibel teoritis ideal yang terdiri dari dua proses isotermik dan dua proses adiabatik dengan efisiensi paling optimal.' },
      { istilah: 'Proses Adiabatik', arti: 'Proses termodinamika yang berlangsung sangat cepat atau dalam wadah terisolasi sempurna sehingga tidak ada pertukaran kalor antara sistem dan lingkungan (Q = 0).' },
      { istilah: 'Konstanta Laplace (γ)', arti: 'Rasio kapasitas kalor molar gas pada tekanan tetap terhadap kapasitas kalor pada volume tetap (Cp / Cv).' }
    ],
    lkpd: {
      judulAktivitas: 'Investigasi Efisiensi Mesin Termal Berdasarkan Variasi Suhu Reservoir',
      alatBahan: ['Aplikasi Simulasi Termodinamika Digital', 'Kalkulator Sains', 'Lembar Grafik Efisiensi Carnot'],
      langkahKerja: [
        'Tetapkan suhu reservoir dingin Tl pada 300 K (suhu kamar).',
        'Variasikan suhu reservoir panas Th berturut-turut: 400 K, 500 K, 600 K, 800 K, dan 1000 K.',
        'Hitung efisiensi mesin Carnot untuk masing-masing variasi suhu.',
        'Gambarkan grafik hubungan antara suhu reservoir panas (Th) dengan efisiensi mesin (η).'
      ],
      pertanyaanDiskusi: [
        'Mengapa efisiensi pembangkit listrik tenaga uap (PLTU) selalu berupaya menaikkan temperatur uap boiler setinggi mungkin?',
        'Jelaskan mengapa mesin pendingin ruangan (AC) membutuhkan energi listrik lebih besar saat temperatur udara luar sangat terik!'
      ]
    },
    konsepKunci: [
      { title: 'Hukum I Termodinamika', desc: 'Prinsip kekekalan energi panas dan mekanik: Q = ΔU + W.' },
      { title: 'Efisiensi Mesin Carnot', desc: 'η = (1 - Tl / Th) yang murni dibatasi oleh rasio temperatur reservoir mutlak Kelvin.' },
      { title: 'Proses Adiabatik', desc: 'Perubahan keadaan gas tanpa adanya transfer kalor (Q = 0) dengan ekspansi menurunkan suhu.' }
    ],
    quizCheck: {
      question: 'Sebuah mesin Carnot beroperasi antara suhu 600 K dan 300 K. Berapakah efisiensi maksimum mesin tersebut?',
      options: ['25%', '50%', '75%', '100%'],
      correctIndex: 1,
      explanation: 'η = (1 - 300 / 600) × 100% = (1 - 0.5) × 100% = 50%.'
    }
  },

  'Termokimia & Entalpi': {
    id: 'modul_termokimia',
    subject: 'Kimia Analitik',
    title: 'Termokimia, Perubahan Entalpi Reaksi, Hukum Hess & Energi Ikatan',
    grade: 'Kelas XI SMA MIPA (Fase F)',
    phase: 'Fase F (Kurikulum Merdeka SMA)',
    author: 'Drs. Bambang Sudarsono, M.Si',
    duration: '3 JP Praktikum & Teori',
    capaianPembelajaran: 'Peserta didik mampu membedakan sistem terbuka, tertutup, dan terisolasi, membedakan reaksi eksoterm (ΔH < 0) dan reaksi endoterm (ΔH > 0), menghitung perubahan entalpi reaksi melalui eksperimen kalorimetri sederhana (q = m · c · ΔT), hukum penjumlahan kalor Hess, entalpi pembentukan standar (ΔHf°), dan data energi ikatan rata-rata.',
    tujuanPembelajaran: [
      'Menganalisis diagram tingkat energi reaksi eksotermik dan endotermik.',
      'Menghitung kalor reaksi (q) dan perubahan entalpi (ΔH) menggunakan kalorimeter larutan.',
      'Menerapkan Hukum Hess untuk menentukan ΔH reaksi bertahap.',
      'Menghitung entalpi reaksi menggunakan selisih pemutusan ikatan reaktan dan pembentukan ikatan produk: ΔH = Σ(Energi Ikatan Pemutusan) - Σ(Energi Ikatan Pembentukan).'
    ],
    materiPokok: 'Termokimia adalah cabang ilmu kimia yang mempelajari perubahan kalor yang menyertai reaksi kimia. Entalpi (H) adalah kandungan energi kalor suatu zat pada tekanan tetap. Reaksi eksoterm melepaskan kalor ke lingkungan (ΔH negatif, suhu sistem naik), sedangkan reaksi endoterm menyerap kalor dari lingkungan (ΔH positif, suhu sistem turun).',
    materiLengkap: 'Kajian termokimia sangat vital dalam perancangan bahan bakar industri, roket antariksa, dan kompres dingin instan (cold pack berbasis amonium nitrat). Perubahan entalpi pembentukan standar (ΔHf°) adalah kalor yang dilepas atau diserap pada pembentukan 1 mol senyawa dari unsur-unsurnya dalam bentuk paling stabil pada kondisi standar (298 K, 1 atm). Menurut Hukum Hess, perubahan entalpi reaksi hanya bergantung pada keadaan awal reaktan dan keadaan akhir produk, tidak bergantung pada jalannya rute tahapan reaksi.',
    subBabMateri: [
      {
        judul: '1. Reaksi Eksoterm, Reaksi Endoterm & Kalorimetri',
        isi: 'Perbedaan mendasar: (1) Eksoterm: Terjadi pelepasan kalor dari sistem ke lingkungan (ΔH = H_produk - H_reaktan < 0). Suhu campuran larutan naik (misal: reaksi pelarutan NaOH dalam air atau pembakaran metana); (2) Endoterm: Sistem menyerap kalor dari lingkungan (ΔH > 0). Suhu campuran larutan turun terasa dingin (misal: pelarutan urea atau kristal Ba(OH)2 dengan NH4Cl). Pada kalorimeter sederhana bertekanan tetap: q_reaksi = -(q_larutan + q_kalorimeter) = -(m · c · ΔT + C · ΔT).',
        poinPenting: [
          'Kalor jenis air c = 4.18 J/g·°C atau 4.2 J/g·K.',
          'Massa larutan m diperoleh dari volume larutan dikali massa jenis (umumnya diasumsikan ρ = 1 g/mL).',
          'Perubahan entalpi molar ΔH = q_reaksi / n_mol (satuan kJ/mol).'
        ],
        contohAplikasi: 'Eksperimen penentuan kalor netralisasi asam kuat HCl dengan basa kuat NaOH menggunakan kalorimeter cangkir styrofoam.'
      },
      {
        judul: '2. Hukum Hess: Penjumlahan Kalor Reaksi Bertahap',
        isi: 'Germain Henri Hess (1840) merumuskan bahwa jika suatu reaksi berlangsung dalam beberapa tahapan, maka ΔH total reaksi adalah jumlah aljabar dari ΔH tahapan-tahapan tersebut. Aturan manipulasi persamaan termokimia: (1) Jika persamaan reaksi dibalik arahnya, tanda ΔH berganti dari positif menjadi negatif atau sebaliknya; (2) Jika koefisien reaksi dikalikan faktor n, nilai ΔH dikalikan n; (3) Jika koefisien dibagi n, nilai ΔH dibagi n.',
        poinPenting: [
          'Hukum Hess memungkinkan penentuan kalor reaksi yang sangat berbahaya, lambat, atau sulit diukur secara langsung di laboratorium (misal: pembentukan gas CO dari karbon).'
        ]
      },
      {
        judul: '3. Penentuan ΔH Berdasarkan Energi Ikatan Rata-Rata',
        isi: 'Reaksi kimia pada dasarnya adalah proses pemutusan ikatan kimia lama pada molekul reaktan (membutuhkan energi / endoterm) diikuti pembentukan ikatan kimia baru pada molekul produk (melepaskan energi / eksoterm). Rumus perhitungan: ΔH = Σ(Energi Ikatan Pereaksi yang Putus) - Σ(Energi Ikatan Produk yang Terbentuk) = Σ D_kiri - Σ D_kanan.',
        poinPenting: [
          'Gambarkan struktur Lewis molekul secara cermat untuk menghitung jumlah ikatan tunggal, rangkap dua, atau rangkap tiga.',
          'Ikatan rangkap dua (C=C) memiliki energi ikatan yang lebih kuat daripada ikatan tunggal (C-C).'
        ]
      }
    ],
    rangkumanMateri: [
      'Reaksi eksoterm melepaskan kalor ke lingkungan (ΔH bernilai negatif); reaksi endoterm menyerap kalor (ΔH bernilai positif).',
      'Kalorimeter sederhana: q = m · c · ΔT, dan ΔH = -q / mol.',
      'Hukum Hess: ΔH reaksi tidak bergantung pada jalur lintasan reaksi, melainkan hanya kondisi awal dan akhir.',
      'Energi ikatan: ΔH = Σ(Energi Ikatan Putus / Kiri) - Σ(Energi Ikatan Terbentuk / Kanan).'
    ],
    contohKasus: {
      pertanyaan: 'Sebanyak 50 mL larutan HCl 1 M dicampurkan dengan 50 mL larutan NaOH 1 M dalam kalorimeter styrofoam. Suhu awal kedua larutan adalah 25.0°C. Setelah reaksi netralisasi selesai, suhu campuran naik menjadi 31.5°C. Jika kalor jenis larutan c = 4.2 J/g·°C dan massa jenis larutan ρ = 1 g/mL, hitunglah perubahan entalpi reaksi netralisasi (ΔH) per mol H2O!',
      pembahasan: 'Langkah 1: Hitung volume total dan massa larutan ➔ V = 50 + 50 = 100 mL, massa m = 100 g.\nLangkah 2: Hitung perubahan suhu ➔ ΔT = 31.5 - 25.0 = 6.5°C.\nLangkah 3: Hitung kalor larutan ➔ q_larutan = m · c · ΔT = 100 × 4.2 × 6.5 = 2730 Joule = 2.73 kJ.\nKalor reaksi q_reaksi = -q_larutan = -2.73 kJ.\nLangkah 4: Hitung mol zat yang bereaksi ➔ mol HCl = 0.050 L × 1 M = 0.05 mol; mol NaOH = 0.050 L × 1 M = 0.05 mol. Mol H2O yang terbentuk = 0.05 mol.\nLangkah 5: Hitung entalpi molar ΔH ➔ ΔH = q_reaksi / mol = -2.73 kJ / 0.05 mol = -54.6 kJ/mol.\nReaksi bersifat eksotermik dengan pelepasan kalor 54.6 kJ per mol H2O terbentuk.'
    },
    tipsBelajar: 'Gunakan mnemonik Energi Ikatan: "KIKAK" = Kiri Kurang Kanan (Σ Energi Ikatan Kiri dikurangi Σ Energi Ikatan Kanan). Berbeda dengan rumus entalpi pembentukan: ΔH = Kanan Kurang Kiri (H_produk - H_reaktan).',
    formulaOrDiagram: 'Termokimia: q = m · c · ΔT | ΔH = -q / mol | Hukum Hess: ΔH_total = ΔH1 + ΔH2 | ΔH = Σ D_kiri - Σ D_kanan',
    glosarium: [
      { istilah: 'Entalpi (H)', arti: 'Jumlah energi total internal yang dimiliki oleh suatu materi pada tekanan konstan.' },
      { istilah: 'Hukum Hess', arti: 'Prinsip termokimia bahwa perubahan entalpi suatu reaksi kimia adalah sama terlepas dari apakah reaksi berlangsung dalam satu langkah atau serangkaian langkah.' },
      { istilah: 'Energi Ikatan', arti: 'Energi rata-rata yang diperlukan untuk memutuskan satu mol ikatan kimia kovalen tertentu dalam keadaan gas.' }
    ],
    lkpd: {
      judulAktivitas: 'Eksperimen Digital Penentuan Kalor Pembakaran Senyawa Hidrokarbon Metanol',
      alatBahan: ['Kalorimeter Bom Virtual', 'Neraca Analitik', 'Termometer Digital', 'Bahan Bakar Metanol'],
      langkahKerja: [
        'Timbang massa awal pembakar spiritus berisi metanol (CH3OH).',
        'Masukkan 200 mL air suling ke dalam wadah kalorimeter aluminium.',
        'Nyalakan api pembakar hingga suhu air naik sebesar 20°C lalu padamkan api.',
        'Timbang kembali massa akhir pembakar untuk menghitung massa metanol yang terbakar.',
        'Hitung kalor yang diserap air (q = m · c · ΔT) dan tentukan entalpi pembakaran molar (ΔHc°).'
      ],
      pertanyaanDiskusi: [
        'Mengapa nilai entalpi pembakaran eksperimen kalorimeter sederhana umumnya lebih kecil daripada nilai teoretis di literatur?',
        'Jelaskan mengapa gas hidrogen dianggap sebagai bahan bakar masa depan yang sangat ramah lingkungan dari tinjauan termokimia!'
      ]
    },
    konsepKunci: [
      { title: 'Reaksi Eksoterm', desc: 'Sistem melepaskan energi ke lingkungan (ΔH negatif), menaikkan suhu larutan.' },
      { title: 'Hukum Hess', desc: 'Entalpi reaksi adalah fungsi keadaan yang independen terhadap rute tahapan.' },
      { title: 'Kalkulasi Energi Ikatan', desc: 'ΔH = Energi pemutusan ikatan pereaksi dikurangi energi pembentukan ikatan produk.' }
    ],
    quizCheck: {
      question: 'Manakah di bawah ini yang merupakan ciri khas dari reaksi termokimia eksoterm?',
      options: ['ΔH bernilai positif dan suhu lingkungan menurun', 'ΔH bernilai negatif dan suhu lingkungan meningkat', 'Sistem menyerap kalor dari lingkungan', 'Energi produk lebih tinggi dari energi pereaksi'],
      correctIndex: 1,
      explanation: 'Pada reaksi eksotermik, sistem melepaskan kalor ke lingkungan sehingga ΔH bertanda negatif dan menyebabkan kenaikan suhu lingkungan.'
    }
  },

  'Struktur Sel & Transpor Membran': {
    id: 'modul_sel_transpor',
    subject: 'Biologi Sel',
    title: 'Anatomi Sel Eukariotik, Osmosis, Plasmolisis & Transpor Aktif Membran',
    grade: 'Kelas XI SMA MIPA (Fase F)',
    phase: 'Fase F (Kurikulum Merdeka SMA)',
    author: 'Ibu Endang Suryani, M.Si',
    duration: '3 JP × 45 Menit',
    capaianPembelajaran: 'Peserta didik mampu menganalisis keterkaitan antara struktur organel sel (sitoplasma, ribosom, mitokondria, badan golgi, lisosom, retikulum endoplasma) dengan fungsi biokimia seluler, serta membedakan mekanisme transpor pasif (difusi dan osmosis) dan transpor aktif (pompa ion Na+/K+, endositosis, eksositosis).',
    tujuanPembelajaran: [
      'Membandingkan perbedaan ultrastruktur sel hewan (sentriol, lisosom) dan sel tumbuhan (dinding sel selulosa, kloroplas, vakuola sentral).',
      'Menganalisis model mosaik fluida membran plasma (lapisan ganda fosfolipid dengan kepala hidrofilik dan ekor hidrofobik).',
      'Memprediksi fenomena osmosis: Krenasi dan Lisis pada eritrosit, serta Plasmolisis dan Turgid pada sel daun Rhoeo discolor.',
      'Menjelaskan mekanisme pompa natrium-kalium (Na+/K+ ATPase) yang memanfaatkan hidrolisis ATP melawan gradien konsentrasi.'
    ],
    materiPokok: 'Sel adalah unit struktural dan fungsional terkecil dari makhluk hidup. Membran plasma bersifat semipermeabel selektif yang mengatur lalu lintas molekul masuk dan keluar sel. Transpor zat terbagi menjadi transpor pasif (tanpa energi ATP, searah gradien konsentrasi) dan transpor aktif (memerlukan ATP, melawan gradien konsentrasi).',
    materiLengkap: 'Model Mosaik Fluida yang diajukan Singer dan Nicolson (1972) menggambarkan membran sel sebagai matriks fosfolipid bilayer yang dinamis, di mana protein integral menembus lapisan membran dan protein perifer menempel di permukaan. Pada transpor pasif, molekul air berosmosis dari larutan hipotonik (konsentrasi zat terlarut rendah/potensial air tinggi) menuju larutan hipertonik (konsentrasi zat terlarut tinggi/potensial air rendah). Jika sel tumbuhan diletakkan di larutan hipertonik, air keluar dari vakuola sehingga membran plasma terlepas dari dinding sel (peristiwa plasmolisis). Transpor aktif pompa Na+/K+ memompa 3 ion Na+ keluar sel dan memasukkan 2 ion K+ ke dalam sel untuk mempertahankan potensial aksi membran saraf.',
    subBabMateri: [
      {
        judul: '1. Model Mosaik Fluida Membran Plasma & Organel Sel Eukariotik',
        isi: 'Komponen membran sel: (a) Fosfolipid Bilayer: Molekul amfifatik dengan kepala fosfat bermuatan yang bersifat hidrofilik (suka air) menghadap ke luar/dalam sel, dan ekor asam lemak non-polar yang bersifat hidrofobik (takut air) berada di bagian dalam; (b) Kolesterol: Menjaga fluiditas membran terhadap fluktuasi temperatur; (c) Protein Transpor (Kanal & Pembawa); (d) Glikoprotein dan Glikolipid yang berfungsi sebagai reseptor pengenal sel. Organel endomembran mencakup Retikulum Endoplasma Kasar (sintesis protein sekresi oleh ribosom), Retikulum Endoplasma Halus (sintesis lipid dan detoksifikasi racun), dan Badan Golgi (glikosilasi dan pengemasan vesikel).',
        poinPenting: [
          'Mitokondria dan kloroplas memiliki DNA sirkular dan ribosom sendiri (Teori Endosimbiosis Lynn Margulis).',
          'Lisosom mengandung enzim hidrolitik asam untuk autofagi dan fagositosis mikroba patogen.'
        ],
        contohAplikasi: 'Analisis kerusakan membran sel akibat paparan pelarut organik alkohol atau detergen.'
      },
      {
        judul: '2. Transpor Pasif: Difusi Sederhana, Difusi Terfasilitasi & Osmosis',
        isi: 'Lalu lintas pasif berlangsung spontan menuruni gradien konsentrasi: (1) Difusi Sederhana: Molekul gas non-polar kecil (O2, CO2) melintasi celah fosfolipid secara langsung; (2) Difusi Terfasilitasi: Molekul polar besar (glukosa, asam amino) melintasi membran melalui bantuan protein saluran atau protein pembawa (carrier protein / GLUT); (3) Osmosis: Perpindahan pelarut air melalui membran semipermeabel dari hipotonik ke hipertonik.',
        poinPenting: [
          'Sel darah merah pada larutan hipertonik mengalami Krenasi (menciut berkerut).',
          'Sel darah merah pada larutan hipotonik mengalami Hemolisis (mengembang dan pecah).',
          'Sel tumbuhan pada larutan hipotonik berada pada kondisi Turgid (tekanan turgor optimal menekan dinding sel).'
        ]
      },
      {
        judul: '3. Transpor Aktif: Pompa Na+/K+, Endositosis & Eksositosis',
        isi: 'Transpor aktif memindahkan zat melawan gradien konsentrasi dengan memanfaatkan hidrolisis 1 ATP menjadi ADP + Pi: (a) Pompa Na+/K+ ATPase: Mengikat 3 ion Na+ intraseluler, terfosforilasi, mengubah konformasi untuk melepaskan 3 Na+ ke ekstraseluler, lalu mengikat 2 ion K+ ekstraseluler untuk dibawa ke dalam sel; (b) Endositosis: Pembungkusan partikel eksternal oleh lekukan membran sel (Fagositosis untuk partikel padat besar, Pinositosis untuk cairan); (c) Eksositosis: Pengeluaran hormon atau enzim via fusi vesikel sekretori dengan membran plasma.',
        poinPenting: [
          'Pompa Na+/K+ mengonsumsi sepertiga total energi ATP basal tubuh manusia untuk menjaga polaritas membran saraf.'
        ]
      }
    ],
    rangkumanMateri: [
      'Membran sel tersusun atas fosfolipid bilayer amfifatik dengan protein mosaik dinamis.',
      'Transpor pasif meliputi difusi dan osmosis yang berlangsung spontan menuruni gradien konsentrasi tanpa energi ATP.',
      'Plasmolisis terjadi ketika sel tumbuhan berada di larutan hipertonik sehingga sitoplasma menciut lepas dari dinding sel.',
      'Transpor aktif membutuhkan energi ATP untuk memindahkan ion melawan gradien konsentrasi (contoh: pompa 3 Na+ keluar dan 2 K+ masuk).'
    ],
    contohKasus: {
      pertanyaan: 'Sayatan epidermis bawah daun tanaman Rhoeo discolor yang memiliki cairan sel berwarna ungu (pigmen antosianin) ditetesi larutan sukrosa 15% pada kaca objek mikroskop. Setelah 5 menit diamati di bawah mikroskop, tampak ruang warna ungu di dalam sel menciut dan menjauh dari dinding sel. Fenomena biologis apakah yang terjadi dan jelaskan mekanisme alirannya!',
      pembahasan: 'Fenomena tersebut adalah Plasmolisis.\n- Mekanisme: Larutan sukrosa 15% bersifat hipertonik (konsentrasi zat terlarut lebih tinggi) dibandingkan cairan intraseluler vakuola sel daun Rhoeo discolor yang bersifat hipotonik.\n- Terjadi peristiwa osmosis, yaitu molekul air keluar dari vakuola sel menembus membran semipermeabel menuju larutan sukrosa di luar sel.\n- Akibat hilangnya tekanan turgor cairan vakuola, volume sitoplasma menciut dan membran plasma terlepas dari dinding sel selulosa yang kaku, sehingga area ungu terakumulasi di bagian tengah sel.'
    },
    tipsBelajar: 'Ingat rumus arah osmosis: "Air selalu mengalir dari HIPO ke HIPER" (dari konsentrasi pelarut air tinggi / zat terlarut rendah menuju konsentrasi zat terlarut tinggi).',
    formulaOrDiagram: 'Transpor Membran: [Pasif: Difusi & Osmosis (Tanpa ATP)] vs [Aktif: Pompa 3 Na+ keluar / 2 K+ masuk + Endositosis (Butuh ATP)]',
    glosarium: [
      { istilah: 'Plasmolisis', arti: 'Peristiwa lepasnya membran plasma dari dinding sel tumbuhan akibat keluarnya air saat sel berada dalam medium hipertonik.' },
      { istilah: 'Amfifatik', arti: 'Sifat molekul yang memiliki dua kutub berbeda sekaligus: daerah kepala hidrofilik dan daerah ekor hidrofobik.' },
      { istilah: 'Tekanan Turgor', arti: 'Tekanan internal yang dikerjakan oleh cairan vakuola sel terhadap dinding sel tumbuhan yang menjaga kekakuan daun dan batang herbal.' }
    ],
    lkpd: {
      judulAktivitas: 'Eksperimen Mikroskopi Virtual: Osmosis pada Sel Daun Rhoeo discolor',
      alatBahan: ['Mikroskop Cahaya Digital Perbesaran 400x', 'Sayatan Daun Rhoeo discolor', 'Larutan Aquades (Hipotonik)', 'Larutan Sukrosa 20% (Hipertonik)'],
      langkahKerja: [
        'Letakkan preparat daun pada meja mikroskop dan amati kondisi sel awal pada larutan aquades.',
        'Teteskan 2 tetes larutan sukrosa 20% pada tepi kaca penutup preparat.',
        'Amati pergerakan batas membran sel terhadap dinding sel setiap 1 menit selama 5 menit.',
        'Hitung persentase sel yang mengalami plasmolisis pada bidang pandang mikroskop.',
        'Teteskan kembali aquades murni untuk mengamati proses pemulihan (deplasmolisis).'
      ],
      pertanyaanDiskusi: [
        'Mengapa sel hewan (eritrosit) dapat pecah (hemolisis) pada medium hipotonik sedangkan sel tumbuhan tidak pecah?',
        'Jelaskan mengapa pemberian pupuk kimia berlebih pada tanah pertanian dapat menyebabkan tanaman layu dan mati terbakar!'
      ]
    },
    konsepKunci: [
      { title: 'Fosfolipid Bilayer', desc: 'Struktur membran sel dwilapis dengan kepala hidrofilik dan ekor asam lemak hidrofobik.' },
      { title: 'Osmosis & Plasmolisis', desc: 'Perpindahan air pelarut melintasi membran semipermeabel menuju larutan hipertonik.' },
      { title: 'Pompa Ion Na+/K+', desc: 'Transpor aktif primer elektroforesis yang memompa 3 Na+ keluar dan 2 K+ ke dalam sel.' }
    ],
    quizCheck: {
      question: 'Apa yang terjadi jika sel darah merah (eritrosit) dimasukkan ke dalam larutan garam pekat hipertonik?',
      options: ['Sel mengalami lisis dan pecah', 'Sel mengalami krenasi dan mengerut', 'Sel berada dalam kondisi turgid', 'Tidak terjadi perpindahan molekul air'],
      correctIndex: 1,
      explanation: 'Pada larutan hipertonik, air di dalam eritrosit akan berosmosis keluar menuju larutan garam sehingga sel darah merah kehilangan cairan dan mengerut (krenasi).'
    }
  },

  'Polinomial & Suku Banyak': {
    id: 'modul_polinomial',
    subject: 'Matematika Peminatan',
    title: 'Aljabar Polinomial: Pembagian Sintetis Horner, Teorema Sisa & Teorema Faktor',
    grade: 'Kelas XI SMA MIPA (Fase F)',
    phase: 'Fase F (Kurikulum Merdeka SMA)',
    author: 'Ibu Ratna Dewi, S.Pd',
    duration: '3 JP × 45 Menit',
    capaianPembelajaran: 'Peserta didik mampu menyelesaikan operasi aljabar suku banyak (penjumlahan, pengurangan, perkalian), menentukan hasil bagi H(x) dan sisa pembagian S(x) menggunakan metode bersusun dan metode pembagian sintetis Horner, menerapkan Teorema Sisa dan Teorema Faktor untuk memfaktorkan polinomial dan mencari akar-akar rasional persamaan derajat n.',
    tujuanPembelajaran: [
      'Menentukan derajat, koefisien, dan suku konstan dari fungsi polinomial P(x).',
      'Menerapkan skema Horner untuk pembagian polinomial oleh (x - k) dan (ax - b).',
      'Membuktikan Teorema Sisa: Jika P(x) dibagi oleh (x - k), maka sisa pembagiannya adalah S = P(k).',
      'Menggunakan Teorema Faktor: (x - k) adalah faktor dari P(x) jika dan hanya jika P(k) = 0.',
      'Menentukan akar-akar rasional persamaan polinomial menggunakan Teorema Vieta.'
    ],
    materiPokok: 'Polinomial (suku banyak) adalah bentuk aljabar yang memuat variabel berpangkat bilangan cacah. Bentuk umum: P(x) = an xⁿ + a(n-1) xⁿ⁻¹ + ... + a1 x + a0 dengan an ≠ 0. Hubungan dasar pembagian: Yang Dibagi = (Pembagi × Hasil Bagi) + Sisa ➔ P(x) = Q(x) · H(x) + S(x). Derajat sisa pembagian selalu maksimal satu derajat lebih rendah daripada derajat pembagi.',
    materiLengkap: 'Pembagian suku banyak merupakan fondasi penting dalam kalkulus integral pecahan parsial, pemodelan lintasan orbit benda langit, dan kriptografi komputasi. Metode pembagian sintetis Horner menyederhanakan perhitungan polinomial derajat tinggi hanya dengan operasi perkalian dan penjumlahan koefisien secara vertikal dan diagonal. Berdasarkan Teorema Vieta untuk persamaan kubik ax³ + bx² + cx + d = 0 dengan akar-akar x1, x2, x3: Jumlah akar x1 + x2 + x3 = -b/a, jumlah hasil kali dua akar x1 x2 + x1 x3 + x2 x3 = c/a, dan hasil kali ketiga akar x1 x2 x3 = -d/a.',
    subBabMateri: [
      {
        judul: '1. Operasi Polinomial & Skema Pembagian Horner',
        isi: 'Untuk membagi P(x) = an xⁿ + ... + a0 dengan (x - k): tuliskan koefisien berurutan an, an-1, ..., a0 secara horizontal. Turunkan an ke baris hasil bagi paling bawah. Kalikan an dengan pembuat nol pembagi k, letakkan di bawah koefisien an-1, lalu jumlahkan ke bawah. Ulangi proses hingga suku konstan. Angka terakhir di kanan bawah adalah sisa pembagian S, sedangkan baris angka sebelumnya adalah koefisien hasil bagi H(x). Untuk pembagi berbentuk (ax - b), pembuat nolnya adalah k = b/a, dan hasil bagi dari skema Horner harus dibagi lagi dengan koefisien a: H_sebenarnya(x) = H(x) / a.',
        poinPenting: [
          'Jika ada pangkat variabel yang hilang (misal x³ langsung ke x tanpa suku x²), koefisien x² WAJIB ditulis angka 0.',
          'Derajat sisa pembagian S(x) maksimal adalah (Derajat Pembagi - 1).'
        ],
        contohAplikasi: 'Menghitung nilai fungsi polinomial P(x) pada absis x = k dengan cepat menggunakan metode Horner (P(k) = sisa Horner).'
      },
      {
        judul: '2. Teorema Sisa & Pembagi Berderajat Dua',
        isi: 'Teorema Sisa menyatakan: (1) Jika P(x) dibagi (x - k), sisa S = P(k); (2) Jika P(x) dibagi (ax - b), sisa S = P(b/a); (3) Jika P(x) dibagi pembagi kuadrat (x - a)(x - b), maka sisa berbentuk linear S(x) = p x + q. Nilai p dan q diperoleh melalui sistem persamaan linear: P(a) = p(a) + q dan P(b) = p(b) + q.',
        poinPenting: [
          'Jika suatu suku banyak bersisa 5 saat dibagi (x - 2), artinya P(2) = 5.',
          'Jika suku banyak bersisa -1 saat dibagi (x + 1), artinya P(-1) = -1.'
        ]
      },
      {
        judul: '3. Teorema Faktor & Teorema Vieta',
        isi: 'Teorema Faktor: Suku linear (x - c) merupakan faktor dari P(x) jika dan hanya jika sisa pembagian P(c) = 0. Calon akar rasional dari an xⁿ + ... + a0 adalah faktor bulat dari a0 dibagi faktor bulat dari an. Teorema Vieta persamaan derajat 3: x1 + x2 + x3 = -b/a, x1 x2 + x1 x3 + x2 x3 = c/a, x1 x2 x3 = -d/a.',
        poinPenting: [
          'Akar rasional diuji coba mulai dari ±1, ±2, faktor dari konstanta ujung.'
        ]
      }
    ],
    rangkumanMateri: [
      'Bentuk umum pembagian: P(x) = Q(x) · H(x) + S(x).',
      'Skema Horner mempermudah pembagian aljabar suku banyak tanpa pembagian bersusun panjang.',
      'Teorema Sisa: Sisa pembagian P(x) oleh (x - k) bernilai P(k).',
      'Teorema Faktor: (x - k) adalah faktor jika P(k) = 0.',
      'Hubungan akar Vieta: Jumlah akar selalu -koefisien kedua dibagi koefisien utama.'
    ],
    contohKasus: {
      pertanyaan: 'Diketahui suku banyak P(x) = x³ - 4x² + ax + b habis dibagi oleh (x² - 3x + 2). Tentukan nilai a dan b, serta hasil bagi pembagian tersebut!',
      pembahasan: 'Langkah 1: Faktorkan pembagi kuadrat ➔ x² - 3x + 2 = (x - 1)(x - 2).\nPembuat nol pembagi adalah x = 1 dan x = 2.\nLangkah 2: Terapkan Teorema Faktor (habis dibagi artinya sisa S = 0):\nUntuk x = 1 ➔ P(1) = 0\n(1)³ - 4(1)² + a(1) + b = 0 ➔ 1 - 4 + a + b = 0 ➔ a + b = 3 ... (Persamaan 1)\n\nUntuk x = 2 ➔ P(2) = 0\n(2)³ - 4(2)² + a(2) + b = 0 ➔ 8 - 16 + 2a + b = 0 ➔ -8 + 2a + b = 0 ➔ 2a + b = 8 ... (Persamaan 2)\n\nLangkah 3: Eliminasi b dari Persamaan 2 dan Persamaan 1:\n(2a + b) - (a + b) = 8 - 3 ➔ a = 5.\nSubstitusi a = 5 ke Persamaan 1 ➔ 5 + b = 3 ➔ b = -2.\nJadi, nilai a = 5 dan b = -2.\nPersamaan polinomial lengkap adalah P(x) = x³ - 4x² + 5x - 2.\nHasil bagi H(x) adalah linear berderajat 1: H(x) = x - 1.'
    },
    tipsBelajar: 'Jika pembaginya berbentuk (ax - b), hasil bagi Horner di baris bawah HARUS dibagi koefisien a terlebih dahulu sebelum dinyatakan sebagai jawaban akhir H(x).',
    formulaOrDiagram: 'Aljabar Polinomial: P(x) = Q(x) · H(x) + S(x) | Sisa = P(k) | Teorema Faktor: P(k) = 0 | Vieta: x1 + x2 + x3 = -b/a',
    glosarium: [
      { istilah: 'Metode Horner', arti: 'Skema algoritma komputasi sintetis untuk mengevaluasi dan membagi polinomial secara efisien menggunakan koefisien numerik.' },
      { istilah: 'Teorema Sisa', arti: 'Teorema aljabar yang menyatakan bahwa sisa pembagian fungsi polinomial P(x) oleh (x - a) tepat sama dengan nilai fungsi P(a).' },
      { istilah: 'Teorema Faktor', arti: 'Kaidah bahwa suatu polinomial P(x) memiliki faktor linear (x - k) jika dan hanya jika P(k) = 0.' }
    ],
    lkpd: {
      judulAktivitas: 'Investigasi Algoritma Horner dalam Pemfaktoran Polinomial Derajat Tiga',
      alatBahan: ['Lembar Kerja Algoritma Horner', 'Grafik Kurva Fungsi Kubik di Geogebra Virtual'],
      langkahKerja: [
        'Diberikan fungsi polinomial kubik P(x) = 2x³ - 5x² - 4x + 3.',
        'Tuliskan daftar seluruh calon akar rasional berdasarkan faktor dari suku konstan 3 dibagi faktor dari koefisien utama 2.',
        'Gunakan skema Horner untuk menguji coba calon akar x = -1, x = 1, x = 3, dan x = 1/2.',
        'Tentukan akar yang menghasilkan sisa 0 (faktor bulat).',
        'Faktorkan P(x) menjadi perkalian tiga suku linear lengkap.'
      ],
      pertanyaanDiskusi: [
        'Mengapa derajat sisa pembagian suatu polinomial selalu lebih kecil daripada derajat suku banyak pembaginya?',
        'Jelaskan bagaimana Teorema Vieta digunakan untuk menyusun persamaan suku banyak jika akar-akarnya diketahui!'
      ]
    },
    konsepKunci: [
      { title: 'Pembagian Horner', desc: 'Skema sintetis cepat pembagian suku banyak berbasis koefisien baris.' },
      { title: 'Teorema Sisa', desc: 'Sisa pembagian P(x) oleh pembagi linear (x - k) tepat bernilai evaluasi P(k).' },
      { title: 'Teorema Faktor', desc: '(x - k) adalah faktor polinomial jika nilai fungsi P(k) = 0 tanpa sisa.' }
    ],
    quizCheck: {
      question: 'Berapakah sisa pembagian suku banyak P(x) = 2x³ - 3x² + 4x - 5 jika dibagi oleh (x - 2)?',
      options: ['3', '5', '7', '9'],
      correctIndex: 2,
      explanation: 'Berdasarkan Teorema Sisa, S = P(2) = 2(2)³ - 3(2)² + 4(2) - 5 = 2(8) - 3(4) + 8 - 5 = 16 - 12 + 8 - 5 = 7.'
    }
  }
};

// =========================================================================
// HELPER TO RESOLVE MODUL AJAR FOR ANY GIVEN SUBJECT OR TOPIC
// =========================================================================
// Register synchronized aliases for Modul Ajar
MOCK_MODUL_AJAR['Kimia Peminatan'] = MOCK_MODUL_AJAR['Kimia Analitik'];
MOCK_MODUL_AJAR['Biologi Peminatan'] = MOCK_MODUL_AJAR['Biologi Sel'];
MOCK_MODUL_AJAR['Matematika Tingkat Lanjut'] = MOCK_MODUL_AJAR['Matematika Peminatan'];
MOCK_MODUL_AJAR['Projek Penguatan Profil Pelajar Pancasila (P5)'] = MOCK_MODUL_AJAR['Projek Penguatan P5'];

// =========================================================================
// HELPER TO RESOLVE MODUL AJAR FOR ANY GIVEN SUBJECT OR TOPIC
// =========================================================================
export const resolveModulAjar = (subjectName: string): ModulAjarData => {
  if (!subjectName) return MOCK_MODUL_AJAR['Bahasa Indonesia'];
  
  if (MOCK_MODUL_AJAR[subjectName]) {
    return MOCK_MODUL_AJAR[subjectName];
  }

  const s = subjectName.toLowerCase();
  
  // Specific specialized topics first (prioritized before general subjects)
  if (s.includes('termodinamika') || s.includes('kalor') || s.includes('carnot')) {
    return MOCK_MODUL_AJAR['Termodinamika & Kalor'];
  }
  if (s.includes('termokimia') || s.includes('entalpi') || s.includes('hess') || s.includes('eksoterm')) {
    return MOCK_MODUL_AJAR['Termokimia & Entalpi'];
  }
  if (s.includes('transpor') || s.includes('membran') || s.includes('osmosis') || s.includes('plasmolisis') || s.includes('fosfolipid')) {
    return MOCK_MODUL_AJAR['Struktur Sel & Transpor Membran'];
  }
  if (s.includes('polinomial') || s.includes('suku banyak') || s.includes('horner') || s.includes('vieta')) {
    return MOCK_MODUL_AJAR['Polinomial & Suku Banyak'];
  }

  // Specific course keyword mapping
  if (s.includes('kimia')) return MOCK_MODUL_AJAR['Kimia Peminatan'] || MOCK_MODUL_AJAR['Kimia Analitik'];
  if (s.includes('fisika')) return MOCK_MODUL_AJAR['Fisika Peminatan'];
  if (s.includes('biologi')) return MOCK_MODUL_AJAR['Biologi Peminatan'] || MOCK_MODUL_AJAR['Biologi Sel'];
  if (s.includes('matematika tingkat lanjut') || s.includes('matematika peminatan') || s.includes('kalkulus')) {
    return MOCK_MODUL_AJAR['Matematika Tingkat Lanjut'] || MOCK_MODUL_AJAR['Matematika Peminatan'];
  }
  if (s.includes('matematika wajib') || s.includes('matematika umum')) {
    return MOCK_MODUL_AJAR['Matematika Wajib'];
  }
  if (s.includes('matematika')) {
    return MOCK_MODUL_AJAR['Matematika Tingkat Lanjut'] || MOCK_MODUL_AJAR['Matematika Peminatan'];
  }
  if (s.includes('agama') || s.includes('islam') || s.includes('fiqih') || s.includes('muamalah') || s.includes('budi pekerti')) {
    return MOCK_MODUL_AJAR['Pendidikan Agama & Budi Pekerti'];
  }
  if (s.includes('sosiologi')) return MOCK_MODUL_AJAR['Sosiologi'];
  if (s.includes('sejarah')) return MOCK_MODUL_AJAR['Sejarah Indonesia'];
  if (s.includes('ekonomi')) return MOCK_MODUL_AJAR['Ekonomi'];
  if (s.includes('geografi')) return MOCK_MODUL_AJAR['Geografi'];
  if (s.includes('antropologi')) return MOCK_MODUL_AJAR['Antropologi'];
  if (s.includes('inggris') || s.includes('english')) return MOCK_MODUL_AJAR['Bahasa Inggris'];
  if (s.includes('pancasila') || s.includes('ppkn') || s.includes('konstitusi') || s.includes('hukum')) return MOCK_MODUL_AJAR['Pendidikan Pancasila'];
  if (s.includes('pjok') || s.includes('olahraga') || s.includes('kebugaran') || s.includes('jasmani') || s.includes('senam')) return MOCK_MODUL_AJAR['PJOK'];
  if (s.includes('seni') || s.includes('budaya') || s.includes('rupa') || s.includes('musik')) return MOCK_MODUL_AJAR['Pendidikan Seni & Budaya'];
  if (s.includes('bk') || s.includes('bimbingan') || s.includes('konseling') || s.includes('karier') || s.includes('ptn') || s.includes('wali kelas')) return MOCK_MODUL_AJAR['Bimbingan Konseling (BK)'];
  if (s.includes('p5') || s.includes('projek') || s.includes('profil pelajar') || s.includes('fasilitator')) return MOCK_MODUL_AJAR['Projek Penguatan Profil Pelajar Pancasila (P5)'] || MOCK_MODUL_AJAR['Projek Penguatan P5'];
  if (s.includes('riset') || s.includes('ilmiah') || s.includes('penelitian') || s.includes('kir')) return MOCK_MODUL_AJAR['Riset Sosial & Literasi Ilmiah'];
  if (s.includes('jurnalistik') || s.includes('esai') || s.includes('debat') || s.includes('bahasa') || s.includes('mgmp')) return MOCK_MODUL_AJAR['Bahasa Indonesia'];
  if (s.includes('lab') || s.includes('laboratorium') || s.includes('praktikum')) return MOCK_MODUL_AJAR['Kimia Peminatan'];
  if (s.includes('upacara') || s.includes('rohani') || s.includes('pembiasaan')) return MOCK_MODUL_AJAR['Pendidikan Pancasila'];
  
  // Fuzzy match with existing keys
  const keys = Object.keys(MOCK_MODUL_AJAR);
  const match = keys.find(k => s.includes(k.toLowerCase()) || k.toLowerCase().includes(s));
  if (match) return MOCK_MODUL_AJAR[match];
  
  return MOCK_MODUL_AJAR['Bahasa Indonesia'];
};

// =========================================================================
// BASIS DATA MATA PELAJARAN TERPUSAT (CENTRAL SUBJECT DATABASE)
// SMAN 25 JAKARTA - KURIKULUM MERDEKA FASE F (KELAS XI MIPA 1 & XI MIPA 2)
// Total 44 Jam Pelajaran (JP) / Minggu
// =========================================================================
export interface CentralSubject {
  id: string;
  courseId: string;
  name: string;
  topic: string;
  category: 'Peminatan MIPA' | 'Mata Pelajaran Wajib' | 'Pengembangan & P5';
  teacher: string;
  room: string;
  jpWeekly: number;
  description: string;
}

export const CENTRAL_SUBJECT_DATABASE: CentralSubject[] = [
  {
    id: 'sub_fisika',
    courseId: 'course_fisika',
    name: 'Fisika Peminatan',
    topic: 'Hukum Newton & Dinamika Gerak',
    category: 'Peminatan MIPA',
    teacher: 'Ir. Ahmad Zulkarnain, S.Pd',
    room: 'Lab Fisika Dasar / R.204',
    jpWeekly: 5,
    description: 'Analisis gaya normal, gaya gesek statis/kinetis, dan gerak lurus berubah beraturan pada bidang miring serta katrol ganda.'
  },
  {
    id: 'sub_kimia',
    courseId: 'course_kimia',
    name: 'Kimia Peminatan',
    topic: 'Titrasi Asam Basa & pH Larutan',
    category: 'Peminatan MIPA',
    teacher: 'Drs. Bambang Sudarsono, M.Si',
    room: 'Lab Kimia Terpadu / R.204',
    jpWeekly: 5,
    description: 'Eksplorasi reaksi netralisasi asam basa, stoikiometri larutan, kurva titrasi, dan indikator fenolftalein secara interaktif.'
  },
  {
    id: 'sub_bio',
    courseId: 'course_bio',
    name: 'Biologi Peminatan',
    topic: 'Metabolisme Sel & Pola Pewarisan Sifat',
    category: 'Peminatan MIPA',
    teacher: 'Ibu Endang Suryani, M.Si',
    room: 'Lab Biologi Lt. 2 / R.204',
    jpWeekly: 5,
    description: 'Studi mendalam mengenai katabolisme karbohidrat, siklus Krebs, fosforilasi oksidatif, dan hukum pewarisan sifat Mendel.'
  },
  {
    id: 'sub_mat_pem',
    courseId: 'course_mat_pem',
    name: 'Matematika Tingkat Lanjut',
    topic: 'Kalkulus Lanjut & Polinomial',
    category: 'Peminatan MIPA',
    teacher: 'Ibu Ratna Dewi, S.Pd',
    room: 'Ruang R.204',
    jpWeekly: 5,
    description: 'Penguasaan turunan fungsi trigonometri, aturan rantai, garis singgung kurva, teorema sisa polinomial, dan persamaan lingkaran.'
  },
  {
    id: 'sub_mat_wajib',
    courseId: 'course_mat_wajib',
    name: 'Matematika Wajib',
    topic: 'Transformasi Geometri & Statistika Data Kelompok',
    category: 'Mata Pelajaran Wajib',
    teacher: 'Ibu Ratna Dewi, S.Pd',
    room: 'Ruang R.204',
    jpWeekly: 3,
    description: 'Transformasi geometri matriks 2x2 serta ukuran pemusatan dan penyebaran data kelompok.'
  },
  {
    id: 'sub_bindo',
    courseId: 'course_bindo',
    name: 'Bahasa Indonesia',
    topic: 'Teks Argumentasi & Kritik Sastra',
    category: 'Mata Pelajaran Wajib',
    teacher: 'Ibu Dra. Sri Wahyuni, M.Pd',
    room: 'Ruang R.204',
    jpWeekly: 3,
    description: 'Menulis teks argumentasi logis berdasarkan data empiris, kaidah kalimat efektif PUEBI, dan teknik debat ilmiah.'
  },
  {
    id: 'sub_bing',
    courseId: 'course_bing',
    name: 'Bahasa Inggris',
    topic: 'Analytical Exposition & Academic Debating',
    category: 'Mata Pelajaran Wajib',
    teacher: 'Mr. David Siregar, M.Ed',
    room: 'Lab Bahasa / R.204',
    jpWeekly: 2,
    description: 'Composing analytical exposition texts, expressing arguments coherently with empirical evidence and rhetorical devices.'
  },
  {
    id: 'sub_agama',
    courseId: 'course_agama',
    name: 'Pendidikan Agama & Budi Pekerti',
    topic: 'Fiqih Muamalah & Karakter Mulia',
    category: 'Mata Pelajaran Wajib',
    teacher: 'Ust. H. Syarifuddin, M.Ag',
    room: 'Ruang R.204',
    jpWeekly: 3,
    description: 'Kaidah fiqih transaksi ekonomi syariah, adab bermuamalah modern, moderasi beragama, dan akhlak karimah.'
  },
  {
    id: 'sub_ppkn',
    courseId: 'course_ppkn',
    name: 'Pendidikan Pancasila',
    topic: 'Supremasi Hukum & Konstitusi UUD 1945',
    category: 'Mata Pelajaran Wajib',
    teacher: 'Ibu Siti Aminah, S.Pd',
    room: 'Ruang R.204',
    jpWeekly: 2,
    description: 'Hierarki perundang-undangan di Indonesia, penegakan hak asasi manusia, integrasi nasional, dan etika kebangsaan.'
  },
  {
    id: 'sub_sejarah',
    courseId: 'course_sejarah',
    name: 'Sejarah Indonesia',
    topic: 'Kebangkitan Nasional 1928 & Pergerakan Modern',
    category: 'Mata Pelajaran Wajib',
    teacher: 'Drs. Hendro Wibowo, M.Hum',
    room: 'Ruang R.204',
    jpWeekly: 2,
    description: 'Kelahiran organisasi modern bumiputera Budi Utomo, Sarekat Islam, dan ikrar persatuan Sumpah Pemuda 1928.'
  },
  {
    id: 'sub_seni',
    courseId: 'course_seni',
    name: 'Pendidikan Seni & Budaya',
    topic: 'Prinsip Rupa Desain & Musik Nusantara',
    category: 'Mata Pelajaran Wajib',
    teacher: 'Ibu Maya Lestari, S.Sn',
    room: 'Sanggar Seni & Desain',
    jpWeekly: 2,
    description: 'Eksplorasi prinsip desain seni rupa murni dua dimensi, teknik kolase media campuran, dan apresiasi tangga nada gamelan.'
  },
  {
    id: 'sub_pjok',
    courseId: 'course_pjok',
    name: 'PJOK',
    topic: 'Kebugaran Jasmani & Sirkuit Latihan Atletik',
    category: 'Mata Pelajaran Wajib',
    teacher: 'Wahyu Hidayat, S.Pd',
    room: 'GOR SMAN 25 & Lapangan Olahraga',
    jpWeekly: 3,
    description: 'Analisis derajat kebugaran jasmani, pengukuran denyut nadi Target Heart Rate, dan latihan sirkuit kekuatan otot.'
  },
  {
    id: 'sub_bk',
    courseId: 'course_bk',
    name: 'Bimbingan Konseling (BK)',
    topic: 'Perencanaan Karier & Peta Jalan PTN SNBP/SNBT',
    category: 'Pengembangan & P5',
    teacher: 'Drs. M. Taufik, M.Psi',
    room: 'Ruang BK / R.204',
    jpWeekly: 1,
    description: 'Pemetaan minat bakat RIASEC, strategi seleksi masuk Perguruan Tinggi Negeri, dan manajemen efikasi belajar.'
  },
  {
    id: 'sub_p5',
    courseId: 'course_p5',
    name: 'Projek Penguatan Profil Pelajar Pancasila (P5)',
    topic: 'Gaya Hidup Berkelanjutan & Ekosistem Sekolah',
    category: 'Pengembangan & P5',
    teacher: 'Tim Fasilitator P5',
    room: 'Aula Sekolah & Lab Lingkungan',
    jpWeekly: 2,
    description: 'Inovasi komposter sampah organik, audit jejak karbon sekolah, dan pameran gelar karya terpadu.'
  }
];

// Helper to look up courseId by synchronized subject name
export const getCourseIdBySubjectName = (subjectName: string): string => {
  const match = CENTRAL_SUBJECT_DATABASE.find(
    (item) => item.name.toLowerCase() === subjectName.toLowerCase()
  );
  if (match) return match.courseId;
  const s = subjectName.toLowerCase();
  if (s.includes('kimia')) return 'course_kimia';
  if (s.includes('fisika')) return 'course_fisika';
  if (s.includes('biologi')) return 'course_bio';
  if (s.includes('tingkat lanjut') || (s.includes('matematika') && s.includes('peminatan'))) return 'course_mat_pem';
  if (s.includes('matematika wajib') || s.includes('matematika umum')) return 'course_mat_wajib';
  if (s.includes('bahasa indonesia')) return 'course_bindo';
  if (s.includes('bahasa inggris')) return 'course_bing';
  if (s.includes('agama')) return 'course_agama';
  if (s.includes('pancasila') || s.includes('ppkn')) return 'course_ppkn';
  if (s.includes('sejarah')) return 'course_sejarah';
  if (s.includes('seni')) return 'course_seni';
  if (s.includes('pjok') || s.includes('olahraga')) return 'course_pjok';
  if (s.includes('bk') || s.includes('konseling')) return 'course_bk';
  if (s.includes('p5') || s.includes('projek')) return 'course_p5';
  return 'course_kimia';
};

// =========================================================================
// SCHEDULES PER ROLE (MIPA, IPS, GURU) - STANDAR KURIKULUM MERDEKA FASE F
// 44 JP PER MINGGU (1 JP = 45 MENIT)
// =========================================================================
const BASE_MIPA_SCHEDULE_SENIN_TO_JUMAT: ScheduleItem[] = [
  // Senin (Total 9 JP + Upacara + 2x Istirahat)
  { id: 'sch_m_sen_0', day: 'Senin', time: '06.45 - 07.30', subject: 'Upacara Bendera & Pembiasaan Disiplin', teacher: 'Tim Kesiswaan SMAN 25', room: 'Lapangan Utama', status: 'Selesai', jp: 1, periodRange: 'Pembiasaan', category: 'Pembiasaan & Istirahat' },
  { id: 'sch_m_sen_1', day: 'Senin', time: '07.30 - 09.00', subject: 'Fisika Peminatan', teacher: 'Ir. Ahmad Zulkarnain, S.Pd', room: 'Ruang R.204 / Lab Fisika', status: 'Selesai', jp: 2, periodRange: 'Jam Ke-1 s.d. 2', category: 'Peminatan MIPA' },
  { id: 'sch_m_sen_2', day: 'Senin', time: '09.00 - 10.30', subject: 'Bahasa Indonesia', teacher: 'Ibu Dra. Sri Wahyuni, M.Pd', room: 'Ruang R.204', status: 'Berlangsung', jp: 2, periodRange: 'Jam Ke-3 s.d. 4', category: 'Mata Pelajaran Wajib' },
  { id: 'sch_m_sen_break1', day: 'Senin', time: '10.30 - 10.50', subject: 'Istirahat I & Kudapan Sehat', teacher: 'Piket Harian', room: 'Kantin Sehat & Halaman', status: 'Akan Datang', isBreak: true, periodRange: '20 Menit', category: 'Pembiasaan & Istirahat' },
  { id: 'sch_m_sen_3', day: 'Senin', time: '10.50 - 11.35', subject: 'Bahasa Indonesia', teacher: 'Ibu Dra. Sri Wahyuni, M.Pd', room: 'Ruang R.204', status: 'Akan Datang', jp: 1, periodRange: 'Jam Ke-5', category: 'Mata Pelajaran Wajib' },
  { id: 'sch_m_sen_4', day: 'Senin', time: '11.35 - 12.20', subject: 'Matematika Tingkat Lanjut', teacher: 'Ibu Ratna Dewi, S.Pd', room: 'Ruang R.204', status: 'Akan Datang', jp: 1, periodRange: 'Jam Ke-6', category: 'Peminatan MIPA' },
  { id: 'sch_m_sen_break2', day: 'Senin', time: '12.20 - 13.05', subject: 'Istirahat II / ISHOMA (Sholat Dzuhur & Makan Siang)', teacher: 'Guru Pendamping', room: 'Masjid Al-Ikhlas & Kantin', status: 'Akan Datang', isBreak: true, periodRange: '45 Menit', category: 'Pembiasaan & Istirahat' },
  { id: 'sch_m_sen_5', day: 'Senin', time: '13.05 - 14.35', subject: 'Matematika Tingkat Lanjut', teacher: 'Ibu Ratna Dewi, S.Pd', room: 'Ruang R.204', status: 'Akan Datang', jp: 2, periodRange: 'Jam Ke-7 s.d. 8', category: 'Peminatan MIPA' },
  { id: 'sch_m_sen_6', day: 'Senin', time: '14.35 - 15.05', subject: 'Refleksi Pembelajaran & Literasi Mandiri', teacher: 'Wali Kelas XI MIPA 1', room: 'Ruang R.204', status: 'Akan Datang', jp: 1, periodRange: 'Jam Ke-9', category: 'Pembiasaan & Istirahat' },

  // Selasa (Total 9 JP: Kimia Peminatan 3 JP, Biologi Peminatan 2 JP, BK 1 JP, Matematika Wajib 3 JP)
  { id: 'sch_m_sel_0', day: 'Selasa', time: '06.45 - 07.15', subject: 'Literasi Sains & Numerasi Pagi', teacher: 'Wali Kelas XI MIPA 1', room: 'Ruang R.204', status: 'Akan Datang', periodRange: 'Pembiasaan', category: 'Pembiasaan & Istirahat' },
  { id: 'sch_m_sel_1', day: 'Selasa', time: '07.15 - 09.30', subject: 'Kimia Peminatan', teacher: 'Drs. Bambang Sudarsono, M.Si', room: 'Ruang R.204 / Lab Kimia', status: 'Akan Datang', jp: 3, periodRange: 'Jam Ke-1 s.d. 3', category: 'Peminatan MIPA' },
  { id: 'sch_m_sel_break1', day: 'Selasa', time: '09.30 - 09.50', subject: 'Istirahat I & Relaksasi', teacher: 'Piket Harian', room: 'Kantin Sehat & Halaman', status: 'Akan Datang', isBreak: true, periodRange: '20 Menit', category: 'Pembiasaan & Istirahat' },
  { id: 'sch_m_sel_2', day: 'Selasa', time: '09.50 - 11.20', subject: 'Biologi Peminatan', teacher: 'Ibu Endang Suryani, M.Si', room: 'Lab Biologi', status: 'Akan Datang', jp: 2, periodRange: 'Jam Ke-4 s.d. 5', category: 'Peminatan MIPA' },
  { id: 'sch_m_sel_3', day: 'Selasa', time: '11.20 - 12.05', subject: 'Layanan Bimbingan Konseling (BK)', teacher: 'Drs. M. Taufik, M.Psi', room: 'Ruang BK / R.204', status: 'Akan Datang', jp: 1, periodRange: 'Jam Ke-6', category: 'Bimbingan Konseling (BK)' },
  { id: 'sch_m_sel_break2', day: 'Selasa', time: '12.05 - 12.50', subject: 'Istirahat II / ISHOMA (Sholat Dzuhur Berjamaah)', teacher: 'Guru Pendamping', room: 'Masjid Al-Ikhlas & Kantin', status: 'Akan Datang', isBreak: true, periodRange: '45 Menit', category: 'Pembiasaan & Istirahat' },
  { id: 'sch_m_sel_4', day: 'Selasa', time: '12.50 - 15.05', subject: 'Matematika Wajib', teacher: 'Ibu Ratna Dewi, S.Pd', room: 'Ruang R.204', status: 'Akan Datang', jp: 3, periodRange: 'Jam Ke-7 s.d. 9', category: 'Mata Pelajaran Wajib' },

  // Rabu (Total 9 JP: Biologi Peminatan 3 JP Praktikum, Matematika Tingkat Lanjut 2 JP, Bahasa Inggris 2 JP, Agama 2 JP)
  { id: 'sch_m_rab_0', day: 'Rabu', time: '06.45 - 07.15', subject: 'Pembiasaan Karakter & Tadarus / Renungan Pagi', teacher: 'Pembina Rohis/Rohkris', room: 'Ruang R.204', status: 'Akan Datang', periodRange: 'Pembiasaan', category: 'Pembiasaan & Istirahat' },
  { id: 'sch_m_rab_1', day: 'Rabu', time: '07.15 - 09.30', subject: 'Biologi Peminatan', teacher: 'Ibu Endang Suryani, M.Si', room: 'Lab Biologi Lt. 2', status: 'Akan Datang', jp: 3, periodRange: 'Jam Ke-1 s.d. 3', category: 'Peminatan MIPA' },
  { id: 'sch_m_rab_break1', day: 'Rabu', time: '09.30 - 09.50', subject: 'Istirahat I & Kudapan Sehat', teacher: 'Piket Harian', room: 'Kantin Sehat & Halaman', status: 'Akan Datang', isBreak: true, periodRange: '20 Menit', category: 'Pembiasaan & Istirahat' },
  { id: 'sch_m_rab_2', day: 'Rabu', time: '09.50 - 11.20', subject: 'Matematika Tingkat Lanjut', teacher: 'Ibu Ratna Dewi, S.Pd', room: 'Ruang R.204', status: 'Akan Datang', jp: 2, periodRange: 'Jam Ke-4 s.d. 5', category: 'Peminatan MIPA' },
  { id: 'sch_m_rab_3', day: 'Rabu', time: '11.20 - 12.05', subject: 'Bahasa Inggris', teacher: 'Mr. David Siregar, M.Ed', room: 'Lab Bahasa', status: 'Akan Datang', jp: 1, periodRange: 'Jam Ke-6', category: 'Mata Pelajaran Wajib' },
  { id: 'sch_m_rab_break2', day: 'Rabu', time: '12.05 - 12.50', subject: 'Istirahat II / ISHOMA (Sholat Dzuhur & Makan Siang)', teacher: 'Guru Pendamping', room: 'Masjid Al-Ikhlas & Kantin', status: 'Akan Datang', isBreak: true, periodRange: '45 Menit', category: 'Pembiasaan & Istirahat' },
  { id: 'sch_m_rab_4', day: 'Rabu', time: '12.50 - 13.35', subject: 'Bahasa Inggris', teacher: 'Mr. David Siregar, M.Ed', room: 'Lab Bahasa', status: 'Akan Datang', jp: 1, periodRange: 'Jam Ke-7', category: 'Mata Pelajaran Wajib' },
  { id: 'sch_m_rab_5', day: 'Rabu', time: '13.35 - 15.05', subject: 'Pendidikan Agama & Budi Pekerti', teacher: 'Ust. H. Syarifuddin, M.Ag', room: 'Ruang R.204', status: 'Akan Datang', jp: 2, periodRange: 'Jam Ke-8 s.d. 9', category: 'Mata Pelajaran Wajib' },

  // Kamis (Total 9 JP: Fisika Peminatan 3 JP Praktikum, Kimia Peminatan 2 JP Praktikum, Agama 1 JP, Sejarah 2 JP, Seni Budaya 1 JP)
  { id: 'sch_m_kam_0', day: 'Kamis', time: '06.45 - 07.15', subject: 'English Morning Habit & Literasi Global', teacher: 'Guru Bahasa Inggris', room: 'Ruang R.204', status: 'Akan Datang', periodRange: 'Pembiasaan', category: 'Pembiasaan & Istirahat' },
  { id: 'sch_m_kam_1', day: 'Kamis', time: '07.15 - 09.30', subject: 'Fisika Peminatan', teacher: 'Ir. Ahmad Zulkarnain, S.Pd', room: 'Lab Fisika Dasar', status: 'Akan Datang', jp: 3, periodRange: 'Jam Ke-1 s.d. 3', category: 'Peminatan MIPA' },
  { id: 'sch_m_kam_break1', day: 'Kamis', time: '09.30 - 09.50', subject: 'Istirahat I & Relaksasi', teacher: 'Piket Harian', room: 'Kantin Sehat & Halaman', status: 'Akan Datang', isBreak: true, periodRange: '20 Menit', category: 'Pembiasaan & Istirahat' },
  { id: 'sch_m_kam_2', day: 'Kamis', time: '09.50 - 11.20', subject: 'Kimia Peminatan', teacher: 'Drs. Bambang Sudarsono, M.Si', room: 'Lab Kimia Analitik', status: 'Akan Datang', jp: 2, periodRange: 'Jam Ke-4 s.d. 5', category: 'Peminatan MIPA' },
  { id: 'sch_m_kam_3', day: 'Kamis', time: '11.20 - 12.05', subject: 'Pendidikan Agama & Budi Pekerti', teacher: 'Ust. H. Syarifuddin, M.Ag', room: 'Ruang R.204', status: 'Akan Datang', jp: 1, periodRange: 'Jam Ke-6', category: 'Mata Pelajaran Wajib' },
  { id: 'sch_m_kam_break2', day: 'Kamis', time: '12.05 - 12.50', subject: 'Istirahat II / ISHOMA (Sholat Dzuhur & Makan Siang)', teacher: 'Guru Pendamping', room: 'Masjid Al-Ikhlas & Kantin', status: 'Akan Datang', isBreak: true, periodRange: '45 Menit', category: 'Pembiasaan & Istirahat' },
  { id: 'sch_m_kam_4', day: 'Kamis', time: '12.50 - 14.20', subject: 'Sejarah Indonesia', teacher: 'Drs. Hendro Wibowo, M.Hum', room: 'Ruang R.204', status: 'Akan Datang', jp: 2, periodRange: 'Jam Ke-7 s.d. 8', category: 'Mata Pelajaran Wajib' },
  { id: 'sch_m_kam_5', day: 'Kamis', time: '14.20 - 15.05', subject: 'Pendidikan Seni & Budaya', teacher: 'Ibu Maya Lestari, S.Sn', room: 'Sanggar Seni & Desain', status: 'Akan Datang', jp: 1, periodRange: 'Jam Ke-9', category: 'Mata Pelajaran Wajib' },

  // Jumat (Total 8 JP: SKJ 1 JP, PJOK 3 JP, Pendidikan Pancasila 2 JP, P5 2 JP, Seni Budaya 1 JP)
  { id: 'sch_m_jum_0', day: 'Jumat', time: '06.45 - 07.30', subject: 'Senam Kesegaran Jasmani (SKJ) & Pembiasaan Sehat', teacher: 'Tim PJOK & Kesiswaan', room: 'Lapangan Utama', status: 'Akan Datang', jp: 1, periodRange: 'Pembiasaan', category: 'Pembiasaan & Istirahat' },
  { id: 'sch_m_jum_1', day: 'Jumat', time: '07.30 - 09.45', subject: 'PJOK', teacher: 'Wahyu Hidayat, S.Pd', room: 'GOR SMAN 25 & Lapangan Olahraga', status: 'Akan Datang', jp: 3, periodRange: 'Jam Ke-1 s.d. 3', category: 'Mata Pelajaran Wajib' },
  { id: 'sch_m_jum_break1', day: 'Jumat', time: '09.45 - 10.05', subject: 'Istirahat I & Pemulihan Hidrasi', teacher: 'Piket Harian', room: 'Kantin & Halaman', status: 'Akan Datang', isBreak: true, periodRange: '20 Menit', category: 'Pembiasaan & Istirahat' },
  { id: 'sch_m_jum_2', day: 'Jumat', time: '10.05 - 11.35', subject: 'Pendidikan Pancasila', teacher: 'Ibu Siti Aminah, S.Pd', room: 'Ruang R.204', status: 'Akan Datang', jp: 2, periodRange: 'Jam Ke-4 s.d. 5', category: 'Mata Pelajaran Wajib' },
  { id: 'sch_m_jum_break2', day: 'Jumat', time: '11.35 - 13.00', subject: 'ISHOMA Sholat Jumat Berjamaah & Keputrian', teacher: 'Guru Pendamping & DKM', room: 'Masjid Al-Ikhlas & Aula', status: 'Akan Datang', isBreak: true, periodRange: '85 Menit', category: 'Pembiasaan & Istirahat' },
  { id: 'sch_m_jum_3', day: 'Jumat', time: '13.00 - 14.30', subject: 'Projek Penguatan Profil Pelajar Pancasila (P5)', teacher: 'Tim Fasilitator P5', room: 'Aula Sekolah & Lab Lingkungan', status: 'Akan Datang', jp: 2, periodRange: 'Jam Ke-6 s.d. 7', category: 'Projek Penguatan P5' },
  { id: 'sch_m_jum_4', day: 'Jumat', time: '14.30 - 15.15', subject: 'Pendidikan Seni & Budaya', teacher: 'Ibu Maya Lestari, S.Sn', room: 'Sanggar Seni & Desain', status: 'Akan Datang', jp: 1, periodRange: 'Jam Ke-8', category: 'Mata Pelajaran Wajib' },
];

export const MOCK_SCHEDULE_BY_ROLE: Record<string, ScheduleItem[]> = {
  siswa_mipa: BASE_MIPA_SCHEDULE_SENIN_TO_JUMAT,
  siswa_mipa_1: BASE_MIPA_SCHEDULE_SENIN_TO_JUMAT.map((item) => ({
    ...item,
    id: item.id.replace('sch_m_', 'sch_m1_'),
    room: item.room.includes('R.204') ? item.room : item.room.replace('Ruang R.', 'Ruang R.204')
  })),
  siswa_mipa_2: BASE_MIPA_SCHEDULE_SENIN_TO_JUMAT.map((item) => ({
    ...item,
    id: item.id.replace('sch_m_', 'sch_m2_'),
    room: item.room.replace('R.204', 'R.205')
  })),

  siswa_ips: [
    // Senin
    { id: 'sch_s_sen_1', day: 'Senin', time: '07.00 - 08.00', subject: 'Upacara Bendera & Pembiasaan', teacher: 'Tim Kesiswaan SMAN 25', room: 'Lapangan Utama', status: 'Selesai' },
    { id: 'sch_s_sen_2', day: 'Senin', time: '08.00 - 09.30', subject: 'Bahasa Indonesia', teacher: 'Ibu Dra. Sri Wahyuni, M.Pd', room: 'Ruang R.102', status: 'Selesai' },
    { id: 'sch_s_sen_3', day: 'Senin', time: '09.45 - 11.15', subject: 'Sosiologi', teacher: 'Drs. Agus Budiman, M.Pd', room: 'Ruang R.102', status: 'Berlangsung' },
    { id: 'sch_s_sen_4', day: 'Senin', time: '11.15 - 12.45', subject: 'Sejarah Indonesia', teacher: 'Drs. Hendro Wibowo, M.Hum', room: 'Ruang R.102', status: 'Akan Datang' },
    { id: 'sch_s_sen_5', day: 'Senin', time: '13.30 - 15.00', subject: 'Ekonomi', teacher: 'Dra. Nurhayati, M.M.', room: 'Ruang R.102', status: 'Akan Datang' },
    // Selasa
    { id: 'sch_s_sel_1', day: 'Selasa', time: '07.00 - 08.30', subject: 'Geografi', teacher: 'Dra. Ratnaningsih, M.Pd', room: 'Ruang R.102', status: 'Akan Datang' },
    { id: 'sch_s_sel_2', day: 'Selasa', time: '08.30 - 10.00', subject: 'Sosiologi', teacher: 'Drs. Agus Budiman, M.Pd', room: 'Ruang R.102', status: 'Akan Datang' },
    { id: 'sch_s_sel_2b', day: 'Selasa', time: '10.15 - 11.45', subject: 'Bahasa Inggris', teacher: 'Mr. David Siregar, M.Ed', room: 'Ruang R.102', status: 'Akan Datang' },
    { id: 'sch_s_sel_3', day: 'Selasa', time: '12.30 - 14.00', subject: 'Pendidikan Pancasila', teacher: 'Ibu Siti Aminah, S.Pd', room: 'Ruang R.102', status: 'Akan Datang' },
    { id: 'sch_s_sel_4', day: 'Selasa', time: '14.00 - 15.00', subject: 'Bimbingan Konseling (BK)', teacher: 'Drs. M. Taufik, M.Psi', room: 'Ruang BK', status: 'Akan Datang' },
    // Rabu
    { id: 'sch_s_rab_1', day: 'Rabu', time: '07.00 - 08.30', subject: 'Sejarah Indonesia', teacher: 'Drs. Hendro Wibowo, M.Hum', room: 'Ruang Multimedia', status: 'Akan Datang' },
    { id: 'sch_s_rab_2', day: 'Rabu', time: '08.30 - 10.00', subject: 'Ekonomi', teacher: 'Dra. Nurhayati, M.M.', room: 'Ruang R.102', status: 'Akan Datang' },
    { id: 'sch_s_rab_3', day: 'Rabu', time: '10.15 - 11.45', subject: 'Bahasa Indonesia', teacher: 'Ibu Dra. Sri Wahyuni, M.Pd', room: 'Ruang R.102', status: 'Akan Datang' },
    { id: 'sch_s_rab_4', day: 'Rabu', time: '12.30 - 14.00', subject: 'Antropologi', teacher: 'Bambang Prakoso, S.Sos', room: 'Ruang R.102', status: 'Akan Datang' },
    { id: 'sch_s_rab_5', day: 'Rabu', time: '14.00 - 15.00', subject: 'Projek Penguatan P5', teacher: 'Fasilitator Kurikulum', room: 'Aula Sekolah', status: 'Akan Datang' },
    // Kamis
    { id: 'sch_s_kam_1', day: 'Kamis', time: '07.00 - 08.30', subject: 'Geografi', teacher: 'Dra. Ratnaningsih, M.Pd', room: 'Ruang R.102', status: 'Akan Datang' },
    { id: 'sch_s_kam_2', day: 'Kamis', time: '08.30 - 10.00', subject: 'Bahasa Inggris', teacher: 'Mr. David Siregar, M.Ed', room: 'Ruang R.102', status: 'Akan Datang' },
    { id: 'sch_s_kam_3', day: 'Kamis', time: '10.15 - 11.45', subject: 'Ekonomi', teacher: 'Dra. Nurhayati, M.M.', room: 'Ruang R.102', status: 'Akan Datang' },
    { id: 'sch_s_kam_4', day: 'Kamis', time: '12.30 - 14.00', subject: 'Sejarah Indonesia', teacher: 'Drs. Hendro Wibowo, M.Hum', room: 'Ruang R.102', status: 'Akan Datang' },
    { id: 'sch_s_kam_5', day: 'Kamis', time: '14.00 - 15.00', subject: 'Pendidikan Seni & Budaya', teacher: 'Ibu Maya Lestari, S.Sn', room: 'Sanggar Seni', status: 'Akan Datang' },
    // Jumat
    { id: 'sch_s_jum_1', day: 'Jumat', time: '06.45 - 07.45', subject: 'Senam Pagi & Pembiasaan Rohani', teacher: 'Pembina Rohis/Rohkris', room: 'Lapangan Utama', status: 'Akan Datang' },
    { id: 'sch_s_jum_2', day: 'Jumat', time: '07.45 - 09.30', subject: 'PJOK', teacher: 'Wahyu Hidayat, S.Pd', room: 'GOR SMAN 25', status: 'Akan Datang' },
    { id: 'sch_s_jum_3', day: 'Jumat', time: '09.45 - 11.15', subject: 'Pendidikan Pancasila', teacher: 'Ibu Siti Aminah, S.Pd', room: 'Ruang R.102', status: 'Akan Datang' },
    { id: 'sch_s_jum_4', day: 'Jumat', time: '13.00 - 14.30', subject: 'Riset Sosial & Literasi Ilmiah', teacher: 'Tim Pengajar IPS', room: 'Perpustakaan SMAN 25', status: 'Akan Datang' },
  ],

  guru: [
    // Senin
    { id: 'sch_g_sen_1', day: 'Senin', time: '07.00 - 08.00', subject: 'Upacara Bendera (Pembina Guru)', teacher: 'Dra. Sri Wahyuni, M.Pd', room: 'Lapangan Utama', status: 'Selesai' },
    { id: 'sch_g_sen_2', day: 'Senin', time: '08.00 - 09.30', subject: 'Mengajar Bahasa Indonesia (11 MIPA 2)', teacher: 'Dra. Sri Wahyuni, M.Pd', room: 'Ruang R.204', status: 'Selesai' },
    { id: 'sch_g_sen_3', day: 'Senin', time: '09.45 - 11.15', subject: 'Koordinasi MGMP Bahasa Indonesia', teacher: 'Tim Guru Rumpun Bahasa', room: 'Ruang Guru Utama', status: 'Berlangsung' },
    { id: 'sch_g_sen_4', day: 'Senin', time: '11.15 - 12.45', subject: 'Mengajar Bahasa Indonesia (11 IPS 1)', teacher: 'Dra. Sri Wahyuni, M.Pd', room: 'Ruang R.102', status: 'Akan Datang' },
    { id: 'sch_g_sen_5', day: 'Senin', time: '13.30 - 15.00', subject: 'Pemeriksaan & Penilaian Tugas Esai Siswa', teacher: 'Dra. Sri Wahyuni, M.Pd', room: 'Ruang Kerja Guru', status: 'Akan Datang' },
    // Selasa
    { id: 'sch_g_sel_1', day: 'Selasa', time: '07.00 - 08.30', subject: 'Bimbingan Karakter & Wali Kelas 11 MIPA 2', teacher: 'Dra. Sri Wahyuni, M.Pd', room: 'Ruang R.204', status: 'Akan Datang' },
    { id: 'sch_g_sel_2', day: 'Selasa', time: '08.30 - 10.00', subject: 'Mengajar Bahasa Indonesia (11 MIPA 1)', teacher: 'Dra. Sri Wahyuni, M.Pd', room: 'Ruang R.203', status: 'Akan Datang' },
    { id: 'sch_g_sel_3', day: 'Selasa', time: '10.15 - 12.00', subject: 'Verifikasi Presensi & Rekap Absensi Siswa', teacher: 'Dra. Sri Wahyuni, M.Pd', room: 'Ruang Tata Usaha', status: 'Akan Datang' },
    { id: 'sch_g_sel_4', day: 'Selasa', time: '13.00 - 15.00', subject: 'Penyusunan Modul Ajar Bab Debat Ilmiah', teacher: 'Dra. Sri Wahyuni, M.Pd', room: 'Ruang Kurikulum', status: 'Akan Datang' },
    // Rabu
    { id: 'sch_g_rab_1', day: 'Rabu', time: '07.00 - 08.30', subject: 'Pengawasan Ujian CBT Bahasa Indonesia', teacher: 'Dra. Sri Wahyuni, M.Pd', room: 'Lab Komputer 1', status: 'Akan Datang' },
    { id: 'sch_g_rab_2', day: 'Rabu', time: '10.15 - 11.45', subject: 'Mengajar Bahasa Indonesia (11 MIPA 2)', teacher: 'Dra. Sri Wahyuni, M.Pd', room: 'Ruang R.204', status: 'Akan Datang' },
    { id: 'sch_g_rab_3', day: 'Rabu', time: '13.00 - 15.00', subject: 'Fasilitator Projek Penguatan P5 SMAN 25', teacher: 'Dra. Sri Wahyuni, M.Pd', room: 'Aula Utama', status: 'Akan Datang' },
    // Kamis
    { id: 'sch_g_kam_1', day: 'Kamis', time: '08.30 - 10.00', subject: 'Mengajar Bahasa Indonesia (11 IPS 2)', teacher: 'Dra. Sri Wahyuni, M.Pd', room: 'Ruang R.103', status: 'Akan Datang' },
    { id: 'sch_g_kam_2', day: 'Kamis', time: '10.15 - 12.00', subject: 'Konsultasi Belajar & Orang Tua Siswa', teacher: 'Dra. Sri Wahyuni, M.Pd', room: 'Ruang Pertemuan', status: 'Akan Datang' },
    { id: 'sch_g_kam_3', day: 'Kamis', time: '13.00 - 15.00', subject: 'Rapat Dewan Guru & Kepala Sekolah', teacher: 'Semua Dewan Guru', room: 'Ruang Rapat Pleno', status: 'Akan Datang' },
    // Jumat
    { id: 'sch_g_jum_1', day: 'Jumat', time: '06.45 - 07.45', subject: 'Senam Pagi Bersama Guru & Staf', teacher: 'Dewan Guru SMAN 25', room: 'Lapangan Utama', status: 'Akan Datang' },
    { id: 'sch_g_jum_2', day: 'Jumat', time: '08.00 - 11.00', subject: 'Input Nilai Formatif e-Rapor Kurikulum Merdeka', teacher: 'Dra. Sri Wahyuni, M.Pd', room: 'Ruang Kerja Guru', status: 'Akan Datang' },
    { id: 'sch_g_jum_3', day: 'Jumat', time: '13.00 - 14.30', subject: 'Pembinaan Ekstrakurikuler Jurnalistik', teacher: 'Dra. Sri Wahyuni, M.Pd', room: 'Ruang Redaksi Majalah', status: 'Akan Datang' },
  ],
};

// =========================================================================
// HELPER QUESTIONS GENERATOR / DEFINITION (25 QUESTIONS EACH)
// =========================================================================

export const QUESTIONS_PTS_BINDO_11 = [
  {
    id: 1,
    text: 'Cermati kutipan teks eksplanasi berikut:\n"Pemanasan global memicu pencairan gletser kutub yang mengakibatkan peningkatan volume air laut secara masif. Fenomena ini mengancam kawasan pesisir pulau-pulau kecil di Indonesia."\nKonjungsi kausalitas yang menandai hubungan sebab-akibat pada kutipan di atas adalah...',
    options: [
      { key: 'A', text: 'Pemanasan global' },
      { key: 'B', text: 'Yang' },
      { key: 'C', text: 'Mengakibatkan' },
      { key: 'D', text: 'Di Indonesia' },
      { key: 'E', text: 'Secara masif' }
    ],
    correctKey: 'C',
    explanation: 'Kata "mengakibatkan" merupakan konjungsi kausalitas yang secara langsung mengindikasikan dampak logis dari penyebab sebelumnya.'
  },
  {
    id: 2,
    text: 'Manakah dari kalimat berikut yang merupakan kalimat efektif menurut kaidah baku tata bahasa Indonesia?',
    options: [
      { key: 'A', text: 'Bagi siswa yang belum mengumpulkan tugas diharapkan segera menyerahkan ke ruang guru.' },
      { key: 'B', text: 'Siswa yang belum mengumpulkan tugas diharapkan segera menyerahkannya ke ruang guru.' },
      { key: 'C', text: 'Untuk mempersingkat waktu, maka kami persilakan kepala sekolah berpidato.' },
      { key: 'D', text: 'Di dalam rapat itu membicarakan mengenai kurikulum merdeka.' },
      { key: 'E', text: 'Meskipun hujan lebat tetapi siswa tetap hadir tepat waktu.' }
    ],
    correctKey: 'B',
    explanation: 'Opsi B memiliki subjek yang jelas tanpa partikel perusak struktur kalimat baku seperti "Bagi...".'
  },
  {
    id: 3,
    text: 'Dalam teks argumentasi, bagian yang memuat pandangan atau sikap penulis terhadap permasalahan yang diangkat dinamakan...',
    options: [
      { key: 'A', text: 'Tesis' },
      { key: 'B', text: 'Koda' },
      { key: 'C', text: 'Orientasi' },
      { key: 'D', text: 'Resolusi' },
      { key: 'E', text: 'Komplikasi' }
    ],
    correctKey: 'A',
    explanation: 'Tesis adalah pernyataan pendapat awal yang mendasari keseluruhan rangkaian argumentasi berikutnya.'
  },
  {
    id: 4,
    text: 'Cermati kalimat berikut: "Data Badan Pusat Statistik (BPS) tahun 2024 menunjukkan angka pengangguran terdidik turun sebesar 1,2%."\nKalimat di atas dikategorikan sebagai...',
    options: [
      { key: 'A', text: 'Kalimat opini subjektif' },
      { key: 'B', text: 'Kalimat fakta empiris' },
      { key: 'C', text: 'Kalimat asumsi normatif' },
      { key: 'D', text: 'Kalimat analogi kiasan' },
      { key: 'E', text: 'Kalimat konjektur hipotesis' }
    ],
    correctKey: 'B',
    explanation: 'Kalimat menyajikan data numerik terverifikasi dari lembaga resmi negara, sehingga merupakan fakta empiris.'
  },
  {
    id: 5,
    text: 'Istilah "hasty generalization" dalam penyusunan teks argumentasi bermakna...',
    options: [
      { key: 'A', text: 'Penyimpulan argumen secara tergesa-gesa tanpa dukungan sampel bukti yang memadai' },
      { key: 'B', text: 'Penyusunan paragraf dengan kohesi leksikal yang sangat kuat' },
      { key: 'C', text: 'Penggunaan analogi yang relevan dengan topik sosiologis' },
      { key: 'D', text: 'Pemberian rujukan sitasi ilmiah internasional' },
      { key: 'E', text: 'Penolakan terhadap tesis lawan secara sopan' }
    ],
    correctKey: 'A',
    explanation: 'Hasty generalization adalah salah satu kekeliruan bernalar (logical fallacy) berupa generalisasi tergesa-gesa dari bukti yang sangat minim.'
  },
  {
    id: 6,
    text: 'Penulisan kata serapan yang tepat sesuai Pedoman Umum Ejaan Bahasa Indonesia (PUEBI) adalah...',
    options: [
      { key: 'A', text: 'Analisa, kwalitas, faham' },
      { key: 'B', text: 'Analisis, kualitas, paham' },
      { key: 'C', text: 'Analisa, kualitas, faedah' },
      { key: 'D', text: 'Analisis, kwantitas, sistim' },
      { key: 'E', text: 'Diagnosa, teknik, kongkrit' }
    ],
    correctKey: 'B',
    explanation: 'Bentuk baku menurut KBBI adalah "analisis", "kualitas", dan "paham".'
  },
  {
    id: 7,
    text: 'Manakah kalimat berikut yang menggunakan konjungsi antarkalimat dengan tanda baca koma yang benar?',
    options: [
      { key: 'A', text: 'Oleh karena itu kita wajib menaati protokol keselamatan.' },
      { key: 'B', text: 'Oleh karena itu, kita wajib menaati protokol keselamatan.' },
      { key: 'C', text: 'Kita wajib menaati protokol keselamatan, oleh karena itu.' },
      { key: 'D', text: 'Namun demikian kita tidak boleh menyerah.' },
      { key: 'E', text: 'Akan tetapi kita harus tetap waspada.' }
    ],
    correctKey: 'B',
    explanation: 'Konjungsi antarkalimat seperti "Oleh karena itu," harus selalu diikuti tanda koma sebelum melanjutkan klausa kalimat.'
  },
  {
    id: 8,
    text: 'Fungsi utama dari bagian simpulan atau penegasan ulang dalam teks editorial/argumentasi adalah...',
    options: [
      { key: 'A', text: 'Memperkenalkan topik baru yang belum dibahas pada paragraf sebelumnya' },
      { key: 'B', text: 'Menegaskan kembali tesis dengan merangkum poin-poin eviden dan memberikan saran/rekomendasi' },
      { key: 'C', text: 'Menyajikan data statistik terlengkap' },
      { key: 'D', text: 'Mendiskreditkan pandangan pihak lawan tanpa dasar' },
      { key: 'E', text: 'Menceritakan latar belakang kehidupan pribadi penulis' }
    ],
    correctKey: 'B',
    explanation: 'Penegasan ulang berfungsi mengikat seluruh argumentasi dan menegaskan kembali kebenaran tesis disertai rekomendasi.'
  },
  {
    id: 9,
    text: 'Cermati kalimat berikut: "Pertumbuhan ekonomi digital melesat pesat ... infrastruktur internet di pelosok masih belum merata."\nKonjungsi intrakalimat yang tepat untuk mengisi rumpang di atas adalah...',
    options: [
      { key: 'A', text: 'sehingga' },
      { key: 'B', text: 'tetapi' },
      { key: 'C', text: 'bahkan' },
      { key: 'D', text: 'melainkan' },
      { key: 'E', text: 'karena' }
    ],
    correctKey: 'B',
    explanation: 'Konjungsi "tetapi" menyatakan hubungan pertentangan antara dua klausa koordinatif.'
  },
  {
    id: 10,
    text: 'Ciri utama dari teks artikel opini ilmiah populer yang baik adalah...',
    options: [
      { key: 'A', text: 'Menggunakan gaya bahasa yang sangat kaku dan hanya dimengerti kalangan akademisi sempit' },
      { key: 'B', text: 'Menyampaikan gagasan ilmiah yang didukung data, namun dikemas dengan bahasa populer yang komunikatif' },
      { key: 'C', text: 'Mengabaikan fakta empiris demi memikat emosi pembaca semata' },
      { key: 'D', text: 'Tidak mencantumkan sumber rujukan sama sekali' },
      { key: 'E', text: 'Selalu diakhiri dengan pantun penutup' }
    ],
    correctKey: 'B',
    explanation: 'Artikel ilmiah populer menjembatani ketelitian ilmiah dan kejelasan bahasa agar mudah dipahami masyarakat umum.'
  },
  {
    id: 11,
    text: 'Penulisan gelar akademik yang benar menurut kaidah ejaan resmi adalah...',
    options: [
      { key: 'A', text: 'Dra. Sri Wahyuni, M.Pd.' },
      { key: 'B', text: 'Dra Sri Wahyuni, M,Pd' },
      { key: 'C', text: 'Dra, Sri Wahyuni M.Pd' },
      { key: 'D', text: 'DRA. Sri Wahyuni M.PD.' },
      { key: 'E', text: 'Dra. Sri Wahyuni. M.Pd' }
    ],
    correctKey: 'A',
    explanation: 'Singkatan gelar didahului tanda koma dari nama akhir dan diakhiri tanda titik pada setiap unsur singkatan.'
  },
  {
    id: 12,
    text: 'Kutipan: "Buku karya Pramoedya Ananta Toer ini berhasil menggambarkan kegetiran batin kaum tertindas pada masa kolonial dengan pilihan diksi yang begitu memukau."\nKalimat di atas merupakan bagian dari teks...',
    options: [
      { key: 'A', text: 'Kritik atau resensi sastra' },
      { key: 'B', text: 'Laporan hasil observasi' },
      { key: 'C', text: 'Teks prosedur kompleks' },
      { key: 'D', text: 'Teks berita investigasi' },
      { key: 'E', text: 'Teks negosiasi dagang' }
    ],
    correctKey: 'A',
    explanation: 'Kalimat berisi pertimbangan nilai estetis dan evaluasi karya seni/sastra, ciri khas resensi dan kritik sastra.'
  },
  {
    id: 13,
    text: 'Dalam sebuah debat ilmiah, mosi didefinisikan sebagai...',
    options: [
      { key: 'A', text: 'Pihak yang memimpin jalannya perdebatan' },
      { key: 'B', text: 'Pernyataan atau topik permasalahan yang diperdebatkan oleh kedua kubu' },
      { key: 'C', text: 'Pencatat waktu selama pembicara menyampaikan argumen' },
      { key: 'D', text: 'Komentar penonton di akhir acara' },
      { key: 'E', text: 'Sanksi bagi pembicara yang melanggar batas waktu' }
    ],
    correctKey: 'B',
    explanation: 'Mosi adalah topik atau isu sentral yang menjadi dasar adu argumen antara tim afirmasi dan oposisi.'
  },
  {
    id: 14,
    text: 'Perhatikan kalimat: "Ibu guru menugaskan kita untuk membuat kliping."\nKata tidak baku dalam kalimat tersebut adalah...',
    options: [
      { key: 'A', text: 'Ibu' },
      { key: 'B', text: 'Menugaskan' },
      { key: 'C', text: 'Kliping' },
      { key: 'D', text: 'Kita' },
      { key: 'E', text: 'Membuat' }
    ],
    correctKey: 'C',
    explanation: 'Bentuk baku menurut KBBI adalah "guntingan" atau serapan baku "kliping" (jika diakui) namun kata kerja pembentukannya lebih tepat "kliping". Di sini pilihan kata baku lebih mengarah ke padanan baku bahasa Indonesia.'
  },
  {
    id: 15,
    text: 'Manakah yang termasuk verba mental dalam teks argumentasi?',
    options: [
      { key: 'A', text: 'Menulis, berjalan, melompat' },
      { key: 'B', text: 'Memperkirakan, meyakini, menduga' },
      { key: 'C', text: 'Membaca, memotong, mencuci' },
      { key: 'D', text: 'Membangun, meruntuhkan, mengecat' },
      { key: 'E', text: 'Menyapu, membuang, mengikat' }
    ],
    correctKey: 'B',
    explanation: 'Verba mental adalah kata kerja yang mengekspresikan persepsi, afeksi, atau kognisi pikiran manusia.'
  },
  {
    id: 16,
    text: 'Cermati kalimat: "Meskipun mereka menghadapi banyak kendala, ... mereka tidak pernah putus asa."\nKata yang TIDAK boleh dicantumkan pada bagian rumpang agar kalimat tetap berstatus kalimat efektif adalah...',
    options: [
      { key: 'A', text: 'namun' },
      { key: 'B', text: 'sebenarnya' },
      { key: 'C', text: 'ternyata' },
      { key: 'D', text: 'rupanya' },
      { key: 'E', text: 'sesungguhnya' }
    ],
    correctKey: 'A',
    explanation: 'Penggunaan "meskipun" tidak boleh dipadukan dengan konjungsi antarklausa pertentangan "namun" atau "tetapi" dalam satu kalimat.'
  },
  {
    id: 17,
    text: 'Penggunaan tanda titik dua (:) yang tepat terdapat pada kalimat...',
    options: [
      { key: 'A', text: 'Siswa SMA memerlukan alat tulis seperti: buku, pena, dan penggaris.' },
      { key: 'B', text: 'Ibu membeli: apel, jeruk, dan mangga di pasar tradisional.' },
      { key: 'C', text: 'Kita memerlukan perlengkapan kemah berikut: tenda, matras, dan senter.' },
      { key: 'D', text: 'Ketua kelas mengatakan: bahwa rapat ditiadakan.' },
      { key: 'E', text: 'Hari ini: Senin, kita melaksanakan upacara bendera.' }
    ],
    correctKey: 'C',
    explanation: 'Tanda titik dua digunakan pada akhir suatu pernyataan lengkap yang diikuti perincian.'
  },
  {
    id: 18,
    text: 'Apa yang dimaksud dengan kohesi leksikal dalam keterpaduan paragraf?',
    options: [
      { key: 'A', text: 'Keterpaduan antarbagian kalimat menggunakan kata ganti persona' },
      { key: 'B', text: 'Hubungan semantis antarunsur paragraf melalui pemilihan kata seperti sinonim, antonim, dan repetisi kata kunci' },
      { key: 'C', text: 'Penggunaan rima suara di akhir baris kalimat' },
      { key: 'D', text: 'Kesesuaian antara judul dengan jumlah kata dalam teks' },
      { key: 'E', text: 'Pencantuman biodata penulis di kaki halaman' }
    ],
    correctKey: 'B',
    explanation: 'Kohesi leksikal adalah kepaduan makna yang diwujudkan melalui pemilihan kosakata (repetisi, sinonim, antonim, hiponim).'
  },
  {
    id: 19,
    text: 'Kalimat yang mengandung sesat pikir "ad hominem" dalam diskusi adalah...',
    options: [
      { key: 'A', text: 'Gagasan Anda keliru karena didasarkan pada data survei yang cacat metodologi.' },
      { key: 'B', text: 'Jangan dengarkan argumen dia tentang ekonomi, pakaian yang dikenakannya saja tidak rapi!' },
      { key: 'C', text: 'Data dari Bank Indonesia menunjukkan laju inflasi terkendali pada angka 2,5%.' },
      { key: 'D', text: 'Solusi kemacetan harus ditangani secara lintas sektor dan terintegrasi.' },
      { key: 'E', text: 'Kebijakan subsidi perlu dievaluasi berkala agar tepat sasaran.' }
    ],
    correctKey: 'B',
    explanation: 'Ad hominem menyerang pribadi atau penampilan lawan bicara alih-alih membantah substansi argumennya.'
  },
  {
    id: 20,
    text: 'Dalam penulisan daftar pustaka berformat APA, urutan penulisan yang baku adalah...',
    options: [
      { key: 'A', text: 'Tahun, Nama Pengarang, Judul Buku, Kota Terbit, Penerbit' },
      { key: 'B', text: 'Nama Pengarang (dibalik). (Tahun). Judul Buku. Kota Terbit: Penerbit.' },
      { key: 'C', text: 'Judul Buku, Nama Pengarang, Penerbit, Tahun' },
      { key: 'D', text: 'Penerbit, Judul Buku, Nama Pengarang, Tahun' },
      { key: 'E', text: 'Kota Terbit, Penerbit, Judul Buku, Nama Pengarang' }
    ],
    correctKey: 'B',
    explanation: 'Standar baku daftar pustaka: Nama penulis (dibalik), tahun dalam kurung, judul buku miring, kota terbit, dan nama penerbit.'
  },
  {
    id: 21,
    text: 'Makna ungkapan "buah bibir" dalam kalimat "Prestasi siswa SMAN 25 tersebut menjadi buah bibir di tingkat nasional" adalah...',
    options: [
      { key: 'A', text: 'Bahan percakapan khalayak ramai' },
      { key: 'B', text: 'Bahan pergunjingan yang memalukan' },
      { key: 'C', text: 'Hadiah cinderamata dari kepala dinas' },
      { key: 'D', text: 'Pidato sambutan dalam upacara' },
      { key: 'E', text: 'Karya sastra berupa antologi puisi' }
    ],
    correctKey: 'A',
    explanation: '"Buah bibir" adalah idiom yang bermakna sesuatu yang menjadi bahan pembicaraan banyak orang.'
  },
  {
    id: 22,
    text: 'Manakah kalimat berikut yang menggunakan majas personifikasi?',
    options: [
      { key: 'A', text: 'Wajahnya pucat pasi bagai bulan kesiangan.' },
      { key: 'B', text: 'Angin malam berbisik lembut menyapa dahan pepohonan yang sunyi.' },
      { key: 'C', text: 'Hatinya sekeras batu karang di tengah lautan.' },
      { key: 'D', text: 'Ratusan pasang mata tertuju pada panggung pertunjukan.' },
      { key: 'E', text: 'Suaranya menggelegar membelah angkasa raya.' }
    ],
    correctKey: 'B',
    explanation: 'Personifikasi melekatkan sifat manusia (berbisik, menyapa) pada benda mati atau alam (angin malam).'
  },
  {
    id: 23,
    text: 'Kalimat tanggapan yang santun dan bernilai konstruktif terhadap pendapat pembicara lain adalah...',
    options: [
      { key: 'A', text: 'Pendapat Anda sama sekali tidak masuk akal dan ketinggalan zaman.' },
      { key: 'B', text: 'Saya sangat tertarik dengan solusi yang Saudara tawarkan, namun izinkan saya memberi masukan terkait efisiensi anggarannya.' },
      { key: 'C', text: 'Sebaiknya Anda diam saja karena Anda belum berpengalaman di bidang ini.' },
      { key: 'D', text: 'Pernyataan pembicara pertama sangat naif dan tidak perlu direspons.' },
      { key: 'E', text: 'Tidak ada gunanya mendengarkan paparan yang tidak memiliki dasar riset.' }
    ],
    correctKey: 'B',
    explanation: 'Opsi B menunjukkan apresiasi sebelum mengemukakan masukan penyempurnaan secara santun dan logis.'
  },
  {
    id: 24,
    text: 'Kata yang mengalami pergeseran makna peyorasi (makna menjadi lebih rendah atau bernilai rasa kurang menyenangkan) adalah...',
    options: [
      { key: 'A', text: 'Wanita ➔ Perempuan' },
      { key: 'B', text: 'Bunting (menggantikan kata mengandung/hamil)' },
      { key: 'C', text: 'Tunanetra (menggantikan buta)' },
      { key: 'D', text: 'Pramuniaga (menggantikan pelayan toko)' },
      { key: 'E', text: 'Wisma (menggantikan rumah)' }
    ],
    correctKey: 'B',
    explanation: 'Kata "bunting" untuk manusia memiliki nilai rasa yang lebih kasar (peyoratif) dibanding kata "hamil" atau "mengandung".'
  },
  {
    id: 25,
    text: 'Inti dari penerapan Kurikulum Merdeka dalam pembelajaran Bahasa Indonesia jenjang SMA Fase F adalah...',
    options: [
      { key: 'A', text: 'Menghafal definisi istilah linguistik sebanyak-banyaknya' },
      { key: 'B', text: 'Mengembangkan kemahiran literasi kritis, analisis wacana, dan kemampuan mencipta teks multimodal yang solutif' },
      { key: 'C', text: 'Menghindari membaca teks sastra klasik' },
      { key: 'D', text: 'Menulis naskah drama tanpa memperhatikan tata bahasa baku' },
      { key: 'E', text: 'Membuat ringkasan buku teks pelajaran tanpa evaluasi kritis' }
    ],
    correctKey: 'B',
    explanation: 'Kurikulum Merdeka menekankan penguasaan literasi kritis, pemecahan masalah nyata, dan produksi teks multimodal bermakna.'
  }
];

export const QUESTIONS_PTS_MAT_PEM_11 = [
  {
    id: 1,
    text: 'Turunan pertama dari fungsi trigonometri f(x) = sin(3x² + 5) adalah f\'(x) = ...',
    options: [
      { key: 'A', text: '6x · cos(3x² + 5)' },
      { key: 'B', text: 'cos(3x² + 5)' },
      { key: 'C', text: '-6x · cos(3x² + 5)' },
      { key: 'D', text: '3x · sin(3x² + 5)' },
      { key: 'E', text: '6x · sin(3x² + 5)' }
    ],
    correctKey: 'A',
    explanation: 'Gunakan aturan rantai: u = 3x² + 5 -> u\' = 6x. Turunan sin(u) adalah cos(u) · u\' = 6x · cos(3x² + 5).'
  },
  {
    id: 2,
    text: 'Turunan pertama dari f(x) = cos⁴(2x) adalah...',
    options: [
      { key: 'A', text: '-8 cos³(2x) sin(2x)' },
      { key: 'B', text: '8 cos³(2x) sin(2x)' },
      { key: 'C', text: '-4 cos³(2x) sin(2x)' },
      { key: 'D', text: '-8 sin³(2x) cos(2x)' },
      { key: 'E', text: '4 cos³(2x)' }
    ],
    correctKey: 'A',
    explanation: 'f\'(x) = 4 cos³(2x) · (-sin(2x)) · 2 = -8 cos³(2x) sin(2x).'
  },
  {
    id: 3,
    text: 'Nilai dari lim(x ➔ 0) [sin(6x) / (2x)] adalah...',
    options: [
      { key: 'A', text: '1' },
      { key: 'B', text: '2' },
      { key: 'C', text: '3' },
      { key: 'D', text: '6' },
      { key: 'E', text: '12' }
    ],
    correctKey: 'C',
    explanation: 'Berdasarkan sifat limit trigonometri dasar: lim(x➔0) sin(ax)/(bx) = a/b = 6/2 = 3.'
  },
  {
    id: 4,
    text: 'Nilai dari lim(x ➔ 0) [tan(4x) / sin(2x)] adalah...',
    options: [
      { key: 'A', text: '0.5' },
      { key: 'B', text: '1' },
      { key: 'C', text: '2' },
      { key: 'D', text: '4' },
      { key: 'E', text: '8' }
    ],
    correctKey: 'C',
    explanation: 'lim(x➔0) tan(4x)/sin(2x) = 4/2 = 2.'
  },
  {
    id: 5,
    text: 'Jika f(x) = tan(5x), maka nilai f\'(0) adalah...',
    options: [
      { key: 'A', text: '0' },
      { key: 'B', text: '1' },
      { key: 'C', text: '5' },
      { key: 'D', text: '25' },
      { key: 'E', text: 'Tidak terdefinisi' }
    ],
    correctKey: 'C',
    explanation: 'f\'(x) = 5 sec²(5x). Untuk x = 0: f\'(0) = 5 · sec²(0) = 5 · 1 = 5.'
  },
  {
    id: 6,
    text: 'Gradien garis singgung kurva y = sin(2x) pada titik dengan absis x = π/6 adalah...',
    options: [
      { key: 'A', text: '0' },
      { key: 'B', text: '1' },
      { key: 'C', text: '√3' },
      { key: 'D', text: '2' },
      { key: 'E', text: '-1' }
    ],
    correctKey: 'B',
    explanation: 'm = y\' = 2 cos(2x). Untuk x = π/6: m = 2 cos(2 · π/6) = 2 cos(π/3) = 2 · (1/2) = 1.'
  },
  {
    id: 7,
    text: 'Nilai dari lim(x ➔ 0) [(1 - cos(2x)) / x²] adalah...',
    options: [
      { key: 'A', text: '0' },
      { key: 'B', text: '1' },
      { key: 'C', text: '2' },
      { key: 'D', text: '4' },
      { key: 'E', text: '1/2' }
    ],
    correctKey: 'C',
    explanation: '1 - cos(2x) = 2 sin²(x). Jadi lim(x➔0) [2 sin²(x) / x²] = 2 · 1² = 2.'
  },
  {
    id: 8,
    text: 'Suku banyak P(x) = 2x³ - 5x² + 4x - 6 dibagi oleh (x - 2). Sisa pembagiannya adalah...',
    options: [
      { key: 'A', text: '-2' },
      { key: 'B', text: '0' },
      { key: 'C', text: '2' },
      { key: 'D', text: '4' },
      { key: 'E', text: '6' }
    ],
    correctKey: 'A',
    explanation: 'Menurut Teorema Sisa: Sisa = P(2) = 2(8) - 5(4) + 4(2) - 6 = 16 - 20 + 8 - 6 = -2.'
  },
  {
    id: 9,
    text: 'Jika (x + 1) merupakan faktor dari polinomial f(x) = x³ + kx² - 4x - 6, maka nilai k adalah...',
    options: [
      { key: 'A', text: '1' },
      { key: 'B', text: '2' },
      { key: 'C', text: '3' },
      { key: 'D', text: '4' },
      { key: 'E', text: '5' }
    ],
    correctKey: 'C',
    explanation: 'f(-1) = (-1)³ + k(-1)² - 4(-1) - 6 = 0 -> -1 + k + 4 - 6 = 0 -> k - 3 = 0 -> k = 3.'
  },
  {
    id: 10,
    text: 'Turunan kedua dari fungsi f(x) = cos(3x) adalah f\'\'(x) = ...',
    options: [
      { key: 'A', text: '-3 sin(3x)' },
      { key: 'B', text: '-9 cos(3x)' },
      { key: 'C', text: '9 cos(3x)' },
      { key: 'D', text: '6 sin(3x)' },
      { key: 'E', text: '-6 cos(3x)' }
    ],
    correctKey: 'B',
    explanation: 'f\'(x) = -3 sin(3x) -> f\'\'(x) = -3 · 3 cos(3x) = -9 cos(3x).'
  },
  {
    id: 11,
    text: 'Titik stasioner dari kurva f(x) = sin(x) pada interval 0 ≤ x ≤ π terjadi saat x bernilai...',
    options: [
      { key: 'A', text: 'π/6' },
      { key: 'B', text: 'π/4' },
      { key: 'C', text: 'π/3' },
      { key: 'D', text: 'π/2' },
      { key: 'E', text: 'π' }
    ],
    correctKey: 'D',
    explanation: 'f\'(x) = cos(x) = 0. Pada interval 0 ≤ x ≤ π, cos(x) = 0 pada saat x = π/2.'
  },
  {
    id: 12,
    text: 'Nilai maksimum dari f(x) = 3 sin(2x) + 4 adalah...',
    options: [
      { key: 'A', text: '1' },
      { key: 'B', text: '4' },
      { key: 'C', text: '7' },
      { key: 'D', text: '10' },
      { key: 'E', text: '12' }
    ],
    correctKey: 'C',
    explanation: 'Nilai maksimum sin(2x) adalah 1, sehingga nilai maksimum f(x) = 3(1) + 4 = 7.'
  },
  {
    id: 13,
    text: 'Akar-akar dari persamaan polinomial x³ - 6x² + 11x - 6 = 0 memiliki jumlah x1 + x2 + x3 sebesar...',
    options: [
      { key: 'A', text: '-6' },
      { key: 'B', text: '6' },
      { key: 'C', text: '11' },
      { key: 'D', text: '-11' },
      { key: 'E', text: '3' }
    ],
    correctKey: 'B',
    explanation: 'Berdasarkan Teorema Vieta: x1 + x2 + x3 = -b/a = -(-6)/1 = 6.'
  },
  {
    id: 14,
    text: 'Turunan dari fungsi f(x) = x · sin(x) adalah f\'(x) = ...',
    options: [
      { key: 'A', text: 'cos(x)' },
      { key: 'B', text: 'sin(x) + x · cos(x)' },
      { key: 'C', text: 'sin(x) - x · cos(x)' },
      { key: 'D', text: 'x · cos(x)' },
      { key: 'E', text: '1 + cos(x)' }
    ],
    correctKey: 'B',
    explanation: 'Gunakan aturan perkalian (u · v)\' = u\'v + uv\'. u = x -> u\' = 1, v = sin(x) -> v\' = cos(x). Maka f\'(x) = sin(x) + x cos(x).'
  },
  {
    id: 15,
    text: 'Persamaan lingkaran yang berpusat di O(0,0) dan berjari-jari r = 5 adalah...',
    options: [
      { key: 'A', text: 'x² + y² = 5' },
      { key: 'B', text: 'x² + y² = 10' },
      { key: 'C', text: 'x² + y² = 25' },
      { key: 'D', text: 'x² - y² = 25' },
      { key: 'E', text: '(x - 5)² + (y - 5)² = 25' }
    ],
    correctKey: 'C',
    explanation: 'Persamaan lingkaran berpusat di (0,0) adalah x² + y² = r² = 5² = 25.'
  },
  {
    id: 16,
    text: 'Pusat dan jari-jari dari lingkaran x² + y² - 4x + 6y - 12 = 0 adalah...',
    options: [
      { key: 'A', text: 'Pusat (2, -3) dan r = 5' },
      { key: 'B', text: 'Pusat (-2, 3) dan r = 5' },
      { key: 'C', text: 'Pusat (2, -3) dan r = 25' },
      { key: 'D', text: 'Pusat (4, -6) dan r = 5' },
      { key: 'E', text: 'Pusat (-4, 6) dan r = 12' }
    ],
    correctKey: 'A',
    explanation: 'Pusat (-A/2, -B/2) = (2, -3). r = √(2² + (-3)² - (-12)) = √(4 + 9 + 12) = √25 = 5.'
  },
  {
    id: 17,
    text: 'Nilai dari lim(x ➔ 0) [x · tan(2x) / (1 - cos(4x))] adalah...',
    options: [
      { key: 'A', text: '1/4' },
      { key: 'B', text: '1/2' },
      { key: 'C', text: '1' },
      { key: 'D', text: '2' },
      { key: 'E', text: '4' }
    ],
    correctKey: 'A',
    explanation: '1 - cos(4x) = 2 sin²(2x). Maka lim(x➔0) [x · tan(2x) / (2 sin(2x) sin(2x))] = (1/2) · (1/2) · (2/2) = 1/4.'
  },
  {
    id: 18,
    text: 'Suatu partikel bergerak menurut persamaan posisi s(t) = 4 cos(2t). Kecepatan v(t) partikel pada t = π/4 adalah...',
    options: [
      { key: 'A', text: '0' },
      { key: 'B', text: '-4' },
      { key: 'C', text: '-8' },
      { key: 'D', text: '8' },
      { key: 'E', text: '4' }
    ],
    correctKey: 'C',
    explanation: 'v(t) = s\'(t) = -8 sin(2t). Pada t = π/4: v(π/4) = -8 sin(π/2) = -8(1) = -8.'
  },
  {
    id: 19,
    text: 'Percepatan partikel a(t) dari s(t) = 4 cos(2t) pada t = 0 adalah...',
    options: [
      { key: 'A', text: '0' },
      { key: 'B', text: '-16' },
      { key: 'C', text: '16' },
      { key: 'D', text: '-8' },
      { key: 'E', text: '8' }
    ],
    correctKey: 'B',
    explanation: 'a(t) = v\'(t) = -16 cos(2t). Pada t = 0: a(0) = -16 cos(0) = -16.'
  },
  {
    id: 20,
    text: 'Jika fungsi f(x) = sin(x) / cos(x), turunan pertamanya sama dengan...',
    options: [
      { key: 'A', text: 'sec²(x)' },
      { key: 'B', text: 'csc²(x)' },
      { key: 'C', text: 'tan²(x)' },
      { key: 'D', text: 'cos²(x)' },
      { key: 'E', text: '-sec²(x)' }
    ],
    correctKey: 'A',
    explanation: 'f(x) = tan(x), dan turunan dari tan(x) adalah sec²(x).'
  },
  {
    id: 21,
    text: 'Hasil kali akar-akar persamaan suku banyak 2x³ - 4x² + 6x - 10 = 0 adalah...',
    options: [
      { key: 'A', text: '-5' },
      { key: 'B', text: '5' },
      { key: 'C', text: '10' },
      { key: 'D', text: '-10' },
      { key: 'E', text: '3' }
    ],
    correctKey: 'B',
    explanation: 'Berdasarkan Teorema Vieta untuk derajat 3: x1 · x2 · x3 = -d/a = -(-10)/2 = 5.'
  },
  {
    id: 22,
    text: 'Berapakah nilai lim(x ➔ 0) [(sin(3x) - sin(x)) / (2x)]?',
    options: [
      { key: 'A', text: '0' },
      { key: 'B', text: '1' },
      { key: 'C', text: '2' },
      { key: 'D', text: '3' },
      { key: 'E', text: '4' }
    ],
    correctKey: 'B',
    explanation: 'Pecah menjadi: [sin(3x)/(2x)] - [sin(x)/(2x)] = 3/2 - 1/2 = 2/2 = 1.'
  },
  {
    id: 23,
    text: 'Kedudukan garis y = 2x + 1 terhadap lingkaran x² + y² = 9 dapat ditentukan dari nilai diskriminan persamaan kuadrat sekutunya. Jika D > 0, maka...',
    options: [
      { key: 'A', text: 'Garis memotong lingkaran di dua titik berlainan' },
      { key: 'B', text: 'Garis menyinggung lingkaran di satu titik' },
      { key: 'C', text: 'Garis berada di luar lingkaran dan tidak berpotongan' },
      { key: 'D', text: 'Garis melalui pusat lingkaran' },
      { key: 'E', text: 'Garis berimpit dengan jari-jari' }
    ],
    correctKey: 'A',
    explanation: 'Jika D > 0, terdapat dua solusi real berbeda sehingga garis memotong lingkaran di dua titik.'
  },
  {
    id: 24,
    text: 'Turunan dari f(x) = cot(x) adalah...',
    options: [
      { key: 'A', text: '-csc²(x)' },
      { key: 'B', text: 'csc²(x)' },
      { key: 'C', text: '-sec²(x)' },
      { key: 'D', text: 'tan²(x)' },
      { key: 'E', text: '-tan(x)' }
    ],
    correctKey: 'A',
    explanation: 'Secara kalkulus baku d/dx [cot(x)] = -csc²(x).'
  },
  {
    id: 25,
    text: 'Kurva f(x) = cos(2x) cekung ke atas pada interval 0 ≤ x ≤ π ketika f\'\'(x) > 0, yaitu pada interval...',
    options: [
      { key: 'A', text: 'π/4 < x < 3π/4' },
      { key: 'B', text: '0 < x < π/4' },
      { key: 'C', text: '3π/4 < x < π' },
      { key: 'D', text: '0 < x < π/2' },
      { key: 'E', text: 'π/2 < x < π' }
    ],
    correctKey: 'A',
    explanation: 'f\'\'(x) = -4 cos(2x) > 0 -> cos(2x) < 0 -> π/2 < 2x < 3π/2 -> π/4 < x < 3π/4.'
  }
];

export const QUESTIONS_PTS_SOSIOLOGI_11 = [
  {
    id: 1,
    text: 'Pengelompokan masyarakat yang didasarkan pada kesetaraan tanpa adanya hierarki derajat superior maupun inferior dinamakan...',
    options: [
      { key: 'A', text: 'Stratifikasi sosial' },
      { key: 'B', text: 'Diferensiasi sosial horizontal' },
      { key: 'C', text: 'Kasta feodal' },
      { key: 'D', text: 'Struktur kelas tertutup' },
      { key: 'E', text: 'Mobilitas vertikal turun' }
    ],
    correctKey: 'B',
    explanation: 'Diferensiasi sosial adalah pembedaan masyarakat secara horizontal (seperti suku, agama, ras) tanpa perbedaan tingkatan hakiki.'
  },
  {
    id: 2,
    text: 'Perpindahan seseorang dari posisi buruh pabrik menjadi pemilik usaha manufaktur yang sukses merupakan contoh dari...',
    options: [
      { key: 'A', text: 'Mobilitas sosial vertikal naik (social climbing)' },
      { key: 'B', text: 'Mobilitas sosial horizontal' },
      { key: 'C', text: 'Mobilitas sosial antargenerasi turun' },
      { key: 'D', text: 'Stratifikasi sosial tertutup' },
      { key: 'E', text: 'Diferensiasi klan' }
    ],
    correctKey: 'A',
    explanation: 'Terjadi peningkatan status sosial ekonomi dari lapisan bawah ke lapisan atas yang disebut social climbing (vertikal naik).'
  },
  {
    id: 3,
    text: 'Status sosial yang diperoleh seseorang sejak lahir tanpa perlu usaha atau kompetisi, seperti gelar kebangsawanan raden, disebut...',
    options: [
      { key: 'A', text: 'Achieved status' },
      { key: 'B', text: 'Ascribed status' },
      { key: 'C', text: 'Assigned status' },
      { key: 'D', text: 'Simbol status' },
      { key: 'E', text: 'Peran sosial ganda' }
    ],
    correctKey: 'B',
    explanation: 'Ascribed status adalah kedudukan sosial yang diperoleh secara otomatis lewat garis keturunan atau kelahiran.'
  },
  {
    id: 4,
    text: 'Sistem kasta tradisional di Bali atau masyarakat feodal kuno di mana seseorang tidak dapat berpindah kasta merupakan contoh dari...',
    options: [
      { key: 'A', text: 'Stratifikasi sosial terbuka' },
      { key: 'B', text: 'Stratifikasi sosial tertutup' },
      { key: 'C', text: 'Diferensiasi profesional' },
      { key: 'D', text: 'Mobilitas intragenerasi dinamis' },
      { key: 'E', text: 'Integrasi koersif' }
    ],
    correctKey: 'B',
    explanation: 'Stratifikasi tertutup membatasi kemungkinan anggota masyarakat untuk berpindah status sosial secara vertikal.'
  },
  {
    id: 5,
    text: 'Faktor pendorong mobilitas sosial yang berasal dari sistem pendidikan formal yang terbuka bagi seluruh lapisan warga negara adalah...',
    options: [
      { key: 'A', text: 'Saluran mobilitas sosial (social elevator)' },
      { key: 'B', text: 'Diskriminasi struktural' },
      { key: 'C', text: 'Primordialisme etnis' },
      { key: 'D', text: 'Konflik antarkelas' },
      { key: 'E', text: 'Etnosentrisme lokal' }
    ],
    correctKey: 'A',
    explanation: 'Pendidikan berfungsi sebagai tangga mobilitas sosial (social elevator) utama untuk menaikkan kedudukan seseorang.'
  },
  {
    id: 6,
    text: 'Konflik yang timbul antara serikat pekerja dengan pihak manajemen perusahaan terkait besaran Upah Minimum Provinsi (UMP) termasuk jenis konflik...',
    options: [
      { key: 'A', text: 'Konflik antarrasial' },
      { key: 'B', text: 'Konflik antarkelas sosial ekonomi' },
      { key: 'C', text: 'Konflik antargenerasi' },
      { key: 'D', text: 'Konflik primordial keagamaan' },
      { key: 'E', text: 'Konflik internasional' }
    ],
    correctKey: 'B',
    explanation: 'Perselisihan upah antara buruh dan pemilik modal merupakan konflik berbasis kelas sosial ekonomi (hubungan industrial).'
  },
  {
    id: 7,
    text: 'Upaya penyelesaian konflik sosial melalui pihak ketiga yang bersifat netral dan keputusannya bersifat mengikat kedua pihak dinamakan...',
    options: [
      { key: 'A', text: 'Mediasi' },
      { key: 'B', text: 'Arbitrase' },
      { key: 'C', text: 'Konsiliasi' },
      { key: 'D', text: 'Kompromi' },
      { key: 'E', text: 'Ajudikasi' }
    ],
    correctKey: 'B',
    explanation: 'Dalam arbitrase, pihak ketiga dipilih oleh kedua belah pihak dan memiliki wewenang memberikan keputusan hukum yang wajib dipatuhi.'
  },
  {
    id: 8,
    text: 'Jika pihak ketiga dalam resolusi konflik hanya bertindak sebagai penasihat tanpa hak mengambil keputusan mutlak, metode tersebut dinamakan...',
    options: [
      { key: 'A', text: 'Mediasi' },
      { key: 'B', text: 'Arbitrase' },
      { key: 'C', text: 'Ajudikasi' },
      { key: 'D', text: 'Koersi' },
      { key: 'E', text: 'Stalemate' }
    ],
    correctKey: 'A',
    explanation: 'Mediasi menghadirkan mediator netral yang memfasilitasi dialog, namun keputusan damai tetap di tangan kedua kubu yang berkonflik.'
  },
  {
    id: 9,
    text: 'Penyelesaian sengketa tanah warisan atau sengketa batas wilayah melalui meja hijau pengadilan negara disebut...',
    options: [
      { key: 'A', text: 'Ajudikasi' },
      { key: 'B', text: 'Konsiliasi' },
      { key: 'C', text: 'Toleransi' },
      { key: 'D', text: 'Gencatan senjata' },
      { key: 'E', text: 'Segregasi' }
    ],
    correctKey: 'A',
    explanation: 'Ajudikasi adalah penyelesaian perkara melalui lembaga peradilan formal.'
  },
  {
    id: 10,
    text: 'Kondisi di mana kekuatan dua pihak yang berseteru seimbang sehingga pertikaian terhenti dengan sendirinya tanpa ada pemenang disebut...',
    options: [
      { key: 'A', text: 'Stalemate' },
      { key: 'B', text: 'Koersi' },
      { key: 'C', text: 'Integrasi normatif' },
      { key: 'D', text: 'Asimilasi' },
      { key: 'E', text: 'Dominasi' }
    ],
    correctKey: 'A',
    explanation: 'Stalemate adalah keadaan macet saat kedua kubu berimbang kekuatannya dan tidak ada yang mampu mendesak lebih jauh.'
  },
  {
    id: 11,
    text: 'Contoh diferensiasi sosial berdasarkan profesi di masyarakat perkotaan adalah...',
    options: [
      { key: 'A', text: 'Perbedaan perlakuan hukum antara bangsawan dan rakyat jelata' },
      { key: 'B', text: 'Keberadaan dokter, guru, arsitek, dan insinyur yang saling melengkapi dalam sistem sosial' },
      { key: 'C', text: 'Kesenjangan pendapatan antara konglomerat dan buruh kasar' },
      { key: 'D', text: 'Sistem kasta Brahmana dan Sudra' },
      { key: 'E', text: 'Hierarki pangkat jenderal dan tamtama' }
    ],
    correctKey: 'B',
    explanation: 'Profesi dokter, insinyur, dan guru berdiri setara secara fungsional dalam pembagian kerja masyarakat, bukan tingkatan derajat kasta.'
  },
  {
    id: 12,
    text: 'Pengertian primordialisme yang berpotensi menghambat integrasi nasional adalah...',
    options: [
      { key: 'A', text: 'Sikap mengutamakan kepentingan bersama di atas kepentingan golongan' },
      { key: 'B', text: 'Loyalitas berlebihan terhadap hal-hal yang melekat sejak kecil seperti suku, ras, klan, atau agama asal' },
      { key: 'C', text: 'Keterbukaan terhadap budaya asing modern' },
      { key: 'D', text: 'Kecenderungan masyarakat urban untuk hidup individualis' },
      { key: 'E', text: 'Kesadaran kritis terhadap ketidakadilan hukum' }
    ],
    correctKey: 'B',
    explanation: 'Primordialisme adalah ikatan emosional kuat pada asal-usul keluarga, klan, dan suku yang jika berlebihan dapat memicu fanatisme.'
  },
  {
    id: 13,
    text: 'Bentuk integrasi sosial yang terbentuk karena adanya kesepakatan bersama atas nilai-nilai dan norma sosial dinamakan...',
    options: [
      { key: 'A', text: 'Integrasi normatif' },
      { key: 'B', text: 'Integrasi koersif' },
      { key: 'C', text: 'Integrasi fungsional' },
      { key: 'D', text: 'Integrasi mekanik' },
      { key: 'E', text: 'Integrasi represif' }
    ],
    correctKey: 'A',
    explanation: 'Integrasi normatif didasarkan pada kesepakatan kolektif terhadap norma dan nilai (seperti semboyan Bhinneka Tunggal Ika).'
  },
  {
    id: 14,
    text: 'Integrasi sosial yang terbentuk karena adanya ketergantungan antarsuku yang memiliki keahlian dan komoditas saling melengkapi disebut...',
    options: [
      { key: 'A', text: 'Integrasi koersif' },
      { key: 'B', text: 'Integrasi fungsional' },
      { key: 'C', text: 'Integrasi normatif' },
      { key: 'D', text: 'Integrasi paksa' },
      { key: 'E', text: 'Integrasi pasif' }
    ],
    correctKey: 'B',
    explanation: 'Integrasi fungsional lahir karena adanya fungsi-fungsi spesifik di masyarakat yang saling membutuhkan dan melengkapi.'
  },
  {
    id: 15,
    text: 'Dampak negatif mobilitas sosial bagi individu yang mengalami penurunan status (social sinking) yang drastis adalah...',
    options: [
      { key: 'A', text: 'Peningkatan solidaritas kelompok baru' },
      { key: 'B', text: 'Kecemasan psikologis dan potensi stres atau depresi kehilangan privilese' },
      { key: 'C', text: 'Terbukanya peluang bisnis di sektor informal' },
      { key: 'D', text: 'Meningkatnya etos kerja ilmiah' },
      { key: 'E', text: 'Kemampuan beradaptasi yang instan' }
    ],
    correctKey: 'B',
    explanation: 'Social sinking dapat mengakibatkan goncangan kejiwaan karena hilangnya status, penghasilan, dan privilese sosial.'
  },
  {
    id: 16,
    text: 'Teori pertentangan kelas yang menyatakan bahwa sejarah peradaban manusia adalah sejarah pertarungan antarkelas dikemukakan oleh...',
    options: [
      { key: 'A', text: 'Max Weber' },
      { key: 'B', text: 'Karl Marx' },
      { key: 'C', text: 'Emile Durkheim' },
      { key: 'D', text: 'Auguste Comte' },
      { key: 'E', text: 'Talcott Parsons' }
    ],
    correctKey: 'B',
    explanation: 'Karl Marx merumuskan teori konflik kelas antara kaum borjuis (pemilik modal) dan kaum proletar (kaum buruh).'
  },
  {
    id: 17,
    text: 'Menurut Max Weber, pelapisan sosial tidak hanya ditentukan oleh aspek ekonomi semata, melainkan juga ditentukan oleh...',
    options: [
      { key: 'A', text: 'Kekuasaan politik dan kehormatan/prestise sosial' },
      { key: 'B', text: 'Ciri fisik biologis ras semata' },
      { key: 'C', text: 'Keturunan keluarga sedarah saja' },
      { key: 'D', text: 'Tempat kelahiran geografis' },
      { key: 'E', text: 'Jenis bahasa ibu yang digunakan' }
    ],
    correctKey: 'A',
    explanation: 'Weber membagi dimensi stratifikasi ke dalam tiga pilar: Kelas (ekonomi), Status (kehormatan), dan Party (kekuasaan politik).'
  },
  {
    id: 18,
    text: 'Kecenderungan seorang anggota masyarakat perkotaan yang memiliki dua atau lebih posisi sosial yang menuntut peran bertentangan disebut...',
    options: [
      { key: 'A', text: 'Konflik peran (role conflict)' },
      { key: 'B', text: 'Kegagalan peran' },
      { key: 'C', text: 'Ketimpangan sosial' },
      { key: 'D', text: 'Mobilitas horizontal' },
      { key: 'E', text: 'Diferensiasi klan' }
    ],
    correctKey: 'A',
    explanation: 'Konflik peran terjadi manakala tuntutan peran dari status yang berbeda saling bertabrakan (misal seorang polisi harus memeriksa saudaranya sendiri).'
  },
  {
    id: 19,
    text: 'Contoh nyata dari mobilitas sosial antargenerasi naik adalah...',
    options: [
      { key: 'A', text: 'Seorang kakek dan anak menjadi petani, sementara cucunya berhasil menjadi menteri negara' },
      { key: 'B', text: 'Seorang guru diangkat menjadi kepala sekolah' },
      { key: 'C', text: 'Seorang manajer berpindah ke perusahaan lain dengan posisi dan gaji setara' },
      { key: 'D', text: 'Seorang pedagang sayur beralih menjual buah-buahan' },
      { key: 'E', text: 'Seorang bupati turun jabatan setelah masa bakti selesai' }
    ],
    correctKey: 'A',
    explanation: 'Mobilitas antargenerasi melibatkan perubahan status sosial dari generasi kakek/ayah ke generasi anak/cucu.'
  },
  {
    id: 20,
    text: 'Istilah "anomie" yang dikembangkan Emile Durkheim menggambarkan situasi masyarakat di mana...',
    options: [
      { key: 'A', text: 'Masyarakat mencapai kemakmuran merata' },
      { key: 'B', text: 'Terjadi ketiadaan norma atau runtuhnya pedoman nilai pemandu perilaku sosial akibat perubahan kilat' },
      { key: 'C', text: 'Seluruh warga mematuhi hukum adat tanpa celah' },
      { key: 'D', text: 'Terbentuk sistem kasta baru yang kaku' },
      { key: 'E', text: 'Solidaritas mekanik semakin kuat di perkotaan' }
    ],
    correctKey: 'B',
    explanation: 'Anomie adalah kondisi ketiadaan pegangan norma dan pedoman perilaku di masyarakat yang sedang mengalami transisi radikal.'
  },
  {
    id: 21,
    text: 'Dalam masyarakat multikultural Jakarta, sikap yang paling efektif untuk mencegah konflik antarkelompok pendatang adalah...',
    options: [
      { key: 'A', text: 'Segregasi pemukiman berdasarkan suku masing-masing' },
      { key: 'B', text: 'Mengembangkan ruang dialog lintas etnis dan menjunjung toleransi inklusif' },
      { key: 'C', text: 'Melarang penggunaan pakaian adat di ruang publik' },
      { key: 'D', text: 'Memaksakan satu budaya daerah tertentu sebagai budaya tunggal' },
      { key: 'E', text: 'Membatasi hak kepemilikan usaha bagi kelompok minoritas' }
    ],
    correctKey: 'B',
    explanation: 'Ruang dialog antarbudaya dan inklusivitas sosial memperkuat ikatan silang (cross-cutting affiliations) yang meredam konflik.'
  },
  {
    id: 22,
    text: 'Struktur sosial yang di dalamnya terjadi tumpang tindih keanggotaan kelompok (misalnya suku berbeda namun memiliki profesi dan hobi sama) disebut...',
    options: [
      { key: 'A', text: 'Interseksi sosial' },
      { key: 'B', text: 'Konsolidasi sosial' },
      { key: 'C', text: 'Polarisasi ekstrem' },
      { key: 'D', text: 'Alienasi kultural' },
      { key: 'E', text: 'Marjinalisasi absolut' }
    ],
    correctKey: 'A',
    explanation: 'Interseksi adalah persilangan keanggotaan warga dalam berbagai kelompok sosial yang mempererat kohesi sosial.'
  },
  {
    id: 23,
    text: 'Sebaliknya, konsolidasi sosial yang mempertegas batas kelompok berdasarkan suku dan agama yang sama secara homogen dapat berakibat...',
    options: [
      { key: 'A', text: 'Mempercepat proses asimilasi nasional' },
      { key: 'B', text: 'Mempertebal batas perbedaan kelompok dan memperbesar potensi gesekan konflik sosial' },
      { key: 'C', text: 'Menghilangkan primordialisme di kalangan pemuda' },
      { key: 'D', text: 'Meningkatkan angka partisipasi pemilu serentak' },
      { key: 'E', text: 'Mewujudkan kesetaraan gender dalam politik' }
    ],
    correctKey: 'B',
    explanation: 'Konsolidasi memperkuat solidaritas ke dalam (in-group) secara eksklusif sehingga rawan memunculkan prasangka terhadap kelompok luar (out-group).'
  },
  {
    id: 24,
    text: 'Upaya pemerintah memberikan bantuan beasiswa KIP Kuliah kepada siswa berprestasi dari keluarga prasejahtera merupakan sarana untuk...',
    options: [
      { key: 'A', text: 'Menghambat mobilitas sosial' },
      { key: 'B', text: 'Mendorong mobilitas sosial vertikal naik dan memutus rantai kemiskinan antargenerasi' },
      { key: 'C', text: 'Menciptakan stratifikasi tertutup baru' },
      { key: 'D', text: 'Menerapkan integrasi koersif militer' },
      { key: 'E', text: 'Memperkuat feodalisme akademik' }
    ],
    correctKey: 'B',
    explanation: 'Pendidikan tinggi memfasilitasi peningkatan kualifikasi generasi muda sehingga membuka akses mobilitas sosial naik.'
  },
  {
    id: 25,
    text: 'Peran sosiologi dalam penyusunan kebijakan pembangunan kota ramah sosial adalah...',
    options: [
      { key: 'A', text: 'Memberikan data empiris tentang relasi sosial, kebutuhan warga, dan dinamika komunitas untuk mencegah eksklusi' },
      { key: 'B', text: 'Menentukan spesifikasi teknis campuran beton gedung bertingkat' },
      { key: 'C', text: 'Menghitung besaran dividen pasar modal' },
      { key: 'D', text: 'Menegakkan vonis pidana terhadap pelanggar hukum lalu lintas' },
      { key: 'E', text: 'Merancang desain grafis baliho sosialisasi' }
    ],
    correctKey: 'A',
    explanation: 'Sosiologi memberikan pemahaman analitis berbasis fakta empiris mengenai struktur sosial agar kebijakan publik tepat sasaran dan inklusif.'
  }
];

export const QUESTIONS_PTS_SEJARAH_11 = [
  {
    id: 1,
    text: 'Dampak terpenting dari berdirinya organisasi Budi Utomo pada 20 Mei 1908 bagi perjuangan kemerdekaan Indonesia adalah...',
    options: [
      { key: 'A', text: 'Dimulainya perjuangan bersenjata serentak di seluruh Nusantara' },
      { key: 'B', text: 'Beralihnya strategi perlawanan dari fisik kedaerahan menjadi diplomasi dan organisasi modern' },
      { key: 'C', text: 'Penutupan seluruh sekolah pemerintah kolonial Hindia Belanda' },
      { key: 'D', text: 'Diusirnya Gubernur Jenderal Belanda dari Batavia' },
      { key: 'E', text: 'Terbentuknya tentara sukarela bumiputera pertama' }
    ],
    correctKey: 'B',
    explanation: 'Budi Utomo menjadi tonggak Kebangkitan Nasional karena mengubah pola perjuangan menjadi berbasis organisasi modern dan pendidikan.'
  },
  {
    id: 2,
    text: 'Kebijakan Politik Etis yang dicetuskan oleh C. Th. van Deventer pada akhir abad ke-19 dikenal dengan istilah Trilogi van Deventer yang meliputi...',
    options: [
      { key: 'A', text: 'Edukasi, Irigasi, dan Emigrasi' },
      { key: 'B', text: 'Ekonomi, Militer, dan Diplomasi' },
      { key: 'C', text: 'Kolonisasi, Monopoli, dan Kerja Paksa' },
      { key: 'D', text: 'Vendu, Agraria, dan Perkapalan' },
      { key: 'E', text: 'Devide et Impera, Verplichte Leverantie, dan Contingenten' }
    ],
    correctKey: 'A',
    explanation: 'Trilogi van Deventer terdiri dari Irigasi (pengairan), Emigrasi (transmigrasi), dan Edukasi (pendidikan).'
  },
  {
    id: 3,
    text: 'Dampak tidak terduga dari pelaksanaan program edukasi dalam Politik Etis bagi pemerintah kolonial Belanda adalah...',
    options: [
      { key: 'A', text: 'Meningkatnya produksi tebu dan kopi secara drastis' },
      { key: 'B', text: 'Lahirnya golongan terpelajar (intelektual muda) yang memelopori pergerakan nasional menentang kolonialisme' },
      { key: 'C', text: 'Seluruh rakyat bumiputera menjadi pegawai administrasi Belanda yang patuh' },
      { key: 'D', text: 'Bangkrutnya kas negara Kerajaan Belanda' },
      { key: 'E', text: 'Terhentinya perlawanan bersenjata di Aceh' }
    ],
    correctKey: 'B',
    explanation: 'Pendidikan melahirkan kaum terpelajar yang tercerahkan pikirannya dan menyadari ketidakadilan penjajahan.'
  },
  {
    id: 4,
    text: 'Tokoh Tiga Serangkai pendiri Indische Partij pada tahun 1912 adalah...',
    options: [
      { key: 'A', text: 'Soekarno, Mohammad Hatta, dan Sutan Sjahrir' },
      { key: 'B', text: 'E.F.E. Douwes Dekker, Tjipto Mangoenkoesoemo, dan Suwardi Suryaningrat' },
      { key: 'C', text: 'HOS Tjokroaminoto, Agus Salim, dan Abdul Muis' },
      { key: 'D', text: 'dr. Soetomo, dr. Wahidin Soedirohoesodo, dan Gunawan' },
      { key: 'E', text: 'Tan Malaka, Semaun, dan Darsono' }
    ],
    correctKey: 'B',
    explanation: 'Tiga Serangkai pendiri partai politik pertama di Hindia Belanda (Indische Partij) adalah Douwes Dekker, dr. Tjipto, dan Suwardi (Ki Hadjar Dewantara).'
  },
  {
    id: 5,
    text: 'Sarekat Dagang Islam (SDI) yang didirikan oleh H. Samanhudi di Solo pada 1911 pada mulanya bertujuan untuk...',
    options: [
      { key: 'A', text: 'Menghimpun kekuatan militer bumiputera' },
      { key: 'B', text: 'Melindungi kepentingan pedagang batik bumiputera dari monopoli pedagang Tionghoa' },
      { key: 'C', text: 'Mendirikan partai politik beraliran komunis' },
      { key: 'D', text: 'Mempersiapkan kemerdekaan secara gerilya' },
      { key: 'E', text: 'Membangun jalur kereta api di Jawa Tengah' }
    ],
    correctKey: 'B',
    explanation: 'SDI awalnya merupakan perkumpulan ekonomi pedagang batik pribumi sebelum berkembang menjadi Sarekat Islam (SI) di bawah kepemimpinan H.O.S. Tjokroaminoto.'
  },
  {
    id: 6,
    text: 'Kongres Pemuda II yang melahirkan ikrar monumental Sumpah Pemuda diselenggarakan pada tanggal...',
    options: [
      { key: 'A', text: '20 Mei 1908' },
      { key: 'B', text: '28 Oktober 1928' },
      { key: 'C', text: '17 Agustus 1945' },
      { key: 'D', text: '10 November 1945' },
      { key: 'E', text: '1 Juni 1945' }
    ],
    correctKey: 'B',
    explanation: 'Sumpah Pemuda diikrarkan pada 28 Oktober 1928 di Gedung Indonesische Clubgebouw (Jalan Kramat Raya 106, Jakarta).'
  },
  {
    id: 7,
    text: 'Tiga butir janji suci yang termaktub dalam ikrar Sumpah Pemuda 1928 adalah pengakuan atas...',
    options: [
      { key: 'A', text: 'Satu ideologi, satu partai, dan satu pemimpin' },
      { key: 'B', text: 'Satu tumpah darah (tanah air Indonesia), satu bangsa (bangsa Indonesia), dan menjunjung bahasa persatuan (bahasa Indonesia)' },
      { key: 'C', text: 'Satu angkatan perang, satu bendera, dan satu hukum adat' },
      { key: 'D', text: 'Satu agama, satu kebudayaan, dan satu konstitusi' },
      { key: 'E', text: 'Satu mata uang, satu presiden, dan satu parlemen' }
    ],
    correctKey: 'B',
    explanation: 'Tiga pilar persatuan Sumpah Pemuda: Tanah Air, Bangsa, dan Bahasa Persatuan Indonesia.'
  },
  {
    id: 8,
    text: 'Lagu kebangsaan "Indonesia Raya" untuk pertama kalinya diperdengarkan secara instrumental biola pada momentum...',
    options: [
      { key: 'A', text: 'Kongres Budi Utomo I di Yogyakarta' },
      { key: 'B', text: 'Kongres Pemuda II tanggal 28 Oktober 1928 oleh Wage Rudolf Soepratman' },
      { key: 'C', text: 'Proklamasi Kemerdekaan di Pegangsaan Timur' },
      { key: 'D', text: 'Sidang BPUPKI pertama' },
      { key: 'E', text: 'Peristiwa Rengasdengklok' }
    ],
    correctKey: 'B',
    explanation: 'W.R. Soepratman memainkan lagu Indonesia Raya dengan gesekan biolanya di hadapan peserta Kongres Pemuda II.'
  },
  {
    id: 9,
    text: 'Organisasi mahasiswa bumiputera di Belanda yang memelopori pemakaian nama "Indonesia" sebagai identitas politis adalah...',
    options: [
      { key: 'A', text: 'Indische Vereeniging yang kemudian menjadi Perhimpunan Indonesia (PI)' },
      { key: 'B', text: 'Jong Java' },
      { key: 'C', text: 'Jong Sumatranen Bond' },
      { key: 'D', text: 'Tri Koro Dharmo' },
      { key: 'E', text: 'GAPI' }
    ],
    correctKey: 'A',
    explanation: 'Perhimpunan Indonesia (dipimpin Moh. Hatta dkk.) mempopulerkan manifesto politik kemerdekaan dengan nama Indonesia di forum internasional.'
  },
  {
    id: 10,
    text: 'Surat kabar yang didirikan oleh Tirto Adhi Soerjo pada tahun 1907 dan menjadi pelopor pers nasional bumiputera adalah...',
    options: [
      { key: 'A', text: 'Medan Prijaji' },
      { key: 'B', text: 'De Express' },
      { key: 'C', text: 'Oetoesan Hindia' },
      { key: 'D', text: 'Fikiran Ra\'jat' },
      { key: 'E', text: 'Suara Merdeka' }
    ],
    correctKey: 'A',
    explanation: 'Medan Prijaji adalah surat kabar pertama yang dikelola, dicetak, dan diterbitkan oleh pribumi untuk membela kaum tertindas.'
  },
  {
    id: 11,
    text: 'Judul tulisan Suwardi Suryaningrat yang memprotes perayaan 100 tahun kemerdekaan Belanda dari Prancis dengan menggunakan uang rakyat Hindia Belanda adalah...',
    options: [
      { key: 'A', text: 'Als ik eens Nederlander was (Seandainya Aku Seorang Belanda)' },
      { key: 'B', text: 'Max Havelaar' },
      { key: 'C', text: 'Indonesia Menggugat' },
      { key: 'D', text: 'Mencapai Indonesia Merdeka' },
      { key: 'E', text: 'Habis Gelap Terbitlah Terang' }
    ],
    correctKey: 'A',
    explanation: 'Risalah sarkastis ini terbit di harian De Express pada Juli 1913 dan membuat Ki Hadjar Dewantara diasingkan ke Belanda.'
  },
  {
    id: 12,
    text: 'Partai Nasional Indonesia (PNI) yang didirikan oleh Ir. Soekarno di Bandung pada 4 Juli 1927 mengusung asas perjuangan...',
    options: [
      { key: 'A', text: 'Kooperasi moderat terhadap pemerintah Hindia Belanda' },
      { key: 'B', text: 'Non-kooperasi (mandiri/self-reliance) dan marhaenisme' },
      { key: 'C', text: 'Kedaerahan Jawa Sentris' },
      { key: 'D', text: 'Komunisme internasional' },
      { key: 'E', text: 'Pasifisme tanpa aksi' }
    ],
    correctKey: 'B',
    explanation: 'PNI menolak bekerja sama dengan dewan kolonial (non-kooperatif) dan berjuang merebut kemerdekaan penuh melalui massa rakyat.'
  },
  {
    id: 13,
    text: 'Pidato pembelaan monumental Bung Karno saat diajukan ke pengadilan kolonial Bandung (Landraad) pada tahun 1930 berjudul...',
    options: [
      { key: 'A', text: 'Indonesia Merdeka' },
      { key: 'B', text: 'Indonesia Menggugat' },
      { key: 'C', text: 'Nawaksara' },
      { key: 'D', text: 'Jasmerah' },
      { key: 'E', text: 'Bung Karno Menjawab' }
    ],
    correctKey: 'B',
    explanation: '"Indonesia Menggugat" membongkar borok imperialisme dan kapitalisme kolonial yang menyengsarakan rakyat pribumi.'
  },
  {
    id: 14,
    text: 'Dewan Rakyat buatan Belanda yang dibentuk pada tahun 1918 sebagai penampung aspirasi politik kaum bumiputera dan perwakilan Belanda bernama...',
    options: [
      { key: 'A', text: 'Volksraad' },
      { key: 'B', text: 'Raad van Indie' },
      { key: 'C', text: 'Staten Generaal' },
      { key: 'D', text: 'Algemeene Secretarie' },
      { key: 'E', text: 'Hoge Raad' }
    ],
    correctKey: 'A',
    explanation: 'Volksraad adalah dewan perwakilan semu yang didirikan Belanda, tempat tokoh seperti M.H. Thamrin menyuarakan aspirasi bangsa.'
  },
  {
    id: 15,
    text: 'Organisasi kepemudaan pertama yang didirikan oleh R. Satiman Wiryosanjoyo pada 1915 sebelum berubah nama menjadi Jong Java adalah...',
    options: [
      { key: 'A', text: 'Tri Koro Dharmo' },
      { key: 'B', text: 'Jong Ambon' },
      { key: 'C', text: 'Jong Celebes' },
      { key: 'D', text: 'Pemuda Kaum Betawi' },
      { key: 'E', text: 'Perhimpunan Pelajar-Pelajar Indonesia (PPPI)' }
    ],
    correctKey: 'A',
    explanation: 'Tri Koro Dharmo bermakna Tiga Tujuan Mulia (Sakti, Budi, Bakti), kemudian berganti nama menjadi Jong Java pada 1918.'
  },
  {
    id: 16,
    text: 'Ketua panitia penyelenggara Kongres Pemuda II tahun 1928 yang berasal dari Perhimpunan Pelajar-Pelajar Indonesia (PPPI) adalah...',
    options: [
      { key: 'A', text: 'Soegondo Djojopoespito' },
      { key: 'B', text: 'Djoko Marsaid' },
      { key: 'C', text: 'Mohammad Yamin' },
      { key: 'D', text: 'Amir Sjarifoeddin' },
      { key: 'E', text: 'Senduk' }
    ],
    correctKey: 'A',
    explanation: 'Soegondo Djojopoespito memimpin jalannya rapat Kongres Pemuda II didampingi Djoko Marsaid (wakil) dan Moh. Yamin (sekretaris).'
  },
  {
    id: 17,
    text: 'Tokoh pemuda yang merumuskan teks ikrar Sumpah Pemuda dalam secarik kertas di sela-sela pidato Mr. Sunario adalah...',
    options: [
      { key: 'A', text: 'Mohammad Yamin' },
      { key: 'B', text: 'Buntaran Martoatmodjo' },
      { key: 'C', text: 'Johannes Leimena' },
      { key: 'D', text: 'Arnold Mononutu' },
      { key: 'E', text: 'Kasman Singodimedjo' }
    ],
    correctKey: 'A',
    explanation: 'Mohammad Yamin menuliskan rumusan tiga klausul persatuan yang disetujui oleh Soegondo dan seluruh peserta kongres.'
  },
  {
    id: 18,
    text: 'Sebab utama kegagalan perjuangan perlawanan rakyat Indonesia sebelum abad ke-20 (sebelum era pergerakan nasional) adalah...',
    options: [
      { key: 'A', text: 'Bangsa Indonesia kekurangan rempah-rempah untuk berdagang' },
      { key: 'B', text: 'Perjuangan masih bersifat kedaerahan, dipimpin tokoh karismatik, dan mudah diadu domba (devide et impera)' },
      { key: 'C', text: 'Belanda memiliki armada kapal selam modern' },
      { key: 'D', text: 'Rakyat tidak memiliki persenjataan tradisional' },
      { key: 'E', text: 'Adanya intervensi dari negara-negara Liga Bangsa-Bangsa' }
    ],
    correctKey: 'B',
    explanation: 'Sebelum 1908, perlawanan terpecah per daerah dan langsung padam ketika pemimpinnya ditangkap atau wafat.'
  },
  {
    id: 19,
    text: 'Peristiwa pecahnya Sarekat Islam (SI) menjadi SI Putih dan SI Merah pada kongres tahun 1921 disebabkan oleh...',
    options: [
      { key: 'A', text: 'Perebutan dana kas organisasi oleh pengurus cabang' },
      { key: 'B', text: 'Infiltrasi paham marxisme/komunisme yang disebarkan tokoh ISDV (Snevliet) ke dalam tubuh cabang SI Semarang' },
      { key: 'C', text: 'Perbedaan sikap terhadap Perang Dunia I' },
      { key: 'D', text: 'Perubahan logo organisasi' },
      { key: 'E', text: 'Penolakan anggota terhadap kepemimpinan H.O.S. Tjokroaminoto' }
    ],
    correctKey: 'B',
    explanation: 'Semaun dan Darsono membawa ideologi komunis ke SI Semarang sehingga dipisahkan dari SI Putih yang berazaskan Islam murni.'
  },
  {
    id: 20,
    text: 'GAPI (Gabungan Politik Indonesia) yang dibentuk pada tahun 1939 memelopori tuntutan politik kepada pemerintah Belanda dengan semboyan...',
    options: [
      { key: 'A', text: 'Indonesia Berparlemen' },
      { key: 'B', text: 'Indonesia Menggugat' },
      { key: 'C', text: 'Berdikari' },
      { key: 'D', text: 'Merdeka atau Mati' },
      { key: 'E', text: 'Hak Menentukan Nasib Sendiri' }
    ],
    correctKey: 'A',
    explanation: 'GAPI menuntut pembentukan parlemen sejati yang dipilih langsung oleh rakyat Indonesia (Indonesia Berparlemen).'
  },
  {
    id: 21,
    text: 'Kongres Perempuan Indonesia I yang menjadi tonggak pergerakan kesetaraan perempuan diselenggarakan pada tanggal 22 Desember 1928 di...',
    options: [
      { key: 'A', text: 'Surabaya' },
      { key: 'B', text: 'Yogyakarta' },
      { key: 'C', text: 'Bandung' },
      { key: 'D', text: 'Semarang' },
      { key: 'E', text: 'Surakarta' }
    ],
    correctKey: 'B',
    explanation: 'Kongres Perempuan Indonesia I di Yogyakarta kini diperingati secara nasional sebagai Hari Ibu setiap 22 Desember.'
  },
  {
    id: 22,
    text: 'Surat-surat R.A. Kartini kepada sahabat penanya di Belanda yang dihimpun oleh J.H. Abendanon diterbitkan dalam sebuah buku terkenal berjudul...',
    options: [
      { key: 'A', text: 'Door Duisternis tot Licht (Habis Gelap Terbitlah Terang)' },
      { key: 'B', text: 'Max Havelaar' },
      { key: 'C', text: 'Gadis Pantai' },
      { key: 'D', text: 'Bumi Manusia' },
      { key: 'E', text: 'Layar Terkembang' }
    ],
    correctKey: 'A',
    explanation: 'Buku ini memuat gagasan progresif Kartini mengenai emansipasi pendidikan dan kebebasan berpikir bagi wanita bumiputera.'
  },
  {
    id: 23,
    text: 'Sekolah perguruan nasional yang didirikan oleh Ki Hadjar Dewantara pada 3 Juli 1922 di Yogyakarta adalah...',
    options: [
      { key: 'A', text: 'Ksatrian Instituut' },
      { key: 'B', text: 'Taman Siswa' },
      { key: 'C', text: 'INS Kayutanam' },
      { key: 'D', text: 'Muhammadiyah School' },
      { key: 'E', text: 'STOVIA' }
    ],
    correctKey: 'B',
    explanation: 'Taman Siswa mengusung sistem pendidikan pamong dengan semboyan: Ing Ngarso Sung Tulodo, Ing Madyo Mangun Karso, Tut Wuri Handayani.'
  },
  {
    id: 24,
    text: 'Sekolah kedokteran untuk anak-anak bumiputera di Batavia yang menjadi tempat lahirnya Budi Utomo adalah...',
    options: [
      { key: 'A', text: 'THS (Technische Hoogeschool)' },
      { key: 'B', text: 'STOVIA (School tot Opleiding van Inlandsche Artsen)' },
      { key: 'C', text: 'RHS (Rechtshoogeschool)' },
      { key: 'D', text: 'AMS (Algemene Middelbare School)' },
      { key: 'E', text: 'HBS (Hogere Burgerschool)' }
    ],
    correctKey: 'B',
    explanation: 'Para mahasiswa STOVIA seperti Sutomo, Gunawan Mangunkusumo, dan Soeradji merintis berdirinya Budi Utomo di gedung anatomi STOVIA.'
  },
  {
    id: 25,
    text: 'Makna paling mendalam dari peristiwa Sumpah Pemuda bagi generasi penerus bangsa Indonesia saat ini adalah...',
    options: [
      { key: 'A', text: 'Mengharuskan semua warga berpindah ke ibu kota negara' },
      { key: 'B', text: 'Menjaga persatuan dan kesatuan nasional di atas segala perbedaan suku, agama, dan golongan demi kemajuan bangsa' },
      { key: 'C', text: 'Menolak kerja sama ekonomi internasional' },
      { key: 'D', text: 'Mewajibkan penggunaan pakaian tradisional setiap hari kerja' },
      { key: 'E', text: 'Membubarkan semua organisasi kepemudaan kedaerahan' }
    ],
    correctKey: 'B',
    explanation: 'Sumpah Pemuda adalah kesepakatan luhur mengikat kebinekaan Nusantara menjadi satu ikatan persaudaraan kebangsaan yang utuh.'
  }
];

export const QUESTIONS_PTS_EKONOMI_11 = [
  {
    id: 1,
    text: 'Instrumen kebijakan moneter yang dilakukan Bank Indonesia dengan cara menaikkan suku bunga acuan guna menekan laju inflasi dinamakan...',
    options: [
      { key: 'A', text: 'Politik Pasar Terbuka (Open Market Operation)' },
      { key: 'B', text: 'Kebijakan Diskonto (Discount Policy)' },
      { key: 'C', text: 'Cadangan Kas Minimum (Cash Ratio)' },
      { key: 'D', text: 'Kebijakan Kredit Selektif' },
      { key: 'E', text: 'Himbauan Moral (Moral Suasion)' }
    ],
    correctKey: 'B',
    explanation: 'Kebijakan diskonto adalah instrumen pengontrolan jumlah uang beredar dengan menaikkan atau menurunkan suku bunga bank sentral.'
  },
  {
    id: 2,
    text: 'Nilai total barang dan jasa akhir yang dihasilkan oleh seluruh unit produksi di dalam batas wilayah teritorial suatu negara selama satu tahun disebut...',
    options: [
      { key: 'A', text: 'Produk Domestik Bruto (Gross Domestic Product / GDP)' },
      { key: 'B', text: 'Produk Nasional Bruto (Gross National Product / GNP)' },
      { key: 'C', text: 'Pendapatan Nasional Neto (Net National Income / NNI)' },
      { key: 'D', text: 'Pendapatan Perseorangan (Personal Income)' },
      { key: 'E', text: 'Pendapatan Disposabel (Disposable Income)' }
    ],
    correctKey: 'A',
    explanation: 'GDP/PDB menghitung seluruh nilai produksi di dalam wilayah geografis negara tanpa membedakan kewarganegaraan pemilik faktor produksi.'
  },
  {
    id: 3,
    text: 'Rumus perhitungan Pendapatan Nasional dengan metode pendekatan pengeluaran adalah...',
    options: [
      { key: 'A', text: 'Y = r + w + i + p' },
      { key: 'B', text: 'Y = C + I + G + (X - M)' },
      { key: 'C', text: 'Y = (P1 · Q1) + (P2 · Q2) + ... + (Pn · Qn)' },
      { key: 'D', text: 'Y = PNB - Pajak Langsung' },
      { key: 'E', text: 'Y = Tabungan + Investasi' }
    ],
    correctKey: 'B',
    explanation: 'Pendekatan pengeluaran menjumlahkan konsumsi rumah tangga (C), investasi (I), pengeluaran pemerintah (G), dan ekspor bersih (X - M).'
  },
  {
    id: 4,
    text: 'Pendapatan perseorangan dikurangi dengan pajak langsung menghasilkan...',
    options: [
      { key: 'A', text: 'Pendapatan Nasional Bersih' },
      { key: 'B', text: 'Pendapatan Disposabel (Disposable Income)' },
      { key: 'C', text: 'Produk Domestik Regional Bruto' },
      { key: 'D', text: 'Laba ditahan perusahaan' },
      { key: 'E', text: 'Pajak Pertambahan Nilai' }
    ],
    correctKey: 'B',
    explanation: 'Disposable Income adalah sisa pendapatan riil yang siap dibelanjakan atau ditabung setelah dikurangi kewajiban pajak langsung.'
  },
  {
    id: 5,
    text: 'Jika Produk Nasional Bruto (PNB) suatu negara lebih kecil daripada Produk Domestik Bruto (PDB), hal itu mengindikasikan bahwa...',
    options: [
      { key: 'A', text: 'Pendapatan faktor produksi warga negara di luar negeri lebih besar daripada pendapatan warga asing di dalam negeri' },
      { key: 'B', text: 'Pendapatan faktor produksi warga negara asing di dalam negeri lebih besar daripada pendapatan warga negara di luar negeri' },
      { key: 'C', text: 'Negara tersebut tidak memiliki utang luar negeri' },
      { key: 'D', text: 'Ekspor negara tersebut mengalami surplus neraca perdagangan' },
      { key: 'E', text: 'Laju inflasi berada pada level negatif (deflasi)' }
    ],
    correctKey: 'B',
    explanation: 'PDB > PNB menunjukkan arus penghasilan warga negara asing di dalam negeri (pembayaran faktor neto ke luar negeri) bernilai positif.'
  },
  {
    id: 6,
    text: 'Kebijakan pemerintah yang mengatur penerimaan (pajak) dan pengeluaran belanja negara melalui APBN untuk menjaga stabilitas makro disebut...',
    options: [
      { key: 'A', text: 'Kebijakan Moneter' },
      { key: 'B', text: 'Kebijakan Fiskal' },
      { key: 'C', text: 'Kebijakan Perdagangan Luar Negeri' },
      { key: 'D', text: 'Kebijakan Upah Minimum' },
      { key: 'E', text: 'Kebijakan Pembatasan Impor' }
    ],
    correctKey: 'B',
    explanation: 'Kebijakan fiskal dijalankan oleh Kementerian Keuangan melalui instrumen anggaran belanja dan perpajakan.'
  },
  {
    id: 7,
    text: 'Manakah tindakan berikut yang tergolong ke dalam kebijakan fiskal ekspansif saat terjadi kelesuan ekonomi (resesi)?',
    options: [
      { key: 'A', text: 'Menaikkan tarif pajak penghasilan dan memangkas anggaran subsidi' },
      { key: 'B', text: 'Menurunkan tarif pajak dan meningkatkan belanja infrastruktur negara' },
      { key: 'C', text: 'Menaikkan suku bunga simpanan perbankan' },
      { key: 'D', text: 'Menjual Surat Berharga Negara kepada masyarakat' },
      { key: 'E', text: 'Membatasi kuota impor barang modal' }
    ],
    correctKey: 'B',
    explanation: 'Fiskal ekspansif memacu daya beli dan perputaran ekonomi dengan cara menurunkan pajak serta memperbesar belanja modal negara.'
  },
  {
    id: 8,
    text: 'Indikator statistik yang paling umum digunakan untuk mengukur tingkat ketimpangan distribusi pendapatan masyarakat dalam suatu negara adalah...',
    options: [
      { key: 'A', text: 'Kurva Phillips' },
      { key: 'B', text: 'Koefisien Gini (Gini Ratio) dan Kurva Lorenz' },
      { key: 'C', text: 'Indeks Harga Konsumen' },
      { key: 'D', text: 'Rasio Kecukupan Modal (CAR)' },
      { key: 'E', text: 'Tingkat Partisipasi Angkatan Kerja' }
    ],
    correctKey: 'B',
    explanation: 'Koefisien Gini berkisar antara 0 (pemerataan sempurna) hingga 1 (ketimpangan mutlak), direpresentasikan melalui Kurva Lorenz.'
  },
  {
    id: 9,
    text: 'Pengangguran yang timbul karena adanya kesenjangan antara keterampilan pencari kerja dengan kualifikasi yang dibutuhkan oleh dunia industri modern dinamakan...',
    options: [
      { key: 'A', text: 'Pengangguran Friksional' },
      { key: 'B', text: 'Pengangguran Struktural' },
      { key: 'C', text: 'Pengangguran Siklikal/Konjungtur' },
      { key: 'D', text: 'Pengangguran Musiman' },
      { key: 'E', text: 'Pengangguran Terselubung' }
    ],
    correctKey: 'B',
    explanation: 'Pengangguran struktural terjadi akibat pergeseran struktur ekonomi (misal otomasi mesin) yang membuat keahlian lama tidak cocok lagi.'
  },
  {
    id: 10,
    text: 'Jenis pengangguran sementara yang dialami seseorang saat menunggu panggilan kerja atau sedang berpindah ke tempat kerja baru dinamakan...',
    options: [
      { key: 'A', text: 'Pengangguran Struktural' },
      { key: 'B', text: 'Pengangguran Friksional' },
      { key: 'C', text: 'Pengangguran Siklikal' },
      { key: 'D', text: 'Pengangguran Terbuka' },
      { key: 'E', text: 'Setengah Menganggur' }
    ],
    correctKey: 'B',
    explanation: 'Pengangguran friksional bersifat sementara karena waktu tunggu dan kendala informasi perpindahan pekerjaan.'
  },
  {
    id: 11,
    text: 'Inflasi yang disebabkan oleh lonjakan biaya produksi barang (seperti kenaikan harga BBM atau upah buruh) disebut...',
    options: [
      { key: 'A', text: 'Demand Pull Inflation' },
      { key: 'B', text: 'Cost Push Inflation' },
      { key: 'C', text: 'Imported Inflation' },
      { key: 'D', text: 'Hyperinflation' },
      { key: 'E', text: 'Core Inflation' }
    ],
    correctKey: 'B',
    explanation: 'Cost push inflation terjadi saat dorongan kenaikan biaya input memaksa produsen menaikkan harga jual produk ke pasar.'
  },
  {
    id: 12,
    text: 'Pihak yang paling diuntungkan dengan terjadinya inflasi yang tidak terduga adalah...',
    options: [
      { key: 'A', text: 'Pegawai dengan gaji tetap bulanan' },
      { key: 'B', text: 'Debitur (pihak yang berutang dengan tingkat bunga tetap)' },
      { key: 'C', text: 'Kreditur (pihak yang meminjamkan uang)' },
      { key: 'D', text: 'Penyimpan uang tunai di celengan rumah' },
      { key: 'E', text: 'Pensiunan yang hidup dari dana pensiun nominal tetap' }
    ],
    correctKey: 'B',
    explanation: 'Debitur diuntungkan karena nilai riil dari uang yang dikembalikannya di masa datang menjadi lebih rendah nilainya akibat inflasi.'
  },
  {
    id: 13,
    text: 'Tugas utama Otoritas Jasa Keuangan (OJK) di Indonesia menurut undang-undang adalah...',
    options: [
      { key: 'A', text: 'Mencetak dan mengedarkan uang Rupiah' },
      { key: 'B', text: 'Mengatur dan mengawasi kegiatan di sektor jasa keuangan perbankan, pasar modal, dan IKNB' },
      { key: 'C', text: 'Menetapkan besaran APBN tahunan' },
      { key: 'D', text: 'Mengelola penerimaan pajak bea dan cukai' },
      { key: 'E', text: 'Menentukan suku bunga pinjaman antarnegara' }
    ],
    correctKey: 'B',
    explanation: 'OJK adalah lembaga independen yang berwenang mengatur dan mengawasi seluruh lembaga jasa keuangan di Indonesia.'
  },
  {
    id: 14,
    text: 'Surat berharga bukti kepemilikan modal atas suatu perseroan terbatas (PT) yang diperdagangkan di Bursa Efek Indonesia dinamakan...',
    options: [
      { key: 'A', text: 'Obligasi' },
      { key: 'B', text: 'Saham (Stock)' },
      { key: 'C', text: 'Sukuk' },
      { key: 'D', text: 'Waran' },
      { key: 'E', text: 'Deposito Berjangka' }
    ],
    correctKey: 'B',
    explanation: 'Saham merupakan surat berharga tanda penyertaan modal seseorang atau badan usaha pada suatu korporasi.'
  },
  {
    id: 15,
    text: 'Imbalan keuntungan yang dibagikan oleh emiten kepada para pemegang saham dari perolehan laba bersih perusahaan disebut...',
    options: [
      { key: 'A', text: 'Kupon bunga' },
      { key: 'B', text: 'Dividen' },
      { key: 'C', text: 'Capital Gain' },
      { key: 'D', text: 'Underwriting fee' },
      { key: 'E', text: 'Premi asuransi' }
    ],
    correctKey: 'B',
    explanation: 'Dividen adalah pembagian keuntungan hasil usaha perusahaan kepada para pemegang saham secara proporsional.'
  },
  {
    id: 16,
    text: 'Jika seorang investor membeli saham pada harga Rp3.000 per lembar dan menjualnya kembali pada harga Rp3.800 per lembar, keuntungan tersebut dinamakan...',
    options: [
      { key: 'A', text: 'Dividen tunai' },
      { key: 'B', text: 'Capital Gain' },
      { key: 'C', text: 'Capital Loss' },
      { key: 'D', text: 'Bunga majemuk' },
      { key: 'E', text: 'Diskonto pasar' }
    ],
    correctKey: 'B',
    explanation: 'Capital gain adalah keuntungan selisih positif antara harga jual dan harga beli suatu aset efek investasi.'
  },
  {
    id: 17,
    text: 'Manakah yang termasuk fungsi stabilisasi dari Anggaran Pendapatan dan Belanja Negara (APBN)?',
    options: [
      { key: 'A', text: 'Membagi belanja negara untuk berbagai pos kementerian' },
      { key: 'B', text: 'Memelihara keseimbangan fundamental ekonomi dan mencegah guncangan inflasi atau deflasi parah' },
      { key: 'C', text: 'Menarik pajak penghasilan dari warga berpendapatan tinggi' },
      { key: 'D', text: 'Membayar cicilan bunga utang luar negeri' },
      { key: 'E', text: 'Menetapkan pedoman gaji aparatur sipil negara' }
    ],
    correctKey: 'B',
    explanation: 'Fungsi stabilisasi APBN bertujuan menjaga kestabilan daya beli, nilai tukar mata uang, dan kesempatan kerja nasional.'
  },
  {
    id: 18,
    text: 'Pajak yang bebannya tidak dapat dilimpahkan kepada pihak lain dan wajib dibayar langsung oleh subjek pajaknya (seperti PPh) disebut...',
    options: [
      { key: 'A', text: 'Pajak Tidak Langsung' },
      { key: 'B', text: 'Pajak Langsung' },
      { key: 'C', text: 'Pajak Pertambahan Nilai (PPN)' },
      { key: 'D', text: 'Cukai Hasil Tembakau' },
      { key: 'E', text: 'Bea Masuk Barang Impor' }
    ],
    correctKey: 'B',
    explanation: 'Pajak langsung ditanggung sepenuhnya oleh wajib pajak terdaftar tanpa bisa digeserkan kepada konsumen.'
  },
  {
    id: 19,
    text: 'Prinsip tarif pajak di mana persentase tarifnya semakin tinggi seiring dengan bertambah besarnya penghasilan wajib pajak disebut tarif...',
    options: [
      { key: 'A', text: 'Proporsional' },
      { key: 'B', text: 'Progresif' },
      { key: 'C', text: 'Degresif' },
      { key: 'D', text: 'Tetap' },
      { key: 'E', text: 'Nominal' }
    ],
    correctKey: 'B',
    explanation: 'Tarif progresif (seperti tarif PPh Orang Pribadi) mengenakan persentase lebih besar pada lapisan pendapatan yang lebih tinggi.'
  },
  {
    id: 20,
    text: 'Apabila nilai ekspor suatu negara lebih besar daripada nilai impornya (X > M), maka neraca perdagangan negara tersebut mengalami...',
    options: [
      { key: 'A', text: 'Defisit' },
      { key: 'B', text: 'Surplus' },
      { key: 'C', text: 'Keseimbangan statis' },
      { key: 'D', text: 'Devaluasi' },
      { key: 'E', text: 'Depresiasi' }
    ],
    correctKey: 'B',
    explanation: 'Surplus perdagangan tercapai saat devisa penerimaan ekspor melampaui nilai pengeluaran belanja impor.'
  },
  {
    id: 21,
    text: 'Teori keunggulan komparatif (Comparative Advantage) dalam perdagangan internasional pertama kali dikemukakan oleh ekonom...',
    options: [
      { key: 'A', text: 'Adam Smith' },
      { key: 'B', text: 'David Ricardo' },
      { key: 'C', text: 'John Maynard Keynes' },
      { key: 'D', text: 'Milton Friedman' },
      { key: 'E', text: 'Alfred Marshall' }
    ],
    correctKey: 'B',
    explanation: 'David Ricardo merumuskan bahwa negara tetap diuntungkan berdagang jika berspesialisasi pada komoditas dengan biaya peluang (opportunity cost) terendah.'
  },
  {
    id: 22,
    text: 'Kebijakan penetapan kuota impor oleh pemerintah bertujuan untuk...',
    options: [
      { key: 'A', text: 'Menambah jumlah devisa keluar' },
      { key: 'B', text: 'Membatasi jumlah fisik barang impor yang boleh masuk demi melindungi produsen dalam negeri' },
      { key: 'C', text: 'Menghapuskan bea masuk bagi seluruh negara anggota' },
      { key: 'D', text: 'Mempercepat pengosongan stok di gudang pelabuhan' },
      { key: 'E', text: 'Mendorong masyarakat membeli barang luar negeri' }
    ],
    correctKey: 'B',
    explanation: 'Kuota impor membatasi volume fisik barang impor agar produk domestik tidak tergilas barang impor murah.'
  },
  {
    id: 23,
    text: 'Kebijakan menjual barang di pasar luar negeri dengan harga yang lebih murah daripada harga jual di pasar dalam negeri dinamakan...',
    options: [
      { key: 'A', text: 'Tarif proteksi' },
      { key: 'B', text: 'Dumping' },
      { key: 'C', text: 'Embargo' },
      { key: 'D', text: 'Subsidi ekspor' },
      { key: 'E', text: 'Premi devisa' }
    ],
    correctKey: 'B',
    explanation: 'Dumping adalah praktik diskriminasi harga internasional yang kerap dilarang oleh organisasi perdagangan dunia (WTO).'
  },
  {
    id: 24,
    text: 'Suatu negara memiliki data PDB sebesar Rp1.200 Triliun, pendapatan WNA di dalam negeri Rp200 Triliun, dan pendapatan WNI di luar negeri Rp150 Triliun. Berapakah Produk Nasional Bruto (PNB)?',
    options: [
      { key: 'A', text: 'Rp1.150 Triliun' },
      { key: 'B', text: 'Rp1.250 Triliun' },
      { key: 'C', text: 'Rp1.050 Triliun' },
      { key: 'D', text: 'Rp1.350 Triliun' },
      { key: 'E', text: 'Rp1.400 Triliun' }
    ],
    correctKey: 'A',
    explanation: 'PNB = PDB + (Pendapatan WNI LN - Pendapatan WNA DN) = 1.200 + (150 - 200) = 1.200 - 50 = Rp1.150 Triliun.'
  },
  {
    id: 25,
    text: 'Manakah peran generasi muda SMA yang paling nyata dalam mendukung stabilitas ekonomi nasional?',
    options: [
      { key: 'A', text: 'Konsumtif membeli produk impor branded' },
      { key: 'B', text: 'Mengembangkan literasi keuangan cerdas, cinta produk buatan dalam negeri, dan belajar berwirausaha digital kreatif' },
      { key: 'C', text: 'Menyimpan seluruh uang dalam bentuk mata uang asing' },
      { key: 'D', text: 'Menghindari pembayaran pajak kendaraan bermotor' },
      { key: 'E', text: 'Mengikuti skema pinjaman online ilegal yang tidak terdaftar OJK' }
    ],
    correctKey: 'B',
    explanation: 'Literasi keuangan, kebiasaan menabung/investasi legal, serta mengonsumsi produk lokal adalah pondasi ketahanan ekonomi nasional.'
  }
];

export const QUESTIONS_PAS_KIMIA_11 = [
  {
    id: 1,
    text: 'Sebanyak 25 mL larutan HCl dititrasi dengan larutan standar NaOH 0.1 M menggunakan indikator fenolftalein. Jika titik ekuivalen tercapai saat volume NaOH terpakai 20 mL, berapa molaritas larutan HCl?',
    options: [
      { key: 'A', text: '0.04 M' },
      { key: 'B', text: '0.08 M' },
      { key: 'C', text: '0.10 M' },
      { key: 'D', text: '0.12 M' },
      { key: 'E', text: '0.15 M' }
    ],
    correctKey: 'B',
    explanation: 'Va · Ma · na = Vb · Mb · nb -> 25 · Ma · 1 = 20 · 0.1 · 1 -> 25 Ma = 2 -> Ma = 0.08 M.'
  },
  {
    id: 2,
    text: 'Trayek pH indikator fenolftalein (PP) beserta perubahan warnanya dari asam ke basa adalah...',
    options: [
      { key: 'A', text: 'pH 1.2 - 2.8: merah ke kuning' },
      { key: 'B', text: 'pH 8.3 - 10.0: tidak berwarna (bening) menjadi merah muda keunguan' },
      { key: 'C', text: 'pH 6.0 - 7.6: kuning menjadi biru' },
      { key: 'D', text: 'pH 4.2 - 6.3: merah menjadi kuning' },
      { key: 'E', text: 'pH 3.1 - 4.4: merah menjadi jingga' }
    ],
    correctKey: 'B',
    explanation: 'Fenolftalein tidak berwarna pada pH < 8.3 dan berubah merah muda pada pH > 8.3 hingga 10.0.'
  },
  {
    id: 3,
    text: 'Larutan HCl 0.01 M memiliki derajat keasaman (pH) sebesar...',
    options: [
      { key: 'A', text: '1' },
      { key: 'B', text: '2' },
      { key: 'C', text: '3' },
      { key: 'D', text: '12' },
      { key: 'E', text: '13' }
    ],
    correctKey: 'B',
    explanation: '[H+] = M · valensi = 0.01 · 1 = 10⁻² M. pH = -log[H+] = -log(10⁻²) = 2.'
  },
  {
    id: 4,
    text: 'Berapakah pH larutan NaOH 0.01 M pada suhu 25°C?',
    options: [
      { key: 'A', text: '2' },
      { key: 'B', text: '7' },
      { key: 'C', text: '12' },
      { key: 'D', text: '13' },
      { key: 'E', text: '14' }
    ],
    correctKey: 'C',
    explanation: '[OH-] = 0.01 = 10⁻² M -> pOH = 2 -> pH = 14 - pOH = 14 - 2 = 12.'
  },
  {
    id: 5,
    text: 'Campuran antara 100 mL CH3COOH 0.1 M (Ka = 10⁻⁵) dengan 50 mL NaOH 0.1 M akan membentuk...',
    options: [
      { key: 'A', text: 'Larutan penyangga (buffer) asam' },
      { key: 'B', text: 'Larutan penyangga (buffer) basa' },
      { key: 'C', text: 'Garam terhidrolisis sempurna' },
      { key: 'D', text: 'Larutan netral murni pH = 7' },
      { key: 'E', text: 'Larutan asam kuat berlebih' }
    ],
    correctKey: 'A',
    explanation: 'Mol CH3COOH = 10 mmol, mol NaOH = 5 mmol. Sisa 5 mmol asam lemah dan terbentuk 5 mmol basa konjugasi (CH3COO-), membentuk buffer asam.'
  },
  {
    id: 6,
    text: 'Berapakah pH larutan penyangga yang terbentuk pada nomor 5?',
    options: [
      { key: 'A', text: '4' },
      { key: 'B', text: '5' },
      { key: 'C', text: '6' },
      { key: 'D', text: '8' },
      { key: 'E', text: '9' }
    ],
    correctKey: 'B',
    explanation: '[H+] = Ka · (mol asam sisa / mol basa konjugasi) = 10⁻⁵ · (5 / 5) = 10⁻⁵ M -> pH = 5.'
  },
  {
    id: 7,
    text: 'Garam berikut yang dalam air mengalami hidrolisis parsial dan menghasilkan larutan bersifat basa adalah...',
    options: [
      { key: 'A', text: 'NaCl' },
      { key: 'B', text: 'NH4Cl' },
      { key: 'C', text: 'CH3COONa' },
      { key: 'D', text: 'K2SO4' },
      { key: 'E', text: 'Ba(NO3)2' }
    ],
    correctKey: 'C',
    explanation: 'CH3COONa berasal dari asam lemah CH3COOH dan basa kuat NaOH. Anion CH3COO- terhidrolisis menghasilkan ion OH- sehingga bersifat basa.'
  },
  {
    id: 8,
    text: 'Pada titrasi 25 mL asam lemah CH3COOH 0.1 M dengan larutan basa kuat NaOH 0.1 M, pH pada titik ekuivalen adalah...',
    options: [
      { key: 'A', text: 'Kurang dari 7 (asam)' },
      { key: 'B', text: 'Tepat sama dengan 7 (netral)' },
      { key: 'C', text: 'Lebih besar dari 7 (basa)' },
      { key: 'D', text: 'Nol' },
      { key: 'E', text: 'Sangat asam pH = 1' }
    ],
    correctKey: 'C',
    explanation: 'Pada titik ekuivalen asam lemah vs basa kuat, terbentuk garam CH3COONa yang terhidrolisis menghasilkan suasana basa (pH > 7).'
  },
  {
    id: 9,
    text: 'Buret dalam praktikum titrasi asam basa berfungsi sebagai...',
    options: [
      { key: 'A', text: 'Wadah analit yang dititrasi' },
      { key: 'B', text: 'Pipa ukur berskala dengan kran presisi untuk meneteskan titran secara terukur' },
      { key: 'C', text: 'Alat pengaduk magnetik' },
      { key: 'D', text: 'Wadah pencuci sisa asam' },
      { key: 'E', text: 'Penutup labu erlenmeyer' }
    ],
    correctKey: 'B',
    explanation: 'Buret adalah alat kaca berbentuk tabung panjang berskala dengan keran di ujung bawah untuk mengalirkan titran.'
  },
  {
    id: 10,
    text: 'Larutan penyangga dalam darah manusia yang menjaga pH darah tetap stabil pada kisaran 7.35 - 7.45 adalah pasangan...',
    options: [
      { key: 'A', text: 'H2CO3 dan HCO3⁻ (asam karbonat dan bikarbonat)' },
      { key: 'B', text: 'HCl dan Cl⁻' },
      { key: 'C', text: 'CH3COOH dan CH3COO⁻' },
      { key: 'D', text: 'NH4OH dan NH4⁺' },
      { key: 'E', text: 'H2SO4 dan HSO4⁻' }
    ],
    correctKey: 'A',
    explanation: 'Sistem penyangga utama darah adalah H2CO3 / HCO3⁻ yang menjaga kestabilan asam-basa cairan ekstraseluler.'
  },
  {
    id: 11,
    text: 'Sifat larutan penyangga (buffer) yang paling mendasar adalah...',
    options: [
      { key: 'A', text: 'pH selalu netral bernilai 7' },
      { key: 'B', text: 'Mampu mempertahankan nilai pH dari perubahan drastis akibat penambahan sedikit asam, basa, atau pengenceran' },
      { key: 'C', text: 'Dapat mengendapkan seluruh ion logam berat' },
      { key: 'D', text: 'Berubah warna menjadi merah jika terkena cahaya' },
      { key: 'E', text: 'Memiliki konduktivitas listrik isolator murni' }
    ],
    correctKey: 'B',
    explanation: 'Larutan penyangga berfungsi meredam perubahan pH saat ditambah sedikit asam kuat, basa kuat, atau diencerkan.'
  },
  {
    id: 12,
    text: 'Jika tetapan hasil kali kelarutan (Ksp) garam AgCl adalah 1.0 × 10⁻¹⁰, kelarutan (s) garam AgCl dalam air murni adalah...',
    options: [
      { key: 'A', text: '1.0 × 10⁻⁵ mol/L' },
      { key: 'B', text: '1.0 × 10⁻¹⁰ mol/L' },
      { key: 'C', text: '1.0 × 10⁻²⁰ mol/L' },
      { key: 'D', text: '2.0 × 10⁻⁵ mol/L' },
      { key: 'E', text: '0.5 × 10⁻⁵ mol/L' }
    ],
    correctKey: 'A',
    explanation: 'Ksp = s² -> s = √(1.0 × 10⁻¹⁰) = 1.0 × 10⁻⁵ mol/L.'
  },
  {
    id: 13,
    text: 'Pengaruh penambahan ion senama (common ion effect) terhadap kelarutan suatu garam sukar larut adalah...',
    options: [
      { key: 'A', text: 'Memperbesar kelarutan garam' },
      { key: 'B', text: 'Memperkecil kelarutan garam dan memicu terjadinya endapan' },
      { key: 'C', text: 'Tidak mempengaruhi kelarutan' },
      { key: 'D', text: 'Menaikkan nilai tetapan Ksp' },
      { key: 'E', text: 'Menghilangkan seluruh partikel zat terlarut' }
    ],
    correctKey: 'B',
    explanation: 'Berdasarkan asas Le Chatelier, ion senama menggeser kesetimbangan ke arah reaktan padatan sehingga kelarutan menurun.'
  },
  {
    id: 14,
    text: 'Pasangan spesi kimia berikut yang merupakan pasangan asam-basa konjugasi menurut teori Bronsted-Lowry adalah...',
    options: [
      { key: 'A', text: 'NH3 dan NH4⁺' },
      { key: 'B', text: 'HCl dan NaOH' },
      { key: 'C', text: 'H2SO4 dan SO4²⁻' },
      { key: 'D', text: 'H3O⁺ dan OH⁻' },
      { key: 'E', text: 'CH3COOH dan H2O' }
    ],
    correctKey: 'A',
    explanation: 'NH4⁺ bertindak sebagai asam (donor proton H+) yang jika melepas proton menghasilkan basa konjugasi NH3 (selisih tepat 1 H+).'
  },
  {
    id: 15,
    text: 'Zat yang dapat bertindak sebagai asam maupun basa (amfiprotik/amfoter) menurut teori Bronsted-Lowry adalah...',
    options: [
      { key: 'A', text: 'H2O' },
      { key: 'B', text: 'CH4' },
      { key: 'C', text: 'NaCl' },
      { key: 'D', text: 'CO2' },
      { key: 'E', text: 'SO3' }
    ],
    correctKey: 'A',
    explanation: 'Air (H2O) dapat menerima proton menjadi H3O⁺ (basa) atau mendonorkan proton menjadi OH⁻ (asam).'
  },
  {
    id: 16,
    text: 'Larutan amonium klorida (NH4Cl) diuji dengan kertas lakmus. Hasil yang akan teramati adalah...',
    options: [
      { key: 'A', text: 'Lakmus merah tetap merah, lakmus biru menjadi merah (asam)' },
      { key: 'B', text: 'Lakmus merah menjadi biru, lakmus biru tetap biru (basa)' },
      { key: 'C', text: 'Kedua kertas lakmus tidak mengalami perubahan (netral)' },
      { key: 'D', text: 'Kedua kertas lakmus menjadi putih tak berwarna' },
      { key: 'E', text: 'Kertas lakmus terbakar' }
    ],
    correctKey: 'A',
    explanation: 'NH4Cl adalah garam dari basa lemah (NH3) dan asam kuat (HCl). Kation NH4⁺ terhidrolisis menghasilkan ion H3O⁺ sehingga larutan bersifat asam.'
  },
  {
    id: 17,
    text: 'Berapakah massa NaOH (Mr = 40) yang dibutuhkan untuk membuat 500 mL larutan NaOH 0.1 M?',
    options: [
      { key: 'A', text: '2 gram' },
      { key: 'B', text: '4 gram' },
      { key: 'C', text: '8 gram' },
      { key: 'D', text: '20 gram' },
      { key: 'E', text: '40 gram' }
    ],
    correctKey: 'A',
    explanation: 'Massa = M · V (L) · Mr = 0.1 mol/L · 0.5 L · 40 g/mol = 2 gram.'
  },
  {
    id: 18,
    text: 'Sebanyak 10 mL larutan H2SO4 0.1 M diencerkan dengan air murni hingga volumenya menjadi 100 mL. Berapakah konsentrasi larutan setelah pengenceran?',
    options: [
      { key: 'A', text: '0.001 M' },
      { key: 'B', text: '0.01 M' },
      { key: 'C', text: '0.02 M' },
      { key: 'D', text: '0.05 M' },
      { key: 'E', text: '0.1 M' }
    ],
    correctKey: 'B',
    explanation: 'V1 · M1 = V2 · M2 -> 10 · 0.1 = 100 · M2 -> M2 = 1 / 100 = 0.01 M.'
  },
  {
    id: 19,
    text: 'Pernyataan yang tepat mengenai larutan asam kuat dan asam lemah pada konsentrasi molaritas yang sama adalah...',
    options: [
      { key: 'A', text: 'Asam lemah terionisasi sempurna sedangkan asam kuat hanya terionisasi sebagian' },
      { key: 'B', text: 'Asam kuat memiliki derajat ionisasi (α) mendekati 1 dan memiliki pH lebih rendah daripada asam lemah' },
      { key: 'C', text: 'Asam lemah menghantarkan arus listrik lebih kuat dibanding asam kuat' },
      { key: 'D', text: 'Asam kuat selalu memiliki rasa manis' },
      { key: 'E', text: 'Asam lemah tidak dapat dinetralkan dengan basa' }
    ],
    correctKey: 'B',
    explanation: 'Asam kuat terionisasi sempurna (α ≈ 1), menghasilkan konsentrasi [H+] lebih besar dan nilai pH lebih rendah.'
  },
  {
    id: 20,
    text: 'Senyawa karbon dengan rumus molekul C3H8 termasuk dalam deret homolog...',
    options: [
      { key: 'A', text: 'Alkana' },
      { key: 'B', text: 'Alkena' },
      { key: 'C', text: 'Alkuna' },
      { key: 'D', text: 'Alkanol' },
      { key: 'E', text: 'Alkanal' }
    ],
    correctKey: 'A',
    explanation: 'Rumus umum alkana adalah CnH2n+2. Untuk n = 3: C3H(2·3+2) = C3H8 (propana).'
  },
  {
    id: 21,
    text: 'Gugus fungsi dari senyawa alkohol (alkanol) adalah...',
    options: [
      { key: 'A', text: '-OH' },
      { key: 'B', text: '-CHO' },
      { key: 'C', text: '-COOH' },
      { key: 'D', text: '-O-' },
      { key: 'E', text: '-CO-' }
    ],
    correctKey: 'A',
    explanation: 'Gugus hidroksil (-OH) adalah ciri khas keluarga alkohol.'
  },
  {
    id: 22,
    text: 'Reaksi esterifikasi adalah reaksi pembentukan ester (aroma buah-buahan) yang terjadi antara...',
    options: [
      { key: 'A', text: 'Asam karboksilat dengan alkohol dengan katalis asam' },
      { key: 'B', text: 'Alkana dengan halogen' },
      { key: 'C', text: 'Alkena dengan air' },
      { key: 'D', text: 'Keton dengan pereaksi Fehling' },
      { key: 'E', text: 'Eter dengan asam sulfat pekat' }
    ],
    correctKey: 'A',
    explanation: 'R-COOH + R\'-OH ⇌ R-COO-R\' + H2O (reaksi esterifikasi Fischer).'
  },
  {
    id: 23,
    text: 'Polimer alami yang tersusun dari monomer asam amino melalui ikatan peptida adalah...',
    options: [
      { key: 'A', text: 'Protein' },
      { key: 'B', text: 'Polietilena' },
      { key: 'C', text: 'Teflon' },
      { key: 'D', text: 'Nilon 66' },
      { key: 'E', text: 'Karet sintetis' }
    ],
    correctKey: 'A',
    explanation: 'Protein adalah makromolekul polipeptida alami yang dibangun oleh monomer-monomer asam amino.'
  },
  {
    id: 24,
    text: 'Uji Biuret pada sampel bahan makanan memberikan warna ungu. Hal ini membuktikan bahwa makanan tersebut mengandung...',
    options: [
      { key: 'A', text: 'Ikatan peptida / protein' },
      { key: 'B', text: 'Glukosa pereduksi' },
      { key: 'C', text: 'Amilum' },
      { key: 'D', text: 'Lemak jenuh' },
      { key: 'E', text: 'Vitamin C' }
    ],
    correctKey: 'A',
    explanation: 'Reagen Biuret (CuSO4 + NaOH) bereaksi dengan ikatan peptida protein membentuk kompleks koordinasi berwarna ungu.'
  },
  {
    id: 25,
    text: 'Dalam pengelolaan limbah laboratorium sains sekolah, limbah asam kuat harus dinetralkan terlebih dahulu dengan...',
    options: [
      { key: 'A', text: 'Minyak tanah' },
      { key: 'B', text: 'Larutan basa encer (seperti kapur atau NaHCO3) hingga pH netral sebelum dibuang' },
      { key: 'C', text: 'Asam pekat lain' },
      { key: 'D', text: 'Alkohol absolut' },
      { key: 'E', text: 'Logam natrium murni' }
    ],
    correctKey: 'B',
    explanation: 'Prinsip K3 laboratorium mewajibkan netralisasi limbah asam dengan larutan basa lemah/encer sebelum dialirkan ke instalasi pengolahan limbah.'
  }
];

// =========================================================================
// EXAMS PER ROLE
// =========================================================================
export const MOCK_EXAMS_BY_ROLE: Record<string, ExamItem[]> = {
  siswa_mipa: [
    {
      id: 'exam_m1',
      title: 'PTS Bahasa Indonesia 11 MIPA',
      subject: 'Bahasa Indonesia',
      type: 'PTS',
      targetClass: '11 MIPA 1 & 2',
      dateStr: 'Senin, 9 Nov 2026',
      timeStr: '07.00 - 10.00',
      durationMinutes: 90,
      status: 'Sedang Berlangsung',
      submittedCount: 12,
      totalStudents: 25,
      questions: QUESTIONS_PTS_BINDO_11
    },
    {
      id: 'exam_m2',
      title: 'PTS Matematika Tingkat Lanjut 11 MIPA',
      subject: 'Matematika Tingkat Lanjut',
      type: 'PTS',
      targetClass: '11 MIPA 1 & 2',
      dateStr: 'Rabu, 11 Nov 2026',
      timeStr: '07.00 - 10.00',
      durationMinutes: 120,
      status: 'Segera Berlangsung',
      submittedCount: 0,
      totalStudents: 32,
      questions: QUESTIONS_PTS_MAT_PEM_11
    },
    {
      id: 'exam_m3',
      title: 'PAS Kimia Peminatan & Larutan Asam Basa',
      subject: 'Kimia Peminatan',
      type: 'PAS',
      targetClass: '11 MIPA 2',
      dateStr: 'Kamis, 12 Nov 2026',
      timeStr: '08.00 - 10.30',
      durationMinutes: 90,
      status: 'Segera Berlangsung',
      submittedCount: 0,
      totalStudents: 34,
      questions: QUESTIONS_PAS_KIMIA_11
    }
  ],

  siswa_ips: [
    {
      id: 'exam_s1',
      title: 'PTS Sosiologi: Diferensiasi & Stratifikasi Sosial',
      subject: 'Sosiologi',
      type: 'PTS',
      targetClass: '11 IPS 1 & 2',
      dateStr: 'Senin, 9 Nov 2026',
      timeStr: '07.00 - 09.30',
      durationMinutes: 90,
      status: 'Sedang Berlangsung',
      submittedCount: 14,
      totalStudents: 28,
      questions: QUESTIONS_PTS_SOSIOLOGI_11
    },
    {
      id: 'exam_s2',
      title: 'PTS Sejarah Indonesia: Pergerakan Nasional 1928',
      subject: 'Sejarah Indonesia',
      type: 'PTS',
      targetClass: '11 IPS 1',
      dateStr: 'Rabu, 11 Nov 2026',
      timeStr: '10.00 - 12.00',
      durationMinutes: 90,
      status: 'Segera Berlangsung',
      submittedCount: 0,
      totalStudents: 28,
      questions: QUESTIONS_PTS_SEJARAH_11
    },
    {
      id: 'exam_s3',
      title: 'PTS Ekonomi: Kebijakan Moneter & Perbankan',
      subject: 'Ekonomi',
      type: 'PTS',
      targetClass: '11 IPS 1',
      dateStr: 'Kamis, 12 Nov 2026',
      timeStr: '08.00 - 10.00',
      durationMinutes: 90,
      status: 'Segera Berlangsung',
      submittedCount: 0,
      totalStudents: 28,
      questions: QUESTIONS_PTS_EKONOMI_11
    }
  ],

  guru: [
    {
      id: 'exam_g1',
      title: 'PTS Bahasa Indonesia (Kelas 11 MIPA 2)',
      subject: 'Bahasa Indonesia',
      type: 'PTS',
      targetClass: '11 MIPA 2 (Binaan Wali Kelas)',
      dateStr: 'Senin, 9 Nov 2026',
      timeStr: '07.00 - 10.00',
      durationMinutes: 90,
      status: 'Sedang Berlangsung',
      submittedCount: 12,
      totalStudents: 25,
      questions: QUESTIONS_PTS_BINDO_11
    },
    {
      id: 'exam_g2',
      title: 'PTS Bahasa Indonesia (Kelas 11 MIPA 1)',
      subject: 'Bahasa Indonesia',
      type: 'PTS',
      targetClass: '11 MIPA 1',
      dateStr: 'Jumat, 6 Nov 2026',
      timeStr: '08.00 - 10.00',
      durationMinutes: 90,
      status: 'Selesai',
      submittedCount: 32,
      totalStudents: 32,
      questions: QUESTIONS_PTS_BINDO_11
    },
    {
      id: 'exam_g3',
      title: 'PTS Bahasa Indonesia (Kelas 11 IPS 1)',
      subject: 'Bahasa Indonesia',
      type: 'PTS',
      targetClass: '11 IPS 1',
      dateStr: 'Kamis, 12 Nov 2026',
      timeStr: '10.15 - 11.45',
      durationMinutes: 90,
      status: 'Segera Berlangsung',
      submittedCount: 0,
      totalStudents: 28,
      questions: QUESTIONS_PTS_BINDO_11
    }
  ]
};

// =========================================================================
// ASSIGNMENTS PER ROLE
// =========================================================================
export const MOCK_ASSIGNMENTS_BY_ROLE: Record<string, AssignmentItem[]> = {
  siswa_mipa: [
    {
      id: 'asg_m1',
      title: 'Laporan Praktikum Titrasi Asam Basa & Penentuan Titik Ekuivalen',
      subject: 'Kimia Peminatan',
      dueDate: 'Besok, 23.59 WIB',
      status: 'Belum Dikumpulkan',
      maxScore: 100,
      description: 'Unggah lembar kerja praktikum digital beserta grafik kurva titik ekuivalen larutan NaOH 0.1 M terhadap HCl 25 mL dari simulasi Lab Sains Virtual.',
    },
    {
      id: 'asg_m2',
      title: 'Analisis Gerak Balok Bidang Miring & Koefisien Gaya Gesek',
      subject: 'Fisika Peminatan',
      dueDate: 'Kemarin, 18.00 WIB',
      status: 'Dinilai',
      score: 96,
      maxScore: 100,
      description: 'Hitung percepatan benda pada sudut kemiringan 30° dan 45° dengan koefisien gesek kinetis 0.2 serta gambarkan diagram benda bebasnya.',
      teacherFeedback: 'Diagram benda bebas sangat rapi dan dekomposisi vektor mg sin θ serta gaya normal N sangat akurat!',
      submissionDate: 'Kemarin, 14.15 WIB',
      submittedFileName: 'Laporan_Fisika_Dinamika_Rafiandra_XI_MIPA1.pdf',
      fileSize: '2.4 MB',
      submittedText: 'Telah diselesaikan pengujian menggunakan simulasi Lab Fisika Virtual SMAN 25. Sudut 37° menghasilkan percepatan 4.0 m/s².'
    },
    {
      id: 'asg_m3',
      title: 'Esai Argumentatif: Urgensi Pengurangan Emisi Karbon di Sekolah',
      subject: 'Bahasa Indonesia',
      dueDate: 'Besok Lusa, 20.00 WIB',
      status: 'Diserahkan',
      maxScore: 100,
      description: 'Tuliskan esai argumentasi 500 kata dengan minimal 3 data rujukan statistik valid (BPS / Kemenkes) tentang transisi energi dan eco-school.',
      submissionDate: 'Hari ini, 08.40 WIB',
      submittedFileName: 'Esai_Argumentasi_Bahasa_Indonesia_Rafiandra.docx',
      fileSize: '1.8 MB',
      submittedText: 'Esai telah disusun menggunakan metode PEEL dengan 3 bukti evidensial empiris dan kutipan jurnal terakreditasi.'
    },
    {
      id: 'asg_m4',
      title: 'Problem Set Kalkulus: Garis Singgung Kurva Trigonometri',
      subject: 'Matematika Tingkat Lanjut',
      dueDate: '3 Hari Lagi, 23.59 WIB',
      status: 'Belum Dikumpulkan',
      maxScore: 100,
      description: 'Selesaikan 5 nomor problem set turunan fungsi trigonometri majemuk aturan rantai dan penentuan titik stasioner kurva f(x) = 2 sin(2x).',
    },
    {
      id: 'asg_m5',
      title: 'Analisis Hereditas Mendel & Pembuatan Diagram Punnett Dihibrid',
      subject: 'Biologi Peminatan',
      dueDate: '5 Hari Lagi, 17.00 WIB',
      status: 'Belum Dikumpulkan',
      maxScore: 100,
      description: 'Buatlah diagram papan catur Punnett persilangan dihibrid heterozigot BbKk x BbKk dan buktikan rasio fenotipe keturunan F2 adalah 9:3:3:1.',
    },
    {
      id: 'asg_m6',
      title: 'Academic Analytical Exposition Essay: Renewable Energy in Jakarta',
      subject: 'Bahasa Inggris',
      dueDate: '1 Minggu Lagi, 23.59 WIB',
      status: 'Belum Dikumpulkan',
      maxScore: 100,
      description: 'Draft a 4-paragraph analytical exposition using nominalization, causal connectives, and epistemic modality regarding urban solar arrays.',
    }
  ],

  siswa_ips: [
    {
      id: 'asg_s1',
      title: 'Analisis Studi Kasus Kesenjangan Sosial Perkotaan',
      subject: 'Sosiologi 11 IPS',
      dueDate: 'Besok, 23.59 WIB',
      status: 'Belum Dikumpulkan',
      maxScore: 100,
      description: 'Lakukan analisis stratifikasi sosial terbuka dan dampaknya terhadap kesenjangan pendapatan pada masyarakat urban Jakarta.',
    },
    {
      id: 'asg_s2',
      title: 'Esai Refleksi Nilai Kebangsaan Sumpah Pemuda 1928',
      subject: 'Sejarah Indonesia 11 IPS',
      dueDate: 'Kemarin, 20.00 WIB',
      status: 'Dinilai',
      score: 94,
      maxScore: 100,
      description: 'Kaji peran surat kabar Medan Prijaji dan kaum intelektual muda dalam melahirkan kesadaran nasionalisme.',
      teacherFeedback: 'Penalaran historis tajam dan didukung rujukan sumber primer yang sangat lengkap!'
    },
    {
      id: 'asg_s3',
      title: 'Laporan Analisis Kebijakan Moneter Pengendali Inflasi',
      subject: 'Ekonomi 11 IPS',
      dueDate: '29 Juli 2025',
      status: 'Diserahkan',
      maxScore: 100,
      description: 'Analisis efektivitas kenaikan suku bunga BI-Rate dalam menstabilkan nilai tukar Rupiah terhadap Dolar AS.'
    }
  ],

  guru: [
    {
      id: 'asg_g1',
      title: 'Esai Argumentatif Siswa: Rafiandra Putra Dewa',
      subject: 'Bahasa Indonesia (11 MIPA 2)',
      dueDate: 'Telah Dikumpulkan (Perlu Dinilai)',
      status: 'Diserahkan',
      maxScore: 100,
      description: 'Topik: "Penerapan Kecerdasan Buatan dalam Pembelajaran Mandiri Siswa SMA". 520 Kata, 4 Referensi Jurnal.',
      teacherFeedback: 'Siap untuk diperiksa dan diberi catatan koreksi.'
    },
    {
      id: 'asg_g2',
      title: 'Esai Argumentatif Siswa: Anindya Kirana Putri',
      subject: 'Bahasa Indonesia (11 IPS 1)',
      dueDate: 'Telah Dikumpulkan (Perlu Dinilai)',
      status: 'Diserahkan',
      maxScore: 100,
      description: 'Topik: "Dilema Pelestarian Bahasa Daerah di Era Komunikasi Digital". 540 Kata, Sistematika Sangat Rapi.',
      teacherFeedback: 'Siap untuk diperiksa dan diberi catatan koreksi.'
    },
    {
      id: 'asg_g3',
      title: 'Esai Argumentatif Siswa: Dimas Pratama',
      subject: 'Bahasa Indonesia (11 MIPA 2)',
      dueDate: 'Sudah Selesai Dinilai',
      status: 'Dinilai',
      score: 92,
      maxScore: 100,
      description: 'Topik: "Urgensi Penguatan Literasi Digital di Lingkungan SMA".',
      teacherFeedback: 'Argumen sangat kuat, konjungsi kausalitas tertata rapi!'
    }
  ]
};

// =========================================================================
// AGENDAS PER ROLE
// =========================================================================
export const MOCK_AGENDAS_BY_ROLE: Record<string, AgendaItem[]> = {
  siswa_mipa: [
    {
      id: 'ag_m1',
      title: 'PTS Matematika Tingkat Lanjut 11 MIPA',
      category: 'Ujian',
      time: '07.00 - 10.00',
      date: '9 November 2026',
      location: 'Ruang CBT Lantai 2 & Online'
    },
    {
      id: 'ag_m2',
      title: 'Praktikum Kimia: Titrasi Asam Basa',
      category: 'Praktikum',
      time: '10.30 - 12.00',
      date: '10 November 2026',
      location: 'Laboratorium Sains SMAN 25'
    },
    {
      id: 'ag_m3',
      title: 'Peringatan Hari Pahlawan Nasional & Upacara',
      category: 'Hari Nasional',
      time: '07.00 - 08.00',
      date: '10 November 2026',
      location: 'Lapangan Utama SMAN 25'
    }
  ],
  siswa_ips: [
    {
      id: 'ag_s1',
      title: 'PTS Sosiologi: Stratifikasi Sosial',
      category: 'Ujian',
      time: '07.00 - 09.30',
      date: '9 November 2026',
      location: 'Ruang CBT Lantai 2 & Online'
    },
    {
      id: 'ag_s2',
      title: 'Diskusi Studi Kasus Kesenjangan Sosial',
      category: 'Kegiatan',
      time: '10.30 - 12.00',
      date: '11 November 2026',
      location: 'Ruang R.102 SMAN 25'
    },
    {
      id: 'ag_s3',
      title: 'Peringatan Hari Pahlawan Nasional & Upacara',
      category: 'Hari Nasional',
      time: '07.00 - 08.00',
      date: '10 November 2026',
      location: 'Lapangan Utama SMAN 25'
    }
  ],
  guru: [
    {
      id: 'ag_g1',
      title: 'Pengawasan CBT Bahasa Indonesia (11 MIPA 2)',
      category: 'Ujian',
      time: '07.00 - 10.00',
      date: '9 November 2026',
      location: 'Lab CBT Lantai 2'
    },
    {
      id: 'ag_g2',
      title: 'Rapat Pleno Dewan Guru & Kurikulum Merdeka',
      category: 'Rapat',
      time: '13.30 - 15.00',
      date: '11 November 2026',
      location: 'Ruang Rapat Kepala Sekolah'
    },
    {
      id: 'ag_g3',
      title: 'Verifikasi Buku Ledger Nilai Siswa 11 MIPA 2',
      category: 'Kegiatan',
      time: '15.00 - 16.00',
      date: '13 November 2026',
      location: 'Ruang Kerja Wali Kelas'
    }
  ]
};

// =========================================================================
// COURSES (EXPANDED FOR EACH MAJOR)
// =========================================================================
export const MOCK_COURSES: SubjectCourse[] = [
  // --- SMA MIPA ---
  {
    id: 'course_kimia',
    name: 'Kimia Peminatan',
    topic: 'Titrasi Asam Basa & pH Larutan',
    category: 'SMA MIPA',
    scheduleGroup: 'Peminatan',
    teacher: 'Drs. Bambang Sudarsono, M.Si',
    grade: 'Kelas 11 SMA',
    coverImage: '/images/sim_science_lab_1793805016304.jpg',
    description: 'Eksplorasi reaksi netralisasi asam basa, stoikiometri larutan, kurva titrasi, dan indikator fenolftalein secara interaktif.',
    totalModules: 6,
    completedModules: 4,
    interactiveSimType: 'titrasi_kimia',
    chapters: [
      { 
        id: 'ch_k1', 
        title: 'Konsep Asam Basa Arrhenius & Bronsted-Lowry', 
        type: 'video', 
        duration: '18 Menit', 
        completed: true,
        videoUrl: '/videos/lesson_video_2.mp4',
        teacherVoiceScript: 'Halo siswa SMAN 25 Jakarta. Pada pertemuan Kimia Peminatan kali ini, kita mempelajari konsep fundamental asam basa Arrhenius yang melepaskan ion hidrogen dan teori Bronsted Lowry tentang donor dan akseptor pasangan proton. Perhatikan stoikiometri netralisasi pada larutan HCl dan NaOH.',
        keyPoints: ['Asam mendonorkan proton H+', 'Basa menerima proton H+', 'Reaksi netralisasi menghasilkan garam dan molekul air']
      },
      { 
        id: 'ch_k2', 
        title: 'Perhitungan pH Asam Kuat dan Asam Lemah', 
        type: 'modul_pdf', 
        duration: '25 Halaman', 
        completed: true,
        teacherVoiceScript: 'Dalam bab ini, kalian belajar menghitung konsentrasi ion hidrogen menggunakan tetapan ionisasi asam Ka serta derajat disosiasi alfa.',
        keyPoints: ['pH = minus logaritma konsentrasi H+', 'Asam kuat terionisasi sempurna dengan alfa mendekati satu']
      },
      { 
        id: 'ch_k3', 
        title: 'Laboratorium Virtual: Simulasi Titrasi Asam Basa', 
        type: 'lab_sim', 
        duration: 'Interaktif', 
        completed: false,
        teacherVoiceScript: 'Silakan gunakan buret digital untuk meneteskan natrium hidroksida ke dalam labu erlenmeyer hingga mencapai titik ekuivalen pH 7.',
        keyPoints: ['Titik ekuivalen adalah kondisi stoikiometris mol asam sama dengan mol basa', 'Indikator fenolftalein berubah warna menjadi merah muda']
      },
      { 
        id: 'ch_k4', 
        title: 'Evaluasi Formatif: Kurva Titrasi', 
        type: 'kuis', 
        duration: '15 Soal', 
        completed: false 
      },
    ]
  },
  {
    id: 'course_fisika',
    name: 'Fisika Peminatan',
    topic: 'Hukum Newton & Dinamika Gerak',
    category: 'SMA MIPA',
    scheduleGroup: 'Peminatan',
    teacher: 'Ir. Ahmad Zulkarnain, S.Pd',
    grade: 'Kelas 11 SMA',
    coverImage: '/images/sim_science_lab_1793805016304.jpg',
    description: 'Analisis gaya normal, gaya gesek statis/kinetis, dan gerak lurus berubah beraturan pada bidang miring serta katrol ganda.',
    totalModules: 6,
    completedModules: 3,
    interactiveSimType: 'fisika_newton',
    chapters: [
      { 
        id: 'ch_f1', 
        title: 'Diagram Benda Bebas (Free Body Diagram)', 
        type: 'video', 
        duration: '20 Menit', 
        completed: true,
        videoUrl: '/videos/lesson_video_1.mp4',
        teacherVoiceScript: 'Selamat pagi siswa kelas 11 MIPA. Hari ini pada pelajaran Fisika Peminatan, kita membedah Hukum Kedua Newton Sigma F sama dengan massa kali percepatan. Amatilah vektor gaya berat, gaya normal tegak lurus bidang, dan gaya gesek kinetis yang menahan laju balok pada kemiringan teta.',
        keyPoints: ['Gaya normal N = m dikali g dikali cosinus sudut teta', 'Gaya penarik sejajar bidang = m dikali g dikali sinus teta', 'Gaya gesek kinetis = koefisien mu k dikali gaya normal']
      },
      { 
        id: 'ch_f2', 
        title: 'Hukum II Newton pada Bidang Miring Kasar', 
        type: 'modul_pdf', 
        duration: '22 Halaman', 
        completed: true,
        teacherVoiceScript: 'Percepatan balok meluncur dipengaruhi langsung oleh kemiringan sudut bidang serta kekasaran permukaan gesek.',
        keyPoints: ['Percepatan a = g dikalikan selisih sin teta dan mu cos teta']
      },
      { 
        id: 'ch_f3', 
        title: 'Simulasi Lab Fisika: Eksplorasi Percepatan & Gesekan', 
        type: 'lab_sim', 
        duration: 'Interaktif', 
        completed: false 
      },
      { 
        id: 'ch_f4', 
        title: 'Latihan Soal Dinamika Gerak Lurus & Katrol', 
        type: 'kuis', 
        duration: '20 Soal', 
        completed: false 
      },
    ]
  },
  {
    id: 'course_bio',
    name: 'Biologi Peminatan',
    topic: 'Metabolisme Sel & Pola Pewarisan Sifat',
    category: 'SMA MIPA',
    scheduleGroup: 'Peminatan',
    teacher: 'Ibu Endang Suryani, M.Si',
    grade: 'Kelas 11 SMA',
    coverImage: '/images/sim_science_lab_1793805016304.jpg',
    description: 'Studi mendalam mengenai katabolisme karbohidrat, siklus Krebs, fosforilasi oksidatif, dan hukum pewarisan sifat Mendel.',
    totalModules: 7,
    completedModules: 5,
    interactiveSimType: 'none',
    chapters: [
      { 
        id: 'ch_bio1', 
        title: 'Struktur Organel Sel & Mekanisme Transpor Membran', 
        type: 'video', 
        duration: '22 Menit', 
        completed: true,
        videoUrl: '/videos/lesson_video_2.mp4',
        teacherVoiceScript: 'Halo semuanya, selamat datang di kelas Biologi Peminatan SMAN 25 Jakarta. Materi ini menjelaskan bagaimana mitokondria berperan sebagai pabrik energi seluler yang memecah glukosa menjadi adenosin trifosfat melalui respirasi aerob.',
        keyPoints: ['Glikolisis berlangsung di sitoplasma sel', 'Siklus Krebs menghasilkan NADH dan FADH2 di matriks mitokondria', 'Transpor elektron menghasilkan energi ATP terbanyak']
      },
      { 
        id: 'ch_bio2', 
        title: 'Katabolisme Karbohidrat: Glikolisis hingga Transpor Elektron', 
        type: 'modul_pdf', 
        duration: '30 Halaman', 
        completed: true 
      },
      { 
        id: 'ch_bio3', 
        title: 'Pola Hereditas Mendel & Penyimpangan Semu', 
        type: 'video', 
        duration: '25 Menit', 
        completed: true,
        videoUrl: '/videos/lesson_video_2.mp4',
        teacherVoiceScript: 'Pada bahasan pewarisan sifat Mendel, kita menghitung rasio fenotipe sembilan banding tiga banding tiga banding satu pada persilangan dihibrid heterozigot ganda.',
        keyPoints: ['Hukum Segregasi Bebas Mendel I', 'Hukum Asortasi Bebas Mendel II']
      },
      { 
        id: 'ch_bio4', 
        title: 'Asesmen Formatif Genetika & Kuis DNA', 
        type: 'kuis', 
        duration: '25 Soal', 
        completed: false 
      },
    ]
  },
  {
    id: 'course_mat_pem',
    name: 'Matematika Tingkat Lanjut',
    topic: 'Kalkulus Lanjut & Polinomial',
    category: 'SMA MIPA',
    scheduleGroup: 'Peminatan',
    teacher: 'Ibu Ratna Dewi, S.Pd',
    grade: 'Kelas 11 SMA',
    coverImage: '/images/hero_school_digital_1793805015402.jpg',
    description: 'Penguasaan turunan fungsi trigonometri, aturan rantai, garis singgung kurva, teorema sisa polinomial, dan persamaan lingkaran.',
    totalModules: 8,
    completedModules: 4,
    interactiveSimType: 'none',
    chapters: [
      { 
        id: 'ch_mp1', 
        title: 'Limit Fungsi Trigonometri Dasar', 
        type: 'video', 
        duration: '24 Menit', 
        completed: true,
        videoUrl: '/videos/lesson_video_1.mp4',
        teacherVoiceScript: 'Selamat pagi siswa kelas 11 MIPA. Pada modul Matematika Tingkat Lanjut ini, kita menyelesaikan bentuk limit x menuju nol dari sin a x per b x yang menghasilkan perbandingan koefisien a per b.',
        keyPoints: ['Sifat dasar limit trigonometri', 'Penerapan aturan L Hospital jika bentuk tak tentu nol per nol']
      },
      { 
        id: 'ch_mp2', 
        title: 'Aturan Rantai & Turunan Trigonometri Tingkat Tinggi', 
        type: 'modul_pdf', 
        duration: '28 Halaman', 
        completed: true 
      },
      { 
        id: 'ch_mp3', 
        title: 'Teorema Sisa & Faktor pada Suku Banyak (Polinomial)', 
        type: 'video', 
        duration: '26 Menit', 
        completed: false,
        videoUrl: '/videos/lesson_video_2.mp4',
        teacherVoiceScript: 'Teorema sisa menyatakan bahwa sisa pembagian polinomial P x oleh x minus k adalah nilai fungsi P di titik k.',
        keyPoints: ['Metode Horner untuk pembagian suku banyak', 'Penentuan akar-akar rasional polinomial']
      },
      { 
        id: 'ch_mp4', 
        title: 'Persamaan Garis Singgung Lingkaran Analitik', 
        type: 'modul_pdf', 
        duration: '20 Halaman', 
        completed: false 
      },
    ]
  },
  {
    id: 'course_sejarah',
    name: 'Sejarah Indonesia',
    topic: 'Kebangkitan Nasional 1928',
    category: 'Umum',
    scheduleGroup: 'Wajib',
    teacher: 'Drs. Hendro Wibowo, M.Hum',
    grade: 'Kelas 11 SMA',
    coverImage: '/images/hero_school_digital_1793805015402.jpg',
    description: 'Kelahiran organisasi modern bumiputera Budi Utomo, Sarekat Islam, Indische Partij, dan ikrar persatuan Sumpah Pemuda 1928.',
    totalModules: 6,
    completedModules: 4,
    interactiveSimType: 'none',
    chapters: [
      { 
        id: 'ch_sej1', 
        title: 'Dampak Politik Etis terhadap Kaum Terpelajar', 
        type: 'video', 
        duration: '18 Menit', 
        completed: true,
        videoUrl: '/videos/lesson_video_1.mp4',
        teacherVoiceScript: 'Salam sejarah anak-anakku. Kebijakan Politik Etis Belanda khususnya trilogi edukasi melahirkan kaum intelektual muda bumiputera yang menyadari bahwa perjuangan bersenjata kedaerahan harus bertransformasi menjadi diplomasi modern terorganisir.',
        keyPoints: ['Trilogi van Deventer: Irigasi, Emigrasi, Edukasi', 'Budi Utomo didirikan tanggal 20 Mei 1908 di gedung STOVIA']
      },
      { 
        id: 'ch_sej2', 
        title: 'Kongres Pemuda II dan Lahirnya Bahasa Persatuan', 
        type: 'modul_pdf', 
        duration: '22 Halaman', 
        completed: true 
      },
      { 
        id: 'ch_sej3', 
        title: 'Peran Pers Nasional Medan Prijaji Tirto Adhi Soerjo', 
        type: 'video', 
        duration: '20 Menit', 
        completed: true,
        videoUrl: '/videos/lesson_video_2.mp4',
        teacherVoiceScript: 'Surat kabar Medan Prijaji menjadi corong suara perlawanan yang dicetak dan dikelola oleh bangsa sendiri untuk membangkitkan kesadaran persatuan Nusantara.',
        keyPoints: ['Pers nasional sebagai katalisator pergerakan kemerdekaan']
      },
      { 
        id: 'ch_sej4', 
        title: 'Asesmen Formatif Kebangkitan Nasional', 
        type: 'kuis', 
        duration: '25 Soal', 
        completed: false 
      },
    ]
  },

  // --- MATA PELAJARAN UMUM & WAJIB (ADA DI JADWAL SEMUA SISWA) ---
  {
    id: 'course_bindo',
    name: 'Bahasa Indonesia',
    topic: 'Teks Argumentasi & Kritik Sastra',
    category: 'Umum',
    scheduleGroup: 'Wajib',
    teacher: 'Ibu Dra. Sri Wahyuni, M.Pd',
    grade: 'Kelas 11 SMA',
    coverImage: '/images/hero_school_digital_1793805015402.jpg',
    description: 'Menulis teks argumentasi logis berdasarkan data empiris BPS, kaidah kalimat efektif PUEBI, teknik debat ilmiah, dan resensi buku sastra.',
    totalModules: 6,
    completedModules: 4,
    interactiveSimType: 'none',
    chapters: [
      { 
        id: 'ch_b1', 
        title: 'Struktur Teks Argumentasi: Tesis dan Evidensi Faktual', 
        type: 'video', 
        duration: '15 Menit', 
        completed: true,
        videoUrl: '/videos/lesson_video_1.mp4',
        teacherVoiceScript: 'Assalamu alaikum anak-anakku siswa SMAN 25 Jakarta. Hari ini kita mempelajari cara membangun teks argumentasi yang kredibel. Argumen harus bertumpu pada tesis yang jelas, didukung fakta empiris yang valid, dan terhindar dari sesat pikir generalisasi tergesa-gesa.',
        keyPoints: ['Struktur: Tesis, Rangkaian Argumen dengan Bukti, Penegasan Ulang', 'Gunakan konjungsi kausalitas seperti karena, sehingga, dan mengakibatkan', 'Pastikan kalimat bersubjek tegas tanpa partikel perusak']
      },
      { 
        id: 'ch_b2', 
        title: 'Kaidah Kalimat Efektif & Konjungsi Kausalitas', 
        type: 'modul_pdf', 
        duration: '18 Halaman', 
        completed: true 
      },
      { 
        id: 'ch_b3', 
        title: 'Praktik Debat Terbuka & Mosi Isu Kebijakan', 
        type: 'video', 
        duration: '28 Menit', 
        completed: true,
        videoUrl: '/videos/lesson_video_2.mp4',
        teacherVoiceScript: 'Dalam debat ilmiah, sampaikan sanggahan dengan etika santun berlandaskan data, bukan menyerang pribadi lawan atau sesat pikir ad hominem.',
        keyPoints: ['Menyusun mosi debat dan time allocation argumentasi']
      },
      { 
        id: 'ch_b4', 
        title: 'Kuis Evaluasi Menulis Esai Ilmiah Populer', 
        type: 'kuis', 
        duration: '25 Soal', 
        completed: false 
      },
    ]
  },
  {
    id: 'course_bing',
    name: 'Bahasa Inggris',
    topic: 'Analytical Exposition & Debating',
    category: 'Umum',
    scheduleGroup: 'Wajib',
    teacher: 'Mr. David Siregar, M.Ed',
    grade: 'Kelas 11 SMA',
    coverImage: '/images/hero_school_digital_1793805015402.jpg',
    description: 'Composing analytical exposition texts, expressing arguments coherently with evidence, rhetorical devices, and formal essay presentation.',
    totalModules: 5,
    completedModules: 3,
    interactiveSimType: 'none',
    chapters: [
      { 
        id: 'ch_eng1', 
        title: 'Thesis, Arguments, and Reiteration Structure', 
        type: 'video', 
        duration: '18 Menit', 
        completed: true,
        videoUrl: '/videos/lesson_video_1.mp4',
        teacherVoiceScript: 'Good morning students of SMAN 25 Jakarta. Welcome to our English class. Today we will explore how to craft an analytical exposition text to persuade listeners with strong thesis statements and compelling supporting arguments.',
        keyPoints: ['Clear thesis statement in the introductory paragraph', 'Elaborating each argument with empirical data', 'Firm reiteration in the concluding remarks']
      },
      { 
        id: 'ch_eng2', 
        title: 'Connective Words and Modal Auxiliaries in Academic Writing', 
        type: 'modul_pdf', 
        duration: '22 Halaman', 
        completed: true 
      },
      { 
        id: 'ch_eng3', 
        title: 'Mock Parliamentary Debate: Motion & Points of Information', 
        type: 'video', 
        duration: '25 Menit', 
        completed: false,
        videoUrl: '/videos/lesson_video_2.mp4',
        teacherVoiceScript: 'Learn how to present persuasive rebuttals and points of information during formal parliamentary debate sessions.',
        keyPoints: ['Rhetorical strategies and persuasive diction']
      },
    ]
  },
  {
    id: 'course_mat_wajib',
    name: 'Matematika Wajib',
    topic: 'Transformasi Geometri & Statistika Data Kelompok',
    category: 'Umum',
    scheduleGroup: 'Wajib',
    teacher: 'Ibu Ratna Dewi, S.Pd',
    grade: 'Kelas 11 SMA',
    coverImage: '/images/hero_school_digital_1793805015402.jpg',
    description: 'Transformasi geometri (translasi, refleksi, rotasi, dilatasi) matriks ordo 2x2, serta ukuran pemusatan dan penyebaran data kelompok.',
    totalModules: 6,
    completedModules: 4,
    interactiveSimType: 'none',
    chapters: [
      {
        id: 'ch_mw1',
        title: 'Translasi dan Refleksi Matriks Transformasi',
        type: 'video',
        duration: '20 Menit',
        completed: true,
        videoUrl: '/videos/lesson_video_1.mp4',
        teacherVoiceScript: 'Selamat pagi siswa kelas 11 MIPA. Pada matematika wajib, kita mendalami transformasi geometri titik koordinat kartesius menggunakan operasi perkalian matriks dua kali dua.',
        keyPoints: ['Matriks refleksi terhadap sumbu X dan Y', 'Translasi titik dan bayangan garis kurva']
      },
      {
        id: 'ch_mw2',
        title: 'Rotasi dengan Pusat (0,0) dan Titik (a,b)',
        type: 'modul_pdf',
        duration: '25 Halaman',
        completed: true
      },
      {
        id: 'ch_mw3',
        title: 'Statistika Data Kelompok: Rata-Rata, Median, dan Modus',
        type: 'video',
        duration: '22 Menit',
        completed: true,
        videoUrl: '/videos/lesson_video_2.mp4',
        teacherVoiceScript: 'Menghitung nilai mean data kelompok dengan metode titik tengah kelas interval dan rata-rata sementara.',
        keyPoints: ['Histogram frekuensi kumulatif', 'Kuartil dan desil data distribusi frekuensi']
      },
      {
        id: 'ch_mw4',
        title: 'Kuis Evaluasi Transformasi Geometri & Statistika',
        type: 'kuis',
        duration: '20 Soal',
        completed: false
      }
    ]
  },
  {
    id: 'course_agama',
    name: 'Pendidikan Agama & Budi Pekerti',
    topic: 'Fiqih Muamalah & Karakter Mulia',
    category: 'Umum',
    scheduleGroup: 'Wajib',
    teacher: 'Ust. H. Syarifuddin, M.Ag',
    grade: 'Kelas 11 SMA',
    coverImage: '/images/hero_school_digital_1793805015402.jpg',
    description: 'Kaidah fiqih transaksi ekonomi syariah, adab bermuamalah modern, pencegahan riba, toleransi antarumat beragama, dan akhlak karimah.',
    totalModules: 5,
    completedModules: 4,
    interactiveSimType: 'none',
    chapters: [
      {
        id: 'ch_ag1',
        title: 'Etika Muamalah: Jual Beli Halal dan Rukun Transaksi',
        type: 'video',
        duration: '18 Menit',
        completed: true,
        videoUrl: '/videos/lesson_video_1.mp4',
        teacherVoiceScript: 'Assalamu alaikum siswa siswi SMAN 25. Nilai kejujuran dan amanah adalah fondasi utama dalam setiap transaksi ekonomi syariah dan pergaulan sosial kita sehari-hari.',
        keyPoints: ['Syarat sah ijab kabul transaksi', 'Menghindari gharar, maisir, dan riba dalam transaksi digital']
      },
      {
        id: 'ch_ag2',
        title: 'Kerukunan Antarumat Beragama & Moderasi Beragama',
        type: 'modul_pdf',
        duration: '20 Halaman',
        completed: true
      },
      {
        id: 'ch_ag3',
        title: 'Kuis Refleksi Karakter & Akhlak Mulia',
        type: 'kuis',
        duration: '15 Soal',
        completed: false
      }
    ]
  },
  {
    id: 'course_ppkn',
    name: 'Pendidikan Pancasila',
    topic: 'Supremasi Hukum & Konstitusi UUD 1945',
    category: 'Umum',
    scheduleGroup: 'Wajib',
    teacher: 'Ibu Siti Aminah, S.Pd',
    grade: 'Kelas 11 SMA',
    coverImage: '/images/hero_school_digital_1793805015402.jpg',
    description: 'Hierarki perundang-undangan di Indonesia, penegakan hak asasi manusia, integrasi nasional, dan etika berbangsa di era digital.',
    totalModules: 5,
    completedModules: 3,
    interactiveSimType: 'none',
    chapters: [
      { 
        id: 'ch_p1', 
        title: 'UUD NRI Tahun 1945 sebagai Sumber Hukum Tertinggi', 
        type: 'video', 
        duration: '19 Menit', 
        completed: true,
        videoUrl: '/videos/lesson_video_1.mp4',
        teacherVoiceScript: 'Selamat pagi anak-anakku. Pada mata pelajaran Pendidikan Pancasila, kita menegaskan komitmen konstitusional bahwa Indonesia adalah negara hukum yang menjunjung keadilan sosial dan perlindungan hak asasi manusia bagi seluruh warga negara.',
        keyPoints: ['Hierarki perundang-undangan UU Nomor 12 Tahun 2011', 'Pasal 28 UUD 1945 tentang Hak Asasi Manusia']
      },
      { 
        id: 'ch_p2', 
        title: 'Perlindungan dan Penegakan HAM di Indonesia', 
        type: 'modul_pdf', 
        duration: '24 Halaman', 
        completed: true 
      },
      { 
        id: 'ch_p3', 
        title: 'Harmoni Keberagaman dalam Bingkai Kebangsaan', 
        type: 'video', 
        duration: '20 Menit', 
        completed: false,
        videoUrl: '/videos/lesson_video_2.mp4',
        teacherVoiceScript: 'Semboyan Bhinneka Tunggal Ika adalah perekat kebinekaan yang harus diamalkan dalam pergaulan sehari-hari di era digital.',
        keyPoints: ['Toleransi aktif dan kerukunan warga bangsa']
      },
    ]
  },
  {
    id: 'course_pjok',
    name: 'PJOK',
    topic: 'Kebugaran Jasmani & Senam Atletik',
    category: 'Umum',
    scheduleGroup: 'Wajib',
    teacher: 'Wahyu Hidayat, S.Pd',
    grade: 'Kelas 11 SMA',
    coverImage: '/images/hero_school_digital_1793805015402.jpg',
    description: 'Analisis derajat kebugaran jasmani, pengukuran denyut nadi Target Heart Rate, latihan sirkuit kekuatan otot, dan pola nutrisi remaja sehat.',
    totalModules: 5,
    completedModules: 3,
    interactiveSimType: 'none',
    chapters: [
      { 
        id: 'ch_pj1', 
        title: 'Kebugaran Jasmani & Target Heart Rate Aerobik', 
        type: 'video', 
        duration: '17 Menit', 
        completed: true,
        videoUrl: '/videos/lesson_video_1.mp4',
        teacherVoiceScript: 'Salam olahraga siswa SMAN 25 Jakarta. Hari ini kita mempraktikkan cara mengukur denyut nadi maksimal 220 dikurangi usia, serta melatih daya tahan kardiorespirasi melalui latihan aerobik dan sirkuit terencana.',
        keyPoints: ['Menghitung denyut nadi istirahat dan denyut nadi pemulihan', 'Latihan sirkuit (push up, sit up, shuttle run) untuk daya tahan otot', 'Pemanasan dan pendinginan untuk mencegah kram otot']
      },
      { 
        id: 'ch_pj2', 
        title: 'Teknik Dasar Bola Basket & Permainan Beregu', 
        type: 'modul_pdf', 
        duration: '20 Halaman', 
        completed: true 
      },
      { 
        id: 'ch_pj3', 
        title: 'Pola Makan Gizi Seimbang & Pencegahan Cedera Olahraga', 
        type: 'video', 
        duration: '18 Menit', 
        completed: false,
        videoUrl: '/videos/lesson_video_2.mp4',
        teacherVoiceScript: 'Prinsip RICE yaitu Rest, Ice, Compression, dan Elevation sangat penting saat menangani cedera sendi dan keseleo saat berolahraga.',
        keyPoints: ['Prosedur pertolongan pertama pada cedera olahraga']
      },
    ]
  },
  {
    id: 'course_seni',
    name: 'Pendidikan Seni & Budaya',
    topic: 'Rupa & Musik Nusantara',
    category: 'Umum',
    scheduleGroup: 'Wajib',
    teacher: 'Ibu Maya Lestari, S.Sn',
    grade: 'Kelas 11 SMA',
    coverImage: '/images/hero_school_digital_1793805015402.jpg',
    description: 'Eksplorasi prinsip desain seni rupa murni dua dimensi, teknik kolase media campuran, apresiasi tangga nada pentatonis gamelan, dan tari daerah.',
    totalModules: 5,
    completedModules: 3,
    interactiveSimType: 'none',
    chapters: [
      { 
        id: 'ch_sn1', 
        title: 'Prinsip Desain Seni Rupa: Keseimbangan & Harmoni', 
        type: 'video', 
        duration: '16 Menit', 
        completed: true,
        videoUrl: '/videos/lesson_video_1.mp4',
        teacherVoiceScript: 'Halo siswa siswi SMAN 25 yang kreatif. Dalam pembelajaran seni rupa hari ini, kita mendalami elemen visual titik, garis, bidang, warna, dan tekstur untuk menciptakan komposisi lukisan dua dimensi yang estetis dan berkarakter.',
        keyPoints: ['Keseimbangan simetris dan asimetris dalam komposisi', 'Apresiasi karya seni rupa kontemporer Indonesia', 'Teknik melukis dengan media akrilik dan mixed media']
      },
      { 
        id: 'ch_sn2', 
        title: 'Apresiasi Musik Tradisional: Laras Pelog dan Slendro', 
        type: 'modul_pdf', 
        duration: '22 Halaman', 
        completed: true 
      },
      { 
        id: 'ch_sn3', 
        title: 'Penciptaan Karya Seni Rupa Terapan Bertema Sekolah', 
        type: 'video', 
        duration: '19 Menit', 
        completed: false,
        videoUrl: '/videos/lesson_video_2.mp4',
        teacherVoiceScript: 'Kalian akan merancang poster digital dan karya kriya ramah lingkungan yang mempromosikan kebersihan dan keindahan sekolah kita.',
        keyPoints: ['Karya kriya estetik berbahan daur ulang']
      },
    ]
  },

  // --- PENGEMBANGAN DIRI, BK, P5 & RISET (ADA DI JADWAL) ---
  {
    id: 'course_bk',
    name: 'Bimbingan Konseling (BK)',
    topic: 'Perencanaan Karier & PTN',
    category: 'Pengembangan',
    scheduleGroup: 'Pengembangan',
    teacher: 'Drs. M. Taufik, M.Psi',
    grade: 'Kelas 11 SMA',
    coverImage: '/images/hero_school_digital_1793805015402.jpg',
    description: 'Pemetaan minat bakat Holland RIASEC, strategi seleksi masuk Perguruan Tinggi Negeri (SNBP & SNBT), dan manajemen stres belajar.',
    totalModules: 4,
    completedModules: 3,
    interactiveSimType: 'none',
    chapters: [
      { 
        id: 'ch_bk1', 
        title: 'Pemetaan Minat Bakat & Pilihan Program Studi', 
        type: 'video', 
        duration: '18 Menit', 
        completed: true,
        videoUrl: '/videos/lesson_video_1.mp4',
        teacherVoiceScript: 'Selamat siang anak-anakku kelas 11. Menentukan jurusan kuliah bukan hanya soal tren, tetapi menyelaraskan antara minat sejati, potensi bakat, nilai rapor, dan prospek masa depan. Bapak siap mendampingi konsultasi belajar kalian.',
        keyPoints: ['Analisis tipe kepribadian dan minat bakat karier', 'Strategi menjaga konsistensi nilai rapor semester satu sampai lima', 'Manajemen waktu belajar seimbang antara akademik dan istirahat']
      },
      { 
        id: 'ch_bk2', 
        title: 'Peta Jalan Seleksi Nasional Berdasarkan Prestasi (SNBP)', 
        type: 'modul_pdf', 
        duration: '18 Halaman', 
        completed: true 
      },
      { 
        id: 'ch_bk3', 
        title: 'Simulasi Tes Potensi Skolastik (TPS) UTBK SNBT', 
        type: 'kuis', 
        duration: '20 Soal', 
        completed: false 
      },
    ]
  },
  {
    id: 'course_p5',
    name: 'Projek Penguatan Profil Pelajar Pancasila (P5)',
    topic: 'Gaya Hidup Berkelanjutan & Ekosistem',
    category: 'Pengembangan',
    scheduleGroup: 'Pengembangan',
    teacher: 'Fasilitator Kurikulum',
    grade: 'Kelas 11 SMA',
    coverImage: '/images/hero_school_digital_1793805015402.jpg',
    description: 'Tema Gaya Hidup Berkelanjutan: Inovasi komposter sampah organik, audit jejak karbon sekolah, dan pameran gelar karya terpadu.',
    totalModules: 5,
    completedModules: 4,
    interactiveSimType: 'none',
    chapters: [
      { 
        id: 'ch_p5_1', 
        title: 'Pengantar Projek: Menakar Jejak Karbon Sekolah', 
        type: 'video', 
        duration: '20 Menit', 
        completed: true,
        videoUrl: '/videos/lesson_video_1.mp4',
        teacherVoiceScript: 'Salam Profil Pelajar Pancasila. Projek P5 melatih kalian bergotong royong, bernalar kritis, dan kreatif merancang solusi nyata bagi kelestarian lingkungan sekolah SMAN 25 Jakarta.',
        keyPoints: ['Menemukan permasalahan nyata timbulan sampah plastik', 'Merancang aksi nyata pembuatan komposter organik', 'Menyelenggarakan gelar karya ekspo hasil inovasi siswa']
      },
      { 
        id: 'ch_p5_2', 
        title: 'Panduan Pembuatan Biopori & Pupuk Organik Cair', 
        type: 'modul_pdf', 
        duration: '25 Halaman', 
        completed: true 
      },
      { 
        id: 'ch_p5_3', 
        title: 'Persiapan Gelar Karya & Pameran Inovasi Siswa', 
        type: 'video', 
        duration: '15 Menit', 
        completed: false,
        videoUrl: '/videos/lesson_video_2.mp4',
        teacherVoiceScript: 'Siapkan stan pameran kelas kalian dengan poster informatif dan demonstrasi prototipe daur ulang.',
        keyPoints: ['Teknik presentasi publik di hadapan orang tua dan komunitas']
      },
    ]
  }
];

// =========================================================================
// ATTENDANCE HISTORY & PRESENSI SISWA/GURU
// =========================================================================
export const MOCK_ATTENDANCE_HISTORY: AttendanceRecord[] = [
  { id: 'att_1', date: '9 Nov 2026', dayName: 'Senin', checkInTime: '06.42 WIB', checkOutTime: '15.05 WIB', status: 'Hadir', location: 'SMAN 25 Jakarta (Zona Valid 14m)' },
  { id: 'att_2', date: '6 Nov 2026', dayName: 'Jumat', checkInTime: '06.48 WIB', checkOutTime: '15.10 WIB', status: 'Hadir', location: 'SMAN 25 Jakarta (Zona Valid 11m)' },
  { id: 'att_3', date: '5 Nov 2026', dayName: 'Kamis', checkInTime: '06.51 WIB', checkOutTime: '15.02 WIB', status: 'Hadir', location: 'SMAN 25 Jakarta (Zona Valid 15m)' },
  { id: 'att_4', date: '4 Nov 2026', dayName: 'Rabu', checkInTime: '06.39 WIB', checkOutTime: '15.08 WIB', status: 'Hadir', location: 'SMAN 25 Jakarta (Zona Valid 8m)' },
  { id: 'att_5', date: '3 Nov 2026', dayName: 'Selasa', checkInTime: '06.35 WIB', checkOutTime: '15.12 WIB', status: 'Hadir', location: 'SMAN 25 Jakarta (Zona Valid 6m)' },
  { id: 'att_6', date: '2 Nov 2026', dayName: 'Senin', checkInTime: '06.40 WIB', checkOutTime: '15.00 WIB', status: 'Hadir', location: 'SMAN 25 Jakarta (Zona Valid 10m)' },
];

export const mockAttendance: AttendanceRecord[] = MOCK_ATTENDANCE_HISTORY;
export const MOCK_ATTENDANCE = MOCK_ATTENDANCE_HISTORY;

// =========================================================================
// REKAP SELURUH AGENDA KEGIATAN & UJIAN
// =========================================================================
export const mockAgendas: AgendaItem[] = [
  ...(MOCK_AGENDAS_BY_ROLE['siswa_mipa'] || []),
  ...(MOCK_AGENDAS_BY_ROLE['guru'] || []),
  ...(MOCK_AGENDAS_BY_ROLE['siswa_ips'] || [])
];
export const MOCK_AGENDAS = mockAgendas;

