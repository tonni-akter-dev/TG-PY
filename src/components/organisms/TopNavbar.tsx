'use client';

import * as React from 'react';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/molecules/ThemeToggle';

interface TopNavbarProps {
  onMenuToggle: () => void;
  pageTitle?: string;
}

export function TopNavbar({ onMenuToggle, pageTitle = 'Dashboard' }: TopNavbarProps) {
  return (
    <header className='fixed top-0 right-0 left-0 z-40 border-b border-border bg-card lg:left-64'>
      <div className='flex h-16 items-center justify-between px-4 lg:px-6'>
        <div className='flex items-center space-x-4'>
          <Button
            variant='ghost'
            size='icon'
            onClick={onMenuToggle}
            className='text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden'
          >
            <Menu className='h-5 w-5' />
          </Button>
          <Typography variant='h4' className='font-semibold text-foreground'>
            {pageTitle}
          </Typography>
        </div>
        <div className='flex items-center space-x-2 lg:space-x-4'>
          <ThemeToggle />
          <div className='flex items-center space-x-2 lg:space-x-3'>

            <div className='hidden lg:block'>
              <Typography variant='small' className='font-medium text-foreground'>
                Admin User
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
