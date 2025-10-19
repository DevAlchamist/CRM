import React from 'react';
import { AlertCircle, Lock, ShieldAlert } from 'lucide-react';
import { Card, CardContent } from './card';

interface PermissionMessageProps {
  title?: string;
  message?: string;
  type?: 'restricted' | 'upgrade' | 'role';
  className?: string;
}

export function PermissionMessage({
  title,
  message,
  type = 'restricted',
  className = '',
}: PermissionMessageProps) {
  const config = {
    restricted: {
      icon: Lock,
      defaultTitle: 'Access Restricted',
      defaultMessage: 'You do not have permission to access this feature.',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      iconColor: 'text-yellow-600',
      textColor: 'text-yellow-800',
    },
    upgrade: {
      icon: ShieldAlert,
      defaultTitle: 'Upgrade Required',
      defaultMessage: 'This feature is available for higher-tier accounts. Please contact your administrator.',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-800',
    },
    role: {
      icon: AlertCircle,
      defaultTitle: 'Insufficient Permissions',
      defaultMessage: 'Your role does not have access to this feature. Please contact your administrator.',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      iconColor: 'text-red-600',
      textColor: 'text-red-800',
    },
  };

  const { icon: Icon, defaultTitle, defaultMessage, bgColor, borderColor, iconColor, textColor } = config[type];

  return (
    <Card className={`${bgColor} ${borderColor} border ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-3">
          <Icon className={`h-6 w-6 ${iconColor} flex-shrink-0 mt-0.5`} />
          <div>
            <h3 className={`font-semibold ${textColor} mb-1`}>
              {title || defaultTitle}
            </h3>
            <p className={`text-sm ${textColor.replace('800', '700')}`}>
              {message || defaultMessage}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function InlinePermissionMessage({
  message = 'You do not have permission to perform this action.',
  className = '',
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center space-x-2 text-sm text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-md px-3 py-2 ${className}`}>
      <Lock className="h-4 w-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}






