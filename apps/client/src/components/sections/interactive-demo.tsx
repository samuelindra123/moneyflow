'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Wallet, Target, TrendingUp, Plus, User, ArrowRight, Laptop, Calendar } from 'lucide-react';

const DURATION = 120; // 120 seconds (2 minutes)

// Subtitle segments corresponding to timestamps (in seconds)
const subtitles = [
  { start: 0, end: 5, text: 'Halo! Selamat datang di demonstrasi interaktif MoneyFlow.' },
  { start: 5, end: 12, text: 'Mari kita lihat bagaimana aplikasi ini mempermudah pencatatan keuangan harianmu.' },
  { start: 12, end: 18, text: 'Pertama, mari coba catat transaksi baru langsung dari dashboard utama.' },
  { start: 18, end: 24, text: 'Cukup ketik pengeluaranmu secara santai, misalnya: Kopi Susu Senja...' },
  { start: 24, end: 30, text: 'Masukkan jumlahnya, lalu klik Simpan. Sangat mudah dan cepat!' },
  { start: 30, end: 36, text: 'Transaksi langsung tersimpan, saldo berkurang, dan anggaran otomatis diperbarui.' },
  { start: 36, end: 42, text: 'Sekarang, mari kita lihat fitur Target Nabung untuk mencapai mimpi finansialmu.' },
  { start: 42, end: 50, text: 'Kamu bisa memantau progres menabung secara langsung dengan visual yang menarik.' },
  { start: 50, end: 58, text: 'Progress bar akan terisi secara dinamis setiap kali tabunganmu bertambah.' },
  { start: 58, end: 66, text: 'Selanjutnya, terdapat limit budget bulanan untuk menekan sifat konsumtif.' },
  { start: 66, end: 74, text: 'MoneyFlow juga menyajikan visualisasi data yang lengkap dan mudah dipahami.' },
  { start: 74, end: 82, text: 'Lihat pergerakan uang masuk dan keluar lewat grafik cashflow 7 hari terakhir.' },
  { start: 82, end: 90, text: 'Semua data disinkronkan secara aman dan otomatis ke cloud dengan enkripsi tinggi.' },
  { start: 90, end: 98, text: 'Sehingga kamu bisa memantau catatan ini dari laptop, tablet, maupun handphone.' },
  { start: 98, end: 106, text: 'Sederhana, bersih, aman, bebas iklan, dan yang terpenting: Gratis selamanya.' },
  { start: 106, end: 114, text: 'Mulai atur keuanganmu sekarang juga demi masa depan yang terencana.' },
  { start: 114, end: 120, text: 'MoneyFlow ─ Dibuat dengan cinta oleh Samuel Indra Bastian.' },
];

// Web Audio API Synthesizer Context
let audioCtx: AudioContext | null = null;
const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

// Synth typing sound click
const playTypingSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(350 + Math.random() * 150, ctx.currentTime);
  gain.gain.setValueAtTime(0.006, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.03);
};

// Synth button mouse click sound
const playClickSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(700, ctx.currentTime);
  gain.gain.setValueAtTime(0.015, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.06);
};

// Synth success chime
const playSuccessChime = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const playTone = (freq: number, delay: number, duration: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + delay);
    gain.gain.setValueAtTime(0.02, now + delay);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + delay);
    osc.stop(now + delay + duration);
  };
  playTone(523.25, 0, 0.4); // C5
  playTone(659.25, 0.06, 0.4); // E5
  playTone(783.99, 0.12, 0.5); // G5
  playTone(1046.50, 0.18, 0.6); // C6
};

// Synth transition whoosh
const playWhoosh = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.4);
  gain.gain.setValueAtTime(0.01, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.4);
};

// Cursor coordinates mapping based on timestamps (in percentage)
const getCursorCoords = (t: number) => {
  if (t < 13) return { x: '85%', y: '85%', click: false };
  if (t === 13) return { x: '38%', y: '33%', click: false };
  if (t === 14) return { x: '38%', y: '33%', click: true }; // Click name input
  if (t < 21) return { x: '38%', y: '33%', click: false };  // Stay during name typing
  if (t === 21) return { x: '38%', y: '53%', click: false };
  if (t === 22) return { x: '38%', y: '53%', click: true }; // Click amount input
  if (t < 27) return { x: '38%', y: '53%', click: false };  // Stay during amount typing
  if (t === 27) return { x: '82%', y: '73%', click: false };
  if (t === 28) return { x: '82%', y: '73%', click: true };  // Click Simpan
  if (t < 32) return { x: '85%', y: '85%', click: false };
  if (t < 45) return { x: '12%', y: '30%', click: false }; // Hover sidebar menu
  if (t < 60) return { x: '45%', y: '42%', click: false }; // Hover savings progress
  if (t < 75) return { x: '12%', y: '38%', click: false }; // Hover savings menu
  if (t < 80) return { x: '45%', y: '65%', click: false }; // Hover chart bar 5
  if (t < 88) return { x: '55%', y: '50%', click: false }; // Hover chart bar 6
  if (t < 98) return { x: '65%', y: '58%', click: false }; // Hover chart bar 7
  if (t < 114) return { x: '50%', y: '56%', click: false }; // Hover Outro CTA
  return { x: '85%', y: '85%', click: false };
};

export function InteractiveDemo() {
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth typing simulator states
  const [typedName, setTypedName] = useState('');
  const [typedAmount, setTypedAmount] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Phase computation
  const getPhase = () => {
    if (time < 12) return 'intro';
    if (time < 36) return 'transaction';
    if (time < 66) return 'savings';
    if (time < 98) return 'analytics';
    return 'outro';
  };
  const phase = getPhase();

  // Watch for phase changes to play whoosh sound
  const prevPhaseRef = useRef(phase);
  useEffect(() => {
    if (prevPhaseRef.current !== phase) {
      if (isPlaying && phase !== 'intro') {
        playWhoosh();
      }
      prevPhaseRef.current = phase;
    }
  }, [phase, isPlaying]);

  // Main timer logic (seconds)
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime >= DURATION) {
            setIsPlaying(false);
            return DURATION;
          }
          return prevTime + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  // Sub-second smooth typing and sound trigger
  useEffect(() => {
    if (!isPlaying) return;

    // Reset simulator
    if (time === 0) {
      setTypedName('');
      setTypedAmount('');
      setIsSaved(false);
    }

    // Typing name simulation at t = 15s
    if (time === 15) {
      setTypedName('');
      let i = 0;
      const text = 'Kopi Susu Senja ☕';
      const typingTimer = setInterval(() => {
        if (i < text.length) {
          setTypedName((prev) => prev + text.charAt(i));
          playTypingSound();
          i++;
        } else {
          clearInterval(typingTimer);
        }
      }, 110);
      return () => clearInterval(typingTimer);
    }

    // Typing amount simulation at t = 23s
    if (time === 23) {
      setTypedAmount('');
      let i = 0;
      const text = '35.000';
      const typingTimer = setInterval(() => {
        if (i < text.length) {
          setTypedAmount((prev) => prev + text.charAt(i));
          playTypingSound();
          i++;
        } else {
          clearInterval(typingTimer);
        }
      }, 140);
      return () => clearInterval(typingTimer);
    }

    // Mouse click sound simulation for inputs
    if (time === 14 || time === 22) {
      playClickSound();
    }

    // Clicking "Simpan" and saving simulation at t = 28s
    if (time === 28) {
      playClickSound();
      const saveTimer = setTimeout(() => {
        playSuccessChime();
        setIsSaved(true);
      }, 300);
      return () => clearTimeout(saveTimer);
    }
  }, [time, isPlaying]);

  // Format time (e.g. 75 -> "01:15")
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handlePlayPause = () => {
    // Unsuspend audio context on interaction
    getAudioContext();
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    getAudioContext();
    setTime(0);
    setTypedName('');
    setTypedAmount('');
    setIsSaved(false);
    setIsPlaying(true);
  };

  // Find active subtitle
  const activeSubtitle = subtitles.find(s => time >= s.start && time < s.end)?.text || '';

  // Get active cursor attributes
  const activeCursor = getCursorCoords(time);

  return (
    <div className="w-full h-full flex flex-col bg-slate-950 text-white relative select-none">
      
      {/* Mac OS Desktop Simulator screen */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center p-4 md:p-8 bg-slate-900">
        
        {/* PHASE 0: INTRO */}
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 text-center max-w-lg z-10"
            >
              <div className="w-16 h-16 bg-[#CC5A37] rounded-3xl flex items-center justify-center shadow-lg shadow-orange-500/20 mx-auto animate-pulse">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-light tracking-tight leading-tight">
                MoneyFlow <span className="italic font-medium text-[#CC5A37]">Workspace</span>
              </h2>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Pencatatan keuangan pribadi minimalis, teratur, dan otomatis murni berbasis kode.
              </p>
            </motion.div>
          )}

          {/* SIMULATED MAC OS WINDOW FOR PRODUCT TOUR */}
          {phase !== 'intro' && phase !== 'outro' && (
            <motion.div
              key="mac-window"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden text-slate-800 flex flex-col h-[340px] md:h-[380px] relative"
            >
              {/* Mac Window Header / Safari bar */}
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 block" />
                </div>
                <div className="bg-slate-200/60 px-6 py-1 rounded-md text-[9px] text-slate-500 font-mono w-44 text-center">
                  app.moneyflow.com
                </div>
                <div className="w-10" />
              </div>

              {/* Mac Window Body / Simulated app workspace */}
              <div className="flex-1 flex bg-slate-50/50 relative overflow-hidden">
                
                {/* Simulated Sidebar */}
                <div className="w-40 bg-slate-900 text-slate-400 p-4 border-r border-slate-800 flex flex-col gap-6 text-[10px] justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-white font-bold px-1">
                      <div className="w-6 h-6 bg-[#CC5A37] rounded-lg flex items-center justify-center">
                        <Wallet className="w-3 h-3 text-white" />
                      </div>
                      MoneyFlow
                    </div>
                    <div className="space-y-1.5">
                      <div className={`flex items-center gap-2.5 px-3 py-2 rounded-xl font-semibold transition-all ${
                        phase === 'transaction' ? 'text-white bg-slate-850' : 'text-slate-400'
                      }`}>
                        <Plus className="w-3.5 h-3.5" />
                        Tambah Transaksi
                      </div>
                      <div className={`flex items-center gap-2.5 px-3 py-2 rounded-xl font-semibold transition-all ${
                        phase === 'savings' ? 'text-white bg-slate-850' : 'text-slate-400'
                      }`}>
                        <Target className="w-3.5 h-3.5 text-orange-400" />
                        Target Nabung
                      </div>
                      <div className={`flex items-center gap-2.5 px-3 py-2 rounded-xl font-semibold transition-all ${
                        phase === 'analytics' ? 'text-white bg-slate-850' : 'text-slate-400'
                      }`}>
                        <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                        Analisis Kas
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Content Frame */}
                <div className="flex-1 bg-white p-6 relative flex flex-col h-full overflow-hidden">
                  
                  {/* TRANSACTION FORM SIMULATION SUB-PHASE */}
                  {phase === 'transaction' && (
                    <motion.div
                      key="transaction-form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col justify-between text-left h-full"
                    >
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Form Pengeluaran</h4>
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Nama Transaksi</label>
                          <div className={`w-full bg-slate-50 border rounded-xl px-3 py-2 text-xs text-slate-700 font-semibold transition-all ${
                            time >= 14 && time < 21 ? 'border-[#CC5A37] ring-2 ring-orange-500/10' : 'border-slate-200'
                          }`}>
                            {typedName}
                            {isPlaying && time >= 15 && time < 21 && <span className="animate-pulse">|</span>}
                          </div>
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Jumlah (Rp)</label>
                          <div className={`w-full bg-slate-50 border rounded-xl px-3 py-2 text-xs text-slate-700 font-semibold transition-all ${
                            time >= 22 && time < 27 ? 'border-[#CC5A37] ring-2 ring-orange-500/10' : 'border-slate-200'
                          }`}>
                            {typedAmount}
                            {isPlaying && time >= 23 && time < 27 && <span className="animate-pulse">|</span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <motion.div
                          animate={isSaved ? { scale: [1, 0.95, 1], backgroundColor: ['#CC5A37', '#b04726', '#10b981'] } : {}}
                          transition={{ duration: 0.3 }}
                          className="px-6 py-2 bg-[#CC5A37] text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer"
                        >
                          {isSaved ? 'Transaksi Tersimpan ✓' : 'Simpan Transaksi'}
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {/* SAVINGS PROGRESS SIMULATION SUB-PHASE */}
                  {phase === 'savings' && (
                    <motion.div
                      key="savings-card"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col justify-center text-left"
                    >
                      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 space-y-4 max-w-sm mx-auto w-full">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-50 border border-orange-100 rounded-xl flex items-center justify-center text-[#CC5A37]">
                              <Target className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="text-sm font-serif font-bold text-slate-900">Liburan Ke Bali 🌴</h3>
                              <p className="text-[10px] text-slate-400 font-medium">Target Impian Rumah Tangga</p>
                            </div>
                          </div>
                          <span className="text-lg font-black text-[#CC5A37]">
                            {time < 42 ? '50%' : time < 55 ? Math.min(83, 50 + Math.floor((time - 42) * 2.5)) + '%' : '83%'}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: '50%' }}
                              animate={{ width: time < 42 ? '50%' : time < 55 ? `${50 + (time - 42) * 2.5}%` : '83%' }}
                              transition={{ ease: 'easeOut', duration: 0.5 }}
                              className="bg-gradient-to-r from-[#CC5A37] to-[#E5954B] h-full rounded-full"
                            />
                          </div>
                          <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                            <span>Kumpul: Rp 5.0jt</span>
                            <span>Target: Rp 6.0jt</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ANALYTICS SIMULATION SUB-PHASE */}
                  {phase === 'analytics' && (
                    <motion.div
                      key="analytics-charts"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 grid md:grid-cols-12 gap-6 items-center text-left"
                    >
                      <div className="md:col-span-8 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Arus Kas Mingguan</span>
                          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                            <TrendingUp className="w-3.5 h-3.5" /> +15.4%
                          </span>
                        </div>
                        {/* Bars */}
                        <div className="flex items-end gap-3 h-28 pt-2">
                          {[30, 45, 25, 60, 40, 75, 55].map((h, idx) => {
                            const isHovered = (time < 80 && idx === 4) || (time >= 80 && time < 88 && idx === 5) || (time >= 88 && idx === 6);
                            return (
                              <div key={idx} className="flex-1 bg-slate-50 border border-slate-100 rounded-lg h-full relative overflow-hidden">
                                <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: `${h}%` }}
                                  className={`absolute bottom-0 left-0 right-0 rounded-lg transition-colors ${
                                    isHovered ? 'bg-[#CC5A37]' : 'bg-slate-350'
                                  }`}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="md:col-span-4 border-l border-slate-100 pl-4 space-y-3">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Kategori Belanja</span>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[11px] font-semibold">
                            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#CC5A37] block" /> Makanan</span>
                            <span className="text-slate-400">35%</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] font-semibold">
                            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#E5954B] block" /> Jajan</span>
                            <span className="text-slate-400">23%</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* SIMULATED MAC OS POINTER/CURSOR */}
                  <motion.div
                    animate={{ 
                      left: activeCursor.x, 
                      top: activeCursor.y,
                      scale: activeCursor.click ? 0.8 : 1
                    }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="absolute z-50 pointer-events-none w-5.5 h-5.5 select-none"
                    style={{ transform: 'translate(-2px, -2px)' }}
                  >
                    <svg viewBox="0 0 16 16" className="w-full h-full text-black fill-current drop-shadow-md">
                      <path d="M0 0l5.3 12.5 2.2-4.2 4.2-2.2z" />
                    </svg>
                  </motion.div>

                </div>
              </div>
            </motion.div>
          )}

          {/* PHASE 4: OUTRO */}
          {phase === 'outro' && (
            <motion.div
              key="outro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 text-center max-w-lg z-10"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-light tracking-tight leading-tight">
                Mulai Keuangan Sehatmu{' '}
                <span className="font-serif italic font-medium text-[#CC5A37] block mt-1">
                  Hari Ini
                </span>
              </h2>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Demonstrasi selesai. Silakan daftarkan akun gratis pertamamu sekarang juga dan rasakan kemudahan mengontrol arus kas harianmu.
              </p>
              <div className="pt-2">
                <a
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#CC5A37] hover:bg-[#b04726] text-white text-xs font-bold rounded-xl shadow-lg shadow-orange-500/10 transition-colors"
                >
                  Buat Akun Sekarang
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtitles Display overlay */}
      <div className="h-16 flex items-center justify-center px-6 border-t border-slate-900 bg-slate-950/80 text-center select-none">
        <p className="text-xs md:text-sm font-medium text-slate-300 max-w-2xl leading-relaxed select-text">
          {activeSubtitle || '...'}
        </p>
      </div>

      {/* Controls Bar */}
      <div className="h-16 px-4 md:px-6 bg-slate-950 border-t border-slate-900 flex items-center justify-between text-slate-400 select-none">
        
        {/* Play/Pause & Reset */}
        <div className="flex items-center gap-4">
          <button
            onClick={handlePlayPause}
            className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-800 text-white transition-colors cursor-pointer"
            aria-label={isPlaying ? 'Jeda' : 'Putar'}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>

          <button
            onClick={handleReset}
            className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-800 text-white transition-colors cursor-pointer"
            aria-label="Ulang dari awal"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Timeline Slider Track */}
        <div className="flex-1 mx-6 flex items-center gap-3">
          <span className="text-[10px] font-mono text-slate-500">{formatTime(time)}</span>
          <div className="flex-1 bg-slate-800 h-1.5 rounded-full relative overflow-hidden">
            <div 
              className="bg-[#CC5A37] h-full rounded-full transition-all duration-300"
              style={{ width: `${(time / DURATION) * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-slate-500">{formatTime(DURATION)}</span>
        </div>

        {/* Mode tag indicator */}
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider bg-orange-950/30 text-[#CC5A37] border border-orange-900/40 px-2.5 py-1 rounded-md">
          <span>{phase === 'intro' ? 'Intro' : phase === 'transaction' ? 'Simulasi Input' : phase === 'savings' ? 'Tabungan' : phase === 'analytics' ? 'Analisis' : 'Selesai'}</span>
        </div>
      </div>
    </div>
  );
}
