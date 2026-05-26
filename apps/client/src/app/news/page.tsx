'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, Clock, Bell } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

export default function NewsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white pt-32 pb-24 md:pt-40 flex items-center min-h-[75vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <div className="max-w-xl mx-auto space-y-8">
            {/* Animated badge */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-100 rounded-full text-xs font-bold text-[#CC5A37]"
            >
              <Clock className="w-3.5 h-3.5" />
              Segera Hadir
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="text-4xl sm:text-5xl font-serif font-light text-slate-900 tracking-tight leading-tight"
            >
              MoneyFlow{' '}
              <span className="font-serif italic font-medium text-[#CC5A37]">
                News & Blog
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="text-slate-500 font-light leading-relaxed text-base"
            >
              Halaman ini sedang dalam proses perakitan. Di sini, nantinya kamu bisa membaca log rilis fitur terbaru, tips praktis mengelola pengeluaran bulanan, dan kabar menarik seputar ekosistem MoneyFlow.
            </motion.p>

            {/* Interactive element: Notification panel mockup */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 shadow-sm flex flex-col items-center gap-4 max-w-sm mx-auto"
            >
              <div className="w-10 h-10 bg-orange-50 border border-orange-100 rounded-xl flex items-center justify-center text-[#CC5A37]">
                <Bell className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">Mau tahu saat rilis?</h4>
                <p className="text-[11px] text-slate-400 font-medium">Ikuti media sosial kami untuk berita tercepat.</p>
              </div>
            </motion.div>

            {/* Back action */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.4}
              className="pt-4"
            >
              <Button href="/" variant="outline" className="font-medium inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Beranda
              </Button>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
