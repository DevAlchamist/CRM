'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Search, Bell, Plus, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { demoUsers } from '@/data/demo';

interface HeaderProps {
  title: string;
  onMenuClick?: () => void;
  onAddClick?: () => void;
}

export function Header({ title, onMenuClick, onAddClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const currentUser = demoUsers[0];
  const { company } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="mx-4 lg:mx-6 mt-3 mb-3 h-14 glass rounded-2xl border border-white/40 shadow-soft flex items-center justify-between px-3 lg:px-4">
        {/* Left side */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-xl"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="hidden md:flex items-baseline space-x-2">
            <h1 className="text-lg md:text-xl font-semibold text-[#0F172A] tracking-tight">{title}</h1>
            <span className="text-sm text-[#64748B]">· {company?.name || 'TechCorp Solutions'}</span>
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <Input
              placeholder="Search customers, leads, tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl bg-white/70 backdrop-blur border-white/50"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2">
          {/* Quick Add Button */}
          <Button className="hidden sm:flex rounded-xl" onClick={onAddClick}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
          
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative rounded-xl">
            <Bell className="h-5 w-5" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
            >
              3
            </Badge>
          </Button>

          {/* User Avatar */}
          <Avatar className="h-8 w-8 ring-2 ring-white/60">
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback>
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
