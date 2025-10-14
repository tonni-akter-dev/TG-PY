'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Typography } from '@/components/atoms/Typography';
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  RefreshCw,
  HelpCircle,
  Settings,
  X
} from 'lucide-react';
import { Button } from '@/components/atoms/Button';

type PageType =
  | 'dashboard'
  | 'forwarder-dashboard'
  | 'orders'
  | 'payments'
  | 'refill'
  | 'tickets'
  | 'services';
interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentPage: string;
  onNavigate: (page: PageType) => void;
}

const navigationItems = [
  { icon: LayoutDashboard, label: 'Checker Dashboard', key: 'dashboard' },
  { icon: Users, label: 'Forwarder Dashboard', key: 'forwarder-dashboard' },
  { icon: ShoppingCart, label: 'Joining Dashboard', key: 'orders' },
  { icon: RefreshCw, label: 'Accounts', key: 'refill' },
  { icon: HelpCircle, label: 'Logs', key: 'tickets' },
  { icon: Settings, label: 'Settings', key: 'services' },
];

export function Sidebar({ isOpen, onToggle, currentPage, onNavigate }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className='fixed inset-0 z-40 bg-black/50 lg:hidden' onClick={onToggle} />}

      {/* Sidebar */}
      <div
        className={cn(
          // Light: card background with subtle border; Dark: brand gradient
          'sidebar-transition fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border dark:bg-[#1C192A] lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className='flex items-center justify-between border-b border-border/60 dark:border-purple-700 p-6'>
          <div className='flex items-center space-x-3'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-foreground/10 dark:bg-white'>
              <span className='text-lg font-bold text-foreground dark:text-purple-900'>TG</span>
            </div>
            <div>
              <Typography variant='h6' className='font-bold text-foreground'>
                TG_PY
              </Typography>
            
            </div>
          </div>
          <Button
            variant='ghost'
            size='icon'
            onClick={onToggle}
            className='text-foreground hover:bg-accent lg:hidden'
          >
            <X className='h-5 w-5' />
          </Button>
        </div>

        {/* Navigation */}
        <nav className='mobile-sidebar-scroll flex-1 overflow-y-auto py-4'>
          <div className='mb-4 px-4'>
            <Typography
              variant='small'
              className='font-semibold tracking-wider text-purple-300 uppercase'
            >
              MAIN
            </Typography>
          </div>

          <div className='space-y-1 px-2'>
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentPage === item.key;

              return (
                <button
                  key={index}
                  onClick={() => {
                    onNavigate(item.key as PageType);
                  }}
                  className={cn(
                    'flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left transition-all duration-200 hover:scale-105',
                    isActive
                      ? 'dark:bg-purple-700 dark:text-white shadow-lg bg-accent/30 text-foreground'
                      : 'text-muted-foreground hover:dark:bg-purple-700/50 hover:dark:text-white hover:bg-accent/40 hover:text-foreground'
                  )}
                >
                  <Icon className='h-5 w-5 flex-shrink-0' />
                  <Typography variant='small' className='truncate font-medium'>
                    {item.label}
                  </Typography>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}
