'use client';

import { useEffect, useState, use } from 'react';
import { motion } from 'framer-motion';
import { Wallet, LogOut, Loader2, ArrowRight, ShieldCheck, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeInUp } from '@/lib/animations';
import Link from 'next/link';

interface DashboardUserData {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  age: number;
  reason_using: string | null;
  member_since: string;
}

export default function DashboardPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = use(params);
  const usernameParam = resolvedParams.username;

  const [userData, setUserData] = useState<DashboardUserData | null>(null);
  const [avatarError, setAvatarError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(`${backendUrl}/dashboard/${usernameParam}`, {
          method: 'GET',
          credentials: 'include', // Crucial to send access_token cookie
        });

        const result = await response.json();

        if (!response.ok) {
          // If onboarding is required or unauthorized, redirect
          if (response.status === 401) {
            window.location.href = '/auth';
            return;
          }
          if (response.status === 403) {
            window.location.href = '/onboarding';
            return;
          }
          throw new Error(result.message || 'Gagal memuat data dashboard.');
        }

        setUserData(result.data);
      } catch (err: unknown) {
        setErrorMsg(err instanceof Error ? err.message : 'Gagal memuat data dashboard.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, [usernameParam, backendUrl]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch(`${backendUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout request failed', err);
    } finally {
      // Always redirect to landing page
      window.location.href = '/';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-[#CC5A37] animate-spin" />
        <p className="text-sm font-semibold text-slate-500">Memuat workspace finansial Anda...</p>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-6 shadow-lg shadow-slate-100">
          <div className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-center text-rose-500 mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-serif font-bold text-slate-900">Gagal Memuat Workspace</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-light">{errorMsg}</p>
          </div>
          <Button href="/auth" variant="primary" className="w-full bg-[#CC5A37] hover:bg-[#b04726] border-none">
            Kembali ke Login
          </Button>
        </div>
      </div>
    );
  }

  const memberSinceDate = userData?.member_since
    ? new Date(userData.member_since).toLocaleDateString('id-ID', {
        month: 'long',
        year: 'numeric',
      })
    : '';

  const avatarFallbackInitials = (() => {
    const fullName = (userData?.full_name || userData?.username || 'MF').trim();
    const parts = fullName.split(/\s+/).filter(Boolean);
    const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase()).join('');
    return initials || 'MF';
  })();

  const avatarSrc = userData?.avatar_url || '';
  const showAvatarImage = Boolean(avatarSrc) && !avatarError;

  return (
    <>
      {/* Dashboard Top Header Nav */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-[#CC5A37] rounded-xl flex items-center justify-center shadow-lg shadow-[#CC5A37]/20">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-serif font-bold text-slate-900 tracking-tight">MoneyFlow</span>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 hover:border-rose-200 rounded-xl text-xs font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50/10 bg-white transition-all shadow-sm cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Keluar
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Workspace */}
      <main className="flex-1 bg-slate-50 pt-28 pb-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-left space-y-2 mb-8"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-100 rounded-full text-[10px] font-bold text-[#CC5A37] uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              Sesi Autentikasi Aman
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-light text-slate-900 leading-tight">
              Selamat Datang kembali, <span className="font-serif italic font-bold text-[#CC5A37]">{userData?.full_name}</span>!
            </h1>
            <p className="text-sm text-slate-500 font-light">Workspace keuangan Anda hari ini terpantau sehat dan terkontrol.</p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: User Profile Details */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col items-center text-center space-y-6"
            >
              <div className="relative group w-28 h-28 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
                {showAvatarImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatarSrc}
                    alt={userData?.full_name || userData?.username || 'Avatar pengguna'}
                    className="w-full h-full object-cover"
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#CC5A37] to-[#E5954B] text-white text-2xl font-serif font-bold tracking-tight">
                    {avatarFallbackInitials}
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-serif font-bold text-slate-900">{userData?.full_name}</h3>
                <p className="text-xs text-[#CC5A37] font-semibold font-mono">@{userData?.username}</p>
                <p className="text-xs text-slate-400 font-medium">Umur: {userData?.age} Tahun</p>
              </div>

              {userData?.reason_using && (
                <div className="w-full p-4 bg-slate-50 rounded-2xl text-left border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Catatan Target</p>
                  <p className="text-xs font-light text-slate-500 italic leading-relaxed">
                    &ldquo;{userData.reason_using}&rdquo;
                  </p>
                </div>
              )}

              <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Bergabung</span>
                <span className="text-slate-600">{memberSinceDate}</span>
              </div>
            </motion.div>

            {/* Right Column: Interactive Cashflow Mock Dashboard */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="lg:col-span-8 space-y-8"
            >
              {/* Financial Metrics Cards */}
              <div className="grid sm:grid-cols-3 gap-6">
                {/* Balance */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-left relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Total Saldo</p>
                  <h4 className="text-2xl font-serif font-bold text-slate-900">Rp 5.230.000</h4>
                  <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                    <TrendingUp className="w-3 h-3" />
                    <span>+12.4% bulan ini</span>
                  </div>
                </div>

                {/* Limit Jajan */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-left relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Limit Jajan Bulanan</p>
                  <h4 className="text-2xl font-serif font-bold text-slate-900">Rp 3.000.000</h4>
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                      <span>Terpakai 62%</span>
                      <span>Rp 1.860.000</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#CC5A37] rounded-full" style={{ width: '62%' }} />
                    </div>
                  </div>
                </div>

                {/* Target Tabungan */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-left relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50/50 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Target Tabungan</p>
                  <h4 className="text-2xl font-serif font-bold text-slate-900">Rp 15.000.000</h4>
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                      <span>Progres 40%</span>
                      <span>Rp 6.000.000</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 rounded-full" style={{ width: '40%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Transactions Mock List */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm text-left">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900">Catatan Transaksi Terakhir</h3>
                    <p className="text-xs text-slate-400 font-light">Riwayat pengeluaran yang dicatat minggu ini.</p>
                  </div>
                  <Button variant="outline" size="sm" className="font-semibold text-xs inline-flex items-center gap-1.5">
                    Lihat Semua
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>

                <div className="divide-y divide-slate-100">
                  {[
                    { label: 'Kopi & Snack Sore', cat: 'Makanan', cost: '- Rp 45.000', date: 'Hari ini', type: 'exp' },
                    { label: 'Freelance Design Project', cat: 'Pemasukan', cost: '+ Rp 1.500.000', date: 'Kemarin', type: 'inc' },
                    { label: 'Belanja Bulanan Supermarket', cat: 'Kebutuhan', cost: '- Rp 385.000', date: '25 Mei 2026', type: 'exp' },
                    { label: 'Buku Self-Improvement', cat: 'Edukasi', cost: '- Rp 98.000', date: '24 Mei 2026', type: 'exp' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                          <span className="px-2 py-0.5 bg-slate-100 rounded-full">{item.cat}</span>
                          <span>&bull;</span>
                          <span>{item.date}</span>
                        </div>
                      </div>
                      <span className={`text-sm font-bold font-mono ${item.type === 'inc' ? 'text-emerald-600' : 'text-slate-800'}`}>
                        {item.cost}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
