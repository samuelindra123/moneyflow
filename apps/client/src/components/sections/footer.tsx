'use client';

import { Wallet, Heart, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-slate-900">
          {/* Left Brand info */}
          <div className="space-y-4 max-w-md text-left">
            <a href="#" className="flex items-center gap-2 group w-fit">
              <div className="w-9 h-9 bg-[#CC5A37] rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/10 group-hover:shadow-orange-500/30 transition-shadow">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-serif font-bold text-white tracking-tight">MoneyFlow</span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed">
              Sebuah proyek personal kecil untuk membantu kamu mencatat keuangan harian dengan lebih bersih, teratur, dan 100% aman.
            </p>
          </div>

          {/* Right minimal links */}
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors font-medium">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Source Code
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors font-medium">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Twitter
            </a>
            <a href="mailto:samuel@moneyflow.com" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors font-medium">
              <Mail className="w-4 h-4" />
              Hubungi Kreator
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} MoneyFlow. Seluruh hak cipta dilindungi.
          </p>
          <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
            Dibuat oleh Samuel Indra dengan
            <Heart className="w-3 h-3 text-[#CC5A37] fill-[#CC5A37]" />
          </p>
        </div>
      </div>
    </footer>
  );
}
