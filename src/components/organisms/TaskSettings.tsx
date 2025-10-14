'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { FormControlLabel, Checkbox, TextField } from '@mui/material';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { Badge } from '@/components/ui/badge';
import { Play, Square, Edit2, Trash2, MoreVertical, Download, MoreHorizontal } from 'lucide-react';
import {
  Button as MuiButton,
  Typography as MuiTypography,
  TextField as MuiTextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { TaskSettingsModal } from './TaskSettingsModal';

// Mock task data
const mockTasks = [
  {
    id: 1,
    name: 'Asraful Task Name',
    account: '1816948258',
    status: 'Stopped',
    progress: '0/1',
    success: 0,
    failed: 0
  },
  {
    id: 2,
    name: 'Asraful',
    account: '1816948258',
    status: 'Stopped',
    progress: '0/0',
    success: 0,
    failed: 0
  },
  {
    id: 3,
    name: 'Topics 2',
    account: '6281368689',
    status: 'Stopped',
    progress: '0/3',
    success: 0,
    failed: 0
  },
  {
    id: 4,
    name: 'Task,74995813',
    account: '1816948258',
    status: 'Running',
    progress: '0/2',
    success: 0,
    failed: 0
  },
  {
    id: 5,
    name: '2 Blocks',
    account: '4793176104',
    status: 'Stopped',
    progress: '0/2',
    success: 0,
    failed: 0
  },
  {
    id: 6,
    name: 'Topics 2',
    account: '6281368689',
    status: 'Stopped',
    progress: '2/2',
    success: 1,
    failed: 1
  }
];

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

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '100%',
    maxWidth: '800px',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    maxHeight: '95vh',
    overflowY: 'auto'
  }
}));


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
  // Modal state
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [taskSettings, setTaskSettings] = React.useState<TaskSettingsData | null>(null);

  const handleStart = (taskId: number) => {
    console.log('Start task:', taskId);
    // Add start task functionality here
  };

  const handleStop = (taskId: number) => {
    console.log('Stop task:', taskId);
    // Add stop task functionality here
  };

  const handleEdit = (taskId: number) => {
    console.log('Edit task:', taskId);
    // Add edit task functionality here
  };

  const handleDelete = (taskId: number) => {
    console.log('Delete task:', taskId);
    // Add delete task functionality here
    if (window.confirm('Are you sure you want to delete this task?')) {
      // Implement delete functionality
    }
  };

  const handleMore = (taskId: number) => {
    const task = mockTasks.find((t) => t.id === taskId);
    if (task) {
      const settings: TaskSettingsData = {
        accountId: task.account,
        internalMin: 20,
        internalMax: 25,
        afterEachForward: 360,
        randomSleepMin: 60,
        replyMessage: 'Hi this is advertising bot main @vipstore',
        tasks: mockTasks.map((t) => ({ id: t.id.toString(), name: t.name })),
        selectedTaskId: taskId.toString(),
        progress: {
          current: parseInt(task.progress.split('/')[0]) || 0,
          total: parseInt(task.progress.split('/')[1]) || 0
        },
        success: task.success
      };
      setTaskSettings(settings);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskSettings(null);
  };


  return (
    <div className='space-y-6 lg:space-y-8 bg-black'>
      {/* Global Controls */}
      <Box className='border border-gray-500 rounded-lg p-4'>
        <Typography variant='h6' className='mb-4 text-white font-medium'>
          Global Controls
        </Typography>
        <Box className='flex flex-wrap gap-2'>
          <Button variant='outline' className='text-green-600 border-green-600'>
            Start All Tasks
          </Button>
          <Button variant='outline' className='text-red-600 border-red-600'>
            Stop All Tasks
          </Button>
          <Button variant='outline' className='text-blue-600 border-blue-600'>
            Continue All Tasks
          </Button>
          <Button variant='outline' className='text-indigo-600 border-indigo-600'>
            Create New Task
          </Button>
        </Box>
      </Box>

      {/* Header */}
      <div className='flex items-center justify-between'>
        <Typography variant='h4' className='font-semibold text-foreground'>
          Tasks Details
        </Typography>
      </div>

      {/* Tasks Table */}
      <Card className='border-border bg-card'>
        <CardHeader className='px-6 py-4 border-b border-border'>
          <CardTitle className='text-foreground'>Forwarding Tasks</CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
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
                    Success
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
                {mockTasks.map((task) => (
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
                        {task.account}
                      </Typography>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <Badge
                        variant={task.status === 'Running' ? 'default' : 'secondary'}
                        className={
                          task.status === 'Running'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }
                      >
                        {task.status}
                      </Badge>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <Typography variant='small' className='text-muted-foreground'>
                        {task.progress}
                      </Typography>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <Typography variant='small' className='text-muted-foreground'>
                        {task.success}
                      </Typography>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <Typography variant='small' className='text-muted-foreground'>
                        {task.failed}
                      </Typography>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center space-x-2'>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => handleStart(task.id)}
                          className='h-8 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                        >
                          <Play className='h-4 w-4 mr-1' />
                          Start
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => handleStop(task.id)}
                          className='h-8 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                        >
                          <Square className='h-4 w-4 mr-1' />
                          Stop
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => handleEdit(task.id)}
                          className='h-8 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                        >
                          <Edit2 className='h-4 w-4 mr-1' />
                          Edit
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => handleDelete(task.id)}
                          className='h-8 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                        >
                          <Trash2 className='h-4 w-4 mr-1' />
                          Del
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => handleMore(task.id)}
                          className='h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent'
                        >
                          <MoreVertical className='h-4 w-4' />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Global Settings */}
      <GlobalSettings />

      {/* Logs Section */}
      <LogsSection title='Live Forward Logs' />

      {/* Task Settings Modal */}
      <TaskSettingsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

function LogsSection({ title }: { title: string }) {
  const logs = ['[10:12:06] Forwarder system initialized'];

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
