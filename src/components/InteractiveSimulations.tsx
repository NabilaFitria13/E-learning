import React, { useState, useEffect } from 'react';
import { 
  FlaskConical, 
  RotateCcw, 
  Info, 
  Sliders, 
  Play, 
  Pause,
  Compass,
  TrendingDown,
  Gauge,
  CheckCircle2
} from 'lucide-react';

interface InteractiveSimulationsProps {
  initialTab?: 'titrasi_kimia' | 'fisika_newton';
}

export const InteractiveSimulations: React.FC<InteractiveSimulationsProps> = ({
  initialTab = 'titrasi_kimia',
}) => {
  const [activeSim, setActiveSim] = useState<'titrasi_kimia' | 'fisika_newton'>(initialTab);

  // ================= STATE FOR SMA: TITRASI ASAM BASA =================
  const [naohVolume, setNaohVolume] = useState<number>(10.0); // mL NaOH added
  const [isDripping, setIsDripping] = useState<boolean>(false);

  const calculatePH = (vol: number) => {
    const vTotal = 25 + vol; // in mL
    const molesHCl = 25 * 0.1; // in mmol
    const molesNaOH = vol * 0.1; // in mmol

    if (molesNaOH < molesHCl) {
      const excessH = (molesHCl - molesNaOH) / vTotal; // Molar
      const ph = -Math.log10(Math.max(1e-7, excessH));
      return Math.min(6.9, Math.max(1.0, parseFloat(ph.toFixed(2))));
    } else if (Math.abs(molesNaOH - molesHCl) < 0.01) {
      return 7.0; // Equivalence point
    } else {
      const excessOH = (molesNaOH - molesHCl) / vTotal; // Molar
      const pOH = -Math.log10(Math.max(1e-7, excessOH));
      const ph = 14 - pOH;
      return Math.min(13.2, Math.max(7.1, parseFloat(ph.toFixed(2))));
    }
  };

  const currentPH = calculatePH(naohVolume);

  const getSolutionColor = (ph: number) => {
    if (ph < 8.2) return 'rgba(224, 242, 254, 0.45)'; // Clear light cyan
    if (ph < 9.5) return 'rgba(244, 114, 182, 0.55)'; // Soft pink
    return 'rgba(219, 39, 119, 0.85)'; // Deep vivid fuchsia
  };

  const handleStepVolume = (delta: number) => {
    setNaohVolume((prev) => {
      const next = Math.min(50, Math.max(0, +(prev + delta).toFixed(1)));
      return next;
    });
    setIsDripping(true);
    setTimeout(() => setIsDripping(false), 400);
  };

  // ================= STATE FOR SMA: FISIKA BIDANG MIRING =================
  const [angleTheta, setAngleTheta] = useState<number>(30); // degrees
  const [blockMass, setBlockMass] = useState<number>(2.0); // kg
  const [frictionMu, setFrictionMu] = useState<number>(0.2); // coefficient of kinetic friction
  const [isSimRunning, setIsSimRunning] = useState<boolean>(false);
  const [blockProgress, setBlockProgress] = useState<number>(0); // 0 to 100%
  const [timerSeconds, setTimerSeconds] = useState<number>(0);

  // Gravity constant g = 9.8 m/s^2
  const g = 9.8;
  const rad = (angleTheta * Math.PI) / 180;
  const sinTheta = Math.sin(rad);
  const cosTheta = Math.cos(rad);

  // a = g * (sin(theta) - mu * cos(theta))
  const netAcceleration = Math.max(0, +(g * (sinTheta - frictionMu * cosTheta)).toFixed(2));
  const normalForce = +(blockMass * g * cosTheta).toFixed(1);
  const downhillGravityForce = +(blockMass * g * sinTheta).toFixed(1);
  const frictionForce = +(frictionMu * normalForce).toFixed(1);

  useEffect(() => {
    let interval: any = null;
    if (isSimRunning) {
      if (netAcceleration <= 0) {
        setIsSimRunning(false);
        return;
      }
      interval = setInterval(() => {
        setBlockProgress((prev) => {
          if (prev >= 100) {
            setIsSimRunning(false);
            return 100;
          }
          return prev + Math.max(0.8, netAcceleration * 0.4);
        });
        setTimerSeconds((prev) => +(prev + 0.05).toFixed(2));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isSimRunning, netAcceleration]);

  const handleResetPhysics = () => {
    setIsSimRunning(false);
    setBlockProgress(0);
    setTimerSeconds(0);
  };

  return (
    <div className="p-3 sm:p-5 md:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Title & Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider">
              Laboratorium Sains Virtual SMA
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-medium">Kurikulum Merdeka Mandiri</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-0.5">
            Laboratorium & Eksperimen Sains Interaktif
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-slate-200/70 rounded-xl text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveSim('titrasi_kimia')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeSim === 'titrasi_kimia'
                ? 'bg-white text-[#0284c7] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            <span>Lab Kimia: Titrasi Asam Basa</span>
          </button>
          <button
            onClick={() => setActiveSim('fisika_newton')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeSim === 'fisika_newton'
                ? 'bg-white text-[#0284c7] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Lab Fisika: Dinamika Newton</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* VIEW 1: SMA SCIENCE LAB - TITRASI ASAM BASA                   */}
      {/* ============================================================== */}
      {activeSim === 'titrasi_kimia' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Canvas: Apparatus */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-6 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-sky-700 uppercase">
                  Eksperimen Titrimetri SMA MIPA
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Titrasi 25 mL HCl (0.1 M) dengan NaOH (0.1 M)
                </h3>
              </div>
              <button
                onClick={() => setNaohVolume(0)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Buret</span>
              </button>
            </div>

            {/* Visual Glassware Simulation Stage */}
            <div className="relative bg-gradient-to-b from-slate-50 to-sky-50/50 rounded-2xl p-6 h-80 flex items-center justify-center border border-slate-100 overflow-hidden">
              {/* Stand Statif */}
              <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-2 bg-slate-300 rounded"></div>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-4 w-36 h-3 bg-slate-400 rounded-md"></div>

              {/* Buret Tube */}
              <div className="absolute left-1/2 -translate-x-1/2 top-4 w-8 h-40 bg-white/90 border-2 border-slate-400 rounded-t-sm flex flex-col justify-end p-0.5 shadow-xs">
                <div
                  className="w-full bg-sky-200/90 rounded-t-xs transition-all duration-300"
                  style={{ height: `${Math.max(5, 100 - (naohVolume / 50) * 100)}%` }}
                ></div>
                <div className="absolute inset-y-2 right-1 flex flex-col justify-between text-[7px] text-slate-400 font-mono select-none">
                  <span>0</span>
                  <span>10</span>
                  <span>25</span>
                  <span>50</span>
                </div>
              </div>

              {/* Buret Valve */}
              <div className="absolute left-1/2 -translate-x-1/2 top-44 w-10 h-3 bg-slate-700 rounded-sm flex items-center justify-center z-10 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              </div>

              {/* Dripping drop animation */}
              {isDripping && (
                <div className="absolute left-1/2 -translate-x-1/2 top-48 w-2 h-3 bg-sky-400 rounded-full animate-bounce"></div>
              )}

              {/* Erlenmeyer Flask */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-7 w-28 h-28 relative flex items-end justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md overflow-visible">
                  <path
                    d="M 40 10 L 40 30 L 10 90 A 6 6 0 0 0 16 96 L 84 96 A 6 6 0 0 0 90 90 L 60 30 L 60 10 Z"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="3"
                  />
                  <path
                    d="M 20 80 L 25 70 L 75 70 L 80 80 L 84 94 L 16 94 Z"
                    fill={getSolutionColor(currentPH)}
                    className="transition-colors duration-500"
                  />
                </svg>
              </div>

              {/* Digital pH Sensor */}
              <div className="absolute top-4 right-4 bg-slate-900 text-white rounded-xl p-3 shadow-lg border border-slate-700 font-mono text-center min-w-[110px]">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-sans">
                  pH Sensor
                </span>
                <span className={`text-2xl font-bold tracking-tight ${
                  currentPH < 7 ? 'text-rose-400' : currentPH === 7 ? 'text-emerald-400' : 'text-fuchsia-400'
                }`}>
                  {currentPH.toFixed(2)}
                </span>
                <span className="text-[10px] text-slate-300 block font-sans mt-0.5">
                  {currentPH < 7 ? 'Asam Kuat' : currentPH === 7 ? 'Netral (Ekuivalen)' : 'Basa Kuat'}
                </span>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-[#0284c7]" />
                  Volume NaOH 0.1 M:
                </span>
                <span className="font-mono font-bold text-sm text-[#0284c7]">
                  {naohVolume.toFixed(1)} mL / 50.0 mL
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="50"
                step="0.5"
                value={naohVolume}
                onChange={(e) => {
                  setNaohVolume(parseFloat(e.target.value));
                  setIsDripping(true);
                  setTimeout(() => setIsDripping(false), 300);
                }}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0284c7]"
              />

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <span className="text-[11px] text-slate-500">Tetesan Presisi:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleStepVolume(0.1)}
                    className="px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-[#0284c7] border border-sky-200 rounded-md text-xs font-bold transition-colors"
                  >
                    +0.1 mL (1 Tetes)
                  </button>
                  <button
                    onClick={() => handleStepVolume(1.0)}
                    className="px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-[#0284c7] border border-sky-200 rounded-md text-xs font-bold transition-colors"
                  >
                    +1.0 mL
                  </button>
                  <button
                    onClick={() => setNaohVolume(25.0)}
                    className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-md text-xs font-bold transition-colors"
                  >
                    Titik Ekuivalen (25.0 mL)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Concept & Graph */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-800 text-sm">
                  Kurva Titrasi Asam Basa
                </h4>
                <span className="text-[11px] text-slate-400 font-mono">pH vs V(mL)</span>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                <svg viewBox="0 0 200 120" className="w-full h-32 overflow-visible">
                  <line x1="20" y1="10" x2="190" y2="10" stroke="#e2e8f0" strokeDasharray="2" />
                  <line x1="20" y1="60" x2="190" y2="60" stroke="#e2e8f0" strokeDasharray="2" />
                  <line x1="20" y1="110" x2="190" y2="110" stroke="#94a3b8" />
                  <line x1="20" y1="10" x2="20" y2="110" stroke="#94a3b8" />

                  <text x="5" y="14" fontSize="7" fill="#64748b">14</text>
                  <text x="8" y="63" fontSize="7" fill="#64748b">7</text>
                  <text x="8" y="112" fontSize="7" fill="#64748b">0</text>

                  {/* Equivalence marker line at 25 mL */}
                  <line x1="105" y1="10" x2="105" y2="110" stroke="#f59e0b" strokeDasharray="2" strokeWidth="1" />

                  <path
                    d="M 20 102 C 60 100, 95 95, 105 60 C 115 25, 150 18, 190 15"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="2.5"
                  />

                  {(() => {
                    const cx = 20 + (naohVolume / 50) * 170;
                    const cy = 110 - (currentPH / 14) * 100;
                    return (
                      <circle
                        cx={cx}
                        cy={cy}
                        r="5"
                        fill="#f59e0b"
                        stroke="#ffffff"
                        strokeWidth="2"
                        className="transition-all duration-200"
                      />
                    );
                  })()}
                </svg>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#0284c7]"></span>
                  Kurva pH
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  Titik Ekuivalen (25 mL, pH 7.0)
                </span>
              </div>
            </div>

            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 text-xs text-slate-700 space-y-2">
              <h5 className="font-bold text-[#0284c7] flex items-center gap-1.5">
                <Info className="w-4 h-4" />
                <span>Rangkuman Konsep Kurikulum Merdeka:</span>
              </h5>
              <ul className="space-y-1.5 text-[11px] text-slate-600 list-disc list-inside">
                <li>
                  <strong>Reaksi Netralisasi:</strong> HCl(aq) + NaOH(aq) → NaCl(aq) + H2O(l)
                </li>
                <li>
                  <strong>Titik Akhir Titrasi:</strong> Ditandai dengan perubahan warna larutan dari bening menjadi merah muda lembut karena indikator fenolftalein (PP).
                </li>
                <li>
                  <strong>Stoikiometri:</strong> Va × Ma × na = Vb × Mb × nb. Titik ekuivalen tercapai tepat pada volume 25.0 mL.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW 2: SMA PHYSICS LAB - DINAMIKA NEWTON BIDANG MIRING         */}
      {/* ============================================================== */}
      {activeSim === 'fisika_newton' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Canvas: Incline Physics Simulation (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-5 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-sky-700 uppercase">
                  Fisika Mekanika SMA Fase F
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Gerak Balok pada Bidang Miring Kasar (Hukum II Newton)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetPhysics}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Posisi</span>
                </button>
              </div>
            </div>

            {/* Incline Canvas */}
            <div className="relative bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl p-6 h-80 flex items-center justify-center border border-slate-800 overflow-hidden">
              
              {/* SVG Incline Plane */}
              <svg viewBox="0 0 400 240" className="w-full h-full overflow-visible">
                {/* Triangular Ramp */}
                <polygon
                  points="40,200 360,200 40,60"
                  fill="#1e293b"
                  stroke="#38bdf8"
                  strokeWidth="3"
                />

                {/* Ground */}
                <line x1="20" y1="200" x2="380" y2="200" stroke="#64748b" strokeWidth="3" />

                {/* Angle Arc */}
                <path
                  d="M 100,200 A 60,60 0 0,0 95,176"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2"
                />
                <text x="110" y="190" fill="#f59e0b" fontSize="12" fontWeight="bold">
                  θ = {angleTheta}°
                </text>

                {/* Sliding Block */}
                {(() => {
                  // Slope from (40, 60) to (360, 200)
                  const startX = 60;
                  const startY = 70;
                  const endX = 330;
                  const endY = 190;
                  const currentX = startX + (blockProgress / 100) * (endX - startX);
                  const currentY = startY + (blockProgress / 100) * (endY - startY);

                  return (
                    <g transform={`translate(${currentX}, ${currentY}) rotate(23)`}>
                      <rect
                        x="-20"
                        y="-25"
                        width="40"
                        height="25"
                        rx="4"
                        fill="#0284c7"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                      <text x="-12" y="-9" fill="#ffffff" fontSize="9" fontWeight="bold">
                        {blockMass} kg
                      </text>
                    </g>
                  );
                })()}
              </svg>

              {/* Live Telemetry Overlay */}
              <div className="absolute top-4 right-4 bg-slate-900/90 border border-slate-700 text-white p-3 rounded-xl font-mono text-xs space-y-1">
                <div className="flex justify-between gap-3 text-slate-300">
                  <span>Waktu (t):</span>
                  <span className="font-bold text-amber-300">{timerSeconds} s</span>
                </div>
                <div className="flex justify-between gap-3 text-slate-300">
                  <span>Percepatan (a):</span>
                  <span className="font-bold text-sky-400">{netAcceleration} m/s²</span>
                </div>
                <div className="flex justify-between gap-3 text-slate-300">
                  <span>Gaya Normal (N):</span>
                  <span className="font-bold text-emerald-400">{normalForce} N</span>
                </div>
                <div className="flex justify-between gap-3 text-slate-300">
                  <span>Gaya Gesek (fk):</span>
                  <span className="font-bold text-rose-400">{frictionForce} N</span>
                </div>
              </div>
            </div>

            {/* Physics Controls Deck */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-1">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Sudut Kemiringan (θ): {angleTheta}°
                </label>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={angleTheta}
                  onChange={(e) => {
                    setAngleTheta(parseInt(e.target.value));
                    handleResetPhysics();
                  }}
                  className="w-full accent-[#0284c7]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Massa Balok (m): {blockMass} kg
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={blockMass}
                  onChange={(e) => {
                    setBlockMass(parseFloat(e.target.value));
                    handleResetPhysics();
                  }}
                  className="w-full accent-[#0284c7]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Koefisien Gesek (μk): {frictionMu}
                </label>
                <input
                  type="range"
                  min="0"
                  max="0.8"
                  step="0.05"
                  value={frictionMu}
                  onChange={(e) => {
                    setFrictionMu(parseFloat(e.target.value));
                    handleResetPhysics();
                  }}
                  className="w-full accent-[#0284c7]"
                />
              </div>
            </div>

            {/* Play / Pause Buttons */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                {netAcceleration > 0
                  ? 'Kondisi: Balok meluncur dipercepat ke bawah.'
                  : 'Kondisi: Diam / Gaya gesek menahan balok.'}
              </span>

              <button
                disabled={netAcceleration <= 0}
                onClick={() => setIsSimRunning(!isSimRunning)}
                className="px-5 py-2.5 bg-[#0284c7] hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 disabled:opacity-40"
              >
                {isSimRunning ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Jeda Simulasi</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Mulai Meluncur</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Theory Deck */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">
                Analisis Vektor Gaya Newton (FBD)
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Penguraian gaya pada sumbu sejajar dan tegak lurus bidang miring:
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-sky-50 border border-sky-200 flex justify-between font-mono">
                  <span className="text-sky-900">Gaya Luncur (W sin θ):</span>
                  <span className="font-bold text-[#0284c7]">{downhillGravityForce} N</span>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex justify-between font-mono">
                  <span className="text-emerald-900">Gaya Normal (W cos θ):</span>
                  <span className="font-bold text-emerald-700">{normalForce} N</span>
                </div>
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 flex justify-between font-mono">
                  <span className="text-rose-900">Gaya Gesek Kinetis (fk):</span>
                  <span className="font-bold text-rose-700">{frictionForce} N</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 text-white flex justify-between font-mono font-bold">
                  <span>Gaya Total (ΣF):</span>
                  <span className="text-amber-400">
                    {(blockMass * netAcceleration).toFixed(1)} N
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 text-xs text-slate-700 space-y-2">
              <h5 className="font-bold text-[#0284c7] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Prinsip Belajar Fisika SMA:</span>
              </h5>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Bila tan(θ) {'>'} μs, gaya berat penarik melebihi batas gesekan statis sehingga benda bergerak dengan percepatan $a = g(\sin\theta - \mu\cos\theta)$.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
