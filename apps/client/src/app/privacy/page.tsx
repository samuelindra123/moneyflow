'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { Shield, Lock, Eye, Server, RefreshCw } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

export default function PrivacyPage() {
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
              <Shield className="w-3.5 h-3.5" />
              Kebijakan Privasi
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight"
            >
              Kebijakan Privasi{' '}
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

          {/* Policy Body */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="prose prose-slate max-w-none space-y-8 font-light text-slate-600 leading-relaxed text-sm sm:text-base"
          >
            <p>
              Selamat datang di <strong>MoneyFlow</strong>. Kami sangat menghargai kepercayaan Anda dan berkomitmen untuk melindungi informasi pribadi Anda. Halaman ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda saat Anda menggunakan aplikasi MoneyFlow.
            </p>

            <hr className="border-slate-100" />

            {/* Section 1 */}
            <div className="space-y-3">
              <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2.5">
                <span className="text-[#CC5A37]">1.</span> Pengumpulan Informasi
              </h3>
              <p>
                Kami hanya mengumpulkan informasi yang sangat minimal dan benar-benar dibutuhkan agar aplikasi dapat berfungsi secara optimal:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 mt-2">
                <li>
                  <strong>Informasi Akun Google:</strong> Saat masuk dengan Google, kami menerima informasi dasar seperti nama, alamat email, dan foto profil Anda. Kami tidak pernah meminta kata sandi akun Google Anda.
                </li>
                <li>
                  <strong>Data Transaksi Keuangan:</strong> Semua catatan pengeluaran, pemasukan, kategori, limit anggaran, dan target tabungan yang Anda masukkan secara manual ke dalam aplikasi.
                </li>
                <li>
                  <strong>Data Penggunaan Teknis:</strong> Informasi browser, jenis perangkat, dan analitik performa dasar demi kenyamanan debugging aplikasi.
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2.5">
                <span className="text-[#CC5A37]">2.</span> Penggunaan Informasi
              </h3>
              <p>
                Informasi yang dikumpulkan digunakan semata-mata untuk kepentingan operasional Anda:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 mt-2">
                <li>Sinkronisasi data antar perangkat Anda yang terhubung dengan akun Google yang sama.</li>
                <li>Menghitung, memproses, dan menampilkan statistik serta visualisasi grafik pengeluaran Anda.</li>
                <li>Mengirimkan notifikasi performa anggaran atau pengingat penting jika Anda mengaktifkannya.</li>
              </ul>
              <p className="bg-orange-50/50 border border-orange-100/60 rounded-2xl p-4 text-xs font-medium text-slate-700 mt-3">
                <strong className="text-[#CC5A37]">Penting:</strong> Kami tidak pernah dan tidak akan pernah menjual, menyewakan, atau membagikan data keuangan pribadi Anda kepada pihak ketiga atau platform periklanan manapun.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2.5">
                <span className="text-[#CC5A37]">3.</span> Keamanan Data & Enkripsi
              </h3>
              <p>
                Keamanan adalah prioritas utama kami. Kami menerapkan langkah-langkah keamanan berstandar tinggi:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 mt-2">
                <li>Semua transmisi data antara browser Anda dan server kami dienkripsi menggunakan protokol HTTPS/SSL.</li>
                <li>Data disimpan pada database cloud aman dengan proteksi firewall ketat untuk mencegah akses tanpa izin.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2.5">
                <span className="text-[#CC5A37]">4.</span> Hak Kepemilikan Data Anda
              </h3>
              <p>
                Anda adalah pemilik mutlak dari seluruh data keuangan yang Anda catat di MoneyFlow:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 mt-2">
                <li>
                  <strong>Penghapusan Akun:</strong> Anda berhak menghapus akun Anda beserta seluruh data riwayat transaksi secara permanen kapan saja melalui menu pengaturan di dalam aplikasi. Data yang telah dihapus tidak dapat dipulihkan kembali.
                </li>
                <li>
                  <strong>Ekspor Data:</strong> Anda dapat mengekspor seluruh catatan transaksi Anda kapan saja ke format Excel/CSV untuk keperluan pribadi Anda.
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="space-y-3">
              <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2.5">
                <span className="text-[#CC5A37]">5.</span> Perubahan Kebijakan Privasi
              </h3>
              <p>
                Kebijakan Privasi ini dapat diperbarui dari waktu ke waktu untuk menyesuaikan perubahan fitur aplikasi. Perubahan signifikan akan diinformasikan melalui notifikasi di dalam aplikasi atau melalui update tanggal pembaruan di halaman ini.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-3">
              <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2.5">
                <span className="text-[#CC5A37]">6.</span> Kontak & Layanan Pelanggan
              </h3>
              <p>
                Jika Anda memiliki pertanyaan, saran, atau kekhawatiran terkait kebijakan privasi kami, jangan ragu untuk menghubungi pengembang secara langsung melalui email:{' '}
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
