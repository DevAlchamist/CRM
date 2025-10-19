'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, MessageSquare, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
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
      description: 'Our team will respond within 24 hours',
      contact: 'contact@crmplatform.com',
      link: 'mailto:contact@crmplatform.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Mon-Fri from 8am to 6pm EST',
      contact: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Available 24/7 for urgent inquiries',
      contact: 'Start a conversation',
      link: '#'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Come see us in person',
      contact: '123 Business St, San Francisco, CA 94105',
      link: '#'
    }
  ];

  const departments = [
    {
      title: 'Sales',
      description: 'Interested in our products? Get in touch with our sales team.',
      email: 'sales@crmplatform.com',
      icon: '💼'
    },
    {
      title: 'Support',
      description: 'Need help with your account or have a technical question?',
      email: 'support@crmplatform.com',
      icon: '🛟'
    },
    {
      title: 'Partnerships',
      description: 'Want to partner with us? Let\'s talk about opportunities.',
      email: 'partners@crmplatform.com',
      icon: '🤝'
    },
    {
      title: 'Press & Media',
      description: 'Press inquiries and media requests.',
      email: 'press@crmplatform.com',
      icon: '📰'
    }
  ];

  const faqs = [
    {
      question: 'What is your response time?',
      answer: 'We typically respond to all inquiries within 24 hours during business days.'
    },
    {
      question: 'Do you offer phone support?',
      answer: 'Yes, phone support is available for all paid plans Monday through Friday, 8am-6pm EST.'
    },
    {
      question: 'Can I schedule a demo?',
      answer: 'Absolutely! You can schedule a personalized demo by filling out the contact form or calling us directly.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-[#F9FAFB] to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#111827] mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-[#6B7280] mb-8 max-w-3xl mx-auto">
            Have questions about CRM Pro? We&apos;re here to help. Reach out to our team and we&apos;ll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {contactMethods.map((method, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 bg-[#2563EB] rounded-lg flex items-center justify-center mb-4">
                    <method.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {method.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a href={method.link} className="text-[#2563EB] hover:underline font-medium break-words">
                    {method.contact}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Send us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and our team will get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isSubmitted ? (
                      <div className="text-center py-12">
                        <CheckCircle2 className="h-16 w-16 text-[#10B981] mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-[#111827] mb-2">Message Sent!</h3>
                        <p className="text-[#6B7280]">Thank you for contacting us. We&apos;ll respond shortly.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-[#111827] mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#111827] mb-2">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                              placeholder="john@company.com"
                            />
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="company" className="block text-sm font-medium text-[#111827] mb-2">
                              Company
                            </label>
                            <input
                              type="text"
                              id="company"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                              placeholder="Acme Inc."
                            />
                          </div>
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-[#111827] mb-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                              placeholder="+1 (555) 000-0000"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-[#111827] mb-2">
                            Subject *
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
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
                          <label htmlFor="message" className="block text-sm font-medium text-[#111827] mb-2">
                            Message *
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            rows={6}
                            className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] resize-none"
                            placeholder="Tell us how we can help you..."
                          />
        </div>
        
                        <Button type="submit" size="lg" className="w-full">
                          Send Message
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Office Hours */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Office Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="font-medium text-[#111827]">Monday - Friday</div>
                      <div className="text-sm text-[#6B7280]">8:00 AM - 6:00 PM EST</div>
                    </div>
                    <div>
                      <div className="font-medium text-[#111827]">Saturday</div>
                      <div className="text-sm text-[#6B7280]">10:00 AM - 4:00 PM EST</div>
                    </div>
                    <div>
                      <div className="font-medium text-[#111827]">Sunday</div>
                      <div className="text-sm text-[#6B7280]">Closed</div>
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <HelpCircle className="h-5 w-5 mr-2" />
                      Quick FAQ
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index}>
                        <h4 className="font-medium text-[#111827] mb-1">{faq.question}</h4>
                        <p className="text-sm text-[#6B7280]">{faq.answer}</p>
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
              Contact by Department
            </h2>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              Get in touch with the right team for your needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {departments.map((dept, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-4">{dept.icon}</div>
                  <CardTitle className="text-lg">{dept.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {dept.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a href={`mailto:${dept.email}`} className="text-[#2563EB] hover:underline font-medium text-sm">
                    {dept.email}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#2563EB]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prefer to talk to sales?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Schedule a personalized demo and see how CRM Pro can transform your business.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/pricing">
              View Pricing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
      </div>
      </section>
    </div>
  );
}