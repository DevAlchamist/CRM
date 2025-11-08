'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Play, Users, FileText, Calendar, ExternalLink, ArrowRight, Sparkles, TrendingUp, Zap, ChevronRight, Rocket } from 'lucide-react';

export default function ResourcesPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const resources = [
    {
      type: 'guide',
      title: 'Getting Started with CRM Pro',
      description: 'Complete guide to setting up your CRM and importing your first customers.',
      category: 'Getting Started',
      readTime: '5 min read',
      icon: BookOpen,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      type: 'case-study',
      title: 'How TechCorp Increased Sales by 40%',
      description: 'Learn how a growing tech company streamlined their sales process and boosted revenue.',
      category: 'Case Study',
      readTime: '8 min read',
      icon: Users,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      type: 'webinar',
      title: 'Advanced Lead Scoring Techniques',
      description: 'Join our expert webinar on implementing effective lead scoring strategies.',
      category: 'Webinar',
      readTime: '60 min',
      icon: Play,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      type: 'guide',
      title: 'CRM Best Practices for Small Teams',
      description: 'Essential tips and strategies for small teams to maximize CRM effectiveness.',
      category: 'Best Practices',
      readTime: '6 min read',
      icon: FileText,
      gradient: 'from-orange-500 to-red-500',
    },
    {
      type: 'webinar',
      title: 'Integrating Your CRM with Marketing Tools',
      description: 'Learn how to connect CRM Pro with your favorite marketing automation platforms.',
      category: 'Integration',
      readTime: '45 min',
      icon: Zap,
      gradient: 'from-indigo-500 to-blue-500',
    },
    {
      type: 'case-study',
      title: 'Healthcare Practice Management Success',
      description: 'See how a medical practice improved patient relationships and reduced overhead.',
      category: 'Case Study',
      readTime: '7 min read',
      icon: TrendingUp,
      gradient: 'from-teal-500 to-cyan-500',
    },
  ];

  const categories = [
    { name: 'All', count: resources.length },
    { name: 'Getting Started', count: 3 },
    { name: 'Best Practices', count: 5 },
    { name: 'Case Studies', count: 8 },
    { name: 'Webinars', count: 12 },
    { name: 'Integrations', count: 6 },
    { name: 'API Documentation', count: 15 }
  ];

  const upcomingWebinars = [
    {
      title: 'CRM Automation for Sales Teams',
      date: 'December 15, 2024',
      time: '2:00 PM EST',
      speaker: 'Sarah Johnson, Sales Expert',
    },
    {
      title: 'Data Migration Best Practices',
      date: 'December 20, 2024',
      time: '3:00 PM EST',
      speaker: 'Mike Chen, Technical Lead',
    },
    {
      title: 'Customer Retention Strategies',
      date: 'January 5, 2025',
      time: '1:00 PM EST',
      speaker: 'Emily Rodriguez, Customer Success',
    },
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Getting Started': return 'bg-blue-100 text-blue-700';
      case 'Case Study': return 'bg-green-100 text-green-700';
      case 'Webinar': return 'bg-purple-100 text-purple-700';
      case 'Best Practices': return 'bg-orange-100 text-orange-700';
      case 'Integration': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section - Dynamic */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop"
            alt="Resources and learning"
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
                <span className="text-sm font-medium text-blue-100">Resources & Learning</span>
                <TrendingUp className="h-4 w-4 text-green-400" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white leading-tight">
                Master <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
                    CRM Pro
                  </span>
                  <span className="absolute -bottom-2 left-0 right-0 h-3 bg-blue-500/30 blur-xl"></span>
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                Everything you need to master CRM Pro and grow your business. 
                From <span className="font-semibold text-white">getting started guides</span> to <span className="font-semibold text-white">advanced strategies</span>.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <BookOpen className="h-4 w-4 text-green-400" />
                  <span className="text-blue-100">50+ Guides</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <Play className="h-4 w-4 text-green-400" />
                  <span className="text-blue-100">Video Tutorials</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <Zap className="h-4 w-4 text-green-400" />
                  <span className="text-blue-100">Free Resources</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="h-6 w-6 text-white/60 rotate-90" />
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white border-b border-gray-200 -mt-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Badge
                key={category.name}
                variant={category.name === 'All' ? 'default' : 'secondary'}
                className="px-6 py-2 text-sm cursor-pointer hover:bg-blue-600 hover:text-white transition-all duration-300 border-2"
              >
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Resources */}
            <section className="mb-16 fade-in opacity-0 translate-y-8 transition-all duration-700">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Resources</h2>
                  <p className="text-gray-600">Hand-picked content to help you succeed</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.slice(0, 4).map((resource, index) => (
                  <Card 
                    key={index} 
                    className="fade-in opacity-0 translate-y-8 transition-all duration-700 border-0 shadow-lg hover:shadow-xl cursor-pointer group bg-white"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${resource.gradient} transform group-hover:scale-110 transition-transform duration-300`}>
                          <resource.icon className="h-6 w-6 text-white" />
                        </div>
                        <Badge className={`text-xs ${getCategoryColor(resource.category)} border-0`}>
                          {resource.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl mb-2 group-hover:text-blue-600 transition-colors">{resource.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {resource.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{resource.readTime}</span>
                        <Link href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center group-hover:underline">
                          Read More
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* All Resources */}
            <section className="fade-in opacity-0 translate-y-8 transition-all duration-700">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">All Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((resource, index) => (
                  <Card 
                    key={index} 
                    className="fade-in opacity-0 translate-y-8 transition-all duration-700 border-0 shadow-md hover:shadow-lg cursor-pointer group bg-white"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${resource.gradient}`}>
                          <resource.icon className="h-6 w-6 text-white" />
                        </div>
                        <Badge className={`text-xs ${getCategoryColor(resource.category)} border-0`}>
                          {resource.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg mb-2 group-hover:text-blue-600 transition-colors">{resource.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {resource.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{resource.readTime}</span>
                        <Link href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                          Read More
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upcoming Webinars */}
            <Card className="fade-in opacity-0 translate-y-8 transition-all duration-700 border-0 shadow-lg bg-white" style={{ transitionDelay: '200ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Upcoming Webinars
                </CardTitle>
                <CardDescription>
                  Join our live sessions with CRM experts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingWebinars.map((webinar, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900 mb-1">{webinar.title}</h4>
                    <p className="text-sm text-gray-600 mb-1">{webinar.speaker}</p>
                    <p className="text-sm text-gray-500">{webinar.date} at {webinar.time}</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full border-2" asChild>
                  <Link href="#">View All Webinars</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="fade-in opacity-0 translate-y-8 transition-all duration-700 border-0 shadow-lg bg-white" style={{ transitionDelay: '300ms' }}>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/features" className="flex items-center text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Feature Overview
                </Link>
                <Link href="/pricing" className="flex items-center text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Pricing Plans
                </Link>
                <Link href="/contact" className="flex items-center text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Contact Support
                </Link>
                <Link href="/signup" className="flex items-center text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Start Free Trial
                </Link>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="fade-in opacity-0 translate-y-8 transition-all duration-700 border-0 shadow-lg bg-white" style={{ transitionDelay: '400ms' }}>
              <CardHeader>
                <CardTitle>Stay Updated</CardTitle>
                <CardDescription>
                  Get the latest resources and tips delivered to your inbox
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section - Dynamic */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop"
            alt="Get started"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center fade-in opacity-0 translate-y-8 transition-all duration-700 relative z-10">
            <Rocket className="h-16 w-16 text-blue-400 mx-auto mb-6 animate-bounce" />
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Put These <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">Resources</span> into Practice?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Start your free trial today and experience the power of CRM Pro.
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
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
