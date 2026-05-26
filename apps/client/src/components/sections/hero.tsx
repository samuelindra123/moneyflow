'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play, TrendingUp, Wallet, Target, ShoppingCart, Coffee, Zap, DollarSign, LayoutDashboard, Calendar, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeInUp, slideInRight, floatAnimation, floatAnimationSlow } from '@/lib/animations';

const transactions = [
  { name: 'Belanja Groceries', amount: -245000, icon: ShoppingCart, color: 'text-orange-500', bg: 'bg-orange-50' },
  { name: 'Kopi Susu Senja', amount: -35000, icon: Coffee, color: 'text-amber-600', bg: 'bg-amber-50' },
  { name: 'Gaji Bulanan', amount: 8500000, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 md:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-50 via-cyan-50/50 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-50 to-transparent rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(148,163,184,0.08) 1px, transparent 0)', backgroundSize: '48px 48px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-[#4F46E5] bg-indigo-50 border border-indigo-100 rounded-full">
                <span className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full animate-pulse" />
                Gratis Selamanya
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="text-5xl sm:text-6xl lg:text-[76px] xl:text-[84px] font-serif font-light text-slate-900 tracking-tight leading-[1.05] lg:leading-[1.0]"
            >
              Ngatur uang{' '}
              <span className="font-serif italic font-medium text-[#CC5A37]">
                gak harus ribet
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="text-lg sm:text-xl text-slate-500 font-light leading-relaxed max-w-lg"
            >
              Catat pemasukan, pantau pengeluaran, bikin target nabung, dan lihat kondisi keuanganmu dalam satu tempat yang super bersih dan rapi.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Button variant="primary" size="lg" className="px-8 py-4 font-medium">
                Mulai Gratis
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 font-medium">
                <Play className="w-5 h-5" />
                Lihat Demo
              </Button>
            </motion.div>
            {/* Early-stage launch spacing */}
          </div>

          {/* Right — Dashboard Preview */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="lg:col-span-7 relative w-full"
          >
            {/* Browser Mockup */}
            <div className="w-full bg-white rounded-3xl border border-slate-200/80 shadow-2xl shadow-slate-200/40 overflow-hidden relative z-10">
              {/* Window Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 block" />
                </div>
                <div className="flex items-center justify-center bg-slate-200/60 px-6 py-1 rounded-md text-[10px] text-slate-500 font-mono w-44">
                  app.moneyflow.com
                </div>
                <div className="w-12" /> {/* Spacer to align */}
              </div>

              {/* Window Body (SaaS Mockup) */}
              <div className="flex min-h-[380px] bg-slate-50/50">
                {/* Mock Sidebar */}
                <div className="hidden sm:flex flex-col w-44 bg-slate-900 text-slate-400 p-4 border-r border-slate-800 gap-6 text-[11px] justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-white font-bold px-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] rounded-lg flex items-center justify-center">
                        <Wallet className="w-3 h-3 text-white" />
                      </div>
                      MoneyFlow
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5 text-white bg-slate-800 px-3 py-2 rounded-xl font-semibold">
                        <LayoutDashboard className="w-3.5 h-3.5 text-indigo-400" />
                        Dashboard
                      </div>
                      <div className="flex items-center gap-2.5 px-3 py-2 hover:text-slate-200 hover:bg-slate-800/40 rounded-xl transition-all cursor-pointer">
                        <TrendingUp className="w-3.5 h-3.5" />
                        Transaksi
                      </div>
                      <div className="flex items-center gap-2.5 px-3 py-2 hover:text-slate-200 hover:bg-slate-800/40 rounded-xl transition-all cursor-pointer">
                        <Target className="w-3.5 h-3.5" />
                        Target Nabung
                      </div>
                      <div className="flex items-center gap-2.5 px-3 py-2 hover:text-slate-200 hover:bg-slate-800/40 rounded-xl transition-all cursor-pointer">
                        <Calendar className="w-3.5 h-3.5" />
                        Budget
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 px-3 py-2 hover:text-slate-200 transition-all cursor-pointer border-t border-slate-800 pt-3">
                    <Settings className="w-3.5 h-3.5" />
                    Pengaturan
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-white p-6 md:p-8 flex flex-col gap-5">
                  {/* Greeting & Quick Action */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h4 className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Overview</h4>
                      <h3 className="text-sm font-bold text-slate-800">Hi, Samuel 👋</h3>
                    </div>
                    <div className="text-[10px] px-2.5 py-1 bg-emerald-50/80 text-emerald-600 rounded-full font-bold">
                      Pro Member
                    </div>
                  </div>

                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4 shadow-sm">
                      <span className="text-[10px] text-slate-400 font-semibold block mb-1">Saldo Total</span>
                      <span className="text-lg font-bold text-slate-900 block">Rp 12.450.000</span>
                      <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1">
                        <TrendingUp className="w-3 h-3" /> +12.5% bulan ini
                      </span>
                    </div>
                    <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4 shadow-sm">
                      <span className="text-[10px] text-slate-400 font-semibold block mb-1">Pengeluaran</span>
                      <span className="text-lg font-bold text-slate-900 block">Rp 3.200.000</span>
                      <span className="text-[9px] text-indigo-600 font-bold flex items-center gap-0.5 mt-1">
                        <Target className="w-3 h-3" /> 75% dari budget
                      </span>
                    </div>
                  </div>

                  {/* Animated Mini Chart inside Hero Mockup */}
                  <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Arus Kas (7 Hari Terakhir)</span>
                      <span className="text-[9px] text-emerald-600 font-bold">+15.4%</span>
                    </div>
                    <div className="flex items-end gap-2.5 h-16 pt-2">
                      {[30, 45, 25, 60, 40, 75, 55].map((h, i) => (
                        <div key={i} className="flex-1 bg-indigo-50 rounded-md transition-all h-full relative overflow-hidden">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ delay: 0.6 + i * 0.05, duration: 0.8 }}
                            className={`absolute bottom-0 left-0 right-0 rounded-md ${
                              i === 5 ? 'bg-gradient-to-t from-[#4F46E5] to-indigo-400' : 'bg-indigo-200'
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Transactions List */}
                  <div className="space-y-3 mt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Transaksi Terbaru</span>
                    </div>
                    <div className="space-y-2">
                      {transactions.slice(0, 2).map((tx, i) => (
                        <div key={i} className="flex items-center justify-between p-2 hover:bg-slate-50/80 rounded-xl transition-all border border-transparent hover:border-slate-100">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 ${tx.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                              <tx.icon className={`w-4 h-4 ${tx.color}`} />
                            </div>
                            <div>
                              <span className="text-xs font-bold text-slate-800 block leading-none mb-1">{tx.name}</span>
                              <span className="text-[9px] text-slate-400 font-medium">Hari ini</span>
                            </div>
                          </div>
                          <span className={`text-xs font-bold ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                            {tx.amount > 0 ? '+' : ''}{(tx.amount / 1000).toLocaleString('id-ID')}rb
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              animate={floatAnimation}
              className="absolute -top-4 -right-4 bg-white rounded-2xl border border-slate-100 shadow-xl p-3 flex items-center gap-2.5 z-20"
            >
              <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-[9px] text-slate-400 font-semibold">Hemat bulan ini</p>
                <p className="text-xs font-bold text-emerald-600">+Rp 2.3jt</p>
              </div>
            </motion.div>

            <motion.div
              animate={floatAnimationSlow}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl border border-slate-100 shadow-xl p-3 flex items-center gap-2.5 z-20"
            >
              <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Wallet className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-[9px] text-slate-400 font-semibold">Target tercapai!</p>
                <p className="text-xs font-bold text-indigo-600">iPhone 16 Pro</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

