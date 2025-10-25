/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Divider, Tabs, Tab, IconButton, CircularProgress } from '@mui/material';
import { X, MessageCircle, Settings, Edit, Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface MessageGroup {
    message_link: string;
    target_groups: string[];
}

// Updated interface to match the one in TaskTable
interface TaskSettingsData {
    accountId: string;
    internalMin: number;
    internalMax: number;
    afterEachForward: number;
    randomSleepMin: number;
    randomSleepMax: number;
    replyMessage: string;
    tasks: Array<{ id: string; name: string }>;
    selectedTaskId: string;
    progress: { current: number; total: number };
    success: number;
}

interface TaskSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    taskSettings?: TaskSettingsData | null;
    editMode?: boolean;
}


const AccountSettingModal: React.FC<TaskSettingsModalProps> = ({ isOpen, onClose, taskSettings }) => {
    const [token, setToken] = React.useState<string | null>(null);

    // Get token from localStorage only on the client side
    React.useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);


    // State for met
    const [loading, setLoading] = useState(false);
    const [accountSettingsLoading, setAccountSettingsLoading] = useState(false);
    const [taskDetailsLoading, setTaskDetailsLoading] = useState(false);
    const [tabValue, setTabValue] = useState(0);

    const [accountSettings, setAccountSettings] = useState({
        interval_min: 0,
        interval_max: 0,
        after_each_second: 0,
        random_sleep_time_min: 0,
        random_sleep_time_max: 0,
        reply_message: ''
    });

    const [taskData, setTaskData] = useState({
        name: '',
        message_groups: [] as MessageGroup[]
    });
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);

    useEffect(() => {
        if (isOpen && taskSettings) {
            fetchAccountSettings();
            fetchTaskDetails();
        }
    }, [isOpen, taskSettings]);

    const fetchAccountSettings = async () => {
        if (!taskSettings) return;

        setAccountSettingsLoading(true);
        try {
            const response = await fetch(`http://185.255.131.231:8000/api/v1/forwarder/account/settings/${taskSettings.accountId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (data.status === 'success' && data.data) {
                // Use the actual data from the API response
                setAccountSettings({
                    interval_min: data.data.interval_min || 0,
                    interval_max: data.data.interval_max || 0,
                    after_each_second: data.data.after_each_second || 0,
                    random_sleep_time_min: data.data.random_sleep_time_min || 0,
                    random_sleep_time_max: data.data.random_sleep_time_max || 0,
                    reply_message: data.data.reply_message || ''
                });
            }
        } catch (err) {
            toast.error('Failed to fetch account settings');
        } finally {
            setAccountSettingsLoading(false);
        }
    };

    const fetchTaskDetails = async () => {
        if (!taskSettings) return;

        setTaskDetailsLoading(true);
        try {
            const response = await fetch(`http://185.255.131.231:8000/api/v1/forwarder/task/${taskSettings.selectedTaskId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Task details response:', data);

            if (data.status === 'success' && data.data) {
                setTaskData({
                    name: data.data.name || '',
                    message_groups: data.data.message_groups || []
                });
            }
        } catch (err) {
            console.error('Error fetching task details:', err);
            toast.error('Failed to fetch task details');
        } finally {
            setTaskDetailsLoading(false);
        }
    };

    const handleAccountSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAccountSettings(prev => ({
            ...prev,
            [name]: name.includes('interval') || name.includes('second') || name.includes('sleep')
                ? parseInt(value) || 0
                : value
        }));
    };

    const handleSaveAccountSettings = async () => {
        if (!taskSettings) return;

        setLoading(true);
        try {
            const response = await fetch(`http://185.255.131.231:8000/api/v1/forwarder/account/settings/${taskSettings.accountId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(accountSettings)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Account settings saved:', data);

            toast.success('Account settings saved successfully!');
        } catch (err) {
            console.error('Error saving account settings:', err);
            toast.error(err instanceof Error ? err.message : 'Failed to save account settings');
        } finally {
            setLoading(false);
        }
    };

    const handleTaskDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTaskData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleMessageGroupChange = (index: number, field: 'message_link' | 'target_groups', value: string | string[]) => {
        setTaskData(prev => {
            const updatedMessageGroups = [...prev.message_groups];
            updatedMessageGroups[index] = {
                ...updatedMessageGroups[index],
                [field]: value
            };
            return {
                ...prev,
                message_groups: updatedMessageGroups
            };
        });
    };

    const handleAddMessageGroup = () => {
        setTaskData(prev => ({
            ...prev,
            message_groups: [
                ...prev.message_groups,
                {
                    message_link: '',
                    target_groups: []
                }
            ]
        }));
    };

    const handleRemoveMessageGroup = (index: number) => {
        setTaskData(prev => ({
            ...prev,
            message_groups: prev.message_groups.filter((_, i) => i !== index)
        }));
    };

    const handleAddTargetGroup = (messageGroupIndex: number, targetGroup: string) => {
        if (!targetGroup.trim()) return;

        setTaskData(prev => {
            const updatedMessageGroups = [...prev.message_groups];
            const currentTargetGroups = [...updatedMessageGroups[messageGroupIndex].target_groups];

            if (!currentTargetGroups.includes(targetGroup.trim())) {
                currentTargetGroups.push(targetGroup.trim());
            }

            updatedMessageGroups[messageGroupIndex] = {
                ...updatedMessageGroups[messageGroupIndex],
                target_groups: currentTargetGroups
            };

            return {
                ...prev,
                message_groups: updatedMessageGroups
            };
        });
    };

    const handleRemoveTargetGroup = (messageGroupIndex: number, targetGroupIndex: number) => {
        setTaskData(prev => {
            const updatedMessageGroups = [...prev.message_groups];
            const currentTargetGroups = [...updatedMessageGroups[messageGroupIndex].target_groups];

            currentTargetGroups.splice(targetGroupIndex, 1);

            updatedMessageGroups[messageGroupIndex] = {
                ...updatedMessageGroups[messageGroupIndex],
                target_groups: currentTargetGroups
            };

            return {
                ...prev,
                message_groups: updatedMessageGroups
            };
        });
    };

    const handleSaveTaskDetails = async () => {
        if (!taskSettings) return;

        setLoading(true);
        try {
            const response = await fetch(`http://185.255.131.231:8000/api/v1/forwarder/task/${taskSettings.selectedTaskId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(taskData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Task details saved:', data);

            toast.success('Task details saved successfully!');
            setIsEditTaskModalOpen(false);
        } catch (err) {
            console.error('Error saving task details:', err);
            toast.error(err instanceof Error ? err.message : 'Failed to save task details');
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    if (!isOpen || !taskSettings) return null;

    return (
        <>
            <Modal
                open={isOpen}
                onClose={onClose}
                aria-labelledby="task-settings-modal"
                aria-describedby="modal-for-task-settings"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 700,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 2,
                    p: 0,
                    maxHeight: '90vh',
                    overflow: 'auto'
                }}>
                    {/* Header */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2,
                        borderBottom: '1px solid',
                        borderColor: 'divider'
                    }}>
                        <Typography variant="h6" component="h2">
                            Task Settings - {taskSettings.selectedTaskId}
                        </Typography>
                        <IconButton onClick={onClose} sx={{ minWidth: 'auto', p: 1 }}>
                            <X size={20} />
                        </IconButton>
                    </Box>

                    {/* Tabs */}
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabValue} onChange={handleTabChange}>
                            <Tab label="Account Settings" />
                            <Tab label="Task Details" />
                        </Tabs>
                    </Box>

                    {/* Tab Content */}
                    <Box sx={{ p: 3 }}>
                        {tabValue === 0 && (
                            /* Account Settings Tab */
                            <Box>
                                <Typography variant="subtitle1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                    <Settings size={18} style={{ marginRight: '8px' }} />
                                    Account Settings
                                </Typography>

                                {accountSettingsLoading ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
                                        <CircularProgress />
                                        <Typography variant="body2" sx={{ ml: 2 }}>Loading account settings...</Typography>
                                    </Box>
                                ) : (
                                    <>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                            <Box sx={{ flex: '1 1 45%' }}>
                                                <TextField
                                                    fullWidth
                                                    label="Interval Min (seconds)"
                                                    name="interval_min"
                                                    type="number"
                                                    value={accountSettings.interval_min}
                                                    onChange={handleAccountSettingsChange}
                                                    margin="normal"
                                                    variant="outlined"
                                                    size="small"
                                                />
                                            </Box>
                                            <Box sx={{ flex: '1 1 45%' }}>
                                                <TextField
                                                    fullWidth
                                                    label="Interval Max (seconds)"
                                                    name="interval_max"
                                                    type="number"
                                                    value={accountSettings.interval_max}
                                                    onChange={handleAccountSettingsChange}
                                                    margin="normal"
                                                    variant="outlined"
                                                    size="small"
                                                />
                                            </Box>
                                            <Box sx={{ flex: '1 1 45%' }}>
                                                <TextField
                                                    fullWidth
                                                    label="After Each Second"
                                                    name="after_each_second"
                                                    type="number"
                                                    value={accountSettings.after_each_second}
                                                    onChange={handleAccountSettingsChange}
                                                    margin="normal"
                                                    variant="outlined"
                                                    size="small"
                                                />
                                            </Box>
                                            <Box sx={{ flex: '1 1 45%' }}>
                                                <TextField
                                                    fullWidth
                                                    label="Random Sleep Min (seconds)"
                                                    name="random_sleep_time_min"
                                                    type="number"
                                                    value={accountSettings.random_sleep_time_min}
                                                    onChange={handleAccountSettingsChange}
                                                    margin="normal"
                                                    variant="outlined"
                                                    size="small"
                                                />
                                            </Box>
                                            <Box sx={{ flex: '1 1 45%' }}>
                                                <TextField
                                                    fullWidth
                                                    label="Random Sleep Max (seconds)"
                                                    name="random_sleep_time_max"
                                                    type="number"
                                                    value={accountSettings.random_sleep_time_max}
                                                    onChange={handleAccountSettingsChange}
                                                    margin="normal"
                                                    variant="outlined"
                                                    size="small"
                                                />
                                            </Box>
                                        </Box>

                                        <Box sx={{ mt: 2 }}>
                                            <TextField
                                                fullWidth
                                                multiline
                                                rows={3}
                                                label="Reply Message"
                                                name="reply_message"
                                                value={accountSettings.reply_message}
                                                onChange={handleAccountSettingsChange}
                                                margin="normal"
                                                variant="outlined"
                                            />
                                        </Box>

                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                            <Button
                                                variant="contained"
                                                onClick={handleSaveAccountSettings}
                                                disabled={loading}
                                                sx={{ bgcolor: 'primary.main' }}
                                            >
                                                {loading ? 'Saving...' : 'Save Settings'}
                                            </Button>
                                        </Box>
                                    </>
                                )}
                            </Box>
                        )}

                        {tabValue === 1 && (
                            /* Task Details Tab */
                            <Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <MessageCircle size={18} style={{ marginRight: '8px' }} />
                                        Task Details
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        startIcon={<Edit size={16} />}
                                        onClick={() => setIsEditTaskModalOpen(true)}
                                    >
                                        Edit Task
                                    </Button>
                                </Box>

                                {taskDetailsLoading ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
                                        <CircularProgress />
                                        <Typography variant="body2" sx={{ ml: 2 }}>Loading task details...</Typography>
                                    </Box>
                                ) : (
                                    <>
                                        <Box sx={{ mb: 2 }}>
                                            <Typography variant="body2" color="text.secondary">Task Name:</Typography>
                                            <Typography variant="body1">{taskData.name}</Typography>
                                        </Box>

                                        <Divider sx={{ my: 2 }} />

                                        <Typography variant="subtitle2" sx={{ mb: 2 }}>Message Groups:</Typography>
                                        {taskData.message_groups.map((group, index) => (
                                            <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                                                <Typography variant="body2" color="text.secondary">Message Link:</Typography>
                                                <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>{group.message_link}</Typography>

                                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Target Groups:</Typography>
                                                {group.target_groups.map((target, targetIndex) => (
                                                    <Typography key={targetIndex} variant="body1" sx={{ wordBreak: 'break-all' }}>
                                                        {target}
                                                    </Typography>
                                                ))}
                                            </Box>
                                        ))}
                                    </>
                                )}
                            </Box>
                        )}
                    </Box>
                </Box>
            </Modal>

            {/* Edit Task Modal */}
            <Modal
                open={isEditTaskModalOpen}
                onClose={() => setIsEditTaskModalOpen(false)}
                aria-labelledby="edit-task-modal"
                aria-describedby="modal-for-editing-task"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 700,
                    maxHeight: '90vh',
                    overflow: 'auto',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 2,
                    p: 0
                }}>
                    {/* Header */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2,
                        borderBottom: '1px solid',
                        borderColor: 'divider'
                    }}>
                        <Typography variant="h6" component="h2">
                            Edit Task - {taskSettings?.selectedTaskId}
                        </Typography>
                        <IconButton onClick={() => setIsEditTaskModalOpen(false)} sx={{ minWidth: 'auto', p: 1 }}>
                            <X size={20} />
                        </IconButton>
                    </Box>

                    {/* Content */}
                    <Box sx={{ p: 3 }}>
                        <TextField
                            fullWidth
                            label="Task Name"
                            name="name"
                            value={taskData.name}
                            onChange={handleTaskDataChange}
                            margin="normal"
                            variant="outlined"
                        />

                        <Typography variant="subtitle1" sx={{ mt: 3, mb: 2 }}>Message Groups</Typography>

                        {taskData.message_groups.map((group, index) => (
                            <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Typography variant="subtitle2">Message Group #{index + 1}</Typography>
                                    {taskData.message_groups.length > 1 && (
                                        <IconButton onClick={() => handleRemoveMessageGroup(index)} size="small">
                                            <Trash2 size={16} />
                                        </IconButton>
                                    )}
                                </Box>

                                <TextField
                                    fullWidth
                                    label="Message Link"
                                    value={group.message_link}
                                    onChange={(e) => handleMessageGroupChange(index, 'message_link', e.target.value)}
                                    margin="normal"
                                    variant="outlined"
                                    size="small"
                                />

                                <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>Target Groups:</Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                    {group.target_groups.map((target, targetIndex) => (
                                        <Box key={targetIndex} sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            bgcolor: 'primary.light',
                                            color: 'primary.contrastText',
                                            px: 1,
                                            py: 0.5,
                                            borderRadius: 1,
                                            fontSize: '0.875rem'
                                        }}>
                                            {target}
                                            <IconButton
                                                onClick={() => handleRemoveTargetGroup(index, targetIndex)}
                                                size="small"
                                                sx={{ ml: 0.5, p: 0.25 }}
                                            >
                                                <X size={12} />
                                            </IconButton>
                                        </Box>
                                    ))}
                                </Box>

                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Add target group"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                const target = e.target as HTMLInputElement;
                                                handleAddTargetGroup(index, target.value);
                                                target.value = '';
                                            }
                                        }}
                                    />
                                    <Button
                                        variant="outlined"
                                        onClick={(e) => {
                                            const input = e.currentTarget.parentElement?.querySelector('input');
                                            if (input) {
                                                handleAddTargetGroup(index, input.value);
                                                input.value = '';
                                            }
                                        }}
                                    >
                                        Add
                                    </Button>
                                </Box>
                            </Box>
                        ))}

                        <Button
                            variant="outlined"
                            startIcon={<Plus size={16} />}
                            onClick={handleAddMessageGroup}
                            sx={{ mb: 3 }}
                        >
                            Add Message Group
                        </Button>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                            <Button
                                variant="outlined"
                                onClick={() => setIsEditTaskModalOpen(false)}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleSaveTaskDetails}
                                disabled={loading}
                                sx={{ bgcolor: 'primary.main' }}
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default AccountSettingModal;