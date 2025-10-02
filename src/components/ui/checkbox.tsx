'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

export function Checkbox({ className, label, description, ...props }: CheckboxProps) {
  return (
    <div className="flex items-start space-x-3">
      <input
        type="checkbox"
        className={cn(
          'h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2',
          className
        )}
        {...props}
      />
      {(label || description) && (
        <div className="text-sm">
          {label && (
            <label htmlFor={props.id} className="font-medium text-gray-900">
              {label}
            </label>
          )}
          {description && (
            <p className="text-gray-500">{description}</p>
          )}
        </div>
      )}
    </div>
  );
}
