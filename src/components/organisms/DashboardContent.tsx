'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography } from '@/components/atoms/Typography';
import { Users, UserCheck, UserPlus } from 'lucide-react';
import { Button } from '../ui/button';
import TextField from '@mui/material/TextField';
import ResultsPanel from './ResultsPanel';

const metricsData = [
  {
    title: 'Active Accounts',
    value: '1,234',
    // change: '+12%',
    // description: 'Since last month',
    icon: Users,
    color: 'text-blue-500'
  },
  {
    title: 'Total Accounts',
    value: '1,234',
    // change: '+12%',
    // description: 'Since last month',
    icon: UserCheck,
    color: 'text-green-500'
  },
  {
    title: 'Last Sync',
    value: 'Never',
    // change: '+12%',
    // description: 'Since last month',
    icon: UserPlus,
    color: 'text-purple-500'
  }
];

export function DashboardContent() {
  return (
    <div className='space-y-6 p-4 sm:p-6 lg:space-y-8'>
      {/* Metrics Cards */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6'>
        {metricsData.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className='border-border bg-card hover:bg-accent/50 transition-colors'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium text-muted-foreground'>{metric.title}</CardTitle>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-foreground'>{metric.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div>
        <Typography className='text-foreground'>Quick Actions</Typography>
        <div className='mt-2 flex items-center space-x-2'>
          <Button>Sync Now</Button>
          <Button>Start Checker</Button>
          <Button>Stop Checker</Button>
          <Button>Task Checker</Button>
          <Button>Stop Task Checker</Button>
          <Button>Dark Theme</Button>
        </div>
      </div>
      <div className='mb-0'>
        <TextField
          required
          id='outlined-multiline-static'
          label='Add Groups'
          multiline
          rows={4}
          placeholder='Enter Telegram group/channel links (one per line)'
          variant='outlined'
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'hsl(var(--card))',
              color: 'hsl(var(--foreground))',
              '& fieldset': {
                borderColor: 'hsl(var(--border))'
              },
              '&:hover fieldset': {
                borderColor: 'hsl(var(--primary))'
              },
              '&.Mui-focused fieldset': {
                borderColor: 'hsl(var(--primary))'
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'hsl(var(--muted-foreground))',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'hsl(var(--muted-foreground))'
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'hsl(var(--primary))'
            },
          }}
        />
        <Typography className='mt-0 text-foreground'>Currently Analyzing</Typography>
      </div>
      <ResultsPanel/>
     
    </div>
  );
}