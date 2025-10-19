'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isFormLoading, setIsFormLoading] = useState(true);
  const [isValidatingSession, setIsValidatingSession] = useState(false);
  const { login, isLoading, error, clearError, getMe } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();

  // Simulate form loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsFormLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      console.log('LoginForm: Attempting login...');
      const result = await login({ email, password }).unwrap();
      console.log('LoginForm: Login successful, validating session...', result);
      
      // Handle cookie delay - wait for session to be fully established
      setIsValidatingSession(true);
      
      // Wait a moment for cookies to be set properly
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Validate the session by calling /me endpoint
      try {
        const userData = await getMe().unwrap();
        console.log('LoginForm: Session validated, redirecting based on role', userData);
        addToast('Login successful! Welcome back.', 'success');
        
        // Redirect super admin to dedicated super admin dashboard
        if (userData.user.role === 'super_admin') {
          router.push('/super-admin');
        } else {
          router.push('/dashboard');
        }
      } catch {
        console.warn('LoginForm: Session validation pending, proceeding with redirect');
        // Even if validation fails, proceed - GlobalAuthChecker will handle it
        router.push('/dashboard');
      } finally {
        setIsValidatingSession(false);
      }
    } catch (error) {
      console.error('LoginForm: Login failed:', error);
      setIsValidatingSession(false);
      // Error is handled by Redux state and displayed below
    }
  };

  if (isFormLoading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-64"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="h-4 bg-gray-200 rounded w-12 mb-1"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative">
      {(isLoading || isValidatingSession) && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-sm font-medium text-gray-700">
              {isValidatingSession ? 'Establishing session...' : 'Signing you in...'}
            </span>
          </div>
        </div>
      )}
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md flex items-start">
              <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || isValidatingSession}
          >
            {isLoading || isValidatingSession ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {isValidatingSession ? 'Establishing Session...' : 'Signing In...'}
              </div>
            ) : 'Sign In'}
          </Button>
          
        </form>

        <div className="mt-4 text-center text-sm">
          <a href="/forgot-password" className="text-blue-600 hover:text-blue-500">
            Forgot your password?
          </a>
        </div>
      </CardContent>
    </Card>
    </div>
  );
}
