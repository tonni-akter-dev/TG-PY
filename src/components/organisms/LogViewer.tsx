import * as React from 'react';
import { Box } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { Badge } from '@/components/ui/badge';

// Define the log entry type
interface LogEntry {
  timestamp: string;
  type: string;
  level: string;
  message: string;
}

export function LogViewer() {
  const [logType, setLogType] = React.useState('checker_service.log');
  const [filterLevel, setFilterLevel] = React.useState('All');
  const [logs, setLogs] = React.useState<LogEntry[]>([]);
  const [availableLogTypes, setAvailableLogTypes] = React.useState<string[]>([]);
  const [isConnected, setIsConnected] = React.useState(false);
  const [connectionError, setConnectionError] = React.useState<string | null>(null);
  const socketRef = React.useRef<WebSocket | null>(null);
  const maxLogs = 100; // Limit the number of logs to display

  const filterLevels = ['All', 'Info', 'Error', 'Warning', 'Critical'];

  // Fetch available log types on component mount
  React.useEffect(() => {
    const fetchLogTypes = async () => {
      try {
        const response = await fetch('https://api.vipadtg.com/api/v1/logs');
        if (response.ok) {
          const logTypes = await response.json();
          setAvailableLogTypes(logTypes);
          // Set default log type if the current one is not in the list
          if (logTypes.length > 0 && !logTypes.includes(logType)) {
            setLogType(logTypes[0]);
          }
        } else {
          console.error('Failed to fetch log types');
          setConnectionError('Failed to fetch log types');
        }
      } catch (error) {
        console.error('Error fetching log types:', error);
        setConnectionError('Error fetching log types');
      }
    };

    fetchLogTypes();
  }, []);

  // Set up WebSocket connection when log type changes
  React.useEffect(() => {
    // Close existing connection if any
    if (socketRef.current) {
      socketRef.current.close();
    }

    // Create new WebSocket connection
    const wsUrl = `wss://api.vipadtg.com/api/v1/logs/stream?name=${logType}`;
    socketRef.current = new WebSocket(wsUrl);

    // Connection opened
    socketRef.current.onopen = () => {
      console.log(`Connected to ${logType} log stream`);
      setIsConnected(true);
      setConnectionError(null);
      // Clear previous logs when connecting to a new log type
      setLogs([]);
    };

    // Listen for messages
    socketRef.current.onmessage = (event) => {
      try {
        // Parse the log data
        const logData = JSON.parse(event.data);

        // Create a new log entry
        const newLog: LogEntry = {
          timestamp: logData.timestamp || new Date().toLocaleString(),
          type: logType,
          level: logData.level || 'Info',
          message: logData.message || event.data
        };

        // Update logs with new entry
        setLogs((prevLogs) => {
          const updatedLogs = [newLog, ...prevLogs];
          // Keep only the latest logs
          return updatedLogs.slice(0, maxLogs);
        });
      } catch (e) {
        // If parsing fails, treat the raw data as the message
        const newLog: LogEntry = {
          timestamp: new Date().toLocaleString(),
          type: logType,
          level: 'Info',
          message: event.data
        };

        setLogs((prevLogs) => {
          const updatedLogs = [newLog, ...prevLogs];
          return updatedLogs.slice(0, maxLogs);
        });
      }
    };

    // Handle errors
    socketRef.current.onerror = (err) => {
      console.error('WebSocket error:', err);
      setConnectionError('Connection error');
      setIsConnected(false);
    };

    // Handle connection close
    socketRef.current.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
      // Try to reconnect after 3 seconds
      setTimeout(() => {
        if (socketRef.current?.readyState === WebSocket.CLOSED) {
          socketRef.current = new WebSocket(wsUrl);
        }
      }, 3000);
    };

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [logType]);

  // Filter logs based on selected level
  const filteredLogs = logs.filter((log) => filterLevel === 'All' || log.level === filterLevel);

  // Clear all logs
  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <Card className='border-border bg-card '>
      <CardHeader className='px-6 py-4 border-b border-border flex flex-row items-center justify-between'>
        <CardTitle className='text-foreground'>Logs</CardTitle>
        <div className='flex items-center gap-2'>
          <span className={`text-sm ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
            {isConnected ? '● Connected' : '● Disconnected'}
          </span>
          <Button variant='outline' size='sm' onClick={clearLogs}>
            Clear Logs
          </Button>
        </div>
      </CardHeader>
      <CardContent className='p-6 space-y-4'>
        {/* Connection Error */}
        {connectionError && (
          <Box className='p-3 bg-red-50 dark:bg-red-900/20 rounded-md'>
            <Typography variant='small' className='text-red-500'>
              {connectionError}
            </Typography>
          </Box>
        )}

        {/* Filters */}
        <Box className='flex items-center gap-4'>
          <FormControl variant='outlined' size='small' sx={{ minWidth: 180 }}>
            <InputLabel sx={{ color: 'hsl(var(--muted-foreground))' }}>Log Type</InputLabel>
            <Select
              value={logType}
              onChange={(e) => setLogType(e.target.value)}
              label='Log Type'
              sx={{
                color: 'hsl(var(--foreground))',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'hsl(var(--border))'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'hsl(var(--primary))'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'hsl(var(--primary))'
                },
                '& .MuiSvgIcon-root': {
                  color: 'hsl(var(--muted-foreground))'
                }
              }}
            >
              {availableLogTypes.map((type) => (
                <MenuItem key={type} value={type} sx={{ color: 'hsl(var(--foreground))' }}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant='outlined' size='small' sx={{ minWidth: 120 }}>
            <InputLabel sx={{ color: 'hsl(var(--muted-foreground))' }}>Filter Level</InputLabel>
            <Select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              label='Filter Level'
              sx={{
                color: 'hsl(var(--foreground))',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'hsl(var(--border))'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'hsl(var(--primary))'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'hsl(var(--primary))'
                },
                '& .MuiSvgIcon-root': {
                  color: 'hsl(var(--muted-foreground))'
                }
              }}
            >
              {filterLevels.map((level) => (
                <MenuItem key={level} value={level} sx={{ color: 'hsl(var(--foreground))' }}>
                  {level}
                </MenuItem>
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
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className='px-6 py-8 text-center'>
                    <Typography variant='small' className='text-muted-foreground'>
                      {isConnected ? 'Waiting for logs...' : 'Connecting to log stream...'}
                    </Typography>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log, index) => (
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
                        variant={
                          log.level === 'ERROR' || log.level === 'Critical'
                            ? 'destructive'
                            : 'secondary'
                        }
                        className={
                          log.level === 'ERROR' || log.level === 'Critical'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            : log.level === 'Warning'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
