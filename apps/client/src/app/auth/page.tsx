'use client';

import { motion } from 'framer-motion';
import { Wallet, ArrowLeft, Shield, Sparkles, Cloud, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeInUp } from '@/lib/animations';
import Link from 'next/link';

export default function AuthPage() {
  const benefits = [
    {
      title: '100% Gratis & Selamanya',
      desc: 'Nikmati semua fitur pencatatan dan monitoring tanpa biaya bulanan atau iklan.',
      icon: CheckCircle2,
    },
    {
      title: 'Sinkronisasi Cloud Aman',
      desc: 'Data keuanganmu tersimpan aman di cloud. Akses dari perangkat mana saja kapan saja.',
      icon: Cloud,
    },
    {
      title: 'Analisis & Visualisasi Instan',
      desc: 'Pantau kebiasaan belanjamu lewat grafik interaktif yang otomatis diperbarui.',
      icon: Sparkles,
    },
  ];

  return (
    <main className="relative min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      {/* Decorative terracotta radial gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#CC5A37] rounded-full blur-[120px] opacity-[0.08] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#E5954B] rounded-full blur-[120px] opacity-[0.06] pointer-events-none" />

      {/* Grid line background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at 50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="w-full max-w-[480px] z-10 space-y-8">
        {/* Brand Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-center"
        >
          <Link href="/" className="inline-flex items-center gap-2.5 group justify-center">
            <div className="w-10 h-10 bg-[#CC5A37] rounded-xl flex items-center justify-center shadow-lg shadow-[#CC5A37]/20 group-hover:shadow-[#CC5A37]/40 transition-shadow">
              <Wallet className="w-5.5 h-5.5 text-white" />
            </div>
            <span className="text-2xl font-serif font-bold text-slate-900 tracking-tight">MoneyFlow</span>
          </Link>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="relative bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-100/50 overflow-hidden"
        >
          {/* Card Top Terracotta Accent */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#CC5A37] to-transparent" />

          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl font-serif font-bold text-slate-900">Selamat Datang</h1>
            <p className="text-sm text-slate-500 font-light">Masuk untuk mulai mengelola keuanganmu secara lebih bijak.</p>
          </div>

          {/* Benefits list */}
          <div className="space-y-5 mb-8">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div key={i} className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[#CC5A37] bg-[#CC5A37]/10">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-slate-800">{benefit.title}</h4>
                    <p className="text-[11px] text-slate-500 font-light leading-relaxed mt-0.5">{benefit.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Google Login Button */}
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => {
                const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
                window.location.href = `${backendUrl}/auth/google`;
              }}
              className="w-full flex items-center justify-center gap-3 px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 text-sm font-bold rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-slate-200 hover:border-slate-300"
            >
              {/* Google Vector SVG Icon */}
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Masuk dengan Google
            </motion.button>

            <div className="flex items-center gap-1.5 justify-center text-[10px] text-slate-400 font-medium">
              <Shield className="w-3.5 h-3.5 text-[#CC5A37]" />
              <span>Kami menjaga privasi dan keamanan data Anda dengan enkripsi.</span>
            </div>
          </div>
        </motion.div>

        {/* Back and Footer links */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="flex flex-col items-center gap-6"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke Beranda
          </Link>

          <p className="text-[10px] text-slate-400 font-medium">
            Dengan masuk, Anda menyetujui{' '}
            <Link href="/privacy" className="hover:text-slate-600 transition-colors">
              Kebijakan Privasi
            </Link>{' '}
            dan{' '}
            <Link href="/terms" className="hover:text-slate-600 transition-colors">
              Syarat & Ketentuan
            </Link>{' '}
            kami.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
