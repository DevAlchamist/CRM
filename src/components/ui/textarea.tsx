'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'outline';
}

export function Textarea({ className, variant = 'default', ...props }: TextareaProps) {
  const variants = {
    default: 'bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500',
    outline: 'bg-transparent border-gray-300 focus:ring-blue-500 focus:border-blue-500'
  };

  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed resize-vertical',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
