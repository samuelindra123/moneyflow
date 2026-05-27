'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Wallet, Target, TrendingUp, Plus, ArrowRight } from 'lucide-react';

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

// Text Speech Synthesizer
const speakText = (text: string) => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  
  // Cancel current speech to prevent overlapping
  window.speechSynthesis.cancel();
  
  if (!text) return;
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'id-ID';
  utterance.rate = 1.1; // Clear presentation pacing
  utterance.pitch = 1.0;
  
  const voices = window.speechSynthesis.getVoices();
  const idVoice = voices.find(v => v.lang.toLowerCase().includes('id'));
  if (idVoice) {
    utterance.voice = idVoice;
  }
  window.speechSynthesis.speak(utterance);
};

// Cursor coordinates mapping based on timestamps (in percentage of full macOS window)
const getCursorCoords = (t: number) => {
  const keyframes = [
    { t: 0, x: 90, y: 90, click: false, opacity: 0 },
    { t: 12, x: 90, y: 90, click: false, opacity: 0 },
    { t: 13.5, x: 55, y: 35, click: false, opacity: 1 },
    { t: 13.9, x: 55, y: 35, click: false, opacity: 1 },
    { t: 14.0, x: 55, y: 35, click: true, opacity: 1 }, // Click name input
    { t: 14.1, x: 55, y: 35, click: false, opacity: 1 },
    { t: 18.0, x: 55, y: 35, click: false, opacity: 1 },
    { t: 19.5, x: 90, y: 90, click: false, opacity: 0 }, // Fades out as it returns to rest
    { t: 20.0, x: 90, y: 90, click: false, opacity: 0 },
    { t: 21.5, x: 55, y: 55, click: false, opacity: 1 },
    { t: 21.9, x: 55, y: 55, click: false, opacity: 1 },
    { t: 22.0, x: 55, y: 55, click: true, opacity: 1 }, // Click amount input
    { t: 22.1, x: 55, y: 55, click: false, opacity: 1 },
    { t: 25.0, x: 55, y: 55, click: false, opacity: 1 },
    { t: 27.0, x: 88, y: 85, click: false, opacity: 1 },
    { t: 27.9, x: 88, y: 85, click: false, opacity: 1 },
    { t: 28.0, x: 88, y: 85, click: true, opacity: 1 }, // Click Simpan
    { t: 28.1, x: 88, y: 85, click: false, opacity: 1 },
    { t: 30.0, x: 12, y: 20, click: false, opacity: 1 }, // Hover Tambah Transaksi sidebar
    { t: 31.0, x: 12, y: 20, click: false, opacity: 1 },
    { t: 32.5, x: 90, y: 90, click: false, opacity: 0 }, // Fades out while waiting
    { t: 36.0, x: 90, y: 90, click: false, opacity: 0 },
    { t: 37.5, x: 12, y: 28, click: false, opacity: 1 }, // Hover Target Nabung sidebar
    { t: 42.0, x: 12, y: 28, click: false, opacity: 1 },
    { t: 43.5, x: 60, y: 50, click: false, opacity: 1 }, // Hover savings target card
    { t: 55.0, x: 60, y: 50, click: false, opacity: 1 },
    { t: 56.5, x: 12, y: 36, click: false, opacity: 1 }, // Hover Analisis Kas sidebar
    { t: 70.0, x: 12, y: 36, click: false, opacity: 1 },
    { t: 71.5, x: 55, y: 55, click: false, opacity: 1 }, // Hover cashflow chart
    { t: 80.0, x: 55, y: 55, click: false, opacity: 1 },
    { t: 81.5, x: 85, y: 55, click: false, opacity: 1 }, // Hover categories
    { t: 88.0, x: 85, y: 55, click: false, opacity: 1 },
    { t: 89.5, x: 55, y: 55, click: false, opacity: 1 },
    { t: 98.0, x: 55, y: 55, click: false, opacity: 1 },
    { t: 100.0, x: 90, y: 90, click: false, opacity: 0 }, // Fades out at outro
    { t: 120.0, x: 90, y: 90, click: false, opacity: 0 }
  ];

  // Find current keyframe segment
  let i = 0;
  while (i < keyframes.length - 1 && t >= keyframes[i+1].t) {
    i++;
  }
  const k1 = keyframes[i];
  const k2 = keyframes[i+1] || k1;
  if (k1.t === k2.t) return { x: `${k1.x}%`, y: `${k1.y}%`, click: k1.click, opacity: k1.opacity };

  // Linear interpolation
  const progress = (t - k1.t) / (k2.t - k1.t);
  const x = k1.x + (k2.x - k1.x) * progress;
  const y = k1.y + (k2.y - k1.y) * progress;
  const opacity = k1.opacity + (k2.opacity - k1.opacity) * progress;
  const click = k1.click || (progress < 0.1 ? k1.click : k2.click);

  return { x: `${x}%`, y: `${y}%`, click, opacity };
};

export function InteractiveDemo() {
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const prevNameLengthRef = useRef(0);
  const prevAmountLengthRef = useRef(0);
  const lastClickTimeRef = useRef(-1);
  const lastSuccessTimeRef = useRef(-1);
  
  const [activeSubtitle, setActiveSubtitle] = useState('');

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

  // Main timer logic (50ms increments for smooth floating clock)
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime >= DURATION) {
            setIsPlaying(false);
            return DURATION;
          }
          return prevTime + 0.05;
        });
      }, 50);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const lastSpokenTextRef = useRef('');

  // Unified voice synthesis and subtitle controller
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const sub = subtitles.find(s => time >= s.start && time < s.end)?.text || '';
    
    // Update subtitle text state
    if (sub !== activeSubtitle) {
      setActiveSubtitle(sub);
    }

    if (!isPlaying) {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
      }
      return;
    }

    // If playing, resume if paused
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    // Speak segment if it changed and hasn't been spoken yet
    if (sub && sub !== lastSpokenTextRef.current) {
      speakText(sub);
      lastSpokenTextRef.current = sub;
    } else if (!sub) {
      window.speechSynthesis.cancel();
      lastSpokenTextRef.current = '';
    }
  }, [time, isPlaying, activeSubtitle]);

  // Clean up speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Derived typing contents
  const nameText = 'Kopi Susu Senja ☕';
  const amountText = '35.000';

  let nameLen = 0;
  if (time >= 18.0) {
    nameLen = nameText.length;
  } else if (time >= 14.5) {
    const progress = (time - 14.5) / 3.5;
    nameLen = Math.floor(nameText.length * progress);
  }

  let amountLen = 0;
  if (time >= 25.5) {
    amountLen = amountText.length;
  } else if (time >= 22.5) {
    const progress = (time - 22.5) / 3.0;
    amountLen = Math.floor(amountText.length * progress);
  }

  const typedName = nameText.slice(0, nameLen);
  const typedAmount = amountText.slice(0, amountLen);
  const isSaved = time >= 28.0;

  // Click & Success Sound Triggers
  useEffect(() => {
    if (!isPlaying) return;

    const clickTimes = [14.0, 22.0, 28.0];
    clickTimes.forEach(t => {
      if (time >= t && lastClickTimeRef.current < t && time - t < 0.2) {
        playClickSound();
        lastClickTimeRef.current = t;
      }
    });

    if (time >= 28.0 && lastSuccessTimeRef.current < 28.0 && time - 28.0 < 0.2) {
      playSuccessChime();
      lastSuccessTimeRef.current = 28.0;
    }

    // Reset last trigger refs if seeking backward
    if (time < lastClickTimeRef.current) {
      lastClickTimeRef.current = -1;
    }
    if (time < lastSuccessTimeRef.current) {
      lastSuccessTimeRef.current = -1;
    }
  }, [time, isPlaying]);

  // Typing sound increments trigger
  useEffect(() => {
    if (isPlaying) {
      if (nameLen > prevNameLengthRef.current) {
        playTypingSound();
      }
      if (amountLen > prevAmountLengthRef.current) {
        playTypingSound();
      }
    }
    prevNameLengthRef.current = nameLen;
    prevAmountLengthRef.current = amountLen;
  }, [nameLen, amountLen, isPlaying]);

  // Format time (e.g. 75.35 -> "01:15")
  const formatTime = (secs: number) => {
    const totalSecs = Math.floor(secs);
    const m = Math.floor(totalSecs / 60).toString().padStart(2, '0');
    const s = (totalSecs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handlePlayPause = () => {
    getAudioContext();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      if (!isPlaying && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    getAudioContext();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setTime(0);
    lastClickTimeRef.current = -1;
    lastSuccessTimeRef.current = -1;
    prevNameLengthRef.current = 0;
    prevAmountLengthRef.current = 0;
    setIsPlaying(true);
  };

  // Get active cursor attributes
  const activeCursor = getCursorCoords(time);

  return (
    <div className="w-full h-full flex flex-col bg-slate-950 text-white relative select-none">
      
      {/* Mac OS Desktop Simulator screen */}
      <div 
        className="flex-1 relative overflow-hidden flex flex-col items-center justify-between p-2 select-none"
        style={{
          background: 'radial-gradient(circle at 10% 20%, rgba(204, 90, 55, 0.4) 0%, transparent 70%), radial-gradient(circle at 90% 80%, rgba(229, 149, 75, 0.3) 0%, transparent 60%), radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 1) 0%, rgba(8, 10, 15, 1) 100%)'
        }}
      >
        {/* macOS top Menu Bar */}
        <div className="w-full h-6 px-4 bg-black/25 backdrop-blur-md flex items-center justify-between text-[11px] font-medium text-white/90 select-none z-20 border-b border-white/5 rounded-t-xl">
          <div className="flex items-center gap-3.5">
            <span className="text-xs font-bold font-sans"></span>
            <span className="font-semibold">Finder</span>
            <span className="hidden md:inline text-white/70">File</span>
            <span className="hidden md:inline text-white/70">Edit</span>
            <span className="hidden md:inline text-white/70">View</span>
            <span className="hidden md:inline text-white/70">Go</span>
            <span className="hidden md:inline text-white/70">Window</span>
            <span className="hidden md:inline text-white/70">Help</span>
          </div>
          <div className="flex items-center gap-3.5">
            <span className="text-white/75">📶</span>
            <span className="text-white/75">🔋 100%</span>
            <span className="font-semibold tracking-wide">Wed 9:41 AM</span>
          </div>
        </div>

        {/* Floating App Window Container */}
        <div className="flex-1 w-full flex items-center justify-center p-4 md:p-6">
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
                className="w-full max-w-5xl bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden text-slate-800 flex flex-col h-[400px] md:h-[460px] relative animate-fade-in"
              >
                {/* Mac Window Header / Safari bar */}
                <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400 select-none">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 block shadow-sm" />
                    <span className="w-3 h-3 rounded-full bg-amber-500 block shadow-sm" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500 block shadow-sm" />
                  </div>
                  <div className="bg-slate-200/60 px-8 py-1 rounded-md text-[10px] text-slate-600 font-mono w-52 text-center">
                    app.moneyflow.com
                  </div>
                  <div className="w-12" />
                </div>

                {/* Mac Window Body / Simulated app workspace */}
                <div className="flex-1 flex bg-slate-50/50 relative overflow-hidden">
                  
                  {/* Simulated Sidebar */}
                  <div className="w-48 bg-slate-900 text-slate-400 p-5 border-r border-slate-800 flex flex-col gap-8 text-[11px] justify-between">
                    <div className="space-y-7">
                      <div className="flex items-center gap-2.5 text-white font-bold px-1">
                        <div className="w-7 h-7 bg-[#CC5A37] rounded-lg flex items-center justify-center shadow-md">
                          <Wallet className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-sans tracking-tight">MoneyFlow</span>
                      </div>
                      <div className="space-y-2">
                        <div className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold transition-all cursor-pointer ${
                          phase === 'transaction' ? 'text-white bg-slate-800' : 'text-slate-400'
                        }`}>
                          <Plus className="w-4 h-4" />
                          Tambah Transaksi
                        </div>
                        <div className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold transition-all cursor-pointer ${
                          phase === 'savings' ? 'text-white bg-slate-800' : 'text-slate-400'
                        }`}>
                          <Target className="w-4 h-4 text-orange-500" />
                          Target Nabung
                        </div>
                        <div className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold transition-all cursor-pointer ${
                          phase === 'analytics' ? 'text-white bg-slate-800' : 'text-slate-400'
                        }`}>
                          <TrendingUp className="w-4 h-4 text-indigo-500" />
                          Analisis Kas
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Simulated Content Frame */}
                  <div className="flex-1 bg-white p-8 relative flex flex-col h-full overflow-hidden">
                    
                    {/* TRANSACTION FORM SIMULATION SUB-PHASE */}
                    {phase === 'transaction' && (
                      <motion.div
                        key="transaction-form"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col justify-between text-left h-full"
                      >
                        <div className="space-y-5">
                          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Form Pengeluaran</h4>
                          <div>
                            <label className="text-[10px] md:text-[11px] font-bold text-slate-450 uppercase tracking-wider block mb-1.5">Nama Transaksi</label>
                            <div className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm text-slate-700 font-semibold transition-all min-h-[42px] flex items-center ${
                              time >= 14.0 && time < 21.0 ? 'border-[#CC5A37] ring-2 ring-orange-500/10' : 'border-slate-200'
                            }`}>
                              {typedName}
                              {isPlaying && time >= 14.5 && time < 18.0 && <span className="animate-pulse ml-0.5">|</span>}
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] md:text-[11px] font-bold text-slate-450 uppercase tracking-wider block mb-1.5">Jumlah (Rp)</label>
                            <div className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm text-slate-700 font-semibold transition-all min-h-[42px] flex items-center ${
                              time >= 22.0 && time < 27.0 ? 'border-[#CC5A37] ring-2 ring-orange-500/10' : 'border-slate-200'
                            }`}>
                              {typedAmount}
                              {isPlaying && time >= 22.5 && time < 25.5 && <span className="animate-pulse ml-0.5">|</span>}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end pt-4">
                          <motion.div
                            animate={isSaved ? { scale: [1, 0.95, 1], backgroundColor: ['#CC5A37', '#b04726', '#10b981'] } : {}}
                            transition={{ duration: 0.3 }}
                            className="px-7 py-3 bg-[#CC5A37] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
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
                        <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-8 space-y-5 max-w-md mx-auto w-full shadow-sm">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-orange-50 border border-orange-100 rounded-2xl flex items-center justify-center text-[#CC5A37] shadow-sm">
                                <Target className="w-6 h-6" />
                              </div>
                              <div>
                                <h3 className="text-base font-serif font-bold text-slate-900">Liburan Ke Bali 🌴</h3>
                                <p className="text-[11px] text-slate-450 font-medium">Target Impian Rumah Tangga</p>
                              </div>
                            </div>
                            <span className="text-xl font-black text-[#CC5A37]">
                              {time < 42 ? '50%' : time < 55 ? Math.min(83, 50 + Math.floor((time - 42) * 2.5)) + '%' : '83%'}
                            </span>
                          </div>

                          <div className="space-y-2.5">
                            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: '50%' }}
                                animate={{ width: time < 42 ? '50%' : time < 55 ? `${50 + (time - 42) * 2.5}%` : '83%' }}
                                transition={{ ease: 'easeOut', duration: 0.5 }}
                                className="bg-gradient-to-r from-[#CC5A37] to-[#E5954B] h-full rounded-full"
                              />
                            </div>
                            <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
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
                        className="flex-1 grid md:grid-cols-12 gap-8 items-center text-left"
                      >
                        <div className="md:col-span-8 space-y-5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-450 uppercase tracking-wider block">Arus Kas Mingguan</span>
                            <span className="text-xs text-emerald-600 font-bold flex items-center gap-0.5">
                              <TrendingUp className="w-4 h-4" /> +15.4%
                            </span>
                          </div>
                          {/* Bars */}
                          <div className="flex items-end gap-3.5 h-36 md:h-44 pt-2">
                            {[30, 45, 25, 60, 40, 75, 55].map((h, idx) => {
                              const isHovered = (time < 80 && idx === 4) || (time >= 80 && time < 88 && idx === 5) || (time >= 88 && idx === 6);
                              return (
                                <div key={idx} className="flex-1 bg-slate-50 border border-slate-100 rounded-xl h-full relative overflow-hidden shadow-sm">
                                  <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    className={`absolute bottom-0 left-0 right-0 rounded-xl transition-colors ${
                                      isHovered ? 'bg-[#CC5A37]' : 'bg-slate-300'
                                    }`}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="md:col-span-4 border-l border-slate-100 pl-6 space-y-4">
                          <span className="text-xs font-bold text-slate-450 uppercase tracking-wider block">Kategori Belanja</span>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-xs font-semibold">
                              <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#CC5A37] block" /> Makanan</span>
                              <span className="text-slate-400">35%</span>
                            </div>
                            <div className="flex items-center justify-between text-xs font-semibold">
                              <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#E5954B] block" /> Jajan</span>
                              <span className="text-slate-400">23%</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                  </div>
                </div>

                {/* SIMULATED MAC OS POINTER/CURSOR - PLACED AT WINDOW ROOT */}
                <motion.div
                  animate={{ 
                    left: activeCursor.x, 
                    top: activeCursor.y,
                    scale: activeCursor.click ? 0.75 : 1,
                    opacity: activeCursor.opacity
                  }}
                  transition={{ type: 'spring', damping: 28, stiffness: 120 }}
                  className="absolute z-50 pointer-events-none w-6 h-6 select-none"
                  style={{ transform: 'translate(-2px, -2px)' }}
                >
                  <svg viewBox="0 0 16 16" className="w-full h-full text-black fill-current drop-shadow-md">
                    <path d="M0 0l5.3 12.5 2.2-4.2 4.2-2.2z" />
                  </svg>
                </motion.div>
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

          {/* Floating Subtitle Overlay */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 max-w-xl w-[90%] text-center pointer-events-none">
            <AnimatePresence mode="wait">
              {activeSubtitle && (
                <motion.div
                  key={activeSubtitle}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="inline-block bg-slate-950/80 backdrop-blur-md px-6 py-2.5 rounded-xl border border-white/10 shadow-2xl"
                >
                  <p className="text-xs md:text-sm font-medium text-white leading-relaxed tracking-wide font-sans select-text">
                    {activeSubtitle}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* macOS Dock */}
        <div className="h-14 bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl flex items-center gap-4 px-4 py-2 shadow-2xl mb-2 z-20 transition-all duration-300">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-b from-[#7ec5f8] to-[#1282e4] border border-[#a2d8ff]/30 shadow-md transform hover:scale-110 transition-transform cursor-pointer relative group">
            <span className="text-lg">😊</span>
            <span className="absolute bottom-[-22px] bg-slate-900/90 text-white text-[9px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">Finder</span>
          </div>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white border border-slate-200 shadow-md transform hover:scale-110 transition-transform cursor-pointer relative group">
            <span className="text-lg">🧭</span>
            <span className="absolute bottom-[-22px] bg-slate-900/90 text-white text-[9px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">Safari</span>
          </div>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#CC5A37] shadow-lg shadow-orange-500/20 transform hover:scale-115 transition-transform cursor-pointer relative group border border-white/10">
            <Wallet className="w-5 h-5 text-white" />
            <div className="absolute bottom-[-22px] bg-slate-900/90 text-white text-[9px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">MoneyFlow</div>
            <span className="absolute -bottom-1.5 w-1 h-1 bg-white rounded-full" />
          </div>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 border border-slate-200 shadow-md transform hover:scale-110 transition-transform cursor-pointer relative group">
            <span className="text-lg">⚙️</span>
            <span className="absolute bottom-[-22px] bg-slate-900/90 text-white text-[9px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">Pengaturan</span>
          </div>
        </div>
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
        <div className="flex-1 mx-6 flex items-center gap-3 group/timeline">
          <span className="text-[10px] font-mono text-slate-400 min-w-[32px] text-right">{formatTime(time)}</span>
          <div className="flex-1 relative flex items-center h-5">
            {/* Custom Track Background */}
            <div className="absolute left-0 right-0 h-1 bg-slate-800 rounded-full group-hover/timeline:h-1.5 transition-all duration-150 pointer-events-none" />
            
            {/* Custom Filled Track */}
            <div 
              className="absolute left-0 h-1 bg-[#CC5A37] rounded-full group-hover/timeline:h-1.5 transition-all duration-150 pointer-events-none"
              style={{ width: `${(time / DURATION) * 100}%` }}
            />

            {/* Native range input overlayed transparently */}
            <input
              type="range"
              min={0}
              max={DURATION}
              step={0.05}
              value={time}
              onChange={(e) => {
                getAudioContext(); // Make sure audio context is active/unlocked on interaction
                setTime(parseFloat(e.target.value));
              }}
              className="absolute w-full h-full opacity-0 cursor-pointer z-10"
              style={{
                WebkitAppearance: 'none',
                appearance: 'none',
              }}
            />

            {/* Custom Thumb indicator */}
            <div 
              className="absolute w-3 h-3 bg-[#CC5A37] border-2 border-white rounded-full pointer-events-none shadow-md transition-all scale-0 group-hover/timeline:scale-100"
              style={{ 
                left: `calc(${(time / DURATION) * 100}% - 6px)`,
                transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)' 
              }}
            />
          </div>
          <span className="text-[10px] font-mono text-slate-400 min-w-[32px]">{formatTime(DURATION)}</span>
        </div>

        {/* Mode tag indicator */}
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider bg-orange-950/30 text-[#CC5A37] border border-orange-900/40 px-2.5 py-1 rounded-md">
          <span>{phase === 'intro' ? 'Intro' : phase === 'transaction' ? 'Simulasi Input' : phase === 'savings' ? 'Tabungan' : phase === 'analytics' ? 'Analisis' : 'Selesai'}</span>
        </div>
      </div>
    </div>
  );
}
