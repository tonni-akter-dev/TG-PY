/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClockIcon, LinkIcon, PlusIcon, XIcon, UsersIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface Account {
  id: string;
  phone: string;
}

interface CreateTaskPayload {
  name: string;
  account_phone: string;
  group_links: string[];
  settings: {
    delay_min: number;
    delay_max: number;
    use_random_delay: boolean;
    maximum_groups_per_day: number;
  };
}

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateJoiningTask: React.FC<CreateTaskModalProps> = ({ isOpen, onClose }) => {
  const [token, setToken] = React.useState<string | null>(null);

  // Get token from localStorage only on the client side
  React.useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  // State for met
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchAccounts = async () => {
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
      console.log(result, 'results');
      setAccounts(result.data);
    } catch (err) {
      console.error('Failed to fetch accounts:', err);
      setError('Failed to fetch accounts');
    }
  };

  const [taskName, setTaskName] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');

  // State for groups to join
  const [groupLinks, setGroupLinks] = useState<string[]>([]);
  const [newGroup, setNewGroup] = useState('');

  // Delay settings
  const [delayMin, setDelayMin] = useState('20');
  const [delayMax, setDelayMax] = useState('45');
  const [useRandomDelay, setUseRandomDelay] = useState(true);

  // Maximum groups per day setting
  const [maximumGroupsPerDay, setMaximumGroupsPerDay] = useState('100');

  // Add a new group
  const handleAddGroup = () => {
    if (newGroup.trim()) {
      setGroupLinks([...groupLinks, newGroup.trim()]);
      setNewGroup('');
    }
  };

  // Remove a group
  const handleRemoveGroup = (index: number) => {
    setGroupLinks(groupLinks.filter((_, i) => i !== index));
  };

  const handleCreateTask = async () => {
    // Validate form
    if (!taskName.trim()) {
      setError('Task name is required');
      return;
    }

    if (!selectedAccount) {
      setError('Please select an account');
      return;
    }

    if (groupLinks.length === 0) {
      setError('Please add at least one group to join');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const payload: CreateTaskPayload = {
        name: taskName,
        account_phone: selectedAccount,
        group_links: groupLinks,
        settings: {
          delay_min: parseInt(delayMin),
          delay_max: parseInt(delayMax),
          use_random_delay: useRandomDelay,
          maximum_groups_per_day: parseInt(maximumGroupsPerDay)
        }
      };

      const response = await fetch('https://api.vipadtg.com/api/v1/joining/task/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Task created successfully:', result);
      setSuccess('Task created successfully!');

      setTimeout(() => {
        setTaskName('');
        setSelectedAccount('');
        setGroupLinks([]);
        setNewGroup('');
        setDelayMin('20');
        setDelayMax('45');
        setUseRandomDelay(true);
        setMaximumGroupsPerDay('100');
        setSuccess(null);
        onClose();
      }, 2000);
    } catch (err: any) {
      console.error('Failed to create task:', err);
      setError(err.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAccounts();
    }
  }, [isOpen]);

  console.log(accounts, 'accounts');
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-500 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <h2 className='text-xl font-semibold text-gray-900'>Create Joining Task</h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-500 focus:outline-none'
          >
            <XIcon className='h-6 w-6' />
          </button>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className='mx-6 mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
            {error}
          </div>
        )}

        {success && (
          <div className='mx-6 mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded'>
            {success}
          </div>
        )}

        {/* Body */}
        <div className='p-6 space-y-6'>
          {/* Task Information */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium text-gray-900'>Task Information</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label htmlFor='taskName' className='block text-sm font-medium text-gray-700 mb-1'>
                  Task Name
                </label>
                <input
                  type='text'
                  id='taskName'
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter task name'
                />
              </div>
              <div>
                <label htmlFor='account' className='block text-sm font-medium text-gray-700 mb-1'>
                  Account
                </label>
                <select
                  id='account'
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value=''>Select an account</option>
                  {accounts?.map((account) => (
                    <option key={account.id} value={account.phone}>
                      {account.phone}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Groups to Join */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium text-gray-900'>Groups to Join</h3>
            <div>
              <label htmlFor='groupLink' className='block text-sm font-medium text-gray-700 mb-1'>
                Group Link
              </label>
              <div className='flex space-x-2 mb-2'>
                <div className='relative flex-1'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <LinkIcon className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    type='text'
                    id='groupLink'
                    value={newGroup}
                    onChange={(e) => setNewGroup(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddGroup()}
                    className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='https://t.me/group_link'
                  />
                </div>
                <button
                  onClick={handleAddGroup}
                  className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center'
                >
                  <PlusIcon className='h-5 w-5' />
                </button>
              </div>

              <div className='flex flex-wrap gap-2'>
                {groupLinks.map((group, index) => (
                  <div
                    key={index}
                    className='inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800'
                  >
                    {group}
                    <button
                      onClick={() => handleRemoveGroup(index)}
                      className='ml-2 text-blue-600 hover:text-blue-800'
                    >
                      <XIcon className='h-4 w-4' />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Joining Settings */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium text-gray-900'>Joining Settings</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label htmlFor='delayMin' className='block text-sm font-medium text-gray-700 mb-1'>
                  Min Delay (seconds)
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <ClockIcon className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    type='number'
                    id='delayMin'
                    value={delayMin}
                    onChange={(e) => setDelayMin(e.target.value)}
                    className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>

              <div>
                <label htmlFor='delayMax' className='block text-sm font-medium text-gray-700 mb-1'>
                  Max Delay (seconds)
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <ClockIcon className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    type='number'
                    id='delayMax'
                    value={delayMax}
                    onChange={(e) => setDelayMax(e.target.value)}
                    className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='maximumGroupsPerDay'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Maximum Groups Per Day
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <UsersIcon className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    type='number'
                    id='maximumGroupsPerDay'
                    value={maximumGroupsPerDay}
                    onChange={(e) => setMaximumGroupsPerDay(e.target.value)}
                    className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>

              <div className='flex items-center pt-6'>
                <input
                  type='checkbox'
                  id='useRandomDelay'
                  checked={useRandomDelay}
                  onChange={(e) => setUseRandomDelay(e.target.checked)}
                  className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                />
                <label htmlFor='useRandomDelay' className='ml-2 block text-sm text-gray-700'>
                  Use Random Delay
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='px-6 py-4 bg-gray-50 flex justify-end space-x-3 rounded-b-lg'>
          <button
            onClick={onClose}
            className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Cancel
          </button>
          <button
            onClick={handleCreateTask}
            disabled={loading}
            className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
          >
            {loading ? 'Creating...' : 'Create Task'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateJoiningTask;
