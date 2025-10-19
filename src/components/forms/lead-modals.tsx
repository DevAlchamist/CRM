'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { usePermissions } from '@/hooks/usePermissions';
import { Lead, Customer, User } from '@/types';
import api from '@/lib/api';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface ViewLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead;
}

export function ViewLeadModal({ isOpen, onClose, lead }: ViewLeadModalProps) {
  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'prospect': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-blue-100 text-blue-800';
      case 'proposal': return 'bg-indigo-100 text-indigo-800';
      case 'negotiation': return 'bg-purple-100 text-purple-800';
      case 'closed_won': return 'bg-green-100 text-green-800';
      case 'closed_lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Lead Details" size="lg">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">{lead.title}</h3>
            <p className="text-gray-600">{lead.customerName}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-600">
              ${lead.value.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">{lead.probability}% chance</p>
          </div>
        </div>

        {/* Status and Stage */}
        <div className="flex items-center space-x-4">
          <Badge className={`text-sm ${getStageColor(lead.stage)}`}>
            {lead.stage.replace('_', ' ')}
          </Badge>
          <Badge variant="secondary">
            Source: {lead.source}
          </Badge>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Lead Information</h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Assigned To:</span>
                <p className="text-sm">{lead.assignedToName}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Created:</span>
                <p className="text-sm">{lead.createdAt.toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Last Updated:</span>
                <p className="text-sm">{lead.updatedAt.toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Timeline</h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Expected Close Date:</span>
                <p className="text-sm">{lead.expectedCloseDate.toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Days Until Close:</span>
                <p className="text-sm">
                  {Math.ceil((lead.expectedCloseDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {lead.description && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Description</h4>
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
              {lead.description}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>
            Edit Lead
          </Button>
        </div>
      </div>
    </Modal>
  );
}

interface AddEditLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead?: Lead;
  onSave: (lead: Partial<Lead>) => void;
}

export function AddEditLeadModal({ isOpen, onClose, lead, onSave }: AddEditLeadModalProps) {
  const { can } = usePermissions();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const hasFetchedData = React.useRef(false);
  const [formData, setFormData] = useState({
    title: lead?.title || '',
    customerId: lead?.customerId || '',
    customerName: lead?.customerName || '',
    value: lead?.value || 0,
    stage: lead?.stage || 'prospect',
    probability: lead?.probability || 10,
    source: lead?.source || '',
    expectedCloseDate: lead?.expectedCloseDate?.toISOString().split('T')[0] || '',
    description: lead?.description || '',
    assignedTo: lead?.assignedTo || '',
    assignedToName: lead?.assignedToName || '',
  });

  // Fetch customers and employees when modal opens
  useEffect(() => {
    if (!isOpen) return;
    
    // Only fetch once - cache the data
    if (hasFetchedData.current) return;
    
    const fetchData = async () => {
      // Prevent multiple simultaneous calls
      if (isLoadingCustomers) return;
      
      hasFetchedData.current = true;
      
      try {
        setIsLoadingCustomers(true);
          
          // Fetch customers
          const { body } = await api.get('customers?limit=100');
          const data = body as { result?: { data?: Customer[] }; data?: Customer[] };
          const list = (data?.result?.data || data?.data || []) as Customer[];
          const normalized: Customer[] = list.map((c) => ({
            id: c.id,
            name: c.name,
            email: c.email,
            phone: c.phone ?? '',
            company: c.company || '',
            status: c.status ?? 'active',
            source: c.source ?? 'website',
            tags: c.tags ?? [],
            totalValue: c.totalValue ?? 0,
            createdAt: c.createdAt ? new Date(c.createdAt) : new Date(),
            lastContactAt: c.lastContactAt ? new Date(c.lastContactAt) : new Date(),
            notes: c.notes ?? '',
            avatar: c.avatar,
          }));
          setCustomers(normalized);

          // Fetch employees (if user has permission)
          if (can('assign_lead')) {
            try {
              const { body: employeesBody } = await api.get('users?limit=100');
              const employeesData = employeesBody as { result?: { data?: User[]; users?: User[] }; data?: User[] };
              const employeesList = (employeesData?.result?.data || employeesData?.result?.users || employeesData?.data || []) as User[];
              const normalizedEmployees: Employee[] = employeesList.map((e) => ({
                id: e.id,
                name: e.name,
                email: e.email,
                role: e.role,
              }));
              setEmployees(normalizedEmployees);
            } catch (e) {
              console.error('Failed to fetch employees', e);
            }
          }
        } catch (e) {
          console.error('Failed to fetch data', e);
        } finally {
          setIsLoadingCustomers(false);
        }
      };
      
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const stages = [
    { value: 'prospect', label: 'Prospect' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'proposal', label: 'Proposal' },
    { value: 'negotiation', label: 'Negotiation' },
    { value: 'closed_won', label: 'Closed Won' },
    { value: 'closed_lost', label: 'Closed Lost' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      value: Number(formData.value),
      probability: Number(formData.probability),
      expectedCloseDate: new Date(formData.expectedCloseDate),
    });
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={lead ? 'Edit Lead' : 'Add New Lead'} 
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lead Title *
            </label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.customerId}
              onChange={(e) => {
                const selectedCustomer = customers.find(c => c.id === e.target.value);
                setFormData({ 
                  ...formData, 
                  customerId: e.target.value,
                  customerName: selectedCustomer?.name || ''
                });
              }}
              disabled={isLoadingCustomers}
            >
              <option value="">
                {isLoadingCustomers ? 'Loading customers...' : 'Select a customer (optional)'}
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} ({customer.email})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Value ($) *
            </label>
            <Input
              type="number"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stage
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.stage}
              onChange={(e) => setFormData({ ...formData, stage: e.target.value as 'prospect' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost' })}
            >
              {stages.map((stage) => (
                <option key={stage.value} value={stage.value}>
                  {stage.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Probability (%)
            </label>
            <Input
              type="number"
              min="0"
              max="100"
              value={formData.probability}
              onChange={(e) => setFormData({ ...formData, probability: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Source
            </label>
            <Input
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Close Date
            </label>
            <Input
              type="date"
              value={formData.expectedCloseDate}
              onChange={(e) => setFormData({ ...formData, expectedCloseDate: e.target.value })}
            />
          </div>
          {/* Assigned To - Only show if user has permission */}
          {can('assign_lead') && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assigned To
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.assignedTo}
                onChange={(e) => {
                  const selectedEmployee = employees.find(emp => emp.id === e.target.value);
                  setFormData({ 
                    ...formData, 
                    assignedTo: e.target.value,
                    assignedToName: selectedEmployee?.name || ''
                  });
                }}
              >
                <option value="">
                  {isLoadingCustomers ? 'Loading...' : 'Select team member'}
                </option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name} ({employee.role})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {lead ? 'Update Lead' : 'Add Lead'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
