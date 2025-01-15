// src\components\custom\users\actions\edit-user-dialog.tsx
'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  handleChangePasswordForEditUser,
  handleUpdateUser,
  handleUpdateUserProfile,
} from '@/hooks/users-action'
import { EditUserFormData, editUserFormSchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'
import { useEffect, useTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface EditUserDialogProps {
  user: User & {
    profile?: {
      dateOfBirth?: Date | null
      phoneNumber?: string | null
      address?: string | null
      city?: string | null
      state?: string | null
      country?: string | null
      postalCode?: string | null
      bio?: string | null
      occupation?: string | null
      gender?: 'male' | 'female' | 'other' | null
      nationality?: string | null
    } | null
  }
  open: boolean
  onOpenChangeAction: (open: boolean) => void
  onSave?: (user: User) => void
}

export function EditUserDialog({
  user,
  open,
  onOpenChangeAction,
  onSave,
}: EditUserDialogProps) {
  const [isPending, startTransition] = useTransition()
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<EditUserFormData>({
    resolver: zodResolver(editUserFormSchema),
    defaultValues: {
      name: '',
      email: '',
      dateOfBirth: '',
      phoneNumber: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      bio: '',
      occupation: '',
      gender: null,
      nationality: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  // Reset form values when `user` changes or dialog is opened
  useEffect(() => {
    if (open && user) {
      form.reset({
        name: user.name || '',
        email: user.email || '',
        dateOfBirth:
          user.profile?.dateOfBirth?.toISOString().split('T')[0] || '',
        phoneNumber: user.profile?.phoneNumber || '',
        address: user.profile?.address || '',
        city: user.profile?.city || '',
        state: user.profile?.state || '',
        country: user.profile?.country || '',
        postalCode: user.profile?.postalCode || '',
        bio: user.profile?.bio || '',
        occupation: user.profile?.occupation || '',
        gender: user.profile?.gender || null,
        nationality: user.profile?.nationality || '',
        newPassword: '',
        confirmNewPassword: '',
      })
    }
  }, [user, open, form])

  const onSubmit = async (data: EditUserFormData) => {
    startTransition(async () => {
      try {
        // Update user details
        const userData = {
          name: data.name,
          email: data.email,
        }

        const userResult = await handleUpdateUser(user.id, userData)

        if (!userResult.success || !userResult.data) {
          toast.error(userResult.message || 'Failed to update user')
          return
        }

        // Update profile details
        const profileData = {
          dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
          phoneNumber: data.phoneNumber || null,
          address: data.address || null,
          city: data.city || null,
          state: data.state || null,
          country: data.country || null,
          postalCode: data.postalCode || null,
          bio: data.bio || null,
          occupation: data.occupation || null,
          gender: data.gender || null,
          nationality: data.nationality || null,
        }

        const profileResult = await handleUpdateUserProfile(user.id, profileData)

        if (!profileResult.success) {
          toast.error(profileResult.message || 'Failed to update profile')
          return
        }

        // Update password if new password is provided
        if (data.newPassword && data.confirmNewPassword) {
          const passwordResult = await handleChangePasswordForEditUser(user.id, {
            newPassword: data.newPassword,
            confirmNewPassword: data.confirmNewPassword,
          })

          if (!passwordResult.success) {
            toast.error(passwordResult.message || 'Failed to update password')
            return
          }
        }

        onOpenChangeAction(false)
        onSave?.(userResult.data)
        toast.success('User updated successfully')
      } catch (error) {
        console.error('Error updating user:', error)
        toast.error('An unexpected error occurred')
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className='sm:max-w-[800px] max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user details with the form below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            {/* Basic Information */}
            <div className='space-y-4'>
              <h2 className='text-lg font-medium'>Basic Information</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ''}
                          placeholder='Enter full name'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ''}
                          type='email'
                          placeholder='Enter email address'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Personal Details */}
            <div className='space-y-4'>
              <h2 className='text-lg font-medium'>Personal Details</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='dateOfBirth'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input
                          type='date'
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='phoneNumber'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ''}
                          placeholder='Enter phone number'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='gender'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ''}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select gender' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='male'>Male</SelectItem>
                          <SelectItem value='female'>Female</SelectItem>
                          <SelectItem value='other'>Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='occupation'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occupation</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ''}
                          placeholder='Enter occupation'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='bio'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ''}
                          placeholder='Enter bio'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='nationality'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nationality</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ''}
                          placeholder='Enter nationality'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Address Information */}
            <div className='space-y-4'>
              <h2 className='text-lg font-medium'>Address Information</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='address'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ''}
                          placeholder='Enter address'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='city'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ''}
                          placeholder='Enter city'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='state'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ''}
                          placeholder='Enter state'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='country'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ''}
                          placeholder='Enter country'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='postalCode'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ''}
                          placeholder='Enter postal code'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Password Change Section */}
            <div className='space-y-4'>
              <h2 className='text-lg font-medium'>Change Password</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='newPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Input
                            {...field}
                            type={showNewPassword ? 'text' : 'password'}
                            placeholder='Enter new password'
                          />
                          <Button
                            type='button'
                            variant='ghost'
                            size='sm'
                            className='absolute right-0 top-0 h-full px-3'
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? (
                              <Icons.eyeOff className='h-4 w-4' />
                            ) : (
                              <Icons.eye className='h-4 w-4' />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='confirmNewPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Input
                            {...field}
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder='Confirm new password'
                          />
                          <Button
                            type='button'
                            variant='ghost'
                            size='sm'
                            className='absolute right-0 top-0 h-full px-3'
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <Icons.eyeOff className='h-4 w-4' />
                            ) : (
                              <Icons.eye className='h-4 w-4' />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className='flex justify-end space-x-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChangeAction(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={isPending}>
                {isPending ? (
                  <>
                    <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                    Updating...
                  </>
                ) : (
                  <>
                    <Icons.check className='mr-2 h-4 w-4' />
                    Update User
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}