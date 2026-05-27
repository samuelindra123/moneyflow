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

export function InteractiveDemo() {
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

  // Format time (e.g. 75 -> "01:15")
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setTime(0);
    setIsPlaying(true);
  };

  // Find active subtitle
  const activeSubtitle = subtitles.find(s => time >= s.start && time < s.end)?.text || '';

  // Determine active phase based on time
  const getPhase = () => {
    if (time < 12) return 'intro';
    if (time < 36) return 'transaction';
    if (time < 66) return 'savings';
    if (time < 98) return 'analytics';
    return 'outro';
  };

  const phase = getPhase();

  return (
    <div className="w-full h-full flex flex-col bg-slate-950 text-white relative select-none">
      {/* Video Display screen */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center p-6 md:p-10 bg-gradient-to-b from-slate-900 to-slate-950">
        
        {/* PHASE 0: INTRO */}
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 text-center max-w-lg"
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

          {/* PHASE 1: TRANSACTION ADD SIMULATION */}
          {phase === 'transaction' && (
            <motion.div
              key="transaction"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden text-slate-800 flex flex-col h-72 md:h-80"
            >
              {/* Header */}
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 block" />
                </div>
                <span>Tambah Transaksi Baru</span>
                <div className="w-10" />
              </div>

              {/* Form Simulator */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between text-left">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Nama Transaksi</label>
                    <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 font-medium">
                      {/* Character typing simulator */}
                      {time < 18 ? '' : time < 24 ? 'Kopi Susu Senja ☕'.substring(0, (time - 18) * 3) : 'Kopi Susu Senja ☕'}
                      {isPlaying && time >= 18 && time < 24 && <span className="animate-pulse">|</span>}
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Jumlah (Rp)</label>
                    <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 font-medium">
                      {/* Amount typing simulator */}
                      {time < 24 ? '' : time < 29 ? '35.000'.substring(0, (time - 24) * 2) : '35.000'}
                      {isPlaying && time >= 24 && time < 29 && <span className="animate-pulse">|</span>}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  {/* Simulate click on Simpan */}
                  <motion.div
                    animate={time >= 29 ? { scale: [1, 0.95, 1], backgroundColor: ['#CC5A37', '#b04726', '#10b981'] } : {}}
                    transition={{ duration: 0.3 }}
                    className="px-6 py-2.5 bg-[#CC5A37] text-white text-xs font-bold rounded-xl shadow-sm text-center flex items-center justify-center"
                  >
                    {time >= 29 ? 'Tersimpan ✓' : 'Simpan Transaksi'}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* PHASE 2: TARGET NABUNG PROGRESS BAR */}
          {phase === 'savings' && (
            <motion.div
              key="savings"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-8 text-slate-800 text-left space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-50 border border-orange-100 rounded-xl flex items-center justify-center text-[#CC5A37]">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900">Liburan Ke Bali 🌴</h3>
                    <p className="text-[10px] text-slate-400 font-medium">Target Impian Rumah Tangga</p>
                  </div>
                </div>
                {/* Simulated dynamic progress numbers */}
                <span className="text-xl font-black text-[#CC5A37]">
                  {time < 50 ? '50%' : time < 58 ? Math.min(83, 50 + Math.floor((time - 50) * 4.2)) + '%' : '83%'}
                </span>
              </div>

              <div className="space-y-2">
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  {/* Animated bar filling */}
                  <motion.div
                    initial={{ width: '50%' }}
                    animate={{ width: time < 50 ? '50%' : time < 58 ? `${50 + (time - 50) * 4.2}%` : '83%' }}
                    transition={{ ease: 'easeOut', duration: 0.5 }}
                    className="bg-gradient-to-r from-[#CC5A37] to-[#E5954B] h-full rounded-full"
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <span>Terkumpul: Rp 5.000.000</span>
                  <span>Target: Rp 6.000.000</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* PHASE 3: GRAPHICS ANALYTICS */}
          {phase === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-xl p-6 md:p-8 text-slate-800 text-left grid md:grid-cols-12 gap-6"
            >
              {/* Cashflow column */}
              <div className="md:col-span-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Arus Kas MINGGUAN</span>
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-0.5">
                    <TrendingUp className="w-3.5 h-3.5" /> +15.4%
                  </span>
                </div>
                {/* Simulated Chart Bars */}
                <div className="flex items-end gap-3 h-28 pt-2">
                  {[30, 45, 25, 60, 40, 75, 55].map((h, i) => (
                    <div key={i} className="flex-1 bg-slate-50 border border-slate-100 rounded-lg h-full relative overflow-hidden group">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: time < 75 ? `${h}%` : `${h + Math.sin(time + i) * 6}%` }}
                        transition={{ duration: 0.4 }}
                        className={`absolute bottom-0 left-0 right-0 rounded-lg ${
                          i === 5 ? 'bg-[#CC5A37]' : 'bg-slate-300'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Category stats info */}
              <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 space-y-4 flex flex-col justify-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Kategori Belanja</span>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#CC5A37] block" /> Makanan</span>
                    <span className="text-slate-400">35%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#E5954B] block" /> Jajan</span>
                    <span className="text-slate-400">23%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-400 block" /> Transport</span>
                    <span className="text-slate-400">19%</span>
                  </div>
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
              className="space-y-6 text-center max-w-lg"
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
      <div className="h-16 flex items-center justify-center px-6 border-t border-slate-900 bg-slate-950/80 text-center">
        <p className="text-xs md:text-sm font-medium text-slate-300 max-w-2xl leading-relaxed select-text">
          {activeSubtitle || '...'}
        </p>
      </div>

      {/* Controls Bar */}
      <div className="h-16 px-4 md:px-6 bg-slate-950 border-t border-slate-900 flex items-center justify-between text-slate-400">
        
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
