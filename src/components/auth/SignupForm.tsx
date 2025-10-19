'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { Building2, Users, ArrowRight, Check, Search } from 'lucide-react';
import { authApi, Company } from '@/lib/auth-api';

export function SignupForm() {
  const [step, setStep] = useState(1);
  const [signupType, setSignupType] = useState<'create_company' | 'join_company' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companyName: '',
    companyId: '',
    companyInviteKey: '',
    industry: '',
    companySize: '',
    website: '',
    timezone: '',
    currency: ''
  });
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register } = useAuth();
  const router = useRouter();

  const handleCreateCompany = () => {
    setSignupType('create_company');
    setStep(2);
  };

  const handleJoinCompany = () => {
    setSignupType('join_company');
    setStep(2);
  };

  const handleSearchCompanies = async (query: string) => {
    if (query.length < 2) return;
    
    try {
      setIsLoading(true);
      const response = await authApi.getCompanies(query, 10);
      setCompanies(response.companies);
    } catch (error) {
      console.error('Failed to search companies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const registerData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        signupType: signupType!,
        ...(signupType === 'create_company' ? {
          companyName: formData.companyName,
          industry: formData.industry,
          companySize: formData.companySize,
          website: formData.website,
          timezone: formData.timezone,
          currency: formData.currency
        } : (
          formData.companyInviteKey
            ? { companyInviteKey: formData.companyInviteKey }
            : { companyId: formData.companyId }
        ))
      };

      const result = await register(registerData).unwrap();
      console.log('Registration successful:', result);
      
      // Redirect to dashboard (onboarding handled during signup)
      router.push('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 1: Choose signup type
  if (step === 1) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Get Started with CRM Pro
          </h1>
          <p className="text-lg text-gray-600">
            Choose how you&apos;d like to get started with your CRM.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Create Company */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleCreateCompany}>
            <CardHeader>
              <div className="h-16 w-16 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Create a Company</CardTitle>
              <CardDescription className="text-base">
                Start fresh and set up your organization from scratch. You&apos;ll become the admin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-600">Full administrative control</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-600">Customize company settings</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-600">Invite team members</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Join Company */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleJoinCompany}>
            <CardHeader>
              <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Join Existing Company</CardTitle>
              <CardDescription className="text-base">
                Join your team&apos;s CRM workspace using a company code or search.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600">Quick setup with company code</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600">Access to existing data</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600">Role-based permissions</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Step 2: Registration form
  if (step === 2) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>
            {signupType === 'create_company' ? 'Create Your Account & Company' : 'Join Your Company'}
          </CardTitle>
          <CardDescription>
            {signupType === 'create_company' 
              ? 'Set up your account and company information'
              : 'Enter your details and find your company'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Company Information */}
            {signupType === 'create_company' ? (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Company Information</h3>
                
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name *
                  </label>
                  <Input
                    id="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                      Industry
                    </label>
                    <Select
                      value={formData.industry}
                      onChange={(e) => setFormData({...formData, industry: e.target.value})}
                      disabled={isLoading}
                    >
                      <option value="">Select Industry</option>
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="finance">Finance</option>
                      <option value="retail">Retail</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="consulting">Consulting</option>
                      <option value="education">Education</option>
                      <option value="other">Other</option>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Size
                    </label>
                    <Select
                      value={formData.companySize}
                      onChange={(e) => setFormData({...formData, companySize: e.target.value})}
                      disabled={isLoading}
                    >
                      <option value="">Select Size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="500+">500+ employees</option>
                    </Select>
                  </div>
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    disabled={isLoading}
                    placeholder="https://yourcompany.com"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Join Your Company</h3>
                
                <div>
                  <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700 mb-1">
                    Search for your company
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="searchQuery"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        handleSearchCompanies(e.target.value);
                      }}
                      disabled={isLoading}
                      placeholder="Search for your company..."
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="companyInviteKey" className="block text-sm font-medium text-gray-700 mb-1">
                    Or enter invite code
                  </label>
                  <Input
                    id="companyInviteKey"
                    type="text"
                    value={formData.companyInviteKey}
                    onChange={(e) => setFormData({ ...formData, companyInviteKey: e.target.value, companyId: '' })}
                    disabled={isLoading}
                    placeholder="e.g. ABC123XYZ789"
                  />
                  <p className="mt-1 text-xs text-gray-500">If you have an invite code, you can use it instead of selecting a company.</p>
                </div>

                {companies.length > 0 && !formData.companyInviteKey && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Select your company:
                    </label>
                    <div className="max-h-48 overflow-y-auto border rounded-md">
                      {companies.map((company) => (
                        <div
                          key={company.id}
                          className={`p-3 cursor-pointer hover:bg-gray-50 border-b last:border-b-0 ${
                            formData.companyId === company.id ? 'bg-blue-50 border-blue-200' : ''
                          }`}
                          onClick={() => setFormData({...formData, companyId: company.id})}
                        >
                          <div className="font-medium text-gray-900">{company.name}</div>
                          <div className="text-sm text-gray-500">
                            {company.industry} • {company.size} employees
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {formData.companyId && !formData.companyInviteKey && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-800">
                        Company selected: {companies.find(c => c.id === formData.companyId)?.name}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setStep(1)}
                disabled={isLoading}
              >
                Back
              </Button>
              <Button 
                type="submit" 
                disabled={
                  isLoading ||
                  (signupType === 'join_company' && !formData.companyId && !formData.companyInviteKey)
                }
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return null;
}
