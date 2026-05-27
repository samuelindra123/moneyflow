'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { fadeInUp } from '@/lib/animations';
import { Code, Terminal, Heart, Mail } from 'lucide-react';

export default function AboutDeveloperPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white pt-32 pb-24 md:pt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left illustration / Avatar box */}
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative group">
                {/* Outer decorative ring */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#CC5A37] to-[#E5954B] rounded-3xl blur-2xl opacity-20 group-hover:opacity-35 transition-opacity duration-300" />
                
                {/* Profile Card Mockup */}
                <div className="relative bg-slate-50 border border-slate-200/80 rounded-3xl p-8 w-72 sm:w-80 shadow-xl shadow-slate-100/50 overflow-hidden">
                  <div className="flex items-center gap-2 mb-6 text-[10px] text-slate-400 font-mono">
                    <Terminal className="w-3.5 h-3.5 text-[#CC5A37]" />
                    <span>developer.profile</span>
                  </div>
                  
                  {/* Simulated Avatar */}
                  <div className="w-24 h-24 bg-gradient-to-br from-[#CC5A37] to-[#E5954B] rounded-2xl flex items-center justify-center text-white text-3xl font-serif font-bold shadow-lg shadow-orange-500/10 mb-5 mx-auto">
                    SIB
                  </div>

                  <div className="text-center space-y-1">
                    <h4 className="text-lg font-serif font-bold text-slate-900">Samuel Indra Bastian</h4>
                    <p className="text-xs text-[#CC5A37] font-semibold">Creator & Developer</p>
                    <p className="text-[10px] text-slate-400 font-medium">Batam, Indonesia 🇮🇩</p>
                  </div>

                  {/* Tech stack badge in card */}
                  <div className="flex flex-wrap gap-1.5 justify-center mt-6">
                    {['React', 'Next.js', 'Tailwind', 'TS'].map((tech) => (
                      <span key={tech} className="px-2 py-0.5 bg-white border border-slate-200 rounded-md text-[9px] font-bold text-slate-500 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right bio content */}
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-100 rounded-full text-xs font-bold text-[#CC5A37]">
                <Code className="w-3.5 h-3.5" />
                Pengembang MoneyFlow
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-light text-slate-900 tracking-tight leading-tight">
                Di balik layar pembuatan{' '}
                <span className="font-serif italic font-medium text-[#CC5A37]">
                  MoneyFlow
                </span>
              </h2>

              <div className="space-y-4 text-slate-500 font-light leading-relaxed text-base">
                <p>
                  Halo! Saya <strong>Samuel Indra Bastian</strong>. Saya adalah pengembang tunggal di balik penciptaan MoneyFlow. Aplikasi ini lahir dari kebutuhan pribadi saya untuk mencatat dan memantau cash flow secara mudah tanpa diganggu iklan berisik atau dipaksa berlangganan hanya untuk fitur dasar.
                </p>
                <p>
                  Banyak aplikasi pengatur uang di luar sana yang terlalu rumit, sehingga kita sering malas mencatat di hari ketiga. MoneyFlow didesain dengan prinsip **kesederhanaan visual** dan **keamanan penuh**, membantu siapa saja mengendalikan keuangan harian tanpa rasa cemas dan ribet.
                </p>
              </div>

              {/* Social buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 py-2 border border-slate-200 hover:border-slate-800 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-white transition-all shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 py-2 border border-slate-200 hover:border-[#1DA1F2] hover:bg-sky-50/20 rounded-xl text-xs font-bold text-slate-600 hover:text-[#1DA1F2] bg-white transition-all shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Twitter
                </a>
                <a 
                  href="mailto:samuel@moneyflow.com" 
                  className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 hover:border-[#CC5A37] hover:bg-orange-50/10 rounded-xl text-xs font-bold text-slate-600 hover:text-[#CC5A37] bg-white transition-all shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  Kirim Email
                </a>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold pt-4">
                <span>Made with</span>
                <Heart className="w-3.5 h-3.5 fill-[#CC5A37] text-[#CC5A37] animate-pulse" />
                <span>in Malang, Indonesia</span>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
