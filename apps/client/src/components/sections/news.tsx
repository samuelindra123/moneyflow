'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';
import { fadeInUp } from '@/lib/animations';
import { Sparkles, Target, BookOpen, ArrowUpRight } from 'lucide-react';

const newsItems = [
  {
    category: 'Rilis Baru',
    title: 'MoneyFlow Akses Awal Resmi Diluncurkan!',
    description: 'MoneyFlow kini resmi bisa digunakan secara gratis. Mulai kelola keuangan harianmu dengan antarmuka yang bersih dan bebas iklan.',
    date: '26 Mei 2026',
    icon: Sparkles,
    color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
  },
  {
    category: 'Fitur Baru',
    title: 'Visualisasikan Target Nabungmu Secara Interaktif',
    description: 'Kami baru saja merilis fitur visual progress bar untuk mempermudah kamu memantau mimpi-mimpimu seperti liburan atau beli gadget baru.',
    date: '24 Mei 2026',
    icon: Target,
    color: 'text-[#CC5A37] bg-orange-50 border-orange-100',
  },
  {
    category: 'Tips Finansial',
    title: 'Mengatur Keuangan Pribadi dengan Aturan 50/30/20',
    description: 'Bingung mulai budgeting darimana? Pelajari cara membagi pendapatanmu untuk kebutuhan dasar, keinginan, dan tabungan dengan mudah.',
    date: '20 Mei 2026',
    icon: BookOpen,
    color: 'text-[#2C5E43] bg-emerald-50 border-emerald-100',
  },
];

export function News() {
  return (
    <section id="news" className="py-32 md:py-44 bg-slate-50/20 border-b border-slate-100 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-50/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="News & Update"
          title="Kabar terbaru dari kami"
          subtitle="Ikuti perkembangan fitur, update rilisan, dan artikel edukasi keuangan sederhana yang kami tulis khusus untukmu."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {newsItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="flex flex-col justify-between h-full group" delay={i * 0.15}>
                <div className="p-8">
                  {/* Card Header Info */}
                  <div className="flex items-center justify-between mb-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${item.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">{item.date}</span>
                  </div>

                  {/* Card Body */}
                  <h3 className="text-xl font-serif font-bold text-slate-900 leading-snug group-hover:text-[#CC5A37] transition-colors mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Card Footer Link */}
                <div className="px-8 pb-8 pt-2 mt-auto">
                  <a 
                    href="#news" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#CC5A37] hover:text-[#b04726] transition-colors"
                  >
                    Baca selengkapnya
                    <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
