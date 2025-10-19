'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePermissions } from '@/hooks/usePermissions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PermissionMessage } from '@/components/ui/permission-message';
import {
  ArrowLeft, TrendingUp, DollarSign, Users, Building2,
  Activity, Calendar, Download, BarChart3, PieChart,
  Target, Award, Zap, Percent, Eye, ArrowUp, CreditCard
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function SuperAdminAnalyticsPage() {
  const { hasRole } = usePermissions();
  const router = useRouter();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'users' | 'companies'>('revenue');

  // Mock comprehensive data
  const metrics = {
    revenue: { current: 245830, previous: 198420, growth: 23.9, target: 300000, achieved: 81.9 },
    users: { current: 2547, previous: 2142, growth: 18.9, target: 3000, achieved: 84.9 },
    companies: { current: 127, previous: 109, growth: 16.5, target: 150, achieved: 84.7 },
    activeRate: { current: 89.7, previous: 85.3, growth: 5.2, target: 90, achieved: 99.7 },
    avgRevenue: { current: 1935, previous: 1820, growth: 6.3, target: 2000, achieved: 96.8 },
    conversion: { current: 34.2, previous: 29.8, growth: 14.8, target: 40, achieved: 85.5 },
  };

  const revenueByMonth = [
    { month: 'Jan', revenue: 165000, users: 1850, companies: 95 },
    { month: 'Feb', revenue: 175000, users: 1920, companies: 98 },
    { month: 'Mar', revenue: 198420, users: 2142, companies: 109 },
    { month: 'Apr', revenue: 215000, users: 2285, companies: 115 },
    { month: 'May', revenue: 228500, users: 2410, companies: 121 },
    { month: 'Jun', revenue: 245830, users: 2547, companies: 127 },
  ];

  const industryBreakdown = [
    { industry: 'Technology', count: 42, revenue: 89400, percentage: 33.1, growth: 25.3 },
    { industry: 'Healthcare', count: 28, revenue: 62100, percentage: 23.0, growth: 18.7 },
    { industry: 'Finance', count: 22, revenue: 51200, percentage: 18.9, growth: 21.4 },
    { industry: 'Retail', count: 18, revenue: 28900, percentage: 10.7, growth: 12.8 },
    { industry: 'Manufacturing', count: 17, revenue: 38230, percentage: 14.3, growth: 15.2 },
  ];

  const subscriptionBreakdown = [
    { plan: 'Enterprise', count: 23, revenue: 92000, percentage: 37.4, color: 'purple' },
    { plan: 'Professional', count: 45, revenue: 90000, percentage: 36.6, color: 'blue' },
    { plan: 'Basic', count: 38, revenue: 45600, percentage: 18.5, color: 'green' },
    { plan: 'Free', count: 21, revenue: 0, percentage: 0, color: 'gray' },
  ];

  const topCompanies = [
    { rank: 1, name: 'Acme Corporation', revenue: 28500, users: 287, growth: 34.2, engagement: 94 },
    { rank: 2, name: 'TechVision Solutions', revenue: 24200, users: 245, growth: 28.7, engagement: 91 },
    { rank: 3, name: 'Global Enterprises', revenue: 21800, users: 198, growth: 25.3, engagement: 88 },
    { rank: 4, name: 'Innovation Labs', revenue: 19400, users: 176, growth: 22.8, engagement: 86 },
    { rank: 5, name: 'Digital Dynamics', revenue: 17900, users: 165, growth: 19.5, engagement: 83 },
  ];

  const userActivityTrend = [
    { day: 'Mon', active: 1847, logins: 2134, tasks: 892 },
    { day: 'Tue', active: 1923, logins: 2287, tasks: 945 },
    { day: 'Wed', active: 2045, logins: 2456, tasks: 1023 },
    { day: 'Thu', active: 1998, logins: 2345, tasks: 987 },
    { day: 'Fri', active: 2187, logins: 2578, tasks: 1134 },
    { day: 'Sat', active: 1234, logins: 1456, tasks: 567 },
    { day: 'Sun', active: 1098, logins: 1287, tasks: 478 },
  ];

  const getMetricData = () => {
    switch (selectedMetric) {
      case 'revenue':
        return revenueByMonth.map(d => d.revenue);
      case 'users':
        return revenueByMonth.map(d => d.users);
      case 'companies':
        return revenueByMonth.map(d => d.companies);
    }
  };

  const maxValue = Math.max(...getMetricData());

  // Check if user is super admin - AFTER all hooks
  if (!hasRole('super_admin')) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <PermissionMessage type="role" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/super-admin')}
            className="mb-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center">
                <BarChart3 className="h-10 w-10 mr-4" />
                Analytics & Insights
              </h1>
              <p className="text-purple-100 text-lg">Comprehensive system-wide performance and growth metrics</p>
            </div>
            <div className="flex space-x-2">
              <Button className="bg-white text-indigo-600 hover:bg-gray-100">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Time Range Pills */}
          <div className="mt-6 inline-flex items-center space-x-3 bg-white/10 backdrop-blur-lg rounded-lg p-2">
            <Calendar className="h-4 w-4 ml-2" />
            {(['7d', '30d', '90d', '1y'] as const).map((range) => (
              <Button
                key={range}
                size="sm"
                variant={timeRange === range ? 'default' : 'ghost'}
                onClick={() => setTimeRange(range)}
                className={timeRange === range ? 'bg-white text-indigo-600' : 'text-white hover:bg-white/20'}
              >
                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '90d' ? '90 Days' : '1 Year'}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue KPI */}
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <Badge className="bg-green-100 text-green-800">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{metrics.revenue.growth}%
                </Badge>
              </div>
              <h3 className="text-sm text-gray-600 mb-1">Total Revenue</h3>
              <p className="text-3xl font-bold text-gray-900 mb-2">{formatCurrency(metrics.revenue.current)}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Target: {formatCurrency(metrics.revenue.target)}</span>
                <span className="text-green-600 font-medium">{metrics.revenue.achieved}% achieved</span>
              </div>
              <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-green-600" style={{ width: `${metrics.revenue.achieved}%` }} />
              </div>
            </CardContent>
          </Card>

          {/* Users KPI */}
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <Badge className="bg-blue-100 text-blue-800">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +{metrics.users.growth}%
                </Badge>
              </div>
              <h3 className="text-sm text-gray-600 mb-1">Total Users</h3>
              <p className="text-3xl font-bold text-gray-900 mb-2">{metrics.users.current.toLocaleString()}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Target: {metrics.users.target.toLocaleString()}</span>
                <span className="text-blue-600 font-medium">{metrics.users.achieved}% achieved</span>
              </div>
              <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600" style={{ width: `${metrics.users.achieved}%` }} />
              </div>
            </CardContent>
          </Card>

          {/* Companies KPI */}
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-purple-600" />
                </div>
                <Badge className="bg-purple-100 text-purple-800">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{metrics.companies.growth}%
                </Badge>
              </div>
              <h3 className="text-sm text-gray-600 mb-1">Active Companies</h3>
              <p className="text-3xl font-bold text-gray-900 mb-2">{metrics.companies.current}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Target: {metrics.companies.target}</span>
                <span className="text-purple-600 font-medium">{metrics.companies.achieved}% achieved</span>
              </div>
              <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600" style={{ width: `${metrics.companies.achieved}%` }} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Rate</p>
                  <p className="text-3xl font-bold text-gray-900">{metrics.activeRate.current}%</p>
                  <p className="text-sm text-green-600 mt-1">+{metrics.activeRate.growth}% from last period</p>
                </div>
                <div className="h-16 w-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
                  <Activity className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg Revenue/Company</p>
                  <p className="text-3xl font-bold text-gray-900">{formatCurrency(metrics.avgRevenue.current)}</p>
                  <p className="text-sm text-green-600 mt-1">+{metrics.avgRevenue.growth}% from last period</p>
                </div>
                <div className="h-16 w-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center">
                  <Target className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Conversion Rate</p>
                  <p className="text-3xl font-bold text-gray-900">{metrics.conversion.current}%</p>
                  <p className="text-sm text-green-600 mt-1">+{metrics.conversion.growth}% from last period</p>
                </div>
                <div className="h-16 w-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center">
                  <Percent className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Primary Chart */}
          <Card className="lg:col-span-2 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Growth Trends</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Track key metrics over time</p>
                </div>
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                  <Button
                    size="sm"
                    variant={selectedMetric === 'revenue' ? 'default' : 'ghost'}
                    onClick={() => setSelectedMetric('revenue')}
                  >
                    Revenue
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedMetric === 'users' ? 'default' : 'ghost'}
                    onClick={() => setSelectedMetric('users')}
                  >
                    Users
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedMetric === 'companies' ? 'default' : 'ghost'}
                    onClick={() => setSelectedMetric('companies')}
                  >
                    Companies
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Enhanced Chart */}
              <div className="h-80 bg-gradient-to-b from-gray-50 to-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-end justify-between h-full space-x-3">
                  {revenueByMonth.map((item, index) => {
                    const value = selectedMetric === 'revenue' ? item.revenue :
                                 selectedMetric === 'users' ? item.users :
                                 item.companies;
                    const height = (value / maxValue) * 100;
                    const colors = selectedMetric === 'revenue' ? 'from-green-400 to-green-600' :
                                  selectedMetric === 'users' ? 'from-blue-400 to-blue-600' :
                                  'from-purple-400 to-purple-600';
                    
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center justify-end group">
                        <div
                          className={`w-full bg-gradient-to-t ${colors} rounded-t-xl hover:opacity-80 transition-all cursor-pointer relative shadow-lg`}
                          style={{ height: `${height}%` }}
                        >
                          {/* Tooltip */}
                          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl z-10">
                            <div className="font-semibold mb-1">{item.month}</div>
                            <div>
                              {selectedMetric === 'revenue' && `Revenue: ${formatCurrency(item.revenue)}`}
                              {selectedMetric === 'users' && `Users: ${item.users.toLocaleString()}`}
                              {selectedMetric === 'companies' && `Companies: ${item.companies}`}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-600 mt-3 font-medium">{item.month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Activity Chart */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg">Weekly Activity</CardTitle>
              <p className="text-xs text-gray-500">User engagement this week</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userActivityTrend.map((day, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{day.day}</span>
                      <span className="text-sm font-semibold text-gray-900">{day.active.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-2.5 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full"
                        style={{ width: `${(day.active / 2200) * 100}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                      <span>{day.logins} logins</span>
                      <span>{day.tasks} tasks</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Industry & Subscription Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Industry Breakdown */}
          <Card className="shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center">
                    <PieChart className="h-5 w-5 mr-2 text-indigo-600" />
                    Industry Distribution
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Revenue and growth by industry</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {industryBreakdown.map((industry, index) => (
                  <div key={index} className="group hover:bg-gray-50 p-3 rounded-lg transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                          {industry.count}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{industry.industry}</p>
                          <p className="text-xs text-gray-500">{industry.count} companies</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">{formatCurrency(industry.revenue)}</p>
                        <p className="text-xs text-green-600 flex items-center justify-end">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +{industry.growth}%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-400 to-purple-600"
                          style={{ width: `${industry.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600 w-12 text-right">
                        {industry.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Subscription Revenue */}
          <Card className="shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-purple-600" />
                    Subscription Revenue
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Breakdown by subscription tier</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {subscriptionBreakdown.map((sub, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge className={`${
                          sub.color === 'purple' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                          sub.color === 'blue' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          sub.color === 'green' ? 'bg-green-100 text-green-800 border-green-200' :
                          'bg-gray-100 text-gray-700 border-gray-200'
                        } text-sm`}>
                          {sub.plan}
                        </Badge>
                        <span className="text-sm text-gray-600">{sub.count} companies</span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{formatCurrency(sub.revenue)}</p>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            sub.color === 'purple' ? 'bg-gradient-to-r from-purple-400 to-purple-600' :
                            sub.color === 'blue' ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                            sub.color === 'green' ? 'bg-gradient-to-r from-green-400 to-green-600' :
                            'bg-gray-400'
                          }`}
                          style={{ width: `${sub.percentage}%` }}
                        />
                      </div>
                      <span className="absolute right-2 -top-6 text-xs font-semibold text-gray-600">
                        {sub.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Companies */}
        <Card className="shadow-xl mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center">
                  <Award className="h-5 w-5 mr-2 text-yellow-600" />
                  Top Performing Companies
                </CardTitle>
                <p className="text-sm text-gray-500 mt-1">Ranked by revenue and engagement</p>
              </div>
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCompanies.map((company) => (
                <div
                  key={company.rank}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => router.push(`/super-admin/companies/${company.rank}`)}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`h-14 w-14 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg ${
                      company.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                      company.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                      company.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                      'bg-gradient-to-br from-blue-400 to-blue-600'
                    }`}>
                      #{company.rank}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-lg">{company.name}</h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500 flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {company.users} users
                        </span>
                        <span className="text-sm text-gray-500 flex items-center">
                          <Activity className="h-3 w-3 mr-1" />
                          {company.engagement}% engaged
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(company.revenue)}</p>
                      <p className="text-sm text-green-600 flex items-center justify-end mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +{company.growth}%
                      </p>
                    </div>
                    <ArrowLeft className="h-5 w-5 text-gray-400 -rotate-180" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insights and Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Strong Growth</h3>
                  <p className="text-sm text-green-800">
                    Revenue up {metrics.revenue.growth}% this period. Companies in Technology sector showing highest growth at 25.3%.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-900 mb-1">Conversion Opportunity</h3>
                  <p className="text-sm text-yellow-800">
                    21 companies on free plans with high usage. Consider targeted upgrade campaigns.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">On Track</h3>
                  <p className="text-sm text-blue-800">
                    You&apos;re {metrics.revenue.achieved}% toward revenue target. Projected to reach {formatCurrency(metrics.revenue.target)} by month end.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
