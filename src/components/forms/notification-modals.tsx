'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Mail, MessageSquare, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

interface NotificationSettings {
  email: {
    newLeads: boolean;
    taskReminders: boolean;
    dealUpdates: boolean;
    teamMentions: boolean;
    weeklyReports: boolean;
    billingAlerts: boolean;
  };
  push: {
    newLeads: boolean;
    taskReminders: boolean;
    dealUpdates: boolean;
    teamMentions: boolean;
    urgentAlerts: boolean;
  };
  inApp: {
    newLeads: boolean;
    taskReminders: boolean;
    dealUpdates: boolean;
    teamMentions: boolean;
    systemUpdates: boolean;
  };
  frequency: 'immediate' | 'daily' | 'weekly';
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: NotificationSettings;
  onSave: (settings: NotificationSettings) => void;
}

export function NotificationSettingsModal({ isOpen, onClose, settings, onSave }: NotificationSettingsModalProps) {
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(settings);

  const handleSave = () => {
    onSave(notificationSettings);
    onClose();
  };

  const updateEmailSetting = (key: keyof NotificationSettings['email'], value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      email: { ...notificationSettings.email, [key]: value }
    });
  };

  const updatePushSetting = (key: keyof NotificationSettings['push'], value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      push: { ...notificationSettings.push, [key]: value }
    });
  };

  const updateInAppSetting = (key: keyof NotificationSettings['inApp'], value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      inApp: { ...notificationSettings.inApp, [key]: value }
    });
  };

  const updateQuietHours = (field: keyof NotificationSettings['quietHours'], value: any) => {
    setNotificationSettings({
      ...notificationSettings,
      quietHours: { ...notificationSettings.quietHours, [field]: value }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Notification Settings" size="lg">
      <div className="space-y-6">
        {/* Frequency Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notification Frequency
            </CardTitle>
            <CardDescription>
              Choose how often you want to receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notification Frequency
                </label>
                <Select
                  value={notificationSettings.frequency}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    frequency: e.target.value as 'immediate' | 'daily' | 'weekly'
                  })}
                >
                  <option value="immediate">Immediate</option>
                  <option value="daily">Daily Digest</option>
                  <option value="weekly">Weekly Summary</option>
                </Select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Quiet Hours</h4>
                <div className="flex items-center space-x-4">
                  <Switch
                    checked={notificationSettings.quietHours.enabled}
                    onCheckedChange={(checked) => updateQuietHours('enabled', checked)}
                    label="Enable quiet hours"
                  />
                </div>
                {notificationSettings.quietHours.enabled && (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={notificationSettings.quietHours.start}
                        onChange={(e) => updateQuietHours('start', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={notificationSettings.quietHours.end}
                        onChange={(e) => updateQuietHours('end', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Email Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Email Notifications
            </CardTitle>
            <CardDescription>
              Choose which notifications you want to receive via email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">New Leads</p>
                  <p className="text-sm text-gray-600">Get notified when new leads are added</p>
                </div>
                <Switch
                  checked={notificationSettings.email.newLeads}
                  onCheckedChange={(checked) => updateEmailSetting('newLeads', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Task Reminders</p>
                  <p className="text-sm text-gray-600">Reminders for upcoming tasks and deadlines</p>
                </div>
                <Switch
                  checked={notificationSettings.email.taskReminders}
                  onCheckedChange={(checked) => updateEmailSetting('taskReminders', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Deal Updates</p>
                  <p className="text-sm text-gray-600">Updates on deal progress and stage changes</p>
                </div>
                <Switch
                  checked={notificationSettings.email.dealUpdates}
                  onCheckedChange={(checked) => updateEmailSetting('dealUpdates', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Team Mentions</p>
                  <p className="text-sm text-gray-600">When someone mentions you in comments or messages</p>
                </div>
                <Switch
                  checked={notificationSettings.email.teamMentions}
                  onCheckedChange={(checked) => updateEmailSetting('teamMentions', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Weekly Reports</p>
                  <p className="text-sm text-gray-600">Weekly summary of your performance and activity</p>
                </div>
                <Switch
                  checked={notificationSettings.email.weeklyReports}
                  onCheckedChange={(checked) => updateEmailSetting('weeklyReports', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Billing Alerts</p>
                  <p className="text-sm text-gray-600">Important billing and subscription notifications</p>
                </div>
                <Switch
                  checked={notificationSettings.email.billingAlerts}
                  onCheckedChange={(checked) => updateEmailSetting('billingAlerts', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Push Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Push Notifications
            </CardTitle>
            <CardDescription>
              Browser and mobile push notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">New Leads</p>
                  <p className="text-sm text-gray-600">Instant notifications for new leads</p>
                </div>
                <Switch
                  checked={notificationSettings.push.newLeads}
                  onCheckedChange={(checked) => updatePushSetting('newLeads', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Task Reminders</p>
                  <p className="text-sm text-gray-600">Reminders for important tasks</p>
                </div>
                <Switch
                  checked={notificationSettings.push.taskReminders}
                  onCheckedChange={(checked) => updatePushSetting('taskReminders', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Deal Updates</p>
                  <p className="text-sm text-gray-600">Updates on your deals</p>
                </div>
                <Switch
                  checked={notificationSettings.push.dealUpdates}
                  onCheckedChange={(checked) => updatePushSetting('dealUpdates', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Team Mentions</p>
                  <p className="text-sm text-gray-600">When someone mentions you</p>
                </div>
                <Switch
                  checked={notificationSettings.push.teamMentions}
                  onCheckedChange={(checked) => updatePushSetting('teamMentions', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Urgent Alerts</p>
                  <p className="text-sm text-gray-600">Critical system alerts and emergencies</p>
                </div>
                <Switch
                  checked={notificationSettings.push.urgentAlerts}
                  onCheckedChange={(checked) => updatePushSetting('urgentAlerts', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* In-App Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              In-App Notifications
            </CardTitle>
            <CardDescription>
              Notifications shown within the application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">New Leads</p>
                  <p className="text-sm text-gray-600">Show notifications for new leads in the app</p>
                </div>
                <Switch
                  checked={notificationSettings.inApp.newLeads}
                  onCheckedChange={(checked) => updateInAppSetting('newLeads', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Task Reminders</p>
                  <p className="text-sm text-gray-600">Show task reminders in the app</p>
                </div>
                <Switch
                  checked={notificationSettings.inApp.taskReminders}
                  onCheckedChange={(checked) => updateInAppSetting('taskReminders', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Deal Updates</p>
                  <p className="text-sm text-gray-600">Show deal updates in the app</p>
                </div>
                <Switch
                  checked={notificationSettings.inApp.dealUpdates}
                  onCheckedChange={(checked) => updateInAppSetting('dealUpdates', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Team Mentions</p>
                  <p className="text-sm text-gray-600">Show mentions in the app</p>
                </div>
                <Switch
                  checked={notificationSettings.inApp.teamMentions}
                  onCheckedChange={(checked) => updateInAppSetting('teamMentions', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">System Updates</p>
                  <p className="text-sm text-gray-600">Show system updates and maintenance notices</p>
                </div>
                <Switch
                  checked={notificationSettings.inApp.systemUpdates}
                  onCheckedChange={(checked) => updateInAppSetting('systemUpdates', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Settings
          </Button>
        </div>
      </div>
    </Modal>
  );
}
