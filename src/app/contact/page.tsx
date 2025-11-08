'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Clock, MessageSquare, HelpCircle, ArrowRight, CheckCircle2, Send, Sparkles, TrendingUp, ChevronRight, Rocket } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'We respond within 24 hours',
      contact: 'contact@crmpro.com',
      link: 'mailto:contact@crmpro.com',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Mon-Fri from 8am to 6pm EST',
      contact: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Available 24/7 for urgent inquiries',
      contact: 'Start a conversation',
      link: '#',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Come see us in person',
      contact: '123 Business St, San Francisco, CA',
      link: '#',
      gradient: 'from-orange-500 to-red-500',
    }
  ];

  const departments = [
    {
      title: 'Sales',
      description: 'Interested in our products? Get in touch.',
      email: 'sales@crmpro.com',
      icon: '💼',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Support',
      description: 'Need help? Our team is here for you.',
      email: 'support@crmpro.com',
      icon: '🛟',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Partnerships',
      description: 'Want to partner with us? Let&apos;s talk.',
      email: 'partners@crmpro.com',
      icon: '🤝',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Press & Media',
      description: 'Press inquiries and media requests.',
      email: 'press@crmpro.com',
      icon: '📰',
      gradient: 'from-orange-500 to-red-500',
    }
  ];

  const faqs = [
    {
      question: 'What is your response time?',
      answer: 'We typically respond to all inquiries within 24 hours during business days.',
    },
    {
      question: 'Do you offer phone support?',
      answer: 'Yes, phone support is available for all paid plans Monday through Friday, 8am-6pm EST.',
    },
    {
      question: 'Can I schedule a demo?',
      answer: 'Absolutely! You can schedule a personalized demo by filling out the contact form or calling us directly.',
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section - Dynamic */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
          <Image
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=1080&fit=crop"
            alt="Contact us"
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
                <span className="text-sm font-medium text-blue-100">We respond within 24 hours</span>
                <TrendingUp className="h-4 w-4 text-green-400" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white leading-tight">
                Let&apos;s <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
                    Talk
                  </span>
                  <span className="absolute -bottom-2 left-0 right-0 h-3 bg-blue-500/30 blur-xl"></span>
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                Have questions about CRM Pro? We&apos;re here to help. Reach out to our team and we&apos;ll get back to you <span className="font-semibold text-white">as soon as possible</span>.
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <Clock className="h-4 w-4 text-green-400" />
                  <span className="text-blue-100">24hr response time</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <MessageSquare className="h-4 w-4 text-green-400" />
                  <span className="text-blue-100">Live chat available</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span className="text-blue-100">Free consultation</span>
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

      {/* Contact Methods */}
      <section className="py-24 bg-white -mt-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {contactMethods.map((method, index) => (
              <Card 
                key={index}
                className="fade-in opacity-0 translate-y-8 transition-all duration-700 border-0 shadow-lg hover:shadow-xl bg-white group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex p-4 rounded-2xl ${method.gradient === 'from-blue-500 to-cyan-500' ? 'bg-blue-600' : method.gradient === 'from-purple-500 to-pink-500' ? 'bg-purple-600' : method.gradient === 'from-green-500 to-emerald-500' ? 'bg-green-600' : 'bg-orange-600'} mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <method.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{method.description}</p>
                  <a 
                    href={method.link} 
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm break-words"
                  >
                    {method.contact}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2 fade-in opacity-0 translate-y-8 transition-all duration-700">
                <Card className="border-0 shadow-xl bg-white">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold text-gray-900">Send us a Message</CardTitle>
                    <CardDescription className="text-base">
                      Fill out the form below and our team will get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isSubmitted ? (
                      <div className="text-center py-12">
                        <div className="inline-flex p-4 rounded-full bg-green-100 mb-4">
                          <CheckCircle2 className="h-12 w-12 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                        <p className="text-gray-600">Thank you for contacting us. We&apos;ll respond shortly.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="john@company.com"
                            />
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="company" className="block text-sm font-semibold text-gray-900 mb-2">
                              Company
                            </label>
                            <input
                              type="text"
                              id="company"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="Acme Inc."
                            />
                          </div>
                          <div>
                            <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="+1 (555) 000-0000"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                            Subject *
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          >
                            <option value="">Select a subject</option>
                            <option value="sales">Sales Inquiry</option>
                            <option value="support">Technical Support</option>
                            <option value="demo">Schedule a Demo</option>
                            <option value="partnership">Partnership Opportunity</option>
                            <option value="feedback">Feedback</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                            Message *
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            rows={6}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                            placeholder="Tell us how we can help you..."
                          />
                        </div>
        
                        <Button 
                          type="submit" 
                          size="lg" 
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                        >
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Office Hours */}
                <Card className="fade-in opacity-0 translate-y-8 transition-all duration-700 border-0 shadow-lg bg-white" style={{ transitionDelay: '200ms' }}>
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Clock className="h-5 w-5 mr-2 text-blue-600" />
                      Office Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="font-semibold text-gray-900">Monday - Friday</div>
                      <div className="text-sm text-gray-600">8:00 AM - 6:00 PM EST</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Saturday</div>
                      <div className="text-sm text-gray-600">10:00 AM - 4:00 PM EST</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Sunday</div>
                      <div className="text-sm text-gray-600">Closed</div>
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ */}
                <Card className="fade-in opacity-0 translate-y-8 transition-all duration-700 border-0 shadow-lg bg-white" style={{ transitionDelay: '300ms' }}>
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <HelpCircle className="h-5 w-5 mr-2 text-blue-600" />
                      Quick FAQ
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index}>
                        <h4 className="font-semibold text-gray-900 mb-1">{faq.question}</h4>
                        <p className="text-sm text-gray-600">{faq.answer}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in opacity-0 translate-y-8 transition-all duration-700">
            <Badge className="mb-4 px-4 py-1 bg-blue-100 text-blue-700 border-0">
              Departments
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Contact by Department
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get in touch with the right team for your needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {departments.map((dept, index) => (
              <Card 
                key={index}
                className="fade-in opacity-0 translate-y-8 transition-all duration-700 border-0 shadow-lg hover:shadow-xl bg-white group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">{dept.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{dept.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{dept.description}</p>
                  <a 
                    href={`mailto:${dept.email}`} 
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    {dept.email}
                  </a>
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
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop"
            alt="Schedule a demo"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center fade-in opacity-0 translate-y-8 transition-all duration-700 relative z-10">
            <Rocket className="h-16 w-16 text-blue-400 mx-auto mb-6 animate-bounce" />
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Prefer to <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">Talk to Sales</span>?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Schedule a personalized demo and see how CRM Pro can transform your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="group px-8 py-6 text-lg bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold"
                asChild
              >
                <Link href="/pricing" className="flex items-center">
                  View Pricing
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-6 text-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300"
                asChild
              >
                <Link href="/signup">Start Free Trial</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
