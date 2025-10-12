'use client';

import * as React from 'react';
import { Sidebar } from '@/components/organisms/Sidebar';
import { TopNavbar } from '@/components/organisms/TopNavbar';
import { DashboardContent } from '@/components/organisms/DashboardContent';
import { UserManagement } from '@/components/organisms/UserManagement';
import {
  OrdersManagement,
  ManualPayments,
  RefillRequests,
  TicketsSupport,
  ServicesCategories,
  ProvidersAPI,
  Subscriptions,
  AffiliateSystem,
  ChildPanels,
  RefundRequests,
  BroadcastMessages,
  ReportsLogs
} from '@/components/organisms/PlaceholderPages';

type CurrentPage =
  | 'dashboard'
  | 'manage-users'
  | 'orders'
  | 'payments'
  | 'refill'
  | 'tickets'
  | 'services'
  | 'providers'
  | 'subscriptions'
  | 'affiliate'
  | 'panels'
  | 'refunds'
  | 'broadcast'
  | 'reports';

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState<CurrentPage>('dashboard');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigate = (page: CurrentPage) => {
    setCurrentPage(page);
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'manage-users':
        return 'Management';
      case 'orders':
        return 'Orders Management';
      case 'payments':
        return 'Manual Payments';
      case 'refill':
        return 'Refill Requests';
      case 'tickets':
        return 'Tickets Support';
      case 'services':
        return 'Services & Categories';
      case 'providers':
        return 'Providers (API)';
      case 'subscriptions':
        return 'Subscriptions';
      case 'affiliate':
        return 'Affiliate System';
      case 'panels':
        return 'Child Panels';
      case 'refunds':
        return 'Refund Requests';
      case 'broadcast':
        return 'Broadcast Messages';
      case 'reports':
        return 'Reports & Logs';
      default:
        return 'System Status';
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'manage-users':
        return <UserManagement />;
      case 'orders':
        return <OrdersManagement />;
      case 'payments':
        return <ManualPayments />;
      case 'refill':
        return <RefillRequests />;
      case 'tickets':
        return <TicketsSupport />;
      case 'services':
        return <ServicesCategories />;
      case 'providers':
        return <ProvidersAPI />;
      case 'subscriptions':
        return <Subscriptions />;
      case 'affiliate':
        return <AffiliateSystem />;
      case 'panels':
        return <ChildPanels />;
      case 'refunds':
        return <RefundRequests />;
      case 'broadcast':
        return <BroadcastMessages />;
      case 'reports':
        return <ReportsLogs />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className='min-h-screen dark:dashboard-gradient'>
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Top Navbar */}
      <TopNavbar onMenuToggle={toggleSidebar} pageTitle={getPageTitle()} />

      {/* Main Content */}
      <main className='pt-16 lg:ml-64'>
        <div className='min-h-screen'>{renderContent()}</div>
      </main>
    </div>
  );
}
