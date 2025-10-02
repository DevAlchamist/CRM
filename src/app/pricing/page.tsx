import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Check, ArrowRight } from 'lucide-react';
import { subscriptionPlans } from '@/data/demo';

export default function PricingPage() {
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
              <Link href="/" className="text-[#6B7280] hover:text-[#111827]">
                Home
              </Link>
              <Link href="/features" className="text-[#6B7280] hover:text-[#111827]">
                Features
              </Link>
              <Link href="/pricing" className="text-[#2563EB] hover:text-[#1E40AF]">
                Pricing
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
          <h1 className="text-4xl md:text-6xl font-bold text-[#111827] mb-6">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-[#6B7280] mb-8 max-w-2xl mx-auto">
            Choose the plan that&apos;s right for your business. All plans include a 14-day free trial.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {subscriptionPlans.map((plan) => (
              <Card key={plan.id} className={`relative ${plan.isPopular ? 'ring-2 ring-[#2563EB]' : ''}`}>
                {plan.isPopular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-[#111827]">
                    ${plan.price}
                    <span className="text-lg text-[#6B7280]">/month</span>
                  </div>
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-[#10B981] mr-3" />
                        <span className="text-[#6B7280]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.isPopular ? 'default' : 'outline'}
                    size="lg"
                    asChild
                  >
                    <Link href="/signup">
                      {plan.price === 0 ? 'Get Started Free' : 'Start Free Trial'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-[#111827] mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-8">
              {[
                {
                  question: "Can I change plans anytime?",
                  answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
                },
                {
                  question: "Is there a setup fee?",
                  answer: "No, there are no setup fees or hidden costs. You only pay the monthly subscription fee."
                },
                {
                  question: "What happens to my data if I cancel?",
                  answer: "Your data is safe with us. You can export all your data before canceling, and we'll keep it for 30 days in case you want to reactivate."
                },
                {
                  question: "Do you offer custom enterprise plans?",
                  answer: "Yes, we offer custom enterprise solutions with dedicated support, custom integrations, and tailored features. Contact our sales team for more information."
                }
              ].map((faq, index) => (
                <div key={index} className="border-b border-[#E5E7EB] pb-6">
                  <h3 className="text-lg font-semibold text-[#111827] mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-[#6B7280]">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#2563EB]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to get started?
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
    </div>
  );
}
