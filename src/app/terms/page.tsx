import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

export default function TermsPage() {
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

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#111827] mb-8">Terms of Service</h1>
          <p className="text-[#6B7280] mb-8">Last updated: December 1, 2024</p>

          <Card>
            <CardContent className="pt-6 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-[#111827] mb-4">1. Agreement to Terms</h2>
                <p className="text-[#6B7280] leading-relaxed">
                  By accessing and using CRM Pro (&quot;Service&quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#111827] mb-4">2. Use License</h2>
                <p className="text-[#6B7280] leading-relaxed mb-4">
                  Permission is granted to temporarily download one copy of CRM Pro per device for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside text-[#6B7280] space-y-2 ml-4">
                  <li>modify or copy the materials</li>
                  <li>use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
                  <li>attempt to decompile or reverse engineer any software contained on CRM Pro&apos;s web site</li>
                  <li>remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#111827] mb-4">3. User Accounts</h2>
                <p className="text-[#6B7280] leading-relaxed mb-4">
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
                </p>
                <p className="text-[#6B7280] leading-relaxed">
                  You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you without appropriate authorization, or a name that is otherwise offensive, vulgar or obscene.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#111827] mb-4">4. Subscription and Billing</h2>
                <p className="text-[#6B7280] leading-relaxed mb-4">
                  Some parts of the Service are billed on a subscription basis (&quot;Subscription(s)&quot;). You will be billed in advance on a recurring and periodic basis (&quot;Billing Cycle&quot;). Billing cycles are set either on a monthly or annual basis, depending on the type of subscription plan you select.
                </p>
                <p className="text-[#6B7280] leading-relaxed">
                  At the end of each Billing Cycle, your Subscription will automatically renew under the exact same conditions unless you cancel it or CRM Pro cancels it. You may cancel your Subscription renewal either through your online account management page or by contacting our customer support team.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#111827] mb-4">5. Data and Privacy</h2>
                <p className="text-[#6B7280] leading-relaxed mb-4">
                  You retain ownership of all data you input into the Service. We will not use your data for any purpose other than to provide the Service to you and to improve our Service. We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <p className="text-[#6B7280] leading-relaxed">
                  For more information about how we collect, use, and protect your information, please review our Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#111827] mb-4">6. Prohibited Uses</h2>
                <p className="text-[#6B7280] leading-relaxed mb-4">
                  You may not use our Service:
                </p>
                <ul className="list-disc list-inside text-[#6B7280] space-y-2 ml-4">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#111827] mb-4">7. Termination</h2>
                <p className="text-[#6B7280] leading-relaxed">
                  We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms. If you wish to terminate your account, you may simply discontinue using the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#111827] mb-4">8. Disclaimer</h2>
                <p className="text-[#6B7280] leading-relaxed">
                  The information on this web site is provided on an &quot;as is&quot; basis. To the fullest extent permitted by law, this Company excludes all representations, warranties, conditions and terms relating to our web site and the use of this web site. Nothing in this disclaimer will limit or exclude our or your liability for death or personal injury, fraud, or any other liability that cannot be excluded or limited by applicable law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#111827] mb-4">9. Governing Law</h2>
                <p className="text-[#6B7280] leading-relaxed">
                  These Terms shall be interpreted and governed by the laws of the State of California, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#111827] mb-4">10. Changes to Terms</h2>
                <p className="text-[#6B7280] leading-relaxed">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#111827] mb-4">11. Contact Information</h2>
                <p className="text-[#6B7280] leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <p className="text-[#111827]">
                    Email: legal@crmpro.com<br />
                    Address: 123 Business Avenue, Suite 100, San Francisco, CA 94105
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
