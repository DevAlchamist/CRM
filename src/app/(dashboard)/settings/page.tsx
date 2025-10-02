'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Modal } from '@/components/ui/modal';
import { EditProfileModal, ChangePasswordModal, DeleteAccountModal } from '@/components/forms/settings-modals';
import { NotificationSettingsModal } from '@/components/forms/notification-modals';
import { 
  User, 
  Building2, 
  Shield, 
  Bell, 
  Globe, 
  Key,
  Save,
  Upload,
  Trash2,
  Edit,
  Check,
  X,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';
import { demoUsers, demoCompany } from '@/data/demo';
import { getInitials } from '@/lib/utils';

export default function SettingsPage() {
  const [currentUser, setCurrentUser] = useState(demoUsers[0]);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      newLeads: true,
      taskReminders: true,
      dealUpdates: false,
      teamMentions: true,
      weeklyReports: true,
      billingAlerts: true,
    },
    push: {
      newLeads: true,
      taskReminders: true,
      dealUpdates: false,
      teamMentions: true,
      urgentAlerts: true,
    },
    inApp: {
      newLeads: true,
      taskReminders: true,
      dealUpdates: true,
      teamMentions: true,
      systemUpdates: true,
    },
    frequency: 'immediate' as 'immediate' | 'daily' | 'weekly',
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00',
    },
  });

  const handleSaveProfile = (profileData: any) => {
    setCurrentUser({ ...currentUser, ...profileData });
    setEditProfileModal(false);
  };

  const handleChangePassword = () => {
    // In a real app, this would handle password change
    setChangePasswordModal(false);
  };

  const handleDeleteAccount = () => {
    // In a real app, this would handle account deletion
    setDeleteAccountModal(false);
  };

  const handleSaveNotificationSettings = (settings: any) => {
    setNotificationSettings(settings);
    setNotificationModal(false);
  };

  return (
    <DashboardLayout title="Settings" userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#111827]">Settings</h1>
            <p className="text-[#6B7280]">Manage your account and company preferences</p>
          </div>
        </div>

        {/* Settings Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {[
                    { id: 'profile', label: 'Profile', icon: User },
                    { id: 'company', label: 'Company', icon: Building2 },
                    { id: 'security', label: 'Security', icon: Shield },
                    { id: 'notifications', label: 'Notifications', icon: Bell },
                    { id: 'integrations', label: 'Integrations', icon: Globe },
                  ].map((item) => (
                    <button
                      key={item.id}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-left text-sm font-medium text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB] rounded-md"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Profile Settings</span>
                </CardTitle>
                <CardDescription>
                  Update your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback className="text-lg">
                      {getInitials(currentUser.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium text-[#111827]">{currentUser.name}</h3>
                    <p className="text-[#6B7280]">{currentUser.email}</p>
                    <div className="flex space-x-2 mt-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setEditProfileModal(true)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                      <Button size="sm" variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      First Name
                    </label>
                    <Input defaultValue="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Last Name
                    </label>
                    <Input defaultValue="Smith" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Email Address
                    </label>
                    <Input defaultValue={currentUser.email} type="email" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Phone Number
                    </label>
                    <Input defaultValue="+1 (555) 123-4567" type="tel" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Job Title
                    </label>
                    <Input defaultValue="Sales Director" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Company Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span>Company Settings</span>
                </CardTitle>
                <CardDescription>
                  Manage your company information and branding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Company Logo */}
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 bg-[#F3F4F6] rounded-lg flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-[#6B7280]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#111827]">{demoCompany.name}</h3>
                    <p className="text-[#6B7280]">{demoCompany.industry} • {demoCompany.size}</p>
                    <div className="flex space-x-2 mt-2">
                      <Button size="sm" variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Logo
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Company Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Company Name
                    </label>
                    <Input defaultValue={demoCompany.name} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Industry
                    </label>
                    <Input defaultValue={demoCompany.industry} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Company Size
                    </label>
                    <Input defaultValue={demoCompany.size} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Website
                    </label>
                    <Input defaultValue="https://techcorp.com" type="url" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Address
                    </label>
                    <Input defaultValue="123 Business St, Suite 100, City, State 12345" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Security Settings</span>
                </CardTitle>
                <CardDescription>
                  Manage your account security and access controls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Password Change */}
                <div>
                  <h3 className="text-lg font-medium text-[#111827] mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-2">
                        Current Password
                      </label>
                      <Input type="password" placeholder="Enter current password" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-2">
                        New Password
                      </label>
                      <Input type="password" placeholder="Enter new password" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-2">
                        Confirm New Password
                      </label>
                      <Input type="password" placeholder="Confirm new password" />
                    </div>
                    <Button onClick={() => setChangePasswordModal(true)}>
                      <Key className="h-4 w-4 mr-2" />
                      Update Password
                    </Button>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="border-t border-[#E5E7EB] pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-[#111827]">Two-Factor Authentication</h3>
                      <p className="text-sm text-[#6B7280]">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Badge variant="success">
                      <Check className="h-3 w-3 mr-1" />
                      Enabled
                    </Badge>
                  </div>
                </div>

                {/* Active Sessions */}
                <div className="border-t border-[#E5E7EB] pt-6">
                  <h3 className="text-lg font-medium text-[#111827] mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    {[
                      { device: 'Chrome on Windows', location: 'New York, NY', lastActive: 'Now', current: true },
                      { device: 'Safari on iPhone', location: 'New York, NY', lastActive: '2 hours ago', current: false },
                      { device: 'Firefox on Mac', location: 'San Francisco, CA', lastActive: '1 day ago', current: false },
                    ].map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-[#E5E7EB] rounded-lg">
                        <div>
                          <p className="font-medium text-[#111827]">{session.device}</p>
                          <p className="text-sm text-[#6B7280]">{session.location} • {session.lastActive}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {session.current && (
                            <Badge variant="success" className="text-xs">Current</Badge>
                          )}
                          {!session.current && (
                            <Button size="sm" variant="outline">
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notification Settings</span>
                </CardTitle>
                <CardDescription>
                  Choose how you want to be notified about important updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-[#111827]">Email Notifications</p>
                      <p className="text-sm text-[#6B7280]">Receive updates via email</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        {Object.values(notificationSettings.email).filter(Boolean).length} enabled
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-[#111827]">Push Notifications</p>
                      <p className="text-sm text-[#6B7280]">Get browser push notifications</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        {Object.values(notificationSettings.push).filter(Boolean).length} enabled
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-[#111827]">In-App Notifications</p>
                      <p className="text-sm text-[#6B7280]">Show notifications within the app</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        {Object.values(notificationSettings.inApp).filter(Boolean).length} enabled
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-[#111827]">Frequency</p>
                      <p className="text-sm text-[#6B7280]">How often to receive notifications</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 capitalize">
                        {notificationSettings.frequency}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center pt-4">
                  <Button onClick={() => setNotificationModal(true)}>
                    <Bell className="h-4 w-4 mr-2" />
                    Manage Notifications
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal
        isOpen={editProfileModal}
        onClose={() => setEditProfileModal(false)}
        user={currentUser}
        onSave={handleSaveProfile}
      />

      <ChangePasswordModal
        isOpen={changePasswordModal}
        onClose={() => setChangePasswordModal(false)}
        onSave={handleChangePassword}
      />

      <DeleteAccountModal
        isOpen={deleteAccountModal}
        onClose={() => setDeleteAccountModal(false)}
        onConfirm={handleDeleteAccount}
      />

      <NotificationSettingsModal
        isOpen={notificationModal}
        onClose={() => setNotificationModal(false)}
        settings={notificationSettings}
        onSave={handleSaveNotificationSettings}
      />

      {/* Legacy Modals - keeping for reference */}
      <Modal
        isOpen={false}
        onClose={() => {}}
        title="Edit Profile"
        size="md"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <Input defaultValue={currentUser.name.split(' ')[0]} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <Input defaultValue={currentUser.name.split(' ')[1]} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <Input defaultValue={currentUser.email} type="email" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <Input placeholder="Enter phone number" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Tell us about yourself"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setEditProfileModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleSaveProfile({})}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        isOpen={changePasswordModal}
        onClose={() => setChangePasswordModal(false)}
        title="Change Password"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <Input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter current password" 
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <Input 
                type={showNewPassword ? "text" : "password"} 
                placeholder="Enter new password" 
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <Input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Confirm new password" 
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setChangePasswordModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleChangePassword}>
              Update Password
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Account Modal */}
      <Modal
        isOpen={deleteAccountModal}
        onClose={() => setDeleteAccountModal(false)}
        title="Delete Account"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <div>
              <p className="font-medium text-red-900">Warning</p>
              <p className="text-sm text-red-700">
                This action cannot be undone. This will permanently delete your account.
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Are you sure you want to delete your account? All your data will be permanently removed.
          </p>
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setDeleteAccountModal(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
