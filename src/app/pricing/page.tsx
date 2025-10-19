import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';
import { subscriptionPlans } from '@/data/demo';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-[#F9FAFB] to-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Sparkles className="h-3 w-3 mr-1" />
            14-Day Free Trial
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-[#111827] mb-6">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-[#6B7280] mb-8 max-w-2xl mx-auto">
            Choose the plan that&apos;s right for your business. All plans include a 14-day free trial with no credit card required.
          </p>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-[#10B981]" />
              <span className="text-sm text-[#6B7280]">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-[#10B981]" />
              <span className="text-sm text-[#6B7280]">Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-[#10B981]" />
              <span className="text-sm text-[#6B7280]">24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {subscriptionPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative flex flex-col h-full transition-all hover:shadow-xl ${
                  plan.isPopular 
                    ? 'ring-2 ring-[#2563EB] shadow-lg scale-105 md:scale-110 lg:scale-105' 
                    : 'hover:shadow-lg'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-[#2563EB] text-white px-4 py-1 text-xs font-semibold shadow-md">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl font-bold text-[#111827] mb-4">
                    {plan.name}
                  </CardTitle>
                  <div className="mb-4">
                    <div className="flex items-end justify-center gap-1">
                      <span className="text-5xl font-bold text-[#111827]">
                        ${plan.price}
                      </span>
                      <span className="text-lg text-[#6B7280] mb-2">/month</span>
                    </div>
                    {plan.price > 0 && (
                      <p className="text-sm text-[#6B7280] mt-2">
                        Billed monthly
                      </p>
                    )}
                  </div>
                  <CardDescription className="text-base text-[#6B7280] min-h-[3rem] flex items-center justify-center">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col pt-0">
                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-[#10B981] mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-[#6B7280] text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.isPopular ? 'shadow-md' : ''}`}
                    variant={plan.isPopular ? 'default' : 'outline'}
                    size="lg"
                    asChild
                  >
                    <Link href="/signup">
                      {plan.price === 0 ? 'Get Started Free' : 'Start Free Trial'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  {plan.price > 0 && (
                    <p className="text-xs text-center text-[#6B7280] mt-3">
                      14-day free trial included
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Enterprise Contact */}
          <div className="mt-12 text-center">
            <Card className="max-w-3xl mx-auto bg-gradient-to-br from-[#F9FAFB] to-white border-2 border-[#E5E7EB]">
              <CardContent className="py-8">
                <h3 className="text-2xl font-bold text-[#111827] mb-2">
                  Need a custom solution?
                </h3>
                <p className="text-[#6B7280] mb-6">
                  Contact us for custom enterprise plans with dedicated support, custom integrations, and tailored features for your organization.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/contact">
                      Contact Sales
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="ghost" asChild>
                    <Link href="/features">
                      View All Features
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <HelpCircle className="h-12 w-12 text-[#2563EB] mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-[#6B7280]">
                Everything you need to know about our pricing
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
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
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans."
                },
                {
                  question: "Can I get a refund?",
                  answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment with no questions asked."
                }
              ].map((faq, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start gap-2">
                      <span className="text-[#2563EB] font-bold">Q.</span>
                      <span>{faq.question}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#6B7280]">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-[#6B7280] mb-4">Still have questions?</p>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">
                  Contact Support
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
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
