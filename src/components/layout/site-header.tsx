'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function SiteHeader() {
  const pathname = usePathname();

  // Hide on dashboard routes
  const dashboardRoots = [
    '/dashboard',
    '/admin',
    '/leads',
    '/customers',
    '/employees',
    '/messages',
    '/tasks',
    '/calendar',
    '/documents',
    '/reports',
    '/settings',
    '/billing',
  ];
  if (pathname && dashboardRoots.some((r) => pathname.startsWith(r))) return null;

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/resources', label: 'Resources' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-[#E5E7EB] bg-white/70 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
        <Link href="/" className="text-xl font-semibold text-[#111827]">CRM Pro</Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-[#374151] hover:text-[#111827]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}


