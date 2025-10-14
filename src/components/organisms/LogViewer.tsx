import * as React from 'react';
import { Box } from '@mui/material';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { Badge } from '@/components/ui/badge';

const mockLogs = [
  {
    timestamp: '2025-10-06 10:13:46',
    type: 'tg_checker',
    level: 'ERROR',
    message: 'UI update error: AccountManager object has no attribute \'get_accounts\'',
  },
  {
    timestamp: '2025-10-06 10:13:45',
    type: 'tg_checker',
    level: 'ERROR',
    message: 'UI update error: AccountManager object has no attribute \'get_accounts\'',
  },
  {
    timestamp: '2025-10-06 10:13:44',
    type: 'tg_checker',
    level: 'ERROR',
    message: 'UI update error: AccountManager object has no attribute \'get_accounts\'',
  },
  {
    timestamp: '2025-10-06 10:13:43',
    type: 'tg_checker',
    level: 'ERROR',
    message: 'UI update error: AccountManager object has no attribute \'get_accounts\'',
  },
  {
    timestamp: '2025-10-06 10:13:42',
    type: 'tg_checker',
    level: 'ERROR',
    message: 'UI update error: AccountManager object has no attribute \'get_accounts\'',
  },
  {
    timestamp: '2025-10-06 10:13:41',
    type: 'tg_checker',
    level: 'ERROR',
    message: 'UI update error: AccountManager object has no attribute \'get_accounts\'',
  },
  {
    timestamp: '2025-10-06 10:13:40',
    type: 'tg_checker',
    level: 'ERROR',
    message: 'UI update error: AccountManager object has no attribute \'get_accounts\'',
  },
  {
    timestamp: '2025-10-06 10:13:39',
    type: 'tg_checker',
    level: 'ERROR',
    message: 'UI update error: AccountManager object has no attribute \'get_accounts\'',
  },
  {
    timestamp: '2025-10-06 10:13:38',
    type: 'tg_checker',
    level: 'ERROR',
    message: 'UI update error: AccountManager object has no attribute \'get_accounts\'',
  },
  {
    timestamp: '2025-10-06 10:13:37',
    type: 'tg_checker',
    level: 'ERROR',
    message: 'UI update error: AccountManager object has no attribute \'get_accounts\'',
  },
  // Add more as needed
];

export function LogViewer() {
  const [logType, setLogType] = React.useState('General');
  const [filterLevel, setFilterLevel] = React.useState('All');

  const logTypes = ['General', 'Authentication', 'Usage Checker'];
  const filterLevels = ['All', 'Info','Error', 'Warning', 'Critical'];

  const filteredLogs = mockLogs.filter(log => 
    (logType === 'General' || log.type === logType) &&
    (filterLevel === 'All' || log.level === filterLevel)
  );

  return (
    <Card className='border-border bg-card '>
      <CardHeader className='px-6 py-4 border-b border-border'>
        <CardTitle className='text-foreground'>Logs</CardTitle>
      </CardHeader>
      <CardContent className='p-6 space-y-4'>
        {/* Filters */}
        <Box className='flex items-center gap-4'>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <InputLabel sx={{ color: 'hsl(var(--muted-foreground))' }}>Log Type</InputLabel>
            <Select
              value={logType}
              onChange={(e) => setLogType(e.target.value)}
              label="Log Type"
              sx={{ 
                color: 'hsl(var(--foreground))',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'hsl(var(--border))',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'hsl(var(--primary))',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'hsl(var(--primary))',
                },
                '& .MuiSvgIcon-root': {
                  color: 'hsl(var(--muted-foreground))',
                },
              }}
            >
              {logTypes.map((type) => (
                <MenuItem key={type} value={type} sx={{ color: 'hsl(var(--foreground))' }}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <InputLabel sx={{ color: 'hsl(var(--muted-foreground))' }}>Filter Level</InputLabel>
            <Select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              label="Filter Level"
              sx={{ 
                color: 'hsl(var(--foreground))',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'hsl(var(--border))',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'hsl(var(--primary))',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'hsl(var(--primary))',
                },
                '& .MuiSvgIcon-root': {
                  color: 'hsl(var(--muted-foreground))',
                },
              }}
            >
              {filterLevels.map((level) => (
                <MenuItem key={level} value={level} sx={{ color: 'hsl(var(--foreground))' }}>{level}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Logs Table */}
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='border-b border-border'>
              <tr className='text-left'>
                <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider border-b border-border'>
                  Timestamp
                </th>
                <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider border-b border-border'>
                  Type
                </th>
                <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider border-b border-border'>
                  Level
                </th>
                <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider border-b border-border'>
                  Message
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-border'>
              {filteredLogs.map((log, index) => (
                <tr key={index} className='hover:bg-accent/50 transition-colors'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <Typography variant='small' className='text-foreground'>
                      {log.timestamp}
                    </Typography>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <Typography variant='small' className='text-foreground'>
                      {log.type}
                    </Typography>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <Badge
                      variant={log.level === 'ERROR' ? 'destructive' : 'secondary'}
                      className={
                        log.level === 'ERROR'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                      }
                    >
                      {log.level}
                    </Badge>
                  </td>
                  <td className='px-6 py-4 max-w-md break-words'>
                    <Typography variant='small' className='text-foreground'>
                      {log.message}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}