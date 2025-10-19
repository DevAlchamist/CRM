'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import {
  LayoutDashboard,
  Users,
  Target,
  CheckSquare,
  BarChart3,
  Settings,
  Building2,
  MessageSquare,
  Calendar,
  FileText,
  CreditCard,
  Shield,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { demoUsers, demoCompany } from '@/data/demo';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Leads', href: '/leads', icon: Target },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Employees', href: '/employees', icon: Building2 },
  { name: 'Billing', href: '/billing', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const adminNavigation = [
  { name: 'Super Admin', href: '/admin', icon: Shield },
];

interface SidebarProps {
  userRole: 'super_admin' | 'admin' | 'manager' | 'employee';
}

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user, company, isLoading } = useAuth();
  const currentUser = user || demoUsers[0];
  
  // Use the actual user's role from auth state, fallback to prop
  const actualUserRole = currentUser?.role || userRole;

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout fails, redirect to login
      router.push('/login');
    }
  };

  // Filter base navigation by role
  const roleFiltered = navigation.filter((item) => {
    if (actualUserRole === 'super_admin') return true;
    if (actualUserRole === 'admin') return true;
    if (actualUserRole === 'manager') {
      return !['Billing', 'Settings'].includes(item.name);
    }
    // employee
    return ['Dashboard', 'Customers', 'Leads', 'Tasks', 'Messages', 'Calendar', 'Documents'].includes(item.name);
  });

  const allNavigation = actualUserRole === 'super_admin' 
    ? [...roleFiltered, ...adminNavigation]
    : roleFiltered;

  return (
    <div className="flex h-screen w-64 flex-col bg-white border-r border-[#E5E7EB]">
      {/* Company Logo/Name */}
      <div className="flex h-16 items-center border-b border-[#E5E7EB] px-6">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-md bg-[#2563EB] flex items-center justify-center">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-[#111827]">
              {company?.name || demoCompany.name}
            </h1>
            <p className="text-xs text-[#6B7280]">CRM Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {allNavigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-[#2563EB] text-white'
                  : 'text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111827]'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-[#E5E7EB] p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={undefined} />
            <AvatarFallback>
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#111827] truncate">
              {currentUser.name}
            </p>
            <p className="text-xs text-[#6B7280] truncate">
              {currentUser.email}
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={handleLogout}
            disabled={isLoading}
            title="Logout"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
            ) : (
              <LogOut className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
