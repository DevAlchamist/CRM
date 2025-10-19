'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { usePermissions } from '@/hooks/usePermissions';
import { Task, Customer, Lead, User } from '@/types';
import { formatDate } from '@/lib/utils';
import api from '@/lib/api';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface ViewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

export function ViewTaskModal({ isOpen, onClose, task }: ViewTaskModalProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'call': return '📞';
      case 'email': return '📧';
      case 'meeting': return '👥';
      case 'follow_up': return '🔄';
      default: return '📋';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Task Details" size="lg">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getTypeIcon(task.type)}</span>
            <div>
              <h3 className="text-xl font-semibold">{task.title}</h3>
              <p className="text-gray-600">Assigned to {task.assignedToName}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Due Date</p>
            <p className="font-medium">{formatDate(task.dueDate)}</p>
          </div>
        </div>

        {/* Status and Priority */}
        <div className="flex items-center space-x-4">
          <Badge className={`text-sm ${getStatusColor(task.status)}`}>
            {task.status.replace('_', ' ')}
          </Badge>
          <Badge className={`text-sm ${getPriorityColor(task.priority)}`}>
            {task.priority} Priority
          </Badge>
          <Badge variant="secondary">
            {task.type.replace('_', ' ')}
          </Badge>
        </div>

        {/* Description */}
        {task.description && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Description</h4>
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
              {task.description}
            </p>
          </div>
        )}

        {/* Related Information */}
        {task.relatedTo && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Related To</h4>
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-sm">
                <span className="font-medium">{task.relatedTo.type}:</span> {task.relatedTo.name}
              </p>
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Timeline</h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Created:</span>
                <p className="text-sm">{formatDate(task.createdAt)}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Last Updated:</span>
                <p className="text-sm">{formatDate(task.updatedAt)}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Due Date:</span>
                <p className="text-sm">{formatDate(task.dueDate)}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Status</h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Current Status:</span>
                <p className="text-sm capitalize">{task.status.replace('_', ' ')}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Priority Level:</span>
                <p className="text-sm capitalize">{task.priority}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>
            Edit Task
          </Button>
        </div>
      </div>
    </Modal>
  );
}

interface AddEditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task;
  onSave: (task: Partial<Task>) => void;
}

export function AddEditTaskModal({ isOpen, onClose, task, onSave }: AddEditTaskModalProps) {
  const { can } = usePermissions();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const hasFetchedData = React.useRef(false);
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    type: task?.type || 'other',
    priority: task?.priority || 'medium',
    status: task?.status || 'pending',
    dueDate: task?.dueDate?.toISOString().split('T')[0] || '',
    assignedTo: task?.assignedTo || '',
    assignedToName: task?.assignedToName || '',
    relatedToType: task?.relatedTo?.type || '',
    relatedToId: task?.relatedTo?.id || '',
    relatedToName: task?.relatedTo?.name || '',
  });

  // Fetch customers, leads, and employees when modal opens
  useEffect(() => {
    if (!isOpen) return;
    
    // Only fetch once - cache the data
    if (hasFetchedData.current) return;
    
    const fetchData = async () => {
      // Prevent multiple simultaneous calls
      if (isLoadingData) return;
      
      hasFetchedData.current = true;
      
      try {
        setIsLoadingData(true);
          
          // Fetch customers
          const { body: customersBody } = await api.get('customers?limit=100');
          const customersData = customersBody as { result?: { data?: Customer[] }; data?: Customer[] };
          const customersList = (customersData?.result?.data || customersData?.data || []) as Customer[];
          const normalizedCustomers: Customer[] = customersList.map((c) => ({
            id: c.id,
            name: c.name,
            email: c.email,
            phone: c.phone ?? '',
            company: typeof c.company === 'string' ? c.company : (c.company as unknown as { name?: string })?.name || '',
            status: c.status ?? 'active',
            source: c.source ?? 'website',
            tags: c.tags ?? [],
            totalValue: c.totalValue ?? 0,
            createdAt: c.createdAt ? new Date(c.createdAt) : new Date(),
            lastContactAt: c.lastContactAt ? new Date(c.lastContactAt) : new Date(),
            notes: c.notes ?? '',
            avatar: c.avatar,
          }));
          setCustomers(normalizedCustomers);

          // Fetch leads
          const { body: leadsBody } = await api.get('leads?limit=100');
          const leadsData = leadsBody as { result?: { data?: Lead[] }; data?: Lead[] };
          const leadsList = (leadsData?.result?.data || leadsData?.data || []) as Lead[];
          const normalizedLeads: Lead[] = leadsList.map((l) => ({
            id: l.id,
            title: l.title,
            customerId: l.customerId,
            customerName: l.customerName,
            value: l.value ?? 0,
            stage: l.stage,
            probability: l.probability ?? 0,
            assignedTo: l.assignedTo ?? '',
            assignedToName: l.assignedToName ?? '',
            source: l.source ?? '',
            createdAt: l.createdAt ? new Date(l.createdAt) : new Date(),
            updatedAt: l.updatedAt ? new Date(l.updatedAt) : new Date(),
            expectedCloseDate: l.expectedCloseDate ? new Date(l.expectedCloseDate) : new Date(),
            description: l.description ?? '',
          }));
          setLeads(normalizedLeads);

          // Fetch employees (if user has permission)
          if (can('assign_task')) {
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
          setIsLoadingData(false);
        }
      };
      
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const taskTypes = [
    { value: 'call', label: 'Phone Call' },
    { value: 'email', label: 'Email' },
    { value: 'meeting', label: 'Meeting' },
    { value: 'follow_up', label: 'Follow Up' },
    { value: 'other', label: 'Other' },
  ];

  const priorities = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  const statuses = [
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      dueDate: new Date(formData.dueDate),
      relatedTo: formData.relatedToId ? {
        type: formData.relatedToType as 'customer' | 'lead',
        id: formData.relatedToId,
        name: formData.relatedToName,
      } : undefined,
    });
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={task ? 'Edit Task' : 'Add New Task'} 
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Task Title *
          </label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Type
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'call' | 'meeting' | 'email' | 'follow_up' | 'other' })}
            >
              {taskTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'high' | 'medium' | 'low' })}
            >
              {priorities.map((priority) => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'pending' | 'in_progress' | 'completed' | 'cancelled' })}
            >
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
          {/* Assigned To - Only show if user has permission */}
          {can('assign_task') && (
            <div>
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
                  {isLoadingData ? 'Loading...' : 'Select team member'}
                </option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name} ({employee.role})
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date *
            </label>
            <Input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Related To Type
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.relatedToType}
              onChange={(e) => {
                setFormData({ 
                  ...formData, 
                  relatedToType: e.target.value,
                  relatedToId: '',
                  relatedToName: ''
                });
              }}
            >
              <option value="">None</option>
              <option value="customer">Customer</option>
              <option value="lead">Lead</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Related To
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.relatedToId}
              onChange={(e) => {
                let selectedItem;
                if (formData.relatedToType === 'customer') {
                  selectedItem = customers.find(c => c.id === e.target.value);
                } else if (formData.relatedToType === 'lead') {
                  selectedItem = leads.find(l => l.id === e.target.value);
                }
                setFormData({ 
                  ...formData, 
                  relatedToId: e.target.value,
                  relatedToName: (selectedItem as Customer)?.name || (selectedItem as Lead)?.title || ''
                });
              }}
              disabled={!formData.relatedToType || isLoadingData}
            >
              <option value="">
                {isLoadingData ? 'Loading...' : `Select a ${formData.relatedToType || 'item'}`}
              </option>
              {formData.relatedToType === 'customer' && customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} ({customer.email})
                </option>
              ))}
              {formData.relatedToType === 'lead' && leads.map((lead) => (
                <option key={lead.id} value={lead.id}>
                  {lead.title} - {lead.customerName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {task ? 'Update Task' : 'Add Task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
