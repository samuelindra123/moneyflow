'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { type ButtonHTMLAttributes, forwardRef } from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[#4F46E5] text-white hover:bg-[#4338CA] shadow-lg shadow-indigo-500/25',
  secondary: 'bg-[#06B6D4] text-white hover:bg-[#0891B2] shadow-lg shadow-cyan-500/25',
  ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
  outline: 'border border-slate-200 text-slate-700 hover:border-[#4F46E5] hover:text-[#4F46E5]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', href, children, onClick, ...props }, ref) => {
    const classes = `inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    if (href) {
      const isInternal = href.startsWith('/') && !href.startsWith('//');
      if (isInternal) {
        return (
          <Link href={href} passHref legacyBehavior>
            <motion.a
              className={classes}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClick as any}
              {...(props as any)}
            >
              {children}
            </motion.a>
          </Link>
        );
      }
      return (
        <motion.a
          href={href}
          className={classes}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClick as any}
          {...(props as any)}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button, type ButtonProps };
