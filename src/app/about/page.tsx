import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Award, Rocket, Heart, Shield, TrendingUp, Globe, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Users,
      title: 'Customer Focus',
      description: 'We prioritize our customers success and satisfaction above all else. Every decision we make is guided by how it will benefit our users.'
    },
    {
      icon: Target,
      title: 'Goal Oriented',
      description: 'Every feature is designed to help you achieve your business goals. We focus on delivering measurable results.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from code quality to customer support.'
    },
    {
      icon: Heart,
      title: 'Passionate',
      description: 'We are passionate about helping businesses succeed and building tools that make a real difference.'
    },
    {
      icon: Shield,
      title: 'Trustworthy',
      description: 'Your data security and privacy are paramount. We maintain the highest standards of security and compliance.'
    },
    {
      icon: Rocket,
      title: 'Innovative',
      description: 'We continuously innovate and evolve to stay ahead of the curve and provide cutting-edge solutions.'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Active Users' },
    { number: '150+', label: 'Countries' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ];

  const milestones = [
    { year: '2018', title: 'Company Founded', description: 'Started with a vision to revolutionize CRM software' },
    { year: '2019', title: 'First 1,000 Users', description: 'Reached our first major milestone with businesses worldwide' },
    { year: '2021', title: 'Series A Funding', description: 'Secured $10M to expand our team and features' },
    { year: '2023', title: 'AI Integration', description: 'Launched AI-powered features for smart automation' },
    { year: '2024', title: '50,000+ Users', description: 'Trusted by businesses in over 150 countries' }
  ];

  const team = [
    { name: 'Sarah Johnson', role: 'CEO & Co-Founder', image: '👩‍💼' },
    { name: 'Michael Chen', role: 'CTO & Co-Founder', image: '👨‍💻' },
    { name: 'Emily Rodriguez', role: 'Head of Product', image: '👩‍💼' },
    { name: 'David Kim', role: 'Head of Engineering', image: '👨‍💻' },
    { name: 'Lisa Anderson', role: 'Head of Customer Success', image: '👩‍💼' },
    { name: 'James Wilson', role: 'Head of Design', image: '👨‍🎨' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-[#F9FAFB] to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#111827] mb-6">
              Building the future of customer relationships
            </h1>
            <p className="text-xl text-[#6B7280] mb-8">
              We&apos;re on a mission to help businesses of all sizes build stronger customer relationships 
              through intelligent, intuitive, and powerful CRM software.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-[#E5E7EB]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#2563EB] mb-2">
                  {stat.number}
                </div>
                <div className="text-[#6B7280]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-[#6B7280] mb-6">
                  We believe that every business deserves access to powerful, enterprise-grade CRM tools 
                  without the enterprise complexity or cost.
                </p>
                <p className="text-lg text-[#6B7280] mb-6">
                  Our mission is to democratize customer relationship management by providing intuitive, 
                  affordable, and feature-rich software that helps businesses grow and succeed.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-[#10B981] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-[#6B7280]">Empower businesses with data-driven insights</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-[#10B981] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-[#6B7280]">Simplify complex business processes</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-[#10B981] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-[#6B7280]">Foster meaningful customer relationships</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-2xl flex items-center justify-center">
                  <Globe className="h-32 w-32 text-white opacity-20" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-6 max-w-xs">
                  <p className="text-sm text-[#6B7280]">
                    &quot;CRM Pro has transformed how we manage our customer relationships&quot;
                  </p>
                  <p className="text-sm font-semibold text-[#111827] mt-2">- Happy Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 bg-[#2563EB] rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              From a small startup to a global CRM solution
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 bg-[#2563EB] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {milestone.year.slice(-2)}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-full bg-[#E5E7EB] mt-2"></div>
                    )}
                  </div>
                  <div className="pb-8">
                    <div className="text-sm text-[#2563EB] font-semibold mb-1">{milestone.year}</div>
                    <h3 className="text-xl font-bold text-[#111827] mb-2">{milestone.title}</h3>
                    <p className="text-[#6B7280]">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              Experienced professionals dedicated to your success
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl mb-4 bg-white rounded-full h-24 w-24 flex items-center justify-center mx-auto shadow-md">
                  {member.image}
                </div>
                <h3 className="font-semibold text-[#111827] mb-1">{member.name}</h3>
                <p className="text-sm text-[#6B7280]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#2563EB]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join thousands of businesses worldwide
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start your journey with CRM Pro today and experience the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-[#2563EB]" asChild>
              <Link href="/contact">Schedule a Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}