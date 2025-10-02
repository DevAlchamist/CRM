import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold text-[#111827] mb-8">Privacy Policy</h1>
          <p className="text-[#6B7280] mb-8">Last updated: December 1, 2024</p>

          <Card>
            <CardContent className="pt-6 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-[#111827] mb-4">1. Information We Collect</h2>
                <p className="text-[#6B7280] leading-relaxed mb-4">
                  We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.
                </p>
                
                <h3 className="text-lg font-semibold text-[#111827] mb-3">Personal Information</h3>
                <ul className="list-disc list-inside text-[#6B7280] space-y-2 ml-4 mb-4">
                  <li>Name and email address</li>
                  <li>Company information and job title</li>
                  <li>Phone number and billing address</li>
                  <li>Profile picture and preferences</li>
                </ul>

                <h3 className="text-lg font-semibold text-[#111827] mb-3">Usage Information</h3>
                <ul className="list-disc list-inside text-[#6B7280] space-y-2 ml-4">
                  <li>Log data (IP address, browser type, pages visited)</li>
                  <li>Device information and operating system</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Feature usage and performance data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#111827] mb-4">2. How We Use Your Information</h2>
                <p className="text-[#6B7280] leading-relaxed mb-4">
                  We use the information we collect to provide, maintain, and improve our services:
                </p>
                <ul className="list-disc list-inside text-[#6B7280] space-y-2 ml-4">
                  <li>Provide and maintain the CRM service</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Improve our products and services</li>
                  <li>Develop new features and functionality</li>
                  <li>Monitor and analyze trends and usage</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#111827] mb-4">3. Information Sharing</h2>
                <p className="text-[#6B7280] leading-relaxed mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-[#6B7280] space-y-2 ml-4">
                  <li>With your explicit consent</li>
                  <li>To service providers who assist us in operating our platform</li>
                  <li>When required by law or to protect our rights</li>
                  <li>In connection with a business transfer or acquisition</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#111827] mb-4">4. Data Security</h2>
                <p className="text-[#6B7280] leading-relaxed mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc list-inside text-[#6B7280] space-y-2 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication</li>
                  <li>Employee training on data protection</li>
                  <li>Incident response procedures</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#111827] mb-4">5. Data Retention</h2>
                <p className="text-[#6B7280] leading-relaxed">
                  We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. When you delete your account, we will delete or anonymize your personal information, except where we are required to retain it for legal or regulatory purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#111827] mb-4">6. Your Rights</h2>
                <p className="text-[#6B7280] leading-relaxed mb-4">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-[#6B7280] space-y-2 ml-4">
                  <li>Access to your personal information</li>
                  <li>Correction of inaccurate information</li>
                  <li>Deletion of your personal information</li>
                  <li>Restriction of processing</li>
                  <li>Data portability</li>
                  <li>Objection to processing</li>
                  <li>Withdrawal of consent</li>
                </ul>
                <p className="text-[#6B7280] leading-relaxed mt-4">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#111827] mb-4">7. Cookies and Tracking</h2>
                <p className="text-[#6B7280] leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to enhance your experience on our platform. You can control cookie settings through your browser preferences.
                </p>
                <h3 className="text-lg font-semibold text-[#111827] mb-3">Types of Cookies We Use:</h3>
                <ul className="list-disc list-inside text-[#6B7280] space-y-2 ml-4">
                  <li>Essential cookies (required for platform functionality)</li>
                  <li>Analytics cookies (help us understand usage patterns)</li>
                  <li>Preference cookies (remember your settings)</li>
                  <li>Marketing cookies (for targeted advertising)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#111827] mb-4">8. International Data Transfers</h2>
                <p className="text-[#6B7280] leading-relaxed">
                  Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your personal information in accordance with applicable data protection laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#111827] mb-4">9. Children&apos;s Privacy</h2>
                <p className="text-[#6B7280] leading-relaxed">
                  Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#111827] mb-4">10. Changes to This Policy</h2>
                <p className="text-[#6B7280] leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#111827] mb-4">11. Contact Us</h2>
                <p className="text-[#6B7280] leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-[#111827]">
                    Email: privacy@crmpro.com<br />
                    Address: 123 Business Avenue, Suite 100, San Francisco, CA 94105<br />
                    Phone: +1 (555) 123-4567
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
