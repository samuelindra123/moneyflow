'use client';

import { Receipt, Wallet, Target, BarChart3, Calculator, Cloud, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

export function Features() {
  return (
    <section id="fitur" className="py-32 md:py-44 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Fitur Unggulan"
          title="Semua yang kamu butuhin, ada di sini"
          subtitle="MoneyFlow didesain khusus untuk memudahkan pencatatan keuangan harianmu dengan visual yang menawan."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-16">
          {/* Card 1: Catat Pengeluaran (Spans 2 cols) */}
          <Card className="md:col-span-2 flex flex-col justify-between overflow-hidden group min-h-[300px]" delay={0.1}>
            <div className="p-2">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center mb-5 shadow-sm shadow-rose-100">
                <Receipt className="w-6 h-6 text-rose-500" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">Catat Pengeluaran Instan</h3>
              <p className="text-slate-500 leading-relaxed text-sm max-w-md mb-6">
                Catat pengeluaran harianmu dalam hitungan detik. Kelompokkan berdasarkan kategori biar analisis pengeluaranmu lebih akurat.
              </p>
            </div>
            
            {/* Interactive Mockup */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mt-auto transform group-hover:translate-y-1 transition-transform duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Form Pengeluaran</span>
                <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white border border-slate-200/80 rounded-xl px-3 py-2 text-xs text-slate-700 font-semibold flex items-center">
                  Sepatu Baru 👟
                </div>
                <div className="bg-white border border-slate-200/80 rounded-xl px-3 py-2 text-xs text-slate-700 font-semibold flex items-center">
                  Rp 850.000
                </div>
                <div className="bg-rose-500 text-white rounded-xl px-3 py-2 text-xs font-bold text-center flex items-center justify-center cursor-pointer shadow-sm shadow-rose-500/20">
                  Simpan
                </div>
              </div>
            </div>
          </Card>

          {/* Card 2: Target Nabung (Spans 1 col) */}
          <Card className="flex flex-col justify-between overflow-hidden group min-h-[300px]" delay={0.2}>
            <div className="p-2">
              <div className="w-12 h-12 bg-indigo-50/50 rounded-2xl flex items-center justify-center mb-5 shadow-sm shadow-indigo-100/50">
                <Target className="w-6 h-6 text-[#CC5A37]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">Target Nabung</h3>
              <p className="text-slate-500 leading-relaxed text-sm mb-6">
                Punya mimpi beli gadget atau liburan? Buat target nabungmu dan pantau progresnya secara berkala.
              </p>
            </div>

            {/* Interactive Mockup */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mt-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-800">Liburan Ke Bali 🌴</span>
                <span className="text-xs font-bold text-[#CC5A37]">83%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '83%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-[#CC5A37] h-full rounded-full" 
                />
              </div>
              <div className="flex justify-between items-center mt-2 text-[10px] text-slate-400 font-medium">
                <span>Kumpul: Rp 5.0jt</span>
                <span>Target: Rp 6.0jt</span>
              </div>
            </div>
          </Card>

          {/* Card 3: Budget Bulanan (Spans 1 col) */}
          <Card className="flex flex-col justify-between overflow-hidden group min-h-[300px]" delay={0.3}>
            <div className="p-2">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-5 shadow-sm shadow-amber-100">
                <Calculator className="w-6 h-6 text-[#E5954B]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">Limit Budget Bulanan</h3>
              <p className="text-slate-500 leading-relaxed text-sm mb-6">
                Kontrol hasrat belanja dengan memasang batas pengeluaran per kategori. Gak ada lagi cerita boncos di akhir bulan.
              </p>
            </div>

            {/* Interactive Mockup */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mt-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-800">Budget Kopi & Jajan ☕</span>
                <span className="text-xs text-[#E5954B] font-bold">Hampir Habis</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '90%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="bg-[#E5954B] h-full rounded-full" 
                />
              </div>
              <div className="flex justify-between items-center mt-2 text-[10px] text-slate-400 font-medium">
                <span>Terpakai: Rp 450rb</span>
                <span>Limit: Rp 500rb</span>
              </div>
            </div>
          </Card>

          {/* Card 4: Statistik Keuangan (Spans 2 cols) */}
          <Card className="md:col-span-2 flex flex-col justify-between overflow-hidden group min-h-[300px]" delay={0.4}>
            <div className="p-2">
              <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center mb-5 shadow-sm shadow-cyan-100">
                <BarChart3 className="w-6 h-6 text-cyan-500" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">Statistik Detail & Grafik Cantik</h3>
              <p className="text-slate-500 leading-relaxed text-sm max-w-md mb-6">
                Lihat visualisasi aliran uangmu secara instan. Grafik interaktif mempermudah kamu mendeteksi pengeluaran terbesar.
              </p>
            </div>

            {/* Interactive Mockup */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mt-auto">
              <div className="flex items-end justify-between h-20 gap-2">
                {[45, 60, 30, 85, 55, 90, 70].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.5 + i * 0.05 }}
                      className={`w-full rounded-t-lg ${i === 5 ? 'bg-[#CC5A37]' : 'bg-orange-100/70 group-hover:bg-orange-200/50'} transition-colors`}
                    />
                    <span className="text-[9px] text-slate-400 font-semibold">{['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Card 5: Catat Pemasukan (Spans 2 cols) */}
          <Card className="md:col-span-2 flex flex-col justify-between overflow-hidden group min-h-[300px]" delay={0.5}>
            <div className="p-2">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-5 shadow-sm shadow-emerald-100">
                <Wallet className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">Catat Pemasukan Terpadu</h3>
              <p className="text-slate-500 leading-relaxed text-sm max-w-md mb-6">
                Gaji bulanan, penghasilan sampingan, atau investasi — semua tercatat dengan detail rapi dan aman.
              </p>
            </div>

            {/* Interactive Mockup */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mt-auto">
              <div className="flex items-center justify-between p-2.5 bg-white border border-slate-100 rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-[#2C5E43]" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-700 block">Pembayaran Invoice Freelance</span>
                    <span className="text-[9px] text-slate-400">Project Website</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#2C5E43]">+Rp 4.500.000</span>
              </div>
            </div>
          </Card>

          {/* Card 6: Sinkronisasi Cloud (Spans 1 col) */}
          <Card className="flex flex-col justify-between overflow-hidden group min-h-[300px]" delay={0.6}>
            <div className="p-2">
              <div className="w-12 h-12 bg-violet-50 rounded-2xl flex items-center justify-center mb-5 shadow-sm shadow-violet-100">
                <Cloud className="w-6 h-6 text-violet-500" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">Aman di Cloud</h3>
              <p className="text-slate-500 leading-relaxed text-sm mb-6">
                Data keuangan terenkripsi aman di cloud. Akses data kapan saja dari HP, tablet, maupun laptop.
              </p>
            </div>

            {/* Interactive Mockup */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mt-auto flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-600">Sinkronisasi Berhasil</span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

