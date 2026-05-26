'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { fadeInUp } from '@/lib/animations';
import { PieChart, ArrowUpRight, ArrowDownRight, Wallet, CreditCard, ShoppingBag, Utensils, Car, Gamepad2 } from 'lucide-react';

const categories = [
  { name: 'Makanan', amount: 1200000, percent: 35, icon: Utensils, color: 'bg-[#CC5A37]' },
  { name: 'Transportasi', amount: 800000, percent: 23, icon: Car, color: 'bg-[#E5954B]' },
  { name: 'Belanja', amount: 650000, percent: 19, icon: ShoppingBag, color: 'bg-[#2C5E43]' },
  { name: 'Hiburan', amount: 450000, percent: 13, icon: Gamepad2, color: 'bg-[#6B5E53]' },
  { name: 'Lainnya', amount: 350000, percent: 10, icon: CreditCard, color: 'bg-slate-400' },
];

const weeklyData = [
  { day: 'Sen', income: 60, expense: 40 },
  { day: 'Sel', income: 45, expense: 55 },
  { day: 'Rab', income: 70, percent: 35, expense: 35 },
  { day: 'Kam', income: 50, expense: 45 },
  { day: 'Jum', income: 80, expense: 60 },
  { day: 'Sab', income: 35, expense: 75 },
  { day: 'Min', income: 25, expense: 50 },
];

export function ProductShowcase() {
  return (
    <section id="cara-kerja" className="py-32 md:py-44 bg-slate-50/30 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Dashboard Utama"
          title="Lihat keuanganmu dalam sekali lirik"
          subtitle="Dashboard interaktif yang menyajikan data secara transparan agar kamu selalu tahu ke mana uangmu mengalir."
        />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative mt-16"
        >
          {/* Dashboard mockup */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl shadow-slate-200/30 overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#CC5A37] rounded-lg flex items-center justify-center shadow-md shadow-indigo-500/10">
                  <Wallet className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-slate-900 text-sm">MoneyFlow Workspace</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
              </div>
            </div>

            <div className="p-6 md:p-10">
              {/* Stats grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-[#CC5A37] rounded-2xl p-6 text-white shadow-lg shadow-indigo-500/10">
                  <div className="flex items-center justify-between mb-4">
                    <Wallet className="w-5 h-5 text-orange-100" />
                    <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Total</span>
                  </div>
                  <p className="text-3xl font-black">12.4jt</p>
                  <p className="text-orange-100 text-xs mt-2">Saldo keseluruhan</p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <ArrowUpRight className="w-5 h-5 text-[#2C5E43]" />
                    <span className="text-xs text-[#2C5E43] bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold">+12%</span>
                  </div>
                  <p className="text-3xl font-black text-slate-900">8.5jt</p>
                  <p className="text-slate-400 text-xs mt-2">Pemasukan bulan ini</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <ArrowDownRight className="w-5 h-5 text-[#CC5A37]" />
                    <span className="text-xs text-[#CC5A37] bg-rose-50 px-2.5 py-0.5 rounded-full font-bold">-5%</span>
                  </div>
                  <p className="text-3xl font-black text-slate-900">3.4jt</p>
                  <p className="text-slate-400 text-xs mt-2">Pengeluaran bulan ini</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <PieChart className="w-5 h-5 text-[#CC5A37]" />
                    <span className="text-xs text-[#CC5A37] bg-orange-50 px-2.5 py-0.5 rounded-full font-bold">On track</span>
                  </div>
                  <p className="text-3xl font-black text-slate-900">75%</p>
                  <p className="text-slate-400 text-xs mt-2">Target nabung</p>
                </div>
              </div>

              {/* Charts row */}
              <div className="grid md:grid-cols-5 gap-8">
                {/* Weekly chart */}
                <div className="md:col-span-3 bg-slate-50/50 border border-slate-100 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="font-serif font-bold text-slate-800 text-sm">Aliran Kas Mingguan</p>
                      <p className="text-[10px] text-slate-400 font-medium">Bandingan pengeluaran & pemasukan</p>
                    </div>
                    <span className="text-xs bg-white border border-slate-100 shadow-sm px-3 py-1 rounded-lg text-slate-500 font-semibold">Minggu ini</span>
                  </div>
                  <div className="flex items-end gap-4 h-36">
                    {weeklyData.map((d, i) => (
                      <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full flex gap-1 items-end h-28">
                          <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: `${d.income}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + i * 0.05, duration: 0.6 }}
                            className="flex-1 bg-[#2C5E43] rounded-t-md"
                          />
                          <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: `${d.expense}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + i * 0.05, duration: 0.6 }}
                            className="flex-1 bg-[#CC5A37] rounded-t-md"
                          />
                        </div>
                        <span className="text-xs text-slate-400 font-medium">{d.day}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-6 mt-6 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full bg-[#2C5E43]" />
                      <span className="text-xs text-slate-500 font-medium">Pemasukan</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full bg-[#CC5A37]" />
                      <span className="text-xs text-slate-500 font-medium">Pengeluaran</span>
                    </div>
                  </div>
                </div>

                {/* Category breakdown */}
                <div className="md:col-span-2 bg-slate-50/50 border border-slate-100 rounded-2xl p-6">
                  <div className="mb-6">
                    <p className="font-serif font-bold text-slate-800 text-sm">Distribusi Kategori</p>
                    <p className="text-[10px] text-slate-400 font-medium">Alokasi belanja terbesar</p>
                  </div>
                  <div className="space-y-4">
                    {categories.map((cat, i) => (
                      <motion.div
                        key={cat.name}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex items-center gap-3.5"
                      >
                        <div className={`w-9 h-9 ${cat.color} bg-opacity-10 rounded-xl flex items-center justify-center`}>
                          <cat.icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-slate-700 font-bold">{cat.name}</span>
                            <span className="text-slate-500 font-semibold">{cat.percent}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${cat.percent}%` }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
                              className={`h-full rounded-full ${cat.color}`}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Glow effect behind */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-orange-100/30 to-orange-50/20 blur-3xl scale-110 translate-y-8 animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
