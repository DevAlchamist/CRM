'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePermissions } from '@/hooks/usePermissions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { PermissionMessage } from '@/components/ui/permission-message';
import {
  ArrowLeft, Settings, Database, Shield, Bell, Globe, Code, Zap,
  Server, Cpu, HardDrive, Activity, AlertCircle, CheckCircle,
  XCircle, Info, Download, Upload, RefreshCcw, Terminal, FileText,
  Search, ArrowDown, ArrowUp, Clock
} from 'lucide-react';

interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'success';
  category: string;
  message: string;
  details?: string;
  userId?: string;
  ipAddress?: string;
}

interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkIn: number;
  networkOut: number;
  activeConnections: number;
  requestsPerMinute: number;
  errorRate: number;
}

export default function SuperAdminSystemPage() {
  const { hasRole } = usePermissions();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'settings' | 'monitoring' | 'logs'>('settings');
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [logFilter, setLogFilter] = useState<'all' | 'info' | 'warning' | 'error' | 'success'>('all');
  const [logSearch, setLogSearch] = useState('');
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpuUsage: 42,
    memoryUsage: 68,
    diskUsage: 54,
    networkIn: 145,
    networkOut: 89,
    activeConnections: 234,
    requestsPerMinute: 1240,
    errorRate: 0.12,
  });

  useEffect(() => {
    // Mock system logs
    setLogs([
      { id: '1', timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(), level: 'info', category: 'Auth', message: 'User login successful', userId: 'user-123', ipAddress: '192.168.1.100' },
      { id: '2', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), level: 'success', category: 'Database', message: 'Automated backup completed', details: 'Size: 2.4GB' },
      { id: '3', timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(), level: 'warning', category: 'Performance', message: 'High memory usage detected', details: '78% utilization' },
      { id: '4', timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(), level: 'error', category: 'API', message: 'Rate limit exceeded', details: 'IP: 203.45.67.89' },
      { id: '5', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), level: 'info', category: 'Company', message: 'New company registered', details: 'Tech Innovations Inc.' },
      { id: '6', timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(), level: 'success', category: 'Payment', message: 'Payment processed successfully', details: '$2,499 from Acme Corp' },
      { id: '7', timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(), level: 'info', category: 'User', message: 'Bulk user import completed', details: '45 users imported' },
      { id: '8', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), level: 'warning', category: 'Security', message: 'Failed login attempts detected', details: '5 attempts from same IP' },
    ]);

    // Simulate real-time metrics update
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpuUsage: Math.min(100, Math.max(0, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.min(100, Math.max(0, prev.memoryUsage + (Math.random() - 0.5) * 5)),
        diskUsage: prev.diskUsage,
        networkIn: Math.max(0, prev.networkIn + (Math.random() - 0.5) * 30),
        networkOut: Math.max(0, prev.networkOut + (Math.random() - 0.5) * 20),
        activeConnections: Math.max(0, Math.floor(prev.activeConnections + (Math.random() - 0.5) * 20)),
        requestsPerMinute: Math.max(0, Math.floor(prev.requestsPerMinute + (Math.random() - 0.5) * 100)),
        errorRate: Math.max(0, prev.errorRate + (Math.random() - 0.5) * 0.05),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logs.filter(log => {
    const matchesLevel = logFilter === 'all' || log.level === logFilter;
    const matchesSearch = log.message.toLowerCase().includes(logSearch.toLowerCase()) ||
                         log.category.toLowerCase().includes(logSearch.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'info': return <Info className="h-4 w-4 text-blue-600" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'success': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRelativeTime = (timestamp: string) => {
    const minutes = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000 / 60);
    if (minutes < 1) return 'just now';
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
        <PermissionMessage type="role" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/super-admin')}
            className="mb-4 bg-white/5 border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <Terminal className="h-8 w-8 mr-3 text-green-400" />
                System Control Center
              </h1>
              <p className="text-gray-400 mt-1">Advanced configuration, monitoring, and system logs</p>
            </div>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-sm">
              <div className="h-2 w-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              All Systems Operational
            </Badge>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex space-x-2 bg-gray-700/50 rounded-lg p-1">
            <Button
              variant={activeTab === 'settings' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('settings')}
              className={activeTab === 'settings' ? '' : 'text-gray-300 hover:text-white'}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button
              variant={activeTab === 'monitoring' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('monitoring')}
              className={activeTab === 'monitoring' ? '' : 'text-gray-300 hover:text-white'}
            >
              <Activity className="h-4 w-4 mr-2" />
              Monitoring
            </Button>
            <Button
              variant={activeTab === 'logs' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('logs')}
              className={activeTab === 'logs' ? '' : 'text-gray-300 hover:text-white'}
            >
              <FileText className="h-4 w-4 mr-2" />
              System Logs
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Settings Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* General Settings */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Settings className="h-5 w-5 text-blue-400" />
                    <CardTitle className="text-white">General Settings</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Maintenance Mode</p>
                      <p className="text-sm text-gray-400">Disable system for all users</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="font-medium text-white">New Registrations</p>
                      <p className="text-sm text-gray-400">Allow new company signups</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Public API</p>
                      <p className="text-sm text-gray-400">Enable public API endpoints</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Demo Mode</p>
                      <p className="text-sm text-gray-400">Show demo data to new users</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-green-400" />
                    <CardTitle className="text-white">Security Settings</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Require 2FA for Admins</p>
                      <p className="text-sm text-gray-400">Enforce two-factor authentication</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Session Timeout</p>
                      <p className="text-sm text-gray-400">Auto logout after 30 minutes</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="font-medium text-white">IP Whitelist</p>
                      <p className="text-sm text-gray-400">Restrict admin access by IP</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Rate Limiting</p>
                      <p className="text-sm text-gray-400">Prevent API abuse</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-yellow-400" />
                    <CardTitle className="text-white">Notification Settings</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Email Notifications</p>
                      <p className="text-sm text-gray-400">System alerts via email</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Slack Integration</p>
                      <p className="text-sm text-gray-400">Post critical alerts to Slack</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="font-medium text-white">SMS Alerts</p>
                      <p className="text-sm text-gray-400">Critical alerts via SMS</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Webhook Events</p>
                      <p className="text-sm text-gray-400">Send events to external services</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                </CardContent>
              </Card>

              {/* Database & Backup */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Database className="h-5 w-5 text-purple-400" />
                    <CardTitle className="text-white">Database & Backup</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Auto Backup</p>
                      <p className="text-sm text-gray-400">Daily at 2:00 AM</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Data Retention</p>
                      <p className="text-sm text-gray-400">Keep logs for 90 days</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  <div className="p-4 bg-gray-700/50 rounded-lg">
                    <p className="text-sm text-gray-400 mb-3">Last backup: 2 hours ago</p>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1 bg-gray-600 border-gray-500 text-white hover:bg-gray-500">
                        <Download className="h-4 w-4 mr-2" />
                        Backup Now
                      </Button>
                      <Button variant="outline" className="flex-1 bg-gray-600 border-gray-500 text-white hover:bg-gray-500">
                        <Upload className="h-4 w-4 mr-2" />
                        Restore
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Actions */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">System Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                    <Code className="h-4 w-4 mr-2" />
                    View API Docs
                  </Button>
                  <Button variant="outline" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                    <Zap className="h-4 w-4 mr-2" />
                    Clear Cache
                  </Button>
                  <Button variant="outline" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                    <RefreshCcw className="h-4 w-4 mr-2" />
                    Restart Services
                  </Button>
                  <Button variant="outline" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                    <Terminal className="h-4 w-4 mr-2" />
                    Open Terminal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'monitoring' && (
          <div className="space-y-6">
            {/* Real-time Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Cpu className="h-8 w-8 text-blue-400" />
                    <Badge className="bg-blue-500/20 text-blue-300">Live</Badge>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">CPU Usage</p>
                  <p className="text-3xl font-bold text-white mb-3">{metrics.cpuUsage.toFixed(1)}%</p>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        metrics.cpuUsage > 80 ? 'bg-red-500' :
                        metrics.cpuUsage > 60 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${metrics.cpuUsage}%` }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Activity className="h-8 w-8 text-purple-400" />
                    <Badge className="bg-purple-500/20 text-purple-300">Live</Badge>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">Memory Usage</p>
                  <p className="text-3xl font-bold text-white mb-3">{metrics.memoryUsage.toFixed(1)}%</p>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        metrics.memoryUsage > 80 ? 'bg-red-500' :
                        metrics.memoryUsage > 60 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${metrics.memoryUsage}%` }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <HardDrive className="h-8 w-8 text-orange-400" />
                    <Badge className="bg-orange-500/20 text-orange-300">Stable</Badge>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">Disk Usage</p>
                  <p className="text-3xl font-bold text-white mb-3">{metrics.diskUsage.toFixed(1)}%</p>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: `${metrics.diskUsage}%` }} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Globe className="h-8 w-8 text-green-400" />
                    <Badge className="bg-green-500/20 text-green-300">Active</Badge>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">Active Connections</p>
                  <p className="text-3xl font-bold text-white mb-3">{metrics.activeConnections}</p>
                  <p className="text-xs text-gray-400">{metrics.requestsPerMinute} req/min</p>
                </CardContent>
              </Card>
            </div>

            {/* Network Activity */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-cyan-400" />
                    <CardTitle className="text-white">Network Activity</CardTitle>
                  </div>
                  <Button size="sm" variant="outline" className="bg-gray-700 border-gray-600 text-white">
                    <RefreshCcw className="h-3 w-3 mr-1" />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <ArrowDown className="h-4 w-4 text-cyan-400" />
                      <span className="text-sm text-gray-400">Incoming</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{metrics.networkIn.toFixed(1)} MB/s</p>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <ArrowUp className="h-4 w-4 text-orange-400" />
                      <span className="text-sm text-gray-400">Outgoing</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{metrics.networkOut.toFixed(1)} MB/s</p>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Activity className="h-4 w-4 text-red-400" />
                      <span className="text-sm text-gray-400">Error Rate</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{metrics.errorRate.toFixed(2)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Server Status */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Server className="h-5 w-5 text-green-400" />
                  <CardTitle className="text-white">Server Status</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['API Server', 'Database Server', 'Cache Server'].map((server, index) => (
                    <div key={index} className="bg-gray-700/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-medium text-white">{server}</p>
                        <div className="flex items-center space-x-1">
                          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-xs text-green-400">Online</span>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Uptime</span>
                          <span className="text-white font-medium">99.98%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Response</span>
                          <span className="text-white font-medium">{120 + index * 20}ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Load</span>
                          <span className="text-white font-medium">{(Math.random() * 2 + 1).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'monitoring' && (
          <div className="space-y-6">
            {/* Real-time Performance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">CPU & Memory Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {[...Array(20)].map((_, i) => {
                      const cpuHeight = Math.random() * 80 + 20;
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center justify-end space-y-1">
                          <div
                            className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                            style={{ height: `${cpuHeight}%` }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 text-center text-sm text-gray-400">
                    Real-time CPU utilization (last 60 seconds)
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Request Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {[...Array(20)].map((_, i) => {
                      const reqHeight = Math.random() * 90 + 10;
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center justify-end space-y-1">
                          <div
                            className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t"
                            style={{ height: `${reqHeight}%` }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 text-center text-sm text-gray-400">
                    API requests per second (last 60 seconds)
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="space-y-6">
            {/* Log Filters */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search logs..."
                      value={logSearch}
                      onChange={(e) => setLogSearch(e.target.value)}
                      className="pl-10 bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    {(['all', 'info', 'success', 'warning', 'error'] as const).map((level) => (
                      <Button
                        key={level}
                        size="sm"
                        variant={logFilter === level ? 'default' : 'outline'}
                        onClick={() => setLogFilter(level)}
                        className={logFilter !== level ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : ''}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </Button>
                    ))}
                  </div>
                  <Button size="sm" variant="outline" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                    <Download className="h-3 w-3 mr-1" />
                    Export Logs
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* System Logs */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Terminal className="h-5 w-5 text-green-400" />
                    <CardTitle className="text-white">System Logs</CardTitle>
                  </div>
                  <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                    {filteredLogs.length} entries
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {filteredLogs.map((log) => (
                    <div
                      key={log.id}
                      className={`p-4 rounded-lg border-l-4 ${
                        log.level === 'error' ? 'bg-red-900/20 border-l-red-500' :
                        log.level === 'warning' ? 'bg-yellow-900/20 border-l-yellow-500' :
                        log.level === 'success' ? 'bg-green-900/20 border-l-green-500' :
                        'bg-blue-900/20 border-l-blue-500'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="mt-0.5">
                            {getLevelIcon(log.level)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <Badge className={`text-xs ${getLevelBadge(log.level)}`}>
                                {log.level.toUpperCase()}
                              </Badge>
                              <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                                {log.category}
                              </Badge>
                              <span className="text-xs text-gray-400">{getRelativeTime(log.timestamp)}</span>
                            </div>
                            <p className="text-sm text-white font-medium mb-1">{log.message}</p>
                            {log.details && (
                              <p className="text-xs text-gray-400 font-mono">{log.details}</p>
                            )}
                            {(log.userId || log.ipAddress) && (
                              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                {log.userId && <span>User ID: {log.userId}</span>}
                                {log.ipAddress && <span>IP: {log.ipAddress}</span>}
                              </div>
                            )}
                          </div>
                        </div>
                        <Clock className="h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
