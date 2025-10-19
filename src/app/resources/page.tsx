import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, BookOpen, Play, Users, FileText, Calendar, ExternalLink, ArrowRight } from 'lucide-react';

export default function ResourcesPage() {
  const resources = [
    {
      type: 'guide',
      title: 'Getting Started with CRM Pro',
      description: 'Complete guide to setting up your CRM and importing your first customers.',
      category: 'Getting Started',
      readTime: '5 min read',
      icon: BookOpen,
      href: '#'
    },
    {
      type: 'case-study',
      title: 'How TechCorp Increased Sales by 40%',
      description: 'Learn how a growing tech company streamlined their sales process and boosted revenue.',
      category: 'Case Study',
      readTime: '8 min read',
      icon: Users,
      href: '#'
    },
    {
      type: 'webinar',
      title: 'Advanced Lead Scoring Techniques',
      description: 'Join our expert webinar on implementing effective lead scoring strategies.',
      category: 'Webinar',
      readTime: '60 min',
      icon: Play,
      href: '#'
    },
    {
      type: 'guide',
      title: 'CRM Best Practices for Small Teams',
      description: 'Essential tips and strategies for small teams to maximize CRM effectiveness.',
      category: 'Best Practices',
      readTime: '6 min read',
      icon: FileText,
      href: '#'
    },
    {
      type: 'webinar',
      title: 'Integrating Your CRM with Marketing Tools',
      description: 'Learn how to connect CRM Pro with your favorite marketing automation platforms.',
      category: 'Integration',
      readTime: '45 min',
      icon: Play,
      href: '#'
    },
    {
      type: 'case-study',
      title: 'Healthcare Practice Management Success',
      description: 'See how a medical practice improved patient relationships and reduced administrative overhead.',
      category: 'Case Study',
      readTime: '7 min read',
      icon: Users,
      href: '#'
    }
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
      speaker: 'Sarah Johnson, Sales Expert'
    },
    {
      title: 'Data Migration Best Practices',
      date: 'December 20, 2024',
      time: '3:00 PM EST',
      speaker: 'Mike Chen, Technical Lead'
    },
    {
      title: 'Customer Retention Strategies',
      date: 'January 5, 2025',
      time: '1:00 PM EST',
      speaker: 'Emily Rodriguez, Customer Success'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Getting Started': return 'bg-blue-100 text-blue-800';
      case 'Case Study': return 'bg-green-100 text-green-800';
      case 'Webinar': return 'bg-purple-100 text-purple-800';
      case 'Best Practices': return 'bg-orange-100 text-orange-800';
      case 'Integration': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'guide': return 'text-blue-600';
      case 'case-study': return 'text-green-600';
      case 'webinar': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-[#F9FAFB] to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#111827] mb-6">
            Resources & Learning
          </h1>
          <p className="text-xl text-[#6B7280] mb-8 max-w-3xl mx-auto">
            Everything you need to master CRM Pro and grow your business. From getting started guides to advanced strategies.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 border-b border-[#E5E7EB]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Badge
                key={category.name}
                variant={category.name === 'All' ? 'default' : 'secondary'}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-[#2563EB] hover:text-white transition-colors"
              >
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Resources */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#111827] mb-6">Featured Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.slice(0, 4).map((resource, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-2 rounded-lg bg-gray-100`}>
                          <resource.icon className={`h-5 w-5 ${getIconColor(resource.type)}`} />
                        </div>
                        <Badge className={`text-xs ${getCategoryColor(resource.category)}`}>
                          {resource.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg mb-2">{resource.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {resource.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#6B7280]">{resource.readTime}</span>
                        <Link href={resource.href} className="text-[#2563EB] hover:underline text-sm font-medium flex items-center">
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
            <section>
              <h2 className="text-2xl font-bold text-[#111827] mb-6">All Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((resource, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-2 rounded-lg bg-gray-100`}>
                          <resource.icon className={`h-5 w-5 ${getIconColor(resource.type)}`} />
                        </div>
                        <Badge className={`text-xs ${getCategoryColor(resource.category)}`}>
                          {resource.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg mb-2">{resource.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {resource.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#6B7280]">{resource.readTime}</span>
                        <Link href={resource.href} className="text-[#2563EB] hover:underline text-sm font-medium flex items-center">
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
          <div className="lg:col-span-1 space-y-8">
            {/* Upcoming Webinars */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Webinars
                </CardTitle>
                <CardDescription>
                  Join our live sessions with CRM experts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingWebinars.map((webinar, index) => (
                  <div key={index} className="border-l-4 border-[#2563EB] pl-4">
                    <h4 className="font-medium text-[#111827] mb-1">{webinar.title}</h4>
                    <p className="text-sm text-[#6B7280] mb-1">{webinar.speaker}</p>
                    <p className="text-sm text-[#6B7280]">{webinar.date} at {webinar.time}</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Webinars
                </Button>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/features" className="flex items-center text-[#2563EB] hover:underline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Feature Overview
                </Link>
                <Link href="/pricing" className="flex items-center text-[#2563EB] hover:underline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Pricing Plans
                </Link>
                <Link href="/contact" className="flex items-center text-[#2563EB] hover:underline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Contact Support
                </Link>
                <Link href="/signup" className="flex items-center text-[#2563EB] hover:underline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Start Free Trial
                </Link>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button className="w-full">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-[#2563EB]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to put these resources into practice?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start your free trial today and experience the power of CRM Pro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-[#2563EB]" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
