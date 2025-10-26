/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Play, Square, Edit2, Trash2, MoreVertical } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, Pagination, Typography } from '@mui/material';
import { CardTitle } from '../ui/card';
import TaskTableHeader from './TaskTableHeader';
import { toast } from 'react-toastify';
import AccountSettingModal from './AccountSettingModal';

interface TaskSettingsData {
  accountId: string;
  internalMin: number;
  internalMax: number;
  afterEachForward: number;
  randomSleepMin: number;
  randomSleepMax: number;
  replyMessage: string;
  tasks: Array<{ id: string; name: string }>;
  selectedTaskId: string;
  progress: { current: number; total: number };
  success: number;
  name?: string;
  message_groups?: any[];
}

interface Task {
  id: string;
  name: string;
  status: string;
  current_index: number;
  total_messages: number;
  successful_forwards: number;
  failed_forwards: number;
  created_at: string;
  updated_at: string;
}

const TaskTable = () => {
  const [token, setToken] = React.useState<string | null>(null);

  // Get token from localStorage only on the client side
  React.useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  // State for met
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [startingTasks, setStartingTasks] = React.useState<Set<string>>(new Set());
  const [stoppingTasks, setStoppingTasks] = React.useState<Set<string>>(new Set());
  const [pollingTasks, setPollingTasks] = React.useState<Set<string>>(new Set());
  const [pollingIntervals, setPollingIntervals] = React.useState<{ [key: string]: NodeJS.Timeout }>(
    {}
  );

  const [pagination, setPagination] = React.useState({
    page: 1,
    size: 5,
    total: 0,
    pages: 0
  });

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [taskSettings, setTaskSettings] = React.useState<TaskSettingsData | null>(null);
  const [editMode, setEditMode] = React.useState(false);

  // Start a task and poll for status updates
  const handleStart = async (taskId: string) => {
    try {
      // Show loading toast
      const toastId = toast.loading('Starting task...', {
        position: 'top-right',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });

      // Add task to starting state
      setStartingTasks((prev) => new Set(prev).add(taskId));

      // Call the start API
      const response = await fetch(
        `https://api.vipadtg.com/api/v1/forwarder/task/${taskId}/start`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Task start response:', data);

      // Update toast to success
      toast.update(toastId, {
        render: 'Task started successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 3000
      });

      // Remove from starting state
      setStartingTasks((prev) => {
        const newSet = new Set(prev);
        newSet.delete(taskId);
        return newSet;
      });

      // Add to polling state
      setPollingTasks((prev) => new Set(prev).add(taskId));

      // Start polling for task status
      startPolling(taskId);
    } catch (err) {
      console.error('Error starting task:', err);

      // Show error toast
      toast.error(err instanceof Error ? err.message : 'Failed to start task', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });

      setError(err instanceof Error ? err.message : 'Failed to start task');

      // Remove from starting state on error
      setStartingTasks((prev) => {
        const newSet = new Set(prev);
        newSet.delete(taskId);
        return newSet;
      });
    }
  };

  // Stop a task
  const handleStop = async (taskId: string) => {
    try {
      // Show loading toast
      const toastId = toast.loading('Stopping task...', {
        position: 'top-right',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });

      // Add task to stopping state
      setStoppingTasks((prev) => new Set(prev).add(taskId));

      // Call the stop API
      const response = await fetch(`https://api.vipadtg.com/api/v1/forwarder/task/${taskId}/stop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Task stop response:', data);

      // Update toast to success
      toast.update(toastId, {
        render: 'Task stopped successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 3000
      });

      // Remove from stopping state
      setStoppingTasks((prev) => {
        const newSet = new Set(prev);
        newSet.delete(taskId);
        return newSet;
      });

      // Stop polling for this task
      stopPolling(taskId);

      // Update task status in the list
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? { ...task, status: 'stopped' } : task))
      );
    } catch (err) {
      console.error('Error stopping task:', err);

      // Show error toast
      toast.error(err instanceof Error ? err.message : 'Failed to stop task', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });

      setError(err instanceof Error ? err.message : 'Failed to stop task');

      // Remove from stopping state on error
      setStoppingTasks((prev) => {
        const newSet = new Set(prev);
        newSet.delete(taskId);
        return newSet;
      });
    }
  };

  // Start polling for task status
  const startPolling = (taskId: string) => {
    if (pollingIntervals[taskId]) {
      clearInterval(pollingIntervals[taskId]);
    }

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`https://api.vipadtg.com/api/v1/forwarder/task/${taskId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Task status response:', data);

        if (data.status === 'success' && data.data) {
          const taskStatus = data.data.status;

          // Update task in the list
          setTasks((prev) =>
            prev.map((task) =>
              task.id === taskId
                ? {
                    ...task,
                    status: taskStatus,
                    current_index: data.data.current_index || task.current_index,
                    total_messages: data.data.total_messages || task.total_messages,
                    successful_forwards: data.data.successful_forwards || task.successful_forwards,
                    failed_forwards: data.data.failed_forwards || task.failed_forwards,
                    updated_at: data.data.updated_at || task.updated_at
                  }
                : task
            )
          );

          // If task is running, stop polling
          if (taskStatus === 'running') {
            stopPolling(taskId);
          }
        }
      } catch (err) {
        console.error('Error polling task status:', err);
        // Continue polling even if there's an error
      }
    }, 2000); // Poll every 2 seconds

    // Store the interval
    setPollingIntervals((prev) => ({ ...prev, [taskId]: interval }));
  };

  // Stop polling for a task
  const stopPolling = (taskId: string) => {
    if (pollingIntervals[taskId]) {
      clearInterval(pollingIntervals[taskId]);
      setPollingIntervals((prev) => {
        const newIntervals = { ...prev };
        delete newIntervals[taskId];
        return newIntervals;
      });
    }

    // Remove from polling state
    setPollingTasks((prev) => {
      const newSet = new Set(prev);
      newSet.delete(taskId);
      return newSet;
    });
  };

  // Clean up intervals on unmount
  React.useEffect(() => {
    return () => {
      Object.values(pollingIntervals).forEach((interval) => clearInterval(interval));
    };
  }, [pollingIntervals]);

  // Handle edit task
  const handleEdit = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      const settings: TaskSettingsData = {
        accountId: task.id,
        internalMin: 20,
        internalMax: 25,
        afterEachForward: 360,
        randomSleepMin: 60,
        randomSleepMax: 120,
        replyMessage: 'Hi this is advertising bot main @vipstore',
        tasks: tasks.map((t) => ({ id: t.id, name: t.name })),
        selectedTaskId: taskId,
        progress: {
          current: task.current_index,
          total: task.total_messages
        },
        success: task.successful_forwards,
        name: task.name,
        message_groups: []
      };
      setTaskSettings(settings);
      setIsModalOpen(true);
      // Set a flag to indicate we want to open in edit mode
      setEditMode(true);
    }
  };

  // Fetch tasks from API
  const fetchTasks = async (page: number = 1, size: number = 5) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://api.vipadtg.com/api/v1/forwarder/task?page=${page}&size=${size}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.status === 'success') {
        setTasks(data.data.items);
        setPagination({
          page: data.data.page,
          size: data.data.size,
          total: data.data.total,
          pages: data.data.pages
        });
      } else {
        throw new Error(data.message || 'Failed to fetch tasks');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks on component mount and when token changes
  React.useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  const handleDelete = async (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        // Show loading toast
        const toastId = toast.loading('Deleting task...', {
          position: 'top-right',
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });

        const response = await fetch(`https://api.vipadtg.com/api/v1/forwarder/task/${taskId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        toast.update(toastId, {
          render: 'Task deleted successfully!',
          type: 'success',
          isLoading: false,
          autoClose: 3000
        });

        fetchTasks(pagination.page, pagination.size);
      } catch (err) {
        console.error('Error deleting task:', err);
        toast.error(err instanceof Error ? err.message : 'Failed to delete task', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });

        setError(err instanceof Error ? err.message : 'Failed to delete task');
      }
    }
  };

  // Handle pagination change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    fetchTasks(value, pagination.size);
  };

  const handleMore = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      const settings: TaskSettingsData = {
        accountId: task.id,
        internalMin: 20,
        internalMax: 25,
        afterEachForward: 360,
        randomSleepMin: 60,
        randomSleepMax: 120,
        replyMessage: 'Hi this is advertising bot main @vipstore',
        tasks: tasks.map((t) => ({ id: t.id, name: t.name })),
        selectedTaskId: taskId,
        progress: {
          current: task.current_index,
          total: task.total_messages
        },
        success: task.successful_forwards
      };
      setTaskSettings(settings);
      setIsModalOpen(true);
      setEditMode(false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <Card className='border-border w-full bg-white dark:bg-[#252139]'>
      <CardHeader className='px-6 py-4 border-b border-border bg-white dark:bg-[#252139]'>
        <CardTitle className='text-foreground'>Forwarding Tasks</CardTitle>
      </CardHeader>
      <CardContent className='p-0 bg-white dark:bg-[#252139]'>
        {loading ? (
          <div className='flex justify-center items-center p-8 bg-white dark:bg-[#252139]'>
            <Typography variant='body2' className='text-muted-foreground'>
              Loading tasks...
            </Typography>
          </div>
        ) : error ? (
          <div className='flex flex-col justify-center items-center p-8 bg-white dark:bg-[#252139]'>
            <Typography variant='body2' className='text-red-600 mb-4'>
              Error: {error}
            </Typography>
            <Button variant='outlined' onClick={() => fetchTasks(pagination.page, pagination.size)}>
              Try Again
            </Button>
          </div>
        ) : (
          <>
            <div className='overflow-x-auto bg-white dark:bg-[#252139]'>
              <table className='w-full bg-white dark:bg-[#252139]'>
                <TaskTableHeader />
                <tbody className='divide-y divide-border bg-white dark:bg-[#252139]'>
                  {tasks.map((task) => (
                    <tr
                      key={task.id}
                      className='hover:bg-accent/50 transition-colors bg-white dark:bg-[#252139]'
                    >
                      <td className='px-6 py-4 whitespace-nowrap bg-white dark:bg-[#252139]'>
                        <Typography variant='body2' className='text-muted-foreground'>
                          {task.id}
                        </Typography>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap bg-white dark:bg-[#252139]'>
                        <Typography variant='body2' className='font-medium text-foreground'>
                          {task.name}
                        </Typography>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap bg-white dark:bg-[#252139]'>
                        <Badge
                          variant={task.status === 'running' ? 'default' : 'secondary'}
                          className={
                            task.status === 'running'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : task.status === 'stopped'
                                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                          }
                        >
                          {pollingTasks.has(task.id) ? (
                            <span className='flex items-center'>
                              <span className='animate-pulse mr-1'>●</span>
                              Starting...
                            </span>
                          ) : (
                            task.status
                          )}
                        </Badge>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap bg-white dark:bg-[#252139]'>
                        <Typography variant='body2' className='text-muted-foreground'>
                          {task.current_index}/{task.total_messages}
                        </Typography>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap bg-white dark:bg-[#252139]'>
                        <Typography variant='body2' className='text-muted-foreground'>
                          {task.successful_forwards}
                        </Typography>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap bg-white dark:bg-[#252139]'>
                        <Typography variant='body2' className='text-muted-foreground'>
                          {task.failed_forwards}
                        </Typography>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap bg-white dark:bg-[#252139]'>
                        <Typography variant='body2' className='text-muted-foreground'>
                          {formatDate(task.created_at)}
                        </Typography>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap bg-white dark:bg-[#252139]'>
                        <div className='flex items-center space-x-2'>
                          <Button
                            variant='outlined'
                            size='small'
                            onClick={() => handleStart(task.id)}
                            disabled={startingTasks.has(task.id) || task.status === 'running'}
                            className='h-8 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 disabled:opacity-50'
                          >
                            {startingTasks.has(task.id) ? (
                              <span className='animate-spin h-4 w-4 mr-1'>⟳</span>
                            ) : (
                              <Play className='h-4 w-4 mr-1' />
                            )}
                            Start
                          </Button>
                          <Button
                            variant='outlined'
                            size='small'
                            onClick={() => handleStop(task.id)}
                            disabled={stoppingTasks.has(task.id) || task.status !== 'running'}
                            className='h-8 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50'
                          >
                            {stoppingTasks.has(task.id) ? (
                              <span className='animate-spin h-4 w-4 mr-1'>⟳</span>
                            ) : (
                              <Square className='h-4 w-4 mr-1' />
                            )}
                            Stop
                          </Button>
                          <Button
                            variant='outlined'
                            size='small'
                            onClick={() => handleEdit(task.id)}
                            className='h-8 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                          >
                            <Edit2 className='h-4 w-4 mr-1' />
                            Edit
                          </Button>
                          <Button
                            variant='outlined'
                            size='small'
                            onClick={() => handleDelete(task.id)}
                            className='h-8 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                          >
                            <Trash2 className='h-4 w-4 mr-1' />
                            Del
                          </Button>
                          <Button
                            variant='outlined'
                            size='small'
                            onClick={() => handleMore(task.id)}
                            className='h-8 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                          >
                            <MoreVertical className='h-4 w-4 mr-1' />
                            More
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className='flex justify-between items-center px-6 py-4 border-t border-border bg-white dark:bg-[#252139]'>
              <Typography variant='body2' className='text-muted-foreground'>
                Showing {tasks.length} of {pagination.total} tasks
              </Typography>
              <Pagination
                count={pagination.pages}
                page={pagination.page}
                onChange={handlePageChange}
                color='primary'
              />
            </div>
          </>
        )}
      </CardContent>
      <AccountSettingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskSettings={taskSettings}
        editMode={editMode}
      />
    </Card>
  );
};

export default TaskTable;
