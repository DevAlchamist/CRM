import React, { Suspense } from 'react';
import Link from 'next/link';
import { Building2 } from 'lucide-react';
import { LoginForm } from '@/components/auth/LoginForm';
import { LoginSkeleton } from '@/components/auth/LoginSkeleton';
import { Card, CardContent } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-md bg-[#2563EB] flex items-center justify-center">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-[#111827]">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-[#6B7280]">
            Or{' '}
            <Link href="/signup" className="font-medium text-[#2563EB] hover:text-[#1E40AF]">
              create a new account
            </Link>
          </p>
        </div>

        {/* Login Form */}
        <Suspense fallback={<LoginSkeleton />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
