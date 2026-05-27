'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { BookOpen } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

export default function TermsPage() {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white pt-32 pb-24 md:pt-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          {/* Header Section */}
          <div className="space-y-4 mb-12">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-100 rounded-full text-xs font-bold text-[#CC5A37]"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Ketentuan Layanan
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight"
            >
              Syarat & Ketentuan{' '}
              <span className="font-serif italic font-medium text-[#CC5A37]">
                MoneyFlow
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="text-xs text-slate-400 font-medium"
            >
              Terakhir diperbarui: {currentDate}
            </motion.p>
          </div>

          {/* Terms Body */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="prose prose-slate max-w-none space-y-8 font-light text-slate-600 leading-relaxed text-sm sm:text-base"
          >
            <p>
              Dengan mengakses dan menggunakan aplikasi <strong>MoneyFlow</strong>, Anda secara sadar menyetujui untuk terikat oleh Syarat dan Ketentuan berikut. Jika Anda tidak menyetujui salah satu bagian dari ketentuan ini, Anda disarankan untuk tidak menggunakan layanan kami.
            </p>

            <hr className="border-slate-100" />

            {/* Section 1 */}
            <div className="space-y-3">
              <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2.5">
                <span className="text-[#CC5A37]">1.</span> Penerimaan Syarat
              </h3>
              <p>
                Layanan MoneyFlow disediakan untuk penggunaan personal secara sukarela. Layanan ini mencakup pencatatan transaksi keuangan, analisis grafik, pembuatan target menabung, dan sinkronisasi cloud melalui akun Google Anda.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2.5">
                <span className="text-[#CC5A37]">2.</span> Pendaftaran & Autentikasi Akun
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 mt-2">
                <li>Untuk menggunakan fitur sinkronisasi cloud, Anda harus melakukan autentikasi menggunakan Akun Google Anda sendiri yang sah.</li>
                <li>Anda bertanggung jawab penuh untuk menjaga kerahasiaan dan keamanan akses ke Akun Google Anda.</li>
                <li>Kami tidak bertanggung jawab atas segala kerugian atau penyalahgunaan data yang disebabkan oleh kelalaian Anda dalam menjaga keamanan Akun Google Anda.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2.5">
                <span className="text-[#CC5A37]">3.</span> Kebijakan Penggunaan Layanan
              </h3>
              <p>
                Anda setuju untuk menggunakan MoneyFlow sesuai dengan hukum yang berlaku di Republik Indonesia serta tidak menyalahgunakan layanan untuk:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 mt-2">
                <li>Melakukan aktivitas ilegal, manipulatif, atau membahayakan integritas sistem kami.</li>
                <li>Mencoba menembus keamanan database, merusak fungsionalitas aplikasi, atau melakukan reverse-engineering.</li>
                <li>Menggunakan bot atau skrip otomatis untuk membanjiri request server kami (spamming).</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2.5">
                <span className="text-[#CC5A37]">4.</span> Batasan Tanggung Jawab (Disclaimer)
              </h3>
              <p className="bg-orange-50/50 border border-orange-100/60 rounded-2xl p-4 text-xs font-medium text-slate-700">
                <strong className="text-[#CC5A37]">Pemberitahuan Penting:</strong> MoneyFlow adalah alat bantu pencatatan keuangan personal yang dikembangkan secara independen. MoneyFlow bukan merupakan penasihat keuangan berlisensi, konsultan investasi, atau lembaga perbankan resmi.
              </p>
              <p>
                Seluruh perhitungan grafik, ringkasan pengeluaran, dan visualisasi data didasarkan sepenuhnya pada data yang Anda input secara manual. Kami tidak memberikan jaminan mutlak atas kebebasan dari bug atau gangguan teknis kecil, dan kami tidak bertanggung jawab atas keputusan finansial pribadi yang Anda ambil selama atau setelah menggunakan aplikasi ini.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-3">
              <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2.5">
                <span className="text-[#CC5A37]">5.</span> Pembatalan & Penghapusan Akun
              </h3>
              <p>
                Anda dapat berhenti menggunakan layanan kami kapan saja. Anda dapat menghapus data Anda secara langsung di dashboard akun Anda. Kami juga berhak membatasi atau menangguhkan akses Anda ke MoneyFlow jika Anda terbukti melanggar ketentuan penggunaan layanan yang merugikan pengguna lain atau integritas server kami.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-3">
              <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2.5">
                <span className="text-[#CC5A37]">6.</span> Modifikasi Syarat
              </h3>
              <p>
                Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Apabila terjadi pembaruan, kami akan mengubah tanggal &apos;Terakhir diperbarui&apos; di bagian atas halaman ini. Dengan tetap menggunakan MoneyFlow setelah tanggal perubahan tersebut, Anda menyetujui syarat-syarat baru yang ditetapkan.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-3">
              <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2.5">
                <span className="text-[#CC5A37]">7.</span> Kontak Layanan Ketentuan
              </h3>
              <p>
                Apabila ada bagian dari dokumen ini yang kurang jelas atau ingin ditanyakan lebih lanjut, silakan hubungi kami di:{' '}
                <a href="mailto:samuel@moneyflow.com" className="text-[#CC5A37] hover:underline font-bold">
                  samuel@moneyflow.com
                </a>
                .
              </p>
            </div>

          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
