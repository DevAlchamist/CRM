'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Building2, Users, ArrowRight, Check, Globe, Shield, Zap, Mail, Send } from 'lucide-react';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState<'create' | 'join' | null>(null);
  const [companyData, setCompanyData] = useState({
    name: '',
    industry: '',
    size: '',
    website: '',
    timezone: '',
    currency: ''
  });
  const [inviteCode, setInviteCode] = useState('');
  const [teamInvites, setTeamInvites] = useState(['']);
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const router = useRouter();

  const handleCreateCompany = () => {
    setSelectedOption('create');
    setStep(2);
  };

  const handleJoinCompany = () => {
    setSelectedOption('join');
    setStep(2);
  };

  const handleCompanyInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
    setStep(4);
  };

  const addTeamInvite = () => {
    setTeamInvites([...teamInvites, '']);
  };

  const removeTeamInvite = (index: number) => {
    setTeamInvites(teamInvites.filter((_, i) => i !== index));
  };

  const updateTeamInvite = (index: number, value: string) => {
    const newInvites = [...teamInvites];
    newInvites[index] = value;
    setTeamInvites(newInvites);
  };

  const handleTeamInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending invites
    console.log('Sending invites to:', teamInvites.filter(email => email.trim()));
    setStep(5);
  };

  const handleInviteCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate joining company
    router.push('/dashboard');
  };

  const handleComplete = () => {
    router.push('/dashboard');
  };

  // Step 1: Choose Option
  if (step === 1) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center py-12 px-4">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-lg bg-[#2563EB] flex items-center justify-center">
                <Building2 className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-[#111827] mb-4">
              Welcome to CRM Pro!
            </h1>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              Let&apos;s get you set up. Choose how you&apos;d like to get started with your CRM.
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Create Company */}
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleCreateCompany}>
              <CardHeader>
                <div className="h-16 w-16 bg-[#10B981] rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Create a Company</CardTitle>
                <CardDescription className="text-base">
                  Start fresh and set up your organization from scratch. You&apos;ll become the admin and can invite your team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-[#10B981]" />
                    <span className="text-[#6B7280]">Full administrative control</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-[#10B981]" />
                    <span className="text-[#6B7280]">Customize company settings</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-[#10B981]" />
                    <span className="text-[#6B7280]">Invite team members</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-[#10B981]" />
                    <span className="text-[#6B7280]">Choose subscription plan</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Join Company */}
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleJoinCompany}>
              <CardHeader>
                <div className="h-16 w-16 bg-[#2563EB] rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Join Existing Company</CardTitle>
                <CardDescription className="text-base">
                  Join your team&apos;s CRM workspace using an invite link or company code provided by your admin.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-[#2563EB]" />
                    <span className="text-[#6B7280]">Quick setup with invite code</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-[#2563EB]" />
                    <span className="text-[#6B7280]">Access to existing data</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-[#2563EB]" />
                    <span className="text-[#6B7280]">Role-based permissions</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-[#2563EB]" />
                    <span className="text-[#6B7280]">Team collaboration tools</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Back to Login */}
          <div className="text-center mt-8">
            <Link href="/login" className="text-[#2563EB] hover:underline">
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Company Info (Create) or Invite Code (Join)
  if (step === 2) {
    if (selectedOption === 'create') {
      return (
        <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center py-12 px-4">
          <div className="max-w-2xl w-full">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#111827] mb-4">
                Company Information
              </h1>
              <p className="text-[#6B7280]">
                Tell us about your company so we can customize your CRM experience.
              </p>
            </div>

            {/* Progress */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div className="h-8 w-8 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-sm font-medium">1</div>
                <div className="h-1 w-16 bg-[#E5E7EB]"></div>
                <div className="h-8 w-8 rounded-full bg-[#E5E7EB] flex items-center justify-center text-[#6B7280] text-sm font-medium">2</div>
                <div className="h-1 w-16 bg-[#E5E7EB]"></div>
                <div className="h-8 w-8 rounded-full bg-[#E5E7EB] flex items-center justify-center text-[#6B7280] text-sm font-medium">3</div>
              </div>
            </div>

            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleCompanyInfoSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <Input
                      value={companyData.name}
                      onChange={(e) => setCompanyData({...companyData, name: e.target.value})}
                      required
                      placeholder="Your Company Name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Industry
                      </label>
                      <Select
                        value={companyData.industry}
                        onChange={(e) => setCompanyData({...companyData, industry: e.target.value})}
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Size
                      </label>
                      <Select
                        value={companyData.size}
                        onChange={(e) => setCompanyData({...companyData, size: e.target.value})}
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <Input
                      value={companyData.website}
                      onChange={(e) => setCompanyData({...companyData, website: e.target.value})}
                      placeholder="https://yourcompany.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <Select
                        value={companyData.timezone}
                        onChange={(e) => setCompanyData({...companyData, timezone: e.target.value})}
                      >
                        <option value="">Select Timezone</option>
                        <option value="UTC-8">Pacific Time (UTC-8)</option>
                        <option value="UTC-5">Eastern Time (UTC-5)</option>
                        <option value="UTC+0">Greenwich Mean Time (UTC+0)</option>
                        <option value="UTC+1">Central European Time (UTC+1)</option>
                        <option value="UTC+5:30">India Standard Time (UTC+5:30)</option>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Currency
                      </label>
                      <Select
                        value={companyData.currency}
                        onChange={(e) => setCompanyData({...companyData, currency: e.target.value})}
                      >
                        <option value="">Select Currency</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="INR">INR (₹)</option>
                        <option value="CAD">CAD (C$)</option>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button type="submit">
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    } else {
      // Join Company - Invite Code
      return (
        <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center py-12 px-4">
          <div className="max-w-2xl w-full">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#111827] mb-4">
                Join Your Company
              </h1>
              <p className="text-[#6B7280]">
                Enter the invite code or link provided by your team admin to join your company&apos;s CRM workspace.
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleInviteCodeSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Invite Code or Link *
                    </label>
                    <Input
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value)}
                      required
                      placeholder="Enter invite code or paste invite link"
                    />
                    <p className="text-sm text-[#6B7280] mt-2">
                      Your admin should have sent you this via email or shared it directly.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium text-blue-900 mb-2">Don&apos;t have an invite code?</h3>
                    <p className="text-sm text-blue-700 mb-3">
                      Contact your team admin to get an invite, or create a new company workspace.
                    </p>
                    <Button variant="outline" size="sm" onClick={() => setStep(1)}>
                      Create Company Instead
                    </Button>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button type="submit">
                      Join Company
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }
  }

  // Step 3: Plan Selection (Create Company only)
  if (step === 3) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center py-12 px-4">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#111827] mb-4">
              Choose Your Plan
            </h1>
            <p className="text-[#6B7280]">
              Select the plan that best fits your company&apos;s needs. You can always upgrade later.
            </p>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-sm font-medium">1</div>
              <div className="h-1 w-16 bg-[#2563EB]"></div>
              <div className="h-8 w-8 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-sm font-medium">2</div>
              <div className="h-1 w-16 bg-[#E5E7EB]"></div>
              <div className="h-8 w-8 rounded-full bg-[#E5E7EB] flex items-center justify-center text-[#6B7280] text-sm font-medium">3</div>
            </div>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-2 border-[#E5E7EB]">
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <CardDescription>Perfect for small teams</CardDescription>
                <div className="text-3xl font-bold">Free</div>
                <div className="text-sm text-[#6B7280]">14-day trial</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-[#10B981]" />
                    <span className="text-sm">Up to 5 users</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-[#10B981]" />
                    <span className="text-sm">Basic CRM features</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-[#10B981]" />
                    <span className="text-sm">Email support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#2563EB] relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#2563EB] text-white px-3 py-1 rounded-full text-sm font-medium">
                  Recommended
                </span>
              </div>
              <CardHeader>
                <CardTitle>Professional</CardTitle>
                <CardDescription>Great for growing businesses</CardDescription>
                <div className="text-3xl font-bold">$29</div>
                <div className="text-sm text-[#6B7280]">per user/month</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-[#10B981]" />
                    <span className="text-sm">Up to 50 users</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-[#10B981]" />
                    <span className="text-sm">Advanced CRM features</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-[#10B981]" />
                    <span className="text-sm">Priority support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-[#10B981]" />
                    <span className="text-sm">Integrations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#E5E7EB]">
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>For large organizations</CardDescription>
                <div className="text-3xl font-bold">$79</div>
                <div className="text-sm text-[#6B7280]">per user/month</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-[#10B981]" />
                    <span className="text-sm">Unlimited users</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-[#10B981]" />
                    <span className="text-sm">All features</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-[#10B981]" />
                    <span className="text-sm">24/7 support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-[#10B981]" />
                    <span className="text-sm">Custom integrations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button onClick={() => handlePlanSelect(selectedPlan)}>
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Step 4: Team Invitations (Create Company only)
  if (step === 4) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#111827] mb-4">
              Invite Your Team
            </h1>
            <p className="text-[#6B7280]">
              Invite your team members to join your CRM workspace. You can always add more later.
            </p>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-sm font-medium">1</div>
              <div className="h-1 w-16 bg-[#2563EB]"></div>
              <div className="h-8 w-8 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-sm font-medium">2</div>
              <div className="h-1 w-16 bg-[#2563EB]"></div>
              <div className="h-8 w-8 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-sm font-medium">3</div>
              <div className="h-1 w-16 bg-[#2563EB]"></div>
              <div className="h-8 w-8 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-sm font-medium">4</div>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleTeamInviteSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team Member Email Addresses
                  </label>
                  <p className="text-sm text-[#6B7280] mb-4">
                    Enter email addresses of team members you&apos;d like to invite. They&apos;ll receive an invitation to join your workspace.
                  </p>
                  
                  <div className="space-y-3">
                    {teamInvites.map((email, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => updateTeamInvite(index, e.target.value)}
                          placeholder="teammate@company.com"
                          className="flex-1"
                        />
                        {teamInvites.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeTeamInvite(index)}
                          >
                            ×
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addTeamInvite}
                    className="mt-3"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Add Another Email
                  </Button>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">What happens next?</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Team members will receive an email invitation</li>
                    <li>• They can join using the invite link in their email</li>
                    <li>• You can assign roles and permissions after they join</li>
                    <li>• You can always invite more people later from Settings</li>
                  </ul>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(3)}>
                    Back
                  </Button>
                  <Button type="submit">
                    Send Invitations
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Step 5: Completion (Create Company only)
  if (step === 5) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="h-16 w-16 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-[#111827] mb-4">
              Welcome to CRM Pro!
            </h1>
            <p className="text-[#6B7280]">
              Your company workspace has been created successfully. You&apos;re all set to start managing your customer relationships.
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#111827] mb-4">Setup Complete</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-[#10B981]" />
                      <span>Company: {companyData.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-[#10B981]" />
                      <span>Plan: {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-[#10B981]" />
                      <span>Team Invites: {teamInvites.filter(email => email.trim()).length} sent</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-[#10B981]" />
                      <span>Admin Access: Enabled</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-[#111827] mb-2">Next Steps:</h4>
                  <ul className="text-sm text-[#6B7280] space-y-1">
                    <li>• Import your existing customer data</li>
                    <li>• Set up your sales pipeline stages</li>
                    <li>• Configure integrations with your favorite tools</li>
                    <li>• Customize your dashboard and preferences</li>
                  </ul>
                </div>

                <div className="flex justify-center pt-4">
                  <Button size="lg" onClick={handleComplete}>
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
