'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { ViewCompanyModal, EditCompanyModal, ViewUserModal, EditUserModal } from '@/components/forms/admin-modals';
import { 
  Building2, 
  Users, 
  DollarSign, 
  TrendingUp,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  MoreHorizontal,
  Settings,
  UserPlus,
  Download,
  Search,
  Eye,
  Edit,
  Trash2,
  Plus,
  RefreshCw
} from 'lucide-react';
import { formatCurrency, formatNumber, formatPercentage, formatDate, getInitials } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewCompanyModal, setViewCompanyModal] = useState(false);
  const [editCompanyModal, setEditCompanyModal] = useState(false);
  const [deleteCompanyModal, setDeleteCompanyModal] = useState(false);
  const [viewUserModal, setViewUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Event handlers
  const handleViewCompany = (company: any) => {
    setSelectedCompany(company);
    setViewCompanyModal(true);
  };

  const handleEditCompany = (company: any) => {
    setSelectedCompany(company);
    setEditCompanyModal(true);
  };

  const handleDeleteCompany = (company: any) => {
    setSelectedCompany(company);
    setDeleteCompanyModal(true);
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setViewUserModal(true);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setEditUserModal(true);
  };

  const handleDeleteUser = (user: any) => {
    setSelectedUser(user);
    setDeleteUserModal(true);
  };

  const handleSaveCompany = (companyData: any) => {
    console.log('Saving company:', companyData);
    // In a real app, this would make an API call
  };

  const handleSaveUser = (userData: any) => {
    console.log('Saving user:', userData);
    // In a real app, this would make an API call
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Super Admin Dashboard Data
  const adminStats = {
    totalCompanies: 1247,
    activeUsers: 15623,
    totalRevenue: 2847500,
    monthlyGrowth: 18.5,
    churnRate: 3.2,
    mrr: 237292,
    arr: 2847500,
  };

  const companies = [
    {
      id: '1',
      name: 'TechCorp Solutions',
      industry: 'Technology',
      size: 'Medium',
      subscription: 'Pro',
      users: 12,
      revenue: 948,
      status: 'active',
      joinDate: new Date('2024-01-15'),
      lastActivity: new Date('2024-12-01'),
    },
    {
      id: '2',
      name: 'GrowthCo Inc',
      industry: 'Marketing',
      size: 'Large',
      subscription: 'Enterprise',
      users: 45,
      revenue: 3580,
      status: 'active',
      joinDate: new Date('2024-02-20'),
      lastActivity: new Date('2024-11-30'),
    },
    {
      id: '3',
      name: 'StartupIO',
      industry: 'Technology',
      size: 'Small',
      subscription: 'Basic',
      users: 8,
      revenue: 232,
      status: 'trial',
      joinDate: new Date('2024-11-25'),
      lastActivity: new Date('2024-12-01'),
    },
    {
      id: '4',
      name: 'MedCorp Health',
      industry: 'Healthcare',
      size: 'Large',
      subscription: 'Enterprise',
      users: 67,
      revenue: 5360,
      status: 'active',
      joinDate: new Date('2024-03-10'),
      lastActivity: new Date('2024-11-29'),
    },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 180000, companies: 1200 },
    { month: 'Feb', revenue: 195000, companies: 1250 },
    { month: 'Mar', revenue: 210000, companies: 1300 },
    { month: 'Apr', revenue: 225000, companies: 1350 },
    { month: 'May', revenue: 240000, companies: 1400 },
    { month: 'Jun', revenue: 255000, companies: 1450 },
    { month: 'Jul', revenue: 270000, companies: 1500 },
    { month: 'Aug', revenue: 285000, companies: 1550 },
    { month: 'Sep', revenue: 300000, companies: 1600 },
    { month: 'Oct', revenue: 315000, companies: 1650 },
    { month: 'Nov', revenue: 330000, companies: 1700 },
    { month: 'Dec', revenue: 237292, companies: 1247 },
  ];

  const subscriptionData = [
    { plan: 'Free', count: 847, revenue: 0 },
    { plan: 'Basic', count: 234, revenue: 6786 },
    { plan: 'Pro', count: 156, revenue: 12324 },
    { plan: 'Enterprise', count: 10, revenue: 1990 },
  ];

  return (
    <DashboardLayout title="Super Admin Panel" userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-2 mb-6">
          <Shield className="h-8 w-8 text-[#DC2626]" />
          <div>
            <h1 className="text-2xl font-bold text-[#111827]">Super Admin Panel</h1>
            <p className="text-[#6B7280]">Manage all companies and system-wide operations</p>
          </div>
        </div>

        {/* Admin KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6B7280]">
                Total Companies
              </CardTitle>
              <Building2 className="h-4 w-4 text-[#2563EB]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#111827]">
                {formatNumber(adminStats.totalCompanies)}
              </div>
              <p className="text-xs text-[#6B7280]">
                <span className="text-[#10B981]">+12</span> this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6B7280]">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-[#10B981]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#111827]">
                {formatNumber(adminStats.activeUsers)}
              </div>
              <p className="text-xs text-[#6B7280]">
                <span className="text-[#10B981]">+{formatPercentage(adminStats.monthlyGrowth)}</span> growth
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6B7280]">
                Monthly Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-[#F59E0B]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#111827]">
                {formatCurrency(adminStats.mrr)}
              </div>
              <p className="text-xs text-[#6B7280]">
                ARR: {formatCurrency(adminStats.arr)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6B7280]">
                Churn Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-[#DC2626]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#111827]">
                {formatPercentage(adminStats.churnRate)}
              </div>
              <p className="text-xs text-[#6B7280]">
                <span className="text-[#DC2626]">+0.2%</span> this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly recurring revenue over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '6px',
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#2563EB" 
                    strokeWidth={2}
                    dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Subscription Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Subscription Distribution</CardTitle>
              <CardDescription>Companies by subscription plan</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subscriptionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="plan" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '6px',
                    }}
                  />
                  <Bar dataKey="count" fill="#2563EB" name="Companies" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Company Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Company Management</CardTitle>
                <CardDescription>Manage all companies and their subscriptions</CardDescription>
              </div>
              <div className="flex flex-wrap items-center space-x-2 space-y-2 sm:space-y-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search companies..."
                    className="pl-10 w-48"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Company
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {companies.map((company) => (
                <div
                  key={company.id}
                  className="flex items-center space-x-4 p-4 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors"
                >
                  <div className="h-12 w-12 bg-[#F3F4F6] rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-[#6B7280]" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-semibold text-[#111827] truncate">
                        {company.name}
                      </h3>
                      <Badge 
                        variant={company.status === 'active' ? 'success' : 'secondary'}
                        className="text-xs"
                      >
                        {company.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#6B7280] truncate">
                      {company.industry} • {company.size} • {company.users} users
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-[#6B7280]">
                        Joined {formatDate(company.joinDate)}
                      </span>
                      <span className="text-xs text-[#6B7280]">
                        Last activity {formatDate(company.lastActivity)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[#111827]">
                        {formatCurrency(company.revenue)}/mo
                      </p>
                      <p className="text-xs text-[#6B7280]">
                        {company.subscription}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleViewCompany(company)}
                        title="View Company"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditCompany(company)}
                        title="Edit Company"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteCompany(company)}
                        title="Delete Company"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="More Options">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Current system health and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { service: 'API Server', status: 'operational', uptime: '99.9%' },
                  { service: 'Database', status: 'operational', uptime: '99.8%' },
                  { service: 'Email Service', status: 'operational', uptime: '99.7%' },
                  { service: 'File Storage', status: 'operational', uptime: '99.9%' },
                  { service: 'Payment Processing', status: 'operational', uptime: '99.6%' },
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {service.status === 'operational' ? (
                        <CheckCircle className="h-5 w-5 text-[#10B981]" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-[#DC2626]" />
                      )}
                      <div>
                        <p className="font-medium text-[#111827]">{service.service}</p>
                        <p className="text-xs text-[#6B7280]">Uptime: {service.uptime}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={service.status === 'operational' ? 'success' : 'destructive'}
                      className="text-xs"
                    >
                      {service.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system-wide activities and changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: 'New company registered',
                    company: 'TechStart Inc',
                    time: '2 hours ago',
                    icon: UserPlus,
                  },
                  {
                    action: 'Subscription upgraded',
                    company: 'GrowthCo Inc',
                    time: '4 hours ago',
                    icon: TrendingUp,
                  },
                  {
                    action: 'Payment processed',
                    company: 'MedCorp Health',
                    time: '6 hours ago',
                    icon: DollarSign,
                  },
                  {
                    action: 'Support ticket resolved',
                    company: 'StartupIO',
                    time: '8 hours ago',
                    icon: CheckCircle,
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="p-2 bg-[#F3F4F6] rounded-lg">
                      <activity.icon className="h-4 w-4 text-[#6B7280]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#111827]">
                        {activity.action} - <span className="font-medium">{activity.company}</span>
                      </p>
                      <p className="text-xs text-[#6B7280]">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      {/* View Company Modal */}
      <Modal
        isOpen={viewCompanyModal}
        onClose={() => setViewCompanyModal(false)}
        title="Company Details"
        size="lg"
      >
        {selectedCompany && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-[#F3F4F6] rounded-lg flex items-center justify-center">
                <Building2 className="h-8 w-8 text-[#6B7280]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{selectedCompany.name}</h3>
                <p className="text-gray-600">{selectedCompany.industry}</p>
                <Badge 
                  variant={selectedCompany.status === 'active' ? 'success' : 'secondary'}
                  className="mt-1"
                >
                  {selectedCompany.status}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Company Information</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-500">Industry:</span>
                    <p className="text-sm">{selectedCompany.industry}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Company Size:</span>
                    <p className="text-sm">{selectedCompany.size}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Users:</span>
                    <p className="text-sm">{selectedCompany.users}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Joined:</span>
                    <p className="text-sm">{formatDate(selectedCompany.joinDate)}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Subscription Details</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-500">Plan:</span>
                    <p className="text-sm">{selectedCompany.subscription}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Monthly Revenue:</span>
                    <p className="text-sm">{formatCurrency(selectedCompany.revenue)}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Last Activity:</span>
                    <p className="text-sm">{formatDate(selectedCompany.lastActivity)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setViewCompanyModal(false)}>
                Close
              </Button>
              <Button onClick={() => handleEditCompany(selectedCompany)}>
                Edit Company
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Company Modal */}
      <Modal
        isOpen={editCompanyModal}
        onClose={() => setEditCompanyModal(false)}
        title="Edit Company"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <Input defaultValue={selectedCompany?.name} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="technology">Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="finance">Finance</option>
              <option value="education">Education</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Size
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="startup">Startup (1-10)</option>
                <option value="small">Small (11-50)</option>
                <option value="medium">Medium (51-200)</option>
                <option value="large">Large (200+)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subscription Plan
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="free">Free</option>
                <option value="basic">Basic</option>
                <option value="pro">Pro</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setEditCompanyModal(false)}>
              Cancel
            </Button>
            <Button>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Company Modal */}
      <Modal
        isOpen={deleteCompanyModal}
        onClose={() => setDeleteCompanyModal(false)}
        title="Delete Company"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div>
              <p className="font-medium text-red-900">Warning</p>
              <p className="text-sm text-red-700">
                This action cannot be undone. This will permanently delete the company and all its data.
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Are you sure you want to delete <strong>{selectedCompany?.name}</strong>? 
            All associated users and data will be permanently removed.
          </p>
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setDeleteCompanyModal(false)}>
              Cancel
            </Button>
            <Button variant="destructive">
              Delete Company
            </Button>
          </div>
        </div>
      </Modal>

      {/* New Admin Modals */}
      <ViewCompanyModal
        isOpen={viewCompanyModal}
        onClose={() => setViewCompanyModal(false)}
        company={selectedCompany}
      />

      <EditCompanyModal
        isOpen={editCompanyModal}
        onClose={() => setEditCompanyModal(false)}
        company={selectedCompany}
        onSave={handleSaveCompany}
      />

      <ViewUserModal
        isOpen={viewUserModal}
        onClose={() => setViewUserModal(false)}
        user={selectedUser}
      />

      <EditUserModal
        isOpen={editUserModal}
        onClose={() => setEditUserModal(false)}
        user={selectedUser}
        onSave={handleSaveUser}
      />
    </DashboardLayout>
  );
}
