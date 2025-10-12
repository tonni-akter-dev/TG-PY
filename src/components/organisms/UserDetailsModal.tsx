'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { Avatar } from '@/components/ui/avatar';
import { X, Trash2, Edit2 } from 'lucide-react';

interface UserData {
  id: string;
  image: string;
  name: string;
  email: string;
  phone?: string;
  balance: string;
  totalOrders: string;
  status: string;
  joinDate: string;
  lastLogin?: string;
  ticketsSubmitted?: string;
  password?: string;
  address?: string;
}

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserData | null;
  onEdit: (userId: string) => void;
  onDelete: (userId: string) => void;
}

export function UserDetailsModal({
  isOpen,
  onClose,
  user,
  onEdit,
  onDelete
}: UserDetailsModalProps) {
  if (!isOpen || !user) return null;

  const handleEdit = () => {
    onEdit(user.id);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      onDelete(user.id);
      onClose();
    }
  };

  const handleChangePassword = () => {
    // Implement password change functionality
    console.log('Change password for user:', user.id);
  };

  return (
    <>
      {/* Backdrop */}
      <div className='fixed inset-0 z-50 bg-black/80 backdrop-blur-sm' onClick={onClose} />

      {/* Modal */}
      <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
        <Card className='w-full max-w-4xl lg:max-w-5xl bg-card border-border max-h-[95vh] overflow-y-auto'>
          <CardHeader className='flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-4'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto'>
              <Button
                onClick={handleDelete}
                className='w-full sm:w-auto h-11 px-6 bg-gray-700 hover:bg-gray-600 text-white font-medium'
              >
                <Trash2 className='mr-2 h-4 w-4' />
                Delete
              </Button>
              <Button
                onClick={handleEdit}
                className='w-full sm:w-auto h-11 px-6 bg-purple-600 hover:bg-purple-700 text-white font-medium'
              >
                <Edit2 className='mr-2 h-4 w-4' />
                Edit
              </Button>
            </div>
            <Button
              variant='ghost'
              size='icon'
              onClick={onClose}
              className='absolute top-4 right-4 sm:relative sm:top-0 sm:right-0 text-muted-foreground hover:text-foreground h-8 w-8'
            >
              <X className='h-4 w-4' />
            </Button>
          </CardHeader>

          <CardContent className='space-y-6 px-6 lg:px-8'>
            {/* Header */}
            <div>
              <Typography
                variant='h5'
                className='font-semibold text-foreground mb-6 text-xl lg:text-2xl'
              >
                User details view
              </Typography>
            </div>

            {/* Content Layout */}
            <div className='flex flex-col lg:flex-row gap-8 lg:gap-12'>
              {/* User Avatar */}
              <div className='flex justify-center lg:justify-start flex-shrink-0'>
                <div className='w-48 h-64 lg:w-56 lg:h-72 rounded-lg overflow-hidden bg-muted'>
                  <Avatar className='w-full h-full rounded-lg'>
                    <div className='flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500'>
                      <span className='text-6xl lg:text-7xl font-bold text-white'>
                        {user.name.charAt(0)}
                      </span>
                    </div>
                  </Avatar>
                </div>
              </div>

              {/* User Details */}
              <div className='flex-1 space-y-6'>
                <div className='space-y-4'>
                  <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-border pb-3 gap-2'>
                    <Typography variant='small' className='text-muted-foreground font-medium'>
                      Name
                    </Typography>
                    <Typography variant='small' className='font-medium text-foreground'>
                      {user.name}
                    </Typography>
                  </div>

                  <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-border pb-3 gap-2'>
                    <Typography variant='small' className='text-muted-foreground font-medium'>
                      Email
                    </Typography>
                    <Typography variant='small' className='font-medium text-foreground break-all'>
                      {user.email}
                    </Typography>
                  </div>

                  <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-border pb-3 gap-2'>
                    <Typography variant='small' className='text-muted-foreground font-medium'>
                      Phone number
                    </Typography>
                    <Typography variant='small' className='font-medium text-foreground'>
                      {user.phone || '0340 9876543'}
                    </Typography>
                  </div>

                  <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-border pb-3 gap-2'>
                    <Typography variant='small' className='text-muted-foreground font-medium'>
                      Balance
                    </Typography>
                    <Typography variant='small' className='font-medium text-foreground'>
                      {user.balance}
                    </Typography>
                  </div>

                  <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-border pb-3 gap-2'>
                    <Typography variant='small' className='text-muted-foreground font-medium'>
                      Order
                    </Typography>
                    <Typography variant='small' className='font-medium text-foreground'>
                      {user.totalOrders}
                    </Typography>
                  </div>

                  <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-border pb-3 gap-2'>
                    <Typography variant='small' className='text-muted-foreground font-medium'>
                      Signup Date
                    </Typography>
                    <Typography variant='small' className='font-medium text-foreground'>
                      {user.joinDate}
                    </Typography>
                  </div>

                  <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-border pb-3 gap-2'>
                    <Typography variant='small' className='text-muted-foreground font-medium'>
                      Last Login
                    </Typography>
                    <Typography variant='small' className='font-medium text-foreground'>
                      {user.lastLogin}
                    </Typography>
                  </div>

                  <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-border pb-3 gap-2'>
                    <Typography variant='small' className='text-muted-foreground font-medium'>
                      Tickets submitted
                    </Typography>
                    <Typography variant='small' className='font-medium text-foreground'>
                      {user.ticketsSubmitted}
                    </Typography>
                  </div>

                  <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-border pb-3 gap-2'>
                    <Typography variant='small' className='text-muted-foreground font-medium'>
                      Password
                    </Typography>
                    <div className='flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3'>
                      <Typography variant='small' className='font-medium text-foreground'>
                        {user.password}
                      </Typography>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={handleChangePassword}
                        className='text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 px-3 py-1 h-auto text-sm w-fit'
                      >
                        Change
                      </Button>
                    </div>
                  </div>

                  <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start border-b border-border pb-3 gap-2'>
                    <Typography variant='small' className='text-muted-foreground font-medium'>
                      Address
                    </Typography>
                    <Typography
                      variant='small'
                      className='font-medium text-foreground text-right sm:text-left'
                    >
                      {user.address}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
