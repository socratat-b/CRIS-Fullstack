import { cn } from '@/lib/utils'
import { Notification, NotificationStatus } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useNotifications } from '@/contexts/notification-context'
import { Mail, Bell, MessageCircle, Calendar, Star, Archive } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { useState, useEffect } from 'react'

interface NotificationModalProps {
  notification: Notification | null
  isOpen: boolean
  onClose: () => void
}

export function NotificationModal({ notification, isOpen, onClose }: NotificationModalProps) {
  // Get archive and favorite functions from the context
  const { archiveNotification, favoriteNotification } = useNotifications()

  // Local state to track changes while the modal is open
  const [localNotification, setLocalNotification] = useState<Notification | null>(notification)

  // Update local state when notification prop changes
  useEffect(() => {
    setLocalNotification(notification)
  }, [notification])

  // If there's no notification, don't render the modal
  if (!localNotification) return null

  const date = new Date(localNotification.createdAt)
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date)

  // Map notification types to corresponding icons
  const icons = {
    EMAIL: Mail,
    SYSTEM: Bell,
    SMS: MessageCircle,
  }

  // Get the appropriate icon based on the notification type
  const Icon = icons[localNotification.type as keyof typeof icons] || Bell

  // Type casting for notification status
  const status = localNotification.status as unknown as NotificationStatus[]

  // Check notification status
  const isArchived = status.includes(NotificationStatus.archive)
  const isFavorite = status.includes(NotificationStatus.favorite)

  const handleArchive = () => {
    if (!localNotification) return

    // Update local state optimistically for immediate UI feedback
    setLocalNotification(prev => {
      if (!prev) return null

      const currentStatus = prev.status as unknown as NotificationStatus[]
      let updatedStatus: NotificationStatus[]

      if (currentStatus.includes(NotificationStatus.archive)) {
        // Remove archive status
        updatedStatus = currentStatus.filter(s => s !== NotificationStatus.archive)
      } else {
        // Add archive status
        updatedStatus = [...currentStatus, NotificationStatus.archive]
      }

      return {
        ...prev,
        status: updatedStatus as any
      }
    })

    // Call the context function
    archiveNotification(localNotification.id)
  }

  const handleFavorite = () => {
    if (!localNotification) return

    // Update local state optimistically for immediate UI feedback
    setLocalNotification(prev => {
      if (!prev) return null

      const currentStatus = prev.status as unknown as NotificationStatus[]
      let updatedStatus: NotificationStatus[]

      if (currentStatus.includes(NotificationStatus.favorite)) {
        // Remove favorite status
        updatedStatus = currentStatus.filter(s => s !== NotificationStatus.favorite)
      } else {
        // Add favorite status
        updatedStatus = [...currentStatus, NotificationStatus.favorite]
      }

      return {
        ...prev,
        status: updatedStatus as any
      }
    })

    // Call the context function
    favoriteNotification(localNotification.id)
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className='sm:max-w-[550px] p-0 overflow-hidden'>
        <div className='bg-muted/30 px-6 py-4 border-b'>
          <DialogHeader className='mb-2'>
            <div className='flex items-center gap-3'>
              <div className={cn(
                'flex items-center justify-center w-10 h-10 rounded-md',
                'bg-primary/10'
              )}>
                <Icon className='h-5 w-5 text-primary' />
              </div>
              <DialogTitle className='text-xl font-semibold'>
                {localNotification.title || 'Notification Details'}
              </DialogTitle>
            </div>
          </DialogHeader>

          <div className='flex items-center justify-between text-sm text-muted-foreground'>
            <div className='flex items-center gap-2'>
              <Calendar className='h-4 w-4' />
              <span>{formattedDate}</span>
            </div>
            <div className='flex items-center gap-1 text-xs'>
              <span className='px-2 py-0.5 rounded-full bg-muted uppercase font-medium'>
                {localNotification.type}
              </span>
            </div>
          </div>
        </div>

        <div className='px-6 py-4'>
          <ScrollArea className='w-full max-h-[250px] pr-4'>
            <div className='text-sm leading-relaxed whitespace-pre-wrap'>
              {localNotification.message}
            </div>
          </ScrollArea>
        </div>

        <DialogFooter className='px-6 py-4 border-t bg-muted/30 flex-row justify-between'>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              className='flex items-center gap-2'
              onClick={handleArchive}
            >
              <Archive className={cn(
                'h-4 w-4',
                isArchived && 'text-primary'
              )} />
              {isArchived ? 'Unarchive' : 'Archive'}
            </Button>

            <Button
              variant='outline'
              size='sm'
              className='flex items-center gap-2'
              onClick={handleFavorite}
            >
              <Star className={cn(
                'h-4 w-4',
                isFavorite && 'text-yellow-500 fill-yellow-500'
              )} />
              {isFavorite ? 'Unfavorite' : 'Favorite'}
            </Button>
          </div>

          <Button variant='default' size='sm' onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}