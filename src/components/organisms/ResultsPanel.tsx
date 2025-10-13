import React from 'react';
import { Box, Typography} from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import WarningIcon from '@mui/icons-material/Warning';

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

<Box className="bg-[#252139] rounded-lg">
  {/* First Item */}
  <Box className="p-3 border-b border-gray-700">
    <Box className="flex items-center mb-1">
      <Typography variant="caption" className="text-gray-400">
        [2025-10-06 10:12:06]
      </Typography>
    </Box>
    <Typography variant="body2" className="text-white">
      Light theme applied
    </Typography>
  </Box>

  {/* Second Item */}
  <Box className="p-3 border-b border-gray-700">
    <Box className="flex items-center mb-1">
      <SyncIcon className="mr-2 text-blue-500" fontSize="small" />
      <Typography variant="caption" className="text-gray-400">
        [2025-10-06 10:12:06]
      </Typography>
    </Box>
    <Typography variant="body2" className="text-white">
      🔄 Syncing accounts with database...
    </Typography>
  </Box>

  {/* Third Item */}
  <Box className="p-3">
    <Box className="flex items-center mb-1">
      <WarningIcon className="mr-2 text-yellow-500" fontSize="small" />
      <Typography variant="caption" className="text-gray-400">
        [2025-10-06 10:12:06]
      </Typography>
    </Box>
    <Typography variant="body2" className="text-white">
      ⚠️ Sync warning: AccountManager object has no attribute &#39;get_accounts&apos; (continuing...)
    </Typography>
  </Box>
</Box>
    </Box>
  );
};

export default ResultsPanel;