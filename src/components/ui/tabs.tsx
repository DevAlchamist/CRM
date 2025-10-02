'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  items: TabItem[];
  defaultActiveTab?: string;
  className?: string;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
}

export function Tabs({ 
  items, 
  defaultActiveTab, 
  className, 
  variant = 'default',
  size = 'md'
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || items[0]?.id);

  const variants = {
    default: 'border-b border-gray-200',
    pills: 'bg-gray-100 rounded-lg p-1',
    underline: 'border-b border-gray-200'
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-6 py-4 text-base'
  };

  const activeTabContent = items.find(item => item.id === activeTab)?.content;

  return (
    <div className={cn('w-full', className)}>
      <div className={cn('flex space-x-1', variants[variant])}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => !item.disabled && setActiveTab(item.id)}
            disabled={item.disabled}
            className={cn(
              'font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              sizes[size],
              activeTab === item.id
                ? variant === 'pills'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700',
              item.disabled && 'opacity-50 cursor-not-allowed',
              variant === 'pills' && 'rounded-md',
              variant === 'default' && 'border-b-2 border-transparent'
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      
      <div className="mt-4">
        {activeTabContent}
      </div>
    </div>
  );
}
