'use client';

import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: 'easeOut' },
  }),
};

export function Card({ children, className = '', hover = true, delay = 0 }: CardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      custom={delay}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`bg-white rounded-2xl border border-slate-100 p-6 transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-200/50 ${className}`}
    >
      {children}
    </motion.div>
  );
}
