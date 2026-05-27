'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Upload, Loader2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeInUp } from '@/lib/animations';

export default function OnboardingPage() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [reasonUsing, setReasonUsing] = useState('');
  
  // File upload state
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Username validation state
  const [isUsernameChecking, setIsUsernameChecking] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'available' | 'taken' | 'invalid'>('idle');
  const [usernameMessage, setUsernameMessage] = useState('');

  // Submit states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  // Live username availability check
  useEffect(() => {
    if (!username) {
      setUsernameStatus('idle');
      setUsernameMessage('');
      return;
    }

    if (!/^[a-z0-9_]{3,30}$/.test(username)) {
      setUsernameStatus('invalid');
      setUsernameMessage('Username harus 3-30 karakter, huruf kecil, angka, atau underscore.');
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsUsernameChecking(true);
      try {
        const response = await fetch(`${backendUrl}/onboarding/check-username`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        });
        const result = await response.json();
        
        if (result.success && result.data.available) {
          setUsernameStatus('available');
          setUsernameMessage('Username tersedia!');
        } else {
          setUsernameStatus('taken');
          setUsernameMessage('Username sudah digunakan pengguna lain.');
        }
      } catch (err) {
        setUsernameStatus('idle');
        setUsernameMessage('');
      } finally {
        setIsUsernameChecking(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [username, backendUrl]);

  // Handle avatar file selection
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Ukuran file maksimal adalah 5MB');
      return;
    }

    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    setErrorMsg('');
  };

  // Submit onboarding
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName || fullName.length < 2) {
      setErrorMsg('Nama lengkap harus minimal 2 karakter.');
      return;
    }
    if (usernameStatus !== 'available') {
      setErrorMsg('Silakan gunakan username unik yang tersedia.');
      return;
    }
    if (!age || Number(age) < 13 || Number(age) > 120) {
      setErrorMsg('Umur harus di antara 13 sampai 120 tahun.');
      return;
    }
    if (!avatarFile) {
      setErrorMsg('Silakan unggah foto profil (avatar) Anda.');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('full_name', fullName);
      formData.append('username', username);
      formData.append('age', age);
      if (reasonUsing) {
        formData.append('reason_using', reasonUsing);
      }
      formData.append('avatar', avatarFile);

      // credentials: 'include' is critical to pass access_token cookie
      const res = await fetch(`${backendUrl}/onboarding/complete`, {
        method: 'PATCH',
        body: formData,
        credentials: 'include', 
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error?.message || 'Gagal menyimpan profil.');
      }

      // Success -> Redirect to dashboard
      window.location.href = `/dashboard/${username}`;
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan sistem. Silakan coba kembali.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      {/* Decorative terracotta radial gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#CC5A37] rounded-full blur-[120px] opacity-[0.08] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#E5954B] rounded-full blur-[120px] opacity-[0.06] pointer-events-none" />

      {/* Grid line background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at 50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="w-full max-w-[500px] z-10 space-y-8">
        {/* Brand Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2.5 group justify-center">
            <div className="w-10 h-10 bg-[#CC5A37] rounded-xl flex items-center justify-center shadow-lg shadow-[#CC5A37]/20">
              <Wallet className="w-5.5 h-5.5 text-white" />
            </div>
            <span className="text-2xl font-serif font-bold text-slate-900 tracking-tight">MoneyFlow</span>
          </div>
        </div>

        {/* Onboarding Form Card */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="relative bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-100/50 overflow-hidden"
        >
          {/* Card Top Terracotta Accent */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#CC5A37] to-transparent" />

          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl font-serif font-bold text-slate-900">Lengkapi Profil</h1>
            <p className="text-sm text-slate-500 font-light">Satu langkah terakhir sebelum masuk ke workspace finansial Anda.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {/* Avatar upload input with preview */}
            <div className="flex flex-col items-center gap-3">
              <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">Foto Profil (Avatar)</label>
              <div className="relative group w-24 h-24 rounded-2xl border border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:bg-slate-100/80 hover:border-[#CC5A37] transition-all">
                {avatarPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center text-slate-400 gap-1.5 p-3 text-center">
                    <Upload className="w-5 h-5 text-slate-400 group-hover:text-[#CC5A37] transition-colors" />
                    <span className="text-[9px] font-semibold">Pilih Gambar</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleAvatarChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Nama Lengkap */}
            <div className="space-y-1.5">
              <label htmlFor="fullName" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Nama Lengkap</label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="cth. Samuel Indra"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#CC5A37] focus:bg-white transition-all"
              />
            </div>

            {/* Username */}
            <div className="space-y-1.5">
              <label htmlFor="username" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Username Unik</label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                  placeholder="cth. samuel_bastian"
                  required
                  className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#CC5A37] focus:bg-white transition-all"
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center">
                  {isUsernameChecking && <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />}
                  {!isUsernameChecking && usernameStatus === 'available' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  {!isUsernameChecking && (usernameStatus === 'taken' || usernameStatus === 'invalid') && <XCircle className="w-4 h-4 text-rose-500" />}
                </div>
              </div>
              {usernameMessage && (
                <p className={`text-[11px] font-medium leading-relaxed ${
                  usernameStatus === 'available' ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {usernameMessage}
                </p>
              )}
            </div>

            {/* Umur */}
            <div className="space-y-1.5">
              <label htmlFor="age" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Umur</label>
              <input
                id="age"
                type="number"
                min="13"
                max="120"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="cth. 25"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#CC5A37] focus:bg-white transition-all"
              />
            </div>

            {/* Alasan Penggunaan */}
            <div className="space-y-1.5">
              <label htmlFor="reason" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Alasan Menggunakan MoneyFlow (Opsional)</label>
              <textarea
                id="reason"
                value={reasonUsing}
                onChange={(e) => setReasonUsing(e.target.value)}
                placeholder="cth. Ingin memantau limit jajan bulanan secara lebih disiplin."
                rows={3}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#CC5A37] focus:bg-white transition-all resize-none"
              />
            </div>

            {/* System Error Message */}
            <AnimatePresence>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-2 text-xs font-medium text-rose-700"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full py-3.5 mt-2 flex items-center justify-center gap-2 bg-[#CC5A37] hover:bg-[#b04726] border-none font-bold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Memproses Pendaftaran...
                </>
              ) : (
                'Selesaikan & Masuk ke Dashboard'
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
