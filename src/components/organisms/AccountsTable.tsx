/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { Badge } from '@/components/ui/badge';
import { Trash2 } from 'lucide-react';

interface Account {
  phone: string;
  username: string;
  name: string;
  active: boolean;
  status: string;
  last_check: string;
  errors: number;
  daily_group_limit: number;
}

const AccountsTable = ({ onRemoveAccount }: { onRemoveAccount: (num: string) => void }) => {
  const [accounts, setAccounts] = React.useState<Account[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const token = localStorage.getItem('token');

  const fetchAccounts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.vipadtg.com/api/v1/accounts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.status === 'success' && result.data) {
        setAccounts(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch accounts');
      }
    } catch (err) {
      console.log(err);
      // setError(err.message || 'An unknown error occurred.');
      console.error('Failed to fetch accounts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data when the component mounts
  React.useEffect(() => {
    fetchAccounts();
  }, []);

  // Helper function to format the date string
  const formatDate = (isoString: string) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <Card className='border-border bg-card'>
      <CardHeader className='px-6 py-4 border-b border-border flex flex-row items-center justify-between'>
        <CardTitle className='text-foreground'>Accounts</CardTitle>
        <Button variant='outline' onClick={fetchAccounts} disabled={isLoading}>
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </Button>
      </CardHeader>
      <CardContent className='p-0'>
        {isLoading && (
          <div className='flex justify-center items-center p-8'>
            <Typography variant='body' color='secondary'>
              Loading accounts...
            </Typography>
          </div>
        )}
        {error && (
          <div className='flex justify-center items-center p-8'>
            <Typography variant='body' color='accent'>
              Error: {error}
            </Typography>
          </div>
        )}
        {!isLoading && !error && (
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='border-b border-border'>
                <tr className='text-left'>
                  <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                    Phone
                  </th>
                  <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                    Name
                  </th>
                  <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                    Username
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
                {accounts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className='px-6 py-4 text-center text-muted-foreground'>
                      No accounts found.
                    </td>
                  </tr>
                ) : (
                  accounts.map((account) => (
                    <tr key={account.phone} className='hover:bg-accent/50 transition-colors'>
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
                        <div>
                          {/*  */}
                          <Typography variant='small' className='text-muted-foreground'>
                            @{account.username}
                          </Typography>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <Badge
                          variant={account.active ? 'default' : 'secondary'}
                          className={
                            account.active
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                          }
                        >
                          {account.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <Typography variant='small' className='text-muted-foreground'>
                          {formatDate(account.last_check)}
                        </Typography>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <Typography variant='small' className='text-muted-foreground'>
                          {account.errors}
                        </Typography>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <Typography variant='small' className='text-muted-foreground'>
                          {account.daily_group_limit}
                        </Typography>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center space-x-2'>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => onRemoveAccount(account?.phone)}
                            className='h-8 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer'
                          >
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AccountsTable;
