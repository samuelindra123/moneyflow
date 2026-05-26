'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

export function CTA() {
  return (
    <section className="py-32 md:py-44 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-[#4F46E5] via-indigo-600 to-[#06B6D4] rounded-3xl p-16 md:p-24 text-center overflow-hidden shadow-2xl shadow-indigo-500/20">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-0">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            {/* Grid dots */}
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)', backgroundSize: '36px 36px' }} />
          </div>

          <div className="relative z-10">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white/90 rounded-full border border-white/10 backdrop-blur-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Gratis selamanya, tanpa kartu kredit
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.1}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-[1.1] max-w-2xl mx-auto"
            >
              Mulai atur keuanganmu sekarang
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.2}
              className="mt-6 text-base sm:text-lg text-indigo-100 max-w-xl mx-auto leading-relaxed"
            >
              Mulai langkah pertamamu sekarang untuk mengelola pengeluaran harian dan mencapai target tabungan yang sehat bersama MoneyFlow.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.3}
              className="mt-10"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-200 cursor-pointer bg-white text-[#4F46E5] hover:bg-indigo-50 shadow-2xl shadow-black/15 px-10 py-5 text-sm"
              >
                Bikin akun gratis
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
