'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography } from '@/components/atoms/Typography';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/atoms/Button';
import {
  ShoppingCart,
  CreditCard,
  RefreshCw,
  HelpCircle,
  Settings,
  Database,
  Zap,
  UserCheck,
  PanelLeft,
  Undo2,
  Megaphone,
  BarChart3,
  Plus,
  Filter,
  Download
} from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  stats?: Array<{ label: string; value: string; change?: string }>;
}

function PlaceholderPage({ title, description, icon: Icon, stats }: PlaceholderPageProps) {
  return (
    <div className='space-y-6 p-4 sm:p-6 lg:space-y-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900'>
            <Icon className='h-5 w-5 text-purple-600 dark:text-purple-300' />
          </div>
          <div>
            <Typography variant='h4' className='font-semibold text-foreground'>
              {title}
            </Typography>
            <Typography variant='small' className='text-muted-foreground'>
              {description}
            </Typography>
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <Button variant='outline'>
            <Filter className='mr-2 h-4 w-4' />
            Filter
          </Button>
          <Button>
            <Plus className='mr-2 h-4 w-4' />
            Add New
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {stats.map((stat, index) => (
            <Card key={index} className='border-border bg-card'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium text-muted-foreground'>
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-foreground'>{stat.value}</div>
                {stat.change && (
                  <div className='mt-1'>
                    <Badge
                      variant='secondary'
                      className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    >
                      {stat.change}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Main Content */}
      <Card className='border-border bg-card'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle className='text-foreground'>{title} Overview</CardTitle>
            <Button variant='outline' size='sm'>
              <Download className='mr-2 h-4 w-4' />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex h-64 items-center justify-center'>
            <div className='text-center'>
              <Icon className='mx-auto h-16 w-16 text-muted-foreground/50' />
              <Typography variant='h6' className='mt-4 font-medium text-foreground'>
                {title} Management
              </Typography>
              <Typography variant='small' className='mt-2 text-muted-foreground'>
                This section is ready for implementation. All the navigation and layout structure is
                in place.
              </Typography>
              <Button className='mt-4'>Get Started</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function OrdersManagement() {
  return (
    <PlaceholderPage
      title='Orders Management'
      description='Manage and track all customer orders'
      icon={ShoppingCart}
      stats={[
        { label: 'Total Orders', value: '2,847', change: '+12%' },
        { label: 'Pending Orders', value: '156', change: '+5%' },
        { label: 'Completed Orders', value: '2,691', change: '+15%' },
        { label: 'Revenue', value: '$45,231', change: '+18%' }
      ]}
    />
  );
}

export function ManualPayments() {
  return (
    <PlaceholderPage
      title='Manual Payments'
      description='Process and manage manual payment transactions'
      icon={CreditCard}
      stats={[
        { label: 'Pending Payments', value: '23', change: '-2%' },
        { label: 'Processed Today', value: '45', change: '+8%' },
        { label: 'Total Amount', value: '$12,450', change: '+22%' },
        { label: 'Success Rate', value: '98.5%', change: '+1.2%' }
      ]}
    />
  );
}

export function RefillRequests() {
  return (
    <PlaceholderPage
      title='Refill Requests'
      description='Handle service refill and top-up requests'
      icon={RefreshCw}
      stats={[
        { label: 'Active Requests', value: '89', change: '+15%' },
        { label: 'Completed Today', value: '234', change: '+25%' },
        { label: 'Success Rate', value: '94.2%', change: '+2.1%' },
        { label: 'Avg. Time', value: '2.5h', change: '-15%' }
      ]}
    />
  );
}

export function TicketsSupport() {
  return (
    <PlaceholderPage
      title='Tickets Support'
      description='Customer support and ticket management system'
      icon={HelpCircle}
      stats={[
        { label: 'Open Tickets', value: '42', change: '-8%' },
        { label: 'Resolved Today', value: '67', change: '+12%' },
        { label: 'Avg. Response', value: '1.2h', change: '-25%' },
        { label: 'Satisfaction', value: '4.8/5', change: '+0.2' }
      ]}
    />
  );
}

export function ServicesCategories() {
  return (
    <PlaceholderPage
      title='Services & Categories'
      description='Manage service offerings and category organization'
      icon={Settings}
      stats={[
        { label: 'Active Services', value: '156', change: '+8%' },
        { label: 'Categories', value: '24', change: '+2%' },
        { label: 'Popular Service', value: 'Instagram', change: '85%' },
        { label: 'Avg. Rating', value: '4.6/5', change: '+0.3' }
      ]}
    />
  );
}

export function ProvidersAPI() {
  return (
    <PlaceholderPage
      title='Providers (API Integrations)'
      description='Manage API providers and service integrations'
      icon={Database}
      stats={[
        { label: 'Active Providers', value: '12', change: '+2' },
        { label: 'API Calls Today', value: '45,231', change: '+18%' },
        { label: 'Success Rate', value: '99.2%', change: '+0.5%' },
        { label: 'Avg. Response', value: '245ms', change: '-12%' }
      ]}
    />
  );
}

export function Subscriptions() {
  return (
    <PlaceholderPage
      title='Subscriptions'
      description='Manage user subscriptions and recurring services'
      icon={Zap}
      stats={[
        { label: 'Active Subscriptions', value: '1,247', change: '+15%' },
        { label: 'Monthly Revenue', value: '$23,450', change: '+22%' },
        { label: 'Churn Rate', value: '2.1%', change: '-0.5%' },
        { label: 'Avg. LTV', value: '$456', change: '+18%' }
      ]}
    />
  );
}

export function AffiliateSystem() {
  return (
    <PlaceholderPage
      title='Affiliate System'
      description='Manage affiliate partners and commission tracking'
      icon={UserCheck}
      stats={[
        { label: 'Active Affiliates', value: '89', change: '+12%' },
        { label: 'Total Commissions', value: '$5,670', change: '+28%' },
        { label: 'Conversions', value: '234', change: '+15%' },
        { label: 'Top Performer', value: 'John D.', change: '$1,250' }
      ]}
    />
  );
}

export function ChildPanels() {
  return (
    <PlaceholderPage
      title='Child Panels'
      description='Manage sub-panels and reseller accounts'
      icon={PanelLeft}
      stats={[
        { label: 'Active Panels', value: '15', change: '+3' },
        { label: 'Total Users', value: '2,456', change: '+18%' },
        { label: 'Revenue Share', value: '$12,340', change: '+25%' },
        { label: 'Success Rate', value: '96.8%', change: '+2.1%' }
      ]}
    />
  );
}

export function RefundRequests() {
  return (
    <PlaceholderPage
      title='Refund Requests'
      description='Process and manage customer refund requests'
      icon={Undo2}
      stats={[
        { label: 'Pending Refunds', value: '12', change: '-15%' },
        { label: 'Processed Today', value: '8', change: '+25%' },
        { label: 'Total Amount', value: '$1,245', change: '-8%' },
        { label: 'Approval Rate', value: '78%', change: '+5%' }
      ]}
    />
  );
}

export function BroadcastMessages() {
  return (
    <PlaceholderPage
      title='Broadcast Messages'
      description='Send announcements and notifications to users'
      icon={Megaphone}
      stats={[
        { label: 'Messages Sent', value: '156', change: '+22%' },
        { label: 'Open Rate', value: '68%', change: '+12%' },
        { label: 'Click Rate', value: '23%', change: '+8%' },
        { label: 'Active Campaigns', value: '5', change: '+2' }
      ]}
    />
  );
}

export function ReportsLogs() {
  return (
    <PlaceholderPage
      title='Reports & Logs'
      description='Analytics, reports, and system activity logs'
      icon={BarChart3}
      stats={[
        { label: 'Total Events', value: '45,231', change: '+18%' },
        { label: 'Error Rate', value: '0.02%', change: '-50%' },
        { label: 'Reports Generated', value: '89', change: '+25%' },
        { label: 'Data Points', value: '2.3M', change: '+35%' }
      ]}
    />
  );
}
