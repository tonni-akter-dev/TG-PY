import * as React from 'react';
import { Box, Typography } from '@mui/material';
import {
  FormControlLabel,
  Checkbox,
  Slider,
} from '@mui/material';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/atoms/Button';
import { TextField } from '@mui/material';

function GeneralSettings() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [totalMessages, setTotalMessages] = React.useState(100);
  const [minChatTime, setMinChatTime] = React.useState(1); // in hours

  const handleTotalMessagesChange = (event: Event, newValue: number | number[]) => {
    setTotalMessages(newValue as number);
  };

  const handleMinChatTimeChange = (event: Event, newValue: number | number[]) => {
    setMinChatTime(newValue as number);
  };

  return (
    <div className='space-y-6'>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
              sx={{
                color: 'hsl(var(--primary))',
                '&.Mui-checked': {
                  color: 'hsl(var(--primary))',
                },
              }}
            />
          }
          label={
            <Typography variant='body2' className='text-foreground'>
              Dark Mode
            </Typography>
          }
        />
      </div>
      <div>
        <Typography variant='body2' className='font-medium mb-2 text-foreground'>
          Total Messages
        </Typography>
        <Box className='space-y-2'>
          <Slider
            value={totalMessages}
            onChange={handleTotalMessagesChange}
            min={0}
            max={1000}
            valueLabelDisplay="auto"
            sx={{ color: 'hsl(var(--primary))' }}
          />
          <Typography variant='body2' className='text-foreground'>
            {totalMessages} messages
          </Typography>
        </Box>
      </div>
      <div>
        <Typography variant='body2' className='font-medium mb-2 text-foreground'>
          Min Chat Time
        </Typography>
        <Box className='space-y-2'>
          <Slider
            value={minChatTime}
            onChange={handleMinChatTimeChange}
            min={0}
            max={24}
            valueLabelDisplay="auto"
            sx={{ color: 'hsl(var(--primary))' }}
          />
          <Typography variant='body2' className='text-foreground'>
            {minChatTime} hours
          </Typography>
        </Box>
      </div>
    </div>
  );
}

function FilterSettings() {
  const [minMembers, setMinMembers] = React.useState(500);
  const [minChatMessages, setMinChatMessages] = React.useState(100);

  const handleMinMembersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinMembers(parseInt(event.target.value) || 0);
  };

  const handleMinChatMessagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinChatMessages(parseInt(event.target.value) || 0);
  };

  return (
    <div className='space-y-4'>
      <div>
        <Typography variant='body2' className='font-medium mb-2 text-foreground'>
          Min Members
        </Typography>
        <TextField
          type="number"
          value={minMembers}
          onChange={handleMinMembersChange}
          fullWidth
          variant="outlined"
          InputProps={{
            sx: {
              backgroundColor: 'hsl(var(--card))',
              color: 'hsl(var(--foreground))',
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'hsl(var(--border))',
              },
              '&:hover fieldset': {
                borderColor: 'hsl(var(--primary))',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'hsl(var(--primary))',
              },
            },
          }}
        />
      </div>
      <div>
        <Typography variant='body2' className='font-medium mb-2 text-foreground'>
          Min Chat Messages Time
        </Typography>
        <TextField
          type="number"
          value={minChatMessages}
          onChange={handleMinChatMessagesChange}
          fullWidth
          variant="outlined"
          InputProps={{
            sx: {
              backgroundColor: 'hsl(var(--card))',
              color: 'hsl(var(--foreground))',
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'hsl(var(--border))',
              },
              '&:hover fieldset': {
                borderColor: 'hsl(var(--primary))',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'hsl(var(--primary))',
              },
            },
          }}
        />
      </div>
      <div>
        <Typography variant='body2' className='font-medium mb-2 text-foreground'>
          Min Total Messages
        </Typography>
        <TextField
          type="number"
          value={minChatMessages}
          onChange={handleMinChatMessagesChange}
          fullWidth
          variant="outlined"
          InputProps={{
            sx: {
              backgroundColor: 'hsl(var(--card))',
              color: 'hsl(var(--foreground))',
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'hsl(var(--border))',
              },
              '&:hover fieldset': {
                borderColor: 'hsl(var(--primary))',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'hsl(var(--primary))',
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export function SettingsPanel() {
  const handleSaveSettings = () => {
    console.log('Save settings');
    // Add save functionality here
  };

  return (
    <Card className='border-border bg-card m-8'>
      <CardHeader className='px-6 py-4 border-b border-border'>
        <CardTitle className='text-foreground'>Settings</CardTitle>
      </CardHeader>
      <CardContent className='p-6 space-y-6'>
        <div>
          <Typography variant='h6' className='font-medium mb-4 text-foreground'>
            General Settings
          </Typography>
          <GeneralSettings />
        </div>
        <div>
          <Typography variant='h6' className='font-medium mb-4 text-foreground'>
            Filter Settings
          </Typography>
          <FilterSettings />
        </div>
        <Button
          onClick={handleSaveSettings}
          className='w-full bg-primary text-primary-foreground hover:bg-primary/90'
        >
          Save Settings
        </Button>
      </CardContent>
    </Card>
  );
}