'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types';
import { getInitials } from '@/lib/utils';
import { usePermissions } from '@/hooks/usePermissions';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';

interface ViewEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: User;
}

export function ViewEmployeeModal({ isOpen, onClose, employee }: ViewEmployeeModalProps) {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'employee': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Employee Details" size="lg">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={employee.avatar} />
            <AvatarFallback className="text-lg">
              {getInitials(employee.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold">{employee.name}</h3>
            <p className="text-gray-600">{employee.email}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className={`text-xs ${getRoleColor(employee.role)}`}>
                {employee.role}
              </Badge>
              <Badge className={`text-xs ${getStatusColor(employee.isActive)}`}>
                {employee.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Contact Information</h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Email:</span>
                <p className="text-sm">{employee.email}</p>
              </div>
              {employee.phone && (
                <div>
                  <span className="text-sm text-gray-500">Phone:</span>
                  <p className="text-sm">{employee.phone}</p>
                </div>
              )}
              {employee.department && (
                <div>
                  <span className="text-sm text-gray-500">Department:</span>
                  <p className="text-sm">{employee.department}</p>
                </div>
              )}
              {employee.managerName && (
                <div>
                  <span className="text-sm text-gray-500">Reports to:</span>
                  <p className="text-sm font-medium">{employee.managerName}</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Work Information</h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Role:</span>
                <p className="text-sm capitalize">{employee.role}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Joined:</span>
                <p className="text-sm">{employee.createdAt.toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Last Active:</span>
                <p className="text-sm">{employee.lastLoginAt?.toLocaleDateString() || 'Never'}</p>
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
            Edit Employee
          </Button>
        </div>
      </div>
    </Modal>
  );
}

interface AddEditEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee?: User;
  onSave: (employee: Partial<User>) => void;
}

export function AddEditEmployeeModal({ isOpen, onClose, employee, onSave }: AddEditEmployeeModalProps) {
  const { can, hasRole } = usePermissions();
  const { user } = useAuth();
  const [managers, setManagers] = useState<User[]>([]);
  const [isLoadingManagers, setIsLoadingManagers] = useState(false);
  const hasFetchedManagers = useRef(false);

  const [formData, setFormData] = useState({
    name: employee?.name || '',
    email: employee?.email || '',
    phone: employee?.phone || '',
    role: employee?.role || 'employee',
    department: employee?.department || '',
    managerId: employee?.managerId || '',
    managerName: employee?.managerName || '',
    isActive: employee?.isActive ?? true,
  });

  const roles = [
    { value: 'employee', label: 'Employee' },
    { value: 'manager', label: 'Manager' },
    { value: 'admin', label: 'Admin' },
  ];

  const departments = [
    'Sales',
    'Marketing',
    'Customer Support',
    'Development',
    'Design',
    'Operations',
    'HR',
    'Finance',
  ];

  // Fetch potential managers/supervisors when modal opens
  useEffect(() => {
    if (isOpen && can('manage_roles') && !hasFetchedManagers.current) {
      const fetchManagers = async () => {
        try {
          setIsLoadingManagers(true);
          
          // Build query based on current user's role and permissions
          let rolesQuery = 'roles=manager,admin';
          
          // If current user is admin, they can assign to anyone
          // If current user is manager, they can assign to admins or other managers
          if (hasRole('admin')) {
            rolesQuery = 'roles=employee,manager,admin'; // Admins can assign to anyone
          } else if (hasRole('manager')) {
            rolesQuery = 'roles=employee,manager,admin'; // Managers can assign to anyone
          }
          
          const { body } = await api.get(`users?${rolesQuery}&limit=100`);
          const data = body as { result?: { data?: User[] }; data?: User[] };
          const list = (data?.result?.data || data?.data || []) as User[];
          
          // Filter out the current user from the list (can't assign to self)
          const filteredList = list.filter((u: User) => u.id !== user?.id);
          
          const normalized: User[] = filteredList.map((u: User) => ({
            id: u.id,
            email: u.email,
            name: u.name,
            role: u.role,
            companyId: u.companyId,
            isActive: u.isActive ?? true,
            avatar: u.avatar,
            phone: u.phone,
            department: u.department,
            managerId: u.managerId,
            managerName: u.managerName,
            createdAt: u.createdAt ? new Date(u.createdAt) : new Date(),
            lastLoginAt: u.lastLoginAt ? new Date(u.lastLoginAt) : undefined,
          }));
          setManagers(normalized);
          hasFetchedManagers.current = true;
        } catch (error) {
          console.error('Failed to fetch managers:', error);
        } finally {
          setIsLoadingManagers(false);
        }
      };
      fetchManagers();
    }
  }, [isOpen, can, hasRole, user?.id]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: employee?.name || '',
        email: employee?.email || '',
        phone: employee?.phone || '',
        role: employee?.role || 'employee',
        department: employee?.department || '',
        managerId: employee?.managerId || '',
        managerName: employee?.managerName || '',
        isActive: employee?.isActive ?? true,
      });
    } else {
      hasFetchedManagers.current = false;
    }
  }, [isOpen, employee]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get manager name if manager is selected
    const selectedManager = managers.find(m => m.id === formData.managerId);
    
    const saveData = {
      ...formData,
      managerName: selectedManager?.name || '',
      isActive: Boolean(formData.isActive),
    };
    
    console.log('Employee modal submitting data:', saveData);
    console.log('Selected manager:', selectedManager);
    console.log('Form data:', formData);
    
    onSave(saveData);
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={employee ? 'Edit Employee' : 'Add New Employee'} 
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'manager' | 'employee' })}
            >
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
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
              value={formData.isActive ? 'active' : 'inactive'}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Supervisor Assignment - For Admins and Managers */}
        {can('manage_roles') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign to Supervisor
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.managerId}
              onChange={(e) => {
                const selectedManager = managers.find(m => m.id === e.target.value);
                setFormData({ 
                  ...formData, 
                  managerId: e.target.value,
                  managerName: selectedManager?.name || ''
                });
              }}
              disabled={isLoadingManagers}
            >
              <option value="">No supervisor assigned</option>
              {managers.map((supervisor) => (
                <option key={supervisor.id} value={supervisor.id}>
                  {supervisor.name} ({supervisor.role})
                </option>
              ))}
            </select>
            {isLoadingManagers && (
              <p className="text-xs text-gray-500 mt-1">Loading supervisors...</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {hasRole('admin') 
                ? "Admins can assign anyone to any supervisor" 
                : hasRole('manager') 
                  ? "Managers can assign employees to any supervisor"
                  : "Select who this person will report to"
              }
            </p>
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {employee ? 'Update Employee' : 'Add Employee'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
