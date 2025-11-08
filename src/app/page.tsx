'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Check, 
  Star, 
  Users, 
  Target, 
  BarChart3, 
  Shield, 
  Zap,
  MessageSquare,
  TrendingUp,
  Globe,
  Award,
  Sparkles,
  Building2,
  Play,
  ChevronRight,
  Rocket,
  Brain,
} from 'lucide-react';

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [stats, setStats] = useState({ companies: 0, countries: 0, uptime: 0, rating: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animated counter
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = 100 / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      const progress = Math.min(current / 100, 1);
      
      setStats({
        companies: Math.floor(10000 * progress),
        countries: Math.floor(150 * progress),
        uptime: 99.9 * progress,
        rating: 4.9 * progress,
      });

      if (progress >= 1) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const coreFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Get intelligent recommendations and predictions that help you make better decisions faster.',
      bgClass: 'bg-blue-600',
      badgeClass: 'bg-blue-100 text-blue-700',
      stats: '3.2x faster decisions',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built for speed. Real-time updates, instant search, and seamless performance.',
      bgClass: 'bg-yellow-600',
      badgeClass: 'bg-yellow-100 text-yellow-700',
      stats: '<100ms response',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption, SOC 2 compliant, and GDPR ready. Your data is always safe.',
      bgClass: 'bg-green-600',
      badgeClass: 'bg-green-100 text-green-700',
      stats: '99.99% uptime',
    },
    {
      icon: TrendingUp,
      title: 'Revenue Growth',
      description: 'Proven to increase revenue by 23% on average. Track ROI with real-time analytics.',
      bgClass: 'bg-purple-600',
      badgeClass: 'bg-purple-100 text-purple-700',
      stats: '+23% revenue',
    },
  ];

  const benefits = [
    { stat: `${stats.companies.toLocaleString()}+`, label: 'Active Companies', icon: Building2, colorClass: 'text-blue-300', bgClass: 'bg-blue-600/20' },
    { stat: `${stats.countries}+`, label: 'Countries Served', icon: Globe, colorClass: 'text-purple-300', bgClass: 'bg-purple-600/20' },
    { stat: `${stats.uptime.toFixed(1)}%`, label: 'Uptime SLA', icon: Shield, colorClass: 'text-green-300', bgClass: 'bg-green-600/20' },
    { stat: `${stats.rating.toFixed(1)}/5`, label: 'Customer Rating', icon: Award, colorClass: 'text-orange-300', bgClass: 'bg-orange-600/20' },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'VP of Sales',
      company: 'TechFlow Inc.',
      content: 'We\'ve seen a 40% increase in conversion rates since implementing CRM Pro. The automation features are game-changing.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      growth: '+40%',
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Founder & CEO',
      company: 'ScaleUp Ventures',
      content: 'The analytics dashboard gives us insights we never had before. Our team collaboration has improved dramatically.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      growth: '+62%',
    },
    {
      name: 'Priya Patel',
      role: 'Operations Director',
      company: 'Growth Dynamics',
      content: 'Implementation was seamless, and our team was up and running in days. The support team is incredibly responsive.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      growth: '+28%',
    },
  ];

  const useCases = [
    { icon: Users, title: 'Sales Teams', metric: 'Close 35% more deals' },
    { icon: MessageSquare, title: 'Support Teams', metric: 'Respond 2x faster' },
    { icon: Target, title: 'Marketing Teams', metric: 'Increase ROI by 45%' },
    { icon: BarChart3, title: 'Executives', metric: 'Real-time insights' },
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
      {/* Hero Section - Dynamic & Catchy */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background with Parallax */}
        <div className="absolute inset-0" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
          <Image
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop"
            alt="Business team collaboration"
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
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30 mb-4">
                  <Sparkles className="h-4 w-4 text-blue-300 animate-pulse" />
                  <span className="text-sm font-medium text-blue-100">Trusted by 10,000+ companies worldwide</span>
                  <TrendingUp className="h-4 w-4 text-green-400" />
                </div>
                
                <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
                  Stop Losing
                  <br />
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent animate-pulse">
                      Deals
                    </span>
                    <span className="absolute -bottom-2 left-0 right-0 h-3 bg-blue-500/30 blur-xl"></span>
                  </span>
                  <br />
                  Start Winning
                </h1>
                
                <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  The CRM that actually works. Built for teams who want to <span className="font-semibold text-white">close more deals</span> and <span className="font-semibold text-white">grow faster</span>.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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
                    <Link href="/features" className="flex items-center">
                      <Play className="mr-2 h-5 w-5" />
                      Watch Demo
                    </Link>
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start pt-4">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-400" />
                    <span className="text-sm text-blue-200">No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-400" />
                    <span className="text-sm text-blue-200">14-day free trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-400" />
                    <span className="text-sm text-blue-200">Setup in 5 minutes</span>
                  </div>
                </div>
              </div>

              {/* Right - Interactive Dashboard Preview */}
              <div className="relative hidden lg:block">
                <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  {/* Mock Dashboard */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-4 w-24 bg-white/20 rounded"></div>
                      <div className="h-4 w-16 bg-white/20 rounded"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white/10 rounded-lg p-3 border border-white/20">
                          <div className="h-2 w-12 bg-white/30 rounded mb-2"></div>
                          <div className="h-6 w-16 bg-white/40 rounded"></div>
                        </div>
                      ))}
                    </div>
                    <div className="h-32 bg-white/10 rounded-lg border border-white/20 p-4">
                      <div className="flex items-end gap-2 h-full">
                        {[65, 80, 55, 90, 75, 85].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t"
                            style={{ height: `${h}%` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Stats */}
                  <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-bounce">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-bold">+23% Revenue</span>
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-bold">1,247 Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Row - Animated */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-5xl mx-auto">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                >
                  <div className={`inline-flex p-3 rounded-xl ${benefit.bgClass} mb-3 group-hover:scale-110 transition-transform`}>
                    <benefit.icon className={`h-6 w-6 ${benefit.colorClass}`} />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{benefit.stat}</div>
                  <div className="text-sm text-blue-200">{benefit.label}</div>
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

      {/* Use Cases - Quick Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div className="inline-flex p-3 rounded-xl bg-blue-100 mb-4 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                  <useCase.icon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-sm text-gray-600">{useCase.metric}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features - Enhanced */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in opacity-0 translate-y-8 transition-all duration-700">
            <Badge className="mb-4 px-4 py-1 bg-blue-100 text-blue-700 border-0">
              Why Choose Us
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Built for <span className="text-blue-600">Modern Teams</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to close more deals, faster
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {coreFeatures.map((feature, index) => (
              <Card 
                key={index}
                className="fade-in opacity-0 translate-y-8 transition-all duration-700 border-0 shadow-lg hover:shadow-2xl group overflow-hidden bg-white relative"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardContent className="p-8 relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`inline-flex p-4 rounded-2xl ${feature.bgClass} mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <Badge className={feature.badgeClass}>
                      {feature.stats}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  <Link href="/features" className="inline-flex items-center text-blue-600 font-medium mt-4 group-hover:translate-x-2 transition-transform">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in opacity-0 translate-y-8 transition-all duration-700">
            <div className="inline-flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="text-lg font-semibold text-gray-900">4.9/5 from 2,500+ reviews</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Join Thousands of <span className="text-blue-600">Happy Customers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See why companies choose CRM Pro to grow their business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="fade-in opacity-0 translate-y-8 transition-all duration-700 border-0 shadow-lg hover:shadow-xl bg-white relative overflow-hidden group"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardContent className="p-8 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-0">
                      {testimonial.growth}
                    </Badge>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed italic text-lg">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="flex items-center">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 ring-2 ring-blue-200">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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
              Ready to <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">Grow Faster</span>?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join thousands of companies already using CRM Pro to drive growth and build stronger customer relationships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="px-8 py-6 text-lg bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold group"
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