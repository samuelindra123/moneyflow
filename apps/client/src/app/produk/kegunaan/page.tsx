'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, GraduationCap, Briefcase, Users, Store, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

const useCases = [
  {
    title: 'Mahasiswa & Pelajar',
    subtitle: 'Atur jajan kos & belajar nabung mandiri',
    description: 'Bantu latih kedisiplinan keuangan sejak dini. Catat uang saku bulanan, alokasi uang kos, bayar buku kuliah, dan tabung sisa uang saku untuk beli gadget impian.',
    icon: GraduationCap,
    color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    benefits: ['Catat pengeluaran kos harian', 'Simulasikan target nabung harian', 'Limit budget untuk jajan kopi'],
  },
  {
    title: 'Freelancer & Kreator Mandiri',
    subtitle: 'Kelola pendapatan yang tidak menentu',
    description: 'Pendapatan freelancer kerap naik turun secara acak. MoneyFlow membantu memantau cashflow proyek masuk, memisahkan uang pribadi, dan menjaga pengeluaran tetap stabil di bulan sepi.',
    icon: Briefcase,
    color: 'text-[#CC5A37] bg-orange-50 border-orange-100',
    benefits: ['Pantau total tagihan/invoice', 'Budgeting bulanan super ketat', 'Grafik kas masuk vs keluar bersih'],
  },
  {
    title: 'Keluarga & Pasangan Muda',
    subtitle: 'Kelola budget rumah tangga bersama',
    description: 'Kelola keuangan keluarga dengan lebih terbuka. Pasang batas anggaran belanja dapur, tagihan listrik, biaya sekolah anak, dan alokasikan tabungan bersama untuk liburan atau DP rumah.',
    icon: Users,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    benefits: ['Atur budget belanja bulanan', 'Batas pengeluaran darurat keluarga', 'Progress nabung bersama keluarga'],
  },
  {
    title: 'Bisnis Kecil & UMKM',
    subtitle: 'Pencatatan kas kecil operasional praktis',
    description: 'Gak perlu buka software akuntansi super rumit hanya untuk catat pengeluaran harian kedai kopi atau tokomu. MoneyFlow mempermudah pencatatan kas operasional harian yang cepat.',
    icon: Store,
    color: 'text-amber-600 bg-amber-50 border-amber-100',
    benefits: ['Pencatatan kas masuk & keluar instan', 'Kelompokkan operasional vs modal', 'Export laporan CSV/PDF instan'],
  },
];

export default function KegunaanPage() {
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
              <HeartHandshake className="w-3.5 h-3.5" />
              Solusi Finansial
            </motion.div>
            
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-slate-900 tracking-tight leading-tight"
            >
              Satu aplikasi untuk{' '}
              <span className="font-serif italic font-medium text-[#CC5A37]">
                berbagai kebutuhanmu
              </span>
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="text-lg text-slate-500 font-light leading-relaxed"
            >
              MoneyFlow dirancang fleksibel agar bisa menyesuaikan alur pencatatan keuanganmu, apa pun status profesi dan kebutuhan finansialmu saat ini.
            </motion.p>
          </div>

          {/* Use Cases Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {useCases.map((useCase, i) => {
              const Icon = useCase.icon;
              return (
                <motion.div
                  key={useCase.title}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.15}
                  className="bg-white border border-slate-100 p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-slate-200/30 transition-all duration-300 flex flex-col justify-between text-left"
                >
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border flex-shrink-0 ${useCase.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif font-bold text-slate-900 leading-none">
                          {useCase.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 font-semibold">{useCase.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-slate-500 text-sm leading-relaxed font-light">
                      {useCase.description}
                    </p>

                    {/* Benefit checklist */}
                    <ul className="space-y-2.5 pt-2 border-t border-slate-100">
                      {useCase.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4">
                    <a 
                      href="#cara-kerja" 
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#CC5A37] hover:text-[#b04726] transition-colors"
                    >
                      Mulai catat ala {useCase.title.split(' ')[0]}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-900 rounded-3xl p-8 md:p-16 text-center text-white mt-20 relative overflow-hidden shadow-xl"
          >
            {/* Background glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h3 className="text-3xl md:text-4xl font-serif font-light leading-tight">
                Mulai atur keuanganmu demi masa depan yang lebih baik
              </h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Ribuan orang sudah mulai membiasakan pencatatan keuangan yang terarah dan jujur. Ambil langkah pertamamu sekarang juga, gratis selamanya.
              </p>
              <div className="pt-4">
                <Button variant="primary" size="lg" className="bg-[#CC5A37] hover:bg-[#b04726] border-none font-medium px-8 py-4 shadow-orange-500/10">
                  Buat Akun Gratis
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
