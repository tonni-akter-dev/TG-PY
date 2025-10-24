import React from 'react'

const TaskTableHeader = () => {
    return (
        <thead className='border-b border-border'>
            <tr className='text-left'>
                <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                    ID
                </th>
                <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                    Task Name
                </th>
                <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                    Status
                </th>
                <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                    Progress
                </th>
                <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                    Success
                </th>
                <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                    Failed
                </th>
                <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                    Created
                </th>
                <th className='px-6 py-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                    Actions
                </th>
            </tr>
        </thead>
    )
}

export default TaskTableHeader