'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Shield, Lock, Eye, Database, Globe, FileText, ArrowRight } from 'lucide-react';

export default function PrivacyPage() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        {
          subtitle: 'Personal Information',
          text: 'We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.',
          items: [
            'Name and email address',
            'Company information and job title',
            'Phone number and billing address',
            'Profile picture and preferences',
          ],
        },
        {
          subtitle: 'Usage Information',
          text: 'We automatically collect certain information when you use our services.',
          items: [
            'Log data (IP address, browser type, pages visited)',
            'Device information and operating system',
            'Cookies and similar tracking technologies',
            'Feature usage and performance data',
          ],
        },
      ],
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        {
          text: 'We use the information we collect to provide, maintain, and improve our services:',
          items: [
            'Provide and maintain the CRM service',
            'Process transactions and send related information',
            'Send technical notices and support messages',
            'Respond to your comments and questions',
            'Improve our products and services',
            'Develop new features and functionality',
            'Monitor and analyze trends and usage',
          ],
        },
      ],
    },
    {
      icon: Shield,
      title: 'Data Security',
      content: [
        {
          text: 'We implement appropriate technical and organizational measures to protect your personal information:',
          items: [
            'Encryption of data in transit and at rest',
            'Regular security assessments and updates',
            'Access controls and authentication',
            'Employee training on data protection',
            'Incident response procedures',
          ],
        },
      ],
    },
    {
      icon: Lock,
      title: 'Your Rights',
      content: [
        {
          text: 'Depending on your location, you may have certain rights regarding your personal information:',
          items: [
            'Access to your personal information',
            'Correction of inaccurate information',
            'Deletion of your personal information',
            'Restriction of processing',
            'Data portability',
            'Objection to processing',
            'Withdrawal of consent',
          ],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">CRM Pro</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-2" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="mb-6 px-4 py-1.5 bg-white/20 text-white border-0 backdrop-blur-sm">
              <Shield className="h-3 w-3 mr-2" />
              Privacy Policy
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Your Privacy Matters
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-6 max-w-3xl mx-auto leading-relaxed">
              Last updated: December 1, 2024
            </p>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              We are committed to protecting your privacy and ensuring the security of your personal information.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {sections.map((section, sectionIndex) => (
              <div 
                key={sectionIndex}
                className="fade-in opacity-0 translate-y-8 transition-all duration-700 mb-16"
                style={{ transitionDelay: `${sectionIndex * 100}ms` }}
              >
                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 mr-4">
                        <section.icon className="h-6 w-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">{sectionIndex + 1}. {section.title}</h2>
                    </div>
                    
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex} className="mb-6 last:mb-0">  
                        {'subtitle' in item && item.subtitle && (
                          <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.subtitle}</h3>
                        )}
                        {item.text && (
                          <p className="text-gray-700 leading-relaxed mb-4">{item.text}</p>
                        )}
                        {item.items && (
                          <ul className="space-y-2 ml-6">
                            {item.items.map((listItem, listIndex) => (
                              <li key={listIndex} className="text-gray-700 leading-relaxed flex items-start">
                                <span className="text-blue-600 mr-2">•</span>
                                <span>{listItem}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            ))}

            {/* Additional Sections */}
            <div className="fade-in opacity-0 translate-y-8 transition-all duration-700 space-y-6">
              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Information Sharing</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
                  </p>
                  <ul className="space-y-2 ml-6">
                    {['With your explicit consent', 'To service providers who assist us in operating our platform', 'When required by law or to protect our rights', 'In connection with a business transfer or acquisition'].map((item, index) => (
                      <li key={index} className="text-gray-700 leading-relaxed flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. When you delete your account, we will delete or anonymize your personal information, except where we are required to retain it for legal or regulatory purposes.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We use cookies and similar tracking technologies to enhance your experience on our platform. You can control cookie settings through your browser preferences.
                  </p>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Types of Cookies We Use:</h3>
                  <ul className="space-y-2 ml-6">
                    {['Essential cookies (required for platform functionality)', 'Analytics cookies (help us understand usage patterns)', 'Preference cookies (remember your settings)', 'Marketing cookies (for targeted advertising)'].map((item, index) => (
                      <li key={index} className="text-gray-700 leading-relaxed flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">8. International Data Transfers</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your personal information in accordance with applicable data protection laws.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Children&apos;s Privacy</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. You are advised to review this Privacy Policy periodically for any changes.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <p className="text-gray-900 font-medium">
                      Email: privacy@crmpro.com<br />
                      Address: 123 Business Avenue, Suite 100, San Francisco, CA 94105<br />
                      Phone: +1 (555) 123-4567
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white fade-in opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Questions About Privacy?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Our team is here to help. Contact us if you have any questions about our privacy practices.
            </p>
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg bg-white text-blue-600 hover:bg-gray-100 shadow-xl font-semibold"
              asChild
            >
              <Link href="/contact">
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
