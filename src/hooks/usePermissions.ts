import { useAuth } from './useAuth';
import {
  hasPermission,
  hasAllPermissions,
  hasAnyPermission,
  hasRoleLevel,
  getPermissionsForRole,
  type Feature,
  type UserRole,
} from '@/lib/permissions';

/**
 * Hook to check user permissions
 * Returns permission checking functions based on current user's role
 */
export function usePermissions() {
  const { user } = useAuth();
  const userRole = user?.role;

  return {
    // Check if user has a specific permission
    can: (feature: Feature): boolean => {
      if (!userRole) return false;
      return hasPermission(userRole, feature);
    },

    // Check if user has all of the specified permissions
    canAll: (features: Feature[]): boolean => {
      if (!userRole) return false;
      return hasAllPermissions(userRole, features);
    },

    // Check if user has any of the specified permissions
    canAny: (features: Feature[]): boolean => {
      if (!userRole) return false;
      return hasAnyPermission(userRole, features);
    },

    // Check if user has a specific role level or higher
    hasRole: (requiredRole: UserRole): boolean => {
      if (!userRole) return false;
      return hasRoleLevel(userRole, requiredRole);
    },

    // Get user's role
    role: userRole,

    // Get all permissions for user
    permissions: userRole ? getPermissionsForRole(userRole) : [],

    // Check if user is authenticated
    isAuthenticated: !!user,
  };
}






