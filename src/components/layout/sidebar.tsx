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
    <div className="flex h-screen w-64 flex-col glass border-r border-white/40">
      {/* Company Logo/Name */}
      <div className="flex h-16 items-center border-b border-white/40 px-6">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-xl bg-[#2563EB] flex items-center justify-center shadow-soft">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-[#0F172A]">
              {company?.name || demoCompany.name}
            </h1>
            <p className="text-xs text-[#64748B]">CRM Platform</p>
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
                'flex items-center space-x-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white shadow-soft'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-white/50'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-white/40 p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8 ring-2 ring-white/60">
            <AvatarImage src={undefined} />
            <AvatarFallback>
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#0F172A] truncate">
              {currentUser.name}
            </p>
            <p className="text-xs text-[#64748B] truncate">
              {currentUser.email}
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-xl"
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
