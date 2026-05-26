'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

const companies = [
  'Tokopedia', 'Gojek', 'Shopee', 'Dana', 'OVO', 'Traveloka',
];

export function Trusted() {
  return (
    <section className="py-20 md:py-28 border-y border-slate-100 bg-slate-50/30 my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-xs font-bold tracking-wider text-slate-400 uppercase mb-10"
        >
          Dipercaya oleh 10.000+ pengguna dari berbagai perusahaan
        </motion.p>
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
          className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8"
        >
          {companies.map((company, i) => (
            <motion.div
              key={company}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="text-2xl font-black text-slate-300 hover:text-slate-400 transition-colors tracking-tight select-none cursor-default"
            >
              {company}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
