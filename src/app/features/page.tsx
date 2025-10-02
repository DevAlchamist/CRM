import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, Target, BarChart3, MessageSquare, Calendar, FileText, Shield, Zap, ArrowRight } from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      icon: Users,
      title: 'Customer Management',
      description: 'Organize and track all your customer relationships in one place with detailed profiles, interaction history, and custom fields.',
      highlights: ['360° customer view', 'Interaction timeline', 'Custom fields', 'Bulk import/export']
    },
    {
      icon: Target,
      title: 'Lead Tracking',
      description: 'Follow leads through your sales pipeline with visual kanban boards, automated workflows, and stage-based tracking.',
      highlights: ['Visual pipeline', 'Automated workflows', 'Stage tracking', 'Probability scoring']
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reports',
      description: 'Get insights into your sales performance with detailed reports, forecasting, and real-time dashboards.',
      highlights: ['Real-time dashboards', 'Sales forecasting', 'Custom reports', 'Performance metrics']
    },
    {
      icon: MessageSquare,
      title: 'Team Collaboration',
      description: 'Communicate and collaborate with your team seamlessly with built-in messaging, activity feeds, and notifications.',
      highlights: ['Team messaging', 'Activity feeds', 'Smart notifications', 'File sharing']
    },
    {
      icon: Calendar,
      title: 'Task Management',
      description: 'Stay organized with built-in task and activity management, calendar integration, and automated reminders.',
      highlights: ['Task automation', 'Calendar sync', 'Reminder system', 'Progress tracking']
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Enterprise-grade security with data encryption, role-based access control, and compliance certifications.',
      highlights: ['Data encryption', 'Role-based access', 'Audit logs', 'GDPR compliance']
    },
    {
      icon: Zap,
      title: 'Automation',
      description: 'Automate repetitive tasks and workflows to save time and ensure consistency across your sales process.',
      highlights: ['Workflow automation', 'Email sequences', 'Lead scoring', 'Auto-assignment']
    },
    {
      icon: FileText,
      title: 'Document Management',
      description: 'Store, organize, and share documents securely with version control and access permissions.',
      highlights: ['Secure storage', 'Version control', 'Access permissions', 'Document templates']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-[#E5E7EB]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-md bg-[#2563EB] flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#111827]">CRM Pro</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-[#6B7280] hover:text-[#111827]">
                Home
              </Link>
              <Link href="/features" className="text-[#2563EB] hover:text-[#1E40AF]">
                Features
              </Link>
              <Link href="/pricing" className="text-[#6B7280] hover:text-[#111827]">
                Pricing
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-[#F9FAFB] to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#111827] mb-6">
            Powerful features for modern businesses
          </h1>
          <p className="text-xl text-[#6B7280] mb-8 max-w-3xl mx-auto">
            Everything you need to manage customers, track leads, and grow your business. 
            Our comprehensive CRM platform provides all the tools you need to streamline your sales process.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="h-12 w-12 bg-[#2563EB] rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="flex items-center text-sm text-[#6B7280]">
                        <div className="h-1.5 w-1.5 bg-[#10B981] rounded-full mr-3"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
              Integrates with your favorite tools
            </h2>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              Connect CRM Pro with the tools you already use to create a seamless workflow.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              'Gmail', 'Outlook', 'Slack', 'Teams', 'Zoom', 'Google Calendar',
              'Stripe', 'PayPal', 'QuickBooks', 'Xero', 'Mailchimp', 'HubSpot'
            ].map((tool, index) => (
              <div key={index} className="text-center">
                <div className="h-16 w-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 shadow-sm border border-[#E5E7EB]">
                  <span className="text-sm font-medium text-[#111827]">{tool}</span>
                </div>
                <p className="text-sm text-[#6B7280]">{tool}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#2563EB]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to experience these features?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start your free trial today and see how CRM Pro can transform your business.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
