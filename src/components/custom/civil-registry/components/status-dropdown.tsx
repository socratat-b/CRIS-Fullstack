'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DocumentStatus } from '@prisma/client'
import { updateFormStatus } from '@/hooks/update-status-action'
import clsx from 'clsx'

export const statusVariants: Record<
    DocumentStatus,
    { label: string; variant: 'default' | 'secondary' | 'destructive'; bgColor: string }
> = {
    PENDING: { label: 'Pending', variant: 'secondary', bgColor: 'bg-yellow-500/30 dark:bg-yellow-500/50 dark:text-accent-foreground text-yellow-800' },
    VERIFIED: { label: 'Verified', variant: 'default', bgColor: 'bg-blue-500/30 dark:bg-blue-500/50 dark:text-accent-foreground text-blue-800' },
    LATE_REGISTRATION: { label: 'Late Registration', variant: 'destructive', bgColor: 'bg-red-500/30 dark:bg-red-500/50 dark:text-accent-foreground text-red-800' },
    READY_FOR_RELEASE: { label: 'Ready for Release', variant: 'default', bgColor: 'bg-green-500/30 dark:bg-green-500/50 dark:text-accent-foreground text-green-800' },
    RELEASED: { label: 'Released', variant: 'default', bgColor: 'bg-muted/50 text-accent-foreground' },
}

interface StatusSelectProps {
    formId: string
    currentStatus: DocumentStatus
    onStatusChange?: (newStatus: DocumentStatus) => void
}

export default function StatusSelect({
    formId,
    currentStatus,
    onStatusChange,
}: StatusSelectProps) {
    const [loading, setLoading] = useState(false)
    // Add local state to track current status
    const [status, setStatus] = useState<DocumentStatus>(currentStatus)

    const updateStatus = async (newStatus: DocumentStatus) => {
        if (newStatus === status) return;

        setLoading(true)
        try {
            // Update local state immediately for a responsive UI
            setStatus(newStatus);

            // Then update on the server
            await updateFormStatus(formId, newStatus)
            toast.success('Status updated successfully')

            // Notify parent component about the status change
            onStatusChange?.(newStatus)
        } catch (error: unknown) {
            console.error(error)
            toast.error('Failed to update status')

            // Revert to previous status on error
            setStatus(currentStatus)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Select
            value={status}
            onValueChange={(newStatus) => updateStatus(newStatus as DocumentStatus)}
        >
            <SelectTrigger
                disabled={loading}
                className={clsx(
                    'w-[180px] rounded-md border shadow-sm px-4 py-2 ',
                    statusVariants[status].bgColor
                )}
            >
                <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
                {Object.entries(statusVariants).map(([statusKey, statusInfo]) => (
                    <SelectItem
                        key={statusKey}
                        value={statusKey}
                        className={clsx('py-2 px-4 rounded-md ')}
                    >
                        {statusInfo.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}