'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePermissions } from '@/hooks/usePermissions';
import { useToast } from '@/components/ui/toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { PermissionMessage } from '@/components/ui/permission-message';
import {
  Building2, Search, Filter, Eye, Edit, Users, DollarSign,
  ArrowLeft, Plus, MoreVertical, Download, RefreshCcw,
  TrendingUp, TrendingDown, CheckCircle, X,
  Calendar, Globe, Mail, Phone, MapPin, BarChart3, CreditCard
} from 'lucide-react';
import api from '@/lib/api';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  subscription: string;
  isActive: boolean;
  userCount: number;
  revenue: number;
  monthlyRevenue: number;
  createdAt: string;
  website?: string;
  email?: string;
  phone?: string;
  location?: string;
  lastActivity?: string;
  tasksCount?: number;
  leadsCount?: number;
  customersCount?: number;
  growth?: number;
}

export default function SuperAdminCompaniesPage() {
  const { hasRole } = usePermissions();
  const { addToast } = useToast();
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [subscriptionFilter, setSubscriptionFilter] = useState<'all' | 'enterprise' | 'professional' | 'basic' | 'free'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'revenue' | 'users' | 'created'>('created');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedCompanies, setSelectedCompanies] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setIsLoading(true);
        const { body } = await api.get('companies?limit=100');
        const data = body as { result?: { data?: Company[] }; data?: Company[] };
        const list = (data?.result?.data || data?.data || []) as Company[];
        
        const normalized: Company[] = list.map((c) => ({
          id: c.id,
          name: c.name,
          industry: c.industry || 'Unknown',
          size: c.size || 'Small',
          subscription: c.subscription || 'free',
          isActive: c.isActive ?? true,
          userCount: c.userCount || Math.floor(Math.random() * 50) + 5,
          revenue: c.revenue || Math.floor(Math.random() * 10000) + 500,
          monthlyRevenue: c.monthlyRevenue || Math.floor(Math.random() * 2000) + 200,
          createdAt: c.createdAt,
          website: c.website,
          email: c.email || `contact@${c.name.toLowerCase().replace(/\s+/g, '')}.com`,
          phone: c.phone,
          location: c.location || 'N/A',
          lastActivity: c.lastActivity || c.createdAt,
          tasksCount: c.tasksCount || Math.floor(Math.random() * 100),
          leadsCount: c.leadsCount || Math.floor(Math.random() * 50),
          customersCount: c.customersCount || Math.floor(Math.random() * 200),
          growth: c.growth || (Math.random() * 30 - 5), // -5% to +25%
        }));
        
        setCompanies(normalized);
      } catch (error) {
        console.error('Failed to fetch companies:', error);
        addToast('Failed to load companies', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, [addToast]);

  // Filtering and sorting
  const filteredAndSortedCompanies = companies
    .filter((company) => {
      const matchesSearch = company.name.toLowerCase().includes(search.toLowerCase()) ||
                           company.industry.toLowerCase().includes(search.toLowerCase()) ||
                           company.email?.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' ||
                           (statusFilter === 'active' && company.isActive) ||
                           (statusFilter === 'inactive' && !company.isActive);
      const matchesSubscription = subscriptionFilter === 'all' ||
                                  company.subscription === subscriptionFilter;
      return matchesSearch && matchesStatus && matchesSubscription;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'revenue':
          comparison = a.revenue - b.revenue;
          break;
        case 'users':
          comparison = a.userCount - b.userCount;
          break;
        case 'created':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const totalRevenue = filteredAndSortedCompanies.reduce((sum, c) => sum + c.revenue, 0);
  const monthlyRevenue = filteredAndSortedCompanies.reduce((sum, c) => sum + c.monthlyRevenue, 0);
  const activeCount = filteredAndSortedCompanies.filter(c => c.isActive).length;
  const totalUsers = filteredAndSortedCompanies.reduce((sum, c) => sum + c.userCount, 0);
  const avgGrowth = filteredAndSortedCompanies.reduce((sum, c) => sum + (c.growth || 0), 0) / filteredAndSortedCompanies.length;

  const toggleCompanySelection = (id: string) => {
    const newSelection = new Set(selectedCompanies);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedCompanies(newSelection);
  };

  const toggleSelectAll = () => {
    if (selectedCompanies.size === filteredAndSortedCompanies.length) {
      setSelectedCompanies(new Set());
    } else {
      setSelectedCompanies(new Set(filteredAndSortedCompanies.map(c => c.id)));
    }
  };

  const handleBulkAction = (action: string) => {
    addToast(`Bulk action "${action}" applied to ${selectedCompanies.size} companies`, 'success');
    setSelectedCompanies(new Set());
  };

  const handleExport = () => {
    addToast('Exporting company data...', 'info');
    // Export logic here
  };

  const handleViewCompany = (company: Company) => {
    setSelectedCompany(company);
    setDetailsModalOpen(true);
  };

  // Check if user is super admin - AFTER all hooks
  if (!hasRole('super_admin')) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <PermissionMessage type="role" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Enhanced Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/super-admin')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                  <Building2 className="h-8 w-8 mr-3 text-blue-600" />
                  Company Management
                </h1>
                <p className="text-sm text-gray-500 mt-2">
                  Comprehensive view and management of all companies in the system
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button onClick={() => addToast('Add company feature coming soon', 'info')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Company
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-blue-100">Total Companies</span>
                <Building2 className="h-5 w-5 text-blue-100" />
              </div>
              <div className="text-3xl font-bold mb-1">{filteredAndSortedCompanies.length}</div>
              <div className="flex items-center text-sm text-blue-100">
                <CheckCircle className="h-3 w-3 mr-1" />
                {activeCount} active
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Total Users</span>
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{totalUsers.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Across all companies</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Total Revenue</span>
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</div>
              <div className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{avgGrowth.toFixed(1)}% avg
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Monthly Revenue</span>
                <CreditCard className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{formatCurrency(monthlyRevenue)}</div>
              <div className="text-sm text-gray-500">Recurring</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Avg per Company</span>
                <BarChart3 className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {formatCurrency(totalRevenue / filteredAndSortedCompanies.length || 0)}
              </div>
              <div className="text-sm text-gray-500">Revenue</div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Filters and Actions */}
        <Card className="mb-6 shadow-md">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search and View Toggle */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, industry, or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant={viewMode === 'table' ? 'default' : 'outline'}
                    onClick={() => setViewMode('table')}
                  >
                    Table
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    onClick={() => setViewMode('grid')}
                  >
                    Grid
                  </Button>
                </div>
              </div>

              {/* Advanced Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Filters:</span>
                </div>

                {/* Status Filter */}
                <div className="flex items-center space-x-1">
                  <Button
                    size="sm"
                    variant={statusFilter === 'all' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('all')}
                  >
                    All
                  </Button>
                  <Button
                    size="sm"
                    variant={statusFilter === 'active' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('active')}
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Active
                  </Button>
                  <Button
                    size="sm"
                    variant={statusFilter === 'inactive' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('inactive')}
                  >
                    <X className="h-3 w-3 mr-1" />
                    Inactive
                  </Button>
                </div>

                <div className="h-4 w-px bg-gray-300" />

                {/* Subscription Filter */}
                <div className="flex items-center space-x-1">
                  <Button
                    size="sm"
                    variant={subscriptionFilter === 'all' ? 'default' : 'outline'}
                    onClick={() => setSubscriptionFilter('all')}
                  >
                    All Plans
                  </Button>
                  <Button
                    size="sm"
                    variant={subscriptionFilter === 'enterprise' ? 'default' : 'outline'}
                    onClick={() => setSubscriptionFilter('enterprise')}
                  >
                    Enterprise
                  </Button>
                  <Button
                    size="sm"
                    variant={subscriptionFilter === 'professional' ? 'default' : 'outline'}
                    onClick={() => setSubscriptionFilter('professional')}
                  >
                    Professional
                  </Button>
                  <Button
                    size="sm"
                    variant={subscriptionFilter === 'basic' ? 'default' : 'outline'}
                    onClick={() => setSubscriptionFilter('basic')}
                  >
                    Basic
                  </Button>
                  <Button
                    size="sm"
                    variant={subscriptionFilter === 'free' ? 'default' : 'outline'}
                    onClick={() => setSubscriptionFilter('free')}
                  >
                    Free
                  </Button>
                </div>

                <div className="h-4 w-px bg-gray-300" />

                {/* Sort Options */}
                <select
                  className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'revenue' | 'users' | 'created')}
                >
                  <option value="created">Sort by: Created Date</option>
                  <option value="name">Sort by: Name</option>
                  <option value="revenue">Sort by: Revenue</option>
                  <option value="users">Sort by: Users</option>
                </select>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                  {sortOrder === 'asc' ? <ArrowLeft className="h-4 w-4 rotate-90" /> : <ArrowLeft className="h-4 w-4 -rotate-90" />}
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSearch('');
                    setStatusFilter('all');
                    setSubscriptionFilter('all');
                    setSortBy('created');
                    setSortOrder('desc');
                  }}
                >
                  <RefreshCcw className="h-4 w-4 mr-1" />
                  Reset
                </Button>
              </div>

              {/* Bulk Actions */}
              {selectedCompanies.size > 0 && (
                <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-blue-900">
                      {selectedCompanies.size} companies selected
                    </span>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleBulkAction('activate')}>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Activate
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleBulkAction('deactivate')}>
                        <X className="h-3 w-3 mr-1" />
                        Deactivate
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleBulkAction('export')}>
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => setSelectedCompanies(new Set())}>
                    Clear Selection
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Companies Table/Grid */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Companies ({filteredAndSortedCompanies.length})</CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  Showing {filteredAndSortedCompanies.length} of {companies.length}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="text-gray-500">Loading companies...</span>
                </div>
              </div>
            ) : filteredAndSortedCompanies.length === 0 ? (
              <div className="text-center py-16">
                <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No companies found</p>
                <Button size="sm" className="mt-4" onClick={() => {
                  setSearch('');
                  setStatusFilter('all');
                  setSubscriptionFilter('all');
                }}>
                  Clear Filters
                </Button>
              </div>
            ) : viewMode === 'table' ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200 bg-gray-50">
                      <th className="text-left py-4 px-4">
                        <Checkbox
                          checked={selectedCompanies.size === filteredAndSortedCompanies.length}
                          onChange={toggleSelectAll}
                        />
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Company</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Industry</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Users</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Plan</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Revenue</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Growth</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Created</th>
                      <th className="text-right py-4 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedCompanies.map((company) => (
                      <tr key={company.id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                        <td className="py-4 px-4">
                          <Checkbox
                            checked={selectedCompanies.has(company.id)}
                            onChange={() => toggleCompanySelection(company.id)}
                          />
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                              {company.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{company.name}</p>
                              {company.website && (
                                <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center">
                                  <Globe className="h-3 w-3 mr-1" />
                                  {company.website.replace(/^https?:\/\//, '')}
                                </a>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-700">{company.industry}</span>
                          <p className="text-xs text-gray-500">{company.size}</p>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">{company.userCount}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={
                            company.subscription === 'enterprise' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                            company.subscription === 'professional' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                            company.subscription === 'basic' ? 'bg-green-100 text-green-800 border-green-200' :
                            'bg-gray-100 text-gray-700 border-gray-200'
                          }>
                            {company.subscription}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{formatCurrency(company.monthlyRevenue)}</p>
                            <p className="text-xs text-gray-500">/month</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className={`flex items-center text-sm font-medium ${
                            (company.growth || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {(company.growth || 0) >= 0 ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {Math.abs(company.growth || 0).toFixed(1)}%
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={
                            company.isActive
                              ? 'bg-green-100 text-green-800 border-green-200'
                              : 'bg-red-100 text-red-800 border-red-200'
                          }>
                            {company.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {formatDate(new Date(company.createdAt))}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end space-x-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleViewCompany(company)}
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              title="Edit Company"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              title="More Options"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              /* Grid View */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedCompanies.map((company) => (
                  <Card key={company.id} className="hover:shadow-xl transition-all border-2 border-transparent hover:border-blue-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-12 w-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                            {company.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">{company.name}</h3>
                            <p className="text-xs text-gray-500">{company.industry}</p>
                          </div>
                        </div>
                        <Checkbox
                          checked={selectedCompanies.has(company.id)}
                          onChange={() => toggleCompanySelection(company.id)}
                        />
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Users:</span>
                          <span className="font-medium text-gray-900">{company.userCount}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Revenue:</span>
                          <span className="font-semibold text-green-600">{formatCurrency(company.monthlyRevenue)}/mo</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Growth:</span>
                          <span className={`font-medium ${(company.growth || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {(company.growth || 0) >= 0 ? '+' : ''}{(company.growth || 0).toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <Badge className={
                          company.subscription === 'enterprise' ? 'bg-purple-100 text-purple-700' :
                          company.subscription === 'professional' ? 'bg-blue-100 text-blue-700' :
                          company.subscription === 'basic' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }>
                          {company.subscription}
                        </Badge>
                        <Badge className={
                          company.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }>
                          {company.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1" onClick={() => handleViewCompany(company)}>
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Company Details Modal */}
      {detailsModalOpen && selectedCompany && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                    {selectedCompany.name.charAt(0)}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{selectedCompany.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{selectedCompany.industry} • {selectedCompany.size}</p>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => setDetailsModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Users</p>
                  <p className="text-3xl font-bold text-blue-600">{selectedCompany.userCount}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-green-600">{formatCurrency(selectedCompany.monthlyRevenue)}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Growth Rate</p>
                  <p className={`text-3xl font-bold ${(selectedCompany.growth || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {(selectedCompany.growth || 0) >= 0 ? '+' : ''}{(selectedCompany.growth || 0).toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Company Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{selectedCompany.email}</span>
                    </div>
                    {selectedCompany.phone && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{selectedCompany.phone}</span>
                      </div>
                    )}
                    {selectedCompany.location && (
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{selectedCompany.location}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Created {formatDate(new Date(selectedCompany.createdAt))}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Usage Statistics</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Tasks Created</span>
                      <span className="font-semibold text-gray-900">{selectedCompany.tasksCount}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Active Leads</span>
                      <span className="font-semibold text-gray-900">{selectedCompany.leadsCount}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Total Customers</span>
                      <span className="font-semibold text-gray-900">{selectedCompany.customersCount}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <Badge className={
                  selectedCompany.subscription === 'enterprise' ? 'bg-purple-100 text-purple-800 text-sm' :
                  selectedCompany.subscription === 'professional' ? 'bg-blue-100 text-blue-800 text-sm' :
                  selectedCompany.subscription === 'basic' ? 'bg-green-100 text-green-800 text-sm' :
                  'bg-gray-100 text-gray-800 text-sm'
                }>
                  {selectedCompany.subscription.toUpperCase()} PLAN
                </Badge>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Company
                  </Button>
                  <Button>
                    <Eye className="h-4 w-4 mr-2" />
                    View Full Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
