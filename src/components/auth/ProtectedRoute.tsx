'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'super_admin' | 'admin' | 'manager' | 'employee';
}

export function ProtectedRoute({ 
  children, 
  requiredRole
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading, getMe } = useAuth();
  const router = useRouter();
  const { addToast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const hasValidated = useRef(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only run on client side
    if (!isClient) return;
    
    console.log('ProtectedRoute: Auth state check', { isAuthenticated, isLoading, user });
    
    // Validate session on protected route mount
    const validateSession = async () => {
      if (hasValidated.current) {
        setIsValidating(false);
        return;
      }
      
      hasValidated.current = true;
      
      // Check if we have tokens
      const hasTokens = typeof window !== 'undefined' && 
        (localStorage.getItem('accessToken') || localStorage.getItem('refreshToken'));
      
      if (!hasTokens && !isAuthenticated) {
        console.log('ProtectedRoute: No tokens found, redirecting to login');
        addToast('Please log in to continue.', 'info');
        router.push('/login');
        setIsValidating(false);
        return;
      }
      
      // If we have tokens but no user, wait for validation
      if (hasTokens && !user && !isLoading) {
        console.log('ProtectedRoute: Waiting for session validation...');
        
        // Give GlobalAuthChecker time to validate (with cookie delay handling)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // If still no user after waiting, try one more time
        if (!user) {
          try {
            console.log('ProtectedRoute: Attempting to validate session...');
            await getMe().unwrap();
            console.log('ProtectedRoute: Session validated successfully');
          } catch (error) {
            console.error('ProtectedRoute: Session validation failed', error);
            addToast('Session expired, please log in again.', 'warning');
            router.push('/login');
          }
        }
      }
      
      setIsValidating(false);
    };
    
    validateSession();
  }, [isClient, isAuthenticated, isLoading, user, router, getMe, addToast]);

  // Show loading while checking auth or during SSR
  if (isLoading || !isClient || isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-sm text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated (after checking with /me)
  if (!isAuthenticated || !user) {
    return null;
  }

  // Check role if required
  if (requiredRole && user) {
    const roleHierarchy = {
      'employee': 0,
      'manager': 1,
      'admin': 2,
      'super_admin': 3,
    };

    const userRoleLevel = roleHierarchy[user.role];
    const requiredRoleLevel = roleHierarchy[requiredRole];

    if (userRoleLevel < requiredRoleLevel) {
      // User doesn't have required role, redirect to dashboard
      addToast('You do not have permission to access this page.', 'error');
      router.push('/dashboard');
      return null;
    }
  }

  return <>{children}</>;
}
