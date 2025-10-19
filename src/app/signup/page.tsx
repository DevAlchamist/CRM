import React from 'react';
import Link from 'next/link';
import { Building2, Check } from 'lucide-react';
import { SignupForm } from '@/components/auth/SignupForm';
import { Card, CardContent } from '@/components/ui/card';

export default function SignupPage() {
  const features = [
    '14-day free trial',
    'No credit card required',
    'Cancel anytime',
    'Full access to all features',
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-md bg-[#2563EB] flex items-center justify-center">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-[#111827]">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-[#6B7280]">
            Or{' '}
            <Link href="/login" className="font-medium text-[#2563EB] hover:text-[#1E40AF]">
              sign in to your existing account
            </Link>
          </p>
        </div>

        {/* Signup Form */}
        <SignupForm />

        {/* Free Trial Info */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-[#111827] mb-3">
                What you get with your free trial:
              </h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center justify-center text-sm text-[#6B7280]">
                    <Check className="h-4 w-4 text-[#10B981] mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
