import { useAuth } from './useAuth';

export function useUserRole() {
  const { user } = useAuth();
  
  // Get user role from auth state, fallback to 'employee' if not available
  return user?.role || 'employee';
}
