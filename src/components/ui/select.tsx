'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  variant?: 'default' | 'outline';
}

export function Select({ className, variant = 'default', ...props }: SelectProps) {
  const variants = {
    default: 'bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500',
    outline: 'bg-transparent border-gray-300 focus:ring-blue-500 focus:border-blue-500'
  };

  return (
    <select
      className={cn(
        'flex h-10 w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
