/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/exhaustive-deps */
// // components/CreateTaskModal.js
// import { ChartCandlestickIcon, ClockIcon, LinkIcon, PlusIcon, XIcon } from 'lucide-react';
// import React, { useState } from 'react';

// const CreateTaskModal = ({ isOpen, onClose }) => {
//     const token = localStorage.getItem('token')
//     const [accounts, setAccounts] = useState();

//     const fetchAccounts = async () => {
//         try {
//             const response = await fetch(`http://185.255.131.231:8000/api/v1/accounts`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const result = await response.json();
//             setAccounts(result.data.items);

//         } catch (err) {
//             console.log(err);
//             console.error("Failed to fetch accounts:", err);
//         }
//     };
//     console.log(accounts,"accounts")
//     const [taskName, setTaskName] = useState('');
//     const [selectedAccount, setSelectedAccount] = useState('18166948258');

//     // State for multiple message blocks
//     const [messageBlocks, setMessageBlocks] = useState([
//         {
//             id: 1,
//             messageLink: 'https://t.me/channel/message_id',
//             targetGroups: ['@group1', '@group2', 'https://t.me/group3'],
//             newTargetGroup: ''
//         }
//     ]);

//     const [intervalMin, setIntervalMin] = useState('22');
//     const [intervalMax, setIntervalMax] = useState('15');
//     const [afterEachSecond, setAfterEachSecond] = useState('360');
//     const [randomSleep, setRandomSleep] = useState(true);
//     const [replyMessage, setReplyMessage] = useState('Hi! This is an advertising bot. dm main acc @vipstore');

//     // Add a new message block
//     const addMessageBlock = () => {
//         const newId = messageBlocks.length > 0 ? Math.max(...messageBlocks.map(block => block.id)) + 1 : 1;
//         setMessageBlocks([
//             ...messageBlocks,
//             {
//                 id: newId,
//                 messageLink: 'https://t.me/channel/message_id',
//                 targetGroups: [],
//                 newTargetGroup: ''
//             }
//         ]);
//     };

//     // Remove a message block
//     const removeMessageBlock = (id) => {
//         if (messageBlocks.length > 1) {
//             setMessageBlocks(messageBlocks.filter(block => block.id !== id));
//         }
//     };

//     // Update message link for a specific block
//     const updateMessageLink = (id, value) => {
//         setMessageBlocks(messageBlocks.map(block =>
//             block.id === id ? { ...block, messageLink: value } : block
//         ));
//     };

//     // Update new target group for a specific block
//     const updateNewTargetGroup = (id, value) => {
//         setMessageBlocks(messageBlocks.map(block =>
//             block.id === id ? { ...block, newTargetGroup: value } : block
//         ));
//     };

//     // Add target group to a specific block
//     const handleAddTargetGroup = (id) => {
//         setMessageBlocks(messageBlocks.map(block => {
//             if (block.id === id && block.newTargetGroup.trim()) {
//                 return {
//                     ...block,
//                     targetGroups: [...block.targetGroups, block.newTargetGroup.trim()],
//                     newTargetGroup: ''
//                 };
//             }
//             return block;
//         }));
//     };

//     // Remove target group from a specific block
//     const handleRemoveTargetGroup = (blockId, groupIndex) => {
//         setMessageBlocks(messageBlocks.map(block =>
//             block.id === blockId
//                 ? { ...block, targetGroups: block.targetGroups.filter((_, i) => i !== groupIndex) }
//                 : block
//         ));
//     };

//     const handleCreateTask = () => {
//         // 这里处理创建任务的逻辑
//         console.log('Creating task with data:', {
//             taskName,
//             selectedAccount,
//             messageBlocks,
//             intervalMin,
//             intervalMax,
//             afterEachSecond,
//             randomSleep,
//             replyMessage
//         });
//         onClose();
//     };
//     React.useEffect(() => {
//         fetchAccounts();
//     }, []);

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
//             <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//                 {/* Header */}
//                 <div className="flex items-center justify-between p-6 border-b border-gray-200">
//                     <h2 className="text-xl font-semibold text-gray-900">Create Forwarding Task</h2>
//                     <button
//                         onClick={onClose}
//                         className="text-gray-400 hover:text-gray-500 focus:outline-none"
//                     >
//                         <XIcon className="h-6 w-6" />
//                     </button>
//                 </div>

//                 {/* Body */}
//                 <div className="p-6 space-y-6">
//                     {/* Task Information */}
//                     <div className="space-y-4">
//                         <h3 className="text-lg font-medium text-gray-900">Task Information</h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label htmlFor="taskName" className="block text-sm font-medium text-gray-700 mb-1">
//                                     Task Name
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="taskName"
//                                     value={taskName}
//                                     onChange={(e) => setTaskName(e.target.value)}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     placeholder="Enter task name"
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="account" className="block text-sm font-medium text-gray-700 mb-1">
//                                     Account
//                                 </label>
//                                 <select
//                                     id="account"
//                                     value={selectedAccount}
//                                     onChange={(e) => setSelectedAccount(e.target.value)}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 >
//                                     <option value="18166948258">18166948258</option>
//                                     <option value="other-account">Other Account</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Message → Target Groups */}
//                     <div className="space-y-4">
//                         <div className="flex items-center justify-between">
//                             <h3 className="text-lg font-medium text-gray-900">Message → Target Groups</h3>
//                             <button
//                                 onClick={addMessageBlock}
//                                 className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
//                             >
//                                 <PlusIcon className="h-4 w-4 mr-1" />
//                                 Add Message Block
//                             </button>
//                         </div>

//                         {messageBlocks.map((block, index) => (
//                             <div key={block.id} className="bg-gray-50 p-4 rounded-md">
//                                 <div className="flex items-center justify-between mb-3">
//                                     <span className="font-medium text-gray-700">Message Block #{index + 1}</span>
//                                     {messageBlocks.length > 1 && (
//                                         <button
//                                             onClick={() => removeMessageBlock(block.id)}
//                                             className="text-red-600 hover:text-red-800 focus:outline-none"
//                                         >
//                                             <XIcon className="h-5 w-5" />
//                                         </button>
//                                     )}
//                                 </div>

//                                 <div className="space-y-3">
//                                     <div>
//                                         <label htmlFor={`messageLink-${block.id}`} className="block text-sm font-medium text-gray-700 mb-1">
//                                             Message Link
//                                         </label>
//                                         <div className="relative">
//                                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                                 <LinkIcon className="h-5 w-5 text-gray-400" />
//                                             </div>
//                                             <input
//                                                 type="text"
//                                                 id={`messageLink-${block.id}`}
//                                                 value={block.messageLink}
//                                                 onChange={(e) => updateMessageLink(block.id, e.target.value)}
//                                                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                                 placeholder="https://t.me/channel/message_id"
//                                             />
//                                         </div>
//                                     </div>

//                                     <div>
//                                         <label htmlFor={`targetGroups-${block.id}`} className="block text-sm font-medium text-gray-700 mb-1">
//                                             Target Groups
//                                         </label>
//                                         <div className="flex space-x-2 mb-2">
//                                             <input
//                                                 type="text"
//                                                 id={`targetGroups-${block.id}`}
//                                                 value={block.newTargetGroup}
//                                                 onChange={(e) => updateNewTargetGroup(block.id, e.target.value)}
//                                                 onKeyPress={(e) => e.key === 'Enter' && handleAddTargetGroup(block.id)}
//                                                 className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                                 placeholder="Enter target group"
//                                             />
//                                             <button
//                                                 onClick={() => handleAddTargetGroup(block.id)}
//                                                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
//                                             >
//                                                 <PlusIcon className="h-5 w-5" />
//                                             </button>
//                                         </div>

//                                         <div className="flex flex-wrap gap-2">
//                                             {block.targetGroups.map((group, groupIndex) => (
//                                                 <div
//                                                     key={groupIndex}
//                                                     className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
//                                                 >
//                                                     {group}
//                                                     <button
//                                                         onClick={() => handleRemoveTargetGroup(block.id, groupIndex)}
//                                                         className="ml-2 text-blue-600 hover:text-blue-800"
//                                                     >
//                                                         <XIcon className="h-4 w-4" />
//                                                     </button>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Account Settings */}
//                     <div className="space-y-4">
//                         <h3 className="text-lg font-medium text-gray-900">Account Settings</h3>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label htmlFor="intervalMin" className="block text-sm font-medium text-gray-700 mb-1">
//                                     Interval Min (seconds)
//                                 </label>
//                                 <div className="relative">
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                         <ClockIcon className="h-5 w-5 text-gray-400" />
//                                     </div>
//                                     <input
//                                         type="number"
//                                         id="intervalMin"
//                                         value={intervalMin}
//                                         onChange={(e) => setIntervalMin(e.target.value)}
//                                         className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     />
//                                 </div>
//                             </div>

//                             <div>
//                                 <label htmlFor="intervalMax" className="block text-sm font-medium text-gray-700 mb-1">
//                                     Interval Max (seconds)
//                                 </label>
//                                 <div className="relative">
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                         <ClockIcon className="h-5 w-5 text-gray-400" />
//                                     </div>
//                                     <input
//                                         type="number"
//                                         id="intervalMax"
//                                         value={intervalMax}
//                                         onChange={(e) => setIntervalMax(e.target.value)}
//                                         className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     />
//                                 </div>
//                             </div>

//                             <div>
//                                 <label htmlFor="afterEachSecond" className="block text-sm font-medium text-gray-700 mb-1">
//                                     After Each Second
//                                 </label>
//                                 <div className="relative">
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                         <ClockIcon className="h-5 w-5 text-gray-400" />
//                                     </div>
//                                     <input
//                                         type="number"
//                                         id="afterEachSecond"
//                                         value={afterEachSecond}
//                                         onChange={(e) => setAfterEachSecond(e.target.value)}
//                                         className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="flex items-center pt-6">
//                                 <input
//                                     type="checkbox"
//                                     id="randomSleep"
//                                     checked={randomSleep}
//                                     onChange={(e) => setRandomSleep(e.target.checked)}
//                                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                                 />
//                                 <label htmlFor="randomSleep" className="ml-2 block text-sm text-gray-700">
//                                     Random Sleep
//                                 </label>
//                             </div>
//                         </div>

//                         <div>
//                             <label htmlFor="replyMessage" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Reply Message
//                             </label>
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 pt-2 pointer-events-none">
//                                     <ChartCandlestickIcon className="h-5 w-5 text-gray-400" />
//                                 </div>
//                                 <textarea
//                                     id="replyMessage"
//                                     value={replyMessage}
//                                     onChange={(e) => setReplyMessage(e.target.value)}
//                                     rows={3}
//                                     className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     placeholder="Enter reply message"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
//                     <button
//                         onClick={onClose}
//                         className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         onClick={handleCreateTask}
//                         className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         Create Task
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CreateTaskModal;
// components/CreateTaskModal.tsx
import { ChartCandlestickIcon, ClockIcon, LinkIcon, PlusIcon, XIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';

// Define TypeScript interfaces
interface Account {
    id: string;
    phone: string;
    // Add other account properties as needed
}

interface MessageGroup {
    message_link: string;
    target_groups: string[];
}

interface CreateTaskPayload {
    name: string;
    account_phone: string;
    message_groups: MessageGroup[];
}

interface CreateTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isOpen, onClose }) => {
    const token = localStorage.getItem('token');
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const fetchAccounts = async () => {
        try {
            const response = await fetch(`http://185.255.131.231:8000/api/v1/accounts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log(result, "results")
            setAccounts(result.data);
        } catch (err) {
            console.error("Failed to fetch accounts:", err);
            setError("Failed to fetch accounts");
        }
    };


    const [taskName, setTaskName] = useState('');
    const [selectedAccount, setSelectedAccount] = useState('');

    // State for multiple message blocks
    const [messageBlocks, setMessageBlocks] = useState([
        {
            id: 1,
            messageLink: 'https://t.me/channel/message_id',
            targetGroups: ['@group1', '@group2', 'https://t.me/group3'],
            newTargetGroup: ''
        }
    ]);

    const [intervalMin, setIntervalMin] = useState('22');
    const [intervalMax, setIntervalMax] = useState('15');
    const [afterEachSecond, setAfterEachSecond] = useState('360');
    const [randomSleep, setRandomSleep] = useState(true);
    const [replyMessage, setReplyMessage] = useState('Hi! This is an advertising bot. dm main acc @vipstore');

    // Add a new message block
    const addMessageBlock = () => {
        const newId = messageBlocks.length > 0 ? Math.max(...messageBlocks.map(block => block.id)) + 1 : 1;
        setMessageBlocks([
            ...messageBlocks,
            {
                id: newId,
                messageLink: 'https://t.me/channel/message_id',
                targetGroups: [],
                newTargetGroup: ''
            }
        ]);
    };

    // Remove a message block
    const removeMessageBlock = (id: number) => {
        if (messageBlocks.length > 1) {
            setMessageBlocks(messageBlocks.filter(block => block.id !== id));
        }
    };

    // Update message link for a specific block
    const updateMessageLink = (id: number, value: string) => {
        setMessageBlocks(messageBlocks.map(block =>
            block.id === id ? { ...block, messageLink: value } : block
        ));
    };

    // Update new target group for a specific block
    const updateNewTargetGroup = (id: number, value: string) => {
        setMessageBlocks(messageBlocks.map(block =>
            block.id === id ? { ...block, newTargetGroup: value } : block
        ));
    };

    // Add target group to a specific block
    const handleAddTargetGroup = (id: number) => {
        setMessageBlocks(messageBlocks.map(block => {
            if (block.id === id && block.newTargetGroup.trim()) {
                return {
                    ...block,
                    targetGroups: [...block.targetGroups, block.newTargetGroup.trim()],
                    newTargetGroup: ''
                };
            }
            return block;
        }));
    };

    // Remove target group from a specific block
    const handleRemoveTargetGroup = (blockId: number, groupIndex: number) => {
        setMessageBlocks(messageBlocks.map(block =>
            block.id === blockId
                ? { ...block, targetGroups: block.targetGroups.filter((_, i) => i !== groupIndex) }
                : block
        ));
    };

    const handleCreateTask = async () => {
        // Validate form
        if (!taskName.trim()) {
            setError("Task name is required");
            return;
        }

        if (!selectedAccount) {
            setError("Please select an account");
            return;
        }

        // Check if all message blocks have valid data
        const invalidBlock = messageBlocks.find(block =>
            !block.messageLink.trim() || block.targetGroups.length === 0
        );

        if (invalidBlock) {
            setError("All message blocks must have a message link and at least one target group");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            // Prepare the payload according to the API requirements
            const payload: CreateTaskPayload = {
                name: taskName,
                account_phone: selectedAccount,
                message_groups: messageBlocks.map(block => ({
                    message_link: block.messageLink,
                    target_groups: block.targetGroups
                }))
            };

            console.log('Creating task with payload:', payload);

            const response = await fetch('http://185.255.131.231:8000/api/v1/forwarder/task/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Task created successfully:', result);
            setSuccess("Task created successfully!");

            // Reset form after successful creation
            setTimeout(() => {
                setTaskName('');
                setSelectedAccount('');
                setMessageBlocks([{
                    id: 1,
                    messageLink: 'https://t.me/channel/message_id',
                    targetGroups: [],
                    newTargetGroup: ''
                }]);
                setSuccess(null);
                onClose();
            }, 2000);

        } catch (err: any) {
            console.error("Failed to create task:", err);
            setError(err.message || "Failed to create task");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchAccounts();
        }
    }, [isOpen]);

    console.log(accounts, "accounts")
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Create Forwarding Task</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Error/Success Messages */}
                {error && (
                    <div className="mx-6 mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mx-6 mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                        {success}
                    </div>
                )}

                {/* Body */}
                <div className="p-6 space-y-6">
                    {/* Task Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Task Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="taskName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Task Name
                                </label>
                                <input
                                    type="text"
                                    id="taskName"
                                    value={taskName}
                                    onChange={(e) => setTaskName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter task name"
                                />
                            </div>
                            <div>
                                <label htmlFor="account" className="block text-sm font-medium text-gray-700 mb-1">
                                    Account
                                </label>
                                <select
                                    id="account"
                                    value={selectedAccount}
                                    onChange={(e) => setSelectedAccount(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select an account</option>
                                    {accounts?.map((account) => (
                                        <option key={account.id} value={account.phone}>
                                            {account.phone}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Message → Target Groups */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900">Message → Target Groups</h3>
                            <button
                                onClick={addMessageBlock}
                                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                            >
                                <PlusIcon className="h-4 w-4 mr-1" />
                                Add Message Block
                            </button>
                        </div>

                        {messageBlocks.map((block, index) => (
                            <div key={block.id} className="bg-gray-50 p-4 rounded-md">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="font-medium text-gray-700">Message Block #{index + 1}</span>
                                    {messageBlocks.length > 1 && (
                                        <button
                                            onClick={() => removeMessageBlock(block.id)}
                                            className="text-red-600 hover:text-red-800 focus:outline-none"
                                        >
                                            <XIcon className="h-5 w-5" />
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <label htmlFor={`messageLink-${block.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                                            Message Link
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <LinkIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                id={`messageLink-${block.id}`}
                                                value={block.messageLink}
                                                onChange={(e) => updateMessageLink(block.id, e.target.value)}
                                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="https://t.me/channel/message_id"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor={`targetGroups-${block.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                                            Target Groups
                                        </label>
                                        <div className="flex space-x-2 mb-2">
                                            <input
                                                type="text"
                                                id={`targetGroups-${block.id}`}
                                                value={block.newTargetGroup}
                                                onChange={(e) => updateNewTargetGroup(block.id, e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && handleAddTargetGroup(block.id)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Enter target group"
                                            />
                                            <button
                                                onClick={() => handleAddTargetGroup(block.id)}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                                            >
                                                <PlusIcon className="h-5 w-5" />
                                            </button>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {block.targetGroups.map((group, groupIndex) => (
                                                <div
                                                    key={groupIndex}
                                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                                                >
                                                    {group}
                                                    <button
                                                        onClick={() => handleRemoveTargetGroup(block.id, groupIndex)}
                                                        className="ml-2 text-blue-600 hover:text-blue-800"
                                                    >
                                                        <XIcon className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Account Settings */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Account Settings</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="intervalMin" className="block text-sm font-medium text-gray-700 mb-1">
                                    Interval Min (seconds)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <ClockIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        id="intervalMin"
                                        value={intervalMin}
                                        onChange={(e) => setIntervalMin(e.target.value)}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="intervalMax" className="block text-sm font-medium text-gray-700 mb-1">
                                    Interval Max (seconds)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <ClockIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        id="intervalMax"
                                        value={intervalMax}
                                        onChange={(e) => setIntervalMax(e.target.value)}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="afterEachSecond" className="block text-sm font-medium text-gray-700 mb-1">
                                    After Each Second
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <ClockIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        id="afterEachSecond"
                                        value={afterEachSecond}
                                        onChange={(e) => setAfterEachSecond(e.target.value)}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center pt-6">
                                <input
                                    type="checkbox"
                                    id="randomSleep"
                                    checked={randomSleep}
                                    onChange={(e) => setRandomSleep(e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="randomSleep" className="ml-2 block text-sm text-gray-700">
                                    Random Sleep
                                </label>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="replyMessage" className="block text-sm font-medium text-gray-700 mb-1">
                                Reply Message
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 pt-2 pointer-events-none">
                                    <ChartCandlestickIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <textarea
                                    id="replyMessage"
                                    value={replyMessage}
                                    onChange={(e) => setReplyMessage(e.target.value)}
                                    rows={3}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter reply message"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreateTask}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Task'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateTaskModal;