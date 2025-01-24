'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { checkRegistryNumberExists } from '@/hooks/form-certificate-actions';
import { REGIONS } from '@/lib/constants/locations';
import { MarriageCertificateFormValues } from '@/lib/types/zod-form-certificate/formSchemaCertificate';
import { FormType } from '@prisma/client';
import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

const RegistryInfoCard: React.FC = () => {
  const { control, setValue, setError, clearErrors } =
    useFormContext<MarriageCertificateFormValues>();
  const [selectedProvince, setSelectedProvince] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [lastCheckedValue, setLastCheckedValue] = useState('');

  // Get all provinces function
  const getAllProvinces = () => {
    return REGIONS.flatMap((region) =>
      region.provinces.map((province) => ({
        id: `${region.id}-${province.id}`,
        name: province.name,
        regionId: region.id,
        originalProvinceId: province.id,
      }))
    ).sort((a, b) => a.name.localeCompare(b.name));
  };

  const allProvinces = getAllProvinces();

  const getCitiesMunicipalities = (selectedProvinceId: string) => {
    if (!selectedProvinceId) return [];
    const [regionId, provinceId] = selectedProvinceId.split('-province-');
    const region = REGIONS.find((region) => region.id === regionId);
    const province = region?.provinces.find(
      (province) => province.id === `province-${provinceId}`
    );
    return (
      province?.citiesMunicipalities
        .slice()
        .sort((a, b) => a.localeCompare(b)) || []
    );
  };

  const citiesMunicipalities = getCitiesMunicipalities(selectedProvince);

  // Format manual input to match YYYY-##### pattern
  const formatRegistryNumber = useCallback((value: string) => {
    const cleaned = value.replace(/[^\d-]/g, '');
    const parts = cleaned.split('-');
    const year = parts[0]?.slice(0, 4) || '';
    const sequence = parts[1]?.slice(0, 5) || '';

    if (year.length === 4 && !cleaned.includes('-') && year === parts[0]) {
      return `${year}-${sequence}`;
    }

    if (year && sequence) {
      return `${year}-${sequence}`;
    }

    return cleaned;
  }, []);

  // Validation logic
  const validateRegistryNumber = useCallback((value: string): string => {
    if (!value) return '';

    if (!value.match(/^\d{4}-\d{5}$/)) {
      if (value.length < 10) return '';
      return 'Registry number must be in format: YYYY-#####';
    }

    const year = parseInt(value.split('-')[0]);
    const currentYear = new Date().getFullYear();
    if (year < 1945 || year > currentYear) {
      return 'Registration year must be between 1945 and current year';
    }

    const sequence = parseInt(value.split('-')[1]);
    if (sequence <= 0 || sequence > 99999) {
      return 'Sequence number must be between 1 and 99999';
    }

    return '';
  }, []);

  // Registry number check with debounce
  const checkRegistryNumberDebounced = useMemo(
    () =>
      debounce(async (value: string) => {
        if (!value.match(/^\d{4}-\d{5}$/)) return;
        if (value === lastCheckedValue) return;

        setIsChecking(true);
        try {
          await checkRegistryNumberExists(value, FormType.MARRIAGE);
          clearErrors('registryNumber');
          setLastCheckedValue(value);
        } catch (error) {
          if (error instanceof Error) {
            setError('registryNumber', {
              type: 'manual',
              message: error.message,
            });
            toast.error(error.message);
          }
        } finally {
          setIsChecking(false);
        }
      }, 500),
    [lastCheckedValue, setError, clearErrors]
  );

  // Cleanup effect
  useEffect(() => {
    return () => {
      checkRegistryNumberDebounced.cancel();
    };
  }, [checkRegistryNumberDebounced]);

  return (
    <Card className='border dark:border-border'>
      <CardHeader>
        <CardTitle>Registry Information</CardTitle>
      </CardHeader>
      <CardContent className='p-6'>
        <div className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <FormField
              control={control}
              name='registryNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registry Number</FormLabel>
                  <FormControl>
                    <Input
                      className='h-10'
                      placeholder='YYYY-#####'
                      maxLength={10}
                      {...field}
                      onChange={(e) => {
                        const formatted = formatRegistryNumber(e.target.value);
                        field.onChange(formatted);

                        const error = validateRegistryNumber(formatted);
                        if (error) {
                          setError('registryNumber', {
                            type: 'manual',
                            message: error,
                          });
                        } else if (formatted.length === 10) {
                          checkRegistryNumberDebounced(formatted);
                        }
                      }}
                      onBlur={() => {
                        if (field.value) {
                          const error = validateRegistryNumber(field.value);
                          if (error) {
                            setError('registryNumber', {
                              type: 'manual',
                              message: error,
                            });
                            toast.error(error);
                          } else if (field.value.length < 10) {
                            toast.error('Please complete the registry number');
                          }
                        }
                      }}
                      value={field.value || ''}
                      inputMode='numeric'
                    />
                  </FormControl>
                  <FormDescription>
                    Format: YYYY-##### (e.g., 2025-00001)
                  </FormDescription>
                  {isChecking && (
                    <FormDescription className='text-yellow-600'>
                      Checking registry number...
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name='province'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      const provinceObj = allProvinces.find(
                        (p) => p.id === value
                      );
                      field.onChange(provinceObj?.name || '');
                      setSelectedProvince(value);
                      // Clear city when province changes
                      setValue('cityMunicipality', '');
                    }}
                    value={
                      allProvinces.find((p) => p.name === field.value)?.id || ''
                    }
                  >
                    <FormControl>
                      <SelectTrigger className='h-10'>
                        <SelectValue placeholder='Select province' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {allProvinces.map((province) => (
                        <SelectItem key={province.id} value={province.id}>
                          {province.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name='cityMunicipality'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City/Municipality</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ''}
                    disabled={!selectedProvince}
                  >
                    <FormControl>
                      <SelectTrigger className='h-10'>
                        <SelectValue placeholder='Select city/municipality' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {citiesMunicipalities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegistryInfoCard;
