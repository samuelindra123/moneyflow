'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Wallet, Target, Receipt, BarChart3, Calculator, Cloud, ShieldCheck, Zap } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

const coreFeatures = [
  {
    title: 'Catat Pengeluaran Instan',
    description: 'Catat pengeluaran harianmu dalam hitungan detik. Kelompokkan berdasarkan kategori biar analisis pengeluaranmu lebih akurat dan terorganisir.',
    icon: Receipt,
    color: 'text-rose-500 bg-rose-50 border-rose-100',
  },
  {
    title: 'Monitor Pemasukan Lengkap',
    description: 'Pantau semua sumber pendapatanmu mulai dari gaji, komisi freelance, hingga pendapatan sampingan secara terstruktur dan transparan.',
    icon: Wallet,
    color: 'text-emerald-500 bg-emerald-50 border-emerald-100',
  },
  {
    title: 'Target Tabungan Interaktif',
    description: 'Buat target menabung untuk impianmu (gadget baru, liburan, dana darurat) dan pantau progres akumulasinya dengan visual progress bar.',
    icon: Target,
    color: 'text-[#CC5A37] bg-orange-50 border-orange-100',
  },
  {
    title: 'Limit Budget Bulanan',
    description: 'Kontrol hasrat konsumtif dengan memasang limit belanja per kategori (makanan, jajan kopi, transportasi). Dapatkan peringatan saat mendekati batas.',
    icon: Calculator,
    color: 'text-amber-500 bg-amber-50 border-amber-100',
  },
  {
    title: 'Grafik Analisis Visual',
    description: 'Sajikan data keuanganmu dalam bentuk grafik pie dan diagram arus kas mingguan yang sangat mudah dibaca. Tidak perlu lagi membaca deretan angka rumit.',
    icon: BarChart3,
    color: 'text-indigo-500 bg-indigo-50 border-indigo-100',
  },
  {
    title: 'Sinkronisasi Cloud Otomatis',
    description: 'Data keuanganmu tersimpan aman di cloud dan langsung sinkron di semua device (HP, laptop, tablet). Akses catatan keuanganmu kapan saja.',
    icon: Cloud,
    color: 'text-cyan-500 bg-cyan-50 border-cyan-100',
  },
];

export default function FiturPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white pt-32 pb-24 md:pt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Hero */}
          <div className="text-center max-w-3xl mx-auto space-y-6 mb-20">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-100 rounded-full text-xs font-bold text-[#CC5A37]"
            >
              <Zap className="w-3.5 h-3.5" />
              Fitur Unggulan
            </motion.div>
            
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-slate-900 tracking-tight leading-tight"
            >
              Semua alat yang kamu butuhkan untuk{' '}
              <span className="font-serif italic font-medium text-[#CC5A37]">
                menguasai keuanganmu
              </span>
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="text-lg text-slate-500 font-light leading-relaxed"
            >
              MoneyFlow dirancang dengan visual bersih dan fungsionalitas cerdas tanpa iklan mengganggu, membantu kamu membuat keputusan finansial yang lebih percaya diri.
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.1}
                  whileHover={{ y: -4 }}
                  className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 flex flex-col items-start text-left"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border ${feature.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Security Banner Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-50 border border-slate-200/60 rounded-3xl p-8 md:p-12 mt-20 flex flex-col md:flex-row items-center justify-between gap-8 text-left"
          >
            <div className="flex items-start gap-4 max-w-xl">
              <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-emerald-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-serif font-bold text-slate-900">Keamanan Data 100% Terenkripsi</h4>
                <p className="text-slate-500 text-sm font-light leading-relaxed">
                  Kami menganggap serius privasimu. Seluruh data transaksi yang kamu catat disimpan dengan enkripsi tingkat tinggi di database kami. Tidak ada pihak lain yang bisa mengakses datamu.
                </p>
              </div>
            </div>
            <Button variant="primary" size="lg" className="w-full md:w-auto font-medium">
              Mulai Sekarang
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
