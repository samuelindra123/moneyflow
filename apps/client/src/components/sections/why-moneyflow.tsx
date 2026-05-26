'use client';

import { motion } from 'framer-motion';
import { LayoutGrid, ShieldCheck, Sparkles } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { fadeInUp } from '@/lib/animations';

const reasons = [
  {
    icon: LayoutGrid,
    title: 'Semua lebih rapi',
    description: 'Gak perlu spreadsheet berantakan lagi. Semua data keuanganmu tertata rapi dan gampang dicari.',
    gradient: 'from-indigo-500 to-indigo-600',
  },
  {
    icon: ShieldCheck,
    title: 'Data aman',
    description: 'Datamu dienkripsi dengan standar keamanan bank. Gak ada yang bisa akses selain kamu.',
    gradient: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Sparkles,
    title: 'Insight pintar',
    description: 'MoneyFlow kasih rekomendasi berdasarkan pola pengeluaranmu. Biar kamu makin pintar atur uang.',
    gradient: 'from-[#06B6D4] to-cyan-600',
  },
];

export function WhyMoneyFlow() {
  return (
    <section className="py-32 md:py-44 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Kenapa MoneyFlow?"
          title="Dibuat untuk mempermudah hidupmu"
          subtitle="Kami memahami bahwa mengelola keuangan bisa melelahkan. Itulah mengapa MoneyFlow dirancang se-intuitif mungkin."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.15}
              whileHover={{ y: -4 }}
              className="bg-white border border-slate-100/80 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 flex flex-col items-start"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${reason.gradient} rounded-2xl flex items-center justify-center shadow-lg mb-6`}>
                <reason.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-3 text-left">{reason.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm text-left">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
