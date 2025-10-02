'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Building2, Users, DollarSign, Shield, AlertTriangle, CheckCircle, Eye, Edit, Trash2 } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  email: string;
  plan: string;
  status: string;
  users: number;
  revenue: number;
  createdAt: Date;
  lastActive: Date;
}

interface ViewCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company | null;
}

export function ViewCompanyModal({ isOpen, onClose, company }: ViewCompanyModalProps) {
  if (!company) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Company Details" size="lg">
      <div className="space-y-6">
        {/* Company Header */}
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 bg-[#2563EB] rounded-lg flex items-center justify-center">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#111827]">{company.name}</h3>
            <p className="text-[#6B7280]">{company.email}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant={company.status === 'active' ? 'success' : 'secondary'}>
                {company.status}
              </Badge>
              <Badge variant="outline">{company.plan}</Badge>
            </div>
          </div>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-[#6B7280]" />
              <span className="text-sm font-medium text-[#111827]">Users</span>
            </div>
            <p className="text-2xl font-bold text-[#111827] mt-1">{company.users}</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-[#6B7280]" />
              <span className="text-sm font-medium text-[#111827]">Revenue</span>
            </div>
            <p className="text-2xl font-bold text-[#111827] mt-1">${company.revenue.toLocaleString()}</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-[#6B7280]" />
              <span className="text-sm font-medium text-[#111827]">Plan</span>
            </div>
            <p className="text-2xl font-bold text-[#111827] mt-1 capitalize">{company.plan}</p>
          </div>
        </div>

        {/* Company Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-[#111827] mb-3">Company Information</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-[#6B7280]">Company Name:</span>
                <span className="text-sm font-medium text-[#111827]">{company.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#6B7280]">Email:</span>
                <span className="text-sm font-medium text-[#111827]">{company.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#6B7280]">Status:</span>
                <Badge variant={company.status === 'active' ? 'success' : 'secondary'} className="text-xs">
                  {company.status}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#6B7280]">Plan:</span>
                <span className="text-sm font-medium text-[#111827] capitalize">{company.plan}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-[#111827] mb-3">Activity</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-[#6B7280]">Created:</span>
                <span className="text-sm font-medium text-[#111827]">{company.createdAt.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#6B7280]">Last Active:</span>
                <span className="text-sm font-medium text-[#111827]">{company.lastActive.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#6B7280]">Total Users:</span>
                <span className="text-sm font-medium text-[#111827]">{company.users}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#6B7280]">Revenue:</span>
                <span className="text-sm font-medium text-[#111827]">${company.revenue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Edit Company
          </Button>
        </div>
      </div>
    </Modal>
  );
}

interface EditCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company | null;
  onSave: (companyData: Partial<Company>) => void;
}

export function EditCompanyModal({ isOpen, onClose, company, onSave }: EditCompanyModalProps) {
  const [formData, setFormData] = useState({
    name: company?.name || '',
    email: company?.email || '',
    plan: company?.plan || 'starter',
    status: company?.status || 'active',
    notes: ''
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Company" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name *
          </label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
            placeholder="Company Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
            placeholder="company@example.com"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plan
            </label>
            <Select
              value={formData.plan}
              onChange={(e) => setFormData({...formData, plan: e.target.value})}
            >
              <option value="starter">Starter</option>
              <option value="professional">Professional</option>
              <option value="enterprise">Enterprise</option>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <Select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="cancelled">Cancelled</option>
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Admin Notes
          </label>
          <Textarea
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            placeholder="Internal notes about this company..."
            rows={3}
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  status: string;
  lastActive: Date;
  avatar?: string;
}

interface ViewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export function ViewUserModal({ isOpen, onClose, user }: ViewUserModalProps) {
  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Details" size="md">
      <div className="space-y-6">
        {/* User Header */}
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-lg">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold text-[#111827]">{user.name}</h3>
            <p className="text-[#6B7280]">{user.email}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
                {user.status}
              </Badge>
              <Badge variant="outline">{user.role}</Badge>
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-[#111827] mb-3">User Information</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-[#6B7280]">Name:</span>
                <span className="text-sm font-medium text-[#111827]">{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#6B7280]">Email:</span>
                <span className="text-sm font-medium text-[#111827]">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#6B7280]">Role:</span>
                <span className="text-sm font-medium text-[#111827] capitalize">{user.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#6B7280]">Company:</span>
                <span className="text-sm font-medium text-[#111827]">{user.company}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-[#111827] mb-3">Activity</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-[#6B7280]">Status:</span>
                <Badge variant={user.status === 'active' ? 'success' : 'secondary'} className="text-xs">
                  {user.status}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#6B7280]">Last Active:</span>
                <span className="text-sm font-medium text-[#111827]">{user.lastActive.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Edit User
          </Button>
        </div>
      </div>
    </Modal>
  );
}

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (userData: Partial<User>) => void;
}

export function EditUserModal({ isOpen, onClose, user, onSave }: EditUserModalProps) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'employee',
    status: user?.status || 'active',
    notes: ''
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit User" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
            placeholder="john@company.com"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <Select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <Select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Admin Notes
          </label>
          <Textarea
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            placeholder="Internal notes about this user..."
            rows={3}
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
