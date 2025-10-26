/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { FormControlLabel, Checkbox, Slider } from '@mui/material';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { Badge } from '@/components/ui/badge';
import { Play, Square, Trash2, Edit2, Download, MoreHorizontal } from 'lucide-react';
import CreateJoiningTask from './CreateJoiningTask';
import EditJoiningTaskModal from './EditJoiningTaskModal';
import LogViewer from './CheckerLogViewer';

interface Task {
  status: React.ReactNode;
  failed_joins: number;
  current_index: number;
  successful_joins: number;
  total_groups: number;
  id: number;
  name: string;
  account_phone: string;
}

interface TaskApiResponse {
  data: {
    items: Task[];
  };
  total: number;
  page: number;
  size: number;
  totalPages: number;
}
function GlobalJoinSettings() {
  const [minDelay, setMinDelay] = React.useState(30);
  const [maxDelay, setMaxDelay] = React.useState(60);
  const [useRandomDelay, setUseRandomDelay] = React.useState(true);
  const [multipleAccountFolders, setMultipleAccountFolders] = React.useState(true);

  return (
    <Card className='border-border bg-card'>
      <CardHeader className='px-6 py-4 border-b border-border'>
        <CardTitle className='text-foreground'>Global Join Settings</CardTitle>
      </CardHeader>
      <CardContent className='p-6 space-y-6'>
        <div>
          <Typography variant='body' className='font-medium mb-2 text-foreground'>
            Join Delay
          </Typography>
          <Box className='space-y-2'>
            <Box className='flex justify-between items-center'>
              <Typography variant='body' className='text-muted-foreground'>
                Min
              </Typography>
              <Typography variant='body' className='text-foreground'>
                {minDelay} sec
              </Typography>
            </Box>
            <Slider
              value={minDelay}
              onChange={(_, value) => setMinDelay(value as number)}
              min={0}
              max={300}
              valueLabelDisplay='auto'
              sx={{ color: 'hsl(var(--primary))' }}
            />
          </Box>
          <Box className='flex justify-between items-center'>
            <Typography variant='body' className='text-muted-foreground'>
              Max
            </Typography>
            <Typography variant='body' className='text-foreground'>
              {maxDelay} sec
            </Typography>
          </Box>
          <Slider
            value={maxDelay}
            onChange={(_, value) => setMaxDelay(value as number)}
            min={0}
            max={300}
            valueLabelDisplay='auto'
            sx={{ color: 'hsl(var(--primary))' }}
          />
        </div>
        <div className='flex space-x-4'>
          <FormControlLabel
            control={
              <Checkbox
                checked={useRandomDelay}
                onChange={(e) => setUseRandomDelay(e.target.checked)}
                sx={{
                  color: 'rgb(59 130 246)',
                  '&.Mui-checked': {
                    color: 'rgb(59 130 246)'
                  }
                }}
              />
            }
            label={
              <Typography variant='body' className='text-foreground'>
                Use Random Delay
              </Typography>
            }
            sx={{ margin: 0, color: 'inherit' }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={useRandomDelay}
                onChange={(e) => setUseRandomDelay(e.target.checked)}
                sx={{
                  color: 'rgb(59 130 246)',
                  '&.Mui-checked': {
                    color: 'rgb(59 130 246)'
                  }
                }}
              />
            }
            label={
              <Typography variant='body' className='text-foreground'>
                Log Failed Joins
              </Typography>
            }
            sx={{ margin: 0, color: 'inherit' }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={useRandomDelay}
                onChange={(e) => setUseRandomDelay(e.target.checked)}
                sx={{
                  color: 'rgb(59 130 246)',
                  '&.Mui-checked': {
                    color: 'rgb(59 130 246)'
                  }
                }}
              />
            }
            label={
              <Typography variant='body' className='text-foreground'>
                FloodWait Handling
              </Typography>
            }
            sx={{ margin: 0, color: 'inherit' }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={multipleAccountFolders}
                onChange={(e) => setMultipleAccountFolders(e.target.checked)}
                sx={{
                  color: 'rgb(59 130 246)',
                  '&.Mui-checked': {
                    color: 'rgb(59 130 246)'
                  }
                }}
              />
            }
            label={
              <Typography variant='body' className='text-foreground'>
                Auto Multiple Account Folders
              </Typography>
            }
            sx={{ margin: 0, color: 'inherit' }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export function JoinManagement() {
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [selectedTaskId, setSelectedTaskId] = React.useState<number>();

  // Open edit modal for a specific task
  const handleEditTask = (taskId: number) => {
    setSelectedTaskId(taskId);
    setEditModalOpen(true);
  };

  // State for tasks
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [totalTasks, setTotalTasks] = React.useState(0);
  const [startActionLoading, setStartActionLoading] = React.useState(false);
  const [bulkActionLoading, setBulkActionLoading] = React.useState(false);
  const [startingTasks, setStartingTasks] = React.useState<Set<number>>(new Set());
  const [stoppingTasks, setStoppingTasks] = React.useState<Set<number>>(new Set());

  // State for polling
  const [pollingIntervals, setPollingIntervals] = React.useState<{ [key: number]: NodeJS.Timeout }>(
    {}
  );

  // Modal state
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = React.useState(false);

  // Base URL for API
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.vipadtg.com';

  // Fetch a single task by ID
  const fetchTaskById = async (taskId: number): Promise<Task | null> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`${BASE_URL}/api/v1/joining/task/${taskId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.data;
    } catch (err: any) {
      console.error(`Failed to fetch task ${taskId}:`, err);
      return null;
    }
  };

  // Start polling for a specific task
  const startPollingTask = (taskId: number) => {
    // Clear any existing interval for this task
    if (pollingIntervals[taskId]) {
      clearInterval(pollingIntervals[taskId]);
    }

    // Set up new polling interval
    const intervalId = setInterval(async () => {
      const updatedTask = await fetchTaskById(taskId);
      if (updatedTask) {
        // Update the task in the state
        setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? updatedTask : task)));

        // Check if task is done, if so, stop polling
        if (updatedTask.status === 'done' || updatedTask.status === 'completed') {
          clearInterval(intervalId);
          setPollingIntervals((prev) => {
            const newIntervals = { ...prev };
            delete newIntervals[taskId];
            return newIntervals;
          });

          // Remove from starting tasks set when done
          setStartingTasks((prev) => {
            const newSet = new Set(prev);
            newSet.delete(taskId);
            return newSet;
          });
        }
      }
    }, 5000); // Poll every 5 seconds

    // Store the interval ID
    setPollingIntervals((prev) => ({
      ...prev,
      [taskId]: intervalId
    }));
  };

  // Stop polling for a specific task
  const stopPollingTask = (taskId: number) => {
    if (pollingIntervals[taskId]) {
      clearInterval(pollingIntervals[taskId]);
      setPollingIntervals((prev) => {
        const newIntervals = { ...prev };
        delete newIntervals[taskId];
        return newIntervals;
      });
    }
  };

  // Fetch tasks from API
  const fetchTasks = React.useCallback(
    async (page: number = 1) => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found');
        }
        const response = await fetch(`${BASE_URL}/api/v1/joining/task?size=10&page=${page}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: TaskApiResponse = await response.json();
        setTasks(result.data?.items);
        setCurrentPage(result.page);
        setTotalPages(result.totalPages);
        setTotalTasks(result.total);

        // Check if any tasks are running and need to be polled
        result.data?.items.forEach((task: Task) => {
          if (task.status === 'running' && !pollingIntervals[task.id]) {
            startPollingTask(task.id);
          }
        });
      } catch (err: any) {
        console.error('Failed to fetch tasks:', err);
        setError(err.message || 'Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    },
    [BASE_URL, pollingIntervals]
  );

  // Initial fetch
  React.useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Clean up intervals on unmount
  React.useEffect(() => {
    return () => {
      Object.values(pollingIntervals).forEach((interval) => clearInterval(interval));
    };
  }, [pollingIntervals]);

  // Task action handlers
  const handleStart = async (taskId: number) => {
    if (startingTasks.has(taskId)) return;

    setStartingTasks((prev) => new Set(prev).add(taskId));

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      // Call the start API endpoint
      const response = await fetch(`${BASE_URL}/api/v1/joining/task/${taskId}/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Start polling for this task
      startPollingTask(taskId);

      // Update the task status immediately
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? { ...task, status: 'running' } : task))
      );
    } catch (err: any) {
      console.error('Failed to start task:', err);
      setError(err.message || 'Failed to start task');
      // Remove from starting tasks set on error
      setStartingTasks((prev) => {
        const newSet = new Set(prev);
        newSet.delete(taskId);
        return newSet;
      });
    }
  };

  const handleStop = async (taskId: number) => {
    // Prevent multiple clicks
    if (stoppingTasks.has(taskId)) return;

    // Add to stopping tasks set
    setStoppingTasks((prev) => new Set(prev).add(taskId));

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      // Call the stop API endpoint
      const response = await fetch(`${BASE_URL}/api/v1/joining/task/${taskId}/stop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Stop polling for this task
      stopPollingTask(taskId);

      // Update the task status immediately
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? { ...task, status: 'stopped' } : task))
      );
    } catch (err: any) {
      console.error('Failed to stop task:', err);
      setError(err.message || 'Failed to stop task');
    } finally {
      // Remove from stopping tasks set
      setStoppingTasks((prev) => {
        const newSet = new Set(prev);
        newSet.delete(taskId);
        return newSet;
      });
    }
  };

  // Bulk action handlers
  const handleStartAll = async () => {
    setStartActionLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`${BASE_URL}/api/v1/joining/tasks/bulk/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ task_ids: ['ALL'] })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchTasks(currentPage);
    } catch (err: any) {
      console.error('Failed to start all tasks:', err);
      setError(err.message || 'Failed to start all tasks');
    } finally {
      setStartActionLoading(false);
    }
  };

  const handleStopAll = async () => {
    setBulkActionLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`${BASE_URL}/api/v1/joining/tasks/bulk/stop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ task_ids: ['ALL'] })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Stop all polling intervals
      Object.keys(pollingIntervals).forEach((taskId) => {
        stopPollingTask(Number(taskId));
      });

      // Refresh tasks to get updated status
      fetchTasks(currentPage);
    } catch (err: any) {
      console.error('Failed to stop all tasks:', err);
      setError(err.message || 'Failed to stop all tasks');
    } finally {
      setBulkActionLoading(false);
    }
  };

  const handleDelete = async (taskId: number) => {
    console.log('Delete task:', taskId);
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found');
        }

        const response = await fetch(`${BASE_URL}/api/v1/joining/task/${taskId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Stop polling for this task if it was being polled
        stopPollingTask(taskId);

        // Refresh tasks after deletion
        fetchTasks(currentPage);
      } catch (err: any) {
        console.error('Failed to delete task:', err);
        setError(err.message || 'Failed to delete task');
      }
    }
  };

  const handleEdit = (taskId: number) => {
    console.log('Edit task:', taskId);
    // Add edit task functionality here
  };

  const handleMore = (taskId: number) => {
    console.log('More options for task:', taskId);
    // Add more options functionality here
  };

  const handleExport = () => {
    console.log('Export tasks data');
    // Add export functionality here
  };

  const handleCreateShare = () => {
    console.log('Create share folder link');
    // Add create share functionality here
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const openModal = () => setIsCreateTaskModalOpen(true);
  const closeModal = () => {
    setIsCreateTaskModalOpen(false);
    // Refresh tasks after creating a new one
    fetchTasks(currentPage);
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchTasks(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchTasks(currentPage - 1);
    }
  };

  return (
    <div className='space-y-6 lg:space-y-8 bg-gray-100 dark:bg-gray-900'>
      {/* Global Controls */}
      <Box className='border border-gray-500 rounded-lg p-4'>
        <Typography variant='h6' className='mb-4 font-medium text-gray-900 dark:text-white'>
          Global Controls
        </Typography>

        <Box className='flex flex-wrap gap-2'>
          <Button
            variant='outline'
            className='text-green-600 border-green-600'
            onClick={handleStartAll}
            disabled={startActionLoading}
          >
            {startActionLoading ? 'Starting...' : 'Start All Tasks'}
          </Button>
          <Button
            variant='outline'
            className='text-red-600 border-red-600'
            onClick={handleStopAll}
            disabled={bulkActionLoading}
          >
            {bulkActionLoading ? 'Stopping...' : 'Stop All Tasks'}
          </Button>
          <Button
            variant='outline'
            onClick={openModal}
            className='text-indigo-600 border-indigo-600'
          >
            Create New Task
          </Button>
        </Box>
      </Box>

      {/* Tasks Table */}
      <Card className='border-border bg-card'>
        <CardHeader className='px-6 py-4 border-b border-border flex justify-between items-center'>
          <CardTitle className='text-foreground'>Join Tasks</CardTitle>
          <Typography variant='body' className='text-muted-foreground'>
            Total: {totalTasks} tasks
          </Typography>
        </CardHeader>
        <CardContent className='p-0'>
          {loading ? (
            <div className='flex justify-center items-center p-8'>
              <Typography variant='body' className='text-muted-foreground'>
                Loading tasks...
              </Typography>
            </div>
          ) : error ? (
            <div className='flex justify-center items-center p-8'>
              <Typography variant='body' className='text-red-600'>
                Error: {error}
              </Typography>
            </div>
          ) : tasks.length === 0 ? (
            <div className='flex justify-center items-center p-8'>
              <Typography variant='body' className='text-muted-foreground'>
                No tasks found. Create a new task to get started.
              </Typography>
            </div>
          ) : (
            <>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead className='border-b border-border'>
                    <tr className='text-left'>
                      <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                        ID
                      </th>
                      <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                        Task Name
                      </th>
                      <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                        Account
                      </th>
                      <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                        Status
                      </th>
                      <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                        Progress
                      </th>
                      <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                        Joined
                      </th>
                      <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                        Failed
                      </th>
                      <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-border'>
                    {tasks?.map((task) => (
                      <tr key={task.id} className='hover:bg-accent/50 transition-colors'>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <Typography variant='small' className='text-muted-foreground'>
                            {task.id}
                          </Typography>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <Typography variant='small' className='font-medium text-foreground'>
                            {task.name}
                          </Typography>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <Typography variant='small' className='text-muted-foreground'>
                            {task.account_phone}
                          </Typography>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <Badge
                            variant={task.status === 'running' ? 'default' : 'secondary'}
                            className={
                              task.status === 'running'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                : task.status === 'done' || task.status === 'completed'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                            }
                          >
                            {task.status}
                            {pollingIntervals[task.id] && (
                              <span className='ml-1 inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse'></span>
                            )}
                          </Badge>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <Typography variant='small' className='text-muted-foreground'>
                            {task.current_index}/{task.total_groups}
                          </Typography>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <Typography variant='small' className='text-muted-foreground'>
                            {task.successful_joins}
                          </Typography>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <Typography variant='small' className='text-muted-foreground'>
                            {task.failed_joins}
                          </Typography>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='flex items-center space-x-2'>
                            <Button
                              variant='ghost'
                              size='sm'
                              onClick={() => handleStart(task.id)}
                              disabled={task.status === 'running' || startingTasks.has(task.id)}
                              className='h-8 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 disabled:opacity-50'
                            >
                              <Play className='h-4 w-4 mr-1' />
                            </Button>
                            <Button
                              variant='ghost'
                              size='sm'
                              onClick={() => handleStop(task.id)}
                              disabled={task.status !== 'running' || stoppingTasks.has(task.id)}
                              className='h-8 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50'
                            >
                              <Square className='h-4 w-4 mr-1' />
                            </Button>
                            <Button
                              variant='ghost'
                              size='sm'
                              onClick={() => handleDelete(task.id)}
                              className='h-8 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                            >
                              <Trash2 className='h-4 w-4 mr-1' />
                            </Button>
                            <Button
                              variant='ghost'
                              size='sm'
                              onClick={() => handleEditTask(task.id)}
                              className='h-8 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                            >
                              <Edit2 className='h-4 w-4 mr-1' />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className='flex justify-between items-center px-6 py-4 border-t border-border'>
                  <Typography variant='small' className='text-muted-foreground'>
                    Page {currentPage} of {totalPages}
                  </Typography>
                  <div className='flex space-x-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Global Join Settings */}
      <GlobalJoinSettings />
      <EditJoiningTaskModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        taskId={selectedTaskId}
      />
      {/* Logs Section */}
      <LogViewer
        wsUrl='ws://185.255.131.231:8000/api/v1/logs/stream'
        logName='joining_service.log'
        title='Joining Service Logs'
        maxLogs={200}
        autoReconnect={true}
        reconnectInterval={5000}
      />
      <CreateJoiningTask isOpen={isCreateTaskModalOpen} onClose={closeModal} />
    </div>
  );
}

function LogsSection({ title }: { title: string }) {
  const logs = ['[10:12] [Join] system initialized'];

  return (
    <Card className='border-border bg-card'>
      <CardHeader className='px-6 py-4 border-b border-border flex justify-between items-center'>
        <CardTitle className='text-foreground'>{title}</CardTitle>
        <Button variant='ghost' size='icon' className='h-6 w-6'>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='h-48 overflow-y-auto bg-black text-green-400 p-4 font-mono text-sm'>
          {logs.map((log, index) => (
            <div key={index} className='mb-1'>
              {log}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
