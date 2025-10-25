/* eslint-disable @typescript-eslint/no-unused-vars */
// components/TaskSettings.js
import * as React from 'react';
import { Box } from '@mui/material';
import { FormControlLabel, Checkbox, TextField } from '@mui/material';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { TaskSettingsModal } from './TaskSettingsModal';
import CreateTaskModal from './CreateTaskModal';
import TaskTable from './TaskTable';
import { RefreshCw } from 'lucide-react';
import LogsSection from './LogsSection';

interface TaskSettingsData {
  accountId: string;
  internalMin: number;
  internalMax: number;
  afterEachForward: number;
  randomSleepMin: number;
  replyMessage: string;
  tasks: Array<{ id: string; name: string }>;
  selectedTaskId: string;
  progress: { current: number; total: number };
  success: number;
}

function GlobalSettings() {
  const [useRandomSleep, setUseRandomSleep] = React.useState(true);
  const [logFailedGroups, setLogFailedGroups] = React.useState(true);
  const [floodWaitHandling, setFloodWaitHandling] = React.useState(true);
  const [replyMessage, setReplyMessage] = React.useState(
    "This is an advertising bot @vipstore DMs won't be seen here"
  );
  const [globalReplyMessage, setGlobalReplyMessage] = React.useState(
    "Hi This is an advertising bot. @vipstore DMs won't be seen here"
  );

  return (
    <Card className='border-border bg-card'>
      <CardHeader className='px-6 py-4 border-b border-border'>
        <CardTitle className='text-foreground'>Global Settings</CardTitle>
      </CardHeader>
      <CardContent className='p-6 space-y-6'>
        <div className='flex space-x-4'>
          <FormControlLabel
            control={
              <Checkbox
                checked={useRandomSleep}
                onChange={(e) => setUseRandomSleep(e.target.checked)}
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
                Use Random Sleep Time
              </Typography>
            }
            sx={{ margin: 0, color: 'inherit' }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={logFailedGroups}
                onChange={(e) => setLogFailedGroups(e.target.checked)}
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
                Log Failed Groups
              </Typography>
            }
            sx={{ margin: 0, color: 'inherit' }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={floodWaitHandling}
                onChange={(e) => setFloodWaitHandling(e.target.checked)}
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
                Flood Wait Handling
              </Typography>
            }
            sx={{ margin: 0, color: 'inherit' }}
          />
        </div>
        <div className='space-y-4'>
          <div>
            <Typography variant='body' className='font-medium mb-2 text-foreground'>
              Reply Message
            </Typography>
            <TextField
              multiline
              rows={3}
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              fullWidth
              placeholder='Enter reply message...'
              variant='outlined'
              InputProps={{
                sx: {
                  backgroundColor: 'hsl(var(--card))',
                  color: 'hsl(var(--foreground))',
                  '& .MuiInputBase-input::placeholder': {
                    color: 'hsl(var(--muted-foreground))'
                  }
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'hsl(var(--border))'
                  },
                  '&:hover fieldset': {
                    borderColor: 'hsl(var(--primary))'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'hsl(var(--primary))'
                  }
                }
              }}
            />
          </div>
          <div>
            <Typography variant='body' className='font-medium mb-2 text-foreground'>
              Global Reply Message
            </Typography>
            <TextField
              multiline
              rows={3}
              value={globalReplyMessage}
              onChange={(e) => setGlobalReplyMessage(e.target.value)}
              fullWidth
              placeholder='Enter global reply message...'
              variant='outlined'
              InputProps={{
                sx: {
                  backgroundColor: 'hsl(var(--card))',
                  color: 'hsl(var(--foreground))',
                  '& .MuiInputBase-input::placeholder': {
                    color: 'hsl(var(--muted-foreground))'
                  }
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'hsl(var(--border))'
                  },
                  '&:hover fieldset': {
                    borderColor: 'hsl(var(--primary))'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'hsl(var(--primary))'
                  }
                }
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TaskSettings() {
  const [loading, setLoading] = React.useState(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = React.useState(false);
  const token = localStorage.getItem('token');

  const openModal = () => setIsCreateTaskModalOpen(true);
  const closeModal = () => setIsCreateTaskModalOpen(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [taskSettings, setTaskSettings] = React.useState<TaskSettingsData | null>(null);

  // Handle refresh
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskSettings(null);
  };

  // Start All Tasks
  const handleStartAllTasks = async () => {
    try {
      // Show loading toast
      const toastId = toast.loading('Starting all tasks...', {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Call the bulk start API
      const response = await fetch(`http://185.255.131.231:8000/api/v1/forwarder/tasks/bulk/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          task_ids: ["ALL"]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      toast.update(toastId, {
        render: "All tasks started successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (err) {
      console.error('Error starting all tasks:', err);
      
      // Show error toast
      toast.error(err instanceof Error ? err.message : 'Failed to start all tasks', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // Stop All Tasks
  const handleStopAllTasks = async () => {
    try {
      const toastId = toast.loading('Stopping all tasks...', {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      const response = await fetch(`http://185.255.131.231:8000/api/v1/forwarder/tasks/bulk/stop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          task_ids: ["ALL"]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Bulk stop tasks response:', data);

      toast.update(toastId, {
        render: "All tasks stopped successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (err) {
      console.error('Error stopping all tasks:', err);
      
      toast.error(err instanceof Error ? err.message : 'Failed to stop all tasks', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // Continue All Tasks
  const handleContinueAllTasks = async () => {
    try {
      const toastId = toast.loading('Continuing all tasks...', {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      const response = await fetch(`http://185.255.131.231:8000/api/v1/forwarder/tasks/bulk/continue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          task_ids: ["ALL"]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Bulk continue tasks response:', data);

      toast.update(toastId, {
        render: "All tasks continued successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (err) {
      console.error('Error continuing all tasks:', err);
      
      toast.error(err instanceof Error ? err.message : 'Failed to continue all tasks', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className='space-y-6 lg:space-y-8 bg-gray-100 dark:bg-gray-900'>
      {/* Global Controls */}
      <Box className='border border-gray-500 rounded-lg p-4'>
        <Typography
          variant="h6"
          className="mb-4 font-medium text-gray-900 dark:text-white"
        >
          Global Controls
        </Typography>

        <Box className='flex flex-wrap gap-2'>
          <Button 
            variant='outline' 
            className='text-green-600 border-green-600'
            onClick={handleStartAllTasks}
          >
            Start All Tasks
          </Button>
          <Button 
            variant='outline' 
            className='text-red-600 border-red-600'
            onClick={handleStopAllTasks}
          >
            Stop All Tasks
          </Button>
          <Button 
            variant='outline' 
            className='text-blue-600 border-blue-600'
            onClick={handleContinueAllTasks}
          >
            Continue All Tasks
          </Button>
          <Button onClick={openModal} variant='outline' className='text-indigo-600 border-indigo-600'>
            Create New Task
          </Button>
        </Box>
      </Box>

      {/* Header */}
      <div className='flex items-center justify-between'>
        <Typography variant='h4' className='font-semibold text-foreground'>
          Tasks Details
        </Typography>
        <Button
          variant='outline'
          onClick={handleRefresh}
          disabled={loading}
          className='flex items-center gap-2'
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Tasks Table */}
      <TaskTable />

      {/* Global Settings */}
      <LogsSection title='Live Forward Logs' />
      <GlobalSettings />

      {/* Create Task Modal */}
      <CreateTaskModal isOpen={isCreateTaskModalOpen} onClose={closeModal} />

      {/* Task Settings Modal */}
      <TaskSettingsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}