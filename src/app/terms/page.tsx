'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, FileText, Shield, AlertCircle, CheckCircle2, XCircle, ArrowRight, Scale } from 'lucide-react';

export default function TermsPage() {
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
      icon: FileText,
      title: 'Agreement to Terms',
      content: 'By accessing and using CRM Pro ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.',
    },
    {
      icon: Shield,
      title: 'User Accounts',
      content: [
        'When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.',
        'You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you without appropriate authorization, or a name that is otherwise offensive, vulgar or obscene.',
      ],
    },
    {
      icon: Scale,
      title: 'Subscription and Billing',
      content: [
        'Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set either on a monthly or annual basis, depending on the type of subscription plan you select.',
        'At the end of each Billing Cycle, your Subscription will automatically renew under the exact same conditions unless you cancel it or CRM Pro cancels it. You may cancel your Subscription renewal either through your online account management page or by contacting our customer support team.',
      ],
    },
    {
      icon: CheckCircle2,
      title: 'Data and Privacy',
      content: [
        'You retain ownership of all data you input into the Service. We will not use your data for any purpose other than to provide the Service to you and to improve our Service. We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction.',
        'For more information about how we collect, use, and protect your information, please review our Privacy Policy.',
      ],
    },
    {
      icon: XCircle,
      title: 'Prohibited Uses',
      content: 'You may not use our Service:',
      items: [
        'For any unlawful purpose or to solicit others to perform unlawful acts',
        'To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances',
        'To infringe upon or violate our intellectual property rights or the intellectual property rights of others',
        'To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate',
        'To submit false or misleading information',
        'To upload or transmit viruses or any other type of malicious code',
      ],
    },
    {
      icon: AlertCircle,
      title: 'Termination',
      content: 'We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms. If you wish to terminate your account, you may simply discontinue using the Service.',
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
              <FileText className="h-3 w-3 mr-2" />
              Terms of Service
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Terms of Service
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-6 max-w-3xl mx-auto leading-relaxed">
              Last updated: December 1, 2024
            </p>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Please read these terms carefully before using our service.
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
                    
                    {typeof section.content === 'string' ? (
                      <p className="text-gray-700 leading-relaxed">{section.content}</p>
                    ) : Array.isArray(section.content) ? (
                      <div className="space-y-4">
                        {section.content.map((paragraph, pIndex) => (
                          <p key={pIndex} className="text-gray-700 leading-relaxed">{paragraph}</p>
                        ))}
                      </div>
                    ) : null}
                    
                    {section.items && (
                      <ul className="space-y-3 ml-6 mt-4">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-gray-700 leading-relaxed flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}

            {/* Additional Sections */}
            <div className="fade-in opacity-0 translate-y-8 transition-all duration-700 space-y-6">
              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Use License</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Permission is granted to temporarily download one copy of CRM Pro per device for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="space-y-3 ml-6">
                    {['modify or copy the materials', 'use the materials for any commercial purpose or for any public display (commercial or non-commercial)', 'attempt to decompile or reverse engineer any software contained on CRM Pro\'s web site', 'remove any copyright or other proprietary notations from the materials'].map((item, index) => (
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Disclaimer</h2>
                  <p className="text-gray-700 leading-relaxed">
                    The information on this web site is provided on an &quot;as is&quot; basis. To the fullest extent permitted by law, this Company excludes all representations, warranties, conditions and terms relating to our web site and the use of this web site. Nothing in this disclaimer will limit or exclude our or your liability for death or personal injury, fraud, or any other liability that cannot be excluded or limited by applicable law.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Governing Law</h2>
                  <p className="text-gray-700 leading-relaxed">
                    These Terms shall be interpreted and governed by the laws of the State of California, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">10. Changes to Terms</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    If you have any questions about these Terms of Service, please contact us at:
                  </p>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <p className="text-gray-900 font-medium">
                      Email: legal@crmpro.com<br />
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
              Questions About Terms?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Our team is here to help. Contact us if you have any questions about our terms of service.
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
