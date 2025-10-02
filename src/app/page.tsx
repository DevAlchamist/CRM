import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  Building2,
  MessageSquare,
  Calendar,
  FileText,
  CreditCard,
  Settings,
  Globe,
  Lock,
  Smartphone
} from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: Users,
      title: 'Customer Management',
      description: 'Organize and track all your customer relationships in one place.',
    },
    {
      icon: Target,
      title: 'Lead Tracking',
      description: 'Follow leads through your sales pipeline with visual kanban boards.',
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reports',
      description: 'Get insights into your sales performance with detailed reports.',
    },
    {
      icon: MessageSquare,
      title: 'Team Collaboration',
      description: 'Communicate and collaborate with your team seamlessly.',
    },
    {
      icon: Calendar,
      title: 'Task Management',
      description: 'Stay organized with built-in task and activity management.',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime guarantee.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Sales Director',
      company: 'TechCorp',
      content: 'This CRM has transformed how we manage our customer relationships. The pipeline view is incredibly intuitive.',
      rating: 5,
    },
    {
      name: 'Mike Chen',
      role: 'Founder',
      company: 'StartupIO',
      content: 'The analytics and reporting features have given us insights we never had before. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Emily Davis',
      role: 'Account Manager',
      company: 'GrowthCo',
      content: 'The team collaboration features make it easy to stay connected and organized. Love the interface!',
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: 0,
      description: 'Perfect for small teams getting started',
      features: [
        'Up to 5 users',
        'Basic CRM features',
        'Email support',
        '1GB storage',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Basic',
      price: 29,
      description: 'Great for growing businesses',
      features: [
        'Up to 15 users',
        'Advanced CRM features',
        'Priority support',
        '10GB storage',
        'Basic integrations',
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'Pro',
      price: 79,
      description: 'For established companies',
      features: [
        'Up to 50 users',
        'All CRM features',
        '24/7 support',
        '100GB storage',
        'Advanced integrations',
        'Custom reports',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 199,
      description: 'For large organizations',
      features: [
        'Unlimited users',
        'All features + custom',
        'Dedicated support',
        'Unlimited storage',
        'All integrations',
        'Custom development',
        'API access',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
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
              <Link href="#features" className="text-[#6B7280] hover:text-[#111827]">
                Features
              </Link>
              <Link href="#pricing" className="text-[#6B7280] hover:text-[#111827]">
                Pricing
              </Link>
              <Link href="#testimonials" className="text-[#6B7280] hover:text-[#111827]">
                Testimonials
              </Link>
              <Link href="/about" className="text-[#6B7280] hover:text-[#111827]">
                About
              </Link>
              <Link href="/resources" className="text-[#6B7280] hover:text-[#111827]">
                Resources
              </Link>
              <Link href="/contact" className="text-[#6B7280] hover:text-[#111827]">
                Contact
              </Link>
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
          <Badge variant="secondary" className="mb-4">
            🚀 Trusted by 10,000+ companies worldwide
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-[#111827] mb-6">
            The CRM that grows with your business
          </h1>
          <p className="text-xl text-[#6B7280] mb-8 max-w-2xl mx-auto">
            Manage customers, track leads, and boost sales with our intuitive CRM platform. 
            Everything you need to grow your business in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#demo">Watch Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
              Everything you need to manage your business
            </h2>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              Our comprehensive CRM platform provides all the tools you need to 
              streamline your sales process and grow your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="h-12 w-12 bg-[#2563EB] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-[#F9FAFB]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
              Loved by teams worldwide
            </h2>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              See what our customers have to say about their experience with CRM Pro.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
                    ))}
                  </div>
                  <p className="text-[#6B7280] mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                  <div>
                    <p className="font-semibold text-[#111827]">{testimonial.name}</p>
                    <p className="text-sm text-[#6B7280]">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              Choose the plan that&apos;s right for your business. All plans include a 14-day free trial.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-[#2563EB]' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-[#111827]">
                    ${plan.price}
                    <span className="text-lg text-[#6B7280]">/month</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-4 w-4 text-[#10B981] mr-2" />
                        <span className="text-sm text-[#6B7280]">{feature}</span>
          </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? 'default' : 'outline'}
                    asChild
                  >
                    <Link href="/signup">{plan.cta}</Link>
                  </Button>
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
            Ready to transform your business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of companies already using CRM Pro to grow their business.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111827] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-md bg-[#2563EB] flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">CRM Pro</span>
              </div>
              <p className="text-[#9CA3AF]">
                The modern CRM platform that helps businesses grow and succeed.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-[#9CA3AF]">
                <li><Link href="#features" className="hover:text-white">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white">Integrations</Link></li>
                <li><Link href="#" className="hover:text-white">API</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-[#9CA3AF]">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
                <li><Link href="#" className="hover:text-white">Careers</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-[#9CA3AF]">
                <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white">Status</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#374151] mt-8 pt-8 text-center text-[#9CA3AF]">
            <p>&copy; 2024 CRM Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}