'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/toast';
import { cleanupInvalidTokens } from '@/lib/auth-utils';

export function GlobalAuthChecker() {
  const { user, isAuthenticated, getMe, clearAuth } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { addToast } = useToast();
  const hasCheckedAuth = useRef(false);
  const sessionCheckInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Skip auth check for public routes
    const publicRoutes = ['/login', '/signup', '/forgot-password', '/reset-password', '/', '/about', '/contact', '/features', '/pricing', '/privacy', '/terms', '/resources'];
    const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith('/reset-password');
    const isSuperAdminRoute = pathname.startsWith('/super-admin');
    const isDashboardRoute = pathname.startsWith('/dashboard') || pathname.match(/^\/(admin|customers|leads|tasks|employees|calendar|documents|messages|reports|billing|settings)/);
    
    // Auto-login on app mount: Check for existing session
    const initializeSession = async () => {
      if (hasCheckedAuth.current) return;
      hasCheckedAuth.current = true;

      // Clean up any invalid/expired tokens first
      cleanupInvalidTokens();

      const hasTokens = typeof window !== 'undefined' && 
        (localStorage.getItem('accessToken') || localStorage.getItem('refreshToken'));
      
      // Skip auto-login on public routes unless user is already authenticated
      if (isPublicRoute && !user) {
        console.log('GlobalAuthChecker: Public route, skipping auto-login');
        return;
      }
      
      if (hasTokens && !user) {
        console.log('GlobalAuthChecker: Found tokens, attempting auto-login...');
        try {
          const userData = await getMe().unwrap();
          console.log('GlobalAuthChecker: Auto-login successful');
          
          // Redirect super_admin if on regular dashboard
          if (userData.user.role === 'super_admin' && isDashboardRoute && !isSuperAdminRoute) {
            console.log('GlobalAuthChecker: Super admin on regular dashboard, redirecting to super admin area');
            router.push('/super-admin');
            return;
          }
          
          // Redirect regular users if on super admin area
          if (userData.user.role !== 'super_admin' && isSuperAdminRoute) {
            console.log('GlobalAuthChecker: Regular user trying to access super admin area, redirecting to dashboard');
            router.push('/dashboard');
            return;
          }
        } catch (error: unknown) {
          console.error('GlobalAuthChecker: Auto-login failed', error);
          
          // Type guard for error with statusCode
          const isHttpError = (err: unknown): err is { statusCode?: number } => {
            return typeof err === 'object' && err !== null && 'statusCode' in err;
          };
          
          // Session expired or invalid - silently clear tokens
          if (isHttpError(error) && (error.statusCode === 401 || error.statusCode === 0)) {
            console.log('GlobalAuthChecker: Invalid/expired tokens, clearing auth state');
            clearAuth();
            
            // Clear tokens
            if (typeof window !== 'undefined') {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
            }
            
            // Only show toast and redirect if on a protected route
            if (!isPublicRoute) {
              addToast('Session expired, please log in again.', 'warning');
              router.push('/login');
            }
          }
        }
      }
    };

    initializeSession();

    // Periodic session validation (every 5 minutes) - only on protected routes
    if (!isPublicRoute && isAuthenticated && user) {
      sessionCheckInterval.current = setInterval(async () => {
        console.log('GlobalAuthChecker: Performing periodic session check...');
        try {
          await getMe().unwrap();
          console.log('GlobalAuthChecker: Session still valid');
        } catch (error: unknown) {
          console.error('GlobalAuthChecker: Session validation failed', error);
          
          // Type guard for error with statusCode
          const isHttpError = (err: unknown): err is { statusCode?: number } => {
            return typeof err === 'object' && err !== null && 'statusCode' in err;
          };
          
          if (isHttpError(error) && error.statusCode === 401) {
            clearAuth();
            
            if (typeof window !== 'undefined') {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
            }
            
            addToast('Your session has expired. Please log in again.', 'error');
            router.push('/login');
            
            // Clear interval
            if (sessionCheckInterval.current) {
              clearInterval(sessionCheckInterval.current);
            }
          }
        }
      }, 5 * 60 * 1000); // 5 minutes
    }

    // Cleanup
    return () => {
      if (sessionCheckInterval.current) {
        clearInterval(sessionCheckInterval.current);
      }
    };
  }, [pathname, user, isAuthenticated, getMe, clearAuth, router, addToast]);

  return null; // This component doesn't render anything
}
