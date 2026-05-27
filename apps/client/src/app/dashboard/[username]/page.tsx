'use client';

import { useEffect, useState, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Trash2, 
  AlertCircle, 
  Loader2, 
  Target, 
  PiggyBank, 
  PlusCircle, 
  ArrowRight,
  ArrowLeftRight,
  Info,
  CheckCircle2,
  Calendar,
  X,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeInUp } from '@/lib/animations';
import { getBackendUrl } from '@/lib/api';

interface DashboardUserData {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  age: number;
  reason_using: string | null;
  member_since: string;
}

interface TransactionData {
  id: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  description: string | null;
  date: string;
}

interface SavingTargetData {
  id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  deadline: string | null;
}

interface DashboardData {
  user: DashboardUserData;
  stats: {
    total_balance: number;
    total_income: number;
    total_expense: number;
    monthly_expense_limit: number;
    monthly_expenses: number;
  };
  savings: SavingTargetData[];
  transactions: TransactionData[];
}

export default function DashboardPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = use(params);
  const usernameParam = resolvedParams.username;

  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Modals visibility state
  const [showTxModal, setShowTxModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showSavingsModal, setShowSavingsModal] = useState(false);

  // Form states
  const [txForm, setTxForm] = useState({
    amount: '',
    type: 'EXPENSE' as 'INCOME' | 'EXPENSE',
    category: 'Makanan',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [budgetForm, setBudgetForm] = useState({
    limit_amount: ''
  });

  const [savingsForm, setSavingsForm] = useState({
    name: '',
    target_amount: '',
    current_amount: '0',
    deadline: ''
  });

  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState('');

  const backendUrl = getBackendUrl();

  const fetchDashboard = async () => {
    try {
      const response = await fetch(`${backendUrl}/dashboard/${usernameParam}`, {
        method: 'GET',
        credentials: 'include',
      });

      const result = await response.json();

      if (!response.ok) {
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

      setData(result.data);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Gagal memuat data dashboard.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [usernameParam, backendUrl]);

  // Form handlers
  const handleTxSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setActionError('');
    try {
      const response = await fetch(`${backendUrl}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(txForm.amount),
          type: txForm.type,
          category: txForm.category,
          description: txForm.description || undefined,
          date: txForm.date ? new Date(txForm.date).toISOString() : undefined,
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Gagal menyimpan transaksi.');
      }

      // Reset form & close modal
      setTxForm({
        amount: '',
        type: 'EXPENSE',
        category: 'Makanan',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
      setShowTxModal(false);
      await fetchDashboard();
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : 'Gagal menyimpan transaksi.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleBudgetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setActionError('');
    try {
      const response = await fetch(`${backendUrl}/budgets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          limit_amount: parseFloat(budgetForm.limit_amount)
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Gagal menyimpan limit budget.');
      }

      setShowBudgetModal(false);
      await fetchDashboard();
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : 'Gagal menyimpan limit budget.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSavingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setActionError('');
    try {
      const response = await fetch(`${backendUrl}/savings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: savingsForm.name,
          target_amount: parseFloat(savingsForm.target_amount),
          current_amount: parseFloat(savingsForm.current_amount || '0'),
          deadline: savingsForm.deadline ? new Date(savingsForm.deadline).toISOString() : undefined,
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Gagal menyimpan target tabungan.');
      }

      setSavingsForm({
        name: '',
        target_amount: '',
        current_amount: '0',
        deadline: ''
      });
      setShowSavingsModal(false);
      await fetchDashboard();
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : 'Gagal menyimpan target tabungan.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteTx = async (txId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus catatan transaksi ini?')) return;
    try {
      const response = await fetch(`${backendUrl}/transactions/${txId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Gagal menghapus transaksi.');
      }
      await fetchDashboard();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Gagal menghapus transaksi.');
    }
  };

  const handleDeleteSavings = async (savingId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus target tabungan ini?')) return;
    try {
      const response = await fetch(`${backendUrl}/savings/${savingId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Gagal menghapus target tabungan.');
      }
      await fetchDashboard();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Gagal menghapus target tabungan.');
    }
  };

  // Helper formats
  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-9 h-9 text-[#CC5A37] animate-spin" />
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Menyelaraskan data finansial Anda...</p>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-xl">
          <div className="w-12 h-12 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 rounded-2xl flex items-center justify-center text-rose-500 mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white">Workspace Error</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">{errorMsg}</p>
          </div>
          <Button href="/auth" variant="primary" className="w-full">
            Kembali ke Login
          </Button>
        </div>
      </div>
    );
  }

  const stats = data?.stats || {
    total_balance: 0,
    total_income: 0,
    total_expense: 0,
    monthly_expense_limit: 0,
    monthly_expenses: 0
  };

  const transactions = data?.transactions || [];
  const savings = data?.savings || [];
  const user = data?.user;

  // Calculate percentages
  const limitPercentage = stats.monthly_expense_limit > 0 
    ? Math.min(100, Math.round((stats.monthly_expenses / stats.monthly_expense_limit) * 100))
    : 0;

  const hasExceededLimit = stats.monthly_expense_limit > 0 && stats.monthly_expenses > stats.monthly_expense_limit;

  return (
    <div className="space-y-10">
      
      {/* Top Banner Greeting */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={0}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-gradient-to-br from-orange-50/60 to-amber-50/20 dark:from-slate-900/40 dark:to-slate-800/20 border border-orange-100/60 dark:border-slate-800 rounded-3xl p-6 sm:p-8"
      >
        <div className="space-y-1.5 text-left">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#CC5A37]/10 dark:bg-[#CC5A37]/20 border border-[#CC5A37]/20 rounded-full text-[10px] font-bold text-[#CC5A37] uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            Dashboard Finansial
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-light text-slate-900 dark:text-white leading-tight">
            Kemajuan Finansial Anda, <span className="font-serif italic font-bold text-[#CC5A37]">{user?.full_name}</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-light max-w-xl">
            {user?.reason_using 
              ? `Tujuan Anda: "${user.reason_using}"` 
              : 'Pantau pemasukan, pengeluaran, target menabung, dan pastikan kondisi keuanganmu seimbang hari ini.'}
          </p>
        </div>

        <div className="flex gap-3 shrink-0">
          <Button 
            onClick={() => setShowTxModal(true)}
            variant="primary" 
            size="sm"
            className="rounded-xl flex items-center gap-1.5 text-xs py-2.5 px-4 shadow-[#CC5A37]/10"
          >
            <Plus className="w-4 h-4" />
            Catat Transaksi
          </Button>
        </div>
      </motion.div>

      {/* Metrics Row */}
      <div className="grid sm:grid-cols-3 gap-6">
        
        {/* Balance Card */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50/60 dark:bg-slate-800/40 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity" />
          <div className="flex justify-between items-start mb-3">
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Total Saldo Bersih</p>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl text-emerald-500 dark:text-emerald-400">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <h4 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white truncate">
            {formatRupiah(stats.total_balance)}
          </h4>
          <div className="mt-4 pt-3 border-t border-slate-50 dark:border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-medium">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-500">
              <TrendingUp className="w-3.5 h-3.5" /> {formatRupiah(stats.total_income)} Masuk
            </span>
            <span className="flex items-center gap-1 text-rose-600 dark:text-rose-500">
              <TrendingDown className="w-3.5 h-3.5" /> {formatRupiah(stats.total_expense)} Keluar
            </span>
          </div>
        </motion.div>

        {/* Limit Jajan Card */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50/60 dark:bg-slate-800/40 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity" />
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Limit Pengeluaran</p>
              <button 
                onClick={() => {
                  setBudgetForm({ limit_amount: stats.monthly_expense_limit > 0 ? stats.monthly_expense_limit.toString() : '' });
                  setShowBudgetModal(true);
                }}
                className="text-[9px] text-[#CC5A37] hover:underline font-bold mt-0.5 cursor-pointer block"
              >
                {stats.monthly_expense_limit > 0 ? 'Edit Batas Limit' : '+ Atur Batas Limit'}
              </button>
            </div>
            <div className={`p-2 rounded-xl ${hasExceededLimit ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-500' : 'bg-amber-50 dark:bg-amber-950/30 text-amber-500'}`}>
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>

          <h4 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white truncate">
            {stats.monthly_expense_limit > 0 ? formatRupiah(stats.monthly_expense_limit) : 'Belum Diatur'}
          </h4>

          {stats.monthly_expense_limit > 0 ? (
            <div className="mt-4.5 space-y-1">
              <div className="flex justify-between text-[9px] text-slate-400 dark:text-slate-500 font-bold">
                <span className={hasExceededLimit ? 'text-rose-600 dark:text-rose-500' : ''}>
                  Terpakai {limitPercentage}%
                </span>
                <span>{formatRupiah(stats.monthly_expenses)}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${hasExceededLimit ? 'bg-rose-500' : 'bg-[#CC5A37]'}`} 
                  style={{ width: `${limitPercentage}%` }} 
                />
              </div>
              {hasExceededLimit && (
                <p className="text-[8px] text-rose-600 dark:text-rose-500 font-bold mt-1 flex items-center gap-0.5">
                  <Info className="w-2.5 h-2.5 shrink-0" /> Pengeluaran melampaui limit!
                </p>
              )}
            </div>
          ) : (
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-light mt-4.5">
              Atur limit bulanan agar pengeluaran terkendali.
            </p>
          )}
        </motion.div>

        {/* Savings Tracker Summary Card */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50/40 dark:bg-slate-800/40 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity" />
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Target Menabung</p>
              <button 
                onClick={() => setShowSavingsModal(true)}
                className="text-[9px] text-[#CC5A37] hover:underline font-bold mt-0.5 cursor-pointer block"
              >
                + Tambah Target
              </button>
            </div>
            <div className="p-2 bg-teal-50 dark:bg-teal-950/30 rounded-xl text-teal-500 dark:text-teal-400">
              <Target className="w-4 h-4" />
            </div>
          </div>

          <h4 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white truncate">
            {savings.length > 0 ? formatRupiah(savings.reduce((acc, curr) => acc + curr.target_amount, 0)) : 'Belum Ada'}
          </h4>

          {savings.length > 0 ? (
            <div className="mt-4.5 space-y-1">
              <div className="flex justify-between text-[9px] text-slate-400 dark:text-slate-500 font-bold">
                <span>
                  {savings.length} Target Aktif
                </span>
                <span>
                  Terkumpul {Math.round((savings.reduce((acc, curr) => acc + curr.current_amount, 0) / savings.reduce((acc, curr) => acc + curr.target_amount, 0)) * 100)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-teal-500 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, Math.round((savings.reduce((acc, curr) => acc + curr.current_amount, 0) / savings.reduce((acc, curr) => acc + curr.target_amount, 0)) * 100))}%` }} 
                />
              </div>
            </div>
          ) : (
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-light mt-4.5">
              Rencanakan impian Anda dengan target tabungan.
            </p>
          )}
        </motion.div>

      </div>

      {/* Main Workspace Layout */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Layout Column: Transactions History */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="lg:col-span-7 bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm text-left space-y-6"
        >
          <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800/60 pb-5">
            <div>
              <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white">Riwayat Transaksi</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-light mt-0.5">Catatan aktivitas keuangan terakhir Anda.</p>
            </div>
            <Button 
              onClick={() => setShowTxModal(true)}
              variant="outline" 
              size="sm" 
              className="text-xs font-bold rounded-xl border-slate-200 dark:border-slate-700"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Catat Baru
            </Button>
          </div>

          {transactions.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center text-slate-300 dark:text-slate-600">
                <ArrowLeftRight className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Belum Ada Transaksi</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-light max-w-xs leading-relaxed">
                  Catat pemasukan atau pengeluaran pertama Anda untuk melihat laporan di sini.
                </p>
              </div>
              <Button 
                onClick={() => setShowTxModal(true)} 
                variant="primary" 
                size="sm" 
                className="mt-2 text-xs py-2 px-4.5 rounded-xl shadow-none"
              >
                Mulai Catat Transaksi
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {transactions.map((tx) => {
                const isIncome = tx.type === 'INCOME';
                return (
                  <div key={tx.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0 group">
                    <div className="space-y-1 text-left min-w-0 pr-4">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{tx.description || tx.category}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                        <span className="px-2 py-0.5 bg-slate-50 dark:bg-slate-800 rounded-full font-bold uppercase tracking-wider">{tx.category}</span>
                        <span>&bull;</span>
                        <span>{new Date(tx.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`text-sm font-bold font-mono ${isIncome ? 'text-emerald-600 dark:text-emerald-500' : 'text-slate-800 dark:text-slate-300'}`}>
                        {isIncome ? '+' : '-'} {formatRupiah(tx.amount)}
                      </span>
                      <button
                        onClick={() => handleDeleteTx(tx.id)}
                        className="p-1.5 text-slate-300 dark:text-slate-600 hover:text-rose-500 dark:hover:text-rose-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all cursor-pointer"
                        title="Hapus Transaksi"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </motion.div>

        {/* Right Layout Column: Savings Targets */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="lg:col-span-5 bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm text-left space-y-6"
        >
          <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800/60 pb-5">
            <div>
              <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white">Target Tabungan</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-light mt-0.5">Wujudkan impian finansial Anda.</p>
            </div>
            <Button 
              onClick={() => setShowSavingsModal(true)}
              variant="outline" 
              size="sm" 
              className="text-xs font-bold rounded-xl border-slate-200 dark:border-slate-700"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Tambah
            </Button>
          </div>

          {savings.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center text-slate-300 dark:text-slate-600">
                <PiggyBank className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Belum Ada Target</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-light max-w-xs leading-relaxed">
                  Bikin target baru seperti beli laptop, traveling, atau dana darurat.
                </p>
              </div>
              <Button 
                onClick={() => setShowSavingsModal(true)} 
                variant="primary" 
                size="sm" 
                className="mt-2 text-xs py-2 px-4.5 rounded-xl shadow-none"
              >
                Buat Target Pertama
              </Button>
            </div>
          ) : (
            <div className="space-y-5">
              {savings.map((item) => {
                const percentage = item.target_amount > 0 
                  ? Math.min(100, Math.round((item.current_amount / item.target_amount) * 100))
                  : 0;
                
                return (
                  <div 
                    key={item.id} 
                    className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/60 border border-slate-100/60 dark:border-slate-800/80 space-y-3 relative group"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start pr-8">
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.name}</h4>
                        {item.deadline && (
                          <p className="text-[9px] text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                            <Calendar className="w-2.5 h-2.5" /> Tenggat: {new Date(item.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                        )}
                      </div>
                      
                      <button
                        onClick={() => handleDeleteSavings(item.id)}
                        className="absolute top-4 right-4 p-1.5 text-slate-300 dark:text-slate-600 hover:text-rose-500 dark:hover:text-rose-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                        title="Hapus Target"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] text-slate-400 dark:text-slate-500 font-bold">
                        <span>{percentage}% Tercapai</span>
                        <span>{formatRupiah(item.current_amount)} / {formatRupiah(item.target_amount)}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-teal-500 rounded-full transition-all duration-500" 
                          style={{ width: `${percentage}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </motion.div>

      </div>

      {/* MODALS SECTION */}
      <AnimatePresence>
        
        {/* 1. Add Transaction Modal */}
        {showTxModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTxModal(false)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative z-10 text-left space-y-6"
            >
              <div className="flex justify-between items-center pb-3 border-b border-slate-50 dark:border-slate-800/80">
                <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white">Catat Transaksi Baru</h3>
                <button 
                  onClick={() => setShowTxModal(false)}
                  className="p-1.5 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {actionError && (
                <div className="p-3.5 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 rounded-xl text-rose-600 dark:text-rose-400 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{actionError}</span>
                </div>
              )}

              <form onSubmit={handleTxSubmit} className="space-y-4">
                
                {/* Type Switcher */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 block">Tipe Transaksi</label>
                  <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setTxForm(prev => ({ ...prev, type: 'EXPENSE' }))}
                      className={`
                        py-2 text-xs font-bold rounded-lg transition-all cursor-pointer
                        ${txForm.type === 'EXPENSE'
                          ? 'bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 shadow-sm'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                        }
                      `}
                    >
                      <TrendingDown className="w-3.5 h-3.5 inline mr-1" /> Pengeluaran
                    </button>
                    <button
                      type="button"
                      onClick={() => setTxForm(prev => ({ ...prev, type: 'INCOME' }))}
                      className={`
                        py-2 text-xs font-bold rounded-lg transition-all cursor-pointer
                        ${txForm.type === 'INCOME'
                          ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                        }
                      `}
                    >
                      <TrendingUp className="w-3.5 h-3.5 inline mr-1" /> Pemasukan
                    </button>
                  </div>
                </div>

                {/* Amount */}
                <div className="space-y-1">
                  <label htmlFor="amount" className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Jumlah (Rupiah)</label>
                  <input
                    id="amount"
                    type="number"
                    required
                    placeholder="Contoh: 50000"
                    value={txForm.amount}
                    onChange={(e) => setTxForm(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-[#CC5A37] dark:focus:border-[#CC5A37] rounded-xl text-sm outline-none text-slate-800 dark:text-slate-200 font-mono transition-colors"
                  />
                </div>

                {/* Category Selection */}
                <div className="space-y-1">
                  <label htmlFor="category" className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Kategori</label>
                  <select
                    id="category"
                    value={txForm.category}
                    onChange={(e) => setTxForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-[#CC5A37] dark:focus:border-[#CC5A37] rounded-xl text-sm outline-none text-slate-800 dark:text-slate-200 transition-colors"
                  >
                    {txForm.type === 'EXPENSE' ? (
                      <>
                        <option value="Makanan">Makanan & Minuman</option>
                        <option value="Transportasi">Transportasi</option>
                        <option value="Belanja">Belanja Bulanan</option>
                        <option value="Hiburan">Hiburan & Hobi</option>
                        <option value="Kebutuhan">Kebutuhan Umum</option>
                        <option value="Tagihan">Tagihan & Cicilan</option>
                        <option value="Lainnya">Lain-lain</option>
                      </>
                    ) : (
                      <>
                        <option value="Gaji">Gaji Utama</option>
                        <option value="Freelance">Proyek Freelance</option>
                        <option value="Investasi">Hasil Investasi</option>
                        <option value="Pemberian">Pemberian / Hadiah</option>
                        <option value="Lainnya">Pemasukan Lainnya</option>
                      </>
                    )}
                  </select>
                </div>

                {/* Date */}
                <div className="space-y-1">
                  <label htmlFor="date" className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Tanggal</label>
                  <input
                    id="date"
                    type="date"
                    required
                    value={txForm.date}
                    onChange={(e) => setTxForm(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-[#CC5A37] dark:focus:border-[#CC5A37] rounded-xl text-sm outline-none text-slate-800 dark:text-slate-200 transition-colors"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label htmlFor="description" className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Deskripsi / Keterangan (Opsional)</label>
                  <input
                    id="description"
                    type="text"
                    placeholder="Contoh: Beli Kopi Starbucks"
                    value={txForm.description}
                    onChange={(e) => setTxForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-[#CC5A37] dark:focus:border-[#CC5A37] rounded-xl text-sm outline-none text-slate-800 dark:text-slate-200 transition-colors"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={actionLoading}
                  variant="primary" 
                  className="w-full mt-4 rounded-xl"
                >
                  {actionLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...
                    </>
                  ) : (
                    'Simpan Transaksi'
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        )}

        {/* 2. Set Budget Limit Modal */}
        {showBudgetModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBudgetModal(false)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative z-10 text-left space-y-6"
            >
              <div className="flex justify-between items-center pb-3 border-b border-slate-50 dark:border-slate-800/80">
                <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white">Atur Batas Limit Bulanan</h3>
                <button 
                  onClick={() => setShowBudgetModal(false)}
                  className="p-1.5 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {actionError && (
                <div className="p-3.5 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 rounded-xl text-rose-600 dark:text-rose-400 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{actionError}</span>
                </div>
              )}

              <form onSubmit={handleBudgetSubmit} className="space-y-4">
                
                <div className="space-y-1">
                  <label htmlFor="limit_amount" className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Batas Limit Bulanan (Rupiah)</label>
                  <input
                    id="limit_amount"
                    type="number"
                    required
                    placeholder="Contoh: 3000000"
                    value={budgetForm.limit_amount}
                    onChange={(e) => setBudgetForm(prev => ({ ...prev, limit_amount: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-[#CC5A37] dark:focus:border-[#CC5A37] rounded-xl text-sm outline-none text-slate-800 dark:text-slate-200 font-mono transition-colors"
                  />
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-light mt-1">
                    Batas pengeluaran bulanan Anda untuk memicu peringatan visual jika terlampaui.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  disabled={actionLoading}
                  variant="primary" 
                  className="w-full mt-4 rounded-xl"
                >
                  {actionLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...
                    </>
                  ) : (
                    'Simpan Batas Limit'
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        )}

        {/* 3. Add Savings Target Modal */}
        {showSavingsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSavingsModal(false)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative z-10 text-left space-y-6"
            >
              <div className="flex justify-between items-center pb-3 border-b border-slate-50 dark:border-slate-800/80">
                <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white">Tambah Target Tabungan Baru</h3>
                <button 
                  onClick={() => setShowSavingsModal(false)}
                  className="p-1.5 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {actionError && (
                <div className="p-3.5 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 rounded-xl text-rose-600 dark:text-rose-400 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{actionError}</span>
                </div>
              )}

              <form onSubmit={handleSavingsSubmit} className="space-y-4">
                
                {/* Target Name */}
                <div className="space-y-1">
                  <label htmlFor="target_name" className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Nama Target</label>
                  <input
                    id="target_name"
                    type="text"
                    required
                    placeholder="Contoh: Beli Laptop Baru"
                    value={savingsForm.name}
                    onChange={(e) => setSavingsForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-[#CC5A37] dark:focus:border-[#CC5A37] rounded-xl text-sm outline-none text-slate-800 dark:text-slate-200 transition-colors"
                  />
                </div>

                {/* Target Amount */}
                <div className="space-y-1">
                  <label htmlFor="target_amount" className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Jumlah Target (Rupiah)</label>
                  <input
                    id="target_amount"
                    type="number"
                    required
                    placeholder="Contoh: 15000000"
                    value={savingsForm.target_amount}
                    onChange={(e) => setSavingsForm(prev => ({ ...prev, target_amount: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-[#CC5A37] dark:focus:border-[#CC5A37] rounded-xl text-sm outline-none text-slate-800 dark:text-slate-200 font-mono transition-colors"
                  />
                </div>

                {/* Current Savings (Initial) */}
                <div className="space-y-1">
                  <label htmlFor="current_amount" className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Tabungan Awal (Rupiah, Opsional)</label>
                  <input
                    id="current_amount"
                    type="number"
                    placeholder="Contoh: 1000000"
                    value={savingsForm.current_amount}
                    onChange={(e) => setSavingsForm(prev => ({ ...prev, current_amount: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-[#CC5A37] dark:focus:border-[#CC5A37] rounded-xl text-sm outline-none text-slate-800 dark:text-slate-200 font-mono transition-colors"
                  />
                </div>

                {/* Deadline */}
                <div className="space-y-1">
                  <label htmlFor="deadline" className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Tenggat Tanggal (Opsional)</label>
                  <input
                    id="deadline"
                    type="date"
                    value={savingsForm.deadline}
                    onChange={(e) => setSavingsForm(prev => ({ ...prev, deadline: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-[#CC5A37] dark:focus:border-[#CC5A37] rounded-xl text-sm outline-none text-slate-800 dark:text-slate-200 transition-colors"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={actionLoading}
                  variant="primary" 
                  className="w-full mt-4 rounded-xl"
                >
                  {actionLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...
                    </>
                  ) : (
                    'Simpan Target Tabungan'
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        )}

      </AnimatePresence>

    </div>
  );
}
