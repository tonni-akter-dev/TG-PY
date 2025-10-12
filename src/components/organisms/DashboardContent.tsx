'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Typography } from '@/components/atoms/Typography';
import { TrendingUp, Users, UserCheck, UserPlus } from 'lucide-react';
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
            <Card key={index} className='card-hover border-gray-700 bg-gray-800'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium text-gray-300'>{metric.title}</CardTitle>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-white'>{metric.value}</div>
                {/* quick actions */}
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div>
        <Typography>Quick Actions</Typography>
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
              '& fieldset': {
                borderColor: 'white'
              },
              '&:hover fieldset': {
                borderColor: 'white'
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white'
              }
            },
            '& .MuiInputLabel-root': {
              color: 'white'
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'white'
            },
            input: { color: 'white' },
            textarea: { color: 'white' }
          }}
        />
        <Typography className='mt-0'>Currently Analyzing</Typography>
      </div>
      <ResultsPanel/>
      {/* User Activity Section */}
      {/* <div>
        <Typography variant='h5' className='mb-6 font-semibold text-white'>
          User Activity
        </Typography>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6'>
          <Card className='card-hover border-gray-700 bg-gray-800'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div>
                  <CardTitle className='text-white'>Monthly Profit</CardTitle>
                  <CardDescription className='text-gray-400'>Last 12 Months</CardDescription>
                </div>
                <Badge variant='secondary' className='bg-green-100 text-green-800'>
                  +15%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className='flex h-64 items-center justify-center'>
                <div className='relative h-full w-full'>
                  <svg className='h-full w-full' viewBox='0 0 400 200'>
                    <defs>
                      <linearGradient id='profitGradient' x1='0%' y1='0%' x2='0%' y2='100%'>
                        <stop offset='0%' stopColor='#8b5cf6' stopOpacity='0.8' />
                        <stop offset='100%' stopColor='#ec4899' stopOpacity='0.3' />
                      </linearGradient>
                    </defs>
                    <line x1='50' y1='20' x2='50' y2='180' stroke='#374151' strokeWidth='1' />
                    <line x1='50' y1='180' x2='350' y2='180' stroke='#374151' strokeWidth='1' />
                    <line
                      x1='50'
                      y1='140'
                      x2='350'
                      y2='140'
                      stroke='#374151'
                      strokeWidth='0.5'
                      opacity='0.5'
                    />
                    <line
                      x1='50'
                      y1='100'
                      x2='350'
                      y2='100'
                      stroke='#374151'
                      strokeWidth='0.5'
                      opacity='0.5'
                    />
                    <line
                      x1='50'
                      y1='60'
                      x2='350'
                      y2='60'
                      stroke='#374151'
                      strokeWidth='0.5'
                      opacity='0.5'
                    />

                    <polyline
                      points='70,160 120,140 170,120 220,100 270,80 320,60'
                      fill='none'
                      stroke='#8b5cf6'
                      strokeWidth='3'
                    />

                    <polygon
                      points='70,180 70,160 120,140 170,120 220,100 270,80 320,60 320,180'
                      fill='url(#profitGradient)'
                    />

                    <circle cx='70' cy='160' r='4' fill='#8b5cf6' />
                    <circle cx='120' cy='140' r='4' fill='#8b5cf6' />
                    <circle cx='170' cy='120' r='4' fill='#8b5cf6' />
                    <circle cx='220' cy='100' r='4' fill='#8b5cf6' />
                    <circle cx='270' cy='80' r='4' fill='#8b5cf6' />
                    <circle cx='320' cy='60' r='4' fill='#8b5cf6' />

                    <text x='70' y='195' textAnchor='middle' className='fill-gray-400 text-xs'>
                      Aug
                    </text>
                    <text x='120' y='195' textAnchor='middle' className='fill-gray-400 text-xs'>
                      Sep
                    </text>
                    <text x='170' y='195' textAnchor='middle' className='fill-gray-400 text-xs'>
                      Oct
                    </text>
                    <text x='220' y='195' textAnchor='middle' className='fill-gray-400 text-xs'>
                      Nov
                    </text>
                    <text x='270' y='195' textAnchor='middle' className='fill-gray-400 text-xs'>
                      Dec
                    </text>
                    <text x='320' y='195' textAnchor='middle' className='fill-gray-400 text-xs'>
                      Jan
                    </text>
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='card-hover border-gray-700 bg-gray-800'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div>
                  <CardTitle className='text-white'>Daily Active Users</CardTitle>
                  <CardDescription className='text-gray-400'>Last 7 Days</CardDescription>
                </div>
                <Badge variant='secondary' className='bg-green-100 text-green-800'>
                  +7%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className='flex h-64 items-center justify-center'>
                <div className='relative h-full w-full'>
                  <svg className='h-full w-full' viewBox='0 0 400 200'>
                    <defs>
                      <linearGradient id='barGradient' x1='0%' y1='0%' x2='0%' y2='100%'>
                        <stop offset='0%' stopColor='#3b82f6' stopOpacity='0.8' />
                        <stop offset='100%' stopColor='#8b5cf6' stopOpacity='0.6' />
                      </linearGradient>
                    </defs>
                  
                    <line x1='50' y1='20' x2='50' y2='180' stroke='#374151' strokeWidth='1' />
                    <line x1='50' y1='180' x2='350' y2='180' stroke='#374151' strokeWidth='1' />
                    <line
                      x1='50'
                      y1='140'
                      x2='350'
                      y2='140'
                      stroke='#374151'
                      strokeWidth='0.5'
                      opacity='0.5'
                    />
                    <line
                      x1='50'
                      y1='100'
                      x2='350'
                      y2='100'
                      stroke='#374151'
                      strokeWidth='0.5'
                      opacity='0.5'
                    />
                    <line
                      x1='50'
                      y1='60'
                      x2='350'
                      y2='60'
                      stroke='#374151'
                      strokeWidth='0.5'
                      opacity='0.5'
                    />

                    <rect x='70' y='120' width='30' height='60' fill='url(#barGradient)' rx='2' />
                    <rect x='110' y='100' width='30' height='80' fill='url(#barGradient)' rx='2' />
                    <rect x='150' y='90' width='30' height='90' fill='url(#barGradient)' rx='2' />
                    <rect x='190' y='110' width='30' height='70' fill='url(#barGradient)' rx='2' />
                    <rect x='230' y='95' width='30' height='85' fill='url(#barGradient)' rx='2' />
                    <rect x='270' y='85' width='30' height='95' fill='url(#barGradient)' rx='2' />
                    <rect x='310' y='105' width='30' height='75' fill='url(#barGradient)' rx='2' />

                    <text x='85' y='195' textAnchor='middle' className='fill-gray-400 text-xs'>
                      Mon
                    </text>
                    <text x='125' y='195' textAnchor='middle' className='fill-gray-400 text-xs'>
                      Tue
                    </text>
                    <text x='165' y='195' textAnchor='middle' className='fill-gray-400 text-xs'>
                      Wed
                    </text>
                    <text x='205' y='195' textAnchor='middle' className='fill-gray-400 text-xs'>
                      Thu
                    </text>
                    <text x='245' y='195' textAnchor='middle' className='fill-gray-400 text-xs'>
                      Fri
                    </text>
                    <text x='285' y='195' textAnchor='middle' className='fill-gray-400 text-xs'>
                      Sat
                    </text>
                    <text x='325' y='195' textAnchor='middle' className='fill-gray-400 text-xs'>
                      Sun
                    </text>
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div> */}

      {/* Service Usage Section */}
    </div>
  );
}
