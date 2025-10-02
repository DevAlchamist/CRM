'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Download, 
  Filter, 
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  Activity,
  Search,
  RefreshCw
} from 'lucide-react';
import { 
  revenueChartData, 
  leadsByStageData, 
  salesByUserData,
  kpiMetrics 
} from '@/data/demo';
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/utils';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar,
  AreaChart,
  Area
} from 'recharts';

const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#DC2626', '#8B5CF6', '#06B6D4'];

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const conversionRate = 23.5;
  const avgDealSize = 45000;
  const salesCycle = 45; // days
  const customerSatisfaction = 4.8;

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    console.log(`Exporting reports as ${format}`);
    // In a real app, this would trigger an actual export
  };

  return (
    <DashboardLayout title="Reports & Analytics" userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-[#111827]">Reports & Analytics</h1>
            <p className="text-[#6B7280]">Track your business performance with detailed insights</p>
          </div>
          <div className="flex flex-wrap items-center space-x-2 space-y-2 sm:space-y-0">
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search reports..."
                className="pl-10 w-48"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            
            <Button variant="outline" onClick={() => handleExport('pdf')}>
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
            
            <Button onClick={() => handleExport('excel')}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* KPI Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#6B7280]">
                  {metric.label}
                </CardTitle>
                {index === 0 && <Users className="h-4 w-4 text-[#2563EB]" />}
                {index === 1 && <Target className="h-4 w-4 text-[#10B981]" />}
                {index === 2 && <DollarSign className="h-4 w-4 text-[#F59E0B]" />}
                {index === 3 && <Activity className="h-4 w-4 text-[#8B5CF6]" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#111827]">
                  {metric.format === 'currency' && formatCurrency(metric.value)}
                  {metric.format === 'percentage' && formatPercentage(metric.value)}
                  {metric.format === 'number' && formatNumber(metric.value)}
                </div>
                <div className="flex items-center text-xs">
                  {metric.changeType === 'increase' ? (
                    <TrendingUp className="h-3 w-3 text-[#10B981] mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-[#DC2626] mr-1" />
                  )}
                  <span className={metric.changeType === 'increase' ? 'text-[#10B981]' : 'text-[#DC2626]'}>
                    {Math.abs(metric.change)}%
                  </span>
                  <span className="text-[#6B7280] ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6B7280]">
                Conversion Rate
              </CardTitle>
              <Target className="h-4 w-4 text-[#10B981]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#111827]">
                {formatPercentage(conversionRate)}
              </div>
              <div className="flex items-center text-xs text-[#10B981]">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2.1% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6B7280]">
                Avg Deal Size
              </CardTitle>
              <DollarSign className="h-4 w-4 text-[#F59E0B]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#111827]">
                {formatCurrency(avgDealSize)}
              </div>
              <div className="flex items-center text-xs text-[#10B981]">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5.2% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6B7280]">
                Sales Cycle
              </CardTitle>
              <Calendar className="h-4 w-4 text-[#8B5CF6]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#111827]">
                {salesCycle} days
              </div>
              <div className="flex items-center text-xs text-[#DC2626]">
                <TrendingDown className="h-3 w-3 mr-1" />
                -3 days from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6B7280]">
                Customer Satisfaction
              </CardTitle>
              <Users className="h-4 w-4 text-[#06B6D4]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#111827]">
                {customerSatisfaction}/5
              </div>
              <div className="flex items-center text-xs text-[#10B981]">
                <TrendingUp className="h-3 w-3 mr-1" />
                +0.2 from last month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue and deals closed over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '6px',
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#2563EB" 
                    fill="#2563EB"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Leads by Stage */}
          <Card>
            <CardHeader>
              <CardTitle>Pipeline Distribution</CardTitle>
              <CardDescription>Current leads across all pipeline stages</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={leadsByStageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {leadsByStageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Performance by Team Member</CardTitle>
              <CardDescription>Revenue and deals closed by each team member</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesByUserData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '6px',
                    }}
                  />
                  <Bar dataKey="deals" fill="#2563EB" name="Deals Closed" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue by Source */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Lead Source</CardTitle>
              <CardDescription>Revenue generated from different lead sources</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { name: 'Website', revenue: 450000, leads: 45 },
                  { name: 'Referral', revenue: 320000, leads: 28 },
                  { name: 'Social Media', revenue: 280000, leads: 32 },
                  { name: 'Cold Call', revenue: 200000, leads: 25 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '6px',
                    }}
                  />
                  <Bar dataKey="revenue" fill="#10B981" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Performance Metrics</CardTitle>
            <CardDescription>Comprehensive breakdown of key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    <th className="text-left py-3 px-4 font-medium text-[#111827]">Metric</th>
                    <th className="text-left py-3 px-4 font-medium text-[#111827]">Current</th>
                    <th className="text-left py-3 px-4 font-medium text-[#111827]">Previous Month</th>
                    <th className="text-left py-3 px-4 font-medium text-[#111827]">Change</th>
                    <th className="text-left py-3 px-4 font-medium text-[#111827]">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { metric: 'Total Revenue', current: '$125,000', previous: '$105,000', change: '+19.0%', trend: 'up' },
                    { metric: 'New Customers', current: '127', previous: '112', change: '+13.4%', trend: 'up' },
                    { metric: 'Deals Closed', current: '22', previous: '18', change: '+22.2%', trend: 'up' },
                    { metric: 'Conversion Rate', current: '23.5%', previous: '21.4%', change: '+9.8%', trend: 'up' },
                    { metric: 'Average Deal Size', current: '$45,000', previous: '$42,000', change: '+7.1%', trend: 'up' },
                    { metric: 'Sales Cycle Length', current: '45 days', previous: '48 days', change: '-6.3%', trend: 'down' },
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
                      <td className="py-3 px-4 text-[#111827]">{row.metric}</td>
                      <td className="py-3 px-4 text-[#111827] font-medium">{row.current}</td>
                      <td className="py-3 px-4 text-[#6B7280]">{row.previous}</td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={row.trend === 'up' ? 'success' : 'secondary'}
                          className="text-xs"
                        >
                          {row.change}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        {row.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 text-[#10B981]" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-[#DC2626]" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
