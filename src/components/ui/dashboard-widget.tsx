'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface DashboardWidgetProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
    period: string;
  };
  icon?: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  trend?: {
    data: Array<{ label: string; value: number }>;
    type: 'line' | 'bar';
  };
  className?: string;
  children?: React.ReactNode;
}

export function DashboardWidget({
  title,
  value,
  change,
  icon: Icon,
  iconColor = 'text-blue-600',
  iconBg = 'bg-blue-100',
  // trend,
  className,
  children
}: DashboardWidgetProps) {
  return (
    <Card className={cn('h-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        {Icon && (
          <div className={cn('h-8 w-8 rounded-lg flex items-center justify-center', iconBg)}>
            <Icon className={cn('h-4 w-4', iconColor)} />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-gray-900">
            {value}
          </div>
          
          {change && (
            <div className="flex items-center space-x-2">
              <Badge
                variant={change.type === 'increase' ? 'success' : 'secondary'}
                className="text-xs"
              >
                {change.type === 'increase' ? '+' : '-'}{Math.abs(change.value)}%
              </Badge>
              <span className="text-xs text-gray-500">
                {change.period}
              </span>
            </div>
          )}

          {children}
        </div>
      </CardContent>
    </Card>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  trend?: {
    value: number;
    type: 'increase' | 'decrease';
    label: string;
  };
  className?: string;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-blue-600',
  iconBg = 'bg-blue-100',
  trend,
  className
}: MetricCardProps) {
  return (
    <Card className={cn('h-full', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {subtitle && (
              <p className="text-sm text-gray-500">{subtitle}</p>
            )}
            {trend && (
              <div className="flex items-center space-x-1">
                <span className={cn(
                  'text-sm font-medium',
                  trend.type === 'increase' ? 'text-green-600' : 'text-red-600'
                )}>
                  {trend.type === 'increase' ? '↗' : '↘'} {Math.abs(trend.value)}%
                </span>
                <span className="text-sm text-gray-500">{trend.label}</span>
              </div>
            )}
          </div>
          {Icon && (
            <div className={cn('h-12 w-12 rounded-lg flex items-center justify-center', iconBg)}>
              <Icon className={cn('h-6 w-6', iconColor)} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  className?: string;
}

export function StatCard({
  label,
  value,
  description,
  icon: Icon,
  className
}: StatCardProps) {
  return (
    <div className={cn('text-center p-6 bg-white rounded-lg border border-gray-200', className)}>
      {Icon && (
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      )}
      <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
      <div className="text-sm font-medium text-gray-600 mb-1">{label}</div>
      {description && (
        <div className="text-xs text-gray-500">{description}</div>
      )}
    </div>
  );
}
