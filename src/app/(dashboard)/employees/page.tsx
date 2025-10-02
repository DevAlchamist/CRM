'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ConfirmModal } from '@/components/ui/modal';
import { ViewEmployeeModal, AddEditEmployeeModal } from '@/components/forms/employee-modals';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Mail, 
  Phone,
  Calendar,
  Shield,
  User,
  Settings,
  Eye,
  Edit,
  Trash2,
  Building2
} from 'lucide-react';
import { demoUsers } from '@/data/demo';
import { formatDate, getInitials } from '@/lib/utils';
import { User as UserType } from '@/types';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState(demoUsers);
  const [selectedEmployee, setSelectedEmployee] = useState<UserType | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(user => user.isActive).length;
  const adminCount = employees.filter(user => user.role === 'admin').length;

  const handleViewEmployee = (employee: UserType) => {
    setSelectedEmployee(employee);
    setViewModalOpen(true);
  };

  const handleEditEmployee = (employee: UserType) => {
    setSelectedEmployee(employee);
    setEditModalOpen(true);
  };

  const handleDeleteEmployee = (employee: UserType) => {
    setSelectedEmployee(employee);
    setDeleteModalOpen(true);
  };

  const handleSaveEmployee = (employeeData: Partial<UserType>) => {
    if (selectedEmployee) {
      // Edit existing employee
      setEmployees(employees.map(e => 
        e.id === selectedEmployee.id 
          ? { ...e, ...employeeData }
          : e
      ));
    } else {
      // Add new employee
      const newEmployee: UserType = {
        id: Date.now().toString(),
        name: employeeData.name || '',
        email: employeeData.email || '',
        role: employeeData.role || 'employee',
        isActive: employeeData.isActive ?? true,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${employeeData.name}`,
        phone: employeeData.phone || '',
        department: employeeData.department || '',
        createdAt: new Date(),
        lastLoginAt: null,
      };
      setEmployees([...employees, newEmployee]);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedEmployee) {
      setEmployees(employees.filter(e => e.id !== selectedEmployee.id));
      setSelectedEmployee(null);
    }
  };
  const managerCount = employees.filter(user => user.role === 'manager').length;

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (employee.department && employee.department.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'employee': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return Shield;
      case 'manager': return Settings;
      default: return User;
    }
  };

  return (
    <DashboardLayout title="Employees" userRole="admin">
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6B7280]">
                Total Employees
              </CardTitle>
              <Building2 className="h-4 w-4 text-[#2563EB]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#111827]">
                {totalEmployees}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6B7280]">
                Active Employees
              </CardTitle>
              <User className="h-4 w-4 text-[#10B981]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#111827]">
                {activeEmployees}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6B7280]">
                Managers
              </CardTitle>
              <Settings className="h-4 w-4 text-[#F59E0B]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#111827]">
                {managerCount}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6B7280]">
                Admins
              </CardTitle>
              <Shield className="h-4 w-4 text-[#DC2626]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#111827]">
                {adminCount}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Employee Management */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  Manage your team members and their roles
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button onClick={() => {
                  setSelectedEmployee(null);
                  setAddModalOpen(true);
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Invite Employee
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                <Input
                  placeholder="Search employees..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Employees List */}
            <div className="space-y-4">
              {filteredEmployees.map((employee) => {
                const RoleIcon = getRoleIcon(employee.role);
                return (
                  <div
                    key={employee.id}
                    className="flex items-center space-x-4 p-4 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={employee.avatar} />
                      <AvatarFallback>
                        {getInitials(employee.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-semibold text-[#111827] truncate">
                          {employee.name}
                        </h3>
                        <Badge className={`text-xs ${getRoleColor(employee.role)}`}>
                          <RoleIcon className="h-3 w-3 mr-1" />
                          {employee.role}
                        </Badge>
                        {employee.isActive ? (
                          <Badge variant="success" className="text-xs">Active</Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">Inactive</Badge>
                        )}
                      </div>
                      <p className="text-sm text-[#6B7280] truncate">
                        {employee.email}
                      </p>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1 text-xs text-[#6B7280]">
                          <Mail className="h-3 w-3" />
                          <span>{employee.email}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-[#6B7280]">
                          <Calendar className="h-3 w-3" />
                          <span>Joined {formatDate(employee.createdAt)}</span>
                        </div>
                        {employee.lastLoginAt && (
                          <div className="flex items-center space-x-1 text-xs text-[#6B7280]">
                            <User className="h-3 w-3" />
                            <span>Last login {formatDate(employee.lastLoginAt)}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleViewEmployee(employee)}
                        title="View Employee"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditEmployee(employee)}
                        title="Edit Employee"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteEmployee(employee)}
                        title="Delete Employee"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Role Management */}
        <Card>
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
            <CardDescription>Manage role-based access and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Admin Role */}
              <div className="p-4 border border-[#E5E7EB] rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Shield className="h-5 w-5 text-[#DC2626]" />
                  <h3 className="font-semibold text-[#111827]">Administrator</h3>
                </div>
                <p className="text-sm text-[#6B7280] mb-4">
                  Full access to all features and settings
                </p>
                <ul className="space-y-2 text-sm text-[#6B7280]">
                  <li className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 bg-[#10B981] rounded-full"></div>
                    <span>Manage all users</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 bg-[#10B981] rounded-full"></div>
                    <span>Access billing & settings</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 bg-[#10B981] rounded-full"></div>
                    <span>View all reports</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 bg-[#10B981] rounded-full"></div>
                    <span>System configuration</span>
                  </li>
                </ul>
              </div>

              {/* Manager Role */}
              <div className="p-4 border border-[#E5E7EB] rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Settings className="h-5 w-5 text-[#F59E0B]" />
                  <h3 className="font-semibold text-[#111827]">Manager</h3>
                </div>
                <p className="text-sm text-[#6B7280] mb-4">
                  Manage team and oversee operations
                </p>
                <ul className="space-y-2 text-sm text-[#6B7280]">
                  <li className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 bg-[#10B981] rounded-full"></div>
                    <span>Manage team members</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 bg-[#10B981] rounded-full"></div>
                    <span>View team reports</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 bg-[#10B981] rounded-full"></div>
                    <span>Assign tasks & leads</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 bg-[#6B7280] rounded-full"></div>
                    <span>Limited settings access</span>
                  </li>
                </ul>
              </div>

              {/* Employee Role */}
              <div className="p-4 border border-[#E5E7EB] rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <User className="h-5 w-5 text-[#10B981]" />
                  <h3 className="font-semibold text-[#111827]">Employee</h3>
                </div>
                <p className="text-sm text-[#6B7280] mb-4">
                  Standard user with basic CRM access
                </p>
                <ul className="space-y-2 text-sm text-[#6B7280]">
                  <li className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 bg-[#10B981] rounded-full"></div>
                    <span>Manage own customers</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 bg-[#10B981] rounded-full"></div>
                    <span>View assigned leads</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 bg-[#10B981] rounded-full"></div>
                    <span>Manage own tasks</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 bg-[#6B7280] rounded-full"></div>
                    <span>No admin privileges</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Employee Activity</CardTitle>
            <CardDescription>Latest actions and updates from your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  user: 'Sarah Johnson',
                  action: 'Updated customer profile',
                  target: 'Acme Corporation',
                  time: '2 minutes ago',
                  avatar: demoUsers[1].avatar,
                },
                {
                  user: 'Mike Wilson',
                  action: 'Created new lead',
                  target: 'Startup Package Deal',
                  time: '15 minutes ago',
                  avatar: demoUsers[2].avatar,
                },
                {
                  user: 'John Smith',
                  action: 'Completed task',
                  target: 'Follow up with Acme Corp',
                  time: '1 hour ago',
                  avatar: demoUsers[0].avatar,
                },
                {
                  user: 'Sarah Johnson',
                  action: 'Added note to lead',
                  target: 'Enterprise CRM Implementation',
                  time: '2 hours ago',
                  avatar: demoUsers[1].avatar,
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 hover:bg-[#F9FAFB] rounded-lg transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.avatar} />
                    <AvatarFallback>
                      {getInitials(activity.user)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#111827]">
                      <span className="font-medium">{activity.user}</span>{' '}
                      {activity.action}{' '}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-[#6B7280]">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      {selectedEmployee && (
        <>
          <ViewEmployeeModal
            isOpen={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            employee={selectedEmployee}
          />
          <AddEditEmployeeModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            employee={selectedEmployee}
            onSave={handleSaveEmployee}
          />
        </>
      )}

      <AddEditEmployeeModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={handleSaveEmployee}
      />

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Employee"
        message={`Are you sure you want to delete ${selectedEmployee?.name}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </DashboardLayout>
  );
}
