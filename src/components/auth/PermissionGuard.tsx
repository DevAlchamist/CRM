'use client';

import React from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import type { Feature, UserRole } from '@/lib/permissions';

interface PermissionGuardProps {
  children: React.ReactNode;
  feature?: Feature;
  features?: Feature[];
  requireAll?: boolean;
  role?: UserRole;
  fallback?: React.ReactNode;
}

/**
 * Component that conditionally renders children based on user permissions
 * 
 * @example
 * <PermissionGuard feature="create_customer">
 *   <button>Add Customer</button>
 * </PermissionGuard>
 * 
 * @example
 * <PermissionGuard features={["edit_customer", "delete_customer"]} requireAll>
 *   <button>Edit/Delete Customer</button>
 * </PermissionGuard>
 * 
 * @example
 * <PermissionGuard role="admin">
 *   <AdminPanel />
 * </PermissionGuard>
 */
export function PermissionGuard({
  children,
  feature,
  features,
  requireAll = false,
  role,
  fallback = null,
}: PermissionGuardProps) {
  const { can, canAll, canAny, hasRole } = usePermissions();

  let hasAccess = false;

  // Check role level
  if (role) {
    hasAccess = hasRole(role);
  }
  // Check single feature
  else if (feature) {
    hasAccess = can(feature);
  }
  // Check multiple features
  else if (features && features.length > 0) {
    hasAccess = requireAll ? canAll(features) : canAny(features);
  }
  // If no conditions specified, deny access by default
  else {
    hasAccess = false;
  }

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Component that shows content when user DOESN'T have permission
 * Useful for showing "upgrade" messages or alternative content
 */
export function RestrictedContent({
  children,
  feature,
  features,
  requireAll = false,
  role,
}: Omit<PermissionGuardProps, 'fallback'>) {
  const { can, canAll, canAny, hasRole } = usePermissions();

  let hasAccess = false;

  if (role) {
    hasAccess = hasRole(role);
  } else if (feature) {
    hasAccess = can(feature);
  } else if (features && features.length > 0) {
    hasAccess = requireAll ? canAll(features) : canAny(features);
  }

  // Show content only if user DOESN'T have access
  if (hasAccess) {
    return null;
  }

  return <>{children}</>;
}

/**
 * Higher-order component that adds permission checking to any component
 */
export function withPermission<P extends object>(
  Component: React.ComponentType<P>,
  feature: Feature | Feature[],
  requireAll = false
) {
  return function PermissionWrappedComponent(props: P) {
    const { can, canAll, canAny } = usePermissions();

    const hasAccess = Array.isArray(feature)
      ? requireAll
        ? canAll(feature)
        : canAny(feature)
      : can(feature);

    if (!hasAccess) {
      return null;
    }

    return <Component {...props} />;
  };
}






