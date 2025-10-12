'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/ui/input';
import { Search, Bell, Settings, Menu, Calendar, ChevronDown } from 'lucide-react';
import { ThemeToggle } from '@/components/molecules/ThemeToggle';

interface TopNavbarProps {
  onMenuToggle: () => void;
  pageTitle?: string;
}

export function TopNavbar({ onMenuToggle, pageTitle = 'Dashboard' }: TopNavbarProps) {
  return (
    <header className='fixed top-0 right-0 left-0 z-40 border-b border-border bg-card lg:left-64'>
      <div className='flex h-16 items-center justify-between px-4 lg:px-6'>
        {/* Left Section */}
        <div className='flex items-center space-x-4'>
          {/* Mobile Menu Button */}
          <Button
            variant='ghost'
            size='icon'
            onClick={onMenuToggle}
            className='text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden'
          >
            <Menu className='h-5 w-5' />
          </Button>

          {/* Page Title */}
          <Typography variant='h4' className='font-semibold text-foreground'>
            {pageTitle}
          </Typography>

          {/* Date Selector */}
          <div className='hidden items-center space-x-2 md:flex'>
            <Button variant='outline' className='border-border bg-accent text-foreground'>
              <Calendar className='mr-2 h-4 w-4' />
              08/21/2018
              <ChevronDown className='ml-2 h-4 w-4' />
            </Button>
          </div>
        </div>

        {/* Right Section */}
        <div className='flex items-center space-x-2 lg:space-x-4'>
          {/* Search */}
          <div className='relative hidden sm:block'>
            <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground' />
            <Input
              type='text'
              placeholder='Search...'
              className='w-48 bg-background border-border pl-10 text-foreground placeholder-muted-foreground focus:border-ring lg:w-64'
            />
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <Button
            variant='ghost'
            size='icon'
            className='relative text-muted-foreground hover:bg-accent hover:text-foreground'
          >
            <Bell className='h-5 w-5' />
            <span className='absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500'></span>
          </Button>

          {/* Settings */}
          <Button
            variant='ghost'
            size='icon'
            className='hidden text-muted-foreground hover:bg-accent hover:text-foreground sm:flex'
          >
            <Settings className='h-5 w-5' />
          </Button>

          {/* Profile */}
          <div className='flex items-center space-x-2 lg:space-x-3'>
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-foreground/10 dark:bg-gradient-to-r dark:from-pink-500 dark:to-purple-500'>
              <span className='text-sm font-semibold text-foreground dark:text-white'>U</span>
            </div>
            <div className='hidden lg:block'>
              <Typography variant='small' className='font-medium text-foreground'>
                Admin User
              </Typography>
              <Typography variant='caption' className='text-muted-foreground'>
                Administrator
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
