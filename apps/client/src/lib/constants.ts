export const NAV_LINKS = [
  { label: 'Fitur', href: '#fitur' },
  { label: 'Cara Kerja', href: '#cara-kerja' },
  { label: 'Testimoni', href: '#testimoni' },
  { label: 'FAQ', href: '#faq' },
] as const;

export const FEATURES = [
  {
    title: 'Catat Pengeluaran',
    description: 'Catat setiap pengeluaran dengan cepat dan gampang. Gak perlu buka spreadsheet lagi.',
    icon: 'receipt' as const,
  },
  {
    title: 'Catat Pemasukan',
    description: 'Semua pemasukan tercatat rapi. Gaji, freelance, atau uang sampingan — semua masuk.',
    icon: 'wallet' as const,
  },
  {
    title: 'Target Nabung',
    description: 'Mau nabung buat liburan atau gadget baru? Bikin target dan pantau progressnya.',
    icon: 'target' as const,
  },
  {
    title: 'Statistik Keuangan',
    description: 'Lihat ke mana uangmu pergi lewat grafik yang gampang dipahami.',
    icon: 'chart' as const,
  },
  {
    title: 'Budget Bulanan',
    description: 'Atur batas pengeluaran per kategori biar gak kebablasan tiap bulan.',
    icon: 'calculator' as const,
  },
  {
    title: 'Sinkronisasi Cloud',
    description: 'Data keuanganmu aman di cloud. Akses dari mana aja, kapan aja.',
    icon: 'cloud' as const,
  },
] as const;

export const TESTIMONIALS = [
  {
    name: 'Rina Kumalasari',
    role: 'Freelance Designer',
    content: 'Akhirnya nemu aplikasi yang beneran gampang dipake. Dulu selalu males catat pengeluaran, sekarang jadi kebiasaan.',
    avatar: 'RK',
    rating: 5,
  },
  {
    name: 'Andi Pratama',
    role: 'Software Engineer',
    content: 'MoneyFlow bikin aku sadar selama ini banyak banget pengeluaran yang gak perlu. Sekarang bisa nabung lebih banyak.',
    avatar: 'AP',
    rating: 5,
  },
  {
    name: 'Maya Sari',
    role: 'Content Creator',
    content: 'Interface-nya clean banget dan gak ribet. Fitur target nabungnya bikin aku semangat buat nabung.',
    avatar: 'MS',
    rating: 5,
  },
  {
    name: 'Budi Setiawan',
    role: 'Marketing Manager',
    content: 'Budget bulanan di MoneyFlow ngebantu banget buat kontrol pengeluaran keluarga. Recommended buat yang baru mulai atur keuangan!',
    avatar: 'BS',
    rating: 5,
  },
] as const;

export const PRICING_PLANS = [
  {
    name: 'Free',
    price: 'Gratis',
    period: 'selamanya',
    description: 'Buat kamu yang baru mulai atur keuangan',
    features: [
      'Catat pengeluaran & pemasukan',
      'Statistik dasar',
      '1 target nabung',
      'Budget bulanan',
      'Akses dari 1 device',
    ],
    cta: 'Mulai Gratis',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 'Rp 49.000',
    period: '/bulan',
    description: 'Buat kamu yang serius mau kontrol keuangan',
    features: [
      'Semua fitur Free',
      'Statistik lengkap & insights',
      'Unlimited target nabung',
      'Multi budget kategori',
      'Sinkronisasi cloud',
      'Export laporan PDF/CSV',
      'Akses dari semua device',
    ],
    cta: 'Langganan Pro',
    highlighted: true,
  },
  {
    name: 'Business',
    price: 'Rp 149.000',
    period: '/bulan',
    description: 'Buat tim atau keluarga yang mau atur keuangan bareng',
    features: [
      'Semua fitur Pro',
      'Sampai 5 anggota tim',
      'Dashboard bersama',
      'Role & permission',
      'Laporan tim lengkap',
      'Priority support',
      'API access',
    ],
    cta: 'Hubungi Kami',
    highlighted: false,
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: 'MoneyFlow itu gratis?',
    answer: 'Yap! Kamu bisa pakai MoneyFlow secara gratis. Fitur dasarnya udah cukup buat mulai atur keuanganmu. Kalau butuh fitur lebih lengkap, bisa upgrade ke Pro kapan aja.',
  },
  {
    question: 'Data keuangan aku aman gak?',
    answer: 'Tenang aja, data kamu dienkripsi dan disimpan di server yang aman. Kami pakai standar keamanan yang sama kayak bank dan fintech besar. Gak ada yang bisa akses datamu selain kamu sendiri.',
  },
  {
    question: 'Bisa dipakai di HP dan laptop?',
    answer: 'Bisa banget! MoneyFlow bisa diakses dari browser di HP, tablet, atau laptop. Datamu otomatis sinkron di semua device kalau pakai plan Pro.',
  },
  {
    question: 'Gimana cara mulai?',
    answer: 'Gampang banget. Tinggal bikin akun gratis, terus langsung bisa mulai catat pemasukan dan pengeluaran. Gak perlu setup ribet.',
  },
  {
    question: 'Bisa export data gak?',
    answer: 'Bisa! Pengguna Pro bisa export data keuangan ke format PDF atau CSV. Cocok buat kamu yang butuh laporan keuangan bulanan.',
  },
  {
    question: 'Ada customer support?',
    answer: 'Ada! Tim support kami siap bantu lewat email dan chat. Pengguna Business juga dapet priority support biar masalah cepet kelar.',
  },
] as const;
