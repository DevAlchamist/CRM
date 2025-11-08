'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, Sparkles, HelpCircle, Rocket, TrendingUp, Shield, Zap, ChevronRight } from 'lucide-react';
import { subscriptionPlans } from '@/data/demo';

export default function PricingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const faqs = [
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
    },
    {
      question: 'Is there a setup fee?',
      answer: 'No, there are no setup fees or hidden costs. You only pay the monthly subscription fee.',
    },
    {
      question: 'What happens to my data if I cancel?',
      answer: 'Your data is safe with us. You can export all your data before canceling, and we&apos;ll keep it for 30 days in case you want to reactivate.',
    },
    {
      question: 'Do you offer custom enterprise plans?',
      answer: 'Yes, we offer custom enterprise solutions with dedicated support, custom integrations, and tailored features. Contact our sales team for more information.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans.',
    },
    {
      question: 'Can I get a refund?',
      answer: 'Yes, we offer a 30-day money-back guarantee. If you&apos;re not satisfied, we&apos;ll refund your payment with no questions asked.',
    },
  ];

  const trustFactors = [
    { icon: Shield, text: '30-day money-back guarantee' },
    { icon: Zap, text: 'No setup fees' },
    { icon: TrendingUp, text: 'Cancel anytime' },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section - Dynamic */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop"
            alt="Pricing plans"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/90 via-blue-800/80 to-blue-900/90"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30 mb-6">
                <Sparkles className="h-4 w-4 text-blue-300 animate-pulse" />
                <span className="text-sm font-medium text-blue-100">14-Day Free Trial • No Credit Card Required</span>
                <TrendingUp className="h-4 w-4 text-green-400" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white leading-tight">
                Simple, Transparent
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
                    Pricing
                  </span>
                  <span className="absolute -bottom-2 left-0 right-0 h-3 bg-blue-500/30 blur-xl"></span>
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Choose the plan that&apos;s right for your business. <span className="font-semibold text-white">All plans include a 14-day free trial</span> with no credit card required.
              </p>

              {/* Billing Toggle */}
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20 mb-8">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    billingCycle === 'monthly'
                      ? 'bg-white text-blue-600 font-semibold'
                      : 'text-white hover:text-blue-200'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-6 py-2 rounded-full transition-all duration-300 relative ${
                    billingCycle === 'yearly'
                      ? 'bg-white text-blue-600 font-semibold'
                      : 'text-white hover:text-blue-200'
                  }`}
                >
                  Yearly
                  <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5">
                    Save 20%
                  </Badge>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                {trustFactors.map((factor, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                    <factor.icon className="h-4 w-4 text-green-400" />
                    <span className="text-blue-100">{factor.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="h-6 w-6 text-white/60 rotate-90" />
        </div>
      </section>

      {/* Pricing Cards - Enhanced */}
      <section className="py-24 bg-white -mt-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {subscriptionPlans.map((plan, index) => {
              const monthlyPrice = plan.price;
              const yearlyPrice = Math.floor(monthlyPrice * 12 * 0.8); // 20% discount
              const displayPrice = billingCycle === 'monthly' ? monthlyPrice : Math.floor(yearlyPrice / 12);
              
              return (
                <Card 
                  key={plan.id}
                  className={`fade-in opacity-0 translate-y-8 transition-all duration-700 relative flex flex-col h-full border-2 group hover:scale-105 ${
                    plan.isPopular 
                      ? 'border-blue-500 shadow-2xl scale-105 bg-gradient-to-br from-blue-50 to-white' 
                      : 'border-gray-200 shadow-lg hover:shadow-xl bg-white'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
                      <Badge className="bg-blue-600 text-white px-4 py-1 text-xs font-semibold shadow-lg">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-8 pt-8">
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
                      {plan.name}
                    </CardTitle>
                    <div className="mb-4">
                      <div className="flex items-end justify-center gap-1">
                        <span className="text-5xl font-bold text-gray-900">
                          ${displayPrice}
                        </span>
                        <span className="text-lg text-gray-600 mb-2">/month</span>
                      </div>
                      {billingCycle === 'yearly' && plan.price > 0 && (
                        <p className="text-sm text-green-600 font-semibold mt-2">
                          Save ${(monthlyPrice * 12 - yearlyPrice).toLocaleString()}/year
                        </p>
                      )}
                      {plan.price > 0 && (
                        <p className="text-sm text-gray-500 mt-2">
                          {billingCycle === 'monthly' ? 'Billed monthly' : 'Billed annually'}
                        </p>
                      )}
                    </div>
                    <CardDescription className="text-base text-gray-600 min-h-[3rem] flex items-center justify-center">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col pt-0">
                    <ul className="space-y-4 mb-8 flex-1">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start group/item">
                          <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full group/btn hover:scale-105 transition-transform mb-3 ${
                        plan.isPopular 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg' 
                          : 'border-2'
                      }`}
                      variant={plan.isPopular ? 'default' : 'outline'}
                      size="lg"
                      asChild
                    >
                      <Link href="/signup" className="flex items-center justify-center">
                        {plan.price === 0 ? 'Get Started Free' : 'Start Free Trial'}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    {plan.price > 0 && (
                      <p className="text-xs text-center text-gray-500">
                        14-day free trial included
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Enterprise CTA - Enhanced */}
          <div className="mt-16 max-w-4xl mx-auto fade-in opacity-0 translate-y-8 transition-all duration-700">
            <Card className="border-2 border-gray-200 shadow-xl bg-gradient-to-br from-gray-50 to-white overflow-hidden group hover:shadow-2xl transition-all">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative h-64 md:h-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop"
                    alt="Enterprise Solution"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-blue-600/80"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Rocket className="h-16 w-16 text-white animate-bounce" />
                  </div>
                </div>
                <CardContent className="p-8">
                  <Badge className="mb-4 bg-blue-600 text-white">Enterprise</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Need a Custom Solution?
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Contact us for custom enterprise plans with dedicated support, 
                    custom integrations, and tailored features for your organization.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" variant="outline" className="group border-2 hover:bg-gray-50" asChild>
                      <Link href="/contact" className="flex items-center">
                        Contact Sales
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="ghost" asChild>
                      <Link href="/features">View All Features</Link>
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 fade-in opacity-0 translate-y-8 transition-all duration-700">
              <div className="inline-flex p-4 rounded-2xl bg-blue-600 mb-4">
                <HelpCircle className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                Frequently Asked <span className="text-blue-600">Questions</span>
              </h2>
              <p className="text-lg text-gray-600">
                Everything you need to know about our pricing
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <Card 
                  key={index}
                  className="fade-in opacity-0 translate-y-8 transition-all duration-700 border-0 shadow-lg hover:shadow-xl bg-white group relative overflow-hidden"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <CardHeader className="relative">
                    <CardTitle className="text-lg flex items-start gap-3">
                      <span className="text-blue-600 font-bold text-xl">Q.</span>
                      <span>{faq.question}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-gray-600 leading-relaxed pl-8">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12 fade-in opacity-0 translate-y-8 transition-all duration-700">
              <p className="text-gray-600 mb-6">Still have questions?</p>
              <Button variant="outline" size="lg" className="group border-2 hover:bg-gray-50" asChild>
                <Link href="/contact" className="flex items-center">
                  Contact Support
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Dynamic */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&h=1080&fit=crop"
            alt="Start your free trial"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center fade-in opacity-0 translate-y-8 transition-all duration-700 relative z-10">
            <Rocket className="h-16 w-16 text-blue-400 mx-auto mb-6 animate-bounce" />
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">Get Started</span>?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join thousands of companies already using CRM Pro to grow their business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="group px-8 py-6 text-lg bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold"
                asChild
              >
                <Link href="/signup" className="flex items-center">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-6 text-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300"
                asChild
              >
                <Link href="/contact">Schedule Demo</Link>
              </Button>
            </div>
            <p className="text-sm text-blue-200 mt-6">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}