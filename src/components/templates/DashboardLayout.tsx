'use client';
import * as React from 'react';
import { Sidebar } from '@/components/organisms/Sidebar';
import { TopNavbar } from '@/components/organisms/TopNavbar';
import { DashboardContent } from '@/components/organisms/DashboardContent';
import { JoinManagement } from '../organisms/JoiningDashboard';
import { AccountManagement } from '../organisms/AccountManagement';
import { LogViewer } from '../organisms/LogViewer';
import { SettingsPanel } from '../organisms/SettingsPanel';
import { TaskSettings } from '../organisms/TaskSettings';

type CurrentPage =
  | 'dashboard'
  | 'forwarder-dashboard'
  | 'orders'
  | 'payments'
  | 'refill'
  | 'tickets'
  | 'services'

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
      case 'forwarder-dashboard':
        return 'Forwarder Dashboard';
      case 'orders':
        return 'Joining Dashboard';
      case 'refill':
        return 'Accounts';
      case 'tickets':
        return 'Logs';
      case 'services':
        return 'Settings';
      default:
        return 'checker Dashboard';
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'forwarder-dashboard':
        return <TaskSettings />;
      case 'orders':
        return <JoinManagement />;
      case 'refill':
        return <AccountManagement />;
      case 'tickets':
        return <LogViewer />;
      case 'services':
        return <SettingsPanel />;
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
