'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
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
import React, { useState } from 'react';

import DatePickerField from '@/components/custom/datepickerfield/date-picker-field';

import {
  getCitiesByProvince,
  getProvincesByRegion,
  REGIONS,
} from '@/lib/constants/locations';
import { MarriageCertificateFormValues } from '@/lib/types/zod-form-certificate/formSchemaCertificate';
import { useFormContext } from 'react-hook-form';

const HusbandInfoCard: React.FC = () => {
  const { control } = useFormContext<MarriageCertificateFormValues>();

  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');

  const provinces = selectedRegion ? getProvincesByRegion(selectedRegion) : [];
  const citiesMunicipalities = selectedProvince
    ? getCitiesByProvince(selectedRegion, selectedProvince)
    : [];
  return (
    <Card className='border dark:border-border'>
      <CardHeader>
        <CardTitle>Husband&apos;s Information</CardTitle>
      </CardHeader>
      <CardContent className='p-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* First Name */}
          <FormField
            control={control}
            name='husbandFirstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    className='h-10'
                    placeholder='Enter first name'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Middle Name */}
          <FormField
            control={control}
            name='husbandMiddleName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Middle Name</FormLabel>
                <FormControl>
                  <Input
                    className='h-10'
                    placeholder='Enter middle name'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Last Name */}
          <FormField
            control={control}
            name='husbandLastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    className='h-10'
                    placeholder='Enter last name'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Age */}
          <FormField
            control={control}
            name='husbandAge'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    className='h-10'
                    type='number'
                    placeholder='Enter age'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Date of Birth */}
          <FormField
            control={control}
            name='husbandDateOfBirth'
            render={({ field }) => (
              <DatePickerField field={field} label='Date of Birth' />
            )}
          />
          {/* Place of Birth (Region) */}
          <FormField
            control={control}
            name='husbandPlaceOfBirth.region'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Place of Birth (Region)</FormLabel>
                <Select
                  onValueChange={(value) => {
                    const selectedRegionObj = REGIONS.find(
                      (r) => r.id === value
                    );
                    field.onChange(selectedRegionObj?.name || '');
                    setSelectedRegion(value);
                    setSelectedProvince('');
                  }}
                  value={selectedRegion}
                >
                  <FormControl>
                    <SelectTrigger className='h-10'>
                      <SelectValue placeholder='Select region' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {REGIONS.map((region) => (
                      <SelectItem key={region.id} value={region.id}>
                        {region.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Place of Birth (Province) */}
          <FormField
            control={control}
            name='husbandPlaceOfBirth.province'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Place of Birth (Province)</FormLabel>
                <Select
                  onValueChange={(value) => {
                    const provinceObj = provinces.find((p) => p.id === value);
                    field.onChange(provinceObj?.name || '');
                    setSelectedProvince(value);
                  }}
                  value={selectedProvince}
                  disabled={!selectedRegion}
                >
                  <FormControl>
                    <SelectTrigger className='h-10'>
                      <SelectValue placeholder='Select province' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {provinces.map((province) => (
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

          {/* Place of Birth (City/Municipality) */}
          <FormField
            control={control}
            name='husbandPlaceOfBirth.cityMunicipality'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Place of Birth (City/Municipality)</FormLabel>
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
          {/* Citizenship */}
          <FormField
            control={control}
            name='husbandCitizenship'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Citizenship</FormLabel>
                <FormControl>
                  <Input
                    className='h-10'
                    placeholder='Enter citizenship'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Residence */}
          <FormField
            control={control}
            name='husbandResidence'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Residence</FormLabel>
                <FormControl>
                  <Input
                    className='h-10'
                    placeholder='Enter complete address'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Religion */}
          <FormField
            control={control}
            name='husbandReligion'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Religion/Religious Sect</FormLabel>
                <FormControl>
                  <Input
                    className='h-10'
                    placeholder='Enter religion'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Civil Status */}
          <FormField
            control={control}
            name='husbandCivilStatus'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Civil Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='h-10'>
                      <SelectValue placeholder='Select civil status' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='single'>Single</SelectItem>
                    <SelectItem value='widowed'>Widowed</SelectItem>
                    <SelectItem value='divorced'>Divorced</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default HusbandInfoCard;
