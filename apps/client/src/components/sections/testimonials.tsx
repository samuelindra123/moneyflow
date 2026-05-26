'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { TESTIMONIALS } from '@/lib/constants';
import { fadeInUp } from '@/lib/animations';

export function Testimonials() {
  const col1 = [TESTIMONIALS[0], TESTIMONIALS[2]];
  const col2 = [TESTIMONIALS[1], TESTIMONIALS[3]];

  return (
    <section id="testimoni" className="py-32 md:py-44 bg-slate-50/30 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Testimoni"
          title="Kata mereka yang telah membuktikannya"
          subtitle="Telah digunakan oleh ribuan orang dari berbagai profesi. Ini cerita sukses mereka."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto">
          {/* Column 1 */}
          <div className="flex flex-col gap-8">
            {col1.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.1}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1.5 mb-5">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-slate-700 font-serif italic text-base leading-relaxed mb-6">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  <div className="w-11 h-11 bg-[#CC5A37] rounded-full flex items-center justify-center text-white text-base font-bold shadow-md shadow-indigo-500/10">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{testimonial.name}</p>
                    <p className="text-xs text-slate-400 font-semibold">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-8">
            {col2.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.15}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1.5 mb-5">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-slate-700 font-serif italic text-base leading-relaxed mb-6">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  <div className="w-11 h-11 bg-[#CC5A37] rounded-full flex items-center justify-center text-white text-base font-bold shadow-md shadow-indigo-500/10">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{testimonial.name}</p>
                    <p className="text-xs text-slate-400 font-semibold">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
