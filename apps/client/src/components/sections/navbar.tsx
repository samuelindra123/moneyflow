'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Wallet, ChevronDown, Target, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const dropdownItems = [
  {
    label: 'Fitur',
    href: '/produk/fitur',
    description: 'Catat pengeluaran & pantau limit jajan harian.',
    icon: Target,
    color: 'text-[#CC5A37] bg-orange-50/50',
  },
  {
    label: 'Kegunaan',
    href: '/produk/kegunaan',
    description: 'Cara kerja dashboard & visualisasi cashflow.',
    icon: BookOpen,
    color: 'text-[#E5954B] bg-amber-50/50',
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-[#CC5A37] rounded-xl flex items-center justify-center shadow-lg shadow-[#CC5A37]/20 group-hover:shadow-[#CC5A37]/40 transition-shadow">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-serif font-bold text-slate-900 tracking-tight">MoneyFlow</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1 relative">
              {/* Dropdown Container */}
              <div 
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-slate-50 cursor-pointer ${
                    isDropdownOpen ? 'text-[#CC5A37] bg-slate-50' : 'text-slate-600 hover:text-[#CC5A37]'
                  }`}
                >
                  Produk
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-[#CC5A37]' : 'text-slate-400'}`} />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute left-0 mt-2 w-80 bg-white border border-slate-100 rounded-2xl shadow-xl p-4 z-50 grid grid-cols-1 gap-1"
                    >
                      {dropdownItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={item.label}
                            href={item.href}
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                          >
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${item.color}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                              <span className="text-sm font-bold text-slate-800 block leading-tight mb-0.5 group-hover:text-[#CC5A37] transition-colors">
                                {item.label}
                              </span>
                              <span className="text-[11px] text-slate-400 font-medium leading-relaxed block">
                                {item.description}
                              </span>
                            </div>
                          </a>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* News link next to it */}
              <a
                href="/news"
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-[#CC5A37] transition-colors rounded-lg hover:bg-slate-50"
              >
                News
              </a>

              {/* About Developer link next to it */}
              <a
                href="/about-developer"
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-[#CC5A37] transition-colors rounded-lg hover:bg-slate-50"
              >
                About Developer
              </a>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" size="sm">Masuk</Button>
              <Button variant="primary" size="sm">Mulai Gratis</Button>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-lg md:hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {/* Mobile Accordion */}
              <div>
                <button
                  onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-slate-600 hover:text-[#CC5A37] hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
                >
                  <span>Produk</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileDropdownOpen ? 'rotate-180 text-[#CC5A37]' : 'text-slate-400'}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isMobileDropdownOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden bg-slate-50/50 rounded-xl mt-1 mx-2 px-2 py-1 grid grid-cols-1 gap-1"
                    >
                      {dropdownItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={item.label}
                            href={item.href}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setIsMobileDropdownOpen(false);
                            }}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 transition-colors"
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                          </a>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile News Link */}
              <a
                href="/news"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-slate-600 hover:text-[#CC5A37] hover:bg-slate-50 rounded-xl transition-colors"
              >
                News
              </a>

              {/* Mobile About Developer Link */}
              <a
                href="/about-developer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-slate-600 hover:text-[#CC5A37] hover:bg-slate-50 rounded-xl transition-colors"
              >
                About Developer
              </a>

              <div className="pt-4 space-y-3 border-t border-slate-100 mt-4">
                <Button variant="outline" size="md" className="w-full">Masuk</Button>
                <Button variant="primary" size="md" className="w-full">Mulai Gratis</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
