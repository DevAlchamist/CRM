'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { usePermissions } from '@/hooks/usePermissions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PermissionMessage } from '@/components/ui/permission-message';
import {
  Building2, Users, DollarSign, TrendingUp, Activity, Shield, Database,
  BarChart3, Settings, Eye, CheckCircle, Zap,
  Server, UserPlus, CreditCard, TrendingDown, ArrowUp, ArrowDown,
  Cpu, Bell, FileText, RefreshCcw, Download
} from 'lucide-react';
import api from '@/lib/api';
import { formatCurrency } from '@/lib/utils';

interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  subscription: string;
  isActive: boolean;
  userCount: number;
  revenue: number;
  createdAt: string;
  lastActivity: string;
}

interface SystemStats {
  totalCompanies: number;
  activeCompanies: number;
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  monthlyGrowth: number;
  activeSubscriptions: number;
  churnRate: number;
  avgRevenuePerCompany: number;
}

interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  uptime: number;
  apiResponseTime: number;
  databaseLatency: number;
  memoryUsage: number;
  cpuUsage: number;
  diskUsage: number;
  lastBackup: string;
}

interface ActivityLog {
  id: string;
  type: 'company_created' | 'user_registered' | 'subscription_upgraded' | 'payment_received' | 'system_alert';
  message: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'success' | 'error';
}

export default function SuperAdminDashboard() {
  const { user } = useAuth();
  const { hasRole } = usePermissions();
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [stats, setStats] = useState<SystemStats>({
    totalCompanies: 0,
    activeCompanies: 0,
    totalUsers: 0,
    activeUsers: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    monthlyGrowth: 0,
    activeSubscriptions: 0,
    churnRate: 0,
    avgRevenuePerCompany: 0,
  });
  const [systemHealth] = useState<SystemHealth>({
    status: 'healthy',
    uptime: 99.9,
    apiResponseTime: 145,
    databaseLatency: 23,
    memoryUsage: 62,
    cpuUsage: 38,
    diskUsage: 45,
    lastBackup: new Date().toISOString(),
  });
  const [recentActivity, setRecentActivity] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch companies
        const { body: companiesBody } = await api.get('companies?limit=10');
        const companiesData = companiesBody as { result?: { data?: Company[] }; data?: Company[] };
        const companiesList = (companiesData?.result?.data || companiesData?.data || []) as Company[];
        
        const normalizedCompanies: Company[] = companiesList.map((c) => ({
          id: c.id,
          name: c.name,
          industry: c.industry || 'Unknown',
          size: c.size || 'Small',
          subscription: c.subscription || 'free',
          isActive: c.isActive ?? true,
          userCount: c.userCount || 0,
          revenue: c.revenue || 0,
          createdAt: c.createdAt,
          lastActivity: c.lastActivity || c.createdAt || new Date().toISOString(),
        }));
        
        setCompanies(normalizedCompanies);

        // Calculate comprehensive stats
        const totalRevenue = normalizedCompanies.reduce((sum, c) => sum + c.revenue, 0);
        const activeCompanies = normalizedCompanies.filter(c => c.isActive).length;
        const totalUsers = normalizedCompanies.reduce((sum, c) => sum + c.userCount, 0);
        const activeSubscriptions = normalizedCompanies.filter(c => c.subscription !== 'free').length;
        
        setStats({
          totalCompanies: normalizedCompanies.length,
          activeCompanies,
          totalUsers,
          activeUsers: Math.floor(totalUsers * 0.78), // 78% active rate (mock)
          totalRevenue,
          monthlyRevenue: totalRevenue / 12, // Mock monthly
          monthlyGrowth: 15.3,
          activeSubscriptions,
          churnRate: 2.4,
          avgRevenuePerCompany: normalizedCompanies.length > 0 ? totalRevenue / normalizedCompanies.length : 0,
        });

        // Mock recent activity
        setRecentActivity([
          { id: '1', type: 'company_created', message: 'New company "Tech Innovations" registered', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), severity: 'success' },
          { id: '2', type: 'subscription_upgraded', message: 'Acme Corp upgraded to Enterprise plan', timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), severity: 'success' },
          { id: '3', type: 'payment_received', message: 'Payment of $2,499 received from Global Industries', timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), severity: 'info' },
          { id: '4', type: 'user_registered', message: '12 new users registered today', timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), severity: 'info' },
          { id: '5', type: 'system_alert', message: 'Database backup completed successfully', timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(), severity: 'success' },
        ]);
      } catch (error) {
        console.error('Failed to fetch super admin data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'company_created': return <Building2 className="h-4 w-4" />;
      case 'user_registered': return <UserPlus className="h-4 w-4" />;
      case 'subscription_upgraded': return <TrendingUp className="h-4 w-4" />;
      case 'payment_received': return <CreditCard className="h-4 w-4" />;
      case 'system_alert': return <Bell className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (severity: string) => {
    switch (severity) {
      case 'success': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  const getRelativeTime = (timestamp: string) => {
    const minutes = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000 / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  // Check if user is super admin - AFTER all hooks
  if (!hasRole('super_admin')) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <PermissionMessage
          type="role"
          title="Super Admin Access Only"
          message="This area is restricted to Super Administrators only."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-indigo-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-white/10 backdrop-blur-lg rounded-xl flex items-center justify-center border border-white/20 shadow-lg">
                  <Shield className="h-9 w-9 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Super Admin Control Center</h1>
                  <p className="text-purple-100 mt-1">System-wide management and monitoring</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-purple-100">Logged in as</p>
                  <p className="font-semibold">{user?.name}</p>
                </div>
                <Badge className="bg-white/20 text-white border-white/30">
                  Super Admin
                </Badge>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button 
                onClick={() => router.push('/super-admin/companies')}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white"
              >
                <Building2 className="h-4 w-4 mr-2" />
                Companies
              </Button>
              <Button 
                onClick={() => router.push('/super-admin/analytics')}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button 
                onClick={() => router.push('/super-admin/system')}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white"
              >
                <Settings className="h-4 w-4 mr-2" />
                System
              </Button>
              <Button 
                onClick={() => router.push('/dashboard')}
                variant="outline"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white"
              >
                <Eye className="h-4 w-4 mr-2" />
                View as User
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Health Alert */}
        <Card className="mb-8 border-l-4 border-l-green-500 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-900">All Systems Operational</h3>
                  <p className="text-sm text-green-700">
                    Uptime: {systemHealth.uptime}% • API Response: {systemHealth.apiResponseTime}ms • Last Backup: {getRelativeTime(systemHealth.lastBackup)}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => router.push('/super-admin/system')}>
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Primary Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Revenue */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-green-600/10 rounded-full -mr-16 -mt-16" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Revenue
              </CardTitle>
              <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</div>
              <div className="flex items-center mt-2 text-sm">
                <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-green-600 font-medium">+{stats.monthlyGrowth}%</span>
                <span className="text-gray-500 ml-2">from last month</span>
              </div>
              <div className="mt-3 text-xs text-gray-500">
                Avg per company: {formatCurrency(stats.avgRevenuePerCompany)}
              </div>
            </CardContent>
          </Card>

          {/* Total Companies */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-blue-600/10 rounded-full -mr-16 -mt-16" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Companies
              </CardTitle>
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.totalCompanies}</div>
              <div className="flex items-center mt-2 text-sm">
                <CheckCircle className="h-4 w-4 text-blue-600 mr-1" />
                <span className="text-blue-600 font-medium">{stats.activeCompanies} active</span>
                <span className="text-gray-500 ml-2">
                  ({Math.round((stats.activeCompanies / stats.totalCompanies) * 100) || 0}%)
                </span>
              </div>
              <div className="mt-3 text-xs text-gray-500">
                Churn rate: {stats.churnRate}%
              </div>
            </CardContent>
          </Card>

          {/* Total Users */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-purple-600/10 rounded-full -mr-16 -mt-16" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Users
              </CardTitle>
              <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</div>
              <div className="flex items-center mt-2 text-sm">
                <Activity className="h-4 w-4 text-purple-600 mr-1" />
                <span className="text-purple-600 font-medium">{stats.activeUsers} active</span>
                <span className="text-gray-500 ml-2">today</span>
              </div>
              <div className="mt-3 text-xs text-gray-500">
                Across {stats.totalCompanies} companies
              </div>
            </CardContent>
          </Card>

          {/* Active Subscriptions */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/10 to-orange-600/10 rounded-full -mr-16 -mt-16" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Paid Subscriptions
              </CardTitle>
              <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.activeSubscriptions}</div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="h-4 w-4 text-orange-600 mr-1" />
                <span className="text-orange-600 font-medium">
                  {Math.round((stats.activeSubscriptions / stats.totalCompanies) * 100) || 0}%
                </span>
                <span className="text-gray-500 ml-2">conversion rate</span>
              </div>
              <div className="mt-3 text-xs text-gray-500">
                {stats.totalCompanies - stats.activeSubscriptions} on free plan
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Health Monitor */}
        <Card className="mb-8 bg-gray-900 text-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Cpu className="h-5 w-5" />
                <CardTitle className="text-white">System Health Monitor</CardTitle>
              </div>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                Live
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Server className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Uptime</span>
                </div>
                <div className="text-2xl font-bold">{systemHealth.uptime}%</div>
                <div className="mt-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `${systemHealth.uptime}%` }} />
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">API Response</span>
                </div>
                <div className="text-2xl font-bold">{systemHealth.apiResponseTime}ms</div>
                <div className="mt-1 text-xs text-gray-400">Target: &lt;200ms</div>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Database className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">DB Latency</span>
                </div>
                <div className="text-2xl font-bold">{systemHealth.databaseLatency}ms</div>
                <div className="mt-1 text-xs text-gray-400">Excellent</div>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Cpu className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">CPU Usage</span>
                </div>
                <div className="text-2xl font-bold">{systemHealth.cpuUsage}%</div>
                <div className="mt-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${systemHealth.cpuUsage}%` }} />
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Activity className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Memory</span>
                </div>
                <div className="text-2xl font-bold">{systemHealth.memoryUsage}%</div>
                <div className="mt-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{ width: `${systemHealth.memoryUsage}%` }} />
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Database className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Disk Usage</span>
                </div>
                <div className="text-2xl font-bold">{systemHealth.diskUsage}%</div>
                <div className="mt-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{ width: `${systemHealth.diskUsage}%` }} />
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between pt-6 border-t border-gray-700">
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-gray-300">All services operational</span>
                </div>
                <div className="text-gray-400">Last backup: {getRelativeTime(systemHealth.lastBackup)}</div>
              </div>
              <Button size="sm" variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                <RefreshCcw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue Overview */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Revenue Overview</CardTitle>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.monthlyRevenue)}</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center justify-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{stats.monthlyGrowth}%
                  </p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Annual (Projected)</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
                  <p className="text-xs text-blue-600 mt-1">Based on current rate</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Avg per Company</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.avgRevenuePerCompany)}</p>
                  <p className="text-xs text-purple-600 mt-1">Monthly average</p>
                </div>
              </div>

              {/* Mini Revenue Chart */}
              <div className="h-48 bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-end justify-between h-full space-x-2">
                  {[65, 72, 68, 78, 85, 92, 88, 95, 102, 98, 108, 115].map((value, index) => {
                    const maxValue = 115;
                    const height = (value / maxValue) * 100;
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center justify-end">
                        <div
                          className="w-full bg-indigo-500 rounded-t-lg hover:bg-indigo-600 transition-all cursor-pointer group relative"
                          style={{ height: `${height}%` }}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            ${value}k
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity Feed */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Activity</CardTitle>
                <Badge variant="secondary">{recentActivity.length}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg ${getActivityColor(activity.severity)}`}
                  >
                    <div className="mt-0.5">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {getRelativeTime(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Companies & Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Companies */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recently Added Companies</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Latest company registrations</p>
                </div>
                <Button size="sm" onClick={() => router.push('/super-admin/companies')}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8 text-gray-500">Loading...</div>
              ) : companies.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No companies yet</div>
              ) : (
                <div className="space-y-3">
                  {companies.slice(0, 5).map((company) => (
                    <div
                      key={company.id}
                      className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                      onClick={() => router.push(`/super-admin/companies/${company.id}`)}
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                          {company.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">{company.name}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-500">{company.industry}</span>
                            <span className="text-xs text-gray-300">•</span>
                            <span className="text-xs text-gray-500">{company.userCount} users</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">
                            {formatCurrency(company.revenue)}/mo
                          </p>
                          <Badge
                            className={
                              company.subscription === 'enterprise' ? 'bg-purple-100 text-purple-700' :
                              company.subscription === 'professional' ? 'bg-blue-100 text-blue-700' :
                              company.subscription === 'basic' ? 'bg-green-100 text-green-700' :
                              'bg-gray-100 text-gray-700'
                            }
                          >
                            {company.subscription}
                          </Badge>
                        </div>
                        <Eye className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Revenue Growth</p>
                    <p className="text-2xl font-bold text-gray-900">+{stats.monthlyGrowth}%</p>
                  </div>
                </div>
                <ArrowUp className="h-6 w-6 text-green-600" />
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <UserPlus className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">User Growth</p>
                    <p className="text-2xl font-bold text-gray-900">+234</p>
                  </div>
                </div>
                <ArrowUp className="h-6 w-6 text-blue-600" />
              </div>

              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <TrendingDown className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Churn Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.churnRate}%</p>
                  </div>
                </div>
                <ArrowDown className="h-6 w-6 text-green-600" />
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Active Rate</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Math.round((stats.activeUsers / stats.totalUsers) * 100) || 0}%
                    </p>
                  </div>
                </div>
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-xl transition-all cursor-pointer group border-2 border-transparent hover:border-blue-300" onClick={() => router.push('/super-admin/companies')}>
            <CardContent className="p-6">
              <div className="h-14 w-14 bg-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Database className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Company Management</h3>
              <p className="text-sm text-gray-600 mb-4">
                View, edit, and manage all {stats.totalCompanies} companies in the system
              </p>
              <div className="flex items-center text-blue-600 text-sm font-medium">
                Manage Companies
                <ArrowUp className="h-4 w-4 ml-1 rotate-45" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all cursor-pointer group border-2 border-transparent hover:border-purple-300" onClick={() => router.push('/super-admin/analytics')}>
            <CardContent className="p-6">
              <div className="h-14 w-14 bg-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Analytics & Insights</h3>
              <p className="text-sm text-gray-600 mb-4">
                Deep dive into growth metrics, trends, and financial reports
              </p>
              <div className="flex items-center text-purple-600 text-sm font-medium">
                View Analytics
                <ArrowUp className="h-4 w-4 ml-1 rotate-45" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all cursor-pointer group border-2 border-transparent hover:border-orange-300" onClick={() => router.push('/super-admin/system')}>
            <CardContent className="p-6">
              <div className="h-14 w-14 bg-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Settings className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">System Settings</h3>
              <p className="text-sm text-gray-600 mb-4">
                Configure features, security, backups, and system-wide settings
              </p>
              <div className="flex items-center text-orange-600 text-sm font-medium">
                Configure System
                <ArrowUp className="h-4 w-4 ml-1 rotate-45" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all cursor-pointer group border-2 border-transparent hover:border-red-300" onClick={() => router.push('/super-admin/logs')}>
            <CardContent className="p-6">
              <div className="h-14 w-14 bg-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">System Logs</h3>
              <p className="text-sm text-gray-600 mb-4">
                Monitor activity, errors, and audit trails across the platform
              </p>
              <div className="flex items-center text-red-600 text-sm font-medium">
                View Logs
                <ArrowUp className="h-4 w-4 ml-1 rotate-45" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
