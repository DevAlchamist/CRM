'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Target, 
  BarChart3, 
  MessageSquare, 
  Calendar, 
  FileText, 
  Shield, 
  Zap, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Globe,
  Lock,
  Play,
  Rocket,
  ChevronRight,
  Brain,
  Clock,
  Award,
} from 'lucide-react';

export default function FeaturesPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Intelligence',
      description: 'Complete 360° view of every customer with AI-powered insights, interaction history, and predictive analytics.',
      highlights: ['Unified customer profiles', 'AI-powered insights', 'Interaction timeline', 'Custom fields & tags'],
      bgClass: 'bg-blue-600',
      stat: '3.2x faster',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
    },
    {
      icon: Target,
      title: 'Smart Pipeline Management',
      description: 'Visual kanban boards with automated workflows, lead scoring, and stage-based tracking.',
      highlights: ['Visual pipeline', 'Auto lead scoring', 'Workflow automation', 'Probability tracking'],
      bgClass: 'bg-purple-600',
      stat: '+35% close rate',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Real-time dashboards, custom reports, and forecasting to drive data-driven decisions.',
      highlights: ['Real-time dashboards', 'Custom reports', 'Sales forecasting', 'Performance metrics'],
      bgClass: 'bg-orange-600',
      stat: 'Real-time data',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    },
    {
      icon: Zap,
      title: 'Intelligent Automation',
      description: 'No-code automation engine that streamlines repetitive tasks and workflows.',
      highlights: ['Workflow builder', 'Email sequences', 'Auto-assignment', 'Smart triggers'],
      bgClass: 'bg-green-600',
      stat: 'Save 10hrs/week',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop',
    },
    {
      icon: MessageSquare,
      title: 'Team Collaboration',
      description: 'Built-in messaging, activity feeds, and notifications to keep teams aligned.',
      highlights: ['Team messaging', 'Activity feeds', 'Smart notifications', 'File sharing'],
      bgClass: 'bg-indigo-600',
      stat: '2x faster',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption, role-based access, and compliance certifications.',
      highlights: ['End-to-end encryption', 'Role-based access', 'Audit logs', 'GDPR compliant'],
      bgClass: 'bg-teal-600',
      stat: '99.99% uptime',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
    },
  ];

  const integrations = [
    'Gmail', 'Outlook', 'Slack', 'Teams', 'Zoom', 'Google Calendar',
    'Stripe', 'PayPal', 'QuickBooks', 'Xero', 'Mailchimp', 'HubSpot',
    'Salesforce', 'Zapier', 'Shopify', 'WooCommerce', 'Intercom', 'Drift'
  ];

  const quickStats = [
    { icon: Zap, value: '<100ms', label: 'Response Time', color: 'yellow' },
    { icon: TrendingUp, value: '+23%', label: 'Revenue Growth', color: 'green' },
    { icon: Users, value: '10K+', label: 'Active Users', color: 'blue' },
    { icon: Award, value: '4.9/5', label: 'User Rating', color: 'purple' },
  ];

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

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section - Dynamic */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
          <Image
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop"
            alt="Features and analytics"
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
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30 mb-6">
                <Sparkles className="h-4 w-4 text-blue-300 animate-pulse" />
                <span className="text-sm font-medium text-blue-100">50+ Powerful Features</span>
                <TrendingUp className="h-4 w-4 text-green-400" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white leading-tight">
                Built for Teams Who
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
                    Move Fast
                  </span>
                  <span className="absolute -bottom-2 left-0 right-0 h-3 bg-blue-500/30 blur-xl"></span>
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                Everything you need to manage customers, automate workflows, and <span className="font-semibold text-white">drive revenue growth</span>—all in one powerful platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="group px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 font-semibold"
                  asChild
                >
                  <Link href="/signup" className="flex items-center">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-6 text-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300"
                  asChild
                >
                  <Link href="/pricing" className="flex items-center">
                    <Play className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Link>
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {quickStats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                >
                  <div className={`inline-flex p-3 rounded-xl ${
                    stat.color === 'yellow' ? 'bg-yellow-600/20' :
                    stat.color === 'green' ? 'bg-green-600/20' :
                    stat.color === 'blue' ? 'bg-blue-600/20' : 'bg-purple-600/20'
                  } mb-3 group-hover:scale-110 transition-transform`}>
                    <stat.icon className={`h-6 w-6 ${
                      stat.color === 'yellow' ? 'text-yellow-300' :
                      stat.color === 'green' ? 'text-green-300' :
                      stat.color === 'blue' ? 'text-blue-300' : 'text-purple-300'
                    }`} />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="h-6 w-6 text-white/60 rotate-90" />
        </div>
      </section>

      {/* Main Features Grid - Enhanced */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {mainFeatures.map((feature, index) => (
              <div 
                key={index}
                className={`fade-in opacity-0 translate-y-8 transition-all duration-700 max-w-6xl mx-auto ${
                  index % 2 === 0 ? '' : 'md:flex-row-reverse'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className={index % 2 === 0 ? '' : 'md:order-2'}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`inline-flex p-4 rounded-2xl ${feature.bgClass} transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-0">
                        {feature.stat}
                      </Badge>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    <ul className="space-y-3 mb-6">
                      {feature.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start group">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant="outline" 
                      className="group border-2 hover:bg-gray-50"
                      asChild
                    >
                      <Link href="/signup" className="flex items-center">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                  <div className={`relative rounded-3xl overflow-hidden shadow-2xl group hover:scale-105 transition-transform duration-300 ${index % 2 === 0 ? '' : 'md:order-1'}`}>
                    <div className="aspect-video relative">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    {/* Floating Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-semibold text-gray-900">
                      Live Preview
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in opacity-0 translate-y-8 transition-all duration-700">
            <Badge className="mb-4 px-4 py-1 bg-blue-100 text-blue-700 border-0">
              Complete Solution
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Everything You Need in <span className="text-blue-600">One Platform</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help you succeed
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Calendar, title: 'Calendar & Scheduling', description: 'Smart scheduling with calendar sync and meeting reminders', color: 'blue' },
              { icon: FileText, title: 'Document Management', description: 'Secure storage with version control and access permissions', color: 'purple' },
              { icon: TrendingUp, title: 'Revenue Tracking', description: 'Real-time revenue analytics and forecasting', color: 'green' },
              { icon: Globe, title: 'Multi-Language', description: 'Support for 50+ languages and currencies', color: 'orange' },
              { icon: Lock, title: 'Data Privacy', description: 'Full control over your data with export and deletion options', color: 'red' },
              { icon: Zap, title: 'API Access', description: 'RESTful API for custom integrations and automation', color: 'yellow' },
            ].map((feature, index) => (
              <Card 
                key={index}
                className="fade-in opacity-0 translate-y-8 transition-all duration-700 border-0 shadow-lg hover:shadow-2xl bg-white group relative overflow-hidden"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardContent className="p-8 relative">
                  <div className={`inline-flex p-4 rounded-xl ${
                    feature.color === 'blue' ? 'bg-blue-600' :
                    feature.color === 'purple' ? 'bg-purple-600' :
                    feature.color === 'green' ? 'bg-green-600' :
                    feature.color === 'orange' ? 'bg-orange-600' :
                    feature.color === 'red' ? 'bg-red-600' : 'bg-yellow-600'
                  } mb-4 transform group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section - Enhanced */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in opacity-0 translate-y-8 transition-all duration-700">
            <Badge className="mb-4 px-4 py-1 bg-purple-100 text-purple-700 border-0">
              Integrations
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Connect <span className="text-purple-600">Everything</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Seamlessly integrate with 100+ popular business tools
            </p>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4 max-w-6xl mx-auto">
            {integrations.map((tool, index) => (
              <Card 
                key={index}
                className="fade-in opacity-0 translate-y-8 transition-all duration-700 border-0 shadow-md hover:shadow-xl bg-white group cursor-pointer hover:scale-105"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-6 flex items-center justify-center h-24">
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                    {tool}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12 fade-in opacity-0 translate-y-8 transition-all duration-700">
            <p className="text-gray-600 mb-6">And 100+ more integrations available</p>
            <Button variant="outline" size="lg" className="group border-2 hover:bg-gray-50" asChild>
              <Link href="/contact" className="flex items-center">
                Request Integration
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section - Dynamic */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop"
            alt="Get started with CRM"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center fade-in opacity-0 translate-y-8 transition-all duration-700 relative z-10">
            <Rocket className="h-16 w-16 text-blue-400 mx-auto mb-6 animate-bounce" />
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">Transform</span> Your Business?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Start your free trial today and see how CRM Pro can transform your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="group px-8 py-6 text-lg bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold"
                asChild
              >
                <Link href="/signup" className="flex items-center">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-6 text-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300"
                asChild
              >
                <Link href="/pricing">View Pricing</Link>
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