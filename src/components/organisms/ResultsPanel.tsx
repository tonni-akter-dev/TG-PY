import React from 'react';
import { Box, Typography } from '@mui/material';
import LogViewer from './CheckerLogViewer';

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

interface ResultsPanelProps {
  results: ResultsData;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ results }) => {
  const formatDate = (dateString: string | number | Date): string => {
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

      <LogViewer
        wsUrl="wss://api.vipadtg.com/api/v1/logs/stream"
        logName="checker_service.log"
        title="Checker Service Logs"
        maxLogs={200}
        autoReconnect={true}
        reconnectInterval={5000}
      />
    </Box>
  );
};

export default ResultsPanel;