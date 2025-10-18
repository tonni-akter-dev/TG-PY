'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const mockAccounts = [
  { id: 1, phone: '+8801720000000', name: 'Asraful Islam', status: 'Active', lastCheck: '2024-10-13 10:12:06', errors: 0, groupLimit: 200 },
  { id: 2, phone: '+8801816948258', name: 'John Doe', status: 'Inactive', lastCheck: '2024-10-12 15:30:45', errors: 2, groupLimit: 150 },
  { id: 3, name: 'Jane Smith', phone: '+8801912345678', status: 'Active', lastCheck: '2024-10-13 09:45:22', errors: 0, groupLimit: 300 },
  { id: 4, phone: '+8801623456789', name: 'Bob Johnson', status: 'Suspended', lastCheck: '2024-10-11 14:20:10', errors: 5, groupLimit: 100 },
  { id: 5, phone: '+8801834567890', name: 'Alice Brown', status: 'Active', lastCheck: '2024-10-13 11:05:33', errors: 1, groupLimit: 250 },
];

const mockLogs = [
  '[2025-09-29 10:37:38] INFO: Starting account fix process for ',
  '[2025-09-29 10:37:38] INFO: Fixing account 447931761904 (API ID: ',
  '[2025-09-29 10:37:38] INFO: 1 errors: 0) account 447931761904 (API ID: ',
  '[2025-09-29 10:37:38] INFO: Creating TelegramClient for account ',
  '447931761904',
  '[2025-09-29 10:37:41] INFO: Updating account info for 447931761904: ',
  '[2025-09-29 10:37:41] INFO: Account 447931761904 fixed successfully'
];

export function AccountManagement() {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [apiId, setApiId] = React.useState('');
  const [apiHash, setApiHash] = React.useState('');
  const [logs, setLogs] = React.useState<string[]>(mockLogs);
  const [isConnecting, setIsConnecting] = React.useState(false);

  const handleView = (accountId: number) => {
    console.log('View account:', accountId);
    // Add view account functionality here
  };

  const handleEdit = (accountId: number) => {
    console.log('Edit account:', accountId);
    // Add edit account functionality here
  };

  const handleDelete = (accountId: number) => {
    console.log('Delete account:', accountId);
    // Add delete account functionality here
    if (window.confirm('Are you sure you want to delete this account?')) {
      // Implement delete functionality
    }
  };

  const handleConnect = async () => {
    if (!phoneNumber || !apiId || !apiHash) {
      alert('Please fill in all fields');
      return;
    }
    setIsConnecting(true);
    setLogs([]);
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLogs(mockLogs);
    setIsConnecting(false);
    console.log('Connecting account:', { phoneNumber, apiId, apiHash });
    // Add actual connection logic here
    setIsAddModalOpen(false);
  };

  const handleCancel = () => {
    setPhoneNumber('');
    setApiId('');
    setApiHash('');
    setLogs([]);
    setIsAddModalOpen(false);
  };

  return (
    <div className='space-y-6 lg:space-y-8 bg-gray-100 dark:bg-gray-900'>
      {/* Header */}
     
      {/* Accounts Table */}
      <Card className='border-border bg-card'>
        <CardHeader className='px-6 py-4 border-b border-border'>
          <CardTitle className='text-foreground'>Accounts</CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='border-b border-border'>
                <tr className='text-left'>
                  <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                    Phone
                  </th>
                  <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                    Name/Username
                  </th>
                  <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                    Status
                  </th>
                  <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                    Last Check
                  </th>
                  <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                    Errors
                  </th>
                  <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                    Group Limit
                  </th>
                  <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-border'>
                {mockAccounts.map((account) => (
                  <tr key={account.id} className='hover:bg-accent/50 transition-colors'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <Typography variant='small' className='text-muted-foreground'>
                        {account.phone}
                      </Typography>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <Typography variant='small' className='font-medium text-foreground'>
                        {account.name}
                      </Typography>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <Badge
                        variant={account.status === 'Active' ? 'default' : 'secondary'}
                        className={
                          account.status === 'Active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }
                      >
                        {account.status}
                      </Badge>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <Typography variant='small' className='text-muted-foreground'>
                        {account.lastCheck}
                      </Typography>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <Typography variant='small' className='text-muted-foreground'>
                        {account.errors}
                      </Typography>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <Typography variant='small' className='text-muted-foreground'>
                        {account.groupLimit}
                      </Typography>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center space-x-2'>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => handleView(account.id)}
                          className='h-8 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                        >
                          <Eye className='h-4 w-4 mr-1' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => handleEdit(account.id)}
                          className='h-8 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                        >
                          <Edit2 className='h-4 w-4 mr-1' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => handleDelete(account.id)}
                          className='h-8 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                        >
                          <Trash2 className='h-4 w-4 mr-1' />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      <Box className="flex flex-wrap gap-2">
        <Button variant="outline" className="text-green-600 border-green-600" onClick={() => setIsAddModalOpen(true)}>
          Add Account
        </Button>
        <Button variant="outline" className="text-red-600 border-red-600">
          Remove Account
        </Button>
        <Button variant="outline" className="text-blue-600 border-blue-600">
          Fix Selected
        </Button>
        <Button variant="outline" className="text-gray-600 border-gray-600">
          Refresh Account Info
        </Button>
        <Button variant="outline" className="text-green-600 border-green-600">
          Activate All
        </Button>
        <Button variant="outline" className="text-red-600 border-red-600">
          Deactivate All
        </Button>
      </Box>

      <Dialog open={isAddModalOpen} onClose={handleCancel} maxWidth="sm" fullWidth>
        <DialogTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
              <span className="text-xs font-bold">A</span>
            </div>
            Add Account
          </div>
          <div className="flex items-center gap-1">
            <IconButton size="small">
              <HelpOutlineIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={handleCancel}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent className="flex flex-col gap-4 pt-0">
          <Typography variant="body" color="secondary">
            Enter your Telegram account details
          </Typography>
          <TextField
            fullWidth
            label="Phone Number"
            placeholder="e.g. +123456789"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="API ID"
            type="number"
            value={apiId}
            onChange={(e) => setApiId(e.target.value)}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="API Hash"
            value={apiHash}
            onChange={(e) => setApiHash(e.target.value)}
            variant="outlined"
          />
          {logs.length > 0 && (
            <TextField
              fullWidth
              label="Authentication Logs"
              multiline
              rows={6}
              value={logs.join('\n')}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}
            />
          )}
        </DialogContent>
        <DialogActions className="justify-end gap-2 p-3">
          <Button  onClick={handleCancel} disabled={isConnecting}>
            Cancel
          </Button>
          <Button onClick={handleConnect} disabled={isConnecting || !phoneNumber || !apiId || !apiHash}>
            {isConnecting ? 'Connecting...' : 'Connect'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}