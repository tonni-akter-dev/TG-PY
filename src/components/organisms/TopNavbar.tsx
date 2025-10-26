'use client';

import * as React from 'react';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/molecules/ThemeToggle';
import { useRouter } from 'next/navigation';

interface TopNavbarProps {
  onMenuToggle: () => void;
  pageTitle?: string;
}

interface UserInfo {
  id: number;
  email: string;
  full_name: string;
  is_active: boolean;
  is_superuser: boolean;
  created_at: string;
}

export function TopNavbar({ onMenuToggle, pageTitle = 'Dashboard' }: TopNavbarProps) {
  const [userInfo, setUserInfo] = React.useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('No authentication token found');
          setIsLoading(false);
          return;
        }

        const response = await fetch('https://api.vipadtg.com/api/v1/auth/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Add Bearer token to headers
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Token is invalid or expired
            console.error('Authentication failed - token may be expired');
            // Remove token from both localStorage and cookies
            localStorage.removeItem('token');
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            // Redirect to login
            router.push('/login');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'success') {
          setUserInfo(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/login');
  }

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
                {isLoading ? 'Loading...' : userInfo ? userInfo.full_name : 'Admin User'}
              </Typography>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout}
            className="text-foreground hover:bg-accent"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}