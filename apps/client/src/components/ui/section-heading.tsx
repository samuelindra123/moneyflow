'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({ badge, title, subtitle, centered = true }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className={`max-w-2xl ${centered ? 'mx-auto text-center' : ''} mb-16`}
    >
      {badge && (
        <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-wider text-[#CC5A37] bg-[#CC5A37]/5 border border-[#CC5A37]/10 rounded-full">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-slate-900 tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-slate-500 leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
