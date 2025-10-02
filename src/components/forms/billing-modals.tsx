'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Check, AlertCircle, Users, Zap } from 'lucide-react';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  maxUsers: number;
  features: string[];
  description: string;
}

interface ChangePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: SubscriptionPlan;
  availablePlans: SubscriptionPlan[];
  onPlanChange: (planId: string) => void;
}

export function ChangePlanModal({ isOpen, onClose, currentPlan, availablePlans, onPlanChange }: ChangePlanModalProps) {
  const [selectedPlan, setSelectedPlan] = useState(currentPlan.id);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlanChange = async () => {
    if (selectedPlan === currentPlan.id) {
      onClose();
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onPlanChange(selectedPlan);
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  const formatPrice = (price: number, interval: string) => {
    return `$${price}/${interval === 'monthly' ? 'month' : 'year'}`;
  };

  const getPlanIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'starter': return Users;
      case 'professional': return Zap;
      case 'enterprise': return CreditCard;
      default: return Users;
    }
  };

  const getPlanColor = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'starter': return 'border-gray-300';
      case 'professional': return 'border-blue-500 bg-blue-50';
      case 'enterprise': return 'border-purple-500 bg-purple-50';
      default: return 'border-gray-300';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Subscription Plan" size="lg">
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-600 mb-4">
            Choose the plan that best fits your team&apos;s needs. You can upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {availablePlans.map((plan) => {
            const PlanIcon = getPlanIcon(plan.name);
            const isSelected = selectedPlan === plan.id;
            const isCurrent = currentPlan.id === plan.id;
            
            return (
              <Card 
                key={plan.id} 
                className={`cursor-pointer transition-all ${
                  isSelected ? getPlanColor(plan.name) : 'border-gray-300 hover:border-gray-400'
                } ${isCurrent ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <PlanIcon className="h-5 w-5 text-gray-600" />
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                    </div>
                    {isCurrent && (
                      <Badge variant="default">Current</Badge>
                    )}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPrice(plan.price, plan.interval)}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                    {plan.features.length > 4 && (
                      <li className="text-sm text-gray-500">
                        +{plan.features.length - 4} more features
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {selectedPlan !== currentPlan.id && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Plan Change Notice</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Your billing will be prorated based on your current usage. 
                  Changes will take effect immediately.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handlePlanChange}
            disabled={isLoading || selectedPlan === currentPlan.id}
          >
            {isLoading ? 'Processing...' : 'Change Plan'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (paymentData: any) => void;
}

export function PaymentMethodModal({ isOpen, onClose, onSave }: PaymentMethodModalProps) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardholderName: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSave(formData);
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData({...formData, cardNumber: formatted});
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Payment Method" size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number *
            </label>
            <Input
              value={formData.cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date *
              </label>
              <Input
                value={formData.expiryDate}
                onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                placeholder="MM/YY"
                maxLength={5}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVC *
              </label>
              <Input
                value={formData.cvc}
                onChange={(e) => setFormData({...formData, cvc: e.target.value})}
                placeholder="123"
                maxLength={4}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cardholder Name *
            </label>
            <Input
              value={formData.cardholderName}
              onChange={(e) => setFormData({...formData, cardholderName: e.target.value})}
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Billing Address *
            </label>
            <Input
              value={formData.billingAddress}
              onChange={(e) => setFormData({...formData, billingAddress: e.target.value})}
              placeholder="123 Main Street"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <Input
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                placeholder="San Francisco"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <Select
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
                required
              >
                <option value="">Select State</option>
                <option value="CA">California</option>
                <option value="NY">New York</option>
                <option value="TX">Texas</option>
                <option value="FL">Florida</option>
                <option value="IL">Illinois</option>
                {/* Add more states as needed */}
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ZIP Code *
              </label>
              <Input
                value={formData.zipCode}
                onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                placeholder="94105"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country *
              </label>
              <Select
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                required
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
              </Select>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <CreditCard className="h-5 w-5 text-gray-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Secure Payment</h4>
              <p className="text-sm text-gray-600 mt-1">
                Your payment information is encrypted and secure. We use industry-standard SSL encryption 
                to protect your data.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Payment Method'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

interface BillingHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoices: Array<{
    id: string;
    date: Date;
    description: string;
    amount: number;
    status: string;
  }>;
}

export function BillingHistoryModal({ isOpen, onClose, invoices }: BillingHistoryModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Billing History" size="lg">
      <div className="space-y-4">
        <div className="space-y-3">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{invoice.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{invoice.id}</span>
                    <span>•</span>
                    <span>{invoice.date.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    ${invoice.amount.toFixed(2)}
                  </p>
                  <Badge
                    variant={invoice.status === 'paid' ? 'success' : 'secondary'}
                    className="text-xs"
                  >
                    {invoice.status}
                  </Badge>
                </div>
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
