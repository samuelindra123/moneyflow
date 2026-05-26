'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { PRICING_PLANS } from '@/lib/constants';
import { fadeInUp } from '@/lib/animations';

export function Pricing() {
  return (
    <section id="harga" className="py-32 md:py-44 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Skema Harga"
          title="Pilih yang pas untuk kebutuhanmu"
          subtitle="Mulai tanpa biaya, upgrade kapan saja saat kebutuhan finansialmu berkembang."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto mt-16 items-stretch">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.1}
              whileHover={{ y: -6 }}
              className={`relative rounded-3xl p-8 md:p-10 transition-all duration-300 flex flex-col justify-between ${
                plan.highlighted
                  ? 'bg-[#1E1915] text-white shadow-2xl z-10 border border-[#1E1915] scale-[1.02] md:scale-105'
                  : 'bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-[#CC5A37] text-white text-[10px] font-extrabold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                    Paling Populer
                  </span>
                </div>
              )}

              <div>
                <div className="mb-6">
                  <h3 className={`text-xl font-serif font-bold mb-1.5 ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-xs ${plan.highlighted ? 'text-slate-400' : 'text-slate-500'} leading-relaxed`}>
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8">
                  <span className={`text-4xl font-black tracking-tight ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                    {plan.price}
                  </span>
                  {plan.period !== 'selamanya' && (
                    <span className={`text-xs ${plan.highlighted ? 'text-slate-400' : 'text-slate-400'} ml-1 font-semibold`}>
                      {plan.period}
                    </span>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.highlighted ? 'bg-white/10' : 'bg-orange-50'
                      }`}>
                        <Check className={`w-3 h-3 ${plan.highlighted ? 'text-white' : 'text-[#CC5A37]'}`} />
                      </div>
                      <span className={`text-xs ${plan.highlighted ? 'text-slate-350' : 'text-slate-600'} leading-relaxed`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <Button
                  variant={plan.highlighted ? 'primary' : 'outline'}
                  size="lg"
                  className={`w-full text-xs font-bold py-3 ${
                    plan.highlighted 
                      ? 'bg-[#CC5A37] text-white hover:bg-[#b84e2e] border-transparent shadow-md' 
                      : 'hover:bg-slate-50'
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
