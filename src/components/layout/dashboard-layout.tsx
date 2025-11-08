'use client';

import React, { useState } from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  userRole?: 'super_admin' | 'admin' | 'manager' | 'employee';
  onAddClick?: () => void;
}

export function DashboardLayout({ 
  children, 
  title, 
  userRole = 'admin',
  onAddClick
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen app-bg">
      {/* Sidebar */}
      <div className="hidden lg:flex">
        <Sidebar userRole={userRole} />
      </div>
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white">
            <Sidebar userRole={userRole} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} onMenuClick={() => setSidebarOpen(true)} onAddClick={onAddClick} />
        <main className="flex-1 overflow-auto">
          {/* Page banner */}
          <div className="container mx-auto px-4 pt-6">
            <div className="rounded-2xl border border-white/40 glass shadow-soft p-5 mb-4">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <h2 className="text-xl font-semibold text-[#0F172A] leading-tight">{title}</h2>
                  <p className="text-sm text-[#64748B] mt-1">Your latest updates and quick actions at a glance</p>
                </div>
                {onAddClick && (
                  <button onClick={onAddClick} className="inline-flex items-center rounded-xl bg-white/70 backdrop-blur border border-white/50 px-3 py-2 text-sm font-medium text-[#0F172A] hover:bg-white transition-colors">
                    + New
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 pb-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
