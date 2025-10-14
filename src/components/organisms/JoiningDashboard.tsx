'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import {
  FormControlLabel,
  Checkbox,
  TextField,
  Slider,
} from '@mui/material';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { Badge } from '@/components/ui/badge';
import { Play, Square, Trash2, Edit2, MoreVertical, Download, MoreHorizontal, Share2 } from 'lucide-react';

// Mock task data
const mockTasks = [
  { id: 1, name: 'ee', account: '479317190', status: 'Running', progress: '0/100', joined: 0, failed: 0 },
  { id: 2, name: 'd', account: '1816948258', status: 'Completed', progress: '100/100', joined: 5, failed: 95 },
  { id: 3, name: 'd', account: '57563957', status: 'Completed', progress: '100/100', joined: 4, failed: 96 },
  { id: 4, name: 'd', account: '27814242', status: 'Completed', progress: '100/100', joined: 44, failed: 56 },
  { id: 5, name: 's Folder Tasks', account: '6281368689', status: 'Completed', progress: '100/100', joined: 62, failed: 38 },
];

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
              <Typography variant='body' className='text-muted-foreground'>Min</Typography>
              <Typography variant='body' className='text-foreground'>{minDelay} sec</Typography>
            </Box>
            <Slider
              value={minDelay}
              onChange={(_, value) => setMinDelay(value as number)}
              min={0}
              max={300}
              valueLabelDisplay="auto"
              sx={{ color: 'hsl(var(--primary))' }}
            />
          </Box>
          <Box className='flex justify-between items-center'>
            <Typography variant='body' className='text-muted-foreground'>Max</Typography>
            <Typography variant='body' className='text-foreground'>{maxDelay} sec</Typography>
          </Box>
          <Slider
            value={maxDelay}
            onChange={(_, value) => setMaxDelay(value as number)}
            min={0}
            max={300}
            valueLabelDisplay="auto"
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
                    color: 'rgb(59 130 246)',
                  },
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
                    color: 'rgb(59 130 246)',
                  },
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
                    color: 'rgb(59 130 246)',
                  },
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
                    color: 'rgb(59 130 246)',
                  },
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
  // Modal state (commented out for now; adapt if needed for tasks)
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<typeof mockTasks[0] | null>(null);

  const handleStart = (taskId: number) => {
    console.log('Start task:', taskId);
    // Add start task functionality here
  };

  const handleStop = (taskId: number) => {
    console.log('Stop task:', taskId);
    // Add stop task functionality here
  };

  const handleDelete = (taskId: number) => {
    console.log('Delete task:', taskId);
    // Add delete task functionality here
    if (window.confirm('Are you sure you want to delete this task?')) {
      // Implement delete functionality
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

  // Uncomment and adapt if using a modal for task details
  // const handleView = (taskId: number) => {
  //   const task = mockTasks.find((t) => t.id === taskId);
  //   if (task) {
  //     setSelectedTask(task);
  //     setIsModalOpen(true);
  //   }
  // };

  return (
    <div className='space-y-6 lg:space-y-8 bg-black'>
      {/* Global Controls */}
      <Box className="border border-gray-500 rounded-lg p-4">
        <Typography variant="h6" className="mb-4 text-white font-medium">
          Global Controls
        </Typography>
        <Box className="flex flex-wrap gap-2">
          <Button variant="outline" className="text-green-600 border-green-600">
            Start Tasks
          </Button>
          <Button variant="outline" className="text-red-600 border-red-600">
            Stop Tasks
          </Button>
          <Button variant="outline" className="text-blue-600 border-blue-600">
            Continue All Tasks
          </Button>
          <Button variant="outline" className="text-indigo-600 border-indigo-600">
            Create New Task
          </Button>
          <Button variant="outline" onClick={handleCreateShare} className="bg-orange-500 text-white hover:bg-orange-600">
            <Share2 className='mr-2 h-4 w-4' />
            Create Share Folder Link
          </Button>
        </Box>
      </Box>

      {/* Header */}
      <div className='flex items-center justify-between'>
        <Typography variant='h4' className='font-semibold text-foreground'>
          Join Tasks
        </Typography>
        <Button onClick={handleExport} className='bg-purple-600 hover:bg-purple-700 text-white'>
          <Download className='mr-2 h-4 w-4' />
          Export
        </Button>
      </div>

      {/* Tasks Table */}
      <Card className='border-border bg-card'>
        <CardHeader className='px-6 py-4 border-b border-border'>
          <CardTitle className='text-foreground'>Join Tasks</CardTitle>
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
                    Joined
                  </th>
                  <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                    Failed
                  </th>
                  <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                    Actions
                  </th>
                  <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                    Settings
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
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
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
                        {task.joined}
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
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => handleStop(task.id)}
                          className='h-8 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
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
                          onClick={() => handleEdit(task.id)}
                          className='h-8 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                        >
                          <Edit2 className='h-4 w-4 mr-1' />
                        </Button>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleEdit(task.id)}
                        className='h-8 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                      >
                        <Edit2 className='h-4 w-4' />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Global Join Settings */}
      <GlobalJoinSettings />

      {/* Logs Section */}
      <LogsSection title="Live Join Logs" />

      {/* Task Details Modal (adapt from UserDetailsModal if needed) */}
      {/* <TaskDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        task={selectedTask}
        onEdit={handleEdit}
        onDelete={handleDelete}
      /> */}
    </div>
  );
}

function LogsSection({ title }: { title: string }) {
  const logs = [
    '[10:12] [Join] system initialized',
  ];

  return (
    <Card className='border-border bg-card'>
      <CardHeader className='px-6 py-4 border-b border-border flex justify-between items-center'>
        <CardTitle className='text-foreground'>{title}</CardTitle>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='h-48 overflow-y-auto bg-black text-green-400 p-4 font-mono text-sm'>
          {logs.map((log, index) => (
            <div key={index} className='mb-1'>{log}</div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}