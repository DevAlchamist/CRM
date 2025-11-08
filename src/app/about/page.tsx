'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Users, 
  Target, 
  Award, 
  Rocket, 
  Heart, 
  Shield, 
  Globe,
  CheckCircle2,
  Lightbulb,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const values = [
    {
      icon: Users,
      title: 'Customer-Centric',
      description: 'Every decision we make starts with our customers. Their success is our mission.',
      color: 'bg-blue-500',
    },
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'We measure success by the value we deliver and the growth we enable.',
      color: 'bg-purple-500',
    },
    {
      icon: Lightbulb,
      title: 'Innovation First',
      description: 'Constantly pushing boundaries to deliver cutting-edge solutions.',
      color: 'bg-yellow-500',
    },
    {
      icon: Heart,
      title: 'Integrity Always',
      description: 'Transparent, honest, and ethical in everything we do.',
      color: 'bg-red-500',
    },
    {
      icon: Shield,
      title: 'Security & Trust',
      description: 'Your data is sacred. We protect it with enterprise-grade security.',
      color: 'bg-green-500',
    },
    {
      icon: Rocket,
      title: 'Continuous Growth',
      description: 'We evolve with the market, always learning and improving.',
      color: 'bg-pink-500',
    },
  ];

  const milestones = [
    { year: '2018', title: 'The Beginning', description: 'Founded with a vision to revolutionize CRM', achievement: '1st customer' },
    { year: '2019', title: 'First Milestone', description: 'Reached 1,000 active users', achievement: 'Series Seed' },
    { year: '2021', title: 'Major Growth', description: 'Expanded globally with 50+ countries', achievement: 'Series A' },
    { year: '2023', title: 'AI Integration', description: 'Launched AI-powered features', achievement: '10K users' },
    { year: '2024', title: 'Today', description: 'Serving 10,000+ companies worldwide', achievement: 'Market leader' },
  ];

  const team = [
    { name: 'Alexandra Chen', role: 'CEO & Co-Founder', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
    { name: 'Michael Torres', role: 'CTO & Co-Founder', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
    { name: 'Sofia Martinez', role: 'Head of Product', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
    { name: 'David Kim', role: 'Head of Engineering', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
    { name: 'Emma Wilson', role: 'Head of Customer Success', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop' },
    { name: 'James Anderson', role: 'Head of Design', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
  ];

  const stats = [
    { number: '50,000+', label: 'Active Users', icon: Users },
    { number: '150+', label: 'Countries', icon: Globe },
    { number: '99.9%', label: 'Uptime', icon: Shield },
    { number: '24/7', label: 'Support', icon: Heart },
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
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop"
            alt="About our team"
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
                <span className="text-sm font-medium text-blue-100">Our Story</span>
                <Award className="h-4 w-4 text-yellow-400" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white leading-tight">
                Building the Future of
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
                    Customer Relationships
                  </span>
                  <span className="absolute -bottom-2 left-0 right-0 h-3 bg-blue-500/30 blur-xl"></span>
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                We&apos;re on a mission to empower businesses of all sizes with intelligent, 
                intuitive CRM tools that <span className="font-semibold text-white">drive real growth</span>.
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
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white -mt-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <Card 
                key={index}
                className="fade-in opacity-0 translate-y-8 transition-all duration-700 border-0 shadow-xl hover:shadow-2xl bg-gradient-to-br from-white to-gray-50"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex p-4 rounded-2xl ${stat.icon === Users ? 'bg-blue-100' : stat.icon === Globe ? 'bg-purple-100' : stat.icon === Shield ? 'bg-green-100' : 'bg-pink-100'} mb-4`}>
                    <stat.icon className={`h-8 w-8 ${stat.icon === Users ? 'text-blue-600' : stat.icon === Globe ? 'text-purple-600' : stat.icon === Shield ? 'text-green-600' : 'text-pink-600'}`} />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="fade-in opacity-0 translate-y-8 transition-all duration-700">
                <Badge className="mb-4 px-4 py-1 bg-blue-100 text-blue-700 border-0">
                  Our Mission
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Empowering Businesses to Build Stronger Relationships
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  We believe every business deserves access to enterprise-grade CRM tools 
                  without the complexity or cost. Our mission is to democratize customer 
                  relationship management by providing intuitive, powerful, and affordable solutions.
                </p>
                <div className="space-y-4">
                  {[
                    'Empower businesses with data-driven insights',
                    'Simplify complex business processes',
                    'Foster meaningful customer relationships',
                    'Drive measurable growth and success',
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="fade-in opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: '200ms' }}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <div className="aspect-square relative">
                    <Image
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=800&fit=crop"
                      alt="Our Mission"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in opacity-0 translate-y-8 transition-all duration-700">
            <Badge className="mb-4 px-4 py-1 bg-purple-100 text-purple-700 border-0">
              Our Values
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Drives Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide every decision we make
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card 
                key={index}
                className="fade-in opacity-0 translate-y-8 transition-all duration-700 border-0 shadow-lg hover:shadow-xl group bg-white"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <div className={`inline-flex p-4 rounded-2xl ${value.color} mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in opacity-0 translate-y-8 transition-all duration-700">
            <Badge className="mb-4 px-4 py-1 bg-pink-100 text-pink-700 border-0">
              Our Journey
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Milestones & Achievements
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From startup to global leader in CRM solutions
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div 
                    key={index}
                    className="fade-in opacity-0 translate-x-8 transition-all duration-700 relative pl-20"
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="absolute left-0 top-0 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-blue-500">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    </div>
                    <Card className="border-0 shadow-lg hover:shadow-xl bg-white">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <Badge className="mb-2 bg-blue-100 text-blue-700 border-0">
                              {milestone.year}
                            </Badge>
                            <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                          </div>
                          <div className="text-sm text-gray-500 font-medium">{milestone.achievement}</div>
                        </div>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in opacity-0 translate-y-8 transition-all duration-700">
            <Badge className="mb-4 px-4 py-1 bg-green-100 text-green-700 border-0">
              Leadership Team
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet the Visionaries
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experienced leaders dedicated to your success
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <div 
                key={index}
                className="fade-in opacity-0 translate-y-8 transition-all duration-700 text-center group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative rounded-full overflow-hidden ring-4 ring-blue-200 mb-4 w-24 h-24 mx-auto group-hover:ring-blue-400 transition-all duration-300 transform group-hover:scale-110">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
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
              Join Us on This <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">Journey</span>
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Experience the difference that passion, innovation, and dedication can make for your business.
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
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="h-6 w-6 text-white/60 rotate-90" />
        </div>
      </section>
    </div>
  );
}
