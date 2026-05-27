'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { 
  Wallet, 
  LayoutDashboard, 
  ArrowLeftRight, 
  Target, 
  PiggyBank,
  LogOut, 
  Sun, 
  Moon, 
  Monitor, 
  Menu, 
  X,
  User,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import { getBackendUrl } from '@/lib/api';

type Theme = 'light' | 'dark' | 'system';

interface UserData {
  username: string;
  full_name: string;
  avatar_url: string | null;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const username = params?.username as string || '';

  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserData | null>(null);
  const [avatarError, setAvatarError] = useState(false);

  const backendUrl = getBackendUrl();

  // Initialize theme from localStorage
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('moneyflow_dashboard_theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Update theme class based on state
  useEffect(() => {
    if (!mounted) return;

    const handleThemeChange = () => {
      let activeTheme: 'light' | 'dark' = 'light';
      if (theme === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        activeTheme = systemPrefersDark ? 'dark' : 'light';
      } else {
        activeTheme = theme as 'light' | 'dark';
      }

      setResolvedTheme(activeTheme);
    };

    handleThemeChange();

    // Listen to media query changes if theme is system
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => handleThemeChange();
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [theme, mounted]);

  // Save theme to localStorage when changed
  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('moneyflow_dashboard_theme', newTheme);
  };

  // Fetch minimal user profile for sidebar
  useEffect(() => {
    if (!username) return;

    const fetchProfile = async () => {
      try {
        const response = await fetch(`${backendUrl}/dashboard/${username}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const result = await response.json();
          if (result?.data?.user) {
            setUserProfile({
              username: result.data.user.username,
              full_name: result.data.user.full_name,
              avatar_url: result.data.user.avatar_url,
            });
          }
        }
      } catch (err) {
        console.error('Failed to fetch profile for sidebar', err);
      }
    };

    fetchProfile();
  }, [username, backendUrl]);

  const handleLogout = async () => {
    try {
      await fetch(`${backendUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout failed', err);
    } finally {
      window.location.href = '/';
    }
  };

  // Fallback Initials
  const avatarFallback = (() => {
    const name = userProfile?.full_name || username || 'MF';
    return name.split(/\s+/).filter(Boolean).slice(0, 2).map(p => p[0].toUpperCase()).join('');
  })();

  const navigationItems = [
    { name: 'Dashboard', href: `/dashboard/${username}`, icon: LayoutDashboard },
  ];

  return (
    <div className={resolvedTheme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row transition-colors duration-300">
        
        {/* Mobile Header Nav */}
        <header className="md:hidden flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80 sticky top-0 z-30">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#CC5A37] rounded-lg flex items-center justify-center">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-serif font-bold text-slate-900 dark:text-white tracking-tight">MoneyFlow</span>
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Sidebar container */}
        <aside className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800/80 flex flex-col justify-between transform transition-transform duration-300 ease-in-out
          md:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          {/* Top: Logo & Nav items */}
          <div className="flex flex-col flex-1 overflow-y-auto">
            {/* Logo */}
            <div className="hidden md:flex items-center gap-2.5 px-6 py-7 border-b border-slate-100 dark:border-slate-800/60">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 bg-[#CC5A37] rounded-xl flex items-center justify-center shadow-md shadow-[#CC5A37]/20">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-serif font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-[#CC5A37] transition-colors">MoneyFlow</span>
              </Link>
            </div>

            {/* User Profile Info */}
            <div className="p-5 flex items-center gap-3.5 border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/40">
              <div className="w-11 h-11 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 flex items-center justify-center shrink-0">
                {userProfile?.avatar_url && !avatarError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={userProfile.avatar_url}
                    alt={userProfile.full_name}
                    className="w-full h-full object-cover"
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <span className="text-sm font-serif font-bold text-[#CC5A37]">{avatarFallback}</span>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{userProfile?.full_name || 'Memuat...'}</p>
                <p className="text-xs text-[#CC5A37] font-semibold font-mono truncate">@{userProfile?.username || username}</p>
              </div>
            </div>

            {/* Nav Menu */}
            <nav className="p-4 space-y-1.5 flex-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 px-4.5 py-3 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer
                      ${isActive 
                        ? 'bg-[#CC5A37]/10 text-[#CC5A37]' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom: Theme Switcher & Logout */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800/60 space-y-4 bg-slate-50/50 dark:bg-slate-900/40">
            {/* Theme switcher */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2">Tampilan Tema</p>
              <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-950/80 p-1 rounded-xl">
                {[
                  { name: 'light', icon: Sun },
                  { name: 'dark', icon: Moon },
                  { name: 'system', icon: Monitor },
                ].map((t) => {
                  const Icon = t.icon;
                  const isSelected = theme === t.name;
                  return (
                    <button
                      key={t.name}
                      onClick={() => changeTheme(t.name as Theme)}
                      className={`
                        flex flex-col items-center justify-center py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer
                        ${isSelected
                          ? 'bg-white dark:bg-slate-800 text-[#CC5A37] dark:text-[#CC5A37] shadow-sm'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }
                      `}
                      title={`Pilih tema ${t.name}`}
                    >
                      <Icon className="w-4 h-4 mb-0.5" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 border border-slate-200 dark:border-slate-800 hover:border-rose-200 dark:hover:border-rose-900/40 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/10 bg-white dark:bg-slate-900/60 transition-all cursor-pointer"
            >
              <LogOut className="w-4.5 h-4.5 text-rose-500" />
              Keluar Sesi
            </button>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {isSidebarOpen && (
          <div 
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-sm md:hidden"
          />
        )}

        {/* Content Panel */}
        <div className="flex-1 flex flex-col min-w-0 md:pl-64">
          <main className="flex-1 p-6 md:p-10 lg:p-12">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
