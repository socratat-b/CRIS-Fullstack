'use client';

import { ConfirmationDialog } from '@/components/custom/confirmation-dialog/confirmation-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { createBirthCertificate } from '@/hooks/form-certificate-actions';
import {
  BirthCertificateFormProps,
  BirthCertificateFormValues,
  birthCertificateSchema,
  defaultBirthCertificateFormValues,
} from '@/lib/types/zod-form-certificate/birth-certificate-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { PDFViewer } from '@react-pdf/renderer';
import { Loader2, Save } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FormType } from '@prisma/client';
import RegistryInformationCard from './form-cards/shared-components/registry-information-card';
import BirthCertificatePDF from './preview/birth-certificate/birth-certificate-pdf';

export default function BirthCertificateForm({
  open,
  onOpenChange,
  onCancel,
}: BirthCertificateFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [pendingSubmission, setPendingSubmission] =
    useState<BirthCertificateFormValues | null>(null);

  const form = useForm<BirthCertificateFormValues>({
    resolver: zodResolver(birthCertificateSchema),
    defaultValues: defaultBirthCertificateFormValues,
  });

  const onSubmit = async (values: BirthCertificateFormValues) => {
    try {
      setIsSubmitting(true);
      const result = await createBirthCertificate(values);

      if (result.success) {
        toast.success('Birth Certificate Registration', {
          description: 'Birth certificate has been registered successfully',
        });
        onOpenChange(false);
        form.reset();
      } else if (result.warning) {
        // Save the form data and show the confirmation dialog.
        setPendingSubmission(values);
        setShowAlert(true);
      } else {
        toast.error('Registration Error', {
          description: result.error || 'Failed to register birth certificate',
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred. Please try again.';
      toast.error('Registration Error', {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmSubmit = async () => {
    if (pendingSubmission) {
      try {
        setIsSubmitting(true);
        const result = await createBirthCertificate(pendingSubmission, true);

        if (result.success) {
          toast.success('Birth Certificate Registration', {
            description: 'Birth certificate has been registered successfully',
          });
          onOpenChange(false);
          form.reset();
        } else {
          toast.error('Registration Error', {
            description: result.error || 'Failed to register birth certificate',
          });
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred. Please try again.';
        toast.error('Registration Error', {
          description: errorMessage,
        });
      } finally {
        setIsSubmitting(false);
        setShowAlert(false);
        setPendingSubmission(null);
      }
    }
  };

  const handleError = () => {
    const errors = form.formState.errors;

    // Trigger validation for registry fields first
    form
      .trigger(['registryNumber', 'province', 'cityMunicipality'])
      .then(() => {
        // Now check for registry section errors
        if (
          form.getFieldState('registryNumber').error ||
          form.getFieldState('province').error ||
          form.getFieldState('cityMunicipality').error
        ) {
          toast.error('Birth Registry Information', {
            description:
              'Please complete registry number, province, and city/municipality fields',
          });
          return;
        }

        // Keep existing error checks
        if (errors.childInfo) {
          toast.error(
            "Please check the child's information section for errors"
          );
          return;
        }
        if (errors.motherInfo) {
          toast.error(
            "Please check the mother's information section for errors"
          );
          return;
        }
        if (errors.fatherInfo) {
          toast.error(
            "Please check the father's information section for errors"
          );
          return;
        }

        toast.error('Please check all required fields and try again');
      });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-[95vw] w-[95vw] h-[95vh] max-h-[95vh] p-0'>
        <div className='h-full flex flex-col'>
          <DialogHeader>
            <DialogTitle className='text-2xl font-bold text-center py-4'>
              Certificate of Live Birth
            </DialogTitle>
          </DialogHeader>

          <div className='flex flex-1 overflow-hidden'>
            {/* Left Side - Form */}
            <div className='w-1/2 border-r'>
              <ScrollArea className='h-[calc(95vh-120px)]'>
                <div className='p-6'>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit, handleError)}
                      className='space-y-6'
                    >
                      <RegistryInformationCard
                        formType={FormType.BIRTH}
                        title='Birth Registry Information'
                      />
                      {/* <ChildInformationCard /> */}
                      {/* <MotherInformationCard />
                      <FatherInformationCard />
                      <MarriageOfParentsCard />
                      <AttendantInformationCard />
                      <CertificationOfInformantCard />
                      <PreparedByCard />
                      <ReceivedByCard />
                      <RegisteredAtOfficeCard />
                      <RemarksCard />
                      <AffidavitFormsCard /> */}

                      <DialogFooter>
                        <Button
                          type='button'
                          variant='outline'
                          className='h-10'
                          onClick={onCancel}
                          disabled={isSubmitting}
                        >
                          Cancel
                        </Button>
                        <Button
                          type='submit'
                          className='h-10 ml-2'
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className='mr-2 h-4 w-4' />
                              Save Registration
                            </>
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>

                  {/* Always render the ConfirmationDialog.
                      Its internal logic (based on the "open" prop)
                      will determine its visibility. */}
                  <ConfirmationDialog
                    open={showAlert}
                    onOpenChange={setShowAlert}
                    onConfirm={confirmSubmit}
                    isSubmitting={isSubmitting}
                    formType='BIRTH'
                    title='Duplicate Record Detected'
                    description='A similar birth record already exists. Do you want to proceed with saving this record?'
                    confirmButtonText='Proceed'
                    cancelButtonText='Cancel'
                  />
                </div>
              </ScrollArea>
            </div>

            {/* Right Side - Preview */}
            <div className='w-1/2'>
              <div className='h-[calc(95vh-120px)] p-6'>
                <PDFViewer width='100%' height='100%'>
                  <BirthCertificatePDF data={form.watch()} />
                </PDFViewer>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
