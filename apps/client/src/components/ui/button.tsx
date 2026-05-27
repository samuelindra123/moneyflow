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
  primary: 'bg-[#CC5A37] text-white hover:bg-[#b04726] shadow-lg shadow-orange-500/10 dark:shadow-none',
  secondary: 'bg-[#E5954B] text-white hover:bg-[#d07f35] shadow-lg shadow-amber-500/10 dark:shadow-none',
  ghost: 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800',
  outline: 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-[#CC5A37] hover:text-[#CC5A37] dark:hover:border-[#CC5A37] dark:hover:text-[#CC5A37]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const MotionLink = motion(Link);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', href, children, onClick, ...props }, ref) => {
    const classes = `inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    if (href) {
      const isInternal = href.startsWith('/') && !href.startsWith('//');
      if (isInternal) {
        const linkProps = props as any;
        return (
          <MotionLink
            href={href}
            className={classes}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick as any}
            {...linkProps}
          >
            {children}
          </MotionLink>
        );
      }
      const anchorProps = props as any;
      return (
        <motion.a
          href={href}
          className={classes}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClick as any}
          {...anchorProps}
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
