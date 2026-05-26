# MoneyFlow ─ Atur Uangmu Lebih Gampang

[![CI Build](https://github.com/samuelindra123/moneyflow/actions/workflows/ci.yml/badge.svg)](https://github.com/samuelindra123/moneyflow/actions/workflows/ci.yml)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-emerald.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](https://opensource.org/licenses/MIT)

**MoneyFlow** adalah aplikasi pencatatan keuangan pribadi sederhana yang dirancang secara minimalis, estetik, dan fungsional. Proyek ini dibangun sebagai alat bantu mencatat pengeluaran, memantau pendapatan harian, membuat target tabungan, dan melihat arus kas tanpa gangguan iklan atau batasan berlangganan.

---

## 🌟 Fitur Utama

- **Dropdown Produk Navigasi:** Menu dropdown hover & klik yang interaktif untuk berpindah ke fitur utama.
- **Halaman Fitur Mandiri (`/produk/fitur`):** Penjelasan mendalam mengenai fungsionalitas pencatatan instan, alokasi budget bulanan, diagram visual keuangan, dan sinkronisasi cloud otomatis.
- **Halaman Kegunaan Mandiri (`/produk/kegunaan`):** Panduan implementasi alokasi dana dan pencatatan yang disesuaikan untuk mahasiswa, freelancer, keluarga, dan UMKM/bisnis kecil.
- **News & Update (`/news`):** Log rilis dan edukasi keuangan (segera hadir).
- **Profil Pengembang (`/about-developer`):** Informasi tentang Samuel Indra Bastian selaku pembuat dan pengembang tunggal MoneyFlow.
- **Tata Letak Responsif:** Pengalaman visual premium dan transisi animasi Framer Motion yang lancar di layar desktop, tablet, maupun mobile drawer.
- **Footer Sederhana:** Tata letak minimalis yang ramah proyek personal dengan tautan GitHub, Twitter, dan email personal.

---

## 🛠️ Tech Stack

- **Core Framework:** Next.js 16 (App Router)
- **Programming Language:** TypeScript
- **Styling Engine:** Tailwind CSS v4
- **Animation Library:** Framer Motion
- **Icons Pack:** Lucide React (dengan kustomisasi brand SVG inline)

---

## 📂 Folder Struktur Monorepo

```bash
root/
├── apps/
│   └── client/               # Aplikasi web utama Next.js
│       ├── src/
│       │   ├── app/          # Rute halaman (App Router)
│       │   ├── components/   # Komponen UI & Sections
│       │   ├── lib/          # Animasi & konstanta
│       │   └── ...
│       ├── package.json
│       └── ...
├── docs/                     # Dokumentasi pengembangan
└── README.md                 # Dokumentasi repositori utama
```

---

## 🚀 Cara Menjalankan Secara Lokal

### Prasyarat
Pastikan Anda sudah menginstal **Node.js v20** atau versi di atasnya.

### 1. Kloning Repositori
```bash
git clone https://github.com/samuelindra123/moneyflow.git
cd moneyflow
```

### 2. Instal Dependensi
Masuk ke direktori aplikasi web client dan jalankan instalasi:
```bash
cd apps/client
npm install
```

### 3. Jalankan Server Dev
Jalankan server pengembangan lokal di port 3000:
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

### 4. Build Produksi
Verifikasi kompilasi build produksi Next.js:
```bash
npm run build
```

---

## 📝 Kontribusi & Lisensi

Proyek ini dirilis di bawah **Lisensi MIT**. Dibuat dengan penuh ❤️ oleh **Samuel Indra Bastian** di Batam, Indonesia.