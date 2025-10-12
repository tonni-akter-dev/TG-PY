import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Chip } from '@mui/material';
import { Sync, Warning } from '@mui/icons-material';

const ResultsPanel = () => {
  return (
    <Box className="w-full text-white p-6">
      <Typography variant="h6" className="mb-4 font-bold text-white">
        Results
      </Typography>
      
      <Box className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Box className="bg-[#252139] p-3 rounded-lg">
          <Typography variant="body2" className="text-gray-400 mb-1">Groups Checked</Typography>
          <Typography variant="h6" className="text-white font-semibold">0/0</Typography>
        </Box>
        <Box className="bg-[#252139] p-3 rounded-lg">
          <Typography variant="body2" className="text-gray-400 mb-1">Groups Valid Filter ON</Typography>
          <Typography variant="h6" className="text-white font-semibold">0</Typography>
        </Box>
        <Box className="bg-[#252139] p-3 rounded-lg">
          <Typography variant="body2" className="text-gray-400 mb-1">Groups Valid Only</Typography>
          <Typography variant="h6" className="text-white font-semibold">0</Typography>
        </Box>
        <Box className="bg-[#252139] p-3 rounded-lg">
          <Typography variant="body2" className="text-gray-400 mb-1">Topics Groups Only Valid</Typography>
          <Typography variant="h6" className="text-white font-semibold">0</Typography>
        </Box>
        <Box className="bg-[#252139] p-3 rounded-lg">
          <Typography variant="body2" className="text-gray-400 mb-1">Channels Only Valid</Typography>
          <Typography variant="h6" className="text-white font-semibold">0</Typography>
        </Box>
        <Box className="bg-[#252139] p-3 rounded-lg">
          <Typography variant="body2" className="text-gray-400 mb-1">Invalid Groups/Channels</Typography>
          <Typography variant="h6" className="text-white font-semibold">0</Typography>
        </Box>
        <Box className="bg-[#252139] p-3 rounded-lg">
          <Typography variant="body2" className="text-gray-400 mb-1">Account Issues</Typography>
          <Typography variant="h6" className="text-white font-semibold">0</Typography>
        </Box>
      </Box>
      
      <Typography variant="h6" className="mb-8 font-bold text-white">
        Recent Activities
      </Typography>
      
     <List className="bg-[#252139] rounded-lg">
  <ListItem className="border-b border-gray-700">
    <ListItemText
      className="text-white"
      primary={
        <Box className="flex items-center">
          {/* <Chip label="Light theme applied" size="small" className="mr-2 bg-blue-600 !text-white" /> */}
          <Typography variant="caption" className="text-gray-400">[2025-10-06 10:12:06]</Typography>
        </Box>
      }
      secondary="Light theme applied"
      secondaryTypographyProps={{ className: "text-white" }}
    />
  </ListItem>
  <ListItem className="border-b border-gray-700">
    <ListItemText
      primary={
        <Box className="flex items-center">
          <Sync className="mr-2 text-blue-500" />
          <Typography variant="caption" className="text-gray-400">[2025-10-06 10:12:06]</Typography>
        </Box>
      }
      secondary="🔄 Syncing accounts with database..."
      secondaryTypographyProps={{ className: "text-white" }}
    />
  </ListItem>
  <ListItem>
    <ListItemText
      primary={
        <Box className="flex items-center">
          <Warning className="mr-2 text-yellow-500" />
          <Typography variant="caption" className="text-gray-400">[2025-10-06 10:12:06]</Typography>
        </Box>
      }
      secondary="⚠️ Sync warning: AccountManager object has no attribute 'get_accounts' (continuing...)"
      secondaryTypographyProps={{ className: "text-white" }}
    />
  </ListItem>
</List>
    </Box>
  );
};

export default ResultsPanel;