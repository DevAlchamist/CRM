'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useUserRole } from '@/hooks/useUserRole';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Target, 
  DollarSign, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  User,
  Calendar
} from 'lucide-react';
import { 
  kpiMetrics, 
  demoActivities, 
  demoTasks,
  demoLeads,
  revenueChartData,
  leadsByStageData,
  salesByUserData
} from '@/data/demo';
import { formatCurrency, formatNumber, formatPercentage, getStatusColor, getRelativeTime } from '@/lib/utils';
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
  Bar 
} from 'recharts';
import { QuickAddCustomerModal, QuickAddLeadModal, QuickAddTaskModal, QuickAddEventModal } from '@/components/forms/quick-action-modals';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#DC2626', '#8B5CF6', '#06B6D4'];

export default function DashboardPage() {
  const [quickAddCustomerModal, setQuickAddCustomerModal] = useState(false);
  const userRole = useUserRole();
  const [quickAddLeadModal, setQuickAddLeadModal] = useState(false);
  const [quickAddTaskModal, setQuickAddTaskModal] = useState(false);
  const [quickAddEventModal, setQuickAddEventModal] = useState(false);
  const recentTasks = demoTasks.slice(0, 5);
  const recentActivities = demoActivities.slice(0, 4);
  const urgentLeads = demoLeads.filter(lead => lead.stage === 'negotiation' || lead.stage === 'proposal').slice(0, 3);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleQuickAddCustomer = (customerData: any) => {
    console.log('Adding customer:', customerData);
    // In a real app, this would make an API call
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleQuickAddLead = (leadData: any) => {
    console.log('Adding lead:', leadData);
    // In a real app, this would make an API call
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleQuickAddTask = (taskData: any) => {
    console.log('Adding task:', taskData);
    // In a real app, this would make an API call
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleQuickAddEvent = (eventData: any) => {
    console.log('Adding event:', eventData);
    // In a real app, this would make an API call
  };

  return (
    <ProtectedRoute>
      <DashboardLayout title="Dashboard" userRole={userRole} onAddClick={() => setQuickAddCustomerModal(true)}>
      <div className="space-y-6">
        {/* KPI Cards */}
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
                {index === 3 && <TrendingUp className="h-4 w-4 text-[#8B5CF6]" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#111827]">
                  {metric.format === 'currency' && formatCurrency(metric.value)}
                  {metric.format === 'percentage' && formatPercentage(metric.value)}
                  {metric.format === 'number' && formatNumber(metric.value)}
                </div>
                <p className="text-xs text-[#6B7280]">
                  <span className={`inline-flex items-center ${
                    metric.changeType === 'increase' ? 'text-[#10B981]' : 'text-[#DC2626]'
                  }`}>
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {Math.abs(metric.change)}%
                  </span>
                  {' '}from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue for the past 12 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueChartData}>
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

          {/* Leads by Stage */}
          <Card>
            <CardHeader>
              <CardTitle>Leads by Stage</CardTitle>
              <CardDescription>Distribution of leads across pipeline stages</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={leadsByStageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    label={(props: any) => `${props.name} ${(props.percent * 100).toFixed(0)}%`}
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

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Tasks */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Tasks</CardTitle>
                <CardDescription>Your latest assigned tasks</CardDescription>
              </div>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTasks.map((task) => (
                  <div key={task.id} className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {task.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-[#10B981]" />
                      ) : task.priority === 'high' ? (
                        <AlertCircle className="h-5 w-5 text-[#DC2626]" />
                      ) : (
                        <Clock className="h-5 w-5 text-[#6B7280]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#111827] truncate">
                        {task.title}
                      </p>
                      <p className="text-xs text-[#6B7280]">
                        Due {getRelativeTime(task.dueDate)}
                      </p>
                    </div>
                    <Badge 
                      variant={task.priority === 'high' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Urgent Leads */}
          <Card>
            <CardHeader>
              <CardTitle>Urgent Leads</CardTitle>
              <CardDescription>Leads requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {urgentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {lead.customerName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#111827] truncate">
                        {lead.title}
                      </p>
                      <p className="text-xs text-[#6B7280]">
                        {lead.customerName} • {formatCurrency(lead.value)}
                      </p>
                    </div>
                    <Badge 
                      className={`text-xs ${getStatusColor(lead.stage)}`}
                    >
                      {lead.stage.replace('_', ' ')}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest team activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={activity.userAvatar} />
                      <AvatarFallback>
                        {activity.userName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#111827]">
                        {activity.title}
                      </p>
                      <p className="text-xs text-[#6B7280]">
                        by {activity.userName} • {getRelativeTime(activity.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sales Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Performance by User</CardTitle>
            <CardDescription>Revenue and deals closed by team members</CardDescription>
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

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Add new items quickly to your CRM</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center space-y-2"
                onClick={() => setQuickAddCustomerModal(true)}
              >
                <User className="h-6 w-6" />
                <span className="text-sm">Add Customer</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center space-y-2"
                onClick={() => setQuickAddLeadModal(true)}
              >
                <Target className="h-6 w-6" />
                <span className="text-sm">Add Lead</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center space-y-2"
                onClick={() => setQuickAddTaskModal(true)}
              >
                <CheckCircle className="h-6 w-6" />
                <span className="text-sm">Add Task</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center space-y-2"
                onClick={() => setQuickAddEventModal(true)}
              >
                <Calendar className="h-6 w-6" />
                <span className="text-sm">Add Event</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Action Modals */}
      <QuickAddCustomerModal
        isOpen={quickAddCustomerModal}
        onClose={() => setQuickAddCustomerModal(false)}
        onSave={handleQuickAddCustomer}
      />

      <QuickAddLeadModal
        isOpen={quickAddLeadModal}
        onClose={() => setQuickAddLeadModal(false)}
        onSave={handleQuickAddLead}
      />

      <QuickAddTaskModal
        isOpen={quickAddTaskModal}
        onClose={() => setQuickAddTaskModal(false)}
        onSave={handleQuickAddTask}
      />

      <QuickAddEventModal
        isOpen={quickAddEventModal}
        onClose={() => setQuickAddEventModal(false)}
        onSave={handleQuickAddEvent}
      />
    </DashboardLayout>
    </ProtectedRoute>
  );
}
