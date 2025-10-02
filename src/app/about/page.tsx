import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, Target, Award, Globe, Heart } from 'lucide-react';

export default function AboutPage() {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      bio: '15+ years in enterprise software, passionate about customer success.'
    },
    {
      name: 'Mike Chen',
      role: 'CTO',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      bio: 'Former Google engineer, expert in scalable systems architecture.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      bio: 'UX specialist with a focus on intuitive business software design.'
    },
    {
      name: 'David Kim',
      role: 'Head of Sales',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      bio: 'Sales veteran with deep CRM experience across multiple industries.'
    }
  ];

  const values = [
    {
      icon: Users,
      title: 'Customer-Centric',
      description: 'Every feature we build starts with understanding our customers\' needs and challenges.'
    },
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'We measure success by the growth and efficiency gains our customers achieve.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for the highest quality in everything we do, from code to customer support.'
    },
    {
      icon: Heart,
      title: 'Innovation',
      description: 'We continuously push boundaries to deliver cutting-edge CRM solutions.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-[#E5E7EB]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-md bg-[#2563EB] flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#111827]">CRM Pro</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-[#6B7280] hover:text-[#111827]">Home</Link>
              <Link href="/features" className="text-[#6B7280] hover:text-[#111827]">Features</Link>
              <Link href="/pricing" className="text-[#6B7280] hover:text-[#111827]">Pricing</Link>
              <Link href="/about" className="text-[#2563EB] hover:text-[#1E40AF]">About</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-[#F9FAFB] to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#111827] mb-6">
            About CRM Pro
          </h1>
          <p className="text-xl text-[#6B7280] mb-8 max-w-3xl mx-auto">
            We&apos;re on a mission to revolutionize how businesses manage their customer relationships, 
            streamline sales processes, and drive sustainable growth through technology.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#111827] mb-8 text-center">Our Story</h2>
            <div className="prose prose-lg mx-auto text-[#6B7280]">
              <p className="mb-6">
                Founded in 2020 by a team of experienced software engineers and sales professionals, 
                CRM Pro was born out of frustration with existing CRM solutions that were either too 
                complex for small teams or too simplistic for growing businesses.
              </p>
              <p className="mb-6">
                We believed that every business, regardless of size, deserved access to powerful, 
                intuitive customer relationship management tools that could scale with their growth. 
                Our platform combines the simplicity small teams need with the power enterprise 
                organizations require.
              </p>
              <p className="mb-6">
                Today, we serve thousands of companies worldwide, helping them build stronger 
                customer relationships, close more deals, and achieve their growth objectives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#111827] mb-4">Our Values</h2>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="h-16 w-16 bg-[#2563EB] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-white" />
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

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#111827] mb-4">Meet Our Team</h2>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              The passionate people behind CRM Pro
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="h-24 w-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-[#111827] mb-1">{member.name}</h3>
                  <p className="text-[#2563EB] font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-[#6B7280]">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#2563EB]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Active Companies</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-blue-100">Users Worldwide</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#111827] mb-4">
            Ready to join thousands of successful businesses?
          </h2>
          <p className="text-xl text-[#6B7280] mb-8 max-w-2xl mx-auto">
            Start your free trial today and see how CRM Pro can transform your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
