
// ResultsPanel component
import { Box, Typography } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const ResultsPanel = ({ results, activities }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Box className="w-full">
      <Typography variant="h6" className="mb-4 font-bold text-foreground">
        Results
      </Typography>
      
      <Box className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Box className="bg-card p-3 rounded-lg border-border">
          <Typography variant="body2" className="text-muted-foreground mb-1">Groups Checked</Typography>
          <Typography variant="h6" className="text-foreground font-semibold">
            {results.groupsChecked.current}/{results.groupsChecked.total}
          </Typography>
        </Box>
        <Box className="bg-card p-3 rounded-lg border-border">
          <Typography variant="body2" className="text-muted-foreground mb-1">Groups Valid Filter ON</Typography>
          <Typography variant="h6" className="text-foreground font-semibold">{results.validWithFilter}</Typography>
        </Box>
        <Box className="bg-card p-3 rounded-lg border-border">
          <Typography variant="body2" className="text-muted-foreground mb-1">Groups Valid Only</Typography>
          <Typography variant="h6" className="text-foreground font-semibold">{results.validOnly}</Typography>
        </Box>
        <Box className="bg-card p-3 rounded-lg border-border">
          <Typography variant="body2" className="text-muted-foreground mb-1">Topics Groups Only Valid</Typography>
          <Typography variant="h6" className="text-foreground font-semibold">{results.topicsValid}</Typography>
        </Box>
        <Box className="bg-card p-3 rounded-lg border-border">
          <Typography variant="body2" className="text-muted-foreground mb-1">Channels Only Valid</Typography>
          <Typography variant="h6" className="text-foreground font-semibold">{results.channelsValid}</Typography>
        </Box>
        <Box className="bg-card p-3 rounded-lg border-border">
          <Typography variant="body2" className="text-muted-foreground mb-1">Invalid Groups/Channels</Typography>
          <Typography variant="h6" className="text-foreground font-semibold">{results.invalid}</Typography>
        </Box>
        <Box className="bg-card p-3 rounded-lg border-border">
          <Typography variant="body2" className="text-muted-foreground mb-1">Account Issues</Typography>
          <Typography variant="h6" className="text-foreground font-semibold">{results.accountIssues}</Typography>
        </Box>
        <Box className="bg-card p-3 rounded-lg border-border">
          <Typography variant="body2" className="text-muted-foreground mb-1">Join Requests</Typography>
          <Typography variant="h6" className="text-foreground font-semibold">{results.joinRequests}</Typography>
        </Box>
      </Box>
      
      {/* Entity Types Section */}
      <Typography variant="h6" className="mb-4 font-bold text-foreground">
        Entity Types
      </Typography>
      
      <Box className="grid grid-cols-3 gap-4 mb-6">
        <Box className="bg-card p-3 rounded-lg border-border">
          <Typography variant="body2" className="text-muted-foreground mb-1">Groups</Typography>
          <Typography variant="h6" className="text-foreground font-semibold">{results.entityTypes.group}</Typography>
        </Box>
        <Box className="bg-card p-3 rounded-lg border-border">
          <Typography variant="body2" className="text-muted-foreground mb-1">Channels</Typography>
          <Typography variant="h6" className="text-foreground font-semibold">{results.entityTypes.channel}</Typography>
        </Box>
        <Box className="bg-card p-3 rounded-lg border-border">
          <Typography variant="body2" className="text-muted-foreground mb-1">Topics</Typography>
          <Typography variant="h6" className="text-foreground font-semibold">{results.entityTypes.topic}</Typography>
        </Box>
      </Box>
      
      {/* Time Information */}
      <Typography variant="h6" className="mb-4 font-bold text-foreground">
        Time Information
      </Typography>
      
      <Box className="grid grid-cols-2 gap-4 mb-6">
        <Box className="bg-card p-3 rounded-lg border-border">
          <Typography variant="body2" className="text-muted-foreground mb-1">Started At</Typography>
          <Typography variant="h6" className="text-foreground font-semibold">{formatDate(results.startedAt)}</Typography>
        </Box>
        <Box className="bg-card p-3 rounded-lg border-border">
          <Typography variant="body2" className="text-muted-foreground mb-1">Finished At</Typography>
          <Typography variant="h6" className="text-foreground font-semibold">{formatDate(results.finishedAt)}</Typography>
        </Box>
      </Box>
      
      <Typography variant="h6" className="mb-8 font-bold text-foreground">
        Recent Activities
      </Typography>

      <Box className="bg-card rounded-lg border-border">
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
    </Box>
  );
};

export default ResultsPanel;