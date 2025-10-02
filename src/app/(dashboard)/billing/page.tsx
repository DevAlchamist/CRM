'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { ChangePlanModal, PaymentMethodModal, BillingHistoryModal } from '@/components/forms/billing-modals';
import { 
  CreditCard, 
  Download, 
  Users,
  Check,
  AlertCircle,
  Edit,
  Eye,
  Plus
} from 'lucide-react';
import { subscriptionPlans } from '@/data/demo';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState(subscriptionPlans[2]); // Pro plan
  const [viewInvoiceModal, setViewInvoiceModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [paymentMethodModal, setPaymentMethodModal] = useState(false);
  const [changePlanModal, setChangePlanModal] = useState(false);
  const [billingHistoryModal, setBillingHistoryModal] = useState(false);

  const currentPlan = selectedPlan;
  const nextBillingDate = new Date('2024-12-15');
  const usage = {
    users: 12,
    maxUsers: currentPlan.maxUsers,
    storage: 45, // GB
    maxStorage: currentPlan.name === 'Enterprise' ? -1 : 100,
  };

  const invoices = [
    {
      id: 'INV-2024-001',
      date: new Date('2024-11-15'),
      amount: 79,
      status: 'paid',
      description: 'Pro Plan - November 2024',
    },
    {
      id: 'INV-2024-002',
      date: new Date('2024-10-15'),
      amount: 79,
      status: 'paid',
      description: 'Pro Plan - October 2024',
    },
    {
      id: 'INV-2024-003',
      date: new Date('2024-09-15'),
      amount: 79,
      status: 'paid',
      description: 'Pro Plan - September 2024',
      },
    ];

    const handlePlanChange = (planId: string) => {
      const newPlan = subscriptionPlans.find(plan => plan.id === planId);
      if (newPlan) {
        setSelectedPlan(newPlan);
      }
    };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSavePaymentMethod = (paymentData: any) => {
    console.log('Saving payment method:', paymentData);
    // In a real app, this would save the payment method
  };

    return (
    <DashboardLayout title="Billing & Subscription" userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-[#111827]">Billing & Subscription</h1>
            <p className="text-[#6B7280]">Manage your subscription and billing information</p>
          </div>
        </div>

        {/* Current Plan Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span>Current Plan</span>
                  </CardTitle>
                  <CardDescription>
                    You&apos;re currently on the {currentPlan.name} plan
                  </CardDescription>
                </div>
                <Badge variant="success">
                  <Check className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-[#111827]">
                    {formatCurrency(currentPlan.price)}
                    <span className="text-lg text-[#6B7280]">/month</span>
                  </h3>
                  <p className="text-[#6B7280]">Billed monthly</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#6B7280]">Next billing date</p>
                  <p className="font-medium text-[#111827]">{formatDate(nextBillingDate)}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-[#111827] mb-3">Plan Features</h4>
                <ul className="space-y-2">
                  {currentPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-[#10B981]" />
                      <span className="text-sm text-[#6B7280]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setChangePlanModal(true)}>
                  Change Plan
                </Button>
                <Button variant="outline">
                  Cancel Subscription
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage This Month</CardTitle>
              <CardDescription>Your current usage vs plan limits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Users Usage */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-[#6B7280]" />
                    <span className="text-sm font-medium text-[#111827]">Users</span>
                  </div>
                  <span className="text-sm text-[#6B7280]">
                    {usage.users}/{usage.maxUsers}
                  </span>
                </div>
                <div className="w-full bg-[#F3F4F6] rounded-full h-2">
                  <div 
                    className="bg-[#2563EB] h-2 rounded-full" 
                    style={{ width: `${(usage.users / usage.maxUsers) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Storage Usage */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-[#6B7280]" />
                    <span className="text-sm font-medium text-[#111827]">Storage</span>
                  </div>
                  <span className="text-sm text-[#6B7280]">
                    {usage.storage}GB/{usage.maxStorage}GB
                  </span>
                </div>
                <div className="w-full bg-[#F3F4F6] rounded-full h-2">
                  <div 
                    className="bg-[#10B981] h-2 rounded-full" 
                    style={{ width: `${(usage.storage / usage.maxStorage) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E7EB]">
                <p className="text-sm text-[#6B7280] mb-2">Need more resources?</p>
                <Button size="sm" variant="outline" className="w-full">
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Manage your payment information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-16 bg-[#2563EB] rounded-md flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-[#111827]">•••• •••• •••• 4242</p>
                  <p className="text-sm text-[#6B7280]">Expires 12/25</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => setPaymentMethodModal(true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Update
                </Button>
                <Button variant="outline">Remove</Button>
                <Button 
                  variant="outline"
                  onClick={() => setPaymentMethodModal(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>View and download your past invoices</CardDescription>
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border border-[#E5E7EB] rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-[#F3F4F6] rounded-md flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-[#6B7280]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#111827]">{invoice.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-[#6B7280]">
                        <span>{invoice.id}</span>
                        <span>•</span>
                        <span>{formatDate(invoice.date)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium text-[#111827]">
                        {formatCurrency(invoice.amount)}
                      </p>
                      <Badge 
                        variant={invoice.status === 'paid' ? 'success' : 'secondary'}
                        className="text-xs"
                      >
                        {invoice.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setViewInvoiceModal(true);
                        }}
                        title="View Invoice"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" title="Download Invoice">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Available Plans */}
        <Card>
          <CardHeader>
            <CardTitle>Available Plans</CardTitle>
            <CardDescription>Compare and choose the perfect plan for your business</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {subscriptionPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative p-6 border rounded-lg ${
                    plan.isPopular ? 'border-[#2563EB] ring-2 ring-[#2563EB]' : 'border-[#E5E7EB]'
                  }`}
                >
                  {plan.isPopular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      Most Popular
                    </Badge>
                  )}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-[#111827] mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold text-[#111827] mb-1">
                      {formatCurrency(plan.price)}
                      <span className="text-lg text-[#6B7280]">/month</span>
                    </div>
                    <p className="text-sm text-[#6B7280] mb-6">{plan.description}</p>
                    <ul className="space-y-2 mb-6 text-left">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-[#10B981]" />
                          <span className="text-sm text-[#6B7280]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full"
                      variant={plan.isPopular ? 'default' : 'outline'}
                    >
                      {plan.id === currentPlan.id ? 'Current Plan' : 'Choose Plan'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Billing Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5" />
              <span>Billing Alerts</span>
            </CardTitle>
            <CardDescription>Stay informed about your account status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#FEF3C7] border border-[#F59E0B] rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-[#F59E0B]" />
                  <div>
                    <p className="font-medium text-[#111827]">Payment Method Expiring Soon</p>
                    <p className="text-sm text-[#6B7280]">
                      Your card ending in 4242 expires in 2 months. Please update your payment method.
                    </p>
                  </div>
                </div>
                <Button size="sm">Update</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-[#ECFDF5] border border-[#10B981] rounded-lg">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-[#10B981]" />
                  <div>
                    <p className="font-medium text-[#111827]">All Systems Operational</p>
                    <p className="text-sm text-[#6B7280]">
                      Your subscription is active and up to date.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      {/* View Invoice Modal */}
      <Modal
        isOpen={viewInvoiceModal}
        onClose={() => setViewInvoiceModal(false)}
        title="Invoice Details"
        size="lg"
      >
        {selectedInvoice && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-900">Invoice Number</h3>
                <p className="text-gray-600">{selectedInvoice.id}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Date</h3>
                <p className="text-gray-600">{formatDate(selectedInvoice.date)}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Amount</h3>
                <p className="text-gray-600">{formatCurrency(selectedInvoice.amount)}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Status</h3>
                <Badge 
                  variant={selectedInvoice.status === 'paid' ? 'success' : 'secondary'}
                  className="text-xs"
                >
                  {selectedInvoice.status}
                </Badge>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Description</h3>
              <p className="text-gray-600">{selectedInvoice.description}</p>
            </div>
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setViewInvoiceModal(false)}>
                Close
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Payment Method Modal */}
      <Modal
        isOpen={paymentMethodModal}
        onClose={() => setPaymentMethodModal(false)}
        title="Payment Method"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="MM/YY"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVC
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setPaymentMethodModal(false)}>
              Cancel
            </Button>
            <Button>
              Save Payment Method
            </Button>
          </div>
        </div>
          </Modal>

          {/* New Billing Modals */}
          <ChangePlanModal
            isOpen={changePlanModal}
            onClose={() => setChangePlanModal(false)}
            currentPlan={currentPlan}
            availablePlans={subscriptionPlans}
            onPlanChange={handlePlanChange}
          />

          <PaymentMethodModal
            isOpen={paymentMethodModal}
            onClose={() => setPaymentMethodModal(false)}
            onSave={handleSavePaymentMethod}
          />

          <BillingHistoryModal
            isOpen={billingHistoryModal}
            onClose={() => setBillingHistoryModal(false)}
            invoices={invoices}
          />
        </DashboardLayout>
      );
    }
