/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccountsTable from './AccountsTable';

export function AccountManagement() {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [apiId, setApiId] = React.useState('');
  const [apiHash, setApiHash] = React.useState('');
  const [logs, setLogs] = React.useState<string[]>([]);
  const [isConnecting, setIsConnecting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const token = localStorage.getItem('token');
  const [showVerification, setShowVerification] = React.useState(false);
  const [stateId, setStateId] = React.useState('');
  const [verificationCode, setVerificationCode] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isVerifying, setIsVerifying] = React.useState(false);

  // New states for API operations
  const [isDeactivatingAll, setIsDeactivatingAll] = React.useState(false);
  const [isActivatingAll, setIsActivatingAll] = React.useState(false);
  const [isRemovingAccount, setIsRemovingAccount] = React.useState(false);
  const [notification, setNotification] = React.useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'info',
  });
  const [refreshTable, setRefreshTable] = React.useState(0);

  const handleConnect = async () => {
    if (!phoneNumber || !apiId || !apiHash) {
      setError('Please fill in all fields.');
      return;
    }

    setIsConnecting(true);
    setError(null);
    setLogs(['Attempting to connect...']);

    try {
      const response = await fetch(`http://185.255.131.231:8000/api/v1/accounts/connect/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          phone: phoneNumber,
          api_id: apiId,
          api_hash: apiHash,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.status === 'success' && result.data && result.data.state_id) {
        setStateId(result.data.state_id);
        setShowVerification(true);
        setLogs(['Connection process started successfully. Verification code sent.']);
      } else {
        setLogs(['Connection process started successfully.']);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage); setError(errorMessage);
      setLogs((prevLogs) => [...prevLogs, `Error: ${errorMessage}`]);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleVerify = async () => {
    if (!verificationCode) {
      setError('Please enter the verification code.');
      return;
    }

    setIsVerifying(true);
    setError(null);
    setLogs(['Verifying...']);

    try {
      const response = await fetch(`http://185.255.131.231:8000/api/v1/accounts/connect/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          state_id: stateId,
          code: verificationCode,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setLogs([...logs, 'Verification successful! Account added.']);
      setNotification({
        open: true,
        message: 'Account added successfully!',
        severity: 'success',
      });

      setTimeout(() => {
        handleCancel();
        setRefreshTable(prev => prev + 1); // Trigger table refresh
      }, 2000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage); setError(errorMessage);
      setLogs((prevLogs) => [...prevLogs, `Error: ${errorMessage}`]);
      setNotification({
        open: true,
        message: `Verification failed: ${errorMessage}`,
        severity: 'error',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCancel = () => {
    setPhoneNumber('');
    setApiId('');
    setApiHash('');
    setLogs([]);
    setError(null);
    setShowVerification(false);
    setStateId('');
    setVerificationCode('');
    setPassword('');
    setIsAddModalOpen(false);
  };

  // New function to remove an account
  const handleRemoveAccount = async (phone: string) => {
    setIsRemovingAccount(true);
    try {
      const response = await fetch(`http://185.255.131.231:8000/api/v1/accounts/${phone}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setNotification({
        open: true,
        message: 'Account removed successfully!',
        severity: 'success',
      });
      setRefreshTable(prev => prev + 1); // Trigger table refresh
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage); setNotification({
        open: true,
        message: `Failed to remove account: ${errorMessage}`,
        severity: 'error',
      });
    } finally {
      setIsRemovingAccount(false);
    }
  };

  // New function to deactivate all accounts
  const handleDeactivateAll = async () => {
    setIsDeactivatingAll(true);
    try {
      const response = await fetch(`http://185.255.131.231:8000/api/v1/accounts/deactivate-all`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setNotification({
        open: true,
        message: `Successfully deactivated ${result.data.updated} accounts!`,
        severity: 'success',
      });
      setRefreshTable(prev => prev + 1); // Trigger table refresh
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage); setNotification({
        open: true,
        message: `Failed to deactivate accounts: ${errorMessage}`,
        severity: 'error',
      });
    } finally {
      setIsDeactivatingAll(false);
    }
  };

  // New function to activate all accounts
  const handleActivateAll = async () => {
    setIsActivatingAll(true);
    try {
      const response = await fetch(`http://185.255.131.231:8000/api/v1/accounts/activate-all`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setNotification({
        open: true,
        message: `Successfully activated ${result.data.updated} accounts!`,
        severity: 'success',
      });
      setRefreshTable(prev => prev + 1); // Trigger table refresh
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage); setNotification({
        open: true,
        message: `Failed to activate accounts: ${errorMessage}`,
        severity: 'error',
      });
    } finally {
      setIsActivatingAll(false);
    }
  };

  // Close notification
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <div className='space-y-6 lg:space-y-8 bg-gray-100 dark:bg-gray-900'>
      <AccountsTable key={refreshTable} onRemoveAccount={handleRemoveAccount} />
      <Box className="flex flex-wrap gap-2">
        <Button variant="outline" className="text-green-600 border-green-600" onClick={() => setIsAddModalOpen(true)}>
          Add Account
        </Button>
        <Button variant="outline" className="text-blue-600 border-blue-600">
          Fix Selected
        </Button>
        <Button variant="outline" className="text-gray-600 border-gray-600">
          Refresh Account Info
        </Button>
        <Button
          variant="outline"
          className="text-green-600 border-green-600"
          onClick={handleActivateAll}
          disabled={isActivatingAll}
        >
          {isActivatingAll ? 'Activating...' : 'Activate All'}
        </Button>
        <Button
          variant="outline"
          className="text-red-600 border-red-600"
          onClick={handleDeactivateAll}
          disabled={isDeactivatingAll}
        >
          {isDeactivatingAll ? 'Deactivating...' : 'Deactivate All'}
        </Button>
      </Box>

      {/* Add Account Modal */}
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
          {!showVerification ? (
            <>
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
                disabled={isConnecting}
              />
              <TextField
                fullWidth
                label="API ID"
                type="number"
                value={apiId}
                onChange={(e) => setApiId(e.target.value)}
                variant="outlined"
                disabled={isConnecting}
              />
              <TextField
                fullWidth
                label="API Hash"
                value={apiHash}
                onChange={(e) => setApiHash(e.target.value)}
                variant="outlined"
                disabled={isConnecting}
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
            </>
          ) : (
            <>
              <Typography variant="body" color="secondary">
                Enter the verification code sent to your Telegram account
              </Typography>
              <TextField
                fullWidth
                label="Verification Code"
                placeholder="Enter the code you received"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                variant="outlined"
                disabled={isVerifying}
              />
              <TextField
                fullWidth
                label="Password (Optional)"
                type="password"
                placeholder="Enter your password if you have two-factor authentication enabled"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                disabled={isVerifying}
              />
              {logs.length > 0 && (
                <TextField
                  fullWidth
                  label="Verification Logs"
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
            </>
          )}
        </DialogContent>

        <DialogActions className="justify-end gap-2 p-3">
          <Button onClick={handleCancel} disabled={isConnecting || isVerifying}>
            Cancel
          </Button>
          {!showVerification ? (
            <Button
              onClick={handleConnect}
              disabled={isConnecting || !phoneNumber || !apiId || !apiHash}
            >
              {isConnecting ? 'Connecting...' : 'Connect'}
            </Button>
          ) : (
            <Button
              onClick={handleVerify}
              disabled={isVerifying || !verificationCode}
            >
              {isVerifying ? 'Verifying...' : 'Verify'}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
}