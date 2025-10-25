/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography } from '@/components/atoms/Typography';
import { Users, UserCheck, UserPlus, Play, Square } from 'lucide-react';
import { Button } from '../ui/button';
import TextField from '@mui/material/TextField';
import ResultsPanel from './ResultsPanel';
import { toast } from 'react-toastify';
import { handleApiError } from '@/lib/helper';
// Define the type for the results prop
interface GroupsChecked {
  current: number;
  total: number;
}

interface EntityTypes {
  group: number;
  channel: number;
  topic: number;
}

interface ResultsData {
  groupsChecked: GroupsChecked;
  validWithFilter: number;
  validOnly: number;
  topicsValid: number;
  channelsValid: number;
  invalid: number;
  accountIssues: number;
  joinRequests: number;
  entityTypes: EntityTypes;
  startedAt: string | number | Date;
  finishedAt: string | number | Date;
}
const CHECKER_API_URL = process.env.NEXT_PUBLIC_CHECKER_URL || 'http://185.255.131.231:8000/api/v1';

export function DashboardContent() {
  // State for metrics
  const [metrics, setMetrics] = React.useState({
    activeAccounts: '1,234',
    totalAccounts: '1,234',
    lastSync: 'Never'
  });

  // State for checker operations
  const [isChecking, setIsChecking] = React.useState(false);
  const [checkerStatus, setCheckerStatus] = React.useState('idle');
  const [runId, setRunId] = React.useState(null);
  const [groupLinks, setGroupLinks] = React.useState('');
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [multiRunId, setMultiRunId] = React.useState<string | null>(null);
  const [isMultiChecking, setIsMultiChecking] = React.useState(false);

  // State for results
  const results: ResultsData = {
    groupsChecked: { current: 15, total: 20 },
    validWithFilter: 12,
    validOnly: 10,
    topicsValid: 8,
    channelsValid: 7,
    invalid: 3,
    accountIssues: 1,
    joinRequests: 2,
    entityTypes: {
      group: 15,
      channel: 5,
      topic: 3
    },
    startedAt: '',
    finishedAt: ''
  };
  const [token, setToken] = React.useState<string | null>(null);
  React.useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);


  // State for recent activities
  const [activities, setActivities] = React.useState([
    {
      timestamp: '[2025-10-06 10:12:06]',
      message: 'Light theme applied',
      type: 'info'
    },
    {
      timestamp: '[2025-10-06 10:12:06]',
      message: '🔄 Syncing accounts with database...',
      type: 'sync'
    },
    {
      timestamp: '[2025-10-06 10:12:06]',
      message: '⚠️ Sync warning: AccountManager object has no attribute \'get_accounts\' (continuing...)',
      type: 'warning'
    }
  ]);

  // State for polling
  const [pollingInterval, setPollingInterval] = React.useState<NodeJS.Timeout | null>(null);

  // Function to add activity
  const addActivity = (message: string, type: string) => {
    const timestamp = `[${new Date().toISOString().replace('T', ' ').substring(0, 19)}]`;
    setActivities(prev => [{ timestamp, message, type }, ...prev].slice(0, 10));
  };

  // Function to fetch checker status by ID
  const fetchCheckerStatus = async (checkerRunId: any) => {
    console.log(checkerRunId, "checker run id");
    try {
      const response = await fetch(`${CHECKER_API_URL}/checker/status/${checkerRunId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      if (!response.ok) {
        const errorMessage = await handleApiError(response);
        throw new Error(errorMessage);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to fetch checker status:`, error);
      return null;
    }
  };

  // Start polling for checker results
  const startPolling = (checkerRunId: any) => {
    // Clear any existing interval
    if (pollingInterval) {
      clearInterval(pollingInterval);
    }

    // Set up new polling interval
    const intervalId = setInterval(async () => {
      const statusData = await fetchCheckerStatus(checkerRunId);
      if (statusData && statusData.data) {
        const { data } = statusData;
        if (statusData.activities && statusData.activities.length > 0) {
          statusData.activities.forEach((activity: { message: any; type: any; }) => {
            addActivity(activity.message, activity.type);
          });
        }

        // Check if checker is done, if so, stop polling
        if (data.status === 'finished' || data.status === 'stopped' || data.status === 'failed') {
          clearInterval(intervalId);
          setPollingInterval(null);
          setIsChecking(false);
          setCheckerStatus(data.status);
          addActivity(`✅ Checker completed with status: ${data.status}`, 'success');
          toast.success(`Checker completed`);
        }
      }
    }, 5000); // Poll every 5 seconds

    // Store the interval ID
    setPollingInterval(intervalId);
  };

  // Stop polling for checker results
  const stopPolling = () => {
    if (pollingInterval) {
      clearInterval(pollingInterval);
      setPollingInterval(null);
    }
  };

  // Clean up intervals on unmount
  React.useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  // Function to sync accounts
  const syncAccounts = async () => {
    setIsSyncing(true);
    addActivity('Syncing accounts with database...', 'sync');

    try {
      const response = await fetch(`${CHECKER_API_URL}/checker/sync-accounts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      // Update metrics with response data
      setMetrics({
        activeAccounts: data.active_accounts ? data.active_accounts.toString() : metrics.activeAccounts,
        totalAccounts: data.total_accounts ? data.total_accounts.toString() : metrics.totalAccounts,
        lastSync: new Date().toLocaleString()
      });

      addActivity('✅ Accounts synced successfully', 'success');
      toast.success('Accounts synced successfully');
    } catch (error) {
      console.error('Error syncing accounts:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  // Function to start checker
  const startChecker = async () => {
    if (!groupLinks.trim()) {
      toast.error('Please enter at least one group link');
      return;
    }
    setIsChecking(true);
    setCheckerStatus('running');
    const links = groupLinks.split('\n').filter(link => link.trim());

    try {
      const response = await fetch(`${CHECKER_API_URL}/checker/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          mode: 'single',
          links: links,
          filters: {
            min_members: 2,
            include_channels: true,
            include_topics: true,
            require_recent_activity: true
          },
          resume_enabled: true
        })
      });

      if (response.status === 400 || response.status === 500) {
        const errorMessage = await handleApiError(response);
        throw new Error(errorMessage);
      }
      const data = await response.json();
      setRunId(data.data?.run_id);

      if (response.status === 200) {
        startPolling(data.data?.run_id);
      }
    } catch (error) {
      setIsChecking(false);
      setCheckerStatus('idle');
    }
  };

  // Function to stop checker
  const stopChecker = async () => {
    stopPolling();
    addActivity(`Stopping checker with ID: ${runId}...`, 'info');

    try {
      const response = await fetch(`${CHECKER_API_URL}/checker/stop/${runId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        const errorMessage = await handleApiError(response);
        throw new Error(errorMessage);
      }

      const data = await response.json();

      stopPolling();
      toast.success(`Checker stopped: ${data.message}`);

    } finally {
      setIsChecking(false);
      setCheckerStatus('stopped');
    }
  };

  // task checker buttons
  const taskChecker = async () => {
    if (!groupLinks.trim()) {
      toast.error('Please enter at least one group link');
      return;
    }

    setIsMultiChecking(true);
    addActivity('🚀 Starting Multi Checker...', 'info');

    const links = groupLinks.split('\n').filter(link => link.trim());

    try {
      const response = await fetch(`${CHECKER_API_URL}/checker/task/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          mode: 'multi',
          links: links,
          filters: {
            min_members: 1,
            include_channels: true,
            include_topics: true,
            require_recent_activity: false
          },
          resume_enabled: true,
          account_strategy: 'balanced'
        })
      });

      if (!response.ok) {
        const errorMessage = await handleApiError(response);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const runId = data?.data?.run_id;
      setMultiRunId(runId);

      toast.success('✅ Multi Checker started successfully');
      addActivity(`Multi Checker started with Run ID: ${runId}`, 'success');
    } catch (error: any) {
      toast.error(`Failed to start Multi Checker: ${error.message}`);
      addActivity(`❌ Failed to start Multi Checker: ${error.message}`, 'error');
    } finally {
      setIsMultiChecking(false);
    }
  };

  const stopTaskChecker = async () => {
    if (!multiRunId) {
      toast.error('No active Multi Checker run found');
      return;
    }
    addActivity(`🛑 Stopping Multi Checker with ID: ${multiRunId}`, 'info');
    try {
      const response = await fetch(`${CHECKER_API_URL}/checker/task/stop/${multiRunId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        const errorMessage = await handleApiError(response);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      toast.success(`✅ Multi Checker stopped: ${data.message || 'Success'}`);
      addActivity(`Multi Checker stopped successfully`, 'success');
    } catch (error: any) {
      toast.error(`Failed to stop Multi Checker: ${error.message}`);
    } finally {
      setIsMultiChecking(false);
      setMultiRunId(null);
    }
  };


  return (
    <div className='space-y-6 lg:space-y-8 bg-gray-100 dark:bg-gray-900'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6'>
        <Card className='border-border bg-card hover:bg-accent/50 transition-colors'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>Active Accounts</CardTitle>
            <Users className='h-4 w-4 text-blue-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-foreground'>{metrics.activeAccounts}</div>
          </CardContent>
        </Card>
        <Card className='border-border bg-card hover:bg-accent/50 transition-colors'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>Total Accounts</CardTitle>
            <UserCheck className='h-4 w-4 text-green-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-foreground'>{metrics.totalAccounts}</div>
          </CardContent>
        </Card>

        <Card className='border-border bg-card hover:bg-accent/50 transition-colors'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>Last Sync</CardTitle>
            <UserPlus className='h-4 w-4 text-purple-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-foreground'>{metrics.lastSync}</div>
          </CardContent>
        </Card>
      </div>
      <div>
        <Typography className='text-foreground'>Quick Actions</Typography>
        <div className='mt-2 flex flex-wrap gap-4 items-center space-x-2'>
          <Button
            onClick={syncAccounts}
            disabled={isSyncing}
            className="flex items-center gap-2"
          >
            {isSyncing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Syncing...
              </>
            ) : (
              <>Sync Now</>
            )}
          </Button>

          <Button
            onClick={startChecker}
            disabled={isChecking || checkerStatus === 'running'}
            className="flex items-center gap-2"
          >
            {checkerStatus === 'running' ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Running...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start Checker
              </>
            )}
          </Button>

          <Button
            onClick={stopChecker}
            disabled={checkerStatus !== 'running'}
            className="flex items-center gap-2"
          >
            <Square className="w-4 h-4" />
            Stop Checker
          </Button>
          <Button
            onClick={taskChecker}
            disabled={isMultiChecking}
            className="flex items-center gap-2"
          >
            {isMultiChecking ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Starting...
              </>
            ) : (
              <>Task Checker</>
            )}
          </Button>

          <Button
            onClick={stopTaskChecker}
            disabled={!multiRunId}
            className="flex items-center gap-2"
          >
            <Square className="w-4 h-4" />
            Stop Task Checker
          </Button>

        </div>
      </div>

      {/* Add Groups */}
      <div className='mb-0'>
        <TextField
          required
          id='outlined-multiline-static'
          label='Add Groups'
          multiline
          rows={4}
          placeholder='Enter Telegram group/channel links (one per line)'
          variant='outlined'
          value={groupLinks}
          onChange={(e) => setGroupLinks(e.target.value)}
          disabled={checkerStatus === 'running'}
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
        <Typography className='mt-0 text-foreground flex items-center gap-2'>
          Currently Analyzing
          {checkerStatus === 'running' && (
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Run ID: {runId}
              {pollingInterval && <span className="text-xs text-muted-foreground">(Polling)</span>}
            </span>
          )}
        </Typography>
      </div>

      {/* Results Panel */}
      <ResultsPanel results={results} />
    </div>
  );
}
