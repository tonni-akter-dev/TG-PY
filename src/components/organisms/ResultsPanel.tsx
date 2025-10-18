import React from 'react';
import { Box, Typography} from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import WarningIcon from '@mui/icons-material/Warning';

const ResultsPanel = () => {
  return (
    <Box className="w-full">
      <Typography variant="h6" className="mb-4 font-bold text-foreground">
        Results
      </Typography>
      
      <Box className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Box className="bg-card p-3 rounded-lg border-border">
          <Typography variant="body2" className="text-muted-foreground mb-1">Groups Checked</Typography>
          <Typography variant="h6" className="text-foreground font-semibold">0/0</Typography>
        </Box>
        <Box className="bg-card p-3 rounded-lg border-border">
          <Typography variant="body2" className="text-muted-foreground mb-1">Groups Valid Filter ON</Typography>
          <Typography variant="h6" className="text-foreground font-semibold">0</Typography>
        </Box>
        <Box className="bg-card p-3 rounded-lg border-border">
          <Typography variant="body2" className="text-muted-foreground mb-1">Groups Valid Only</Typography>
          <Typography variant="h6" className="text-foreground font-semibold">0</Typography>
        </Box>
        <Box className="bg-card p-3 rounded-lg border-border">
          <Typography variant="body2" className="text-muted-foreground mb-1">Topics Groups Only Valid</Typography>
          <Typography variant="h6" className="text-foreground font-semibold">0</Typography>
        </Box>
        <Box className="bg-card p-3 rounded-lg border-border">
          <Typography variant="body2" className="text-muted-foreground mb-1">Channels Only Valid</Typography>
          <Typography variant="h6" className="text-foreground font-semibold">0</Typography>
        </Box>
        <Box className="bg-card p-3 rounded-lg border-border">
          <Typography variant="body2" className="text-muted-foreground mb-1">Invalid Groups/Channels</Typography>
          <Typography variant="h6" className="text-foreground font-semibold">0</Typography>
        </Box>
        <Box className="bg-card p-3 rounded-lg border-border">
          <Typography variant="body2" className="text-muted-foreground mb-1">Account Issues</Typography>
          <Typography variant="h6" className="text-foreground font-semibold">0</Typography>
        </Box>
      </Box>
      
      <Typography variant="h6" className="mb-8 font-bold text-foreground">
        Recent Activities
      </Typography>

<Box className="bg-card rounded-lg border-border">
  {/* First Item */}
  <Box className="p-3 border-b border-border">
    <Box className="flex items-center mb-1">
      <Typography variant="caption" className="text-muted-foreground">
        [2025-10-06 10:12:06]
      </Typography>
    </Box>
    <Typography variant="body2" className="text-foreground">
      Light theme applied
    </Typography>
  </Box>

  {/* Second Item */}
  <Box className="p-3 border-b border-border">
    <Box className="flex items-center mb-1">
      <SyncIcon className="mr-2 text-blue-500" fontSize="small" />
      <Typography variant="caption" className="text-muted-foreground">
        [2025-10-06 10:12:06]
      </Typography>
    </Box>
    <Typography variant="body2" className="text-foreground">
      🔄 Syncing accounts with database...
    </Typography>
  </Box>

  {/* Third Item */}
  <Box className="p-3">
    <Box className="flex items-center mb-1">
      <WarningIcon className="mr-2 text-yellow-500" fontSize="small" />
      <Typography variant="caption" className="text-muted-foreground">
        [2025-10-06 10:12:06]
      </Typography>
    </Box>
    <Typography variant="body2" className="text-foreground">
      ⚠️ Sync warning: AccountManager object has no attribute &#39;get_accounts&#39; (continuing...)
    </Typography>
  </Box>
</Box>
    </Box>
  );
};

export default ResultsPanel;