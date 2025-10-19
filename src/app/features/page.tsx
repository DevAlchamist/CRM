import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, BarChart3, MessageSquare, Calendar, FileText, Shield, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <CardHeader>
                  <div className="h-14 w-14 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-3">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feature.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="flex items-start">
                        <div className="h-2 w-2 bg-[#10B981] rounded-full mr-3 mt-1.5 flex-shrink-0"></div>
                        <span className="text-sm text-[#6B7280]">{highlight}</span>
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
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 max-w-5xl mx-auto">
            {[
              'Gmail', 'Outlook', 'Slack', 'Teams', 'Zoom', 'Google Calendar',
              'Stripe', 'PayPal', 'QuickBooks', 'Xero', 'Mailchimp', 'HubSpot'
            ].map((tool, index) => (
              <div 
                key={index} 
                className="group hover:scale-105 transition-transform duration-200"
              >
                <div className="h-20 bg-white rounded-xl flex items-center justify-center shadow-md border border-[#E5E7EB] group-hover:shadow-lg group-hover:border-[#2563EB] transition-all duration-200">
                  <span className="text-sm font-semibold text-[#111827] px-2 text-center">{tool}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-[#6B7280] mb-4">And 100+ more integrations available</p>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">
                Request Integration
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
              Compare Plans & Features
            </h2>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              See which features are available in each plan
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {/* Mobile View - Cards */}
            <div className="block lg:hidden space-y-6">
              {['Starter', 'Professional', 'Enterprise'].map((planName) => (
                <Card key={planName} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white">
                    <CardTitle className="text-xl">{planName}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {[
                      { name: 'Customer Management', starter: true, pro: true, enterprise: true },
                      { name: 'Lead Tracking', starter: true, pro: true, enterprise: true },
                      { name: 'Basic Analytics', starter: true, pro: true, enterprise: true },
                      { name: 'Advanced Reports', starter: false, pro: true, enterprise: true },
                      { name: 'Team Collaboration', starter: '3 users', pro: '10 users', enterprise: 'Unlimited' },
                      { name: 'Task Automation', starter: false, pro: true, enterprise: true },
                      { name: 'Custom Workflows', starter: false, pro: true, enterprise: true },
                      { name: 'API Access', starter: false, pro: true, enterprise: true },
                      { name: 'Priority Support', starter: false, pro: true, enterprise: true },
                      { name: 'Custom Integrations', starter: false, pro: false, enterprise: true },
                      { name: 'Dedicated Account Manager', starter: false, pro: false, enterprise: true },
                      { name: 'White Label Option', starter: false, pro: false, enterprise: true }
                    ].map((feature, index) => {
                      const value = planName === 'Starter' ? feature.starter : planName === 'Professional' ? feature.pro : feature.enterprise;
                      return (
                        <div key={index} className="flex items-center justify-between py-3 border-b border-[#E5E7EB] last:border-0">
                          <span className="text-[#111827] text-sm">{feature.name}</span>
                          <div>
                            {typeof value === 'boolean' ? (
                              value ? (
                                <CheckCircle2 className="h-5 w-5 text-[#10B981]" />
                              ) : (
                                <span className="text-[#9CA3AF] text-xl">—</span>
                              )
                            ) : (
                              <span className="text-[#111827] font-medium text-sm">{value}</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Desktop View - Table */}
            <div className="hidden lg:block overflow-x-auto rounded-lg border border-[#E5E7EB] shadow-lg">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-gradient-to-r from-[#F9FAFB] to-white">
                    <th className="text-left py-5 px-6 font-bold text-[#111827] border-b-2 border-[#E5E7EB]">
                      Feature
                    </th>
                    <th className="text-center py-5 px-6 font-bold text-[#111827] border-b-2 border-[#E5E7EB]">
                      Starter
                    </th>
                    <th className="text-center py-5 px-6 font-bold text-[#111827] border-b-2 border-[#E5E7EB] bg-blue-50">
                      <div className="flex flex-col items-center">
                        <span>Professional</span>
                        <span className="text-xs font-normal text-[#2563EB] mt-1">Most Popular</span>
                      </div>
                    </th>
                    <th className="text-center py-5 px-6 font-bold text-[#111827] border-b-2 border-[#E5E7EB]">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Customer Management', starter: true, pro: true, enterprise: true },
                    { name: 'Lead Tracking', starter: true, pro: true, enterprise: true },
                    { name: 'Basic Analytics', starter: true, pro: true, enterprise: true },
                    { name: 'Advanced Reports', starter: false, pro: true, enterprise: true },
                    { name: 'Team Collaboration', starter: '3 users', pro: '10 users', enterprise: 'Unlimited' },
                    { name: 'Task Automation', starter: false, pro: true, enterprise: true },
                    { name: 'Custom Workflows', starter: false, pro: true, enterprise: true },
                    { name: 'API Access', starter: false, pro: true, enterprise: true },
                    { name: 'Priority Support', starter: false, pro: true, enterprise: true },
                    { name: 'Custom Integrations', starter: false, pro: false, enterprise: true },
                    { name: 'Dedicated Account Manager', starter: false, pro: false, enterprise: true },
                    { name: 'White Label Option', starter: false, pro: false, enterprise: true }
                  ].map((feature, index) => (
                    <tr key={index} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
                      <td className="py-4 px-6 text-[#111827] font-medium">{feature.name}</td>
                      <td className="py-4 px-6 text-center">
                        {typeof feature.starter === 'boolean' ? (
                          feature.starter ? (
                            <CheckCircle2 className="h-5 w-5 text-[#10B981] mx-auto" />
                          ) : (
                            <span className="text-[#9CA3AF] text-2xl">—</span>
                          )
                        ) : (
                          <span className="text-[#111827] font-medium text-sm">{feature.starter}</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center bg-blue-50/30">
                        {typeof feature.pro === 'boolean' ? (
                          feature.pro ? (
                            <CheckCircle2 className="h-5 w-5 text-[#10B981] mx-auto" />
                          ) : (
                            <span className="text-[#9CA3AF] text-2xl">—</span>
                          )
                        ) : (
                          <span className="text-[#111827] font-medium text-sm">{feature.pro}</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {typeof feature.enterprise === 'boolean' ? (
                          feature.enterprise ? (
                            <CheckCircle2 className="h-5 w-5 text-[#10B981] mx-auto" />
                          ) : (
                            <span className="text-[#9CA3AF] text-2xl">—</span>
                          )
                        ) : (
                          <span className="text-[#111827] font-medium text-sm">{feature.enterprise}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 text-center">
              <Button size="lg" asChild>
                <Link href="/pricing">
                  View Full Pricing Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
              Loved by businesses worldwide
            </h2>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              See what our customers have to say about our features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote: "The automation features have saved us countless hours each week. We can now focus on what really matters - building relationships with our customers.",
                author: "Sarah Johnson",
                role: "Sales Director",
                company: "TechCorp Inc."
              },
              {
                quote: "The analytics and reporting capabilities give us insights we never had before. We've increased our conversion rate by 35% in just 3 months.",
                author: "Michael Chen",
                role: "VP of Sales",
                company: "Growth Solutions"
              },
              {
                quote: "Integration with our existing tools was seamless. The customer support team was incredibly helpful throughout the onboarding process.",
                author: "Emily Rodriguez",
                role: "Operations Manager",
                company: "ServicePro LLC"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-4xl text-[#2563EB] mb-4">"</div>
                  <p className="text-[#6B7280] mb-6 italic">{testimonial.quote}</p>
                  <div>
                    <p className="font-semibold text-[#111827]">{testimonial.author}</p>
                    <p className="text-sm text-[#6B7280]">{testimonial.role}</p>
                    <p className="text-sm text-[#6B7280]">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-[#6B7280]">
                Have questions about our features? We've got answers.
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  question: "Can I try the features before committing to a paid plan?",
                  answer: "Absolutely! We offer a 14-day free trial with access to all Professional plan features. No credit card required."
                },
                {
                  question: "How easy is it to migrate my data from another CRM?",
                  answer: "Very easy! We provide a dedicated migration tool and our support team will help you import your customer data, leads, and interaction history from most popular CRM platforms."
                },
                {
                  question: "Can I customize the features to match my business workflow?",
                  answer: "Yes! Our platform is highly customizable. You can create custom fields, workflows, pipelines, and reports tailored to your specific business needs."
                },
                {
                  question: "Do you offer training for new users?",
                  answer: "Yes, we provide comprehensive onboarding training, video tutorials, documentation, and live webinars. Enterprise customers also get access to a dedicated account manager."
                },
                {
                  question: "Is my data secure?",
                  answer: "Security is our top priority. We use enterprise-grade encryption, regular security audits, and are fully GDPR and SOC 2 compliant. Your data is backed up daily."
                },
                {
                  question: "Can I integrate CRM Pro with my existing tools?",
                  answer: "Yes! We offer native integrations with over 100 popular business tools including Gmail, Slack, Zoom, QuickBooks, and more. We also provide a robust API for custom integrations."
                }
              ].map((faq, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start">
                      <span className="text-[#2563EB] mr-3 text-xl font-bold">Q.</span>
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#6B7280] pl-8">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-[#6B7280] mb-4">Still have questions?</p>
              <Button variant="outline" asChild>
                <Link href="/contact">
                  Contact Support
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-[#2563EB]" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
