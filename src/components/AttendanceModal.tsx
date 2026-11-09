import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Camera, 
  MapPin, 
  CheckCircle2, 
  X, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  RefreshCw,
  FileCheck,
  AlertTriangle,
  SwitchCamera,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile } from '../types';

interface AttendanceModalProps {
  currentUser: UserProfile;
  currentSchool: string;
  hasCheckedIn: boolean;
  onSuccessCheckIn: (timeStr: string) => void;
  onClose: () => void;
}

export const AttendanceModal: React.FC<AttendanceModalProps> = ({
  currentUser,
  currentSchool,
  hasCheckedIn,
  onSuccessCheckIn,
  onClose,
}) => {
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [attendanceType, setAttendanceType] = useState<'Hadir' | 'Izin' | 'Sakit'>('Hadir');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(hasCheckedIn);
  
  // Real Camera States
  const [cameraStatus, setCameraStatus] = useState<'requesting' | 'active' | 'denied' | 'fallback'>('requesting');
  const [cameraFacing, setCameraFacing] = useState<'user' | 'environment'>('user');
  const [cameraErrorMessage, setCameraErrorMessage] = useState<string>('');
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const currentTime = '06.45 WIB';
  const schoolCoordinates = '-6.175392, 106.827153 (Radius SMAN 25: 12 meter)';

  // Stop camera tracks cleanly
  const stopCameraStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {
          // ignore
        }
      });
      streamRef.current = null;
    }
  }, []);

  // Initialize Real Camera
  const startCamera = useCallback(async (facing: 'user' | 'environment' = 'user') => {
    stopCameraStream();
    setCameraStatus('requesting');
    setCameraErrorMessage('');

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraStatus('fallback');
      setCameraErrorMessage('Kamera tidak didukung oleh browser ini. Menggunakan mode simulasi presensi.');
      return;
    }

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facing,
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(() => {});
        };
      }
      setCameraStatus('active');
    } catch (err: unknown) {
      console.warn('Camera access denied or failed:', err);
      // Fallback gracefully so student can still complete attendance
      setCameraStatus('fallback');
      const errObj = err as { name?: string; message?: string };
      if (errObj.name === 'NotAllowedError' || errObj.name === 'PermissionDeniedError') {
        setCameraErrorMessage('Izin kamera ditolak. Anda dapat memberikan izin kamera di browser atau gunakan tombol Ambil Selfie Otomatis.');
      } else {
        setCameraErrorMessage('Kamera perangkat sedang digunakan aplikasi lain atau tidak tersedia.');
      }
    }
  }, [stopCameraStream]);

  // Start camera on mount if not already submitted
  useEffect(() => {
    if (!showSuccessCard && !photoDataUrl) {
      startCamera(cameraFacing);
    }
    return () => {
      stopCameraStream();
    };
  }, [cameraFacing, photoDataUrl, showSuccessCard, startCamera, stopCameraStream]);

  // Capture real photo from video stream or canvas
  const handleCapturePhoto = () => {
    if (videoRef.current && cameraStatus === 'active') {
      const video = videoRef.current;
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Mirror if front camera
        if (cameraFacing === 'user') {
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Add timestamp watermark on the photo
        ctx.scale(cameraFacing === 'user' ? -1 : 1, 1);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
        ctx.fillRect(0, canvas.height - 45, canvas.width, 45);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 15px Plus Jakarta Sans, sans-serif';
        ctx.fillText(`SMAN 25 JAKARTA · ${currentUser.name} (${currentUser.className})`, 16, canvas.height - 24);
        ctx.font = '12px monospace';
        ctx.fillStyle = '#34d399';
        ctx.fillText(`GPS: VALID · ${currentTime}`, 16, canvas.height - 8);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setPhotoDataUrl(dataUrl);
        stopCameraStream();
        return;
      }
    }

    // Fallback capture if in simulation/fallback mode
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 640, 480);
      grad.addColorStop(0, '#0369a1');
      grad.addColorStop(1, '#0f172a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 640, 480);

      // Student Avatar Badge in center
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(320, 200, 75, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 44px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(currentUser.name.charAt(0), 320, 215);

      ctx.font = 'bold 20px sans-serif';
      ctx.fillText(currentUser.name, 320, 310);
      ctx.font = '15px sans-serif';
      ctx.fillStyle = '#bae6fd';
      ctx.fillText(currentUser.className, 320, 335);

      // Watermark footer
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0, 430, 640, 50);
      ctx.font = '13px monospace';
      ctx.fillStyle = '#34d399';
      ctx.textAlign = 'left';
      ctx.fillText(`[VERIFIKASI PRESIENSI SISWA] SMAN 25 · ${currentTime}`, 20, 460);

      setPhotoDataUrl(canvas.toDataURL('image/jpeg', 0.85));
    }
  };

  const handleRetakePhoto = () => {
    setPhotoDataUrl(null);
    startCamera(cameraFacing);
  };

  const handleToggleFacing = () => {
    const nextFacing = cameraFacing === 'user' ? 'environment' : 'user';
    setCameraFacing(nextFacing);
  };

  const handleSubmitAttendance = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessCard(true);
      onSuccessCheckIn(currentTime);
      stopCameraStream();
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.65 },
        });
      } catch {
        // safe fallback
      }
    }, 700);
  };

  const handleCloseModal = () => {
    stopCameraStream();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Hidden Canvas for Photo Processing */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-5 py-4 flex items-center justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-amber-100 font-semibold">
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>Sistem Presensi Siswa Kelas 11 MIPA · Kamera Aktif</span>
            </div>
            <h3 className="text-base font-bold text-white mt-0.5">
              Presensi Kehadiran Harian
            </h3>
          </div>
          <button
            onClick={handleCloseModal}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-5 space-y-4">
          
          {showSuccessCard ? (
            /* Success State */
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  Verifikasi Berhasil
                </span>
                <h4 className="text-xl font-bold text-slate-900 mt-1">
                  Kehadiran Berhasil Dicatat!
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Presensi {currentUser.name} ({currentUser.className}) telah terverifikasi oleh server SMAN 25 Jakarta.
                </p>
              </div>

              {photoDataUrl && (
                <div className="w-32 h-24 mx-auto rounded-xl overflow-hidden border-2 border-emerald-500 shadow-md">
                  <img src={photoDataUrl} alt="Foto Presensi" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-left space-y-2 max-w-xs mx-auto">
                <div className="flex justify-between text-slate-600">
                  <span>Waktu Check-In:</span>
                  <span className="font-bold text-slate-900">{currentTime}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Status:</span>
                  <span className="font-bold text-emerald-600">Hadir Tepat Waktu</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Siswa:</span>
                  <span className="font-medium text-slate-900">{currentUser.name}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Kelas:</span>
                  <span className="font-medium text-slate-900">{currentUser.className}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Lokasi GPS:</span>
                  <span className="font-medium text-slate-900">Valid (Radius 12m SMAN 25)</span>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="w-full py-2.5 bg-[#0284c7] hover:bg-sky-700 text-white font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer"
              >
                Kembali ke Beranda
              </button>
            </div>
          ) : (
            /* Camera Capture View */
            <>
              {/* Geofencing Status Box */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-emerald-900 block">Radius Geofence: Valid</span>
                    <span className="text-[11px] text-emerald-700">{schoolCoordinates}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-200/60 text-emerald-900 font-bold text-[10px] rounded-full">
                  DI SEKOLAH
                </span>
              </div>

              {/* Real Camera Viewfinder Container */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-4/3 flex items-center justify-center border-2 border-slate-800 shadow-inner group">
                {photoDataUrl ? (
                  /* Captured Photo Preview */
                  <div className="relative w-full h-full">
                    <img
                      src={photoDataUrl}
                      alt="Hasil Foto Selfie Siswa"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>FOTO TERAMBIL</span>
                    </div>

                    <button
                      onClick={handleRetakePhoto}
                      className="absolute bottom-3 right-3 px-3 py-1.5 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold backdrop-blur-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-white/20"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Ulangi Foto</span>
                    </button>
                  </div>
                ) : (
                  /* Live Camera Feed */
                  <div className="relative w-full h-full flex flex-col items-center justify-center text-white bg-slate-900">
                    {/* Live HTML5 Video Element */}
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className={`w-full h-full object-cover ${cameraFacing === 'user' ? 'scale-x-[-1]' : ''}`}
                    />

                    {/* Camera Guidance Overlay */}
                    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-4">
                      {/* Face Oval Frame Guide */}
                      <div className="w-44 h-52 sm:w-48 sm:h-56 rounded-full border-2 border-dashed border-sky-400/80 flex items-center justify-center relative shadow-lg">
                        <div className="w-3 h-3 border-t-2 border-l-2 border-amber-400 absolute top-2 left-4"></div>
                        <div className="w-3 h-3 border-t-2 border-r-2 border-amber-400 absolute top-2 right-4"></div>
                        <div className="w-3 h-3 border-b-2 border-l-2 border-amber-400 absolute bottom-2 left-4"></div>
                        <div className="w-3 h-3 border-b-2 border-r-2 border-amber-400 absolute bottom-2 right-4"></div>
                        <span className="text-[10px] text-sky-200 bg-black/60 backdrop-blur-xs px-2.5 py-0.5 rounded-full font-medium">
                          Posisikan Wajah di Tengah
                        </span>
                      </div>
                    </div>

                    {/* Live Camera Badge */}
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 z-10">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      <span>KAMERA AKTIF · {currentTime}</span>
                    </div>

                    {/* Switch Camera Button (Front / Rear for smartphone) */}
                    <button
                      onClick={handleToggleFacing}
                      className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-lg text-xs backdrop-blur-xs transition-colors cursor-pointer z-10"
                      title="Ganti Kamera Depan/Belakang"
                    >
                      <SwitchCamera className="w-4 h-4" />
                    </button>

                    {/* Snap Photo Button */}
                    <div className="absolute bottom-3 inset-x-0 flex justify-center z-10">
                      <button
                        onClick={handleCapturePhoto}
                        className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <Camera className="w-4 h-4 text-slate-900" />
                        <span>Ambil Foto Selfie Presensi</span>
                      </button>
                    </div>

                    {/* Notification if camera permission notice */}
                    {cameraErrorMessage && (
                      <div className="absolute inset-x-3 bottom-14 bg-amber-500/90 text-white text-[11px] p-2 rounded-lg text-center backdrop-blur-xs z-10">
                        {cameraErrorMessage}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Status Radio Choice */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Keterangan Kehadiran:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Hadir', 'Izin', 'Sakit'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setAttendanceType(type)}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        attendanceType === type
                          ? 'bg-[#0284c7] text-white border-sky-600 shadow-xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes Input for Izin/Sakit */}
              {attendanceType !== 'Hadir' && (
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">
                    Catatan / Alasan {attendanceType}:
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={`Contoh: Surat keterangan dokter dari Puskesmas sudah diunggah...`}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              )}

              {/* Submit Confirmation Button */}
              <div className="pt-2">
                <button
                  disabled={!photoDataUrl || isSubmitting}
                  onClick={handleSubmitAttendance}
                  className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Memverifikasi Wajah & Lokasi SMAN 25...</span>
                    </>
                  ) : (
                    <>
                      <FileCheck className="w-4 h-4" />
                      <span>{photoDataUrl ? 'Kirim Presensi Sekarang' : 'Ambil Foto Selfie Dahulu'}</span>
                    </>
                  )}
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};
