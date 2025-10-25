import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SyncIcon from '@mui/icons-material/Sync';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

// Define types for the component
interface Activity {
  timestamp: string;
  message: string;
  type: 'sync' | 'warning' | 'success' | 'error';
}

interface LogViewerProps {
  wsUrl: string;
  logName: string;
  maxLogs?: number;
  title?: string;
  autoReconnect?: boolean;
  reconnectInterval?: number;
}

const LogViewer: React.FC<LogViewerProps> = ({
  wsUrl,
  logName,
  maxLogs = 100,
  title = 'Real-time Logs',
  autoReconnect = true,
  reconnectInterval = 3000
}) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Construct the WebSocket URL with the log name
    const fullWsUrl = `${wsUrl}?name=${logName}`;
    
    // Connect to WebSocket
    const connectWebSocket = () => {
      try {
        // Clear any existing reconnection timeout
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = null;
        }
        
        // Create WebSocket connection
        socketRef.current = new WebSocket(fullWsUrl);
        
        // Connection opened
        socketRef.current.onopen = () => {
          console.log(`WebSocket connected to ${fullWsUrl}`);
          setIsConnected(true);
          setError(null);
        };
        
        // Listen for messages
        socketRef.current.onmessage = (event) => {
          try {
            // Parse the log data (adjust parsing based on your actual log format)
            const logData = JSON.parse(event.data);
            
            // Convert log data to activity format
            const newActivity: Activity = {
              timestamp: new Date().toLocaleTimeString(),
              message: logData.message || event.data,
              type: determineLogType(logData.level || logData.message)
            };
            
            // Update activities with new log
            setActivities(prevActivities => {
              const updatedActivities = [newActivity, ...prevActivities];
              // Keep only the latest logs
              return updatedActivities.slice(0, maxLogs);
            });
          } catch (e) {
            // If parsing fails, treat the raw data as the message
            const newActivity: Activity = {
              timestamp: new Date().toLocaleTimeString(),
              message: event.data,
              type: 'sync' // Default type
            };
            
            setActivities(prevActivities => {
              const updatedActivities = [newActivity, ...prevActivities];
              return updatedActivities.slice(0, maxLogs);
            });
          }
        };
        
        // Handle errors
        socketRef.current.onerror = (err) => {
          console.error('WebSocket error:', err);
          setError('Connection error');
          setIsConnected(false);
        };
        
        // Handle connection close
        socketRef.current.onclose = () => {
          console.log('WebSocket disconnected');
          setIsConnected(false);
          
          // Try to reconnect if autoReconnect is enabled
          if (autoReconnect) {
            reconnectTimeoutRef.current = setTimeout(connectWebSocket, reconnectInterval);
          }
        };
      } catch (err) {
        console.error('Failed to connect to WebSocket:', err);
        setError('Failed to connect');
      }
    };

    connectWebSocket();

    // Cleanup on unmount
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [wsUrl, logName, maxLogs, autoReconnect, reconnectInterval]);

  // Determine log type based on content
  const determineLogType = (logContent: string): Activity['type'] => {
    if (!logContent) return 'sync';
    
    const content = logContent.toLowerCase();
    if (content.includes('error') || content.includes('exception')) return 'error';
    if (content.includes('warning') || content.includes('warn')) return 'warning';
    if (content.includes('success') || content.includes('completed')) return 'success';
    return 'sync';
  };

  // Clear all logs
  const clearLogs = () => {
    setActivities([]);
  };

  return (
    <Box className="bg-card rounded-lg border-border">
      <Box className="p-3 border-b border-border flex justify-between items-center">
        <Typography variant="h6">
          {title}
          {isConnected ? (
            <span className="ml-2 text-green-500">● Connected</span>
          ) : (
            <span className="ml-2 text-red-500">● Disconnected</span>
          )}
        </Typography>
        <button onClick={clearLogs} className="text-sm text-blue-500 hover:text-blue-700">
          Clear Logs
        </button>
      </Box>
      
      {error && (
        <Box className="p-3 bg-red-50 border-b border-border">
          <Typography variant="body2" className="text-red-500">
            {error}
          </Typography>
        </Box>
      )}
      
      {activities.length === 0 ? (
        <Box className="p-8 text-center">
          <Typography variant="body2" className="text-muted-foreground">
            {isConnected ? 'Waiting for logs...' : 'Connecting to log stream...'}
          </Typography>
        </Box>
      ) : (
        <Box className="max-h-96 overflow-y-auto">
          {activities.map((activity, index) => (
            <Box key={index} className={`p-3 ${index < activities.length - 1 ? 'border-b border-border' : ''}`}>
              <Box className="flex items-center mb-1">
                {activity.type === 'sync' && <SyncIcon className="mr-2 text-blue-500" fontSize="small" />}
                {activity.type === 'warning' && <WarningIcon className="mr-2 text-yellow-500" fontSize="small" />}
                {activity.type === 'success' && <CheckCircleIcon className="mr-2 text-green-500" fontSize="small" />}
                {activity.type === 'error' && <ErrorIcon className="mr-2 text-red-500" fontSize="small" />}
                <Typography variant="caption" className="text-muted-foreground">
                  {activity.timestamp}
                </Typography>
              </Box>
              <Typography variant="body2" className="text-foreground">
                {activity.message}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default LogViewer;